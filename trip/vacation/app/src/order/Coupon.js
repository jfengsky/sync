define(function(require, exports, module){
	var $ = require('jquery');

	function Coupon() {//优惠券
		var self = this,
			vdata = self.data,
			roles = vdata.roles,
			mod = vdata.modules,
			parseJSON = self.common.parseJSON;
		return {
			init: function () {//初始化
				var me = this;
				var data = me.handleData();
				var list = data.data;
				var tpl = self.tpl.coupon;
				var isSingle = this.isSingle = (data.type && list.length === 1);
				$.extend(roles, self.common.getRoles(roles.couponID));
				if (list.length) {
					if (isSingle) {
						tpl = self.tpl.singleCoupon;
					}
					self.render(tpl, { 'list': list }, function (dom) {
						if (isSingle) {
							roles.singleConponID.html(dom).show();
							roles.couponID.children().eq(1).hide();
						} else {
							roles.coupon.append(dom);
							roles.couponID.show();
						}
						roles.fillsetID.show();
					}, function () {
						me.initSelect(isSingle);
						me.select();
					});
				} else {
					roles.couponID.children().eq(1).hide();
					roles.fillsetID.show();
				}
			},
			handleData: function () {
				var me = this, _ret = [], _ref = vdata.initData.availablePromotion, _r, type = 0, _obj, oSelected = _ref ? _ref.SelectedPromotion : null, reduce; //type:优惠券是否是单个且要输入框的
				me.promotions = {};
				if (_ref) {
					if (!$.isEmptyObject(_ref)) {
						if (_ref.Promotions && _ref.Promotions.length) {
							_ret = _ref.Promotions;
							if (_ret.length) {
								$.map(_ret, function (v, k) {
									if (v.PromotionID) {
										me.promotions[v.PromotionID] = v
										if (oSelected && oSelected.PromotionID === v.PromotionID) {
											reduce = Math.abs(oSelected.ReducedAmount);
											v.ReducedAmount = reduce ? reduce : 0;
										}
									}
								})
							}
						}
					}
					if (_r = vdata.initData.availablePromotion.ExtendPromotion) {
						if (_r.IsNeedInputExtendCouponCode) {
							_r.extendPromotion = true;
							if (oSelected) {
								if (oSelected.IsExtendPromotion) {
									reduce = Math.abs(oSelected.ReducedAmount);
									_r.ReducedAmount = reduce ? reduce : 0;
									_r.DisplayNameR = oSelected.DisplayName;
									_r.Description = oSelected.Description;
								}
							}
							_ret.push(_r);
						};
					}
				}
				_obj = {
					data: _ret,
					type: 0
				};
				if (_ret.length === 1 && (_ret[0].IsNeedCaptcha || _ret[0].extendPromotion)) {
					_obj.type = 1;
				}
				return _obj;
			},
			initSelect: function (isSingle) {
				var oSelected = vdata.initData.availablePromotion.SelectedPromotion;
				var current;
				var role, reduce;
				if (!oSelected) return;
				reduce = Math.abs(oSelected.ReducedAmount);
				if (isSingle) {
					role = self.common.getRoles(roles.singleConponID);
					role.cnew.hide();
					role.had.show();
				} else {
					current = oSelected.IsExtendPromotion ? roles.coupon.find('input[extend="1"]') : roles.coupon.find('input[PromotionID="' + oSelected.PromotionID + '"]');
					current.prop('checked', true);
					role = self.common.getRoles(current.closest('li'));
					role.code && role.code.show();
					role.tip.show().html(reduce ? '<dfn>-&yen;</dfn> <strong>' + reduce + '</strong>' : '已选择');
				}
				roles.amountCoupon.html(vdata.couponNowPrice = reduce);
				self.totalPrice.call(self);
			},
			select: function () {
				var request;
				var validTip;
				var _data = {
					TmpOrderID: self.formData.OrderId,
					PromotionID: 0,
					CouponCode: ''
				};
				var callback = function (amount) {
					roles.amountCoupon.html(vdata.couponNowPrice = amount);
					self.totalPrice.call(self); //总金额
				};
				var getDate = function (role, obj, noShowTip) {
					if (obj) {
						$.extend(_data, obj);
					}
					request = self.fetchData({
						url: vdata.handles.verifyPromotion,
						data: _data
					}, function (data) {
						var amount, code, ref;
						if (!request) return; //如果请求取消则停止回调
						data = typeof data === 'string' ? parseJSON(data) : data;
						if (data.errno != 0) {
							role.tip.html(data.errmsg || '你输入的验证码无效').show();
							callback(0);
						} else {
							ref = data.data;
							code = obj ? obj.CouponCode : '';
							amount = Math.abs(ref.ReducedAmount);
							promotionID = ref.PromotionID;
							if (amount == 0) {
								(role.tip && !noShowTip) && role.tip.html('已选择');
							} else {
								role.tip && role.tip.html('<dfn>-&yen;</dfn> <strong>' + amount + '</strong>');
							}
							role.tip && role.tip.show();
							callback(amount);
						}
					})
				};
				var couponCHeck = function (role, promotionid) {
					callback(0);
					getDate(role, { PromotionID: 0, CouponCode: '' }, !0);
					role.code && role.code.show();
					role.couponCode && role.couponCode.val('');
					role.tip && role.tip.html('');
					role.checkcode.unbind('click');
					role.checkcode.bind('click', function () {
						var _code = $.trim(role.couponCode.val());
						if (!_code) {
							if (validTip) {
								validTip.show();
							} else {
								validTip = new self.validate({ target: role.couponCode[0], data: '请输入验证码', errorClass: '' }).show();
							}
							return;
						}
						getDate(role, { PromotionID: promotionid, CouponCode: _code });
					});
				};
				if (this.isSingle) {
					var _role = self.common.getRoles(roles.singleConponID);
					var promotionid = _role.couponCode.attr('PromotionID') || 0;
					roles.singleConponID.on('click', 'a[role="reinput"]', function () {
						couponCHeck(_role, promotionid);
						_role.cnew.show();
						_role.had.hide();
					});
					couponCHeck(_role, promotionid);
				}
				roles.coupon.on('click', 'input[type="radio"]', function () {
					var _this = $(this);
					var promotionID = _this.attr('PromotionID');
					var strategyID = _this.attr('strategyID');
					var parent = _this.closest('li');
					var role = self.common.getRoles(parent);
					var requireCode = _this.attr('requireCode') === '1';
					if (request) {
						request.abort();
					}
					if (_this.prop('checked') && _this.attr('role') !== 'cancel') {
						role.description && role.description.show();
						self.removeValidate();
					}
					var siblings = parent.siblings();
					siblings.find('[role="tip"],[role="code"],[role="description"]').hide();
					if (_this.attr('role') === 'cancel') {
						callback(0);
						getDate(role, { PromotionID: 0, CouponCode: '' });
						return;
					}
					if (requireCode) {
						couponCHeck(role, role.couponCheck.attr('promotionid') || 0);
					} else {
						getDate(role, { PromotionID: promotionID });
					}
				});
			}
		}
	}
	return Coupon;
});