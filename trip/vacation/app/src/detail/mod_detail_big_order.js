//详情页预定部分
define(function (require, exports, module) {
    var $ = require("../../../lib/jquery"),
		_ = require("../../../lib/underscore"),
		EventEmitter = require("Modules/EventEmitter"),
		util = require('./mod_util'),
		OrderHotel = require('../Modules/HotelSelect'),
		OrderFlight = require('./mod_detail_big_order_flight'),
		orderOther = require('./mod_detail_big_order_other');

	var singletonManager = require('./mod_detail_singletonManager');
	var dataManager = require('./mod_detail_dataManager');
	var Selector = require('../Modules/SelectBase');

	var orderbar = require('./mode_detail_orderbar_fix');

	Handlebars.registerPartial("RoomList", require('tpl/detail/hotel_room_list.html.js'));
	var tplOrder = Handlebars.compile(require('tpl/detail/big_order.html.js'));

     
	var DataDetail = GV.app.detail;
	// 干脆把预定顶部条的数据都放在这里，方便到处使用，及时更新这里就可以了
	// 只有 ajax返回后改变，因为 1.点击日历后；2.改变成人数、儿童数后  都会 ajax 请求，所以只需ajax后改变即可
	var barTopDate, barTopAdultPrice, barTopChildPrice,
        barTopAdultCount = Math.max(DataDetail.data.MinPersonQuantity, 2),
        barTopChildCount = DataDetail.data.MinChild;

	var apiGetBigOrder = DataDetail.api.getBigOrder;

	var resourceSearchJSON;
	// 这个日期就是点击的日历的那个date，并且只能通过更换点击日历来改变，
	var resourceSearchDepartureDate;
	var nodeOrderWrap;


	GV.ready(function () {
	    nodeOrderWrap = $('#js_order');
	});

    // 没有可用日期
		/*
    * @param {String} [msg = '']
		*/
	GV.on('calendar_no_available', function (date, msg) {
	    changeOrderHtml({
	        isFetchFail: true,
	        isServerError: false,
	        errmsg: msg,
	        InitTopbar: true,
	        InitError: true,
			BaseInfo:{
				DepartureDate: date
			}
	    });
	});

	GV.on('init-resource-search', function () {
		changeOrderHtml({
			isStartup: true,
			InitTopbar: true,
            isInitStatus: true
		});
	});

	var prevReloadResourceSearchXHR, nowReloadResourceSearchXHR;
	var prevBookingXHR, nowBookingXHR;
	GV.on('reload-resource-search', function (data) {
	    if (orderbar.getStatus() == orderbar.STATUS.FIXED) {
	        var top = $('#js_order').offset().top;
	        $(window).scrollTop(top);
	    }

        // 如果这个产品被限制了，就不会执行任何操作
	    if (!DataDetail.data.ProductStatus) return;

	    // Date | MinPrice 是日历点击时传
	    // prevJSON | ChosedResource 是弹出框返回后刷新资源框时传
	    var date = data.Date || resourceSearchDepartureDate,
            minPrice = dataManager.calendar.getMinPrice(date),
            prevJSON = data.prevJSON,
            productType = DataDetail.data.ProductCategoryType,
            ChosedResource = data.ChosedResource;
	    resourceSearchDepartureDate = date;
	    GV.emit('set-resourceSearchDepartureDate', resourceSearchDepartureDate);
	    //成人可以选择为在游学页面0
	    barTopAdultCount = productType === "StudyTour" ? (barTopAdultCount || 0):(barTopAdultCount || 2);
	    barTopChildCount = barTopChildCount || 0;
        //当总人数为0时提示不请求接口
	    if ((barTopAdultCount + barTopChildCount) < DataDetail.data.MinPersonQuantity) {
         cQuery.mod.load('validate', '1.1', function () {
	            var ins = cQuery(document).regMod('validate', '1.1');
	            ins.method('show', {
	                $obj: cQuery('.tourist_num input'),
	                data: '订单总人数不可少于' + DataDetail.data.MinPersonQuantity + '人'
	            });
	       });
	        return false;
	    }
	   
	    changeOrderHtml({
	        isFetching: true,
	        BaseInfo: {
	            DepartureDate: date,
	            AdultNum: barTopAdultCount,
	            ChildNum: barTopChildCount
	        },
	        InitTopbar: true
	    });
	    
	    //var adultCount = ad
	    var query = {
	        "ProductID": DataDetail.data.ProductID,
	        "DepartureCityID": DataDetail.data.StartCityID,
	        "DepartureDate": date,
	        "AdultQuantity": barTopAdultCount,
	        "ChildQuantity": barTopChildCount,
	        // 小武说：这个值(ResourceCategory)目前默认 传入的都是0
	        "ResourceCategory": 0,
	        "ChosedResource": ChosedResource || null, //第二次请求增加这个对象
	        "SalesCityID": DataDetail.data.SalesCity,
	        "GUID": singletonManager.GUIDManager.get({
	            DepartureDate: date,
	            AdultNum: barTopAdultCount,
	            ChildNum: barTopChildCount
	        }) || "", //prevJSON ? prevJSON.GUID : "", // 第二次请求，json.data.GUID
	        "DefaultRecommendType": "Recommend",
	        "ResourceInfoOption": null
		};
	    // 先中断上次的ajax
	    if (nowReloadResourceSearchXHR) {
	        prevReloadResourceSearchXHR = nowReloadResourceSearchXHR;
	        nowReloadResourceSearchXHR = undefined;
	        //isResourceSearchAborted = true;
	        prevReloadResourceSearchXHR.abort();
	    }
	    if (nowBookingXHR) {
	        prevBookingXHR = nowBookingXHR;
	        nowBookingXHR = undefined;
	        prevBookingXHR.abort();
	    }
	    //isResourceSearchReloading = true;
	    nowReloadResourceSearchXHR = $.ajax({
	        //type:'GET',
	        type: 'POST',
	        url: apiGetBigOrder,
	        //'http://127.0.0.1:8181/json/ResourceSearch-5-2segmentHotel.json',
	        data: { query: cQuery.stringifyJSON(query) }
	    })
        .done(function (json) {
            //setTimeout(function () { 
            //isResourceSearchReloading = false;
            //isResourceSearchAborted = false;
            if (_.isString(json)) json = $.parseJSON(json);

            //查询成功
            if (json.errno == 0) {

                // 测试直连机票的UI显示
                //_.each(json.data.FlightInfos, function (flightInfo) {
                //    flightInfo.Flights[0].DirectFlightChannel = "xxxx";
                //    _.each(flightInfo.Flights, function (flight) {
                //        flight.Remarks.PaymentLimit = {
                //            Text: "sss",
                //            Value:"sss"
                //        }
                //    });
                //});

                var BaseInfo = json.data.BaseInfo;
                singletonManager.GUIDManager.set(BaseInfo, json.data.GUID);

                //dataManager.setData(json.data.ChosedResourceRequest);
                dataManager.setJSON(json.data);
                dataManager.dealFlightInfo(json.data);
                dataManager.dealSingle(json.data);
                dataManager.dealOptional(json.data);
                //dataManager.dealBaoxian(json.data);
                dataManager.dealHotelInfo(json.data);
                //这个要在最后一步来做
                dataManager.dealResource(json.data);
                resourceSearchJSON = json.data;

                // 特色标签
                //var hotelInfos = json.data.HotelInfos,
                //    flightInfos = json.data.FlightInfos;
                //GV.emit('special-label', {
                //    hotel: !_.isEmpty(hotelInfos) && _.some(hotelInfos, function (hotel) { return hotel.HotelTotalCount > 1 }) //hotelInfos[0].HotelTotalCount > 1,
                //    , flight: !_.isEmpty(flightInfos) && _.some(flightInfos, function (flight) { return flight.HasMoreFlights }) //flightInfos[0].TotalCount > 1
		        //});

                // 更低价
                /**
                * 1. 前台发现起价没有，但是可以预订 ---- 就是选中的日期显示的是【实时计价】的也要调用起价插队服务
                * 2. 实际起价更低
                * 3. 见下面的 fail 部分
                */
              //  if (util.isRealtimePrice(minPrice) || json.data.BaseInfo.TotalPrice < minPrice) {
                //   GV.emit('more-min-price', json.data.BaseInfo);
	            //}

                changeOrderHtml(util.extendDeep(json.data, {
                    isFetchSuccess: true
                }));
                singletonManager.moneyContainManager.setFlightContains(json.data.FlightContains);


                orderInteractiveInit(nodeOrderWrap, json.data, resourceSearchDepartureDate);
			}
                //查询失败
            else {
                //singletonManager.GUIDManager.set(json.data.BaseInfo, null);
                singletonManager.GUIDManager.set({
                    DepartureDate: resourceSearchDepartureDate,
                    AdultNum: barTopAdultCount,
                    ChildNum: barTopChildCount
                }, null);

                /*
                * 0： 成功
                * 10： 请求的参数格式不对， 可以直接输出我返回的errmsg --- 这个不能显示给用户
                * 20： openapi那边没有任何返回，服务端问题， 大家可以参照以前的errmsg 输出消息。
                * 99： openapi 返回提示没有资源的库存， 这个需要裴超页面上提示对应的消息， 错误msg 使用我的输出errmsg， 
                */
                if (json.errno == 99) {
                    // 只有最少人数时还是没有资源，才关闭这个日期
                    if (barTopChildCount + barTopAdultCount <= DataDetail.data.MinAdult + DataDetail.data.MinChild) {
                        GV.emit('sell-out-this-day', date);
                    }

                    // 更低价
                    /*
                    * 3. 无资源/售完 --- 选了日期后，没有资源或售完的也要调用起价插队服务
                    */
                    GV.emit('more-min-price', {
                        DepartureDate: resourceSearchDepartureDate
                    });

                    //fetchFail(false, json.errmsg);
                    fetchFail({
                        errmsg: json.errmsg,
                        InitError: true,
                        InitTopbar: true
                    });
				}
				else {
                    fetchFail({
                        isServerError: true,
                        InitError: true,
                        InitTopbar: true
                    });
				}
			}
            //}, 5000);
        })
        .fail(function () {
            singletonManager.GUIDManager.set({
                DepartureDate: resourceSearchDepartureDate,
                AdultNum: barTopAdultCount,
                ChildNum: barTopChildCount
            }, null);
            // 目前看来 手动 abort 肯定是因为有新的请求，先 abort 之前的，所以不必显示失败信息
            if (prevReloadResourceSearchXHR && prevReloadResourceSearchXHR.statusText == 'abort') {

			}
            else {
                fetchFail({
                    isServerError: true,
                    InitError: true,
                    InitTopbar: true
                });
		    }
            //isResourceSearchReloading = false;
            //isResourceSearchAborted = false;
        })
        .always(function () {
            prevReloadResourceSearchXHR = undefined;
        });
	});

	// 当弹出框返回
	/*
	* @param {String} type
	* @param ChosedResource
	*/
	GV.on('order-select-back', function (e) {
		//此处，e 是：{ type: 'flight', ChosedResource: ChosedResource }
		if (e.type === 'flight') {
			dataManager.setChosedFlight(e.ChosedResource);
		}
		//此处，e 就是 ChosedResource
		else if (e.type === 'hotel') {
			dataManager.setChosedHotel(e.Segement, e);
		}
		//此处，e 就是 ChosedResource
		else if (e.type === 'single') {
			dataManager.setChosedSingle(e.SegmentNumber, e);
			}
		//此处，e 是：{type: 'optional', ChosedResource:[]}
		else if (e.type === 'optional') {
			//dataManager.setChosedOptional(e.Segement, e);
			dataManager.setChosedBaoxian(e.ChosedResource);
			singletonManager.baoxianManager.changeShowTypeByData(e.ChosedResource);
		}

		GV.emit('reload-resource-search', {
			prevJSON: resourceSearchJSON
			, ChosedResource: dataManager.getChosedResourceRequest()
			, AdultCount: barTopAdultCount
			, ChildCount: barTopChildCount 
		});
	});

	var submitStatus, bookingJSON;
	GV.on('startSubmit', function () {
	    var json = bookingJSON;
	    if (!json) return;
	    if (!submitStatus.isSubmiting) {
	        //submitStatus.isSubmiting = true;
	        submitStatus.submit(true);
	        var Segment = _.map(json.SegmentDatas, function (segment) {
	            return {
	                "Segment": segment.SegmentNumber,
	                "StartCity": segment.DepartureCityID,
	                "DestCity": segment.ArriveCityID,
	                "DepartureDate": segment.DepartureDate,
	                "ArrivalDate": segment.ArriveDate,
	                "CheckinDate": segment.CheckInDate,
	                "CheckoutDate": segment.CheckOutDate
	            }
	        });

	        changeOrderHtml({
	            isFetching: true
                , isOrdering: true
                , BaseInfo: {
                    DepartureDate: resourceSearchDepartureDate
                    , AdultNum: barTopAdultCount
                    , ChildNum: barTopChildCount
                }
                , InitTopbar: true
	        });
	        //var shouldJump;

	        //TODO，现在 后台不发布，所以这一段先写着，一周后(2014-01-21)删除这一段
	        ///////////// BEGIN
	        DataDetail.api.addtionalProduct = DataDetail.api.addtionalProduct || '/booking/PkgReserveOptionNew.aspx';
	        DataDetail.api.addtionalProductNew = DataDetail.api.addtionalProductNew || '/booking/Options.aspx';
	        ///////////// END

	        // 默认跳转到这一页
	        var nextPage = DataDetail.api.addtionalProduct;

	        $.ajax({
	            type: 'POST',
	            // 页面发布没有merge，现在JS里面写上好了
	            url: DataDetail.api.checkJump || '/booking/Handler2/NewGroupDetail/SkipOptionalPage.ashx',
	            data: { query: cQuery.stringifyJSON(dataManager.getOptionalRequestData(barTopAdultCount, barTopChildCount)) }
	        })
            .done(function (json) {
                if (_.isString(json)) json = $.parseJSON(json);

                if (json.data == '0' || json.data == 'SkipOptPage_Yes') {
                    //shouldJump = true;
                    nextPage = DataDetail.api.OrderPageUrl;
                }
                else if (json.data == '1') {
                    nextPage = DataDetail.api.addtionalProductNew;
                }
                else if (json.data == '2' || json.data == 'SkipOptPage_No') {
                    nextPage = DataDetail.api.addtionalProduct;
                }
            });

	        // 这个优化不做了，因为这么做 open api 一直有问题 ----> <del>【团队游详情页】【优化】彭新海，Booking接口：可选项数据为0的，你可以在前端给过滤掉，这样可以减少数据传输量。</del>
	        //var ChosedResourceRequest = dataManager.delEmptyOptionInChosedResource().getChosedResourceRequest();
	        var ChosedResourceRequest = dataManager.getChosedResourceRequest();
	        /** @from 【yy杨晔】的邮件
            2.	在提交BookV1时，需要判断所有用户选择的机票中是否包含直连机票。并提交字段HasDirectFlightChannel。
                HasDirectFlightChannel : “1” 包含直连机票
                HasDirectFlightChannel : “0” 不包含直连机票
            */
	        var HasDirectFlightChannel = ChosedResourceRequest.ChosedFlightResource
                && _.some(ChosedResourceRequest.ChosedFlightResource.TripSegments, function (segmentFlight) {
                    /** @from 【yy杨晔】的邮件
                    DirectFlightChannel : “”  非直连机票
                    DirectFlightChannel : “xxxx” 直连机票
                    **/
                    return segmentFlight.DirectFlightChannel;
                });
	        HasDirectFlightChannel = HasDirectFlightChannel ? "1" : "0";
	        nowBookingXHR = $.ajax({
	            //type:'GET',
	            type: 'POST',
	            url: DataDetail.api.book,
	            data: {
	                bookdata: cQuery.stringifyJSON({
	                    "HasDirectFlightChannel": HasDirectFlightChannel,
	                    "ProductID": DataDetail.data.ProductID,
	                    "StartCity": DataDetail.data.StartCityID,
	                    "SalesCity": DataDetail.data.SalesCity,
	                    "AdultNumber": barTopAdultCount,
	                    "ChildNumber": barTopChildCount,
	                    "ChosedResourceRequest": ChosedResourceRequest,
	                    "Segment": Segment,
	                    "UniqueDisplayCode": DataDetail.uniqueDisplayCode,
	                    "IsLeadOrder": DataDetail.isLeadOrder,
	                    "IsSuperOrder": DataDetail.isSuperOrder,
	                    "GUID": json.GUID,
	                    "DefaultRecommendType": "Recommend",
	                    "ProductCategoryType":DataDetail.data.ProductCategoryType || ""
	                })
	            }
	        })
            .done(function (json) {
                if (_.isString(json)) json = $.parseJSON(json);
                if (json.errno == 0) {
                    var param = 'TmpOrderid' + '=' + json.errmsg;
                    location = nextPage + '?' + param; //DataDetail.api[shouldJump ? 'OrderPageUrl' : 'nextPage'] + '?' + param;
                }
                else {
                    singletonManager.GUIDManager.set({
                        DepartureDate: resourceSearchDepartureDate,
                        AdultNum: barTopAdultCount,
                        ChildNum: barTopChildCount
                    }, null);

                    fetchFail({
                        isBookingError: true,
                        InitError: true,
                        InitTopbar: true
                    });
                }
                //submitStatus.isSubmiting = false;
                submitStatus.submit(false);
            })
            .fail(function () {
                singletonManager.GUIDManager.set({
                    DepartureDate: resourceSearchDepartureDate,
                    AdultNum: barTopAdultCount,
                    ChildNum: barTopChildCount
                }, null);
                // 目前看来 手动 abort 肯定是因为有新的请求，先 abort 之前的，所以不必显示失败信息
                if (prevBookingXHR && prevBookingXHR.statusText == 'abort') {

                }
                else {
                    fetchFail({
                        isBookingError: true,
                        InitError: true,
                        InitTopbar: true
                    });
                }

                //submitStatus.isSubmiting = false;
                submitStatus.submit(false);
            })
            .always(function () {
                prevBookingXHR = undefined;
            });
	    }
	});



	function changeOrderHtml(data) {
		data.BaseInfo = data.BaseInfo || {};
	    //是否支持儿童订票 -- 一个产品一旦确定下来，是否支持儿童也就确定下来了，不会跟随日期人数等而改变
	    data.ForChild = DataDetail.data.ForChild;
	    data.MinAdult = DataDetail.data.MinAdult;
	    data.MaxAdult = DataDetail.data.MaxAdult;
	    data.MinChild = DataDetail.data.MinChild;
	    data.MaxChild = DataDetail.data.MaxChild;
	    data.MinPersonQuantity = DataDetail.data.MinPersonQuantity;
	    var availableDate = dataManager.calendar.getAvailableDate();
	    var date = util.dtdate(data.BaseInfo.DepartureDate);
	    data.StartPrice = availableDate && availableDate[date]  && availableDate[date].MinPrice;
	    data.StudyTour = DataDetail.data.ProductCategoryType === "StudyTour";
	    nodeOrderWrap && nodeOrderWrap.html(tplOrder(data));
        // 重新生成 html，bar 的 status 也变为默认的了
	    //orderbar.setStatus(orderbar.STATUS.STATIC);
	    GV.emit('html-added-to-dom', { type: 'big_order' });

	    // 初始化顶部资源条   
	    if (data.InitTopbar) {
	        orderTopbarInteractiveInit(nodeOrderWrap, {
	            BaseInfo: {
	                AdultNum: barTopAdultCount,
	                ChildNum: barTopChildCount,
	                TotalPrice: '--'
	            }
	        }, resourceSearchDepartureDate, false, data.isInitStatus);
	    }
	    // 初始化提示的错误信息
	    if (data.InitError) {
	        orderInteractiveErrorInit(nodeOrderWrap);
	    }
	    //orderbar && orderbar.comparePosition();
	}

    /*
    * @param {String} errmsg
    * @param {Boolean} isServerError
    * @param {Boolean} isBookingError
    */
	function fetchFail(opt) {
	    changeOrderHtml({
	        isFetchFail: true,
	        isServerError: opt.isServerError,
	        isBookingError: opt.isBookingError,
	        errmsg: opt.errmsg,
	        BaseInfo: {
	            DepartureDate: resourceSearchDepartureDate
                , AdultNum: barTopAdultCount
                , ChildNum: barTopChildCount
	            //没有就是undefined，模板会自动判断undefined
                , PriceAdult: barTopAdultPrice
                , PriceChild: barTopChildPrice
	        },
	        InitError: opt.InitError,
	        InitTopbar: opt.InitTopbar
	    });
	}

    // 错误提示，可以【点击重试】
	function orderInteractiveErrorInit(nodeOrderWrap) {
	    nodeOrderWrap.find('.js-reload-resource').on('click', function () {
	        GV.emit('reload-resource-search', {
	            prevJSON: resourceSearchJSON
	            , ChosedResource: dataManager.getChosedResourceRequest()
	            , AdultCount: barTopAdultCount
	            , ChildCount: barTopChildCount
	        });
	    });
	}

    // 订单的顶部条（出发日期、成人、儿童数、总价、立即预定按钮）
	function orderTopbarInteractiveInit(nodeOrderWrap, json, Date, canSubmit, isInitStatus) {
	    // 这四个变量是在其他函数中可能会用到的
	    var selectAdult, selectChild, totalPrice; //, flight; //, hotel ;

	    barTopAdultCount = json.BaseInfo.AdultNum;
	    barTopChildCount = json.BaseInfo.ChildNum;
	    barTopAdultPrice = json.BaseInfo.PriceAdult;
	    barTopChildPrice = json.BaseInfo.PriceChild;
	    // 出发日期日历
	    singletonManager.smallCalendar.init(nodeOrderWrap);

	    // 成人
	    selectAdult = new Selector({
	        nodeWrap: nodeOrderWrap.find('.tourist_num .input_wrap'),
	        onlyInOption: false,
	        validReg: /^\d+$/g
	    });
	    // 儿童
	    selectChild = new Selector({
	        nodeWrap: nodeOrderWrap.find('.children_num .input_wrap'),
	        onlyInOption: false,
	        validReg: /^\d+$/g
	    });
	    // 总价
	    totalPrice = new singletonManager.TotalPrice({
	        nodeWrap: nodeOrderWrap.find('.total_price .price'),
	        price: json.BaseInfo.TotalPrice
	    });


	    // 成人数，儿童数变化时，也要刷新资源框
	    // 并且不限制用户输入多少人，想查多少人都可以
	    selectAdult.on('change', onPersonCountChange);
	    selectChild.on('change', onPersonCountChange);
	    function onPersonCountChange(count, b, c, d, domEvent) {
	        barTopAdultCount = util.int(selectAdult.getValue()) || 0;
	        barTopChildCount = util.int(selectChild.getValue()) || 0;
	      
	        if (isInitStatus) {
	            return singletonManager.smallCalendar.show(domEvent);
	        }
	        else {
	            var dateData = dataManager.calendar.getDateData(Date);
                GV.emit('reload-resource-search', {
	                Date: Date
                    //, MinPrice: dateData ? dateData.MinPrice : 0
                    , AdultCount: barTopAdultCount
                    , ChildCount: barTopChildCount
	            });
	            GV.emit('adult-or-child-count-change');
	        }
	    }
	    var depatureDateInput = $('#js-departure-date'),
            realDepatureDate = depatureDateInput.siblings('input');
	    
	    // 开始预定
	    if (isInitStatus) {
	        $('#js-submit').on('click', function (e) {
	            // cQuery 组件坑爹啊
	            singletonManager.smallCalendar.show(e);
	        });
	    }
	    // 立即预定
	    else {
	        ////////////////////////////
	        //////////////////// 提交表单 begin
	        ////////////////////////////
	        if (canSubmit) {
	            submitStatus = {
	                node: $('#js-submit'),
	                isSubmiting: false,
	                valid: function () {
	                    var total = barTopAdultCount + barTopChildCount;
	                    if (total > DataDetail.data.MaxPersonQuantity) {
	                        this.warnMaxQuantity('订单总人数不可超过' + DataDetail.data.MaxPersonQuantity + '人');
	                        return false;
	                    }
	                    if (total < DataDetail.data.MinPersonQuantity) {
	                        this.warnMaxQuantity('订单总人数不可少于' + DataDetail.data.MinPersonQuantity + '人');
	                        return false;
	                    }
	                    return true;
	                },
	                _isWarning: false,
	                warnMaxQuantity: function (msg) {
	                    if (this._isWarning) return;
	                    cQuery.mod.load('validate', '1.1', function () {
	                        var ins = cQuery(document).regMod('validate', '1.1');
	                        ins.method('show', {
	                            $obj: cQuery(selectAdult.getNodeInput()[0]),
	                            data: msg
	                        });
	                        this._isWarning = true;
	                        GV.once('adult-or-child-count-change', _.bind(function () {
	                            ins.method('hide');
	                            this._isWarning = false;
	                        }, this));
	                    });
	                },
	                submit: function (start) {
	                    if (start) {
	                        this.isSubmiting = true;
	                        this.node.addClass('btn_big_disabled');
	                    }
	                    else {
	                        this.isSubmiting = false;
	                        this.node.removeClass('btn_big_disabled');
	                    }
	                }
	            };
	            submitStatus.node.on('click', function () {
	                if (!submitStatus.valid()) return;
                    
	                bookingJSON = json;
					//判断登录
					if(GV.app.detail.isLogin){
					    GV.emit('startSubmit');
					 }else{
					    //开始免登录
					    GV.emit('startSubmit');
					  // __SSO_booking("startSubmitCheck","1")
					}
	               
	            });
				
	        }
	        ////////////////////////////
	        //////////////////// 提交表单 end
	        ////////////////////////////
	    }
	    

	    return {
	        selectAdult: selectAdult,
	        selectChild: selectChild,
	        totalPrice: totalPrice,
	        submitStatus: submitStatus
	    };
	}

    //////////////// 机票、酒店、单选、可选 初始化
	function orderInteractiveInit(nodeOrderWrap, json, Date) {
	    var topbar = orderTopbarInteractiveInit(nodeOrderWrap, json, Date, true);
	    var selectAdult = topbar.selectAdult,
            selectChild = topbar.selectChild,
            totalPrice = topbar.totalPrice,
            submitStatus = topbar.submitStatus;

	    singletonManager.baoxianManager.init(nodeOrderWrap.find('.other_resource_detail table'));


	    /////////////////
	    /////////////////发送给弹出框，【酒店】 begin
	    /////////////////
	    if (!_.isEmpty(json.HotelInfos)) {
	        _.each(nodeOrderWrap.find('.htl_resource_detail .htl_resource_table tr'), function (hotelDom, i) {
	            var nodeHotel = $(hotelDom);
	            var hotel = new OrderHotel({
	                nodeWrap: nodeHotel,
	                compareMoney: dataManager.getHotelDefaultCompareMoney(i),
	                RoomInfos: json.HotelInfos[i].RoomInfos,
	                setAjaxDataWhenNeed: function () {
	                    this.setAjaxData({
	                        "ProductID": DataDetail.data.ProductID,
	                        "SegmentNumber": nodeHotel.data('segment-number'),
	                        "CheckInDate": json.HotelInfos[i].LiveStartDay,
	                        "CheckOutDate": json.HotelInfos[i].LiveEndDay,
	                        "AdultNum": barTopAdultCount, //parseInt(selectAdult.getValue()) || 0,
	                        "ChildNum": barTopChildCount, //parseInt(selectChild.getValue()) || 0,
	                        "OrderName": "PKG", //"Recommend",
	                        "OrderType": "DESC",
	                        "HotelList": "", //[内部设置数据]// 更多房型时 传hotel id 
	                        // 祥宪说固定写100
	                        "RoomCount": 100, //json.HotelInfos[0].RoomTotalCount - 1, //需要返回几条数据
	                        "HotelSearchResponseFlag": ""
	                    });
	                },
	                isAllRoomLoaded: false
	            });

	            hotel.on('height-changed', function (ins) {
	                // 资源框高度变化
	                GV.emit('resource-box-height-changed', ins);
	            });

	            hotel.on('changed-total-price', function (price, oldPrice) {
	                totalPrice.changePrice(price, oldPrice);
	            });

	            // 换数量
	            hotel.on('room-count-change', function (room, count) {
	                count = parseInt(count);
	                var segmentNumber = hotel.getSegmentNumber();
	                var chosedHotel = dataManager.getChosedHotel(segmentNumber);
	                chosedHotel.SelectedRoomNum = count;
	                chosedHotel.RoomId = room.getId();
	            });

	            // 换房型
	            hotel.on('room-click', function (room, prevRoom) {
	                var segmentNumber = hotel.getSegmentNumber();
	                var chosedHotel = dataManager.getChosedHotel(segmentNumber);
	                chosedHotel.RoomId = room.getId();

                    // 如果需要在资源框房型变动的时候刷新资源框，就反注释这一段
	                if (prevRoom && room.getId() !== prevRoom.getId()) {
	                    GV.emit('reload-resource-search', {
	                        prevJSON: resourceSearchJSON
			            , ChosedResource: dataManager.getChosedResourceRequest()
			            , AdultCount: barTopAdultCount
			            , ChildCount: barTopChildCount
	                    });
	                }
	            });

	            hotel.on('select-click', function () {
	                var segmentNumber = this.node.data('segment-number');

	                GV.emit('order-select-button-click', {
	                    type: this.name, //hotel
	                    Node: this.node,
	                    Instance: this,
	                    Date: Date,
	                    CompareMoney: this.getCompareMoney(),
	                    SelectedRoom: this.getSelectedRoom(),
	                    SegmentNumber: segmentNumber,
	                    SegmentDatas: json.SegmentDatas, // SegmentData: dataManager.getSegmentDatasByNumber(segmentNumber),
	                    HotelInfo: dataManager.getHotelData(segmentNumber),
	                    AdultNum: barTopAdultCount,
	                    ChildNum: barTopChildCount,
	                    ChosedResource: dataManager.getChosedHotel(segmentNumber)
	                });
	            });
	            //GV.on('order-select-button-click', function (e) { console.log(e) });

	            //hotelAndFlight.push(hotel);
	        });
	    }
	    /////////////////
	    /////////////////发送给弹出框，【酒店】 end
	    /////////////////



	    /////////////////
	    /////////////////发送给弹出框，【机票】 begin
	    /////////////////
	    var flightNode = nodeOrderWrap.find('.flt_resource_detail');
	    if (!_.isEmpty(json.FlightInfos)) {
	        _.each(nodeOrderWrap.find('.flt_resource_detail .flt_resource_table'), function (flightDom) {
	            //var flight = new OrderFlight(nodeOrderWrap.find('.flt_resource_detail'));
	            var flight = new OrderFlight($(flightDom));

	            flight.on('select-click', function () {
	                //var segmentNumber = this.node.data('segment-number');

	                GV.emit('order-select-button-click', {
	                    type: this.name, //flight
	                    data: json,
	                    Date: Date,
	                    //TripSegmentNo: segmentNumber,
	                    //SegmentData: dataManager.getSegmentDatasByNumber(segmentNumber),
	                    //FlightInfo: dataManager.getFlightData(segmentNumber),
	                    AdultNum: barTopAdultCount,
	                    ChildNum: barTopChildCount,
	                    // 机票这个全部给他处理，结构不同，没看懂。。。
	                    ChosedResource: dataManager.getChosedResourceRequest('ChosedFlightResource')
	                });
	            });
	        });
	    }
	    /////////////////
	    /////////////////发送给弹出框，【机票】 end
	    /////////////////

	    ////////////////////////////////
	    //////////////////////////////// 单选、可选
	    ////////////////////////////////
	    var baoxianInstances = [];
	    _.each(nodeOrderWrap.find('.js-single,.js-optional'), function (dom) {
	        var node = $(dom);
	        var isSingle = node.hasClass('js-single');
	        var instance = new orderOther[isSingle ? 'OtherSingal' : 'OtherOptional']({
	            nodeWrap: node,
	            data: json[isSingle ? 'SingleResources' : 'OptionResources'][node.data('index-in-data')]
	        });
	        if (node.hasClass('js-is-baoxian')) {
	            baoxianInstances.push(instance);
	        }
	        //日期选择 -- 单选项不可改变
	        instance.dateSelect && instance.dateSelect.on('change', function (date) {
	            var resourceID = node.data('resource-id');
	            var chosedResource = dataManager.getChosedOptional(resourceID);
	            chosedResource.UseDate = date;
	        });
	        //数量选择 -- 单选项不可改变
	        instance.countSelect && instance.countSelect.on('change', function (count) {
	            count = parseInt(count);
	            var resourceID = node.data('resource-id');
	            var chosedResource = dataManager.getChosedOptional(resourceID);
	            chosedResource.UseCopies = count;
	        });
	        instance.on('height-changed', function (ins) {
	            // 资源框高度变化
	            GV.emit('resource-box-height-changed', ins);
	        });
	        instance.on('select-click', function () {
	            var BaoxianData, ChosedResource;

	            if (isSingle) {
	                ChosedResource = dataManager.getChosedSingle(this.getSegmentId());
	            }
	                // 保险是可选项中唯一可能有按钮的
	            else if (this.node.data('category-id') == DataDetail.data.BaoxianCategoryID) {
	                //BaoxianData = dataManager.getBaoxianData();
	                BaoxianData = dataManager.getResourceBaoxian();
	                ChosedResource = dataManager.getChosedBaoxian();
	            }
	            GV.emit('order-select-button-click', {
	                Node: this.node,
	                type: isSingle ? 'single' : 'optional',
	                Date: Date,
	                Instance: this,
	                baoxianArr: baoxianInstances,
	                //data: instance.options.data, //json, //
	                SegmentDatas: json.SegmentDatas, //dataManager.getSegmentDatasById(this.node.data('segment-id')),
	                SegmentID: this.node.data('segment-id'),
	                SegmentNumber: this.node.data('segment-number'),
	                Resource: dataManager.getRresourceData(this.getResourceId(), isSingle),
	                AdultNum: barTopAdultCount,
	                ChildNum: barTopChildCount,
	                ChosedResource: ChosedResource,
	                //多选需要 BaoxianData ，多选只有保险
	                BaoxianData: BaoxianData
	            });
	        });
	        instance.on('changed-total-price', function (price, oldPrice) {
	            totalPrice.changePrice(price, oldPrice);
	        });
	    });
	    ////////////////////////////////
	    //////////////////////////////// 单选、可选
	    ////////////////////////////////
	}



});