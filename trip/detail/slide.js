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



  function Slide() {
    this.itemWidth = null;
  };

  Slide.prototype = {
    _moveRight: function(id){
      $(id + ' .carousel-inner').animate({
        left: this.itemWidth
      },200, function(){

      })
    },
    _moveLeft: function(id){
      $(id + ' .carousel-inner').animate({
        left: 0 - this.itemWidth
      },200, function(){

      })
    },
    _setDom: function(id){
      var items = $(id + ' .carousel-inner').children(),
          tempitemWidth = items.outerWidth(true);
      this.itemWidth = tempitemWidth;
      $(id + ' .carousel-inner').css({
        width: tempitemWidth * items.length
      });
    },
    init: function(id, arg){
      var self = this;
      self._setDom(id);
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