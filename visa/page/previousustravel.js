/**
 * Description: 第七页自动写入脚本文件
 * Author: jiangfeng<jiang.f@ctrip.com>
 * Date: 2015-03-9 09:17
 *
 */
function PreviousUSTravel_Page(_data) {
  var canShowNext = false,
    hasBeenInUS = false,
    hasBeenVisa = false,
    hasBeenVisaRefuse = false,
    immigrant = false;

  // 隐藏下一步按钮
  hideNext();
  $.map(_data.Pages[0].Values, function(_item) {
    var $inputDom = $('#' + _item.FormId);

    if (_item.ColumnName === '您是否曾经在美国停留过？') {
      $('#J_autowritetips').text(_item.ColumnName);
      if (_item.Value === 'True') {
        $inputDom.click();
        var interval1 = setInterval(function() {
          if ($('#ctl00_SiteContentPlaceHolder_FormView1_add1').length) {
            clearInterval(interval1);
            $.map(_data.Pages[0].Values, function(_secItem) {

              if (_secItem.ColumnName === '以往赴美1抵达日期-日' || _secItem.ColumnName === '以往赴美1抵达日期-月') {
                $('#J_autowritetips').text(_secItem.ColumnName);
                $.map($('#' + _secItem.FormId).find('option'), function(_optionItem) {
                  if ($(_optionItem).attr('value') - 0 === _secItem.Value - 0) {
                    $(_optionItem).prop('selected', true);
                  }
                });
              };

              if (_secItem.ColumnName === '以往赴美1抵达日期-年' || _secItem.ColumnName === '以往赴美1时长') {
                $('#J_autowritetips').text(_secItem.ColumnName);
                $('#' + _secItem.FormId).val(_secItem.Value);
              }

              autoSelectValue('以往赴美1停留时间单位', _secItem);


              


            });
          }
        }, 1000);
      } else {
        $inputDom.click();
        hasBeenInUS = true
      }
    };

    // // TODO 护照吧
    // if (_item.ColumnName === '您是否持有或者曾经持有美国驾照？') {
    //   $('#J_autowritetips').text(_item.ColumnName);
    //   if (_item.Value === 'True') {
    //     $inputDom.click();
    //   } else {
    //     $inputDom.click();
    //     hasBeenVisa = true
    //   }
    // };

    // // 您被拒签过吗？ 或在入境口岸被拒入境， 或被撤销入境申请？
    // if (_item.ColumnName === '您被拒签过吗？ 或在入境口岸被拒入境，或被撤销入境申请？') {
    //   $('#J_autowritetips').text(_item.ColumnName);
    //   if (_item.Value === 'True') {
    //     $inputDom.click();
    //   } else {
    //     $inputDom.click();
    //     hasBeenVisaRefuse = true
    //   }
    // };

    // // 曾有人在公民及移民服务局为您申请过移民吗？
    // if (_item.ColumnName === '曾有人在公民及移民服务局为您申请过移民吗？') {
    //   $('#J_autowritetips').text(_item.ColumnName);
    //   if (_item.Value === 'True') {
    //     $inputDom.click();
    //   } else {
    //     $inputDom.click();
    //     immigrant = true
    //   }
    // };

  });


  var intervalShowNext = setInterval(function() {
    if (hasBeenInUS && hasBeenVisa && hasBeenVisaRefuse && immigrant) {
      clearInterval(intervalShowNext);

      // 填写完成,显示下一步按钮
      showNext();
    }
  }, 1000);
}