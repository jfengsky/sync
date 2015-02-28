
/**
 * 把数字月份转化为英文简写月份以便selected选择
 * @param  {Number} _month 数字月份
 * @return {String}        英文简写月份
 */
function formatMonth(_month){
  switch(_month){
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
 * 写入数据
 * @param  {Object} _data 异步获取的数据
 * @return 
 */
function renderData(_data){

  // 隐藏下一步按钮
  $('fieldset.submits').hide();

  // 判断是否当前页面和其它一些验证
  if(true){
    $.map(_data.Pages[0].Values, function( _item ){
      if( $('#' + _item.FormId) ){


        $('#' + _item.FormId).val(_item.Value);

        // 全名不适用的
        if(_item.ColumnName === '全名不适用的' && _item.Value === 'True'){
          $('#' + _item.FormId).click();
        };

        // 其它名字radio
        if(_item.ColumnName === '是否拥有曾用名'){
          $('#' + _item.FormId).click();
          // if(_item.Value === 'True'){
          //   // TODO 重新填一遍表单
          // }
        };

        // 性别
        if(_item.ColumnName === '性别'){
          $('#' + _item.FormId).click();
        };

        // 婚姻
        // if(_item.ColumnName === '婚姻状况'){
        //   $.map($('#' + _item.FormId).find('option'), function(__item){
        //     console.log(__item);
        //     // if($(__item).attr('value') === _item.Value){
        //     //   $(__item).prop('selected', true);
        //     //   return false;
        //     // }
        //   });
        // };
        
        // 生日 - 日
        if(_item.ColumnName === '出生日期-日'){
          $.map($('#' + _item.FormId).find('option'), function(__item){
            if( $(__item).attr('value') - 0 === _item.Value - 0 ){
              $(__item).prop('selected', true);
            }
          });
        };

        // 生日 - 月
        if(_item.ColumnName === '出生日期-月'){
          $.map($('#' + _item.FormId).find('option'), function(__item){
            if( $(__item).attr('value') === formatMonth(_item.Value - 0) ){
              $(__item).prop('selected', true);
            }
          });
        };

        // 出生地-州省不适用的
        if(_item.ColumnName === '出生地-州省不适用的' && _item.Value === 'True'){
          $('#' + _item.FormId).click();
        };

        // 出生 - 国家
        if(_item.ColumnName === '出生地-国家[英文]'){
          $.map($('#' + _item.FormId).find('option'), function(__item){
            if( $(__item).text() === _item.Value ){
              $(__item).prop('selected', true);
            }
          });
        };
      }
    });

    $('fieldset.submits').show();

  }
};

/**
 * 点击填写表单后的操作
 * @param  {Number} _orderId  订单id号
 * @return {[type]}          [description]
 */
function writeVal( _orderId ){
  var sendParam = {},
      appId = $('#ctl00_lblAppID').text() || '';
  sendParam.orderId = _orderId;
  sendParam.url = location.href;
  sendParam.appId = appId;
  // sendParam.countryid = 1;
  chrome.extension.sendMessage(sendParam, function(d){
    console.log(d); // 将返回信息打印到控制台里
  });
};