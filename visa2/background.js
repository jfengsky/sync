/**
 * Description: 插件背景脚本
 * Author: jiangfeng <jiang.f@ctrip.com>
 * Date: 2015-03-2 15:59
 *
 */

// var tempTabId = null;
// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//   tempTabId = tabId;
// });
// chrome.tabs.onSelectionChanged.addListener(function(tabId, selectInfo) {
//   tempTabId = tabId;
// });

// 由于公司不支持https, 所以只能用后台脚本绕过这个限制去请求数据,然后发送到前台
chrome.extension.onMessage.addListener(function(objRequest, _, sendResponse) {

  // 将信息能过Ajax发送到服务器
  // 需要传4个值, appid orderid countryid 和 url
  // 其中appid从页面获取,存到内存里
  // orderid需要op填写,存到内存里
  // countryid 永远为1
  // url 从页面中获取
  var startGetTime = new Date().getTime();
  if (objRequest.type === 'getData') {
    $.ajax({
      url: 'http://order.visa.ctripcorp.com/Visa-Order-OrderProcess/VisaAutoComplete/VisaAutoCompleteApi.aspx',
      // url: 'http://order.visa.fat6.qa.nt.ctripcorp.com/Visa-Order-OrderProcess/VisaAutoComplete/VisaAutoCompleteApi.aspx',
       // url: 'http://localhost:3001/VisaAutoCompleteApi',
      type: 'get',
      data: objRequest.sendParam,
      dataType: 'json',
      success: function(_data) {
        var endGetTime = new Date().getTime();

        var str = JSON.stringify(_data);
        chrome.tabs.executeScript(null, {
          code: "renderData(" + str + ',' + (endGetTime - startGetTime) + ")",
          allFrames: true
        });
        // chrome.tabs.sendMessage(tempTabId,{"msg":"send to tab"}, function(response){
        //   console.log(response);
        // });
      }
    });
  } else if (objRequest.type === 'getIdAndAuto') {
    var orderId = localStorage.getItem('orderId'),
      isAuto = localStorage.getItem('autoWrite');
    chrome.tabs.executeScript(null, {
      code: "autoInit(" + orderId + "," + isAuto + ")",
      allFrames: true
    });
  }

});