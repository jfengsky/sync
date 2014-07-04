/*
 * @Author : liu.kai qxzhan
 * @Date   : 20140324
 * @Desc   : 景点地图 依赖 google map 
 */
define(function(require, exports) {
var $ = require("jquery"),
	
        mapletMax,
        mapletMin,
        isPad = /pad/.test(navigator.userAgent.toLowerCase()),
        mapZoom = isPad ? 4 : 6,
        MarkerMin,
        MarkerMax,
        InfoWindow,
        mkrs = [],
        curPopup,
        allPopup = {},
        flightPath,
        flightPlanCoordinatesMax = [],
        flightPlanCoordinatesMaxCopy = [],
        pathY = [],
        pathT = [],
        pathF = [],
	    fitMapLats=[],
        polylineY,
        polylineT,
        polylineF;
    /*关闭浮出层*/
    window.hideGroupTravelLayer = function(pID) {
        allPopup[pID].setMap();
        // 关闭高亮的自定义Marker
        for (var i = 0; i < mkrs.length; i++) {
            if (mkrs[i] && mkrs[i].id == pID) {
                var elem = mkrs[i].div.firstChild;
                elem.className = elem.className.replace('map_mark_select', '');
                mkrs[i].div.style.zIndex = '';
                $("[data-type=\"" + pID + "\"]").find("a").removeClass("cur2");
                break;
            }
        }
    };
    var cMap = {
        tpl: {
            infoWindow: '<div class="map_pic">\
                          <div class="pic_col"><img src="{{CoverImageUrl}}"/></div>\
                            <a href="javascript:void(0);" class="pic_close" onClick="hideGroupTravelLayer({{Id}})"></a>\
                         </div>\
                         <h3>{{Name}}<span>{{Ename}}</span></h3>\
                         <p id="travel_time">游览时间：{{OpenTime}}</p>\
                         <div class="synopsis"  data-text="" style="font-size:12px">{{{Introduce}}}</div>',
            max: '<div class="map_mask"  id="JS_Map_Ctrip" style="overflow:hidden;height:0px;padding:0px;border:0px;">\
                        <a href="javascript:void(0);" class="close" id="JS_Map_Close"><span>关闭</span></a>\
                        <div class="map_col">\
                            <div class="map_content" id="JS_Map_Max" style="width:920px;height:630px"></div>\
                            <div class="scroll_wrap" id="JS_Scroll_Wrap">\
                            <a href="javascript:void(0);" class="scroll_btn" id="JS_Scroll_Btn"></a>\
                             <div class="scroll_cont">\
                               <h3 class="scroll_titile" >行程概要</h3>\
							   <div class="scroll_border">\
                                  {{#each data}}\
                                     <dl class="scroll_journey">\
                                     <dt class="day" id="D{{OrderDay}}" data-day="{{OrderDay}}"><a href="###">D{{OrderDay}}</a></dt>\
                                     {{#each Scenics}}\
                                      <dd id="{{Id}}_{{Index}}"  data-index="{{Index}}" data-type="{{Id}}" data-glon="{{Glon}}" data-glat="{{Glat}}" {{#journey ../OrderDay @index}}{{/journey}}><a href="###" title="{{Name}}"><i {{#icon ../OrderDay @index}}{{/icon}}>{{Index}}</i>{{Name}}</a></dd>\
                                     {{/each}}\
                                     </dl>\
                                  {{/each}}\
								  </div>\
                                </div>\
                         </div>\
                  </div>',
            min: '<div class="journey_map" id="JS_Map_MinContent" style="display:none">\
                  <a id="route_Map" style="position: absolute;">&nbsp;</a>\
                  <div id="JS_Map_Min" style="height:150px;"></div>\
                  <a href="###" class="map_link" id="JS_Map_Min_Max">看大地图</a>\
                </div>',
            text: '<div class="map_marks"  data-map="{{Id}}_{{Index}}" data-index="{{Index}}"><span class="map_num">{{Index}}</span><div class="map_mark_inner"><div class="map_mark_price"><span class="b">{{Name}}</span></div></div></div>'
        },
        /*第一个景点标示*/
        render: function() {
            Handlebars.registerHelper('icon', function(pOrderDay, pIndex) {
                if (pOrderDay == 1 && pIndex == 0) {
                    return "class=\"start_icon\"";
                }
            });
            Handlebars.registerHelper('journey', function(pOrderDay, pIndex) {
                if (pOrderDay == 1 && pIndex == 0) {
                    return "class=\"journey_start\"";
                }
            });
        },
        /*扩展google.maps.Marker*/
        MarkerOverlay : function() {
            var Overlay = function(map, text, latLng, ready) {
                this.map = map;
                this.text = text;
                this.latLng = latLng;
                this.ready = ready;
                this.div = null;
                this.setMap(this.map);
            }
            Overlay.prototype = new google.maps.OverlayView();
            $.extend(Overlay.prototype, {
                onAdd: function() {
                    var div = document.createElement('div');
                    div.innerHTML = this.text;
                    div.style.position = 'absolute';
                    this.getPanes().overlayImage.appendChild(div);
                    this.div = div;
                    this.ready.call(this);
                },
                draw: function() {
                    var latLng = this.getProjection().fromLatLngToDivPixel(this.latLng);
                    this.div.style.left = latLng.x - 14 + 'px';
                    this.div.style.bottom = -latLng.y - 1 + 'px';
                },
                onRemove: function() {
                    this.div.parentNode.removeChild(this.div);
                    this.div = null;
                }
            });
            return Overlay;
        },
        /*扩展google.maps.InfoWindow*/
        InfoWindowOverlay:function() {
            var Overlay = function(opt) {
                this.opt = opt;
                this.map = opt;
                this.div = null;
                this.latLng = opt.latLng;
                this.setMap(opt.map);
            }
            Overlay.prototype = new google.maps.OverlayView();
            $.extend(Overlay.prototype, {
                onAdd: function() {
                    var div = document.createElement('div');
                    div.className = 'map_pop';
                    div.innerHTML = this.opt.text;
                    div.style.position = 'absolute';
                    div.style.cursor = 'default';
                    div.style.zIndex = '5';
                    this.getPanes().floatPane.appendChild(div);
                    this.div = div;
                    
                    GV.emit('info-window-added');
                },
                draw: function() {
                    var projection = this.getProjection();
                    var divPixel = projection.fromLatLngToDivPixel(this.latLng);
                    if (!this.noresult) {
                        var offset = cQuery(this.div).offset();
                        var bounds = this.map.getBounds();
                        var ne = projection.fromLatLngToDivPixel(bounds.getNorthEast());
                        var sw = projection.fromLatLngToDivPixel(bounds.getSouthWest());
                        this.div.style.left = divPixel.x - offset.width / 2 + 15 + 'px';
                        this.div.style.bottom = -(divPixel.y - 45) + 'px';
                        if (divPixel.x > ne.x || divPixel.x < sw.x || divPixel.y < ne.y || divPixel.y > sw.y) {
                            var c = projection.fromLatLngToDivPixel(this.map.getCenter());
                            this.map.panBy(divPixel.x - c.x, divPixel.y - offset.height - ne.y - 110);
                        } else {
                            var x = 0;
                            var y = 0;
                            var adjust = 50;
                            if (divPixel.x > ne.x - 680) {
                                adjust = 110;
                            }
                            if (divPixel.x < (sw.x + 190 + 15)) {
                                x = divPixel.x - (sw.x + 190 + 15);
                            }
                            if (divPixel.x > (ne.x - 190 - 40)) {
                                x = divPixel.x - (ne.x - 190 - 40);
                            }
                            y = (divPixel.y - (offset.height + adjust)) - ne.y;
                            if (x || y) {
                                this.map.panBy(x, y < 0 ? y : 0);
                            }
                        }
                    } else {
                        this.div.style.left = divPixel.x - 70 + 'px';
                        this.div.style.bottom = -(divPixel.y - 85) + 'px';
                    }
                },
                onRemove: function() {
                    this.div.parentNode.removeChild(this.div);
                    this.div = null;
                }
            });
            return Overlay;
        },
        mapAjax: function() {
            $.ajax({
                url: "/Booking/Ajax/DetailNew/ProductSightDetail.ashx",
                type: "POST",
                data: "ProductID=" + GV.app.detail.data.ProductID,
                success: function(data) {
                    var jsonData = $.parseJSON(data);
                    if (jsonData.data && jsonData.data.length > 0) {
                        var json = [],
                            index = 0,
							maps=jsonData.data;
						//过滤掉经纬度为空的景点		
                        for (var i = 0, mapsLen = jsonData.data.length; i < mapsLen; i++) {
							var items =[];
                            for (var k = 0, scenics = jsonData.data[i].Scenics.length; k < scenics; k++) {
                                if (jsonData.data[i].Scenics[k].Glon!=""&&jsonData.data[i].Scenics[k].Glon!=null&&jsonData.data[i].Scenics[k].Glat!=""&&jsonData.data[i].Scenics[k].Glat!=null) { 
									items.push(jsonData.data[i].Scenics[k]);
								}
                            }
							jsonData.data[i].Scenics=null;
							jsonData.data[i].Scenics=items;
                        }
						for (var i = 0, mapsLen = jsonData.data.length; i < mapsLen; i++) {
                            for (var k = 0, scenics = jsonData.data[i].Scenics.length; k < scenics; k++) {
									index++;
                                    jsonData.data[i].Scenics[k].Index = index;
                                    jsonData.data[i].Scenics[k].OrderDay = jsonData.data[i].OrderDay;
									//正则表达式过滤文字中的html标签 
									var str=jsonData.data[i].Scenics[k].Introduce;
									if(str==''||str==null){
										str='暂无';
									}
									if(str.length>0){
										str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
										str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
										//str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
										str=str.replace(/ /ig,'');//去掉 
										jsonData.data[i].Scenics[k].Introduce=str;
									}
									if(jsonData.data[i].Scenics[k].OpenTime==""||jsonData.data[i].Scenics[k].OpenTime==null){
										jsonData.data[i].Scenics[k].OpenTime="暂无";
									}
                                    json.push(jsonData.data[i].Scenics[k]);    								
                            }
                        }
                        /*模板*/
                        cMap.render();
                        /*大地图*/
                        $("body").append(Handlebars.compile(cMap.tpl.max)(jsonData));
                        for (var i = 0, mapsLen = maps.length; i < mapsLen; i++) {
                            if (maps[i].Scenics.length==0) {
                                var j=i+1;
                                $("#D"+j+"").hide();
                            }
                        }
                        /*小地图*/
                        $("#js_detail_travelCtrip").before(Handlebars.compile(cMap.tpl.min)());
						if(json.length>0){
							cMap.showMap(json);
							/*这边的行程介绍加上地图按钮*/
							if ($("#js_route_days").length) {
								if(!$("a[href='#route_Map']").length){
									/*发布事件 添加地图按钮*/
									GV.emit('route-map-success');
								}
							}
						}else{
							return;
						}
                    }
                }
            })
        },
        clearMap: function() {
            for (var i = 0; i < mkrs.length; i++) {
                if (mkrs[i]) mkrs[i].setMap(null);
            }
            mkrs = [];
            if (curPopup) {
                curPopup.setMap(null);
                hideGroupTravelLayer(curPopup.id);
            }
        },
        showMap: function(pData) {
            var latLng = new google.maps.LatLng(pData[0].Glat, pData[0].Glon),
                /*初始坐标*/
                mapOptionsMax = {
                    center: latLng,
                    zoom: mapZoom,
                    scaleControl: true,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    mapTypeControlOptions: {
                        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                        position: google.maps.ControlPosition.TOP_LEFT
                    }, 
					streetViewControl: true					
                },
                mapOptionsMin = {
                    center: latLng,
                    zoom:4,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
					//禁止小地图滑轮滚动事件
					scrollwheel: false
                };
            mapletMax = new google.maps.Map(document.getElementById("JS_Map_Max"), mapOptionsMax); /*渲染大地图*/
            mapletMin = new google.maps.Map(document.getElementById("JS_Map_Min"), mapOptionsMin); /*渲染小地图*/
            cMap.clearMap();
            cMap.mapClick(pData);
            cMap.path(pData);
            cMap.foundMap();
            cMap.point(pData);
            cMap.bigMap();
        },
        /*地图事件*/
        mapClick: function(pData) {
            for (var i = 0, len = pData.length; i < len; i++) {
                var item = pData[i],
                    /*地图景点标示*/
                    text = Handlebars.compile(cMap.tpl.text)({
                        Id: item.Id,
                        Index: i + 1,
                        Name: item.Name
                    }),
                    latLng = new google.maps.LatLng(item.Glat, item.Glon);
                /*大地图事件*/
                mkrs[i] = new MarkerMax(mapletMax, text, latLng, function(div) {
                    var that = this,
                        div = that.div,
                        elem = $(div).find("div").eq(0),
                        dom = $("#" + elem.data('map')),
                        index = elem.data("index") - 1;
                        $(div).bind('mouseover', function() {
                            elem.addClass('map_mark_hover');
                            div.style.zIndex = '5';
                            dom.addClass("cur");
                        }).bind('mouseout', function() {
                            elem.removeClass('map_mark_hover');
                            dom.removeClass("cur");
                            if (!elem.hasClass('map_mark_select')) {
                                div.style.zIndex = '';
                            }
                        }).bind("click", function(e) {
                            $("#JS_Scroll_Wrap dl").removeClass("journey_cur");
                            $("#JS_Scroll_Wrap a").removeClass("cur2");
                            $(".map_marks").removeClass("map_mark_select");
                            elem.removeClass('map_mark_hover');
                            div.style.zIndex = '5';
                            cMap.showTour(that, pData[index]);
                            elem.addClass('map_mark_select');
                            dom.find("a").addClass("cur2");
							cMap.colorPath(0, 0);
							mapletMax.setCenter(new google.maps.LatLng(dom.data("glat"), dom.data("glon")));
							mapletMax.setZoom(12);
                        })
                })
                /*小地图事件*/
                new MarkerMin(mapletMin, text, latLng, function(div) {
                    var that = this,
                        div = that.div,
                        elem = $(div).find("div").eq(0),
                        index = elem.data("index") - 1;
                        $(div).bind('mouseover', function() {
                            elem.addClass('map_mark_hover');
                            div.style.zIndex = '5';
                        }).bind('mouseout', function() {
                            elem.removeClass('map_mark_hover');
                            if (!elem.hasClass('map_mark_select')) {
                                div.style.zIndex = '';
                            }
                        })
                })
                mkrs[i].id = item.Id;
            }
        },
        /*景点线条连接*/
        path: function(pData) {
            for (var i = 0, len = pData.length; i < len; i++) {
                flightPlanCoordinatesMax.push(new google.maps.LatLng(pData[i].Glat, pData[i].Glon));
                flightPlanCoordinatesMaxCopy.push({
                    day: pData[i].OrderDay,
                    lat: new google.maps.LatLng(pData[i].Glat, pData[i].Glon)
                });
				fitMapLats.push(new google.maps.LatLng(pData[i].Glat, pData[i].Glon));
            }
            /*景点的坐标链接点*/
            flightPath = new google.maps.Polyline({
                path: flightPlanCoordinatesMax,
                strokeColor: '#4581c5', // 颜色
                strokeOpacity: 0.9,
                strokeWeight: 4
            });
            flightPath.setMap(mapletMax);
			cMap.fitMapView_max(fitMapLats,0);
			cMap.fitMapView_min(fitMapLats);
        },
        /*右侧景点事件*/
        point: function(pData) {
            $("#JS_Scroll_Wrap").delegate("dd", "mouseover", function() {
                var dom = $("[data-map=\"" + $(this).attr("id") + "\"]");
                    dom.addClass("map_mark_hover");
                    dom.parent().addClass("map_mark_index");
            }).delegate("dd", "mouseout", function() {
                var dom = $("[data-map=\"" + $(this).attr("id") + "\"]");
                    dom.removeClass("map_mark_hover");
                    dom.parent().removeClass("map_mark_index");
            }).delegate("dd", "click", function() {
                var index = $(this).data("index") - 1,
                    marksClick = mkrs[index],
                    div = marksClick.div,
                    elem = $(div).find("div").eq(0);
                    cMap.showTour(marksClick, pData[index]);
                    $(".map_marks").removeClass("map_mark_select");
                    $(".map_marks").parent().removeClass("map_mark_index_select");
                    elem.addClass('map_mark_select');
                    elem.parent().addClass("map_mark_index_select");
                    $("#JS_Scroll_Wrap a").removeClass("cur2");
                    $(this).find("a").addClass("cur2");
					cMap.colorPath(0, 0);
                    $("#JS_Scroll_Wrap dl").removeClass("journey_cur");
					mapletMax.setCenter(new google.maps.LatLng($(this).data("glat"), $(this).data("glon")));
					mapletMax.setZoom(12);
            }).delegate("dt", "click", function() {	
                var elem = $(this).parents("dl").find("dd"),
                    glonF = elem.eq(0).data("glon"),
                    glatF = elem.eq(0).data("glat"),
                    day = $(this).data("day"),
                    len = $(this).nextAll("dd").length;
                    cMap.colorPath(day, len);
                    $("#JS_Scroll_Wrap dl").removeClass("journey_cur");
                    $(this).parents("dl").addClass("journey_cur");
                    //关闭已经弹出得层
                    if (curPopup) {
                        hideGroupTravelLayer(curPopup.id);
                    }
                    $(".map_marks").removeClass("map_mark_select");
                    for (var m = 0, lens = elem.length; m < lens; m++) {
                        $("#JS_Map_Ctrip").find("[data-map=\"" + elem.eq(m).attr("id") + "\"]").addClass("map_mark_select");
                    }
                })
        },
        /*根据日期标识景点连线*/
        colorPath: function(pDay, pNum) {
            pathY = [];
            pathT = [];
            pathF = [];
            if (polylineY) polylineY.setMap(null);
            if (polylineT) polylineT.setMap(null);
            if (polylineF) polylineF.setMap(null);
            if (pNum) {
                for (var i = 0, len = flightPlanCoordinatesMaxCopy.length; i < len; i++) {
                    if (flightPlanCoordinatesMaxCopy[i].day < pDay) {
                        pathY.push(flightPlanCoordinatesMaxCopy[i].lat);
                    } else if (flightPlanCoordinatesMaxCopy[i].day == pDay) {
                        pathT.push(flightPlanCoordinatesMaxCopy[i].lat);
                    } else {
                        pathF.push(flightPlanCoordinatesMaxCopy[i].lat);
                    }
                }
                if (pathT.length >= 1) pathY.push(pathT[0]);
				cMap.fitMapView_max(pathT,1);
                if (pathF.length >= 1) pathF.unshift(pathT[pathT.length - 1]);
                polylineY = new google.maps.Polyline({
                    path: pathY,
                    strokeColor: '#4581c5',
                    strokeOpacity: 0.9,
                    strokeWeight: 4
                });
                polylineT = new google.maps.Polyline({
                    path: pathT,
                    strokeColor: '#ff6500',
                    strokeOpacity: 0.9,
                    strokeWeight: 4
                });
                polylineF = new google.maps.Polyline({
                    path: pathF,
                    strokeColor: '#4581c5',
                    strokeOpacity: 0.9,
                    strokeWeight: 4
                });
                flightPath.setMap(null);
                polylineY.setMap(mapletMax);
                polylineT.setMap(mapletMax);
                polylineF.setMap(mapletMax);
            } else {
                /*IE有差异 这里为了IE setMap*/
                flightPath.setMap(mapletMax);
            }
        },
		fitMapView_max:function(latLngs,a) {
			var len = latLngs.length;
			if (!len) return;

			if (len === 1) {
				mapletMax.setCenter(latLngs[0]);
				mapletMax.setZoom(15);
				return;
			}

			var minLat = latLngs[0].lat();
			var maxLat = latLngs[1].lat();
			var minLng = latLngs[0].lng();
			var maxLng = latLngs[1].lng();

			var lat, lng;
			for (var i = 0; i < len; i++) {
				lat = latLngs[i].lat();
				lng = latLngs[i].lng();
				if (lat < minLat) {
					minLat = lat;
				} else if (lat > maxLat) {
					maxLat = lat;
				}

				if (lng < minLng) {
					minLng = lng;
				} else if (lng > maxLng) {
					maxLng = lng;
				}
			}
			var sw = new google.maps.LatLng(minLat, minLng);
			var ne = new google.maps.LatLng(maxLat, maxLng);
			var bounds = new google.maps.LatLngBounds(sw, ne);
			mapletMax.fitBounds(bounds);
			var zoom=mapletMax.getZoom();
			if(a==1){
				mapletMax.setZoom(zoom-1);
			}
		},
		fitMapView_min:function(latLngs) {
			var len = latLngs.length;
			if (!len) return;

			if (len === 1) {
				mapletMin.setCenter(latLngs[0]);
				mapletMin.setZoom(15);
				return;
			}

			var minLat = latLngs[0].lat();
			var maxLat = latLngs[1].lat();
			var minLng = latLngs[0].lng();
			var maxLng = latLngs[1].lng();

			var lat, lng;
			for (var i = 0; i < len; i++) {
				lat = latLngs[i].lat();
				lng = latLngs[i].lng();
				if (lat < minLat) {
					minLat = lat;
				} else if (lat > maxLat) {
					maxLat = lat;
				}

				if (lng < minLng) {
					minLng = lng;
				} else if (lng > maxLng) {
					maxLng = lng;
				}
			}

			var sw = new google.maps.LatLng(minLat, minLng);
			var ne = new google.maps.LatLng(maxLat, maxLng);
			var bounds = new google.maps.LatLngBounds(sw, ne);
			mapletMin.fitBounds(bounds);
		},
        bigMap: function() {
            /*大地图最大宽度1100px,最小宽度920*/
            $("#JS_Scroll_Btn").on("click", function() {
                var css = $("#JS_Scroll_Wrap").css('right');
                if (css == "0px") {
                    $("#JS_Map_Max").animate({
                        width: "1100px"
                    });
                    $("#JS_Scroll_Wrap").animate({
                        right: "-180px"
                    });
                } else {
                    $("#JS_Map_Max").animate({
                        width: "920px"
                    });
                    $("#JS_Scroll_Wrap").animate({
                        right: "0px"
                    });
                }
            })
        },
        foundMap: function() {
            /*显示小图*/
            $("#JS_Map_MinContent").show();
            $("#JS_Map_Min_Max").on("click", function() {
                $("#JS_Map_Ctrip").css({
                    "overflow": "visible",
                    "height": "auto",
                    "padding":"10px",
                    "border":"border: 1px solid #7C7C7C"
                });
                cQuery("#JS_Map_Ctrip").mask();
                $("#JS_Map_Ctrip").css("top", ($(window).height() - $("#JS_Map_Ctrip").height()) / 2 + $(window).scrollTop() + "px");
            })
            /*关闭地图*/
            $("#JS_Map_Close").on("click", function() {				 
                cQuery("#JS_Map_Ctrip").unmask();
				if (curPopup) {
					hideGroupTravelLayer(curPopup.id);
				}
				cMap.colorPath(0, 0);
				cMap.fitMapView_max(fitMapLats,0);
				$("#JS_Scroll_Wrap dl").removeClass("journey_cur");
				$(".map_marks").removeClass("map_mark_select");
				$("#JS_Scroll_Wrap a").removeClass("cur2");
                $(".map_marks").parent().removeClass("map_mark_index_select");
				$("#JS_Map_Ctrip").css({
						"overflow": "hidden",
						"height": "0",
						"padding":"0",
						"border":"0",
						"top":"0"
					});
            });
        },
        /*产品窗口*/
        showTour: function(pData, pItem) {
            if (curPopup) {
                hideGroupTravelLayer(curPopup.id);
            }
            pData.popup = new InfoWindow({
                map: mapletMax,
                text: Handlebars.compile(cMap.tpl.infoWindow)(pItem),
                latLng: pData.latLng,
                callback: function(div) {}
            });
			GV.once('info-window-added', function(arg){
				var tmp = $('.synopsis');
				tmp = tmp[0];
				//tmp.mlellipsis(2);
				//将超出的文字用省略号代替
				if(tmp.innerHTML.length>96){
					$('.synopsis').attr("data-text",tmp.innerHTML);
					var new_Introduce=tmp.innerHTML.substr(0,93);
					tmp.innerHTML=new_Introduce+"......";
				}
			});
			
            curPopup = pData.popup;
            curPopup.id = pData.id;
            allPopup[pData.id] = pData.popup;
        },
        init: function() {
            MarkerMin = cMap.MarkerOverlay();
            MarkerMax = cMap.MarkerOverlay();
            InfoWindow = cMap.InfoWindowOverlay();
            cMap.mapAjax();
        }
    }
    exports.init = cMap.init;
});