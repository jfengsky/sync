define(function(){
	return "<div class=\"person_passenger\" role=\"nameTips\">\n\
    {{#if clientID}}\n\
    <div class=\"base_txtgray hand had\"><span class=\"name\">{{nameCN}}</span>中文姓名</div>\n\
    <div class=\"base_txtgray hand had\"><span class=\"name\">{{nameEN}}</span>英文姓名</div>\n\
    {{else}}\n\
    <div class=\"base_txtgray hand\"><span>中文或拼音</span>中文姓名</div>\n\
    <div class=\"base_txtgray hand\"><span>last（姓）/first（名）</span>英文姓名</div>\n\
    {{/if}}\n\
</div>"});