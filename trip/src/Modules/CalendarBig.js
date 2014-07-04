//新日历
// 依赖： seajs、Handlebars、inherit、is-helper、jQuery、underscore
define(function (require, exports, module) {

    var $ = require('jquery');
    var _ = require('underscore');
    var inherit = require('lib/inherit');
    var EventEmitter = require('Modules/EventEmitter');
    var EventObject = require('Modules/EventObject');
    var Util = require('./Util');
    var UtilCalendar = Util.calendar;

    var tplMonthCtrl = Handlebars.compile(require('../tpl/Modules/CalendarBig/MonthCtrl.html.js'));
    var tplFrame = Handlebars.compile(require('../tpl/Modules/CalendarBig/CalendarBig.html.js'));

    var Day = inherit({
        /*
        * @param {Date} date
        * @param {jQueryNode} node
        */
        __constructor: function (options) {
            this.date = options.date;
            this.node = options.node;
			this.nodeA = options.node.find('a');
        },
        //active: function () {this.node.addClass('on')},
        deactive: function () {this.node.removeClass('on');return this},
		setSellout: function(){this.node.find('.team').text('售完');return this},
		setToCurrent: function(){this.nodeA.addClass('current')},
		setNotCurrent: function(){this.nodeA.removeClass('current')}
    });


    var CLASS_NAMES = {
        DISABLE_NEXT_MONTH: 'pkg_circle_bottom_disable',
        DISABLE_PREV_MONTH: 'pkg_circle_top_disable'
    };
    /*
    * @event click-day({Event}event{dayInstance})
    * @event change-day({Event}event{{Day}day, {Day}prevDay)
    * @event change-month({Event}event{type, 待定})
    */
    var Calendar = inherit({
        /*
        * @param {Array} range ['2013-12-25', '2014-08-26']
        * @param {Function} dayRender({String}dateStr, {Date}date, {Date}firstDayInMaxMonth, {}week, {Number}dayCount, {Number}row, {Number}col)
        * @param {String} [classNames] 'class1 class2'
        * @param {String} [idName] 'my-calendar'
        * @param {String} [weekorder = '7123456']
        * @param {Boolean} [showPrevNext]
        * @param {Number|Const} [firstDate_onWhichLine = 'default'] 取值范围：[0-6|default]
        * @param {Number} [lineCount = 5] 
        * @param {Boolean} [needWrapper]
        * @param 
        */
        __constructor: function (options) {
            options = this.options = _.extend({
                lineCount: 5
                , firstDate_onWhichLine: 'default'
                , weekorder: '7123456'
            }, options);
            this.currentDateShown = UtilCalendar.strToDate(options.range[0]);
            this.currentMonthArr = showDate_returnMonthArr(this.currentDateShown, options.showPrevNext, options.lineCount, options.firstDate_onWhichLine, options.weekorder);
			// 只要传递了 firstDate_onWhichLine 这个参数，就意味着需要显示双月
            var monthHtml = this._showMonthHTML(this.currentMonthArr, options.firstDate_onWhichLine != 'default');
            var dateHtml = this._showDateHTML(this.currentMonthArr);
            var html = tplFrame({
                ClassNames: options.classNames
                , IdName: options.idName
                , MonthHtml: monthHtml
                , DateHtml: dateHtml
                , needWrapper: options.needWrapper
            });
            var node;

            this.node = node = $(html);
            this.nodeNextMonth = node.find('.CalendarNext');
            this.nodePrevMonth = node.find('.CalendarPrev');
            this.nodeLoading = node.find('.CalendarLoading');
            this.nodeMonthCtrl = node.find('.CalendarMonthCtrl');
            this.nodeDateCtrl = node.find('.CalendarDate');

            // 模板默认渲染出来是禁用的
            this.isNextMonthButtonDisabled = true;
            this.isPrevMonthButtonDisabled = true;

            this.startDate = UtilCalendar.strToDate(options.range[0]);
            this.endDate = UtilCalendar.strToDate(options.range[1]);

            this.checkClickable();

            _.bindAll(this, 'onNextMonthClick', 'onPrevMonthClick', 'onDayClick', 'onDayEnter', 'onDayLeave');
            this.nodeNextMonth.on('click', this.onNextMonthClick);
            this.nodePrevMonth.on('click', this.onPrevMonthClick);
            this.nodeDateCtrl.on('click', 'td', this.onDayClick);
            this.nodeDateCtrl.on('mouseenter', 'td', this.onDayEnter);
            this.nodeDateCtrl.on('mouseleave', 'td', this.onDayLeave);
        },
        /**
        * @param {Date|String} date
        */
        contain: function (date) {
            if (_.isString(date)) date = UtilCalendar.strToDate(date);
            if (!(date instanceof Date)) throw 'date should be a instance of Date.';
            return contain(this.currentMonthArr, date);
        },
        getNode: function () {
            return this.node;
        },
        /*
        * 一个方便的更改显示日期的方法
        * 
        * @param {Date|String} date '2014-01-01'
        */
        changeToDate: function (date) {
            return this.showDate(date).showMonth().checkClickable();
        },
        _showDateHTML: function (monthArr) {
            var dayRender = this.options.dayRender;
            var html = [], _row;
            var firstDayInMaxMonth = _.max(monthArrByMonth(monthArr),function(e){return e.length})[0];
            eachDateArr(monthArr, _.bind(function (day, week, dayCount, row, col) {
                if (_row != row && col == 0) html.push('<tr>');
                html.push(dayRender(day && UtilCalendar.format(day, 'yyyy-mm-dd'), day, firstDayInMaxMonth, week, dayCount, row, col));
                if (col == 6) html.push('</tr>');
                _row = row;
            }, this));
            return html.join('');
        },
        /*
        * @param {Date|String} date '2014-01-01'
        * @param {Boolean} [showPrevNext = this.options.showPrevNext]
        * @param {Number} line 0 - 默认位置, 1 - 第一行, 5 - 第五行
        */
        showDate: function (date, showPrevNext, lineCount, onWhichLine, weekorder) {
            var o = this.options;
            date = UtilCalendar.strToDate(date);
            if(_.isUndefined(showPrevNext)) showPrevNext = o.showPrevNext;
            this.currentMonthArr = showDate_returnMonthArr(date, showPrevNext, lineCount || o.lineCount, onWhichLine || 'default', weekorder || o.weekorder);
            var html = this._showDateHTML(this.currentMonthArr);
            this.nodeDateCtrl.html(html);
            this.currentDateShown = date;
            return this;
        },
        _showMonthHTML: function (monthArr, showMultiMonthTitle) {
            // 至少要大于1行的月份
            var monthsByMonth = monthArrByMonth(monthArr),
                validMonthsByMonth = _.filter(monthsByMonth, function (month) { return month.length > 7 });
            if (showMultiMonthTitle && validMonthsByMonth.length > 1) {
                monthsByMonth = validMonthsByMonth;

                this.shownMonthCount = monthsByMonth.length;
                var dateInFirstMonth = this.dateInFirstMonth = monthsByMonth[0][0];
                var dateInSecondMonth = this.dateInSecondMonth = monthsByMonth[1] && monthsByMonth[1][0];

                return tplMonthCtrl({
                    MonthCount: monthsByMonth.length,
                    FirstMonthLineCount: Math.ceil(monthsByMonth[0].length / 7),
                    YearInMaxMonth: (monthsByMonth[0].length > monthsByMonth[1].length ? dateInFirstMonth : dateInSecondMonth).getFullYear(),
                    MonthFirst: dateInFirstMonth.getMonth() + 1,
                    MonthSecond: dateInSecondMonth && (dateInSecondMonth.getMonth() + 1)
                });
            }
            else {
                var month = _.max(monthsByMonth, function (month) { return month.length });
                var firstDate = month[0];
                this.shownMonthCount = 1;
                return tplMonthCtrl({
                    MonthCount: 1,
                    Year: firstDate.getFullYear(),
                    Month: firstDate.getMonth() + 1
                });
            }
        },
        showMonth: function (monthArr, showMultiMonthTitle) {
            monthArr = monthArr || this.currentMonthArr;
            var html = this._showMonthHTML(monthArr, showMultiMonthTitle);
            this.nodeMonthCtrl.find('p').replaceWith(html);
            return this;
        },
		// 至于什么时候什么情况是当前天，并不确定，情况多样，
        // 组建内部只在点击某天之后设置当前天，其他情况需要手动管理“currentDay”
		/*
		* @param {Date|Day|String} date
		* */
		setCurrentDate: function(date){
			var day;
			if(date instanceof Day) {
				day = date;
				date = date.date;
			}
			else if (typeof date == 'string') date = UtilCalendar.strToDate(date);

			if (!this.currentDay || this.currentDay.date.getTime() != date.getTime()) {
			    var currentDay = day || this.getDay(date);
			    var prevDay = this.currentDay;
			    var event = new EventObject({
			        day: currentDay,
			        prevDay: prevDay
			    });
			    this.emit('change-day', event);
			    if (!event.isPreventDefault) {
			        this.prevDay = prevDay;
			        this.currentDay = currentDay;
			    }
			}
			return this;
		},
		/*
		* @param {Date|Day|String} date
		* */
		getDay: function(date){
			if(date instanceof Day) return date;
			if(!date) return date;
			date = UtilCalendar.strToDate(date);
			var info = infoInArray(this.currentMonthArr, date);
			if(info.row !== undefined){
				var node = this.nodeDateCtrl.find('tr:eq('+info.row+')').find('td:eq('+info.col+')');
				return new Day({
					node: node,
					date: this.currentMonthArr[info.row][info.col]
				});
			}
		},
        checkClickable: function () {
            if(contain(this.currentMonthArr, this.startDate)){
                this.switchMonButtonShown(true, true);
            }
            else {
                this.switchMonButtonShown(true, false);
            }
            if(contain(this.currentMonthArr, this.endDate)){
                this.switchMonButtonShown(false, true);
            }
            else {
                this.switchMonButtonShown(false, false);
            }
        },
        switchMonButtonShown: function (isPrev, isDisable) {
            if (isPrev) {
                if (this.isPrevMonthButtonDisabled != isDisable) {
                    this.isPrevMonthButtonDisabled = isDisable;
                    this.nodePrevMonth[isDisable ? 'addClass' : 'removeClass'](CLASS_NAMES.DISABLE_PREV_MONTH);
                }
            }
            else {
                if (this.isNextMonthButtonDisabled != isDisable) {
                    this.isNextMonthButtonDisabled = isDisable;
                    this.nodeNextMonth[isDisable ? 'addClass' : 'removeClass'](CLASS_NAMES.DISABLE_NEXT_MONTH);
                }
            }
        },
        onDayClick: function (e) {
            var nodeDay = $(e.currentTarget);
            var col = nodeDay.index(),
                row = nodeDay.parents('tr').index();
            var date = this.currentMonthArr[row][col];

            var event = new EventObject({
                day: new Day({ node: nodeDay, date: date })
            });
            this.emit('click-day', event);
            if (!event.isPreventDefault) {
                this.setCurrentDate(date);
            }
        },
        onDayEnter: function (e){
            var nodeDay = $(e.currentTarget);
            var col = nodeDay.index(),
                row = nodeDay.parents('tr').index();
            var date = this.currentMonthArr[row][col];

            var event = new EventObject({
                day: new Day({ node: nodeDay, date: date })
            });
            this.emit('mouseenter-day', event);
        },
        onDayLeave: function(e){
            var nodeDay = $(e.currentTarget);
            var col = nodeDay.index(),
                row = nodeDay.parents('tr').index();
            var date = this.currentMonthArr[row][col];

            var event = new EventObject({
                day: new Day({ node: nodeDay, date: date })
            });
            this.emit('mouseleave-day', event);
        },
        onNextMonthClick: function () {
            if (!this.isNextMonthButtonDisabled) {
                var prevCurrentDateShown = this.currentDateShown;
                var currentDateShown;
                if (this.shownMonthCount == 1) {
                    var d = this.currentDateShown;
                    currentDateShown = new Date(d.getFullYear(), d.getMonth() + 1, 1);
                }
                // 先原来只展示一半的月份完全展示出来
                else {
                    var d = this.dateInSecondMonth;
                    currentDateShown = new Date(d.getFullYear(), d.getMonth(), 1);
                }
                var event = new EventObject({
                    type: 'next',
                    currentDateShown: currentDateShown,
                    prevCurrentDateShown: prevCurrentDateShown
                });
                this.emit('change-month', event);
                if (!event.isPreventDefault) {
                    this.currentDateShown = currentDateShown;
                    this.changeToDate(this.currentDateShown);
                }
            }
        },
        onPrevMonthClick: function () {
            if (!this.isPrevMonthButtonDisabled) {
                var prevCurrentDateShown = this.currentDateShown;
                var currentDateShown;
                if (this.shownMonthCount == 1) {
                    var d = this.currentDateShown;
                    currentDateShown = new Date(d.getFullYear(), d.getMonth() - 1, 1);
                }
                else {
                    var d = this.dateInSecondMonth;
                    currentDateShown = new Date(d.getFullYear(), d.getMonth(), 1);
                }
                var event = new EventObject({
                    type: 'prev',
                    currentDateShown: currentDateShown,
                    prevCurrentDateShown: prevCurrentDateShown
                });
                this.emit('change-month', event);
                if (!event.isPreventDefault) {
                    this.currentDateShown = currentDateShown;
                    this.changeToDate(this.currentDateShown);
                }
            }
        }
    });
    EventEmitter.mixTo(Calendar);




    /*
    * @param {Date|String} date
    * @param {Boolean} [showPrevNext]
    * @param {Number} [lineCount = 5] /0-9/
    * @param {Number|String} [onWhichLine = 'default'] /0-9|default/
    * @param {String} [weekorder = '7123456']
    */
    function showDate_returnMonthArr(date, showPrevNext, lineCount, onWhichLine, weekorder) {
        date = UtilCalendar.strToDate(date);
        var needLineCount = lineCount || 5;
        // 类似 2014-03 月，需要 6 行
        var oneMonthMaxCount = 6;
        // 最开始要多生成几行，至少是一个月的行数，否则，类似 2014-03-30 这样的，在第6行，但却只需要显示 5 行，在生成出来的日期数组中，都无法找到这个日期
        lineCount = Math.max(needLineCount, oneMonthMaxCount);
        if (onWhichLine === undefined) onWhichLine = 'default';
        weekorder = (weekorder || '7123456').replace('7', '0');

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

        if (showPrevNext) {
            var firstDayIndex = firstAvailableDay(arr);
            eachDateArr(arr, function (day, week, dayCount, row, col) {
                if (!day) arr[row][col] = new Date(currentYear, currentMonth, dayCount - firstDayIndex + 1);
            })
        }

        var info = infoInArray(arr, date);

        // 如果原本不在第一行，最多也只能在第二行 --- 因为样式的限制，月份还有上下箭头，如果显示两个月份，但有一个只显示一行，不能完全显示出来
        if (onWhichLine <= 0 && info.row != 0) onWhichLine = 1;
        // 如果原本不在最后一行，最多也只能在倒数第二行
        else if (onWhichLine >= lineCount - 1 && info.row != lineCount - 1) onWhichLine == lineCount - 2;

        if (typeof onWhichLine == 'number' && onWhichLine != info.row) {
            var diff = onWhichLine - info.row;
            if (diff != 0) {
                var temp = [];
                for (var i = 0; i < lineCount; i++) {
                    temp[i] = arr[i - diff] || [];
                }
                arr = temp;

                if (showPrevNext) {
                    var firstDayIndex = firstAvailableDay(arr);
                    var firstDayPos = indexToPosition(firstDayIndex);
                    var firstDayInShowMonth = arr[firstDayPos.row][firstDayPos.col];
                    var year = firstDayInShowMonth.getFullYear(), month = firstDayInShowMonth.getMonth();
                    eachDateArr(arr, function (day, week, dayCount, row, col) {
                        if (!day) {
							// firstDayIndex == 0说明把显示的月份向上平移了（即显示更多下一个月的内容），反之则是原本算好的月份向下平移了（显示更多前一个月的内容）
							var date = firstDayIndex == 0 ? (dayCount + firstDayInShowMonth.getDate()) : (firstDayInShowMonth.getDate() - (firstDayIndex - dayCount));
							arr[row][col] = new Date(year, month, date);
						}
                    });
                }
            }
        }

        if (arr.length > needLineCount) {
            for (var i = 0, len = arr.length - needLineCount; i < len; i++) {
                // 如果生成的行数多了，则删除一些
                arr.pop();
            }
        }

        return arr;
    }
    /**/
    function monthArrByMonth(monthArr) {
        return _.values(_.groupBy(_.flatten(monthArr), function(date){ return date.getFullYear() + '-' + (date.getMonth()+1)}));
    }
    /*
    * @param {Array} dateArr
    * @param {Function} [weekCallback]( , week, , row)
    * @param {Function} [dayCallback](day, week, dayCount, row, col)
    */
    function eachDateArr(dateArr, dayCallback, weekCallback) {
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
    function contain(dateArr, date) {
        var contain = false;
        eachDateArr(dateArr, function (day) {
            if (day && (day.getTime() == date.getTime())) {
                contain = true;
                return false;
            }
        });
        return contain;
    }
    function indexToPosition(index) {
        return {
            row: Math.floor(index / 7),
            col: index % 7
        };
    }
    function firstAvailableDay(arr) {
        var index = -1;
        eachDateArr(arr, function (day, week, dayCount) {
            if (day) {
                index = dayCount;
                return false;
            }
        });
        return index;
    }
    function infoInArray(arr, date) {
        var dateTS = date.getTime(), info;
        eachDateArr(arr, function (day, week, dayCount, row, col) {
            if (dateTS == (day && day.getTime())) {
                info = {
                    row: row,
                    col: col
                }
                return false;
            }
        });
        return info || {};
    }

    module.exports = Calendar;
});