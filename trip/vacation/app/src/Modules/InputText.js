define(function(require, exports, module){

	var inherit = require('lib/inherit');

	var InputBase = require('./InputBase');

	var InputNumber = inherit(InputBase, {
	    __constructor: function (options) {
	        this.__base(options);
	        this.inputType = 'InputText';
	    }
	});

	module.exports = InputNumber;
});