/**
 * Description: 第七页自动写入脚本文件
 * Author: jiangfeng<jiang.f@ctrip.com>
 * Date: 2015-03-9 09:17
 *
 */
function PreviousUSTravel_Page(_data) {
  var canShowNext = false,
    hasBeenInUS = false,
    hasBeenVisa = false,
    hasBeenVisaRefuse = false,
    immigrant = false;

  // 隐藏下一步按钮
  hideNext();
  $.map(_data.Pages[0].Values, function(_item) {
    var $inputDom = $('#' + _item.FormId);

    if (_item.ColumnName === '您是否曾经在美国停留过？') {
      $('#J_autowritetips').text(_item.ColumnName);
      if (_item.Value === 'True') {
        $inputDom.click();
        var interval1 = setInterval(function() {
          if ($('#ctl00_SiteContentPlaceHolder_FormView1_add1').length) {
            clearInterval(interval1);
            $.map(_data.Pages[0].Values, function(_secItem) {

              if (_secItem.ColumnName === '以往赴美1抵达日期-日' || _secItem.ColumnName === '以往赴美1抵达日期-月') {
                $('#J_autowritetips').text(_secItem.ColumnName);
                $.map($('#' + _secItem.FormId).find('option'), function(_optionItem) {
                  if ($(_optionItem).attr('value') - 0 === _secItem.Value - 0) {
                    $(_optionItem).prop('selected', true);
                  }
                });
              };

              if (_secItem.ColumnName === '以往赴美1抵达日期-年' || _secItem.ColumnName === '以往赴美1时长') {
                $('#J_autowritetips').text(_secItem.ColumnName);
                $('#' + _secItem.FormId).val(_secItem.Value);
              }

              autoSelectValue('以往赴美1停留时间单位', _secItem);

              // 您是否持有或者曾经持有美国驾驶执照？
              if (_secItem.ColumnName === '您是否持有或者曾经持有美国驾驶执照？') {
                $('#J_autowritetips').text(_secItem.ColumnName);
                if (_secItem.Value === 'True') {
                  $('#' + _secItem.FormId).click();

                  var interval1 = setInterval(function() {
                    if ($('#ctl00_SiteContentPlaceHolder_FormView1_dtlUS_DRIVER_LICENSE_ctl00_tbxUS_DRIVER_LICENSE').length) {
                      clearInterval(interval1);

                      $.map(_data.Pages[0].Values, function(_thirdItem) {
                        if (_thirdItem.ColumnName === '驾驶执照的号码') {
                          $('#J_autowritetips').text(_thirdItem.ColumnName);
                          $('#' + _thirdItem.FormId).val(_thirdItem.Value);
                        }

                        autoNotApplyCheckbox('不知道驾驶执照的号码', _thirdItem);

                        autoSelectValue('驾驶执照的州', _thirdItem);
                        hasBeenInUS = true;
                      });
                    }
                  }, 1000);

                } else {
                  $('#' + _secItem.FormId).click();
                  hasBeenInUS = true;
                }
              }


            });
          }
        }, 1000);
      } else {
        $inputDom.click();
        hasBeenInUS = true
      }
    };

    // TODO 这里是护照吧
    var intervalVisa = setInterval(function() {
      if (hasBeenInUS) {
        clearInterval(intervalVisa);
        if (_item.ColumnName === '您是否持有或者曾经持有美国驾照？') {
          $('#J_autowritetips').text(_item.ColumnName);
          if (_item.Value === 'True') {
            $inputDom.click();
            var interval3 = setInterval(function() {
              if ($('#ctl00_SiteContentPlaceHolder_FormView1_tbxPREV_VISA_FOIL_NUMBER').length) {
                clearInterval(interval3);

                $.map(_data.Pages[0].Values, function(_secItem) {
                  if (_secItem.ColumnName === '上一次获得美国签证的日期-日' || _secItem.ColumnName === '上一次获得美国签证的日期-月') {
                    $('#J_autowritetips').text(_secItem.ColumnName);
                    $.map($('#' + _secItem.FormId).find('option'), function(_optionItem) {
                      if ($(_optionItem).attr('value') - 0 === _secItem.Value - 0) {
                        $(_optionItem).prop('selected', true);
                      }
                    });
                  };

                  if (_secItem.ColumnName === '上一次获得美国签证的日期-年' || _secItem.ColumnName === '签证号码') {
                    $('#J_autowritetips').text(_secItem.ColumnName);
                    $('#' + _secItem.FormId).val(_secItem.Value);
                  }

                  autoNotApplyCheckbox('签证号码（未知）', _secItem);

                  if (_secItem.ColumnName === '您此次是否申请同类签证' || _secItem.ColumnName === '您现在申请签证的所在国家或地点同于您上个签证颁发所在国或地点吗? 此国家或地点是您主要居住地吗?' || _secItem.ColumnName === '您是否留取过十指指纹？') {
                    $('#J_autowritetips').text(_secItem.ColumnName);
                    $('#' + _secItem.FormId).click();
                  }

                  var hasLost = false;
                  if (_secItem.ColumnName === '您的美国签证是否曾经遗失或者被盗？') {
                    $('#J_autowritetips').text(_secItem.ColumnName);
                    $('#' + _secItem.FormId).click();
                    if (_secItem.Value === 'True') {
                      var interval4 = setInterval(function() {
                        if ($('#ctl00_SiteContentPlaceHolder_FormView1_tbxPREV_VISA_LOST_YEAR').length) {
                          clearInterval(interval4);
                          $.map(_data.Pages[0].Values, function(_thrdItem) {
                            if (_thrdItem.ColumnName === '输入您签证遗失或被盗窃的年份' || _thrdItem.ColumnName === '签证遗失解释[英文]') {
                              $('#J_autowritetips').text(_thrdItem.ColumnName);
                              $('#' + _thrdItem.FormId).val(_thrdItem.Value);
                              hasLost = true;
                            }
                          });
                        }
                      }, 1000);
                    } else {
                      hasLost = true;
                    }
                  };

                  var intervalrevoke = setInterval(function() {
                    if (hasLost) {
                      clearInterval(intervalrevoke);
                      $.map(_data.Pages[0].Values, function(_thirdItem) {
                        if (_thirdItem.ColumnName === '您的美国签证是否曾经被注销或撤销过？') {
                          $('#J_autowritetips').text(_thirdItem.ColumnName);
                          $('#' + _thirdItem.FormId).click();
                          if (_thirdItem.Value === 'True') {
                            var interval5 = setInterval(function() {
                              if ($('#ctl00_SiteContentPlaceHolder_FormView1_tbxPREV_VISA_CANCELLED_EXPL').length) {
                                clearInterval(interval5);
                                $.map(_data.Pages[0].Values, function(_forthItem) {
                                  if (_forthItem.ColumnName === '注销或撤销解释[英文]') {
                                    $('#J_autowritetips').text(_forthItem.ColumnName);
                                    $('#' + _forthItem.FormId).val(_forthItem.Value);
                                    hasBeenVisa = true
                                  }
                                });
                              }
                            }, 1000);

                          } else {
                            hasBeenVisa = true
                          }
                        }
                      })

                    }
                  }, 2000);

                });
              }
            }, 1000);
          } else {
            $inputDom.click();
            hasBeenVisa = true
          }
        };
      }
    }, 2000);


    var intervalrefuse = setInterval(function() {
      if (hasBeenVisa) {
        clearInterval(intervalrefuse);
        // 您被拒签过吗？ 或在入境口岸被拒入境， 或被撤销入境申请？
        if (_item.ColumnName === '您被拒签过吗？ 或在入境口岸被拒入境，或被撤销入境申请？') {
          $('#J_autowritetips').text(_item.ColumnName);
          $inputDom.click();
          if (_item.Value === 'True') {
            var interval6 = setInterval(function() {
              if ($('#ctl00_SiteContentPlaceHolder_FormView1_tbxPREV_VISA_REFUSED_EXPL').length) {
                clearInterval(interval6);
                $.map(_data.Pages[0].Values, function(_secItem) {
                  // TODO 这里id好像有错误
                  if (_secItem.ColumnName === '拒签或撤销入境的解释[英文]') {
                    $('#J_autowritetips').text(_secItem.ColumnName);
                    $('#' + _secItem.FormId).val(_secItem.Value);
                    hasBeenVisaRefuse = true
                  }
                });
              }
            }, 1000);
          } else {
            hasBeenVisaRefuse = true
          }
        };
      };
    }, 2000);

    var intervalImmi = setInterval(function() {
      if (hasBeenVisaRefuse) {
        clearInterval(intervalImmi);
        // 曾有人在公民及移民服务局为您申请过移民吗？
        if (_item.ColumnName === '曾有人在公民及移民服务局为您申请过移民吗？') {
          $('#J_autowritetips').text(_item.ColumnName);
          $inputDom.click();
          if (_item.Value === 'True') {
            var interval7 = setInterval(function() {
              if ($('#ctl00_SiteContentPlaceHolder_FormView1_tbxIV_PETITION_EXPL').length) {
                clearInterval(interval7);
                $.map(_data.Pages[0].Values, function(_secItem) {
                  // TODO 这里id好像也有错误
                  if (_secItem.ColumnName === '曾有人在公民及移民服务局为您申请过移民吗解释[英文]') {
                    $('#J_autowritetips').text(_secItem.ColumnName);
                    $('#' + _secItem.FormId).val(_secItem.Value);
                    immigrant = true
                  }
                });
              }
            }, 1000);
          } else {
            immigrant = true
          }
        };
      }
    }, 2000)



  });


  var intervalShowNext = setInterval(function() {
    if (immigrant) {
      clearInterval(intervalShowNext);

      // 填写完成,显示下一步按钮
      showNext();
    }
  }, 1000);
}