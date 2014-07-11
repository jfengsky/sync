/**
 * @file 旅游度假详情页<br />
 * 重新选择酒店<br />
 * 重新选择单选(交通资源和非交通资源)<br />
 * 重新选择多选<br />
 * 轮播图右侧产品详情交互<br />
 * 滚动监听(tab滚动 | 行程天数滚动)<br />
 * 悬浮工具条交互<br />
 * @namespace vacation.detail
 * @version 1.0.0.20131119 
 * @author yuan<tyuan@ctrip.com>
 */
define(function (require, exports, module) {
    var $ = require("jquery"),
        _ = require("underscore"),
        util = require('./mod_util'),
        v_dp = require('./v_dp'),
        needknow = require('./mod_detail_needknow'),
        popHotelUi = require('../Modules/HotelSelect'), //公共继承酒店交互
        popOtherUi = require('./mod_detail_big_order_other'); //公共继承其他单选多选交互
    require('../Modules/scrollspy');
    require("Modules/EventEmitter");
    require("lib/inherit");

    var hotelTemplate = Handlebars.compile(require('tpl/detail/hotel_pop.html.js')), //酒店弹窗模板
        singleTemplate = Handlebars.compile(require('tpl/detail/single_pop.html.js')), //单选弹窗模板
        optionalTemplate = Handlebars.compile(require('tpl/detail/optional_pop.html.js')); //多选弹窗模板
    var DataDetail = GV.app.detail; //详情页全局信息
    var IsTourGroupProduct = DataDetail.data.IsTourGroupProduct; //该产品是否为多线路产品
    var nowHotelSearchXHR, nowSingleSearchXHR;
    /**
    * 重新选择酒店|单选|多选蒙版
    *
    * @class infoSelect
    * @memberof vacation.detail
    */
    var infoSelect = {
        //模板
        tpl: {
            jmp_pkg_title: '<div id="jmp_pkg_title" style="display:none;">\
                                <div class="jmp_bd flt_jmp">\
                                    <strong>${txt0}</strong>\
                                    <p>${txt1}</p>\
                                </div>\
                            </div>',
            jmp_single_title: '<div id="jmp_single_title" style="display:none;">\
                                  <div class="jmp_bd">\
                                    <p>${txt}</p>\
                                  </div>\
                                </div>',
            popHotelMain: '<div class="resource_mask" id="J_hotel_select_pop" style="display: none;">\
                                <a href="javascript:void(0);" class="close" id="J_hotel_pop_close"><span>关闭</span></a>\
                            </div>',
            popSingleMain: '<div class="resource_mask" id="J_single_select_pop" style="display: none;">\
                                <a href="javascript:void(0);" class="close" id="J_single_pop_close"><span>关闭</span></a>\
                            </div>'
        },
        //切换loading效果
        tips: {
            toggleLoading: function (pId, pElement) {
                var _loading = $('#' + pId);
                if (!_loading.length) {
                    _loading = $('<div class="c_loading detail_loading" id="' + pId + '"/>');
                    _loading.html('<img alt="" src="http://pic.c-ctrip.com/packages111012/loading_50-0816.gif"><strong>查询中，请稍候...</strong>').appendTo(pElement);
                } else {
                    _loading.remove();
                }
            },
            nothing: function (pId, pElement) {
                var _nothing = $('<div class="c_loading detail_loading" data-type="' + pId + '"/>');
                _nothing.html('<img alt="" src="http://pic.c-ctrip.com/vacation_v1/ico_info_blue.png"><strong>对不起，没有查询到相关信息，请重新查询...</strong>').appendTo(pElement);
            }
        },
        init: function () {
            $("body").append(infoSelect.tpl.jmp_pkg_title, infoSelect.tpl.jmp_single_title);
            //监听order-select-button-click事件 分别为hotel | single | optional
            GV.on('order-select-button-click', function (e) {
                //选择其他酒店
                if (e.type == 'hotel') {
                    $('body').append(infoSelect.tpl.popHotelMain);
                    infoSelect.chooseOtherHotel(e).init();
                }
                //选择其他(单选项)
                if (e.type == 'single') {
                    $('body').append(infoSelect.tpl.popSingleMain);
                    infoSelect.chooseOtherSingle(e).init();
                }
                //选择其他(多选项)
                if (e.type == 'optional') {
                    infoSelect.chooseOtherOptional(e).init();
                }
            });
        },
        //选择其他酒店
        chooseOtherHotel: function (data) {
            var requestData = data,
                segment = requestData.SegmentDatas, //传回来的数据的行程段信息
                compareMoney = requestData.CompareMoney,
                thisDomNum = requestData.Node.data('segment-number'),
                selectedRoomId = requestData.SelectedRoom.getId(), //获取资源框选择酒店的id以便弹出框默认显示
                CheckInDate, CheckOutDate,
                hotelDom = $('#J_hotel_select_pop'),
                hotelDomC = cQuery('#J_hotel_select_pop'),
                hotelPopClose = $('#J_hotel_pop_close');
            //根据SegmentNumber刷选相应行程段里面的信息用于ajax传参数
            _.each(segment, function (segmentData) {
                var selectSegment = _.find(segment, function (data) { return data.SegmentNumber == thisDomNum });
                CheckInDate = selectSegment.CheckInDate;
                CheckOutDate = selectSegment.CheckOutDate;
            });
            var roomSelected = requestData.Instance.getSelectedRoom();
            var countSelected = roomSelected.getCount();
            //处理监听的数据得到ajax回调参数
            var handleDate = {
                "ProductID": DataDetail.data.IsTourGroupProduct ? requestData.ProductID : DataDetail.data.ProductID,
                "SegmentNumber": thisDomNum,
                "CheckInDate": CheckInDate,
                "CheckOutDate": CheckOutDate,
                "AdultNum": requestData.AdultNum,
                "ChildNum": requestData.ChildNum,
                "OrderName": "PKG",
                "OrderType": "DESC",
                "HotelList": "",
                "HotelCount": 20,
                "RoomCount": 100,
                "HotelSearchResponseFlag": ""
            };
            return {
                init: function () {
                    var me = this;
                    infoSelect.tips.toggleLoading('pop_loading', hotelDom);
                    me.ajaxHotelLoad();
                    hotelDomC.mask();
                    //关闭蒙版
                    hotelPopClose.on('click', function () {
                        nowHotelSearchXHR.abort(); //关闭弹窗的时候手动absort 当前ajax请求
                        hotelDomC.unmask();
                        hotelDom.remove(); //关闭的时候下次点击重新请求 保证实时性
                    });
                },
                //重新选择酒店ajax请求
                ajaxHotelLoad: function () {
                    var me = this,
                        Data = { query: cQuery.stringifyJSON(handleDate) };
                    nowHotelSearchXHR = $.ajax({
                        url: DataDetail.api.getMoreHotel,
                        type: 'POST',
                        data: Data
                    })
                    .done(function (json) {
                        json = $.parseJSON(json);
                        //匹配资源框和弹出框里面的房间id
                        for (var i in json.data) {
                            var hotelList = json.data[i].RoomInfos;
                            for (var j in hotelList) {
                                var id = hotelList[j].Room;
                                if (id == selectedRoomId) {
                                    json.data[i].RoomInfos[j].Select = 1; //默认选择资源框里面已经选择的房间
                                    json.data[i].RoomInfos[j].SelectedRoomNum = countSelected;
                                }
                            }
                            json.data[i].RoomInfos = _.sortBy(json.data[i].RoomInfos, function (room) { return room.Select })
                        }
                        //查询成功
                        if (json.errno == 0 && json.data.length > 0) {
                            var hotelPopHTML = hotelTemplate(json);
                            hotelDom.append(hotelPopHTML);
                            hotelDom.css("top", ($(window).height() - hotelDom.height()) / 2 + $(window).scrollTop() + "px");
                            infoSelect.checkHeight(hotelDom);
                            infoSelect.tips.toggleLoading('pop_loading');
                            me.hotelSelectUi();
                        }
                            //查询失败
                        else {
                            infoSelect.tips.toggleLoading('pop_loading');
                            infoSelect.tips.nothing('pop_nothing', hotelDom);
                        }
                    })
                    .fail(function () {
                        if (nowHotelSearchXHR && nowHotelSearchXHR.statusText == 'abort') {

                        }
                        else {
                            alert('网络出错，请重试');
                        }

                    });
                },
                //继承酒店交互
                hotelSelectUi: function () {
                    var hotelList = hotelDom.find('.mask_htl_wrap');
                    hotelList.each(function (i, index) {
                        var hotelUI = new popHotelUi({
                            nodeWrap: $(index),
                            compareMoney: compareMoney
                        });
                        //确定选择酒店 发布一个order-select-back事件，类型为hotel
                        hotelUI.on('room-click', function (room) {
                            var roomLi = room.node,
                                roomId = roomLi.data('room-id'),
                                hotelId = roomLi.data('hotel-id'),
                                roomNum = parseInt(room.countSelector.getValue()),
                                ChosedResource = {
                                    CheckInDate: CheckInDate,
                                    CheckOutDate: CheckOutDate,
                                    HotelId: hotelId,
                                    RoomId: roomId,
                                    Segement: thisDomNum,
                                    SelectedRoomNum: roomNum,
                                    type: 'hotel'
                                };
                            GV.emit('order-select-back', ChosedResource);
                            hotelDomC.unmask();
                            hotelDom.remove();
                        });
                    });
                }
            }
        },
        //选择其他单选弹窗
        chooseOtherSingle: function (data) {
            var requestData = data,
                segment = requestData.SegmentDatas,
                resourceId = requestData.Node.data('resource-id'),
                categoryId = requestData.Node.data('category-id'),
                SegmentNumber = requestData.SegmentNumber,
                DepartureCityID, DepartureDate, SegmentId,
                singleDom = $('#J_single_select_pop'),
                singleDomC = cQuery('#J_single_select_pop'),
                singlePopClose = $('#J_single_pop_close');
            //根据SegmentNumber刷选相应行程段里面的信息用于ajax传参数
            _.each(segment, function (segmentData) {
                var selectSegment = _.find(segment, function (data) { return data.SegmentNumber == SegmentNumber });
                //如果单选是火车票的话DepartureCityID就根据当前用户选择出发的城市
                if (categoryId == 19) {
                    DepartureCityID = DataDetail.data.StartCityID;
                }
                else {
                    DepartureCityID = selectSegment.DepartureCityID;
                }
                DepartureDate = selectSegment.DepartureDate;
                SegmentId = selectSegment.SegmentID;
            });
            //处理监听的单选数据得到ajax回调参数
            var handleDateSingle = {
                "ProductID": DataDetail.data.IsTourGroupProduct ? requestData.ProductID : DataDetail.data.ProductID,
                "DepartureCityID": DepartureCityID, // 根据行程段
                "SegmentID": SegmentId,
                "SegmentNumber": SegmentNumber,
                "DepartureDate": DepartureDate, // 根据行程段
                "AdultQuantity": requestData.AdultNum,
                "ChildQuantity": requestData.ChildNum,
                "IsSuperOrder": DataDetail.isSuperOrder
            };
            return {
                init: function () {
                    var me = this;
                    infoSelect.tips.toggleLoading('pop_loading', singleDom);
                    me.ajaxSingleLoad();
                    singleDomC.mask();
                    //关闭蒙版
                    singlePopClose.on('click', function () {
                        nowSingleSearchXHR.abort(); //关闭弹窗的时候手动absort 当前ajax请求
                        singleDomC.unmask();
                        singleDom.remove(); //关闭的时候下次点击重新请求 保证实时性
                    });
                },
                ajaxSingleLoad: function () {
                    var me = this,
                        Data = { query: cQuery.stringifyJSON(handleDateSingle) };
                    nowSingleSearchXHR = $.ajax({
                        url: DataDetail.api.getMoreSingle,
                        type: 'POST',
                        data: Data
                    })
                    .done(function (json) {
                        json = $.parseJSON(json);
                        //计算弹窗的差价
                        _.each(json.data, function (data) {
                            var selectedData = _.find(json.data, function (selectData) { return selectData.ResourceID == resourceId });
                            var selectedPrice = selectedData.Price;
                            selectedData.Select = 1;
                            if (data.Price > selectedPrice) {
                                data.priceDiff = '+¥' + (data.Price - selectedPrice);
                            }
                            else if (data.Price == selectedPrice) {
                                data.priceDiff = '--';
                            } else {
                                data.priceDiff = '-¥' + (selectedPrice - data.Price);
                            }
                        });
                        //查询成功
                        if (json.errno == 0 && json.data.length > 0) {
                            var singlePopHTML = singleTemplate(json);
                            singleDom.append(singlePopHTML);
                            infoSelect.tips.toggleLoading('pop_loading');
                            infoSelect.checkHeight(singleDom);
                            me.singleSelectUi(json.data);
                        }
                            //查询失败
                        else {
                            infoSelect.tips.toggleLoading('pop_loading');
                            infoSelect.tips.nothing('pop_nothing', singleDom);
                        }
                    })
                    .fail(function () {
                        if (nowSingleSearchXHR && nowSingleSearchXHR.statusText == 'abort') {

                        }
                        else {
                            alert('网络出错，请重试');
                        }

                    });
                },
                //选择其他单选项
                singleSelectUi: function (data) {
                    var singleTr = singleDom.find('.js_single_tr');
                    var selectDom = singleDom.find('.select_btn a');
                    singleTr.each(function (i, index) {
                        var single = new popOtherUi.OtherSingal({
                            nodeWrap: $(index),
                            data: data[$(index).data('index-in-data')]
                        });
                    });
                    //确定选择酒店 发布一个order-select-back事件，类型为single
                    selectDom.on('click', function () {
                        var trDom = $(this).parents('tr'),
                            trSegmentId = trDom.data('segment-id'),
                            trResourceId = trDom.data('resource-id'),
                            ChosedResource = {
                                AdultQuantity: requestData.AdultNum,
                                ChildQuantity: requestData.ChildNum,
                                DepartureDate: DepartureDate,
                                ProductID: trResourceId,
                                SegmentID: trSegmentId,
                                SegmentNumber: SegmentNumber,
                                type: 'single'
                            };
                        GV.emit('order-select-back', ChosedResource);
                        singleDomC.unmask();
                        singleDom.remove();
                    });
                }
            }
        },
        //选择其他保险弹窗
        chooseOtherOptional: function (data) {
            var requestData = data,
                renderData = requestData.BaoxianData,
                chosedResource = requestData.ChosedResource,
                resourceId = requestData.Node.data('resource-id'),
                optionalDom, optionalDomC;
            _.each(requestData.baoxianArr, function (baoxianIns) {
                var baoxianData = _.find(renderData, function (BaoxianData) { return BaoxianData.ResourceID == baoxianIns.getResourceId() });
                var count = baoxianData.changeCount = baoxianIns.getCurrentCount();
                var date = baoxianData.changeDate = baoxianIns.getCurrentDate();
                var currentInventory = _.find(baoxianData.Inventory, function (inventory) {
                    return util.isSameDay(inventory.Date, date);
                });
                var currentPrice = currentInventory.Price;
                baoxianData.changeTotal = util.decimal(currentPrice * count, 2);
            });
            return {
                init: function () {
                    var me = this,
                        optionalPopHTML = optionalTemplate(requestData);
                    $('body').append(optionalPopHTML);
                    optionalDom = $('#J_optional_select_pop');
                    optionalDomC = cQuery('#J_optional_select_pop');
                    infoSelect.checkHeight(optionalDom);
                    optionalDomC.mask();
                    me.optionalSelectUi(requestData);
                    //关闭蒙版
                    $('.J_optional_pop_close').on('click', function () {
                        optionalDomC.unmask();
                        optionalDom.remove(); //关闭的时候下次点击重新请求 保证实时性
                    });
                },
                //继承多选交互
                optionalSelectUi: function (json) {
                    this.optionTr = optionalDom.find('.js_option_tr');
                    this.optionals = [];
                    this.optionalSave = $('#J_optional_pop_confirm');
                    this.optionTr.each(_.bind(function (i, index) {
                        var optional = new popOtherUi.OtherOptional({
                            nodeWrap: $(index),
                            data: json.BaoxianData[$(index).data('index-in-data')]
                        });
                        this.optionals.push(optional);
                    }, this));
                    _.bindAll(this, 'onOkClick');
                    this.optionalSave.on('click', this.onOkClick);
                },
                onOkClick: function () {
                    this.optionTr.each(_.bind(function (i, index) {
                        var optionalIndex = $(index).data('index-in-data');
                        var optionalIns = this.optionals[i];
                        chosedResource[optionalIndex].UseCopies = optionalIns.getCurrentCount();
                        chosedResource[optionalIndex].UseDate = optionalIns.getCurrentDate();
                    }, this));
                    //保存保险,发布一个order-select-back事件，类型为optional
                    var choosedResource = {
                        type: 'optional',
                        ChosedResource: chosedResource
                    };
                    GV.emit('order-select-back', choosedResource);
                    optionalDomC.unmask();
                    optionalDom.remove();
                }
            }
        },
        //是否显示滚动条
        checkHeight: function (Dom) {
            var _dom = Dom,
              _wrapDom = _dom.find('.scroll_wrap');
            _wrapDom.height("auto");
            if (_wrapDom.height() >= 570) {
                _wrapDom.height("570px");
            } else {
                _wrapDom.css({ 'height': 'auto', 'overflow-y': 'hidden' })
            }
        }
    };
	/**
    * 动态显示隐藏预排领队
   
	var leaderWalk={
		init:function(){
			$.ajax({
				url:'',
				type:'GET',
				success:function(data){
					if(){
						$('#fy').parent().show();
					}
				}
			})
		}
	};
	 */
    /**
    * 滚动监听
    *
    * @class productDetailUi
    * @memberof vacation.detail
    */
    var scrollspyEvent = {
        resourceHeight: 69, //预定资源框的高度 默认为无内容的高度
        resourceTop: $('#js_order').offset().top,
        routeContentHeight: 0, //行程介绍高度
        routeContent: $('#js_detail_travelCtrip'),
        scrollspyBarDays: $("#js_route_days"),
        bookingBtn: $('#J_bar_booking_btn'),
        init: function () {
            var me = this;
            me.listenChange();
            me.barScrollEvent();
        },
        reInit: function () {     //行程介绍ajax加载之后，重新绑定事件
            this.routeContentHeight = 0;
            this.routeContent = $('#js_detail_travelCtrip');
            this.scrollspyBarDays = $("#js_route_days");

            //重新定位锚点并手动修正滚动bug
            $("#js_detail_tab").scrollspy({}).find("dd > a").first().addClass("below_current").siblings().removeClass("below_current");

            //行程滚动监听
            scrollspyEvent.scrollspyBarDays.find('a').on('click', function () {
                scrollspyEvent.scrollspyBarDays.scrollspy("to", $(this).attr("href"));
            });
            scrollspyEvent.scrollspyBarDays.scrollspy({
                offsetY: 10,
                onchange: function (hrefid, $hrefs, $targets) {//hrefs 触发标记 targets目标对象
                    $hrefs.removeClass("current");
                    $hrefs.filter("[href='#" + hrefid + "']").addClass("current");
                }
            });
            scrollspyEvent.barScrollEvent();        //重新初始化天数bar事件
        },
        listenChange: function () {
            var resourceDom = $('#js_order'),
                detailTab = $('#js_detail_tab'),
                detailTabLi = detailTab.find('li'),
                routeDayCount = scrollspyEvent.routeContent.find('li').not('.journey_end').length;
            if (IsTourGroupProduct) detailTabLi = detailTab.find('dd a');  //如果为多线路产品，tab区域的html结构不同
            //初始化滚动监听 scrollspy
            $(document).ready(function () {
                //tab滚动监听
                detailTab.find('a').on('click', function () {
                    detailTab.scrollspy("to", $(this).attr("href"));
                });
                detailTab.scrollspy({
                    offsetY: 60,
                    onchange: function (hrefid, $hrefs, $targets) {//hrefs 触发标记    
                        $hrefs.removeClass("current below_current");
                        var $curr = $hrefs.filter("[href='#" + hrefid + "']");
                        if ($curr.parent()[0].nodeName.toLowerCase() == "dd") {
                            $curr.addClass("below_current");
                        } else {
                            $curr.addClass("current");
                        }
                    }
                });
                //行程滚动监听
                scrollspyEvent.scrollspyBarDays.find('a').on('click', function () {
                    scrollspyEvent.scrollspyBarDays.scrollspy("to", $(this).attr("href"));
                });
                scrollspyEvent.scrollspyBarDays.scrollspy({
                    offsetY: 10,
                    onchange: function (hrefid, $hrefs, $targets) {//hrefs 触发标记 targets目标对象
                        $hrefs.removeClass("current");
                        $hrefs.filter("[href='#" + hrefid + "']").addClass("current");
                    }
                });
            });
            //点击行程介绍行程滚动复位
            detailTab.find('li:eq(0)').on('click', function () {
                scrollspyEvent.scrollspyBarDays.find('a').removeClass('current');
                scrollspyEvent.scrollspyBarDays.find('a:eq(0)').addClass('current');
            });
            //重新计算行程天数的锚点
            $('#route_day1').css({ 'margin-top': '-105px', 'position': 'absolute' });
            for (var i = 2; i < routeDayCount + 1; i++) {
                $('#route_day' + i).css({ 'margin-top': '-' + ((33 * i) + 4) + 'px', 'position': 'absolute' });
            }
            //监听地图接口，如果接口加载成功了，在行程介绍的第一天前加一个地图按钮
            GV.on('route-map-success', function () {
                $("#js_route_days a").removeClass("current");
                $("#js_route_days").prepend("<a class=\"current\" href=\"#route_Map\">地图</a>");
                $('#route_Map').css({ 'margin-top': '-105px', 'position': 'absolute' });
                for (var i = 1; i < routeDayCount + 1; i++) {
                    $('#route_day' + i).css({ 'margin-top': '-' + ((33 * (i + 1)) + 4) + 'px', 'position': 'absolute' });
                }
                scrollspyEvent.scrollspyBarDays.scrollspy({});
            })
            //监听是否存在签证和预订须知
            GV.on('is-exists', function (e) {
                if (e.type == 'expense') {
                    detailTabLi.eq(1).show();
                }
                if (e.type == 'order_needknow') {
                    detailTabLi.eq(2).show();
                }
                if (e.type == 'visa') {
                    detailTabLi.eq(3).show();
                }
            });
            //监听资源框的加载出来的高度
            GV.on('html-added-to-dom', function (e) {
                if (e.type == 'big_order' || e.type == 'fee_infos') {
                    scrollspyEvent.resourceHeight = resourceDom.outerHeight();
                    detailTab.scrollspy({});
                    scrollspyEvent.scrollspyBarDays.scrollspy({});
                    try {
                        detailTab.trigger('scroll');
                        scrollspyEvent.scrollspyBarDays.trigger('scroll');
                    } catch (erro) { }
                }
                //签证和预定须知是异步加载进来的，当监听到加载完后重新渲染scrollspy以重新定位锚点
                if (e.type == 'needknow_visa') {
                    detailTab.scrollspy({})
                        .find("dd > a").first().addClass("below_current").siblings().removeClass("below_current");      //手动修正滚动bug。会引入新的bug，不过比起修正的这个要好得多:D
                }
            });
            //监听资源框里面交互产生的高度变化
            GV.on('resource-box-height-changed', function () {
                scrollspyEvent.resourceHeight = resourceDom.outerHeight();
                detailTab.scrollspy({});
                scrollspyEvent.scrollspyBarDays.scrollspy({});
                try {
                    detailTab.trigger('scroll');
                    scrollspyEvent.scrollspyBarDays.trigger('scroll');
                } catch (erro) { }
            });
            //监听点击详细行程和简单行程
            GV.on('route-tab-click', function () {
                scrollspyEvent.routeContentHeight = scrollspyEvent.routeContent.outerHeight();
                detailTab.scrollspy({});
                scrollspyEvent.scrollspyBarDays.scrollspy({});
            });
            // //监听用户点评分页切换
            GV.on('dp-tab-click', function () {
                detailTab.scrollspy({});
            });
            // //立即预定按钮
            scrollspyEvent.bookingBtn.on('click', function () {
                $("html,body").stop(false, true).animate({
                    scrollTop: scrollspyEvent.resourceTop
                }, 200);
                $(this).css('display', 'none');
            });
        },
        barScrollEvent: function () {
            var barShow = function () {
                var scrollTop = $(window).scrollTop(),
                    ie6ClearTime,
                    scrollspyBar = $(".detail_tab"),
                    dayScrollTrigger = $('.product_feature').outerHeight() + $('.route_tab').outerHeight() + 70,
                    tabOffsetLeft = $('#js_detail_tab').offset().left,
                    scrollTrigger = scrollspyEvent.resourceTop + scrollspyEvent.resourceHeight + 20,
                    detailTabWrap = $("#js_detail_tab").parent(),
                    paddingTop = detailTabWrap.outerHeight();
                scrollspyEvent.routeContentHeight = scrollspyEvent.routeContent.outerHeight();
                if (scrollTop >= scrollTrigger) {
                    if (IsTourGroupProduct) detailTabWrap.next().css("padding-top", paddingTop);   //解决fixed时由于元素脱离文档流而产生的的跳动问题
                    scrollspyBar.css({
                        position: "fixed",
                        top: 0,
                        "z-index": 99
                    });
                    scrollspyEvent.bookingBtn.css('display', 'inline-block');
                    //ie6
                    if (navigator.appVersion.indexOf("MSIE 6") > -1) {
                        $('.vacation_bd').css("position", "relative");
                        clearTimeout(ie6ClearTime);
                        ie6ClearTime = setTimeout(function () {
                            scrollspyBar.css({
                                position: "absolute",
                                top: scrollTop - 153,
                                "z-index": 99
                            });
                        }, 300);
                    }
                }
                else {
                    if (IsTourGroupProduct) detailTabWrap.next().css("padding-top", 0);
                    scrollspyBar.css({
                        position: "",
                        top: ""
                    });
                    scrollspyEvent.bookingBtn.css('display', 'none');
                }
                //非ie6才显示行程天数bar
                if (navigator.appVersion.indexOf("MSIE 6") <= -1) {
                    if (scrollTop >= scrollTrigger + dayScrollTrigger) {
                        scrollspyEvent.scrollspyBarDays.css({
                            position: "fixed",
                            top: IsTourGroupProduct ? "92px" : "39px",
                            "z-index": 99,
                            left: tabOffsetLeft + 21
                        });
                    }
                    else {
                        scrollspyEvent.scrollspyBarDays.css({
                            position: "absolute",
                            top: "",
                            left: 0
                        });
                    }
                    //判断行程天数bar显示
                    if (scrollTop >= (scrollTrigger + dayScrollTrigger + scrollspyEvent.routeContentHeight - scrollspyEvent.scrollspyBarDays.height())) {
                        scrollspyEvent.scrollspyBarDays.hide();
                    }
                    else {
                        scrollspyEvent.scrollspyBarDays.show();
                    }

                }
            };
            // 页面载入时先运行一下，防止当页面打开时已经在出现fix定位时显示行程天数bar
            barShow();
            $(window).off(".detailScroll").on('scroll.detailScroll resize.detailScroll', barShow);
        }
    };

    /**
    * 多线路tab交互及ajax加载
    * frao@ctrip.com
    * 2014-04-02 added
    */
    var getTourIntroductionXHR;
    var tourGroupTab = {
        init: function () {
            var js_detail_tab = $("#js_detail_tab"),
                line_tabs = js_detail_tab.find("dt > a"),
                detail_tabs = js_detail_tab.find("dd > a"),
                current_class = "inner_current",
                detail_current_class = "below_current";
            var mthis = this;
            js_detail_tab.find("a").not(line_tabs).on("click", function (e) {       //锚点精准定位
                var h = $($(this).attr("href")).offset().top;
                $(window).scrollTop(h - 45);
                e.preventDefault();
            });
            line_tabs.on("click", function (e, type) {         //多线路tab点击切换
                $(this).addClass(current_class).siblings().removeClass(current_class);
                detail_tabs.first().addClass(detail_current_class).siblings().removeClass(detail_current_class);
                mthis.tips.loading("tourGroupTab" + $(this).attr("pid"), $("#js_detail"));
                detail_tabs.not(":first").hide();
                $("#js_expense, #js_order_needknow, #js_visa").hide();
                //先中断上次的ajax
                if (getTourIntroductionXHR) {
                    getTourIntroductionXHR.abort();
                    getTourIntroductionXHR = undefined;
                }
                getTourIntroductionXHR = $.ajax({
                    url: DataDetail.api.getTourIntroduction,
                    type: "GET",
                    data: {
                        ProductID: $(this).attr("pid")
                    }
                }).done(function (data) {
                    if (!data) {
                        mthis.tips.none("tourGroupTab" + $(this).attr("pid"), $("#js_detail"));
                        return;
                    }
                    $("#js_detail").replaceWith(data);
                    scrollspyEvent.reInit();    //包含行程滚动监听及事件
                    v_dp.reInit();      //包含邮件订阅、简单行程复杂行程切换、小图滑动显示大图
                    needknow.init(line_tabs.filter(function () {        //请求费用包含-预定须知-签证/签注ajax加载
                        return $(this).hasClass("inner_current");
                    }).attr("pid"), type);
                }).fail(function () {
                    mthis.tips.nothing("tourGroupTab" + $(this).attr("pid"), $("#js_detail"));
                });
            });
            GV.on("tour-group-tab-change", function (id) {      //监听多线路切换事件
                if (id) {
                    line_tabs.filter(function () {
                        return $(this).attr("pid") == id;
                    }).trigger("click", "ResourceTourGroupTabChange");
                } else {
                    line_tabs.first().trigger("click", "ResourceTourGroupTabChange");
                }
            });
            detail_tabs.on("click", function () {       //行程介绍、费用、预订须知、签证须知tab点击切换
                $(this).addClass(detail_current_class).siblings().removeClass(detail_current_class);
            });
        },
        tips: {
            /*加载中提示*/
            loading: function (pId, pElement) {
                var _loading = $('#' + pId);
                if (!_loading.length) {
                    _loading = $('<div class="c_loading detail_loading" id="' + pId + '"/>');
                    pElement.html(_loading.html('<img alt="" src="http://pic.c-ctrip.com/packages111012/loading_50-0816.gif"><strong>查询中，请稍候...</strong>'));
                } else {
                    _loading.remove();
                }
            },
            /*错误提示*/
            nothing: function (pId, pElement) {
                var _nothing = $('<p  data-type="' + pId + '" style="padding-top:15px;"/>');
                pElement.html(_nothing.html('对不起，网络异常，请尝试刷新或者重新翻页...'));
            },
            none: function (pId, pElement) {
                var _nothing = $('<p  data-type="' + pId + '" style="padding-top:15px;" />');
                pElement.html(_nothing.html('暂无该产品介绍！'));
            }

        }
    }

    /**
    * 产品详情交互
    *
    * @class productDetailUi
    * @memberof vacation.detail
    */
    var productDetailUi = {
        init: function () {
            var cityDom = $('.product_city'),
                cityDomMore = cityDom.children('.link_wrap'),
                cityNextDom = cityDom.children('.city'),
                routeDom = $('.product_more'),
                routeDomMore = routeDom.children('.link_wrap'),
                routeNextDom = routeDom.children('.line'),
                ajaxUrl = cityDom.data('ajax-url'),
                cityItems = cityDomMore.find('a'),
                hoverTimer = null,
                useRemark = $('.comment_wrap'),
                moreRouteRemark = $('.more_route'),
				sUserAgent = navigator.userAgent.toLowerCase(),
				bIsIpad = sUserAgent.match(/ipad/i) == "ipad",
                productScroll = $('.product_scroll_wrap');
            //存在更多出发地时
            if (cityDomMore.length) {
                cityDom.on({
                    'mouseenter': function () {
                        clearTimeout(hoverTimer);
                        cityNextDom.addClass('city_spread');
                        routeNextDom.removeClass('line_spread');
                        cityDomMore.slideDown('fast');
                        routeDomMore.slideUp('fast').stop(true, true);
                        //增加pad关闭按钮
                        if (bIsIpad) {
                            var pad_close = $('.close_for_ipad').length;
                            if (pad_close == 0) {
                                var html = '<div class="close_for_ipad"><span>[关闭]</span></div>'
                                $('.link_wrap').append(html);
                            }
                            $('.close_for_ipad').click(function () {
                                $(this).parent().hide();
                                cityNextDom.removeClass('city_spread');
                            });
                        }

                    },
                    'mouseleave': function () {
                        hoverTimer = setTimeout(function () {
                            cityNextDom.removeClass('city_spread');
                            cityDomMore.slideUp('fast');
                        }, 300);
                    }
                });
                cityItems.each(function (i, index) {
                    $(index).on('click', function () {
                        $.post(ajaxUrl + "?" + $(index).data('param'), function (data) {
                            if (data == "T") {
                                window.location.reload();
                            }
                        });
                    });
                });
            }
            else {
                cityDom.find('b').hide();
                cityDom.find('.city').css('cursor', 'default');

            }
            //用户点评跳转
            useRemark.on('click', function () {
                $("html,body").stop(false, true).animate({
                    scrollTop: $('#yhdp').offset().top
                }, 200);
            });
            if ($('#simple_route_div').height() > 72) {
                $('.more_route_wrap').show();
            }
            //详细行程
            moreRouteRemark.on('click', function () {
                var parent = $(this).parent().parent();
                parent.toggleClass('height_auto');
                if ($(this).hasClass('fold')) {
                    $(this).removeClass('fold').text('展开全部>>').siblings('b').show();
                }
                else {
                    $(this).addClass('fold').text('收起>>').siblings('b').hide();
                }
            });
        }
    };

    /**
    * 悬浮工具条交互
    *
    * @class rightToolBar
    * @memberof vacation.detail
    */
    var rightToolBar = {
        init: function () {
            var me = this;
            me.clientServe();
            me.weiboShare();
            me.GoTop();
            me.Email();
        },
        //在线客服
        clientServe: function () {
            var _client = $('.J_bar_clientServe'),
                _url = _client.data('href'),
                _paramStr = _url.split("?")[1],
                _arr = _paramStr.split("&");
            _client.on('click', function () {
                var _obj = {};
                for (var i = 0, l = _arr.length; i < l; i++) {
                    var _t = _arr[i].split("=");
                    _obj[_t[0]] = _t[1];
                }
                window.open(_url);
            });
        },
        //微博分享
        weiboShare: function () {
            var _container = $('#J_bar_share'),
                _as = _container.find('a');
            sUserAgent = navigator.userAgent.toLowerCase(),
            bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
            _container
                    .on('mouseover', function () {
                        $(this).removeClass('disable').addClass('current');
                        //增加pad关闭按钮
                        if (bIsIpad) {
                            var pad_close = $('.label_ipad_close').length;
                            if (pad_close == 0) {
                                var html = '<a href="###" class="label_ipad_close"></a>';
                                $('.label_list_coentent.basefix').prepend(html);
                            }
                            $('.label_ipad_close').click(function () {
                                $(this).parent().parent().removeClass('current').addClass('disable');
                            });
                        }
                    })
                    .on('mouseleave', function () {
                        $(this).removeClass('current').addClass('disable');
                    });
            _as.each(function (i, index) {
                if ($(index).data('share') != null) {
                    $(index).on('click', function () {
                        SNS.share($(index).data('share'));
                    });
                }
            });
        },
        //返回顶部
        GoTop: function () {
            var sHeight = $(window).height(),
                _dom = $('#J_bar_totop'),
                routeDom = $('#J_bar_toroute'),
                _container = _dom.parent();
            action = function () {
                var me = this,
                        sTop = $(window).scrollTop();
                if (sTop > 300) {
                    _dom.fadeIn();
                } else {
                    _dom.fadeOut();
                }
            },
                repairIE6Fix = function () {
                    var sTop = $(window).scrollTop(),
                        correctPos;
                    clearTimeout(correctPos);
                    correctPos = setTimeout(function () {
                        _container.css({
                            'position': 'absolute',
                            'top': sTop + ($(window).height() / 2)
                        });
                    }, 300);
                },
                init = function () {
                    var me = this;
                    // 页面载入时先运行一下，防止当页面打开时已经在第一屏以下时不显示按钮
                    action.call(me);
                    $(window)
                        .on('scroll resize', function () {
                            action.call(me);
                            if (navigator.appVersion.indexOf("MSIE 6") > -1) {
                                repairIE6Fix.call(me);
                            }
                        });
                    _dom.on('click', function () {
                        $("html,body").stop(false, true).animate({
                            scrollTop: 0
                        }, 200);
                    });
                    routeDom.on('click', function () {
                        $("html,body").stop(false, true).animate({
                            scrollTop: $('.route_tab').offset().top - 50
                        }, 200);
                    });
                };
            init();
        },
        //email
        Email: function () {
            var me = this,
                _container = $("#FuncLab_Email"),
                _containerC = cQuery("#FuncLab_Email"),
                _baseInfo = _container.attr("data-param") || {},
                _url = _container.attr("data-url"),
                _regEmail = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/,
                _btnHide = _container.find("a")[0],
                _btnShow = document.getElementById("FuncLab_SNS_Email"),
                _btnSubmit = document.getElementById("FuncLab_Email_Submit"),
                _btnChangeImg = document.getElementById("FuncLab_Email_VarReImg"),
                _imgCode = document.getElementById("FuncLab_Email_VerImg"),
                _verificationUrl = _imgCode.src,
                _tabel = document.getElementById("FuncLab_Email_Table"),
                _inputEmails = _container.find("INPUT:gt(1):lt(5)"),
                _tips = _container.find(".js_email_notice"),
                _thisUrl = location.href,
                _thisUrlHander = _thisUrl.indexOf('&') === -1 ? _thisUrl : _thisUrl.substring(0, _thisUrl.lastIndexOf('&')),
                _currentURl = encodeURIComponent(encodeURIComponent(_thisUrlHander)),
                _pkgname = $.trim($('h1').text()) || "",
                _valid,
                _dataElement = {
                    name: document.getElementById("FuncLab_Email_Name"),
                    from: document.getElementById("FuncLab_Email_From"),
                    code: document.getElementById("FuncLab_Email_Ver")
                },
                _default = _dataElement.from.getAttribute("data-default"),
                reVerification = function () {
                    var _t = (new Date()).getMilliseconds(),
                        _r = Math.random() * _t * 10000;
                    _imgCode.src = _verificationUrl + "&release=" + _r;
                },
                clear = function () {
                    _dataElement.name.value = "";
                    _dataElement.from.value = _default;
                    _dataElement.code.value = "";
                    for (var i = 0, l = _inputEmails.length; i < l; i++) {
                        _inputEmails[i].value = _default;
                    }
                    _tabel.style.display = "";
                    for (var i = 0, l = _tips.length; i < l; i++) {
                        _tips[i].style.display = "none";
                    }
                },
                getData = function () {
                    var _data = {
                        name: encodeURIComponent(encodeURIComponent(_dataElement.name.value)),
                        url: _currentURl,
                        from: _dataElement.from.value,
                        code: _dataElement.code.value,
                        pkgname: _pkgname
                    },
                        _send = [],
                        _returnArr = [];
                    for (var i = 0, l = _inputEmails.length; i < l; i++) {
                        _inputEmails[i].value !== _default && _send.push(_inputEmails[i].value);
                    }
                    _data.to = _send.join(";");
                    for (var k in _data) {
                        _returnArr.push([k, _data[k]].join("="));
                    }
                    return _returnArr.join("&") + "&" + _baseInfo;
                },
                handleResult = function (data) {
                    switch (data) {
                        //10+                                                  
                        case '0':
                            _tabel.style.display = "none";
                            _tips[0].style.display = "";
                            reVerification.call(me);
                            break;
                            //success                                                  
                        case '1':
                            _tabel.style.display = "none";
                            _tips[1].style.display = "";
                            reVerification.call(me);
                            break;
                            //error                                                  
                        case '2':
                            _tabel.style.display = "none";
                            _tips[2].style.display = "";
                            reVerification.call(me);
                            break;
                            //验证码                                                  
                        case '3':
                            _valid.showTip(_dataElement.code, "验证码错误");
                            reVerification.call(me);
                            break;
                    }
                },
                init = function () {
                    var me = this;
                    $(_btnShow).bind("click", function () {
                        clear.call(me);
                        _containerC.mask();
                    });

                    $(_btnHide).bind("click", function () {
                        _containerC.unmask();
                    });
                    $(_btnChangeImg).bind("click", function () {
                        reVerification.call(me);
                    });
                    _valid = new Validation.ValidateForm({
                        FuncLab_Email_Name: {
                            required: {
                                err: "请填写您的姓名"
                            }
                        },
                        FuncLab_Email_From: {
                            required: {
                                err: "请输入您的邮箱"
                            },
                            email: {
                                err: "请输入正确的邮箱"
                            }
                        },
                        FuncLab_Email_To1: {
                            email: {
                                err: "请输入正确的邮箱"
                            },
                            delegate: {
                                args: [
                                    function () {
                                        for (var i = 0, l = _inputEmails.length; i < l; i++) {
                                            if (_inputEmails[i].value !== _inputEmails[i].getAttribute("data-default") && _regEmail.test(_inputEmails[i].value)) {
                                                return true;
                                            }
                                        }
                                        return false;
                                    }
                                ],
                                err: "请至少输入一个有效的送达邮箱"
                            }
                        },
                        FuncLab_Email_To2: {
                            email: {
                                err: "请输入正确的邮箱"
                            }
                        },
                        FuncLab_Email_To3: {
                            email: {
                                err: "请输入正确的邮箱"
                            }
                        },
                        FuncLab_Email_To4: {
                            email: {
                                err: "请输入正确的邮箱"
                            }
                        },
                        FuncLab_Email_To5: {
                            email: {
                                err: "请输入正确的邮箱"
                            }
                        },
                        FuncLab_Email_Ver: {
                            required: {
                                err: "请输入验证码"
                            }
                        }
                    }, function () {
                        $.post(_url, getData(), function (data) {
                            handleResult.call(me, data)
                        })
                    }, false);
                    $(_btnSubmit).bind("click", function (event) {
                        _valid.trigger(event);
                    });
                };
            init();
        }
    };

    /**
    * 微博分享
    *
    * @class SNS
    * @memberof vacation.detail
    */
    var SNS = {
        ShareUrl: {
            sina: "http://service.weibo.com/share/share.php?url={$url}&title={$content}&pic={$pic}&appkey=968446907",
            qq: "http://v.t.qq.com/share/share.php?url={$url}&title={$content}&pic={$pic}&appkey=e5d288d65a1143e59c49231879081bb0&site=www.ctrip.com",
            renren: "http://share.renren.com/share/buttonshare?link={$url}&title={$content}",
            qzone: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={$url}&title={$content}&pics={$pic}&site={$from}",
            kaixin: "http://campaign.ctrip.com/Destinations/fenxiang/fenxiang.asp?type=1&url={$url}&ti={$content}",
            douban: "http://campaign.ctrip.com/Destinations/fenxiang/fenxiang.asp?type=5&url={$url}&ti={$content}",
            souhu: "http://t.sohu.com/third/post.jsp?url={$url}&title={$content}&pic={$pic}&appkey=&content=utf-8",
            163: "http://t.163.com/article/user/checkLogin.do?info={$content}{$url}&images={$pic}&togImg=true&link=http://www.ctrip.com/&source={$from}"
        },
        ShareInfo: {
            content: encodeURIComponent(document.title),
            url: encodeURIComponent(document.location),
            pic: (function () {
                var result = [];
                var pic_list = document.getElementById("player-pic-list");
                if (pic_list) {
                    pic_list = pic_list.getElementsByTagName("img");
                    if (pic_list && pic_list.length) {
                        for (var i = 0, l = pic_list.length; i < l; i++) {
                            result[i] = pic_list[i].getAttribute("bsrc");
                        }
                    }
                }
                return {
                    sina: result.join("||"),
                    qq: result.join("|"),
                    qzone: result.join("|"),
                    souhu: result.length ? result[0] : "",
                    163: result.join(",")
                };
            })(),
            from: encodeURIComponent("携程旅行网")
        },
        share: function (type) {
            var shareUrl = SNS.ShareUrl,
                shareInfo = SNS.ShareInfo;
            window.open(shareUrl[type].replace(/\{\$(\w+)\}/g, function (all, key) {
                if (key === "pic") {
                    return shareInfo.pic[type];
                } else {
                    return shareInfo[key];
                }
            }), '', 'width=700, height=680, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no');
        }
    };

    /**
    * email验证
    *
    * @class Validation
    * @memberof vacation.detail
    */
    var Validation = {};
    var _regEmail = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/,
        _regNum = /^\d+$/,
        _regInteger = /^\-?\d+$/,
        _regDecimal = /^\-?\d*\.?\d+$/,
        _regChinese = /[^\u4e00-\u9fa5]/,
        _regIdCard = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[A-Z])$/,
        _regMobilePhone = /^([0-9]{11})?$/,
        _regTirm = /\s|\t|\n|\r/g;
    Validation.position = function (pObj) {
        var _left = pObj.offsetLeft || 0,
                _top = pObj.offsetTop || 0;
        while (pObj = pObj.offsetParent) {
            _left += eval(pObj.offsetLeft);
            _top += pObj.offsetTop;
        }
        return { x: _left, y: _top };
    };
    Validation.ValidateForm = function (pFields, pCallBack, pIsAuto, pErrorTemplate) {
        var _felids = pFields,
            _callBack = pCallBack,
            _errorContainer = document.createElement("DIV"),
        /*
        * {id:dom} errTip
        */
            _errorTips = {},
        /*
        * {id:dom} field inputs
        */
            _inputs = {};
        this.ErrorIptClass = "input_error";
        this.ErrorIptClassReg = new RegExp(this.ErrorIptClass);
        this.ErrorTipTemplate = pErrorTemplate || '<b></b><i></i><div class="alert_info">$text$</div>';
        //"<div class=\"c_alertinfo\">$text$</div>";
        /*
        * when ipt onfoucs
        */
        this.onIptFoucs = function (event) {
            var _target = event.target || event.srcElement,
                _id = _target.id,
                _def = _target.getAttribute("data-default");
            _def != null && _target.value === _def && (_target.value = "");
            if (_errorTips[_id]) {
                _errorTips[_id].style.display = "none";
                $(_target).removeClass(this.ErrorIptClass);
            }
            $(_target).removeClass("input_default");
        };
        /*
        * when ipt onblur
        */
        this.onIptBlur = function (event) {
            var me = this,
                _target = event.target || event.srcElement,
                _id = _target.id,
                _def = _target.getAttribute("data-default");
            if (_def != null && _target.value.replace(_regTirm, "") === "") {
                _target.value = _def;
                $(_target).addClass("input_default");
            }
            me.checkRules.call(me, _id, _felids[_id]);
        };

        /*
        * target check
        */
        this.trigger = function (event) {
            var me = this,
                _sign = true;
            me.hideTip.call(me);
            for (var key in _felids) {
                if (!me.checkRules.call(me, key, _felids[key])) {
                    _sign = false;
                    break;
                }
            }
            if (_sign) {
                typeof _callBack === "function" && _callBack();
            } else {
                event.stopPropagation();
                event.preventDefault();
            }
        };
        /*
        * check one rule
        */
        this.checkRules = function (pId, pRules) {
            var me = this,
                _ipt = _inputs[pId],
                _rules = pRules,
            //temp arguments
                _tempArr,
            //temp point
                _args;
            for (var key in _rules) {
                if (typeof me.Check[key] === "function") {
                    //get params
                    _tempArr = [_ipt];
                    _args = _rules[key].args;
                    if ($.isArray(_args)) {
                        for (var i = 0, l = _args.length; i < l; i++) {
                            _tempArr.push(_args[i]);
                        }
                    }
                    //get return
                    if (!me.Check[key].apply(me, _tempArr)) {
                        me.showTip.call(me, _ipt, _rules[key].err);
                        return false
                    }
                }
            }
            return true
        };
        /*
        * hide all errors
        */
        this.hideTip = function () {
            for (var i in _errorTips) {
                _errorTips[i].style.display = "none";
            }
            for (var j in _inputs) {
                _inputs[j].className !== undefined && (_inputs[j].className = _inputs[j].className.replace(this.ErrorIptClassReg, ""));
            }
        };
        /*
        * show or create an error tip
        */
        this.showTip = function (pIpt, pError) {
            var me = this,
                _tip = _errorTips[pIpt.id];
            if (_tip) {
                _tip.style.display = "";
                _tip.innerHTML = me.ErrorTipTemplate.replace(/\$text\$/, pError);
            } else {
                me.createTip.call(me, pIpt, pError);
            }
            $(pIpt).addClass(this.ErrorIptClass);
        };
        /*
        * can be override
        */
        this.createTip = function (pDom, pText) {
            var me = this,
                _div = document.createElement("DIV"),
                _pos = Validation.position(pDom);
            _div.style.position = "absolute";
            _div.className = "base_alert";
            _div.innerHTML = me.ErrorTipTemplate.replace(/\$text\$/, pText);
            _div.style.top = _pos.y + "px";
            _div.style.left = _pos.x + pDom.offsetWidth + "px";
            //Add
            _errorContainer.appendChild(_div);
            _errorTips[pDom.id] = _div;
        };
        /*
        * reset the position of tips
        */
        this.onResize = function () {
            var _point, _pos, _div;
            for (var i in _errorTips) {
                _div = _errorTips[i];
                _point = _inputs[i];
                _pos = Validation.position(_point);
                _div.style.top = _pos.y + "px";
                _div.style.left = _pos.x + _point.offsetWidth + "px";
            }
        };
        /*
        * initail
        */
        this.init = function (pIsAuto) {
            var me = this,
                _tempPoint;
            document.getElementsByTagName("BODY")[0].appendChild(_errorContainer);
            for (var key in _felids) {
                _tempPoint = document.getElementById(key);
                _tempPoint && (_inputs[key] = _tempPoint);
            }
            $(window).bind("resize", function () {
                me.onResize.call(me);
            });
            if (pIsAuto) {
                for (var k in _inputs) {
                    var _def = _inputs[k].getAttribute("data-default");
                    if (_def != null && _inputs[k].value.replace(_regTirm, "") === "") {
                        _inputs[k].value = _def;
                        $(_inputs[k]).addClass("input_default");
                    }
                    $(_inputs[k]).bind("blur", function (event) {
                        me.onIptBlur.call(me, event);
                    });
                    $(_inputs[k]).bind("focus", function (event) {
                        me.onIptFoucs.call(me, event);
                    });
                }
            } else {
                for (var k in _inputs) {
                    var _def = _inputs[k].getAttribute("data-default");
                    if (_def != null) {
                        _inputs[k].value = _def;
                        $(_inputs[k]).addClass("input_default");
                        $(_inputs[k]).bind("blur", function (event) {
                            var _dom = event.target,
                                _default = _dom.getAttribute("data-default") || "";
                            if (_dom.value.replace(_regTirm, "") === "") {
                                _dom.value = _default;
                                $(_dom).addClass("input_default");
                            }
                        });
                        $(_inputs[k]).bind("focus", function (event) {
                            var _dom = event.target,
                                _default = _dom.getAttribute("data-default") || "";
                            if (_dom.value === _default) {
                                _default && (_dom.value = "");
                            }
                            $(_dom).removeClass("input_default");
                        });
                    }
                }
                $(document.body).bind("click", function () {
                    me.hideTip.call(me);
                });
            }
        };
        this.init(pIsAuto);
    };
    /*
    * check method
    */
    Validation.ValidateForm.prototype = {
        Check: {
            required: function (pIpt) {
                if (pIpt.type == "checkbox") {
                    return (pIpt.checked === true)
                }
                return pIpt.value != null && pIpt.value != pIpt.getAttribute("data-default") && pIpt.value.replace(_regTirm, "") !== "";
            },
            requiredOrDefault: function (pIpt) {
                if (pIpt.type == "checkbox") {
                    return (pIpt.checked === true)
                }
                return pIpt.value != null && pIpt.value.replace(_regTirm, "") !== "";
            },
            matchOne: function (pIpt, values) {
                var _val = pIpt.value
                for (var key in values) {
                    if (_val === values[key]) return true;
                }
                return false;
            },
            matchAll: function (pIpt, values) {
                var _val = pIpt.value
                for (var key in values) {
                    if (_val !== values[key]) return false;
                }
                return true;
            },
            matchNone: function (pIpt, values) {
                var _val = pIpt.value
                for (var key in values) {
                    if (_val === values[key]) return false;
                }
                return true;
            },
            email: function (pIpt) {
                return _regEmail.test(pIpt.value);
            },
            emails: function (pIpt, pChar, pMax) {
                var _arr = pIpt.value.split(pChar),
                    _l = _arr.length;
                if (pMax !== undefined && _l > pMax) {
                    return false;
                }
                for (var key = 0; key < _l; key++) {
                    if (!_regEmail.test(_arr[key])) return false;
                }
                return true;
            },
            idCard: function (pIpt) {
                return _regIdCard.test(pIpt.value);
            },
            mobilePhone: function (pIpt) {
                return _regMobilePhone.test(pIpt.value);
            },
            num: function (pIpt) {
                return _regNum.test(pIpt.value);
            },
            numInteger: function (pIpt) {
                return _regInteger.test(pIpt.value);
            },
            numDecimal: function (pIpt) {
                return _regDecimal.test(pIpt.value);
            },
            chinese: function (pIpt) {
                return _regChinese.test(pIpt.value);
            },
            len: function (pIpt, pMin, pMax) {
                var _len = pIpt.value.length;
                return _len > pMin && _len < pMax;
            },
            lenTrim: function (pIpt, pMin, pMax) {
                var _len = pIpt.value.replace(_regTirm, "").length;
                return _len > pMin && _len < pMax;
            },
            lenChinese: function (pIpt, pMin, pMax) {
                var _len = 0,
                    _val = pIpt.value;
                for (var i = 0; i < _val.length; i++) {
                    _len += _val.charAt(i) > '~' ? 2 : 1;
                }
                return _len > pMin && _len < pMax;
            },
            lenChineseTrim: function (pIpt, pMin, pMax) {
                var _len = 0,
                    _val = pIpt.value.replace(_regTirm, "");
                for (var i = 0; i < _val.length; i++) {
                    _len += _val.charAt(i) > '~' ? 2 : 1;
                }
                return _len > pMin && _len < pMax;
            },
            numRange: function (pIpt, pMin, pMax, pIsMinClouser, pIsMaxClouser) {
                var _val = pIpt.value;
                return (_val > pMin || (pIsMinClouser && _val === pMin)) && (_val < pMax || (pIsMaxClouser && _val === pMax));
            },
            attrExist: function (pIpt, pAttr) {
                return pIpt.getAttribute(pAttr) != null;
            },
            attrEq: function (pIpt, pAttr, pEq) {
                return pIpt.getAttribute(pAttr) == pEq;
            },
            attrReg: function (pIpt, PAttr, pReg) {
                var _attrValue = pIpt.getAttribute("pAttr");
                return typeof _attrValue === "string" && pReg.test(_attrValue);
            },
            delegate: function (pIpt, pDelegate) {
                return pDelegate(pIpt);
            },
            delegate2: function (pIpt, pDelegate) {
                return pDelegate(pIpt);
            }
        }
    };

    GV.ready(function () {
        infoSelect.init();
        scrollspyEvent.init();
        productDetailUi.init();
        rightToolBar.init();
        if (IsTourGroupProduct) tourGroupTab.init();
    });
});
