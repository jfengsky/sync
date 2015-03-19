/**
 * Description: 第六页自动写入脚本文件
 * Author: jiangfeng<jiang.f@ctrip.com>
 * Date: 2015-03-6 17:42
 *
 */
function TravelCompanions_Page(_data) {
  var canShowNext = false,
    personTravelFinsh = false;
  // 隐藏下一步按钮
  hideNext();
  $.map(_data.Pages[0].Values, function(_item) {
    var $inputDom = $('#' + _item.FormId);

    if (_item.ColumnName === '是否有人与您同行？') {
      if (_item.Value === "True") {
        $inputDom.click();
        tip(_item, 1);
        var intervalPerson = setInterval(function() {
          if ($('#ctl00_SiteContentPlaceHolder_FormView1_grouptravel').length) {
            clearInterval(intervalPerson);
            $.map(_data.Pages[0].Values, function(_secItem) {
              if (_secItem.ColumnName === '您是否作为一个团队或者组织的成员去旅行？') {
                $('#' + _secItem.FormId).click();
                tip(_secItem);
                if (_secItem.Value === 'True') {

                  var interValGroup = setInterval(function() {
                    if ($('#ctl00_SiteContentPlaceHolder_FormView1_tbxGroupName').length) {
                      clearInterval(interValGroup);
                      $.map(_data.Pages[0].Values, function(_thirdItem) {
                        setInputText('输入您旅行团队的名称[英文]', _thirdItem);
                      });
                      personTravelFinsh = true;
                    }
                  }, 1000);
                } else {

                  var interValGroup = setInterval(function() {
                    if ($('#ctl00_SiteContentPlaceHolder_FormView1_dlTravelCompanions_ctl00_tbxSurname').length) {
                      clearInterval(interValGroup);
                      $.map(_data.Pages[0].Values, function(_thirdItem) {
                        if (_thirdItem.ColumnName === '随行人员的姓氏[英文]' || _thirdItem.ColumnName === '随行人员的名字[英文]') {
                          setVal(_thirdItem);
                        };

                        // TODO 这里后端给的id有错误
                        autoSelectValue('随行人员和您的关系', _thirdItem);

                      });
                      personTravelFinsh = true;
                    }
                  }, 1000);


                }
              }
            })
          }
        }, 1000)
      } else {
        $inputDom.click();
        personTravelFinsh = true;
      }
    }
  });

  // 填写完成,显示下一步按钮
  var intervalShowNext = setInterval(function() {
    if (personTravelFinsh) {
      clearInterval(intervalShowNext);

      // 填写完成,显示下一步按钮
      showNext();
    }
  }, 1000);

}