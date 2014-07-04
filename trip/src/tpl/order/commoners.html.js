define(function(){
	return "<ul class=\"person_select\">\n\
{{#each collecters}}\n\
    <li cid=\"{{clientID}}\">\n\
    <a href=\"javascript:void(0);\" class=\"cb-item {{#if selected}}selected{{/if}}\" ptype=\"{{ptype}}\" cid=\"{{clientID}}\" role=\"topContact\" data-params=\"{id:\\'{{clientID}}\\',name:\\'{{nameCN}}\\',certificate:\\'{{certificate}}\\',certificate_number:\\'{{certificate_number}}\\',mphone:\\'{{mobileNo}}\\'}\"><i></i><span>{{#if nameCN}}{{nameCN}}{{else}}{{#if ENFirstName}}{{ENLastName}}/{{ENFirstName}} {{ENMiddleName}}{{/if}}{{/if}}</span></a>\n\
    </li>\n\
{{/each}}\n\
</ul>"});