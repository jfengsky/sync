/**
 * Description: 全局脚本文件
 * Author: jiangfeng<jiang.f@ctrip.com>
 * Date: 2015-03-1 8:59
 *
 */

var version = 100000;

var tempOrderId, // 签证id
  isAutoWrite; // 是否可自动填写



// 数据写入提示框
var tipsTpl = '<div id="J_maskoverlay" style="font-size: 12px;position:fixed;color:#666;top:10%;left:50%;margin-left:-160px;border:1px solid #ccc; background:#fff; padding:10px; line-height:24px;width: 300px;text-align:center;z-index:10000"><a href="javascript:void(0)" id="J_maskclose" style="font-size:18px;position:absolute;right:5px;top:0;text-decoration:none">X</a><div id="J_autowritetips"></div></div>';

// 数据写入完毕的文字提示
var writeFinshMsg = '<span style="color:#06f;font-weight:bold">数据自动写入完毕!</span>';

/**
 * 隐藏提示蒙版
 * @return
 */
function hideMask() {
  $('#J_maskclose').bind('click', function() {
    $("#J_visamask").remove();
    $('#J_maskoverlay').remove();
  })
}

/**
 * 显示提示蒙版
 * @return
 */
function showMask() {
  var docHeight = $(document).height();
  $('body').append('<div id="J_visamask" style="width:100%; height: ' + docHeight + 'px; background-color:#333; opacity:0.4;position:absolute;left:0;top:0;z-index:1000"></div>');
  $('body').append(tipsTpl);



  hideMask();
}



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
 * 写入表单提示进度
 * @param  {Object} _item  所有数据
 * @param  {Number} _type  类型 undefine: text表单,  1: checkbox radio select, 2: 隐藏表单
 * @return
 */
function tip(_item, _type) {
  var writeType = '';

  if (!_type) {
    writeType = '正在填写:' + _item.ColumnName
  } else if (_type === 1) {
    writeType = '正在选择:' + _item.ColumnName
  } else if (_type === 2) {
    writeType = _item.ColumnName + ' 正在加载隐藏表单,请稍后...'
  }
  $('#J_autowritetips').text(writeType);
};

/**
 * 写入text 表单的值
 * @param {[type]} _item [description]
 */
function setVal(_item) {
  tip(_item);
  $('#' + _item.FormId).val(_item.Value);
};

/**
 * 加入判断的,写入text表单的值
 * @param {String} _name
 * @param {String} _item
 */
function setInputText(_name, _item) {
  if (_item.ColumnName === _name) {
    setVal(_item);
  }
};


/**
 * 写入select的值
 * @param {[type]} _item [description]
 * @param {[type]} _type [description]
 */
function setSelect(_name, _item, _type) {
  if (_item.ColumnName === _name) {
    if (!_type) {
      $.map($('#' + _item.FormId).find('option'), function(__item) {
        if ($(__item).attr('value') === _item.Value) {
          tip(_item, 1);
          $(__item).prop('selected', true);
        }
      });
    } else if (_type === 'number') {
      $.map($('#' + _item.FormId).find('option'), function(__item) {
        if ($(__item).attr('value') - 0 === _item.Value - 0) {
          tip(_item, 1);
          $(__item).prop('selected', true);
        }
      });
    } else if (_type === 'month') {
      $.map($('#' + _item.FormId).find('option'), function(__item) {
        if ($(__item).attr('value') === formatMonth(_item.Value - 0)) {
          tip(_item, 1);
          $(__item).prop('selected', true);
        }
      });
    }


  };
}

/**
 * js模拟触发点击事件
 * @param  {String} _id 按钮id
 * @return
 */
function clickEvent(_id) {
  var ev = document.createEvent("HTMLEvents");
  ev.initEvent("click", false, true);
  $(_id).get(0).dispatchEvent(ev);
}

/**
 * js模拟下拉选择跳转事件
 * @param {[type]} _item [description]
 */
function setSelectChange(_item) {
  var $select = $('#' + _item.FormId);
  // 首选判断当前值是否与给的值相同,如果不同则重新选择进行跳转
  if ($select.val() !== _item.Value) {
    $.map($select.find('option'), function(__optionItem) {
      if ($(__optionItem).attr('value') === _item.Value) {
        // js去触发select的change事件
        var ev = document.createEvent("HTMLEvents");
        $(__optionItem).prop('selected', true);
        ev.initEvent("change", false, true);
        $select.get(0).dispatchEvent(ev);
      }
    });
  }

}

function writeStep(_type, _str) {
  var writeType = '';

  if (_type === 'text') {
    writeType = '正在填写:'
  } else if (_type === 'loading') {
    writeType = '正在加载隐藏表单,请稍后...'
  } else {
    writeType = '正在选择:'
  };
  $('#J_autowritetips').text(writeType + _str);
};


function autoClickWrite(_item, _str1, _str2, _data) {
  if (_item.ColumnName === _str1) {
    $('#J_autowritetips').text(_item.ColumnName);
    $('#' + _item.FormId).click();
    if (_item.Value === 'True') {
      $.map(_data, function(_secItem) {
        if (_secItem.ColumnName === _str2) {
          $('#' + _secItem.FormId).val(_secItem.Value);
          $('#J_autowritetips').text(_secItem.ColumnName);
        }
        return true;
      });
    } else {
      return true;
    }
  }
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
      tip(_item, 1);
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
        tip(_item, 1);
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

function debug(_data) {
  $.map(_data.Pages[0].Values, function(_item) {
    console.log(_item.ColumnName + ': ' + _item.Value);
  });
}

/**
 * 隐藏下一步按钮和显示右下填写进度提示
 * @return
 */
function hideNext() {
  // $('fieldset.submits').hide();
  if (!$('#J_autowritetips').length) {
    // $('body').append(tipsTpl);
    showMask();
    $('#J_autowritetips').text('开始自动写入数据');
  };
};

/**
 * 自动写入完毕,显示下一步按钮
 * @return
 */
function showNext() {
  // $('fieldset.submits').show();
  $('#J_autowritetips').html(writeFinshMsg);

  // 打印所有表单的属性和值,便于调试
};


/**
 * 写入数据
 * @param  {Object} _data 异步获取的数据
 * @return
 */
function renderData(_data, _times) {
  var pageName;
  console.log('请求填写数据总耗时:' + _times + 'ms');
  if (_data.ErrorMsg) {
    alert(_data.ErrorMsg);
    return false
  } else {
    pageName = getQuery(_data.Pages[0].PageUrl, 'node');
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

        // 第八页
      case 'USContact':
        USContact_page(_data);
        break;

        // 第九页
      case 'Relatives':
        Relatives_page(_data);
        break;
      case 'DeceasedSpouse':
        DeceasedSpouse_page(_data);
        break;
      case 'PrevSpouse':
        PrevSpouse_page(_data);
        break;
      case 'Spouse':
        Spouse_page(_data);
        break;
      case 'WorkEducation1':
        WorkEducation1_page(_data);
        break;
      case 'WorkEducation2':
        WorkEducation2_page(_data);
        break;
      case 'WorkEducation3':
        WorkEducation3_page(_data);
        break;
      case 'SecurityandBackground1':
        SecurityandBackground1_page(_data);
        break;
      case 'SecurityandBackground2':
        SecurityandBackground2_page(_data);
        break;
      case 'SecurityandBackground3':
        SecurityandBackground3_page(_data);
        break;
      case 'SecurityandBackground4':
        SecurityandBackground4_page(_data);
        break;
      case 'SecurityandBackground5':
        SecurityandBackground5_page(_data);
        break;
      case 'SignCertify':
        SignCertify_page(_data);
        break;
    }
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
  sendParam.ver = version;
  tempParam.type = 'getData';
  tempParam.sendParam = sendParam;
  chrome.extension.sendMessage(tempParam, function(d) {
    console.log(d); // 将返回信息打印到控制台里
  });
};

function autoInit(_orderId, _autowrite) {
  var hasWarn = !$.trim($('#ctl00_SiteContentPlaceHolder_FormView1_ValidationSummary').text()).length;
  tempOrderId = _orderId;
  isAutoWrite = _autowrite;
  if (!_orderId) {
    // 只有填写页面才进行自动填写
    alert('缺少签证订单id,无法自动填写!');
  } else if (hasWarn && isAutoWrite) {
    writeVal(tempOrderId);
  }


};

function loadTimes() {
  var timing = performance.timing;
  var loadTime = timing.loadEventEnd - timing.navigationStart; //过早获取时,loadEventEnd有时会是0
  if (loadTime <= 0) {
    // 未加载完，延迟200ms后继续times方法，直到成功
    setTimeout(function() {
      loadTimes()
    }, 200);
    return;
  }
  var readyStart = timing.fetchStart - timing.navigationStart;
  var redirectTime = timing.redirectEnd - timing.redirectStart;
  var appcacheTime = timing.domainLookupStart - timing.fetchStart;
  var unloadEventTime = timing.unloadEventEnd - timing.unloadEventStart;
  var lookupDomainTime = timing.domainLookupEnd - timing.domainLookupStart;
  var connectTime = timing.connectEnd - timing.connectStart;
  var requestTime = timing.responseEnd - timing.requestStart;
  var initDomTreeTime = timing.domInteractive - timing.responseEnd;
  var domReadyTime = timing.domComplete - timing.domInteractive; //过早获取时,domComplete有时会是0
  var loadEventTime = timing.loadEventEnd - timing.loadEventStart;

  // 为console.table方法准备对象，包含耗时的描述和消耗的时间
  var allTimes = [{
    "描述": "准备新页面时间耗时",
    "时间(ms)": readyStart
  }, {
    "描述": "redirect 重定向耗时",
    "时间(ms)": redirectTime
  }, {
    "描述": "Appcache 耗时",
    "时间(ms)": appcacheTime
  }, {
    "描述": "unload 前文档耗时",
    "时间(ms)": unloadEventTime
  }, {
    "描述": "DNS 查询耗时",
    "时间(ms)": lookupDomainTime
  }, {
    "描述": "TCP连接耗时",
    "时间(ms)": connectTime
  }, {
    "描述": "request请求耗时",
    "时间(ms)": requestTime
  }, {
    "描述": "请求完毕至DOM加载",
    "时间(ms)": initDomTreeTime
  }, {
    "描述": "解释dom树耗时",
    "时间(ms)": domReadyTime
  }, {
    "描述": "load事件耗时",
    "时间(ms)": loadEventTime
  }, {
    "描述": "打开页面总耗时",
    "时间(ms)": loadTime
  }];
  console.table(allTimes);
}

// domready后自动填写
$(function() {

  // 控制台打印页面加载时间
  loadTimes();

  // 去background.js获取签证id和自动填写状态
  var tempParam = {};

  // 判断页面是否是填写页
  var pageName = getQuery(location.href, 'node');
  if (pageName && pageName != 'SecureQuestion') {
    tempParam.type = 'getIdAndAuto';
    chrome.extension.sendMessage(tempParam, function(d) {
      console.log(d); // 将返回信息打印到控制台里
    });
  }
})