define(function(){
	return "<div class=\"person_passenger\" role=\"nameTips\">\n\
    {{#if nameCN}}\n\
    <div class=\"base_txtgray hand had\"><span class=\"name\">{{nameCN}}</span>中文姓名</div>\n\
    {{else}}\n\
    <div class=\"base_txtgray hand\"><span>中文或拼音</span>中文姓名</div>\n\
    {{/if}}\n\
</div>"});