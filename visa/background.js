chrome.extension.onMessage.addListener(function(objRequest, _, sendResponse){
  // 将信息能过Ajax发送到服务器
  // 需要传4个值, appid orderid countryid 和 url
  // 其中appid从页面获取,存到内存里
  // orderid需要op填写,存到内存里
  // countryid 永远为1
  // url 从页面中获取
  
  $.ajax({
    // url: 'http://order.visa.fat29.qa.nt.ctripcorp.com/Visa-Order-OrderProcess/VisaAutoComplete/VisaAutoCompleteApi.aspx?countryid=1&visaorderid=1',
    url: 'http://localhost:3001/VisaAutoCompleteApi',
    type: 'get',
    data: objRequest,
    dataType: 'json',
    success:function( _data ){
      console.log(_data);
      var str = JSON.stringify(_data);
      chrome.tabs.executeScript(null, {code: "renderData("+ str +")", allFrames: true});
    }
  });
});