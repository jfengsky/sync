define(function(){
	return "<li class=\"point\">温馨提示：优惠券与限额抵用券无法同时使用</li>\n\
{{#each list}}\n\
    {{#if extendPromotion}}\n\
    <li class=\"lj_sale item\">\n\
        <label for=\"m{{@index}}\">\n\
        <input type=\"radio\" class=\"radio\" role=\"couponCheck\" extend=\"1\" requireCode=\"1\" strategyID=\"{{DeductionStrategyID}}\" PromotionID=\"{{PromotionID}}\"  name=\"RadioGroup1\" id=\"m{{@index}}\">\n\
        <span role=\"displayName\">{{DisplayName}}</span></label>\n\
        <span style=\"display:none\" role=\"code\">\n\
        <input type=\"text\" value=\"\" class=\"input_sale\"  role=\"couponCode\">\n\
        <input type=\"button\" value=\"确定\" class=\"btn_submit\" role=\"checkcode\">\n\
        </span>\n\
        &nbsp;&nbsp;<span class=\"tip\" style=\"color:#ff7a17\" role=\"tip\"></span>\n\
        {{#if Description}}<div class=\"lj_sale_notice\" role=\"description\" style=\"display:none;\">{{{Description}}}</div>{{/if}}\n\
    </li>\n\
    {{else}}\n\
        {{#if IsNeedCaptcha}}\n\
        <li class=\"lj_sale item\">\n\
            <label for=\"m{{@index}}\">\n\
            <input type=\"radio\" class=\"radio\" role=\"couponCheck\" extend=\"0\" requireCode=\"1\" strategyID=\"{{DeductionStrategyID}}\" PromotionID=\"{{PromotionID}}\"  name=\"RadioGroup1\" id=\"m{{@index}}\">\n\
            <span role=\"displayName\">{{DisplayName}}</span></label>\n\
            <span style=\"display:none\" role=\"code\">\n\
            <input type=\"text\" value=\"\" class=\"input_sale\"  role=\"couponCode\">\n\
            <input type=\"button\" value=\"确定\" class=\"btn_submit\" role=\"checkcode\">\n\
            </span>\n\
            &nbsp;&nbsp;<span class=\"tip\" style=\"color:#ff7a17\" role=\"tip\"></span>\n\
            {{#if Description}}<div class=\"lj_sale_notice\" role=\"description\" style=\"display:none;\">{{{Description}}}</div>{{/if}}\n\
        </li>\n\
        {{else}}\n\
        <li class=\"lj_sale item\">\n\
            <label for=\"m{{@index}}\">\n\
            <input type=\"radio\" class=\"radio\" role=\"couponCheck\" extend=\"0\" requireCode=\"0\" strategyID=\"{{DeductionStrategyID}}\" reduced=\"{{reducedAmount}}\" PromotionID=\"{{PromotionID}}\" name=\"RadioGroup1\" id=\"m{{@index}}\">\n\
            <span role=\"displayName\">{{DisplayName}}</span>\n\
            </label>&nbsp;&nbsp;<span class=\"tip\" style=\"color:#ff7a17\" role=\"tip\"></span>\<br>\n\
            {{#if Description}}<div class=\"lj_sale_notice\" role=\"description\" style=\"display:none;\">{{{Description}}}</div>{{/if}}\n\
        </li>\n\
        {{/if}}\n\
    {{/if}}\n\
{{/each}}\n\
<li><label for=\"m100\"><input checked=\"checked\" type=\"radio\" class=\"radio\" role=\"cancel\" name=\"RadioGroup1\" id=\"m100\"> 不使用优惠</label></li>"});