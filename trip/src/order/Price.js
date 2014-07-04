define(function(require, exports, module){
	var $ = require('jquery');
	function Price() {
            var self = this,
                vdata = self.data,
                roles = vdata.roles;
            return {
                init: function () {
                    var data;
                    var me = this;
                    var coupon = vdata.initData.availablePromotion;
                    if (data = vdata.initData.price) {
                        vdata.Amount = data.Amount + data.DiscountAmount - parseInt(data.Freight);
                        vdata.postage = parseInt(data.Freight);
                        if (coupon && coupon.SelectedPromotion) {
                            vdata.couponPrice = data.DiscountAmount - Math.abs(parseInt(coupon.SelectedPromotion.ReducedAmount));
                        } else {
                            vdata.couponPrice = data.DiscountAmount;
                        }
                        if (data.ChildNumber) {
                            data.ChildAmount = Math.ceil(data.ChildAmount / data.ChildNumber);
                        }
                        if (data.AduNumber) {
                            data.AduAmount = Math.ceil(data.AduAmount / data.AduNumber);
                        }
                        data.isTempSave = vdata.EnableTemporarySave ? true : false;
                        self.render(self.tpl.price, $.extend(data, { ChatUrl: vdata.initData.ChatUrl }), function (dom) {
                            roles.priceID.append(dom);
                            me.setPos();
                            $.extend(roles, self.common.getRoles(roles.priceID));
                        });
                    }
                    self.totalPrice.call(self);
                },
                setPos: function () {
                    var obj = document.getElementById("price_box_wrap");
                    var getTop = function (e) {
                        var offset = e.offsetTop;
                        if (e.offsetParent != null) { offset += getTop(e.offsetParent) };
                        return offset;
                    }
                    var top = getTop(obj);
                    var isIE6 = /msie 6/i.test(navigator.userAgent);
                    window.onscroll = function () {
                        var bodyScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                        if (bodyScrollTop > top) {
                            obj.style.position = (isIE6) ? "absolute" : "fixed";
                            obj.style.top = (isIE6) ? bodyScrollTop + "px" : "0px";
                        } else {
                            obj.style.position = "static";
                        }
                    }
                }
            };
        }
	return Price;
});