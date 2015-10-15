/**
 * Description: 第14页自动写入脚本文件
 * Author: jiangfeng<jiang.f@ctrip.com>
 * Date: 2015-03-13 16:17
 *
 */

function SignCertify_page(_data) {
  var canShowNext = false;
  // 隐藏下一步按钮
  hideNext();

  var data = _data.Pages[0].Values;

  $.map(_data.Pages[0].Values, function(_item) {

    if( _item.ColumnName === '是否有任何人协助您填写申请？'){
      tip(_item, 1);
      $('#' + _item.FormId).click();
      if(_item.Value === 'True'){
        var interval1 = setInterval(function(){
          tip(_item, 2);
          if($('#ctl00_SiteContentPlaceHolder_FormView3_tbxPREP_SURNAME').length){
            clearInterval(interval1);
            $.map(_data.Pages[0].Values, function(_secItem) {
              if( _secItem.ColumnName === '姓氏' || _secItem.ColumnName === '名字' || _secItem.ColumnName === '机构名称' || _secItem.ColumnName === '街道地址（第一行）' || _secItem.ColumnName === '街道地址（第二行）' || _secItem.ColumnName === '城市' || _secItem.ColumnName === '州/省份' || _secItem.ColumnName === '邮政区域/邮政编码' || _secItem.ColumnName === '与您的关系'){
                tip(_secItem);
                setVal(_secItem);
              };

              autoSelectValue('国家/地区', _secItem);
              autoNotApplyCheckbox('姓名是否不适用', _secItem);
              autoNotApplyCheckbox('机构名称不适用的', _secItem);
              autoNotApplyCheckbox('州/省份 不适用的', _secItem);
              autoNotApplyCheckbox('邮政区域/邮政编码 不适用的', _secItem);
              canShowNext = true;
            });
          }
        }, 1000);

      } else {
        canShowNext = true
      }
    };

    if( _item.ColumnName === '输入您护照/旅行证件的号码'){
      tip(_item);
      setVal(_item);
    }

    // autoClickWrite(_item, '您是否曾经拒绝将一在美国境外的美籍儿童的监护权移交给一被美国法庭批准享有法定监护权的人？', '您是否曾经拒绝将一在美国境外的美籍儿童的监护权移交给一被美国法庭批准享有法定监护权的人？说明[英文]', data);

    // autoClickWrite(_item, '您是否违反了法律或规定在美国进行过投票选举？', '您是否违反了法律或规定在美国进行过投票选举？说明[英文]', data);

    // autoClickWrite(_item, '您是否曾为逃避交税而声明放弃美国公民身份?', '您是否曾为逃避交税而声明放弃美国公民身份?说明[英文]', data);

    // canShowNext = true
  });

  var intervalShowNext = setInterval(function() {
    if (canShowNext) {
      clearInterval(intervalShowNext);

      // 填写完成,显示下一步按钮
      showNext();
    }
  }, 1000);

}