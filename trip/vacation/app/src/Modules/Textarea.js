define(function(require, exports, module){

	var inherit = require('lib/inherit');

	var InputBase = require('./InputBase');

	var Textarea = inherit(InputBase, {
	    __constructor: function (options) {
	        this.__base(options);
	        this.inputType = 'Textarea';
	    }
	});

	module.exports = Textarea;
});