/**
 * 城市地区切换模块
 * @param  {[type]} require [description]
 * @return {[type]}         [description]
 */
define(function (require, exports, module) {
  "use strict";
  var $ = require("jquery"),
      getData = require('./getData'),
      cityData = new getData();
  
  function ChangeArea(){
    var self = this;

    /**
     * 导航切换
     * @param {Object} dom 容器
     * @return
     */
    this._clearnav = function(dom){
      var area = $(dom).find('a').attr('data-id');
      if(!$(dom).hasClass('more_city')){
        $('#J_nav_list li').removeClass('current');
        $(dom).addClass('current');
        cityData.init();
        // self._getData(area);
      }
    };

    /**
     * 异步获取数据
     * @param  {String}   id  城市id
     * @param  {Function} fn  成功后回调函数
     * @return 
     */
    // this._getData = function(id, fn){
    //   $.ajax({
    //     type: 'get',
    //     url: 'city.json',
    //     data: {
    //       id: id
    //     },
    //     catch: false,
    //     success: function(data){
    //       if(fn){
    //         fn();
    //       }
    //     }
    //   })
    // };

    /**
     * 检查主导航是否添加过更多城市
     * @return {[type]} [description]
     */
    this._checkAddItem = function(){
      var hasItem = false;
      $.each($('#J_nav_list li'), function(index, item){
        if($(this).hasClass('additem')){
          hasItem = true;
        };
      });
      return hasItem;
    };

    /**
     * 初始化
     * id="J_nav_list"
     * <li><a href="javascript:void(0)" data-id="guangzhou" title="" class="list_item">广州</a></li>
     * @return {[type]} [description]
     */
    this.init = function(){

      // 导航切换
      $('#J_nav_list').delegate('li', 'click', function(){
        self._clearnav(this);
      });

      // 更多切换
      $('#J_nav_list').delegate('.city_item', 'click', function(){
        var cityLink = $(this).children(),
            cityId = cityLink.attr('data-id'),
            lastCity,
            newCity;
        if(self._checkAddItem()){
          lastCity = $('#J_nav_list .additem').find('a').clone().removeClass('list_item');
          newCity = $(this).find('a').addClass('list_item');
          $('#J_nav_list .additem').find('a').remove();
          $('#J_nav_list .additem').append(newCity);
          $(this).wrapInner('<li class="current additem"></li>');
          $('#J_nav_list .pop_box_city').append(lastCity).children().last().wrap('<span class="city_item"></span>');
          $(this).remove();
        } else {
          $('#J_nav_list li').removeClass('current');
          $(this).find('a').addClass('list_item');
          $(this).wrapInner('<li class="current additem"></li>');
          $('#J_nav_list .more_city').before($(this).find('li'));
          $(this).closest('li').removeClass('item_hover');
          $(this).remove();
        }
        $('#J_nav_list .more_city').removeClass('item_hover');
        // self._getData(cityId);
        cityData.init();
      });

      /**
       * 导航更多显示
       * TODO ipad 操作优化
       */
      $('#J_nav_list li.more_city').hover(function(){
        $(this).toggleClass('item_hover');
      });
      // $('#J_nav_list').delegate('li.more_city', 'hover', function(){
      //   $(this).toggleClass('item_hover');
      // })
    }
  }
  

  module.exports = ChangeArea;
});