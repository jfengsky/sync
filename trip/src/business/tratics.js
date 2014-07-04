define(function(require, exports, module) {
  var $ = require('../../../lib/jquery');

  var tpl = {
    inputError: '<div style="left:{{ offsetLen }}px;" class="base_alert">\
                   <b></b>\
                   <i></i>\
                   <div class="alert_info">{{ data }}</div>\
                 </div>',
    checkError: '<div class="checkError-wrap">\
                  <div class="checkError-box">\
                    <div class="checkErrorMsg">{{ data }}</div>\
                    <div class="close">X</div>\
                  </div>\
                </div>'
  };

  var template = Handlebars.compile(tpl.inputError);

  var validator = {
    types: {},
    config: {
      TravelAgencyName: 'isNonEmpty',
      BrandName: 'isNonEmpty',
      BusinessScope: 'isNonChecked',
      RegisteredCapital: 'isNumber',
      BusinessLicense: 'isNonEmpty',
      BusinessCertificate: 'isNonEmpty',
      Address: 'isNonEmpty',
      PostCode: 'isPostCode',
      ConcactName: 'isNonEmpty',
      ConcactTel: 'isTelephone',
      ConcactMobile: 'isMobile',
      ConcactQQ: 'isQQ',
      ConcactEamil: 'isEmail',
      VCode: 'isNonEmpty',
    },
    messages: [],
    validate: function (data) {
      $('.base_alert').remove();
      $('.input_m').removeClass('input_error');
      $('.inputSel').removeClass('input_error');
      var i, msg, type, checker, result_ok;
      this.messages = [];

      var target = null;

      for (i in data) {
        if (data.hasOwnProperty(i)) {

            type = this.config[i];  
            checker = this.types[type]; 

            if (!type) {
                continue; 
            }
            if (!checker) { 
                throw {
                    name: "ValidationError",
                    message: "No handler to validate type " + type
                };
            }

            result_ok = checker.validate(data[i]); 
            if (!result_ok) {
                target = $('#' + i);
                if (i === 'Address') {
                  target.parent().append(template({offsetLen: 810, data: checker.instruction}));
                } else if (i === 'BusinessScope') {
                  $('#' + i).append(template({offsetLen: 725, data: checker.instruction}));
                } else if (i === 'VCode') {
                  $('#' + i).parent().append(template({offsetLen: 640, data: checker.instruction}));
                } else {
                  target.parent().append(template({offsetLen: 490, data: checker.instruction}));
                }

                if (i !== 'BusinessScope') {
                  if(!$('#' + i).hasClass('input_error')) {
                    $('#' + i).addClass('input_error');
                  }
                }
                this.messages.push(msg);
            }
          }
      }
    },
    hasErrors: function () {
      return this.messages.length !== 0;
    }
  };

  validator.types.isNonEmpty = {
    validate: function (value) {
      return value !== '';
    },
    instruction: '传入值不能为空'
  };

  validator.types.isNonChecked = {
    validate: function (value) {
      return value;
    },
    instruction: '必须选择经营范围'
  };

  validator.types.isNumber = {
    validate: function (value) {
      return value && !isNaN(value);
    },
    instruction: '传入的值只能是合法的数字，例如：1000000'
  };

  validator.types.isPostCode = {
    validate: function (value) {
      return !isNaN(value) && value.length === 6;
    },
    instruction: '邮编格式不对，只能输入6位数字，例如：210000'
  };

  validator.types.isTelephone = {
    validate: function (value) {
      var RegTelephone = /^0\d{2,3}(\-)?\d{7,8}/;
      return RegTelephone.test(value);
    },
    instruction: '座机电话号码格式不对'
  };

  validator.types.isMobile = {
    validate: function (value) {
      var RegMobile = /^((\+86)|(86))?1[3-8]\d{9}/;
      return RegMobile.test(value);
    },
    instruction: '手机号码格式不对'
  };

  validator.types.isQQ = {
    validate: function (value) {
      var RegQQ = /\d{3}/;
      return RegQQ.test(value);
    },
    instruction: 'QQ格式不对'
  };

  validator.types.isEmail = {
    validate: function (value) {
      var RegEmail = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
      return RegEmail.test(value);
    },
    instruction: 'Email格式不对'
  };

  exports = module.exports = validator;
  exports.show = function (msg) {
    $('.checkError-wrap').remove();
    var showTemplate = Handlebars.compile(tpl.checkError);
    if (msg) {
      $('body').append(showTemplate({data: msg}));
      $('.checkError-wrap').css('height', getScrollOffsets().y + getViewportSize().h);
    } else {
      $('body').append(showTemplate({data: '网络延时'}));
      $('.checkError-wrap').css('height', getScrollOffsets().y + getViewportSize().h);
    }
    $('.checkError-box').css('left', ((getScrollOffsets().x + getViewportSize().w) / 2 - 200));
    $('.checkError-box').css('top', ((getScrollOffsets().y + getViewportSize().h) / 2 - 150));
  };

  $(document).on('click', 'div.close', function (e) {
    $('.checkError-wrap').remove();
  });

  // Return the current scrollbar offsets as the x and y properties of an object
  function getScrollOffsets(w) {
      // Use the specified window or the current window if no argument
      w = w || window;

      // This works for all browsers except IE versions 8 and before
      if (w.pageXOffset != null) return {x: w.pageXOffset, y:w.pageYOffset};

      // For IE (or any browser) in Standards mode
      var d = w.document;
      if (document.compatMode == "CSS1Compat")
          return {x:d.documentElement.scrollLeft, y:d.documentElement.scrollTop};

      // For browsers in Quirks mode
      return { x: d.body.scrollLeft, y: d.body.scrollTop };
  }

  // Return the viewport size as w and h properties of an object
  function getViewportSize(w) {
      // Use the specified window or the current window if no argument
      w = w || window;  

      // This works for all browsers except IE8 and before
      if (w.innerWidth != null) return {w: w.innerWidth, h:w.innerHeight};

      // For IE (or any browser) in Standards mode
      var d = w.document;
      if (document.compatMode == "CSS1Compat")        return { w: d.documentElement.clientWidth,
                   h: d.documentElement.clientHeight };

      // For browsers in Quirks mode
      return { w: d.body.clientWidth, h: d.body.clientWidth };
  }
});