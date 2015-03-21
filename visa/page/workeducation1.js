/**
 * Description: 第十页自动写入脚本文件
 * Author: jiangfeng<jiang.f@ctrip.com>
 * Date: 2015-03-13 16:17
 *
 */

function WorkEducation1_page(_data) {
  var canShowNext = false;

  // 隐藏下一步按钮
  hideNext();
  $.map(_data.Pages[0].Values, function(_item) {
    if (_item.ColumnName === '当前主要职业') {
      if (!$('#ctl00_SiteContentPlaceHolder_FormView1_ddlPresentOccupation').val()) {
        $('#J_autowritetips').text('选择 Primary Occupation 之后页面会被刷新, 刷新后请再次点击 自动填写表单按钮');
        setTimeout(function() {
          $.map($('#' + _item.FormId).find('option'), function(__optionItem) {
            if ($(__optionItem).attr('value') === _item.Value) {
              // js去触发select的change事件
              var ev = document.createEvent("HTMLEvents");
              $(__optionItem).prop('selected', true);
              ev.initEvent("change", false, true);
              $('#' + _item.FormId).get(0).dispatchEvent(ev);
            }
          });
        }, 2000);
      }
    }

    if ($('#ctl00_SiteContentPlaceHolder_FormView1_ddlPresentOccupation').val()) {

      $.map(_data.Pages[0].Values, function(_secItem) {
        if (_secItem.ColumnName === '当前工作单位或学校的名称[英文]' || _secItem.ColumnName === '当前工作单位或学校的街道地址（第一行）[英文]' || _secItem.ColumnName === '当前工作单位或学校的街道地址（第二行）[英文]' || _secItem.ColumnName === '当前工作单位或学校的城市[英文]' || _secItem.ColumnName === '当前工作单位或学校的州/省份[英文]' || _secItem.ColumnName === '当前工作单位或学校的邮政区域/邮政编码' || _secItem.ColumnName === '当前工作单位或学校的电话号码' || _secItem.ColumnName === '当前的月收入（如有工作，当地货币）' || _secItem.ColumnName === '请简要描述您当前的工作职责：[英文]' || _secItem.ColumnName === '未就业说明[英文]') {
          $('#' + _secItem.FormId).val(_secItem.Value);
          $('#J_autowritetips').text(_secItem.ColumnName);
        }
        setSelect('当前工作单位或学校的国家/地区[英文]', _secItem);
        
        setTimeout(function() {
          autoNotApplyCheckbox('当前工作单位或学校的州/省份不适用', _secItem);
          autoNotApplyCheckbox('当前工作单位或学校的邮政区域/邮政编码不适用', _secItem);

          autoNotApplyCheckbox('当前的月收入不适用', _secItem);


          canShowNext = true
        }, 1000);

      });


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