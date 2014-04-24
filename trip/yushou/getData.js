/**
 * 获取数据并更新页面
 * @return {[type]}         [description]
 */
define(function (require, exports, module) {
  "use strict";
  var $ = require("jquery");
  function Getdata(){}

  Getdata.prototype = {
    _render: function(data){
      
    },
    /**
     * 请求数据
     * @param  {[type]}   id [description]
     * @param  {Function} fn [description]
     * @return 
     */
    _get: function(id, fn){
      $.ajax({
        type: 'get',
        url: 'city.json',
        data: {
          id: id
        },
        cache: false,
        success: function(data){
          if(fn){
            fn(data);
          }
        },
        error: function(data){
          return;
        }
      })
    },

    /**
     * 初始化
     * @return {[type]} [description]
     */
    init: function(){
      // TODO 获取当前高亮的城市区域
      var cityId;
      $.each($('#J_nav_list li'), function(index, item){
        if($(item).hasClass('current')){
          cityId = $(item).find('a').attr('data-id');
        }
      })
      this._get(cityId, this._render)
      // TODO 获取当前预售状态 预告 预售？
      // 
    }
  };
  module.exports = Getdata;
});