define(function(){
	return "<ul class=\"input_box\" style=\"zoom:1\">\n\
    <li class=\"point\">抵用券或礼品卡等消费券支付的金额不提供报销凭证</li>\n\
    <li class=\"default\">\n\
        <a href=\"###\" class=\"revise\">【修改】</a>\n\
        {{#if initTitle}}\n\
        {{initTitle}} {{initContent}}\n\
        {{else}}\n\
        <span>不需要发票</span>\n\
        {{/if}}\n\
    </li>\n\
</ul>"});