/**
 * Description:确认拆分页面
 * Author: jiangfeng(jiang.f@ctrip.com)
 * Date: 2014-07-22 14:15
 *
 */

/**
 *  TODO    getPayHtmlInfo:点填写/修改礼品卡信息的请求地址或者叫去支付的链接。 需要加上当前点击的支付方式的PaymentId的参数 返回data为一个表单数据，你需要对errno=0正常返回时做一下form表单的submit().有错误需弹出，同信息填写页。
 *  TODO    paymentOrderInfoJson为保存的拆分支付信息。
 *              IsEnableTicketPay 字段为是否可以使用礼品卡，需要控制上图中 修改礼品卡的话术是否显示，如为false 上图礼品卡3个字不需要显示。 注意：如果不支持使用礼品卡IsEnableTicketPay=false 现金的支付方式则不显示去支付的这个链接。
 *
 */

define(function(require, exports, module) {
  "use strict";
  var $ = require('jquery'),
      GVO = GV.app.order;

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
     * 格式化GV参数，用于支付模板渲染
     * @param _data
     * @private
     */
    this._formatData = function(_data){

      // IsEnableTicketPay 字段为是否可以使用礼品卡，需要控制上图中 修改礼品卡的话术是否显示，如为false 上图礼品卡3个字不需要显示。 注意：如果不支持使用礼品卡IsEnableTicketPay=false 现金的支付方式则不显示去支付的这个链接。
      // 第三方支付的支付方式，不用显示 后面的去支付的链接。
      // TODO IsDirectFlight 字段表示为是否为直连机票1为false  为0时，需对拆分的信用卡的支付方式留下卡号信息。判断对应支付方式上面BillNo是否有值

      var tempData = {},
          payInfo = cQuery.parseJSON(_data.vars.initData.paymentOrderInfoJson),
          IsEnableTicketPay = payInfo.IsEnableTicketPay;
      tempData.total = _data.vars.initData.TotalAmount;
      tempData.Payments = payInfo.Payments;
      $.each(tempData.Payments, function(_index, _item){
        var itemData = {};
        itemData.type = _item.PaymentType;
        if( _item.PaymentType === 'Cash' ){

          // IsEnableTicketPay = false 并且是现金支付，不显示支付链接
          if (!IsEnableTicketPay){
            tempData.Payments[_index]['linkText'] = ''
          } else {
            tempData.Payments[_index]['linkText'] = '填写/修改礼品卡信息'
          }
        } else if(_item.PaymentType === 'CCard'){

          // IsEnableTicketPay = false 不显示礼品卡三个字
          if(!IsEnableTicketPay){
            tempData.Payments[_index]['linkText'] = '填写/修改信用卡信息'
          } else {
            tempData.Payments[_index]['linkText'] = '填写/修改信用卡/礼品卡信息'
          }
        } else {

          // 第三方支付不用显示支付链接
          tempData.Payments[_index]['linkText'] = ''
        }
//        switch (_item.PaymentType){
//          case 'Cash':
//            break;
//          case 'CCard':
//            break;
//          case 'ThirdPay':
//            break;
//          case 'Other':
//            break;
//          default:
//            break;
//        }
        console.log(_item)
      })
      console.log(tempData);
    };

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

      // 重新格式化显示参数
      var tplData = this._formatData(GVO),
          template = Handlebars.compile(self._tpl());
      this._payNo();

      $('#J_loading').remove();
      $("#J_paybox").html(template(data));
    }
  };


  new PayCheck().init();
});