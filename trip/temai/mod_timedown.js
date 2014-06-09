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
     * 顶部倒计时模板
     * @param  {Object}     _Obj              显示倒计时容器
     * @param  {Object}     _time             统计时间
     * @return
     */
    this._topInterval = function(_obj, _time){
      $(_obj).html('疯抢倒计时 <span>' + _time.d + '<i>天</i></span>&nbsp;<span>' + _time.h + '</span> : <span>' + _time.m + '</span> : <span>' + _time.s + '</span>');
    };

    /**
     * 产品倒计时模板
     * @param  {Object}     _Obj              显示倒计时容器
     * @param  {Object}     _time             统计时间
     * @return
     */
    this._interval = function(_obj, _time){
      $(_obj).html('预订截至： <span>' + _time.d + '</span>天<span>' + _time.h + '</span>时<span>' + _time.m + '</span>分<span>' + _time.s + '</span>秒');
    };

    /**
     * 执行倒计时
     * @param  {Object}     _Obj              倒计时容器
     * @param  {Function}   _interCallback    倒计时中的回调函数
     * @param  {Function}   _endCallback      倒计时结束后的回调函数
     * @return
     */
    this._timeRender = function(_Obj, _interCallback, _endCallback){
      countDown.init({
        startTime: _Obj.startTime,
        endTime: _Obj.endTime,
        intervalback: function(_data){
          if(_interCallback){
            _interCallback(_Obj.content, _data);
          }
        },
        callback: function(){
          if(_endCallback){
            _endCallback();
          }
        }
      });
//      var tempTime = $(_Obj).attr('data-time'),
//          timeArr = [];
//      if(tempTime){
//        timeArr = tempTime.split('|');
//        countDown.init({
//          startTime: timeArr[0],
//          endTime: timeArr[1],
//          intervalback: function(_data){
//            if(_interCallback){
//              _interCallback(_Obj, _data);
//            }
//          },
//          callback: function(){
//            if(_endCallback){
//              _endCallback();
//            }
//          }
//        });
//      }
    };

    /**
     * 顶部倒计时初始化
     */
    this.topInit = function(){
      var startTime = $('#serverTime').val() - 0,
          endTime = $('#J_topcd').attr('data-time') - 0,
          topData = {
            startTime: startTime,
            endTime: endTime,
            content: $('#J_topcd')
          };
      self._timeRender(topData, self._topInterval);
    }

    /**
     * 产品倒计时初始化
     */
    this.itemInit = function(){
      var startTime = $('#serverTime').val() - 0;
      $.each($("#J_cnt .date_txt"), function(_index, _item){
        var endTime = $(_item).attr('data-time') - 0;
        self._timeRender({
          startTime: startTime,
          endTime: endTime,
          content: $(_item)
        }, self._interval);
      });
    };

    /**
     * 初始化
     * @return
     */
//    this.init = function(){
//      // 顶部倒计时
//      self._timeRender('#J_topcd', self._topInterval);
//
//      // 普通倒计时
//      $.each($('.date_txt'), function(_index, _item){
//        self._timeRender(_item, self._interval);
//      });
//    };
  };
  module.exports = TimeDown;

});