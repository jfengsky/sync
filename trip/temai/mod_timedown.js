/**
 * 页面倒计时配置模块
 * Created by jiangfeng on 14-6-4.
 */
define(function(require, exports, module) {
  "use strict";
  var $ = require('jquery'),
    Countdown = require('./mod_countdown'),
    countDown = new Countdown();
  function TimeDown(){
    var self = this;

    /**
     * 倒计时中执行的方法
     * @return 
     */
    this._interval = function(_obj, _time){
      $(_obj).html(_time.d + '天' + _time.h + '小时' + _time.m + '分' + _time.s + '秒');
    };
    
    /**
     * 初始化
     * @return
     */
    this.init = function(){
      $.each($('.J_count'), function(_index, _item){
        var tempTime = $(_item).attr('data-time'),
          timeArr = [];
        if(tempTime){
          timeArr = tempTime.split('|');
          countDown.init({
            startTime: timeArr[0],
            endTime: timeArr[1],
            intervalback: function(_data){
              self._interval(_item, _data);
            },
            callback: function(){
              console.log('end');
            }
          });
        }
      });
    };
  };
  module.exports = TimeDown;

});