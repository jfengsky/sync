define(function(){
	return "{{! 任何一个不为空 }}\n\
{{#anyNoneEmpty FeeInfos FlightContains}}\n\
{{#unless isInDetailInfoBox}}\n\
<div id=\"js-money-contain\" class=\"flt_htl_resource basefix\">\n\
{{else}}\n\
<a class=\"under_tab_anchor\" id=\"expense\">&nbsp;</a>\n\
{{/unless}}\n\
    {{#if isInDetailInfoBox}}\n\
	<h3 class=\"resource_title\">\n\
		费&nbsp;&nbsp;用<i class=\"icon_b icon_b_03\"></i>\n\
	</h3>\n\
    {{/if}}\n\
	{{#notEmpty FeeInfos}}\n\
		{{#if isInDetailInfoBox}}\n\
			<dl class=\"detail_date\"{{#isEmpty FlightContains Activities}} style=\"border-bottom:0;margin-bottom:0;padding-bottom:0\"{{/isEmpty}}>\n\
				{{#each FeeInfos}}\n\
					{{#notEmpty PkgDescEntitys}}\n\
					<dt>{{{TitleName}}}</dt>\n\
		            <dd>\n\
					    <ul class=\"num_list\">\n\
						    {{#each PkgDescEntitys}}\n\
						    <li>{{{Detail}}}</li>\n\
						    {{/each}}\n\
					    </ul>\n\
		            </dd>\n\
					{{/notEmpty}}\n\
				{{/each}}\n\
			</dl>\n\
		{{else}}\n\
			<div class=\"cost_detail\"{{#isEmpty FlightContains Activities}} style=\"border-bottom:0;margin-bottom:0;padding-bottom:0\"{{/isEmpty}}>\n\
				{{#each FeeInfos}}\n\
					{{#notEmpty PkgDescEntitys}}\n\
					<h4 class=\"resource_detail_title2\">{{{TitleName}}}</h4>\n\
					<ul class=\"resource_detail_list\">\n\
					    {{#each PkgDescEntitys}}\n\
					    <li>{{{Detail}}}</li>\n\
					    {{/each}}\n\
				    </ul>\n\
					{{/notEmpty}}\n\
				{{/each}}\n\
			</div>\n\
		{{/if}}\n\
	{{/notEmpty}}\n\
	{{! 只有详细介绍框才有 }}\n\
    {{#notEmpty Activities}}\n\
    <dl class=\"detail_date border_none\">\n\
		<dt>推荐活动参考 （需自费）</dt>\n\
		<dd>\n\
			<div class=\"transparent_group\">\n\
				<table>\n\
					<tbody>\n\
						<tr>\n\
							<th style=\"width:210px\">活动</th>\n\
							<th style=\"width:162px\">参考价格</th>\n\
							<th>说明</th>\n\
						</tr>\n\
                        {{#each Activities}}\n\
						<tr>\n\
							<td>{{{ActivityName}}}</td>\n\
							<td>{{{ReferPrice}}}</td>\n\
							<td>{{{Description}}}</td>\n\
						</tr>\n\
                        {{/each}}\n\
						<tr>\n\
							<td colspan=\"3\">以上所列项目均是建议性项目，客人本着“自愿自费”的原则选择参加，部分项目参加人数不足时，则可能无法成行或费用做相应调整。</td>\n\
						</tr>\n\
					</tbody>\n\
				</table>\n\
			</div>\n\
		</dd>\n\
	</dl>\n\
    {{/notEmpty}}\n\
{{#unless isInDetailInfoBox}}\n\
</div>\n\
{{/unless}}\n\
{{/anyNoneEmpty}}"});