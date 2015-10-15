/**
 * Description: 第12页自动写入脚本文件
 * Author: jiangfeng<jiang.f@ctrip.com>
 * Date: 2015-03-13 16:17
 *
 */

function SecurityandBackground1_page(_data) {
  var canShowNext = false;
  // 隐藏下一步按钮
  hideNext();
  var data = _data.Pages[0].Values;
  $.map(_data.Pages[0].Values, function(_item) {

    autoClickWrite(_item, '您是否患有涉及公共卫生的传染病？（按照美国卫生和公众服务部界定，涉及公共卫生的传染病包括软下疳、淋病、腹股沟肉芽肿、传染性麻风病、性病性淋巴肉芽肿，传染期梅毒，活动性肺结核等。）', '您是否患有涉及公共卫生的传染病？（按照美国卫生和公众服务部界定，涉及公共卫生的传染病包括软下疳、淋病、腹股沟肉芽肿、传染性麻风病、性病性淋巴肉芽肿，传染期梅毒，活动性肺结核等。）说明[英文]', data);
    autoClickWrite(_item, '您是否患有对其他人的人身安全及利益造成威胁的精神或身体疾病？', '您是否患有对其他人的人身安全及利益造成威胁的精神或身体疾病？说明[英文]', data);
    autoClickWrite(_item, '您是否或曾经滥用药物并上瘾？', '您是否或曾经滥用药物并上瘾？说明[英文]', data);

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