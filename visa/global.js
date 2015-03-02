// 数据写入提示框
var tipsTpl = '<div id="J_autowritetips" style="font-size: 12px;position:fixed;color:#666;bottom:6px;right:6px;border:1px solid #ccc; background:#fff; padding:10px; line-height:24px;width: 200px;text-align:center;z-index:10000">开始自动写入数据</div>';

// 数据写入完毕的文字提示
var writeFinshMsg = '<span style="color:#06f;font-weight:bold">数据自动写入完毕!</span>';

/**
 * 获取地址栏参数
 * @param  {String} _href 地址
 * @param  {String} _name 参数名
 * @return {String}       参数的值
 */
function getQuery(_href, _name) {
  var sReg = "(?:\\?|&){1}" + _name + "=([^&]*)"
  var re = new RegExp(sReg, "gi");
  re.exec(_href);
  return RegExp.$1;
};

/**
 * 第三页表单填写逻辑
 * @param {[type]} _data [description]
 */
function AddressPhone_Page(_data){

}

/**
 * 写入数据
 * @param  {Object} _data 异步获取的数据
 * @return
 */
function renderData(_data) {
  var pageName = getQuery(_data.Pages[0].PageUrl, 'node');

  switch (pageName) {

    // 第一页
    case 'Personal1':
      Personal1_Page(_data);
      break;

    // 第二页
    case 'Personal2':
      Personal2_Page(_data);
      break;

    // 第三页
    case 'AddressPhone':
      AddressPhone_Page(_data);
      break;
  }

};

/**
 * 点击填写表单后的操作
 * @param  {Number} _orderId  订单id号
 * @return {[type]}          [description]
 */
function writeVal(_orderId) {
  var tempParam = {},
    sendParam = {},
    appId = $('#ctl00_lblAppID').text() || '';
  sendParam.visaOrderId = _orderId;
  sendParam.url = location.href;
  sendParam.appId = appId;
  tempParam.type = 'getData';
  tempParam.sendParam = sendParam;
  chrome.extension.sendMessage(tempParam, function(d) {
    console.log(d); // 将返回信息打印到控制台里
  });
};