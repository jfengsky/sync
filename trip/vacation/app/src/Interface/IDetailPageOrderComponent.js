define(function (require, exports, module) {

	/*
	* 接口约定
	* 
	* ** required ** 为必须实现的 属性/方法/事件
	* ** optional ** 为可选实现的 属性/方法/事件
	*/

	var IDetailPageOrderComponent = {
		property: {
			required: []
		},
		method: {
			required: ['getTotalPrice'],
			optional: []
		},
		event: {
			required: ['changed-total-price']
		}
	};

	module.exports = IDetailPageOrderComponent;
});