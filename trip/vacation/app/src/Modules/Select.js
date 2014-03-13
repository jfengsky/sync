define(function(require, exports, module){

    var $ = require('jquery');
    var _ = require('underscore');
	var inherit = require('lib/inherit');
	var EventEmitter = require('./EventEmitter');

	var util = require('./form_util');

	var REG_SELECT_HTML = /<SELECT (.+?)>/;
	var REG_OPTION_HTML = /<OPTION (.+?)>/;

	var canNew, caches = {};

	var getAttr = function(dom, userDefault, reg){
		var attrs = {};
		_.each((util.getIE() && util.getIE() < 8) ? util.getAttrs(dom.outerHTML.match(reg)[1]) : dom.attributes, function (attr) {
			attrs[attr.name.toLowerCase()] = _.indexOf(util.BOOLEAN_ATTR, attr.name) >= 0 ? true : attr.value;
		});
		return attrs;
	}

	var Option = inherit({
		/**
		* @param {jqNode} node
		* @param {Boolean} [useDefault]
		*/
		__constructor: function(options){
			this.options = _.extend({}, options);
			this.node = options.node;
			this.dom = this.node[0];
			this._initAttrs();
			this.value = this.attrs.value || this.dom.innerText;
		},
		_initAttrs: function(){
			this.attrs = getAttr(this.dom, this.options.userDefault, REG_OPTION_HTML);
		}
	});
	EventEmitter.mixTo(Option);

	var Select = inherit(_.extend({
		/**
		* @param {jqNode} node
		* @param {Function} [validate]
		* @param {Boolean} [useDefault]
		* @param {Boolean} [autoValidateAfterError = true]
		*/
		__constructor: function(options){
		    if (!canNew) throw "you should use Select.get()";
		    this.inputType = 'Select';
			this.options = _.extend({
				autoValidateAfterError: true
			}, options);
			this.node = options.node;
			this.dom = options.node[0];
			this.$error = {};

			this._initAttrs()._initOptions();
			this.name = this.attrs.name;

		    // defaultValue 初始化时的值，保存用来以后对比
			this.currentValue = this.defaultValue = this.getValue();

			_.bindAll(this, 'onChange');
			this.node.on('change', this.onChange);
		},
		_initAttrs: function(){
			this.attrs = getAttr(this.dom, this.options.userDefault, REG_SELECT_HTML);
			return this;
		},
		_initOptions: function(){
			var children = this.children = {}, userDefault = this.options.userDefault;
			_.each(this.node.find('option'), function(dom){
				var option = new Option({
					node: $(dom),
					userDefault: userDefault
				});
				children[option.value] = option;
			});
			return this;
		},
		getNode: function(){
			return this.node;
		},
		validate: function(){
			var value = this.getValue();
			var validate = true;
			if(this.options.validate && _.bind(this.options.validate, this)(value) === false) {
				validate = false;
			}
			validate = this._dealError('required', validate, this.attrs.required && (!value || !(value in this.children)));
			if(!validate) this.emit('error', this.$error);
			return validate;
		},
		getValue: function(){
			return this.dom.value;
		},
		_setValue: function(value){
			if(value !== this.currentValue){
				_.bind(util._setValue, this)(value);
			}
			return this;
		},
		setValue: function(value){
			if(value !== this.currentValue){
				this.dom.value = value;
			}
			
			return this._setValue(value);
		},
		onChange: function(e){
			this._setValue(this.getValue());
		}
	}, util.InputPartialPrototype), {
		get: function(options){
			canNew = true;
			var name = options.node[0].getAttribute('name');
			var select = caches[name] || new Select(options);
			canNew = false;
			return select;
		}
	});
	EventEmitter.mixTo(Select);

	module.exports = Select;
});