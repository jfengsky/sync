define(function(){
	return "<ul class=\"input_box\">\n\
    <li class=\"default\">\n\
        <a href=\"###\" class=\"revise\">【修改】</a>\n\
        <span class=\"tit\">{{psType}}</span>\n\
        <span class=\"tit\">送票地址</span>\n\
        {{#with AddressInfo}}\n\
        <span>{{#if noCity}}{{CityName}} {{../Canton}} {{/if}}{{Address}} {{#if Post}}{{Post}}{{/if}} {{#if Recipient}}({{Recipient}} 收){{/if}} {{#if Mobile}}{{Mobile}}{{else}}{{#if Tel}}{{Tel}}{{/if}}{{/if}}</span>\n\
        {{/with}}\n\
    </li>\n\
</ul>"});