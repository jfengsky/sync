/*
 * @Author xiesj:
 * @Date   2014-05-13:
 * @Desc   详细页中的  收藏功能: 
 */
define(function (require, exports, module) {  
    var $ = require("../../../lib/jquery"),
		_ = require('underscore'),
		Favories = {};
    Favories.Gobal = { 
        "param1": {
            "ProductID": GV.app.detail.data.ProductID,
            "StartCity": GV.app.detail.data.StartCityID,
            "SaleCity": GV.app.detail.data.SalesCity,
            "StartDate": "",
            "EndDate": "",
            "Phone": 0,
            "Email": "",
            "FavoriteID": 0,
            "OpMode": 1,
            "Price":0,
            "SourceFrom": "WebSite"
        },
        "url": "/Booking/Ajax/DetailNew/ProductFavoriteAndSubscription.ashx",
        debug: true,
        addStyle: function (pageStyle) {
            var a = pageStyle, b = document.createElement("style");
            b.type = "text/css";
            try {
                b.appendChild(document.createTextNode(a))
            } catch (c) {
                b.styleSheet.cssText = a
            }
            document.body.appendChild(b)
        },tips:{phone:"手机号码",email:"邮箱"}
    };
    //1-验证产品是否收藏，2-添加产品收藏，3-取消产品收藏, 4-添加产品订阅 
    Favories.handlControl = function (value1, faileFn) {

        function successFn(dataS) {
            //todo className;
            var data = dataS || {
                "favoriteInfo": {
                    "errno": 0,
                    "errmsg": "",
                    "data": [{
                        "Key": "FavoriteId",
                        "Value": "100"
                    }, {
                        "Key": "StartCityId",
                        "Value": "2"
                    }]
                },
                "subscriptionInfo": {
                    "errno": 0,
                    "errmsg": "",
                    "data": [{
                        "Key": "SubscriptionInfoId",
                        "Value": "100"
                    }, {
                        "Key": "StartCityId",
                        "Value": "2"
                    }]
                }
            };
            //todo  样式。
            function fav_failFn() {
                //todo  测试失败的时候
                //收藏 失败
                if (Favories.Gobal.param1.OpMode == 2) {
                    alert("收藏失败！");
                    Favories.Gobal.param1.FavoriteID = 0;
                } else
                //取消收藏 失败
                    if (Favories.Gobal.param1.OpMode == 3) {
                        alert("取消收藏失败！");
                    } else {
                        //$("#js_divFav").hide();
                        //alert("对不起，网络异常，请尝试刷新");
                    }
                //$("#js_divFav").show();
            };
            var hasFavclass = "collected";
            //$("#js_divFav").hide();
            // 数据绑定
            if (data.hasOwnProperty("favoriteInfo") && data.hasOwnProperty("subscriptionInfo")) {
                var dataFav = data["favoriteInfo"];
                var dataSub = data["subscriptionInfo"];
                if (dataFav["errno"] === 0 || dataSub["errno"] === 0) {
                    // 收藏 handle
                    if (Favories.Gobal.param1.OpMode != 4) {
                        $("#js_divFav").show();
                        // 对于 是否 收藏过的 处理
                        if (dataFav["errno"] === 0) {
                            var item = '';
                            for (var i = 0, length = dataFav["data"].length; i < length; i++) {
                                item = dataFav["data"][i];
                                if (item["Key"] == "FavoriteId") {
                                    // 取消成功 与 收藏成功的 共同点 。item["Value"]>0
                                    if (item["Value"] > 0) {
                                        Favories.Gobal.param1.FavoriteID = item["Value"];
                                        $("#js_collect_btn").attr("title", "取消收藏");
                                        $("#js_collect_btn").addClass('collected');

                                        //收藏 成功 
                                        if (Favories.Gobal.param1.OpMode == 2) {
                                            Favories.Gobal.param1.FavoriteID = item["Value"];
                                            $("#js_label_collect_pop").show();
                                        }
                                        //取消收藏 成功 
                                        if (Favories.Gobal.param1.OpMode == 3) {
                                            Favories.Gobal.param1.FavoriteID = 0;
                                            $("#js_collect_btn").removeClass(hasFavclass);
                                            $("#js_label_collect_pop").hide();
                                            $("#js_collect_btn").attr("title", "收藏");
                                        }
                                    }
                                }
                            }
                        } else {
                            fav_failFn();
                        }
                    } else {
                        // 订阅 handle
                        $("#js_divFav").show();
                        $("#js_label_collect_pop").hide();
                        $("#js_collect_btn").addClass(hasFavclass);
                        $("#js_collect_btn").attr("title", "取消收藏");
                        $("#js_collect_btn").addClass('collected');
                    }
                } else {
                    fav_failFn();
                }
            };

        };
        $.ajax({
            url: Favories.Gobal.url,
            type: 'GET',
            dataType: 'json',
            cache:false,
            data: Favories.Gobal.param1
        })
		.done(function (data) {
		    successFn(data);

		})
		.fail(function (data) {
		    if (faileFn) {
		        faileFn(data);
		    }
		});
    };
    Favories.bindEvent = function (argument) {
        var self = Favories,
			curentDate = new Date();

        function initSubscription() {
            // 初始化 订阅 的 输入框
            $("#js_errorTips").html("");
            $("#js_goEndTime").css("background-image", "");
            $("#js_goStartTime").css("background-image", "")
            $("#js_label_collect_pop").find("input").val("");
            var tips=Favories.Gobal.tips;
             (function (){
	        	var data=GV.app.detail.data;
	        	//暗注释
	        	if(data.hasOwnProperty("Mobile")&&data.hasOwnProperty("Email")){
	        		$("#js_informPhone").val(data["Mobile"]);
	                $("#js_informEmail").val(data["Email"]);
	                if($.trim(data["Mobile"]).length===0){
	                	$("#js_informPhone").addClass("inputSel");
	                	$("#js_informPhone").val(tips.phone);
	                }else{
	                	$("#js_informPhone").removeClass("inputSel");
	                }
	                if($.trim(data["Mobile"]).length===0){
	                	$("#js_informEmail").addClass("inputSel");
	                	$("#js_informEmail").val(tips.email);
	                }else{
	                	$("#js_informEmail").removeClass("inputSel");
	                }
	        	}
               
	        	var waterFn= function (sid,defaltValue){
                    $("#"+sid).unbind('focus').bind('focus',function() {
                    	if($.trim($(this).val())==defaltValue){
                    		$(this).val("");
                    		$(this).removeClass("inputSel");
                    	}
                    });
                    $("#"+sid).unbind('blur').bind('blur',function() {
                    	if($.trim($(this).val())==""){
                    		$(this).val(defaltValue);
                    		$(this).addClass("inputSel");
                    	}
                    });
	        	}
	            waterFn("js_informPhone",tips.phone);
                waterFn("js_informEmail",tips.email);
            })();
        }
        // 收藏的 功能
        $("#js_collect_btn").bind("click", function (argument) {
            //未登录的用户
            if (GV.app.detail.isLogin != 1) {
                //todo 登录框的处理 mask。 markShow();__SSO_booking_1
                __SSO_loginShow_1('startSubmitFav', true, '1', true);
                return false;
            }
            // 
            // if($("#js_label_collect_pop").css("display")=="block"){
            //     return false;
            // };
            if (Favories.Gobal.param1.FavoriteID > 0) {
                Favories.Gobal.param1.OpMode = 3;
            } else {
                Favories.Gobal.param1.OpMode = 2;
                initSubscription();
            }
            self.handlControl(Favories.Gobal.param1);
            return false;
        });
        // 	订阅的 功能
        // 	验证通过
        function isvalid() {
            var _regEmail = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/,
				_regMobilePhone = /^([0-9]{11})?$/,
                tips=Favories.Gobal.tips,
                emailDefalut=tips.email,
                phoneDefault=tips.phone;

            if ($("#js_goStartTime").val().length <= 0) {
                return "请填写计划出发时间";
            };
            if ($("#js_goEndTime").val().length <= 0) {
                return "请填写计划出发时间";
            };
            if ($("#js_informPhone").val().length > 0 && $.trim($("#js_informPhone").val())!=phoneDefault && !_regMobilePhone.test($("#js_informPhone").val())) {
                return "您填写的手机号码有误，请重新填写";
            };
            if ($("#js_informEmail").val().length > 0 && $.trim($("#js_informEmail").val())!=emailDefalut && !_regEmail.test($("#js_informEmail").val())) {
                return "请填写正确的E-mail地址，格式：a@b.c";
            };
            if ($.trim($("#js_informEmail").val())==emailDefalut && $.trim($("#js_informPhone").val())==phoneDefault) {
                return "手机号码或邮箱至少选填一项";
            }
            return "";
        };
        //订阅操作
        $("#js_book_message_btn").bind("click", function (argument) {
            var resultMsg = isvalid(),
                tips=Favories.Gobal.tips,
                emailDefalut=tips.email,
                phoneDefault=tips.phone;

            if (resultMsg.length > 0) {
                $("#js_errorTips").html("<i></i>" + resultMsg).show();
                return false;
            }

            Favories.Gobal.param1.OpMode = 4;
            Favories.Gobal.param1.StartDate = $("#js_goStartTime").val();
            Favories.Gobal.param1.EndDate = $("#js_goEndTime").val();
            Favories.Gobal.param1.Phone =  $.trim($("#js_informPhone").val())!=phoneDefault ?$("#js_informPhone").val():'';
            Favories.Gobal.param1.Email =$.trim($("#js_informEmail").val())!=emailDefalut? $("#js_informEmail").val():'';
            // em  对应的实时计价
            Favories.Gobal.param1.Price=$("#J_total_price").size()>0&&$("#J_total_price").find("em").size()>0?$("#J_total_price").text().replace("¥","").replace("起",""):0;
            self.handlControl(Favories.Gobal.param1);

            return false;
        });

        $("#js_divFav").find(".close").bind("click", function () {
            $("#js_label_collect_pop").hide();
        });
        var day;
        Favories.Gobal.addStyle('.label_collect a.collected:hover, #js_divFav a.hasFavclass{background-position:-75px -691px;}');
        // 开始 日历事件
        $("#js_goStartTime").attr("readOnly",true);
        $("#js_goEndTime").attr("readOnly",true);
        cQuery('#js_goStartTime').regMod('calendar', '6.0', {
            options: {
                minDate: new Date(curentDate.getFullYear(), curentDate.getMonth(), curentDate.getDate() + 1),
                nextEl: "#js_goEndTime"
            },
            listeners: {
                onChange: function (input, value) {
                    var d = value.toDate();
                    var startTime = $("#js_goStartTime").val();
                    var endTime = $("#js_goEndTime").val();
                    if (new Date(startTime) > new Date(endTime)||$.trim(endTime).length<=0) {
                        $("#js_goEndTime").val("");
                    }
                    $("#js_goEndTime").val("");
                    $("#js_goEndTime").css("background-image","none");
                    cQuery('#js_goEndTime').data('startDate', new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1));
                    cQuery('#js_goEndTime').data('minDate', new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1));
                    cQuery('#js_goEndTime').data('maxDate', new Date(d.getFullYear(), d.getMonth() + 3, d.getDate() + 1));
                }
            }
        });

        // 结束 日历事件
        cQuery('#js_goEndTime').regMod('calendar', '6.0', {
            options: {
                reference: "#js_goStartTime",
                step: 2
            },
            listeners: {
                onChange: function (input, value) {
                   
                }
            }

        });
        

         
        /*GV.on('startSubmitFav', function() {
        Favories.Gobal.param1.OpMode=2;
        Favories.handlControl(Favories.Gobal.param1);
        alert("欢迎 收藏");
        });*/

    };
    //收藏入口
    Favories.init = function () {
        if (Favories.Gobal.debug) {
            // ProductPattenId=1，4，3，5，15  才有 收藏的功能
            var ProductPattenId = GV.app.detail.data.ProductPattenId,
				list = [1, 4, 3, 5, 15];
            if ($.inArray(ProductPattenId, list) >= 0) {
                $("#js_collect_btn").attr("title", "收藏");
                $("#js_collect_btn").removeClass('collected');
                $("#js_divFav").show();
                Favories.Gobal.param1.OpMode = 1;
                if (GV.app.detail.isLogin == 1) {
                    Favories.handlControl(Favories.Gobal.param1);
                };
                // 事件绑定
                Favories.bindEvent();
            }
        }
    };
    module.exports = Favories;
});