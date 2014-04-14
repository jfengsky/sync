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
  this._touchEnd = function(event){
    var touch = event.changedTouches[0],
        xDistance,
        yDistance;
    endPoint = {
      x: touch.clientX,
      y: touch.clientY
    };
    xDistance = Math.abs(Math.abs(endPoint.x) - Math.abs(startPoint.x));
    yDistance = Math.abs(Math.abs(endPoint.y) - Math.abs(startPoint.y));

    if( xDistance > yDistance ) {   // 横向移动

      if(xDistance >= distanceCheck) {
        if( startPoint.x > endPoint.x ) {
          return 'swipeleft';
        } else {
          return 'swiperight';
        }

      };

    } else { // 纵向移动

      if (yDistance >= distanceCheck) {
        if( startPoint.y < endPoint.y ) {
          return 'swipedown';
        } else {
          return 'swipeup';
        }
      };

    }
  };



  this.init = function() {
    document.addEventListener("touchstart", self._touchStart, false);
    document.addEventListener("touchmove", self._touchMove, false);
    document.addEventListener("touchend", self._touchEnd, false);
  }

}

new Gesture().init();

