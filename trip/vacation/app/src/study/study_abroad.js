/*
* @Author :    qxzhan
* @Date   :    2013/10/08
* @Desc   :    游学首页JS
*/
define(function (require, exports) {
    GV.app.school = {
        addHandler: function (pelement, ptype, phandler) {
            if (pelement.addEventListener) {
                pelement.addEventListener(ptype, phandler, false);
            } else if (pelement.attachEvent) {
                pelement.attachEvent("on" + ptype, phandler);
            } else {
                pelement["on" + ptype] = phandler;
            }
        },
        bodyScrollTop: function () {
            return document.documentElement.scrollTop || document.body.scrollTop;
        },
        chooseSite: function () {
            var _link = jQuery(".study_tab dd a");
            _link.bind("click", function () {
                var _rel = jQuery(this).attr("rel"),
                          _wrap = jQuery(this).parents(".study_product").find(".study_product_wrap2"),
                          _fellow = jQuery(this).parents(".study_tab").find("dd a");
                _wrap.hide();
                _wrap.each(function () {
                    if (jQuery(this).attr("id") == _rel) {
                        jQuery(this).show();
                    }
                });
                _fellow.removeClass("current");
                jQuery(this).addClass("current");
            });
        },
        chooseInfo: function () {
            var _link = jQuery(".problem_tab a");
            _link.bind("click", function () {
                var _rel = jQuery(this).attr("rel"),
                        _wrap = jQuery(this).parents(".study_theme").find(".problem_detail");
                _wrap.hide();
                _wrap.each(function () {
                    if (jQuery(this).attr("id") == _rel) {
                        jQuery(this).show();
                    }
                });
                jQuery(this).siblings("a").removeClass("current");
                jQuery(this).addClass("current");
            });

        },
        chooseCity: function () {
            var _parent = jQuery("#startingCity").parents(".city_box");
            _parent.bind("click", function () {
                if (jQuery(this).hasClass("city_unfold")) {
                    jQuery(this).removeClass("city_unfold");
                }
                else {
                    jQuery(this).addClass("city_unfold");
                }
            });
            _parent.bind("mouseleave", function () {
                jQuery(this).removeClass("city_unfold");
            });
        },
        getTop: function (pelemnt) {
            var _offset = pelemnt.offsetTop;
            if (pelemnt.offsetParent) {
                _offset = _offset + GV.app.school.getTop(pelemnt.offsetParent);
            }
            return _offset;
        },
        suspend: function (pelemnt) {
            var _element = document.getElementById(pelemnt),
              _top = GV.app.school.getTop(_element),
              _isIE6 = /msie 6/i.test(navigator.userAgent);
            GV.app.school.addHandler(window, "scroll", function () {
                if (GV.app.school.bodyScrollTop() > _top) {
                    _element.style.position = (_isIE6) ? "absolute" : "fixed";
                    _element.style.zIndex = 9999;
                    _element.style.top = (_isIE6) ? GV.app.school.bodyScrollTop() + "px" : "0px";
                } else {
                    _element.style.position = "static";
                }
            });
        },
        stick: function () {
            var _element = jQuery("#GoTop");
            GV.app.school.addHandler(window, "scroll", function () {
                if (GV.app.school.bodyScrollTop() > 100) {
                    _element.fadeIn();
                    _element.bind("click", function () {
                        window.scrollTo(0, 0);
                    });
                }
                else {
                    _element.fadeOut();
                }
            });
        },
        anChor:function(){
           var _anchor_box=jQuery(".anchor_box a"),
               _height = jQuery("#suspend_box").height(),
               _titleInfo = [],
               _titleLink = [];
              jQuery(".study_product h2").each(function () {
                _titleInfo.push(jQuery(this).text().replace(/\s/g, ""));
              })
             _anchor_box.each(function () {
               _titleLink.push(jQuery(this).text().replace(/\s/g, ""));
           })
           for (var i = 0, len = _titleLink.length; i < len; i++) {
               if (jQuery.inArray(_titleLink[i], _titleInfo) == -1) {
                   _anchor_box.eq(i).parents("li").remove();
               }
           } 
            _anchor_box.bind("click",function(){
              var _top=jQuery(".study_product").eq(jQuery(this).parent("li").index()).offset().top;
               if(jQuery("#suspend_box").css("position")=="static"){
                   window.scrollTo(0,_top-_height*2);
                 }
               else{
                 window.scrollTo(0,_top-_height);
                }
           });
        },
        //金赞广告调用
        showAd: function () {
            var _ads = document.createElement("script");
            _ads.type = "text/javascript";
            _ads.async = true;
            _ads.src = GV.app.school.adURL + "[" + GV.app.school.adData + "]";
            var _s = document.getElementsByTagName("script")[0];
            _s.parentNode.insertBefore(_ads, _s);
        }
    };
    exports.chooseSite = GV.app.school.chooseSite;
    exports.chooseInfo = GV.app.school.chooseInfo;
    exports.suspend = GV.app.school.suspend;
    exports.chooseCity = GV.app.school.chooseCity;
    exports.showAd = GV.app.school.showAd;
    exports.stick = GV.app.school.stick;
    exports.anChor = GV.app.school.anChor;
 })