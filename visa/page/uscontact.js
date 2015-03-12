/**
 * Description: 第八页自动写入脚本文件
 * Author: jiangfeng<jiang.f@ctrip.com>
 * Date: 2015-03-12 09:17
 *
 */
function USContact_page(_data) {
  
  // 隐藏下一步按钮
  hideNext();

  $.map(_data.Pages[0].Values, function(_item) {
    console.log(_item);
    if (_item.ColumnName === '在美国的联系人—姓氏[英文]' || _item.ColumnName === '在美国的联系人—名字[英文]' || _item.ColumnName === '在美国的联系组织名称[英文]') {
      $('#' + _item.FormId).val(_item.Value);
      $('#J_autowritetips').text(_item.ColumnName);
    }

    
    
  });
  // var intervalShowNext = setInterval(function() {
  //   if (immigrant) {
  //     clearInterval(intervalShowNext);

  //     // 填写完成,显示下一步按钮
  //     showNext();
  //   }
  // }, 1000);

}