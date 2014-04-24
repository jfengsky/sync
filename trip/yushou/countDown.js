/**
 * 倒计时
 * 只要活动还没开始，
 * 距离活动开始时间＞24小时，就显示“距秒杀开始还剩**天**小时**分钟”的倒计时。
 * 距离活动开始时间≤24小时，就显示“距秒杀开始还剩**小时**分钟**秒”的倒计时。
 * 只要在活动的抢购时间，就显示“距秒杀结束还剩**小时**分钟**秒”的倒计时。
 * 在活动的抢购时间内，如果所有站点的产品全部卖完了，那么显示提示话术“本期秒杀产品已售罄 更多优惠 请期待下期”
 */
define(function (require, exports, module) {

  /*
   * 倒计时
   */
  function Countdown(){
    var self = this,
        timeInterval;
        
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

    /**
     * 清除计时器
     * @return 
     */
    this.clear = function(){
      clearInterval(timeInterval);
    };

    /**
     * 初始化倒计时
     * @param {JsonObject} args 倒计时参数:
     *     @param {Number}    startTime       开始时间(ms)
     *     @param {Number}    endTime         结束时间(ms)
     *     @param {Function}  intervalback    倒计时阶段的回调函数
     *     @param {Function}  callback        倒计时结束后回调函数
     *  
     */
    this.init = function(args){
      var countTime = args.endTime - args.startTime;
      timeInterval = setInterval(function () {
        var tempTime;
        if (countTime > 0) {
            countTime = countTime - 1000;
            tempTime = {
                d: self._fullTime(Math.floor(countTime / 86400000)),
                h: self._fullTime(Math.floor(countTime / 3600000 % 24)),
                m: self._fullTime(Math.floor(countTime / 60000 % 60)),
                s: self._fullTime(Math.floor(countTime / 1000 % 60)),
                c: countTime
            };
            if(args.intervalback){
              args.intervalback(tempTime);
            }
        } else {
            self.clear();
            if(args.callback){
              args.callback();
            }
        }
      }, 1000);
    }


  };

	module.exports = Countdown;
});