/**
 * Description:确认拆分页面
 * Author: jiangfeng(jiang.f@ctrip.com)
 * Date: 2014-07-22 14:15
 *
 */

define(function(require, exports, module) {
  "use strict";

  // loading动画，请求数据然后显示拆分支付方式
  function PayCheck(){
    var data = {
      total: 30000,
      pay:[
        {
          "type": "现金",
          "money": 1000
        },{
          "type": "信用卡",
          "money": 2000
        }
      ]
    };
    var self = this;

    /**
     * 支付拆分模板
     * @param {} _data
     * @returns {string}
     *
     */
    this._tpl = function(_data){
      return '<li>' +
        '<span class="pay_ways">支付方式一：</span>' +
        '<span class="pay_choose">现金</span>' +
        '<p class="pay_yetnum">支付<span class="pay_price"><dfn>￥</dfn>0</span></p>' +
        '<a href="javascript:void(0)" class="pay_link">填写礼品卡信息</a>' +
        '</li>';
    }

    this.init = function(){
      $.each(data, function(_index, _item){
        var html = '';
          html += self._tpl(_item);
      })

    }
  };

});