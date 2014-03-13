define(function(){
	return "{{! 修改自：tpl/order/traveller.html，表单的显示逻辑必须保持跟这个模板一致 }}\n\
<div class=\"order_mod order_passenger\" id=\"js-passenger\">\n\
    <div class=\"mod_side\">\n\
        <input type=\"button\" id=\"js-passenger-edit-button\" class=\"btn_blue\" value=\"修改旅客信息\" />\n\
    </div>\n\
    <div class=\"mod_main\">\n\
        {{#each list}}\n\
        <dl class=\"mod_list\" ptype=\"{{#if isAdult}}1{{else}}0{{/if}}\">\n\
            <dt>旅客{{#add @index 1}}{{/add}}<br />{{#if isAdult}}<span class=\"adult\">成人</span>{{else}}<span class=\"child\">儿童</span>{{/if}}</dt>\n\
            <dd>\n\
                <table class=\"crosswise_tb\" width=\"100%\">\n\
                    {{#if UserName}}\n\
                    {{#with UserName}}\n\
                    <tr>\n\
                        <th style=\"width:80px;\">{{Name}}</th>\n\
                        <td>{{#if ../../nameCN}}{{../../nameCN}}{{else}}{{../../ENLastName}}{{#if ../../ENLastName}}/{{/if}}{{../../ENFirstName}} {{../../ENMiddleName}}{{/if}}</td>\n\
                    </tr>\n\
                    {{/with}}\n\
                    {{/if}}\n\
                    {{#if ChineseName}}\n\
                    {{#with ChineseName}}\n\
                    <tr>\n\
                        <th style=\"width:80px;\">{{Name}}</th>\n\
                        <td>{{../../nameCN}}</td>\n\
                    </tr>\n\
                    {{/with}}\n\
                    {{/if}}\n\
                    {{#if EnglishName}}\n\
                    {{#with EnglishName}}\n\
                    <tr>\n\
                        <th style=\"width:80px;\">{{Name}}</th>\n\
                        <td>{{#if ../../ENLastName}}{{../../ENLastName}}/{{../../ENFirstName}} {{../../ENMiddleName}}{{/if}}</td>\n\
                    </tr>\n\
                    {{/with}}\n\
                    {{/if}}\n\
                    {{#if Nationality}}\n\
                    {{#with Nationality}}\n\
                    <tr>\n\
                        {{! 国籍 }}\n\
                        <th style=\"width:80px;\">{{Name}}</th>\n\
                        <td mod_value=\"{{../../national}}\" regex=\"checkNationality\" role=\"national\" _cqnotice=\"中文/拼音\">{{../../national}}</td>\n\
                    </tr>\n\
                    {{/with}}\n\
                    {{/if}}\n\
                    {{#if IDType}}\n\
                    {{#with IDType}}\n\
                    <tr>\n\
                        <th style=\"width:80px;\">{{Name}}</th>\n\
                        <td>\n\
                            {{#each ../idOptions}}\n\
                                {{#is CustomerInfoItemType ../../IDCardType}}\n\
                                    {{Name}}\n\
                                {{/is}}\n\
                            {{/each}}\n\
                            {{../../IDCardNo}}</td>\n\
                    </tr>\n\
                    {{/with}}\n\
                    {{/if}}\n\
                    {{#if CardValidUntil}}\n\
                    {{#with CardValidUntil}}\n\
                    <tr>\n\
                        <th style=\"width:80px;\">{{Name}}</th>\n\
                        <td>{{../../IDCardTimelimitY}}-{{../../IDCardTimelimitM}}-{{../../IDCardTimelimitD}}</td>\n\
                    </tr>\n\
                    {{/with}}\n\
                    {{/if}}\n\
                    {{#if Sex}}\n\
                    {{#with Sex}}\n\
                    <tr>\n\
                        <th style=\"width:80px;\">{{Name}}</th>\n\
                        <td>{{#is ../gender 0}}男{{else}}女{{/is}}</td>\n\
                    </tr>\n\
                    {{/with}}\n\
                    {{/if}}\n\
                    {{#if Birthday}}\n\
                    {{#with Birthday}}\n\
                    <tr>\n\
                        <th style=\"width:80px;\">{{Name}}</th>\n\
                        <td>{{../../birthdayY}}-{{../../birthdayM}}-{{../../birthdayD}}</td>\n\
                    </tr>\n\
                    {{/with}}\n\
                    {{/if}}\n\
                    {{#if BirthPlace}}\n\
                    {{#with BirthPlace}}\n\
                    <tr>\n\
                        <th style=\"width:80px;\">{{Name}}</th>\n\
                        <td>{{../../HomePlace}}</td>\n\
                    </tr>\n\
                    {{/with}}\n\
                    {{/if}}\n\
                    {{#if ContactPhone}}\n\
                    {{#with ContactPhone}}\n\
                    <tr>\n\
                        <th style=\"width:80px;\">手机号码</th>\n\
                        <td>{{../../mobileNo}}</td>\n\
                    </tr>\n\
                    {{/with}}\n\
                    {{/if}}\n\
                </table>\n\
            </dd>\n\
        </dl>\n\
        {{/each}}\n\
    </div>\n\
</div>\n\
"});