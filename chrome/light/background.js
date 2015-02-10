chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  initialize(tabId);
});

chrome.tabs.onSelectionChanged.addListener(function(tabId, selectInfo) {
  initialize(tabId);
});


function initialize(tabId){
  chrome.tabs.executeScript(tabId, {file: "jquery-2.0.2.js", allFrames: true});
  chrome.tabs.executeScript(tabId, {file: "func.js", allFrames: true});
}