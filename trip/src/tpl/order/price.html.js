define(function(){
	return "<div id=\"price_box_wrap\" class=\"price_box_wrap\">\n\
        <ul class=\"price_box\">\n\
            <li class=\"total_price2\"><strong>总价</strong><span class=\"price2\"><dfn>&yen;</dfn><span role=\"amountTotal\">{{Amount}}</span></span></li>\n\
            <li>\n\
            {{#if IsGroupTravel}}\n\
                <div class=\"basefix\"><span class=\"price_item\">基本团费</span></div>\n\
            {{else}}\n\
                <div class=\"basefix\"><span class=\"price_item\">基本费用</span></div>\n\
            {{/if}}\n\
            {{#if AduNumber}}\n\
            <div class=\"basefix\"><span class=\"price_item\">成人</span><strong class=\"price_detail\"><span>{{AduNumber}}&nbsp;×</span><dfn>&yen;</dfn>{{AduAmount}}</strong></div>\n\
            {{/if}}\n\
            {{#if ChildNumber}}\n\
            <div class=\"basefix\"><span class=\"price_item\">儿童{{#if IsNoBed}}(不占床){{/if}}</span><strong class=\"price_detail\"><span>{{ChildNumber}}&nbsp;×</span><dfn>&yen;</dfn>{{ChildAmount}}</strong></div>\n\
            {{/if}}\n\
            </li>\n\
            {{#if Surcharge}}\n\
                <li><span class=\"price_item\">附加费</span><strong class=\"price_detail\"><dfn>&yen;</dfn>{{Surcharge}}</strong></li>\n\
            {{/if}}\n\
            {{#if TicketsTotalFree}}\n\
                <li><span class=\"price_item\">出票费</span><strong class=\"price_detail\"><dfn>&yen;</dfn>{{TicketsTotalFree}}</strong></li>\n\
            {{/if}}\n\
            <li role=\"fright\" style=\"{{#unless Freight}}display:none{{/unless}}\"><span class=\"price_item\">配送费</span><strong class=\"price_detail\"><dfn>&yen;</dfn><em role=\"amountPostage\" style=\"font-style:normal\">{{Freight}}</em></strong></li>\n\
            <li role=\"discount\" style=\"{{#unless DiscountAmount}}display:none{{/unless}}\"><span class=\"price_item\">优惠<i>减</i></span><strong class=\"price_detail highlight\">-<dfn>&yen;</dfn> <em style=\"font-style:normal\" role=\"amountCoupon\">{{DiscountAmount}}</em></strong></li>\n\
            {{#if isTempSave}}\n\
            <li class=\"border_none\" style=\"position:static;\"><a href=\"###\" role=\"save\" class=\"price_btn_order\"><span><i></i></span>暂存订单</a></li>\n\
            {{/if}}\n\
        </ul>\n\
        <a class=\"online_service\" href=\"{{ChatUrl}}\" target=\"_blank\">在线客服</a>\n\
</div>"});