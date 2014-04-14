/**
 * Description: gesture
 * Author: jiangfeng(jiang.f@ctrip.com)
 * Date: 2014-04-14 15:59
 *
 */
define(function (require, exports, module) {
  "use strict";

  function Gesture() {
    var self = this,
      startPoint = {},
      movePoint = {},
      endPoint = {},
      startTime,
      endTime,
      distanceCheck = 60; // 移动多少距离才判断方向

    this._touchStart = function(event){
      event.preventDefault();
      //只跟踪一次触摸
      if (event.touches.length == 1){
        var touch = event.touches[0];
        startPoint = {
          x: touch.clientX,
          y: touch.clientY
        }
      }
    };
    this._touchMove = function(event){

    };
    this._touchEnd = function(event, fn){
      var touch = event.changedTouches[0],
        xDistance,
        yDistance,
        directory;
      endPoint = {
        x: touch.clientX,
        y: touch.clientY
      };
      xDistance = Math.abs(Math.abs(endPoint.x) - Math.abs(startPoint.x));
      yDistance = Math.abs(Math.abs(endPoint.y) - Math.abs(startPoint.y));

      if( xDistance > yDistance ) {   // 横向移动

        if(xDistance >= distanceCheck) {
          if( startPoint.x > endPoint.x ) {
            directory = 'swipeleft';
          } else {
            directory = 'swiperight';
          }

        };

      } else { // 纵向移动

        if (yDistance >= distanceCheck) {
          if( startPoint.y < endPoint.y ) {
            directory = 'swipedown';
          } else {
            directory = 'swipeup';
          }
        };

      };
      if(typeof fn === 'function'){
        fn(directory);
      }
    };



    this.init = function(fn) {
      document.addEventListener("touchstart", self._touchStart, false);
      document.addEventListener("touchmove", self._touchMove, false);
      document.addEventListener("touchend", function(event){
        self._touchEnd(event, fn);
      }, false);
    }

  }


  module.exports = Gesture;
});