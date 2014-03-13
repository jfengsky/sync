define(function(){
	return "<ul class=\"input_box contact_info\">\n\
    <li class=\"point\">为方便携程及时与您联系，请准确填写联系人信息（手机号码，Email）</li>\n\
    <li class=\"default\">\n\
        <a href=\"###\" class=\"revise\">【修改】</a>\n\
        <span class=\"tit\">姓名</span>\n\
        <span>{{name}}</span>\n\
        {{#if mobileNo}}\n\
        <span class=\"tit\">手机号</span>\n\
        <span>{{mobileNo}}</span>\n\
        {{else}}\n\
        <span class=\"tit\">联系电话</span>\n\
        <span>{{telNo}}</span>\n\
        {{/if}}\n\
        <span class=\"tit\">Email</span>\n\
        <span>{{email}}</span>\n\
    </li>\n\
</ul>"});