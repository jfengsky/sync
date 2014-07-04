// JavaScript source code
define(function (require,exports) {
   require('./mod_searchComment').init();
   require('./mod_searchCalendar').init();
   require('./mod_searchClickItem').init();
   require('./mod_supplierMore').init();

    //惰性加载图片
   cQuery.mod.load('lazyLoad', '1.0', function () {
       cQuery("#searchResultContainer").regMod('lazyLoad', '1.0', {
           attribute: "data-original",
           loadingImage: "",
           placeholder: "http://pic.c-ctrip.com/vacation_v2/group_travel/place_hold_m.png"
       })
   });

   //加载底部广告滚动
   (function () {
       function newYNotice(pContainer, speed) {
           var _container = pContainer[0];
           var _oWidth, _items = pContainer.find("span");
           var _speed = speed || 50;
           for (var i = 0, l = _items.length; i < l; i++) {
               var _tempNode = _items[i].cloneNode(true);
               _container.appendChild(_tempNode);
               if (i == 0) {
                   _oWidth = _tempNode.offsetLeft - _items[0].offsetLeft;
               }
           }
           function Marquee() {
               if (_oWidth > _container.scrollLeft)
                   _container.scrollLeft++;
               else
                   _container.scrollLeft = 0;
           }
           var MyMar = setInterval(Marquee, _speed);
           //_container.onmouseover=function() {clearInterval(MyMar);} 
           //_container.onmouseout=function() {MyMar=setInterval(Marquee,speed);} 
       }

       !!$(".booking_now>div").length && newYNotice($(".booking_now>div"), 50);
   })();

});