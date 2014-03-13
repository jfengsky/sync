define(function (require, exports, module) {
    //var $ = require('jquery');
    var _ = require('underscore');
	var inherit = require('lib/inherit');
	var EventEmitter = require('./EventEmitter');
	var util = require('./form_util');

	var InputBase = require('./InputBase');
	var InputManagerBase = require('./InputManagerBase');

	var Checkbox = inherit(InputBase, {
		onChange: function (e) {
			this.emit('change');
		}
	});

	var caches = {};
	var CheckboxManager = inherit(InputManagerBase, {
	    __constructor: function (options) {
	        this.__base(options);
	        this.inputType = 'InputCheckbox';
	    },
		_validate: function(value){
			var validate = true;
			// checkbox 的 required 是，每一个input上所写的 required 只控制自己，不同于 radio
			validate = this._dealError('required', validate, this.attrs.required && _.some(this.children, function(checkbox){ return !checkbox.attrs.required || checkbox.dom.checked }));
			return validate;
		},
		getValue: function(){
			var values = [];
			_.each(this.children, function(input){
				if(input.dom.checked) values.push(input.attrs.value);
			});
			return values;
		},
		addValue: function (value) {
			var ins = this.findByValue(value);
			if(ins){
				ins.dom.checked = true;
				var values = _.clone(this.currentValue);
				values.push(value);
				this._setValue(values);
			}
			return this;
		},
		delValue: function (value) {
			var ins = this.findByValue(value);
			if(ins){
				ins.dom.checked = false;
				this._setValue(_.without(this.currentValue, value));
			}
			return this;
		},
		_setValue: function(values){
			if(!_.isEqual(values, this.currentValue)){
				_.bind(util._setValue, this)(values);
			}
			return this;
		},
		/**
		 * @param {Array} value
		 */
		setValue: function(values){
			_.each(this.children, function (input) {
				input.dom.checked = _.indexOf(values, input.attrs.value) >= 0
			});
			return this._setValue(values);
		}
	}, {
		/**
		 * @param {jqNode} node
		 */
		get: function (options) {
			options.InputClass = Checkbox;
			return this.__base(options);
		}
	});
	EventEmitter.mixTo(CheckboxManager);

	module.exports = CheckboxManager;
});