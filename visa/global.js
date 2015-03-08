/**
 * Description: 全局脚本文件
 * Author: jiangfeng<jiang.f@ctrip.com>
 * Date: 2015-03-1 8:59
 *
 */

// 数据写入提示框
var tipsTpl = '<div id="J_autowritetips" style="font-size: 12px;position:fixed;color:#666;bottom:6px;right:6px;border:1px solid #ccc; background:#fff; padding:10px; line-height:24px;width: 200px;text-align:center;z-index:10000"></div>';

// 数据写入完毕的文字提示
var writeFinshMsg = '<span style="color:#06f;font-weight:bold">数据自动写入完毕!</span>';

/**
 * 把数字月份转化为英文简写月份以便selected选择
 * @param  {Number} _month 数字月份
 * @return {String}        英文简写月份
 */
function formatMonth(_month) {
  switch (_month) {
    case 1:
      return 'JAN';
      break;
    case 2:
      return 'FEB';
      break;
    case 3:
      return 'MAR';
      break;
    case 4:
      return 'APR';
      break;
    case 5:
      return 'MAY';
      break;
    case 6:
      return 'JUN';
      break;
    case 7:
      return 'JUL';
      break;
    case 8:
      return 'AUG';
      break;
    case 9:
      return 'SEP';
      break;
    case 10:
      return 'OCT';
      break;
    case 11:
      return 'NOV';
      break;
    case 12:
      return 'DEC';
      break;
  }
};


function writeStep(_type, _str) {
  var writeType = '';

  if(_type === 'text'){
    writeType = '正在填写:'
  } else if(_type === 'loading') {
    writeType = '加载隐藏表单:'
  } else {
    writeType = '正在选择:'
  };
  $('#J_autowritetips').text(writeType + _str);
};


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
 * 自动填写各种不适用的复选框选择效果
 * @param  {String} _name  表单意义
 * @param  {Object} _item  接口返回的数据
 * @return
 */
function autoNotApplyCheckbox(_name, _item) {
  if (_item.ColumnName === _name) {
    if (_item.Value === 'True' && !$('#' + _item.FormId).prop('checked')) {
      $('#' + _item.FormId).click();
    }
  };
};

/**
 * 自动选择表单
 * 注意这里根据option的value来做判断
 * @param  {String} _name  表单意义
 * @param  {Object} _item  接口返回的数据
 * @return
 */
function autoSelectValue(_name, _item) {
  if (_item.ColumnName === _name) {
    $.map($('#' + _item.FormId).find('option'), function(__item) {
      if ($(__item).attr('value') === _item.Value) {
        $(__item).prop('selected', true);
      }
    });
  };
};

/**
 * 自动选择表单
 * 注意这里根据option的text来做判断
 * @param  {String} _name  表单意义
 * @param  {Object} _item  接口返回的数据
 * @return
 */
function autoSelectText(_name, _item) {
  if (_item.ColumnName === _name) {
    $.map($('select#' + _item.FormId).find('option'), function(__item) {
      if ($(__item).text() === _item.Value) {
        $(__item).prop('selected', true);
      }
    });
  };
};

/**
 * 隐藏下一步按钮和显示右下填写进度提示
 * @return
 */
function hideNext() {
  $('fieldset.submits').hide();
  if (!$('#J_autowritetips').length) {
    $('body').append(tipsTpl);
    $('#J_autowritetips').text('开始自动写入数据');
  }
};

/**
 * 自动写入完毕,显示下一步按钮
 * @return
 */
function showNext() {
  $('fieldset.submits').show();
  $('#J_autowritetips').html(writeFinshMsg);
};

/**
 * 第三页表单填写逻辑
 * @param {[type]} _data [description]
 */
function AddressPhone_Page(_data) {

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

      // 第四页
    case 'PptVisa':
      PptVisa_Page(_data);
      break;

      // 第五页
    case 'Travel':
      Travel_Page(_data);
      break;

    // 第六页
    case 'TravelCompanions':
      TravelCompanions_Page(_data);
      break;

    // 第七页
    case 'PreviousUSTravel':
      PreviousUSTravel_Page(_data);
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
  sendParam.visaorderid = _orderId;
  sendParam.countryid = 1;
  sendParam.pageurl = location.href;
  sendParam.appId = appId;
  tempParam.type = 'getData';
  tempParam.sendParam = sendParam;
  chrome.extension.sendMessage(tempParam, function(d) {
    console.log(d); // 将返回信息打印到控制台里
  });
};