/**
 * Description: 倒计时模块
 * Author: jiangfeng(jiang.f@ctrip.com)
 * Date: 2014-06-03 19:37
 *
 */

define(function(require, exports, module) {
  "use strict";

  function Countdown() {
    /**
     * 清除计时器
     * @param  {Object} _timeInterval 正在运行的计时器
     * @return 
     */
    this.clear = function(_timeInterval){
      clearInterval(_timeInterval);
    };

    /*
     * 位数补0，保持时，分，秒为2位
     * @param {Number} tempTime 时间数字
     * @return {String} 返回补0后的字符串
     */
    this._fullTime = function(tempTime){
      if (tempTime.toString().length <= 1) {
        return "0" + tempTime;
      } else {
        return tempTime;
      }
    };
  };

  Countdown.prototype = {
    /**
     * 初始化
     * @param  {Object} _args 参数
     *     @param {Number}    startTime      开始时间
     *     @param {Number}    endTime        结束时间
     *     @param {Function}  intervalback    倒计时阶段的回调函数
     *     @param {Function}  callback        倒计时结束后回调函数
     * @return undefined
     */
    init: function(_args) {
      var self = this,
        countTime = _args.endTime - _args.startTime,
        timeInterval = setInterval(function() {
          var tempTime;
          if (countTime > 0) {
            countTime = countTime - 1000;
            tempTime = {
//              d: self._fullTime(Math.floor(countTime / 86400000)),
              d: Math.floor(countTime / 86400000),
              h: self._fullTime(Math.floor(countTime / 3600000 % 24)),
              m: self._fullTime(Math.floor(countTime / 60000 % 60)),
              s: self._fullTime(Math.floor(countTime / 1000 % 60)),
              c: countTime
            };
            if (_args.intervalback) {
              _args.intervalback(tempTime);
            }
          } else {
            self.clear(timeInterval);
            if (_args.callback) {
              _args.callback();
            }
          }
        }, 1000);
      return timeInterval;
    }
  };

  module.exports = Countdown;
});