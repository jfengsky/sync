document.addEventListener('DOMContentLoaded', function(){
  var openButton = document.getElementById('openLight'),
      closeButton = document.getElementById('closeLight');
  openButton.addEventListener('click', function(){
    chrome.tabs.executeScript(null, {code: "switchLight('openLight')", allFrames: true});
  });
  closeButton.addEventListener('click', function(){
    chrome.tabs.executeScript(null, {code: "switchLight('closeLight')", allFrames: true});
  })
})