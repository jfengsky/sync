//团队游详情页，预定订单，酒店部分
define(function (require, exports, module) {
	var $ = require("../../../lib/jquery"),
		_ = require("../../../lib/underscore"),
		inherit = require("../../../lib/inherit"),
		EventEmitter = require("Modules/EventEmitter");

	/*
	* 
	* @event 'select-click'()
	* 
	*/
	var Flight = inherit({
		__constructor: function (nodeWrap) {
			this.node = nodeWrap;
			this.name = 'flight';
			this.nodeBtnSelect = nodeWrap.find('.col_btn a');

			_.bindAll(this, 'onSelectClick');
			this.nodeBtnSelect.on('click', this.onSelectClick);
		},
		onSelectClick: function (e) {
			this.emit('select-click');
		}
	});
	EventEmitter.mixTo(Flight);

	module.exports = Flight;
});