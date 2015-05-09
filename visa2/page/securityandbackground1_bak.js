/**
 * Description: 第12页自动写入脚本文件
 * Author: jiangfeng<jiang.f@ctrip.com>
 * Date: 2015-03-13 16:17
 *
 */

function SecurityandBackground1_page(_data) {
  var canShowNext = false,
    healthClick = false,
    mentalClick = false,
    addictClick = false;
  // 隐藏下一步按钮
  hideNext();
  $.map(_data.Pages[0].Values, function(_item) {

    if (_item.ColumnName === '您是否患有涉及公共卫生的传染病？（按照美国卫生和公众服务部界定，涉及公共卫生的传染病包括软下疳、淋病、腹股沟肉芽肿、传染性麻风病、性病性淋巴肉芽肿，传染期梅毒，活动性肺结核等。）') {
      $('#J_autowritetips').text(_item.ColumnName);
      $('#' + _item.FormId).click();
      if (_item.Value === 'True') {
        var interval1 = setInterval(function() {
          if ($('#ctl00_SiteContentPlaceHolder_FormView1_tbxDisease').length) {
            clearInterval(interval1);
            $.map(_data.Pages[0].Values, function(_secItem) {
              if (_secItem.ColumnName === '您是否患有涉及公共卫生的传染病？（按照美国卫生和公众服务部界定，涉及公共卫生的传染病包括软下疳、淋病、腹股沟肉芽肿、传染性麻风病、性病性淋巴肉芽肿，传染期梅毒，活动性肺结核等。）说明[英文]') {
                $('#' + _secItem.FormId).val(_secItem.Value);
                $('#J_autowritetips').text(_secItem.ColumnName);
              }
              healthClick = true;
            });
          }
        }, 1000);
      } else {
        healthClick = true;
      }
    };

    if (_item.ColumnName === '您是否患有对其他人的人身安全及利益造成威胁的精神或身体疾病？') {
      var interval2 = setInterval(function() {
        if (healthClick) {
          clearInterval(interval2);
          $('#J_autowritetips').text(_item.ColumnName);
          $('#' + _item.FormId).click();
          if (_item.Value === 'True') {
            var interval3 = setInterval(function() {
              if ($('#ctl00_SiteContentPlaceHolder_FormView1_tbxDisorder').length) {
                clearInterval(interval3);
                $.map(_data.Pages[0].Values, function(_secItem) {
                  if (_secItem.ColumnName === '您是否患有对其他人的人身安全及利益造成威胁的精神或身体疾病？说明[英文]') {
                    $('#' + _secItem.FormId).val(_secItem.Value);
                    $('#J_autowritetips').text(_secItem.ColumnName);
                  }
                  mentalClick = true;
                });
              }
            }, 1000);

          } else {
            mentalClick = true;
          }
        }
      }, 2000);
    };

    if (_item.ColumnName === '您是否或曾经滥用药物并上瘾？') {
      var interval4 = setInterval(function() {
        if (healthClick) {
          clearInterval(interval4);
          $('#J_autowritetips').text(_item.ColumnName);
          $('#' + _item.FormId).click();
          if (_item.Value === 'True') {
            var interval5 = setInterval(function() {
              if ($('#ctl00_SiteContentPlaceHolder_FormView1_tbxDruguser').length) {
                clearInterval(interval5);
                $.map(_data.Pages[0].Values, function(_secItem) {
                  if (_secItem.ColumnName === '您是否或曾经滥用药物并上瘾？说明[英文]') {
                    $('#' + _secItem.FormId).val(_secItem.Value);
                    $('#J_autowritetips').text(_secItem.ColumnName);
                  }
                  addictClick = true;
                });
              }
            }, 1000);

          } else {
            addictClick = true;
          }
        }
      }, 2000);
    }

  });

  var intervalShowNext = setInterval(function() {
    if (addictClick) {
      clearInterval(intervalShowNext);

      // 填写完成,显示下一步按钮
      showNext();
    }
  }, 1000);

}