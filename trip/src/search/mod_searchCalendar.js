/**
 * @Author guow
 * @CreateDate  2014/03/15
 * @Desc 添加日历效果
 */
define("search/mod_searchCalendar", ["jquery", "underscore"], function (require, exports, module) {
    var $ = require('jquery'),
        _ = require('underscore');
    //日历模板
    var CalendarTpl = {
        titleTpl: '<div class="search_calendar_title">{{year}}年{{month}}月</div>',
        itemTpl: '{{#if Active}}<td class=\"on\">\n\
                    <a href=\"javascript:;\" data-date="{{DateStr}}" {{#if ClassNames}}class=\"{{ClassNames}}\"{{/if}} {{#if IsShowFestival}}title=\"{{FestivalName}}\"{{/if}}>\n\
		                <span class=\"date basefix\" >{{#if IsShowFestival}}<!--<i>{{FestivalName}}节</i>-->{{/if}}{{DayStr}}</span>\n\
		            <span class=\"team\">\n\
			            {{#if IsAnnouncedGroup}}成团\n\
			            {{/if}}\n\
	                </span>\n\
	                <span class=\"search_calendar_price01\">{{#isRealtimePrice MinPrice}}<i class="true_time"></i>{{else}}<dfn>&yen;</dfn>{{MinPrice}}{{/isRealtimePrice}}</span>\n\
	            </a>\n\
                    </td>\n\
                {{else}}\n\
                    <td>\n\
                    <a href=\"javascript:;\" {{#if ClassNames}}class=\"{{ClassNames}}\"{{/if}} {{#if IsShowFestival}}title=\"{{FestivalName}}\"{{/if}}>\n\
		                <span class=\"date basefix\">{{#if IsShowFestival}}<!--<i>{{FestivalName}}节</i>-->{{/if}}{{DayStr}}</span>\n\
                        {{#isRealtimePrice MinPrice}}\n\
                            <span class=\"team\">售完\n\</span>\n\
                            <span class=\"search_calendar_price01\"><dfn>&yen;</dfn>{{MinPrice}}</span>\n\
                        {{/isRealtimePrice}}\
	                </a>\n\
                    </td>\n\
                {{/if}}',
        calendarTpl: '<div class="search_calendar_box">\
                {{{dateTitle}}}\
                <div class="search_calendar_content">\
                    <dl class="search_calendar_num basefix">\
                        <dd class="bold">六</dd>\
                        <dd>五</dd>\
                        <dd>四</dd>\
                        <dd>三</dd>\
                        <dd>二</dd>\
                        <dd>一</dd>\
                        <dd class="bold">日</dd>\
                    </dl>\
                    <table class="search_calendar_right">\
                        <tbody>\
                            {{{dateBody}}}\
						            </tbody>\
					            </table>\
				            </div>\
			            </div>'
    };
    //工具函数由于require('../Modules/Util'),在压缩文件中取值为null
    var CalendarUtil = {
        /*
        * @param {String} str 2014-01-01
        */
        strToDate: function (str) {
            if (str instanceof Date || !str) return str;

            var arr = str.split('-'), year, month, day;
            if (arr.length != 3 || !(year = int(arr[0])) || !(month = int(arr[1])) || !(day = int(arr[2]))) return str;
            return new Date(year, month - 1, day);
        },
        /*
        * @param {String} str
        * @param {Number} len
        * @param {String} fill
        * @param {Boolean} pre
        * @example pad('1', 3, '0') ==> '001'
        * @example pad('1', 3, '-', true) ==> '1--'
        */
        pad: function (str, len, fill, pre) {
            str = str.toString();
            if (str.length < len) {
                fill = (new Array(len)).join(fill || ' ');
                if (pre) {
                    str = (fill + str).substr(-len);
                } else {
                    str = (str + fill).substring(0, len);
                }
            }
            return str;
        },
        /*
        * @param {Date | String} date '2014-03-02'
        * @param {String} [format = 'yyyy-mm-dd'] 'yyyy-mm-dd HH:MM:ss'
        */
        format: function (date, format) {
            if (!(date = CalendarUtil.strToDate(date))) return date;
            format = format || 'yyyy-mm-dd';

            date = format.replace(/y+|m+|d+|H+|M+|s+/g, function (match) {
                var firstChar = match.substr(0, 1),
                    len = match.length;
                switch (firstChar) {
                    case 'y':
                        return date.getFullYear().toString().substr(4 - len);
                    case 'm':
                        return CalendarUtil.pad(date.getMonth() + 1, len, '0', true);
                    case 'd':
                        return CalendarUtil.pad(date.getDate(), len, '0', true);
                    case 'H':
                        return CalendarUtil.pad(date.getHours(), len, '0', true);
                    case 'M':
                        return CalendarUtil.pad(date.getMinutes(), len, '0', true);
                    case 's':
                        return CalendarUtil.pad(date.getSeconds(), len, '0', true);
                }
            });
            return date;
        }
    };

    /**
    *@param {Date} date                         //必填 一个日期初始化日历的内容,检测
    *@param {HandlebarsString} titleTpl         //可选,头部模板
    *@param {HandlebarsString} calendarTpl      //可选,整体模板
    *@param {Function} dayRender                //可选,单个渲染
    *@param {Number} lineCount                  //可选,行数
    *@param {String}weekorder                   //可选,日历顺序
    *@desc '形成地图操作 生成日历HTML对日历的日期等进行操作'
    *@author guow@ctrip.com
    *@date 2014-3-25
    */
    var Calendar = function (options) {
        this.options = {};
        _.extend(this.options, options);
    };
    Calendar.fn = {
        firstAvailableDay: function (arr) {
            var index = -1;
            Calendar.fn.eachDateArr(arr, function (day, week, dayCount) {
                if (day) {
                    index = dayCount;
                    return false;
                }
            });
            return index;
        },
        eachDateArr: function (dateArr, dayCallback, weekCallback) {
            var dayCount = 0;
            for (var i = 0, len = dateArr.length; i < len; i++) {
                var oneWeek = dateArr[i];
                if (typeof weekCallback == 'function' && weekCallback(undefined, oneWeek, undefined, i) === false) return;
                if (typeof dayCallback == 'function') {
                    for (var j = 0; j < 7; j++) {
                        if (dayCallback(oneWeek[j], oneWeek, dayCount, i, j) === false) return;
                        dayCount++;
                    }
                }
            }
        }
    }
    Calendar.prototype = {
        getNode: function () {
            var me = this;
            if (me.finalNode) {
                return me.finalNode;
            }
            me.createHtml();
            return me.finalNode;
        },
        createHtml: function () {
            var me = this;
            if (!me.finalNode) {
                var date = me.options.date;
                var monthArr = me._showMonthDateArr(date);
                var monthHtml = me._showMonthHTML(date);
                var dateHtml = me._showDateHTML(monthArr);
                var finalHtml = me._showTableHTML(monthHtml, dateHtml);
                //为日期添加事件
                var finalNode = $(finalHtml);
                me.finalNode = finalNode;
            }
        },
        _showTableHTML: function (title, body) {
            //传出参数{dateTitle,dateBody}
            return Handlebars.compile(this.options.calendarTpl)({
                dateTitle: title,
                dateBody: body
            });
        },
        _showMonthHTML: function (date) {
            //传出参数{year,month}
            return Handlebars.compile(this.options.titleTpl)({
                year: date.getFullYear(),
                month: date.getMonth() + 1
            });
        },
        _showDateHTML: function (monthArr) {
            //传出参数dateStr日期字符串, dateIns日期对象, firstDayInMaxMonth日期所在月份, week周对象列表, dayCount所在月的位置, row行, col列
            var me = this;
            var dayRender = me.options.dayRender;
            var html = [], _row;
            var firstDayInMaxMonth = _.max(_.values(_.groupBy(_.flatten(monthArr), function (date) { return date.getFullYear() + '-' + (date.getMonth() + 1) })), function (e) { return e.length })[0];
            Calendar.fn.eachDateArr(monthArr, _.bind(function (day, week, dayCount, row, col) {
                if (_row != row && col == 0) html.push('<tr>');
                html.push(dayRender(day && CalendarUtil.format(day, 'yyyy-mm-dd'), day, firstDayInMaxMonth, week, dayCount, row, col));
                if (col == 6) html.push('</tr>');
                _row = row;
            }, me));
            return html.join('');
        },
        _showMonthDateArr: function (date) {
            var me = this;
            var date = CalendarUtil.strToDate(date);
            var needLineCount = me.options.lineCount || 5;
            // 类似 2014-03 月，需要 6 行
            var oneMonthMaxCount = 6;
            // 最开始要多生成几行，至少是一个月的行数，否则，类似 2014-03-30 这样的，在第6行，但却只需要显示 5 行，在生成出来的日期数组中，都无法找到这个日期
            lineCount = Math.max(needLineCount, oneMonthMaxCount);
            weekorder = (me.options.weekorder || '7123456').replace('7', '0');

            var firstChar = weekorder.substr(0, 1);
            var currentYear = date.getFullYear(),
                currentMonth = date.getMonth();
            var firstDateInMonth = new Date(currentYear, currentMonth, 1),
                lastDateInMonth = new Date(currentYear, currentMonth + 1, 0);

            var arr = [], line = 0;

            for (var start = firstDateInMonth.getDate(), end = lastDateInMonth.getDate() ; start <= end; start++) {
                var d = new Date(currentYear, currentMonth, start), weekday = d.getDay();

                // (arr[0])避免当月的第一天就是星期排序的第一天，直接加到第二行了
                if (weekday == firstChar && arr[0]) line++;

                arr[line] = arr[line] || [];
                arr[line][weekorder.indexOf(weekday)] = d;
            }
            // 多退少补
            var diff = lineCount - (line + 1);
            for (start = 0; diff !== 0;) {
                if (diff < 0) {
                    arr.pop();
                    diff++;
                }
                else {
                    arr.push([]);
                    diff--;
                }
            }

            var firstDayIndex = Calendar.fn.firstAvailableDay(arr);
            Calendar.fn.eachDateArr(arr, function (day, week, dayCount, row, col) {
                if (!day) arr[row][col] = new Date(currentYear, currentMonth, dayCount - firstDayIndex + 1);
            })


            if (arr.length > needLineCount) {
                for (var i = 0, len = arr.length - needLineCount; i < len; i++) {
                    // 如果生成的行数多了，则删除一些
                    arr.pop();
                }
            }

            return arr;
        }
    };

    /**
    *@param {Object}available   //必填，可用时间
    *@param {Array}range        //必填，时间范围 //无对range进行检测对range进行default
    *@param {Function}assemble  //选填，将日历打包的后的函数
    *@param {Calendar}calendar  //必填，传给日历对象的参数
    *@param {Number}initLen     //选填，选择初始化需要加载日历的数量
    *@param {String}prevClass   //选填，控制下一个的按钮Class
    *@param {String}nextClass   //选填，控制前一个的按钮Class
    *@param {Function }dateClick                //可选,日期点击事件
    *@desc '通过可选时间范围和可选月份,来选择加载需要显示的日历 需要更多时可以添加prev和next并createCalendar生成日历'
    *@author guow@ctrip.com
    *@date 2014-3-25
    */
    var CalendarBar = function (options) {
        var me = this;
        me.options = {};
        _.extend(me.options, options);
        //初始化数据
        me.calendars = {};
        me.rangeDate = _.sortBy(me.options.range, function (item) { return item; });
        me.startDay = new Date(me.rangeDate[0]);

        me.eachMonth(me.createCalendars);
        me.options.controller && (me.controller = me.initController(me.options.controller));
        me.renderCalendar();
        me.eachMonth(me.lazyLoad);
    };
    CalendarBar.prototype = {
        eachMonth: function (callback) {
            var me = this;
            var rangeDate = me.rangeDate;
            var startDay = new Date(rangeDate[0]);
            var endDay = rangeDate[1];
            var endOfMonth = new Date(endDay.getFullYear(), endDay.getMonth() + 1, 0);
            if (startDay.getFullYear() === endDay.getFullYear() && startDay.getMonth() === endDay.getMonth() && endOfMonth.getDate() === endDay.getDate() && endOfMonth.getDate() === startDay.getDate()) {
                endDay = new Date(new Date(endDay).setMonth(endDay.getMonth() + 1));
                if (endDay.getMonth() - endOfMonth.getMonth() > 1) {
                    endDay = new Date(new Date(endDay).setDate(endDay.getDate() - 2));
                }
            }
            var count = 0
            var tempMonth;
            while (me.compareMonth(endDay, startDay)) {
                callback.call(me, startDay, count);
                tempMonth = startDay.getMonth();
                startDay = new Date(new Date(startDay).setMonth(startDay.getMonth() + 1));
                if (startDay.getMonth() - tempMonth > 1) {
                    startDay = new Date(new Date(startDay).setDate(startDay.getDate() - 2));
                }
                count++;
            }
        },
        createCalendars: function (date) {
            var me = this;
            me.calendars[date.getFullYear()] = me.calendars[date.getFullYear()] || {};
            me.calendars[date.getFullYear()][date.getMonth()] = new Calendar(_.extend({ date: date }, me.options.calendar));
        },
        lazyLoad: function (date, index) {
            var me = this;
            setTimeout(function () { me.calendars[date.getFullYear()][date.getMonth()].createHtml(); }, 800 + (200 * (index || 0)));
        },
        renderCalendar: function () {
            var me = this;
            var rangeDate = me.rangeDate;
            var startDay = new Date(me.startDay);
            var endDay = rangeDate[1];
            var curNodes
            var len = (me.options.initLen || 2);
            var endOfMonth = new Date(endDay.getFullYear(), endDay.getMonth() + 1, 0);
            if (startDay.getFullYear() === endDay.getFullYear() && startDay.getMonth() === endDay.getMonth() && endOfMonth.getDate() === endDay.getDate() && endOfMonth.getDate() === startDay.getDate()) {
                endDay = new Date(new Date(endDay).setMonth(endDay.getMonth() + 1));
                if (endDay.getMonth() - endOfMonth.getMonth() > 1) {
                    endDay = new Date(new Date(endDay).setDate(endDay.getDate() - 2));
                }
            }
            var count = 0;
            var tempMonth;
            while (count < len) {
                if (me.compareMonth(endDay, startDay)) {
                    var node = me.calendars[startDay.getFullYear()][startDay.getMonth()].getNode();
                    curNodes = !!curNodes ? curNodes.add(node) : node;
                    tempMonth = startDay.getMonth();
                    startDay = new Date(new Date(startDay).setMonth(startDay.getMonth() + 1));
                    if (startDay.getMonth() - tempMonth > 1) {
                        startDay = new Date(new Date(startDay).setDate(startDay.getDate() - 2));
                    }
                }
                count++
            }
            var node_list = me.options.assemble(curNodes);

            //在此注册事件需要每次重新绑定，否则返回后会失效
            node_list.delegate('a', 'click', function (e) {
                e.preventDefault();
                me.options.dateClick && me.options.dateClick.call(this);
                return false;
            });

            me.options.renderCalendar(node_list);
            me.check();
            count = 0;
            while (count < len) {
                if (startDay < endDay) {
                    me.lazyLoad(startDay);
                    startDay = new Date(new Date(startDay).setMonth(startDay.getMonth() + 1));
                }
                count++
            }
        },
        nextPage: function (that) {
            //点击后一页
            var me = this;
            var controllerOption = me.options.controller;
            if ($(that).hasClass(controllerOption.disableNextClass)) {
                return false;
            }
            var startDay = new Date(me.startDay);
            me.startDay = new Date(new Date(startDay).setMonth(startDay.getMonth() + (me.options.initLen || 2)));
            me.renderCalendar();
        },
        prevPage: function (that) {
            //点击前一页
            var me = this;
            var controllerOption = me.options.controller;
            if ($(that).hasClass(controllerOption.disablePrevClass)) {
                return false;
            }
            var startDay = me.startDay
            me.startDay = new Date(new Date(startDay).setMonth(startDay.getMonth() - (me.options.initLen || 2)));
            me.renderCalendar();
        },
        check: function () {
            //检查前后是否可以点击
            var me = this;
            var startDay = new Date(me.startDay);
            var len = (me.options.initLen || 2);
            var endDay = new Date(new Date(startDay).setMonth(startDay.getMonth() + len - 1));
            var rangeDate = me.rangeDate;
            var controller = me.controller;
            var controllerOption = me.options.controller;
            var prevBtn = controller.filter(controllerOption.prevClass);
            var nextBtn = controller.filter(controllerOption.nextClass);
            var compareMonth = me.compareMonth;
            //向前判断
            if (compareMonth(rangeDate[0], startDay)) {
                !prevBtn.hasClass(controllerOption.disablePrevClass) && prevBtn.addClass(controllerOption.disablePrevClass);
            } else {
                prevBtn.hasClass(controllerOption.disablePrevClass) && prevBtn.removeClass(controllerOption.disablePrevClass);
            };
            //向后判断
            if (compareMonth(endDay, rangeDate[1])) {
                !nextBtn.hasClass(controllerOption.disableNextClass) && nextBtn.addClass(controllerOption.disableNextClass);
            } else {
                nextBtn.hasClass(controllerOption.disableNextClass) && nextBtn.removeClass(controllerOption.disableNextClass);
            };

        },
        compareMonth: function (dayA, dayB) {
            //比较dayA>=dayB
            var dayAY = dayA.getFullYear();
            var dayBY = dayB.getFullYear();
            return (dayAY > dayBY) || (dayAY === dayBY && dayA.getMonth() >= dayB.getMonth());
        },
        getNode: function () {
            return this.node;
        },
        getController: function () {
            return this.controller;
        },
        initController: function (controllerNode) {
            var controllerBar = controllerNode;
            var me = this;
            var $controllerBar = $(controllerBar.barHtml);
            $controllerBar.filter(controllerBar.prevClass).bind('click', function (e) {
                e.preventDefault();
                me.prevPage(this);
                return false;
            });
            $controllerBar.filter(controllerBar.nextClass).bind('click', function (e) {
                e.preventDefault();
                me.nextPage(this);
                return false;
            });
            return $controllerBar;
        }
    };

    var SearchCalendar = {
        init: function () {
            SearchCalendar.bindOperate();
            //模板的算MinPrice
            Handlebars.registerHelper('isRealtimePrice', function (MinPrice, options) {
                return MinPrice == 0 ? options.fn(this) : options.inverse(this);
            });
        },
        CalendarBars: {
            //初始化CalendarBars以供之后操作
        },
        judgeComment: function ($el) {
            if ($el.find('.comment02 b').hasClass('up')) {
                $el.find('.comment02 b').removeClass('up').addClass('down');
                $el.find('.comment_content').hide();
            }
        },
        bindOperate: function () {

            //点击查看班期按钮
            $('#searchResultContainer').delegate('.sea_schedule', 'click', function (e) {
                var $el = $(this);
                var $parent = $el.parents('li');
                SearchCalendar.judgeComment($parent);
                var calendarPanel = $parent.find('.calendar_top');
                if ($el.find('b').hasClass('up')) {//若展开则收起
                    calendarPanel.stop(true, true).slideUp();
                    calendarPanel.parent().find('.reference_price').hide();
                    $parent.find('.loading_tip02').remove();
                    $el.find('b').removeClass('up').addClass('down');
                } else {//若收起则展开
                    $el.find('b').removeClass('down').addClass('up');
                    if (calendarPanel.find('.search_calendar_box').length < 1) {
                        SearchCalendar.loadData($el);
                    } else {
                        calendarPanel.stop(true, true).slideDown();
                        calendarPanel.parent().find('.reference_price').show();
                    }
                }
                e.preventDefault();
            });
        },
        parseDate: function (DateStr) {
            var dateT = DateStr.indexOf('T');
            DateStr = dateT != -1 ? DateStr.substring(0, dateT) : DateStr;
            return new Date(DateStr.replace(/-/g, '/'));
        },
        loadData: function ($el) {
            //获取后端数据
            var pid = $el.attr('pid');
            var calendarPanel = $el.parents('li').find('.calendar_top');

            $.ajax({
                url: '/Package-Booking-VacationsOnlineSiteUI/handler2/producthandler.ashx',
                dataType: 'json',
                data: { "pid": pid, "begin": $el.attr('begin'), "end": $el.attr('end'), "DepartureCityId": $el.attr('DepartureCityId') },
                type: 'GET',
                beforeSend: function () {
                    //加载loading效果
                    calendarPanel.before('<div class="loading_tip02"><img src="http://pic.c-ctrip.com/vacation_v1/loading_transparent.gif"> 正在加载，请稍候......</div>');
                },
                success: function (jsonData) {
                    //删除loading效果
                    //对数据进行解析
                    SearchCalendar.initCalendars($el, jsonData, pid);
                }
            });
        },
        initData: function (jsonData) {
            //加载数据
            var CalendarDate = {};
            CalendarDate.availableDate = {};
            CalendarDate.festivalsDate = {};
            //可获取日期
            _.each(jsonData.ProductCalendarDailyList, function (d) {
                var dateDivide = d.Date.indexOf('T');
                var dateStr = d.Date;
                if (dateDivide != -1) {
                    dateStr = dateStr.substr(0, dateDivide);
                    d.Date = dateStr
                }
                CalendarDate.availableDate[dateStr] = d;
            });
            //将有效时间进行排序，取出dateRange

            var rangeDate = _.sortBy(jsonData.ProductCalendarDailyList, function (d) {
                return d.Date
            });
            rangeDate.length >= 1 && (CalendarDate.rangeDate = [SearchCalendar.parseDate(rangeDate[0].Date), SearchCalendar.parseDate(rangeDate[rangeDate.length - 1].Date)]);
            //festival暂时不用
            /* _.each(jsonData.Festivals, function (festival) {
            if (festival.OnlineShow) {
            var dateInAvailableDate = _.find(CalendarDate.availableDate, function (d) { return d.Date == festival.FestivalDate });
            if (dateInAvailableDate) {
            dateInAvailableDate.IsShowFestival = true;
            dateInAvailableDate.FestivalName = festival.FestivalName;
            CalendarDate.festivalsDate[festival.FestivalDate] = festival;
            }
            }
            });*/
            return CalendarDate;
        },
        initCalendars: function ($el, jsonData, pid) {
            //对日历初始化加载
            var CalendarDate = SearchCalendar.initData(jsonData);
            var availableDate = CalendarDate.availableDate;
            var calendar_panel = $el.parents('li').find('.search_calendar');
            // var festivalsDate = CalendarDate.festivalsDate;
            //对数据进行解析，应该涵盖节假日情况
            //日历为本月和下一月的，如果需要进行CalendBar的动态功能，如查看下几个月的日历需要对CalendarBar进行缓存并添加相应函数
            var parentItem = $el.parents('li');
            var curCalendarBar;
            if (!CalendarDate.rangeDate) {
                parentItem.find('.loading_tip02').html('暂无班期');
                return false;
            }
            parentItem.find('.loading_tip02').remove();
            parentItem.find('.calendar_top').slideDown();
            if (parentItem.find('.reference_price').length > 0) {
                reference_price.find('.reference_price').show();
            } else {
                parentItem.find('.calendar_top').after('<div class="reference_price">*以上价格为参考起价</div>');
            }
            SearchCalendar.CalendarBars[pid] = curCalendarBar = new CalendarBar({
                available: availableDate
                , range: CalendarDate.rangeDate
                , assemble: function (calendarNodes) {
                    return calendarNodes && $('<div class="search_calendar_list"></div>').append(calendarNodes);
                }
                , renderCalendar: function (node) {
                    //在页面中显示
                    calendar_panel.find('.search_calendar_list').remove();
                    calendar_panel.append(node);
                }
                , controller: {
                    barHtml: '<a class="pkg_circle_top" title="" href="javascript:;"></a><a class="pkg_circle_bottom" title="" href="javascript:;"></a>'
                    , prevClass: '.pkg_circle_top'
                    , nextClass: '.pkg_circle_bottom'
                    , disablePrevClass: 'pkg_circle_top_disable'
                    , disableNextClass: 'pkg_circle_bottom_disable'
                }
                , dateClick: function () {
                    var $this = $(this);
                    if ($this.parent().hasClass('on')) {
                        var selectUrl = $this.parents('li').find('.sea_schedule').attr('url')
                        selectUrl = selectUrl.indexOf('#') != -1 ? selectUrl + '&selectDate=' + $(this).data('date') : selectUrl + '#selectDate=' + $(this).data('date');
                        window.open(selectUrl, '_blank');
                    }
                }
                , calendar: {
                    titleTpl: CalendarTpl.titleTpl, //提供month和year参数
                    calendarTpl: CalendarTpl.calendarTpl, //提供dateTitle和dateBody参数
                    dayRender: function (dateStr, dateIns, firstDayInMaxMonth, week, dayCount, row, col) {
                        var NotMainMonth = dateIns.getMonth() != firstDayInMaxMonth.getMonth(); //不在主要月份
                        var DateStr = dateStr;
                        var dateStr = dateStr; //数据特有格式，建议传来数据的时候去掉这个...
                        var date = _.find(availableDate, function (date) { return date.Date == dateStr }); //是否在可选月内，选出数据条目
                        var DayStr = CalendarUtil.pad(dateIns.getDate(), 2, '0', true); //将日期的内容不满零的补全
                        // var festival = _.find(festivalsDate, function (d) { return d.Date == dateStr }); //是否在没有激活的时候才显示，模板里是激活的时候也有显示  

                        return Handlebars.compile(CalendarTpl.itemTpl)(_.extend({
                            // 只要没有“售完”就会激活
                            Active: date || false,
                            ClassNames: NotMainMonth && 'bg_blue'
                                , DayStr: DayStr
                                , DateStr: DateStr
                            //,IsShowFestival: festival
                            // ,FestivalName: festival && festival.FestivalName,
                        }, date));
                    }
                }
            });
            //将控制器插入页面中
            calendar_panel.prepend(curCalendarBar.getController());
        }
    }
    exports.init = SearchCalendar.init;
});