/**
 * Description: 第14页自动写入脚本文件
 * Author: jiangfeng<jiang.f@ctrip.com>
 * Date: 2015-03-13 16:17
 *
 */

function SecurityandBackground3_page(_data) {
  var canShowNext = false;
  // 隐藏下一步按钮
  hideNext();

  var data = _data.Pages[0].Values;
  $.map(_data.Pages[0].Values, function(_item) {

    autoClickWrite(_item, '在美国期间，您是否意图从事间谍活动、阴谋破坏、违反出口管制条例或其他任何非法活动？', '在美国期间，您是否意图从事间谍活动、阴谋破坏、违反出口管制条例或其他任何非法活动？说明[英文]', data);

    autoClickWrite(_item, '在美国期间，您是否意图从事恐怖活动？或您是否曾经从事过恐怖活动？', '在美国期间，您是否意图从事恐怖活动？或您是否曾经从事过恐怖活动？说明[英文]', data);

    autoClickWrite(_item, '您是否曾经或计划为恐怖分子或恐怖组织提供经济或其它方面的支持？', '您是否曾经或计划为恐怖分子或恐怖组织提供经济或其它方面的支持？说明[英文]', data);

    autoClickWrite(_item, '您是否是一恐怖组织的成员或代表？', '您是否是一恐怖组织的成员或代表？说明[英文]', data);

    autoClickWrite(_item, '您是否曾经指使、煽动、从事、协助或参与了过种族灭绝大屠杀？', '您是否曾经指使、煽动、从事、协助或参与了过种族灭绝大屠杀？说明[英文]', data);

    autoClickWrite(_item, '您是否曾经从事、指使、煽动、协助或以其他方式参与了刑讯？', '您是否曾经从事、指使、煽动、协助或以其他方式参与了刑讯？说明[英文]', data);

    autoClickWrite(_item, '您是否曾经从事、指使、煽动、协助或参与了法庭外的杀戮、政治谋杀或者其他暴力行为？', '您是否曾经从事、指使、煽动、协助或参与了法庭外的杀戮、政治谋杀或者其他暴力行为？说明[英文]', data);

    autoClickWrite(_item, '你曾经从事过招募士兵或利用儿童士兵吗？', '你曾经从事过招募士兵或利用儿童士兵吗？说明[英文]', data);

    autoClickWrite(_item, '在担任政府官员期间，您是否曾经负责或直接执行过严重违反宗教自由的行动？', '在担任政府官员期间，您是否曾经负责或直接执行过严重违反宗教自由的行动？说明[英文]', data);

    autoClickWrite(_item, '您曾经直接参与过制定或执行人口控制的规定,强迫妇女或男士违愿进行人流或绝育吗?', '您曾经直接参与过制定或执行人口控制的规定,强迫妇女或男士违愿进行人流或绝育吗?说明[英文]', data);

    autoClickWrite(_item, '您是否直接参与过强迫人体器官及人体组织的移植？', '您是否直接参与过强迫人体器官及人体组织的移植？说明[英文]', data);

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