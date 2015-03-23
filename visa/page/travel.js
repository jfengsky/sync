/**
 * Description: 第五页自动写入脚本文件
 * Author: jiangfeng<jiang.f@ctrip.com>
 * Date: 2015-03-3 17:42
 *
 */

function Travel_Page(_data) {

  var purposeHasSel = false,
    hasTravelPlanFinish = false,
    tripPayFinish = false;

  // 隐藏下一步按钮
  hideNext();

  $.map(_data.Pages[0].Values, function(_item) {

    if (_item.ColumnName === '赴美访问目的') {
      setSelectChange(_item);
      var interval1 = setInterval(function() {
        tip(_item, 2);
        if ($('#ctl00_SiteContentPlaceHolder_FormView1_dlPrincipalAppTravel_ctl00_ddlOtherPurpose').length) {
          clearInterval(interval1);
          $.map(_data.Pages[0].Values, function(__item) {
            autoSelectValue('赴美访问目的具体说明', __item);
            purposeHasSel = true;
          })
        }
      }, 1000);
    };

    if (_item.ColumnName === '您是否已经制定了具体的旅行计划？') {
      var interval2 = setInterval(function() {
        if (purposeHasSel) {
          clearInterval(interval2);
          tip(_item, 2);
          $('#' + _item.FormId).click();
          if (_item.Value === 'True') {
            var interval21 = setInterval(function() {
              if ($('#ctl00_SiteContentPlaceHolder_FormView1_tbxARRIVAL_US_DTEYear').length) {
                clearInterval(interval21);
                $.map(_data.Pages[0].Values, function(_secItem) {
                  if (_secItem.ColumnName === '到达美国日期-年' || _secItem.ColumnName === '到达航班' || _secItem.ColumnName === '抵达城市[英文]' || _secItem.ColumnName === '离开美国日期-年' || _secItem.ColumnName === '离开航班' || _secItem.ColumnName === '离美城市[英文]' || _secItem.ColumnName === '请提供您在美期间计划访问的地点名称[英文]' || _secItem.ColumnName === '在美停留期间的住址-街道地址（第一行）[英文]' || _secItem.ColumnName === '在美停留期间的住址-街道地址（第二行）[英文]' || _secItem.ColumnName === '在美停留期间的住址-城市[英文]' || _secItem.ColumnName === '在美停留期间的住址-邮政编码') {
                    setVal(_secItem);
                  };

                  setSelect('到达美国日期-日', _secItem, 'number');
                  setSelect('到达美国日期-月', _secItem, 'number');
                  setSelect('离开美国日期-日', _secItem, 'number');
                  setSelect('离开美国日期-月', _secItem, 'number');
                  setSelect('在美停留期间的住址-州[英文]', _secItem);

                  hasTravelPlanFinish = true;
                });
              }
            }, 1000);
          } else {
            var interval22 = setInterval(function() {
              if ($('#ctl00_SiteContentPlaceHolder_FormView1_ddlTRAVEL_DTEDay').length) {
                clearInterval(interval22);
                $.map(_data.Pages[0].Values, function(_secItem) {
                  if (_secItem.ColumnName === '计划到达日期-年' || _secItem.ColumnName === '计划在美停留时间-数字') {
                    setVal(_secItem);
                  };
                  setSelect('计划到达日期-日', _secItem, 'number');
                  setSelect('计划到达日期-月', _secItem, 'number');

                  if (_secItem.ColumnName === '计划在美停留时间-单位') {
                    setSelectChange(_secItem);
                    var interval23 = setInterval(function() {
                      tip(_secItem, 2);
                      if ($('#ctl00_SiteContentPlaceHolder_FormView1_tbxStreetAddress1').length) {
                        clearInterval(interval23);
                        $.map(_data.Pages[0].Values, function(_thirdItem) {
                          if (_thirdItem.ColumnName === '在美停留期间的住址-街道地址（第一行）[英文]' || _thirdItem.ColumnName === '在美停留期间的住址-街道地址（第二行）[英文]' || _thirdItem.ColumnName === '在美停留期间的住址-城市[英文]' || _thirdItem.ColumnName === '在美停留期间的住址-邮政编码') {
                            setVal(_thirdItem);
                          }
                          setSelect('在美停留期间的住址-州[英文]', _thirdItem);

                          hasTravelPlanFinish = true;
                        });
                      }
                    }, 1000);
                  }

                });
              }
            }, 1000);
          }
        }
      }, 2000);

    }

    if (_item.ColumnName === '支付您旅行费用的个人或组织名称') {
      var interval3 = setInterval(function() {
        if (hasTravelPlanFinish) {
          clearInterval(interval3);
          setSelectChange(_item);
          var interval31 = setInterval(function() {
            tip(_item, 2);
            if (_item.Value === 'O') {

              if ($('#ctl00_SiteContentPlaceHolder_FormView1_tbxPayerSurname').length) {
                clearInterval(interval31);
                $.map(_data.Pages[0].Values, function(_secItem) {
                  if (_secItem.ColumnName === '承担您旅行费用者的姓氏[英文]' || _secItem.ColumnName === '承担您旅行费用者的名字[英文]' || _secItem.ColumnName === '承担您旅行费用者的电话号码' || _secItem.ColumnName === '承担您旅行费用者的电子邮件地址') {
                    setVal(_secItem);
                  }

                  // TODO 后端没有给这个数据
                  autoNotApplyCheckbox('承担您旅行费用者的电子邮件地址不适用的', _secItem);
                  setSelect('承担您旅行费用者与您关系[英文]', _secItem);

                  if (_secItem.ColumnName === '承担您旅行费用者地址是否与您家庭或右击地址相同') {
                    tip(_secItem, 1);
                    $('#' + _secItem.FormId).click();
                    if (_secItem.Value === 'False') {
                      var interval33 = setInterval(function() {
                        tip(_secItem, 2);
                        if ($('#ctl00_SiteContentPlaceHolder_FormView1_tbxPayerStreetAddress1').length) {
                          clearInterval(interval33);
                          $.map(_data.Pages[0].Values, function(_thirdItem) {
                            if (_thirdItem.ColumnName === '承担您旅行费用者街道地址（第一行）[英文]' || _thirdItem.ColumnName === '承担您旅行费用者街道地址（第二行）[英文]' || _thirdItem.ColumnName === '承担您旅行费用城市[英文]' || _thirdItem.ColumnName === '承担您旅行费用州/省份[英文]' || _thirdItem.ColumnName === '承担您旅行费用邮政编码') {
                              setVal(_thirdItem);
                            }
                            autoNotApplyCheckbox('承担您旅行费用州/省份不适用的', _thirdItem);
                            autoNotApplyCheckbox('承担您旅行费用邮政编码不适用的', _thirdItem);
                            setSelect('承担您旅行费用国家[英文]', _thirdItem);
                            tripPayFinish = true;
                          });
                        }
                      }, 1000);
                    } else {
                      tripPayFinish = true;
                    }

                  }

                });
              }
            } else if (_item.Value === 'C') {
              if ($('#ctl00_SiteContentPlaceHolder_FormView1_tbxPayerPhone').length) {
                clearInterval(interval31);
                $.map(_data.Pages[0].Values, function(_secItem) {
                  if (_secItem.ColumnName === '承担您旅行费用的公司或组织名称[英文]' || _secItem.ColumnName === '承担您旅行费用的公司或组织名称电话号码' || _secItem.ColumnName === '承担您旅行费用的公司或组织名称与您的关系[英文]' || _secItem.ColumnName === '承担您旅行费用的公司或组织名称街道地址（第一行）[英文]' || _secItem.ColumnName === '承担您旅行费用的公司或组织名称街道地址（第二行）[英文]' || _secItem.ColumnName === '承担您旅行费用的公司或组织名称城市[英文]' || _secItem.ColumnName === '承担您旅行费用的公司或组织名称州/省份[英文]' || _secItem.ColumnName === '承担您旅行费用的公司或组织名称邮政编码') {
                    setVal(_secItem);
                  }
                  autoNotApplyCheckbox('承担您旅行费用的公司或组织名称州/省份不适用的', _secItem);
                  autoNotApplyCheckbox('承担您旅行费用的公司或组织名称邮政编码不适用的', _secItem);
                  setSelect('承担您旅行费用的公司或组织名称国家[英文]', _secItem);
                  tripPayFinish = true;
                });
              }
            } else {
              clearInterval(interval31);
              tripPayFinish = true;
            }
          }, 1000);
        }
      }, 2000);
    }

  });

  // 填写完成,显示下一步按钮
  var intervalShowNext = setInterval(function() {
    if (tripPayFinish) {
      clearInterval(intervalShowNext);

      // 填写完成,显示下一步按钮
      showNext();
    }
  }, 2000);

}