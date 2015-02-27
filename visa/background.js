function initialize(tabId){
  chrome.tabs.executeScript(tabId, {file: "jquery-2.1.3.min.js", allFrames: true});
  chrome.tabs.executeScript(tabId, {file: "func.js", allFrames: true});
}

// 当标签被选中时向当前标签页面注入脚本
chrome.tabs.onSelectionChanged.addListener(function(tabId, selectInfo) {
  initialize(tabId);
});

// 当标签被刷新时向当前标签页面注入脚本
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  initialize(tabId);
});