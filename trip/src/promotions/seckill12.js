(function ($) {
    var defaults = {
        container: "",
        originalDom: "",
        startTime: 12,
        pageid: 1,
        disableClass: "detail-btn-booking-disable qz-booking-btn-disable",
        disableClassNextBtn: "btn_disabled"
    };
    var millisec = 1, sec = 1000 * millisec, min = sec * 60, hour = min * 60,
    timeShow = { allmillsec: 0, hour: 0, min: 0, sec: 0, millisec: 0 },
    url = "http://vacations.ctrip.com/package-booking-fc/Handler2/ProductSecondKill.ashx";
    var createDialog = function () {
        var bookingdialog = '<div data-type="1" style="margin-left: 20px; display: none;" id="bookingdialog" class="detail_masking for_order">';
        bookingdialog += '<h2><a onclick="maskShow(false);" alt="" href="###"></a>预订提示</h2>';
        bookingdialog += '<div class="masking_padding"><div style="display:none" class="c_loading detail_loading">';
        bookingdialog += '<img alt="" src="http://pic.c-ctrip.com/packages111012/loading_50-0816.gif"><strong class="font16">查询中，请稍候...</strong></div>';
        bookingdialog += '<div class="wait" style="display:none">抢购太火爆了，请在点击确定后重新尝试。</div>';
        bookingdialog += '<div class="masking_button" style="padding:20px 0 0 245px"><a href="###" style="display:block;text-align:center;text-decoration:none" id="gowait" class="btn">确定</a></div>';
        bookingdialog += '</div></div>';
        $(document.body).append(bookingdialog);
    };
    createDialog();
    // 隐藏登录框
    $("#loginDivLi").hide();

    $.fn.countDown = function (options) {
        var settings = $.extend({}, defaults, options);
        var startCD, cdValue, disableClass = settings.disableClass, disableClassNextBtn = settings.disableClassNextBtn;
        var $nextBtn = $("#journeyBox").find(".masking_button input");
        var NextBtn = $nextBtn[0];
        var startDate = new Date("2013/12/12 " + settings.startTime + ":00:00 GMT+0800");
        var paramValue = window.location.href.match(/dd=(\d+)&hh=(\d+)&mm=(\d+)/);
        if (!!paramValue) {
            startDate.setDate(paramValue[1]);
            startDate.setHours(paramValue[2]);
            startDate.setMinutes(paramValue[3]);
            startDate.setSeconds(0);
            startDate.setMilliseconds(0);
        };
        return this.each(function () {
            var $this = $(this);
            if (this.className.indexOf("detail-btn-booking-disable") > -1) { disableClass = "detail-btn-booking-disable"; }
            if (this.className.indexOf("qz-booking-btn-disable") > -1) { disableClass = "qz-booking-btn-disable"; }
            var counddown = setInterval(showControl, sec);
            var checkavil;
            $("#gowait").bind("click", function () { maskShow(false); });
            //checkAvailable();
            function showControl() {
                startCD = new Date();
                timeShow.allmillsec = startDate - startCD;
                if (timeShow.allmillsec < 1) {
                    $("#ctl00_MainContentPlaceHolder_divAlert, #ctl00_MainContentPlaceHolder_AlertBox").hide();
                    clearInterval(counddown);
                    $this.removeClass(settings.disableClass).html("开始预订");
                    if (!!NextBtn) {
                        NextBtn.className = "btn";
                        NextBtn.disabled = false;
                        NextBtn.value = "进入预订";
                    }
                    $this.bind("click", function () {
                        //$(".wait").hide();
                        $(".wait").show();
                        $(".go").hide();
                        $("#gowait").attr("href", "###");
                        if (timeShow.allmillsec < -1800000) {
                            $(".wait").html("您选择的产品已经售罄。");
                            $this.unbind("click");
                            $this.addClass(disableClass).html("产品售罄");
                            if (!!NextBtn) {
                                $nextBtn.unbind("click");
                                NextBtn.className = disableClassNextBtn;
                                NextBtn.value = "产品售罄";
                            }
                            maskShow($("#bookingdialog")[0], true);
                        }
                        else if ("wait".getCookie()) {
                            maskShow($("#bookingdialog")[0], true);
                        }
                        else {
                            $.ajax({
                                url: url,
                                type: "GET",
                                dataType: "jsonp",
                                jsonp: "callback",
                                jsonpCallback: "jsonpcallback",
                                data: "pid=" + settings.pageid,
                                timeout: 3000,
                                success: function (json) {
                                    if (json.ErrorNo == 0 && !!json.Data.Access) {
                                        $(".wait").html("请点击确定后尽快进入订单页下单。");
                                        $("#gowait").attr("href", json.Data.Url);
                                    }
                                    else if (json.ErrorNo == -1) {
                                        $(".wait").html(json.ErrorMsg);
                                    }
                                    else if (json.ErrorNo == -2 || json.ErrorNo == -3 || json.ErrorNo == -5) {
                                        //$(".wait").html(json.ErrorMsg);
                                        $(".wait").html("抢购太火爆了，请在点击确定后重新尝试。");
                                        // 写入cookie，单分钟20秒内禁止再次请求ajax
                                        SetCookie("wait", 1, 20);
                                    }
                                    else if (json.ErrorNo == -4) {
                                        $(".wait").html(json.ErrorMsg);
                                        $this.unbind("click");
                                        $this.addClass(disableClass).html("秒杀结束");
                                        if (!!NextBtn) {
                                            $nextBtn.unbind("click");
                                            NextBtn.className = disableClassNextBtn;
                                            NextBtn.value = "秒杀结束";
                                        }
                                    }
                                    else if (json.ErrorNo == -6) {
                                        $(".wait").html(json.ErrorMsg);
                                        $this.unbind("click");
                                        $this.addClass(disableClass).html("产品售罄");
                                        if (!!NextBtn) {
                                            $nextBtn.unbind("click");
                                            NextBtn.className = disableClassNextBtn;
                                            NextBtn.value = "产品售罄";
                                        }
                                    }
                                    else {
                                        $(".wait").html("抢购太火爆了，请在点击确定后重新尝试。");
                                        $("#gowait").attr("href", window.location.href.match(/[^?#]+/));
                                    }
                                    maskShow($("#bookingdialog")[0], true);
                                },
                                error: function () {
                                    $(".wait").html("抢购太火爆了，请在点击确定后重新尝试。");
                                    $("#gowait").attr("href", window.location.href.match(/[^?#]+/));
                                    maskShow($("#bookingdialog")[0], true);
                                }
                            });
                        };
                    });
                    //checkavil = setInterval(checkAvailable, min);

                    $nextBtn.bind("click", function () {
                        maskShow(false);
                        $this.trigger("click");
                        return false;
                    });

                }
                else {
                    $this.css("color", "#733D02");
                    timeShow.hour = parseInt(timeShow.allmillsec / hour);
                    timeShow.min = parseInt(timeShow.allmillsec % hour / min);
                    timeShow.sec = parseInt(timeShow.allmillsec % hour % min / sec);
                    if (timeShow.hour < 10) timeShow.hour = "0" + timeShow.hour;
                    if (timeShow.min < 10) timeShow.min = "0" + timeShow.min;
                    if (timeShow.sec < 10) timeShow.sec = "0" + timeShow.sec;
                    cdValue = "倒计时 " + timeShow.hour + ":" + timeShow.min + ":" + timeShow.sec;
                    $this.html(cdValue);
                    if (!!NextBtn) { NextBtn.value = cdValue; }
                }
            }



            function checkAvailable() {
                $.ajax({
                    url: url,
                    type: "GET",
                    dataType: "jsonp",
                    jsonp: "callback",
                    jsonpCallback: "jsonpcallback",
                    data: "pid=" + settings.pageid,
                    success: function (json) {
                        if (json.ErrorNo == -6) {
                            clearInterval(counddown);
                            clearInterval(checkavil);
                            $this.unbind("click");
                            $nextBtn.unbind("click");
                            $this.addClass("disable-btn-booking").html(json.ErrorMsg);
                        }
                    }
                });
            }

            function SetCookie(name, value, expire) {
                var now = new Date,
                nextMin = new Date(now);
                nextMin.setMinutes(now.getMinutes() + 1);
                nextMin.setSeconds(0);
                nextMin.setMilliseconds(0);
                if (nextMin.getTime() - now.getTime() > expire * sec) {
                    name.setCookie(value, expire);
                }
                else {
                    name.setCookie(value, nextMin.toUTCString());
                }
            }
        })
    }

    String.prototype.getCookie = function () {
        var reg = new RegExp("\\b" + this + "\\s*=\\s*([^;]*)", "i"),
        cookieResult = reg.exec(document.cookie);
        return cookieResult && cookieResult.length > 1 ? cookieResult[1] : ""
    };

    String.prototype.setCookie = function (value, expiresTime, domain, path, secure) {
        var expiresDate;
        var _cookie = [this, "=", value];
        var _date;
        if (-1 == expiresTime) {
            expiresDate = "Fri, 31 Dec 1999 23:59:59 GMT"
        } else {
            if (isNaN(expiresTime)) {
                expiresDate = expiresTime;
            }
            else {
                _date = new Date;
                _date.setTime(_date.getTime() + expiresTime * 1000);
                expiresDate = _date.toUTCString();
            }
        }
        expiresDate && _cookie.push(";expires=", expiresDate);
        domain && _cookie.push(";domain=", domain);
        path && _cookie.push(";path=", path);
        secure && _cookie.push(";secure");
        document.cookie = _cookie.join("");
    };

    $(document).find("a").each(function (index, element) {
        if (!!$(element).attr("href") && /^(?!(http)|[?#]|(javascript))/.test($.trim($(element).attr("href")))) {
            $(element).attr("href", "http://vacations.ctrip.com" + $(element).attr("href"));
        }
    });
    $("#questionLoading").hide();
    $("#pkg-detail-tab1").find(".pkg-booking-btn-disable").hide();


})(jQuery)

var pathname = window.location.pathname;
jQuery(".detail-btn-booking").countDown({ pageid: pathname.substring(pathname.lastIndexOf("/") + 1, pathname.lastIndexOf(".")), startTime: 12 });