/**
 * Description: 前配偶信息
 * Author: jiangfeng<jiang.f@ctrip.com>
 * Date: 2015-03-19 11:24
 *
 */

function PrevSpouse_page(_data) {
  var canShowNext = false,
    hasCityFinish = false,
    canWriteCityValue = true;

  // 隐藏下一步按钮
  hideNext();

  // 遍历数据开始自动写入操作
  $.map(_data.Pages[0].Values, function(_item) {

    if (_item.ColumnName === '前配偶出生城市未知的') {
      
      if (_item.Value === 'True') {
        $('#' + _item.FormId).click();
        $('#J_autowritetips').text('勾选了"前配偶出生城市未知的",等待服务器返回结果...');
        canWriteCityValue = false;
        var interval1 = setInterval(function() {
          if ($('#ctl00_SiteContentPlaceHolder_FormView1_DListSpouse_ctl00_tbxSpousePOBCity').prop('disabled')) {
            clearInterval(interval1);
            hasCityFinish = true;
          }
        }, 1000);
      } else {
        hasCityFinish = true;
      }
    }

    var interval2 = setInterval(function() {
        if (hasCityFinish) {
          clearInterval(interval2);
          $.map(_data.Pages[0].Values, function(_secItem) {

            // 这个暂时默认为1
            if (_secItem.ColumnName === '前配偶数量'){
              $('#' + _item.FormId).val(1);
            };

            if (_secItem.ColumnName === '前配偶数量' || _secItem.ColumnName === '前配偶姓氏[英文]' || _secItem.ColumnName === '前配偶名字[英文]' || _secItem.ColumnName === '前配偶出生日期-年' || _secItem.ColumnName === '前配偶结婚日期-年' || _secItem.ColumnName === '前配偶婚姻终止日期-年' || _secItem.ColumnName === '前配偶婚姻怎样终止的[英文]') {
              setVal(_secItem);
            };

            if(_secItem.ColumnName === '前配偶出生城市[英文]' && canWriteCityValue){
              setVal(_secItem);
            };
            setSelect('前配偶出生日期-日', _secItem, 'number');

            setSelect('前配偶出生日期-月', _secItem, 'month');

            setSelect('前配偶所属国家[英文]', _secItem);
            setSelect('前配偶出生国家[英文]', _secItem);

            setSelect('前配偶结婚日期-日', _secItem, 'number');

            setSelect('前配偶结婚日期-月', _secItem, 'number');

            setSelect('前配偶婚姻终止日期-日', _secItem, 'number');

            setSelect('前配偶婚姻终止日期-月', _secItem, 'number');


            // TODO 缺少离婚所在国家
            setSelect('前配偶-婚姻终止-所在的国家[英文]', _secItem);

            canShowNext = true;
          });
        }
      }, 1000);

  });

  var intervalShowNext = setInterval(function() {
    if (canShowNext) {
      clearInterval(intervalShowNext);

      // 填写完成,显示下一步按钮
      showNext();
    }
  }, 1000);


};