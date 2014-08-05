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
      GVO = GV.app.order,
      PAYTYPES = [{  // 支付方式和显示顺序对照
        rk: 0,
        en:"Cash",
        ch:"现金"
      },{
        rk: 1,
        en:"CCard",
        ch:"信用卡"
      },{
        rk: 2,
        en:"ThirdPay",
        ch:"第三方支付"
      },{
        rk: 3,
        en:"Other",
        ch:"其他"
      }];

  // loading动画，请求数据然后显示拆分支付方式
  function PayCheck(){
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
        var itemData = {},
            paymentsIndex = tempData.Payments[_index];
        itemData.type = _item.PaymentType;
        paymentsIndex['chid'] = '支付方式' + self._listNo(_item.PaymentId - 0);
        paymentsIndex['chtype'] = self._typeFormat(_item.PaymentType);
        // paymentsIndex['paylink'] = GVO.vars.handles.getPayHtmlInfo + '&PaymentId=' + _item.PaymentId;
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
      })
      return tempData;
    };

    /**
     * 英文支付方式转化为中文用于显示
     * @param {String} _type 英文支付方式
     * @returns {String}     中文支付方式
     */
    this._typeFormat = function(_type){
      var tempType;
      $.each(PAYTYPES, function(_index, _item){
        if(_item.en === _type){
          tempType = _item.ch
        }
      })
      return tempType
    }

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
      return '{{#Payments}}' +
      '<li>' +
        '<span class="pay_ways">{{chid}}：</span>' +
        '<span class="pay_choose">{{chtype}}</span>' +
        '<p class="pay_yetnum">支付<span class="pay_price"><dfn>￥</dfn>{{Amount}}</span></p>' +
        '{{#if linkText}}' +
        '<a href="javascript:void(0)" data-tag="{{PaymentId}}" class="pay_link">{{linkText}}</a>' +
        '{{/if}}' +
        '</li>' +
        '{{/Payments}}';
    }

    /**
     * 拼装数据，给每个支付加上序号
     * @private
     */
//    this._payNo = function(){
//      $.each(data.pay, function(_index, _item){
//        data.pay[_index].NO = '支付方式' + self._listNo(_index + 1) + '：'
//      })
//    };

    this._send = function(_args){
      $.ajax({
        type: 'post',
        url: _args.url,
        data: _args.data,
        success: function(_data){
          _args.callback(_data)
        },
        error: function(){
          // _args.errback()
        }
      });
    }

    /**
     * 检查BillNo是否有为0的
     * @return {Boolean}
     */
    this._checkBillNo = function(_tplData){
      var isZero = false;
      $.each(_tplData, function(_index, _item){
        if(_item.BillNo === "0"){
          isZero = true
        }
      })
      return isZero
    }

    /**
     * 绑定各种事件
     *
     */
    this._bind = function(_tplData){
      // 填写修改礼品卡信息
      $('#J_paybox').delegate('.pay_link', 'click', function(){
        self._send({
          url: GVO.vars.handles.getPayHtmlInfo,
          data: {
            PaymentId: $(this).attr('data-tag')
          },
          callback: function(_data){
            if(_data.errno === 0){
              // 生成表单去提交
              if($('#J_subform').length > 0){
                $('#J_subform').remove()
              }
              $('body').append('<div style="display:none" id="J_subform">+ _data.data +</div>');

              // 隐藏form提交
              $('#J_subform').find('form').submit();
            } else {
              alert(_data.errmsg)
            }
          }
        });
      });

      // 确认提交按钮
      $('#J_submit').click(function(){
        // IsDirectFlight = 0 && BillNo= 0 不能点提交链接
        if(GVO.vars.IsDirectFlight === '0' && !self._checkBillNo(_tplData)){

          // TODO 不能提交提示
          return false;
        } else {
          self._send({
            url:GVO.vars.SubmitOrderUrl,
            data:{
              saveorderinfo: GVO.vars.initData.paymentOrderInfoJson
            },
            callback: function(_data){

            }
          });
        }
      });

    };
    this.init = function(){
      // 重新格式化显示参数
      var tplData = this._formatData(GVO),
          template = Handlebars.compile(self._tpl());

      console.log(tplData);
      $('#J_loading').remove();
      $("#J_paybox").html(template(tplData));

      self._bind(tplData);
    }
  };


  new PayCheck().init();
});