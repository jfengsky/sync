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
     */
    _checkSize: function(_files, _maxsize){
      $.each(_files, function(index, item){

        
        if( item.size / 1048576 > _maxsize){
          item.maxsize = 1;
        } else {
          item.maxsize = 0;
        };
        $.each(_fileType, function(idx, key){

        });
      });
      return _files;
    },

    /**
     * 检查文件类型
     * @param {Object}  _files      文件信息数组
     * @param {Array}   _fileType   可上传的文件类型
     * @return {Object} uptype = 1  不可上传的文件类型，0可上传的文件类型
     */
    _checkType: function(_files, _fileType){
      $.$.each(_files, function(index, item){

      });
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
      var self = this,
          upfiles = [];
      $(_id).change(function(ev){
        var filelist = ev.target.files;
        upfiles = self._checkSize(filelist, _args.maxsize);
        console.log(upfiles);
      });
    }
  };

  module.exports = HtmlUpload;
});
