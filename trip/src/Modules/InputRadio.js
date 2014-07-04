define(function(require, exports, module){

    //var $ = require('jquery');
    var _ = require('underscore');
	var inherit = require('lib/inherit');
	var EventEmitter = require('./EventEmitter');
	var util = require('./form_util');

	var InputBase = require('./InputBase');
	var InputManagerBase = require('./InputManagerBase');

	var Radio = inherit(InputBase, {
		onChange: function(e){
			this.emit('change');
		}
	});

	var RadioManager = inherit(InputManagerBase, {
	    __constructor: function (options) {
	        this.__base(options);
	        this.inputType = 'InputRadio';
	    },
		_validate: function(value){
			var validate;
			// radio 的 required 是，每一个input上所写的 required 相当于这一组都是 required，不同于 checkobx
			validate = this._dealError('required', validate, this.attrs.required && (!value || !(value in this.children)));
			return validate;
		},
		getValue: function(){
			var input = _.find(this.children, function(input){return input.dom.checked});
			return input && input.attrs.value;
		},
		_setValue: function(value){
			if(value != this.currentValue){
				_.bind(util._setValue, this)(value);
			}
			return this;
		},
		setValue: function(value){
			var ins = this.findByValue(value);
			ins && (ins.dom.checked = true);
			return this._setValue(value);
		}
	},{
		/**
		 * 
		 */
		get: function (options) {
			options.InputClass = Radio;
			return this.__base(options);
		}
	});
	EventEmitter.mixTo(RadioManager);

	module.exports = RadioManager;
});