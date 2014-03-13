//详情页日历部分
define(function (require, exports, module) {
    var $ = require("../../../lib/jquery"),
		_ = require("../../../lib/underscore"),
		EventEmitter = require("Modules/EventEmitter"),
		util = require('./mod_util');
	//var bigcalendar = require('../public/bigcalendar');
	var calendarDataManager = require('./mod_detail_dataManager').calendar;

	var CalendarBig = require('../Modules/CalendarBig');
	var Util = require('../Modules/Util');
	var UtilCalendar = Util.calendar;
	var tplDay = Handlebars.compile(require('../tpl/Modules/CalendarBig/Day.html.js'));

	var ClassName = {
		NOT_MAIN_MONTH: 'bg_blue'
	};

	GV.once('calendar-big-inited', function(calendar){
	    GV.on('calendar_day_click', function (availableDate, day) {
	        if (!calendar.contain(availableDate.Date)) {
	            calendar.changeToDate(availableDate.Date);
	        }
			calendar.setCurrentDate(day || availableDate.Date);
		});

		GV.on('sell-out-this-day', function (date) {
			var dateData = calendarDataManager.getDateData(date); //availableDate[util.dtdate(date)]
			if (dateData) {
				dateData.Over = true;
				calendar.getDay(date).deactive().setSellout();
			}
		});
	});

	GV.on('first-screen-data-calendar-loaded', function (calendarData) {
	    calendarDataManager.init(calendarData);

        // 告诉需要等待日历数据的地方（如小日历）
	    GV.emit('calendar-data-inited');

	    var availableDate = calendarDataManager.getAvailableDate();
	    var bigCalendarData = calendarDataManager.getBigCalendar();
		var calendar = new CalendarBig({
		    range: bigCalendarData.dateRange,
	        showPrevNext: true,
			firstDate_onWhichLine: 0,
	        dayRender: function (dateStr, dateIns, firstDayInMaxMonth, week, dayCount, row, col) {
				// 只要是显示前后的月份，这个都不会不存在的
				if(!dateStr) return '<td></td>';

				var NotMainMonth = dateIns.getMonth() != firstDayInMaxMonth.getMonth();
				var date = _.find(availableDate, function(date){return date.Date == dateStr});
				var DayStr = Util.pad(dateIns.getDate(), 2, '0', true);
				if(date){
					return tplDay(_.extend({
						// 只要没有“售完”就会激活
						Active: !date.Over,
						ClassNames: NotMainMonth && ClassName.NOT_MAIN_MONTH,
						DayStr: DayStr
					}, date));
				}
				else{
				    var festival = _.find(bigCalendarData.festivalsDate, function(d){ return d.Date == dateStr});
				    return tplDay({
				        IsShowFestival: festival,
				        FestivalName: festival && festival.Name,
						ClassNames: NotMainMonth && ClassName.NOT_MAIN_MONTH,
						DayStr: DayStr
					});
				}

	        }
	    });
		GV.emit('calendar-big-inited', calendar);

	    calendar.on('click-day', function (event) {
			// 按理说这个不应该找不到
	        var d = calendarDataManager.getDateData(UtilCalendar.format(event.day.date, 'yyyy-mm-dd'));
	        if (d) {
	            GV.emit('calendar_day_click', d, event.day);
	        }
            // 不是可选日期
	        else {
	            event.preventDefault();
	        }
	    });

	    calendar.on('change-day', function (event) {
	        event.prevDay && event.prevDay.setNotCurrent();
	        event.day && event.day.setToCurrent();
		});

	    GV.ready(function () {
			$('#js_calendar').html(calendar.getNode());
		});
	});
});