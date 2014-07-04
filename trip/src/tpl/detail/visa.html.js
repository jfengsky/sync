define(function(){
	return " <a id=\"ctrip_qz\" class=\"under_tab_anchor\">&nbsp;</a>\n\
<h3 class=\"resource_title\">签证/签注<i class=\"icon_b icon_b_07\"></i></h3>\n\
{{#if IsVisaNoteShow}}\n\
	<dl class=\"detail_date\"{{#unless IsVisaNoteShowBorder}} style=\"border-bottom:none\"{{/unless}}>\n\
		<dt>{{{VisaNote}}}</dt>\n\
		<dd>\n\
			<ul class=\"num_list\">\n\
				{{#each VisaContainDetails}}\n\
				<li>{{{this.Detail}}}</li>\n\
				{{/each}}\n\
			</ul>\n\
		</dd>\n\
	</dl>\n\
{{/if}}\n\
{{#if IsAgencyNoteShow}}\n\
	<dl class=\"detail_date\"{{#unless IsAgencyNoteShowBorder}} style=\"border-bottom:none\"{{/unless}}>\n\
		<dt>{{{AgencyNote}}}</dt>\n\
		<dd>\n\
			<ul class=\"num_list\">\n\
				<li>{{{AgencyContainDetail}}}</li>\n\
			</ul>\n\
		</dd>\n\
	</dl>\n\
{{/if}}\n\
{{#if IsVisaCountryShow}}\n\
	<p class=\"detail_visa_notice\">{{{VisaHeadNote}}}</p>\n\
	{{#if IsCountryTabShow}}\n\
	<div class=\"detail_visa_list basefix\">\n\
		{{#each VisaCountries}}\n\
		<a href=\"javascript:void(0);\"{{#unless @index}} class=\"current\"{{/unless}}>{{{this}}}签证</a>\n\
		{{/each}}\n\
	</div>\n\
	{{/if}}\n\
	{{#each VisaCountryInfos}}\n\
	{{! 包裹一层 div，方便管理 }}\n\
	<div class=\"js-visa-table-wrap\"{{#if @index}} style=\"display:none\"{{/if}}>\n\
		{{#if ../IsVisaTabShow}}\n\
		<div class=\"detail_visa_tips basefix\">\n\
			{{#each this}}\n\
			<a href=\"javascript:void(0);\"{{#unless @index}} class=\"current\"{{/unless}}>{{{this.Name}}}</a>\n\
			{{/each}}\n\
		</div>\n\
		{{/if}}\n\
		{{#each this}}\n\
		<div class=\"detail_visa_content\"{{#if @index}} style=\"display:none\"{{/if}}>\n\
			<div class=\"visa_type basefix\">\n\
				{{#each VisaClientTypes}}\n\
				<a href=\"javascript:void(0);\"{{#unless @index}} class=\"current\"{{/unless}}>{{{this.Name}}}</a>\n\
				{{/each}}\n\
			</div>\n\
			{{#each VisaClientTypes}}\n\
			<table class=\"visa_list\" width=\"100%\"{{#if @index}} style=\"display:none\"{{/if}}>\n\
				{{#notEmpty ../VisaWorktime}}\n\
				<tr>\n\
					<th>携程受理时间</th>\n\
					{{! TODO:还没搞明白，明明其他的 #isEmpty 的 else 里面不会改变当前 context，但这三个取 VisaWorktime 都需要比外面再多一层 }}\n\
					<td>{{{../../VisaWorktime}}}</td>\n\
				</tr>\n\
				{{/notEmpty}}\n\
				{{#notEmpty ../VisaAcceptedRange}}\n\
				<tr>\n\
					<th>受理范围</th>\n\
					<td>{{{../../VisaAcceptedRange}}}</td>\n\
				</tr>\n\
				{{/notEmpty}}\n\
				{{#each VisaStuffs}}\n\
				<tr>\n\
					<th>{{#if Options}}★{{else}}●{{/if}}{{{Name}}}</th>\n\
					<td>{{{Content}}}</td>\n\
				</tr>\n\
				{{/each}}\n\
				{{#notEmpty ../VisaRemark}}\n\
				<tr>\n\
					<th>其他注意事项</th>\n\
					<td>{{{../../VisaRemark}}}</td>\n\
				</tr>\n\
				{{/notEmpty}}\n\
			</table>\n\
			{{/each}}\n\
		</div>\n\
		{{/each}}\n\
		</div>\n\
	{{/each}}\n\
{{/if}}"});