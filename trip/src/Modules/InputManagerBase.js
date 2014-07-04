define(function (require, exports, module) {
    //var $ = require('jquery');
    var _ = require('underscore');
	var inherit = require('lib/inherit');
	var EventEmitter = require('./EventEmitter');
	var util = require('./form_util');

	var InputClass;

	var caches = {};
	var canNew;
	var Manager = inherit(_.extend({
		/**
		 * @param {jqNode} node
		 * @param {Function} InputClass
		 * @param {Function} validate
		 * @param {Boolean} [autoValidateAfterError = true]
		 * @private
		 */
		__constructor: function(options){
		    if (!canNew) throw "you should use Radio.get()";
		    this.inputType = 'InputManagerBase';
			this.options = _.extend({
				autoValidateAfterError: true
			}, options);
			var node = options.node;
			this.children = {};
			this.attrs = {
				required: false
			};
			this.$error = {};

			this.InputClass = options.InputClass;

			this._initBrothers(options.node);

			caches[this.name] = this;
		},
		_initBrothers: function(node){
			var manager = this;
			var haveNewRadio;
			_.each(node, function(dom, i){
				if(!manager.findByDom(dom)){
					haveNewRadio = true;
					var input = manager.InputClass.get({
						node: node.eq(i)
					});
					manager.name = input.name;
					input.on('change', _.bind(manager.onInputChange, manager));
					manager.addBrother(input);
				}
			});
			if(haveNewRadio) this.currentValue = this.getValue();
			return this;
		},
		/**
		* @param {String} [value]
		*/
		getNode: function(value){
			var input = this.findByValue(value);
			return input && input.node;
		},
		validate: function(){
			var value = this.getValue();
			var validate = true;
			if(this._validate && this._validate(value) === false){
				validate = false;
			}
			if(this.options.validate && _.bind(this.options.validate, this)(value) === false) {
				validate = false;
			}
			if(!validate) this.emit('error', this.$error);
			return validate;
		},
		addBrother: function(input){
			if(input.attrs.required) this.attrs.required = true;
			this.attrs.type = input.attrs.type;
			this.children[input.attrs.value] = input;
			return this;
		},
		findByDom:function(dom){
			return _.find(this.children, function(input){return input.dom == dom});
		},
		findByValue: function (value) {
			if(value === undefined) return _.values(this.children)[0];
			return this.children[value];
		},
		onInputChange: function(){
			this._setValue(this.getValue());
		}
	}, util.InputPartialPrototype), {
		/**
		 * @param {jqNode} node
		 * @param {Function} InputClass
		 * @returns {RadioManager}
		 */
		get: function(options){
			canNew = true;
			var name = options.node[0].getAttribute('name');
			var manager = caches[name] || new this.prototype.__self(options);//RadioManager(options);
			/**
			 * 因为可能有两种初始化形式：
			 * 1. Radio.get({node: $('input[type=radio]')})
			 * 2. $('input[type=radio]').each(function(dom){
			 *      Radio.get({node: $(dom)})
			 *   })
 			 */
			manager._initBrothers(options.node);

			canNew = false;
			return manager;
		}
	});
	EventEmitter.mixTo(Manager);

	module.exports = Manager;
});