/*
* @author peic@ctrip.com
*/
define(function (require, exports, module) {

    var _ = {};

    var int = _.int = function (o) {
        return parseInt(o, 10);
    };

    /*
    * @param {String} str
    * @param {Number} len
    * @param {String} fill
    * @param {Boolean} pre
    * @example pad('1', 3, '0') ==> '001'
    * @example pad('1', 3, '-', true) ==> '1--'
    */
    var pad = _.pad = function (str, len, fill, pre) {
        str = str.toString();
        if (str.length < len) {
            fill = (new Array(len)).join(fill || ' ');
            if (pre) {
                str = (fill + str).substr(-len);
            } else {
                str = (str + fill).substring(0, len);
            }
        }
        return str;
    };

    _.calendar = {
        /*
        * @param {String} str 2014-01-01
        */
        strToDate: function (str) {
            if (str instanceof Date || !str) return str;

            var arr = str.split('-'), year, month, day;
            if (arr.length != 3 || !(year = int(arr[0])) || !(month = int(arr[1])) || !(day = int(arr[2]))) return str;
            return new Date(year, month - 1, day);
        },
        /*
        * @param {Date | Number} date|month
        */
        getFullMonth: function (date) {
            return int(date instanceof Date ? date.getMonth() : date) + 1;
        },
        /*
        * @param {Date | String} date '2014-03-02'
        * @param {String} [format = 'yyyy-mm-dd'] 'yyyy-mm-dd HH:MM:ss'
        */
        format: function (date, format) {
            if (!(date = _.calendar.strToDate(date))) return date;
            format = format || 'yyyy-mm-dd';

            date = format.replace(/y+|m+|d+|H+|M+|s+/g, function (match) {
                var firstChar = match.substr(0, 1),
                    len = match.length;
                switch (firstChar) {
                    case 'y':
                        return date.getFullYear().toString().substr(4 - len);
                    case 'm':
                        return pad(date.getMonth() + 1, len, '0', true);
                    case 'd':
                        return pad(date.getDate(), len, '0', true);
                    case 'H':
                        return pad(date.getHours(), len, '0', true);
                    case 'M':
                        return pad(date.getMinutes(), len, '0', true);
                    case 's':
                        return pad(date.getSeconds(), len, '0', true);
                }
            });
            return date;
        }
    };

	module.exports = _;
});