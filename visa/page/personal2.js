/**
 * 第二页表单填写逻辑
 * @param
 */
function Personal2_Page(_data) {
  // 隐藏下一步按钮
  $('fieldset.submits').hide();
  if (!$('#J_autowritetips').length) {
    $('body').append(tipsTpl);
  }
  $.map(_data.Pages[0].Values, function(_item) {
    if (_item.ColumnName === '国籍号码' || _item.ColumnName === '社会安全号1' || _item.ColumnName === '社会安全号2' || _item.ColumnName === '社会安全号3' || _item.ColumnName === '税号') {
      $('#' + _item.FormId).val(_item.Value);
      $('#J_autowritetips').text(_item.ColumnName);
    };

    // 国籍
    if(_item.ColumnName === '国籍'){
      $.map($('#' + _item.FormId).find('option'), function(__item) {
        if ($(__item).attr('value') === _item.Value) {
          $(__item).prop('selected', true);
        }
      });
    };

    // 其它国籍
    if (_item.ColumnName === '其它国籍') {
      $('#' + _item.FormId).click();
    };

    // 国籍不适用的
    if (_item.ColumnName === '国籍不适用的') {
      if (_item.Value === 'True' && !$('#' + _item.FormId).prop('checked')) {
        $('#' + _item.FormId).click();
      }
    };

    // 社会安全号不适用的
    if (_item.ColumnName === '社会安全号不适用的') {
      if (_item.Value === 'True' && !$('#' + _item.FormId).prop('checked')) {
        $('#' + _item.FormId).click();
      }
    };

    // 税号不适用的
    if (_item.ColumnName === '税号不适用的') {
      if (_item.Value === 'True' && !$('#' + _item.FormId).prop('checked')) {
        $('#' + _item.FormId).click();
      }
    };

  });

  // 填写完成,显示下一步按钮
  $('fieldset.submits').show();
  $('#J_autowritetips').html(writeFinshMsg);

};