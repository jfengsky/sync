define(function(){
	return "<div class=\"scroll_wrap\">\n\
	<table class=\"other_mask_table other_radio_table\">\n\
	    <tbody>\n\
	        <tr>\n\
	            <th class=\"col_01\">产品名称</th>\n\
	            {{#if IsTraffic}}\n\
	            <th class=\"col_02\">出发日期</th>\n\
	            {{else}}\n\
	            <th class=\"col_02\"></th>\n\
	            {{/if}}\n\
	            <th class=\"col_03\">价差</th>\n\
	            <th></th>\n\
	        </tr>\n\
	        {{#each data}}\n\
	            <tr data-index-in-data=\"{{@index}}\" data-segment-id=\"{{SegmentID}}\" data-resource-id=\"{{ResourceID}}\" class=\"js_single_tr\">\n\
	                <td class=\"col_01\"><div class=\"js-product-name product_name\">{{Name}}</div></td>\n\
	                {{#if IsTraffic}}\n\
	                <td class=\"col_02\">{{#dtdate DepartureDate}}{{/dtdate}}</td>\n\
	                {{else}}\n\
	                <td class=\"col_02\"></td>\n\
	                {{/if}}\n\
	                <td class=\"col_03\"><span class=\"ctrip_price\">{{priceDiff}}</span></td>\n\
	                <td class=\"col_06\">\n\
	                    <div class=\"{{#if Select}}selected{{else}}select_btn{{/if}}\">\n\
	                        <a href=\"javascript:void(0);\">选择</a>\n\
	                    </div>\n\
	                </td>\n\
	            </tr>\n\
	            {{#if Introduction}}\n\
	            <tr class=\"js-intro\" style=\"display:none\">\n\
	                <td colspan=\"4\">\n\
	                    <div class=\"other_product_detail\">\n\
	                        <b></b>\n\
	                        <i></i>\n\
	                        <div>{{{Introduction}}}</div>\n\
	                        <a class=\"flod_btn\" href=\"javascript:void(0);\">收起</a>\n\
	                    </div>\n\
	                </td>\n\
	            </tr>\n\
	            {{/if}}\n\
	        {{/each}}\n\
	    </tbody>\n\
	</table>\n\
</div>"});