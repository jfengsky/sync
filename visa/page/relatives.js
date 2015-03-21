/**
 * Description: 第七页自动写入脚本文件
 * Author: jiangfeng<jiang.f@ctrip.com>
 * Date: 2015-03-9 09:17
 *
 */

function Relatives_page(_data) {
  var canShowNext = false,
    isFatherStatus = false,
    isMotherStatus = false,
    isOtherStatus = false;

  // 隐藏下一步按钮
  hideNext();

  $.map(_data.Pages[0].Values, function(_item) {

    // TODO 母亲的年id不正确
    if (_item.ColumnName === '父亲姓氏[英文]' || _item.ColumnName === '父亲名字[英文]' || _item.ColumnName === '父亲出生日期-年' || _item.ColumnName === '母亲姓氏[英文]' || _item.ColumnName === '母亲名字[英文]' || _item.ColumnName === '母亲出生日期-年') {
      $('#' + _item.FormId).val(_item.Value);
      $('#J_autowritetips').text(_item.ColumnName);
    }

    if (_item.ColumnName === '父亲出生日期-日' || _item.ColumnName === '母亲出生日期-日') {
      $('#J_autowritetips').text(_item.ColumnName);
      $.map($('#' + _item.FormId).find('option'), function(_optionItem) {
        if ($(_optionItem).attr('value') - 0 === _item.Value - 0) {
          $(_optionItem).prop('selected', true);
        }
      });
    };

    if (_item.ColumnName === '父亲出生日期-月' || _item.ColumnName === '母亲出生日期-月') {
      $('#J_autowritetips').text(_item.ColumnName);
      $.map($('#' + _item.FormId).find('option'), function(_optionItem) {
        if ($(_optionItem).attr('value') === formatMonth(_item.Value - 0)) {
          $(_optionItem).prop('selected', true);
        }
      });
    }

    autoNotApplyCheckbox('父亲姓氏不知道', _item);
    autoNotApplyCheckbox('父亲名字不知道', _item);
    autoNotApplyCheckbox('父亲出生日期不知道', _item);

    // TODO 遗漏了母亲姓氏不知道
    autoNotApplyCheckbox('母亲姓氏不知道', _item);
    autoNotApplyCheckbox('母亲名字不知道', _item);
    autoNotApplyCheckbox('母亲出生日期不知道', _item);

    if (_item.ColumnName === '您父亲是否在美国？') {
      $('#J_autowritetips').text(_item.ColumnName);
      $('#' + _item.FormId).click();
      if (_item.Value === 'True') {
        var interval1 = setInterval(function() {
          if ($('#ctl00_SiteContentPlaceHolder_FormView1_ddlFATHER_US_STATUS').length) {
            clearInterval(interval1);
            $.map(_data.Pages[0].Values, function(_secItem) {
              autoSelectValue('父亲在美国的移民或非移民身份', _secItem);
              isFatherStatus = true;
            });
          }
        }, 1000);
      } else {
        isFatherStatus = true;
      }
    }

    if (_item.ColumnName === '您母亲是否在美国？') {
      var interval2 = setInterval(function() {
        if (isFatherStatus) {
          clearInterval(interval2);
          $('#J_autowritetips').text(_item.ColumnName);
          $('#' + _item.FormId).click();
          if (_item.Value === 'True') {
            var interval3 = setInterval(function() {
              if ($('#ctl00_SiteContentPlaceHolder_FormView1_ddlMOTHER_US_STATUS').length) {
                clearInterval(interval3);
                $.map(_data.Pages[0].Values, function(_secItem) {
                  autoSelectValue('母亲在美国的移民或非移民身份', _secItem);
                  isMotherStatus = true;
                });
              }
            }, 1000);
          } else {
            isMotherStatus = true;
          };
        }
      }, 1000);
      // $('#' + _item.FormId).click();
    };

    if (_item.ColumnName === '除父母以外，您在美国是否还有其他直系亲属?') {
      var interval4 = setInterval(function() {
        if (isMotherStatus) {
          clearInterval(interval4);
          $('#J_autowritetips').text(_item.ColumnName);
          $('#' + _item.FormId).click();
          if (_item.Value === 'True') {
            var interval5 = setInterval(function() {
              if ($('#ctl00_SiteContentPlaceHolder_FormView1_dlUSRelatives_ctl00_tbxUS_REL_SURNAME').length) {
                clearInterval(interval5);

                $.map(_data.Pages[0].Values, function(_thirdItem) {
                  if (_thirdItem.ColumnName === '亲属姓氏[英文]' || _thirdItem.ColumnName === '亲属名字[英文]') {
                    $('#' + _thirdItem.FormId).val(_thirdItem.Value);
                    $('#J_autowritetips').text(_thirdItem.ColumnName);
                  };

                  autoSelectValue('亲属与您的关系', _thirdItem);
                  autoSelectValue('亲属在美国的移民或非移民身份', _thirdItem);
                  isOtherStatus = true;
                });
              }
            }, 1000);
          } else {
            isOtherStatus = true
          }
        }
      }, 2000);
    }

    if (_item.ColumnName === '您在美国是否还有其他亲属？') {
      var interval4 = setInterval(function() {
        if (isOtherStatus) {
          clearInterval(interval4);
          tip(_item, 1);
          $('#' + _item.FormId).click();
        }
      }, 2000);

    }


  });

  var intervalShowNext = setInterval(function() {
    if (canShowNext) {
      clearInterval(intervalShowNext);

      // 填写完成,显示下一步按钮
      showNext();
    }
  }, 1000);

}