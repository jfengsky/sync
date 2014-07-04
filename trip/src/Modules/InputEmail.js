define(function(require, exports, module){

	var inherit = require('lib/inherit');

	var InputBase = require('./InputBase');

	//EMAIL: /^[\w\d]+(\.[\w\d]+)*@[\w\d]+((\.[\d\w]{2,}){1,3})$/i
	//EMAIL: /[^@]+@[\w\d-]+/
	// 按照 chrome 的规则
	var REG_EMAIL = /[^@]+@[\w\d-]+\.\w+$/;

	var InputEmail = inherit(InputBase, {
	    __constructor: function (options) {
	        this.__base(options);
	        this.inputType = 'InputEmail';
	    },
		_validate: function(value){
			var validate = true;
			// 如果为""的话，是 required 做的事情
			validate = this._dealError('email', validate, value !== '' && !value.match(REG_EMAIL));
			return validate;
		}
	});

	module.exports = InputEmail;
});