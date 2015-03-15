/**
 * Description: 第11页自动写入脚本文件
 * Author: jiangfeng<jiang.f@ctrip.com>
 * Date: 2015-03-13 16:17
 *
 */

function WorkEducation3_page(_data) {
  var canShowNext = false,
    clanClick = false,
    clicktravelOtherCountry = false,
    professionalClick = false,
    skillClick = false,
    militaryClick = false,
    servedClick = false;
  // 隐藏下一步按钮
  hideNext();
  $.map(_data.Pages[0].Values, function(_item) {

    if (_item.ColumnName === '语言名字[英文]') {
      $('#' + _item.FormId).val(_item.Value);
      $('#J_autowritetips').text(_item.ColumnName);
    }

    if (_item.ColumnName === '您是否属于一个宗族或者部落？') {
      $('#J_autowritetips').text(_item.ColumnName);
      $('#' + _item.FormId).click();
      if (_item.Value === 'True') {
        var interval1 = setInterval(function() {
          if ($('#ctl00_SiteContentPlaceHolder_FormView1_tbxCLAN_TRIBE_NAME').length) {
            clearInterval(interval1);
            $.map(_data.Pages[0].Values, function(_secItem) {
              if (_secItem.ColumnName === '宗族或者部落名称[英文]') {
                $('#' + _secItem.FormId).val(_secItem.Value);
                $('#J_autowritetips').text(_secItem.ColumnName);
                clanClick = true;
              }
            });
          }
        }, 1000);
      } else {
        clanClick = true;
      }
    };

    if (_item.ColumnName === '最近五年里您是否去过其他国家？') {
      var interval2 = setInterval(function() {
        if (clanClick) {
          clearInterval(interval2);
          $('#J_autowritetips').text(_item.ColumnName);
          $('#' + _item.FormId).click();
          if (_item.Value === 'True') {
            var interval3 = setInterval(function() {
              if ($('#ctl00_SiteContentPlaceHolder_FormView1_dtlCountriesVisited_ctl00_ddlCOUNTRIES_VISITED').length) {
                clearInterval(interval3);
                $.map(_data.Pages[0].Values, function(_secItem) {
                  autoSelectValue('请列出您访问过的国家[英文]', _secItem);
                  clicktravelOtherCountry = true;

                });
              }
            }, 1000);
          } else {
            clicktravelOtherCountry = true;
          }
        }
      }, 2000);
    };

    if (_item.ColumnName === '您是否从属于任何一个专业的、社会或慈善组织？并为其做过贡献、或为其工作过？') {
      var interval4 = setInterval(function() {
        if (clicktravelOtherCountry) {
          clearInterval(interval4);
          $('#J_autowritetips').text(_item.ColumnName);
          $('#' + _item.FormId).click();
          if (_item.Value === 'True') {
            var interval5 = setInterval(function() {
              if ($('#ctl00_SiteContentPlaceHolder_FormView1_dtlORGANIZATIONS_ctl00_tbxORGANIZATION_NAME').length) {
                clearInterval(interval5);
                $.map(_data.Pages[0].Values, function(_secItem) {
                  if (_secItem.ColumnName === '机构名称[英文]') {
                    $('#' + _secItem.FormId).val(_secItem.Value);
                    $('#J_autowritetips').text(_secItem.ColumnName);
                    professionalClick = true;
                  }
                });
              }
            }, 1000);
          } else {
            professionalClick = true;
          }
        }
      }, 2000);
    };

    if (_item.ColumnName === '您是否具有特殊技能或接受过特殊培训，例如有关枪械、炸药、 核装置、 生物或化学方面的经验？') {
      var interval6 = setInterval(function() {
        if (professionalClick) {
          clearInterval(interval6);
          $('#J_autowritetips').text(_item.ColumnName);
          $('#' + _item.FormId).click();
          if (_item.Value === 'True') {
            var interval7 = setInterval(function() {
              if ($('#ctl00_SiteContentPlaceHolder_FormView1_dtlORGANIZATIONS_ctl00_tbxORGANIZATION_NAME').length) {
                clearInterval(interval7);
                $.map(_data.Pages[0].Values, function(_secItem) {
                  if (_secItem.ColumnName === '您是否具有特殊技能或接受过特殊培训，例如有关枪械、炸药、 核装置、 生物或化学方面的经验？说明[英文]') {
                    $('#' + _secItem.FormId).val(_secItem.Value);
                    $('#J_autowritetips').text(_secItem.ColumnName);
                    professionalClick = true;
                  }
                  skillClick = true;
                });
              }
            }, 1000);
          } else {
            skillClick = true
          }
        }
      }, 2000)
    };

    if (_item.ColumnName === '您是否曾经在军队服役？') {
      var interval8 = setInterval(function() {
        if (skillClick) {
          clearInterval(interval8);
          $('#J_autowritetips').text(_item.ColumnName);
          $('#' + _item.FormId).click();
          if (_item.Value === 'True') {
            var interval9 = setInterval(function() {
              if ($('#ctl00_SiteContentPlaceHolder_FormView1_dtlMILITARY_SERVICE_ctl00_ddlMILITARY_SVC_CNTRY').length) {
                clearInterval(interval9);
                $.map(_data.Pages[0].Values, function(_secItem) {
                  if (_secItem.ColumnName === '服役军种[英文]' || _secItem.ColumnName === '服役级别/职位[英文]' || _secItem.ColumnName === '服役军事特长[英文]' || _secItem.ColumnName === '服役开始日期-年' || _secItem.ColumnName === '服役结束日期-年') {
                    $('#' + _secItem.FormId).val(_secItem.Value);
                    $('#J_autowritetips').text(_secItem.ColumnName);
                  }
                  if (_secItem.ColumnName === '服役开始日期-日' || _secItem.ColumnName === '服役开始日期-月' || _secItem.ColumnName === '服役结束日期-日' || _secItem.ColumnName === '服役结束日期-月') {
                    $('#J_autowritetips').text(_secItem.ColumnName);
                    $.map($('#' + _secItem.FormId).find('option'), function(_optionItem) {
                      if ($(_optionItem).attr('value') - 0 === _secItem.Value - 0) {
                        $(_optionItem).prop('selected', true);
                      }
                    });
                  };
                  autoSelectValue('服役国家/地区名称[英文]', _secItem);
                  militaryClick = true;
                });
              }
            }, 1000);
          } else {
            militaryClick = true
          }
        }
      }, 2000);
    };

    if (_item.ColumnName === '你是否曾经服务于或参与过准军事性单位、治安团体、造反组织、游击队或暴动组织，或曾经是其成员之一？') {
      var interval10 = setInterval(function() {
        if (militaryClick) {
          clearInterval(interval10);
          $('#J_autowritetips').text(_item.ColumnName);
          $('#' + _item.FormId).click();
          if (_item.Value === 'True') {
            var interval11 = setInterval(function() {
              if ($('#ctl00_SiteContentPlaceHolder_FormView1_dtlORGANIZATIONS_ctl00_tbxORGANIZATION_NAME').length) {
                clearInterval(interval11);
                $.map(_data.Pages[0].Values, function(_secItem) {
                  if (_secItem.ColumnName === '你是否曾经服务于或参与过准军事性单位、治安团体、造反组织、游击队或暴动组织，或曾经是其成员之一？说明[英文]') {
                    $('#' + _secItem.FormId).val(_secItem.Value);
                    $('#J_autowritetips').text(_secItem.ColumnName);
                  }
                  servedClick = true;
                });
              }
            }, 1000);
          } else {
            servedClick = true
          }
        }
      }, 2000);
    }

  });

  var intervalShowNext = setInterval(function() {
    if (servedClick) {
      clearInterval(intervalShowNext);

      // 填写完成,显示下一步按钮
      showNext();
    }
  }, 1000);

}