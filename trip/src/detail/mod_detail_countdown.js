define(function (require, exports, module) {
    var $, Countdown;
    $ = require('jquery');
    /*
     * 倒计时
     * @param {JsonObject} args 倒计时参数:
     *     @param {String} content    倒计时容器
     *     @param {Number} startTime  开始时间(ms)
     *     @param {Number} endTime    结束时间(ms)
     *     @param {Function} callback 倒计时结束后回调函数
     */
    Countdown = function (args) {
        var countTime, self, timeInterval;
        self = this;
        countTime = args.startTime - args.currentTime;
        /**
         * 比较两个时间，TODO 是否考虑:(如果大于1天，显示 产品抢订时间为：2014年03月27日 15:00 ~ 2014年03月28日 23:59)
         * 如果小于1天，显示 产品抢订时间为：2014年03月27日 15:00-23:59
         */
        // this._notice = function(){
        //     var tempStartDate = new Date(args.startTime),
        //         tempEndDate = new Date(args.endTime),
        //         fullYear = tempStartDate.getFullYear(),
        //         fullMonth = tempStartDate.getMonth(),
        //         fullDate = tempStartDate.getDate(),
        //         startHours = tempStartDate.getHours(),
        //         startMinute = tempStartDate.getMinutes(),
        //         endHours = tempEndDate.getHours(),
        //         endMinute = tempEndDate.getMinutes();
        //     // $('#J_countips').html('产品抢订时间为：' + fullYear + '年' + self._fullTime(fullMonth) + '月' + self._fullTime(fullDate) + '日 ' + self._fullTime(startHours) + ':' + self._fullTime(startMinute) + '-' + self._fullTime(endHours) + ':' + self._fullTime(endMinute) + '，目前未到抢订时间，产品暂时不能预订。');
            
        // };

        /*
         * 位数补0，保持时，分，秒为2位
         * @param {Number} tempTime 时间数字
         * @return {String} 返回补0后的字符串
         */
        this._fullTime = function (tempTime) {
            if (tempTime.toString().length <= 1) {
                return "0" + tempTime;
            } else {
                return tempTime;
            }
        };

        // 写入notice
        // self._notice();

        /*
         * 倒计时方法
         */
        timeInterval = setInterval(function () {
            var tempTime;
            if (countTime > 0) {
                countTime = countTime - 1000;
                tempTime = {
                    d: Math.floor(countTime / (1000 * 60 * 60 * 24)),
                    h: Math.floor(countTime / (1000 * 60 * 60) % 24),
                    m: Math.floor(countTime / (1000 * 60) % 60),
                    s: Math.floor(countTime / 1000 % 60)
                };
                // 只保留HH:MM:SS格式，天换算成小时
                $('#J_countime').html('距抢购开始还剩<span>' + self._fullTime(tempTime.d * 24 + tempTime.h) + '</span>小时<span>' + self._fullTime(tempTime.m) + '</span>分钟<span>' + self._fullTime(tempTime.s) + '</span>秒');
            } else {
                clearInterval(timeInterval);
                args.callback();
            }
        }, 1000);
    };
    module.exports = Countdown;
});
