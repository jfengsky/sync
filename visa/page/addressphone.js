/**
 * Description: 第三页自动写入脚本文件
 * Author: jiangfeng<jiang.f@ctrip.com>
 * Date: 2015-03-3 10:46
 *
 */

function AddressPhone_Page(_data) {

  // 隐藏下一步按钮
  hideNext();

  $.map(_data.Pages[0].Values, function(_item) {
    if (_item.ColumnName === '街道地址1' || _item.ColumnName === '街道地址2' || _item.ColumnName === '城市' || _item.ColumnName === '州/省' || _item.ColumnName === '邮政编码') {
      $('#' + _item.FormId).val(_item.Value);
      $('#J_autowritetips').text(_item.ColumnName);
    };

    // 国家
    autoSelect('国家', _item);

    // 其它国籍
    if (_item.ColumnName === '其它国籍') {
      $('#' + _item.FormId).click();
    };

    // 国籍不适用的
    autoNotApplyCheckbox('国籍不适用的', _item);

    // 社会安全号不适用的
    autoNotApplyCheckbox('社会安全号不适用的', _item);

    // 税号不适用的
    autoNotApplyCheckbox('税号不适用的', _item);

  });

  // 填写完成,显示下一步按钮
  showNext();

};