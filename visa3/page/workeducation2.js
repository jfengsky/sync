/**
 * Description: 第11页自动写入脚本文件
 * Author: jiangfeng<jiang.f@ctrip.com>
 * Date: 2015-03-13 16:17
 *
 */

function WorkEducation2_page(_data) {
  var canShowNext = false,
    previousClick = false,

    eduClick = false,

    // 工作次数,默认为1
    empTimes = 1,

    // 教育次数,默认为1
    eduTimes = 1,

    canWriteEmployer = false,

    canWriteEdu = false;


  $('#J_autowritetips').text('检查工作和教育经历次数...');
  $.map(_data.Pages[0].Values, function(_item) {

    if (_item.ColumnName === '以往工作个数') {
      empTimes = _item.Value
    }

    if (_item.ColumnName === '以往学校个数') {
      eduTimes = _item.Value
    }
  });


  // 隐藏下一步按钮
  hideNext();
  $.map(_data.Pages[0].Values, function(_item) {
    if (_item.ColumnName === '您之前有工作吗？') {
      tip(_item, 1);
      $('#' + _item.FormId).click();
      if (_item.Value === 'True') {
        var interval1 = setInterval(function() {
          tip(_item, 2);
          if ($('#ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl00_tbEmployerName').length) {
            clearInterval(interval1);

            if (empTimes > 1) {
              $('#J_autowritetips').text('添加以往单位...');

              // js 触发点击事件
              clickEvent("#ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl00_InsertButtonPrevEmpl");

              // 官网限制了只能添加一个, 检测一次即可
              var interval11 = setInterval(function() {
                if ($('#ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl01_tbEmployerName').length) {
                  clearInterval(interval11);
                  canWriteEmployer = true;
                }
              }, 1000);
            } else {
              canWriteEmployer = true;
            }

            var interval12 = setInterval(function() {
              if (canWriteEmployer) {
                clearInterval(interval12);
                for (var tempIndex = 1; tempIndex <= empTimes; tempIndex++) {
                  $.map(_data.Pages[0].Values, function(_secItem) {
                    if (_secItem.ColumnName === '以往单位' + tempIndex + '名称[英文]' || _secItem.ColumnName === '以往单位' + tempIndex + '街道地址（第一行）[英文]' || _secItem.ColumnName === '以往单位' + tempIndex + '街道地址（第二行）[英文]' || _secItem.ColumnName === '以往单位' + tempIndex + '城市[英文]' || _secItem.ColumnName === '以往单位' + tempIndex + '州/省份[英文]' || _secItem.ColumnName === '以往单位' + tempIndex + '邮政区域/邮政编码' || _secItem.ColumnName === '以往单位' + tempIndex + '电话号码' || _secItem.ColumnName === '以往单位' + tempIndex + '职务名称[英文]' || _secItem.ColumnName === '以往单位' + tempIndex + '主管姓氏[英文]' || _secItem.ColumnName === '以往单位' + tempIndex + '主管名字[英文]' || _secItem.ColumnName === '以往单位' + tempIndex + '工作开始日期-年' || _secItem.ColumnName === '以往单位' + tempIndex + '工作结束日期-年' || _secItem.ColumnName === '以往单位' + tempIndex + '请简要描述您的工作职责：[英文]') {
                      setVal(_secItem);
                    }

                    setSelect('以往单位' + tempIndex + '工作开始日期-日', _secItem, 'number');
                    setSelect('以往单位' + tempIndex + '工作开始日期-月', _secItem, 'number');
                    setSelect('以往单位' + tempIndex + '工作结束日期-日', _secItem, 'number');
                    setSelect('以往单位' + tempIndex + '工作结束日期-月', _secItem, 'number');

                    setSelect('以往单位' + tempIndex + '国家/地区[英文]', _secItem);

                    autoNotApplyCheckbox('以往单位' + tempIndex + '州/省份不适用', _secItem);
                    autoNotApplyCheckbox('以往单位' + tempIndex + '邮政区域/邮政编码不适用', _secItem);
                    autoNotApplyCheckbox('以往单位' + tempIndex + '主管姓氏未知的', _secItem);
                    autoNotApplyCheckbox('以往单位' + tempIndex + '主管名字未知', _secItem);

                    previousClick = true;
                  });
                }
              }
            }, 2000);

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
          tip(_item, 1);
          $('#' + _item.FormId).click();
          if (_item.Value === 'True') {
            var interval2 = setInterval(function() {
              if ($('#ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEduc_ctl00_tbxSchoolName').length) {
                clearInterval(interval2);
                if (eduTimes > 1) {
                  $('#J_autowritetips').text('添加教育经历...');
                  clickEvent("#ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEduc_ctl00_InsertButtonPrevEduc");
                  var interval21 = setInterval(function() {
                    if ($('#ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEduc_ctl01_tbxSchoolName').length) {
                      clearInterval(interval21);

                      // 限制只能添加2次经历
                      if (eduTimes > 2) {
                        $('#J_autowritetips').text('添加教育经历2...');
                        clickEvent("#ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEduc_ctl00_InsertButtonPrevEduc");
                        var interval22 = setInterval(function() {
                          if ($('#ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEduc_ctl02_tbxSchoolName').length) {
                            clearInterval(interval22);
                            canWriteEdu = true;
                          }
                        }, 1000);
                      } else {
                        canWriteEdu = true;
                      }
                    }
                  }, 1000);

                } else {
                  canWriteEdu = true;
                }
                var interval23 = setInterval(function() {
                  if (canWriteEdu) {
                    clearInterval(interval23);
                    for (var tempIndex = 1; tempIndex <= eduTimes; tempIndex++) {
                      $.map(_data.Pages[0].Values, function(_secItem) {
                        // console.log(tempIndex);
                        if (_secItem.ColumnName === '以往教育机构' + tempIndex + '名称[英文]' || _secItem.ColumnName === '以往教育机构' + tempIndex + '街道地址（第一行）[英文]' || _secItem.ColumnName === '以往教育机构' + tempIndex + '街道地址（第二行）[英文]' || _secItem.ColumnName === '以往教育机构' + tempIndex + '城市[英文]' || _secItem.ColumnName === '以往教育机构' + tempIndex + '州/省份[英文]' || _secItem.ColumnName === '以往教育机构' + tempIndex + '邮政区域/邮政编码' || _secItem.ColumnName === '以往教育机构' + tempIndex + '课程[英文]' || _secItem.ColumnName === '以往教育机构' + tempIndex + '就读开始日期-年' || _secItem.ColumnName === '以往教育机构' + tempIndex + '就读结束日期-年') {
                          setVal(_secItem);
                        };

                        setSelect('以往教育机构' + tempIndex + '就读开始日期-日', _secItem, 'number');
                        setSelect('以往教育机构' + tempIndex + '就读开始日期-月', _secItem, 'number');
                        setSelect('以往教育机构' + tempIndex + '就读结束日期-日', _secItem, 'number');
                        setSelect('以往教育机构' + tempIndex + '就读结束日期-月', _secItem, 'number');

                        setSelect('以往教育机构' + tempIndex + '国家/地区[英文]', _secItem);

                        autoNotApplyCheckbox('以往教育机构' + tempIndex + '州/省份不适用', _secItem);
                        autoNotApplyCheckbox('以往教育机构' + tempIndex + '邮政区域/邮政编码不适用', _secItem);
                        // console.log(tempIndex);
                        eduClick = true;
                      });
                      // if (tempIndex === eduTimes) {
                      //   eduClick = true;
                      // }
                    }
                  }
                }, 2000);
              }
            }, 1000);
          } else {
            eduClick = true;
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