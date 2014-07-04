//=====
//create by hwmiao(hwmiao@ctrip.com)
//=====
define(function (require, exports, module) {
    var $ = require('jquery');
    var cities = require('../public/address');
    var IDCheck = require('../public/IDCheck');
    var IsTmporaryOrder = false; // 是否暂存订单

    

    window.__bfi = window.__bfi || [];
    function ubt_userblock_post(el, msg) {
        if (!el) return false;
        var ct = 'validateCount',
            count = cQuery(el).data(ct);
        !count ? cQuery(el).data(ct, 1) : cQuery(el).data(ct, count + 1);
        window.__bfi.push(['_trackUserBlock', {
            'dom': (el.id && ('id:' + el.id)) || (el.name && ('name:' + el.name)) || '',
            'value': el.value || '',
            'type': (el.tagName ? 'dom:' + el.tagName.toLowerCase() : '') + (el.type ? ':' + el.type : ''),
            'form': el.form ? ((el.form.id && ('id:' + el.form.id)) || (el.form.name && ('name:' + el.form.name))) : '',
            'message': msg || '',
            'count': cQuery(el).data(ct)
        }]);
    }
    GVdate = {
        format: function (d, pad) {
            var r;
            if (pad == null) pad = false;
            r = [d.getFullYear(), d.getMonth() + 1, d.getDate()].join('-');
            if (pad) {
                return r.replace(/\b(\d)\b/g, '0$1');
            } else {
                return r;
            }
        },
        parse: function (str, isUtc) {
            var val;
            val = Date.parse(str.replace(/-/g, '/'));
            if (isNaN(val)) {
                return null;
            } else {
                return isUtc ? val : new Date(val);
            }
        }
    };
    var Birth = function (str, date) {
        var t = date ? GVdate.parse(date) : new Date();
        var y = t.getFullYear();
        var m = t.getMonth();
        var d = t.getDate();
        this.birth = {
            ref: t,
            baby: new Date(y - 2, m, d),
            child: new Date(y - 12, m, d),
            sixteen: new Date(y - 16, m, d),
            adult: new Date(y - 18, m, d),
            eldor: new Date(y - 70, m, d)
        };
        // this.str = str;
    };
    Birth.prototype = {
        getAge: function (str, date) {
            var birth = GVdate.parse(str),
                today = date ? new Date(date) : new Date(),
                age = today.getFullYear() - birth.getFullYear();
            if (today.getMonth() < birth.getMonth() || today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate()) {
                age--;
            }
            return age;
        },
        isAdult: function (str) {
            return GVdate.parse(str) < this.birth.adult;
        },
        isChild: function (str) {
            return GVdate.parse(str) > this.birth.child;
        },
        isBaby: function (str) {
            return GVdate.parse(str) > this.birth.baby;
        },
        underSixteen: function (str) {
            return GVdate.parse(str) > this.birth.sixteen;
        },
        isEldor: function (str) {
            return GVdate.parse(str) < this.birth.eldor;
        },
        laterThenDepart: function (str) {
            return GVdate.parse(str) > this.birth.ref;
        },
        laterThenToday: function (str) {
            return GVdate.parse(str) > new Date();
        }
    };
    var orderprocess = {
        config: {
            fetchUrl: ''
        },
        Reg: {
            hasCnChar: function (str) {
                return /[\u0100-\uffff]/.test(str);
            },
            isCnChar: function (str) {
                return /^[\u4e00-\u9fa5]+$/.test(str);
            },
            isEnChar: function (str) {
                return /^[A-Za-z][A-Za-z\s]*[A-Za-z]$/.test(str);
            },
            isEnName: function (str) {
                return /^[^\/]+\/[^\/]+$/.test(str);
            },
            hasEnChar: function (str) {
                return /[A-Za-z]/.test(str);
            },
            checkCnName: function (str, req) {
                if(req){
                    if ('' === str || str === "证件的中文姓名")
                        return [false, "请填写中文名"];
                    if (this.isCnChar(str) && str.length === 1)
                        return [false, "中文姓名不可少于2个汉字"];
                    if (this.isEnChar(str) || this.isEnName(str))
                        return [false, "请保持姓名与证件上的姓名一致"];
                    if (!/^[\u4e00-\u9fa5a-zA-Z-]+$/.test(str))
                        return [false, "中文姓名只能包含汉字（至少一个）、字母和连字符，生僻字可用拼音代替"];
                    if (this.hasEnChar(str))
                        return [true, '请确认填写的姓名与证件上姓名是否一致，生僻字可用拼音代替'];
                    if (/\u5c0f\u59d0|\u5148\u751f|\u592a\u592a|\u592b\u4eba/.test(str))
                        return [true, '您提交的姓名中含有称谓，请确认是否为您证件上的姓名'];
                }
                return [true, ];
            },
            checkEnNameNew: function (str, req) {
                if(req){
                    if ('' === str)
                        return [false, "请输入英文/拼音，如姓名为张小明，则在“姓（拼音或英文）”栏中输入Zhang；在“名（拼音或英文）”栏中输入XiaoMing"];
                    if (/[^a-zA-Z. \/'-]/.test(str))
                        return [false, "英文姓名中包含非法字符，请检查"];
                    if (!/^[a-zA-Z]/.test(str))
                        return [false, "英文的姓名必须以字母开头"];
                }
                return [true, ];
            },
            checkEnName: function (str) {
                if ('' === str)
                    return [false, "请填写英文姓名，姓名格式为姓/名，姓与名之间用 / 分隔，如Green/Jim King"];
                if (str.length < 2)
                    return [false, '英文姓名不可少于2个英文单词'];
                if (!this.isEnName(str))
                    return [false, "请填写英文姓名，姓名格式为姓/名，姓与名之间用 / 分隔，如Green/Jim King"];
                if (/[^a-zA-Z. \/'-]/.test(str))
                    return [false, "英文姓名中包含非法字符，请检查"];
                var name = str.split('/');
                if (/[^a-zA-Z]/.test(name[0]))
                    return [false, "英文的姓中只能包含字母"];
                if (!/^[a-zA-Z]/.test(name[1]))
                    return [false, "英文的名必须以字母开头"];
                return [true, ];
            },
            checkName: function (str, type, val) {
                if ('' === str)
                    return [false, '请填写姓名'];
                if (this.hasCnChar(str)) {
                    if (type == 'national' && val == '中国大陆')
                        return [false, '非中国国籍请填写英文姓名'];
                } else if (type == 'ID' && val == 1)
                    return [false, '请保持姓名与证件上的姓名一致'];
                else
                    return this.checkEnName(str);
            },
            checkPhone: function (str, type) {
                switch (type) {
                    case 'zcode':
                        if ('' === str || '区号' === str)
                            return [false, '请填写区号'];
                        if (/[^\d]/.test(str))
                            return [false, '区号仅包含数字'];
                        if (!/^0[0-9]{2,3}$/.test(str))
                            return [false, '区号必须是0开头的3或4位的数字'];
                        else
                            return [true, ];
                    case 'tphone':
                        if ('' === str || '电话号码' === str)
                            return [false, '请填写电话号码'];
                        if (/[^\d]/.test(str))
                            return [false, '请填写正确的电话号码，电话号码仅包含数字'];
                        if (str.length < 7)
                            return [false, '请填写正确的电话号码，电话号码长度7位以上'];
                        else
                            return [true, ];
                    case 'ext':
                        if ('分机号码' === str)
                            return [true, ];
                        if (/[^\d]/.test(str))
                            return [false, '分机号码必须是数字'];
                        else
                            return [true, ];
                }
            },
            checkMobile: function (str) {
                if ('' === str)
                    return [false, '请填写手机号码'];
                if (!/^0?1[34578]\d{9}$/.test(str))
                    return [false, '您填写的手机号码有误，请重新填写'];
                return [true, ]
            },
            checkEmail: function (str) {
                if ('' === str)
                    return [false, '请填写电子邮箱'];
                if (!/^([a-zA-Z0-9]+[_|\_|\.|-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.|-]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(str))
                    return [false, '请输入正确的电子邮箱'];
                return [true, ]
            },
            checkIdCard: function (str, type) {
                var _name = '1@身份证|2@护照|3@学生证|4@军官证|6@驾驶证|7@回乡证|8@台胞证|10@港澳通行证|11@国际海员证|20@外国人永久居留证|21@旅行证|22@台湾通行证|23@士兵证|24@临时身份证|25@户口簿|26@警官证|99@其它';
                var _ref = {};
                $.map(_name.split('|'), function (v, k) {
                    var _ar = v.split('@');
                    _ref[+_ar[0]] = _ar[1];
                })
                if ('' === str)
                    return [false, '请填写' + _ref[type] + '号码'];
                if (type === 1) {
                    if (!IDCheck(str)) {
                        return [false, '请输入正确的' + _ref[type] + '号码'];
                    } else {
                        var checkArray = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                        var referArray = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
                        var cardTemp = 0;
                        for (i = 0; i < 17; i++) {
                            cardTemp += str.substr(i, 1) * checkArray[i];
                        }
                        if (referArray[cardTemp % 11] != str.substr(17, 1)) {
                            return [false, '请输入正确的' + _ref[type] + '号码'];
                        }
                    }
                }
                if (type === 8) {
                    if (/[^A-Za-z0-9()（）]/.test(str))
                        return [false, '请填写正确的台胞证号码：号码中只能包含数字、字母或括号'];
                } else if (type === 4 || type === 13) {
                    if (/[^\u4e00-\u9fa5a-zA-Z0-9]/.test(str)) {
                        return [false, '请填写正确的军人证号码，号码中只能包含汉字、数字和字母'];
                    }
                } else {
                    if (/[^A-Za-z0-9]/.test(str))
                        return [false, "请填写正确的" + _ref[type] + "号码，号码中只能包含数字或字母"];
                }
                return [true, ];
            },
            //证件号码重复提示
            checkIdRepeat: function (type, IdNum, Rtext) {
                var IdNumber_Card1 = [];
                var repeatYes = false;
                for (i = 0; i < $("select[role='idCardType']").length; i++) {
                    if ($("select[role='idCardType']")[i].value == type && !$($("select[role='idCardType']")[i]).next().hasClass('f_error') && !$($("select[role='idCardType']")[i]).next().hasClass('inputSel')) {
                        IdNumber_Card1.push($($("select[role='idCardType']")[i]).next().val());
                    }
                }
                var number_Card1;
                for (i = 0; i < IdNumber_Card1.length; i++) {
                    number_Card1 = IdNumber_Card1[i];
                    for (j = 0; j < IdNumber_Card1.length; j++) {
                        if (number_Card1 == IdNumber_Card1[j] && i != j) {
                            repeatYes = true;
                        }
                    }
                }
                if ($(IdNum).next().hasClass('repeatNum')) {
                    $(IdNum).next().remove();
                }
                if (repeatYes) {
                    $('<span style="position:absolute;border:1px #ffb533 solid;height:26px;font:12px/2 Arial,Tahoma,simsun;background-color:#fff5d1;;line-height:26px;margin-left:7px" class="repeatNum">' + Rtext + '号码不能重复</span>').insertAfter($(IdNum));
                }
            }
        },
        data: {
            modules: {}, //对象模块
            productsPrice: 0, //票价和
            couponPrice: 0, //优惠券金额
            couponNowPrice: 0,
            postage: 0, //运费|邮费
            cache: {}, //缓存信息
            roles: {}, //需要操作的dom
            dfNational: null //默认国籍
        },
        status: {
            error: {},
            isTmpSave: false,
            isPay: false,
            errorElem: null
        },
        formData: { //submit数据
            PassengerInfos: [], //出行人
            CouponInfo: {
                IsUseCoupon: 0,
                CashBack: 0
            }, //促销
            InvoiceInfo: null, //发票
            ContactInfo: {}, //联系人
            CurrentUserUId: '', //用户uid
            DeliverInfo: {
                "DeliverType": 0,
                "AddresseeName": "",
                "ContactTel": "",
                "Address": "",
                "PostCode": ""
            },
            "OtherInfo": {
                "NoSmokingRoom": 0,
                // "NeedAdsl": 0,
                "BedDes": "",
                "Remark": ""
            }
        },
        tpl: { //模板
            payTip: '<div class="notice_box">\
                        <i></i>无需提前在携程网站付款，订单提交成功后，您可凭收到的订单确认短信至指定的售票窗口按预订价付款购票。\
                    </div>',
            linkerSug: '<div class="person_content">\
                        {{#if board}}\
                        <p>出行人</p>\
                        <div class="layoutfix">\
                            {{#each board}}\
                            <a href="###" index={{@index}}>{{#if nameCN}}{{nameCN}}{{else}}{{nameEN}}{{/if}}<span>{{mobileNo}}</span></a>\
                            {{/each}}\
                        </div>\
                        {{/if}}\
                        {{#if common}}\
                        <p>常用联系人</p>\
                        <div class="layoutfix">\
                            {{#each common}}\
                            <a href="###" uid="{{InfoID}}">{{ContactName}}<span>{{Moblie}}</span></a>\
                            {{/each}}\
                        </div>\
                        {{/if}}\
                    </div>',
            commoners: '<ul class="person_select">\
                {{#each collecters}}\
                    <li cid="{{clientID}}">\
                    <a href="javascript:void(0);" class="cb-item {{#if selected}}selected{{/if}}" ptype="{{ptype}}" cid="{{clientID}}" role="topContact" data-params="{id:\'{{clientID}}\',name:\'{{nameCN}}\',certificate:\'{{certificate}}\',certificate_number:\'{{certificate_number}}\',mphone:\'{{mobileNo}}\'}"><i></i><span>{{#if nameCN}}{{nameCN}}{{else}}{{#if ENFirstName}}{{ENLastName}}/{{ENFirstName}} {{ENMiddleName}}{{/if}}{{/if}}</span></a>\
                    </li>\
                {{/each}}\
              </ul>',
            traveller: '{{#each list}}\
                      <div class="product_input product_input_border layoutfix" ptype="{{#if isAdult}}1{{else}}0{{/if}}" filled="{{filled}}" index="{{clientID}}" role="youren">\
                         {{#unless @index}}\
                         <div class="warm_Tip">{{../../Reminder}}</div>\
                        {{/unless}}\
                        <h4>旅客{{#add @index 1}}{{/add}}\
                        {{#if isAdult}}\
                        <div><span class="adult">成人</span></div>\
                        {{else}}\
                        <div><span class="child">儿童</span></div>\
                        {{/if}}\
                        </h4>\
                        <ul class="input_box">\
                        {{#if UserName}}\
                            {{#with UserName}}\
                            <li>\
                                <label for="" class="product_label">{{Name}}</label>\
                                <span class="frm_required">*</span>\
                                <input type="text" class="input_m cq" _cqnotice="证件的姓名" value="{{#if ../../nameCN}}{{../../nameCN}}{{else}}{{../../ENLastName}}{{#if ../../ENLastName}}/{{/if}}{{../../ENFirstName}} {{../../ENMiddleName}}{{/if}}" role="name" regex="checkName" required/>\
                                <a tabindex="-1" href="###" class="explain" data-role="jmp" data-params="{options: {css:{maxWidth:\'400\',minWidth:\'240\'},type:\'jmp_table\', classNames:{boxType:\'jmp_table\'},template:\'#jmp_table1_1\',alignTo:\'cursor\'}}">填写说明</a>\
                            </li>\
                            {{/with}}\
                        {{/if}}\
                        {{#if ChineseName}}\
                            {{#with ChineseName}}\
                            <li>\
                                <label for="" class="product_label">{{Name}}</label>\
                                <span class="frm_required">*</span>\
                                <input type="text" class="input_m cq" _cqnotice="证件的中文姓名" value="{{../../nameCN}}" role="nameCN" regex="checkCnName" required/>\
                                <a tabindex="-1" href="###" class="explain" data-role="jmp" data-params="{options: {css:{maxWidth:\'400\',minWidth:\'240\'},type:\'jmp_table\', classNames:{boxType:\'jmp_table\'},template:\'#jmp_table1_2\',alignTo:\'cursor\'}}">填写说明</a>\
                            </li>\
                            {{/with}}\
                        {{/if}}\
                        {{#if EnglishName}}\
                            {{#with EnglishName}}\
                            <li class="optional">\
                                <label for="" class="product_label">{{Name}}</label>\
                                <input type="text" class="input_englishname cq" _cqnotice="姓（拼音或英文）" value="{{#if ../../ENLastName}}{{../../ENLastName}}{{/if}}" role="nameEnLast" />\
                                <input type="text" class="input_englishname input_engnomar cq" _cqnotice="名（拼音或英文）" value="{{#if ../../ENFirstName}}{{../../ENFirstName}}{{#if ../../ENMiddleName}} {{../../../ENMiddleName}}{{/if}}{{/if}}" role="nameEnFirst"  />\
                                <a tabindex="-1" href="###" class="explain" data-role="jmp" data-params="{options: {css:{maxWidth:\'400\',minWidth:\'240\'},type:\'jmp_table\', classNames:{boxType:\'jmp_table\'},template:\'#jmp_table1_3\',alignTo:\'cursor\'}}">填写说明</a>\
                                <span class="hrs hrs2">(可稍后提供)</span>\
                            </li>\
                            {{/with}}\
                        {{/if}}\
                        {{#if Nationality}}\
                            {{#with Nationality}}\
                            <li class="optional later" style={{#equal ../../IDCardType 1 "display:none" ""}}{{/equal}}>\
                                <label for="" class="product_label">{{Name}}</label>\
                                <span class="frm_required">*</span>\
                                <input mod_value="{{../../national}}" type="text" value="{{../../national}}" regex="checkNationality" role="national" class="input_m cq nationality" _cqnotice="中文/拼音" required/>\
                            </li>\
                            {{/with}}\
                        {{/if}}\
                        {{#if IDType}}\
                            {{#with IDType}}\
                            <li>\
                                <label for="" class="product_label">{{Name}}</label>\
                                <span class="frm_required">*</span>\
                                <select name="" value="{{../../IDCardType}}" role="idCardType" regex="checkIdCardType">\
                                {{#each ../idOptions}}\
                                    <option {{#equal ../../IDCardType CustomerInfoItemType "selected" ""}}{{/equal}} value="{{CustomerInfoItemType}}">{{Name}}</option>\
                                {{/each}}\
                                </select>\
                                <input type="text" value="{{../../IDCardNo}}" role="idCardNo" class="input_s later cq" regex="checkIdCard" _cqnotice="证件号码" note="{{../../restrictions}}" required/>\
                                <span class="hrs" role="passportType" style={{#equal ../../IDCardType 2 "" "display:none;"}}{{/equal}}>因私护照</span>\
                                <div class="help_block"><span class="ico"></span>特别提醒：为了您能顺利出行，请确保旅行结束日期至少比证件有效期早6个月。</div>\
                            </li>\
                            {{/with}}\
                        {{/if}}\
                        {{#if CardValidUntil}}\
                            {{#with CardValidUntil}}\
                            <li class="optional later" style={{#equal ../../IDCardType 1 "display:none" ""}}{{/equal}}>\
                                <label for="" class="product_label">{{Name}}</label>\
                                <input type="number" value="{{../../IDCardTimelimitY}}" class="all_field_width cq J_uyear"  role="cardValidUntilY" _cqnotice="yyyy" style="" >&nbsp;-&nbsp;<input type="number" value="{{../../IDCardTimelimitM}}" class="all_field_width cq J_umonth" role="cardValidUntilM" _cqnotice="mm" style="" >&nbsp;-&nbsp;<input type="number" value="{{../../IDCardTimelimitD}}" role="cardValidUntilD" class="all_field_width cq J_udate"  _cqnotice="dd" >\
                                <span class="hrs hrs2">(可稍后提供)</span>\
                            </li>\
                            {{/with}}\
                        {{/if}}\
                        {{#if Sex}}\
                            {{#with Sex}}\
                             <li class="optional" style={{#equal ../../IDCardType 1 "display:none" ""}}{{/equal}}>\
                                <label for="" class="product_label">{{Name}}</label>\
                                <span class="frm_required">*</span>\
                                <select name="" value="{{../gender}}" role="gender" regex="checkSex" required>\
                                    <option value="-1">请选择</option>\
                                    <option {{#equal ../../gender 0 "selected" ""}}{{/equal}} value="0">男</option>\
                                    <option {{#equal ../../gender 1 "selected" ""}}{{/equal}} value="1">女</option>\
                                </select>\
                            </li>\
                            {{/with}}\
                        {{/if}}\
                        {{#if Birthday}}\
                        {{#with Birthday}}\
                            <li class="optional later" style={{#equal ../../IDCardType 1 "display:none" ""}}{{/equal}}>\
                              <label for="" class="product_label">{{Name}}</label>\
                              <input type="number" value="{{../../birthdayY}}" class="all_field_width cq"  role="birthdayY" _cqnotice="yyyy" style="">&nbsp;-&nbsp;<input type="number" value="{{../../birthdayM}}" class="all_field_width cq" role="birthdayM"  _cqnotice="mm" style="">&nbsp;-&nbsp;<input type="number" value="{{../../birthdayD}}" role="birthdayD" class="all_field_width cq"  _cqnotice="dd">\
                              <span class="hrs hrs2">(可稍后提供)</span>\
                            </li>\
                        {{/with}}\
                        {{/if}}\
                        {{#if BirthPlace}}\
                        {{#with BirthPlace}}\
                        <li class="optional later" style={{#equal ../../IDCardType 1 "display:none" ""}}{{/equal}}>\
                            <label for="" class="product_label">{{Name}}</label>\
                            <input type="text" value="{{../../HomePlace}}" role="birthPlace" class="input_m"/>\
                            <span class="hrs hrs2">(可稍后提供)</span>\
                        </li>\
                        {{/with}}\
                        {{/if}}\
                        {{#if CustomerType}}\
                            {{#is cutomerOptions.length \'>\' 0}}\
                            {{#with CustomerType}}\
                             <li class="optional">\
                                <label for="" class="product_label">{{Name}}</label>\
                                <span class="frm_required">*</span>\
                                 <select name="" value="{{../../CustomerNoType}}" role="CustomerType" required>\
                                {{#each ../cutomerOptions}}\
                                    <option {{#equal ../../CustomerNoType CustomerInfoItemType "selected" ""}}{{/equal}} value="{{CustomerInfoItemType}}">{{Name}}</option>\
                                {{/each}}\
                                </select>\
                            </li>\
                            {{/with}}\
                            {{/is}}\
                        {{/if}}\
                        {{#if ContactPhone}}\
                        {{#with ContactPhone}}\
                        <li>\
                            <label for="" class="product_label">手机号码</label>\
                            <span class="frm_required">*</span>\
                            <input type="number" class="input_m" value="{{../../mobileNo}}" role="mobileNo" class="" regex="checkMobile" required/>\
                            <span style="margin-left:10px;color:#999;">请至少输入一位出行旅客的手机号码</span>\
                        </li>\
                        {{/with}}\
                        {{/if}}\
                        </ul><div class="save_wrap">\
                            <a href="###" class="save selected" role="saveId"><i></i>保存</a>\
                            <a href="###" class="clear" role="clear">清空</a>\
                        </div>\
                   </div>\
                   {{/each}}',
            linkmanBox: '<ul class="input_box linkman_info" role="contact">\
                        <li>\
                            <label class="product_label">姓名</label>\
                            <input type="text" value="{{name}}" role="ctname"  require="1" regex="checkName" class="input_m">\
                        </li>\
                        <li>\
                            <label for="" class="product_label">手机号码</label>\
                            <input type="number" value="{{mobileNo}}" role="ctmphone" regex="checkMobile" class="input_m">\
                        </li>\
                        <li>\
                            <label for="" class="product_label">联系电话</label>\
                            <input type="number" value="" class="in_num01 " id="notice2" notice="区号" role="ctzcode" _cqnotice="区号" style="" regex="checkPhone">\
                            <input type="number" value="" class="in_num02 " id="notice3" notice="电话号码" role="cttphone" _cqnotice="电话号码" style="" regex="checkPhone">\
                            <input type="number" value="" class="in_num03 " id="notice4" notice="分机号码" role="ctext" _cqnotice="分机号码" style="" regex="checkPhone">\
                        </li>\
             <li>\
                            <label for="" class="product_label">Email</label>\
                            <input type="text" value="{{email}}" role="ctemail" require="1" regex="checkEmail" class="input_m">\
              {{#if IsVisa}}<span class="hrs">为了能够收取签证材料相关信息，请填写正确邮箱</span>{{/if}}\
                        </li>\
                        <div class="contact_remarks linkman_tel"><span>}</span>此处手机号码和联系电话至少要填一项</div>\
                     </ul><div class="clear:both"></div>',
            linkmanDf: '<ul class="input_box contact_info linkman_info">\
                        <li class="default">\
                            <a href="###" class="revise">【修改】</a>\
                            <span class="tit">姓名</span>\
                            <span>{{name}}</span>\
                            {{#if mobileNo}}\
                            <span class="tit">手机号</span>\
                            <span>{{mobileNo}}</span>\
                            {{else}}\
                            <span class="tit">联系电话</span>\
                            <span>{{telNo}}</span>\
                            {{/if}}\
                            <span class="tit">Email</span>\
                            <span>{{email}}</span>\
                        </li>\
                     </ul>',
            delivery: '<div class="delivery">\
                        <b class="tab_01"></b>\
                        <div class="tit"><a href="http://pages.ctrip.com/homepage/xuzhi.htm" target="_blank">送票范围说明&gt;&gt;</a>配送城市<strong>{{location}}</strong></div>\
                        <ul class="address_list" role="addressList">\
                            {{each address_list}}\
                                <li><label for="m4"><input type="radio" value="radio" name="radio" id="m4">{{address}}</label></li>\
                            {{each}}\
                        </ul>\
                        <div class="btn">\
                            <a class="btn_submit" href="###">使用新地址</a>\
                            <a href="###">使用其他地址</a>\
                        </div>\
                    </div>',
            coupon: '<li class="point" style="display:none">温馨提示：优惠券与限额抵用券无法同时使用</li>\
                      {{#each list}}\
                            {{#if extendPromotion}}\
                            <li class="lj_sale item">\
                                <label for="m{{@index}}">\
                                <input type="radio" class="radio" role="couponCheck" extend="1" requireCode="1" strategyID="{{DeductionStrategyID}}" PromotionID="{{PromotionID}}"  name="RadioGroup1" id="m{{@index}}">\
                                <span role="displayName">{{DisplayName}}</span></label>\
                                <span style="display:none" role="code">\
                                <input type="text" value="" class="input_sale"  role="couponCode">\
                                <input type="button" value="确定" class="btn_submit" role="checkcode">\
                                </span>\
                                &nbsp;&nbsp;<span class="tip" style="color:#ff7a17" role="tip"></span>\
                                <div class="lj_sale_notice" role="extendDescription" style="{{#unless Description}}display:none;{{/unless}}">{{{Description}}}</div>\
                                <a href="###" role="reinput" style="display:none;">重新输入优惠代码</a>\
                            </li>\
                            {{else}}\
                                {{#if IsNeedCaptcha}}\
                                <li class="lj_sale item">\
                                    <label for="m{{@index}}">\
                                    <input type="radio" class="radio" role="couponCheck" extend="0" requireCode="1" strategyID="{{DeductionStrategyID}}" PromotionID="{{PromotionID}}"  name="RadioGroup1" id="m{{@index}}">\
                                    <span role="displayName">{{DisplayName}}</span></label>\
                                    <span style="display:none" role="code">\
                                    <input type="text" value="" class="input_sale"  role="couponCode">\
                                    <input type="button" value="确定" class="btn_submit" role="checkcode">\
                                    </span>\
                                    &nbsp;&nbsp;<span class="tip" style="color:#ff7a17" role="tip"></span>\
                                    {{#if Description}}<div class="lj_sale_notice" role="description" style="display:none;">{{{Description}}}</div>{{/if}}\
                                    <a href="###" role="reinput" style="display:none;">重新输入优惠代码</a>\
                                </li>\
                                {{else}}\
                                <li class="lj_sale item">\
                                    <label for="m{{@index}}">\
                                    <input type="radio" class="radio" role="couponCheck" extend="0" requireCode="0" strategyID="{{DeductionStrategyID}}" reduced="{{reducedAmount}}" PromotionID="{{PromotionID}}" name="RadioGroup1" id="m{{@index}}">\
                                    <span role="displayName">{{DisplayName}}</span>\
                                    </label>&nbsp;&nbsp;<span class="tip" style="color:#ff7a17" role="tip"></span>\<br>\
                                    {{#if Description}}<div class="lj_sale_notice" role="description" style="display:none;">{{{Description}}}</div>{{/if}}\
                                </li>\
                                {{/if}}\
                            {{/if}}\
                        {{/each}}\
                        <li><label for="m100"><input checked="checked" type="radio" class="radio" role="cancel" name="RadioGroup1" id="m100"> 不使用优惠</label></li>',
            autoCoupon: '<div id="autoCoupon_{{index}}" class="{{#if big}}sub_big_coupon{{else}}sub_coupon{{/if}}" style="position: absolute; display: none">\
                            <ul>\
                            {{#if big}}\
                                {{#each list}}\
                                <li><a href="javascript:void(0);"><span class="coupon_num">{{CouponCode}}</span><span class="coupon_tit">{{PromotionDisplayName}}</span></a></li>\
                                {{/each}}\
                            {{else}}\
                                {{#each list}}\
                                    <li><a href="javascript:void(0);">{{CouponCode}}</a></li>\
                                {{/each}}\
                            {{/if}}\
                        </div>',
            singleCoupon: '<div class="discount">\
                    <h4>优惠券</h4>\
                    {{#each list}}\
                    <div class="discount_box item">\
                        <div role="cnew">\
                            <div class="basefix">\
                                <p class="title" style="display:none">优惠提示：优惠券与限额抵用券无法同时使用</p>\
                                {{DisplayName}}\
                                <span role="code">\
                                <input type="text" class="input_width" PromotionID="{{PromotionID}}" extend="1" role="couponCode"><a role="checkcode" href="###" class="btn_normal">确定</a>\
                                </span>\
                                <span class="tip" style="color:#ff7a17" role="tip"></span>\
                            </div>\
                        </div>\
                        <div role="had" style="display:none">\
                            <div class="basefix">\
                                <p class="title" style="display:none">优惠提示：优惠券与限额抵用券无法同时使用</p>\
                                <span class="singleName">\
                                {{#if extendPromotion}}\
                                {{DisplayNameR}}\
                                {{else}}\
                                {{DisplayName}}\
                                {{/if}}\
                                </span>\
                                <span class="price" role="tip">\
                                {{#if ReducedAmount}}\
                                -<dfn>&yen;</dfn>{{ReducedAmount}}\
                                {{else}}\
                                已选择\
                                {{/if}}\
                                </span>\
                            </div>\
                            <div class="explain">{{{Description}}}</div>\
                            <div><a href="###" role="singleReInput">重新输入优惠代码</a></div>\
                        </div>\
                    </div>\
                    {{/each}}\
                </div>',
            hotelCoupon: '<div class="product_input layoutfix">\
                            <h4>酒店优惠券</h4>\
                            <ul class="input_box sale">\
                            <li><span data-role="jmp" data-params="{options:{type:\'jmp_alert\',classNames:{boxType:\'jmp_alert\'},template:\'#jmp_alert\', content:{txt:\'选择此房型提交订单，结束游玩后发表行程点评，每间夜可获得{{coupon}}元点评奖金。<br/><a href=http://help.ctrip.com/QuestionDetail.aspx?questionId=693 target=_blank>什么是国内旅游度假自由行产品点评返现？</a>\'},css:{maxWidth:\'300\'},alignTo:\'cursor\',showArrow:false}}" class="rebates"><em>返</em>{{coupon}}元</span></li>\
                            {{#if used}}\
                            <li role="having" style="display:none;"><i class="htl_icon_yes"></i>您有<dfn>¥</dfn>{{Amount}}消费券，本次可使用<span class="price_red"><dfn>¥</dfn>{{CanUseAmount}}</span>获得返现。\
                            {{#if isRemain}}\
                            <a href="###" class="btn_red_small" role="confirm">使用消费券</a>\
                            {{else}}\
                            <a href="###" class="btn_small_disabled">使用消费券</a>\
                            {{/if}}\
                            <li role="had">您已使用消费券<span class="price_red"><dfn>¥</dfn>{{used}}</span>。<span class="point">（还剩消费券<dfn>¥</dfn>{{remain}}）</span><a href="###" style="margin-left:15px;" role="cancel">取消使用</a></li>\
                            <li role="had">订单成交且结束游玩后对度假产品发表行程点评后可获得<dfn>¥</dfn>{{CanUseAmount}}现金账户。</li>\
                            <li class="point" role="had">如使用礼品卡支付，不能参加返现活动，消费券会退回您的账户。</li>\
                            {{else}}\
                            <li role="having" ><i class="htl_icon_yes"></i>您有<dfn>¥</dfn>{{Amount}}消费券，本次可使用<span class="price_red"><dfn>¥</dfn>{{CanUseAmount}}</span>获得返现。\
                            {{#if isRemain}}\
                            <a href="###" class="btn_red_small" role="confirm">使用消费券</a>\
                            {{else}}\
                            <a href="###" class="btn_small_disabled">使用消费券</a>\
                            {{/if}}\
                            </li>\
                            <li role="had" style="display:none">您已使用消费券<span class="price_red"><dfn>¥</dfn>{{CanUseAmount}}</span>。<span class="point">（还剩消费券<dfn>¥</dfn>{{remain}}）</span><a href="###" style="margin-left:15px;" role="cancel">取消使用</a></li>\
                            <li role="had" style="display:none">订单成交且结束游玩后对度假产品发表行程点评后可获得<dfn>¥</dfn>{{CanUseAmount}}现金账户。</li>\
                            <li class="point" role="had" style="display:none">如使用礼品卡支付，不能参加返现活动，消费券会退回您的账户。</li>\
                            {{/if}}\
                        </ul>\
                        </div>',
            nameTips: '<div class="person_passenger" role="nameTips">\
                        {{#if clientID}}\
                        <div class="base_txtgray hand had"><span class="name">{{nameCN}}</span>中文姓名</div>\
                        <div class="base_txtgray hand had"><span class="name">{{nameEN}}</span>英文姓名</div>\
                        {{else}}\
                        <div class="base_txtgray hand"><span>中文或拼音</span>中文姓名</div>\
                        <div class="base_txtgray hand"><span>last（姓）/first（名）</span>英文姓名</div>\
                        {{/if}}\
                    </div>',
            nameCNTips: '<div class="person_passenger" role="nameTips">\
                        {{#if nameCN}}\
                        <div class="base_txtgray hand had"><span class="name">{{nameCN}}</span>中文姓名</div>\
                        {{else}}\
                        <div class="base_txtgray hand"><span>中文或拼音</span>中文姓名</div>\
                        {{/if}}\
                    </div>',
            nameENTips: '<div class="person_passenger" role="nameTips">\
                        {{#if nameEN}}\
                        <div class="base_txtgray hand had"><span class="name">{{nameEN}}</span>英文姓名</div>\
                        {{else}}\
                        <div class="base_txtgray hand"><span>last（姓）/first（名）</span>英文姓名</div>\
                        {{/if}}\
                    </div>',
            nameEnFirstTips: '<div class="person_passenger english_passenger" role="nameTips">\
                        {{#if nameEnFirst}}\
                        <div class="base_txtgray hand had"><span class="name">{{nameEnFirst}} {{nameEnMiddle}}</span>英文名</div>\
                        {{else}}\
                        <div class="base_txtgray hand"><span>first name</span>英文名</div>\
                        {{/if}}\
                    </div>',
            nameEnLastTips: '<div class="person_passenger english_passenger" role="nameTips">\
                        {{#if nameEnLast}}\
                        <div class="base_txtgray hand had"><span class="name">{{nameEnLast}}</span>英文姓</div>\
                        {{else}}\
                        <div class="base_txtgray hand"><span>last name</span>英文姓</div>\
                        {{/if}}\
                    </div>',
            price: '<div id="price_box_wrap" class="price_box_wrap">\
                        <ul class="price_box">\
                            <li class="total_price2"><strong>总价</strong><span class="price2"><dfn>&yen;</dfn><span role="amountTotal">{{Amount}}</span></span></li>\
                            <li>\
                            {{#if IsGroupTravel}}\
                                <div class="basefix"><span class="price_item">基本团费</span></div>\
                            {{else}}\
                                <div class="basefix"><span class="price_item">基本费用</span></div>\
                            {{/if}}\
                            {{#if AduNumber}}\
                            <div class="basefix"><span class="price_item">成人</span><strong class="price_detail"><span>{{AduNumber}}&nbsp;×</span><dfn>&yen;</dfn>{{AduAmount}}</strong></div>\
                            {{/if}}\
                            {{#if ChildNumber}}\
                            <div class="basefix"><span class="price_item">儿童{{#if IsNoBed}}(不占床){{/if}}</span><strong class="price_detail"><span>{{ChildNumber}}&nbsp;×</span><dfn>&yen;</dfn>{{ChildAmount}}</strong></div>\
                            {{/if}}\
                            </li>\
                            {{#if Surcharge}}\
                                <li><span class="price_item">附加费</span><strong class="price_detail"><dfn>&yen;</dfn>{{Surcharge}}</strong></li>\
                            {{/if}}\
                            {{#if TicketsTotalFree}}\
                                <li><span class="price_item">出票费</span><strong class="price_detail"><dfn>&yen;</dfn>{{TicketsTotalFree}}</strong></li>\
                            {{/if}}\
                            <li role="fright" style="{{#unless Freight}}display:none{{/unless}}"><span class="price_item">配送费</span><strong class="price_detail"><dfn>&yen;</dfn><em role="amountPostage" style="font-style:normal">{{Freight}}</em></strong></li>\
                            <li role="discount" style="{{#unless DiscountAmount}}display:none{{/unless}}"><span class="price_item">优惠<i>减</i></span><strong class="price_detail highlight">-<dfn>&yen;</dfn> <em style="font-style:normal" role="amountCoupon">{{DiscountAmount}}</em></strong></li>\
                            {{#if isTempSave}}\
                            <li class="border_none" style="position:static;"><a href="###" role="save" class="price_btn_order" id="J_tmpriceorder" style="display:none"><span><i></i></span>暂存订单</a></li>\
                            {{/if}}\
                        </ul>\
                        <div class="phone_service" id="J_tab_hot_phone" style=" display:none;"> \
                          <p>行程有疑问？懒得填信息？<br>专业客服为您提供咨询服务。</p> \
                          <p class="phone_num"><i></i><span id ="js_telTrefer"></span></p> \
                       </div> \
                        <a class="online_service" id="J_online_service" href="{{ChatUrl}}" target="_blank" style="display:none">在线客服</a>\
                </div>',
            priceCur: '<div id="price_box_wrap" class="price_box_wrap">\
                        <ul class="price_box">\
                            <li class="total_price2"><strong>总价</strong><span class="price2"><dfn>&yen;</dfn><span role="amountTotal" id="cur_Total">{{Amount}}</span></span></li>\
                            <li>\
                            {{#if IsGroupTravel}}\
                                <div class="basefix" style="display:none"><span class="price_item">基本团费</span></div>\
                            {{else}}\
                                <div class="basefix" style="display:none"><span class="price_item">基本费用</span></div>\
                            {{/if}}\
                            {{#if AduNumber}}\
                            <div class="basefix"><span class="price_item">人数</span><strong class="price_detail"><span id="cur_Per">{{#plus AduNumber ChildNumber}}{{/plus}}</span></strong></div>\
							<div class="basefix"><span class="price_item">人均</span><strong class="price_detail" style="color:#FF6600"><dfn>&yen;<strong id="tar_Num" ></strong></dfn></strong></div>\
						    {{/if}}\
                            {{#if ChildNumber}}\
                            <div class="basefix" style="display:none"><span class="price_item">儿童{{#if IsNoBed}}(不占床){{/if}}</span><strong class="price_detail"><span>{{ChildNumber}}&nbsp;×</span><dfn>&yen;</dfn>{{ChildAmount}}</strong></div>\
                            {{/if}}\
                            </li>\
                            {{#if Surcharge}}\
                                <li style="display:none"><span class="price_item">附加费</span><strong class="price_detail"><dfn>&yen;</dfn>{{Surcharge}}</strong></li>\
                            {{/if}}\
                            {{#if TicketsTotalFree}}\
                                <li style="display:none"><span class="price_item">出票费</span><strong class="price_detail"><dfn>&yen;</dfn>{{TicketsTotalFree}}</strong></li>\
                            {{/if}}\
                            <li role="fright" style="display:none;"><span class="price_item">配送费</span><strong class="price_detail"><dfn>&yen;</dfn><em role="amountPostage" style="font-style:normal">{{Freight}}</em></strong></li>\
                            <li role="discount" style="display:none;"><span class="price_item">优惠<i>减</i></span><strong class="price_detail highlight">-<dfn>&yen;</dfn> <em style="font-style:normal" role="amountCoupon">{{DiscountAmount}}</em></strong></li>\
                            {{#if isTempSave}}\
                            <li class="border_none" style="position:static;"><a href="###" role="save" class="price_btn_order" id="J_tmpriceorder" style="display:none"><span><i></i></span>暂存订单</a></li>\
                            {{/if}}\
                        </ul>\
                        <div class="phone_service" id="J_tab_hot_phone" style=" display:none;"> \
                          <p>行程有疑问？懒得填信息？<br>专业客服为您提供咨询服务。</p> \
                          <p class="phone_num"><i></i><span id ="js_telTrefer"></span></p> \
                       </div> \
                        <a class="online_service" id="J_online_service" href="{{ChatUrl}}" target="_blank" style="display:none">在线客服</a>\
                </div>',
            invoiceBox: '<ul class="bill_box" role="invoice">\
                            <li class="point">礼品卡等消费券支付的金额不提供报销凭证</li>\
                            <li>\
                                <label for="" class="product_label">是否需要发票</label>\
                                <label for="invoice01" class="radio"><input role="selectInvo" type="radio" value="1" name="invoice" id="invoice01">是</label>\
                                <label for="invoice02" class="radio"><input role="cancelInvo" type="radio" value="0" name="invoice" checked="checked" id="invoice02">否</label>\
                                <span id="J_invoiceTip" class="point" style="display:none"></span>\
                                <li role="invoiceli" style="display:none">\
                                    <label for="" class="product_label">发票抬头</label>\
                                    <input type="text" value="{{initTitle}}" class="num01" role="getInvoice">\
                                    <span class="point">遵循税务局相关规定，发票抬头必须为个人姓名或公司名称</span>\
                                </li>\
                                <li role="invoiceli" style="display:none">\
                                    <label for="" class="product_label">发票明细</label>\
                                    <select name="" role="invoiceDetail">\
                                        {{#each Content}}\
                                           {{#if initTitle}}\
                                           <option {{#equal initContent Value "selected" ""}}{{/equal}} value="{{Key}}">{{Value}}</option>\
                                           {{else}}\
                                           <option value="{{Key}}">{{Value}}</option>\
                                           {{/if}}\
                                        {{/each}}\
                                    </select>\
                                </li>\
                            </li>\
                      </ul>',
            invoiceDf: '<ul class="input_box" style="zoom:1">\
                            <li class="point">礼品卡等消费券支付的金额不提供报销凭证</li>\
                            <li class="default">\
                                <a href="###" class="revise">【修改】</a>\
                                {{#if initTitle}}\
                                {{initTitle}} {{initContent}}\
                                {{else}}\
                                <span>不需要发票</span>\
                                {{/if}}\
                            </li>\
                        </ul>',
            deliveryDf: '<ul class="input_box">\
                            <li class="default">\
                                <a href="###" class="revise">【修改】</a>\
                                <span class="tit">{{psType}}</span>\
                                <span class="tit">送票地址</span>\
                                {{#with AddressInfo}}\
                                <span>{{#if noCity}}{{CityName}} {{../Canton}} {{/if}}{{Address}} {{#if Post}}{{Post}}{{/if}} {{#if Recipient}}({{Recipient}} 收){{/if}} {{#if Mobile}}{{Mobile}}{{else}}{{#if Tel}}{{Tel}}{{/if}}{{/if}}</span>\
                                {{/with}}\
                            </li>\
                        </ul>',
            deliveryBox: '<div class="input_box" id="deliverBox">\
                            <div class="basefix">\
                                <ul id="tabs" class="tab_box layoutfix">\
                                    {{#if py}}\
                                    {{#with py}}\
                                    <li role="tab" type="4" tab="{{../../pyindex}}"><a type="4" href="###">免费平邮</a></li>\
                                    {{/with}}\
                                    {{/if}}\
                                    {{#if ps}}\
                                    {{#with ps}}\
                                    <li role="tab" type="1" tab="{{../../psindex}}"><a type="1" href="###">市内配送<span class="price">{{#if DeliveryAmount}}<dfn>¥</dfn>{{DeliveryAmount}}{{else}}免费{{/if}}</span></a></li>\
                                    {{/with}}\
                                    {{/if}}\
                                    {{#if zq}}\
                                    <li  role="tab"  type="2" tab="{{zqindex}}"><a type="2" href="###">市内自取</a></li>\
                                    {{/if}}\
                                    {{#if ems}}\
                                    {{#with ems}}\
                                    <li role="tab"  type="3"  tab="{{../../emsindex}}"><a type="3" href="###">EMS邮递<span class="price">{{#if DeliveryAmount}}<dfn>¥</dfn>{{DeliveryAmount}}{{else}}免费{{/if}}</span></a></li>\
                                    {{/with}}\
                                    {{/if}}\
                                    {{#if sf}}\
                                    {{#with sf}}\
                                    <li role="tab"  type="5"  tab="{{../../sfindex}}"><a type="5" href="###">顺丰快递<span class="price">{{#if DeliveryAmount}}<dfn>¥</dfn>{{DeliveryAmount}}{{else}}免费{{/if}}</span></a></li>\
                                    {{/with}}\
                                    {{/if}}\
                                </ul>\
                                {{#if deliveryGoods}}\
                                <span data-role="jmp" data-params="{options:{type:\'jmp_title\',classNames:{boxType:\'jmp_title\'},template:\'#jmp_pkg_delivery\',content:{txt:\'{{deliveryGoods}}\'},css:{maxWidth:\'300\',minWidth:\'240\'},alignTo:\'cursor\',showArrow:false}}" class="distribution_list">配送清单</span>\
                                {{/if}}\
                                {{#if sf}}\
                                {{#with sf}}\
                                <span style="float:right;color:#999">携程旅游选择顺丰速运为您提供上门取件服务，保障您的签证材料安全及时到达。</span>\
                                {{/with}}\
                                {{/if}}\
                            </div>\
                            <div id="content" class="delivery_content">\
                                {{#if py}}\
                                <div class="delivery"  type="4"  style="display:none">\
                                    <b></b>\
                                    <div class="tit">\
                                        {{#if ems.DeliveryAmount}}<div class="postage"><span>邮递费</span><dfn>¥</dfn>{{ems.DeliveryAmount}}</div>{{/if}}\
                                        选择常用地址\
                                    </div>\
                                    {{#if emsAddress}}\
                                    <div class="usual_address_mod">\
                                      <ul class="usual_address_list" role="addressList" type="4">\
                                        {{#each emsAddress}}\
                                        <li class="usual_address_item {{#unless @index}}usual_address_item_selected{{/unless}}">\
                                          <p class="name">{{#if Recipient}}({{Recipient}} 收){{/if}}</p>\
                                          <p class="tel">{{#if Mobile}}{{Mobile}}{{else}}{{#if Tel}}{{Tel}}{{/if}}{{/if}}</p>\
                                          <p class="address">{{Address}}</p>\
                                          <p class="code">{{Post}}</p>\
                                          <i class="ico_checked"></i>\
                                          <a href="###" class="edit" role="adsedit" type="4" cantonID="{{CantonID}}" infoId="{{InfoId}}" data-Recipient="{{Recipient}}" data-tel="{{#if Mobile}}{{Mobile}}{{else}}{{#if Tel}}{{Tel}}{{/if}}{{/if}}" data-CityName="{{CityName}}" data-CantonName="{{CantonName}}" data-Address="{{Address}}" data-Post="{{Post}}"><i></i>编辑</a>\
                                          <input cantonID="{{CantonID}}" {{#equal @index 0 "checked=checked" ""}}{{/equal}} index={{InfoId}} type="radio" value="{{InfoId}}" name="radio4" id="py{{@index}}" class="J_hideradio" style="display:none">\
                                        </li>\
                                        {{/each}}\
                                      </ul>\
                                      <div class="handle_area">{{#unless hideEmsAddress}}<a href="###" role="other"><i class="ico_more"></i>更多地址</a>{{/unless}}<a href="###" role="addads"><i class="ico_add"></i>新增地址</a></div>\
                                    </div>\
                                    {{/if}}\
                                    <div class="hide_options" role="hideOptions" style={{#if emsAddress}}"display:none"{{else}}"display:block"{{/if}}>\
                                        <table>\
                                            <tbody><tr>\
                                                <th>收件人</th>\
                                                <td><input regex="checkRecipient" type="text" class="input_m cqsy"　_cqnotice="中文/英文" role="recipient"></td>\
                                            </tr>\
                                            <tr>\
                                                <th>联系电话</th>\
                                                <td><input type="text" regex="checkContactTel" class="input_m" role="contactTel"></td>\
                                            </tr>\
                                            <tr>\
                                                <th>邮寄地址</th>\
                                                <td id="cities_p" role="selectCity">\
                                                </td>\
                                            </tr>\
                                            <tr>\
                                                <th class="import"></th>\
                                                <td><input type="text" regex="checkDetail" class="input_m" role="detail"></td>\
                                            </tr>\
                                            <tr style="display:none;">\
                                                <th class="import"></th>\
                                                <td>\
                                                    <div class="help_block"><span class="ico"></span>请填写详细的收件地址后查询</div>\
                                                </td>\
                                            </tr>\
                                            <tr>\
                                                <th>邮政编码</th>\
                                                <td><input type="text" regex="checkPostage" style="width:120px;" class="mr5" role="postage"></td>\
                                            </tr>\
                                        </tbody></table>\
                                    </div>\
                                </div>\
                                {{/if}}\
                                {{#if ps}}\
                                <div class="delivery" style="display:none" type="1">\
                                    <b></b>\
                                    <div class="tit">\
                                        <a href="http://pages.ctrip.com/homepage/xuzhi.htm" target="_blank">送票范围说明</a>\
                                        {{#if ps.DeliveryAmount}}<div class="postage"><span>配送费</span><dfn>¥</dfn>{{ps.DeliveryAmount}}<span>起，具体金额以预订员确认为准。</span></div>{{/if}}\
                                        配送城市<strong>{{CityName}}</strong>\
                                    </div>\
                                    {{#if inCityAddress}}\
                                    <div class="usual_address_mod">\
                                      <ul class="usual_address_list" role="addressList" type="1">\
                                      {{#each inCityAddress}}\
                                        <li class="usual_address_item {{#unless @index}}usual_address_item_selected{{/unless}}">\
                                        <p class="name">{{CityName}}</p>\
                                        <p class="address">{{../../CityName}} {{CityName}} {{CantonName}} {{Address}}</p>\
                                        <p class="code">{{Post}}</p>\
                                        <i class="ico_checked"></i>\
                                        <a href="###" class="edit" role="adsedit" type="1" cantonID="{{CantonID}}" infoId="{{InfoId}}" data-Recipient="{{Recipient}}" data-CityName="{{CityName}}" data-CantonName="{{CantonName}}" data-Address="{{Address}}" data-Post="{{Post}}"><i></i>编辑</a>\
                                        <input cantonID="{{CantonID}}" {{#equal @index 0 "checked=checked" ""}}{{/equal}} index={{InfoId}} type="radio" value="{{InfoId}}" name="radio1" id="ps{{@index}}" style="display:none">\
                                        </li>\
                                      {{/each}}\
                                      </ul>\
                                      <div class="handle_area">{{#unless hideInCityAddress}}<a href="###" role="other"><i class="ico_more"></i>更多地址</a>{{/unless}}<a href="###" role="addads"><i class="ico_add"></i>新增地址</a></div>\
                                    </div>\
                                    {{/if}}\
                                    <div class="hide_options" style={{#if inCityAddress}}"display:none"{{else}}"display:block"{{/if}}>\
                                        <table>\
                                            <tbody><tr>\
                                                <th>配送地址</th>\
                                                <td><select name="" id="" role="getCanton">\
                                                {{#each CityCanton}}\
                                                <option value="{{Key}}">{{Value}}</option>\
                                                {{/each}}\
                                                </select><span class="area">区</span><input type="text" class="input_m" id="notice15" role="getAddrDetail"></td>\
                                            </tr>\
                                        </tbody></table>\
                                    </div>\
                                </div>\
                                {{/if}}\
                                {{#if zq}}\
                                <div class="delivery"  type="2"  style="display:none">\
                                    <b></b>\
                                    <div class="tit">\
                                        自取城市<strong>{{CityName}}</strong>\
                                    </div>\
                                    <ul class="select_address_list" role="addressList"  type="2">\
                                      {{#if selfPickupAddr}}\
                                      {{#each selfPickupAddr}}\
                                      <li {{#unless @index}}class="cur"{{/unless}}>{{this}}<i class="ico_checked"></i><input {{equal @index 0 "checked=checked" ""}} type="radio" value="{{this}}" name="radio2" id="self{{@index}}" style="display:none"></li>\
                                      {{/each}}\
                                      {{/if}}\
                                    </ul>\
                                </div>\
                                {{/if}}\
                                {{#if ems}}\
                                <div class="delivery"  type="3"  style="display:none">\
                                    <b></b>\
                                    <div class="tit">\
                                        <a href="###" onclick="window.open(\'http://www.ctrip.com/Supermarket/package/EMSNote.asp\',\'\',\'status=no,menubar=no,top=20,left=20,width=600,height=400,resizable=yes,scrollbars=no\')">EMS服务说明</a>\
                                        {{#if ems.DeliveryAmount}}<div class="postage"><span>邮递费</span><dfn>¥</dfn>{{ems.DeliveryAmount}}</div>{{/if}}\
                                        选择常用地址\
                                    </div>\
                                    {{#if emsAddress}}\
                                    <div class="usual_address_mod">\
                                      <ul class="usual_address_list" role="addressList" type="3">\
                                        {{#each emsAddress}}\
                                        <li class="usual_address_item {{#unless @index}}usual_address_item_selected{{/unless}}">\
                                          <p class="name">{{#if Recipient}}({{Recipient}} 收){{/if}}</p>\
                                          <p class="tel">{{#if Mobile}}{{Mobile}}{{else}}{{#if Tel}}{{Tel}}{{/if}}{{/if}}</p>\
                                          <p class="address">{{Address}}</p>\
                                          <p class="code">{{Post}}</p>\
                                          <i class="ico_checked"></i>\
                                          <a href="###" class="edit" role="adsedit" type="3" cantonID="{{CantonID}}" infoId="{{InfoId}}" data-Recipient="{{Recipient}}" data-tel="{{#if Mobile}}{{Mobile}}{{else}}{{#if Tel}}{{Tel}}{{/if}}{{/if}}" data-CityName="{{CityName}}" data-CantonName="{{CantonName}}" data-Address="{{Address}}" data-Post="{{Post}}"><i></i>编辑</a>\
                                          <input cantonID="{{CantonID}}" {{#equal @index 0 "checked=checked" ""}}{{/equal}} index={{InfoId}} type="radio" value="{{InfoId}}" name="radio3" id="ems{{@index}}" style="display:none">\
                                        </li>\
                                        {{/each}}\
                                      </ul>\
                                      <div class="handle_area">{{#unless hideEmsAddress}}<a href="###" role="other"><i class="ico_more"></i>更多地址</a>{{/unless}}<a href="###" role="addads"><i class="ico_add"></i>新增地址</a></div>\
                                    </div>\
                                    {{/if}}\
                                    <div class="hide_options" role="hideOptions" style={{#if emsAddress}}"display:none"{{else}}"display:block"{{/if}}>\
                                        <table>\
                                            <tbody><tr>\
                                                <th>收件人</th>\
                                                <td><input regex="checkRecipient" type="text" class="input_m cqsy"　_cqnotice="中文/英文" role="recipient"></td>\
                                            </tr>\
                                            <tr>\
                                                <th>联系电话</th>\
                                                <td><input type="text" regex="checkContactTel" class="input_m" role="contactTel"></td>\
                                            </tr>\
                                            <tr>\
                                                <th>邮寄地址</th>\
                                                <td id="cities" role="selectCity">\
                                                </td>\
                                            </tr>\
                                            <tr>\
                                                <th class="import"></th>\
                                                <td><input type="text" regex="checkDetail" class="input_m" role="detail"></td>\
                                            </tr>\
                                            <tr style="display:none;">\
                                                <th class="import"></th>\
                                                <td>\
                                                    <div class="help_block"><span class="ico"></span>请填写详细的收件地址后查询</div>\
                                                </td>\
                                            </tr>\
                                            <tr>\
                                                <th>邮政编码</th>\
                                                <td><input type="text" regex="checkPostage" style="width:120px;" class="mr5" role="postage"></td>\
                                            </tr>\
                                        </tbody></table>\
                                    </div>\
                                </div>\
                                {{/if}}\
                                {{#if sf}}\
                                <div class="delivery"  type="5"  style="display:none">\
                                    <b></b>\
                                    <div class="tit">\
                                        {{#if ems.DeliveryAmount}}<div class="postage"><span>邮递费</span><dfn>¥</dfn>{{ems.DeliveryAmount}}</div>{{/if}}\
                                        选择常用地址\
                                    </div>\
                                    {{#if emsAddress}}\
                                        <div class="usual_address_mod">\
                                            <ul class="usual_address_list" role="addressList" type="5">\
                                                {{#each emsAddress}}\
                                                <li class="usual_address_item {{#unless @index}}usual_address_item_selected{{/unless}}">\
                                                    <p class="name">{{#if Recipient}}({{Recipient}} 收){{/if}}</p>\
                                                    <p class="tel">{{#if Mobile}}{{Mobile}}{{else}}{{#if Tel}}{{Tel}}{{/if}}{{/if}}</p>\
                                                    <p class="address">{{Address}}</p>\
                                                    <p class="code">{{Post}}</p>\
                                                    <i class="ico_checked"></i>\
                                                    <a href="###" class="edit" role="adsedit" type="5" cantonID="{{CantonID}}" infoId="{{InfoId}}" data-Recipient="{{Recipient}}" data-tel="{{#if Mobile}}{{Mobile}}{{else}}{{#if Tel}}{{Tel}}{{/if}}{{/if}}" data-CityName="{{CityName}}" data-CantonName="{{CantonName}}" data-Address="{{Address}}" data-Post="{{Post}}"><i></i>编辑</a>\
                                                    <input cantonID="{{CantonID}}" {{#equal @index 0 "checked=checked" ""}}{{/equal}} index={{InfoId}} type="radio" value="{{InfoId}}" name="radio5" id="py{{@index}}" style="display:none">\
                                                </li>\
                                                {{/each}}\
                                            </ul>\
                                            <div class="handle_area">{{#unless hideEmsAddress}}<a href="###" role="other"><i class="ico_more"></i>更多地址</a>{{/unless}}<a href="###" role="addads"><i class="ico_add"></i>新增地址</a></div>\
                                        </div>\
                                    {{/if}}\
                                    <div class="hide_options" role="hideOptions" style={{#if emsAddress}}"display:none"{{else}}"display:block"{{/if}}>\
                                        <table>\
                                            <tbody><tr>\
                                                <th>收件人</th>\
                                                <td><input regex="checkRecipient" type="text" class="input_m cqsy"　_cqnotice="中文/英文" role="recipient"></td>\
                                            </tr>\
                                            <tr>\
                                                <th>联系电话</th>\
                                                <td><input type="text" regex="checkContactTel" class="input_m" role="contactTel"></td>\
                                            </tr>\
                                            <tr>\
                                                <th>邮寄地址</th>\
                                                <td id="cities_p" role="selectCity">\
                                                </td>\
                                            </tr>\
                                            <tr>\
                                                <th class="import"></th>\
                                                <td><input type="text" regex="checkDetail" class="input_m" role="detail"></td>\
                                            </tr>\
                                            <tr style="display:none;">\
                                                <th class="import"></th>\
                                                <td>\
                                                    <div class="help_block"><span class="ico"></span>请填写详细的收件地址后查询</div>\
                                                </td>\
                                            </tr>\
                                            <tr>\
                                                <th>邮政编码</th>\
                                                <td><input type="text" regex="checkPostage" style="width:120px;" class="mr5" role="postage"></td>\
                                            </tr>\
                                        </tbody></table>\
                                    </div>\
                                </div>\
                                {{/if}}\
                            </div>\
                        </div>',
            allAdress: '<div class="mask_popup" style="width:590px;display:none;" id="mask_popup">\
                            <h3>选择您的常用地址</h3>\
                            <ul>\
                            {{#each obj}}\
                                <li><label for="alladr{{@index}}"><input index="{{InfoId}}" type="radio" value="radio" name="{{../radioName}}" id="alladr{{@index}}"> {{CityName}}  {{CantonName}} {{Address}} {{Post}} {{#if Recipient}}({{Recipient}} 收){{/if}} {{#if Mobile}}{{Mobile}}{{else}}{{#if Tel}}{{Tel}}{{/if}}{{/if}}</label></li>\
                            {{/each}}\
                            </ul>\
                            <div class="btn">\
                                <a href="###" role="confirm" class="btn_blue_small">确认</a>\
                                <a href="###" role="close">取消</a>\
                            </div>\
                            <a href="###" role="close" class="btn_shut_popup">×</a>\
                        </div>',
            inCityAddress: '<div class="mask_popup" style="width:590px;display:none;" id="mask_popup">\
                            <h3>选择您的常用地址</h3>\
                            <ul>\
                            {{#each obj}}\
                                <li><label for="alladr{{@index}}"><input index="{{InfoId}}" cantonID={{CantonID}} type="radio" value="radio" name="{{../radioName}}" id="alladr{{@index}}"> {{CityName}} {{CantonName}} {{Address}} {{Post}} </label></li>\
                            {{/each}}\
                            </ul>\
                            <div class="btn">\
                                <a href="###" role="confirm" class="btn_blue_small">确认</a>\
                                <a href="###" role="close">取消</a>\
                            </div>\
                            <a href="###" role="close" class="btn_shut_popup">×</a>\
                        </div>',
            editAllAddress: '<div class="mask_popup" style="width:590px;display:none;" id="mask_popup">\
                                <h3>填写新地址</h3>\
                                <table class="popup_book_table">\
                                    <tbody><tr>\
                                        <th>收件人</th>\
                                        <td><input regex="checkRecipient" type="text" class="input_m cqsy" value="{{recipient}}"　_cqnotice="中文/英文" role="recipient"></td>\
                                    </tr>\
                                    <tr>\
                                        <th>联系电话</th>\
                                        <td><input type="text" regex="checkContactTel" class="input_m" value="{{tel}}" role="contactTel"></td>\
                                    </tr>\
                                    <tr>\
                                        <th>邮寄地址</th>\
                                        <td id="cities" role="selectCity">\
                                        </td>\
                                    </tr>\
                                    <tr>\
                                        <th class="import"></th>\
                                        <td><input type="text" regex="checkDetail" class="input_m" role="detail" value="{{address}}"></td>\
                                    </tr>\
                                    <tr style="display:none;">\
                                        <th class="import"></th>\
                                        <td>\
                                            <div class="help_block"><span class="ico"></span>请填写详细的收件地址后查询</div>\
                                        </td>\
                                    </tr>\
                                    <tr>\
                                        <th>邮政编码</th>\
                                        <td><input type="text" regex="checkPostage" style="width:120px;" class="mr5" value="{{code}}" role="postage"></td>\
                                    </tr>\
                                </tbody></table>\
                                <div class="btn">\
                                    <a href="###" role="saveaddress" class="btn_blue_small">确认</a>\
                                    <a href="###" role="close">取消</a>\
                                </div>\
                                <a href="###" role="close" class="btn_shut_popup">×</a>\
                            </div>',
            editInCityAddress: '<div class="mask_popup" style="width:590px;display:none;" id="mask_popup" type="1">\
                                    <h3>填写新地址</h3>\
                                    <table class="popup_book_table">\
                                        <tbody><tr>\
                                            <th>配送地址</th>\
                                            <td><select name="" id="J_popcanton" role="getCanton">\
                                            {{#each CityCanton}}\
                                            <option value="{{Key}}">{{Value}}</option>\
                                            {{/each}}\
                                            </select><span class="area"> </span><input type="text" class="input_m" id="notice15" role="getAddrDetail" value="{{address}}"></td>\
                                        </tr>\
                                    </tbody></table>\
                                    <div class="btn">\
                                        <a href="###" role="saveaddress" class="btn_blue_small">确认</a>\
                                        <a href="###" role="close">取消</a>\
                                    </div>\
                                    <a href="###" role="close" class="btn_shut_popup">×</a>\
                                </div>',
            tempSave: '<div class="book_masking" id="tempSaveMask">\
                        <h2><a href="###" alt="" role="close"></a>暂存订单</h2>\
                        <div class="book_masking_padding">\
                            <div class="book_masking_content">\
                                <i class="icon_yes"></i>\
                                <h3>您的订单已成功暂存。暂存订单号为：{{OrderId}}</h3>\
                                <div>如需完成预订，请于72小时内至“{{{Url}}}”，对此订单号进行“继续预订”操作。<br>暂存后超过72小时的订单将自动删除。<br>注意：由于暂存订单不会保留航班、酒店等资源，价格也可能发生变化，请尽快提交，完成预订</div>\
                                <div class="masking_order_btn"><a href="###" class="btn_blue_middle" role="confirm">确定</a></div>\
                            </div>\
                        </div>\
                    </div>',
            ivoiceSug: '<div class="person_bill">\
                        <p>常用发票抬头</p>\
                        {{#each list}}\
                        <div><a href="###">{{Value}}</a></div>\
                        {{/each}}\
                    </div>'
        },
        common: { //公用的函数
            parseJSON: function (str) {
                return (new Function("", "return " + str))()
                // return eval('(' + str + ')');
            },
            getRoles: function (el, val, fld) { //获取dom
                var ret, val, fld;
                el = el || 'body';
                fld = fld || 'role';
                val = val ? ('=' + val) : '';
                ret = {};
                (el.jquery ? el : $(el)).find("[" + fld + val + "]").each(function () {
                    var key = this.getAttribute(fld);
                    var obj = ret[key] || (ret[key] = $());
                    obj.push(this);
                });
                return ret;
            },
            parseCNId: function (str) { //根据身份证返回出生日期
                var sex, age;
                if (str.length == 15) {
                    sex = parseInt(str.charAt(14), 10) % 2 ? 'M' : 'F';
                    age = str.replace(/^\d{6}(\d{2})(\d{2})(\d{2}).+$/, "19$1-$2-$3");
                } else {
                    sex = parseInt(str.charAt(16), 10) % 2 ? 'M' : 'F';
                    age = str.replace(/^\d{6}(\d{4})(\d{2})(\d{2}).+$/, "$1-$2-$3");
                }
                return {
                    passengerSex: sex,
                    passengerBirth: age,
                    passengerNationality: '中国大陆'
                };
            },
            isDate: function (str) {
                if (!str) return false;
                var ret = str.match(/^(\d{4})-([01]?\d)-([0123]?\d)$/);
                if (ret) {
                    var d = new Date(parseInt(ret[1], 10), parseInt(ret[2], 10) - 1, parseInt(ret[3], 10));
                    if ([d.getFullYear(), d.getMonth() + 1, d.getDate()].join('-') == str.replace(/-0/g, '-'))
                        return true;
                }
                return false;
            }
        },

        /**
        * 根据参数返回input的jquery对象
        * @param  {String} str     input上的参数值
        * @return {cQuery Obj}     [description]
        */
        _getInput: function (str) {
            var obj;
            $.each($('#linkManID input'), function (index, item) {
                if ($(item).attr('role') === str) {
                    obj = cQuery(item);
                }
            });
            return obj;
        },

        /**
        * 简单模式表单验证
        * @return {Boolean} 表单验证是否通过
        */
        _simpleFormCheck: function () {

            var self = this,
                nickName = self._getInput('ctname').value(),
                nickMobile = self._getInput('ctmphone').value(),
                nickTel = self._getInput('cttphone').value(),
                nickEmail = self._getInput('ctemail').value(),
                nickNameCheck = this.Contacter().checkName(nickName),
                nickMobileCheck = this.Contacter().checkMobile(nickMobile);
            nickEmailCheck = this.Contacter().checkEmail(nickEmail);

            // 检查名字
            if (!nickNameCheck[0]) {
                new self.validate({
                    target: self._getInput('ctname'),
                    data: nickNameCheck[1],
                    errorClass: 'f_error'
                }).show();
                // $(window).scrollTop(300);
                location.hash = "productID";
                return false;
            };

            //检查手机
            if (!nickMobileCheck[0]) {
                new self.validate({
                    target: self._getInput('ctmphone'),
                    data: nickMobileCheck[1],
                    errorClass: 'f_error'
                }).show();
                location.hash = "productID";
                return false;
            }

            //检查email
            if (!nickEmailCheck[0]) {
                new self.validate({
                    target: self._getInput('ctemail'),
                    data: nickEmailCheck[1],
                    errorClass: 'f_error'
                }).show();
                location.hash = "productID";
                return false;
            }

            return true;
        },

        events: { //绑定事件
            regNotice: function () {
                var cq = cQuery;
                cq.mod.load('notice', '1.0', function () {
                    ["#notice1", "#notice2", "#notice3", "#notice4"].each(function (o) {
                        if (!cq(o).length) {
                            return true;
                        }
                        cq(o).regMod('notice', '1.0', {
                            name: o,
                            tips: cq(o).attr('_cqnotice'),
                            selClass: 'inputSel'
                        }, true);
                    });
                    cq('.cq').each(function (o) {
                        cq(o).regMod('notice', '1.0', {
                            name: o,
                            tips: o.attr('_cqnotice'),
                            selClass: 'inputSel'
                        }, true);
                    });
                });
            },
            regJmp: function () {
                cQuery.mod.load('jmp', '1.0', function () {
                    var ins = cQuery(document).regMod('jmp', '1.0', {
                        cc: 2
                    });
                })
            },
            submit: function () { //提交
                var self = this;
                var vdata = self.data;
                var mod = vdata.modules;
                var text = vdata.roles.submitID.html();
                /*添加可预订检查代码*/
                var bookingTelement = '<div class="book_masking" id="js_book_masking" style="display:none">\
                                                  <h2><a href="###" alt="" id="js_book_masking_close"></a>资源信息提示</h2>\
                                                    <div class="book_masking_padding">\
                                                        <div class="book_masking_content">\
                                                            <i class="icon_no"></i>\
                                                            <h3>{{#if data}}{{data}}{{/if}}</h3>\
                                                            <div class="masking_order_btn">\
                                                            {{#if steamer}}\
                                                              <a href="javascript:void(0)" class="btn_blue_middle" id="js_book_masking_again" style="width:100px">继续预订</a>\
                                                            {{/if}}\
                                                            {{#if type}}\
                                                            <a href="javascript:void(0)" class="btn_blue_middle" id="js_book_masking_sure" style="{{#is type "===" "revert"}}width:100px;{{/is}}">\
                                                              {{#is type "===" "revert"}}重新选择资源{{/is}}\
                                                              {{#is type "===" "retry"}}重试{{/is}}\
                                                              {{#is type "===" "sure"}}确定{{/is}}\
                                                             </a>\
                                                            {{/if}}\
                                                             {{#if other}}\
                                                              <a href="javascript:void(0)" class="btn_cancel" id="js_book_masking_sure" style="font-size:14px;margin-left:24px;">看看其他房型</a>\
                                                            {{/if}}\
                                                          </div>\
                                                        </div>\
                                                    </div>\
                                                </div>',
                    bookingJsonData = {},
                    bookingDataString = "",
                    bookingHandleData = [],
                    customerInfo = [],
                   closeBooKMasking = function (pData, pMe) {
                       $("body").append(Handlebars.compile(bookingTelement)(pData));
                       cQuery("#js_book_masking").mask();
                       $("#js_book_masking").css("top", ($(window).height() - $("#js_book_masking").height()) / 2 + $(window).scrollTop() + "px");
                       /*关闭提示层*/
                       $("#js_book_masking_close").bind("click", function () {
                           clearData();
                           cQuery("#js_book_masking").unmask();
                           $("#js_book_masking").remove();
                           $(pMe).bind('click', submitFn).html(text);
                       })
                   },
                    closeBookSure = function (pType, pMe, pData, pAgain) {
                        $("#js_book_masking_sure").bind("click", function () {
                            clearData();
                            cQuery("#js_book_masking").unmask();
                            $("#js_book_masking").remove();
                            if (pType) {
                                /*重试*/
                                if (pAgain) {
                                    $(pMe).bind('click', submitFn).html(text);
                                    $(pMe).trigger("click", submitFn);
                                }
                                else {
                                    $(pMe).bind('click', submitFn).html(text);
                                }
                            }
                            else {
                                vdata.roles.submitID.unbind('click');
                                window.location.href = $("#js_prev_stop").attr("href");
                            }
                        })
                    },
                /*邮轮重试*/
                    closeBookAgain = function (pData, pMe) {
                        $("#js_book_masking_again").bind("click", function () {
                            clearData();
                            cQuery("#js_book_masking").unmask();
                            cQuery("#js_book_masking").remove();
                            bookAjax(pData, pMe);
                        });
                    },
                     bookingError = function (pType, pMe, pData, pAgain) {
                         bookingJsonData.data = "系统调整中，请重试。";
                         bookingJsonData.type = "retry";
                         closeBooKMasking(bookingJsonData, pMe);
                         closeBookSure(!0, pMe, pData, pAgain);
                     },
                /*邮轮 游客性别*/
                    showGender = function (pGender) {
                        if (pGender == 0) return "M";  /*男*/
                        if (pGender == 1) return "F";  /*女*/
                        if (pGender == -1) return "N"; /*不确定*/
                    },
                /*关闭层时清除数据*/
                    clearData = function () {
                        for (var i in bookingJsonData) {
                            bookingJsonData[i] = "";
                        }
                    },
                    bookAjax = function (pData, pMe) {
                        /*新增checkbox 如果勾选了 支付接口传人UseCorpPay=T,如果不勾选 支付接口传人 UseCorpPay=F 如果没有这个input则不传*/
                        if ($("#UseCorpPay").length) {
                            if ($("#UseCorpPay").is(":checked")) {
                                pData += "&UseCorpPay=T";
                            }
                            else {
                                pData += "&UseCorpPay=F";
                            }
                        }
                        $.ajax({
                            url: vdata.handles.bookingInfo,
                            type: 'POST',
                            /*新增加一个参数 isSkipFAVCheck = true 这个时候就不再做一次机票反查*/
                            data: pData,
                            timeout: 120000,
                            success: function (data) {
                                self.status.isPay = true;
                                data = typeof data === 'string' ? self.common.parseJSON(data) : data;
                                if (data.errno === 0) {
                                    if (vdata.handles.Pay.length > 0) {
                                        location.href = vdata.handles.Pay;
                                    } else {
                                        $(data.data).appendTo('body').submit();
                                    }
                                } else {
                                    bookingJsonData.data = data.errmsg;
                                    bookingJsonData.type = "sure";
                                    closeBooKMasking(bookingJsonData, pMe);
                                    closeBookSure(!0, pMe, pData);
                                }
                            },
                            error: function () {
                                bookingError(!0, pMe, pData, !0);
                            }
                        });
                    };
                /*添加可预订检查代码 end*/
                var submitFn = function (event) {
                    var me = this;
                    event.preventDefault();

                    $('#linkManID a.revise').click();
                    if (!self._simpleFormCheck()) {
                        return false
                    }


                    // TODO 验证稍后提供


                    if (!vdata.isLogin) {
                        loadCheckLogin && loadCheckLogin();
                        return;
                    }
                    self.status.errorElem = null;
                    self.removeValidate();
                    $.each('Travellers|Contacter|Invoice|Delivery'.split('|'), function (k, v) {
                        mod[v].verify();
                        // if(!mod[v].verify()) return false;//去掉
                    });
                    mod.Extras.save.call(mod.Extras);
                    if ($('#agreeContract').length && !$('#agreeContract').prop('checked')) {
                        if (!self.status.errorElem) {
                            self.status.errorElem = $('#agreeContract')[0];
                            alert('请仔细阅读预订须知和重要条款，并在“我接受”一栏打勾，才能接受你的预订请求！');
                        }
                    }
                    self.formData.IsTmpOrder = 0;
                    self.formData.ProposalOrderType = IsTmporaryOrder ? 2 : 1;
                    if (self.status.errorElem) {
                        $(document).scrollTop($(self.status.errorElem).offset().top - 20);
                        return false;
                    } else {
                        $(me).html('请稍候…');
                        vdata.roles.submitID.unbind('click');
                        var passengerInfos = self.formData.PassengerInfos,
                            passengerInfosLen = passengerInfos.length,
                            bookParameter = "bookinginfo=" + cQuery.stringifyJSON(self.formData);
                        /*新增邮轮参数*/
                        for (var k = 0; k < passengerInfosLen; k++) {
                            customerInfo[k] = {
                                Nationality: passengerInfos[k].Nationality,
                                Birthday: passengerInfos[k].Birthday,
                                Gender: showGender(passengerInfos[k].Gender),
                                HomePlace: passengerInfos[k].HomePlace,
                                // NameCN: passengerInfos[k].CnName,
                                // 对中文进行escape编码防止乱码
                                NameCN: escape(passengerInfos[k].CnName),
                                FirstNameEN: passengerInfos[k].EnName.First,
                                MiddleNameEN: passengerInfos[k].EnName.Mid,
                                LastNameEN: passengerInfos[k].EnName.Last
                            }
                        }
                        $.ajax({
                            url: vdata.handles.bookingCheck,
                            data: "TmpOrderID=" + GV.app.order.vars.initData.orderid + "&productID=" + GV.app.order.vars.initData.productID + "&customerInfo=" + cQuery.stringifyJSON(customerInfo) + "&OrderType=" + GV.app.order.vars.initData.OrderType,
                            timeout: 120000,
                            type: "POST",
                            success: function (json) {
                                var jsonData = $.parseJSON(json);
                                /*根据接口的返回碰到是否传人isSkipFAVCheck*/
                                if (jsonData.isSkipFAVCheck) bookParameter += "&isSkipFAVCheck=" + jsonData.isSkipFAVCheck;
                                if (jsonData.CruiseItem && jsonData.CruiseItem.BookingID != null) bookParameter += "&BookingID=" + jsonData.CruiseItem.BookingID;
                                if (jsonData.data && jsonData.data.length > 0) {
                                    self.status.isPay = true;
                                    self.events.save.call(self, !0, self.formData.TempOrderType != 0)();
                                    if (!jsonData.CruiseItem) {
                                        /*非邮轮*/
                                        for (var i = 0, len = jsonData.data.length; i < len; i++) {
                                            if (jsonData.data[i] instanceof Array) {
                                                for (var n = 0, handleNum = jsonData.data[i].length; n < handleNum; n++) {
                                                    bookingHandleData.push(jsonData.data[i][n]);
                                                }
                                            } else {
                                                bookingHandleData.push(jsonData.data[i]);
                                            }
                                        }
                                        for (var j = 0, lens = bookingHandleData.length; j < lens; j++) {
                                            /*航班信息*/
                                            if (bookingHandleData[j].Type == 302) {
                                                var flightName = bookingHandleData[j].ResourceName.split("|");
                                                for (var k = 0, flightLen = flightName.length - 1; k < flightLen; k++) {
                                                    bookingDataString += "【航班" + flightName[k] + "】、";
                                                }
                                            }
                                                /*酒店信息*/
                                            else if (bookingHandleData[j].Type == 202) {
                                                bookingDataString += "【" + bookingHandleData[j].ResourceName.replace("|", "  ") + "】、";
                                            }
                                                /*可选项信息*/
                                            else if (bookingHandleData[j].Type == 402) {
                                                bookingDataString += "【" + bookingHandleData[j].ResourceName + "】、";
                                            }
                                                /*新增类型*/
                                            else if (bookingHandleData[j].Type == 101 || bookingHandleData[j].Type == 201 || bookingHandleData[j].Type == 301 || bookingHandleData[j].Type == 401 || bookingHandleData[j].Type == 102) {
                                                bookingDataString += "【" + bookingHandleData[j].ResourceName + "】、";
                                            }
                                        }
                                        bookingJsonData.data = "您所选的" + bookingDataString.slice(0, bookingDataString.length - 1) + "已订完，请重新选择！";
                                        bookingJsonData.type = "revert";
                                        closeBooKMasking(bookingJsonData, me);
                                        closeBookSure();
                                        bookingDataString = "";
                                        bookingHandleData = [];
                                    }
                                    else {
                                        /*邮轮*/
                                        for (var j = 0, lens = jsonData.data.length; j < lens; j++) {
                                            if (jsonData.data[j].Type == 501) {
                                                bookingDataString += jsonData.data[j].ResourceName.split("邮轮可订检查失败:")[1];
                                                bookingJsonData.type = "revert";      /*重新选择资源*/
                                            }
                                            else if (jsonData.data[j].Type == 502) {
                                                bookingDataString += jsonData.data[j].ResourceName.split("邮轮可订检查失败:")[1];
                                                if (jsonData.CruiseItem.BookingID > 0) {
                                                    bookingJsonData.other = "other";      /*查看其他房型*/
                                                    bookingJsonData.steamer = "steamer";  /*继续预订*/
                                                }
                                                else {
                                                    bookingJsonData.type = "revert";
                                                }

                                            }
                                        }
                                        bookingJsonData.data = bookingDataString;
                                        closeBooKMasking(bookingJsonData, me);
                                        closeBookAgain(bookParameter, me);
                                        closeBookSure();
                                        bookingDataString = "";
                                    }
                                }
                                else {
                                    /*如果是邮轮还要判断errno 如果不能0 则不能领取*/
                                    if (GV.app.order.vars.initData.OrderType.indexOf("CruiseOrder") != -1) {
                                        var tipsStr = "信息填写有误，请重新核对，如仍无法提交请拨打电话10106666，由专属客服为您解决。"
                                        if (jsonData.errno != 0) {
                                            if (jsonData.CruiseItem && jsonData.CruiseItem.FailPocessPoint) {
                                                var failPocessPointStr = jsonData.CruiseItem.FailPocessPoint.split("邮轮可订检查失败:")[1];
                                                if (failPocessPointStr) {
                                                    bookingJsonData.data = failPocessPointStr;
                                                }
                                                else {
                                                    bookingJsonData.data = tipsStr;
                                                }
                                            }
                                            else {
                                                bookingJsonData.data = tipsStr;
                                            }
                                            bookingJsonData.type = "revert";
                                            closeBooKMasking(bookingJsonData, me);
                                            closeBookSure();
                                        }
                                        else {
                                            bookAjax(bookParameter, me);
                                        }
                                    }
                                        /*不是邮轮的直接预订*/
                                    else {
                                        bookAjax(bookParameter, me);
                                    }
                                }
                            },
                            error: function () {
                                bookAjax(bookParameter, me);
                            }
                        })
                    }
                }
                vdata.roles.submitID.bind('click', submitFn);
            },
            save: function (isShow, isAuto) {
                var self = this;
                var me = this;
                var mod = this.data.modules;
                var text;
                var vdata = self.data;
                var submitFn = function (el, event) {
                    $.map('Travellers|Contacter|Extras|Delivery|Invoice'.split('|'), function (v, k) {
                        mod[v].save();
                    });
                    self.formData.IsTmpOrder = 1;
                    self.formData.TempOrderType = isAuto ? 1 : 0;
                    self.formData.ProposalOrderType = 1;
                    //if (!isAuto) {
                    //self.formData.IsTmpOrder = 1;
                    //self.formData.TempOrderType = 0;
                    //}
                    if (el) {
                        if (!$(el).data('txt')) {
                            $(el).data('txt', 1);
                            text = $(el).html();
                        }
                        $(el).html('请稍候…');
                        $(el).unbind('click');
                    }
                    $.ajax({
                        url: vdata.handles.bookingInfo,
                        type: 'POST',
                        // data: 'bookinginfo=' + cQuery.stringifyJSON(self.formData),
                        data: {
                            bookinginfo: cQuery.stringifyJSON(self.formData)
                        },
                        timeout: 10000,
                        success: function (data) {
                            if (isShow) return;
                            data = typeof data === 'string' ? self.common.parseJSON(data) : data;
                            if (data.errno === 0) {
                                self.render(self.tpl.tempSave, data.data, function (dom) {
                                    $('body').append(dom);
                                    cQuery('#tempSaveMask').mask();
                                    $('#tempSaveMask').on('click', 'a[role="close"],a[role="confirm"]', function (event) {
                                        event.preventDefault();
                                        cQuery('#tempSaveMask').unmask();
                                        $('#tempSaveMask').remove();
                                        $(el).bind('click', function (event) {
                                            submitFn(this, event);
                                        }).html(text);
                                    })
                                });
                                self.status.isTmpSave = true;
                            }
                            if (data.errno === 1) {
                                alert(data.errmsg);
                                $(el).bind('click', function (event) {
                                    submitFn(this, event);
                                }).html(text);
                            }
                        },
                        error: function () {
                            if (isShow) return;
                            alert('网络超时，请重新提交');
                            $(el).bind('click', function (event) {
                                submitFn(this, event);
                            }).html(text);
                        }
                    });
                };
                $('a[role="save"]').bind('click', function (event) {
                    event.preventDefault();
                    if (!vdata.isLogin) {
                        loadCheckLogin && loadCheckLogin();
                        return;
                    }
                    vdata.EnableTemporarySave && submitFn(this, event);
                });
                return submitFn;
            },
            autoSave: function () {
                var clientSource = GV.app.order.vars.initData.ClientSource;
                if (clientSource && clientSource == "Online") {
                    var self = this;
                    var mod = this.data.modules;
                    var vdata = self.data;
                    if (!vdata.isLogin || !vdata.EnableAutoTemporarySave || vdata.isQuickLogin) return;
                    window.onbeforeunload = function (event) {
                        $(document).click(function (e) {
                            return false;
                        });
                        if (!self.status.isTmpSave && self.data.roles.travellersID.children('[filled="t"]').length && !self.status.isPay) {
                            $.map('Travellers|Contacter|Extras|Delivery|Invoice'.split('|'), function (v, k) {
                                mod[v].save();
                            });
                            self.formData.IsTmpOrder = 1;
                            self.formData.TempOrderType = 1;
                            self.formData.ProposalOrderType = 1;
                            $.ajax({
                                url: vdata.handles.bookingInfo,
                                type: 'POST',
                                async: true,
                                // data: 'bookinginfo=' + cQuery.stringifyJSON(self.formData),
                                data: {
                                    bookinginfo: cQuery.stringifyJSON(self.formData)
                                },
                                timeout: 15000,
                                success: function (data) { }
                            });
                            if (cQuery.browser.isFirefox) {
                                if (confirm('您的预订还未完成，我们会将您的订单暂存72小时，期间产品的价格库存可能会发生变化，请尽快至“我的携程-旅游度假订单”中完成预订。确定要离开本页吗？')) {
                                    history.go();
                                } else {
                                    window.setTimeout(function () {
                                        window.stop();
                                    }, 1);
                                }
                            } else {
                                return '您的预订还未完成，我们会将您的订单暂存72小时，期间产品的价格库存可能会发生变化，请尽快至“我的携程-旅游度假订单”中完成预订。';
                            }
                        }
                    };
                }
            }
        },
        regNational: function (el) {
            var self = this;
            return cQuery(el).regMod('address', '1.0', {
                jsonpSource: 'http://webresource.c-ctrip.com/code/cquery/resource/address/flightintl/nationality_' + cQuery.config("charset") + '.js',
                name: '.nationality',
                isFocusNext: true,
                template: {
                    filterInit: function (c) {
                        var d = c.find('a[data]');
                        if (d.length) {
                            d.attr('href', '###');
                            self.data.dfNational = d.first().attr('data'); //记录默认的国籍
                        }
                        d.bind('click', function (event) {
                            event.preventDefault();
                        })
                    },
                    isSuggestionSelect: true,
                    suggestionInit: function (c) {
                        var me = this;
                        var d = c.find('a[data]');
                        var selectedItem = d.first().addClass('hover');
                        var selectContent = function (s) {
                            var items = d,
                                newSelectedItem;
                            if (!selectedItem) {
                                newSelectedItem = items[s == 'down' ? 0 : items.length - 1];
                            } else {
                                newSelectedItem = items[items.indexOf(selectedItem) + (s == 'down' ? 1 : -1)];
                                $(selectedItem).removeClass('hover');
                                if (!newSelectedItem) {
                                    if (s == 'down')
                                        newSelectedItem = items[0];
                                    else
                                        newSelectedItem = items[items.length - 1];
                                }
                            }
                            if (newSelectedItem) {
                                $(newSelectedItem).addClass('hover');
                                selectedItem = newSelectedItem;
                            } else {
                                selectedItem = undefined;
                            }
                        };
                        var fn = function (event) {
                            var b = event.target,
                                key = event.which,
                                s, val;
                            if (key === 13) {
                                s = d.filter('[class="hover"]');
                                if (s) {
                                    self.data.dfNational = s.attr('data');
                                    val = self.data.dfNational.split('|');
                                    $(el).val(val[1]).attr('mod_value', val[2]).blur();
                                }
                            }
                            if (key === 40) {
                                selectContent('down');
                            }
                            if (key === 38) {
                                selectContent('up');
                            }
                        };
                        var initSuggest = function () {
                            d.removeClass('hover');
                            selectedItem = d.first().addClass('hover');
                        };
                        if (d.length) {
                            self.data.dfNational = d.filter('[class="hover"]').attr('data'); //记录默认的国籍
                        }
                        d.bind('mouseover', function () {
                            $(this).addClass('hover')
                        }).bind('mouseout', function () {
                            $(this).removeClass('hover')
                        });
                        $(el).bind('blur', function () {
                            $(c).hide();
                        }).bind('focus', function () {
                            $(c).show();
                            initSuggest();
                        }).bind('keyup', fn);
                    },
                    filterStyle: '.c_address_hd { height: 24px; border-color: #2C7ECF; border-style: solid; border-width: 1px 1px 0; background-color: #67A1E2; color: #fff; line-height: 24px; padding-left: 10px; }\
                        .c_address_bd { border-color: #999999; border-style: solid; border-width: 0 1px 1px; overflow: hidden; padding:10px; }\
                        .c_address_select { width:276px; height:355px; font-family: Arial, Simsun; font-size: 12px; }\
                        .c_address_wrap { width: 276px; height:349px; min-height: 305px; margin: 0; padding: 0 0 4px; border: 1px solid #969696; background:#fff; text-align: left; }\
                        .c_address_hd { margin:-1px; }\
                        .c_address_list { margin: 0; padding: 0; height:300px; }\
                        .c_address_list label { border-bottom: 1px solid #FFFFFF; border-top: 1px solid #FFFFFF; display: block; height: 22px; line-height: 22px; min-height: 22px; overflow: hidden; padding: 1px 9px 0; text-align: center; }\
                        .c_address_list span { float: right; font: 10px/22px verdana; margin: 0; overflow: hidden; padding: 0; text-align: right; white-space: nowrap; width: 110px; }\
                        .c_address_list a { border-bottom: 1px solid #FFFFFF; border-top: 1px solid #FFFFFF; color: #0055AA; cursor: pointer; display: block; height: 22px; line-height: 22px; min-height: 22px; overflow: hidden; padding: 1px 9px 0; text-align: left; text-decoration: none; }\
                        .c_address_list a.hover { background: none repeat scroll 0 0 #E8F4FF; border-bottom: 1px solid #7F9DB9; border-top: 1px solid #7F9DB9; }\
                        .address_selected { background: none repeat scroll 0 0 #FFE6A6; color: #FFFFFF; height: 22px; }\
                        .c_address_pagebreak { line-height: 25px; margin: 0; padding: 0; text-align: center; }\
                        .c_address_pagebreak a { color: #0055AA; display: inline-block; font-family: Arial, Simsun, sans-serif; font-size: 14px; margin: 0; padding: 0 4px; text-align: center; text-decoration: underline; width: 15px; }\
                        a.address_current { color: #000; text-decoration: none; }',
                    suggestion: '<div class="c_address_select"><div class="c_address_wrap"><div class="c_address_hd">' + '输入中英文|代码搜索或↑↓选择.' + '</div><div style="" class="c_address_list">{{enum(key,arr) data}}{{each arr}}<a href="###" title="${display}" data="${data}"><span>${rightDisplay}</span>${display}</a>{{/each}}{{/enum}}</div></div></div>',
                    suggestionStyle: '.c_address_select { width:276px; height:355px; font-family: Arial, Simsun; font-size: 12px; }.c_address_hd { height: 24px; border-color: #2C7ECF; border-style: solid; border-width: 1px 1px 0; background-color: #67A1E2; color: #fff; line-height: 24px; text-align:center }.c_address_bd { border-color: #999999; border-style: solid; border-width: 0 1px 1px; overflow: hidden; padding:10px; }.c_address_select { width:222px; height:300px; font-family: Arial, Simsun; font-size: 12px; }.c_address_wrap { width: 276px; height:310px; min-height: 305px; margin: 0; padding: 0 0 4px; border: 1px solid #969696; background:#fff; text-align: left; } .c_address_hd { margin:-1px; }.c_address_list { margin: 0; padding: 0; height:300px; }.c_address_list span { float: right; font: 10px/22px verdana; margin: 0; overflow: hidden; padding: 0; text-align: right; white-space: nowrap; width: 110px; }.c_address_list a { border-bottom: 1px solid #FFFFFF; border-top: 1px solid #FFFFFF; color: #0055AA; cursor: pointer; display: block; height: 22px; line-height: 22px; min-height: 22px; overflow: hidden; padding: 1px 9px 0; text-align: left; text-decoration: none; }.c_address_list a.hover,.c_address_list a:hover { background: none repeat scroll 0 0 #E8F4FF; border-bottom: 1px solid #7F9DB9; border-top: 1px solid #7F9DB9; }.address_selected { background: none repeat scroll 0 0 #FFE6A6; color: #FFFFFF; height: 22px; }.c_address_pagebreak { line-height: 25px; margin: 0; padding: 0; text-align: center; }.c_address_pagebreak a { color: #0055AA; display: inline-block; font-family: Arial, Simsun, sans-serif; font-size: 14px; margin: 0; padding: 0 4px; text-align: center; text-decoration: underline; width: 15px; }a.address_current { color: #000; text-decoration: none; }.c_address_select .ico_key, .c_address_select .ico_unkey{position: absolute;top: 1px;left: 1px;width: 34px;height: 24px;overflow: hidden;line-height: 999em;font-size: 0;content: "";background: url(http://pic.c-ctrip.com/ctripOnPad/ico_key.png) no-repeat 0 0;-webkit-transform: scale(.7);}.c_address_select .address_close {position: absolute;top: 3px;right: 4px;width: 18px;height: 19px;overflow: hidden;line-height: 999em;font-size: 0;content: "";text-indent: 99em;background: url(http://pic.c-ctrip.com/ctripOnPad/pad_address_icon.png) no-repeat -32px 0;-webkit-transform: scale(0.5);}.c_address_select .ico_unkey {background: url(http://pic.c-ctrip.com/ctripOnPad/ico_unkey.png) no-repeat 0 0;}'
					, suggestionIpad: '\t\t\t\t<div class="city_select_lhsl">\t\t\t\t\t<p class="title"><a class="close CQ_suggestionClose" href="javascript:;">&times;</a></p><ul class="CQ_suggestionTabContainer">\t\t\t\t\t\t{{enum(key) $data.data}}\t\t\t\t\t\t\t<li class="CQ_suggestionTab"><span>${key}</span></li>\t\t\t\t\t\t{{/enum}}\t\t\t\t\t</ul>\t\t\t\t\t{{enum(key,arr) $data.data}}\t\t\t\t\t\t<div class="city_item CQ_suggestionPanel">\t\t\t\t\t\t\t{{each(i,item) arr}}\t\t\t\t\t\t\t\t<a data="${item.data}" href="javascript:void(0);">${item.display}</a>\t\t\t\t\t\t\t{{/each}}\t\t\t\t\t\t</div>\t\t\t\t\t{{/enum}}\t\t\t\t</div>\t\t\t'

                }
            });
        },
        removeValidate: function () { //除去验证提示
            var self = this;
            var _ref = self.insStatistics;
            if (!_ref) return;
            $.map(_ref, function (v, k) {
                v.hide();
            });
            $('input[role="cardValidUntilY"],input[role="cardValidUntilM"],input[role="birthdayY"],input[role="birthdayM"]', '#travellersID').removeClass('f_error');
        },
        //添加模版助手，以便模版内部能够直接将人数相加
        handlerHelp: function () {
            Handlebars.registerHelper('plus', function () {
                var args = Array.prototype.slice.call(arguments);
                var options = args.pop();
                var num = 0;
                for (var key in args) {
                    var value = parseInt(args[key]);
                    if (!isNaN(value)) {
                        num += value;
                    }
                }
                return num;
            });
            /*Handlebars.registerHelper('division', function (a,b,options) {
				var args = Array.prototype.slice.call(arguments);
				var options = args.pop();
				var num = 0;
				return Math.floor(parseInt(a)/parseInt(b));
            });*/
        },
        initEvent: function () { //初始化事件绑定
            for (var i in this.events) {
                this.events[i].call(this);
            }
        },
        initHeadbarsHelper: function () {
            Handlebars.registerHelper("equal", function (a, b, v1, v2) {
                return a == b ? v1 : v2;
            });
            Handlebars.registerHelper('add', function (a, b) {
                return a + b;
            });
        },
        toggleLoading: function (id, el) { //load加载
            var id = 'queryLoading' + (id || '');
            var loading = $('#' + id);
            if (!loading.length) {
                loading = $('<div class="query" id="' + id + '"/>').css('border', '0');
                loading.html('<img style="vertical-align: middle;" src="http://pic.c-ctrip.com/common/loading_50.gif">正在加载，请稍候…').appendTo(el);
            } else {
                loading.remove();
            }
        },
        totalPrice: function () { //计算总金额
            var data = this.data;
            var total = data.Amount - data.couponPrice - data.couponNowPrice + data.postage;
            var roles = data.roles;
            roles.amountPostage.html(data.postage);
            roles.amountCoupon.html(data.couponPrice + data.couponNowPrice);
            roles.amountTotal.html(total);
            roles.totalID.html(total);
            $('#J_totalprice').html(total);
            data.postage ? roles.fright.show() : roles.fright.hide();
            data.couponPrice + data.couponNowPrice ? roles.discount.show() : roles.discount.hide();
            // this.formData.PromotionAmount = data.couponPrice ? data.couponPrice : 0;
            return total;
        },
        render: function (tpl, data, handle, cb) {
            var Template = Handlebars.compile(tpl);
            var html = Template(data);
            typeof handle === 'function' && handle.call(this, html);
            typeof cb === 'function' && cb.call(this, html);
            return html;
        },
        fetchData: function (opts, cb) { //ajax
            var self = this;
            return $.ajax({
                type: opts.method || 'GET',
                url: opts.url || self.config.fetchUrl,
                data: opts.data,
                // cache: false,
                dataType: 'html',
                // timeout : 5000,
                success: function (data) {
                    cb.call(self, data);
                },
                error: function (msg) {
                    // alert(msg)
                }
            });
        },
        reviewPos: function () { //刷新提示位置
            this.insStatistics && $.map(this.insStatistics, function (v) { //重新计算提示的位置
                v.setPos();
            });
        },
        validate: function () { //验证提示
            var statistics = []; //记录
            var _userTrack = function () { //用户记录
                if (statistics.length) {
                    for (var i = 0; i < statistics.length; i++) {
                        ubt_userblock_post(statistics[i].params.target, statistics[i].params.data || '');
                    }
                }
            };
            var ins = function (opts) {
                var _defaults = {
                    zIndex: 999,
                    errorClass: "f_error",
                    removeErrorClass: true,
                    isFocus: false,
                    srollHeight: 0,
                    srollWidth: 0,
                    target: null,
                    $obj: null,
                    isAutoHide: false,
                    hideSpeed: 2000,
                    /**显示后调用*/
                    show: function () { },
                    /**隐藏后调用*/
                    hide: function () { },
                    /**位置*/
                    position: "rm_lm",
                    templs: {
                        tipTempl: '<div id={{tipId}} class="{{tip}}"  style="min-width:{{minWidth}}px; width:{{maxWidth}}px;_width:{{minWidth}}px; width:auto !important;max-width:{{maxWidth}}px;overflow:hidden;display:block;z-index:99;margin:0;padding:0;left:0px;top:0px;overflow:hidden;position:absolute;padding-left:16px;"><div class="{{box}} {{boxType}} {{boxArrow}}" id={{boxId}}><b class="{{arrow}}" id={{arrowId}}></b><div class={{content}} id={{contentId}}></div></div>',
                        contentTpl: '<div class="jmp_bd">{{{txt}}}</div>'
                    },
                    css: {
                        //最大宽度
                        maxWidth: "370",
                        //最小宽度
                        minWidth: "50"
                    },
                    classNames: {
                        //浮动层最外层的类
                        tip: 'book_jmpinfo',
                        //浮动层的类
                        box: 'base_jmp',
                        //浮动层类型的类
                        boxType: 'jmp_alert',
                        boxArrow: 'base_jmp_t',
                        //浮动层箭头的类
                        arrow: 'tri_l',
                        //浮动层加载时的类
                        loading: 'jmp_loading',
                        //浮动层内容的类
                        tipContent: 'jmp_content'
                    },
                    ids: {
                        boxId: "boxId",
                        arrowId: "arrowId",
                        loadingId: "loadingId",
                        contentId: "contentId"
                    },
                    /**提示内容*/
                    data: "提示信息!",
                    /**样式*/
                    styles: ".book_jmpinfo {margin: 20px;color: #666;font: 12px/2 Arial,Tahoma,simsun;-webkit-text-size-adjust: none;}.book_jmpinfo ul,li{list-style: none;}.book_jmpinfo a{color: #00c;cursor: pointer;text-decoration: none;}.book_jmpinfo a: hover{color: #f00;text-decoration: underline;}.book_jmpinfo .font16{font-size: 16px;}.book_jmpinfo .jmp_hd{height:30px; padding-left:10px; background:url(http://pic.c-ctrip.com/common/un_base_btn.png) repeat-x 0 -390px; font-size:12px; line-height:30px; color:#333;} .book_jmpinfo .jmp_hd h3{font-size: 12px;} .book_jmpinfo .jmp_bd{padding: 2px 3px!important;}  .book_jmpinfo .jmp_alert{border: 1px solid #ffb533; background: #fff5d1;} .book_jmpinfo .base_jmp b{position: absolute; width: 16px; height: 16px; background-image: url(http://pic.c-ctrip.com/common/un_jmp_tri.png); left:10px;top:24px;background-repeat: no-repeat; overflow: hidden;} .book_jmpinfo .base_jmp_t{margin-top: 8px;} .book_jmpinfo .base_jmp_r{margin-right: 8px;} .book_jmpinfo .base_jmp_b{margin-bottom: 7px;} .book_jmpinfo .base_jmp_l{margin-left: 8px;} .book_jmpinfo .base_jmp_t b{margin-top: -7px;} .book_jmpinfo .base_jmp_r b{margin-top: 10px; right: 0;} .book_jmpinfo .base_jmp_b b{bottom: -8px;} .book_jmpinfo .base_jmp_l b{margin-top: 10px; left: 9px;}  .book_jmpinfo .jmp_title .tri_b{background-position: -32px -32px;} .book_jmpinfo .jmp_alert .tri_t{background-position: -16px 0;} .book_jmpinfo .jmp_alert .tri_r{background-position: -16px -16px;} .book_jmpinfo .jmp_alert .tri_b{background-position: -16px -32px;} .book_jmpinfo .jmp_alert .tri_l{background-position: -16px -48px;} .book_jmpinfo .jmp_table .tri_t{background-position: -32px 0;}.f_error {background-color: #FFF7D9 !important; border-color: #D80000 #E50000 #E50000 #D80000 !important; border-style: solid; border-width: 1px;}"
                };
                this.params = $.extend(_defaults, opts);
                this.oid = null;
                this.timeid = null;
                this.init();
            };
            ins.prototype = {
                init: function () {
                    this.creatStyle(this.params.styles);
                    this.creatContainer();
                    this.creatContent();
                    if (orderprocess) {
                        statistics.push(this);
                        orderprocess.insStatistics = statistics;
                        _userTrack();
                    }
                },
                creatStyle: function (styles) { //加入样式
                    var doc = document;
                    if (!doc.styles) {
                        if (cQuery.browser.isIE) {
                            var styleSheet = doc.createStyleSheet();
                            styleSheet.cssText = styles;
                        } else {
                            var sty = doc.createElement('style');
                            sty.type = "text/css";
                            sty.textContent = styles;
                            doc.getElementsByTagName('head')[0].appendChild(sty)
                        }
                        doc.styles = true;
                    } else {
                        return;
                    }
                },
                uid: function () {
                    var target = this.params.target;
                    var base = 'abcdefghijklmnopqrstuvwxyz';
                    var _i = 0,
                        rd = function () {
                            return Math.random() * 26;
                        },
                        md = new Date,
                        wd = [],
                        ret;
                    for (_i = 0; _i < 5; _i++) {
                        wd.push(base.charAt(rd()));
                    }
                    ret = 'uid' + wd.join('') + md.getTime();
                    $(target).data('uid', ret);
                    return ret;
                },
                show: function (opts) {
                    var me = this;
                    var opts = $.extend(this.params, opts);
                    var pos;
                    opts.$obj = opts.$obj ? opts.$obj : opts.target;
                    if (opts.errorClass) {
                        $(opts.$obj).addClass(opts.errorClass);
                    }
                    if (opts.data) {
                        this.contentId.children().html(opts.data);
                    }
                    pos = this.getPos();
                    this.tipId.css({
                        top: pos.top,
                        left: pos.left
                    }).show();
                    this.arrowId.css({
                        top: pos.arrow.top
                    });
                    if (opts.isAutoHide) {
                        if (this.timeid) clearTimeout(this.timeid);
                        this.timeid = setTimeout($.proxy(this.hide, this), opts.hideSpeed);
                    }
                    $(opts.$obj).bind('focus', function () {
                        me.hide({
                            $obj: this
                        });
                    });
                    return this;
                },
                setPos: function (opts) {
                    var pos = this.getPos();
                    if (parseInt(this.tipId.css('top')) > 0) {
                        this.tipId.css({
                            top: pos.top,
                            left: pos.left
                        });
                        this.arrowId.css({
                            top: pos.arrow.top
                        });
                    }
                },
                hide: function (opts) {
                    var opts = $.extend(this.params, opts);
                    opts.$obj = opts.$obj ? opts.$obj : opts.target;
                    if (opts.removeErrorClass) {
                        $(opts.$obj).removeClass(opts.errorClass);
                    }
                    this.tipId.css({
                        top: '-9999em',
                        left: '-9999em'
                    });
                },
                render: function (tpl, data) {
                    var Template = Handlebars.compile(tpl);
                    return html = Template(data);
                },
                creatContainer: function () {
                    var opts = this.params;
                    var uid = this.oid || (this.oid = this.uid());
                    var oid = '#' + uid;
                    if (!$(oid).length) {
                        var bb = $('<div/>').html(this.render(opts.templs.tipTempl, {
                            tipId: uid,
                            boxId: opts.ids.boxId,
                            arrowId: opts.ids.arrowId,
                            loadingId: opts.ids.loadingId,
                            contentId: opts.ids.contentId,
                            tip: opts.classNames.tip,
                            box: opts.classNames.box,
                            boxType: opts.classNames.boxType,
                            boxArrow: opts.classNames.boxArrow,
                            arrow: opts.classNames.arrow,
                            maxWidth: opts.css.maxWidth,
                            minWidth: opts.css.minWidth,
                            minHeight: opts.css.minHeight,
                            content: opts.classNames.tipContent
                        })).children().css({
                            'top': '-9999em',
                            'left': '-9999em'
                        }).appendTo('body');

                    }
                    this.tipId = $("#" + uid);
                    this.boxId = $("#" + opts.ids.boxId, oid);
                    this.arrowId = $("#" + opts.ids.arrowId, oid);
                    this.loadingId = $("#" + opts.ids.loadingId, oid);
                    this.contentId = $("#" + opts.ids.contentId, oid);
                    // $('#'+uid)[0].style.zIndex = opts.zIndex;
                },
                creatContent: function () {
                    var opts = this.params;
                    var html = this.render(opts.templs.contentTpl, {
                        "txt": opts.data
                    });
                    this.contentId.html(html);
                },
                getPos: function () {
                    var opts = this.params;
                    var pos = opts.position.split("_")
                    var targ = {};
                    var tip = {};
                    tip.pos = {
                        width: parseInt(this.tipId[0].offsetWidth, 10),
                        height: parseInt(this.tipId[0].offsetHeight, 10)
                    }
                    targ.pos = $(opts.target).offset();
                    tip.arrow = {
                        top: (parseInt(this.tipId.outerHeight()) - parseInt(this.arrowId.outerHeight())) / 2 + 12
                    };
                    var targ_left = targ.pos.left;
                    var targ_top = targ.pos.top;
                    var targ_width = $(opts.target).width();
                    var targ_height = $(opts.target).height();
                    var tip_width = tip.pos.width;
                    var tip_height = tip.pos.height;
                    var tipDot = {
                        lm: {
                            left: targ_left,
                            top: targ_top - tip_height / 2,
                            offsetX: 0,
                            offsetY: 0
                        },
                        rm: {
                            left: targ_left - tip_width,
                            top: targ_top - tip_height / 2,
                            offsetX: 0,
                            offsetY: 0
                        }
                    }
                    var targDot = {
                        "lm": [0, targ_height / 2, "left", "Middle"],
                        "rm": [targ_width, targ_height / 2, "right", "Middle"]
                    };
                    var tp = tipDot[pos[1]];
                    var tg = targDot[pos[0]];
                    var left = tp.left + tg[0];
                    var top = tp.top + tg[1];
                    var arrow = tip.arrow;
                    var offsetX = tp.offsetX;
                    var offsetY = tp.offsetY;
                    var ret = {
                        left: left,
                        top: top,
                        arrow: tip.arrow
                    }
                    return ret;
                }
            };
            return ins;
        }(),
        hideTip: function (el, opts) {
            var opts = opts || {};
            if (el && $(el).data('valid')) {
                $(el).data('valid').hide(opts);
            }
        },
        Products: function () { //产品部分
            var self = this;
            return {
                init: function () {
                    var me = this;
                    me.fnToggleProductDetail();
                    me.fnToggleDetailContent();
                    $$ = {
                        module: {
                            jmpInfo: {
                                array: {}
                            }
                        },
                        fltDomestic: {}
                    };
                    var craftTypeUrl = "http://webresource.c-ctrip.com/code/js/resource/jmpinfo_tuna/CraftType_" + cQuery.config("charset") + ".js"
                    $.getScript(craftTypeUrl, function () {
                        var getData = function (page) {
                            var pagevalue = "";
                            if (page.match(new RegExp('=(\\w+)')) != null) {
                                pagevalue = page.match(new RegExp('=(\\w+)'))[1];
                            }
                            page = page.indexOf('?') != -1 ? pagevalue : '';
                            if (page != '') {
                                var valueObj = {};
                                var valueList = null;
                                if ($$.module.jmpInfo.array.CraftType)
                                    valueList = $$.module.jmpInfo.array.CraftType.match(new RegExp('@(' + page + '\\|[^@]*\\|[^@]*\\|\\d*\\|\\d*)@', 'i'));
                                if (!valueList || valueList == null) {
                                    return {};
                                }
                                valueList = valueList[1].split('|');
                                for (var i = 0, len = valueList.length; i < len; i++) {
                                    valueObj['txt' + i] = valueList[i];
                                }
                                return valueObj;
                            }
                            return {};
                        };
                        cQuery.mod.load('jmp', '1.0', function () {
                            $('span[mod1="jmpInfo"]', '#productID').each(function () {
                                cQuery(this).regMod('jmp', '1.0', {
                                    options: {
                                        content: getData($(this).attr('mod_jmpinfo_page')),
                                        css: {
                                            maxWidth: '460'
                                        },
                                        type: 'jmp_table',
                                        classNames: {
                                            boxType: 'jmp_table'
                                        },
                                        template: '#jmp_craft',
                                        alignTo: 'cursor',
                                        showArrow: false
                                    }
                                });
                            });
                        })
                    });
                },
                /**
                * 点击隐藏明细和展开明细，显示隐藏Content按钮
                * @return {void}
                */
                fnToggleProductDetail: function () {
                    $('#base_bd .book_detail').click(function () {
                        var jProduct = $(this).parent();
                        var jProductContent = jProduct.find('.book_product_content');
                        if (jProductContent.is(':hidden')) {
                            jProductContent.show();
                            $(this).html('隐藏明细<i class="close"></i>');
                        } else {
                            jProductContent.hide();
                            $(this).html('展开明细<i class="up"></i>');
                        }
                        self.reviewPos(); //刷新提示位置
                    });
                },
                /**
                * 点击对应的链接，显示隐藏详细内容
                * 点击所有.pack_up，找到祖先元素.hidden_content，隐藏之
                * 点击所有.show_detailed，找到相邻的tr父元素，如果内部的确有详细内容则显示/隐藏详细内容
                * @return {void}
                */
                fnToggleDetailContent: function () {
                    $('#base_bd .pack_up').click(function () {
                        var jHiddenContent = $(this).parentsUntil('td', '.hidden_content');
                        jHiddenContent.hide();
                        self.reviewPos(); //刷新提示位置
                    });
                    $('#base_bd .show_detailed').click(function () {
                        var jParentTr = $(this).parents('tr:first');
                        var jNextTr = jParentTr.next('tr');
                        var jHiddenContent = jNextTr.find('.hidden_content');
                        if (jHiddenContent.size() > 0) {
                            jHiddenContent.toggle();
                        }
                        self.reviewPos(); //刷新提示位置
                    });
                }
            };
        },
        Coupon: function () { //优惠券
            var self = this,
                vdata = self.data,
                roles = vdata.roles,
                mod = vdata.modules,
                parseJSON = self.common.parseJSON;
            return {
                init: function () { //初始化
                    var me = this;
                    var data = me.handleData();
                    var list = data.data;
                    var tpl = self.tpl.coupon;
                    var isSingle = this.isSingle = (data.type && list.length === 1);
                    $.extend(roles, self.common.getRoles(roles.couponID));
                    if (list.length) {
                        if (isSingle) {
                            tpl = self.tpl.singleCoupon;
                        }
                        self.render(tpl, {
                            'list': list
                        }, function (dom) {
                            if (isSingle) {
                                roles.singleConponID.html(dom).show();
                                roles.couponID.children().eq(1).hide();
                            } else {
                                roles.coupon.append(dom);
                                roles.couponID.show();
                            }
                            roles.fillsetID.show();
                        }, function () {
                            me.initSelect(isSingle);
                            me.select(isSingle);
                            // 点击input，下拉框自动显示该用户已有的优惠券（执行）
                            me.auto(isSingle);
                        });
                    } else {
                        roles.couponID.children().eq(1).hide();
                        roles.fillsetID.show();
                    }
                },
                handleData: function () {
                    var me = this,
                        _ret = [],
                        _ref = vdata.initData.availablePromotion,
                        _r, type = 0,
                        _obj, oSelected = _ref ? _ref.SelectedPromotion : null,
                        reduce; //type:优惠券是否是单个且要输入框的
                    me.promotions = {};
                    if (_ref) {
                        if (!$.isEmptyObject(_ref)) {
                            if (_ref.Promotions && _ref.Promotions.length) {
                                _ret = _ref.Promotions;
                                if (_ret.length) {
                                    $.map(_ret, function (v, k) {
                                        if (v.PromotionID) {
                                            me.promotions[v.PromotionID] = v
                                            if (oSelected && oSelected.PromotionID === v.PromotionID) {
                                                reduce = Math.abs(oSelected.ReducedAmount);
                                                v.ReducedAmount = reduce ? reduce : 0;
                                            }
                                        }
                                    })
                                }
                            }
                        }
                        if (_r = vdata.initData.availablePromotion.ExtendPromotion) {
                            if (_r.IsNeedInputExtendCouponCode) {
                                _r.extendPromotion = true;
                                if (oSelected) {
                                    if (oSelected.IsExtendPromotion) {
                                        reduce = Math.abs(oSelected.ReducedAmount);
                                        _r.ReducedAmount = reduce ? reduce : 0;
                                        _r.DisplayNameR = oSelected.DisplayName;
                                        _r.Description = oSelected.Description;
                                    }
                                }
                                _ret.push(_r);
                            };
                        }
                    }
                    _obj = {
                        data: _ret,
                        type: 0
                    };
                    if (_ret.length === 1 && _ret[0].extendPromotion) {
                        _obj.type = 1;
                    }
                    return _obj;
                },
                initSelect: function (isSingle) {
                    var oSelected = vdata.initData.availablePromotion.SelectedPromotion;
                    var current;
                    var role, reduce;
                    if (!oSelected) return;
                    reduce = Math.abs(oSelected.ReducedAmount);
                    if (isSingle) {
                        role = self.common.getRoles(roles.singleConponID);
                        role.cnew.hide();
                        role.had.show();
                    } else {
                        current = oSelected.IsExtendPromotion ? roles.coupon.find('input[extend="1"]') : roles.coupon.find('input[PromotionID="' + oSelected.PromotionID + '"]');
                        current.prop('checked', true);
                        role = self.common.getRoles(current.closest('li'));
                        role.reinput && role.reinput.show();
                        role.description && role.description.show();
                        role.tip.show().html(reduce ? '<dfn>-&yen;</dfn> <strong>' + reduce + '</strong>' : '已选择');
                    }
                    roles.amountCoupon.html(vdata.couponNowPrice = reduce);
                    self.totalPrice.call(self);
                },
                select: function (isSingle) {
                    var request;
                    var validTip;
                    var _data = {
                        TmpOrderID: self.formData.OrderId,
                        PromotionID: 0,
                        CouponCode: ''
                    };
                    var conpon = isSingle ? roles.singleConponID : roles.couponID;
                    var callback = function (amount) {
                        roles.amountCoupon.html(vdata.couponNowPrice = amount);
                        self.totalPrice.call(self); //总金额
                    };
                    var getDate = function (role, obj, noShowTip, isChecked) {
                        _data.CouponCode = '';
                        if (obj) {
                            $.extend(_data, obj);
                        }
                        request = self.fetchData({
                            url: vdata.handles.verifyPromotion,
                            data: _data
                        }, function (data) {
                            var amount, code, ref;
                            if (!request) return; //如果请求取消则停止回调
                            data = typeof data === 'string' ? parseJSON(data) : data;
                            if (data.errno != 0) {
                                role.tip.html(data.errmsg || '你输入的验证码无效').show();
                                callback(0);
                            } else {
                                ref = data.data;
                                code = obj ? obj.CouponCode : '';
                                amount = Math.abs(ref.ReducedAmount);
                                promotionID = ref.PromotionID;
                                if (amount == 0) {
                                    (role.tip && !noShowTip) && role.tip.html('已选择');
                                } else {
                                    role.tip && role.tip.html('<dfn>-&yen;</dfn> <strong>' + amount + '</strong>');
                                }
                                role.tip && role.tip.show();
                                if (isChecked) {
                                    if (isSingle) {
                                        ref.DisplayName && role.had.find('.singleName').html(ref.DisplayName)
                                        ref.Description && role.had.find('.explain').html(ref.Description)
                                        role.had.show();
                                        role.cnew.hide();
                                    } else {
                                        role.code.hide()
                                        ref.DisplayName && role.displayName.html(ref.DisplayName)
                                        ref.Description && role.extendDescription.html(ref.Description).show()
                                        role.reinput.show()
                                    }
                                }
                                callback(amount);
                            }
                        })
                    };
                    var couponCHeck = function (role, promotionid, bl) {
                        if (!bl) {
                            callback(0);
                            getDate(role, {
                                PromotionID: 0,
                                CouponCode: ''
                            }, !0);
                        }
                        role.code && role.code.show();
                        role.couponCode && role.couponCode.val('');
                        role.tip && role.tip.html('');
                        role.checkcode.unbind('click');
                        role.checkcode.bind('click', function () {
                            var _code = $.trim(role.couponCode.val());
                            if (!_code) {
                                if (validTip) {
                                    validTip.show();
                                } else {
                                    validTip = new self.validate({
                                        target: role.couponCode[0],
                                        data: '请输入验证码',
                                        errorClass: ''
                                    }).show();
                                }
                                return;
                            }
                            getDate(role, {
                                PromotionID: promotionid,
                                CouponCode: _code
                            }, null, true);
                        });
                    };
                    if (this.isSingle) {
                        var _role = self.common.getRoles(roles.singleConponID);
                        roles.singleConponID.on('click', 'a[role="singleReInput"]', function () {
                            couponCHeck(_role, 0);
                            _role.cnew.show();
                            _role.had.hide().find('.explain, .singleName').html('');
                        });
                        couponCHeck(_role, 0, !0);
                    }
                    conpon.on('click', 'input[type="radio"]', function () {
                        var _this = $(this);
                        var promotionID = _this.attr('PromotionID');
                        var strategyID = _this.attr('strategyID');
                        var parent = _this.closest('li');
                        var role = self.common.getRoles(parent);
                        var requireCode = _this.attr('requireCode') === '1';
                        if (request) {
                            request.abort();
                        }
                        if (_this.prop('checked') && _this.attr('role') !== 'cancel') {
                            role.description && role.description.show();
                            self.removeValidate();
                        }
                        var extendDescription = conpon.find('[role="extendDescription"]');
                        extendDescription && extendDescription.closest('li').find('[role="displayName"]').html("如果您有优惠代码，请输入");
                        var siblings = parent.siblings();
                        siblings.find('[role="tip"],[role="code"],[role="description"],[role="extendDescription"],[role="reinput"]').hide();
                        if (_this.attr('role') === 'cancel') {
                            callback(0);
                            getDate(role, {
                                PromotionID: 0,
                                CouponCode: ''
                            });
                            return;
                        }
                        if (requireCode) {
                            couponCHeck(role, role.couponCheck.attr('promotionid') || 0);
                        } else {
                            getDate(role, {
                                PromotionID: promotionID
                            });
                        }
                    });

                    conpon.on('click', '[role="reinput"]', function () {
                        var parent = $(this).hide().closest('li');
                        var role = self.common.getRoles(parent);
                        if (role.extendDescription) {
                            role.extendDescription.html('').hide()
                            role.displayName.html("如果您有优惠代码，请输入")
                        }
                        couponCHeck(role, role.couponCheck.attr('promotionid') || 0);
                    })
                },
                // 点击input，下拉框自动显示该用户已有的优惠券（方法）
                auto: function (isSingle) {
                    var _role = isSingle ? roles.singleConponID : roles.couponID,
                        timer,
                        reviewPosition = function () {
                            $("[id^='autoCoupon']:visible").each(function () {
                                var $this = $(this);
                                autoCouponId = $this.attr('id'),
                                promotionId = autoCouponId.substr(autoCouponId.indexOf('_') + 1);
                                input = isSingle ?
                                        _role.find('[role = "couponCode"]') :
                                        _role.find('[promotionid="' + promotionId + '"]').parent().next().children('[type="text"]'),
                                x = input.offset().left,
                                y = input.offset().top;
                                $this.css({ left: x, top: y + input.outerHeight() })
                            })
                        };
                    _role.on('click', '[role = "couponCode"]', function () {
                        var $this = $(this),
                            radio = $this.parent().prev().children('input'),
                            promotionId = radio.attr('promotionid') || '',
                            autoCoupon = $('#autoCoupon_' + promotionId),
                            productID = GV.app.order.vars.initData.productID,
                            big = promotionId ? false : true,
                            x = $this.offset().left,
                            y = $this.offset().top + $this.outerHeight();
                        // 阻止重复ajax
                        if ($this.data('requested')) {
                            autoCoupon.css({ left: x, top: y }).show();
                            return
                        };
                        // ajax请求该用户已有的优惠券
                        $.ajax({
                            url: "/booking/Handler2/UserAvailableCoupon.ashx",
                            type: 'GET',
                            dataType: 'json',
                            data: {
                                pkgId: productID,
                                promotionId: promotionId
                            },
                            success: function (data) {
                                $this.data('requested', true);
                                // 无返回数据或者返回数据为空
                                if (!data || !data.length) {
                                    return
                                }
                                self.render(self.tpl.autoCoupon, {
                                    'index': promotionId,
                                    'big': big,
                                    'list': data
                                }, function (dom) {
                                    $(dom)
                                        .appendTo('body')
                                        .css({ left: x, top: y })
                                        .show().find('li').click(function () {
                                            $this.val($(this).find('.coupon_num').html() || $(this).children().html());
                                            autoCoupon.hide();
                                            $this.next('[role = "checkcode"]').click();
                                        })
                                })
                            }
                        })
                    })
                    // 点击下拉框隐藏
                    $(document).mouseup(function () {
                        $("[id^='autoCoupon']").hide()
                    })
                    // 窗口大小变化重新定义下拉框位置
                    $(window).resize(function () {
                        timer && clearTimeout(timer);
                        timer = setTimeout(reviewPosition, 200);
                    })
                }
            }
        },
        HotelCoupon: function () { //酒店优惠
            var self = this,
                vdata = self.data,
                roles = vdata.roles;
            return {
                init: function () {
                    var me = this;
                    var data = this.handleData(vdata.initData.Coupon);
                    if (!data && $.isEmptyObject(vdata.initData.availablePromotion)) {
                        roles.couponID.hide();
                    }
                    if (!data) {
                        if (!vdata.initData.availablePromotion || vdata.modules.Coupon.isSingle) {
                            roles.couponID.hide();
                        }
                        return;
                    }
                    self.render(self.tpl.hotelCoupon, data, function (dom) {
                        var html = $(dom).appendTo(vdata.roles.couponID);
                        me.bindEvent(html, data);
                    });
                },
                handleData: function (data) {
                    if (!data) return;
                    var _ret = {
                        Amount: data.Amount,
                        CanUseAmount: data.CanUseAmount
                    };
                    var _ref = 0;
                    var __ref = 0;
                    if (data.Amount <= 0) {
                        _ret.isRemain = false;
                    } else {
                        _ret.isRemain = true;
                    }
                    $.map(data.ReturnTicketCash, function (v, k) {
                        _ref += parseInt(v.Amount);
                    });
                    data.UsedReturnCashRoomLst && $.map(data.UsedReturnCashRoomLst, function (v, k) {
                        __ref += parseInt(v.Amount);
                    })
                    _ret.coupon = _ref;
                    _ret.used = __ref;
                    _ret.remain = parseInt(data.Amount) - parseInt(data.CanUseAmount);
                    return _ret;
                },
                bindEvent: function (el, data) {
                    var role = self.common.getRoles(el);
                    role.confirm && role.confirm.click(function () {
                        role.having.hide();
                        role.had.show();
                        self.formData.CouponInfo = {
                            CashBack: data.CanUseAmount,
                            IsUseCoupon: 1
                        }
                    });
                    role.cancel && role.cancel.click(function () {
                        role.having.show();
                        role.had.hide();
                        self.formData.CouponInfo = {
                            CashBack: 0,
                            IsUseCoupon: 0
                        }
                    });
                }
            }
        },
        Travellers: function () { //出游人
            var self = this;
            var vdata = self.data;
            var roles = vdata.roles;
            var Reg = self.Reg;
            var Validate = self.validate;
            var oBirth = new Birth('', vdata.initData.departDate);
            var mod = vdata.modules;
            var Visitor = function (opts) { //旅客类
                var _defaults = {
                    element: ''
                };
                this.opts = $.extend(_defaults, opts);
                this.init();
            };
            Visitor.prototype = {
                init: function () {
                    var role = this.role = self.common.getRoles(this.opts.element);
                    this.personType = +$(this.opts.element).attr('ptype');
                    this.cid = $(this.opts.element).attr('index');
                    if (role.national) {
                        this.regNationalAddr();
                    } else {
                        this.bindEvent();
                    }
                    if (role.idCardType) {
                        this.filterInputs();
                    }
                },
                initTips: function () {

                },
                regNationalAddr: function () { //注册国籍控件
                    var role = this.role;
                    var dfNational;
                    cQuery.mod.load('address', '1.0', $.proxy(function () {
                        var me = this;
                        this.addressNational = self.regNational(role.national[0]);
                        if (/ipad/.test(navigator.userAgent.toLowerCase())) {
                            role.national[0].readOnly = true;
                            role.national.bind('click', function () {
                                $('.CQ_suggestionTabContainer')[0].style.width = "0px";
                                setTimeout(function () {
                                    role.national[0].readOnly = false;
                                    role.national[0].focus();
                                }, 100);
                            });
                            role.national.bind('blur', function () {
                                role.national[0].readOnly = true;
                            });
                        }
                        this.addressNational.method('bind', 'change', function (event, data) { //绑定国籍事件
                            role.national.attr('mod_value', data.items[2]);
                        });
                        this.addressNational.method('bind', 'userinput', function (a, b) {
                            if (b.data) {
                                vdata.dfNational = b.data;
                            }
                            if (vdata.dfNational) {
                                dfNational = vdata.dfNational.split('|');
                                me.setNational(dfNational[1], dfNational[2]);
                                me.checkForeign(dfNational[2]);
                            }
                            me.checkNationality();
                        });
                        this.loadNationalData();
                    }, this));
                },
                loadNationalData: function () {
                    var me = this;
                    cQuery.loader.jsonp('http://webresource.c-ctrip.com/code/cquery/resource/address/flightintl/nationality_' + cQuery.config("charset") + '.js', {
                        charset: cQuery.config("charset"),
                        onload: function (data) {
                            if ($.isEmptyObject(vdata.nationalData)) {
                                me.handleNationalData(data.data, data.suggestion['']);
                                vdata.orgiNationalData = data;
                            }
                            me.initNationalData();
                            me.bindEvent();
                        }
                    })
                },
                handleNationalData: function (data, sug) {
                    var reg = new RegExp('@([^@]*\\|[^@]*\\|[^@]*)@', 'gi');
                    vdata.nationalData = {};
                    $.map(data.match(reg), function (v, k) {
                        var _ref = v.replace('@', '').replace('@', '').split('|');
                        vdata.nationalData[_ref[2]] = _ref[1];
                    });
                    $.map(sug, function (v, k) {
                        vdata.nationalData[v.data.split('|')[2]] = v.display;
                    });
                },
                initNationalData: function () {
                    var role = this.role;
                    var val = $.trim(role.national.val());
                    if (val !== '' && val !== role.national.attr('_cqnotice')) { //改变CN成中国大陆
                        role.national.val(vdata.nationalData[val]);
                    } else {
                        role.national.val('中国大陆').attr('mod_value', 'CN').removeClass('inputSel');
                    }
                    if (vdata.initData.ProductType === 3) {
                        this.addressNational.set('source', {
                            data: '@China|中国大陆|CN@',
                            suggestion: {
                                '': [{
                                    "display": "中国大陆",
                                    data: "China|中国大陆|CN",
                                    rightDisplay: 'China'
                                }]
                            }
                        })
                    }
                },
                setNationalData: function () {
                    var producttype = this.getProdctType();
                    var role = this.role;
                    if (producttype === 1 && role.national && role.idCardType) {
                        var val = role.idCardType.val();
                        if (val === '7') {
                            this.setNational('中国香港', 'HK');
                        }
                        if (val === '8') {
                            this.setNational('中国台湾', 'TW');
                        }
                        if (val === '2') {
                            this.addressNational.set('source', {
                                data: this.filterNationalData(['@HongKong|中国香港|HK', '@Macau|中国澳门|MO', '@Taiwan|中国台湾|TW']).data,
                                suggestion: {
                                    '': [{
                                        "display": "中国大陆",
                                        data: "China|中国大陆|CN",
                                        rightDisplay: 'China'
                                    }, {
                                        "display": "美国",
                                        data: "United States|美国|US",
                                        rightDisplay: 'United States'
                                    }, {
                                        "display": "英国",
                                        data: "United Kingdom|英国|GB",
                                        rightDisplay: 'United Kingdom'
                                    }, {
                                        "display": "日本",
                                        data: "Japan|日本|JP",
                                        rightDisplay: 'Japan'
                                    }, {
                                        "display": "加拿大",
                                        data: "Canada|加拿大|CA",
                                        rightDisplay: 'Canada'
                                    }, {
                                        "display": "法国",
                                        data: "France|法国|FR",
                                        rightDisplay: 'France'
                                    }, {
                                        "display": "韩国",
                                        data: "Korea,Republic of|韩国|KR",
                                        rightDisplay: 'Korea,Republic of'
                                    }, {
                                        "display": "德国",
                                        data: "Germany|德国|DE",
                                        rightDisplay: 'Germany'
                                    }]
                                }
                            });
                        } else {
                            this.addressNational.set('source', vdata.orgiNationalData);
                        }
                    }
                },
                bindEvent: function () {
                    var me = this;
                    var role = this.role;
                    var isHasEnName = role.nameEN;
                    me.setNationalData();
                    me.autoNext([role.birthdayY, role.birthdayM]).autoNext([role.cardValidUntilY, role.cardValidUntilM]);
                    $(this.opts.element).on('blur', 'input[type="text"]', function (event) {
                        var reg;
                        if (reg = $(this).attr('regex')) {
                            me[reg]($.trim( $(this).val() ), $(this).prop('required'), this);
                        }
                        if ($(this).attr('role') === 'idCardNo') {
                            Reg.checkIdRepeat($(this).prev()[0].value, this, $(this).prev().find('option:selected')[0].innerHTML);
                        }
                        if ($(this).attr('role') === 'birthPlace'){

                        }
                    })
                        .on('change', '[role="idCardType"]', function () {
                            if ($(this).next().next().hasClass('repeatNum')) {
                                $(this).next().next().remove();
                            }
                            var val = $(this).val();
                            var elem = $(this).closest('[role="youren"]');
                            var cliendID = elem.attr('index');
                            var cobj = mod.Commoners.commonersObj[cliendID];
                            var _ref;
                            var setCardDate = function (arr) {
                                if (role.cardValidUntilY) {
                                    $.map('cardValidUntilY|cardValidUntilM|cardValidUntilD'.split('|'), function (v, k) {
                                        role[v].val(arr[k]);
                                    })
                                }
                            };
                            me.filterInputs();
                            // $.map('nameEnLast|nameEnFirst|idCardNo|gender|birthdayY|birthdayM|birthdayD|national|cardValidUntilY|cardValidUntilM|cardValidUntilD|birthPlace'.split('|'), function (v, k) { //隐藏提示
                            //     role[v] && self.hideTip(role[v][0]);
                            // });
                            $('input[role="cardValidUntilY"],input[role="cardValidUntilM"]', '#travellersID').removeClass('f_error');
                            // if((val === '2' || val === '22') && me.getDest() === 32){
                            //     me.showTip(role.idCardType,'香港海关入境处规定，在香港转机到第三国（地区），可以凭护照签证或《往来台湾通行证》，和到目的地的机票可以在港合法滞留7天。',{errorClass:''});
                            // }
                            me.setNationalData();
                            self.reviewPos();
                            if (cliendID && cobj && (_ref = cobj.IDCardInfo) && _ref.length) {
                                role.idCardNo && role.idCardNo.val('');
                                setCardDate(['', '', '']);
                                $.map(_ref, function (v, k) {
                                    var lt;
                                    if (v.IDCardType == val) {
                                        v.IDCardNo && role.idCardNo && role.idCardNo.val(v.IDCardNo).removeClass('inputSel');
                                        lt = v.IDCardTimelimit ? v.IDCardTimelimit.split('-') : ['', '', ''];
                                        setCardDate(lt);
                                        return false;
                                    }
                                })
                            }
                        })
                },
                filterInputs: function () {
                    var val, role = this.role;
                    var optional = $('.optional', this.opts.element);
                    var later = $('.later', this.opts.element);
                    var me = this;
                    if (role.idCardType) {
                        val = role.idCardType.val();
                        role.idCardNo.show();
                        if (val == '1') {
                            optional.length && optional.hide();
                        } else {
                            optional.length && optional.show();
                        }
                        if (val == '100') {
                            later.length && later.hide();
                        } else {
                            // !later.hasClass('optional') && later.length && later.show();
                            later.each(function () {
                                !$(this).hasClass('optional') && $(this).show();
                            })
                        }
                        if (val === '2') {
                            role.passportType.show();
                        } else {
                            role.passportType.hide();
                        }
                    }
                },
                filterNationalData: function (arg) {
                    var source = cQuery.copy(vdata.orgiNationalData);
                    var _ret;
                    if (arg.length) {
                        $.map(arg, function (v, k) {
                            source.data = source.data.replace(v, '');
                        })
                    }
                    return source;
                },
                setNational: function (val, attr) { //设置国籍
                    this.role.national.val(val).attr('mod_value', attr).removeClass('inputSel');
                },
                /*  forForeign: function(isForeign, isHasEnName) { //是否是外宾
                var role = this.role;
                var _tpl, _obj, nameEN;
                if (isForeign) {
                role.nameCN.removeAttr('regex');
                if (!isHasEnName) {
                if (this.cid) {
                _obj = mod.Commoners.commonersObj[this.cid];
                } else {
                _obj = {
                ENFirstName: '',
                ENMiddleName: '',
                ENLastName: ''
                }
                }
                nameEN = _obj.ENFirstName ? (_obj.ENLastName + '/' + _obj.ENFirstName + ' ' + _obj.ENMiddleName) : '';
                _tpl = '<li><label for="" class="product_label">英文姓名</label><input type="text" class="input_m" value="' + nameEN + '" role="nameEN" regex="checkEnName"> <a href="###" class="explain" data-role="jmp" data-params="{options: {css:{maxWidth:\'400\',minWidth:\'240\'},type:\'jmp_table\', classNames:{boxType:\'jmp_table\'},template:\'#jmp_table1_3\',alignTo:\'cursor\'}}">填写说明</a></li>';
                self.render(_tpl, {}, function(dom) { //插入英文名字
                var _ref = $(dom).insertAfter(role.nameCN.closest('li'));
                role.nameEN = _ref.find('input[role="nameEN"]');
                });
                }
                } else {
                role.nameCN.attr('regex', 'checkCnName');
                if (!isHasEnName) {
                self.hideTip(role.nameEN[0]);
                role.nameEN.closest('li').remove();
                delete role.nameEN;
                }
                }
                self.reviewPos();
                },*/
                autoNext: function (el) {
                    if (el[0]) {
                        $(el).each(function (i) {
                            $(this).bind('keyup', function () {
                                if (i === 0) {
                                    if ($(this).val().length >= 4) {
                                        $(this).next().focus();
                                    }
                                } else {
                                    if ($.trim($(this).val()).length >= 2) {
                                        $(this).next().focus();
                                    }
                                }
                            });
                        });
                    }
                    return this;
                },
                hideTip: function () { //提示隐藏 
                    var tip;
                    $(this.opts.element).find('.cq').removeClass('inputSel').removeClass('f_error');
                    $.each(this.role, function (k, v) {
                        if (tip = v.data('valid')) {
                            tip.hide();
                        }
                    });
                },
                showTip: function (el, data, opts) {
                    var showItem = $(el);
                    var ovalid = showItem.data('valid');
                    opts = $.extend({
                        target: el,
                        data: data
                    }, opts || {
                        'errorClass': 'f_error'
                    });
                    ovalid = ovalid ? ovalid.show(opts) :
                    new Validate(opts).show();
                    showItem.data('valid', ovalid);
                },
                getIdvalue: function () {
                    var role = this.role;
                    return (role.idCardType && role.idCardType.val()) || 0;
                },
                getExpiryVal: function () {
                    var role = this.role;
                    var reg = /^(\d{4})-([01]?\d)-([0123]?\d)$/;
                    var _ret = [];
                    _ret.push(role.cardValidUntilY.val(), role.cardValidUntilM.val(), role.cardValidUntilD.val());
                    return reg.test(_ret.join('-')) ? _ret.join('-') : 0;
                },
                getCardValidUntil: function () {
                    var role = this.role;
                    var t = this.getExpiryVal();
                    var cardDate;
                    if (!t || !role.idCardType) {
                        return [true, ];
                    }
                    cardDate = role.idCardType.val();
                    if (!self.common.isDate(t)) {
                        return [false, '请填写正确的证件有效期，格式：yyyy-mm-dd'];
                    }
                    var days = (GVdate.parse(t, !0) - GVdate.parse(this.opts.returnDate, !0)) / (3600 * 24 * 1000);
                    var day = GVdate.parse(t, !0) - GVdate.parse(this.opts.departDate, !0)
                    if (day <= 0) {
                        return [false, '您的证件已经过了有效期，会影响您正常登机。建议重新办理后再预订。'];
                    }
                    if (cardDate == 2 || cardDate == 22) {
                        if (days < 180) {
                            return [true, '从旅行日期计算，您的证件有效期已不足六个月，可能无法顺利出入境，建议您核实确认。'];
                        }
                        if (days < 360) {
                            return [true, '从旅行日期计算，您的证件有效期已不足一年，建议您核实确认。'];
                        }
                    }
                    return [true, ];
                },
                getAgeInfo: function (str) {
                    var _ret;
                    var role = this.role;
                    if (role.birthdayY && role.birthdayY.closest('li').css('display') !== 'none') {
                        if (!/^(\d{4})-([01]?\d)-([0123]?\d)$/.test([role.birthdayY.val(), role.birthdayM.val(), role.birthdayD.val()].join('-'))) {
                            return [true, ];
                        }
                    }
                    if (!self.common.isDate(str)) {
                        return [false, '请正确填写出生日期，格式：yyyy-mm-dd，且不得晚于出发日期'];
                    }
                    if (this.personType === 1 && oBirth.isChild(str)) {
                        return [false, '请填写成人信息'];
                    }
                    if (this.personType === 0 && !oBirth.isChild(str)) {
                        return [false, '请填写儿童信息'];
                    }
                    if (this.personType === 1 && oBirth.isEldor(str)) {
                        return [true, '出行人年龄大于70周岁，出行前需填写《健康申请表》'];
                    }
                    return [true, ];
                },
                checkIdCardType: function () {
                    var role = this.role;
                    var dest = this.getDest();
                    if (!role.national) return true;
                    var national = $.trim(role.national.val());
                    var idtype = role.idCardType.val();
                    // if(dest === 32 || dest === 33){//香港或澳门
                    //     if(national === '中国大陆' && idtype != 10 && (idtype != 10 && idtype !=　99)){
                    //         this.showTip(role.idCardType[0],'请选择港澳通行证');
                    //         return false;
                    //     }
                    // }
                    return true;
                },
                getDest: function () {
                    return vdata.initData.Dest;
                },
                getProdctType: function () {
                    return vdata.initData.ProductType;
                },
                checkName: function (str) {
                    var me = this
                    var role = this.role;
                    var bl;
                    var showTip = function () {
                        me.showTip.apply(this, [role.name[0]].concat([].slice.call(arguments, 0)));
                    };
                    if ('' === str || str === role.name.attr('_cqnotice')) {
                        showTip('请填写姓名');
                        return false;
                    } else if (Reg.hasCnChar(str)) {
                        if (role.national && (role.national.val() != 'CN' && role.national.val() != '中国大陆' && role.national.val() != '中国香港' && role.national.val() != '中国澳门' && role.national.val() != '中国台湾' && role.national.val() != '中文/拼音' && $.trim(role.national.val()) != '')) {
                            showTip('非中国国籍请输入英文姓名');
                            return false;
                        }
                        if ((me.role.national && me.checkForeign(me.role.national.attr('mod_value'))) || (this.role.idCardType && this.role.idCardType.val() == '1')) {
                            bl = Reg.checkCnName(str);
                            if (!bl[0]) {
                                showTip(bl[1]);
                                return false;
                            } else if (bl[1]) {
                                showTip(bl[1], {
                                    errorClass: ''
                                });
                            }
                        }
                        return true;
                    } else if (role.idCardType && role.idCardType.val() == 1) {
                        showTip('请保持姓名与证件上的姓名一致');
                        return false;
                    } else {
                        bl = Reg.checkEnName(str);
                        if (!bl[0]) {
                            showTip(bl[1]);
                            return false;
                        }
                        return true;
                    }
                },
                checkCnName: function (str) {
                    var me = this;
                    var nameCN = me.role.nameCN;
                    var strs = $.trim(str) === nameCN.attr('_cqnotice') ? '' : $.trim(str);
                    if ((me.role.national && me.checkForeign(me.role.national.attr('mod_value'))) || (this.role.idCardType && this.role.idCardType.val() == '1')) {
                        var bl = Reg.checkCnName(strs, $(nameCN).prop('required'));
                        if (!bl[0]) {
                            me.showTip(nameCN[0], bl[1]);
                            return false;
                        } else if (bl[1]) {
                            this.showTip(nameCN[0], bl[1], {
                                errorClass: ''
                            });
                        }
                    }
                    return true;
                },
                checkEnName: function (str) {
                    var strs = $.trim(str) === this.role.nameEN.attr('_cqnotice') ? '' : $.trim(str);
                    var bl = Reg.checkEnName(strs);
                    console.log(this);
                    if (!bl[0]) {
                        this.showTip(this.role.nameEN[0], bl[1]);
                        return false;
                    }
                    return true;
                },
                checkEnNameLast: function (str) {
                    //英文姓检测
                    var name = $.trim(str);
                    if (/[^a-zA-Z]/.test(name)) {
                        this.showTip(this.role.nameEnLast[0], [false, "英文姓只能包含字母，请检查"], { $obj: this.role.nameEnLast[0] });
                        return false;
                    }
                    return this.checkEnNameNew(name, this.role.nameEnLast);
                },
                checkEnNameFirst: function (str) {
                    //英文名检测
                    var name = $.trim(str);
                    if (/[^a-zA-Z]/.test(name)) {
                        this.showTip(this.role.nameEnFirst[0], [false, "英文名只能包含字母，请检查"], { $obj: this.role.nameEnFirst[0] });
                        return false;
                    }
                    return this.checkEnNameNew($.trim(str), this.role.nameEnFirst);
                },
                checkEnNameNew: function (str, obj, _bool) {
                    //英文单元检测
                    var role = this.role;
                    var strs = $.trim(str) === obj.attr('_cqnotice') ? '' : $.trim(str);
                    var bl = Reg.checkEnNameNew(strs, false);

                    if (!bl[0]) {
                        this.showTip(this.role.nameEnFirst[0], bl[1], { $obj: obj[0] });
                        return false;
                    }
                    return true;
                },
                checkForeign: function (str) {
                    if (!(str === "CN" || str === "HK" || str === "MO" || str === "TW")) {
                        if (this.role.idCardType && this.role.idCardType.val() != '1') {
                            this.role.nameCN && self.hideTip(this.role.nameCN[0]);
                        }
                        return false;
                    }
                    return true;
                },
                checkNationality: function (str) {
                    var role = this.role;
                    var type = this.getProdctType();
                    var national = $.trim(role.national.val());
                    if ('' === str || str === role.national.attr('_cqnotice')) {
                        this.showTip(role.national[0], '请选择旅客的国籍');
                        return false;
                    }
                    if (type === 2) { //境外产品
                        if (national === '中国香港' || national === '中国澳门') {
                            this.showTip(role.national[0], '若您持有中国香港、中国澳门签发的护照前往中国大陆境外，请您携带护照和有效的回乡证办理出境手续', {
                                errorClass: ''
                            });
                        }
                        if (national === '中国台湾') {
                            this.showTip(role.national[0], '若您持有中国台湾签发的护照前往中国大陆境外，请您携带护照和有效的台胞证办理出境手续', {
                                errorClass: ''
                            });
                        }
                        if (national.indexOf('中国') === -1) {
                            this.showTip(role.national[0], '若您持有外籍护照前往中国大陆境外，请确保持有再次进入中国大陆的有效签证', {
                                errorClass: ''
                            });
                        }
                    }
                    if (type === 1) {
                        if (national === '中国香港' || national === '中国澳门') {
                            this.showTip(role.national[0], '若您持有中国香港、中国澳门签发的护照在中国大陆境内旅行，请您携带护照和有效的回乡证办理登机与入住手续', {
                                errorClass: ''
                            });
                        }
                        if (national === '中国台湾') {
                            this.showTip(role.national[0], '若您持有中国台湾签发的护照在中国大陆境内旅行，请您携带护照和有效的台胞证办理登机和入住手续', {
                                errorClass: ''
                            });
                        }
                    }
                    this.checkIdCardType();
                    return true;
                },
                checkIdCard: function (str) {
                    var role = this.role;
                    var strs = str === role.idCardNo.attr('_cqnotice') ? '' : str;
                    var type = +this.getIdvalue();
                    var bl = Reg.checkIdCard(strs, type);
                    var data, tip;
                    if (!bl[0]) {
                        data = bl[1];
                    } else {
                        if (type === 1) {
                            var age = self.common.parseCNId(strs).passengerBirth;
                            tip = this.getAgeInfo(age);
                        }
                    }
                    if (data) {
                        this.showTip(role.idCardNo[0], data);
                        return false;
                    } else if (tip) {
                        if (!tip[0]) {
                            this.showTip(role.idCardNo[0], tip[1]);
                            return false;
                        } else if (tip[1]) {
                            this.showTip(role.idCardNo[0], tip[1], {
                                errorClass: ''
                            });
                        }
                    }
                    return true;
                },
                checkCardValidUntil: function (str, el) {
                    var data, target, reg;
                    var me = this;
                    var role = this.role;
                    // var index = role.cardValidUntil.index(event.target);
                    var elem = el;
                    var error = 0;
                    var index = $(elem).attr('role');
                    if ('' === str || $(elem).attr('_cqnotice') === str) {
                        data = '请填写证件有效期';
                        me.showTip(role.cardValidUntilD[0], data, {
                            $obj: elem
                        });
                        return false;
                    } else {
                        if (index === 'cardValidUntilY') {
                            reg = /^\d{4}$/;
                        }
                        if (index === 'cardValidUntilM') {
                            reg = /^(0?[1-9]|1[0-2])$/;
                        }
                        if (index === 'cardValidUntilD') {
                            reg = /^[0123]?\d$/;
                        }
                    }
                    if (reg && !reg.test(str)) {
                        data = '请填写正确的证件有效期，格式：yyyy-mm-dd';
                        error++;
                    }
                    if (data) {
                        me.showTip(role.cardValidUntilD[0], data, {
                            $obj: elem
                        });
                    } else {
                        self.hideTip(role.cardValidUntilD[0], {
                            $obj: elem
                        });
                    }
                    if (!error) {
                        var bl = this.getCardValidUntil();
                        if (bl) {
                            if (bl[0]) {
                                bl[1] && me.showTip(role.cardValidUntilD[0], bl[1], {
                                    errorClass: ''
                                });
                                self.hideTip(role.cardValidUntilY[0]);
                                self.hideTip(role.cardValidUntilM[0]);
                                role.cardValidUntilY.removeClass('f_error');
                                return true;
                            } else {
                                me.showTip(role.cardValidUntilD[0], bl[1], {
                                    $obj: role.cardValidUntilY[0],
                                    errorClass: 'f_error'
                                });
                                return false;
                            }
                        }
                    }
                    return true;
                },
                checkSex: function (str) {
                    var role = this.role;
                    if ('-1' == role.gender.val() || '' == $.trim(role.gender.val())) {
                        this.showTip(role.gender[0], '请选择性别');
                        return false;
                    }
                    return true;
                },
                checkBirthday: function (str, el) {
                    var data, target, reg;
                    var me = this;
                    var role = this.role;
                    var elem = el;
                    var index = $(elem).attr('role');
                    var error = 0;
                    if ('' === str || $(elem).attr('_cqnotice') === str) {
                        data = '请正确填写出生日期，格式：yyyy-mm-dd，且不得晚于出发日期';
                        me.showTip(role.birthdayD[0], data, {
                            $obj: elem
                        });
                        return false;
                    } else {
                        if (index === 'birthdayY') {
                            reg = /^\d{4}$/;
                        }
                        if (index === 'birthdayM') {
                            reg = /^(0?[1-9]|1[0-2])$/;
                        }
                        if (index === 'birthdayD') {
                            reg = /^[0123]?\d$/;
                        }
                    }
                    if (reg && !reg.test(str)) {
                        data = '请正确填写出生日期，格式：yyyy-mm-dd，且不得晚于出发日期';
                        error++;
                    }
                    if (data) {
                        me.showTip(role.birthdayD[0], data, {
                            $obj: elem
                        });
                    } else {
                        $(role.birthdayD).data('valid') &&
                            $(role.birthdayD).data('valid').hide({
                                $obj: elem
                            });
                    }
                    if (!error) {
                        var bl = this.getAgeInfo([role.birthdayY.val(), role.birthdayM.val(), role.birthdayD.val()].join('-'));
                        if (!bl[0]) {
                            me.showTip(role.birthdayD[0], bl[1], {
                                $obj: role.birthdayY[0]
                            });
                            return false;
                        } else if (bl[1]) {
                            me.showTip(role.birthdayD[0], bl[1], {
                                $obj: role.birthdayY[0],
                                errorClass: ''
                            });
                        } else {
                            role.birthdayY.removeClass('f_error'); //temp
                        }
                        return true;
                    }
                    return true;
                },
                checkMobile: function (str) {
                    var bl;
                    if ('' !== str) {
                        bl = Reg.checkMobile(str);
                        if (!bl[0]) {
                            this.showTip(this.role.mobileNo[0], bl[1]);
                            return false;
                        }
                    }
                    return true
                },
                // checkBirthPlace: function (str) {
                //     if ('' === str) {
                //         this.showTip(this.role.birthPlace[0], '请填写出生地');
                //         return false;
                //     }
                //     return true;
                // },
                checkMobileIsNull: function () {
                    var str = $.trim(this.role.mobileNo.val());
                    if ('' === str) {
                        this.showTip(this.role.mobileNo[0], '请至少填写一位出行人的手机号码');
                        return false;
                    }
                    return true;
                },
                linstenPickFill: function (bl) { //监听点选常用联系人
                    bl && this.filterInputs();
                    this.hideTip();
                },
                verify: function () {
                    var me = this;
                    var _ret = true;
                    var elem;
                    $.each(this.role, function (k, v) {
                        var reg, bl = true;
                        if ($(v).css('display') !== 'none' && $(v).closest('li').css('display') !== 'none') { //判断是否隐藏
                            if (reg = $(this).attr('regex')) {
                                bl = me[reg]($.trim($(this).val()), v);
                            }
                            if (!bl) {
                                _ret = false;
                                if (!elem) {
                                    elem = this;
                                }
                                // return false;
                            }
                        }
                    })
                    return [_ret, elem];
                }
            };
            return {
                init: function (arg) {
                    var me = this;
                    var data = arg.initData;
                    var customer = data.CustomerInfoTemplate && data.CustomerInfoTemplate.CustomerInfoItems;
                    if (!customer) return;
                    if (data.CustomerInfoTemplate.FillInNumberLimit && data.CustomerInfoTemplate.FillInNumberLimit.toLowerCase() === 'o' && (!vdata.ProductCategoryType || vdata.ProductCategoryType.toLowerCase() !== 'studytour')) {
                        data.aduNumber = 1;
                        data.chlidNumber = 0;
                    }
                    //if (vdata.ProductCategoryType) {
                    //    var visaType = vdata.ProductCategoryType.toLowerCase();
                    //    if (vdata.ProductCategoryType.toLowerCase() !== 'visa') {
                    //        $('.online_service').show();
                    //    }
                    //}
                    var _ref = this.handleData(data, customer);
                    var _obj = {
                        'list': _ref
                    };
                    if (data.Reminder) {
                        _obj.Reminder = data.Reminder;
                    }
                    self.render(self.tpl.traveller, _obj, function (dom) {
                        roles.travellersID.append(dom);
                    });


                    roles.fillsetID.show();
                    me.toIns();
                    me.bindEvent();
                    roles.bookInfoID.show();
                    require('./mod_book_calendar'); // 载入证件有效期，出生日期日历选择交互模块
                },
                handleHadData: function (data) {
                    var handle = function (v, arg) {
                        data[v + 'Y'] = arg[0] || '';
                        data[v + 'M'] = arg[1] || '';
                        data[v + 'D'] = arg[2] || '';
                        return data;
                    };
                    data.nameEN = data.ENLastName + '/' + data.ENFirstName + ' ' + data.ENMiddleName;
                    data = handle('birthday', data.birthday.split('-'));
                    data = handle('IDCardTimelimit', data.IDCardTimelimit.split('-'));
                    return data;
                },
                handleInfoTemplate: function (data) {
                    var _ret = {
                        idOptions: [],
                        cutomerOptions: []
                    };
                    var infoType = 'UserName|ChineseName|EnglishName|Nationality|IDType|IDNumber|CardValidUntil|Sex|Birthday|BirthPlace|ContactPhone|CustomerType';
                    $.map(infoType.split('|'), function (v, k) {
                        _ret[v] = '';
                    });
                    $.map(data, function (v, k) {
                        if (v.CustomerInfoItemModel === 1) {
                            _ret[v.CustomerInfoItemType] = v;
                        } else if (v.CustomerInfoItemModel === 2) {
                            if (v.CustomerInfoItemType == 1 && v.Note) { //身份证特殊提示
                                _ret.restrictions = v.Note;
                            }
                            if (!_ret.IDCardType) { //默认的证件类型
                                _ret.IDCardType = v.CustomerInfoItemType;
                            }
                            _ret.idOptions.push(v);

                        } else if (v.CustomerInfoItemModel === 3) {
                            //客户类型
                            if (!_ret.CustomerNoType) { //默认的证件类型
                                _ret.CustomerNoType = v.CustomerInfoItemType;
                            }
                            _ret.cutomerOptions.push(v);
                        }
                    });
                    if (_ret.idOptions.length) this.idCards = _ret.idOptions;
                    if (_ret.cutomerOptions.length) this.customerTypes = _ret.cutomerOptions;
                    return _ret;
                },
                handleData: function (data, customer) {
                    var template = this.handleInfoTemplate(customer);
                    var df = data.OrderPassengerList;
                    var adult = +data.aduNumber;
                    var child = +data.chlidNumber;
                    var _ret = [];
                    var dfData;
                    var me = this;
                    var ptype;
                    var handle = function (type) {
                        var __ret = [];
                        df && $.map(df, function (v) {
                            if (type === 'adult') {
                                if (+v.clientType) {
                                    __ret.push(me.handleHadData(v));
                                }
                            } else {
                                if (!(+v.clientType)) {
                                    __ret.push(me.handleHadData(v));
                                }
                            }
                        });
                        return __ret;
                    };
                    if (adult) {
                        dfData = handle('adult');
                        for (var _i = 0; _i < adult; _i++) {
                            if (dfData[_i]) {
                                _ret.push($.extend(cQuery.copy(template), dfData[_i], {
                                    isAdult: true,
                                    filled: 't'
                                }));
                                me.setTravellerCount(1, true);
                            } else {
                                _ret.push($.extend(cQuery.copy(template), {
                                    isAdult: true,
                                    filled: 'f'
                                }));
                            }
                        }
                    }
                    if (child) {
                        dfData = handle('child');
                        for (var _i = 0; _i < child; _i++) {
                            if (dfData[_i]) {
                                _ret.push($.extend(cQuery.copy(template), dfData[_i], {
                                    isAdult: false,
                                    filled: 't'
                                }));
                                me.setTravellerCount(0, true);
                            } else {
                                _ret.push($.extend(cQuery.copy(template), {
                                    isAdult: false,
                                    filled: 'f'
                                }));
                            }
                        }
                    }
                    return _ret;
                },
                handleBirthDay: function (person) { //确定出行人的出生日期
                    var _ret = null;
                    if (person.birthday) {
                        _ret = person.birthday;
                    } else if (person.IDCardType == 1 && person.IDCardNo) {
                        _ret = self.common.parseCNId(person.IDCardNo).passengerBirth;
                    }
                    return _ret;
                },
                linstenPickFill: function (el, bl) { //监听点选常用联系人bl:填写/清除
                    var index = roles.travellersID.children().index(el);
                    this.instances[index].linstenPickFill(bl);
                },
                bindEvent: function () {
                    var me = this;
                    var nameTips;
                    roles.travellersID.on('click', 'a[role="saveId"]', function () { //是否保存常用联系人
                        $(this).toggleClass('selected');
                    })
                        // .on('click', '[role="name"],[role="nameCN"],[role="nameEnLast"],[role="nameEnFirst"]', function (event) { //输入姓名提示/可选择中英名字
                        //     me.generateSug(this, $(this).attr('role'), nameTips);
                        // })
                        .on('click', 'a[role="clear"]', function () { //清除填写
                            me.fillClear.call(me, $(this).closest('[role="youren"]'));
                        });
                    me.fillin();
                },
                instances: [],
                // generateSug: function (el, role, nameTips) { //姓名提示
                //     nameTips && nameTips.remove();
                //     var _this = $(el);
                //     var offset = _this.offset(),
                //         height = _this.outerHeight(),
                //         id = _this.closest('[role="youren"]').attr('index'),
                //         _obj = id && mod.Commoners.commonersObj[id];
                //     var obj = _obj ? _obj : {}; //取得选定常用联系人的信息
                //     self.render(self.tpl[role + 'Tips'], obj, function (dom) {
                //         nameTips = $(dom).appendTo('body').css({
                //             'position': 'absolute',
                //             'top': offset.top + height,
                //             'left': offset.left
                //         });
                //     }, function () {
                //         nameTips.on('mousedown', '.had', function (event) {
                //             _this.val($(this).find('.name').html());
                //             nameTips.hide();
                //         });
                //         _this.bind('blur', function () {
                //             nameTips && nameTips.remove();
                //         });
                //     });
                // },
                toIns: function () {
                    var me = this;
                    roles.travellersID.children().each(function () {
                        me.instances.push(new Visitor({
                            element: this,
                            departDate: vdata.initData.departDate,
                            returnDate: vdata.initData.returnDate
                        }));
                    });
                },
                getTravellers: function () { //获取填写好的出行人
                    var _oarr = [],
                        _obj;
                    var role = self.common.getRoles(roles.travellersID[0]);
                    role.youren.each(function (idx) {
                        _obj = {}
                        if ($(this).attr('filled') === 'f')
                            return true;
                        var _this = $(this),
                            name;
                        if (_this.attr('filled') === 't') {
                            _obj.clientID = _this.attr('index') || '';
                            if (role.name) {
                                if (role.name[idx].value != $(role.name[idx]).attr('_cqnotice')) {
                                    name = role.name[idx].value;
                                } else {
                                    name = "";
                                }
                            }
                            _obj.name = name;
                            _obj.nameCN = role.nameCN && role.nameCN[idx].value || _obj.name;
                            _obj.nameEN = role.nameEN && role.nameEN[idx].value;
                            _obj.mobileNo = role.mobileNo && role.mobileNo[idx].value;
                        }
                        _oarr.push(_obj);
                    });
                    return _oarr;
                },
                fillin: function () { //手动填写订票信息
                    var roles = vdata.roles;
                    var me = this;
                    var val;
                    var isFilled = function (role) { //是否已经填充
                        for (var i in role) {
                            if (role[i].closest('li').css('display') !== 'none') {
                                val = $.trim(role[i].val());
                                if (val !== '' && role[i][0].tagName.toLowerCase() !== 'select' && val !== role[i].attr('_cqnotice')) {
                                    return true;
                                }
                            }
                        }
                        return false;
                    };
                    roles.travellersID.on('change', 'input[type="text"]', function () {
                        var elem = $(this).closest('.product_input');
                        var role = self.common.getRoles(elem[0]);
                        var id;
                        var val = $(this).val();
                        var ptype = elem.attr('ptype');
                        this.setAttribute('value', val); //改变dom元素中value的值
                        if (isFilled(role)) {
                            if (elem.attr('filled') === 't') return;
                            elem.attr({
                                'filled': 't'
                            });
                            me.setTravellerCount(+ptype, true);
                        } else {
                            elem.attr({
                                'filled': 'f'
                            });
                            //更新常用人的选择
                            if (id = elem.attr('index')) {
                                ptype = mod.Commoners.commonersDom.find('a.cb-item[cid="' + id + '"]').attr('ptype');
                                elem.attr({
                                    'index': ''
                                });
                                mod.Commoners && mod.Commoners.removeCommonerSelected.call(mod.Commoners, id);
                                me.setTravellerCount(+ptype, false);
                            } else {
                                ptype = elem.attr('ptype');
                                me.setTravellerCount(ptype, false);
                            }
                        }
                    });
                },
                fillClear: function () { //清除填写和保存常用联系人
                    var role,
                        wrap,
                        id,
                        ptype,
                        rptype;
                    if (!arguments.length) return;
                    wrap = arguments[0];
                    if (wrap.attr('filled') === 'f') return;
                    id = wrap.attr('index'); //常用联系人id
                    rptype = ptype = wrap.attr('ptype');
                    role = self.common.getRoles(wrap);
                    for (var i in role) { //清除填写
                        if (role[i].attr('role') === 'idCardType' || role[i].attr('role') === 'CustomerType')
                            continue;
                        role[i][0].setAttribute('value', '');
                        role[i].val('')
                    }
                    wrap.attr({
                        index: '',
                        filled: 'f'
                    }); //重置填写标志
                    if (id) {
                        mod.Commoners.removeCommonerSelected.call(mod.Commoners, id);
                        rptype = mod.Commoners.commonersDom && mod.Commoners.commonersDom.find('a.cb-item[cid="' + id + '"]').attr('ptype');
                    }
                    this.linstenPickFill(wrap, !1);
                    this.setTravellerCount(+rptype, false, ptype);
                },
                setDataLayout: function () {
                    var params = 'PassengerId|Name|CnName|Nationality|Gender|Birthday|HomePlace|MobilePhone|AgeRang';
                    var subpara = 'IdCardType|IdCardNo|PassportType|IdCardValidDate|IssueDate|IssuePlace'
                    var _tbj = {
                        EnName: {
                            "First": "",
                            "Mid": "",
                            "Last": ""
                        },
                        IdCardInfo: {}
                    };
                    $.map(params.split('|'), function (v, k) {
                        if (v == 'Gender') {
                            _tbj[v] = -1;
                        } else {
                            _tbj[v] = '';
                        }
                    });
                    _tbj.Gender = -1;
                    $.map(subpara.split('|'), function (v, k) {
                        if (v == 'IdCardType') {
                            _tbj.IdCardInfo[v] = 0;
                        } else {
                            _tbj.IdCardInfo[v] = '';
                        }

                    });
                    return _tbj;
                },
                setData: function (elem, role) {
                    var role = role || self.common.getRoles(elem);
                    var uid = $(elem).attr('index');
                    var _obj = this.setDataLayout();
                    var _info;
                    _obj.PassengerId = uid ? uid : 0;
                    _obj.AgeRang = +$(elem).attr('ptype');
                    _obj.isSaveTo = role.saveId.hasClass('selected') ? 1 : 0;
                    $.each(role, function (k, v) {
                        var val;
                        if (k !== 'clear' && k !== 'saveId') {
                            val = $.trim(v.val());
                            switch (k) {
                                case 'name':
                                    var tn;
                                    _obj.Name = val === v.attr('_cqnotice') ? '' : val;
                                    if (_obj.Name) {
                                        if (Reg.hasCnChar(_obj.Name)) {
                                            _obj.CnName = _obj.Name;
                                        } else {
                                            tn = _obj.Name.split('/');
                                            if (tn.length > 1) {
                                                _obj.EnName = {
                                                    Last: tn[0],
                                                    First: tn[1] && tn[1].split(/\s+/)[0],
                                                    Mid: tn[1] && tn[1].indexOf(' ') != -1 && tn[1].substring(tn[1].indexOf(' ')) || ''
                                                };
                                            }
                                        }
                                    }
                                    break;
                                case 'nameCN':
                                    _obj.CnName = val === v.attr('_cqnotice') ? '' : val;
                                    break;
                                case 'CustomerType':
                                    _obj.CustomerType = val;
                                    break;
                                case 'nameEN':
                                    var tname = val === v.attr('_cqnotice') ? '' : val.split('/');
                                    var mname = (tname && tname[1] && tname[1].split(/\s+/)) || '';
                                    _obj.EnName = {
                                        Last: (tname && tname[0]) || '',
                                        First: mname && mname[0],
                                        Mid: (mname && mname[1]) || ''
                                    };
                                    break;
                                case 'nameEnFirst':
                                    //提交时英文名添加
                                    var tname = val === v.attr('_cqnotice') ? '' : val;
                                    var divideIndex = tname.indexOf(' ');
                                    firstName = (divideIndex != -1 && $.trim(tname.substring(0, divideIndex))) || tname;
                                    midName = (divideIndex != -1 && $.trim(tname.substring(divideIndex)));
                                    _obj.EnName = $.extend(_obj.EnName || {}, {
                                        First: firstName || '',
                                        Mid: midName || ''
                                    });
                                    break;
                                case 'nameEnLast':
                                    //提交时英文姓添加
                                    var tname = val === v.attr('_cqnotice') ? '' : val;
                                    _obj.EnName = $.extend(_obj.EnName || {}, {
                                        Last: tname || ''
                                    });
                                    break;
                                case 'national':
                                    _obj.Nationality = val === v.attr('_cqnotice') ? '' : v.attr('mod_value');
                                    break;
                                case 'gender':
                                    _obj.Gender = val || -1;
                                    break;
                                case 'birthdayY':
                                    _obj.Birthday = val === v.attr('_cqnotice') ? '' : val;
                                    break;
                                case 'birthdayM':
                                    _obj.Birthday += (val !== v.attr('_cqnotice') && val !== '') ? '-' + val : '';
                                    break;
                                case 'birthdayD':
                                    _obj.Birthday += (val !== v.attr('_cqnotice') && val !== '') ? '-' + val : '';
                                    break;
                                case 'birthPlace':
                                    _obj.HomePlace = val;
                                    break;
                                case 'idCardType':
                                    _obj.IdCardInfo.IdCardType = val || 0;
                                    break;
                                case 'idCardNo':
                                    _obj.IdCardInfo.IdCardNo = val === v.attr('_cqnotice') ? '' : val;
                                    break;
                                case 'cardValidUntilY':
                                    _obj.IdCardInfo.IdCardValidDate = val === v.attr('_cqnotice') ? '' : val;
                                    break;
                                case 'cardValidUntilM':
                                    _obj.IdCardInfo.IdCardValidDate += (val !== v.attr('_cqnotice') && val !== '') ? '-' + val : '';
                                    break;
                                case 'cardValidUntilD':
                                    _obj.IdCardInfo.IdCardValidDate += (val !== v.attr('_cqnotice') && val !== '') ? '-' + val : '';
                                    break;
                                case 'mobileNo':
                                    _obj.MobilePhone = val;
                                    break;
                            }
                        }
                    });
                    _obj.IssueDate = '1900-01-01';
                    _obj.IssuePlace = '';
                    if (_obj.IdCardInfo.IdCardType == 2) {
                        _obj.PassportType = 'P';
                    } else {
                        _obj.PassportType = '';
                    }
                    if (_obj.IdCardInfo.IdCardType == 1) {
                        if (_obj.IdCardInfo.IdCardNo.length > 14) {
                            _info = self.common.parseCNId(_obj.IdCardInfo.IdCardNo);
                            _obj.Gender = _info.passengerSex === 'F' ? 1 : 0;
                            _obj.Birthday = _info.passengerBirth;
                        } else {
                            _obj.Gender = -1;
                            _obj.Birthday = '';
                        }
                    }
                    return _obj;
                },
                verify: function () {
                    var _ret = true;
                    var mobile = false;
                    $.each(this.instances, function (k, v) {
                        var arg = v.verify();
                        if (!mobile) {
                            if (!v.role.mobileNo || v.role.mobileNo.val() != '') {
                                mobile = true;
                            }
                        }
                        if (!arg[0]) {
                            if (!self.status.errorElem)
                                self.status.errorElem = arg[1];
                            _ret = false;
                            // return false;
                        }
                    });
                    if (!mobile) {
                        this.instances[0].checkMobileIsNull();
                        if (!self.status.errorElem) {
                            self.status.errorElem = this.instances[0].role.mobileNo[0];
                        }
                        _ret = false;
                        // return false;
                    }
                    if (_ret) {
                        this.save(!0);
                    }
                    return _ret;
                },
                save: function (isSubmit) {
                    var me = this;
                    var elems = isSubmit ? roles.travellersID.children() : roles.travellersID.children('[filled="t"]');
                    self.formData.PassengerInfos.length = 0;
                    elems.each(function () {
                        self.formData.PassengerInfos.push(me.setData(this));
                    });
                },
                setTravellerCount: function (type, isAdd, add) {
                    if (isAdd) {
                        if (type == 0 || (add && add == 0))
                            this.childCount.length++;
                        else if (type == 1 || (add && add == 1))
                            this.adultCount.length++
                        this.travellerCount.length++;
                    } else {
                        if (type == 0 || (add && add == 0))
                            this.childCount.length--;
                        else if (type == 1 || (add && add == 1))
                            this.adultCount.length--
                        this.travellerCount.length--;
                    }
                },
                idCards: [],
                customerTypes: [],
                adultCount: [], //已选择成人个数
                childCount: [], //已选择儿童个数
                travellerCount: [] //已选择的旅客个数
            }
        },
        Commoners: function () { //常用联系人
            var self = this,
                vdata = self.data,
                cache = vdata.cache,
                roles = vdata.roles,
                mod = vdata.modules,
                parseJSON = self.common.parseJSON;
            return {
                commonersObj: {}, //常用联系人数据
                allCommoners: null, //原始的常用联系人
                init: function () {
                    var me = this;
                    if (!vdata.isLogin) {
                        $('#searchID').hide();
                        (mod['Contacter'] = self.Contacter.call(self)).init();
                        return;
                    }
                    self.toggleLoading('commoner', roles.commonersID[0]);
                    self.toggleLoading('contact', roles.linkManID[0]); //联系人
                    self.fetchData({
                        url: vdata.handles.getContacts
                    }, function (data) {
                        var _data, _obj, _ref;
                        data = typeof data === 'string' ? parseJSON(data) : data;
                        _data = data.data;
                        if (_data && _data.ContactLst) {
                            _ref = _data.ContactLst;
                        } else {
                            _ref = null;
                        }
                        (mod['Contacter'] = self.Contacter.call(self)).init(_ref); //调用常用联系人
                        if (!_data || !_data.PassengerLst) {
                            $('#searchID').hide();
                            roles.commonersID.hide();
                            return;
                        }
                        me.allCommoners = data.data;
                        _obj = me.handleData(_data.PassengerLst);
                        var obj = {
                            collecters: _obj
                        };
                        obj.collecters.length && self.render(self.tpl.commoners, obj, function (dom) {
                            roles.commonersID.html(dom);
                            me.bindEvent.call(me);
                            me.commonersDom = roles.commonersID.children();
                        });
                        self.toggleLoading('commoner');
                        me.search();
                    })
                },
                handleData: function (_data) { //处理数据以供渲染
                    var me = this;
                    var oBirth = new Birth('', vdata.initData.departDate);
                    var dfMan = vdata.initData.OrderPassengerList;
                    var _ref = [];
                    var age;
                    if (dfMan) {
                        $.map(dfMan, function (v, k) {
                            _ref.push(v.clientID);
                        });
                    }
                    $.map(_data, function (v, k) {
                        if (_ref.length) {
                            if ($.inArray(v.clientID, _ref) !== -1)
                                _data[k].selected = true;
                        }
                        age = me.handleBirthDay(v);
                        if (age) {
                            if (oBirth.isChild(age)) {
                                _data[k].ptype = 0;
                            } else {
                                _data[k].ptype = 1;
                            }
                        } else {
                            _data[k].ptype = 3;
                        }
                        me.commonersObj[v.clientID] = _data[k];
                    });
                    return _data;
                },
                handleBirthDay: function (person) { //确定出行人的出生日期
                    var _ret = null;
                    if (person.birthday) {
                        _ret = person.birthday;
                    } else if (person.IDCardInfo) {
                        $.each(person.IDCardInfo, function (k, v) {
                            if (v.IDCardType == 1) {
                                _ret = v.IDCardNo;
                                return false;
                            }
                        });
                        if (_ret) {
                            _ret = self.common.parseCNId(_ret).passengerBirth;
                        }
                    }
                    return _ret;
                },
                search: function () { //常用联系人搜索
                    var me = this;
                    var _obj = me.commonersObj;
                    var _lis = roles.commonersID.find('li');
                    roles.searchID.length && roles.searchID.bind('keyup', function (event) {
                        var tempObj = [];
                        var val = $.trim($(this).val()).toLowerCase();
                        var i = 0;
                        if (!val) { //恢复全部
                            _lis.show();
                            return false;
                        }
                        _lis.hide();
                        $.each(_lis, function () {
                            var _ref = _obj[$(this).attr('cid')];
                            var name = ((_ref.nameCN + (_ref.ENLastName + _ref.ENFirstName + _ref.ENMiddleName)) || '').toLowerCase();
                            if (name.indexOf(val) != -1) {
                                $(this).show();
                            }
                        });
                    });
                },
                bindEvent: function () { //点选出行人
                    var me = this;
                    if (!roles.travellersID.children().length) return;
                    roles.fillsetID.on('click', '[role="topContact"]', function (event) { //?=====
                        event.preventDefault();
                        var bl = $(this).hasClass('selected');
                        me.fillVisitor(this, bl);
                        me.commonersDom = roles.commonersID.children(); //更新常用联系人dom
                    });
                },
                checkFullNNT: function (type) { //检查人数是否已满
                    var count = mod.Travellers[type + 'Count'].length;
                    if (type === 'adult') {
                        return count >= vdata.initData.aduNumber;
                    } else if (type === 'child') {
                        return count >= vdata.initData.chlidNumber;
                    } else {
                        return count >= vdata.initData.aduNumber + vdata.initData.chlidNumber;
                    }
                },
                showTip: function (el, obj, data, opts) {
                    var ovalid = $(el).data('valid');
                    opts = $.extend({
                        target: obj,
                        data: data
                    }, opts || {});
                    ovalid = ovalid ? ovalid.show(opts) :
                        new self.validate(opts).show();
                    $(el).data('valid', ovalid);
                },
                fillVisitor: function (el, bl) { //填充及清除出行人信息
                    var _this = $(el);
                    var me = this;
                    var id = $(el).attr('cid');
                    var target = $(el).children('span');
                    var abled, role, isFull = false;
                    var ptype = _this.attr('ptype');
                    var msg = ['儿童人数已满', '成人人数已满', '旅客中没有儿童', '旅客已满'];
                    var data = ptype;
                    var add;
                    if (ptype === '0') {
                        isFull = me.checkFullNNT('child');
                        if (!vdata.initData.chlidNumber) {
                            data = 2;
                        }
                    } else if (ptype === '1') {
                        isFull = me.checkFullNNT('adult');
                    } else {
                        isFull = me.checkFullNNT('traveller');
                        data = 3;
                    }
                    if (!bl) {
                        if (isFull) {
                            this.showTip(roles.commonersID[0], target[0], msg[data], {
                                errorClass: '',
                                isAutoHide: true
                            });
                            return;
                        }
                        _this.addClass('selected');
                        if (ptype !== '3') {
                            abled = roles.travellersID.find('[filled="f"][ptype="' + ptype + '"]').eq(0);
                        } else {
                            abled = roles.travellersID.find('[filled="f"]').eq(0);
                            add = abled.attr('ptype');
                        }
                        role = self.common.getRoles(abled);
                        abled.attr({
                            'index': id,
                            'filled': 't'
                        });
                        this.setValue(role, id);
                        mod.Travellers.setTravellerCount(+ptype, true, add);
                        mod.Travellers.linstenPickFill(abled, !0);
                    } else {
                        _this.removeClass('selected');
                        abled = roles.travellersID.find('[index=' + id + ']');
                        mod.Travellers.fillClear.call(mod.Travellers, abled); //清除填写及标志
                        mod.Travellers.linstenPickFill(abled, !1);
                    }
                },
                setValue: function (role, id) {
                    var me = this;
                    var limitedTime = [];
                    var obj = me.commonersObj[id];
                    var birthday = obj.birthday ? obj.birthday.split('-') : [];
                    var val = "",
                        idcard = '';
                    $.each(role, function (k, v) {
                        if (v.attr('role') === 'name') {
                            if (obj.nameCN) {
                                val = obj.nameCN;
                            } else if (obj.ENFirstName) {
                                val = obj.ENLastName + '/' + obj.ENFirstName + ' ' + obj.ENMiddleName;
                            } else {
                                val = "";
                            }
                        } else if (v.attr('role') === 'nameEN') {
                            if (obj.ENFirstName) {
                                val = obj.ENLastName + '/' + obj.ENFirstName + ' ' + obj.ENMiddleName;
                            } else {
                                val = '';
                            }
                        } else if (v.attr('role') === 'nameEnFirst') {
                            if (obj.ENFirstName) {
                                val = obj.ENFirstName;
                                if (obj.ENMiddleName) {
                                    val += ' ' + obj.ENMiddleName
                                }
                            } else {
                                val = '';
                            }
                        } else if (v.attr('role') === 'nameEnLast') {
                            if (obj.ENFirstName) {
                                val = obj.ENLastName;
                            } else {
                                val = '';
                            }
                        } else if (v.attr('role') === 'national') {
                            if (obj.national) {
                                val = vdata.nationalData[obj.national];
                                v.attr('mod_value', obj.national);
                            } else {
                                val = '';
                                v.attr('mod_value', '');
                            }
                        } else if (v.attr('role') === 'idCardType') {
                            var va = v.val();
                            var ids = me.checkIdcard(id, va);
                            if (ids) {
                                v.val(va = ids.IDCardType);
                                idcard = ids.IDCardNo;
                                limitedTime = ids.IDCardTimelimit ? ids.IDCardTimelimit.split('-') : [];
                            }
                            val = va;
                        } else if (v.attr('role') === 'CustomerType') {
                            var va = v.val();
                            if (obj.CustomerType && me.checkCustomers(obj.CustomerType)) {
                                v.val(va = obj.CustomerType);
                            }
                            val = va;
                        } else if (v.attr('role') === 'idCardNo') {
                            val = idcard;
                        } else if (v.attr('role') === 'cardValidUntilY') {
                            val = limitedTime[0] || '';
                        } else if (v.attr('role') === 'cardValidUntilM') {
                            val = limitedTime[1] || '';
                        } else if (v.attr('role') === 'cardValidUntilD') {
                            val = limitedTime[2] || '';
                        } else if (v.attr('role') === 'birthdayY') {
                            val = birthday[0] || '';
                        } else if (v.attr('role') === 'birthdayM') {
                            val = birthday[1] || '';
                        } else if (v.attr('role') === 'birthdayD') {
                            val = birthday[2] || '';
                        } else if (v.attr('role') === 'birthPlace') {
                            val = obj.HomePlace !== null ? obj.HomePlace : '';
                        } else {
                            val = obj[k] !== null ? obj[k] : '';
                        }
                        v.val(val);
                        v[0].setAttribute('value', val);
                    });
                },
                checkCustomers: function (customerType) {
                    var initData = vdata.initData.CustomerInfoTemplate.CustomerInfoItems
                    for (var i = 0, len = initData.length; i < len; i++) {
                        if (initData[i].CustomerInfoItemModel === 3 && initData[i].CustomerInfoItemType == customerType) {
                            return true;
                        }
                    }
                    return false;
                },
                checkIdcard: function (id, type) {
                    var ids = this.commonersObj[id].IDCardInfo;
                    var cards = mod.Travellers.idCards;
                    var _ref = {};
                    var _ret;
                    if (!ids || !cards.length) return false;
                    $.map(cards, function (v, k) {
                        _ref[v.CustomerInfoItemType] = v;
                    });
                    if (type) {
                        $.map(ids, function (v, k) {
                            if (v.IDCardType == type) {
                                _ret = v;
                                return false;
                            }
                        })
                    } !_ret && $.map(ids, function (v, k) {
                        if (v.IDCardType in _ref) {
                            _ret = v;
                            return false;
                        }
                    })
                    return _ret;
                },
                removeCommonerSelected: function (id) { //去除常用联系人的选择
                    var commoners = this.commonersDom;
                    if (!commoners) return;
                    commoners.find('a.cb-item[cid="' + id + '"]').removeClass('selected'); //找到对应的常用联系人并取消选择
                }
            }
        },
        Contacter: function () { //联系人
            var self = this,
                vdata = self.data,
                mod = vdata.modules,
                roles = vdata.roles,
                oValidate = self.validate,
                oLinkman = vdata.initData.orderLinkMan || {},
                oBoard, isEmpty,
                Reg = self.Reg;
            return {
                init: function (data) {
                    var me = this;
                    me.commonContacters = {};
                    self.toggleLoading('contact');
                    this.commonContact = data ? data : null;
                    if (this.commonContact) {
                        $.map(this.commonContact, function (v, k) {
                            me.commonContacters[v.InfoID] = v;
                        })
                    }
                    if ($.isEmptyObject(oLinkman) && data) {
                        oLinkman = this.handleData(data);
                    }
                    if (vdata.initData.IsVisa) {
                        //添加验证邮件是否是签证页面
                        $.extend(oLinkman, { IsVisa: vdata.initData.IsVisa });
                    }
                    if (isEmpty = !$.isEmptyObject(oLinkman)) {
                        self.render(self.tpl.linkmanDf, oLinkman, function (dom) {
                            roles.linkManID.append(dom);
                        });
                        self.formData.ContactInfo = me.setData(oLinkman);
                    }
                    self.render(self.tpl.linkmanBox, oLinkman, function (dom) {
                        var tlin = $(dom).appendTo(roles.linkManID).hide();
                        !isEmpty && tlin.show();
                    });
                    $.extend(roles, self.common.getRoles(roles.linkManID));
                    this.bindEvent();
                    this.bindVerifyEvent();
                },
                handleData: function (data) {
                    var _ret = {};
                    if (data) {
                        _ret = {
                            name: data[0].ContactName || '',
                            email: data[0].Email || '',
                            mobileNo: data[0].Moblie || '',
                            telNo: data[0].Tel.replace('*', '-')
                        };
                    }
                    return _ret;
                },
                setData: function (data) {
                    return {
                        ContactName: data.name,
                        ContactEmail: data.email,
                        ContactMobile: data.mobileNo,
                        ContactTel: data.telNo
                    };
                },
                fill: function (name, email, phone, tel) {
                    var t;
                    roles.ctname[0].value = name;
                    roles.ctemail[0].value = email;
                    if (phone) {
                        roles.ctmphone[0].value = phone;
                    } else {
                        roles.ctmphone[0].value = '';
                    }
                    if (tel) {
                        t = tel.split('-');
                        roles.ctzcode[0].value = t[0];
                        roles.cttphone[0].value = t[1];
                        roles.ctext[0].value = t[2] || '';
                    } else {
                        roles.ctzcode[0].value = '';
                        roles.cttphone[0].value = '';
                        roles.ctext[0].value = '';
                    }
                },
                initSug: function () {
                    var oc = this.commonContact;
                    var ob = this.oBoard = mod.Travellers.getTravellers();
                    var oca = [],
                        sug = '',
                        _i = 0;
                    oc && $.each(oc, function (k, v) {
                        if (_i > 5) return false;
                        oca.push(v);
                        _i++;
                    });
                    if (oc || ob.length) {
                        sug = self.render(self.tpl.linkerSug, {
                            common: oca.length ? oca : '',
                            board: ob.length ? ob : ''
                        });
                    }
                    return sug;
                },
                bindEvent: function () {
                    var sugg;
                    var me = this;
                    var logTip;
                    roles.contact.on('click', 'input[role="ctname"]', function () {
                        var offset = $(this).offset();
                        var height = $(this).outerHeight();
                        var sug = me.initSug();
                        $('.person_content').remove();
                        if (sug) {
                            sugg = $(sug).appendTo('body').css({
                                'position': 'absolute',
                                'top': offset.top + height,
                                'left': offset.left,
                                'zIndex': '100'
                            });
                            sugg.on('mousedown', 'a', function (event) {
                                var uid = $(this).attr('uid');
                                var index = $(this).attr('index');
                                var ref;
                                var obj = (function () {
                                    if (uid) {
                                        ref = me.commonContacters[uid];
                                        return {
                                            name: ref.ContactName,
                                            email: ref.Email,
                                            mobileNo: ref.Moblie,
                                            tel: ref.Tel ? ref.Tel.replace('*', '-') : ''
                                        }
                                    } else {
                                        return me.oBoard[index];
                                    }
                                }());
                                var name = obj.name || obj.nameCN || obj.nameEN || '';
                                var email = obj.email || '';
                                var phone = obj.mobileNo || '';
                                var tel = obj.tel || '';
                                me.fill(name, email, phone, tel);
                            });
                            $(this).bind('blur', function () {
                                sugg && sugg.hide();
                            });
                        }
                    });
                    roles.linkManID.on('click', 'a.revise', function (event) {
                        event.preventDefault();
                        $(this).closest('ul').hide();
                        roles.contact.show();
                    });
                },
                bindVerifyEvent: function () {
                    var me = this;
                    roles.contact.on('blur', 'input[type="text"]', function () {
                        me.errTip(this);
                    });
                },
                errTip: function (el) {
                    var _el = $(el),
                        val = $.trim(_el.val()),
                        reg = _el.attr('regex'),
                        ovalid = _el.data('valid'),
                        ret = false,
                        type = reg === 'checkPhone' ? _el.attr('role').slice(2) : '';
                    bl = this[reg](val, type);
                    if (reg === 'checkMobile' && val === '')
                        return true;
                    if (reg === 'checkPhone' && val === '')
                        return true;
                    if (!bl[0]) {
                        ovalid = this.showTip(ovalid, el, bl[1]);
                    } else {
                        ovalid && ovalid.hide();
                        ret = true;
                        if (bl[1]) {
                            ovalid = this.showTip(ovalid, el, bl[1], {
                                errorClass: ''
                            });
                        }
                    }
                    _el.data('valid', ovalid);
                    return ret;
                },
                showTip: function (valid, target, data, opts) {
                    opts = opts || {};
                    return valid ? valid.show($.extend({
                        target: target,
                        data: data
                    }, opts)) :
                        new oValidate($.extend({
                            target: target,
                            data: data
                        }, opts)).show();
                },
                save: function () {
                    var role = self.common.getRoles(roles.linkManID);
                    var zcode = $.trim(role.ctzcode.val()),
                        tphone = $.trim(role.cttphone.val()),
                        ext = $.trim(role.ctext.val());
                    var tel = (function () {
                        if (zcode && zcode !== role.ctzcode.attr('_cqnotice')) {
                            tphone = (tphone && tphone !== role.cttphone.attr('_cqnotice')) ? '-' + tphone : '';
                            ext = (tphone && ext) ? '-' + ext : '';
                            return zcode + tphone + ext;
                        }
                        return '';
                    }());
                    self.formData.ContactInfo = {
                        "ContactName": role.ctname.val(),
                        "ContactMobile": role.ctmphone.val(),
                        "ContactTel": tel,
                        "ContactEmail": role.ctemail.val()
                    };
                },
                checkName: function (str) {
                    var bl;
                    if ('' === str)
                        return [false, '请填写联系人姓名'];
                    if (Reg.hasCnChar(str)) {
                        if (!/^[\u4e00-\u9fa5a-zA-Z-]+$/.test(str))
                            return [false, '中文姓名只能包含汉字、字母和连字符，请检查'];
                    } else {
                        if (!Reg.isEnName(str) || /[^a-zA-Z. \/'-]/.test(str)) {
                            return [false, '请填写正确的英文姓名，姓名格式为姓/名，姓与名之间用/分隔，如Green/Jim King'];
                        }
                    }
                    return [true, ];
                },
                checkEmail: function (str) {
                    if ('' === str)
                        return [false, '请填写您的E-mail地址'];
                    if (!/^([a-zA-Z0-9]+[_|\_|\.|-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.|-]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(str))
                        return [false, '请填写正确的E-mail地址，格式：a@b.c'];
                    return [true, ];
                },
                checkMobile: function (str) {
                    // if ('' === str)
                    //     return [false, '手机号码或联系电话至少选填一项'];
                    // if (!/^0?1[3458]\d{9}$/.test(str))
                    //     return [false, '您填写的手机号码有误，请重新填写'];
                    if (str === '' && ($('#notice3').val() === '')) {
                        return [false, '手机号码或联系电话至少选填一项'];
                    } else if (str && !/^0?1[34578]\d{9}$/.test(str)) {
                        return [false, '您填写的手机号码有误，请重新填写'];
                    }
                    return [true, ];
                },
                checkPhone: Reg.checkPhone,
                verify: function () {
                    var me = this;
                    var status = self.status;
                    var error = 0;
                    var _data = {};
                    var bl;
                    var ovalid;
                    var phoneVal = '';
                    var isPhoneFilled = function () {
                        var bl = false;
                        var el, val;
                        $.map(['ctzcode', 'cttphone', 'ctext'], function (v, k) {
                            el = roles[v];
                            val = $.trim(el.val());
                            if (val !== '' && val !== el.attr('_cqnotice')) {
                                bl = true;
                                return false;
                            }
                        })
                        return bl;
                    };
                    // if (roles.contact[0].style.display !== 'block') return true;
                    var elems = [roles.ctname, roles.ctemail];
                    var ext;
                    if (isPhoneFilled()) {
                        elems.push(roles.ctzcode, roles.cttphone, roles.ctext);
                        if (!!roles.ctmphone[0].value) {
                            elems.push(roles.ctmphone);
                        }
                        ext = $.trim(roles.ctext.val());
                        phoneVal = $.trim(roles.ctzcode.val()) + '-' + $.trim(roles.cttphone.val()) + (ext !== roles.ctext.attr('_cqnotice') && ext !== '' ? '-' + roles.ctext.val() : '')
                    } else {
                        elems.push(roles.ctmphone);
                    }
                    $.each(elems, function (k, v) {
                        ovalid = v.data('valid');
                        bl = me[v.attr('regex')]($.trim(v.val()), v.attr('role').slice(2));
                        if (!bl[0]) {
                            error++;
                            ovalid = me.showTip(ovalid, v[0], bl[1]);
                            if (!status.errorElem) {
                                status.errorElem = v[0];
                            }
                            v.data('valid', ovalid);
                            return false;
                        } else {
                            if (status.errorElem === v[0]) {
                                status.errorElem = null;
                            }
                            if (bl[1]) {
                                ovalid = me.showTip(ovalid, v[0], bl[1], {
                                    errorClass: ''
                                });
                                v.data('valid', ovalid);
                            }
                        }
                    });
                    if (!error) {
                        self.formData.ContactInfo = {
                            ContactName: roles.ctname.val(),
                            ContactEmail: roles.ctemail.val(),
                            ContactMobile: roles.ctmphone.val(),
                            ContactTel: phoneVal
                        };
                    }
                    return !error;
                }
            }
        },
        Price: function () {
            var self = this,
                vdata = self.data,
                roles = vdata.roles;
            return {
                init: function () {
                    var data;
                    var me = this;
                    var coupon = vdata.initData.availablePromotion;
                    if (data = vdata.initData.price) {
                        vdata.Amount = data.Amount + data.DiscountAmount - parseInt(data.Freight);
                        vdata.postage = parseInt(data.Freight);
                        if (coupon && coupon.SelectedPromotion) {
                            vdata.couponPrice = data.DiscountAmount - Math.abs(parseInt(coupon.SelectedPromotion.ReducedAmount));
                        } else {
                            vdata.couponPrice = data.DiscountAmount;
                        }
                        if (data.ChildNumber) {
                            data.ChildAmount = Math.ceil(data.ChildAmount / data.ChildNumber);
                        }
                        if (data.AduNumber) {
                            data.AduAmount = Math.ceil(data.AduAmount / data.AduNumber);
                        }
                        data.isTempSave = vdata.EnableTemporarySave || !vdata.isQuickLogin ? true : false;
                        if (GV.app.order.vars.initData.OrderType.indexOf("CruiseOrder") != -1) {
                            self.render(self.tpl.priceCur, $.extend(data, {
                                ChatUrl: vdata.initData.ChatUrl
                            }), function (dom) {
                                roles.priceID.append(dom);
                                me.setPos();
                                $.extend(roles, self.common.getRoles(roles.priceID));
                                me.showTelTip();
                            });
                            var cur_Total = $("#cur_Total").html();
                            var cur_Per = $("#cur_Per").html().substr(0, 1);
                            var cur_Num = Math.ceil(parseInt(cur_Total) / parseInt(cur_Per));
                            $("#tar_Num").html(cur_Num);
                        } else {
                            self.render(self.tpl.price, $.extend(data, {
                                ChatUrl: vdata.initData.ChatUrl
                            }), function (dom) {
                                roles.priceID.append(dom);
                                me.setPos();
                                $.extend(roles, self.common.getRoles(roles.priceID));
                                me.showTelTip();
                            });
                        }
                    }
                    self.totalPrice.call(self);
                    if (GV.app.order.vars.initData.Alternative != "B") {
                        $('#J_tmpriceorder').show();
                    };
                    if (!(vdata.ProductCategoryType && vdata.ProductCategoryType.toLowerCase() === 'visa')) {
                        $('#J_online_service').show();
                    }
                },
                showTelTip: function () {
                    var initDataObject = GV.app.order.vars.initData;
                    if (initDataObject.hasOwnProperty("Hotline") && initDataObject.Hotline.length > 0) {
                        var sHotLineValue = initDataObject.Hotline;
                        if (sHotLineValue.length > 0) {
                            $("#js_telTrefer").html(sHotLineValue.toString());
                            $("#J_tab_hot_phone").show();
                        }
                    }
                },
                setPos: function () {
                    var obj = document.getElementById("price_box_wrap");
                    var getTop = function (e) {
                        var offset = e.offsetTop;
                        if (e.offsetParent != null) {
                            offset += getTop(e.offsetParent)
                        };
                        return offset;
                    }
                    var top = getTop(obj);
                    var isIE6 = /msie 6/i.test(navigator.userAgent);
                    window.onscroll = function () {
                        var bodyScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                        if (bodyScrollTop > top) {
                            obj.style.position = (isIE6) ? "absolute" : "fixed";
                            obj.style.top = (isIE6) ? bodyScrollTop + "px" : "0px";
                        } else {
                            obj.style.position = "static";
                        }
                    }
                }
            };
        },
        Invoice: function () {
            var self = this,
                vdata = self.data,
                roles = vdata.roles,
                mod = vdata.modules;
            return {
                invoiceInfo: {
                    title: '',
                    content: ''
                },
                init: function () {
                    var me = this;
                    var data = vdata.initData.Invoice;
                    var initData = (function () { //初始化发票信息
                        var _data = vdata.initData.OrderInvoice;
                        var _ret = {};
                        if (_data) {
                            $.each(_data, function (k, v) {
                                if (v)
                                    _ret['init' + k] = v;
                            })
                        }
                        return _ret;
                    }());
                    if (!data) {
                        roles.invoiceID.hide();
                        return;
                    }
                    self.render(self.tpl.invoiceDf, initData, function (dom) {
                        roles.invoiceID.append(dom);
                    });
                    self.render(self.tpl.invoiceBox, $.extend(data, initData), function (dom) {
                        $(dom).appendTo(roles.invoiceID).hide();
                        me.role = self.common.getRoles(roles.invoiceID);
                        me.bindEvent($.isEmptyObject(initData), initData);
                    });
                },
                bindEvent: function (isNoInit, data) { //isNoInit 没有初始化数据
                    var me = this;
                    var role = this.role;
                    var myInvoices;
                    var sug;
                    roles.invoiceID.on('click', 'a.revise', function (event) {
                        event.preventDefault();
                        $(this).closest('ul').hide();
                        role.selectInvo.click();
                        role.invoice.show();
                    })
                        .on('blur', 'input[role="getInvoice"]', function () {
                            me.checkInvoiceTitle();
                        });
                    if (!isNoInit) {
                        me.invoiceInfo = {
                            title: data.initTitle,
                            content: data.initContent
                        };
                    }
                    role.selectInvo.click(function () {
                        // ie9强制再选择是按钮
                        $('#invoice01').attr('checked', true);
                        role.invoiceli.show();
                        mod.Delivery.hideTip();
                        mod.Delivery.toRender('invoice');
                        if (GV.app.order.vars.InvoiceCaption) {
                            $('#J_invoiceTip').text(GV.app.order.vars.InvoiceCaption).show();
                        }
                    });
                    role.cancelInvo.click(function () {
                        role.invoiceli.hide();
                        mod.Delivery.hideTip();
                        mod.Delivery.toRender('noInvoice');
                        me.invoiceInfo = {
                            title: '',
                            content: ''
                        };
                        role.getInvoice.data('valid') && role.getInvoice.data('valid').hide();
                        $('#J_invoiceTip').hide();
                    });
                    if (myInvoices = vdata.initData.Invoice.MyInvoices) {
                        sug = me.genarateSug(myInvoices);
                        role.getInvoice.bind('focus', function () {
                            var _this = $(this);
                            var offset = _this.offset();
                            sug.show().css({
                                top: offset.top + _this.outerHeight(),
                                left: offset.left
                            });
                            sug.find('a').bind('mousedown', function () {
                                _this.val($(this).html());
                            });
                        }).bind('blur', function () {
                            sug.hide();
                        });
                    }
                },
                genarateSug: function (data) {
                    var _ret;
                    self.render(self.tpl.ivoiceSug, {
                        list: data
                    }, function (dom) {
                        _ret = $(dom).appendTo('body').css({
                            'position': 'absolute',
                            'display': 'none'
                        });
                    });
                    return _ret;
                },
                save: function () {
                    if (!vdata.initData.Invoice) {
                        return;
                    }
                    var role = this.role;
                    var idx = role.invoiceDetail.val();
                    var detail = $.trim(role.getInvoice.val());
                    if (detail && role.selectInvo.prop('checked')) {
                        this.invoiceInfo = {
                            title: $.trim(role.getInvoice.val()),
                            content: role.invoiceDetail.find("option:selected").text()
                        };
                    }
                    self.formData.InvoiceInfo = {
                        Title: this.invoiceInfo.title,
                        Detail: this.invoiceInfo.content
                    };
                },
                showTip: function (el, data, opts) {
                    var ovalid = $(el).data('valid');
                    opts = $.extend({
                        target: el,
                        data: data
                    }, opts || {});
                    ovalid = ovalid ? ovalid.show(opts) :
                        new self.validate(opts).show();
                    $(el).data('valid', ovalid);
                },
                checkInvoiceTitle: function () {
                    var el = this.role.getInvoice;
                    if (!el) {
                        return false;
                    }
                    var val = $.trim(el.val());
                    if ('' === val) {
                        this.showTip(el[0], '请填写发票抬头');
                        return false;
                    }
                    if (val === '个人' || val === '公司' || val === '待定') {
                        this.showTip(el[0], '发票抬头必须为个人姓名或者公司名称');
                        return false;
                    }
                    return true;
                },
                verify: function () {
                    var me = this;
                    if (!me.role) {
                        return true;
                    }
                    var el = me.role.getInvoice;
                    var idx;
                    if (me.role.invoice.css('display') !== 'none') {
                        if (me.role.selectInvo.prop('checked')) {
                            if (!me.checkInvoiceTitle()) {
                                if (!self.status.errorElem) {
                                    self.status.errorElem = el[0];
                                }
                                return false;
                            } else {
                                me.save();
                                return true;
                            }
                        }
                    } else {
                        me.save();
                        return true;
                    }
                }
            }
        },
        Delivery: function () {
            var self = this,
                vdata = self.data,
                roles = vdata.roles
            msg = {
                recipient: '请填写收件人',
                contactTel: '请填写联系电话',
                selectCity: '请选择城市',
                detail: '请填写正确的地址',
                postage: '请填写邮编',
                contactTelErr: '请填写正确的联系电话',
                postageErr: '请填写正确的邮政编码，邮政编码格式为六位数字'
            };
            return {
                commonInCityAddr: {}, //已保存常用的地址
                commonEMSAddr: {}, //已保存常用的地址
                postage: {}, //配送方式的费用
                Cantons: {}, //配送城市的行政区
                tabType: null,
                init: function () {
                    var _data = vdata.initData.OrderInvoice; //是否默认有发票
                    _data ? this.toRender('invoice') : this.toRender('noInvoice');
                    this.bindEvent();
                },
                toRender: function (type) {
                    var me = this;
                    var data = me.handleData(vdata.initData.DeliveryReult);
                    var isEmpty = true;
                    var _initData = vdata.initData.OrderDelivery;
                    var selectTab = (_initData && me.tabType) ? me.tabType[_initData.DeliveryType] - 1 : 0;
                    var curTabType;
                    var handle = function (data) {
                        var addr = {
                            1: '市内配送',
                            2: '市内自取',
                            3: 'EMS邮递',
                            4: '免费平邮',
                            5: '顺丰配送'
                        };
                        data.psType = addr[data.DeliveryType];
                        data.Canton = (data.CantonID && me.Cantons[data.CantonID]) ? me.Cantons[data.CantonID].Value : '';
                        if (data.DeliveryType == 3) {
                            data.noCity = 0;
                        } else {
                            data.noCity = 1;
                        }
                        return data;
                    };
                    me.toCity = data.CityName || '';
                    roles.deliveryID.empty();
                    if (_initData) {
                        _initData.AddressInfo.Address = unescape(_initData.AddressInfo.Address);
                        _initData.AddressInfo.Recipient = unescape(_initData.AddressInfo.Recipient);
                        self.render(self.tpl.deliveryDf, handle(_initData), function (dom) {
                            roles.deliveryID.append(dom).parent().show();
                            isEmpty = false;
                        });
                    }
                    if (!data[type]) {
                        roles.deliveryID.parent().hide();
                        me.countPostage();
                        return;
                    } else {
                        roles.deliveryID.parent().show();
                    }
                    self.render(self.tpl.deliveryBox, $.extend(data, data[type]), function (dom) {
                        var html = $(dom).appendTo(roles.deliveryID);
                        !isEmpty && html.hide();
                        cQuery.mod.load('tab', '1.2', function () {
                            var config = {
                                options: {
                                    index: selectTab,
                                    tab: "li",
                                    panel: "#content>div",
                                    trigger: "click",
                                    save: true
                                },
                                style: {
                                    tab: ['cur', ''],
                                    panel: {
                                        display: ['block', 'none']
                                    }
                                },
                                listeners: {
                                    initEventCallback: function () {
                                        curTabType = $('li[class="cur"]', '#tabs').attr('type');
                                        me.countPostage(curTabType); //暂时
                                        cities.init({
                                            id: '#cities',
                                            type: 'select'
                                        });
                                        cities.init({
                                            id: '#cities_p',
                                            type: 'select'
                                        });
                                    }
                                }
                            };
                            var ins = cQuery('#tabs').regMod('tab', '1.2', config);
                        });
                        cQuery('.cqsy').length && cQuery('.cqsy').regMod('notice', '1.0', {
                            name: '.cqsy',
                            tips: cQuery('.cqsy').attr('_cqnotice'),
                            selClass: 'inputSel'
                        }, true);
                    });
                    $('#content').children().each(function (i) {
                        $(this).children().eq(0).addClass('tab_0' + i);
                    });


                    $(document).delegate('a[role="saveaddress"]', 'click', function(){
                            event.preventDefault();
                            var _self = this,
                                type = $(_self).attr('type'),
                                cnt = $('#mask_popup'),
                                postData;
                            postData = {
                                "addresstype": type,
                                "address": escape($('#notice15').val()),
                                "canton": $('#J_popcanton').val(),
                                "city": $('#J_popcanton').find('option:selected').text(),
                                "infoid": $(_self).attr('infoid')
                            };
                            
                            if(type != 1){
                                postData = {
                                    "addresstype": type,
                                    "address": escape(cnt.find('input[role="recipient"]').val()),
                                    "cityname": cnt.find('#city').val(),
                                    "fee":"",
                                    "mobilephone":cnt.find('input[role="contactTel"]').val(),
                                    "contacttel":"",
                                    "recipient":cnt.find('input[role="recipient"]').val(),
                                    "postcode":cnt.find('input[role="postage"]').val(),
                                    "infoid":$(_self).attr('infoid')
                                };
                            };
                            console.log(postData);
                            $.ajax({
                                type: 'post',
                                url:'',
                                // url: GV.app.order.vars.handles.saveAddressInfo,
                                dataType: 'json',
                                data:{
                                    bookinginfo: cQuery.stringifyJSON(postData)
                                },
                                success: function(_data){
                                    
                                }
                            });
                            if(true){
                                console.log(self);
                            }
                        });



                },
                _simpleAddressTpl: function(data){
                    return '<p class="name">{{CityName}}</p>' +
                              '<p class="address">{{../../CityName}} {{CityName}} {{CantonName}} {{Address}}</p>' +
                              '<p class="code">{{Post}}</p>' +
                              '<i class="ico_checked"></i>' +
                              '<a href="###" role="adsedit" class="edit" cantonID="{{CantonID}}" infoId="{{InfoId}}" data-Recipient="{{Recipient}}" data-CityName="{{CityName}}" data-CantonName="{{CantonName}}" data-Address="{{Address}}" data-Post="{{Post}}"><i></i>编辑</a>' +
                              '<input cantonID="{{CantonID}}" checked="checked" index={{index}} type="radio" value="{{index}}" name="' + name + '" id="ps{{@index}}" style="display:none">';
                },
                _addressTpl: function(data){
                    return '<p class="name">{{#if Recipient}}({{Recipient}} 收){{/if}}</p>' +
                              '<p class="tel">{{#if Mobile}}{{Mobile}}{{else}}{{#if Tel}}{{Tel}}{{/if}}{{/if}}</p>' +
                              '<p class="address">{{Address}}</p>' +
                              '<p class="code">{{Post}}</p>' +
                              '<i class="ico_checked"></i>' +
                              '<a href="###" role="adsedit" class="edit" cantonID="{{CantonID}}" infoId="{{InfoId}}" data-Recipient="{{Recipient}}" data-tel="{{#if Mobile}}{{Mobile}}{{else}}{{#if Tel}}{{Tel}}{{/if}}{{/if}}" data-CityName="{{CityName}}" data-CantonName="{{CantonName}}" data-Address="{{Address}}" data-Post="{{Post}}"><i></i>编辑</a>' +
                              '<input cantonID="{{CantonID}}" checked="checked" index="{{index}}" type="radio" value="{{index}}" name="' + name + '" id="ems{{@index}}" style="display:none">';
                },
                countPostage: function (i) {
                    vdata.postage = i ? this.postage[i] : 0;
                    self.totalPrice();
                },
                bindEvent: function () {
                    var me = this;
                    var selected;
                    var reg;
                    var role;
                    roles.deliveryID.on('click', '[role="new"]', function (event) {
                        event.preventDefault();
                        var parent = $(this).parent();
                        var next = parent.next();
                        var prev = parent.prev();
                        var bl = prev.attr('role') === 'addressList';
                        role = self.common.getRoles('.hide_options');
                        if (bl) {
                            selected = prev.find('input:checked');
                        }
                        if (next[0].style.display !== 'none') {
                            next.hide();
                            prev.find('input:first').prop('checked', true).closest('li').addClass('cur');
                        } else {
                            next.show();
                            if (selected) {
                                selected.prop('checked', false).closest('li').removeClass('cur');
                            }
                        }
                        me.hideTip();
                    })
                        .on('click', '[role="other"]', function (event) {
                            event.preventDefault();
                            var index = +$(this).closest('.delivery').attr('type');
                            var name = $(this).closest('.delivery').attr('type');
                            var MyAddress = index == 1 ? vdata.initData.DeliveryReult.InCityDelivery.slice(3) : vdata.initData.DeliveryReult.MyEMSAddress.slice(3);
                            var tpl = index == 1 ? self.tpl.inCityAddress : self.tpl.allAdress;
                            role = self.common.getRoles('.hide_options');
                            self.render(tpl, {
                                obj: MyAddress,
                                CityName: me.toCity,
                                radioName: 'radio' + index
                            }, function (dom) {
                                var _role;
                                $(dom).appendTo('body');
                                _role = self.common.getRoles('#mask_popup');
                                cQuery('#mask_popup').mask();
                                $('#mask_popup').find('input:first').attr('checked', true);
                                _role.close.click(function (event) {
                                    event.preventDefault();
                                    cQuery('#mask_popup').unmask();
                                    $('#mask_popup').remove();
                                });
                                me.selectAddress(_role, index, 'radio' + name);
                            });
                            me.hideTip();
                        })
                        .on('click', 'a.revise', function (event) {
                            event.preventDefault();
                            $(this).closest('ul').hide().next().show();
                        }).on('click', '#cities,#cities_p', function () {
                            $(this).data('valid') && $(this).data('valid').hide();
                        })
                        .on('blur', 'input[type="text"]', function () {
                            if (reg = $(this).attr('regex')) {
                                me[reg]($.trim($(this).val()), this);
                            }
                        })
                        .on('click', 'li[role="tab"] a', function (event) {
                            event.preventDefault();
                            var tab = $(this).attr('type');
                            me.countPostage(tab);
                            self.removeValidate();
                        })
                        .on('click', 'input[type="radio"]', function () {
                            var parent = $(this).closest('div.delivery');
                            $(this).closest('li').addClass('cur').siblings().removeClass('cur');
                            parent.find('div.hide_options').hide();
                            me.hideTip();
                        })
                        .on('click', '.usual_address_list li', function(){  // 配送区块切换 除自取
                            var cnt = $(this).closest('ul');
                            cnt.find('li').removeClass('usual_address_item_selected');
                            cnt.find('input').prop('checked', false);
                            $(this).addClass('usual_address_item_selected');
                            $(this).find('input:radio').prop('checked', true);
                        })
                        .on('click', '.select_address_list li', function(){  // 自取区块切换
                            var cnt = $(this).closest('ul');
                            cnt.find('li').removeClass('cur');
                            cnt.find('input').prop('checked', false);
                            $(this).addClass('cur');
                            $(this).find('input:radio').prop('checked', true);
                        })
                        .on('click', 'a[role="adsedit"]', function(event){    // 编辑配送地址
                            event.preventDefault();
                            var index = +$(this).closest('.delivery').attr('type');
                            var tpl = index == 1 ? self.tpl.editInCityAddress : self.tpl.editAllAddress;
                            var tempData = me.handleData(vdata.initData.DeliveryReult);
                            var CantonID = $(this).attr('cantonid');
                            var infoID = $(this).attr('infoid');
                            self.render(tpl, {
                                CityCanton: tempData.CityCanton,
                                address: $(this).attr('data-address'),
                                recipient:$(this).attr('data-recipient'),
                                tel:$(this).attr('data-tel'),
                                code:$(this).attr('data-post')
                            }, function (dom) {
                                var _role;
                                $(dom).appendTo('body');
                                _role = self.common.getRoles('#mask_popup');
                                cQuery('#mask_popup').mask();
                                cities.init({
                                    id: '#cities',
                                    type: 'select'
                                });
                                cities.init({
                                    id: '#cities_p',
                                    type: 'select'
                                });
                                $.each($('#J_popcanton option'), function(_index, _item){
                                    if($(_item).val() == CantonID){
                                        $(_item).prop('selected', true)
                                    }
                                });
                                $('#mask_popup').find('a[role="saveaddress"]').attr('type', index).attr('infoid', infoID);
                                _role.close.click(function (event) {
                                    event.preventDefault();
                                    cQuery('#mask_popup').unmask();
                                    $('#mask_popup').remove();
                                });
                                //me.editSampleAddress();
                            });
                            me.hideTip();
                        })
                        // TODO 新增配送地址
                        .on('click', 'a[role="addads"]', function(event){
                            event.preventDefault();
                            var index = +$(this).closest('.delivery').attr('type');
                            var tpl = index == 1 ? self.tpl.editInCityAddress : self.tpl.editAllAddress;
                            var tempData = me.handleData(vdata.initData.DeliveryReult);
                            var Canton = $(this).attr('data-cantonname');
                            console.log(tempData);
                            self.render(tpl, {
                                CityCanton: tempData.CityCanton,
                                address: $(this).attr('data-address')
                            }, function (dom) {
                                var _role;
                                $(dom).appendTo('body');
                                _role = self.common.getRoles('#mask_popup');
                                cQuery('#mask_popup').mask();
                                cities.init({
                                    id: '#cities',
                                    type: 'select'
                                });
                                cities.init({
                                    id: '#cities_p',
                                    type: 'select'
                                });
                                _role.close.click(function (event) {
                                    event.preventDefault();
                                    cQuery('#mask_popup').unmask();
                                    $('#mask_popup').remove();
                                });
                                // me.editSampleAddress();
                            });
                            me.hideTip();
                        })
                        // .on('click', 'a[role="saveaddress"]', function(){
                        //     event.preventDefault();
                        //     var self = this,
                        //         postData;
                        //     postData = {
                        //         "addresstype": $(self).attr('type'),
                        //         "address": $('#notice15').val(),
                        //         "canton": $('#J_popcanton').val(),
                        //         "city": $('#J_popcanton').text(),
                        //         "infoid": $(self).attr('infoid')
                        //     };
                        //     console.log(postData);
                        //     if(type != 1){
                        //         postData = {
                        //             "addresstype": "",
                        //             "address": "",
                        //             "cityname": "",
                        //             "fee":"",
                        //             "mobilephone":"",
                        //             "contacttel":"",
                        //             "recipient":"",
                        //             "postcode":"",
                        //             "infoid":""
                        //         };
                        //     };
                        //     $.ajax({
                        //         type: 'post',
                        //         url: GV.app.order.vars.handles.saveAddressInfo,
                        //         dataType: 'json',
                        //         data:{
                        //             bookinginfo: cQuery.stringifyJSON(postData)
                        //         },
                        //         success: function(_data){
                                    
                        //         }
                        //     });
                        // });
                },
                defaultData: function () {
                    var _initData = vdata.initData.OrderDelivery;
                    if (_initData) {
                        this.setData({
                            DeliverType: _initData.DeliveryType,
                            AddresseeName: _initData.AddressInfo.Recipient || '',
                            ContactTel: _initData.AddressInfo.Mobile || _initData.AddressInfo.MobileTel || '',
                            Address: _initData.AddressInfo.Address || '',
                            PostCode: _initData.AddressInfo.Post || '',
                            CantonID: _initData.AddressInfo.CantonID || 0
                        });
                        return true;
                    }
                    return false;
                },
                hideTip: function (role) {
                    var role = role || self.common.getRoles('.hide_options');
                    !$.isEmptyObject(role) && $.each(role, function (k, v) { //清除提示
                        if ($(v).data('valid')) {
                            $(v).data('valid').hide();
                        }
                    });
                },
                selectAddress: function (_role, _i, name) {
                    var me = this;
                    var role = self.common.getRoles(roles.deliveryID);
                    // var tpl1 = '<li class="cur add"><label><input index="{{index}}" cantonID="{{CantonID}}" type="radio" value="{{index}}" name="' + name + '" checked="checked"> {{Address}} {{Post}} {{#if Recipient}}({{Recipient}} 收){{/if}} {{#if Mobile}}{{Mobile}}{{else}}{{#if Tel}}{{Tel}}{{/if}}{{/if}}</label></li>';
                    var tpl1 = '<li class="usual_address_item usual_address_item_selected">' +
                                  '<p class="name">{{#if Recipient}}({{Recipient}} 收){{/if}}</p>' +
                                  '<p class="tel">{{#if Mobile}}{{Mobile}}{{else}}{{#if Tel}}{{Tel}}{{/if}}{{/if}}</p>' +
                                  '<p class="address">{{Address}}</p>' +
                                  '<p class="code">{{Post}}</p>' +
                                  '<i class="ico_checked"></i>' +
                                  '<a href="###" role="adsedit" class="edit" cantonID="{{CantonID}}" infoId="{{InfoId}}" data-Recipient="{{Recipient}}" data-tel="{{#if Mobile}}{{Mobile}}{{else}}{{#if Tel}}{{Tel}}{{/if}}{{/if}}" data-CityName="{{CityName}}" data-CantonName="{{CantonName}}" data-Address="{{Address}}" data-Post="{{Post}}"><i></i>编辑</a>' +
                                  '<input cantonID="{{CantonID}}" checked="checked" index="{{index}}" type="radio" value="{{index}}" name="' + name + '" id="ems{{@index}}" style="display:none">' +
                                '</li>';
                    var tpl2 = '<li class="usual_address_item usual_address_item_selected">' +
                              '<p class="name">{{CityName}}</p>' +
                              '<p class="address">{{../../CityName}} {{CityName}} {{CantonName}} {{Address}}</p>' +
                              '<p class="code">{{Post}}</p>' +
                              '<i class="ico_checked"></i>' +
                              '<a href="###" role="adsedit" class="edit" cantonID="{{CantonID}}" infoId="{{InfoId}}" data-Recipient="{{Recipient}}" data-CityName="{{CityName}}" data-CantonName="{{CantonName}}" data-Address="{{Address}}" data-Post="{{Post}}"><i></i>编辑</a>' +
                              '<input cantonID="{{CantonID}}" checked="checked" index={{index}} type="radio" value="{{index}}" name="' + name + '" id="ps{{@index}}" style="display:none">' +
                            '</li>';
                    // var tpl2 = '<li class="cur add"><label><input index="{{index}}" cantonID="{{CantonID}}" type="radio" value="{{index}}" name="' + name + '" checked="checked">{{toCity}} {{CityName}} {{CantonName}} {{Address}} {{Post}}</label></li>';
                    var tpl = _i == 1 ? tpl2 : tpl1;
                    var address = _i == 1 ? me.commonInCityAddr : me.commonEMSAddr;
                    $('#mask_popup').on('click', 'input', function () {
                        $("input[name='radio'][checked]", '#mask_popup').attr('checked', false);
                        $(this).attr('checked', true);
                    });
                    _role.confirm.unbind('click');
                    _role.confirm.click(function (event) {
                        event.preventDefault();
                        var index = $("input[type='radio']:checked", '#mask_popup').attr('index');
                        var wrap;
                        self.render(tpl, $.extend(address[index], {
                            toCity: me.toCity,
                            index: index
                        }), function (dom) {
                            wrap = $(role.addressList).filter('[type="' + _i + '"]');
                            wrap.find('li.usual_address_item_selected').remove();
                            wrap.find('input:checked').prop('checked', false);
                            wrap.prepend(dom);
                            wrap.nextAll('div.hide_options').hide();
                            wrap.find('li').first().addClass('usual_address_item_selected').siblings().removeClass('usual_address_item_selected');
                            cQuery('#mask_popup').unmask();
                            $('#mask_popup').remove();
                        });
                    });
                },
                handleData: function (data) {
                    var me = this;
                    var _ref = {};
                    var handle = function (data) {
                        var _ret = {};
                        $.map(data, function (v, k) {
                            switch (v.DeliveryType) {
                                case 1:
                                    _ret.ps = v;
                                    break;
                                case 2:
                                    _ret.zq = v;
                                    break;
                                case 3:
                                    _ret.ems = v;
                                    break;
                                case 4:
                                    _ret.py = v;
                                    break;
                                case 5:
                                    _ret.sf = v;
                                    break;
                            }
                            me.postage[v.DeliveryType] = v.DeliveryAmount;
                        });
                        if (_ret.py) {
                            _ret.pyindex = 1;
                            _ret.sfindex = 5;
                            if (_ret.ps) {
                                _ret.psindex = 2;
                                if (_ret.zq) {
                                    _ret.zqindex = 3;
                                    _ret.emsindex = 4;
                                }
                            } else if (_ret.zq) {
                                _ret.zqindex = 2;
                                _ret.emsindex = 3;
                            } else {
                                _ret.emsindex = 2;
                            }
                        } else {
                            if (_ret.ps) {
                                _ret.psindex = 1;
                                if (_ret.zq) {
                                    _ret.zqindex = 2;
                                    _ret.emsindex = 3;
                                }
                            } else if (_ret.zq) {
                                _ret.zqindex = 1;
                                _ret.emsindex = 2;
                            } else {
                                _ret.emsindex = 1;
                            }
                        }
                        me.tabType = {
                            1: _ret.psindex,
                            2: _ret.zqindex,
                            3: _ret.emsindex,
                            4: _ret.pyindex,
                            5: _ret.sfindex
                        };
                        return _ret;
                    };
                    var goods = function (goods) {
                        var _ret = [];
                        if (!goods || !goods.length) return null;
                        $.map(goods, function (v, k) {
                            _ret.push('<p>' + (k + 1) + '. ' + v.replace(/[\r\n]/g, "") + '</p>');
                        });
                        _ret.push('<p class="alert_info">(内容仅供参考，以实际送出物为准。)</p>');
                        return _ret.join('');
                    };
                    if (!data || !data.DeliveryInfoList) return _ref;
                    $.map(data.DeliveryInfoList, function (v, k) {
                        if (v.isHasInvoice === 1) {
                            _ref.invoice = handle(v.DeliveryType);
                            _ref.invoice.deliveryGoods = goods(v.DeliveryGoodsDescriptions);
                        } else {
                            _ref.noInvoice = handle(v.DeliveryType);
                            _ref.noInvoice.deliveryGoods = goods(v.DeliveryGoodsDescriptions);
                        }
                    });
                    if (data.SelfPickupAddress.length) {
                        _ref.selfPickupAddr = data.SelfPickupAddress;
                    }
                    _ref.CityName = data.CityName;
                    _ref.CityCanton = data.CityCanton || [];
                    if (data.MyEMSAddress) {
                        _ref.emsAddress = data.MyEMSAddress.slice(0, 3);
                        $.map(data.MyEMSAddress, function (v, k) {
                            me.commonEMSAddr[v.InfoId] = v;
                        });
                        if (data.MyEMSAddress.length < 4) {
                            _ref.hideEmsAddress = true;
                        }
                    }
                    if (data.InCityDelivery) {
                        _ref.inCityAddress = data.InCityDelivery.slice(0, 3);
                        $.map(data.InCityDelivery, function (v, k) {
                            me.commonInCityAddr[v.InfoId] = v;
                        });
                        if (data.InCityDelivery.length < 4) {
                            _ref.hideInCityAddress = true;
                        }
                    }
                    data.CityCanton && $.map(data.CityCanton, function (v, k) {
                        me.Cantons[v.Key] = v;
                    })
                    return _ref;
                },
                getPsAddr: function (role, isTemp) { //获取新增市内配送地址
                    // var idx = role.getCanton.val()
                    var canton = role.getCanton.find("option:selected").text();
                    var cantonID = role.getCanton.val() || 0;
                    var detail = role.getAddrDetail.val();
                    var valid = role.getAddrDetail.data('vali');
                    isTemp = isTemp || 0;
                    if (!isTemp) {
                        if ('' === $.trim(detail)) {
                            this.showTip(role.getAddrDetail[0], '请输入详细地址');
                            if (!self.status.errorElem) {
                                self.status.errorElem = role.getAddrDetail[0];
                            }
                            return false;
                        }
                        if (canton.indexOf('暂未开通') != -1) {
                            this.showTip(role.getCanton[0], '该区域尚未开通配送，请重新选择');
                            if (!self.status.errorElem) {
                                self.status.errorElem = role.getAddrDetail[0];
                            }
                            return false;
                        }
                    }
                    return [canton, detail, cantonID];
                },
                showTip: function (el, data, opts) {
                    var ovalid = $(el).data('valid');
                    opts = $.extend({
                        target: el,
                        data: data
                    }, opts || {});
                    ovalid = ovalid ? ovalid.show(opts) :
                        new self.validate(opts).show();
                    $(el).data('valid', ovalid);
                },
                checkNull: function (str) {
                    return '' === str ? true : false;
                },
                checkRecipient: function (str, el) { //验证收件人
                    if (this.checkNull(str)) {
                        this.showTip(el, msg.recipient);
                        return false;
                    }
                    return true;
                },
                checkContactTel: function (str, el) { //验证收件人电话
                    if (this.checkNull(str)) {
                        this.showTip(el, msg.contactTel);
                        return false;
                    } else if (!/^\d{7,}$/.test(str)) {
                        this.showTip(el, msg.contactTelErr);
                        return false;
                    }
                    return true;
                },
                checkDetail: function (str, el) { //验证详细收件地址
                    if (this.checkNull(str)) {
                        this.showTip(el, msg.detail);
                        return false;
                    }
                    return true;
                },
                checkPostage: function (str, el) { //验证邮编
                    if (this.checkNull(str)) {
                        this.showTip(el, msg.postage);
                        return false;
                    } else if (!/^\d{6}$/.test(str)) {
                        this.showTip(el, msg.postageErr);
                        return false;
                    }
                    return true;
                },
                getEmsAddr: function (r, isTemp, isPy) { //获取新增EMS配送地址
                    var me = this;
                    var _ref = {};
                    var _ret = true;
                    var role = self.common.getRoles(r);
                    var getCities = function () {
                        return isPy ? cities.get('#cities_p') : cities.get('#cities');
                    };
                    var getVal = function () {
                        $.each(role, function (k, v) {
                            if (k != 'selectCity') {
                                _ref[k] = $(v).val();
                            } else {
                                _ref[k] = getCities();
                            }
                        });
                        return _ref;
                    };
                    isTemp = isTemp || 0;
                    if (!isTemp) {
                        $.each(role, function (k, v) {
                            var val;
                            val = k != 'selectCity' ? $.trim($(v).val()) : getCities();
                            if ('' === val) {
                                me.showTip(v, msg[k]);
                                _ret = false;
                                if (!self.status.errorElem) {
                                    self.status.errorElem = v;
                                }
                                //return false;
                            } else if (k === 'contactTel') {
                                if (!me.checkContactTel(val, v)) {
                                    _ret = false;
                                    if (!self.status.errorElem) {
                                        self.status.errorElem = v;
                                    }
                                    // return false;
                                }
                            } else if (k === 'postage') {
                                if (!me.checkPostage(val, v)) {
                                    _ret = false;
                                    if (!self.status.errorElem) {
                                        self.status.errorElem = v;
                                    }
                                    //return false;
                                }
                            }
                        });
                    }
                    return [_ret, getVal()];
                },
                setData: function (obj) { //设置要提交的配送数据
                    return self.formData.DeliverInfo = {
                        DeliverType: obj.DeliverType || 0,
                        AddresseeName: obj.AddresseeName,
                        ContactTel: obj.ContactTel,
                        Address: escape(obj.Address),
                        PostCode: obj.PostCode,
                        CantonID: obj.CantonID,
                        InfoId: obj.InfoId || 0
                    };
                },
                save: function (isSubmit) {
                    var type, which, role, id, isPy;
                    var DeliverInfo = self.formData.DeliverInfo;
                    var me = this;
                    var addr, commonInCityAddr, commonEMSAddr;
                    var _assign = function (type, name, tel, addr, post, canton, id) {
                        me.setData({
                            DeliverType: type,
                            AddresseeName: name,
                            ContactTel: tel,
                            Address: addr,
                            PostCode: post,
                            CantonID: canton,
                            InfoId: id
                        });
                    };
                    if (roles.deliveryID.parent().css('display') !== 'none') {
                        if ($('#deliverBox').css('display') !== 'block') {
                            me.defaultData();
                            return true;
                        }
                        type = $('#tabs').children('.cur').attr('type');
                        which = $('#content').children('[type="' + type + '"]');
                        role = self.common.getRoles(which);
                        if (type == 1) {
                            if (role.addressList) {
                                id = role.addressList.find('input:checked').val();
                                if (id) {
                                    commonInCityAddr = me.commonInCityAddr[id];
                                    _assign(type, commonInCityAddr.Recipient, commonInCityAddr.Mobile || commonInCityAddr.Tel, commonInCityAddr.Address, commonInCityAddr.Post, commonInCityAddr.CantonID || 0, commonInCityAddr.InfoId || 0);
                                    if (isSubmit) {
                                        return true;
                                    }
                                } else {
                                    addr = me.getPsAddr(role, !isSubmit);
                                }
                            } else {
                                addr = me.getPsAddr(role, !isSubmit);
                            }
                            if (isSubmit && !addr) return false;
                            if (addr) {
                                _assign(type, '', '', addr[1], '', addr[2] || 0, 0);
                            }
                        }
                        if (type == 2) {
                            id = role.addressList.find('input:checked').val();
                            _assign(type, '', '', id, '', 0, 0)
                        }
                        if (type == 3 || type == 4 || type == 5) {
                            isPy = type == 3 ? 0 : 1;
                            if (role.addressList) {
                                id = role.addressList.find('input:checked').val();
                                if (id) {
                                    commonEMSAddr = me.commonEMSAddr[id];
                                    _assign(type, commonEMSAddr.Recipient, commonEMSAddr.Mobile || commonEMSAddr.Tel, commonEMSAddr.CityName + commonEMSAddr.Address, commonEMSAddr.Post, 0, commonEMSAddr.InfoId || 0);
                                    if (isSubmit) {
                                        return true;
                                    }
                                } else {
                                    addr = me.getEmsAddr(role.hideOptions, !isSubmit, isPy);
                                }
                            } else {
                                addr = me.getEmsAddr(role.hideOptions, !isSubmit, isPy);
                            }
                            if (addr) {
                                var dir = addr[1];
                                if (isSubmit) {
                                    if (!addr[0]) return false;
                                }
                                _assign(type, dir.recipient, dir.contactTel, dir.selectCity + dir.detail, dir.postage, 0, 0);
                            }
                        }
                    } else {
                        _assign(0, '', '', '', '', 0, 0);
                    }
                    return true;
                },
                verify: function () {
                    this.save(!0);
                }
            }
        },
        Extras: function () {
            var self = this;
            var vdata = self.data;
            return {
                init: function () {
                    var _data = vdata.initData.OrderOther;
                    var role = this.role = self.common.getRoles(vdata.roles.extrasID);
                    var bed;
                    this.bedValue = {
                        1: '尽量安排大床',
                        2: '尽量安排双床'
                    };
                    this.bindEvent();
                    if (!_data || !this.isNull(_data)) return;
                    if (role.extrasInputs) {
                        role.extrasInputs.show();
                        role.mores.html('更多需求&lt;&lt;');
                    }
                    if (_data.NoSmokingRoom) {
                        role.noSmokingRoom && role.noSmokingRoom.prop('checked', true);
                    }
                    // if(_data.NeedAdsl){
                    //     role.needAdsl.prop('checked',true);
                    // }
                    if (_data.BedDes) {
                        bed = this.getBedVal(_data.BedDes);
                        role.selectBedDes && role.selectBedDes.prop('checked', true);
                        role.bedDes && role.bedDes.val(bed).prop('disabled', false).children('[value="' + bed + '"]').attr('selected', true);
                    }
                    if (_data.Remark) {
                        role.Remark.val(_data.Remark).show();
                    }

                },
                isNull: function (obj) {
                    var _ret = false;
                    if (!obj) return false;
                    $.each(obj, function (k, v) {
                        if (v) {
                            _ret = true;
                        }
                    });
                    return _ret;
                },
                bindEvent: function () {
                    var role = this.role;
                    role.mores && role.mores.bind('click', function () {
                        role.extrasInputs.toggle();
                        if (role.extrasInputs.css('display') !== 'none') {
                            $(this).html('更多需求&lt;&lt;')
                        } else {
                            $(this).html('更多需求&gt;&gt;')
                        }
                    });
                    role.selectBedDes && role.selectBedDes.bind('click', function () {
                        if ($(this).prop('checked')) {
                            role.bedDes.prop('disabled', false);
                        } else {
                            role.bedDes.prop('disabled', true).val('0');
                            role.bedDes.children('[value="0"]').attr('selected', true);
                        }
                    });
                    role.selectRemark && role.selectRemark.bind('click', function () {
                        role.Remark.toggle();
                    });
                },
                getBedVal: function (v) {
                    var _ret;
                    $.each(this.bedValue, function (key, val) {
                        if (v === val) {
                            _ret = key;
                            return false;
                        }
                    });
                    return _ret;
                },
                save: function () {
                    var role = this.role;
                    var OtherInfo = self.formData.OtherInfo;
                    var remark = role.Remark;
                    if (role.extrasInputs && role.extrasInputs.css('display') !== 'block') {
                        self.formData.OtherInfo = {
                            NoSmokingRoom: 0,
                            BedDes: '',
                            Remark: ''
                        };
                        return;
                    }
                    if (role.noSmokingRoom && role.noSmokingRoom.prop('checked'))
                        OtherInfo.NoSmokingRoom = 1;
                    else
                        OtherInfo.NoSmokingRoom = 0;
                    if (role.bedDes && role.bedDes.val() != 0)
                        OtherInfo.BedDes = this.bedValue[role.bedDes.val()];
                    else
                        OtherInfo.BedDes = '';
                    if (remark && remark[0].style.display != 'none' && $.trim(remark.val()) !== remark.attr('_cqnotice')) {
                        OtherInfo.Remark = remark.val();
                    } else {
                        OtherInfo.Remark = '';
                    }
                },
                verify: function () {
                    this.save();
                    return true;
                }
            }
        },
        AsyncInit: function () {
            var self = this,
                vdata = self.data;
            return {
                init: function () {
                    var module = [];
                    self.fetchData({
                        url: vdata.handles.otherInfo,
                        dataType: 'text'
                    }, function (data) {
                        data = typeof data === 'string' ? self.common.parseJSON(data) : data;
                        vdata.roles.loadingID.remove();
                        if (data.errno) return;
                        $.extend(vdata.initData, data.data);
                        (function (args) {
                            $.map([self.Travellers, self.Commoners, self.Delivery, self.Invoice, self.Extras], function (o, i) {
                                module[args[i]] = o.call(self);
                            });
                        }('Travellers|Commoners|Delivery|Invoice|Extras'.split('|')));
                        for (var i in module) {
                            if (Object.prototype.hasOwnProperty.call(module, i)) {
                                module[i].init(vdata);
                                vdata.modules[i] = module[i];
                            }
                        }
                        self.initEvent();
                    });
                }
            }
        },
        /**
        * 根据参数返回input的jquery对象
        * @param  {String} str     input上的参数值
        * @return {cQuery Obj}     [description]
        */
        // _getInput: function (str) {
        //     var obj;
        //     $.each($('#linkManID input'), function (index, item) {
        //         if ($(item).attr('role') === str) {
        //             obj = cQuery(item);
        //         }
        //     });
        //     return obj;
        // },

        // /**
        // * 简单模式表单验证
        // * @return {Boolean} 表单验证是否通过
        // */
        // _simpleFormCheck: function () {
        //     var self = this,
        //         nickName = self._getInput('ctname').value(),
        //         nickMobile = self._getInput('ctmphone').value(),
        //         nickTel = self._getInput('cttphone').value(),
        //         nickEmail = self._getInput('ctemail').value(),
        //         nickNameCheck = this.Contacter().checkName(nickName),
        //         nickMobileCheck = this.Contacter().checkMobile(nickMobile),
        //         nickEmailCheck = this.Contacter().checkEmail(nickEmail);

        //     // 检查名字
        //     if (!nickNameCheck[0]) {
        //         new self.validate({
        //             target: self._getInput('ctname'),
        //             data: nickNameCheck[1],
        //             errorClass: ''
        //         }).show();
        //         return false;
        //     };

        //     //检查手机
        //     if (!nickMobileCheck[0]) {
        //         new self.validate({
        //             target: self._getInput('ctmphone'),
        //             data: nickMobileCheck[1],
        //             errorClass: ''
        //         }).show();
        //         return false;
        //     }

        //     //检查email
        //     if (!nickEmailCheck[0]) {
        //         new self.validate({
        //             target: self._getInput('ctemail'),
        //             data: nickEmailCheck[1],
        //             errorClass: ''
        //         }).show();
        //         return false;
        //     }

        //     return true;
        // },

        /**
        * 简单模式提交订单操作
        * 填写页下一步Savebookinghandler接口时，你需要给我多传一个int类型参数ProposalOrderType（如果是意向单点下一步时传2，如果是常规的点击下一步时传1）
        * @param {Number} _type 订单类型
        * @return {[type]} [description]
        * 
        */
        _paySubmit: function () {
            var self = this,
                me = this,
                mod = this.data.modules,
                text,
                vdata = self.data;

            // 异步提交意愿单订单
            $(document).undelegate('#J_paysubmit', 'click');
            $(document).delegate('#J_paysubmit', 'click', function () {
                var linkManEdit = $('#linkManID .linkman_info'),
                    linkManIsHidden = $(linkManEdit[1]).is(':hidden');

                $.map('Travellers|Contacter|Extras|Delivery|Invoice'.split('|'), function (v, k) {
                    mod[v].save();
                });

                self.formData.IsTmpOrder = 1;
                self.formData.TempOrderType = 0;
                self.formData.ProposalOrderType = 2;



                $('#linkManID a.revise').click();
                if (!self._simpleFormCheck()) {
                    return false
                };
                if (linkManIsHidden) {
                    $(linkManEdit[1]).hide();
                    $(linkManEdit[0]).show();
                }

                if (self._simpleFormCheck()) {

                    $(this).text('请稍候...');
                    $.ajax({
                        url: vdata.handles.bookingInfo,
                        type: 'POST',
                        data: {
                            // bookinginfo: cQuery.stringifyJSON(ContactInfo),
                            bookinginfo: cQuery.stringifyJSON(self.formData)
                        },
                        //data: 'bookinginfo=' + cQuery.stringifyJSON(ContactInfo),
                        timeout: 10000,
                        success: function (data) {
                            $('#J_forminfocnt').show();
                            $('#J_simplepay').hide();
                            $('#J_paysubmitSucc').show();
                        }
                    });
                }

            });
        },

        /**
         * 显示为意向单的表单
         * @return {[type]} [description]
         */
        _newForm: function () {
            $('#J_paysubmitid').text(GV.app.order.vars.initData.orderid);
            $('a.temporary_order').hide();

            $('#J_simplepay').show();
            $('#J_paybuttoncnt').show();
            this._paySubmit();
            IsTmporaryOrder = true;
        },

        /**
         * 显示不是意向单的表单
         * @return {[type]} [description]
         */
        _defaultForm: function () {
            // 显示原来的页面
            $('#J_simplepay').hide();
            $('#J_forminfocnt').show();
        },

        init: function () { //初始化
            var self = this;
            var vdata = self.data;

            // 根据Alternative参数显示内容 B，显示意向单内容，其它则显示原来的内容
            $('#J_paysubmitid').text(GV.app.order.vars.initData.orderid);
            if (GV.app.order.vars.initData.Alternative === "B") {
                // 根据IsTemporaryOrder判断是否显示追单页面 true:暂存过了，显示老的页面
                if (GV.app.order.vars.initData.IsTemporaryOrder) {
                    self._defaultForm();

                    // 显示已经预订的绿色框
                    $('#J_paysubmitSucc').show();


                    $('#J_forminfocnt .temporary_order').hide();

                } else {
                    self._newForm();
                }
            } else {

                self._defaultForm();
            }

            // $.ajax({
            //     url: '/Booking/Ajax/Order/NeedTrackOrder.aspx',
            //     type: 'get',
            //     data: {
            //         ProductID: GV.app.order.vars.initData.productID,
            //         IsQuickLogin: GV.app.order.vars.isQuickLogin,
            //         Alternative: GV.app.order.vars.initData.Alternative
            //     },
            //     cache: false,
            //     dataType: 'json',
            //     success: function (data) {
            //         $('#J_paysubmitid').text(GV.app.order.vars.initData.orderid);
            //         if (data.errno === 0 && data.data) {
            //             // 根据IsTemporaryOrder判断是否显示追单页面 true:暂存过了，显示老的页面
            //             if (GV.app.order.vars.initData.IsTemporaryOrder) {
            //                 self._defaultForm();

            //                 // 显示已经预订的绿色框
            //                 $('#J_paysubmitSucc').show();
            //             } else {
            //                 self._newForm();
            //             }
            //         } else {
            //             self._defaultForm();
            //         }
            //     }
            // });

            self.handlerHelp();
            return function () {
                var modules = vdata.modules;
                if (!arguments.length) return;
                $.each('loadingID|couponID|fillsetID|bookInfoID|linkManID|travellersID|commonersID|priceID|invoiceID|searchID|deliveryID|totalID|submitID|extrasID|singleConponID'.split('|'), function (k, v) {
                    vdata.roles[v] = $('#' + v);
                });
                vdata = $.extend(self.data, arguments[0].initData);
                self.initHeadbarsHelper();
                self.formData.OrderId = encodeURIComponent(vdata.initData.orderid); //订单号
                // self.formData.RequestPath = encodeURIComponent(location.pathname);
                self.formData.RequestPath = location.pathname;
                //初始化订单类型
                if (vdata.hidTemporaryAuto == 0) {
                    self.formData.IsTmpOrder = 1;
                    self.formData.TempOrderType = 0;
                    self.status.isTmpSave = true;
                } else if (vdata.hidTemporaryAuto == 1) {
                    self.formData.IsTmpOrder = 1;
                    self.formData.TempOrderType = 1;
                } else {
                    self.formData.IsTmpOrder = 0;
                    self.formData.TempOrderType = 1;
                }

                (function (args) {
                    $.map([self.Products, self.Price, self.Coupon, self.HotelCoupon, self.AsyncInit], function (o, i) {
                        modules[args[i]] = o.call(self);
                    });
                }('Products|Price|Coupon|HotelCoupon|AsyncInit'.split('|')));
                for (var i in modules) {
                    modules[i].init(vdata);
                }
                
            };
        }
    };
    exports.init = orderprocess.init.call(orderprocess);
});
