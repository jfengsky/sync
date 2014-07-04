//=====
//create by hwmiao(hwmiao@ctrip.com)
//=====
define(function (require, exports, module) {
    var cquery = $;
    var $ = require('jquery');
    var cities = require('../public/address');
    window.__bfi = window.__bfi || [];
    
    var Birth = require('../Modules/BirthDay');
    var orderprocess = {
        config: {
            fetchUrl: ''
        },
        Reg: require('./checkReg'),
        data: {
            modules: {}, //对象模块
            productsPrice: 0, //票价和
            couponPrice: 0, //优惠券金额
            couponNowPrice: 0,
            postage: 0, //运费|邮费
            cache: {}, //缓存信息
            roles: {}, //需要操作的dom
            dfNational: null//默认国籍
        },
        status: require('./status'),
        formData: require('./formData'),
        tpl: { //模板
            payTip: require('../tpl/order/payTip.html.js'),
            linkerSug: require('../tpl/order/linkerSug.html.js'),
            commoners: require('../tpl/order/commoners.html.js'),
            traveller: require('../tpl/order/traveller.html.js'),
            linkmanBox: require('../tpl/order/linkmanBox.html.js'),
            linkmanDf: require('../tpl/order/linkmanDf.html.js'),
            delivery: require('../tpl/order/delivery.html.js'),
            coupon: require('../tpl/order/coupon.html.js'),
            singleCoupon: require('../tpl/order/singleCoupon.html.js'),
            hotelCoupon: require('../tpl/order/hotelCoupon.html.js'),
            nameTips: require('../tpl/order/nameTips.html.js'),
            nameCNTips: require('../tpl/order/nameCNTips.html.js'),
            nameENTips: require('../tpl/order/nameENTips.html.js'),
            price: require('../tpl/order/price.html.js'),
            invoiceBox: require('../tpl/order/invoiceBox.html.js'),
            invoiceDf: require('../tpl/order/invoiceDf.html.js'),
            deliveryDf: require('../tpl/order/deliveryDf.html.js'),
            deliveryBox: require('../tpl/order/deliveryBox.html.js'),
            allAdress: require('../tpl/order/allAdress.html.js'),
            inCityAddress: require('../tpl/order/inCityAddress.html.js'),
            tempSave: require('../tpl/order/tempSave.html.js'),
            ivoiceSug: require('../tpl/order/ivoiceSug.html.js')
        },
        common: { //公用的函数
            parseJSON: function (str) {
                return (new Function("", "return " + str))()
                // return eval('(' + str + ')');
            },
            getRoles: require('./util').getRoles,
            parseCNId: require('./util').parseCNId,
            isDate: require('./util').isDate
        },
        events: require('./events'),
        regNational: function (el) {
            var regNational = require('./util').regNational;
            return $.proxy(regNational, this)(el);
        },
        removeValidate: function () {//除去验证提示
            var self = this;
            var _ref = self.insStatistics;
            if (!_ref) return;
            $.map(_ref, function (v, k) {
                v.hide();
            });
            $('input[role="cardValidUntilY"],input[role="cardValidUntilM"],input[role="birthdayY"],input[role="birthdayM"]', '#travellersID').removeClass('f_error');
        },
        initEvent: function () { //初始化事件绑定
            for (var i in this.events) {
                this.events[i].call(this);
            }
        },
        initHeadbarsHelper: function () {
            Handlebars.registerHelper("equal", function (a, b, v1, v2) {
                return a == b ? v1 : v2;
            });
            Handlebars.registerHelper('add', function (a, b) {
                return a + b;
            });
        },
        toggleLoading: function (id, el) { //load加载
            var id = 'queryLoading' + (id || '');
            var loading = $('#' + id);
            if (!loading.length) {
                loading = $('<div class="query" id="' + id + '"/>').css('border', '0');
                loading.html('<img style="vertical-align: middle;" src="http://pic.c-ctrip.com/common/loading_50.gif">正在加载，请稍候…').appendTo(el);
            } else {
                loading.remove();
            }
        },
        totalPrice: function () { //计算总金额
            var data = this.data;
            var total = data.Amount - data.couponPrice - data.couponNowPrice + data.postage;
            var roles = data.roles;
            roles.amountPostage.html(data.postage);
            roles.amountCoupon.html(data.couponPrice + data.couponNowPrice);
            roles.amountTotal.html(total);
            roles.totalID.html(total);
            data.postage ? roles.fright.show() : roles.fright.hide();
            data.couponPrice + data.couponNowPrice ? roles.discount.show() : roles.discount.hide();
            // this.formData.PromotionAmount = data.couponPrice ? data.couponPrice : 0;
            return total;
        },
        render: require('./util').render,
        fetchData: function (opts, cb) { //ajax
            var self = this;
            return $.ajax({
                type: opts.method || 'GET',
                url: opts.url || self.config.fetchUrl,
                data: opts.data,
                cache: false,
                dataType: 'html',
                // timeout : 5000,
                success: function (data) {
                    cb.call(self, data);
                },
                error: function (msg) {
                    // alert(msg)
                }
            });
        },
        reviewPos: $.proxy(require('./util').reviewPos, orderprocess),
        validate: (function () {
            var Validate = require('./Validate');
            Validate.setOrderprocess(orderprocess);
            return Validate;
        })(),
        hideTip: require('./util').hideTip,
        Products: require('./Products'),
        Coupon: require('./Coupon'),
        HotelCoupon: require('./HotelCoupon'),
        Travellers: require('./Travellers'),
        Commoners: require('./Commoners'),
        Contacter: require('./Contacter'),
        Price: require('./Price'),
        Invoice: require('./Invoice'),
        Delivery: require('./Delivery'),
        Extras: require('./Extras'),
        AsyncInit: function () {
            var self = this,
                vdata = self.data;
            return {
                init: function () {
                    var module = [];
                    self.fetchData({
                        url: vdata.handles.otherInfo,
                        dataType: 'text'
                    }, function (data) {
                        data = typeof data === 'string' ? self.common.parseJSON(data) : data;
                        vdata.roles.loadingID.remove();
                        if (data.errno) return;
                        $.extend(vdata.initData, data.data);
                        (function (args) {
                            $.map([self.Travellers, self.Commoners, self.Delivery, self.Invoice, self.Extras], function (o, i) {
                                module[args[i]] = o.call(self);
                            });
                        } ('Travellers|Commoners|Delivery|Invoice|Extras'.split('|')));
                        for (var i in module) {
                            if (Object.prototype.hasOwnProperty.call(module, i)) {
                                module[i].init(vdata);
                                vdata.modules[i] = module[i];
                            }
                        }
                        self.initEvent();
                    });
                }
            }
        },
        /*可预订检查*/
        decideResource: function() {
            var jsonUrl = "/booking/Ajax/DetailNew/CanBookingCheck.ashx?TmpOrderID=" + GV.app.order.vars.initData.orderid,
               telement = '<div class="book_masking" id="js_book_masking">\
                                      <h2><a href="###" alt="" class="js_book_masking_close"></a>资源信息提示</h2>\
                                        <div class="book_masking_padding">\
                                            <div class="book_masking_content">\
                                                <i class="icon_no"></i>\
                                                <h3>您所选的{{data}}已订完，请重新选择！</h3>\
                                                <div class="masking_order_btn"><a href="javascript:void(0)" class="btn_blue_middle js_book_masking_close">确定</a></div>\
                                            </div>\
                                        </div>\
                                    </div>',
                jsonData = {},
                dataString = "";
                $.ajax({
                  url: jsonUrl,
                  type: "POST",
                  success: function(data) {
                    var data = $.parseJSON(data);
                        if (data.data && data.data.length > 0) {
                          for (var i = 0, len = data.data.length; i < len; i++) {
                            /*航班信息*/
                            if (data.data[i].Type == 3) {
                              var flightName = data.data[i].ResourceName.split("|");
                                  for (var k = 0, flightLen = flightName.length - 1; k < flightLen; k++) {
                                    dataString += "【" + flightName[k] + "航班号】、";
                                  }
                            } else if (data.data[i].Type == 2) {
                              var hotelName = data.data[i].ResourceName.split("|");
                                  for (var m = 0, hotelLen = hotelName.length; m < hotelLen; m++) {
                                    dataString += "【" + hotelName[m] + "】、";
                                  }
                            } else if (data.data[i].Type == 0) {
                              dataString += "【" + data.data[i].ResourceName + "】、";
                            }
                          }
                          jsonData.data = dataString.slice(0, dataString.length - 1);
                          $("body").append(Handlebars.compile(telement)(jsonData));
                          cQuery("#js_book_masking").mask();
                          $(".js_book_masking_close").on("click", function () {
                            cQuery("#js_book_masking").unmask();
                            window.location.href = $(".prev_stop").attr("href");
                          })
                        }
                  }
                })
        },
        init: function () {  //初始化
            var self = this;
            var vdata = self.data;
            orderprocess.decideResource();
            return function () {
                var modules = vdata.modules;
                if (!arguments.length) return;
                $.each('loadingID|couponID|fillsetID|bookInfoID|linkManID|travellersID|commonersID|priceID|invoiceID|searchID|deliveryID|totalID|submitID|extrasID|singleConponID'.split('|'), function (k, v) {
                    vdata.roles[v] = $('#' + v);
                });
                vdata = $.extend(self.data, arguments[0].initData);
                self.initHeadbarsHelper();
                self.formData.OrderId = encodeURIComponent(vdata.initData.orderid); //订单号
                self.formData.RequestPath = encodeURIComponent(location.pathname);
                (function (args) {
                    $.map([self.Products, self.Price, self.Coupon, self.HotelCoupon, self.AsyncInit], function (o, i) {
                        modules[args[i]] = o.call(self);
                    });
                } ('Products|Price|Coupon|HotelCoupon|AsyncInit'.split('|')));
                for (var i in modules) {
                    modules[i].init(vdata);
                }
            };
        }
    };
    exports.init = orderprocess.init.call(orderprocess);
});

