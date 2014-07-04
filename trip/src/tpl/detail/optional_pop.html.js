define(function(){
	return "<div class=\"resource_mask\" id=\"J_optional_select_pop\" style=\"display: none;\">\n\
	<a href=\"javascript:void(0);\" class=\"close J_optional_pop_close\"><span>关闭</span></a>\n\
	<div class=\"scroll_wrap\">\n\
	    <table class=\"other_mask_table\">\n\
	        <tbody>\n\
	            <tr>\n\
	                <th class=\"col_01\">产品名称</th>\n\
	                <th class=\"col_02\">携程价</th>\n\
	                <th class=\"col_03\">市场价</th>\n\
	                <th class=\"col_04\">使用日期</th>\n\
	                <th class=\"col_05\">份数</th>\n\
	                <th class=\"col_06\">单项总价</th>\n\
	                <th></th>\n\
	            </tr>\n\
	            {{#each BaoxianData}}\n\
	            {{#if IsPopupShow}}\n\
	                <tr class=\"js_option_tr\" data-index-in-data=\"{{@index}}\"{{#is Inventory.length \'<=\' 1}} data-only-date=\"{{#each Inventory}}{{#dtdate Date}}{{/dtdate}}{{/each}}\"{{/is}}>\n\
	                    <td class=\"col_01\"><i class=\"free_gift\" {{#listItem Inventory 0}}{{#is Price \'>\' 0}}style=\"display:none\"{{/is}}{{/listItem}}></i><span class=\"js-product-name product_name\">{{Name}}</span></td>\n\
	                    {{#listItem Inventory 0}}\n\
                        <td class=\"col_02\"><span class=\"js-ctrip-price ctrip_price\">{{#moneyHTML Price}}{{/moneyHTML}}</span></td>\n\
	                    <td class=\"col_03\"><span class=\"js-original-price original_price\">{{#if MarketPrice}}{{#moneyHTML MarketPrice}}{{/moneyHTML}}{{else}}--{{/if}}</span></td>\n\
	                    {{/listItem}}\n\
	                    <td class=\"col_04\">\n\
	                        {{#is Inventory.length \'>\' 1}}\n\
	                            <div class=\"use_date\">\n\
	                                <div class=\"date_input_wrap\">\n\
	                                    <input type=\"text\" value=\"{{changeDate}}\"/>\n\
	                                    <p style=\"display:none\">\n\
	                                        {{#each Inventory}}\n\
	                                        <a href=\"javascript:void(0);\">{{#dtdate Date}}{{/dtdate}}</a>\n\
	                                        {{/each}}\n\
	                                    </p>\n\
	                                </div>\n\
	                            </div>\n\
	                        {{else}}\n\
	                        --\n\
	                        {{/is}}\n\
	                    </td>\n\
	                    <td class=\"col_05\">\n\
	                        <div class=\"room_num\">\n\
	                            <div class=\"num_input_wrap\">\n\
	                            {{#listItem Inventory 0}}\n\
	                                {{#is MinQuantity MaxQuantity}}\n\
	                                {{#if IsChooseRequired}}\n\
	                                    <input type=\"text\" value=\"{{../../../changeCount}}\" /><b></b>\n\
	                                    <p style=\"display:none\"><a href=\"javascript:void(0);\">{{DefaultQuantity}}</a></p>\n\
	                                {{else}}\n\
	                                    {{DefaultQuantity}}\n\
	                                {{/if}}\n\
	                            {{else}}\n\
	                                <input type=\"text\" value=\"{{../../../changeCount}}\"/>\n\
	                                <b></b>\n\
	                                <p style=\"display:none\">\n\
	                                    {{#eachx \'null\' MinQuantity MaxQuantity StepQuantity}}\n\
	                                    <a href=\"javascript:void(0);\">{{$index}}</a>\n\
	                                    {{/eachx}}\n\
	                                </p>\n\
	                            {{/is}}\n\
	                            {{/listItem}}\n\
	                            </div>\n\
	                        </div>{{Unit}}\n\
	                    </td>\n\
	                    <td class=\"col_06\">\n\
	                        <span class=\"ctrip_price js-total-price\">{{#if changeTotal}}{{#moneyHTML changeTotal}}{{/moneyHTML}}</span>{{else}}--{{/if}}\n\
	                    </td>\n\
	                    <td class=\"col_07\">\n\
	                        {{#listItem Inventory 0}}\n\
	                        <div class=\"room_selected\"{{#is ../../changeCount \'<=\' 0}} style=\"display:none;\"{{/is}}>\n\
	                            <a href=\"javascript:void(0);\">选择</a>\n\
	                        </div>\n\
	                        {{/listItem}}\n\
	                    </td>\n\
	                </tr>\n\
	                {{#if Introduction}}\n\
	                <tr class=\"js-intro\" style=\"display:none\">\n\
	                    <td colspan=\"7\">\n\
	                        <div class=\"other_product_detail\">\n\
	                            <b></b>\n\
	                            <i></i>\n\
	                            <div>{{{Introduction}}}</div>\n\
	                            <a class=\"flod_btn\" href=\"javascript:void(0);\">收起</a>\n\
	                        </div>\n\
	                    </td>\n\
	                </tr>\n\
	                {{/if}}\n\
	            {{/if}}\n\
	            {{/each}}\n\
	        </tbody>\n\
	    </table>\n\
	    <div class=\"btn_wrap\">\n\
	        <a class=\"yes\" id=\"J_optional_pop_confirm\" href=\"javascript:void(0);\">确定</a>\n\
	        <a class=\"no J_optional_pop_close\" href=\"javascript:void(0);\">取消</a>\n\
	    </div>\n\
	</div>\n\
</div> "});