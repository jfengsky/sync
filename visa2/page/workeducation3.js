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
    servedClick = false,
    language21 = false,
    language22 = false,
    language23 = false,
    language24 = false,

    visitCountry2 = false,
    visitCountry3 = false,
    visitCountry4 = false,
    visitCountry5 = false,
    visitCountry6 = false,

    isAllDown = false;
  // 隐藏下一步按钮
  hideNext();
  $.map(_data.Pages[0].Values, function(_item) {

    // if (_item.ColumnName === '语言名字[英文]') {
    //   $('#' + _item.FormId).val(_item.Value);
    //   $('#J_autowritetips').text(_item.ColumnName);
    // }

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
                setTimeout(function(){
                  clanClick = true;
                }, 2000);
              }
            });
          }
        }, 1000);
      } else {
        setTimeout(function(){
          clanClick = true;
        }, 2000);
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
                  setTimeout(function(){
                    clicktravelOtherCountry = true;
                  },2000);

                });
              }
            }, 1000);
          } else {
            setTimeout(function(){
              clicktravelOtherCountry = true;
            },2000);
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
                    setTimeout(function(){
                      professionalClick = true;
                    },2000);
                  }
                });
              }
            }, 1000);
          } else {
            setTimeout(function(){
              professionalClick = true;
            },2000);
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
              if ($('#ctl00_SiteContentPlaceHolder_FormView1_tbxSPECIALIZED_SKILLS_EXPL').length) {
                clearInterval(interval7);
                $.map(_data.Pages[0].Values, function(_secItem) {
                  if (_secItem.ColumnName === '您是否具有特殊技能或接受过特殊培训，例如有关枪械、炸药、 核装置、 生物或化学方面的经验？说明[英文]') {
                    $('#' + _secItem.FormId).val(_secItem.Value);
                    $('#J_autowritetips').text(_secItem.ColumnName);
                  }
                  setTimeout(function(){
                    skillClick = true;
                  }, 2000);
                });
              }
            }, 1000);
          } else {
            setTimeout(function(){
              skillClick = true;
            }, 2000);
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
                  setTimeout(function(){
                    militaryClick = true;
                  }, 2000);
                });
              }
            }, 1000);
          } else {
            setTimeout(function(){
              militaryClick = true;
            }, 2000);
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
              if ($('#ctl00_SiteContentPlaceHolder_FormView1_tbxINSURGENT_ORG_EXPL').length) {
                clearInterval(interval11);
                $.map(_data.Pages[0].Values, function(_secItem) {
                  if (_secItem.ColumnName === '你是否曾经服务于或参与过准军事性单位、治安团体、造反组织、游击队或暴动组织，或曾经是其成员之一？说明[英文]') {
                    $('#' + _secItem.FormId).val(_secItem.Value);
                    $('#J_autowritetips').text(_secItem.ColumnName);
                  }
                  setTimeout(function(){
                    servedClick = true;
                  }, 2000);
                });
              }
            }, 1000);
          } else {
            setTimeout(function(){
              servedClick = true;
            }, 2000);
          }
        }
      }, 2000);
    }

  });

  var interval200 = setInterval(function() {
    if (clanClick && clicktravelOtherCountry && professionalClick && skillClick && militaryClick && servedClick) {
      clearInterval(interval200);
      // 循环添加语言 首先判断2, 3, 4 ,5
      $.map(_data.Pages[0].Values, function(_languageItem) {
        if (_languageItem.ColumnName === '语言2名字[英文]') {
          if (_languageItem.Value) {
            clickEvent('#ctl00_SiteContentPlaceHolder_FormView1_dtlLANGUAGES_ctl00_InsertButtonLANGUAGE');
            var interval21 = setInterval(function() {
              $('#J_autowritetips').text('正在添加语言2隐藏表单');
              if ($('#ctl00_SiteContentPlaceHolder_FormView1_dtlLANGUAGES_ctl01_tbxLANGUAGE_NAME').length) {
                clearInterval(interval21);
                language21 = true
              }
            }, 1000);
          } else {
            language21 = true
          }
        };

        if (_languageItem.ColumnName === '语言3名字[英文]') {
          var interval22 = setInterval(function() {
            if (language21) {
              clearInterval(interval22);
              if (_languageItem.Value) {
                clickEvent('#ctl00_SiteContentPlaceHolder_FormView1_dtlLANGUAGES_ctl00_InsertButtonLANGUAGE');
                var interval23 = setInterval(function() {
                  if ($('#ctl00_SiteContentPlaceHolder_FormView1_dtlLANGUAGES_ctl02_tbxLANGUAGE_NAME').length) {
                    $('#J_autowritetips').text('正在添加语言3隐藏表单');
                    clearInterval(interval23);
                    language22 = true
                  }
                }, 1000);
              } else {
                language22 = true
              }

            }
          }, 1000);
        };

        if (_languageItem.ColumnName === '语言4名字[英文]') {

          var interval24 = setInterval(function() {
            if (language22) {
              clearInterval(interval24);
              if (_languageItem.Value) {
                clickEvent('#ctl00_SiteContentPlaceHolder_FormView1_dtlLANGUAGES_ctl00_InsertButtonLANGUAGE');
                var interval25 = setInterval(function() {
                  if ($('#ctl00_SiteContentPlaceHolder_FormView1_dtlLANGUAGES_ctl03_tbxLANGUAGE_NAME').length) {
                    $('#J_autowritetips').text('正在添加语言4隐藏表单');
                    clearInterval(interval25);
                    language23 = true
                  }
                }, 1000);
              } else {
                language23 = true
              }
            }
          }, 1000);


        }

        if (_languageItem.ColumnName === '语言5名字[英文]') {

          var interval26 = setInterval(function() {
            if (language23) {
              clearInterval(interval26);
              if (_languageItem.Value) {
                clickEvent('#ctl00_SiteContentPlaceHolder_FormView1_dtlLANGUAGES_ctl00_InsertButtonLANGUAGE');
                var interval27 = setInterval(function() {
                  if ($('#ctl00_SiteContentPlaceHolder_FormView1_dtlLANGUAGES_ctl04_tbxLANGUAGE_NAME').length) {
                    $('#J_autowritetips').text('正在添加语言5隐藏表单');
                    clearInterval(interval27);
                    language24 = true
                  }
                }, 1000);
              } else {
                language24 = true
              }
            }
          }, 1000);


        };

        var interval28 = setInterval(function() {
          if (language24) {
            clearInterval(interval28);
            $.map(_data.Pages[0].Values, function(_languageWriteItem) {
              if (_languageWriteItem.ColumnName === '语言名字[英文]' || _languageWriteItem.ColumnName === '语言2名字[英文]' || _languageWriteItem.ColumnName === '语言3名字[英文]' || _languageWriteItem.ColumnName === '语言4名字[英文]' || _languageWriteItem.ColumnName === '语言5名字[英文]') {
                setVal(_languageWriteItem);
                visitCountry2 = true
              }
            });
          }
        }, 1000);

      })

    }
  }, 1000);



  // 请列出您访问过的国家[英文]
  var interval300 = setInterval(function() {
    if (visitCountry2) {
      clearInterval(interval300);
      $('#J_autowritetips').text('添加您访问过的国家');
      $.map(_data.Pages[0].Values, function(_CountryItem) {
        if (_CountryItem.ColumnName === '请列出您访问过的国家2[英文]') {
          if (_CountryItem.Value) {
            clickEvent('#ctl00_SiteContentPlaceHolder_FormView1_dtlCountriesVisited_ctl00_InsertButtonCountriesVisited');
            $('#J_autowritetips').text('添加您访问过的国家2[英文]隐藏表单');
            var interval71 = setInterval(function() {
              if ($('#ctl00_SiteContentPlaceHolder_FormView1_dtlCountriesVisited_ctl01_ddlCOUNTRIES_VISITED').length) {
                clearInterval(interval71);
                visitCountry3 = true
              }
            }, 1000);
          } else {
            visitCountry3 = true
          }
        };

        if (_CountryItem.ColumnName === '请列出您访问过的国家3[英文]') {

          var interval72 = setInterval(function() {
            if (visitCountry3) {
              clearInterval(interval72);
              if (_CountryItem.Value) {
                clickEvent('#ctl00_SiteContentPlaceHolder_FormView1_dtlCountriesVisited_ctl01_InsertButtonCountriesVisited');
                $('#J_autowritetips').text('添加您访问过的国家3[英文]隐藏表单');
                var interval721 = setInterval(function() {
                  if ($('#ctl00_SiteContentPlaceHolder_FormView1_dtlCountriesVisited_ctl02_ddlCOUNTRIES_VISITED').length) {
                    clearInterval(interval721);
                    visitCountry4 = true
                  }
                }, 1000);
              } else {
                visitCountry4 = true
              }
            }
          });

        };

        if (_CountryItem.ColumnName === '请列出您访问过的国家4[英文]') {

          var interval73 = setInterval(function() {
            if (visitCountry4) {
              clearInterval(interval73);
              if (_CountryItem.Value) {
                clickEvent('#ctl00_SiteContentPlaceHolder_FormView1_dtlCountriesVisited_ctl02_InsertButtonCountriesVisited');
                $('#J_autowritetips').text('添加您访问过的国家4[英文]隐藏表单');
                var interval731 = setInterval(function() {
                  if ($('#ctl00_SiteContentPlaceHolder_FormView1_dtlCountriesVisited_ctl03_ddlCOUNTRIES_VISITED').length) {
                    clearInterval(interval731);
                    visitCountry5 = true
                  }
                }, 1000);
              } else {
                visitCountry5 = true
              }
            }
          }, 1000);

        };

        if (_CountryItem.ColumnName === '请列出您访问过的国家5[英文]') {

          var interval74 = setInterval(function() {
            if (visitCountry5) {
              clearInterval(interval74);
              if (_CountryItem.Value) {
                clickEvent('#ctl00_SiteContentPlaceHolder_FormView1_dtlCountriesVisited_ctl03_InsertButtonCountriesVisited');
                $('#J_autowritetips').text('添加您访问过的国家5[英文]隐藏表单');
                var interval741 = setInterval(function() {
                  if ($('#ctl00_SiteContentPlaceHolder_FormView1_dtlCountriesVisited_ctl04_ddlCOUNTRIES_VISITED').length) {
                    clearInterval(interval741);
                    visitCountry6 = true
                  }
                }, 1000);
              } else {
                visitCountry6 = true
              }
            }
          }, 1000);

        };

      });
    }
  }, 1000);

  var interval8 = setInterval(function() {
    if (visitCountry6) {
      clearInterval(interval8);
      $.map(_data.Pages[0].Values, function(_item) {
        if (_item.ColumnName === '请列出您访问过的国家2[英文]' || _item.ColumnName === '请列出您访问过的国家3[英文]' || _item.ColumnName === '请列出您访问过的国家4[英文]' || _item.ColumnName === '请列出您访问过的国家5[英文]') {
          autoSelectValue(_item.ColumnName, _item);
        }
        isAllDown = true;
      });
    }
  }, 2000)



  var intervalShowNext = setInterval(function() {
    if (isAllDown) {
      clearInterval(intervalShowNext);
      // 填写完成,显示下一步按钮
      showNext();
    }
  }, 1000);


}