//工具
define(function (require, exports, module) {
    var _ = require('../../../lib/underscore.js');
    var $ = require('jquery');

    var _data = {};
    var toString = Object.prototype.toString;
    exports.data = {
        get: function (name) {
            return _data[name];
        },
        set: function (name, value) {
            return _data[name] = value;
        }
    };

    var int = exports.int = function (num) {
        return parseInt(num, 10);
    };

    exports.getMoneyHtml = function (money) {
        if (money == 0) return '--';

        return (money > 0 ? '' : '-') + '<dfn>&yen;</dfn>' + Math.abs(money);
    };

    var extendDeep = exports.extendDeep = function (target, sources) {
        _.each([].slice.call(arguments, 1), function (source) {
            _.each(source, function (val, key) {
                (_.isObject(val) && target[key]) ? extendDeep(target[key], val) : (target[key] = val);
            });
        });
        return target;
    }

    /*
    * @param {String} dateStr 如：2013-12-09
    */
    function dateStrToDate(dateStr) {
        var dateArr = dateStr.split('-');
        return new Date(dateArr[0], int(dateArr[1]) - 1, int(dateArr[2]));
    }

    // getWeekday('2013-11-25') => '周一'
    /*
    * @param {String} day
    */
    exports.getWeekday = function (day) {
        var date = dateStrToDate(dtdate(day));
        day = date.getDay();
        return '周' + (['日', '一', '二', '三', '四', '五', '六'])[day]; //[(new Date(dtdate(day))).getDay()];
        //return '周' + (['日', '一', '二', '三', '四', '五', '六'])[(new Date(day.split('-'))).getDay()];
    }

    exports.isSameDay = function (day1, day2) {
        return dtdate(day1) == dtdate(day2);
    }

    /*
    * 保留数字的小数点后多少位
    * @param {Number} number
    * @param {Number} places 多少位
    * @param {Boolean} round 是否四舍五入
    * 
    * eg. decimal(1.236, 2) -> 1.24
    * js的乘法，除法，都有问题：IEEE标准，只能如此了
    * 如：  1.2365269 * 10 = 12.365269000000001
    * 如：  -24 + 47.2 = 23.200000000000003
    */
    exports.decimal = function (number, places, round) {
        var reg = new RegExp('^-?(\\d*\\.\\d{' + places + '})(\\d{0,1})');
        var matches = number.toString().match(reg);
        //too big number 才用科学计数法
        var isScientificNotation = number.toString().match(/e/g);
        if (!matches || isScientificNotation) return number;

        var isNegative = number.toString().indexOf('-') == 0;
        var numStr = matches[1];
        var theAfter = matches[2];

        var num = int(numStr.replace('.', ''));
        if (theAfter && (round === true || round === undefined)) {
            //theAfter = int(theAfter);
            if (theAfter >= 5) {
                num += 1;
            }
        }
        var p = Math.pow(10, places);
        var result = num / p;
        return isNegative ? -result : result;
    }

    // 实时计价
    exports.isRealtimePrice = function (MinPrice) {
        return MinPrice == 0;
    };

    Handlebars.registerHelper('isRealtimePrice', function (MinPrice, options) {
        return exports.isRealtimePrice(MinPrice) ? options.fn(this) : options.inverse(this);
    });

    // ** 遍历对象请使用 each helper
    // 可以循环一个Range，list 参数传参："null"
    // 指定 从n 到m ，step步进x，并且有 $first, $last, $index
    // 如：
    //		var tpl = '{{#eachx "null" 2 10 1}}isFirst:{{$first}}, isRealFrist:{{$realFirst}}, isLast:{{$last}}, isRealLast:{{$realLast}}, index:{{$index}}\n{{/eachx}}';
    //		console.log(Handlebars.compile(tpl)());
    //
    //		var tpl = '{{#eachx arr 1 3}}value:{{$value}}, isFirst:{{$first}}, isRealFrist:{{$realFirst}}, isLast:{{$last}}, isRealLast:{{$realLast}}, index:{{$index}}\n{{/eachx}}';
    //		console.log(Handlebars.compile(tpl)({ arr: ['a', 'b', 'c', 'd', 'e'] }));
    //exports.registerEachx = function () {
    // @param {Array|String["null"]} [list="null"]
    // @param {Number} [from=1]
    // @param {Number|String["last"]} [to=list.length]//最后一个**包含**在内
    // @param {Number} [step=1]
    Handlebars.registerHelper('eachx', function (list, from, to, step, options) {
        var args = [].slice.call(arguments, 0);
        //其他参数都可能没有，但options作为最后一个参数肯定有
        options = args.pop();
        //if (args.length <= 1) throw new Error('arguments must have 1 params at least.');
        list == 'null' && (list = null);
        //if (!_.isArray(list) && list !== null) throw '{{#eachx }} 1st arguments error. should be an Array or "null" String.';
        from = args[1] || 0;
        if (args[2] === undefined || (args[2] == 'last')) {
            if (!list) throw '[#eachx] list can not be null if you want each to last.';
            to = list.length;
        }
        else {
            to = args[2];
        }
        step = args[3] || 1;
        //console.log(list, from, to, step);
        if (from > to || (list && to > list.length)) {
            throw new Error("[#eachx] Wrong Params pass to eachx helper. from: " + from + ", to: " + to + ", list: " + list);
        }
        var out = [];
        for (var i = from; i <= to; i += step) {
            var val = {}; // list ? list[i] : {};
            val.$value = list && list[i];
            val.$realFirst = i === 0;
            val.$first = i === from;
            val.$realLast = i === (list ? list.length : to) - 1;
            val.$last = (i + step >= to);
            val.$index = i;
            out.push(options.fn(val));
        }
        return out.join('');
    });


    Handlebars.registerHelper('listItem', function (list, key, options) {
        if (list && list[key]) {
            return options.fn(list[key]);
        }
        else return '';
    });

    //exports.registerModulus = function () {
    /*
    * @param {Number} left
    * @param {Number} right
    * @param {Number} compareResultTo
    */
    Handlebars.registerHelper('modulus', function (left, right, compareResultTo, options) {
        return left % right === compareResultTo ? options.fn() : options.inverse();
    });
    //};

    // 如果传多个参数，则判断全部为空：isEmpty && isEmpty && ..
    Handlebars.registerHelper('isEmpty', function (obj, options) {
        var args = [].slice.apply(arguments);
        options = args.pop();
        var isEmpty = true;
        for (var i = 0, len = args.length; i < len; i++) {
            if (!_.isEmpty(args[i])) {
                isEmpty = false;
                break;
            }
        }
        return isEmpty ? options.fn(this) : options.inverse(this);
    });

    // 如果传多个参数，则判断全部不为空：!isEmpty && !isEmpty && ..
    Handlebars.registerHelper('notEmpty', function (obj, options) {
        var args = [].slice.apply(arguments);
        options = args.pop();
        var notEmtpy = true;
        for (var i = 0, len = args.length; i < len; i++) {
            if (isEmpty(args[i])) {
                notEmtpy = false;
                break;
            }
        }
        return notEmtpy ? options.fn(this) : options.inverse(this);
    });

    function isEmpty(o) {
        var n = toString.call(o);
        if (n == '[object Array]' || n == '[object Object]') return _.isEmpty(o);
        return !o;
    }
    exports.isEmpty = isEmpty;
    // 任何一个不为空
    Handlebars.registerHelper('anyNoneEmpty', function (obj, options) {
        var args = [].slice.apply(arguments);
        options = args.pop();
        var anyNoneEmpty = _.some(args, function (el) { return !isEmpty(el) });
        return anyNoneEmpty ? options.fn(this) : options.inverse(this);
    });


    Handlebars.registerHelper('moneyHTML', function (money) {
        return exports.getMoneyHtml(money);
    });

    Handlebars.registerHelper('noNewline', function (str) {
        return str.replace(/\n|\r/g, '');
    });
    /*
    * DT means 蛋疼
    */
    //exports.registerDTDate = function () {
    /*
    * @param {String} date 2013-12-04T00:00:00
    *
    * @return {String} 2013-12-04
    */
    //window.dtdate = dtdate;
    function dtdate(date) {
        //return date.substr(0, 10);
        //return _.isEmpty(date) ? date : (date.match(/^\d+-\d+-\d+/)[0]);
        if (_.isEmpty(date)) {
            return date;
        }
        else {
            var result = date.match(/^(\d+)-(\d+)-(\d+)/);
            if (!result) result = date.match(/^(\d+)\/(\d+)\/(\d+)/);

            if (result) {
                //return result[0];
                date = new Date(result[1], int(result[2]) - 1, result[3]);
            }
            else {
                //return date;
                // 日历 big_calendar 有 bug，会返回 "Mon Dec 09 2013 00:00:00 GMT+0800 (中国标准时间)" 这样的日期，而不是 "2013-12-09"
                try {
                    date = new Date(date);
                }
                catch (e) {
                    return date;
                }
            }
            ////////这种方式太不靠谱了，坑啊
            // => "2013年12月9日" => ["","2013","12","9",""] => ["","2013","12","09",""]
            //date = _.map(date.toLocaleDateString().split(/[^\d]+/), function (d) { return d.length == 1 ? ('0' + d) : d });
            // => ["2013","12","09"]
            //date = _.filter(date, function (d) { return d.length >= 2 });

            var year = date.getFullYear(), month = date.getMonth() + 1, day = date.getDate();
            if (month.toString().length == 1) month = '0' + month;
            if (day.toString().length == 1) day = '0' + day;
            // => 2013-12-09
            return [year, month, day].join('-');
        }
    }
    exports.dtdate = dtdate;
    Handlebars.registerHelper('dtdate', function (date) {
        //var index = date.indexOf('T');
        return dtdate(date);
    });
    //}


    Handlebars.registerHelper('console', function (a, b, c, d, e) {
        try {
            console.log(a, b, c, d, e);
        }
        catch (e) { }
    });

    //exports.registerOperator = function () {
    /*
    * @param {Number} left
    * @param {Number} right
    * @param {Number} compareResultTo
    */
    Handlebars.registerHelper('operator', function (left, operator, right, options) {
        //return left % right === compareResultTo ? options.fn() : options.inverse();
        switch (operator) {
            case '+':
                return left + right;
            case '-':
                return left - right;
            case '*':
                return left * right;
            case '/':
                return left / right;
            case '%':
                return left % right;
        }
    });
    //}

    Handlebars.registerHelper('EmptyStar', function (Star) {
        var stars = ["", "经济型", "经济型", "舒适型", "高档型", "豪华型"];
        return stars[Star];
    });

    Handlebars.registerHelper('week', function (date) {
        return exports.getWeekday(date);
    });

    Handlebars.registerHelper('Min', function (a, b) {
        return Math.min(a, b);
    });

    Handlebars.registerHelper('Max', function (a, b) {
        return Math.max(a, b);
    });


    var windowEventFactory = function (eventName, waitTime) {
        return (function () {
            var cache = [];
            var wait = waitTime || 100;
            var timeoutId;

            $(window).on(eventName, function (e) {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(function () {
                    _.each(cache, function (fn, index) {
                        fn(e);
                    })
                }, wait);
            });

            var on = function (fn) {
                cache.push(fn);
                return fn;
            }

            on.off = function (fn) {
                cache = _.without(cache, fn);
            };

            return on;
        })();
    };
    var genDocEvent = function (eventName, cache) {
        GV.ready(function () {
            $(document).on(eventName, function (e) {
                _.each(cache, function (fn, index) {
                    fn.call(e.target, e);
                });
            });
        });

        var on = function (fn) {
            cache.push(fn);
            return fn;
        }

        on.off = function (fn) {
            cache = _.without(cache, fn);
        }

        return on;
    };

    //窗口缩放
    exports.onResize = windowEventFactory('resize', 20);

    //窗口滚动条事件
    exports.onScroll = windowEventFactory('scroll', 10);

    //点击文档
    exports.onDocClick = genDocEvent('click', []);

    //文档keyup
    exports.onDocKeyup = genDocEvent('keyup', []);
});