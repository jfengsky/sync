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

/**
 * 第一页表单填写逻辑
 * TODO 还缺少telecode 和 City数据
 * @param
 */
function Personal1_Page(_data) {

  var canShowNext = false,
    otherNameFinish = false,
    telcodeFinish = false;

  // 隐藏下一步按钮
  $('fieldset.submits').hide();
  if (!$('#J_autowritetips').length) {
    $('body').append(tipsTpl);
  }
  $.map(_data.Pages[0].Values, function(_item) {

    // text类型表单直接写值
    if (_item.ColumnName === '名字[拼音]' || _item.ColumnName === '姓氏[拼音]' || _item.ColumnName === '全名[中文]' || _item.ColumnName === '出生日期-年' || _item.ColumnName === '出生地-州省[英文]' || _item.ColumnName === '出生地-城市') {
      $('#' + _item.FormId).val(_item.Value);
      $('#J_autowritetips').text(_item.ColumnName);
    }

    // 全名不适用的
    if (_item.ColumnName === '全名不适用的') {
      if (_item.Value === 'True' && !$('#' + _item.FormId).prop('checked')) {
        $('#' + _item.FormId).click();
      }
    };

    // 其它名字radio
    if (_item.ColumnName === '是否拥有曾用名') {
      $('#' + _item.FormId).click();
      $('#J_autowritetips').text(_item.ColumnName);
      if (_item.Value === 'True') {
        otherNameFinish = false;
        var intervalName = setInterval(function() {
          $('#J_autowritetips').text('是否拥有曾用名有异步操作,请稍后...');
          if ($('#ctl00_SiteContentPlaceHolder_FormView1_addlAliases').length) {
            clearInterval(intervalName);
            // TODO 填写曾用名表单
            $.map(_data.Pages[0].Values, function(__item) {
              if (__item.ColumnName === '曾用名姓氏[拼音]') {
                $('#' + __item.FormId).val(__item.Value);
              };
              if (__item.ColumnName === '曾用名名字[拼音]') {
                $('#' + __item.FormId).val(__item.Value);
              }
            });
            otherNameFinish = true;
          }
        }, 1000);
      } else {
        otherNameFinish = true;
      }
    };


    // 电码名
    if (_item.ColumnName === '是否拥有电码名') {

      // 由于网站的原因,电码名要等其它名字的操作结束后才能进行
      var clickTelCode = setInterval(function() {
        if (otherNameFinish) {
          clearInterval(clickTelCode);
          $('#' + _item.FormId).click();
        }
      }, 2000);
      // $('#' + _item.FormId).click();
      $('#J_autowritetips').text(_item.ColumnName);
      if (_item.Value === 'True') {
        telcodeFinish = false;
        var interCodeName = setInterval(function() {
          $('#J_autowritetips').text('是否拥有电码名有异步操作,请稍后...');
          if ($('#ctl00_SiteContentPlaceHolder_FormView1_TelecodeDiv').length) {
            clearInterval(interCodeName);
            // TODO 填写曾用名表单
            $.map(_data.Pages[0].Values, function(__item) {
              if (__item.ColumnName === '电码名来源') {
                $('#' + __item.FormId).val(__item.Value);
              };
              if (__item.ColumnName === '电码名') {
                $('#' + __item.FormId).val(__item.Value);
              }
            });

            // 显示下一步按钮
            // $('fieldset.submits').show();
            telcodeFinish = true;
          }
        }, 1000);
      } else {
        telcodeFinish = true;
      }

    };

    // 性别
    if (_item.ColumnName === '性别') {
      $('#' + _item.FormId).click();
    };

    // 婚姻
    if (_item.ColumnName === '婚姻状况') {
      $.map($('#' + _item.FormId).find('option'), function(__item) {
        if ($(__item).attr('value') === _item.Value) {
          $(__item).prop('selected', true);
        }
      });
    };

    // 生日 - 日
    if (_item.ColumnName === '出生日期-日') {
      $.map($('#' + _item.FormId).find('option'), function(__item) {
        if ($(__item).attr('value') - 0 === _item.Value - 0) {
          $(__item).prop('selected', true);
        }
      });
    };

    // 生日 - 月
    if (_item.ColumnName === '出生日期-月') {
      $.map($('#' + _item.FormId).find('option'), function(__item) {
        if ($(__item).attr('value') === formatMonth(_item.Value - 0)) {
          $(__item).prop('selected', true);
        }
      });
    };

    // 出生地-州省不适用的
    if (_item.ColumnName === '出生地-州省不适用的') {
      if (_item.Value === 'True' && !$('#' + _item.FormId).prop('checked')) {
        $('#' + _item.FormId).click();
      }
    };

    // 出生 - 国家
    if (_item.ColumnName === '出生地-国家[英文]') {
      $.map($('#' + _item.FormId).find('option'), function(__item) {
        if ($(__item).text() === _item.Value) {
          $(__item).prop('selected', true);
        }
      });
    };
  });

  var intervalShowNext = setInterval(function() {
    var tempParam = null;
    if (otherNameFinish && telcodeFinish) {
      clearInterval(intervalShowNext);
      tempParam = {};
      // 填写完成,显示下一步按钮
      $('fieldset.submits').show();
      $('#J_autowritetips').html(writeFinshMsg);
    }
  }, 1000);

};







/**
 * 第二页表单填写逻辑
 * @param
 */
function Personal2_Page(_data) {
  // 隐藏下一步按钮
  $('fieldset.submits').hide();
  if (!$('#J_autowritetips').length) {
    $('body').append(tipsTpl);
  }
  $.map(_data.Pages[0].Values, function(_item) {
    if (_item.ColumnName === '国籍号码' || _item.ColumnName === '社会安全号1' || _item.ColumnName === '社会安全号2' || _item.ColumnName === '社会安全号3' || _item.ColumnName === '税号') {
      $('#' + _item.FormId).val(_item.Value);
      $('#J_autowritetips').text(_item.ColumnName);
    };

    // 国籍
    if(_item.ColumnName === '国籍'){
      $.map($('#' + _item.FormId).find('option'), function(__item) {
        if ($(__item).attr('value') === _item.Value) {
          $(__item).prop('selected', true);
        }
      });
    };

    // 其它国籍
    if (_item.ColumnName === '其它国籍') {
      $('#' + _item.FormId).click();
    };

    // 国籍不适用的
    if (_item.ColumnName === '国籍不适用的') {
      if (_item.Value === 'True' && !$('#' + _item.FormId).prop('checked')) {
        $('#' + _item.FormId).click();
      }
    };

    // 社会安全号不适用的
    if (_item.ColumnName === '社会安全号不适用的') {
      if (_item.Value === 'True' && !$('#' + _item.FormId).prop('checked')) {
        $('#' + _item.FormId).click();
      }
    };

    // 税号不适用的
    if (_item.ColumnName === '税号不适用的') {
      if (_item.Value === 'True' && !$('#' + _item.FormId).prop('checked')) {
        $('#' + _item.FormId).click();
      }
    };

  });

  // 填写完成,显示下一步按钮
  $('fieldset.submits').show();
  $('#J_autowritetips').html(writeFinshMsg);

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