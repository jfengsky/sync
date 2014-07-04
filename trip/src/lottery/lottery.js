define(function (require, exports, module) {
    var $ = require('./rotate'),
		bgwindow = require('./bgwindow');

    var tpl = {
        prizeWinner: '<li>{{Prize}}: {{Uid}}</li>',
        prize1: '<div class="floatboxes" id="abcd1">\
					<div style="margin:0 auto; position:relative">\
        				<div class="close"><a href="javascript:void(0)" class="popupContactClose">×</a></div>\
    					<div class="zjts">\
	        				<h3>恭喜您，获得{{ award }}元优惠券!</h3>\
	            			<h4>请进入个人中心-资产账户-优惠券中查看</h4>\
    					</div>\
					</div>\
				</div>',
        prize2: '<div class="floatboxes" id="abcd2">\
					<div style="margin:0 auto; position:relative">\
	       				<div class="close"><a href="javascript:void(0)" class="popupContactClose">×</a></div>\
	    				<div class="zjts">\
	        				<h3>恭喜您，获得{{ award }}!</h3>\
	            			<h4>请留下联系方式，方便工作人员为您发放奖</h4>\
	            			<form method="post" action="">\
	            			<ul>\
	           					<li><span>姓名：</span><input type="name" class="txt" maxLength="11" id="username" style="color:#ccc" placeholder="请输入姓名"></li>\
	            				<li><span>电话：</span><input type="tel" class="txt"  maxLength="11" id="userphone" style="color:#ccc" placeholder="请输入联系电话"></li>\
	            				<li><span>地址：</span><input type="add" class="txt"  maxLength="11" id="useradd" style="color:#ccc" placeholder="请输入联系地址"></li>\
	            			</ul>\
	            			</form>\
	            			<a href="javascript:;">提交</a>\
	    				</div>\
					</div>\
				</div>',
        noprize: '<div class="floatboxes" id="noprize">\
					<div style="margin:0 auto; position:relative">\
        				<div class="close"><a href="javascript:void(0)" class="popupContactClose">×</a></div>\
    					<div class="zjts">\
	        				<h3>{{ data }}</h3>\
    					</div>\
					</div>\
				</div>'
    };

    $(function () {
        awardWinner();
        $("#lot-btn").click(lotBtnRotate);
    });

    function lotBtnRotate() {
        $("#lot-btn").unbind('click');
        if (window.GV_CONFIG.isLogin) {
            $.getJSON('/Package-Booking-VacationsOnlineSiteUI/Handler2/RouletteHandler.ashx?do={Uid:"' + window.GV_CONFIG.user + '",RequestType:1, ss: ' + Math.random() + '}', function (context) {
                // context = {"IsSuccess":true,"Data":{"NeedSubmitInfo":false, "CanNext": true, "Prize":"一等奖"},"ErrMsg":0,"ErrCode":0} 
                var prize = '';
                if (context.ErrCode === 0 && context.Data && !context.Data.NeedSubmitInfo) {
                    if (context.Data.CanNext) {
                        prize = context.Data.Prize;
                        switch (prize) {
                            case '特别大奖':
                                roateAngle(240);
                                break;
                            case '一等奖':
                                roateAngle(180);
                                break;
                            case '二等奖':
                                roateAngle(120);
                                break;
                            case '三等奖':
                                roateAngle(60);
                                break;
                            case '十元奖':
                                roateAngle(300);
                                break;
                            default:
                                roateAngle(360);
                                break;
                        }
                    } else {
                        $('.floatboxes').remove();
                        $('body').append((Handlebars.compile(tpl.noprize))({ data: '今天你的抽奖机会用完了。' }));
                        bgwindow.popUp('noprize');
                        $("#lot-btn").bind('click', lotBtnRotate);
                    }
                } else if (context.Data && context.Data.NeedSubmitInfo) {
                    if (!$('#abcd2').length) {
                        if (context.Data.Prize === '一等奖') {
                            $('body').append((Handlebars.compile(tpl.prize2))({ award: 'iPad Mini一台' }));
                            submitInfo();
                        } else {
                            $('body').append((Handlebars.compile(tpl.prize2))({ award: '韩国双人游' }));
                            submitInfo();
                        }
                    }
                    bgwindow.popUp('abcd2');
                    $("#lot-btn").bind('click', lotBtnRotate);
                } else {
                    $('.floatboxes').remove();
                    $('body').append((Handlebars.compile(tpl.noprize))({ data: '网络超时' }));
                    bgwindow.popUp('noprize');
                    $("#lot-btn").bind('click', lotBtnRotate);
                }
            });
        } else {
            $("#lot-btn").bind('click', lotBtnRotate);
            __SSO_loginShow('lot-btn', true, "0", true);
            // window.location.reload();	
        }
    };

    function roateAngle(prize) {
        $('#imgs').rotate({
            angle: 0,
            animateTo: prize + 3240,
            duration: 10000,
            callback: function () {
                $("#lot-btn").bind('click', lotBtnRotate);
                $('.floatboxes').remove();
                if (prize === 300) {
                    $('body').append((Handlebars.compile(tpl.prize1))({ award: 10 }));
                    bgwindow.popUp('abcd1');
                } else if (prize === 60) {
                    $('body').append((Handlebars.compile(tpl.prize1))({ award: 100 }));
                    bgwindow.popUp('abcd1');
                } else if (prize === 120) {
                    $('body').append((Handlebars.compile(tpl.prize1))({ award: 1000 }));
                    bgwindow.popUp('abcd1');
                } else if (prize === 180) {
                    $('body').append((Handlebars.compile(tpl.prize2))({ award: 'iPad Mini一台' }));
                    submitInfo();
                } else if (prize === 240) {
                    $('body').append((Handlebars.compile(tpl.prize2))({ award: '韩国双人游' }));
                    submitInfo();
                } else {
                    $('body').append((Handlebars.compile(tpl.noprize))({ data: '很遗憾，你没能中奖！' }));
                    bgwindow.popUp('noprize');
                }
            }
        });
    }

    function submitInfo() {
        bgwindow.popUp('abcd2');
        $('#abcd2 .zjts a').click(function () {
            var username = $('#username').val(),
							userphone = $('#userphone').val(),
							useradd = $('#useradd').val();
            if (username === '' || username === '姓名格式不对') {
                $('#username').val('姓名格式不对').css('color', 'red');
            } else if (!/^(\+86)?[1][3-8]\d{9}/.test(userphone)) {
                $('#userphone').val('联系方式格式不对').css('color', 'red');
            } else if (!/[\u4e00-\u9fa5]{6,}/.test(useradd)) {
                $('#useradd').val('请输入详细地址').css('color', 'red');
            } else {
                $.post('/Package-Booking-VacationsOnlineSiteUI/Handler2/RouletteHandler.ashx?do={Uid:"' + window.GV_CONFIG.user + '",RequestType:2, UserName: "' + $('#username').val() + '", ContactWay: "' + $('#userphone').val() + '", ContactAddress: "' + $('#useradd').val() + '"}', function (context) {
                    //context = {"IsSuccess":true,"Data":true,"ErrMsg":'成功',"ErrCode":0} 
                    if (context.ErrCode === 0 && context.Data) {
                        $('.floatboxes').remove();
                        $('body').append((Handlebars.compile(tpl.noprize))({ data: context.ErrMsg || '提交成功' }));
                        $('.floatboxes').show();
                        bgwindow.popUp('noprize');
                    } else {
                        $('.floatboxes').remove();
                        $('body').append((Handlebars.compile(tpl.noprize))({ data: context.ErrMsg || '网络超时' }));
                        $('.floatboxes').show();
                        bgwindow.popUp('noprize');
                    }
                    $('#abcd2').remove();
                }, 'json');
            }
        });
    }


    function awardWinner() {
        $.getJSON('/Package-Booking-VacationsOnlineSiteUI/Handler2/RouletteHandler.ashx?do={Uid:"' + window.GV_CONFIG.user + '",RequestType:3}', function (context) {
            var data = null,
				template = Handlebars.compile(tpl.prizeWinner),
				target = $('#md ul'),
				targetF = $('#demo2 ul');
            if (context.ErrCode === 0 && context.Data) {
                for (var i = 0, l = context.Data.length; i < l; i++) {
                    data = context.Data[i];
                    target.append(template(data));
                    targetF.append(template(data));
                }
            }

            var demo = document.getElementById('zjmd');
            var md = document.getElementById("md");
            var demo2 = document.getElementById("demo2");
            function Marquee() {
                if (demo.scrollLeft - demo2.offsetWidth >= 0) {
                    demo.scrollLeft -= md.offsetWidth;
                } else {
                    demo.scrollLeft++;
                }
            }

            var myvar = setInterval(Marquee, 30);
            $('#zjmd').hover(
				function () {
				    clearInterval(myvar);
				},
				function () {
				    myvar = setInterval(Marquee, 30);
				}
			);
        });
    }
});