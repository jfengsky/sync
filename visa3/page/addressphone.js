/**
 * Description: 第三页自动写入脚本文件
 * Author: jiangfeng<jiang.f@ctrip.com>
 * Date: 2015-03-3 10:46
 *
 */

function AddressPhone_Page(_data) {

  var canShowNext = false;

  // 隐藏下一步按钮
  hideNext();

  $.map(_data.Pages[0].Values, function(_item) {
    if (_item.ColumnName === '家庭地址街道地址(第一行)[英文]' || _item.ColumnName === '家庭地址街道地址(第二行)[英文]' || _item.ColumnName === '家庭地址城市[英文]' || _item.ColumnName === '家庭地址州/省份[英文]' || _item.ColumnName === '家庭地址邮政区域/邮政编码' || _item.ColumnName === '主要电话号码' || _item.ColumnName === '备用电话号码' || _item.ColumnName === '工作电话号码' || _item.ColumnName === '电子邮件地址') {
      setVal(_item);
    };

    // 国家
    setSelect('家庭地址国家/地区[英文]', _item);

    // 其它国籍
    if (_item.ColumnName === '邮寄地址是否同于您的家庭地址') {
      $('#' + _item.FormId).click();
      tip(_item,1);
      if (_item.Value === 'False') {
        canShowNext = false;
        var intervalAddress = setInterval(function() {
          tip(_item,2);
          if ($('#ctl00_SiteContentPlaceHolder_FormView1_mailingadd1').length) {
            clearInterval(intervalAddress);
            $.map(_data.Pages[0].Values, function(_otherItem) {
              if (_otherItem.ColumnName === '邮寄地址街道地址（第一行）[英文]' || _otherItem.ColumnName === '邮寄地址街道地址（第二行）[英文]' || _otherItem.ColumnName === '邮寄地址城市[英文]' || _otherItem.ColumnName === '邮寄地址州/省份[英文]' || _otherItem.ColumnName === '邮寄地址邮政区域/邮政编码') {
                setVal(_otherItem);
              };

              // 其它国家
              setSelect('邮寄地址国家/地区[英文]', _item);
              

              // 其它州/省不适用的
              autoNotApplyCheckbox('邮寄地址州/省份(不适用)', _otherItem);

              // 其它邮政编码不适用的
              autoNotApplyCheckbox('邮政区域/邮政编码(不适用)', _otherItem);

              canShowNext = true;
            });
          }
        }, 1000);
      } else {
        canShowNext = true;
      }
    };

    // 州/省不适用的
    autoNotApplyCheckbox('家庭地址州/省份（不适用）', _item);

    // 邮政编码不适用的
    autoNotApplyCheckbox('家庭地址邮政区域/邮政编码（不适用）', _item);

    // 次要的电话号码不适用的
    autoNotApplyCheckbox('备用电话号码(不适用)', _item);

    // 工作电话号码不适用的
    autoNotApplyCheckbox('工作电话号码(不适用)', _item);

    // 电子邮件不适用的
    autoNotApplyCheckbox('电子邮件地址(不适用)', _item);
  });

  // 填写完成,显示下一步按钮
  var intervalShowNext = setInterval(function() {
    if (canShowNext) {
      clearInterval(intervalShowNext);

      // 填写完成,显示下一步按钮
      showNext();
    }
  }, 1000);

};