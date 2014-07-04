define(function(){
	return "<div class=\"delivery\">\n\
    <b class=\"tab_01\"></b>\n\
    <div class=\"tit\"><a href=\"http://pages.ctrip.com/homepage/xuzhi.htm\" target=\"_blank\">送票范围说明&gt;&gt;</a>配送城市<strong>{{location}}</strong></div>\n\
    <ul class=\"address_list\" role=\"addressList\">\n\
        {{each address_list}}\n\
            <li><label for=\"m4\"><input type=\"radio\" value=\"radio\" name=\"radio\" id=\"m4\">{{address}}</label></li>\n\
        {{each}}\n\
    </ul>\n\
    <div class=\"btn\">\n\
        <a class=\"btn_submit\" href=\"###\">使用新地址</a>\n\
        <a href=\"###\">使用其他地址</a>\n\
    </div>\n\
</div>"});