/**
 * Description: 第13页自动写入脚本文件
 * Author: jiangfeng<jiang.f@ctrip.com>
 * Date: 2015-03-13 16:17
 *
 */

function SecurityandBackground2_page(_data) {
  var arrestedClick = false,
    violatedClick = false,
    prostitutionClick = false,
    moneyClick = false,
    humanClick = false,
    individualClick = false,
    individualClick2 = false;
  // 隐藏下一步按钮
  hideNext();
  $.map(_data.Pages[0].Values, function(_item) {

    if (_item.ColumnName === '您是否曾经因违法或犯罪被捕或被判刑，即使后来您受到了宽恕、赦免或其它类似的裁决？') {
      $('#J_autowritetips').text(_item.ColumnName);
      $('#' + _item.FormId).click();
      if (_item.Value === 'True') {
        $.map(_data.Pages[0].Values, function(_secItem) {
          if (_secItem.ColumnName === '您是否曾经因违法或犯罪被捕或被判刑，即使后来您受到了宽恕、赦免或其它类似的裁决？说明[英文]') {
            $('#' + _secItem.FormId).val(_secItem.Value);
            $('#J_autowritetips').text(_secItem.ColumnName);
          }
          arrestedClick = true;
        });
      } else {
        arrestedClick = true;
      }
    };

    if (_item.ColumnName === '您是否曾经违反或密谋违反有关管控物资方面的法律？') {
      $('#J_autowritetips').text(_item.ColumnName);
      $('#' + _item.FormId).click();
      if (_item.Value === 'True') {
        $.map(_data.Pages[0].Values, function(_secItem) {
          if (_secItem.ColumnName === '您是否曾经违反或密谋违反有关管控物资方面的法律？说明[英文]') {
            $('#' + _secItem.FormId).val(_secItem.Value);
            $('#J_autowritetips').text(_secItem.ColumnName);
          }
          violatedClick = true;
        });

      } else {
        violatedClick = true;
      }
    };

    if (_item.ColumnName === '您是来美国从事卖淫或非法商业性交易吗？在过去十年中，您是否从事过卖淫或组织介绍过卖淫？') {
      $('#J_autowritetips').text(_item.ColumnName);
      $('#' + _item.FormId).click();
      if (_item.Value === 'True') {
        $.map(_data.Pages[0].Values, function(_secItem) {
          if (_secItem.ColumnName === '您是来美国从事卖淫或非法商业性交易吗？在过去十年中，您是否从事过卖淫或组织介绍过卖淫？说明[英文]') {
            $('#' + _secItem.FormId).val(_secItem.Value);
            $('#J_autowritetips').text(_secItem.ColumnName);
          }
          prostitutionClick = true;
        });

      } else {
        prostitutionClick = true;
      }
    };

    if (_item.ColumnName === '您是否曾经参与或意图从事洗钱活动？') {
      $('#J_autowritetips').text(_item.ColumnName);
      $('#' + _item.FormId).click();
      if (_item.Value === 'True') {
        $.map(_data.Pages[0].Values, function(_secItem) {
          if (_secItem.ColumnName === '您是否曾经参与或意图从事洗钱活动？说明[英文]') {
            $('#' + _secItem.FormId).val(_secItem.Value);
            $('#J_autowritetips').text(_secItem.ColumnName);
          }
          moneyClick = true;
        });

      } else {
        moneyClick = true;
      }
    };

    if (_item.ColumnName === '您曾在美国或美国以外的地方犯有或密谋人口走私罪吗？') {
      $('#J_autowritetips').text(_item.ColumnName);
      $('#' + _item.FormId).click();
      if (_item.Value === 'True') {
        $.map(_data.Pages[0].Values, function(_secItem) {
          if (_secItem.ColumnName === '您曾在美国或美国以外的地方犯有或密谋人口走私罪吗？说明[英文]') {
            $('#' + _secItem.FormId).val(_secItem.Value);
            $('#J_autowritetips').text(_secItem.ColumnName);
          }
          humanClick = true;
        });

      } else {
        humanClick = true;
      }
    };

    if (_item.ColumnName === '你有没有故意资助，教唆，协助或勾结某个人，而这个人在美国或美国以外的地方曾犯有、或密谋了一严重的人口走私案？') {
      $('#J_autowritetips').text(_item.ColumnName);
      $('#' + _item.FormId).click();
      if (_item.Value === 'True') {
        $.map(_data.Pages[0].Values, function(_secItem) {
          if (_secItem.ColumnName === '你有没有故意资助，教唆，协助或勾结某个人，而这个人在美国或美国以外的地方曾犯有、或密谋了一严重的人口走私案？说明[英文]') {
            $('#' + _secItem.FormId).val(_secItem.Value);
            $('#J_autowritetips').text(_secItem.ColumnName);
          }
          individualClick = true;
        });

      } else {
        individualClick = true;
      }
    };

    if (_item.ColumnName === '您是一曾在美国或美国以外犯有或密谋人口走私案犯的配偶或儿女吗？您在最近5年里是否从走私活动中获得过好处？') {
      $('#J_autowritetips').text(_item.ColumnName);
      $('#' + _item.FormId).click();
      if (_item.Value === 'True') {
        $.map(_data.Pages[0].Values, function(_secItem) {
          if (_secItem.ColumnName === '您是一曾在美国或美国以外犯有或密谋人口走私案犯的配偶或儿女吗？您在最近5年里是否从走私活动中获得过好处？说明[英文]') {
            $('#' + _secItem.FormId).val(_secItem.Value);
            $('#J_autowritetips').text(_secItem.ColumnName);
          }
          individualClick2 = true;
        });

      } else {
        individualClick2 = true;
      }
    };


  });

  var intervalShowNext = setInterval(function() {
    if (arrestedClick && violatedClick && prostitutionClick && moneyClick && humanClick && individualClick && individualClick2) {
      clearInterval(intervalShowNext);

      // 填写完成,显示下一步按钮
      showNext();
    }
  }, 1000);

}