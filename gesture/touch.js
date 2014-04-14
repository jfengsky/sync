// function handleTouchEvent(event) {
//     //只跟踪一次触摸
//     if (event.touches.length == 1) {
//         var output = document.getElementById("output");
//         switch (event.type) {
//             case "touchstart":
//                 output.innerHTML = "Touch started (" + event.touches[0].clientX + "," + event.touches[0].clientY + ")";
//                 break;
//             case "touchend":
//                 output.innerHTML += "&lt;br&gt;Touch ended (" + event.changedTouches[0].clientX + "," + event.changeTouches[0].clientY + ")";
//                 break;
//             case "touchmove":
//                 event.preventDefault(); //阻止滚动
//                 output.innerHTML += "&lt;br&gt;Touch moved (" + event.changedTouches[0].clientX + "," + event.changedTouches[0].clientY + ")";
//                 break;
//         }
//     }
// }
// document.addEventListener("touchstart", handleTouchEvent, false);
// document.addEventListener("touchend", handleTouchEvent, false);
// document.addEventListener("touchmove", handleTouchEvent, false);

var club = document.getElementById('block');

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
    var touch = event.touches[0];
    startPoint = {
      x: touch.clientX,
      y: touch.clientY
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
    xDistance = Math.abs(endPoint.x) - Math.abs(startPoint.x);
    yDistance = Math.abs(endPoint.y) - Math.abs(startPoint.y);

//    console.log('left: ' + leftDistance);
//    console.log('right: ' + rightDistance);
//    console.log('up: ' + upDistance);
//    console.log('down: ' + downDistance);
    // left
    if(startPoint.x > endPoint.x && (startPoint.x - endPoint.x > 60) ) {
      console.log('swipeleft');
    };
    if(startPoint.y < endPoint.y && (startPoint.y - endPoint.y < -60) ){
      console.log('swipedown');
    }
  };



  this.init = function() {
    document.addEventListener("touchstart", self._touchStart, false);
    document.addEventListener("touchmove", self._touchMove, false);
    document.addEventListener("touchend", self._touchEnd, false);


  }

}

var gest = new Gesture();

gest.init();