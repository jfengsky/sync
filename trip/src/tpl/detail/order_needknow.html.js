define(function(){
	return "<a id=\"ydxz\" class=\"under_tab_anchor\">&nbsp;</a>\n\
<h3 class=\"resource_title\">预订须知<i class=\"icon_b icon_b_06\"></i></h3>\n\
<p class=\"group_book_notice\">({{{CorpDescInfo}}})</p>\n\
{{#each OrderingNeedToKnowInfoDetails}}\n\
	{{#notEmpty Details}}\n\
		<dl class=\"detail_date\">\n\
			<dt>{{{TitleName}}}</dt>\n\
			<dd>\n\
				<ul class=\"num_list\">\n\
					{{#each Details}}\n\
					<li>{{{Detail}}}</li>\n\
					{{/each}}\n\
				</ul>\n\
			</dd>\n\
		</dl>\n\
	{{/notEmpty}}\n\
{{/each}}\n\
{{#notEmpty PayInfos}}\n\
<dl class=\"detail_date\">\n\
	<dt>支付信息</dt>\n\
	<dd>\n\
        <ul class=\"num_list\">\n\
            {{#each PayInfos}}\n\
            <li>{{{Desc}}}</li>\n\
            {{/each}}\n\
        </ul>\n\
	</dd>\n\
</dl>\n\
{{/notEmpty}}\n\
{{#notEmpty SafetyGuide}}\n\
<dl class=\"detail_date border_none\">	\n\
	<dt>安全指南</dt>\n\
	<dd>\n\
		<p>{{{SafetyGuide}}}</p>\n\
	</dd>\n\
</dl>\n\
{{/notEmpty}}"});