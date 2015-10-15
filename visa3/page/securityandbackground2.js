/**
 * Description: 第13页自动写入脚本文件
 * Author: jiangfeng<jiang.f@ctrip.com>
 * Date: 2015-03-13 16:17
 *
 */

function SecurityandBackground2_page(_data) {
  var canShowNext = false;

  var data = _data.Pages[0].Values;

  // 隐藏下一步按钮
  hideNext();
  $.map(_data.Pages[0].Values, function(_item) {

    autoClickWrite(_item, '您是否曾经因违法或犯罪被捕或被判刑，即使后来您受到了宽恕、赦免或其它类似的裁决？', '您是否曾经因违法或犯罪被捕或被判刑，即使后来您受到了宽恕、赦免或其它类似的裁决？说明[英文]', data);
    autoClickWrite(_item, '您是否曾经违反或密谋违反有关管控物资方面的法律？', '您是否曾经违反或密谋违反有关管控物资方面的法律？说明[英文]', data);
    autoClickWrite(_item, '您是来美国从事卖淫或非法商业性交易吗？在过去十年中，您是否从事过卖淫或组织介绍过卖淫？', '您是来美国从事卖淫或非法商业性交易吗？在过去十年中，您是否从事过卖淫或组织介绍过卖淫？说明[英文]', data);
    autoClickWrite(_item, '您是否曾经参与或意图从事洗钱活动？', '您是否曾经参与或意图从事洗钱活动？说明[英文]', data);
    autoClickWrite(_item, '您曾在美国或美国以外的地方犯有或密谋人口走私罪吗？', '您曾在美国或美国以外的地方犯有或密谋人口走私罪吗？说明[英文]', data);
    autoClickWrite(_item, '你有没有故意资助，教唆，协助或勾结某个人，而这个人在美国或美国以外的地方曾犯有、或密谋了一严重的人口走私案？', '你有没有故意资助，教唆，协助或勾结某个人，而这个人在美国或美国以外的地方曾犯有、或密谋了一严重的人口走私案？说明[英文]', data);
    autoClickWrite(_item, '您是一曾在美国或美国以外犯有或密谋人口走私案犯的配偶或儿女吗？您在最近5年里是否从走私活动中获得过好处？', '您是一曾在美国或美国以外犯有或密谋人口走私案犯的配偶或儿女吗？您在最近5年里是否从走私活动中获得过好处？说明[英文]', data);

    canShowNext = true;


  });

  var intervalShowNext = setInterval(function() {
    if (canShowNext) {
      clearInterval(intervalShowNext);

      // 填写完成,显示下一步按钮
      showNext();
    }
  }, 1000);

}