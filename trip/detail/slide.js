/**
 * Description: slide
 * Author: jiangfeng(jiang.f@ctrip.com)
 * Date: 2014-04-14 14:29
 *
 */
define(function (require, exports, module) {
  "use strict";
  var $ = require('jquery'),
      gestrue = require('./gesture');



  function Slide() {};

  Slide.prototype = {
    _moveRight: function(id){
      $(id + ' .carousel-inner').animate({
        left: 300
      },200, function(){

      })
    },
    _moveLeft: function(id){
      $(id + ' .carousel-inner').animate({
        left: -300
      },200, function(){

      })
    },
    init: function(id, arg){
      var self = this;
      new gestrue().init(function(data){
        if(data === 'swipeleft' || data === 'swipedown'){
          self._moveLeft(id);
        };
        if(data === 'swiperight' || data === 'swipeup') {
          self._moveRight(id);
        }
      })
    }
  }

  module.exports = Slide;
});