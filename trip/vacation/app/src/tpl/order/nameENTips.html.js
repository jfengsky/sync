define(function(){
	return "<div class=\"person_passenger\" role=\"nameTips\">\n\
    {{#if nameEN}}\n\
    <div class=\"base_txtgray hand had\"><span class=\"name\">{{nameEN}}</span>英文姓名</div>\n\
    {{else}}\n\
    <div class=\"base_txtgray hand\"><span>last（姓）/first（名）</span>英文姓名</div>\n\
    {{/if}}\n\
</div>"});