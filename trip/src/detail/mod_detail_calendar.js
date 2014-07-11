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
    /*
    *@Author guow
    *@Date  2014-04-02
    *@Desc 链接中带selectDate的情况触发自动点击日历事件
    */
	GV.on("auto-load-date", function () {
	    var searchArr = window.location.hash.substr('1').split('&');
	    if (searchArr && searchArr.length > 0) {
	        for (var i = 0, len = searchArr.length; i < len; i++) {
	            searchItem = searchArr[i].split('=');
	            if (searchItem && searchItem.length === 2 && searchItem[0] === "selectDate") {
	                searchItem[1] && GV.emit('calendar_day_click', { Date: searchItem[1] }, searchItem[1]);
	                return;
	            }
	        }
	    }
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
				var HighLight = false;              //offline风险班期：当该日期有奖励时，高亮显示
                if(GV.app.detail.ClientSource == "Offline") HighLight = calendarDataManager.getRiskRewardData(dateStr)===null ? false : true;
                var IsTourGroupProduct = GV.app.detail.data.IsTourGroupProduct;              //是否为多线路产品
				if(date){
					return tplDay(_.extend({
					    // 只要没有“售完”就会激活
					    HighLight: HighLight,
                        IsTourGroupProduct: IsTourGroupProduct,
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

        //offline风险班期，日历hover时浮动层显示奖励价格
        if(GV.app.detail.ClientSource == "Offline"){
            calendar.on('mouseenter-day', function(event){
                var node = event.day.node;
                if(node.hasClass("on1")){
                    var top = node.position().top + 22,
                        left = node.position().left + 40;
                    var riskReward = calendarDataManager.getRiskRewardData(UtilCalendar.format(event.day.date, 'yyyy-mm-dd'));
                    $("#js_calendar div.calendar_time_alert").children("div").html(riskReward)
                        .end().css({top:top, left:left}).show()
                        .off().on("mouseenter", function(){ $(this).show();});
                }
            });
            calendar.on('mouseleave-day', function(event){
                $("#js_calendar div.calendar_time_alert").hide();
            });
        }

	    calendar.on('change-day', function (event) {
	        event.prevDay && event.prevDay.setNotCurrent();
	        event.day && event.day.setToCurrent();
		});

	    GV.ready(function () {
	        $('#js_calendar').html(calendar.getNode());
	        //触发自动加载预定信息
	         GV.emit("auto-load-date");
		});
	});
});