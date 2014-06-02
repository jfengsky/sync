/**
 * html5 上传
 * Created by jiangfeng on 14-6-1.
 */

define(function (require, exports, module) {
  "use strict";
  var $ = require('jquery');

  function HtmlUpload() {

  };


  HtmlUpload.prototype = {
    /**
     * 检测文件大小
     * @param {Object}  _files        文件信息数组
     * @param {Number}  _maxsize      上传文件大小限制
     * @return {Object} maxsize = 1   超过大小, 0 未超过大小
     *                  upType = 0    格式正确, 1 格式不正确
     */
    _checkSizeType: function(_files, _maxsize, _fileType){
      var boolSize = true,
          boolType = false;
      $.each(_files, function(index, item){
        if(item.size / 1048576 > _maxsize){
          item.maxsize = 1;
          console.log('文件大小超过限制');
          boolSize = false;
        };

        $.each(_fileType, function(idx, key){
          if( item.type.indexOf(key.toLowerCase()) > -1 && item.type ){
            console.log('文件格式正确2');
            boolType = true;
          };
        });
      });
      return boolSize && boolType;
    },

    /**
     * 初始化上传按钮
     * @param {String} _id  按钮id
     * @param {Object} _args 配置参数
     *    @param  {Number} maxsize 最大大小(MB)
     *    @param  {Array} types   可上传文件类型['jpg','jpeg','png','gif']
     *    @param
     */
    init: function(_id, _args){
      var self = this;
      $(_id).change(function(ev){
        var filelist = ev.target.files,
        upfiles = self._checkSizeType(filelist, _args.maxsize, _args.types);
        if( upfiles ){

          // ajax 上传
          var formData = new window.FormData();
          for(var i = 0; i < filelist.length; i++){
            formData.append("Filedata", filelist[i]);
          };

          $.ajax({
            url: 'upload.php',
            type: 'POST',
            data: formData,
            cache: false,
            contentType:false,
            processData:false,
            success: function (data) {
              console.log(data);
            }
          });
        }
      });
    }
  };

  module.exports = HtmlUpload;
});
