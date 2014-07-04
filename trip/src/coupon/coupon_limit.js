define(function(require, exports) {
  var $ = require("../../../lib/jquery.js"),
    isLogin = false,
    cookie = [],
    time = new Date().addMinutes(15), /*Cookie超时时间*/
    template = "",
    json = {};
    GV.app.coupon = {
      tpl: '<div class="floatboxes" id="Js_floatboxes">\
                 <div style="margin:0 auto;position:relative">\
                      <div class="close"><a href="javascript:void(0)" class="Js_floatboxes_close">x</a></div>\
                        <div class="tit">提示</div>\
                        <div class="yzBg2">\
                         <p>\
                            {{#is data "===" "success"}}亲，你已经成功领取优惠券！{{/is}}\
                            {{#is data "===" "again"}}亲，您已领取过优惠券，下次再来吧！{{/is}}\
                            {{#is data "===" "error"}}系统繁忙，请稍候再试!{{/is}}\
                            {{#is data "===" "busy"}}当前领取券的人数太多，请稍候再试!{{/is}}\
                         </p>\
                         <ul>\
                         <li>\
                         <a class="Js_floatboxes_close btn1" href="javascript:void(0)">返回活动 </a>\
                        </li>\
                        {{#if promo}}\
                         <li>\
                         <a href="https://sinfo.ctrip.com/Balance/zh-cn/Promocode.aspx" class="btn2">查看优惠券</a>\
                         </li>\
                         {{/if}}\
                         </ul>\
                     </div>\
                </div>',
      /*获取当前时间*/
      nowTime: function() {
        var data = new Date(),
            formatDate = function(str) {
              if (str >= 10) return str;
              else return "0" + str;
            };
            return data.getFullYear() + "/" + formatDate(data.getMonth() + 1) + "/" + formatDate(data.getDate()) + " " + formatDate(data.getHours()) + ":" + formatDate(data.getMinutes()) + ":" + formatDate(data.getSeconds());
      },
      /*判断产品是否在使用日期*/
      dateComparison: function(ptoday, pfuture) {
        if (new Date(Date.parse(pfuture)) >= new Date(Date.parse(ptoday))) return 0;
        else return 1;
      },
      /*获取用户登录情况*/
      isLogin: function() {
        $.getJSON(GV.app.coupon.jsonURL + "?requestType=1&callback=?", function(data) {
          if (data.IsLogin) isLogin = true;
        })
      },
      /*获取优惠券的券数*/
      getCoupon: function() {
        var infoLen = $(".couponinfo").length;
            sendLen = $(".couponsend").length;
            for (var j = 0; j < sendLen; j++) {
              (function(key) {
                $.getJSON(GV.app.coupon.jsonURL + "?requestType=2&couponCode=" + $(".couponsend").eq(key).data("couponCode") + "&callback=?", function(datas) {
                  cookie[key] = {
                    couponCode: $(".couponsend").eq(key).data("couponCode"),
                    couponNum: datas.data.ticket
                  }
                  cQuery.cookie.set("coupon", key, cQuery.stringifyJSON(cookie[key]), {
                    expires: time
                  });
                  if (datas.data.ticket > 0) {
                    if (infoLen) $(".couponinfo").eq(key).html("券数还剩" + datas.data.ticket + "张");
                  } 
                  else{
                    $(".couponlink").eq(key).html("券已经领完了");
                    $(".couponlink").eq(key).data("click",false);
                    if (infoLen) $(".couponinfo").eq(key).html("券数还剩0张");
                  } 
                });
              })(j)
            }
      },
      /*关闭蒙版层*/
      closeMask: function() {
      $("body").append(template);
        cQuery("#Js_floatboxes").mask();
         $(".Js_floatboxes_close").bind("click", function() {
          cQuery("#Js_floatboxes").unmask();
          $("#Js_floatboxes").remove();
          template = "";
          json = {};
        })
      },
      initCoupon: function() {
       if (!$(".couponsend").length || !$(".couponlink").length) return;
        GV.app.coupon.isLogin();
        var couponConfig = GV.app.coupon.couponConfig,
            couponLen = couponConfig.length,
            linkLen = $(".couponsend").length;
            $(".couponlink").data("use", true);
            for (var i = 0; i < linkLen; i++) {
              for (var k = 0; k < couponLen; k++) {
                 /*判断券是否在使用期内*/
                if ($(".couponsend").eq(i).attr("id") == couponConfig[k].pageid) {
                  $(".couponsend").eq(i).data("couponCode", couponConfig[k].couponCode);
                  if (GV.app.coupon.dateComparison(GV.app.coupon.nowTime(), couponConfig[k].startDate) == 0) {
                    $(".couponlink").eq(i).html("活动还没开始");
                    $(".couponlink").eq(i).data("click",false);
                  } 
                  else if (GV.app.coupon.dateComparison(GV.app.coupon.nowTime(), couponConfig[k].endDate) == 1) {
                    $(".couponlink").eq(i).html("活动已经结束");
                    $(".couponlink").eq(i).data("click",false);
                  } 
                  else {
                    $(".couponlink").eq(i).html("立即领取");
                    $(".couponlink").eq(i).data("click",true);
                  }
                  break;
                }
              }
            }
            /*先从cookie中获取券的信息*/
            if (cQuery.cookie.get("coupon")) {
                var cookieDate = cQuery.cookie.get("coupon").replace(/&\d+=/g, "@").split("@"),
                  cookieLen = cookieDate.length;
                  if (cookieLen == linkLen) {
                    for (var m = 0; m < linkLen; m++) {
                      for (var n = 0; n < cookieLen; n++) {
                        /*判断券是否在使用期内*/
                        if ($(".couponsend").eq(m).data("couponCode") == $.parseJSON(cookieDate[n]).couponCode) {
                          if ($.parseJSON(cookieDate[n]).couponNum <= 0) {
                            $(".couponlink").eq(m).html("券已经领完了");
                            $(".couponlink").eq(m).data("click",false);
                          }
                          break;
                        }
                      }
                    }
                  } 
                  else {
                    GV.app.coupon.getCoupon();
                  }
             } 
             else {
              GV.app.coupon.getCoupon();
            }
            /*领取优惠券*/
            $("body").delegate(".couponlink","click",function(){
                if (isLogin) {
                var that = this;
                  if ($(that).data("use") && $(that).data("click")) {
                       $(that).data("use", false);
                       $(that).html("领取中...");
                       $.getJSON("http://vacations.ctrip.com/package-booking-fc/Handler2/ProductSecondKill2.ashx?callback=?").success(function(data){
                        //-4表示关闭该功能
                         if(data.ErrorNo == 0 || data.ErrorNo == -4){
                             $.getJSON(GV.app.coupon.jsonURL + "?requestType=3&couponCode=" + $(that).parents(".couponsend").data("couponCode") + "&callback=?").success(function(data){
                                  /*领取成功*/
                                  if (data.errNo == 1) {
                                    json.data = "success";
                                    json.promo = "success";
                                    template = Handlebars.compile(GV.app.coupon.tpl)(json);
                                    $(that).html("已领取");
                                  } 
                                   /*已经领取*/
                                  else if (data.errNo == -5) {
                                    json.data = "again";
                                    template = Handlebars.compile(GV.app.coupon.tpl)(json);
                                    $(that).html("已领取");
                                  } 
                                  /*系统异常*/
                                  else {
                                    json.data = "error";
                                    template = Handlebars.compile(GV.app.coupon.tpl)(json);
                                    $(that).html("立即领取");
                                    $(that).data("use", true);
                                  }
                                  GV.app.coupon.closeMask();
                                 }).error(function(){
                                   $(that).html("立即领取");
                                   $(that).data("use", true);
                               })
                         }
                         /*领用限制*/
                         else{
                            json.data = "busy";
                            template = Handlebars.compile(GV.app.coupon.tpl)(json);
                            GV.app.coupon.closeMask();
                             $(that).html("立即领取");
                             $(that).data("use", true);
                         }
                         }).error(function(){
                         $(that).html("立即领取");
                         $(that).data("use", true);
                      })
                     
                }
              } else {
                /*用户没有登录*/
                window.location.href = "https://accounts.ctrip.com/member/login.aspx?BackURL=" + location.href + "&responsemethod=get";
              }
            })
           }
    }
    exports.initCoupon = GV.app.coupon.initCoupon;
})