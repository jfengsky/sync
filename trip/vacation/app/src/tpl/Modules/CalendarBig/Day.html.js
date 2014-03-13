define(function(){
	return "{{#if Active}}\n\
<td class=\"on\">\n\
	<a href=\"javascript:;\" {{#if ClassNames}}class=\"{{ClassNames}}\"{{/if}} {{#if IsShowFestival}}title=\"{{FestivalName}}\"{{/if}}>\n\
		<span class=\"date basefix\">{{#if IsShowFestival}}<i>节</i>{{/if}}{{DayStr}}</span>\n\
		<span class=\"team\">\n\
			{{#if IsAnnouncedGroup}}成团{{/if}}\n\
			{{#if Over}}\n\
			售完\n\
			{{else}}\n\
			{{#is RemainingInventory \'>=\' 10}}\n\
			充足\n\
			{{else}}\n\
			{{#is RemainingInventory -99999}}\n\
			{{! -99999 表示 充足，但是不显示 }}\n\
			{{else}}\n\
			余{{RemainingInventory}}{{#unless IsAnnouncedGroup}}位{{/unless}}\n\
			{{/is}}\n\
			{{/is}}\n\
			{{/if}}\n\
	    </span>\n\
	    <span class=\"calendar_price01\">{{#isRealtimePrice MinPrice}}实时计价{{else}}<dfn>&yen;</dfn>{{MinPrice}}<em>起</em>{{/isRealtimePrice}}</span>\n\
	</a>\n\
</td>\n\
{{else}}\n\
<td>\n\
	<a href=\"javascript:;\" {{#if ClassNames}}class=\"{{ClassNames}}\"{{/if}} {{#if IsShowFestival}}title=\"{{FestivalName}}\"{{/if}}>\n\
		<span class=\"date basefix\">{{#if IsShowFestival}}<i>节</i>{{/if}}{{DayStr}}</span>\n\
	</a>\n\
</td>\n\
{{/if}}"});