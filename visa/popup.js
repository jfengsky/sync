/**
 * Description: 插件按钮脚本
 * Author: jiangfeng<jiang.f@ctrip.com>
 * Date: 2015-02-16 15:59
 *
 */

$(function() {

  // 初始化orderid的值, 从localStorage获取
  var localstorageOrderId = localStorage.getItem('orderId');
  if (localstorageOrderId) {
    $('#J_orderid').val(localstorageOrderId)
  };

  // 点击填写表单按钮
  $('#J_bind1').bind('click', function() {
    var tempOrderId = $('#J_orderid').val();
    if (!tempOrderId) {
      $('#J_orderid_group').addClass('has-warning')
    } else {
      localStorage.orderId = tempOrderId;
      chrome.tabs.executeScript(null, {
        code: "writeVal(" + tempOrderId + ")",
        allFrames: true
      });
      $('#J_orderid_group').removeClass('has-warning')
    }
  });

  // $('#J_bind2').bind('click', function() {
  //   chrome.tabs.create({
  //     url: chrome.extension.getURL('https://ceac.state.gov/genniv/default.aspx'),
  //     index: (1),
  //     selected: false
  //   }, function(tab) {

  //   });
  // });

  // orderid表单获得焦点时移除警告错误高亮
  $('#J_orderid').bind('focus', function() {
    $('#J_orderid_group').removeClass('has-warning')
  });

  // 清除表单id
  $('#J_clear_orderid').bind('click', function() {
    $('#J_orderid').val('').focus();
    localStorage.removeItem('orderId');
  });
});