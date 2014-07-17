/**
 * Description:金额表单操作
 * Author: jiangfeng(jiang.f@ctrip.com)
 * Date: 2014-07-16 13:51
 *
 */

define(function(require, exports, module) {
  "use strict";
  var $ = require('jquery');

  function MoneyInput(){}

  MoneyInput.prototype = {
    init: function( _args ){
      $(document).delegate(_args.obj, 'focus', function(){
        console.log('clear errno')
      });
      $(document).delegate(_args.obj, 'blur', function(){
        console.log('check ');
      });
      _args.callback();
    }
  }

  module.exports = MoneyInput;

});