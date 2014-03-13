define(function(){
	return "<div class=\"order_mod order_passenger\" id=\"js-passenger-edit\">\n\
    <div class=\"mod_side\">\n\
        <input type=\"button\" class=\"btn_blue\" value=\"保存修改\">\n\
        <input type=\"button\" class=\"btn_white\" value=\"取消\">\n\
    </div>\n\
    <div class=\"mod_main passenger_tips\">请保证信息的正确性，提交后，如果携程验证有误，会及时联系您，否则携程将直接使用您填写的信息。</div>\n\
    <div class=\"mod_main\">\n\
        {{#each passengers}}\n\
        <dl class=\"mod_list\">\n\
            <dt>旅客{{#add @index 1}}{{/add}}<br>\n\
                {{#if isAdult}}\n\
                <span class=\"adult\">成人</span>\n\
                {{else}}\n\
                <span class=\"child\">儿童</span>\n\
                {{/if}}\n\
            </dt>\n\
            <dd>\n\
                {{{ulHTML}}}\n\
            </dd>\n\
        </dl>\n\
        {{/each}}\n\
    </div>\n\
</div>"});