define(function (require, exports, module) {

	/*
	* �ӿ�Լ��
	* 
	* ** required ** Ϊ����ʵ�ֵ� ����/����/�¼�
	* ** optional ** Ϊ��ѡʵ�ֵ� ����/����/�¼�
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