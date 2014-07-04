define(function(require, exports, module){

	var inherit = require('lib/inherit');
	var util = require('./form_util');

	var InputBase = require('./InputBase');

	var InputNumber = inherit(InputBase, {
	    __constructor: function (options) {
	        this.__base(options);
	        this.inputType = 'InputNumber';
	    },
		_validate: function(value){
			var num_value = util.int(value);
			var validate = true;
			validate = this._dealError('number', validate, value !== '' && value !== num_value.toString());
			// 如果连类型都错了，就不必判断大小了
			if(validate){
				validate = this._dealError('max', validate, this.attrs.max !== undefined && num_value > this.attrs.max);
				validate = this._dealError('min', validate, this.attrs.min !== undefined && num_value < this.attrs.min);
			}
			else{
				this._delErrors('max', 'min');
			}
			
			return validate;
		}
	});

	window.InputNumber = InputNumber;

	module.exports = InputNumber;
});