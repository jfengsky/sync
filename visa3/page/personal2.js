/**
 * Description: 第二页自动写入脚本文件
 * Author: jiangfeng<jiang.f@ctrip.com>
 * Date: 2015-03-2 15:59
 *
 */
function Personal2_Page(_data) {

  var canShowNext = false;

  // 隐藏下一步按钮
  hideNext();

  $.map(_data.Pages[0].Values, function(_item) {
    if (_item.ColumnName === '身份证号码' || _item.ColumnName === '美国社会安全号部分1' || _item.ColumnName === '美国社会安全号部分2' || _item.ColumnName === '美国社会安全号部分3' || _item.ColumnName === '美国纳税人身份号码') {
      setVal(_item);
    };

    // 国籍
    setSelect('所属国籍[英文]', _item);
    // if (_item.ColumnName === '所属国籍[英文]') {
    //   $.map($('#' + _item.FormId).find('option'), function(__item) {

    //     // 要转成大写进行比较
    //     if ($(__item).text() === _item.Value.toLocaleUpperCase()) {
    //       $(__item).prop('selected', true);
    //     }
    //   });
    // };

    // 其它国籍
    if (_item.ColumnName === '是否拥有其他国籍') {
      $('#' + _item.FormId).click();
      tip(_item,1);
      if (_item.Value === 'True') {
        canShowNext = false;
        var intervalNationality = setInterval(function() {
          tip(_item,2);
          if ($('#ctl00_SiteContentPlaceHolder_FormView1_othernationalities').length) {
            clearInterval(intervalNationality);

            // 选择其它国籍
            // 这里需要重新遍历返回的值
            $.map(_data.Pages[0].Values, function(_NationItem) {
              autoSelectValue('其他国籍[英文]', _NationItem);

              // 其它国籍护照
              if (_NationItem.ColumnName === '是否拥有其他国籍护照') {
                $('#' + _NationItem.FormId).click();
                tip(_NationItem,1);
                if (_NationItem.Value === 'True') {
                  canShowNext = false;
                  var intervalOtherNationality = setInterval(function() {
                    tip(_NationItem,2);
                    if ($('#ctl00_SiteContentPlaceHolder_FormView1_dtlOTHER_NATL_ctl00_OTHER_PPT').length) {
                      clearInterval(intervalOtherNationality);

                      // 写入其他国籍护照号码
                      // 这里需要重新遍历返回的值
                      $.map(_data.Pages[0].Values, function(_NationNoItem) {
                        setInputText('其他国籍护照号码', _NationNoItem);
                        canShowNext = true;
                      });
                    }
                  }, 1000)
                } else {
                  canShowNext = true
                }
              }


            });
          }
        }, 1000)
      } else {
        canShowNext = true
      }
    };

    // 国籍不适用的
    autoNotApplyCheckbox('是否身份证不适用', _item);

    // 社会安全号不适用的
    autoNotApplyCheckbox('是否美国社会安全号不适用', _item);

    // 税号不适用的
    autoNotApplyCheckbox('是否美国纳税人身份号码不适用', _item);

  });

  // 填写完成,显示下一步按钮
  var intervalShowNext = setInterval(function() {
    if (canShowNext) {
      clearInterval(intervalShowNext);

      // 填写完成,显示下一步按钮
      showNext();
    }
  }, 1000);

};