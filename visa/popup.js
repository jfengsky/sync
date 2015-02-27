$(function(){
  $('#J_bind1').bind('click',function(){
    var statusBar = $('#J_status');
    chrome.tabs.executeScript(null, {code: "writeVal()", allFrames: true});
  })
});