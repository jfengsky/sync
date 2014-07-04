/**
 * 更新库存
 * 
 * 
 */
define(function (require, exports, module) {
  "use strict";
  var $ = require("jquery");
  function Updata(){
    var self = this,
        // intervalGetStoke,
        lastItemStr;

    /**
     * 卖光了浮层
     * @return {[type]} [description]
     */
    this._end = function(url){
      return '<div class="opacity" style="display:none"><p>你来晚啦亲，已经被抢光啦！</p><p><a target="_blank" title="" href="' + url + '">点击查看更多相关线路</a></p></div>';
    };

    /**
     * 更新页面
     * @return 
     */
    this._uphtml = function(_data){
      if(_data.error){
        $.each(_data.data.ProductInventoryInfos, function(index, item){
          var li = $('#J_' + item.ProductID),
              recomUrl = li.attr('data-reurl');
          if(item.HasInventory && item.Schedule){  // 在正在预售的情况下，有库存，且有班期信息，正在售卖
            li.removeClass('end selling').addClass('selling').find('.J_itemstatus').addClass('btns').text('正在预售');
          } else {
            li.removeClass('end selling').addClass('end').find('.J_itemstatus').addClass('btns').text('已售完');
            if(!li.find('.opacity').length){
              li.append(self._end(recomUrl));
            };
          }
        });
      };
    };

    /**
     * 设置预告状态按钮
     * @param {[type]} _ids [description]
     */
    this._setStatus = function(_ids){
      $.each(_ids, function(index, item){
        $('#J_' + item).addClass('willstart').find('.J_itemstatus').addClass('btns').text('即将开售');
      })
    };

    /**
     * 获取库存
     * @return {[type]} [description]
     */
    this._getStock = function(_ids, _cityid){
      $.ajax({
        type: 'get',
        url: '/Package-Booking-VacationsOnlineSiteUI/handler2/PreSaleHandlerStock.ashx',
        data:{
          startCity: _cityid,
          ids: _ids,
          debugtime: $('#debugtime').val()
        },
        cache: false,
        dataType: 'json',
        success: function(data){
          self._uphtml(data);
        }
      });
    };


    /**
     * 检查产品是否在可视区域
     * @param  {jQueryObject} _cnt 容器对象
     * @return {[type]}      [description]
     */
    this._checkViewItem = function(_content, _cityid) {
      var self = this,
          tempItemArr = [],
          tempItemStr;
        $.each(_content, function(index, item) {
          var itemTop = $(item).offset().top,
              tempItemId;
          if ((itemTop > $(window).scrollTop()) && (itemTop < $(window).scrollTop() + $(window).height())) {
            tempItemId = $(item).attr('id');
            if(tempItemId){
              tempItemArr.push(tempItemId.slice(2) - 0);
            }
          }
        });

        tempItemStr = tempItemArr.join(',');

        // id数组有值并且与上次不同，则请求数据
        if( tempItemStr && (lastItemStr != tempItemStr) ){
          self._getStock(tempItemStr, _cityid);
          lastItemStr = tempItemStr;
        }

    };

    /**
     * 滚动条滚动请求库存
     */
    this._scroll = function(_content, _cityid){
      var scrollTime = null,
        self = this;
      $(window).unbind('scroll.getdata');
      // 滚动时候每200ms检测一次scroll，避免时时操作
      $(window).bind('scroll.getdata', function() {
          if (scrollTime) {
            clearTimeout(scrollTime)
          }
          scrollTime = setTimeout(function() {
            self._checkViewItem(_content, _cityid);
          }, 200);
        }
      );
    };




    /**
     * 清除每2分钟请求一次库存计时器
     * @return
     */
    // this.clear = function(){
    //   clearInterval(intervalGetStoke);
    // };

    this.init = function(_ids, _cityid){
      // 获取当前状态
      if($('#J_main').attr('data-status') === '1'){
        // 预售状态
        // 先请求当前tab全部库存
        self._getStock(_ids, _cityid);

        //滚动请求当前可见产品库存
        self._scroll($('#J_main li'), _cityid);



        // 每2分钟获取一次库存
        // intervalGetStoke = setInterval(function(){
        //   self._getStock(_ids, _cityid);
        // }, 120000);
      } else {
        // 预告状态 不更新库存
        self._setStatus(_ids.split(','));
      }
    };
  };

  module.exports = Updata;
});