define(function(){
	return "<p>\n\
	{{#is MonthCount 2}}\n\
	<span class=\"border {{#is FirstMonthLineCount 2}}two{{else}}three{{/is}}_line\">{{#is FirstMonthLineCount \'>\' 2}}{{YearInMaxMonth}}年<br>{{/is}}{{MonthFirst}}月</span>\n\
	<span class=\"{{#is FirstMonthLineCount 2}}three{{else}}two{{/is}}_line\">{{#is FirstMonthLineCount \'<=\' 2}}{{YearInMaxMonth}}年<br>{{/is}}{{MonthSecond}}月</span>\n\
	{{else}}\n\
	<span>{{Year}}年<br>{{Month}}月</span>\n\
	{{/is}}\n\
</p>"});