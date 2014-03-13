define(function(require, exports, module){
	return {//submit数据
		PassengerInfos: [], //出行人
		CouponInfo: {
			IsUseCoupon: 0,
			CashBack: 0
		}, //促销
		InvoiceInfo: null, //发票
		ContactInfo: {}, //联系人
		CurrentUserUId: '', //用户uid
		DeliverInfo: {
			"DeliverType": 0,
			"AddresseeName": "",
			"ContactTel": "",
			"Address": "",
			"PostCode": ""
		},
		"OtherInfo": {
			"NoSmokingRoom": 0,
			// "NeedAdsl": 0,
			"BedDes": "",
			"Remark": ""
		}
	};
});