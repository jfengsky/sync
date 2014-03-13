/**
* 处理生日
* @author hwmiao<hwmiao@ctrip.com>
*/
define(function (require, exports, module) {
    var GVdate = require('../order/GVdate');
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

    module.exports = Birth;
});
