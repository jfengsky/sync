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

    this._topEnd = '疯抢结束<span>0<i>天</i></span>&nbsp;<span>00</span> : <span>00</span> : <span>00</span>';
    /**
     * 顶部倒计时模板
     * @param  {Object}     _Obj              显示倒计时容器
     * @param  {Object}     _time             统计时间
     * @return
     */
    this._topInterval = function(_obj, _time, _status){
      var msg = '疯抢倒计时';
      if( _status === 1){
        msg = '疯抢结束'
      };
      $(_obj).html(msg + '<span>' + _time.d + '<i>天</i></span>&nbsp;<span>' + _time.h + '</span> : <span>' + _time.m + '</span> : <span>' + _time.s + '</span>');
    };

    /**
     * 产品倒计时模板
     * @param  {Object}     _Obj              显示倒计时容器
     * @param  {Object}     _time             统计时间
     * @return
     */
    this._interval = function(_obj, _time, _status){
      var msg = "距离开始："
      if ( _status ){
        msg = "距离结束："
      }
      $(_obj).html(msg + '<span>' + _time.d + '</span>天<span>' + _time.h + '</span>时<span>' + _time.m + '</span>分<span>' + _time.s + '</span>秒');
    };

    /**
     * 执行倒计时
     * @param  {Object}     _Obj              倒计时容器
     * @param  {Function}   _interCallback    倒计时中的回调函数
     * @param  {Function}   _endCallback      倒计时结束后的回调函数
     * @return
     */
    this._timeRender = function(_Obj, _interCallback, _endCallback, _status){
      countDown.init({
        startTime: _Obj.startTime,
        endTime: _Obj.endTime,
        intervalback: function(_data){
          if(_interCallback){
            _interCallback(_Obj.content, _data, _status);
          }
        },
        callback: function(){
          if(_endCallback){
            _endCallback();
          }
        }
      });
    };

    // 顶部倒计时
    this._topDown = function(_startTime, _endTime, _status){
      var topData = {
        startTime: _startTime,
        endTime: _endTime,
        content: $('#J_topcd')
      };
      self._timeRender(topData, self._topInterval, function(){
        $('#J_topcd').html(self._topEnd)
      }, _status);
    };

    // 产品倒计时
    this._itemDown = function(_Dom, _startTime, _endTime, _status){
      var topData = {
        startTime: _startTime,
        endTime: _endTime,
        content: _Dom
      };
      self._timeRender(topData, self._interval, null, _status);
    };

    /**
     * 顶部倒计时初始化
     *  倒计时判断：1距离开始 2疯抢中
     */
    this.topInit = function(){
      var serverTime = $('#serverTime').val() - 0,
          timeArr = $('#J_topcd').attr('data-tag').split(','),
          beginTime = timeArr[0] - 0,
          endTime = timeArr[1] - 0,
          status = 0;

      if( serverTime >= beginTime && serverTime <= endTime){ // 疯抢中
        status = 1;
        self._topDown(serverTime, endTime, status);
      } else if ( serverTime < beginTime ) { // 开抢前
        status = 0;
        self._topDown(serverTime, beginTime, status)
      } else { // 结束后
        $('#J_topcd').html(self._topEnd)
//        $('#J_topcd').html('疯抢已经结束')
        status = 2;
      }
    }

    /**
     * 产品倒计时初始化
     */
    this.itemInit = function( _serverTime ){
      var serverTime = _serverTime;
      $.each($("#J_cnt .date_txt"), function(_index, _item){
        var temptime = $(_item).attr('data-tag'),
            timeArr,
            beginTime,
            endTime,
            itemStatus = 0;
        if( temptime ){
          timeArr = $(_item).attr('data-tag').split(','),
          beginTime = timeArr[0] - 0,
          endTime = timeArr[1] - 0;
        };
        if( serverTime >= beginTime && serverTime <= endTime){ // 疯抢中
          itemStatus = 1;
          self._itemDown($(_item), serverTime, endTime, itemStatus);
        } else if ( serverTime < beginTime ) { // 开抢前
          itemStatus = 0;
          self._itemDown($(_item), serverTime, beginTime, itemStatus)
        } else { // 结束后
          $($(_item).context).closest('li').find('.price_btn').addClass('gray_btn');
        }

      });

//      var startTime = $('#serverTime').val() - 0;
//      $.each($("#J_cnt .date_txt"), function(_index, _item){
//        var endTime = $(_item).attr('data-time') - 0;
//        self._timeRender({
//          startTime: startTime,
//          endTime: endTime,
//          content: $(_item)
//        }, self._interval);
//      });
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