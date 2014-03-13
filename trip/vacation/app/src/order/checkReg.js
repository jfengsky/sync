define(function (require) {
    var $ = require('jquery');
    return {
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
        checkCnName: function (str) {
            if ('' === str)
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
            return [true, ];
        },
        checkEnName: function (str) {
            if ('' === str)
                return [false, "请填写英文姓名，姓名格式为姓/名，姓与名之间用 / 分隔，如Green/Jim King"];
            if (str.length < 2)
                return [false, '英文姓名不可少于2个英文单词。姓与名之间必须用/隔开'];
            if (!this.isEnName(str))
                return [false, "请填写正确的英文姓名，姓名格式为姓 / 名，姓与名之间用 / 分隔，如Green/Jim King"];
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
                return this.checkCnName(str);
            }
            else if (type == 'ID' && val == 1)
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
                    if (!/^0[1-9]{2,3}$/.test(str))
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
            if (!/^0?1[3458]\d{9}$/.test(str))
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
                if (!/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[A-Z])$/.test(str))
                    return [false, '请输入正确的' + _ref[type] + '号码'];
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
        }
    }
});