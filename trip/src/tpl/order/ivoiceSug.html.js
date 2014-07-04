define(function(){
	return "<div class=\"person_bill\">\n\
    <p>常用发票抬头</p>\n\
    {{#each list}}\n\
    <div><a href=\"###\">{{Value}}</a></div>\n\
    {{/each}}\n\
</div>"});