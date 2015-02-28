$(function(){
  $('#J_bind1').bind('click',function(){
    var tempOrderId = $('#J_orderid').val();
    if(!tempOrderId){
      $('#J_orderid_group').addClass('has-warning')
    } else {
      chrome.tabs.executeScript(null, {code: "writeVal(" + tempOrderId + ")", allFrames: true});
      $('#J_orderid_group').removeClass('has-warning')
    }
  });

  // orderid表单获得焦点时移除警告错误高亮
  $('#J_orderid').bind('focus', function(){
    $('#J_orderid_group').removeClass('has-warning')
  })
});