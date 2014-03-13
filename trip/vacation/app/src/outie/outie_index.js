/**
 * 欧铁首页改版
 * @author hybu@ctrip.com
 * @createdate: 2013/12/25
 */
define(function(require, exports, module) {
    var $ = require('./../../../lib/jquery');

    cQuery.mod.load('notice', '1.0', function() {});
    cQuery.mod.load('validate', '1.1', function() {});
    cQuery.mod.load('address', '1.0', function() {});
    cQuery.mod.load('calendar', '3.0', function() {});
    cQuery.mod.load('lazyLoad', '1.0', function() {});
    // 公用validate控件实例
    var cqRegValid = cQuery(document).regMod('validate', '1.1');

    var outieIndex = {
        common: { //公用的函数
            render: function(tpl, data, handle, cb) {
                var Template = Handlebars.compile(tpl);
                var html = Template(data);
                typeof handle === 'function' && handle.call(this, html);
                typeof cb === 'function' && cb.call(this, html);
                return html;
            },
            fetchData: function(opts, cb) { //ajax
                var self = this;
                $.ajax({
                    type: opts.method || 'POST',
                    url: opts.url || self.config.fetchUrl,
                    data: opts.data,
                    dataType: opts.type || 'json',
                    // timeout : 5000,
                    success: function(data) {
                        cb.call(self, data);
                    },
                    error: function(msg) {
                        // alert(msg)
                    }
                });
            },
            createMaskPop: function(tpl) {
                var jTpl = $(tpl);
                var popId = jTpl.prop('id');
                $('body').append(jTpl);

                var cqPopup = cQuery('#' + popId);
                cqPopup.mask();

                var cqClose = cqPopup.find('.close');
                cqClose.bind('click', function() {
                    cqPopup.unmask();
                    cqPopup.remove();
                });
                return cqPopup;
            },
            removeMaskPop: function(cqMaskPop) {
                cqMaskPop.unmask();
                cqMaskPop.remove();
            },
            readOnlyDefault: function() {
                $("input[readOnly]").keydown(function(e) {
                    e.preventDefault();
                });
            },
            validNull: function(jWrap) {
                var inputs = jWrap.find('input:not(:disabled)');
                var jCur;
                var value;
                var noticeValue;

                var bRtn = true;

                inputs.each(function() {
                    var me = this;
                    jCur = $(this);
                    value = jCur.val();
                    noticeValue = jCur.attr('_cqnotice');
                    if (value == '' || value == noticeValue) {
                        cqRegValid.method("show", {
                            $obj: cQuery(me),
                            data: '此处不能为空',
                            removeErrorClass: true,
                            isScroll: false
                        });

                        bRtn = false;
                        return false;
                    }
                });
                return bRtn;
            },
            validAddress: function(cqStart, cqDep) {
                var startValue = cqStart.data('data-value');
                var depValue = cqDep ? cqDep.data('data-value') : null;

                if (!startValue) {
                    cqRegValid.method("show", {
                        $obj: cqStart,
                        data: '请重新选择城市',
                        removeErrorClass: true,
                        isScroll: false
                    });
                    return false;
                }
                if (cqDep && !depValue) {
                    cqRegValid.method("show", {
                        $obj: cqDep,
                        data: '请重新选择城市',
                        removeErrorClass: true,
                        isScroll: false
                    });
                    return false;
                }
                if (cqDep && startValue == depValue) {
                    cqRegValid.method("show", {
                        $obj: cqDep,
                        data: '您选择的目的地城市和出发城市相同，请重新选择',
                        removeErrorClass: true,
                        isScroll: false
                    });
                    return false;
                }
                return true;
            },
            /**
             * 判断出发日期和返回日期大小,radioValue如果为2表示往返需要判断大小
             * 为了兼容IE6/7/8，使用new Date('yyyy', 'mm', 'dd').getTime()取得毫秒数比较
             * @param  {jquery} jStartDate 出发日期
             * @param  {jquery} jDepDate   返回日期
             * @param  {string} radioValue 1代表单程2代表往返
             */
            validDate: function(jStartDate, jDepDate, radioValue) {
                var bRtn = true;
                if (radioValue == '2') {
                    var cqDepDate = cQuery(jDepDate[0]);
                    var startDate = jStartDate.val();
                    var aStartDate = startDate.split('-');
                    var depDate = jDepDate.val();
                    var aDepDate = depDate.split('-');

                    var startYear = parseInt(aStartDate[0], 10);
                    var startMonth = parseInt(aStartDate[1], 10);
                    var startDay = parseInt(aStartDate[2], 10);
                    var depYear = parseInt(aDepDate[0], 10);
                    var depMonth = parseInt(aDepDate[1], 10);
                    var depDay = parseInt(aDepDate[2], 10);

                    startDate = new Date(startYear, startMonth, startDay).getTime();
                    depDate = new Date(depYear, depMonth, depDay).getTime();

                    if (startDate > depDate) {
                        bRtn = false;
                        cqRegValid.method("show", {
                            $obj: cqDepDate,
                            data: '您选择的返回日期早于出发日期，请重新选择',
                            removeErrorClass: true,
                            isScroll: false
                        });
                    }
                }
                return bRtn;
            },
            /**
             * 将 Date 转化为指定格式的String
             * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
             * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
             * 例子：
             * var time1 = formatDate(new Date(), "yyyy-MM-dd HH:mm:ss");   ==> 2006-07-02 08:09:04.423
             * var time2 = formatDate(new Date(), 'yyyy-MM-dd');    ==> 2006-7-2 8:9:4.18
             * @param  {date obj} date  new Date()对象
             * @param  {string} fmt  'yyyy-mm-dd'
             * @return {转化为指定格式的String}
             */
            formatDate: function(date, fmt) {
                var o = {
                    "M+": date.getMonth() + 1, //月份 
                    "d+": date.getDate(), //日 
                    "h+": date.getHours(), //小时 
                    "m+": date.getMinutes(), //分 
                    "s+": date.getSeconds(), //秒 
                    "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
                    "S": date.getMilliseconds() //毫秒 
                };
                if (/(y+)/.test(fmt))
                    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(fmt))
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
            },
            /**
             * 获取Cookie，可以获取二级的cokkie
             * @param  {string} a 一级cookie
             * @param  {string} b 二级cookie
             * @return {string}   cookie的value
             * @requires this.toReString();
             */
            getCookie: function(a, b) {
                var c = document.cookie.match(RegExp("(?:^|;)\\s*" + this.toReString(encodeURIComponent(a)) + "=([^;]+)"));
                if (!1 === b) return (c ? c[1] : null);
                c && b && (c = c[1].match(RegExp("(?:^|&)\\s*" + this.toReString(encodeURIComponent(b)) + "=([^&]+)")));
                return (c ? decodeURIComponent(c[1]) : null)
            },
            /**
             * 为了getCookie写的
             * @param  {string} str string
             */
            toReString: function(str) {
                var a = {
                    "\r": "\\r",
                    "\n": "\\n",
                    "\t": "\\t"
                };
                return str.replace(/([\.\\\/\+\*\?\[\]\{\}\(\)\^\$\|])/g, "\\$1").replace(/[\r\t\n]/g, function(b) {
                    return a[b]
                });
            },
            // 回到顶端按钮判断显示
            goTop: function() {
                var showGoTop, _scrollTop;
                var $toTopDiv = $("div.label_list3");
                var firstRun = 0;
                // 判断是否应该显示回到顶端按钮
                function goTopShouldShow() {
                    _scrollTop = document.documentElement.scrollTop + document.body.scrollTop;
                    if (_scrollTop > document.documentElement.clientHeight && !$toTopDiv.is(":visible")) {
                        // 第一次显示的时候由于对象为a元素，不能用fadeIn()，强制显示为diplay block。之后可以使用fadeIn()
                        if (!firstRun) {
                            $toTopDiv.css("display", "block");
                            firstRun++;
                        } else {
                            $toTopDiv.fadeIn();
                        }
                    } else if (_scrollTop <= document.documentElement.clientHeight && $toTopDiv.is(":visible")) {
                        $toTopDiv.fadeOut();
                    }
                };
                // 页面载入时先运行一下，防止当页面打开时已经在第一屏以下时不显示按钮
                goTopShouldShow();
                // 绑定
                $(window).bind("resize scroll", function() {
                    // 300毫秒延时，防止频繁运行
                    clearTimeout(showGoTop);
                    showGoTop = setTimeout(goTopShouldShow, 300);
                });
            }
        },
        tpl: {
            booingPopup: '<div class="eurail_popup" id="booingPopup">\
                    <h3><a href="###" class="close"></a>为什么要提前预订座位？</h3>\
                    <div class="eurail_popuplist">\
                        <dl>\
                            <dt><span>谁需要预订？</span></dt>\
                            <dd>只有通票持有人才需要预订座位，请注意如果只预订座位但是没有购买通票是无法登车旅行的。</dd>\
                        </dl>\
                        <dl>\
                            <dt><span>为什么预订？</span></dt>\
                            <dd>在欧洲许多列车除了您购买的通票之外，还必须购买预订以确保您的座位。<br>如观光火车和高速火车以及夜火车。请注意，在大部分国家如法国、意大利、西班牙的高速列车都是强制订座。<br>另外，预订座位的费用并没有包含在通票中。</dd>\
                        </dl>\
                        <dl>\
                            <dt><span>为什么需要提前预订？</span></dt>\
                            <dd>通票对应的座位在每列列车上都是有限的。如果到车站再订座，可能会遇到满位情况，而不得不乘坐下一班列车。</dd>\
                        </dl>\
                        <dl>\
                            <dt><span>购买何种订座？</span></dt>\
                            <dd>请挑选与您购买或准备购买通票对应的订座舱位。<br>\
                如您购买了法国通票，但计划乘坐从巴黎-琉森的订座。请选择对应法国通票的订座（价格相较购买了包含法国和瑞士通票对应的订座费用要高出一些）。<br>\
                同样，如您购买了Eurail pass（多国通票）乘坐法国境内的列车 如巴黎-阿维尼翁，也请购买对应Eruail pass 的订座价格而不要购买对应法国通票（france pass）的订座。两者价格也可能略有不同。</dd>\
                        </dl>\
                    </div>\
                </div>'
        },
        /**
         * 首页tab切换
         */
        eurailTab: function() {
            var self = this;
            var jTabWrap = $('#eurail_search');
            var jTabBtn = jTabWrap.find('.search_tab a');
            var jTabCont = jTabWrap.find('.europe_choose');

            return {
                init: function() {
                    var me = this;
                    me.tab();
                },
                tab: function() {
                    var index;
                    jTabWrap.delegate('.search_tab a', 'click', function() {
                        index = $(this).parent().index();
                        jTabBtn.removeClass('search_current');
                        $(this).addClass('search_current');
                        jTabCont.hide();
                        jTabCont.filter(':eq(' + index + ')').show();
                    });
                }
            }
        },
        /**
         * 点对点火车票Tab
         */
        pointRail: function() {
            var self = this;
            var jWrap = $('#pointRail');
            var jRadio = jWrap.find('input[name=route]');
            var radioValue = 1;

            var jStartCity = $('#pointStartCity');
            var jStartDate = $('#pointStartDate');
            var jStartTime = $('#pointStartTime');

            var jDepCity = $('#pointDepCity');
            var jDepDate = $('#pointDepDate');
            var jDepTime = $('#pointDepTime');

            var jBackLabel = $('#pointBackLabel');
            var jPassenger = jWrap.find('.pointPassenger');
            var jPassengerInputs = jPassenger.find('input');
            var jSubmit = $('#pointSubmit');
            // 获取后台喷出的#rangdate input value，这个值为可选择日期范围最小日期
            var minDate = $('#rangdate').val();

            return {
                init: function() {
                    var me = this;
                    me.bind();
                },
                /**
                 * 在IE6/7/8下出现点击搜索到下个页面在点击返回button，那么页面不会自动清除为默认格式
                 * 可能是因为DOM树未构建完成导致，所以需要使用setTimeout去重设默认值。
                 */
                bind: function() {
                    var me = this;
                    if (cQuery.browser.isIE6 || cQuery.browser.isIE7 || cQuery.browser.isIE8) {
                        setTimeout(me.setDefault, 100);
                    } else {
                        me.setDefault();
                    }
                    me.bindNotice();
                    me.bindRadio();
                    me.bindAddress();
                    me.bindCalendar();
                    me.bindDropBoxs();

                    me.validSubmit();
                },
                setDefault: function() {
                    var sevenDayLater = new Date().addDays(7);
                    var nineDayLater = new Date().addDays(9);
                    sevenDayLater = self.common.formatDate(sevenDayLater, 'yyyy-MM-dd');
                    nineDayLater = self.common.formatDate(nineDayLater, 'yyyy-MM-dd');

                    jRadio.filter('[value=1]').prop('checked', true);
                    jStartCity.val('').blur(); // 重设后还要blur一下，脱离input
                    jDepCity.val('').blur();
                    jStartDate.val(sevenDayLater);
                    jDepDate.val(nineDayLater).prop('disabled', true);
                    jStartTime.val('06:00-12:00');
                    jDepTime.val('06:00-12:00').prop('disabled', true);
                    jPassengerInputs.each(function(index) {
                        // 第一个默认值为1
                        if (index == 0) {
                            $(this).val(1);
                        } else {
                            $(this).val(0);
                        }
                    });
                },
                bindNotice: function() {
                    cQuery("#pointStartCity").regMod("notice", "1.0", {
                        name: "pointStartCity",
                        tips: "中文/英文/拼音",
                        selClass: "inputSel"
                    }, true);
                    // cQuery("#pointStartDate").regMod("notice", "1.0", {
                    //     name: "pointStartDate",
                    //     tips: "yyyy-mm-dd",
                    //     selClass: "inputSel"
                    // }, true);
                    cQuery("#pointDepCity").regMod("notice", "1.0", {
                        name: "pointDepCity",
                        tips: "中文/英文/拼音",
                        selClass: "inputSel"
                    }, true);
                    // cQuery("#pointDepDate").regMod("notice", "1.0", {
                    //     name: "pointDepDate",
                    //     tips: "yyyy-mm-dd",
                    //     selClass: "inputSel"
                    // }, true);

                },
                bindRadio: function() {
                    jRadio.change(function() {
                        radioValue = $(this).val();
                        if (radioValue == '1') {
                            jDepDate.prop('disabled', true);
                            jDepTime.prop('disabled', true);
                            jBackLabel.addClass('time_disabled');
                        } else if (radioValue == '2') {
                            jDepDate.prop('disabled', false);
                            jDepTime.prop('disabled', false);
                            jBackLabel.removeClass('time_disabled');
                        }
                    });
                },
                /**
                 * 更具需求设定：
                 * jsonpSource为热门城市默认弹出，jsonpFilter为输入文字ajax搜索目标数据源
                 * 获取控件值，使用cQuery.data('data-value')来存储值
                 */
                bindAddress: function() {
                    var cqRegStart, cqRegDep;
                    var cqStartCity = cQuery('#pointStartCity');
                    var cqDepCity = cQuery('#pointDepCity');

                    cqStartCity.bind('keydown', function() {
                        cQuery(this).removeData('data-value', '');
                    });
                    cqDepCity.bind('keydown', function() {
                        cQuery(this).removeData('data-value', '');
                    });

                    // StartCity
                    cqRegStart = cqStartCity.regMod('address', '1.0', {
                        name: 'pointStartCity',
                        jsonpSource: '/REBooking/httphandler/ptpcityhandler.ashx?action=hotcity',
                        jsonpFilter: '/outie/HttpHandler/ptpcityhandler.ashx?action=ajaxhotcity&IsUseNewStyle=T&keyword=${key}',
                        message: {
                            suggestion: '可直接输入城市中文/英文/拼音'
                        },
                        // isAutoCorrect: true,
                        offset: 5, // 5点钟方向
                        delay: 100
                    });
                    cqRegStart.method('bind', 'change', function() {
                        var items = arguments[1].items;
                        if (items) {
                            var value = items[2];
                            cqStartCity.data('data-value', value);

                            setTimeout(function() {
                                cqStartCity[0].blur();
                            }, 0);
                        }
                    });
                    cqRegStart.method('bind', 'enter', function() {
                        setTimeout(function() {
                            cqStartCity[0].blur();
                        }, 0);
                    });
                    // DepCity
                    cqRegDep = cqDepCity.regMod('address', '1.0', {
                        name: 'pointDepCity',
                        jsonpSource: '/REBooking/httphandler/ptpcityhandler.ashx?action=hotcity',
                        jsonpFilter: '/outie/HttpHandler/ptpcityhandler.ashx?action=ajaxhotcity&IsUseNewStyle=T&keyword=${key}',
                        message: {
                            suggestion: '可直接输入城市中文/英文/拼音'
                        },
                        // isAutoCorrect:true,
                        offset: 5, // 5点钟方向
                        delay: 100
                    });
                    cqRegDep.method('bind', 'change', function() {
                        var items = arguments[1].items;
                        if (items) {
                            var value = items[2];
                            cqDepCity.data('data-value', value);

                            setTimeout(function() {
                                cqDepCity[0].blur();
                            }, 0);
                        }
                    });
                    cqRegDep.method('bind', 'enter', function() {
                        setTimeout(function() {
                            cqDepCity[0].blur();
                        }, 0);
                    });
                },
                /**
                 * 绑定cquery calendar控件，出发日期和返回日期默认值为当前日期的7天后和9天后
                 * 虽然后台喷出html时候已经带值，但前台依旧去实现默认值设定，
                 * 且初始化calendar的最小可选择日期为后台喷出的#rangdate值
                 */
                bindCalendar: function() {
                    cQuery("#pointStartDate").regMod("calendar", "3.0", {
                        options: {
                            showWeek: true,
                            container: cQuery.container,
                            minDate: minDate //+可选范围的起始日期，日期格式为“yyyy-mm-dd”，值为“#”时为当前日期、为null是不限制，也可以是日期对象，获取方式是获取后台喷出的#rangdate值
                        },
                        listeners: {
                            onChange: function(input, value) {
                                // var d = value.toDate();
                                // $('#depDate').data('minDate', new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1));
                            }
                        }
                    }, true);
                    cQuery("#pointDepDate").regMod("calendar", "3.0", {
                        options: {
                            showWeek: true,
                            minDate: minDate,
                            reference: "#pointStartDate"
                        },
                        listeners: {
                            onChange: function(input, value) {
                                // $("#depDate").data('endDate', value);
                            }
                        }
                    });
                },
                /**
                 * 绑定自定义控件dropdown，类似select控件
                 * 所有需要dropdown的控件都要使用_bindDropBox来实现功能
                 * @requires _bindDropBox
                 */
                bindDropBoxs: function() {
                    var me = this;
                    me._bindDropBox(jStartTime);
                    me._bindDropBox(jDepTime);

                    jPassengerInputs.each(function() {
                        me._bindDropBox($(this));
                    });
                },
                /**
                 * 实现dropdown select功能，IE6/7下有一个bug，
                 * 显示drop options时，切换tab，隐藏dropdown，但切换回这个tab，IE6/7则会遗留一块白色的痕迹
                 * 使用visibility:hidden去隐藏修复此bug
                 * @param  {jquery obj} jInput input框
                 */
                _bindDropBox: function(jInput) {
                    var jDrop = jInput.nextAll('p');
                    jInput.bind('focus', function() {
                        jDrop.show().css({
                            visibility: 'visible'
                        });
                    }).bind('blur', function() {
                        $(document).one('click', function(event) {
                            jDrop.hide().css({
                                visibility: 'hidden'
                            });
                        });
                    });
                    jDrop.parent().delegate('a', 'click', function(event) {
                        var value = $(this).text();
                        jInput.val(value);
                    });
                },
                /**
                 * 获取当前点对点火车票所有的值，用于提交，被_getLocation方法使用
                 * @return {obj} 返回一个包含所有data的对象
                 */
                _getData: function() {
                    var startCity, startDate, startTime, startHour1, startHour2;
                    var depCity, depDate, depTime, depHour1, depHour2;
                    var cr, rt, qn, cq; // 成人，儿童，青年，长者

                    startCity = cQuery('#pointStartCity').data('data-value');
                    startDate = jStartDate.val();
                    startTime = jStartTime.val();
                    startTime = startTime.split('-');
                    startHour1 = startTime[0].replace(':', '$');
                    startHour2 = startTime[1].replace(':', '$');

                    depCity = cQuery('#pointDepCity').data('data-value');
                    depDate = jDepDate.val();
                    depTime = jDepTime.val();
                    depTime = depTime.split('-');
                    depHour1 = depTime[0].replace(':', '$');
                    depHour2 = depTime[1].replace(':', '$');

                    cr = jPassengerInputs.filter(':eq(0)').val();
                    rt = jPassengerInputs.filter(':eq(1)').val();
                    qn = jPassengerInputs.filter(':eq(2)').val();
                    cq = jPassengerInputs.filter(':eq(3)').val();

                    return {
                        startCity: startCity,
                        startDate: startDate,
                        startHour1: startHour1,
                        startHour2: startHour2,
                        depCity: depCity,
                        depDate: depDate,
                        depHour1: depHour1,
                        depHour2: depHour2,
                        cr: cr,
                        rt: rt,
                        qn: qn,
                        cq: cq
                    }
                },
                /**
                 * 根据_getData()得到所有值，然后评出需要的url地址
                 * 根据radio为1单程，2往返，拼出不同的url格式地址
                 * @return {转化为指定格式的String}
                 */
                _getLocation: function() {
                    var me = this;
                    var data = me._getData();
                    var location;
                    if (jRadio.filter(':checked').val() == 1) {
                        location = ['/outie/searchresult--sc--', data.startCity,
                            '---dc--', data.depCity,
                            '---dd--', data.startDate,
                            '---dtl--', data.startHour1,
                            '---dth--', data.startHour2,
                            '---a--', data.cr,
                            '---c--', data.rt,
                            '---y--', data.qn,
                            '---s--', data.cq,
                            '---st--S'
                        ].join('');
                    } else {
                        location = ['/outie/searchresult--sc--', data.startCity,
                            '---dc--', data.depCity,
                            '---dd--', data.startDate,
                            '---dtl--', data.startHour1,
                            '---dth--', data.startHour2,
                            '---bd--', data.depDate,
                            '---btl--', data.depHour1,
                            '---bth--', data.depHour2,
                            '---a--', data.cr,
                            '---c--', data.rt,
                            '---y--', data.qn,
                            '---s--', data.cq,
                            '---st--D'
                        ].join('');
                    }
                    return location;
                },
                /**
                 * 根据对应数据并跳转对应的url地址，并显示loading
                 */
                validSubmit: function() {
                    var me = this;
                    var cqStartCity = cQuery('#pointStartCity');
                    var cqDepCity = cQuery('#pointDepCity');
                    jSubmit.bind('click', function() {
                        if (self.common.validNull(jWrap) &&
                            self.common.validAddress(cqStartCity, cqDepCity) &&
                            self.common.validDate(jStartDate, jDepDate, radioValue)
                        ) {
                            window.location = me._getLocation();
                            cQuery('#eurail_loading').mask();
                        }
                    });
                }
            }
        },
        /**
         * 欧洲火车通票Tab
         * 功能相对单一，同点对点火车票tab功能一样，
         * 获取对应的控件data，然后拼出url，提交跳转到相应的url
         */
        europeRail: function() {
            var self = this;
            var jWrap = $('#europeRail');
            var jStartCity = $('#europeRailCity');
            var jSubmit = $('#europeRailSubmit');

            return {
                init: function() {
                    var me = this;
                    if (cQuery.browser.isIE6 || cQuery.browser.isIE7 || cQuery.browser.isIE8) {
                        setTimeout(me.setDefault, 100);
                    } else {
                        me.setDefault();
                    }
                    me.bindNotice();
                    me.bindAddress();
                    me.validSubmit();
                },
                setDefault: function() {
                    jStartCity.val('').blur();
                },
                bindNotice: function() {
                    cQuery("#europeRailCity").regMod("notice", "1.0", {
                        name: "europeRailCity",
                        tips: "请选择输入",
                        selClass: "inputSel"
                    }, true);
                },
                bindAddress: function() {
                    var cqRegStart;
                    var cqStartCity = cQuery('#europeRailCity');

                    cqStartCity.bind('keydown', function() {
                        cQuery(this).removeData('data-value', '');
                    });

                    // StartCity
                    cqRegStart = cqStartCity.regMod('address', '1.0', {
                        name: 'europeRailCity',
                        jsonpSource: '/rebooking/HttpHandler/PTPCityHandler.ashx?action=cityselector',
                        message: {
                            suggestion: '可直接输入国家或国家拼音'
                        },
                        isAutoCorrect: true,
                        offset: 5 // 5点钟方向
                    });
                    cqRegStart.method('bind', 'change', function() {
                        var items = arguments[1].items;
                        if (items) {
                            var value = items[2];
                            cqStartCity.data('data-value', value);

                            setTimeout(function() {
                                cqStartCity[0].blur();
                            }, 0);
                        }
                    });
                    cqRegStart.method('bind', 'enter', function() {
                        setTimeout(function() {
                            cqStartCity[0].blur();
                        }, 0);
                    });
                },
                _getLocation: function() {
                    var location;
                    var startCity = cQuery('#europeRailCity').data('data-value');
                    location = '/outie/' + startCity
                    return location;
                },
                validSubmit: function() {
                    var me = this;
                    var cqStartCity = cQuery('#europeRailCity');

                    jSubmit.bind('click', function() {
                        if (self.common.validNull(jWrap) &&
                            self.common.validAddress(cqStartCity)
                        ) {
                            window.location = me._getLocation();
                            cQuery('#eurail_loading').mask();
                        }
                    });
                }
            }
        },
        /**
         * 通票座位预定tab
         * 功能完全和点对点火车票一致，方法拷贝而来
         */
        throTicket: function() {
            var self = this;
            var jWrap = $('#throTicket');
            var jRadio = jWrap.find('input[name=throroute]');
            var radioValue = 1;

            var jStartCity = $('#throStartCity');
            var jStartDate = $('#throStartDate');
            var jStartTime = $('#throStartTime');

            var jDepCity = $('#throDepCity');
            var jDepDate = $('#throDepDate');
            var jDepTime = $('#throDepTime');

            var jBackLabel = $('#throBackLabel')
            var jPassenger = $('#throPassenger');
            var jWhyBook = $('#whyBookBtn');
            var jSubmit = $('#throSubmit');
            // 获取后台喷出的#rangdate input value，这个值为可选择日期范围最小日期
            var minDate = $('#rangdate').val();

            return {
                init: function() {
                    var me = this;
                    me.bind();
                },
                /**
                 * 在IE6/7/8下出现点击搜索到下个页面在点击返回button，那么页面不会自动清除为默认格式
                 * 可能是因为DOM树未构建完成导致，所以需要使用setTimeout去重设默认值。
                 */
                bind: function() {
                    var me = this;
                    if (cQuery.browser.isIE6 || cQuery.browser.isIE7 || cQuery.browser.isIE8) {
                        setTimeout(me.setDefault, 100);
                    } else {
                        me.setDefault();
                    }
                    me.bindNotice();
                    me.bindRadio();
                    me.bindAddress();
                    me.bindCalendar();
                    me.bindDropBoxs();

                    me.validSubmit();

                    jWhyBook.bind('click', function() {
                        self.common.createMaskPop(self.tpl.booingPopup);
                    });
                },
                setDefault: function() {
                    var sevenDayLater = new Date().addDays(7);
                    var nineDayLater = new Date().addDays(9);
                    sevenDayLater = self.common.formatDate(sevenDayLater, 'yyyy-MM-dd');
                    nineDayLater = self.common.formatDate(nineDayLater, 'yyyy-MM-dd');

                    jRadio.filter('[value=1]').prop('checked', true);
                    jStartCity.val('').blur();
                    jDepCity.val('').blur();
                    jStartDate.val(sevenDayLater);
                    jDepDate.val(nineDayLater).prop('disabled', true);
                    jStartTime.val('06:00-12:00');
                    jDepTime.val('06:00-12:00').prop('disabled', true);
                    jPassenger.val(1);
                },
                /**
                 * 更具需求设定：
                 * jsonpSource为热门城市默认弹出，jsonpFilter为输入文字ajax搜索目标数据源
                 * 获取控件值，使用cQuery.data('data-value')来存储值
                 */
                bindAddress: function() {
                    var cqRegStart, cqRegDep;
                    var cqRegAddress;
                    var cqStartCity = cQuery('#throStartCity');
                    var cqDepCity = cQuery('#throDepCity');

                    cqStartCity.bind('keydown', function() {
                        cQuery(this).removeData('data-value', '');
                    });
                    cqDepCity.bind('keydown', function() {
                        cQuery(this).removeData('data-value', '');
                    });

                    // Start city
                    cqRegStart = cqStartCity.regMod('address', '1.0', {
                        name: 'throStartCity',
                        jsonpSource: '/REBooking/httphandler/ptpcityhandler.ashx?action=hotcity',
                        jsonpFilter: '/outie/HttpHandler/ptpcityhandler.ashx?action=ajaxhotcity&IsUseNewStyle=T&keyword=${key}',
                        message: {
                            suggestion: '可直接输入城市中文/英文/拼音'
                        },
                        // isAutoCorrect:true,
                        offset: 5, // 5点钟方向
                        delay: 100
                    });
                    cqRegStart.method('bind', 'change', function() {
                        var items = arguments[1].items;
                        if (items) {
                            var value = items[2];
                            cqStartCity.data('data-value', value);

                            setTimeout(function() {
                                cqStartCity[0].blur();
                            }, 0);
                        }
                    });
                    cqRegStart.method('bind', 'enter', function() {
                        setTimeout(function() {
                            cqStartCity[0].blur();
                        }, 0);
                    });
                    // DepCity
                    cqRegDep = cqDepCity.regMod('address', '1.0', {
                        name: 'throDepCity',
                        jsonpSource: '/REBooking/httphandler/ptpcityhandler.ashx?action=hotcity',
                        jsonpFilter: '/outie/HttpHandler/ptpcityhandler.ashx?action=ajaxhotcity&IsUseNewStyle=T&keyword=${key}',
                        message: {
                            suggestion: '可直接输入城市中文/英文/拼音'
                        },
                        // isAutoCorrect:true,
                        offset: 5, // 5点钟方向
                        delay: 100
                    });
                    cqRegDep.method('bind', 'change', function() {
                        var items = arguments[1].items;
                        if (items) {
                            var value = items[2];
                            cqDepCity.data('data-value', value);

                            setTimeout(function() {
                                cqDepCity[0].blur();
                            }, 0);
                        }
                    });
                    cqRegDep.method('bind', 'enter', function() {
                        setTimeout(function() {
                            cqDepCity[0].blur();
                        }, 0);
                    });
                },
                bindNotice: function() {
                    cQuery("#throStartCity").regMod("notice", "1.0", {
                        name: "pointStartCity",
                        tips: "中文/英文/拼音",
                        selClass: "inputSel"
                    }, true);
                    // cQuery("#throStartDate").regMod("notice", "1.0", {
                    //     name: "pointStartDate",
                    //     tips: "yyyy-mm-dd",
                    //     selClass: "inputSel"
                    // }, true);
                    cQuery("#throDepCity").regMod("notice", "1.0", {
                        name: "pointDepCity",
                        tips: "中文/英文/拼音",
                        selClass: "inputSel"
                    }, true);
                    // cQuery("#throDepDate").regMod("notice", "1.0", {
                    //     name: "pointDepDate",
                    //     tips: "yyyy-mm-dd",
                    //     selClass: "inputSel"
                    // }, true);

                },
                bindRadio: function() {
                    jRadio.change(function() {
                        radioValue = $(this).val();
                        if (radioValue == '1') {
                            jDepDate.prop('disabled', true);
                            jDepTime.prop('disabled', true);
                            jBackLabel.addClass('time_disabled');
                        } else if (radioValue == '2') {
                            jDepDate.prop('disabled', false);
                            jDepTime.prop('disabled', false);
                            jBackLabel.removeClass('time_disabled');
                        }
                    });
                },
                /**
                 * 绑定cquery calendar控件，出发日期和返回日期默认值为当前日期的7天后和9天后
                 * 虽然后台喷出html时候已经带值，但前台依旧去实现默认值设定，
                 * 且初始化calendar的最小可选择日期为后台喷出的#rangdate值
                 */
                bindCalendar: function() {
                    cQuery("#throStartDate").regMod("calendar", "3.0", {
                        options: {
                            showWeek: true,
                            container: cQuery.container,
                            minDate: minDate //+可选范围的起始日期，日期格式为“yyyy-mm-dd”，值为“#”时为当前日期、为null是不限制，也可以是日期对象，，获取方式是获取后台喷出的#rangdate值
                        },
                        listeners: {
                            onChange: function(input, value) {
                                // var d = value.toDate();
                                // $('#depDate').data('minDate', new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1));
                            }
                        }
                    }, true);
                    cQuery("#throDepDate").regMod("calendar", "3.0", {
                        options: {
                            showWeek: true,
                            minDate: minDate,
                            reference: "#pointStartDate"
                        },
                        listeners: {
                            onChange: function(input, value) {
                                // $("#depDate").data('endDate', value);
                            }
                        }
                    });
                },
                /**
                 * 绑定自定义控件dropdown，类似select控件
                 * 所有需要dropdown的控件都要使用_bindDropBox来实现功能
                 * @requires _bindDropBox
                 */
                bindDropBoxs: function() {
                    var me = this;
                    me._bindDropBox(jStartTime);
                    me._bindDropBox(jDepTime);
                    me._bindDropBox(jPassenger);
                },
                /**
                 * 实现dropdown select功能，IE6/7下有一个bug，
                 * 显示drop options时，切换tab，隐藏dropdown，但切换回这个tab，IE6/7则会遗留一块白色的痕迹
                 * 使用visibility:hidden去隐藏修复此bug
                 * @param  {jquery obj} jInput input框
                 */
                _bindDropBox: function(jInput) {
                    var jDrop = jInput.nextAll('p');
                    jInput.bind('focus', function() {
                        jDrop.show().css({
                            visibility: 'visible'
                        });
                    }).bind('blur', function() {
                        $(document).one('click', function(event) {
                            jDrop.hide().css({
                                visibility: 'hidden'
                            });
                        });
                    });
                    jDrop.parent().delegate('a', 'click', function(event) {
                        var value = $(this).text();
                        jInput.val(value);
                    });
                },
                /**
                 * 获取当前点对点火车票所有的值，用于提交，被_getLocation方法使用
                 * @return {obj} 返回一个包含所有data的对象
                 */
                _getData: function() {
                    var startCity, startDate, startTime, startHour1, startHour2;
                    var depCity, depDate, depTime, depHour1, depHour2;
                    var ph;

                    startCity = cQuery('#throStartCity').data('data-value');
                    startDate = jStartDate.val();
                    startTime = jStartTime.val();
                    startTime = startTime.split('-');
                    startHour1 = startTime[0].replace(':', '$');
                    startHour2 = startTime[1].replace(':', '$');

                    depCity = cQuery('#throDepCity').data('data-value');
                    depDate = jDepDate.val();
                    depTime = jDepTime.val();
                    depTime = depTime.split('-');
                    depHour1 = depTime[0].replace(':', '$');
                    depHour2 = depTime[1].replace(':', '$');

                    ph = jPassenger.val();

                    return {
                        startCity: startCity,
                        startDate: startDate,
                        startHour1: startHour1,
                        startHour2: startHour2,
                        depCity: depCity,
                        depDate: depDate,
                        depHour1: depHour1,
                        depHour2: depHour2,
                        ph: ph
                    }
                },
                /**
                 * 根据_getData()得到所有值，然后评出需要的url地址
                 * 根据radio为1单程，2往返，拼出不同的url格式地址
                 * @return {转化为指定格式的String}
                 */
                _getLocation: function() {
                    var me = this;
                    var data = me._getData();
                    var location;
                    if (jRadio.filter(':checked').val() == 1) {
                        location = ['/outie/SearchResultSeat--sc--', data.startCity,
                            '---dc--', data.depCity,
                            '---dd--', data.startDate,
                            '---dtl--', data.startHour1,
                            '---dth--', data.startHour2,
                            '---ph--', data.ph,
                            '---st--S'
                        ].join('');
                    } else {
                        location = ['/outie/SearchResultSeat--sc--', data.startCity,
                            '---dc--', data.depCity,
                            '---dd--', data.startDate,
                            '---dtl--', data.startHour1,
                            '---dth--', data.startHour2,
                            '---bd--', data.depDate,
                            '---btl--', data.depHour1,
                            '---bth--', data.depHour2,
                            '---ph--', data.ph,
                            '---st--D'
                        ].join('');
                    }
                    return location;
                },
                /**
                 * 根据对应数据并跳转对应的url地址，并显示loading
                 */
                validSubmit: function() {
                    var me = this;
                    var cqStartCity = cQuery('#throStartCity');
                    var cqDepCity = cQuery('#throDepCity');
                    jSubmit.bind('click', function() {
                        if (self.common.validNull(jWrap) &&
                            self.common.validAddress(cqStartCity, cqDepCity) &&
                            self.common.validDate(jStartDate, jDepDate, radioValue)
                        ) {
                            window.location = me._getLocation();
                            cQuery('#eurail_loading').mask();
                        }
                    });
                }
            }
        },
        // 热门通票
        eurailHot: function() {
            var self = this;
            var jTabWrap = $('#eurail_hot');
            var jTabBtn = jTabWrap.find('.eurail_hottab');
            var jTabMore = jTabWrap.find('.eurail_hotmore');
            var jTabCont = jTabWrap.find('.eurail_hotlist');

            var cqRegLazy;
            var bAlreadyTab2 = false;
            var bAlreadyTab3 = false;

            return {
                init: function() {
                    var me = this;
                    me.lazyLoad();
                    me.tab();

                },
                tab: function() {
                    var me = this;
                    var scrollTop;

                    jTabBtn.each(function(index) {
                        $(this).bind('click', function() {
                            jTabBtn.removeClass('cur');
                            $(this).addClass('cur');
                            jTabMore.hide();
                            jTabMore.filter(':eq(' + index + ')').show();
                            jTabCont.hide();
                            jTabCont.filter(':eq(' + index + ')').show();

                            scrollTop = $(window).scrollTop();
                            // 为了触发lazyload，所以需要滚动，日后需要完善
                            if (index == 1 && bAlreadyTab2 == false) {
                                $(window).scrollTop(scrollTop + 1);
                                bAlreadyTab2 = true;
                            } else if (index == 2 && bAlreadyTab3 == false) {
                                $(window).scrollTop(scrollTop + 1);
                                bAlreadyTab3 = true;
                            }
                        });
                    });
                },
                lazyLoad: function() {
                    cqRegLazy = cQuery('#eurail_hot').regMod('lazyLoad', '1.0', {
                        container: cQuery('#eurail_hot'),
                        placeholder: 'http://pic.c-ctrip.com/vacation_v1/transparent.gif',
                        loadingImage: 'http://pic.c-ctrip.com/vacation_v1/transparent.gif'
                    });
                }
            }
        },
        ctmModule: function() {
            var self = this;
            var startcity;
            if (window.$$ && window.$$.StartCity) {
                startcity = window.$$.StartCity;
            } else if (self.common.getCookie('StartCity_Pkg')) {
                startcity = self.common.getCookie('StartCity_Pkg', 'PkgStartCity');
            }

            return {
                init: function() {
                    var me = this;
                    me.jzAdv();
                },
                /**
                 * jz adv 晶赞广告ctm添加，点击的时候做添加ctm判断
                 */
                jzAdv: function() {

                    // $("#PanelAdBanner").find('.j-picsroller-pics a').css({
                    //     left: '50%',
                    //     marginLeft: '-960px'
                    // });

                    $("#PanelAdBanner").delegate("li", "click", function(event) {
                        var $this = $(this);
                        $this.parent().attr("data-index", $this.attr("data-index"));
                    });

                    $("#PanelAdBanner").bind("click", function(event) {
                        var _index, data_ctm, anchor;
                        var _target = event.target || event.srcElement;
                        if (_target.tagName === "IMG") {
                            anchor = $(_target).closest("a")[0];
                            _index = !! $(this).find(".j-num-current").length ? $(this).find(".j-num-current").attr("data-index") : $(this).find(".j-picsroller-num").attr("data-index");
                            data_ctm = '#ctm_ref=va_out_s' + startcity + '_ban_p0_l0_' + (++_index) + '_img';
                            if ( !! data_ctm) {
                                if (anchor.getAttribute("target") === "_blank") {
                                    window.open(anchor.href + data_ctm);
                                } else {
                                    location.href = anchor.href + data_ctm;
                                }
                                event.preventDefault();
                                event.stopPropagation();
                            }
                        }
                    });
                }
            }
        },

        init: function() {
            var self = this;
            return function() {
                GV.ready(function() {
                    self.common.readOnlyDefault();
                    self.common.goTop();

                    self.eurailTab().init();
                    self.europeRail().init();
                    self.pointRail().init();
                    self.throTicket().init();
                    self.eurailHot().init();
                    self.ctmModule().init();
                });
            }
        }
    }
    exports.init = outieIndex.init.call(outieIndex);

});