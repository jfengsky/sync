/**
 *
 * Created by jiangfeng on 14-6-1.
 */
define(function (require, exports, module) {
  "use strict";
  var h5upload = require('mod_html5upload');
  if( window.File && window.FileReader && window.FileList && window.Blob ){
    // 浏览器支持fileAPI html5 fileupload
    new h5upload().init('#J_h5upload',{
      maxsize: 10,
      types:['jpeg', 'jpg', 'png', 'gif', 'pdf', 'doc']
    });
  } else {
    // 浏览器不支持fileAPI swfupload

  }


});
