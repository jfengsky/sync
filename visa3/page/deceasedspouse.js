/**
 * Description: 已故配偶信息
 * Author: jiangfeng<jiang.f@ctrip.com>
 * Date: 2015-03-19 11:24
 *
 */

function DeceasedSpouse_page(_data) {
  var canShowNext = false;

  // 隐藏下一步按钮
  hideNext();

  // 遍历数据开始自动写入操作
  $.map(_data.Pages[0].Values, function(_item) {
    if (_item.ColumnName === '已故配偶姓氏[英文]' || _item.ColumnName === '已故配偶名字[英文]' || _item.ColumnName === '已故配偶出生日期-年' || _item.ColumnName === '已故配偶出生城市[英文]') {
      setVal(_item);
    }

    // 生日 - 日
    setSelect('已故配偶出生日期-日', _item, 'number');

    // 生日 - 月
    setSelect('已故配偶出生日期-月', _item, 'month');

    setSelect('已故配偶所属国家[英文]', _item);

    autoNotApplyCheckbox('已故配偶出生城市未知的', _item);

    setSelect('已故配偶出生国家[英文]', _item);

    canShowNext = true;

  });

  var intervalShowNext = setInterval(function() {
    if (canShowNext) {
      clearInterval(intervalShowNext);

      // 填写完成,显示下一步按钮
      showNext();
    }
  }, 1000);
};