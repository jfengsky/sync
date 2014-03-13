define(function(){
	return "{{#anyNoneEmpty flight hotel freeTravel goldenguide goodbrand announcedGroup}}\n\
<dl class=\"special_info\">\n\
	<dt>特色</dt>\n\
	<dd>\n\
		{{#if flight}}<span class=\"flt_ico\">可选机票</span>{{/if}}\n\
		{{#if hotel}}<span class=\"htl_ico\">可选酒店</span>{{/if}}\n\
		{{#if freeTravel}}<span class=\"free_ico\">自由活动</span>{{/if}}\n\
		{{#if goldenguide}}<span class=\"gold_ico\">金牌导游</span>{{/if}}\n\
		{{#if goodbrand}}<span class=\"sh_ico\">上海名牌</span>{{/if}}\n\
		{{#if announcedGroup}}<span class=\"group_ico\">铁定成团</span>{{/if}}\n\
	</dd>\n\
</dl>\n\
{{/anyNoneEmpty}}"});