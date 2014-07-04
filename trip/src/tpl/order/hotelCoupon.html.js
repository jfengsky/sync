define(function(){
	return "<div class=\"product_input layoutfix\">\n\
    <h4>酒店优惠券</h4>\n\
    <ul class=\"input_box sale\">\n\
    <li><span data-role=\"jmp\" data-params=\"{options:{type:\\'jmp_alert\\',classNames:{boxType:\\'jmp_alert\\'},template:\\'#jmp_alert\\', content:{txt:\\'选择此房型提交订单，结束游玩后发表行程点评，每间夜可获得{{coupon}}元点评奖金。<br/><a href=http://help.ctrip.com/QuestionDetail.aspx?questionId=693 target=_blank>什么是国内旅游度假自由行产品点评返现？</a>\\'},css:{maxWidth:\\'300\\'},alignTo:\\'cursor\\',showArrow:false}}\" class=\"rebates\"><em>返</em>{{coupon}}元</span></li>\n\
    {{#if used}}\n\
    <li role=\"having\" style=\"display:none;\"><i class=\"htl_icon_yes\"></i>您有<dfn>¥</dfn>{{Amount}}消费券，本次可使用<span class=\"price_red\"><dfn>¥</dfn>{{CanUseAmount}}</span>获得返现。\n\
    {{#if isRemain}}\n\
    <a href=\"###\" class=\"btn_red_small\" role=\"confirm\">使用消费券</a>\n\
    {{else}}\n\
    <a href=\"###\" class=\"btn_small_disabled\">使用消费券</a>\n\
    {{/if}}\n\
    <li role=\"had\">您已使用消费券<span class=\"price_red\"><dfn>¥</dfn>{{used}}</span>。<span class=\"point\">（还剩消费券<dfn>¥</dfn>{{remain}}）</span><a href=\"###\" style=\"margin-left:15px;\" role=\"cancel\">取消使用</a></li>\n\
    <li role=\"had\">订单成交且结束游玩后对度假产品发表行程点评后可获得<dfn>¥</dfn>{{CanUseAmount}}现金账户。</li>\n\
    <li class=\"point\" role=\"had\">如使用礼品卡支付，不能参加返现活动，消费券会退回您的账户。</li>\n\
    {{else}}\n\
    <li role=\"having\" ><i class=\"htl_icon_yes\"></i>您有<dfn>¥</dfn>{{Amount}}消费券，本次可使用<span class=\"price_red\"><dfn>¥</dfn>{{CanUseAmount}}</span>获得返现。\n\
    {{#if isRemain}}\n\
    <a href=\"###\" class=\"btn_red_small\" role=\"confirm\">使用消费券</a>\n\
    {{else}}\n\
    <a href=\"###\" class=\"btn_small_disabled\">使用消费券</a>\n\
    {{/if}}\n\
    </li>\n\
    <li role=\"had\" style=\"display:none\">您已使用消费券<span class=\"price_red\"><dfn>¥</dfn>{{CanUseAmount}}</span>。<span class=\"point\">（还剩消费券<dfn>¥</dfn>{{remain}}）</span><a href=\"###\" style=\"margin-left:15px;\" role=\"cancel\">取消使用</a></li>\n\
    <li role=\"had\" style=\"display:none\">订单成交且结束游玩后对度假产品发表行程点评后可获得<dfn>¥</dfn>{{CanUseAmount}}现金账户。</li>\n\
    <li class=\"point\" role=\"had\" style=\"display:none\">如使用礼品卡支付，不能参加返现活动，消费券会退回您的账户。</li>\n\
    {{/if}}\n\
</ul>\n\
</div>"});