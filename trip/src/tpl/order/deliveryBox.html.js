define(function(){
	return "<div class=\"input_box\" id=\"deliverBox\">\n\
    <div class=\"basefix\">\n\
        <ul id=\"tabs\" class=\"tab_box layoutfix\">\n\
            {{#if py}}\n\
            {{#with py}}\n\
            <li role=\"tab\" type=\"4\" tab=\"{{../../pyindex}}\"><a type=\"4\" href=\"###\">免费平邮</a></li>\n\
            {{/with}}\n\
            {{/if}}\n\
            {{#if ps}}\n\
            {{#with ps}}\n\
            <li role=\"tab\" type=\"1\" tab=\"{{../../psindex}}\"><a type=\"1\" href=\"###\">市内配送<span class=\"price\">{{#if DeliveryAmount}}<dfn>¥</dfn>{{DeliveryAmount}}{{else}}免费{{/if}}</span></a></li>\n\
            {{/with}}\n\
            {{/if}}\n\
            {{#if zq}}\n\
            <li  role=\"tab\"  type=\"2\" tab=\"{{zqindex}}\"><a type=\"2\" href=\"###\">市内自取</a></li>\n\
            {{/if}}\n\
            {{#if ems}}\n\
            {{#with ems}}\n\
            <li role=\"tab\"  type=\"3\"  tab=\"{{../../emsindex}}\"><a type=\"3\" href=\"###\">EMS邮递<span class=\"price\">{{#if DeliveryAmount}}<dfn>¥</dfn>{{DeliveryAmount}}{{else}}免费{{/if}}</span></a></li>\n\
            {{/with}}\n\
            {{/if}}\n\
        </ul>\n\
        {{#if deliveryGoods}}\n\
        <span data-role=\"jmp\" data-params=\"{options:{type:\\'jmp_title\\',classNames:{boxType:\\'jmp_title\\'},template:\\'#jmp_pkg_delivery\\',content:{txt:\\'{{deliveryGoods}}\\'},css:{maxWidth:\\'300\\',minWidth:\\'240\\'},alignTo:\\'cursor\\',showArrow:false}}\" class=\"distribution_list\">配送清单</span>\n\
        {{/if}}\n\
    </div>\n\
    <div id=\"content\" class=\"delivery_content\">\n\
        {{#if py}}\n\
        <div class=\"delivery\"  type=\"4\"  style=\"display:none\">\n\
            <b></b>\n\
            <div class=\"tit\">\n\
                {{#if ems.DeliveryAmount}}<div class=\"postage\"><span>邮递费</span><dfn>¥</dfn>{{ems.DeliveryAmount}}</div>{{/if}}\n\
                选择常用地址\n\
            </div>\n\
            {{#if emsAddress}}\n\
                <ul class=\"address_list\" role=\"addressList\" type=\"4\">\n\
                {{#each emsAddress}}\n\
                 <li {{#unless @index}}class=\"cur\"{{/unless}}><label for=\"py{{@index}}\"><input cantonID=\"{{CantonID}}\" {{#equal @index 0 \"checked=checked\" \"\"}}{{/equal}} index={{InfoId}} type=\"radio\" value=\"{{InfoId}}\" name=\"radio4\" id=\"py{{@index}}\"> {{Address}} {{Post}} {{#if Recipient}}({{Recipient}} 收){{/if}} {{#if Mobile}}{{Mobile}}{{else}}{{#if Tel}}{{Tel}}{{/if}}{{/if}}</label></li>\n\
                {{/each}}\n\
                </ul>\n\
            <div class=\"btn\">\n\
                <a class=\"btn_submit\" href=\"###\" role=\"new\">使用新地址</a>\n\
                {{#unless hideEmsAddress}}\n\
                <a href=\"###\" role=\"other\">使用其他地址</a>\n\
                {{/unless}}\n\
            </div>\n\
            {{/if}}\n\
            <div class=\"hide_options\" role=\"hideOptions\" style={{#if emsAddress}}\"display:none\"{{else}}\"display:block\"{{/if}}>\n\
                <table>\n\
                    <tbody><tr>\n\
                        <th>收件人</th>\n\
                        <td><input regex=\"checkRecipient\" type=\"text\" class=\"input_m cqsy\"　_cqnotice=\"中文/英文\" role=\"recipient\"></td>\n\
                    </tr>\n\
                    <tr>\n\
                        <th>联系电话</th>\n\
                        <td><input type=\"number\" regex=\"checkContactTel\" class=\"input_m\" role=\"contactTel\"></td>\n\
                    </tr>\n\
                    <tr>\n\
                        <th>邮寄地址</th>\n\
                        <td id=\"cities_p\" role=\"selectCity\">\n\
                        </td>\n\
                    </tr>\n\
                    <tr>\n\
                        <th class=\"import\"></th>\n\
                        <td><input type=\"text\" regex=\"checkDetail\" class=\"input_m\" role=\"detail\"></td>\n\
                    </tr>\n\
                    <tr style=\"display:none;\">\n\
                        <th class=\"import\"></th>\n\
                        <td>\n\
                            <div class=\"help_block\"><span class=\"ico\"></span>请填写详细的收件地址后查询</div>\n\
                        </td>\n\
                    </tr>\n\
                    <tr>\n\
                        <th>邮政编码</th>\n\
                        <td><input type=\"number\" regex=\"checkPostage\" style=\"width:120px;\" class=\"mr5\" role=\"postage\"></td>\n\
                    </tr>\n\
                </tbody></table>\n\
            </div>\n\
        </div>\n\
        {{/if}}\n\
        {{#if ps}}\n\
        <div class=\"delivery\" style=\"display:none\" type=\"1\">\n\
            <b></b>\n\
            <div class=\"tit\">\n\
                <a href=\"http://pages.ctrip.com/homepage/xuzhi.htm\" target=\"_blank\">送票范围说明</a>\n\
                {{#if ps.DeliveryAmount}}<div class=\"postage\"><span>配送费</span><dfn>¥</dfn>{{ps.DeliveryAmount}}<span>起，具体金额以预订员确认为准。</span></div>{{/if}}\n\
                配送城市<strong>{{CityName}}</strong>\n\
            </div>\n\
            {{#if inCityAddress}}\n\
            <ul class=\"address_list\"  role=\"addressList\" type=\"1\">\n\
                {{#each inCityAddress}}\n\
                    <li {{#unless @index}}class=\"cur\"{{/unless}}><label for=\"ps{{@index}}\"><input cantonID=\"{{CantonID}}\" {{#equal @index 0 \"checked=checked\" \"\"}}{{/equal}} index={{InfoId}} type=\"radio\" value=\"{{InfoId}}\" name=\"radio1\" id=\"ps{{@index}}\">{{../../CityName}} {{CityName}} {{CantonName}} {{Address}} {{Post}}</label></li>\n\
                {{/each}}\n\
            </ul>\n\
            <div class=\"btn\">\n\
                <a class=\"btn_submit\" href=\"###\"  role=\"new\">使用新地址</a>\n\
                {{#unless hideInCityAddress}}\n\
                <a href=\"###\" role=\"other\">使用其他地址</a>\n\
                {{/unless}}\n\
            </div>\n\
            {{/if}}\n\
            <div class=\"hide_options\" style={{#if inCityAddress}}\"display:none\"{{else}}\"display:block\"{{/if}}>\n\
                <table>\n\
                    <tbody><tr>\n\
                        <th>配送地址</th>\n\
                        <td><select name=\"\" id=\"\" role=\"getCanton\">\n\
                        {{#each CityCanton}}\n\
                        <option value=\"{{Key}}\">{{Value}}</option>\n\
                        {{/each}}\n\
                        </select><span class=\"area\">区</span><input type=\"text\" class=\"input_m\" id=\"notice15\" role=\"getAddrDetail\"></td>\n\
                    </tr>\n\
                </tbody></table>\n\
            </div>\n\
        </div>\n\
        {{/if}}\n\
        {{#if zq}}\n\
        <div class=\"delivery\"  type=\"2\"  style=\"display:none\">\n\
            <b></b>\n\
            <div class=\"tit\">\n\
                自取城市<strong>{{CityName}}</strong>\n\
            </div>\n\
            <ul class=\"address_list\" role=\"addressList\"  type=\"2\">\n\
                {{#if selfPickupAddr}}\n\
                {{#each selfPickupAddr}}\n\
                <li {{#unless @index}}class=\"cur\"{{/unless}}><label for=\"self{{@index}}\"><input {{equal @index 0 \"checked=checked\" \"\"}} type=\"radio\" value=\"{{this}}\" name=\"radio2\" id=\"self{{@index}}\">{{this}}</label></li>\n\
                {{/each}}\n\
                {{/if}}\n\
            </ul>\n\
        </div>\n\
        {{/if}}\n\
        {{#if ems}}\n\
        <div class=\"delivery\"  type=\"3\"  style=\"display:none\">\n\
            <b></b>\n\
            <div class=\"tit\">\n\
                <a href=\"###\" onclick=\"window.open(\\'http://www.ctrip.com/Supermarket/package/EMSNote.asp\\',\\'\\',\\'status=no,menubar=no,top=20,left=20,width=600,height=400,resizable=yes,scrollbars=no\\')\">EMS服务说明</a>\n\
                {{#if ems.DeliveryAmount}}<div class=\"postage\"><span>邮递费</span><dfn>¥</dfn>{{ems.DeliveryAmount}}</div>{{/if}}\n\
                选择常用地址\n\
            </div>\n\
            {{#if emsAddress}}\n\
                <ul class=\"address_list\" role=\"addressList\" type=\"3\">\n\
                {{#each emsAddress}}\n\
                 <li {{#unless @index}}class=\"cur\"{{/unless}}><label for=\"ems{{@index}}\"><input cantonID=\"{{CantonID}}\" {{#equal @index 0 \"checked=checked\" \"\"}}{{/equal}} index={{InfoId}} type=\"radio\" value=\"{{InfoId}}\" name=\"radio3\" id=\"ems{{@index}}\"> {{Address}} {{Post}} {{#if Recipient}}({{Recipient}} 收){{/if}} {{#if Mobile}}{{Mobile}}{{else}}{{#if Tel}}{{Tel}}{{/if}}{{/if}}</label></li>\n\
                {{/each}}\n\
                </ul>\n\
            <div class=\"btn\">\n\
                <a class=\"btn_submit\" href=\"###\" role=\"new\">使用新地址</a>\n\
                {{#unless hideEmsAddress}}\n\
                <a href=\"###\" role=\"other\">使用其他地址</a>\n\
                {{/unless}}\n\
            </div>\n\
            {{/if}}\n\
            <div class=\"hide_options\" role=\"hideOptions\" style={{#if emsAddress}}\"display:none\"{{else}}\"display:block\"{{/if}}>\n\
                <table>\n\
                    <tbody><tr>\n\
                        <th>收件人</th>\n\
                        <td><input regex=\"checkRecipient\" type=\"text\" class=\"input_m cqsy\"　_cqnotice=\"中文/英文\" role=\"recipient\"></td>\n\
                    </tr>\n\
                    <tr>\n\
                        <th>联系电话</th>\n\
                        <td><input type=\"number\" regex=\"checkContactTel\" class=\"input_m\" role=\"contactTel\"></td>\n\
                    </tr>\n\
                    <tr>\n\
                        <th>邮寄地址</th>\n\
                        <td id=\"cities\" role=\"selectCity\">\n\
                        </td>\n\
                    </tr>\n\
                    <tr>\n\
                        <th class=\"import\"></th>\n\
                        <td><input type=\"text\" regex=\"checkDetail\" class=\"input_m\" role=\"detail\"></td>\n\
                    </tr>\n\
                    <tr style=\"display:none;\">\n\
                        <th class=\"import\"></th>\n\
                        <td>\n\
                            <div class=\"help_block\"><span class=\"ico\"></span>请填写详细的收件地址后查询</div>\n\
                        </td>\n\
                    </tr>\n\
                    <tr>\n\
                        <th>邮政编码</th>\n\
                        <td><input type=\"number\" regex=\"checkPostage\" style=\"width:120px;\" class=\"mr5\" role=\"postage\"></td>\n\
                    </tr>\n\
                </tbody></table>\n\
            </div>\n\
        </div>\n\
        {{/if}}\n\
    </div>\n\
</div>"});