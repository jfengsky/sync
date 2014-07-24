/**
 * Description:支付拆分页面
 * Author: jiangfeng(jiang.f@ctrip.com)
 * Date: 2014-07-15 13:51
 *
 */
/**
 * 支付拆分页面
 * TODO loading动画，添加新支付方式渐现显示
 * TODO 拆分笔数:后端给我还是根据成人数来判断 （如果成人数为0，那么可拆分笔数=1，即只允许单笔支付）
 * TODO 拆分按钮显示隐藏
 * TODO 获取可支持的支付方式数据和显示顺序 （如果当前支付款支持多个支付方式，那么选项显示排序为：信用卡>外网自助支付>现金。默认值为第一个支付方式)
 * TODO 默认选择哪种支付方式
 * TODO 现金支付方式只能一个
 * TODO 	默认显示一条支付款项，支付金额为订单全款。
 * TODO 	如果当前支付笔数＜可拆分笔数，那么下方有“+支付方式”的按钮，如果当前支付笔数=可拆分笔数，那么不显示“＋支付方式”按钮。
 *
 */
define(function(require, exports, module) {
  "use strict";
  var $ = require('jquery'),
      formCheck = {
        reg:{
          moneyReg: /^[0-9]{1}\d*(\.\d{1,2})?$/        // 数字金额正则验证，2位小数
        },
        msg:{
          moneyMsg: '清输入正确的金额，小数点2位',
          maxThan: '填写金额超出支付金额',
          submintMaxThan: '支付金额必须与订单总额一致',
          submitCashOnce: '拆分支付只能选择一次现金支付，请重新拆分'
        }
      };

  // TODO 获取可拆分次数
  function payDeatch(){
    var self = this,

      // TODO 获取可拆分次数
      detachNum = 5,

      // 已经创立的支付方式个数
      detachIndex = 1,

      radioIndex = 1,

      // TODO 获取订单金额
      PAYTOTAL = 10000,

      // 已支付金额，由于第一个支付方式默认全部支付，所以默认值与总额一致
      tempTotal = PAYTOTAL,

      // 还剩需要支付金额
      tempLeft = 0,

      hasTips = false,

    // TODO 获取可选支付方式
    payType = ['信用卡', '外网自助支付', '现金'];

    var paymentType = {
      0: '现金',
      1: '信用卡',
      3: '第三方支付',
      4: '其它'
    };

    /**
     * 可拆分笔数提示
     * @param {Number} _number
     * @returns {string}
     */
    this._topNotice = function( _number ){ // 可拆分笔数提示
      return '<li>拆分支付笔数不得大于出行成人数，此订单最多可拆分' + _number + '笔支付</li>';
    };

    /**
     * 剩余金额模板
     * @private
     */
    this._leftPay = function(_hasPay, _leftPay, _bool){  // 剩余金额模板
      var btn = '';
      if(_bool){
        btn = self._detachButton
      }
      return '<li id="J_payinfo">'+ btn +'已选择支付：<span class="pay_price"><dfn>￥</dfn><span id="J_haspay">' + _hasPay + '</span></span>还剩余：<span class="pay_price"><dfn>￥</dfn><span id="J_leftpay">' + _leftPay + '</span></span></li>';
    }

    this._moneyErr = function(_obj, _str){ // 错误金额提示
      var tpl = '<p class="pay_tipnum"><b></b><i></i>' + _str + '</p>';
      $(_obj).addClass('payerror').closest('li').append(tpl);
    };
    this._clearMoneyErr = function(_obj){ // 移除错误金额提示
      $(_obj).removeClass('payerror').closest('li').find('.pay_tipnum').remove();
    };

    /**
     * 错误提示
     * @param {String} _str 提示话语
     * @return
     */
    this._errorTips = function(_str){ // 错误提示
      var tpl = '<p class="pay_tips" id="J_errTip">' + _str + '</p>';
      $('#J_errTip').remove();
      if(!hasTips){
        $('#J_paycnt').after(tpl);
      };
      hasTips = true;
    };
    /**
     * 拆分按钮 异步加入页面中
     */
    this._detachButton = '<a href="javascript:void(0)" id="J_detach" class="pay_waysbtn"><span>+</span>支付方式</a>';


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
     * 拆分模板
     * @param {Object} _args 传入参数对象
     *    NO: 支付序号
     *    type: 支付方式数组
     *    total: 支付金额
     *    hasCash: 是否现金, 只能选一次现金，其它则灰掉
     */
    this._tpl = function( _args ){ //拆分模板
      var payTypeList = '',
          leftMoney = _args.total;
      if(leftMoney <= 0){
        leftMoney = ''
      }
      $.each(_args.payType, function(_index, _item){
        // TODO radio的value问题
        if(_index === 0){
          payTypeList += '<label class="base_label"><input type="radio" name="pay'+ _args.radioIndex +'" value="' + _item + '" checked>' + _item + '</label>';
        } else {
          payTypeList += '<label class="base_label"><input type="radio" name="pay'+ _args.radioIndex +'" value="' + _item + '">' + _item + '</label>';
        }
      });

      return '<li class="J_list">' +
        '<a href="javascript:void(0)" class="pay_del J_patydel">删除</a>' +
        '<span class="pay_ways">支付方式<span class="J_payindex"></span>：</span>' + payTypeList +
        '<strong>支付</strong><input type="number" value="' + leftMoney + '" class="pay_inputnum J_payinput">元';
    };

    /**
     * 重排支付方式序号
     * @private
     */
    this._payIndex = function(){ //重排支付方式序号
      $.each($('#J_paycnt .J_payindex'), function(_index, _item){
        $(_item).text(self._listNo(_index + 1));
      });
    };

    this._checkSendData = function(_data){
      var cashNum = 0;
      $.each(_data, function(_index, _item){
        if(_item.type === '现金'){
          cashNum++;
        };
//        if(!_item.value){
//          _data.splice(_index, 1);
//        }
      })
      // 只能选一个现金支付
      if( cashNum >= 2){
        self._errorTips(formCheck.msg.submitCashOnce);
        return false;
      }
      return [true, _data];
    };
    /**
     * 获取要提交的内容
     * @return {Array} 提交的数组
     */
    this._getSendData = function(){
      var sendData = [];
      $.each( $('#J_paycnt .J_list'), function(_index, _item){
        var tempData = {};
        tempData.type = $(_item).find('input[type="radio"]:checked').val();
        tempData.value = $(_item).find('input.J_payinput').val();
        sendData.push(tempData);
      });
      return sendData;
    };

    /**
     * 按钮绑定添加事件
     * @private
     */
    this._bind = function(){  // 按钮绑定添加事件

      // 添加支付方式
      $('#J_paybox').delegate('#J_detach', 'click', function(){
//        if(tempLeft <= 0){
//          console.log('已经超过最大金额');
//        }
        var html = self._tpl({
          payType: payType,
          NO: detachIndex,
          total: tempLeft,
          hasCash: true,
          detachs: detachNum,
          radioIndex: radioIndex
        });
        $('#J_payinfo').before(html);

        if( detachIndex === detachNum){
          $('#J_detach').remove();
        }
        self._payIndex();
        self._sumMoney();
        detachIndex++;
        radioIndex++;
      });

      // 删除支付方式按钮
      $('#J_paybox').delegate('.J_patydel', 'click', function(){

        if( detachIndex <= 2){
          // 只剩1个支付方式则删除金额

        } else {
          $(this).closest('li').remove();
          // TODO 重写支付金额

          // TODO 重排支付方式序号

          // 加入支付按钮
          if( $('#J_detach').length === 0){
            $('#J_payinfo').prepend(self._detachButton);
          }
          self._payIndex();
          self._sumMoney();
          detachIndex--;
        }

      })

      // 数字输入框绑定事件
      $('#J_paybox').delegate('.J_payinput', 'focus', function(){
        self._clearMoneyErr(this);
      });

      $('#J_paybox').delegate('.J_payinput', 'blur', function(){
        var val = $(this).val();
        if( formCheck.reg.moneyReg.test(val) ){
          self._sumMoney(this);
        } else {
          self._moneyErr(this, formCheck.msg.moneyMsg);
        }
      });

      /**
       * 向服务端发送数据
       * @param {} _data
       * @private
       */
      this._send = function(_data){
        $.ajax({
          url: '',
          type: 'post',
          cache: false,
          success: function(_d){
            console.log(_d)
          }
        });
      };

      /**
       * 提交支付按钮
       */
      $('#J_submit').bind('click', function(){
        var cashIndex = 0;
        // TODO 金额校验
        if (tempLeft < 0 ){
          self._errorTips(formCheck.msg.submintMaxThan);
          return false;
        }

        // TODO 只能选一个现金支付校验
        self._checkSendData(self._getSendData());
//        if( self._checkSendData(self._getSendData()) ){
//
//        }

//        $.each( $('#J_paycnt input[type="radio"]:checked') , function(_index, _item){
//          if ($(_item).val() ==="现金"){
//            cashIndex++
//          }
//        })

        self._send();


      })
    };

    /**
     * 计算金额
     * @private
     */
    this._sumMoney = function(_obj){ // 计算金额
      var total = 0;
      $.each($('#J_paycnt .J_payinput'), function(_index, _item){
        total += $(_item).val() - 0;
      });
      tempLeft = tempTotal - total;
      if( tempLeft >= 0){
        $('#J_haspay').text(total);
        $('#J_leftpay').text(tempLeft);
        $('.J_payinput').removeClass('payerror');
        $('.pay_tipnum').remove();
      } else if( tempLeft < 0 && _obj) {
          self._moneyErr(_obj, formCheck.msg.maxThan);
      }

    };

    /**
     * 默认第一条支付 填写金额 选择第一个支付方式
     * @private
     */
    this._defaultPay = function( _arg ){ // 默认第一条支付
      var html = self._topNotice(_arg.detachs),
          moreDetach = false;
      html += self._tpl(_arg);
      if(_arg.detachs > 1){
        moreDetach = true
      }
      html += self._leftPay(tempTotal, 0, moreDetach);

      $('#J_loading').remove();
      $('#J_paycnt').append(html);
      self._payIndex();
      detachIndex++;
      radioIndex++;
    };

    // 初始化
    this.init = function(){

      // 初始化默认拆分模板
      self._defaultPay({
        payType: payType,
        NO: detachIndex,
        total:tempTotal,
        hasCash: true,
        detachs: detachNum,
        radioIndex: radioIndex
      });

      // 按钮绑定事件
      self._bind();


    }
  }

  new payDeatch().init();
});