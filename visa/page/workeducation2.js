/**
 * Description: 第11页自动写入脚本文件
 * Author: jiangfeng<jiang.f@ctrip.com>
 * Date: 2015-03-13 16:17
 *
 */

function WorkEducation2_page(_data) {
  var canShowNext = false,
    previousClick = false,
    eduClick = false;

  // 隐藏下一步按钮
  hideNext();
  $.map(_data.Pages[0].Values, function(_item) {
    if (_item.ColumnName === '您之前有工作吗？') {
      $('#J_autowritetips').text(_item.ColumnName);
      $('#' + _item.FormId).click();
      if (_item.Value === 'True') {
        var interval1 = setInterval(function() {
          if ($('#ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl00_tbEmployerName').length) {
            clearInterval(interval1);
            $.map(_data.Pages[0].Values, function(_secItem) {
              if (_secItem.ColumnName === '以往单位1名称[英文]' || _secItem.ColumnName === '以往单位1街道地址（第一行）[英文]' || _secItem.ColumnName === '以往单位1街道地址（第二行）[英文]' || _secItem.ColumnName === '以往单位1城市[英文]' || _secItem.ColumnName === '以往单位1州/省份[英文]' || _secItem.ColumnName === '以往单位1邮政区域/邮政编码' || _secItem.ColumnName === '以往单位1电话号码' || _secItem.ColumnName === '以往单位1职务名称[英文]' || _secItem.ColumnName === '以往单位1主管姓氏[英文]' || _secItem.ColumnName === '以往单位1主管名字[英文]' || _secItem.ColumnName === '以往单位1工作开始日期-年' || _secItem.ColumnName === '以往单位1工作结束日期-年' || _secItem.ColumnName === '以往单位1请简要描述您的工作职责：[英文]') {
                $('#' + _secItem.FormId).val(_secItem.Value);
                $('#J_autowritetips').text(_secItem.ColumnName);
              }

              if (_secItem.ColumnName === '以往单位1工作开始日期-日' || _secItem.ColumnName === '以往单位1工作开始日期-月' || _secItem.ColumnName === '以往单位1工作结束日期-日' || _secItem.ColumnName === '以往单位1工作结束日期-月') {
                $('#J_autowritetips').text(_secItem.ColumnName);
                $.map($('#' + _secItem.FormId).find('option'), function(_optionItem) {
                  if ($(_optionItem).attr('value') - 0 === _secItem.Value - 0) {
                    $(_optionItem).prop('selected', true);
                  }
                });
              };

              autoNotApplyCheckbox('以往单位1州/省份不适用', _secItem);
              autoNotApplyCheckbox('以往单位1邮政区域/邮政编码不适用', _secItem);
              autoNotApplyCheckbox('以往单位1主管姓氏未知的', _secItem);
              autoNotApplyCheckbox('以往单位1主管名字未知', _secItem);

              autoSelectValue('以往单位1国家/地区[英文]', _secItem);
              previousClick = true;

            });
          }
        }, 1000);
      } else {
        previousClick = true;
      }
    };

    if (_item.ColumnName === '您是否在任何相当于中学水平或以上的教育机构里学习过？') {
      var intervaledu = setInterval(function() {
        if (previousClick) {
          clearInterval(intervaledu);
          $('#J_autowritetips').text(_item.ColumnName);
          $('#' + _item.FormId).click();
          if (_item.Value === 'True') {
            var interval2 = setInterval(function() {
              if ($('#ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEduc_ctl00_tbxSchoolName').length) {
                clearInterval(interval2);
                $.map(_data.Pages[0].Values, function(_secItem) {
                  if (_secItem.ColumnName === '以往教育机构1名称[英文]' || _secItem.ColumnName === '以往教育机构1街道地址（第一行）[英文]' || _secItem.ColumnName === '以往教育机构1街道地址（第二行）[英文]' || _secItem.ColumnName === '以往教育机构1城市[英文]' || _secItem.ColumnName === '以往教育机构1州/省份[英文]' || _secItem.ColumnName === '以往教育机构1邮政区域/邮政编码' || _secItem.ColumnName === '以往教育机构1课程[英文]' || _secItem.ColumnName === '以往教育机构1就读开始日期-年' || _secItem.ColumnName === '以往教育机构1就读结束日期-年') {
                    $('#' + _secItem.FormId).val(_secItem.Value);
                    $('#J_autowritetips').text(_secItem.ColumnName);
                  }

                  if (_secItem.ColumnName === '以往教育机构1就读开始日期-日' || _secItem.ColumnName === '以往教育机构1就读开始日期-月' || _secItem.ColumnName === '以往教育机构1就读结束日期-日' || _secItem.ColumnName === '以往教育机构1就读结束日期-月') {
                    $('#J_autowritetips').text(_secItem.ColumnName);
                    $.map($('#' + _secItem.FormId).find('option'), function(_optionItem) {
                      if ($(_optionItem).attr('value') - 0 === _secItem.Value - 0) {
                        $(_optionItem).prop('selected', true);
                      }
                    });
                  };

                  autoNotApplyCheckbox('以往教育机构1州/省份不适用', _secItem);
                  autoNotApplyCheckbox('以往教育机构1邮政区域/邮政编码不适用', _secItem);

                  autoSelectValue('以往单位1国家/地区[英文]', _secItem);
                  eduClick = true;

                });
              }
            }, 1000);
          } else {
            eduClick = true
          }
        }
      }, 2000);
    }


  });

  var intervalShowNext = setInterval(function() {
    if (eduClick) {
      clearInterval(intervalShowNext);

      // 填写完成,显示下一步按钮
      showNext();
    }
  }, 1000);

}