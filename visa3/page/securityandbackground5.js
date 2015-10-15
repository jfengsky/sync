/**
 * Description: 第14页自动写入脚本文件
 * Author: jiangfeng<jiang.f@ctrip.com>
 * Date: 2015-03-13 16:17
 *
 */

function SecurityandBackground5_page(_data) {
  var canShowNext = false;
  // 隐藏下一步按钮
  hideNext();

  var data = _data.Pages[0].Values;
  $.map(_data.Pages[0].Values, function(_item) {

    autoClickWrite(_item, '您是否曾经拒绝将一在美国境外的美籍儿童的监护权移交给一被美国法庭批准享有法定监护权的人？', '您是否曾经拒绝将一在美国境外的美籍儿童的监护权移交给一被美国法庭批准享有法定监护权的人？说明[英文]', data);

    autoClickWrite(_item, '您是否违反了法律或规定在美国进行过投票选举？', '您是否违反了法律或规定在美国进行过投票选举？说明[英文]', data);

    autoClickWrite(_item, '您是否曾为逃避交税而声明放弃美国公民身份?', '您是否曾为逃避交税而声明放弃美国公民身份?说明[英文]', data);

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