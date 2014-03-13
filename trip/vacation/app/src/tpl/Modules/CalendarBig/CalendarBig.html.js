define(function(){
	return "{{#if needWrapper}}<div class=\"calendar\">{{/if}}\n\
    <div id=\"{{IdName}}\" class=\"CalendarBig {{ClassNames}}\">\n\
        <ul class=\"calendar_num basefix CalendarTitle\">\n\
            <li class=\"bold\">六</li>\n\
            <li>五</li>\n\
            <li>四</li>\n\
            <li>三</li>\n\
            <li>二</li>\n\
            <li>一</li>\n\
            <li class=\"bold\">日</li>\n\
        </ul>\n\
        <div class=\"basefix CalendarBody\">\n\
            <div class=\"calendar_left CalendarMonthCtrl\">\n\
                {{{MonthHtml}}}\n\
                <a href=\"javascript:void(0);\" title=\"上一月\" class=\"CalendarPrev pkg_circle_top pkg_circle_top_disable\">上一月</a>\n\
                <a href=\"javascript:void(0);\" title=\"下一月\" class=\"CalendarNext pkg_circle_bottom pkg_circle_bottom_disable\">下一月</a>\n\
            </div>\n\
            <table class=\"calendar_right CalendarDate\">\n\
                {{{DateHtml}}}\n\
            </table>\n\
        </div>\n\
        <div class=\"bigcalendar_loding CalendarLoading\" style=\"display:none;\">\n\
            <span class=\"loading\">查询中，请稍后...</span>\n\
        </div>\n\
    </div>\n\
{{#if needWrapper}}</div>{{/if}}"});