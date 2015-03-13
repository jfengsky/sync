/**
 * Description: 第九页自动写入脚本文件
 * Author: jiangfeng<jiang.f@ctrip.com>
 * Date: 2015-03-13 09:17
 *
 */

function Spouse_page(_data) {
  var canShowNext = false;

  // 隐藏下一步按钮
  hideNext();

  $.map(_data.Pages[0].Values, function(_item) {

    if (_item.ColumnName === '配偶的姓氏[英文]' || _item.ColumnName === '配偶的名字[英文]' || _item.ColumnName === '配偶的出生日期-年' || _item.ColumnName === '配偶出生城市[英文]') {
      $('#' + _item.FormId).val(_item.Value);
      $('#J_autowritetips').text(_item.ColumnName);
    }

    if (_item.ColumnName === '配偶的出生日期-日') {
      $('#J_autowritetips').text(_item.ColumnName);
      $.map($('#' + _item.FormId).find('option'), function(_optionItem) {
        if ($(_optionItem).attr('value') - 0 === _item.Value - 0) {
          $(_optionItem).prop('selected', true);
        }
      });
    };

    if (_item.ColumnName === '配偶的出生日期-月') {
      $('#J_autowritetips').text(_item.ColumnName);
      $.map($('#' + _item.FormId).find('option'), function(_optionItem) {
        if ($(_optionItem).attr('value') === formatMonth(_item.Value - 0)) {
          $(_optionItem).prop('selected', true);
        }
      });
    };

    autoSelectValue('配偶所属国籍[英文]', _item);
    autoSelectValue('配偶出生国家[英文]', _item);
    autoNotApplyCheckbox('配偶出生城市未知的', _item);

    if (_item.ColumnName === '配偶的联系地址') {
      $.map($('#' + _item.FormId).find('option'), function(__optionItem) {
        if ($(__optionItem).attr('value') === _item.Value) {
          // js去触发select的change事件
          var ev = document.createEvent("HTMLEvents");
          $(__optionItem).prop('selected', true);
          ev.initEvent("change", false, true);
          $('#' + _item.FormId).get(0).dispatchEvent(ev);
        }
      });

      if (_item.Value === 'O') {
        var interval6 = setInterval(function() {
          if ($('#ctl00_SiteContentPlaceHolder_FormView1_tbxSPOUSE_ADDR_LN1').length) {
            clearInterval(interval6);
            $.map(_data.Pages[0].Values, function(_secItem) {
              if (_secItem.ColumnName === '配偶的联系地址街道地址（第一行）[英文]' || _secItem.ColumnName === '配偶的联系地址街道地址（第二行）[英文]' || _secItem.ColumnName === '配偶的联系地址城市[英文]' || _secItem.ColumnName === '配偶的联系地址省份[英文]' || _secItem.ColumnName === '配偶的联系地址邮编') {
                $('#' + _secItem.FormId).val(_secItem.Value);
                $('#J_autowritetips').text(_secItem.ColumnName);
              }

              autoNotApplyCheckbox('配偶的联系地址省份未知的', _secItem);
              autoNotApplyCheckbox('配偶的联系地址邮编未知的', _secItem);

              autoSelectValue('配偶的联系地址国家[英文]', _secItem);

              canShowNext = true
            });
          }
        }, 1000);
      } else {
        canShowNext = true
      }
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