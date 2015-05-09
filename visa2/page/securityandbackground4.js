/**
 * Description: 第14页自动写入脚本文件
 * Author: jiangfeng<jiang.f@ctrip.com>
 * Date: 2015-03-13 16:17
 *
 */

function SecurityandBackground4_page(_data) {
  var canShowNext = false;
  // 隐藏下一步按钮
  hideNext();

  var data = _data.Pages[0].Values;
  $.map(_data.Pages[0].Values, function(_item) {

    autoClickWrite(_item, '您是否曾经试图以欺骗或故意造假及其他非法手段为自己，或帮助他人获取美国签证，入境美国或获取任何其他移民福利？', '您是否曾经试图以欺骗或故意造假及其他非法手段为自己，或帮助他人获取美国签证，入境美国或获取任何其他移民福利？说明[英文]', data);

    canShowNext = true
  });

  var intervalShowNext = setInterval(function() {
    if (canShowNext) {
      clearInterval(intervalShowNext);

      // 填写完成,显示下一步按钮
      showNext();
    }
  }, 1000);

}