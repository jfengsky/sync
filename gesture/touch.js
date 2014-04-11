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

function Gesture() {
    var self = this,
        startPoint = {},
        endPoint = {};
    this._start = function(data) {
        startPoint = {};
        startPoint = data;
    };
    this._end = function(data) {
        endPoint = {};
        endPoint = data;
        if ((startPoint.x === endPoint.x) && (startPoint.y === endPoint.y)) {
            // TODO 判断hold
            console.log('tap');
            return 'tap';
        } else if ((startPoint.y < endPoint.y) && (Math.abs(endPoint.y - startPoint.y) > Math.abs(endPoint.x - startPoint.x))) {
            console.log('down');
            return 'down';
        } else if ((startPoint.y >= endPoint.y) && (Math.abs(endPoint.y - startPoint.y) <= Math.abs(endPoint.x - startPoint.x))) {
            console.log('up');
            return 'up';
        }
    };
    this._handleTouchEvent = function(event) {
        var _x, _y;
        if (event.type === 'touchstart') {
            _x = event.touches[0].clientX;
            _y = event.touches[0].clientY;
            self._start({
                x: _x,
                y: _y
            })
        } else if (event.type === 'touchend') {
            _x = event.changedTouches[0].clientX;
            _y = event.changedTouches[0].clientY;
            self._end({
                x: _x,
                y: _y
            })
        }
    };


    this.init = function() {
        document.addEventListener("touchstart", self._handleTouchEvent, false);
        document.addEventListener("touchend", self._handleTouchEvent, false);
    }

}

var gest = new Gesture();

gest.init();