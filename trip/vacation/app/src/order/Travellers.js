define(function (require, exports, module) {
    var cquery = $;
    var $ = require('jquery');
    var _ = require('underscore');
    var Birth = require('../Modules/BirthDay');
    var GVdate = require('./GVdate');

    function getNodeName(node) {
        return nodeName = node[0].nodeName.toLowerCase();
    }
    function isInput(node) {
        var nodeName = getNodeName(node);
        return nodeName == 'input' || nodeName == 'textarea' || nodeName == 'select';
    }

    // 里面的 this 是在调用这个函数时传入的
    var Travellers = function () {//出游人
        var self = this;
        var vdata = self.data;
        var roles = vdata.roles;
        var Reg = self.Reg;
        var Validate = self.validate;
        var oBirth = new Birth('', vdata.initData.departDate);
        var mod = vdata.modules;
        var Visitor = function (opts) {//旅客类
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
            regNationalAddr: function () {//注册国籍控件
                var role = this.role;
                var dfNational;
                cQuery.mod.load('address', '1.0', $.proxy(function () {
                    var me = this;
                    if (isInput(role.national)) {
                        this.addressNational = self.regNational(role.national[0]);
                        this.addressNational.method('bind', 'change', function (event, data) {//绑定国籍事件
                            role.national.attr('mod_value', data.items[2]);
                        });
                        this.addressNational.method('bind', 'userinput', function (a, b) {
                            if (b.data) {
                                vdata.dfNational = b.data;
                            }
                            if (vdata.dfNational) {
                                dfNational = vdata.dfNational.split('|');
                                me.setNational(dfNational[1], dfNational[2]);
                            }
                            me.checkNationality();
                        });
                    }
                    this.loadNationalData();
                }, this));
            },
            loadNationalData: function () {
                var me = this,
                    charset = 'gb2312';//cQuery.config("charset");
                cQuery.loader.jsonp('http://webresource.c-ctrip.com/code/cquery/resource/address/flightintl/nationality_' + charset + '.js', {
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
                //var val = $.trim(role.national.val());
                var val = $.trim(getValue(role.national));
                if (val !== '' && val !== role.national.attr('_cqnotice')) {//改变CN成中国大陆
                    //role.national.val(vdata.nationalData[val]);
                    setValue(role.national, vdata.nationalData[val]);
                } else {
                    //role.national.val('中国大陆').attr('mod_value', 'CN').removeClass('inputSel');
                    setValue(role.national, '中国大陆').attr('mod_value', 'CN').removeClass('inputSel');
                }
                if (vdata.initData.ProductType === 3) {
                    this.addressNational && this.addressNational.set('source', {
                        data: '@China|中国大陆|CN@',
                        suggestion: {
                            '': [{
                                "display": "中国大陆",
                                data: "China|中国大陆|CN",
                                rightDisplay: 'China'
                            }]
                        }
                    });
                }

                function setValue(node, value) {
                    node = $(node);
                    //var nodeName = node[0].nodeName.toLowerCase();
                    if (isInput(node))
                        return node.val(value);
                    else
                        return node.text(value);
                }
                function getValue(node) {
                    node = $(node);
                    //var nodeName = node[0].nodeName.toLowerCase();
                    if (isInput(node))
                        return node.val();
                    else
                        return node.text();
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
                            suggestion: { '': [{ "display": "中国大陆", data: "China|中国大陆|CN", rightDisplay: 'China' }, { "display": "美国", data: "United States|美国|US", rightDisplay: 'United States' }, { "display": "英国", data: "United Kingdom|英国|GB", rightDisplay: 'United Kingdom' }, { "display": "日本", data: "Japan|日本|JP", rightDisplay: 'Japan' }, { "display": "加拿大", data: "Canada|加拿大|CA", rightDisplay: 'Canada' }, { "display": "法国", data: "France|法国|FR", rightDisplay: 'France' }, { "display": "韩国", data: "Korea,Republic of|韩国|KR", rightDisplay: 'Korea,Republic of' }, { "display": "德国", data: "Germany|德国|DE", rightDisplay: 'Germany' }] }
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
                        me[reg]($.trim($(this).val()), this);
                    }
                })
                .on('change', '[role="idCardType"]', function () {
                    var val = $(this).val();
                    var elem = $(this).closest('[role="youren"]');
                    var cliendID = elem.attr('index');
                    var cobj = mod && mod.Commoners.commonersObj[cliendID];
                    var _ref;
                    var setCardDate = function (arr) {
                        if (role.cardValidUntilY) {
                            $.map('cardValidUntilY|cardValidUntilM|cardValidUntilD'.split('|'), function (v, k) {
                                role[v].val(arr[k]);
                            })
                        }
                    };
                    me.filterInputs();
                    $.map('mobileNo|nameEN|idCardNo|gender|birthdayY|birthdayM|birthdayD|national|cardValidUntilY|cardValidUntilM|cardValidUntilD|birthPlace'.split('|'), function (v, k) {//隐藏提示
                        role[v] && self.hideTip(role[v][0]);
                    });
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
                }).on('click', '[role="foreign"]', function () {//注册我是外宾事件
                    me.forForeign(this, isHasEnName);
                });
            },
            filterInputs: function () {
                var val, role = this.role;
                var optional = $('.optional', this.opts.element);
                var later = $('.later', this.opts.element);
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
                        !later.hasClass('optional') && later.length && later.show();
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
            setNational: function (val, attr) {//设置国籍
                this.role.national.val(val).attr('mod_value', attr).removeClass('inputSel');
            },
            forForeign: function (el, isHasEnName) {//是否是外宾
                var bl = $(el).prop('checked');
                var role = this.role;
                var _tpl, _obj, nameEN;
                if (bl) {
                    role.nameCN.removeAttr('regex');
                    if (!isHasEnName) {
                        if (this.cid) {
                            _obj = mod && mod.Commoners.commonersObj[this.cid];
                        } else {
                            _obj = {
                                ENFirstName: '',
                                ENMiddleName: '',
                                ENLastName: ''
                            }
                        }
                        nameEN = _obj.ENFirstName ? (_obj.ENLastName + '/' + _obj.ENFirstName + ' ' + _obj.ENMiddleName) : '';
                        _tpl = '<li><label for="" class="product_label">英文姓名</label><input type="text" class="input_m" value="' + nameEN + '" role="nameEN" regex="checkEnName"> <a href="###" class="explain" data-role="jmp" data-params="{options: {css:{maxWidth:\'400\',minWidth:\'240\'},type:\'jmp_table\', classNames:{boxType:\'jmp_table\'},template:\'#jmp_table1_3\',alignTo:\'cursor\'}}">填写说明</a></li>';
                        self.render(_tpl, {}, function (dom) {//插入英文名字
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
            },
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
            hideTip: function () {//提示隐藏 
                var tip;
                $(this.opts.element).find('.cq').removeClass('inputSel').removeClass('f_error');
                $.each(this.role, function (k, v) {
                    if (tip = v.data('valid')) {
                        tip.hide();
                    }
                });
            },
            showTip: function (el, data, opts) {
                var ovalid = $(el).data('valid');
                opts = $.extend({ target: el, data: data }, opts || { 'errorClass': 'f_error' });
                ovalid = ovalid ? ovalid.show(opts) :
                        new Validate(opts).show();
                $(el).data('valid', ovalid);
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
            checkName: function (str, node, params) {
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
                    bl = Reg.checkCnName(str);
                    if (!bl[0]) {
                        showTip(bl[1]);
                        return false;
                    } else if (bl[1]) {
                        showTip(bl[1], { errorClass: '' });
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
                var bl = Reg.checkCnName(strs);
                if (!bl[0]) {
                    setTimeout(function () {//为了能选中我是外宾的复选框
                        !me.role.foreign.prop('checked') && me.showTip(nameCN[0], bl[1]);
                    }, 200)
                    return false;
                } else if (bl[1]) {
                    this.showTip(nameCN[0], bl[1], { errorClass: '' });
                }
                return true;
            },
            checkEnName: function (str) {
                var strs = $.trim(str) === this.role.nameEN.attr('_cqnotice') ? '' : $.trim(str);
                var bl = Reg.checkEnName(strs);
                if (!bl[0]) {
                    this.showTip(this.role.nameEN[0], bl[1]);
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
                if (type === 2) {//境外产品
                    if (national === '中国香港' || national === '中国澳门') {
                        this.showTip(role.national[0], '若您持有中国香港、中国澳门签发的护照前往中国大陆境外，请您携带护照和有效的回乡证办理出境手续', { errorClass: '' });
                    }
                    if (national === '中国台湾') {
                        this.showTip(role.national[0], '若您持有中国台湾签发的护照前往中国大陆境外，请您携带护照和有效的台胞证办理出境手续', { errorClass: '' });
                    }
                    if (national.indexOf('中国') === -1) {
                        this.showTip(role.national[0], '若您持有外籍护照前往中国大陆境外，请确保持有再次进入中国大陆的有效签证', { errorClass: '' });
                    }
                }
                if (type === 1) {
                    if (national === '中国香港' || national === '中国澳门') {
                        this.showTip(role.national[0], '若您持有中国香港、中国澳门签发的护照在中国大陆境内旅行，请您携带护照和有效的回乡证办理登机与入住手续', { errorClass: '' });
                    }
                    if (national === '中国台湾') {
                        this.showTip(role.national[0], '若您持有中国台湾签发的护照在中国大陆境内旅行，请您携带护照和有效的台胞证办理登机和入住手续', { errorClass: '' });
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
                        this.showTip(role.idCardNo[0], tip[1], { errorClass: '' });
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
                    me.showTip(role.cardValidUntilD[0], data, { $obj: elem });
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
                    me.showTip(role.cardValidUntilD[0], data, { $obj: elem });
                } else {
                    self.hideTip(role.cardValidUntilD[0], { $obj: elem });
                }
                if (!error) {
                    var bl = this.getCardValidUntil();
                    if (bl) {
                        if (bl[0]) {
                            bl[1] && me.showTip(role.cardValidUntilD[0], bl[1], { errorClass: '' });
                            self.hideTip(role.cardValidUntilY[0]);
                            self.hideTip(role.cardValidUntilM[0]);
                            role.cardValidUntilY.removeClass('f_error');
                            return true;
                        } else {
                            me.showTip(role.cardValidUntilD[0], bl[1], { $obj: role.cardValidUntilY[0], errorClass: 'f_error' });
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
                    me.showTip(role.birthdayD[0], data, { $obj: elem });
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
                    me.showTip(role.birthdayD[0], data, { $obj: elem });
                } else {
                    $(role.birthdayD).data('valid') &&
                    $(role.birthdayD).data('valid').hide({ $obj: elem });
                }
                if (!error) {
                    var bl = this.getAgeInfo([role.birthdayY.val(), role.birthdayM.val(), role.birthdayD.val()].join('-'));
                    if (!bl[0]) {
                        me.showTip(role.birthdayD[0], bl[1], { $obj: role.birthdayY[0] });
                        return false;
                    } else if (bl[1]) {
                        me.showTip(role.birthdayD[0], bl[1], { $obj: role.birthdayY[0], errorClass: '' });
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
            checkBirthPlace: function (str) {
                if ('' === str) {
                    this.showTip(this.role.birthPlace[0], '请填写出生地');
                    return false;
                }
                return true;
            },
            checkMobileIsNull: function () {
                var str = $.trim(this.role.mobileNo.val());
                if ('' === str) {
                    this.showTip(this.role.mobileNo[0], '请至少填写一位出行人的手机号码');
                    return false;
                }
                return true;
            },
            linstenPickFill: function (bl) {//监听点选常用联系人
                bl && this.filterInputs();
                this.hideTip();
            },
            verify: function (params) {
                var me = this;
                var _ret = true;
                var elem;
                var namesInMe = {
                    'checkName': 'name',
                    "checkCnName": 'nameCN',
                    "checkEnName": 'nameEN'
                };
                $.each(this.role, function (k, v) {
                    var reg, bl = true;
                    if ($(v).css('display') !== 'none' && $(v).closest('li').css('display') !== 'none') {//判断是否隐藏
                        if (reg = $(this).attr('regex')) {
                            // 不可编辑的话，就不必检查
                            if (params && params.canNotEditFields && _.indexOf(params.canNotEditFields, namesInMe[reg]) >= 0) {
                                bl = true;
                            }
                            else {
                                bl = me[reg]($.trim($(this).val()), v);
                            }
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
            init: function (arg, options) {
                options = options || {};
                var me = this;
                var data = arg.initData;
                var customer = data.CustomerInfoTemplate && data.CustomerInfoTemplate.CustomerInfoItems;
                if (!customer) return;
                if (data.CustomerInfoTemplate.FillInNumberLimit && data.CustomerInfoTemplate.FillInNumberLimit.toLowerCase() === 'o') {
                    data.aduNumber = 1;
                    data.chlidNumber = 0;
                }
                var _ref = this.handleData(data, customer);
                var _obj = { 'list': _ref };
                if (data.Reminder) {
                    _obj.Reminder = data.Reminder;
                }
                if (data.onBeforeRender) data.onBeforeRender(_obj);
                self.render(self.tpl.traveller, _obj, function (dom) {
                    roles.travellersID.append(dom);
                    if (data.onAfterRender) data.onAfterRender();
                });
                roles.fillsetID.show();
                options.notToIns || me.toIns();
                me.bindEvent();
                roles.bookInfoID && roles.bookInfoID.show();
            },
            handleHadData: function (data) {
                var handle = function (v, arg) {
                    data[v + 'Y'] = arg[0] || '';
                    data[v + 'M'] = arg[1] || '';
                    data[v + 'D'] = arg[2] || '';
                    return data;
                };
                data.nameEN = data.ENLastName ? (data.ENLastName + '/' + data.ENLastName + ' ' + data.ENMiddleName) : '';
                data = handle('birthday', data.birthday.split('-'));
                data = handle('IDCardTimelimit', data.IDCardTimelimit.split('-'));
                return data;
            },
            handleInfoTemplate: function (data) {
                var _ret = {
                    idOptions: []
                };
                var infoType = 'UserName|ChineseName|EnglishName|Nationality|IDType|IDNumber|CardValidUntil|Sex|Birthday|BirthPlace|ContactPhone';
                $.map(infoType.split('|'), function (v, k) {
                    _ret[v] = '';
                });
                $.map(data, function (v, k) {
                    if (v.CustomerInfoItemModel === 1) {
                        _ret[v.CustomerInfoItemType] = v;
                    } else {
                        if (v.CustomerInfoItemType == 1 && v.Note) {//身份证特殊提示
                            _ret.restrictions = v.Note;
                        }
                        if (!_ret.IDCardType) {//默认的证件类型
                            _ret.IDCardType = v.CustomerInfoItemType;
                        }
                        _ret.idOptions.push(v);
                    }
                });
                if (_ret.idOptions.length) this.idCards = _ret.idOptions;
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
                            _ret.push($.extend(cQuery.copy(template), dfData[_i], { isAdult: true, filled: 't' }));
                            me.setTravellerCount(1, true);
                        } else {
                            _ret.push($.extend(cQuery.copy(template), { isAdult: true, filled: 'f' }));
                        }
                    }
                }
                if (child) {
                    dfData = handle('child');
                    for (var _i = 0; _i < child; _i++) {
                        if (dfData[_i]) {
                            _ret.push($.extend(cQuery.copy(template), dfData[_i], { isAdult: false, filled: 't' }));
                            me.setTravellerCount(0, true);
                        } else {
                            _ret.push($.extend(cQuery.copy(template), { isAdult: false, filled: 'f' }));
                        }
                    }
                }
                return _ret;
            },
            handleBirthDay: function (person) {//确定出行人的出生日期
                var _ret = null;
                if (person.birthday) {
                    _ret = person.birthday;
                } else if (person.IDCardType == 1 && person.IDCardNo) {
                    _ret = self.common.parseCNId(person.IDCardNo).passengerBirth;
                }
                return _ret;
            },
            linstenPickFill: function (el, bl) {//监听点选常用联系人bl:填写/清除
                var index = roles.travellersID.children().index(el);
                this.instances[index].linstenPickFill(bl);
            },
            bindEvent: function () {
                var me = this;
                var nameTips;
                roles.travellersID.on('click', 'a[role="saveId"]', function () {//是否保存常用联系人
                    $(this).toggleClass('selected');
                })
                .on('click', '[role="name"],[role="nameCN"],[role="nameEN"]', function (event) {//输入姓名提示/可选择中英名字
                    me.generateSug(this, $(this).attr('role'), nameTips);
                })
                .on('click', 'a[role="clear"]', function () {//清除填写
                    me.fillClear.call(me, $(this).closest('[role="youren"]'));
                });
                me.fillin();
            },
            instances: [],
            generateSug: function (el, role, nameTips) {//姓名提示
                nameTips && nameTips.remove();
                var _this = $(el);
                var offset = _this.offset(),
                    height = _this.outerHeight(),
                    id = _this.closest('[role="youren"]').attr('index'),
                    _obj = id && mod && mod.Commoners.commonersObj[id];
                var obj = _obj ? _obj : {}; //取得选定常用联系人的信息
                self.render(self.tpl[role + 'Tips'], obj, function (dom) {
                    nameTips = $(dom).appendTo('body').css({
                        'position': 'absolute',
                        'top': offset.top + height,
                        'left': offset.left
                    });
                }, function () {
                    nameTips.on('mousedown', '.had', function (event) {
                        _this.val($(this).find('.name').html());
                        nameTips.hide();
                    });
                    _this.bind('blur', function () {
                        nameTips && nameTips.remove();
                    });
                });
            },
            toIns: function (containerNode) {
                var me = this;
                (containerNode || roles.travellersID).children().each(function () {
                    me.instances.push(new Visitor({ element: this, departDate: vdata.initData.departDate, returnDate: vdata.initData.returnDate }));
                });
            },
            getTravellers: function () {//获取填写好的出行人
                var _oarr = [], _obj;
                var role = self.common.getRoles(roles.travellersID[0]);
                role.youren.each(function (idx) {
                    _obj = {}
                    if ($(this).attr('filled') === 'f')
                        return true;
                    var _this = $(this), name;
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
            fillin: function () {//手动填写订票信息
                var roles = vdata.roles;
                var me = this;
                var val;
                var isFilled = function (role) {//是否已经填充
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
                        elem.attr({ 'filled': 't' });
                        me.setTravellerCount(+ptype, true);
                    } else {
                        elem.attr({ 'filled': 'f' });
                        //更新常用人的选择
                        if (id = elem.attr('index')) {
                            ptype = mod && mod.Commoners.commonersDom.find('a.cb-item[cid="' + id + '"]').attr('ptype');
                            elem.attr({ 'index': '' });
                            mod && mod.Commoners && mod.Commoners.removeCommonerSelected.call(mod.Commoners, id);
                            me.setTravellerCount(+ptype, false);
                        } else {
                            ptype = elem.attr('ptype');
                            me.setTravellerCount(ptype, false);
                        }
                    }
                });
            },
            fillClear: function () {//清除填写和保存常用联系人
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
                for (var i in role) {//清除填写
                    if (role[i].attr('role') === 'idCardType')
                        continue;
                    role[i][0].setAttribute('value', '');
                    role[i].val('')
                }
                wrap.attr({ index: '', filled: 'f' }); //重置填写标志
                if (id) {
                    mod && mod.Commoners.removeCommonerSelected.call(mod.Commoners, id);
                    rptype = mod && mod.Commoners.commonersDom && mod.Commoners.commonersDom.find('a.cb-item[cid="' + id + '"]').attr('ptype');
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
                if (role.saveId) _obj.isSaveTo = role.saveId.hasClass('selected') ? 1 : 0;
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
                                                Mid: tn[1] && tn[1].split(/\s+/)[1] || ''
                                            };
                                        }
                                    }
                                }
                                break;
                            case 'nameCN':
                                _obj.CnName = val === v.attr('_cqnotice') ? '' : val;
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
            verify: function (containerNode, params) {
                var _ret = true;
                var mobile = false;
                $.each(this.instances, function (k, v) {
                    var arg = v.verify(params);
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
                    this.save(!0, containerNode);
                }
                return _ret;
            },
            save: function (isSubmit, containerNode) {
                var me = this;
                var node = containerNode || roles.travellersID;
                var elems = isSubmit ? node.children() : node.children('[filled="t"]');
                self.formData.PassengerInfos.length = 0;
                elems.each(function () {
                    self.formData.PassengerInfos.push(me.setData(this));
                });
                self.onAfterSave && self.onAfterSave();
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
            adultCount: [], //已选择成人个数
            childCount: [], //已选择儿童个数
            travellerCount: []//已选择的旅客个数
        }
    };
    
    module.exports = Travellers;
    module.exports.setJQuery = function (jQuery) {
        $ = jQuery;
    };
});     