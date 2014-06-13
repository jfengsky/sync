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
   * startcity  出发城市     1 2 3
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
      "startcity": null,
      "dest": "",
      "mon": null,
      "order": 0,
      "pageCount": 10,
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
      return '<li id="J_' + _data.prdid + '"><div class="product_pic"><a href="' + _data.prdUrl + '"><img src="' + _data.imgUrl + '" alt="' + _data.prdname + '"></a><div class="tag"><p class="tag_zyx">' + _data.prdtype + '</p><p class="discount"></p></div></div><div class="product_detial"><h3><a href="' + _data.prdUrl + '">' + _data.prdname + '</a></h3><div class="pro_txt"></div></div></li>';
    };

    /*
     * 详细信息内容模板
     */
    this._infoTpl = function(_data) {
      return '<p>出行交通： 阿提哈德</p><p>入住酒店： 市区3星级、郊区4星级</p><p>出团日期： ' + _data.Desc + '</p><p class="date_txt" data-time="' + _data.endOrderDate + '"></p><div class="right_btn"><p>原价<del><dfn>￥</dfn>' + _data.marketPrice + '</del></p><a href="#" class="price_btn"><dfn>￥</dfn><span>' + _data.salePrice + '</span>起</a></div>';
    };
    this._infoRend = function(_data) {
      var data;
      data = _data;
      if (data.isSuccess && data.items) {
        $.each(data.items, function(_index, _item) {
          var cnt, ze;
          cnt = $('#J_' + _item.prdid);
          ze = ((_item.salePrice / _item.marketPrice) * 10).toFixed(1) - 0;
          cnt.find('.discount').html('<span>' + ze + '</span>折');
          cnt.find('.pro_txt').html(self._infoTpl(_item));
        });
        if (_CountDown) {
          _CountDown.itemInit();
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
      if (_data) {
        html = '<span class="cur" data-tag="all">全部</span>';
        $.each(_data, function(_index, _item) {
          html += self._filterTpl(_item);
        });
        $(_id).html(html);
      }
    };

    /*
      渲染模板
     */
    this._rend = function(_data, _bool) {
      var data, html, ids, infoData;
      data = _data;
      html = '';
      ids = [];
      if (data.isSuccess && data.items) {
        $.each(data.items, function(_index, _item) {
          html += self._cntTpl(_item);
          ids.push(_item.prdid);
        });
        if (_bool) {
          self._filterRend('#J_send dd', data.filter_startcity);
          self._filterRend('#J_sendtime dd', data.filter_mon);
          self._filterRend('#J_arrived dd', data.filter_dest);
        }
        $('#J_cnt').html(html);
        infoData = {
          "type": 5,
          "prds": ids.join(',')
        };
        self._getData(infoData, self._infoRend);
        Page.init({
          currentPage: sendData.page,
          totalPage: sendData.pageCount
        });
      }
    };

    /*
     * 请求数据
     */
    this._getData = function(_data, _callback, _bool) {
      console.log(_data);
      $.ajax({
        url: 'data.json',
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
    this._tabChange = function(_callback) {
      $('#J_tab span').bind('click', function() {
        if (!$(this).hasClass('cur')) {
          $.each(tabs, function(_index, _item) {
            $(_item).removeClass('cur');
          });
          $.each(filters, function(_index, _item) {
            $($(_item)[0]).addClass('cur');
          });
          sendData = new DEFAULTDATA();
          $(this).addClass('cur');
          sendData['type'] = $(this).attr('data-tag') - 0;
          self._funcCheck(function() {
            _callback(sendData, self._rend, true);
          });
        }
      });
    };

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
     * 初始化
     */
    this.init = function() {
      self._tabChange(self._getData);
      self._signalChange('#J_type', 'span', 'prdtype', self._getData);
      self._signalChange('#J_send', 'span', 'startcity', self._getData);
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
      });
      $(document).delegate('#J_pagebtn', 'click', function() {
        page = $('#J_turnpage').val() - 0;
        sendData.page = page;
        self._getData(sendData, self._rend);
      });
    };
  };
  module.exports = GetDatas;
});
