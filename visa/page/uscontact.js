/**
 * Description: 第八页自动写入脚本文件
 * Author: jiangfeng<jiang.f@ctrip.com>
 * Date: 2015-03-12 09:17
 *
 */
function USContact_page(_data) {

  var iScontactPerson = false,
    iScontactOrgnize = false,
    canShowNext = false;

  // 隐藏下一步按钮
  hideNext();

  $.map(_data.Pages[0].Values, function(_item) {
    if (_item.ColumnName === '在美国的联系人—姓氏[英文]' || _item.ColumnName === '在美国的联系人—名字[英文]' || _item.ColumnName === '在美国的联系组织名称[英文]') {
      $('#' + _item.FormId).val(_item.Value);
      $('#J_autowritetips').text(_item.ColumnName);
    }

    // 无在美联系人 与 无在美国的联系组织 只能二选一
    if (_item.ColumnName === '无在美联系人') {
      $('#J_autowritetips').text(_item.ColumnName);
      if (_item.Value === 'True') {
        $('#' + _item.FormId).click();
        var intervalContactPerson = setInterval(function() {
          if ($('#ctl00_SiteContentPlaceHolder_FormView1_tbxUS_POC_SURNAME').prop('disabled')) {
            clearInterval(intervalContactPerson);
            iScontactPerson = true
          }
          // if($('#ctl00_SiteContentPlaceHolder_FormView1_tbxUS_POC_SURNAME').prop('disabled') === 'true')
        }, 1000);
      } else {
        iScontactPerson = true
      }
    }

    if (_item.ColumnName === '无在美联系人') {
      var intervalOrg = setInterval(function() {
        if (iScontactPerson) {
          clearInterval(intervalOrg);
          $.map(_data.Pages[0].Values, function(_secItem) {
            if (_secItem.ColumnName === '无在美国的联系组织') {
              $('#J_autowritetips').text(_secItem.ColumnName);
              if (_secItem.Value === 'True') {
                $('#' + _secItem.FormId).click();
                var intervalContactOrg = setInterval(function() {
                  if ($('#ctl00_SiteContentPlaceHolder_FormView1_tbxUS_POC_ORGANIZATION').prop('disabled')) {
                    clearInterval(intervalContactOrg);
                    iScontactOrgnize = true
                  }
                }, 1000);
              } else {
                iScontactOrgnize = true
              }
              return false;
            }
          });
        }
      }, 2000);
    }

    if (_item.ColumnName === '在美国的联系组织与您的关系') {
      var intervalRelationship = setInterval(function() {
        if (iScontactPerson && iScontactOrgnize) {
          clearInterval(intervalRelationship);
          $('#J_autowritetips').text(_item.ColumnName);

          $.map($('#' + _item.FormId).find('option'), function(__optionItem) {
            if ($(__optionItem).attr('value') === _item.Value) {
              // js去触发select的change事件
              var ev = document.createEvent("HTMLEvents");
              $(__optionItem).prop('selected', true);
              ev.initEvent("change", false, true);
              $('#' + _item.FormId).get(0).dispatchEvent(ev);
            }
          });

          var interval1 = setInterval(function() {
            if ($('#ctl00_SiteContentPlaceHolder_FormView1_tbxUS_POC_ADDR_LN1').length) {
              clearInterval(interval1);

              // 美国城市 ID 不对
              $.map(_data.Pages[0].Values, function(_secItem) {
                if (_secItem.ColumnName === '美国街道地址（第一行）[英文]' || _secItem.ColumnName === '美国街道地址（第二行）[英文]' || _secItem.ColumnName === '美国城市[英文]' || _secItem.ColumnName === '美国邮政编码（如果知道的话）' || _secItem.ColumnName === '美国电话号码' || _secItem.ColumnName === '美国电子邮件地址') {
                  $('#' + _secItem.FormId).val(_secItem.Value);
                  $('#J_autowritetips').text(_secItem.ColumnName);
                }

                // TODO 美国州,英文有错误
                autoSelectValue('美国州[英文]', _secItem);

                autoNotApplyCheckbox('美国电子邮件地址（不适用的）', _secItem);

                canShowNext = true;
              });
            }
          }, 1000);

        }
      }, 2000);
    }

  });

  var intervalShowNext = setInterval(function() {
    if (canShowNext) {
      clearInterval(intervalShowNext);

      // 填写完成,显示下一步按钮
      showNext();
    }
  }, 1000);

}