/**
 * Description: 第一页自动写入脚本文件
 * Author: jiangfeng<jiang.f@ctrip.com>
 * Date: 2015-02-16 15:59
 *
 */

/**
 * 第一页表单填写逻辑
 * TODO 还缺少telecode 和 City数据
 * @param
 */
function Personal1_Page(_data) {
  var canShowNext = false,
    otherNameFinish = false,
    telcodeFinish = false,
    mariFinish = false;

  // 隐藏下一步按钮
  hideNext();

  // 遍历数据开始自动写入操作
  $.map(_data.Pages[0].Values, function(_item) {

    // text类型表单直接写值
    if (_item.ColumnName === '名字[拼音]' || _item.ColumnName === '姓氏[拼音]' || _item.ColumnName === '全名[中文]' || _item.ColumnName === '出生日期-年' || _item.ColumnName === '出生地-州省[英文]' || _item.ColumnName === '出生地-城市[英文]') {
      setVal(_item);
    }

    // 全名不适用的
    autoNotApplyCheckbox('全名不适用的', _item);

    // 其它名字radio
    if (_item.ColumnName === '是否拥有曾用名') {
      $('#' + _item.FormId).click();
      tip(_item,1);
      if (_item.Value === 'True') {
        otherNameFinish = false;
        var intervalName = setInterval(function() {
          tip(_item, 2);
          if ($('#ctl00_SiteContentPlaceHolder_FormView1_addlAliases').length) {
            clearInterval(intervalName);
            // TODO 填写曾用名表单
            $.map(_data.Pages[0].Values, function(__item) {
              setInputText('曾用名姓氏[拼音]', __item);
              setInputText('曾用名名字[拼音]', __item);
            });
            otherNameFinish = true;
          }
        }, 1000);
      } else {
        otherNameFinish = true;
      }
    };


    // 电码名
    if (_item.ColumnName === '您的名字有相应的电码吗?') {

      // 由于网站的原因,电码名要等其它名字的操作结束后才能进行
      var clickTelCode = setInterval(function() {
        if (otherNameFinish) {
          clearInterval(clickTelCode);
          $('#' + _item.FormId).click();
        }
      }, 2000);
      tip(_item);
      if (_item.Value === 'True') {
        telcodeFinish = false;
        var interCodeName = setInterval(function() {
          tip(_item, 2);
          if ($('#ctl00_SiteContentPlaceHolder_FormView1_TelecodeDiv').length) {
            clearInterval(interCodeName);
            // TODO 填写曾用名表单
            $.map(_data.Pages[0].Values, function(__item) {
              setInputText('电码名来源', __item);
              setInputText('电码名', __item);
            });

            telcodeFinish = true;
          }
        }, 1000);
      } else {
        telcodeFinish = true;
      }
    };

    // 性别
    if (_item.ColumnName === '性别') {
      tip(_item, 1);
      $('#' + _item.FormId).click();
    };

    // 婚姻
    if(_item.ColumnName === '婚姻状况'){
      setSelect('婚姻状况', _item);
      if(_item.Value === 'O') {
        var interval1 = setInterval(function(){
          tip(_item, 2);
          if($('#ctl00_SiteContentPlaceHolder_FormView1_tbxOtherMaritalStatus').length){
            clearInterval(interval1);
            $.map(_data.Pages[0].Values, function(_secItem) {
              setInputText('婚姻其它原因说明', _secItem);
              mariFinish = true
            });
          }
        }, 1000);
      } else {
        mariFinish = true
      }
    }
    setSelect('婚姻状况', _item);

    // 生日 - 日
    setSelect('出生日期-日', _item, 'number');


    // 生日 - 月
    setSelect('出生日期-月', _item, 'month');


    // 出生地-州省不适用的
    autoNotApplyCheckbox('出生地-州省不适用的', _item);

    // 出生 - 国家
    setSelect('出生地-国家[英文]', _item);

  });

  var intervalShowNext = setInterval(function() {
    if (otherNameFinish && telcodeFinish && mariFinish) {
      clearInterval(intervalShowNext);

      // 填写完成,显示下一步按钮
      showNext();
    }
  }, 1000);
};