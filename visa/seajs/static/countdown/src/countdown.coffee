define (require, exports, module) ->
  $ = require('jquery')
  ###
   * 倒计时
   * @param {JsonObject} args 倒计时参数:
   *     @param {String} format     格式化时间(d:h:m:s)
   *     @param {Number} startTime  开始时间(ms)
   *     @param {Number} endTime    结束时间(ms)
   *     @param {Function} callback 倒计时结束后回调函数
  ###
  Countdown = () ->
    # if !args.startTime
    #   throw new Error "no start time"
    # else if !args.endTime
    #   throw new Error "no end time"

    self = this
    timeInterval = null

    ###
     * 位数补0，保持时，分，秒为2位
     * @param {Number} tempTime 时间数字
     * @return {String} 返回补0后的字符串
    ###
    @_fullTime = (tempTime) ->
      if tempTime.toString().length <= 1 then "0" + tempTime else tempTime
    ###
     * 倒计时方法
    ###


    @stop = () ->
      clearInterval(timeInterval)
      timeInterval = null
      return


    @_checkTime = () ->
      return

    @init = (id, args) ->
      countTime = args.endTime - args.startTime
      timeInterval = setInterval(()->
        if countTime > 0
          countTime = countTime - 1000
          tempTime =
            d: Math.floor( countTime / (1000 * 60 * 60 * 24) )
            h: self._fullTime Math.floor( countTime / (1000 * 60 * 60) % 24 )
            m: self._fullTime Math.floor( countTime / (1000 * 60) % 60 )
            s: self._fullTime Math.floor( countTime / 1000 % 60 )
          $(id).html(tempTime.d + ':' + tempTime.h + ':' + tempTime.m + ':' + tempTime.s)
          return
        else if countTime <= 0
          this.stop()
          args.callback()
          return
      1000)
      return
    return
  module.exports = Countdown

  return