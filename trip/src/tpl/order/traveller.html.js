define(function(){
	return "{{#each list}}\n\
  <div class=\"product_input product_input_border layoutfix\" ptype=\"{{#if isAdult}}1{{else}}0{{/if}}\" filled=\"{{filled}}\" index=\"{{clientID}}\" role=\"youren\">\n\
     {{#unless @index}}\n\
     <div class=\"warm_Tip\">{{../../Reminder}}</div>\n\
    {{/unless}}\n\
    <h4>旅客{{#add @index 1}}{{/add}}\n\
    {{#if isAdult}}\n\
    <div><span class=\"adult\">成人</span></div>\n\
    {{else}}\n\
    <div><span class=\"child\">儿童</span></div>\n\
    {{/if}}\n\
    </h4>\n\
    <ul class=\"input_box\">\n\
    {{#if UserName}}\n\
        {{#with UserName}}\n\
        <li>\n\
            <label for=\"\" class=\"product_label\">{{Name}}</label>\n\
            <input type=\"text\" class=\"{{#is ../InputClassType 'PkgOrderDetail.aspx'}}input_text{{else}}input_m cq{{/is}}\" _cqnotice=\"证件的姓名\" value=\"{{#if ../../nameCN}}{{../../nameCN}}{{else}}{{../../ENLastName}}{{#if ../../ENLastName}}/{{/if}}{{../../ENFirstName}} {{../../ENMiddleName}}{{/if}}\" role=\"name\" regex=\"checkName\" />\n\
            <a tabindex=\"-1\" href=\"###\" class=\"explain\" data-role=\"jmp\" data-params=\"{options: {css:{maxWidth:\'400\',minWidth:\'240\'},type:\'jmp_table\', classNames:{boxType:\'jmp_table\'},template:\'#jmp_table1_1\',alignTo:\'cursor\'}}\">填写说明</a>\n\
        </li>\n\
        {{/with}}\n\
    {{/if}}\n\
    {{#if ChineseName}}\n\
        {{#with ChineseName}}\n\
        <li>\n\
            <label for=\"\" class=\"product_label\">{{Name}}</label>\n\
            <input type=\"text\" class=\"{{#is ../InputClassType 'PkgOrderDetail.aspx'}}input_text{{else}}input_m cq{{/is}}\" _cqnotice=\"证件的中文姓名\" value=\"{{../../nameCN}}\" role=\"nameCN\" regex=\"checkCnName\" />\n\
            <a tabindex=\"-1\" href=\"###\" class=\"explain\" data-role=\"jmp\" data-params=\"{options: {css:{maxWidth:\'400\',minWidth:\'240\'},type:\'jmp_table\', classNames:{boxType:\'jmp_table\'},template:\'#jmp_table1_2\',alignTo:\'cursor\'}}\">填写说明</a>\n\
            <label class=\"foreign_guest\"></label>\n\
        </li>\n\
        {{/with}}\n\
    {{/if}}\n\
    {{#if EnglishName}}\n\
        {{#with EnglishName}}\n\
        <li class=\"optional\">\n\
            <label for=\"\" class=\"product_label\">{{Name}}</label>\n\
            <input type=\"text\" class=\"{{#is ../InputClassType 'PkgOrderDetail.aspx'}}input_text{{else}}input_m cq{{/is}}\" _cqnotice=\"证件的英文姓名\" value=\"{{#if ../../ENLastName}}{{../../ENLastName}}/{{../../ENFirstName}} {{../../ENMiddleName}}{{/if}}\" role=\"nameEN\" regex=\"checkEnName\" />\n\
            <a tabindex=\"-1\" href=\"###\" class=\"explain\" data-role=\"jmp\" data-params=\"{options: {css:{maxWidth:\'400\',minWidth:\'240\'},type:\'jmp_table\', classNames:{boxType:\'jmp_table\'},template:\'#jmp_table1_3\',alignTo:\'cursor\'}}\">填写说明</a>\n\
        </li>\n\
        {{/with}}\n\
    {{/if}}\n\
    {{#if Nationality}}\n\
        {{#with Nationality}}\n\
        <li class=\"optional later\" style={{#equal ../../IDCardType 1 \"display:none\" \"\"}}{{/equal}}>\n\
            <label for=\"\" class=\"product_label\">{{Name}}</label>\n\
        <input mod_value=\"{{../../national}}\" type=\"text\" value=\"{{../../national}}\" regex=\"checkNationality\" role=\"national\" class=\"{{#is ../InputClassType 'PkgOrderDetail.aspx'}}input_text{{else}}input_m cq nationality{{/is}}\" _cqnotice=\"中文/拼音\" />\n\
        </li>\n\
        {{/with}}\n\
    {{/if}}\n\
    {{#if IDType}}\n\
        {{#with IDType}}\n\
        <li>\n\
            <label for=\"\" class=\"product_label\">{{Name}}</label>\n\
            <select name=\"\" value=\"{{../../IDCardType}}\" role=\"idCardType\" regex=\"checkIdCardType\" {{#is ../InputClassType 'PkgOrderDetail.aspx'}}class=\"input_select\"{{/is}}>\n\
            {{#each ../idOptions}}\n\
                <option {{#equal ../../IDCardType CustomerInfoItemType \"selected\" \"\"}}{{/equal}} value=\"{{CustomerInfoItemType}}\">{{Name}}</option>\n\
            {{/each}}\n\
            </select>\n\
            <input type=\"number\" value=\"{{../../IDCardNo}}\" role=\"idCardNo\" class=\"{{#is ../InputClassType 'PkgOrderDetail.aspx'}}input_text input_s{{else}}input_s later cq{{/is}}\" regex=\"checkIdCard\" _cqnotice=\"证件号码\" note=\"{{../../restrictions}}\" />\n\
            <span class=\"hrs\" role=\"passportType\" style={{#equal ../../IDCardType 2 \"\" \"display:none;\"}}{{/equal}}>因私护照</span>\n\
        </li>\n\
        {{/with}}\n\
    {{/if}}\n\
    {{#if CardValidUntil}}\n\
        {{#with CardValidUntil}}\n\
        <li class=\"optional later\" style={{#equal ../../IDCardType 1 \"display:none\" \"\"}}{{/equal}}>\n\
            <label for=\"\" class=\"product_label\">{{Name}}</label>\n\
        <input type=\"text\" value=\"{{../../IDCardTimelimitY}}\" class=\"{{#is ../InputClassType 'PkgOrderDetail.aspx'}}input_text input_field_width{{else}}all_field_width cq{{/is}}\" role=\"cardValidUntilY\" _cqnotice=\"yyyy\" style=\"\" regex=\"checkCardValidUntil\">&nbsp;-&nbsp;<input type=\"text\" value=\"{{../../IDCardTimelimitM}}\" class=\"{{#is ../InputClassType 'PkgOrderDetail.aspx'}}input_text input_field_width{{else}}all_field_width cq{{/is}}\" role=\"cardValidUntilM\" _cqnotice=\"mm\" style=\"\" regex=\"checkCardValidUntil\">&nbsp;-&nbsp;<input type=\"text\" value=\"{{../../IDCardTimelimitD}}\" role=\"cardValidUntilD\" class=\"{{#is ../InputClassType 'PkgOrderDetail.aspx'}}input_text input_field_width{{else}}all_field_width cq{{/is}}\" _cqnotice=\"dd\" regex=\"checkCardValidUntil\">\n\
        </li>\n\
        {{/with}}\n\
    {{/if}}\n\
    {{#if Sex}}\n\
        {{#with Sex}}\n\
         <li class=\"optional\" style={{#equal ../../IDCardType 1 \"display:none\" \"\"}}{{/equal}}>\n\
            <label for=\"\" class=\"product_label\">{{Name}}</label>\n\
            <select name=\"\" value=\"{{../gender}}\" role=\"gender\" regex=\"checkSex\" {{#is ../InputClassType 'PkgOrderDetail.aspx'}}class=\"input_select\"{{/is}}>\n\
                <option value=\"-1\">请选择</option>\n\
                <option {{#equal ../../gender 0 \"selected\" \"\"}}{{/equal}} value=\"0\">男</option>\n\
                <option {{#equal ../../gender 1 \"selected\" \"\"}}{{/equal}} value=\"1\">女</option>\n\
            </select>\n\
        </li>\n\
        {{/with}}\n\
    {{/if}}\n\
    {{#if Birthday}}\n\
    {{#with Birthday}}\n\
        <li class=\"optional later\" style={{#equal ../../IDCardType 1 \"display:none\" \"\"}}{{/equal}}>\n\
            <label for=\"\" class=\"product_label\">{{Name}}</label>\n\
        <input type=\"text\" value=\"{{../../birthdayY}}\" class=\"{{#is ../InputClassType 'PkgOrderDetail.aspx'}}input_text input_field_width{{else}}all_field_width cq{{/is}}\" regex=\"checkBirthday\" role=\"birthdayY\" _cqnotice=\"yyyy\" style=\"\">&nbsp;-&nbsp;<input type=\"text\" value=\"{{../../birthdayM}}\" class=\"{{#is ../InputClassType 'PkgOrderDetail.aspx'}}input_text input_field_width{{else}}all_field_width cq{{/is}}\" regex=\"checkBirthday\" role=\"birthdayM\" _cqnotice=\"mm\" style=\"\">&nbsp;-&nbsp;<input type=\"text\" value=\"{{../../birthdayD}}\" role=\"birthdayD\" class=\"{{#is ../InputClassType 'PkgOrderDetail.aspx'}}input_text input_field_width{{else}}all_field_width cq{{/is}}\" regex=\"checkBirthday\" _cqnotice=\"dd\">\n\
        </li>\n\
    {{/with}}\n\
    {{/if}}\n\
    {{#if BirthPlace}}\n\
    {{#with BirthPlace}}\n\
    <li class=\"optional later\" style={{#equal ../../IDCardType 1 \"display:none\" \"\"}}{{/equal}}>\n\
        <label for=\"\" class=\"product_label\">{{Name}}</label>\n\
        <input type=\"text\" value=\"{{../../HomePlace}}\" role=\"birthPlace\" class=\"{{#is ../InputClassType 'PkgOrderDetail.aspx'}}input_text{{else}}input_m{{/is}}\" regex=\"checkBirthPlace\" />\n\
    </li>\n\
    {{/with}}\n\
    {{/if}}\n\
    {{#if ContactPhone}}\n\
    {{#with ContactPhone}}\n\
    <li>\n\
        <label for=\"\" class=\"product_label\">手机号码</label>\n\
        <input type=\"number\" class=\"{{#is ../InputClassType 'PkgOrderDetail.aspx'}}input_text{{else}}input_m{{/is}}\" value=\"{{../../mobileNo}}\" role=\"mobileNo\" regex=\"checkMobile\" />\n\
        <span style=\"margin-left:10px;color:#999;\">请至少输入一位出行旅客的手机号码</span>\n\
    </li>\n\
    {{/with}}\n\
    {{/if}}\n\
    </ul><div class=\"save_wrap\">\n\
        <a href=\"###\" class=\"save selected\" role=\"saveId\"><i></i>保存</a>\n\
        <a href=\"###\" class=\"clear\" role=\"clear\">清空</a>\n\
    </div>\n\
</div>\n\
{{/each}}"});