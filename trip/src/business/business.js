define(function(require, exports, module) {
  var $ = require('../../../lib/jquery'),
    Tratics = require('./tratics');

  $(function() {
    var businessScope = $('input[name="BusinessScope"]');

    $("#change-VCode, .yzm img").click(function () {
      $('.yzm').children('img').attr('src', '/Package-Booking-VacationsOnlineSiteUI/Handler/VCode.ashx?' + new Date().getTime());
    });

    $('#BusinessScope').on('click', 'label.destin span', function () {
      var target = $(this).parent().children('input')[0];
      if (target.checked) {
        target.checked = false;
      } else {
        target.checked = true;
      }
      return false;
    });

    $('#submit1').click(function (e) {
      var businessBreak = 0;
      for(var i = 0, len = businessScope.length; i < len; i++) {
        if(businessScope[i].checked) {
          businessBreak++;
          break;
        }
      }

      var validateObj = {
        TravelAgencyName: $.trim($('#TravelAgencyName').val()),
        BrandName: $.trim($('#BrandName').val()),
        BusinessScope: businessBreak > 0 ? true : false,
        RegisteredCapital: $.trim($('#RegisteredCapital').val()),
        BusinessLicense: $.trim($('#BusinessLicense').val()),
        BusinessCertificate: $.trim($('#BusinessCertificate').val()),
        Address: $.trim($('#Address').val()),
        PostCode: $.trim($('#PostCode').val()),
        ConcactName: $.trim($('#ConcactName').val()),
        ConcactTel: $.trim($('#ConcactTel').val()),
        ConcactMobile: $.trim($('#ConcactMobile').val()),
        ConcactQQ: $.trim($('#ConcactQQ').val()),
        ConcactEamil: $.trim($('#ConcactEamil').val()),
        VCode: $.trim($('#VCode').val())
      };

      Tratics.validate(validateObj);
      if (!Tratics.hasErrors()) {
        $.ajax({
          url: '/Package-Booking-VacationsOnlineSiteUI/Handler2/BusinessOrderHandler.ashx',
          type: 'POST',
          data: $('#form1').serialize(),
          success: function(data) {
            if (data.IsSuccess) {
                location.href = '/mallsuccess.htm';
            } else {
              Tratics.show(data.ReturnMsg);
            }
          },
          error: function (data){
            Tratics.show(data.ReturnMsg);
          },
          dataType: 'json'
        });
      }
    });
  });
});