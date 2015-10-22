/**
 * Description: 插件按钮脚本
 * Author: jiangfeng<jiang.f@ctrip.com>
 * Date: 2015-02-16 15:59
 *
 */

$(function() {

  var localstorageOrderId = localStorage.getItem('visaOrderId'),
    localstorageVisaInfo;

  if(localstorageOrderId){
    $('#J_orderid').val(localstorageOrderId)
  }

  /**
   * 去接口获取材料
   * @param  {Object} _opt 请求参数以及回调
   * @return 
   */
  function getVisaInfo(_opt) {
    $.ajax({
      type: 'get',
      url: 'http://localhost:3001/VisaAutoCompleteVisaInfoList',
      data: {
        visaorderid: localstorageOrderId
      },
      dataType: 'json',
      success: function(_data) {
        _opt.callback(_data.VisaStuffInfoList)
      }
    });
  }

  /**
   * 生成材料模板病写入插件
   * @param  {Object} _data       材料信息
   * @param  {Number} _visaInfoId 需要选中的材料id
   * @return
   */
  function htmlInfo(_data, _visaInfoId) {
    var tpl = '<p>请选择需要填写的材料</p>',
        checkIndex = _visaInfoId || 'first';

    //默认选中第一个材料

    $.map(_data, function(_item) {
      if(checkIndex === 'first' || _item.VisaStuffTypeId === _visaInfoId){
        tpl += '<div class="radio"><label>' +
        '<input type="radio" name="visaInfo" value="' + _item.VisaStuffTypeId + '" checked="true"> ' + _item.VisaStuffName +
        '</label></div>'
        localStorage.setItem('visaInfoId', _item.VisaStuffTypeId);
        checkIndex = null;
      } else {
        tpl += '<div class="radio"><label>' +
        '<input type="radio" name="visaInfo" value="' + _item.VisaStuffTypeId + '"> ' + _item.VisaStuffName +
        '</label></div>'
      }
    })

    $('#J_visaInfoList').html(tpl);

    $('#J_getVisaInfo').prop('disabled', false);
  }

  /**
   * 把材料信息写入插件
   * @param  {Object} _data 材料信息
   * @param  {Number} _visaInfoId 需要选中的材料id
   * @return
   */
  function rendInfo(_data, _visaInfoId) {

    // 渲染插件
    htmlInfo(_data, _visaInfoId);

    $('#J_setInfo').show();

    // 子订单号存入缓存
    localStorage.setItem('visaOrderId', $('#J_orderid').val());

    // 材料信息存入缓存,避免下次请求
    localStorage.setItem('visaInfo', JSON.stringify(_data));

  }

  function checkVisaId() {
    // 签证id输入框为空则什么都不做
    if ($('#J_orderid').val()) {

      // 如果缓存的id与输入的id一致,则直接去缓存拿材料信息
      if (localStorage.getItem('visaOrderId') === $('#J_orderid').val()) {
        localstorageVisaInfo = localStorage.getItem('visaInfo');
      } else {
        localstorageOrderId = $('#J_orderid').val()
        getVisaInfo({
          callback: rendInfo
        })
        return false
      }
      if (localstorageVisaInfo) {

        // 如果有材料信息,则渲染到插件里
        rendInfo(JSON.parse(localstorageVisaInfo), parseInt(localStorage.getItem('visaInfoId')));

      } else {

        // 如果没有材料信息,就去接口请求
        
        localstorageOrderId = $('#J_orderid').val()

        getVisaInfo({
          callback: rendInfo
        })
      }
    }
  }


  checkVisaId();
  $('#J_getVisaInfo').bind('click', checkVisaId);
  // $(document).delegate('#J_orderid', 'blur', checkVisaId)
  // $('#J_orderid').bind('blur', function(){
  //   if($(this).val()){
  //     $(this).prop('disabled', false)
  //   }
  // });

  // 材料id写入缓存
  $('#J_visaInfoList').delegate('input[type="radio"]', 'click', function(){
    localStorage.setItem('visaInfoId', $(this).val());
  })



  var tempBool = false;
  if (localStorage.getItem('autoWrite') === 'false') {
    tempBool = false
  } else if (localStorage.getItem('autoWrite') === 'true') {
    tempBool = true
  };
  $('#J_readyauto').prop('checked', tempBool);
  $("#J_readyauto").bind('click', function() {
    localStorage.setItem('autoWrite', $('#J_readyauto').prop('checked'));
  })

  // 点击填写表单按钮
  $('#J_autoWrite').bind('click', function() {
    var tempOrderId = $('#J_orderid').val();
    if (!tempOrderId) {
      $('#J_orderid_group').addClass('has-warning')
    } else {
      localStorage.orderId = tempOrderId;
      chrome.tabs.executeScript(null, {
        code: "writeVal(" + tempOrderId + "," + parseInt(localStorage.getItem('visaInfoId')) +")",
        allFrames: true
      });
      $('#J_orderid_group').removeClass('has-warning')
    }
  });

  // orderid表单获得焦点时移除警告错误高亮
  $('#J_orderid').bind('focus', function() {
    $('#J_orderid_group').removeClass('has-warning')
  });

  // 清除表单id
  $('#J_clear_orderid').bind('click', function() {
    $('#J_orderid').val('').focus();
    $('#J_visaInfoList').html('');
    $('#J_setInfo').hide();

    // $('#J_getVisaInfo').prop('disabled', true);

    localStorage.removeItem('visaOrderId');
    localStorage.removeItem('orderId');
    localStorage.removeItem('visaInfo');
    localStorage.removeItem('visaInfoId');

  });

  // 保存id
  // $('#J_save_orderid').bind('click', function() {
  //   var tempOrderId = $('#J_orderid').val();
  //   if (tempOrderId) {
  //     localStorage.setItem('orderId', $('#J_orderid').val());
  //   } else {
  //     $('#J_orderid_group').addClass('has-warning')
  //   }
  // });
});