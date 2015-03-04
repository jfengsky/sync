/**
 * Description: 第五页自动写入脚本文件
 * Author: jiangfeng<jiang.f@ctrip.com>
 * Date: 2015-03-3 17:42
 *
 */

function Travel_Page(_data) {

  var canShowNext = false;

  // 隐藏下一步按钮
  hideNext();

  $.map(_data.Pages[0].Values, function(_item) {
    if (_item.ColumnName === '护照号码' || _item.ColumnName === '护照本号码' || _item.ColumnName === '发放护照的城市' || _item.ColumnName === '发放护照的省/州' || _item.ColumnName === '发放日期[年]' || _item.ColumnName === '过期日期[年]') {
      $('#' + _item.FormId).val(_item.Value);
      $('#J_autowritetips').text(_item.ColumnName);
    };

    // 护照类型
    autoSelectValue('护照类型', _item)


    // 护照本号码不适用的
    autoNotApplyCheckbox('护照本号码不适用的', _item);

    // 发放护照的国家
    autoSelectValue('发放护照的国家', _item);

    // 发放护照的地带
    autoSelectValue('发放护照的地带', _item);

    // 发放日期[日]
    if (_item.ColumnName === '发放日期[日]') {
      $.map($('#' + _item.FormId).find('option'), function(__item) {
        if ($(__item).attr('value') - 0 === _item.Value - 0) {
          $(__item).prop('selected', true);
        }
      });
    };

    // 发放日期[月]
    if (_item.ColumnName === '发放日期[月]') {
      $.map($('#' + _item.FormId).find('option'), function(__item) {
        if (($(__item).attr('value') - 0) === (_item.Value - 0)) {
          $(__item).prop('selected', true);
        }
      });
    };

    // 过期日期[日]
    if (_item.ColumnName === '过期日期[日]') {
      $.map($('#' + _item.FormId).find('option'), function(__item) {
        if (($(__item).attr('value') - 0) === (_item.Value - 0)) {
          $(__item).prop('selected', true);
        }
      });
    };

    // 过期日期[月]
    if (_item.ColumnName === '过期日期[月]') {
      $.map($('#' + _item.FormId).find('option'), function(__item) {
        if (($(__item).attr('value') - 0) === (_item.Value - 0)) {
          $(__item).prop('selected', true);
        }
      });
    };

    // 过期不适用的
    autoNotApplyCheckbox('过期不适用的', _item);

    // 是否遗失过护照
    if (_item.ColumnName === '是否遗失过护照') {
      $('#' + _item.FormId).click();
      $('#J_autowritetips').text(_item.ColumnName);
      if (_item.Value === 'True') {
        canShowNext = false;
        var intervallost = setInterval(function() {
          $('#J_autowritetips').text('是否遗失过护照有异步操作,请稍后...');
          if ($('#ctl00_SiteContentPlaceHolder_FormView1_add1').length) {
            clearInterval(intervallost);
            $.map(_data.Pages[0].Values, function(_lostItem) {
              if (_lostItem.ColumnName === '遗失护照号' || _lostItem.ColumnName === '遗失护照说明') {
                $('#' + _lostItem.FormId).val(_lostItem.Value);
                $('#J_autowritetips').text(_lostItem.ColumnName);
              };

              // 遗失护照号不适用的
              autoNotApplyCheckbox('过期不适用的', _lostItem);

              // 遗失护照发放国家
              autoSelectValue('遗失护照发放国家', _lostItem);

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
    if (canShowNext) {
      clearInterval(intervalShowNext);

      // 填写完成,显示下一步按钮
      showNext();
    }
  }, 1000);
}