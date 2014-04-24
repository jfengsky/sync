/**
 * 预售倒计时模块
 * @param  {[type]} require [description]
 * @return {[type]}         [description]
 */
define(function(require) {
  "use strict";
  var $ = require("jquery"),
      CountDown = require('./countDown'),
      currentTime = $('#hfNow').val() - 0,                      // 当前时间
      startTime = $('#hfTime').val().split(',')[0] - 0,            // 预售开始时间
      endTime = $('#hfTime').val().split(',')[1] - 0,              // 预售结束时间
      nextStartTime = $('#hfTime').val().split(',')[2] - 0,     // 下期开始时间
      START_DATA = (new Date(startTime).getMonth() + 1) + '月' + new Date(startTime).getDate() + '日';
  
  function CountTime(){
    var self = this,
        countdown = new CountDown();

    /**
     * 预告倒计时还剩下>=1天
     * @return {String} DOM字符串
     */
    this._noticeDayTpl = function(data){
      return '<span class="actives_date">'+ START_DATA +'</span>预售发布还剩<span class="remain_time_bg">' + data.d + '</span>天<span class="remain_time_bg">' + data.h + '</span>小时<span class="remain_time_bg">' + data.m + '</span>分钟</div>'
    };

    /**
     * 预告倒计时<1天
     * @return {String} DOM字符串
     */
    this._noticeSecTpl = function(data){
      return '预售发布还剩<span class="remain_time_bg">' + data.h + '</span>小时<span class="remain_time_bg">' + data.m + '</span>分钟<span class="remain_time_bg">' + data.s + '</span>秒</div>'
    };

    /**
     * 预售 >= 1天
     * @param  {[type]} data [description]
     * @return {String} DOM字符串
     */
    this._preDayTpl = function(data){
      return '预售结束还剩<span class="remain_time_bg">' + data.d + '</span>天<span class="remain_time_bg">' + data.h + '</span>小时<span class="remain_time_bg">' + data.m + '</span>分钟</div>'
    };

    /**
     * 预售 < 1 天
     * @param  {[type]} data [description]
     * @return {String} DOM字符串
     */
    this._preSecTpl = function(data){
      return '预售结束还剩<span class="remain_time_bg">' + data.h + '</span>小时<span class="remain_time_bg">' + data.m + '</span>分钟<span class="remain_time_bg">' + data.s + '</span>秒</div>'
    };

    /**
     * 向页面写入倒计时间
     * @param  {String} el 页面DOM字符串
     * @return 
     */
    this._countHtml = function(el){
      $('#J_countdown').html(el);
    };

    /**
     * 倒计时方法
     * @param  {Number} _startTime          开始时间
     * @param  {Number} _endTime            结束时间
     * @param  {Function} _intervalback     倒计时中的回调
     * @param  {Function} _callback         时间为0后的回调
     * @return {[type]}               [description]
     */
    this._intervalTime = function(_startTime, _endTime, _intervalback, _callback){
      countdown.init({
        startTime: _startTime,
        endTime: _endTime,
        intervalback: function(data){
          if(_intervalback){
            _intervalback(data);
          }
        },
        callback: function(){
          if(_callback){
            _callback();
          }
        }
      });
    };

    /**
     * 检查时间是否大于1天
     * @param  {Number} _startTime  开始时间
     * @param  {Number} _endTime    结束时间
     * @param  {Function} _moreFn   大于1天的回调
     * @param  {Function} _lessFn   小于1天的回调
     * @param  {Function} _callback 时间为0后的回调
     * @return
     */
    this._dayCheck = function(_startTime, _endTime, _moreFn, _lessFn, _callback){
      countdown.clear();

      // 大于1天
      if(_endTime - _startTime >= 86400000){
        self._intervalTime(_startTime, _endTime, _moreFn);
      } else {
        self._intervalTime(_startTime, _endTime, _lessFn, _callback);
      }
    };

    /**
     * 预告阶段
     * @return {[type]} [description]
     */
    this._sellNotice = function(_startTime, _endTime){
      self._dayCheck(_startTime, _endTime, function(data){
        self._countHtml(self._noticeDayTpl(data));
      }, function(data){
        self._countHtml(self._noticeSecTpl(data));
      }, function(){
        
        // 跳到预售阶段
        self._presell(startTime, endTime);
        // TODO 修改产品信息为预售的
      });
      // TODO 大于1天显示距离<span class="actives_date">05月01日</span>预售发布还剩<span class="remain_time_bg">10</span>天<span class="remain_time_bg">01</span>小时<span class="remain_time_bg">30</span>分钟</div>
      // TODO 小于1天直接倒计时 时：分：秒
    };

    /**
     * 预售阶段
     * @return {[type]} [description]
     */
    this._presell = function(_startTime, _endTime){
      self._dayCheck(_startTime, _endTime, function(data){
        self._countHtml(self._preDayTpl(data));
      }, function(data){
        self._countHtml(self._preSecTpl(data));
      }, function(){

        // 跳到预告阶段
        self._sellNotice(endTime, nextStartTime);
        // TODO 修改产品信息为预告
      });
    };

    /**
     * 倒计时初始化
     * 先判断是否预售阶段 
     *   true: 立即更新库存，
     *   false: 再判断其它阶段
     * @return
     */
    this.init = function(){
      if (currentTime >= startTime && currentTime <= endTime) { 

        // 预售阶段
        self._presell(currentTime, endTime);
      } else { 

        // 预告阶段
        self._sellNotice(currentTime, startTime);
      }

    };
  }

  new CountTime().init();


  var changeArea = require('./changeArea');
  new changeArea().init();

  // TODO 导航更多按钮显示隐藏
  // TODO 切换城市请求数据
  // TODO 分享 切换 回到顶部
});