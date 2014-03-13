define(function(){
	return "<div class=\"person_content\">\n\
	{{#if board}}\n\
	<p>出行人</p>\n\
	<div class=\"layoutfix\">\n\
		{{#each board}}\n\
		<a href=\"###\" index={{@index}}>{{#if nameCN}}{{nameCN}}{{else}}{{nameEN}}{{/if}}<span>{{mobileNo}}</span></a>\n\
		{{/each}}\n\
	</div>\n\
	{{/if}}\n\
	{{#if common}}\n\
	<p>常用联系人</p>\n\
	<div class=\"layoutfix\">\n\
		{{#each common}}\n\
		<a href=\"###\" uid=\"{{InfoID}}\">{{ContactName}}<span>{{Moblie}}</span></a>\n\
		{{/each}}\n\
	</div>\n\
	{{/if}}\n\
</div>"});