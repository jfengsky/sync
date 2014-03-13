define(function(require, exports, module){
	var $ = require('jquery');

	function HotelCoupon() {//酒店优惠
		var self = this,
			vdata = self.data,
			roles = vdata.roles;
		return {
			init: function () {
				var me = this;
				var data = this.handleData(vdata.initData.Coupon);
				if (!data && $.isEmptyObject(vdata.initData.availablePromotion)) {
					roles.couponID.hide();
				}
				if (!data) {
					if (!vdata.initData.availablePromotion || vdata.modules.Coupon.isSingle) {
						roles.couponID.hide();
					}
					return;
				}
				self.render(self.tpl.hotelCoupon, data, function (dom) {
					var html = $(dom).appendTo(vdata.roles.couponID);
					me.bindEvent(html, data);
				});
			},
			handleData: function (data) {
				if (!data) return;
				var _ret = {
					Amount: data.Amount,
					CanUseAmount: data.CanUseAmount
				};
				var _ref = 0;
				var __ref = 0;
				if (data.Amount <= 0) {
					_ret.isRemain = false;
				} else {
					_ret.isRemain = true;
				}
				$.map(data.ReturnTicketCash, function (v, k) {
					_ref += parseInt(v.Amount);
				});
				data.UsedReturnCashRoomLst && $.map(data.UsedReturnCashRoomLst, function (v, k) {
					__ref += parseInt(v.Amount);
				})
				_ret.coupon = _ref;
				_ret.used = __ref;
				_ret.remain = parseInt(data.Amount) - parseInt(data.CanUseAmount);
				return _ret;
			},
			bindEvent: function (el, data) {
				var role = self.common.getRoles(el);
				role.confirm && role.confirm.click(function () {
					role.having.hide();
					role.had.show();
					self.formData.CouponInfo = {
						CashBack: data.CanUseAmount,
						IsUseCoupon: 1
					}
				});
				role.cancel && role.cancel.click(function () {
					role.having.show();
					role.had.hide();
					self.formData.CouponInfo = {
						CashBack: 0,
						IsUseCoupon: 0
					}
				});
			}
		}
	}
	return HotelCoupon;
});