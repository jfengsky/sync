/**
 * Description: 第六页自动写入脚本文件
 * Author: jiangfeng<jiang.f@ctrip.com>
 * Date: 2015-03-6 17:42
 *
 */
function TravelCompanions_Page(_data) {
  var canShowNext = false,
    personTravelFinsh = false,
    morePerson = false,
    isEnd = false,
    travellerNum = 1,
    travellerClickFinish = false,
    allFinish = false;
  // 隐藏下一步按钮
  hideNext();

  // 获取随心人员个数
  $.map(_data.Pages[0].Values, function(_item) {
    if(_item.ColumnName === '随行人员数量'){
      travellerNum = _item.Value - 0 || 1
    }
  });

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

                      // 循环点击随行人员
                      morePerson = true;
                      personTravelFinsh = true;
                      // $.map(_data.Pages[0].Values, function(_thirdItem) {
                      //   if (_thirdItem.ColumnName === '随行人员的姓氏[英文]' || _thirdItem.ColumnName === '随行人员的名字[英文]') {
                      //     setVal(_thirdItem);
                      //   };

                      //   // TODO 这里后端给的id有错误
                      //   autoSelectValue('随行人员和您的关系', _thirdItem);

                      // });
                      // personTravelFinsh = true;
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
  
  var interval1 = setInterval(function(){
    if(personTravelFinsh){
      clearInterval(interval1);

      // 循环点击添加出行人
      var i = 1;
      if(i < travellerNum){
        clickEvent('#ctl00_SiteContentPlaceHolder_FormView1_dlTravelCompanions_ctl00_InsertButtonPrincipalPOT');
        $('#J_autowritetips').text('正在添加随行人员2');
        var interval2 = setInterval(function(){
          if($('#ctl00_SiteContentPlaceHolder_FormView1_dlTravelCompanions_ctl01_tbxSurname').length){
            clearInterval(interval2);
            i++;
            if(i < travellerNum){
              clickEvent('#ctl00_SiteContentPlaceHolder_FormView1_dlTravelCompanions_ctl00_InsertButtonPrincipalPOT');
              $('#J_autowritetips').text('正在添加随行人员3');
              var interval3 = setInterval(function(){
                if($('#ctl00_SiteContentPlaceHolder_FormView1_dlTravelCompanions_ctl02_tbxSurname').length){
                  clearInterval(interval3);
                  i++;
                  if(i < travellerNum){
                    clickEvent('#ctl00_SiteContentPlaceHolder_FormView1_dlTravelCompanions_ctl00_InsertButtonPrincipalPOT');
                    $('#J_autowritetips').text('正在添加随行人员4');
                    var interval4 = setInterval(function(){
                      if($('#ctl00_SiteContentPlaceHolder_FormView1_dlTravelCompanions_ctl03_tbxSurname').length){
                        clearInterval(interval4);
                        i++;
                        if(i < travellerNum){
                          clickEvent('#ctl00_SiteContentPlaceHolder_FormView1_dlTravelCompanions_ctl00_InsertButtonPrincipalPOT');
                          $('#J_autowritetips').text('正在添加随行人员5');
                          var interval5 = setInterval(function(){
                            if($('#ctl00_SiteContentPlaceHolder_FormView1_dlTravelCompanions_ctl04_tbxSurname').length){
                              clearInterval(interval5);
                              travellerClickFinish = true;
                            }
                          }, 1000);
                        } else {
                          travellerClickFinish = true
                        }
                      }
                    });
                  } else {
                    travellerClickFinish = true
                  }
                }
              }, 1000);
            } else {
              travellerClickFinish = true
            }
          }
        }, 1000);
      } else {
        travellerClickFinish = true
      }
      



    }
  }, 1000);

  var interval6 = setInterval(function(){
    if(travellerClickFinish){
      clearInterval(interval6);
      // 一次填写随行人员
      $.map(_data.Pages[0].Values, function(_personItem) {
        if(_personItem.ColumnName === '随行人员的姓氏[英文]' || _personItem.ColumnName === '随行人员的名字[英文]' || _personItem.ColumnName === '随行人员2的姓氏[英文]' || _personItem.ColumnName === '随行人员2的名字[英文]' || _personItem.ColumnName === '随行人员3的姓氏[英文]' || _personItem.ColumnName === '随行人员3的名字[英文]' || _personItem.ColumnName === '随行人员4的姓氏[英文]' || _personItem.ColumnName === '随行人员4的名字[英文]' || _personItem.ColumnName === '随行人员5的姓氏[英文]' || _personItem.ColumnName === '随行人员5的名字[英文]'){
          setVal(_personItem);
        }
        autoSelectValue('随行人员和您的关系', _personItem);
        autoSelectValue('随行人员2和您的关系', _personItem);
        autoSelectValue('随行人员3和您的关系', _personItem);
        autoSelectValue('随行人员4和您的关系', _personItem);
        autoSelectValue('随行人员5和您的关系', _personItem);
      });
      allFinish = true
    }
  }, 1000)



  // 填写完成,显示下一步按钮
  var intervalShowNext = setInterval(function() {
    if (allFinish) {
      clearInterval(intervalShowNext);

      // 填写完成,显示下一步按钮
      showNext();
    }
  }, 1000);

}