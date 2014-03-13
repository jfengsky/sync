// IE的 console 控制台真蛋疼，
// 空字符串 在 所有模式下都输出 undefined
// false 在 IE9 及一下模式中输出 undefined
define(function (require, exports, module) {
    //var $ = require('jquery');
    var _ = require('underscore');
	var inherit = require('lib/inherit');
	var EventEmitter = require('./EventEmitter');
	var util = require('./form_util');
	// 50ms 已经基本达到的很细的粒度
	var inputInterval = 50;

	var REG_INPUT_HTML = /<INPUT (.+)>/;
	var REG_QUOTE = /^\s*('|")?(.*)\1\s*$/;

	var caches = [];
	var canNew = false;

	var InputBase = inherit(_.extend({
		/**
		* @param {jqNode} node
		* @param {Function} [validate]
		* @param {Boolean} [useDefault]
		* @param {Boolean} [autoValidateAfterError = true]
		*/
		__constructor: function (options) {
		    if (!canNew) throw "you should use Input.get()";

			this.inputType = 'InputBase';
			this.options = _.extend({
				autoValidateAfterError: true
			}, options);
			this.node = options.node;
			this.dom = this.node[0];
			
			this.$error = {};
			this._initAttrs();
			this.name = this.attrs.name;

			// IE9 的 input 事件，在[Backspace]回退删字符的时候不能触发
			this._surportInput = !(util.getIE()) || util.getIE() >= 10;

			this.currentValue = this.defaultValue = this.dom.value;

			_.bindAll(this, 'onInput', 'onChange', 'onFousin', 'onFousout');
			if(this._surportInput) this.node.on('input', this.onInput);
			this.node.on('change', this.onChange);
			this.node.on('focusin', this.onFousin);
			this.node.on('focusout', this.onFousout);

			caches.push(this);
		},
		_initAttrs: function () {
			var attrs = {}, useDefault = this.options.useDefault;
			_.each((util.getIE() && util.getIE() < 8) ? util.getAttrs(this.dom.outerHTML.match(REG_INPUT_HTML)[1]) : this.dom.attributes, _.bind(function (attr) {
				attrs[attr.name.toLowerCase()] = _.indexOf(util.BOOLEAN_ATTR, attr.name) >= 0 ? true : attr.value;
			}, this));
			//if(!('type' in attrs)) attrs.type = this.dom.getAttribute('type') || 'text';
			attrs.type = attrs['vc-type']; //util.getType(this.dom);
			delete attrs['vc-type'];
			if(attrs.pattern) attrs.pattern = RegExp(attrs.pattern);
			if(attrs.autofocus) this.focus();
			if(attrs.maxlength) attrs.maxlength = util.int(attrs.maxlength);
			if(attrs.max && attrs.type == 'number') attrs.max = util.int(attrs.max);
			if(attrs.min && attrs.type == 'number') attrs.min = util.int(attrs.min);
			if(attrs.step) attrs.step = util.int(attrs.step);
			this.attrs = attrs;

			if(!useDefault){
				_.each(['max','min','pattern','required'], _.bind(function(attr){
					this.dom.removeAttribute(attr);
				}, this));
				//var html5Input = ['number', 'email', 'tel', 'range', 'search'];
				var html5Input = ['number', 'email'];
				if(_.indexOf(html5Input, attrs.type) >= 0){
					this.dom.setAttribute('type', 'text');
				}
			}

			return this;
		},
		getNode: function(){
			return this.node;
		},
		getValue: function () {
			return this.currentValue;
		},
		// dom 中 setValue 在这里
		_setValue: function (value) {
			if(this.currentValue !== value){
				_.bind(util._setValue, this)(value);
			}
			return this;
		},
		// 实例setValue，需通过这里
		setValue: function (value) {
			(value === undefined || value === null) && (value = '');
			if(typeof value !== 'string') value = value.toString();
			if(this.dom.value !== value) this.dom.value = value;
			return this._setValue(value);
		},
		validate: function () {
			var value = this.getValue();
			// 下面的只能设置为 false，不能设置 true
			var validate = true;
			if(this._validate && this._validate(value) === false){
				validate = false;
			}
			if(this.options.validate && _.bind(this.options.validate, this)(value) === false) {
				validate = false;
			}
			validate = this._dealError('required', validate, value === '' && this.attrs.required);
			validate = this._dealError('pattern', validate, this.attrs.pattern && !value.match(this.attrs.pattern));
			if(!validate) this.emit('error', this.$error);
			return validate;
		},
		focus: function () {
			this.dom.focus();
			return this;
		},
		onInput: function (e) {
			this._setValue(this.dom.value);
		},
		onChange: function(e){
			this._setValue(this.dom.value);
		},
		// 只在 IE模拟 input 中使用
		_checkChange: function () {
			var value = this.dom.value;
			if(this.currentValue != value) this.setValue(value);
		},
		onFousin: function (e) {
			// 开始监听 input
			if(!this._surportInput){
				this._inputTimoutID = setTimeout(_.bind(function () {
					//console.log(this._inputTimoutID)
					this._checkChange();
					this._inputTimoutID = setTimeout(_.bind(arguments.callee, this), inputInterval);
				}, this), inputInterval);
			}
			this.emit('focusin');
		},
		onFousout: function (e) {
			// 撤销监听 input
			if(!this._surportInput){
				// setTimeout 是为了预防一些边界情况
				setTimeout(_.bind(function(){clearTimeout(this._inputTimoutID)}, this), 0);
			}
			this._checkChange();
			this.emit('focusout');
		}
	}, util.InputPartialPrototype), {
		/**
		 * @param {jqNode} node
		 */
		get: function(options){
			if(options.node){
				var input = _.find(caches, function(input){ return input.dom === options.node[0] });
				if(!input){
					canNew = true;
					input = new this.prototype.__self(options);//new InputBase(options);
					canNew = false;
				}
				return input;
			}
		},
		getByName: function(name){
			return _.find(caches, function(input){ return input.attrs.name && input.attrs.name == name});
		},
		_getCache: function(){
			return caches;
		}
	});
	EventEmitter.mixTo(InputBase);

	module.exports = InputBase;

	

	
});