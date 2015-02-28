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
 * @param
 */
function Personal1_Page(_data) {

  var canShowNext = false;

  // 隐藏下一步按钮
  $('fieldset.submits').hide();
  $.map(_data.Pages[0].Values, function(_item) {

    // text类型表单直接写值
    if (_item.ColumnName === '名字[拼音]' || _item.ColumnName === '姓氏[拼音]' || _item.ColumnName === '全名[中文]' || _item.ColumnName === '出生日期-年' || _item.ColumnName === '出生地-州省[英文]') {
      $('#' + _item.FormId).val(_item.Value);
    }

    // 全名不适用的
    if (_item.ColumnName === '全名不适用的' && _item.Value === 'True') {
      $('#' + _item.FormId).click();
    };

    // 其它名字radio
    if (_item.ColumnName === '是否拥有曾用名') {
      $('#' + _item.FormId).click();
      if (_item.Value === 'True') {
        var intervalName = setInterval(function() {
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

            // 显示下一步按钮
            $('fieldset.submits').show();
          }
        }, 1000);
      } else {
        canShowNext = true
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
    if (_item.ColumnName === '出生地-州省不适用的' && _item.Value === 'True') {
      $('#' + _item.FormId).click();
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

  if (canShowNext) {
    // 填写完成,显示下一步按钮
    $('fieldset.submits').show();
  };
};

function Personal2_Page(_data) {
  console.log(_data);
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
  }

};

/**
 * 点击填写表单后的操作
 * @param  {Number} _orderId  订单id号
 * @return {[type]}          [description]
 */
function writeVal(_orderId) {
  var sendParam = {},
    appId = $('#ctl00_lblAppID').text() || '';
  sendParam.visaOrderId = _orderId;
  sendParam.url = location.href;
  sendParam.appId = appId;
  // sendParam.countryid = 1;
  chrome.extension.sendMessage(sendParam, function(d) {
    console.log(d); // 将返回信息打印到控制台里
  });
};