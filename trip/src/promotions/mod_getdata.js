// Generated by CoffeeScript 1.7.1
define(function(require, exports, module) {
  "use strict";
  var $, DEFAULTDATA, GetDatas, Page, page;
  $ = require('jquery');
  page = require('./mod_page');
  Page = new page();

  /*
   * type 0:    全部特卖      1:限时秒杀 2:提前预售 3:专场 4:爆款
   **** type等于4，5时下面不用传
   * prdtype    产品类型     grouptravel:跟团 freetravel:自由行
   * predepartCity  出发城市     1 2 3
   * dest       目的地       1 2 3
   * mon        出发月份     1 2 3
   * order      排序方式    0:综合  1:价格从低到高  2:价格从高到低
   * pageCount  每页条数    10  20
   * page       显示页数    1 2 3
   */
  DEFAULTDATA = function() {
    return {
      "type": 0,
      "prdtype": "0",
      "predepartCity": null,
      "dest": "",
      "mon": null,
      "order": 0,
      "page": 1
    };
  };

  /*
   * Tab切换
   * 重置筛选
   * 请求数据
   */
  GetDatas = function(_CountDown) {
    var filters, self, sendData, tabs;
    self = this;
    sendData = new DEFAULTDATA();
    tabs = ['#J_tab span', '#J_type span', '#J_send span', '#J_sendtime span', '#J_arrived span', '#J_rank a'];
    filters = tabs.slice(1);

    /*
     * function check
     */
    this._funcCheck = function(_fn) {
      if (typeof _fn === "function") {
        _fn();
      }
    };

    /*
     * 内容初步模板
     */
    this._cntTpl = function(_data) {
      var htmlType;
      if (_data.prdtype === '自由行') {
        htmlType = '<p class="tag_zyx">' + _data.prdtype + '</p>';
      } else {
        htmlType = '<p>' + _data.prdtype + '</p>';
      }
      return '<li id="J_' + _data.prdid + '" data-sp="' + _data.salePrice + '" data-src="' + _data.prdUrl + '"><div class="pro_res"><a href="' + _data.prdUrl + '" class="pro_border" target="_blank"></a><h3><a href="' + _data.prdUrl + '" title="' + _data.prdname + '" target="_blank">' + _data.prdname + '</a></h3></div><div class="product_pic"><a href="' + _data.prdUrl + '"><img src="' + _data.imgUrl + '" alt="' + _data.prdname + '"></a><div class="tag">' + htmlType + '<p class="discount"></p></div></div><div class="product_detial"><div class="pro_txt"></div></div></li>';
    };

    /*
     * 详细信息内容模板
     */
    this._infoTpl = function(_data, _salePrice, _href) {
      var qi;
      qi = '起';
      if (_salePrice.length >= 5) {
        qi = '';
      }
      return '<div class="txt_overhidden">' + _data.Desc + '</div><p class="date_txt" data-tag="' + _data.startOrderDate + ',' + _data.endOrderDate + '"></p><div class="right_btn"><p>原价<del><dfn>&yen;</dfn>' + _data.marketPrice + '</del></p><span class="price_btn"><dfn>&yen;</dfn><span>' + _salePrice + '</span>' + qi + '</span></div>';
    };
    this._infoPriceTpl = function(_data, _href) {
      return '<div class="txt_overhidden">' + _data.Desc + '</div><p class="date_txt" data-tag="' + _data.startOrderDate + ',' + _data.endOrderDate + '"></p><div class="right_btn"><p>原价<del><dfn>&yen;</dfn>' + _data.marketPrice + '</del></p><span class="price_btn time_btn">实时计价</span></div>';
    };
    this._infoRend = function(_data) {
      var data;
      data = _data;
      if (data.isSuccess && data.items) {
        $.each(data.items, function(_index, _item) {
          var cnt, itemHref, salePrice, ze;
          cnt = $('#J_' + _item.prdid);
          salePrice = cnt.attr('data-sp') - 0;
          ze = ((salePrice / _item.marketPrice) * 10).toFixed(1) - 0;
          itemHref = cnt.attr('data-src');
          if (salePrice <= 0) {
            cnt.find('.discount').hide().html('');
            cnt.find('.pro_txt').html(self._infoPriceTpl(_item, itemHref));
          } else {
            if (ze <= 10 && ze > 0) {
              cnt.find('.discount').html('<span>' + ze + '</span>折');
            } else {
              cnt.find('.discount').hide();
            }
            cnt.find('.pro_txt').html(self._infoTpl(_item, salePrice, itemHref));
          }
          cnt.find('.right_btn').show();
          cnt.find('.tag').show();
        });
        if (_CountDown) {
          _CountDown.itemInit(data.serverTime);
        }
      }
    };

    /*
     * 筛选模板
     */
    this._filterTpl = function(_data) {
      return '<span data-tag="' + _data.k + '">' + _data.v + '</span>';
    };

    /*
     * 写入筛选模板
     */
    this._filterRend = function(_id, _data) {
      var html;
      html = '<span class="cur" data-tag="all">全部</span>';
      if (_data) {
        $.each(_data, function(_index, _item) {
          html += self._filterTpl(_item);
        });
      }
      $(_id).html(html);
    };

    /*
     * 请求产品详细数据
     */
    this._getItemInfo = function(_ids) {
      var infoData;
      infoData = {
        "type": 5,
        "prds": _ids.join(',')
      };
      self._getData(infoData, self._infoRend);
    };

    /*
      渲染模板
     */
    this._rend = function(_data, _bool) {
      var data, html, ids;
      data = _data;
      html = '';
      ids = [];
      if (data.isSuccess && data.items) {
        if (data.items.length > 0) {
          $.each(data.items, function(_index, _item) {
            html += self._cntTpl(_item);
            ids.push(_item.prdid);
          });
          $('#J_cnt').html(html);
          $('#J_proempty').hide();
          $('#J_prolist').show();
          self._getItemInfo(ids);
          Page.init({
            currentPage: _data.currentPage,
            totalPage: _data.totalPage
          });
        } else {
          $('#J_proempty').show();
          $('#J_prolist').hide();
        }
        if (_bool) {
          self._filterRend('#J_send dd', data.filter_startcity);
          self._filterRend('#J_sendtime dd', data.filter_mon);
          self._filterRend('#J_arrived dd', data.filter_dest);
        }
      }
    };

    /*
     * 请求数据
     */
    this._getData = function(_data, _callback, _bool) {
      $.ajax({
        url: "/Package-Booking-VacationsOnlineSiteUI/Handler2/DealsHandler.ashx",
        type: "post",
        data: _data,
        dataType: "json",
        success: function(_backData) {
          self._funcCheck(function() {
            _callback(_backData, _bool);
          });
        }
      });
    };

    /*
     * tab筛选
     */

    /*
     * 清除单个设置
     */
    this._signalChange = function(_id, _target, _value, _callback) {
      $(_id).delegate(_target, 'click', function() {
        if (!$(this).hasClass('cur')) {
          $(_id + ' ' + _target).removeClass('cur');
          $(this).addClass('cur');
          sendData[_value] = $(this).attr('data-tag');
          sendData.page = 1;
          self._funcCheck(function() {
            _callback(sendData, self._rend);
          });
        }
      });
    };

    /*
     * 页码切换
     */
    this._pageChange = function(_this) {
      var tempSendData;
      tempSendData = sendData;
      if ($(_this).hasClass('up')) {
        tempSendData.page = sendData.page - 1;
      } else if ($(_this).hasClass('down')) {
        tempSendData.page = sendData.page + 1;
      } else {
        tempSendData.page = $(_this).attr('data-tag') - 0;
      }
      return tempSendData;
    };

    /*
     * 首次请求数据
     */
    this._firstGetIds = function() {
      var ids, type;
      ids = [];
      type = 0;
      if ($('#J_cnt li').length > 0) {
        $.each($('#J_cnt li'), function(_index, _item) {
          ids.push($(_item).attr('id').slice(2) - 0);
          $(_item).attr('data-sp', $(_item).find('.price_btn span').text());
        });
        self._getItemInfo(ids);
      }
      $.each($('#J_tab span'), function(_index, _item) {
        if ($(_item).hasClass('cur')) {
          type = $(_item).attr('data-tag') - 0;
        }
      });
      sendData.type = type;
    };

    /*
     * 初始化
     */
    this.init = function() {
      self._firstGetIds();
      self._signalChange('#J_type', 'span', 'prdtype', self._getData);
      self._signalChange('#J_send', 'span', 'predepartCity', self._getData);
      self._signalChange('#J_sendtime', 'span', 'mon', self._getData);
      self._signalChange('#J_arrived', 'span', 'dest', self._getData);
      self._signalChange('#J_rank', 'a', 'order', self._getData);
      $('#J_page').delegate('a', 'click', function() {
        if (($(this).hasClass('up_nocurrent')) || ($(this).hasClass('down_nocurrent')) || ($(this).hasClass('current'))) {
          return false;
        } else {
          sendData = self._pageChange(this);
          self._getData(sendData, self._rend);
        }
        $(window).scrollTop(0);
      });
      $(document).delegate('#J_pagebtn', 'click', function() {
        page = $('#J_turnpage').val() - 0;
        if (!page || page <= 0 || page > ($('#J_page').attr('pagenum') - 0) || $('#J_turnpage').val() === '') {
          if ($('#J_page .J_pageErr').length <= 0) {
            $('#J_page').css('position', 'relative').append('<span class="J_pageErr" style ="position:absolute;left:50%;top:60px;color:#f00">请输入正确的页码</span>');
            setTimeout(function() {
              $('#J_page .J_pageErr').remove();
            }, 1000);
          }
        } else {
          sendData.page = page;
          self._getData(sendData, self._rend);
        }
        $(window).scrollTop(0);
      });
      Page.init({
        currentPage: 1,
        totalPage: $('#J_page').attr('pagenum') - 0
      });
    };
  };
  module.exports = GetDatas;
});