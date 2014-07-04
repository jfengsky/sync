define(function(){
	return "<div class=\"mask_popup\" style=\"width:590px;display:none;\" id=\"mask_popup\">\n\
    <h3>选择您的常用地址</h3>\n\
    <ul>\n\
    {{#each obj}}\n\
        <li><label for=\"alladr{{@index}}\"><input index=\"{{InfoId}}\" cantonID={{CantonID}} type=\"radio\" value=\"radio\" name=\"{{../radioName}}\" id=\"alladr{{@index}}\"> {{CityName}} {{CantonName}} {{Address}} {{Post}} </label></li>\n\
    {{/each}}\n\
    </ul>\n\
    <div class=\"btn\">\n\
        <a href=\"###\" role=\"confirm\" class=\"btn_blue_small\">确认</a>\n\
        <a href=\"###\" role=\"close\">取消</a>\n\
    </div>\n\
    <a href=\"###\" role=\"close\" class=\"btn_shut_popup\">×</a>\n\
</div>"});