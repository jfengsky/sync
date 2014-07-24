/**
 * Description:确认拆分页面
 * Author: jiangfeng(jiang.f@ctrip.com)
 * Date: 2014-07-22 14:15
 *
 */

define(function(require, exports, module) {
  "use strict";
  var $ = require('jquery');
  // loading动画，请求数据然后显示拆分支付方式
  function PayCheck(){
    var data = {
      total: 30000,
      pay:[
        {
          "type": "现金",
          "money": 1000,
          "giftcard": true
        },{
          "type": "信用卡",
          "money": 2000
        }
      ]
    };
    var self = this;

    this._listNo = function( _num ){ // 转中文序号
      switch (_num){
        case 1:
          return '一';
          break;
        case 2:
          return '二';
          break;
        case 3:
          return '三';
          break;
        case 4:
          return '四';
          break;
        case 5:
          return '五';
          break;
        case 6:
          return '六';
          break;
        case 7:
          return '七';
          break;
        case 8:
          return '八';
          break;
        case 9:
          return '九';
          break;
        case 10:
          return '十';
          break;
      }
    };


    /**
     * 支付拆分模板
     * @returns {string}
     *
     */
    this._tpl = function(){
      return '{{#pay}}' +
      '<li>' +
        '<span class="pay_ways">{{NO}}</span>' +
        '<span class="pay_choose">{{type}}</span>' +
        '<p class="pay_yetnum">支付<span class="pay_price"><dfn>￥</dfn>{{money}}</span></p>' +
        '{{#if giftcard}}' +
        '<a href="javascript:void(0)" class="pay_link">填写礼品卡信息</a>' +
        '{{/if}}' +
        '</li>' +
        '{{/pay}}';
    }

    /**
     * 拼装数据，给每个支付加上序号
     * @private
     */
    this._payNo = function(){
      $.each(data.pay, function(_index, _item){
        data.pay[_index].NO = '支付方式' + self._listNo(_index + 1) + '：'
      })
    };

    this.init = function(){
      this._payNo();
      var template = Handlebars.compile(self._tpl());

      $('#J_loading').remove();
      $("#J_paybox").html(template(data));
    }
  };


  new PayCheck().init();
});