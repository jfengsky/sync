define(function(){
	return "<div class=\"discount\">\n\
    <h4>优惠券</h4>\n\
    {{#each list}}\n\
    <div class=\"discount_box item\">\n\
        <div role=\"cnew\">\n\
            <div class=\"basefix\">\n\
                <p class=\"title\">优惠提示：优惠券与限额抵用券无法同时使用</p>\n\
                {{DisplayName}}\n\
                <span role=\"code\">\n\
                <input type=\"text\" class=\"input_width\" PromotionID=\"{{PromotionID}}\" extend=\"1\" role=\"couponCode\"><a role=\"checkcode\" href=\"###\" class=\"btn_normal\">确定</a>\n\
                </span>\n\
                &nbsp;&nbsp;<span class=\"tip\" style=\"color:#ff7a17\" role=\"tip\"></span>\n\
            </div>\n\
            <div class=\"explain\">{{{Description}}}</div>\n\
        </div>\n\
        <div role=\"had\" style=\"display:none\">\n\
            <div class=\"basefix\">\n\
                <p class=\"title\">优惠提示：优惠券与限额抵用券无法同时使用</p>\n\
                {{#if extendPromotion}}\n\
                {{DisplayNameR}}\n\
                {{else}}\n\
                {{DisplayName}}\n\
                {{/if}}\n\
                <span class=\"price\">\n\
                {{#if ReducedAmount}}\n\
                -<dfn>&yen;</dfn>{{ReducedAmount}}\n\
                {{else}}\n\
                已选择\n\
                {{/if}}\n\
                </span>\n\
            </div>\n\
            <div class=\"explain\">{{{Description}}}</div>\n\
            <div><a href=\"###\" role=\"reinput\">重新输入优惠代码</a></div>\n\
        </div>\n\
    </div>\n\
    {{/each}}\n\
</div>"});