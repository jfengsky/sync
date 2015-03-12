/**
 * Description: 第五页自动写入脚本文件
 * Author: jiangfeng<jiang.f@ctrip.com>
 * Date: 2015-03-3 17:42
 *
 */

function Travel_Page(_data) {

  var purposeHasSel = false,
    planHasSel = false;
    hasPay = false;

  // 隐藏下一步按钮
  hideNext();

  $.map(_data.Pages[0].Values, function(_item) {

    var $inputDom = $('#' + _item.FormId),
      tagName,
      tagType;

    if ($inputDom.length) {
      tagName = $inputDom.get(0).tagName;
      tagType = $inputDom.attr('type');

      // 判断表单类型, input 表单和 select表单
      if (tagName === 'INPUT') {

        if (tagType === 'text') {
          writeStep(tagType, _item.ColumnName);

          // text类型的表单直接写入值
          $inputDom.val(_item.Value);
        } else if (tagType === 'radio') {

          // 您是否已经制定了具体的旅行计划？
          if (_item.ColumnName === '您是否已经制定了具体的旅行计划？') {
            $('#J_autowritetips').text('选择您是否已经制定了具体的旅行计划？');
            var planInterval = setInterval(function() {
              if (purposeHasSel) {
                clearInterval(planInterval);
                $('#' + _item.FormId).click();
              }
            }, 1000);
            if (_item.Value === 'True') {
              var intervalPlanSel = setInterval(function() {
                  if ($('#ctl00_SiteContentPlaceHolder_FormView1_specifictravel').length) {
                    clearInterval(intervalPlanSel);
                    $.map(_data.Pages[0].Values, function(__item) {

                      var $inputDomSec = $('#' + __item.FormId),
                        tagNameSec,
                        tagTypeSec;
                      if ($inputDomSec.length) {
                        tagNameSec = $inputDomSec.get(0).tagName;
                        tagTypeSec = $inputDomSec.attr('type');
                        if (tagNameSec === 'INPUT') {
                          if (tagTypeSec === 'text') {
                            writeStep(tagTypeSec, __item.ColumnName);
                            $inputDomSec.val(__item.Value);
                          } else if (tagTypeSec === 'radio') {

                          } else if (tagNameSec === 'checkbox') {

                          }
                        } else if (tagNameSec === 'SELECT') {
                          // 到达美国日期-日 || 到达美国日期-月 || 离开美国日期-日 || 离开美国日期-月
                          if (__item.ColumnName === '到达美国日期-日' || __item.ColumnName === '到达美国日期-月' || __item.ColumnName === '离开美国日期-日' || __item.ColumnName === '离开美国日期-月') {
                            $('#J_autowritetips').text(__item.ColumnName);
                            $.map($('#' + __item.FormId).find('option'), function(_optionItem) {
                              if ($(_optionItem).attr('value') - 0 === __item.Value - 0) {
                                $(_optionItem).prop('selected', true);
                              }
                            });
                          };

                          autoSelectValue('在美停留期间的住址-州[英文]', __item);

                          planHasSel = true;
                          if (__item.ColumnName === '支付您旅行费用的个人或组织名称') {
                            writeStep(tagTypeSec, __item.ColumnName);
                            if (__item.Value === "O") {
                              $.map($('#' + __item.FormId).find('option'), function(__optionItem) {
                                if ($(__optionItem).attr('value') === __item.Value) {
                                  // js去触发select的change事件
                                  var ev = document.createEvent("HTMLEvents");
                                  $(__optionItem).prop('selected', true);
                                  ev.initEvent("change", false, true);
                                  $('#' + __item.FormId).get(0).dispatchEvent(ev);
                                }
                              });
                              var intervalPaying = setInterval(function() {
                                if ($('#ctl00_SiteContentPlaceHolder_FormView1_tbxPayerSurname').length) {
                                  clearInterval(intervalPaying);
                                  $.map(_data.Pages[0].Values, function(_thirdItem) {
                                    if (_thirdItem.ColumnName === '承担您旅行费用者的姓氏[英文]' || _thirdItem.ColumnName === '承担您旅行费用者的名字[英文]' || _thirdItem.ColumnName === '承担您旅行费用者的电话号码' || _thirdItem.ColumnName === '承担您旅行费用者的电子邮件地址') {
                                      $('#' + _thirdItem.FormId).val(_thirdItem.Value);
                                      $('#J_autowritetips').text(_thirdItem.ColumnName);
                                    }

                                    // TODO Does Not Ayyly 问题
                                    // autoNotApplyCheckbox('承担您旅行费用者与您关系[英文]', _item);

                                    if (_thirdItem.ColumnName === '承担您旅行费用者与您关系[英文]') {
                                      autoSelectValue('承担您旅行费用者与您关系[英文]', _thirdItem);
                                    }

                                    if (_thirdItem.ColumnName === '承担您旅行费用者地址是否与您家庭或右击地址相同') {
                                      $('#' + _thirdItem.FormId).click()
                                      if (_thirdItem.Value === 'False') {
                                        writeStep('loading', _thirdItem);
                                        var intervalSame = setInterval(function() {
                                          if ($('#ctl00_SiteContentPlaceHolder_FormView1_tbxPayerStreetAddress1').length) {
                                            clearInterval(intervalSame);
                                            $.map(_data.Pages[0].Values, function(_forthItem) {
                                              if (_forthItem.ColumnName === '承担您旅行费用者街道地址（第一行）[英文]' || _forthItem.ColumnName === '承担您旅行费用者街道地址（第二行）[英文]' || _forthItem.ColumnName === '承担您旅行费用城市[英文]' || _forthItem.ColumnName === '承担您旅行费用州/省份[英文]' || _forthItem.ColumnName === '承担您旅行费用邮政编码') {
                                                $('#' + _forthItem.FormId).val(_forthItem.Value);
                                                $('#J_autowritetips').text(_forthItem.ColumnName);
                                              };

                                              autoNotApplyCheckbox('承担您旅行费用州/省份不适用的', _forthItem);

                                              autoNotApplyCheckbox('承担您旅行费用邮政编码不适用的', _forthItem);

                                              autoSelectValue('承担您旅行费用国家[英文]', _forthItem);

                                              hasPay = true;

                                            });
                                          }
                                        }, 1000);
                                      }
                                    }

                                  });
                                }
                              }, 1000);
                            } else if (__item.Value === "C") {
                              $.map($('#' + __item.FormId).find('option'), function(__optionItem) {
                                if ($(__optionItem).attr('value') === __item.Value) {
                                  // js去触发select的change事件
                                  var ev = document.createEvent("HTMLEvents");
                                  $(__optionItem).prop('selected', true);
                                  ev.initEvent("change", false, true);
                                  $('#' + __item.FormId).get(0).dispatchEvent(ev);
                                }
                              });
                              var intervalPayingC = setInterval(function() {
                                if ($('#ctl00_SiteContentPlaceHolder_FormView1_tbxPayingCompany').length) {
                                  clearInterval(intervalPayingC);
                                  $.map(_data.Pages[0].Values, function(_thirdItem) {
                                    if (_thirdItem.ColumnName === '承担您旅行费用的公司或组织名称[英文]' || _thirdItem.ColumnName === '承担您旅行费用的公司或组织名称电话号码' || _thirdItem.ColumnName === '承担您旅行费用的公司或组织名称与您的关系[英文]' || _thirdItem.ColumnName === '承担您旅行费用的公司或组织名称街道地址（第一行）[英文]' || _thirdItem.ColumnName === '承担您旅行费用的公司或组织名称街道地址（第二行）[英文]' || _thirdItem.ColumnName === '承担您旅行费用的公司或组织名称城市[英文]' || _thirdItem.ColumnName === '承担您旅行费用的公司或组织名称州/省份[英文]' || _thirdItem.ColumnName === '承担您旅行费用的公司或组织名称邮政编码') {
                                      $('#' + _thirdItem.FormId).val(_thirdItem.Value);
                                      $('#J_autowritetips').text(_thirdItem.ColumnName);
                                    }
                                    autoNotApplyCheckbox('承担您旅行费用的公司或组织名称州/省份不适用的', _thirdItem);

                                    autoNotApplyCheckbox('承担您旅行费用的公司或组织名称邮政编码不适用的', _thirdItem);

                                    autoSelectValue('承担您旅行费用的公司或组织名称国家[英文]', _thirdItem);

                                    hasPay = true;

                                  });
                                }
                              }, 1000);

                            } else {
                              // 自己付钱
                              hasPay = true;
                            }


                          }
                        }

                      } else {
                        // console.log(__item.ColumnName + 'id没找到');
                      }



                    });

                  };
                },
                1000);
            } else {
              planHasSel = true
            }
          } else {
            writeStep(tagType, _item.ColumnName);
            // radio类型的选中
            $inputDom.click();
          };

        } else if (tagType === 'checkbox') {
          writeStep(tagType, _item.ColumnName);
        }

      } else if (tagName === 'SELECT') {
        // 赴美访问目的
        if (_item.ColumnName === '赴美访问目的') {
          $('#J_autowritetips').text('赴美访问目的有异步操作,请稍后...');
          $.map($('#' + _item.FormId).find('option'), function(__optionItem) {
            if ($(__optionItem).attr('value') === _item.Value) {
              // js去触发select的change事件
              var ev = document.createEvent("HTMLEvents");
              $(__optionItem).prop('selected', true);
              ev.initEvent("change", false, true);
              $('#' + _item.FormId).get(0).dispatchEvent(ev);
            }
          });
          var intervalPurpose = setInterval(function() {
            if ($('#ctl00_SiteContentPlaceHolder_FormView1_dlPrincipalAppTravel_ctl00_ddlOtherPurpose').length) {
              clearInterval(intervalPurpose);
              $('#J_autowritetips').text('选择赴美访问目的具体说明');
              $.map(_data.Pages[0].Values, function(__item) {
                autoSelectValue('赴美访问目的具体说明', __item);
                purposeHasSel = true;
              })
            }
          }, 1000);
        };

      }
    } else {
      // console.log(_item.ColumnName + 'id没找到');
    }


  });

  // 填写完成,显示下一步按钮
  var intervalShowNext = setInterval(function() {
    if (purposeHasSel && planHasSel && hasPay) {
      clearInterval(intervalShowNext);

      // 填写完成,显示下一步按钮
      showNext();
    }
  }, 1000);
}