/**
 * Description: 第四页自动写入脚本文件
 * Author: jiangfeng<jiang.f@ctrip.com>
 * Date: 2015-03-3 15:58
 *
 */

function PptVisa_Page(_data) {

  var canShowNext = false,
    passportTypeFinsh = false;
  // 隐藏下一步按钮
  hideNext();

  $.map(_data.Pages[0].Values, function(_item) {
    if (_item.ColumnName === '护照/旅行证件号码' || _item.ColumnName === '护照本编号' || _item.ColumnName === '护照签发地—城市[英文]' || _item.ColumnName === '护照签发地—州/省份（如果护照上显示）[英文]' || _item.ColumnName === '签发日期-年' || _item.ColumnName === '失效日期-年') {
      $('#' + _item.FormId).val(_item.Value);
      $('#J_autowritetips').text(_item.ColumnName);
    };

    // 护照类型
    if (_item.ColumnName === '护照/旅行证件种类') {
      if (_item.Value === 'T') {

        $.map($('#' + _item.FormId).find('option'), function(__optionItem) {
          if ($(__optionItem).attr('value') === _item.Value) {
            // js去触发select的change事件
            var ev = document.createEvent("HTMLEvents");
            $(__optionItem).prop('selected', true);
            ev.initEvent("change", false, true);
            $('#' + _item.FormId).get(0).dispatchEvent(ev);
          }
        });

        var intervalPassportType = setInterval(function() {
          $('#J_autowritetips').text('护照/旅行证件种类有异步操作,请稍后...');
          if ($('#ctl00_SiteContentPlaceHolder_FormView1_tbxPptOtherExpl').length) {
            clearInterval(intervalPassportType);
            $.map(_data.Pages[0].Values, function(_item) {
              if (_item.ColumnName === '护照种类其他的说明[英文]') {
                $('#' + _item.FormId).val(_item.Value);
                passportTypeFinsh = true;
              }
            });
          }
        }, 1000);
      } else {
        autoSelectValue('护照/旅行证件种类', _item);
        passportTypeFinsh = true;
      };
    }


    // 护照本号码不适用的
    autoNotApplyCheckbox('护照本编号（不适用）', _item);

    // 发放护照的国家
    autoSelectValue('颁发护照/旅行证件的国家/机构[英文]', _item);

    // 发放护照的地带
    autoSelectValue('护照签发地—国家/地区[英文]', _item);

    // 发放日期[日]
    if (_item.ColumnName === '签发日期-日') {
      $.map($('#' + _item.FormId).find('option'), function(__item) {
        if ($(__item).attr('value') - 0 === _item.Value - 0) {
          $(__item).prop('selected', true);
        }
      });
    };

    // 发放日期[月]
    if (_item.ColumnName === '签发日期-月') {
      $.map($('#' + _item.FormId).find('option'), function(__item) {
        if (($(__item).attr('value') - 0) === (_item.Value - 0)) {
          $(__item).prop('selected', true);
        }
      });
    };

    // 过期日期[日]
    if (_item.ColumnName === '失效日期-日') {
      $.map($('#' + _item.FormId).find('option'), function(__item) {
        if (($(__item).attr('value') - 0) === (_item.Value - 0)) {
          $(__item).prop('selected', true);
        }
      });
    };

    // 过期日期[月]
    if (_item.ColumnName === '失效日期-月') {
      $.map($('#' + _item.FormId).find('option'), function(__item) {
        if (($(__item).attr('value') - 0) === (_item.Value - 0)) {
          $(__item).prop('selected', true);
        }
      });
    };

    // 过期不适用的
    autoNotApplyCheckbox('失效日期（不适用）', _item);

    // 是否遗失过护照
    if (_item.ColumnName === '您的护照是否曾遗失或者被盗？') {

      // 
      var clickLostPassport = setInterval(function() {
        if (passportTypeFinsh) {
          clearInterval(clickLostPassport);
          $('#' + _item.FormId).click();
        }
      }, 1000);
      $('#J_autowritetips').text(_item.ColumnName);
      if (_item.Value === 'True') {
        canShowNext = false;
        var intervallost = setInterval(function() {
          $('#J_autowritetips').text('您的护照是否曾遗失或者被盗？有异步操作,请稍后...');
          if ($('#ctl00_SiteContentPlaceHolder_FormView1_add1').length) {
            clearInterval(intervallost);
            $.map(_data.Pages[0].Values, function(_lostItem) {
              if (_lostItem.ColumnName === '丢失的护照/旅行证件号码' || _lostItem.ColumnName === '丢失的说明[英文]') {
                $('#' + _lostItem.FormId).val(_lostItem.Value);
                $('#J_autowritetips').text(_lostItem.ColumnName);
              };

              // 遗失护照号不适用的
              autoNotApplyCheckbox('丢失的护照/旅行证件号码（忘记）', _lostItem);

              // 遗失护照发放国家
              autoSelectValue('丢失的颁发护照/旅行证件的国家/机构[英文]', _lostItem);

              canShowNext = true;
            });
          }
        }, 1000);
      } else {
        canShowNext = true;
      }
    };
  });

  // 填写完成,显示下一步按钮
  var intervalShowNext = setInterval(function() {
    if (canShowNext && passportTypeFinsh) {
      clearInterval(intervalShowNext);

      // 填写完成,显示下一步按钮
      showNext();
    }
  }, 1000);
}