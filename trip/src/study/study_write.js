/*
* @Author :    qxzhan
* @Date   :    2013/10/08
* @Desc   :    游学填写页JS
*/
define(function (require, exports) {
    GV.app.write = {
        hasChsChar: function (pStr) {
            return /[\u0100-\uffff]/.test(pStr);
        },
        checkChsName: function (pStr) {
            return /^[\u4e00-\u9fa5a-zA-Z-]+$/.test(pStr);
        },
        checkEmail: function (pStr) {
            return /^[^@\s]+@[^@\.\s]+(\.[^@\.\s]+)+$/.test(pStr);
        },
        checkPhone: function (pStr) {
            return /^0?1[3458]\d{9}$/.test(pStr);
        },
        checkDate: function (pStr) {
            return /^(\d{4})(-|\/)(\d{1,2})\2(\d{1,2})$/.test(pStr);
        },
        deleteEmpty: function (pStr) {
            return pStr.replace(/(^\s*)|(\s*$)/g, "");
        },
        writeYear: function (pStr) {
            return pStr.split("-")[0];
        },
        writeMouth: function (pStr) {
            return parseInt(pStr.split("-")[1]) < 10 ? "0" + parseInt(pStr.split("-")[1]) : pStr.split("-")[1];
        },
        writeDay: function (pStr) {
            return parseInt(pStr.split("-")[2]) < 10 ? "0" + parseInt(pStr.split("-")[2]) : pStr.split("-")[2];
        },
        //拆分时间成yyyy-mm-dd格式
        splitDate: function (pStr) {
            return GV.app.write.writeYear(pStr) + "-" + GV.app.write.writeMouth(pStr) + "-" + GV.app.write.writeDay(pStr);
        },
        //拆分时间成yyyy-mm-dd格式 为了兼容IE的时间比较
        splitDateCompatible: function (pStr) {
            return GV.app.write.writeYear(pStr) + "/" + GV.app.write.writeMouth(pStr) + "/" + GV.app.write.writeDay(pStr);
        },
        //验证日期的合法性
        validityDay: function (pStr) {
            var _year = GV.app.write.writeYear(pStr),
               _mouth = GV.app.write.writeMouth(pStr),
               _day = GV.app.write.writeDay(pStr);
            if (_mouth == 0 || _mouth > 12 || _day == 0 || _day > 31 || _year == 0) {
                return false;
            }
            if ((_year % 4 == 0 && _year % 100 != 0) || _year % 400 == 0) {
                if (_mouth == 2 && _day > 29) {
                    return false;
                }
            }
            else {
                if (_mouth == 2 && _day > 28) {
                    return false;
                }

            }
            return true;
        },
        //判断时间是否为不可用时间
        checkRightDate: function (pStr, pArray) {
            for (var i = 0, len = pArray.length; i < len; i++) {
                if (GV.app.write.splitDate(pStr) == pArray[i]) {
                    return true;
                }
            }
            return false;
        },
        //判断时间是否在开始时间和结束时间之间
        checkSectionDate: function (pStart, pEnd, pNow) {
            var _start = GV.app.write.splitDateCompatible(pStart),
                 _end = GV.app.write.splitDateCompatible(pEnd),
                 _now = GV.app.write.splitDateCompatible(pNow);
            if (new Date(Date.parse(_now)) >= new Date(Date.parse(_start)) && new Date(Date.parse(_now)) <= new Date(Date.parse(_end))) {
                return true;
            }
            return false;
        },
        formatDate: function (pStr) {
            var _date = new Date();
            _date.setFullYear(GV.app.write.writeYear(pStr));
            _date.setMonth(GV.app.write.writeMouth(pStr) - 1);
            _date.setDate(GV.app.write.writeDay(pStr));
            return _date;
        },
        unableDate: function (pStart, pEnd, pUnableDate) {
            var _start = GV.app.write.formatDate(pStart),
                _end = GV.app.write.formatDate(pEnd),
                _date;
            if (pUnableDate) {
                while (!(_start.getFullYear() == _end.getFullYear() && _start.getMonth() == _end.getMonth() && _start.getDate() == _end.getDate())) {
                    var _day = _start.getFullYear() + "-" + (_start.getMonth() + 1) + "-" + _start.getDate();
                    if (_day != GV.app.write.splitDate(pUnableDate)) {
                        _date = _day;
                        break;
                    }
                    else {
                        _start.setDate(_start.getDate() + 1);
                    }
                }
                return _date;
            }
            else {
                return pStart;
            }
        },
        returnValidate: $(document).regMod('validate', '1.1'),
        //返回错误信息
        returnError: function (pStr, pData) {
            $.mod.load('validate', '1.1', function () {
                GV.app.write.returnValidate.method("show", {
                    $obj: pStr,
                    data: pData,
                    removeErrorClass: true
                });

            });
        },
        //获取url中的日期
        getUrlDate: function (pStr) {
            var _reg = new RegExp("(^|&)" + pStr + "=([^&]*)(&|$)"),
                   _date = window.location.search.substr(1).match(_reg);
            if (_date != null) {
                return unescape(_date[2])
            }
            return null;
        },
        submitForm: function (pSubmit) {
            var _minDate = GV.app.write.data.dateRange[0],
                _maxDate = GV.app.write.data.dateRange[1],
                _prohibit = GV.app.write.data.journey[0][6][0][0].replace(/^@|\D\d+@$/g, "").split("|1@@").unique(),
                _isSubmit = true;
            if ($("#TakeoffDate").length > 0) {
                var _TakeoffDate = GV.app.write.getUrlDate("TakeoffDate");
                if (_TakeoffDate != null && GV.app.write.checkDate(_TakeoffDate) && GV.app.write.validityDay(_TakeoffDate) && !GV.app.write.checkRightDate(_TakeoffDate, _prohibit) && GV.app.write.checkSectionDate(_minDate, _maxDate, _TakeoffDate)) {
                    $("#TakeoffDate").value(_TakeoffDate);
                }
                else {
                    $("#TakeoffDate").value(GV.app.write.unableDate(_minDate, _maxDate, _prohibit[0]));
                }
                $("#TakeoffDate").regMod("calendar", "3.0", {
                    options: {
                        showWeek: true,
                        minDate: _minDate,
                        maxDate: _maxDate,
                        prohibit: _prohibit
                    }
                });
            }
            if (document.getElementById(pSubmit)) {
                document.getElementById(pSubmit).onclick = function () {
                    if ($("#TakeoffDate").length > 0) {
                        var _TakeoffDate = $("#TakeoffDate").value();
                        if (_TakeoffDate.length == 0 || _TakeoffDate == "yyyy-mm-dd") {
                            GV.app.write.returnError($("#TakeoffDate"), "请选择出发班期");
                            $("#TakeoffDate").trigger('focus');
                            return false;
                        }
                        else if (!GV.app.write.checkDate(_TakeoffDate) || !GV.app.write.validityDay(_TakeoffDate) || GV.app.write.checkRightDate(_TakeoffDate, _prohibit) || !GV.app.write.checkSectionDate(_minDate, _maxDate, _TakeoffDate)) {
                            GV.app.write.returnError($("#TakeoffDate"), "请选择有效的出发班期");
                            $("#TakeoffDate").trigger('focus');
                            return false;
                        }
                    }
                    if ($("#ContactName").length > 0) {
                        var _ContactName = GV.app.write.deleteEmpty($("#ContactName").value());
                        if (_ContactName.length == 0) {
                            GV.app.write.returnError($("#ContactName"), "请填写旅客姓名");
                            return false;
                        }
                        /*
                        else if (!GV.app.write.hasChsChar(_ContactName) || !GV.app.write.checkChsName(_ContactName)) {
                        GV.app.write.returnError($("#ContactName"), "中文姓名只能包含汉字（至少一个）、字母和连字符，请重新填写");
                        return false;
                        }*/
                    }
                    if ($("#ContactTel").length > 0) {
                        var _ContactTel = GV.app.write.deleteEmpty($("#ContactTel").value());
                        if (_ContactTel.length == 0) {
                            GV.app.write.returnError($("#ContactTel"), "请填写手机号码/电话");
                            return false;
                        }
                        /*
                        if (_ContactTel.slice(0, 1) == 1 && !GV.app.write.checkPhone(_ContactTel)) {
                        GV.app.write.returnError($("#ContactTel"), "请输入正确的手机号码");
                        return false;
                        }
                        else {
                        if (/[^\d]/.test(_ContactTel)) {
                        GV.app.write.returnError($("#ContactTel"), "电话号码必须是数字");
                        return false;
                        }
                        if (_ContactTel.length < 7) {
                        GV.app.write.returnError($("#ContactTel"), "电话号码必须是7位以上的数字");
                        return false;
                        }
                        }*/
                    }
                    if ($("#ContactEmail").length > 0) {
                        var _ContactEmail = GV.app.write.deleteEmpty($("#ContactEmail").value());
                        if (_ContactEmail.length == 0) {
                            GV.app.write.returnError($("#ContactEmail"), "请填写Email");
                            return false;
                        }
                        else if (!GV.app.write.checkEmail(_ContactEmail)) {
                            GV.app.write.returnError($("#ContactEmail"), "请填写正确的Email地址，格式：a@b.c");
                            return false;
                        }
                    }
                    if (_isSubmit) {
                        _isSubmit = false;
                        setTimeout(function () { _isSubmit = true }, 2000);
                        return true;
                    }
                    else {
                        return false
                    }

                }
            }
        }
    };
    exports.submitForm = GV.app.write.submitForm;
})