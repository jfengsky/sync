define(function(){
	return "<ul class=\"input_box\" role=\"contact\">\n\
    <li class=\"point\">为方便携程及时与您联系，请准确填写联系人信息（手机号码，Email）</li>\n\
    <li>\n\
        <label class=\"product_label\">姓名</label>\n\
        <input type=\"text\" value=\"{{name}}\" role=\"ctname\"  require=\"1\" regex=\"checkName\" class=\"input_m\">\n\
    </li>\n\
    <li>\n\
        <label for=\"\" class=\"product_label\">Email</label>\n\
        <input type=\"text\" value=\"{{email}}\" role=\"ctemail\" require=\"1\" regex=\"checkEmail\" class=\"input_m\">\n\
    </li>\n\
    <li>\n\
        <label for=\"\" class=\"product_label\">手机号码</label>\n\
        <input type=\"text\" value=\"{{mobileNo}}\" role=\"ctmphone\" regex=\"checkMobile\" class=\"input_m\">\n\
    </li>\n\
    <li>\n\
        <label for=\"\" class=\"product_label\">联系电话</label>\n\
        <input type=\"text\" value=\"\" class=\"in_num01 \" id=\"notice2\" notice=\"区号\" role=\"ctzcode\" _cqnotice=\"区号\" style=\"\" regex=\"checkPhone\">\n\
        <input type=\"text\" value=\"\" class=\"in_num02 \" id=\"notice3\" notice=\"电话号码\" role=\"cttphone\" _cqnotice=\"电话号码\" style=\"\" regex=\"checkPhone\">\n\
        <input type=\"text\" value=\"\" class=\"in_num03 \" id=\"notice4\" notice=\"分机号码\" role=\"ctext\" _cqnotice=\"分机号码\" style=\"\" regex=\"checkPhone\">\n\
    </li>\n\
    <div class=\"contact_remarks\"><span>}</span>此处手机号码和联系电话至少要填一项</div>\n\
</ul><div class=\"clear:both\"></div>"});