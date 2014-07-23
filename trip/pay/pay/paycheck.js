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

    /**
     * 支付拆分模板
     * @returns {string}
     *
     */
    this._tpl = function(){
      return '{{#pay}}' +
      '<li>' +
        '<span class="pay_ways"></span>' +
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

      })
    };

    this.init = function(){
      var template = Handlebars.compile(self._tpl());

      $('#J_loading').remove();
      $("#J_paybox").html(template(data));
    }
  };


  new PayCheck().init();
});