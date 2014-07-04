/**
 * Created by jiangfeng on 14-6-23.
 * 特卖专场
 */
define(function (require) {
  "use strict";
  
  var $ = require('jquery'),
      countDown = require('./mod_timedown'),
      CD = new countDown();
  // TODO 异步获取价格
  function GetInfo(){
    var self = this;

    /*
     * 详细信息内容模板
     */
    this._infoTpl = function(_data, _salePrice, _href) {
      var qi;
      qi = '起';
      if (_salePrice.length >= 5) {
        qi = '';
      }
      return '<div class="txt_overhidden">' + _data.Desc + '</div><p class="date_txt" data-tag="' + _data.startOrderDate + ',' + _data.endOrderDate + '"></p><div class="right_btn"><p>原价<del><dfn>&yen;</dfn>' + _data.marketPrice + '</del></p><span  class="price_btn"><dfn>&yen;</dfn><span>' + _salePrice + '</span>' + qi + '</span></div>';
    };
    this._infoPriceTpl = function(_data, _href) {
        return '<div class="txt_overhidden">' +  _data.Desc + '</div><p class="date_txt" data-tag="' + _data.startOrderDate + ',' + _data.endOrderDate + '"></p><div class="right_btn"><p>原价<del><dfn>&yen;</dfn>' + _data.marketPrice + '</del></p><span  class="price_btn time_btn">实时计价</span></div>';
    };
    /**
     * 获取id
     * @return {[type]} [description]
     */
    this.getIds = function(){
      var ids = [];
      if ($('#J_cnt li').length > 0) {
        $.each($('#J_cnt li'), function(_index, _item) {
          var idStr = $(_item).attr('id');
          if(idStr){
            ids.push($(_item).attr('id').slice(2) - 0);
            $(_item).attr('data-sp', $(_item).find('.price_btn span').text());
            // $(_item).attr('data-src', $(_item).find('span.price_btn').attr('href'));
          }
        })
      }
      return ids;
    };

    /**
     * 请求数据
     * @param  {[type]} _ids [description]
     * @return {[type]}      [description]
     */
    this._getData = function(_ids, _callback){
      $.ajax({
        url: "/Package-Booking-VacationsOnlineSiteUI/Handler2/DealsHandler.ashx",
        type: "post",
        data: {
          "type": 5,
          "prds": _ids.join(',')
        },
        dataType: "json",
        success: function(_backData) {
          _callback(_backData)
        }
      });
    };

    /**
     * 处理请求
     * @param  {[type]} _data [description]
     * @return {[type]}       [description]
     */
    this._render = function( _data ){
      var data = _data;
      if( data.isSuccess && data.items ){
        $.each(data.items, function(_index, _item) {
          var cnt = $('#J_' + _item.prdid),
              salePrice = cnt.attr('data-sp') - 0,
              ze = ((salePrice / _item.marketPrice) * 10).toFixed(1) - 0,
              itemHref = cnt.attr('data-src');
          // if (_item.marketPrice <= 0) {
          if ( salePrice <= 0) {
            cnt.find('.discount').hide().html('');
//            cnt.find('.pro_txt').html(self._infoPriceTpl(_item, itemHref));
            cnt.find('.txt_overhidden').html(self._infoPriceTpl(_item, itemHref));
          } else {
            if (ze <= 10 && ze > 0) {
              cnt.find('.discount').html('<span>' + ze + '</span>折');
            } else {
              cnt.find('.discount').hide()
            }
            cnt.find('.pro_txt').html(self._infoTpl(_item, salePrice, itemHref));
            // cnt.find('.txt_overhidden').html(self._infoTpl(_item, salePrice, itemHref));
          }
          cnt.find('.right_btn').show()
          cnt.find('.tag').show()
        });
        CD.itemInit(data.serverTime);
      }
    };


    this.init = function(){
      // 请求商品详细数据
      self._getData(self.getIds(), self._render);
    };
  };

  // TODO 倒计时
  // 
  // 

  new GetInfo().init();

});