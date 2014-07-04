/**
 * swf上传组件,用于ie10以下
 * @param  {[type]} require [description]
 * @param  {[type]} exports [description]
 * @param  {[type]} module  [description]
 * @return {[type]}         [description]
 */
define(function (require, exports, module) {
  "use strict";
  var $ = require('jquery');
  // $LAB.script(GV.app.detail.scriptpath + '/Modules/uploadify/jquery.uploadify.min.js').wait(function(){
  //   JQ('#J_ub17477418').uploadify({
  //     'swf': 'uploadify.swf',
  //     'uploadify': GV.app.detail.api.UploadUrl
  //   });
  // });
  $('#J_ub17477418').uploadify({
    'swf': 'uploadify.swf',
    'uploadify': GV.app.detail.api.UploadUrl
  });


});