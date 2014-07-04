define(function (require, exports, module) {  

    var $ = require("../../../lib/jquery"),
		_ = require('underscore'),
		util = require('./mod_util'),
        countdown = require('./mod_detail_countdown'),
        detail_favories = require('./mod_detail_favories.js');
    require('./mod_detail_big_order');
    var calendar = require('./mod_detail_calendar');
    var singletonManager = require('./mod_detail_singletonManager');
    require('./mod_detail_needknow');
    require('./v_hotel');
    require('./v_dp').init();
    require('./v_flight').init();
    detail_favories.init();
    // window.startGoogleMap = function(){
    //      if(GV.app.detail && GV.app.detail.data && GV.app.detail.data.DisplayMap){
    //            require('./v_map').init();
    //        }
    //    };
    // $LAB.script({ src: "http://ditu.google.cn/maps/api/js?sensor=false&callback=startGoogleMap" });
    //util.registerModulus();
    //var tplPicPreview = Handlebars.compile(require('tpl/Modules/ProductPreviewManager.html.js'));
    var tplSpecialLabel = Handlebars.compile(require('tpl/detail/special_info.html.js'));
    var ProductPreviewManager = require('../Modules/ProductPreviewManager');

    var DataDetail = GV.app.detail;

    //GV.once('special-label', function (e) {
    //	var data = GV.app.detail.characteristic;
    //	var html = tplSpecialLabel(_.extend(data, e));
    //	$('.product_scroll_wrap .simple_route').before(html);
    //});

    // 查询出比页面刷新时更低的价格 -- <del>页面生命周期内只需执行一次</del> 【改为】<newRule>刘强龙：只要符合订单价格小于日历框日期价格都要调用</newRule>
    //GV.once('more-min-price', function () {
    GV.on('more-min-price', function (BaseInfo) {
        if (singletonManager.minPrice.can_i_post(BaseInfo.DepartureDate)) {
            $.post(DataDetail.api.updateMinPrice, {
                ProductID: DataDetail.data.IsTourGroupProduct ? BaseInfo.ProductID : DataDetail.data.ProductID,
                StartCity: DataDetail.data.StartCityID,
                StartDate: BaseInfo.DepartureDate
            });
        }
    });

    //页面加载时刷新当前产品价格
    GV.on('first-screen-update-price', function (json) {
        var price = json.productMinPrice - 0,
            remark = decodeURIComponent(json.productMinPriceRemark).replace(/\+/g, ' ');
        var wrap = $("#js_main_price_wrap"),
            priceHtml = '',
            tipHtml = '';
        if (price > 0) {
            priceHtml = '<dfn>¥</dfn>' + price + '<em>起</em>';      //产品收藏会依赖此价格。根据有无em元素来判断是否为实时起价
            wrap.children('.total_price').html(priceHtml);          //后端逻辑变了，现在无论是否有价格，total_price都会有id="J_total_price"
            if (remark) {
                tipHtml = '<span data-role="jmp" data-params="{options:{type:\'jmp_table\',classNames:{boxType:\'jmp_table\'},template:\'#jmp_pkg_title\', content:{txt0:\'起价说明\',txt1:\'' + remark + '\'},css:{maxWidth:\'300\',minWidth:\'240\'},alignTo:\'cursor\'}}" class="price_explain">起价说明</span>';
                wrap.children('.favorable_tips').prepend(tipHtml);
            }
        } else {
            priceHtml = '实时计价';
            wrap.children('.total_price').html(priceHtml);
        }
        wrap.find(".sr_label03").show();
    });

    //点击了日历中的某一天之后/或首次自动触发
    /*
    * @param Date: "2013-12-07"
    * @param IsAnnouncedGroup: false
    * @param MinPrice: 0
    * @param RemainingInventory: 6
    */
    GV.on('calendar_day_click', function (data) {
        GV.emit('reload-resource-search', data);
    });


    /////////////////
    // 图片预览 begin
    /////////////////
    GV.on('first-screen-data-multimedia-loaded', function () {

        var nodePicPreviewWrap = $('#js_photoviewer');

        ///////////////////////////////
        //--------------------- deal data - begin
        //直接获取页面数据
		var countImage = $('#js_photoviewer .attraction_photo_small ul li a').length;
        var dataPreview = $('#js_photoviewer .attraction_photo_small ul li a');
        // 肯定是 图片
        //var firstPreview = dataPreview[0];

        // 测试环境下，竟然还有全都是空数组的情况
        //if (firstPreview) {

            // 大图是在 Gallery 中的索引
            //var indexOfBigInGallery = 0;
            // 路攀说“连一张图都没有，还怎么弄，应该维护人员加图片”
            //firstPreview.Url = countImage == 0 ? firstPreview.VideoUrl : firstPreview.Gallery[indexOfBigInGallery].Url;
            ///////////////////////////////
            //--------------------- deal data - end
            ///////////////////////////////

            /*
            dataPreview = [
            { ImageID:xx, ImageDesc:xx, Gallery:[{Url: bigPic}, {Url: smallPic}] },...
            { ProductVideoID:xx, VideoDesc: xx, VideoUrl: xx, ThumbnailUrl: xx }, ...
            ]
            nodePicPreviewWrap.html(tplPicPreview({
                FirstPreview: firstPreview,
                Data: dataPreview
            }));
			*/
			if(!$("#js-preview-photo").attr("data-id")==0){
				var productPreviewManager = new ProductPreviewManager({
					nodeWrap: nodePicPreviewWrap,
					countImage: countImage,
					data: dataPreview
				});
			}
       // }
    });
    /////////////////
    // 图片预览 end
    /////////////////

    GV.ready(function () {
        /////////////////
        // 图片预览 & 大日历数据获取 begin
        /////////////////
        var DetailData = GV.app.detail;
        $.ajax({
            type: 'GET',
            url: DetailData.api.getNewCalendar,
            cache: false,
            //DetailData.api.getCalendarAndMultimedia,
            //'http://127.0.0.1:8181/json/FirstScreenDate.json',
            data: {
                ProductID: DetailData.data.ProductID
				, StartCity: DetailData.data.StartCityID
				, SalesCity: DetailData.data.SalesCity
				, MinPrice: DetailData.bigCalendarParemeter.minPrice
				, EffectDate: util.dtdate(DetailData.bigCalendarParemeter.effectDate)
				, ExpireDate: util.dtdate(DetailData.bigCalendarParemeter.expireDate)
	            , ClientSource: DetailData.ClientSource
                , IsSuperOrder: DetailData.isSuperOrder
            }
        })
        .done(function (json) {
            if (_.isString(json)) json = $.parseJSON(json);
            //if (json.errno != 0 || !json.data1 || !json.data1.Multimedia || !json.data2 || !json.data2.bigCalendar) {
            if (json.errno != 0 || !json.calendar || !json.calendar.bigCalendar) {
                //alert('图片展示的接口返回数据错误，不带这么玩的');
                return;
            }
            //GV.emit('first-screen-data-multimedia-loaded', json.data1.Multimedia);
            GV.emit('first-screen-data-calendar-loaded', json.calendar.bigCalendar);

            GV.emit('first-screen-update-price', json);

            // 添加已经售完水印 当availableDate数组为空，表示已经售完
            if (json.calendar.bigCalendar.availableDate.length === 0 && $('#js_calendar').find('.sell_out').size() <= 0) {
                $('#js_calendar').prepend('<div class="sell_out"><b></b></div>');
            }
        })
		.fail(function () {
		    '';
		});
        /////////////////
        // 图片预览 & 大日历数据获取 end
        /////////////////

        /////////////////
        // 图片预览 & 更多线路 begin
        /////////////////
		var showGroupInfo = function () {
	            var cityDom = $('.product_city'),
                    routeDom = $('.product_more'),
	                routeDomMore = routeDom.children('.link_wrap'),
	                routeNextDom = routeDom.children('.line'),
	                cityDomMore = cityDom.children('.link_wrap'),
	                cityNextDom = cityDom.children('.city'),
					sUserAgent = navigator.userAgent.toLowerCase(),
					bIsIpad = sUserAgent.match(/ipad/i) == "ipad",
	                hoverTimer = null;
	            //存在更多出发地时
	            if (routeDomMore.length) {
	                routeDom.on({
	                    'mouseenter': function () {
	                        clearTimeout(hoverTimer);
	                        routeNextDom.addClass('line_spread');
	                        cityNextDom.removeClass('city_spread');
	                        routeDomMore.slideDown('fast');
	                        cityDomMore.slideUp('fast').stop(true, true);
	                        //增加pad关闭按钮
	                        if (bIsIpad) {
	                            var pad_close = $('.close_for_ipad').length;
	                            if (pad_close == 0) {
	                                var html = '<div class="close_for_ipad"><span>[关闭]</span></div>'
	                                $('.link_wrap').append(html);
	                            }
	                            $('.close_for_ipad').click(function () {
	                                $(this).parent().hide();
	                                routeNextDom.removeClass('line_spread');
	                            });
	                        }
	                    },
	                    'mouseleave': function () {
	                        hoverTimer = setTimeout(function () {
	                            routeNextDom.removeClass('line_spread');
	                            routeDomMore.slideUp('fast');
	                        }, 300);
	                    }
	                });
	            }
	            else {
	                cityDom.css('border-right', 'none');
	            }
	        };
        var product_more_ajax_param = {
            ProductID: DetailData.data.ProductID
			, StartCity: DetailData.data.StartCityID
			, SalesCity: DetailData.data.SalesCity
            , ClientSource: DetailData.ClientSource
        };
        if (DetailData.ClientSource == "Offline") {
            product_more_ajax_param.specialDiscountID = DetailData.specialDiscountID;
            product_more_ajax_param.chkForceOrder = DetailData.isSuperOrder;
            product_more_ajax_param.chkNotSubOrder = DetailData.IsNoHotelsuborer;
            product_more_ajax_param.chkLeaderOrder = DetailData.isLeadOrder;
        }
		 GV.emit('first-screen-data-multimedia-loaded');
		  // 图片预览 & 更多线路 end
		 showGroupInfo();
        // 资源框 首次查询 begin
        /////////////////
        // 如果产品不可用
        if (!DataDetail.firstAvaliableDate || !DataDetail.data.ProductStatus) {
            GV.emit('calendar_no_available', DataDetail.firstAvaliableDate, DataDetail.data.ProductMessage);
        }
        else {
            GV.emit('init-resource-search');
        }
        //默认先查询第一个可用日期
        //var firstDate = {
        //	Date: GV.app.detail.firstAvaliableDate
        //	// 现在的情况是，首次查询不需对比最低价
        //	, MinPrice: -1
        //}; //calendarDataManager.getFirstAvailableDate();
        //var productStatus = GV.app.detail.ProductStatus;
        //// 现在数据还没有放上去，之后可以删掉这一行
        //if (!_.isBoolean(productStatus)) productStatus = true;
        //if (firstDate && productStatus) {
        //    //GV.emit('calendar_day_click', firstDate);
        //    GV.emit('reload-resource-search', firstDate);
        //}
        //else {
        //	GV.emit('calendar_no_available', productStatus ? '' : GV.app.detail.ProductMessage);
        //}
        /////////////////
        // 资源框 首次查询 end
        /////////////////


        // 添加"最新预订"横向滚动效果
        /*
        * Animation - Scroll
        * @constructor 
        * @Author:     yulianghuang 
        * @CreateDate  2012/12/17
        */
        var Animation = {};
        var _core = {};
        /*
        * Timer / Timing device     you need init Event before call the method "play"
        * @constructor
        * @Author:     yulianghuang
        * @param    {number}      how often the clock play
        * @param    {number}      how long the clock wait
        * @CreateDate  2012/12/5
        */
        _core.Timer = function (pMoveSpeed, pMoveInterval) {
            this._speed = pMoveSpeed || 50;
            this._interval = pMoveInterval || 0;
            this._clock = null;
            this._waitClock = null;
            this.Event = {
                play: function () { },
                pause: function () { },
                stop: function () { },
                ifPause: function () { return false },
                ifStop: function () { return false }
            };
        };
        _core.Timer.prototype = {
            play: function () {
                var me = this;
                me.Event.play();
                me._clock = setInterval(function () {
                    if (me.Event.ifStop()) {
                        me.stop();
                    } else if (me.Event.ifPause()) {
                        me.pause();
                    } else {
                        me.Event.play();
                    }
                }, me._speed);
            },
            pause: function () {
                var me = this;
                if (me._clock != null) {
                    clearInterval(me._clock);
                }
                me.Event.pause();
                me._waitClock = setTimeout(function () {
                    me.play();
                }, me._interval);
            },
            stop: function () {
                var me = this;
                me._clock != null && clearInterval(me._clock);
                me._waitClock != null && clearInterval(me._waitClock);
                me.Event.stop();
            }
        };

        _core.Storage = new function () {
            var _canuse = !!window.sessionStorage,
                hasData = function (pData) {
                    return pData && pData !== "" && pData !== "null" && pData !== "undefined";
                },
            /*
            * get data from ajax
            */
                ajaxData = function (pKey, pUrl, pArg, pCallBack, pIsLoacl, pCharset) {
                    var me = this;
                    $.ajax({ url: pUrl, data: pArg, success: function (data) {
                        dealData.call(me, data, pKey, pCallBack, pIsLoacl);
                    }
                    });
                    /*
                    Cmd.ajax(pUrl, pArg, function (data) {
                    dealData.call(me, data, pKey, pCallBack, pIsLoacl);
                    });
                    */
                },
            /*
            * get .js document which isnot UTF-8 encoding,the return data should be place into _core.cache[key]
            */
                jsonPData = function (pKey, pUrl, pArg, pCallBack, pIsLoacl, pCharset) {
                    var me = this,
                        _url = (pArg != null && pArg != "") ? pUrl + "?" + pArg : pUrl;
                    Cmd.Load.addJs(_url, function () {
                        var data = Cmd.JsonPData;
                        dealData.call(me, data, pKey, pCallBack, pIsLoacl);
                    }, true, pCharset);
                },
                sessionData = function (pKey, pUrl, pArg, pCallBack, pFunc, pCharset) {
                    var data = sessionStorage.getItem(pKey);
                    if (hasData(data)) {
                        dealData(data, pKey, pCallBack, false);
                    } else {
                        pFunc(pKey, pUrl, pArg, pCallBack, false, pCharset);
                    }
                },
                localData = function (pKey, pUrl, pArg, pCallBack, pFunc, pCharset) {
                    var data = localStorage.getItem(pKey);
                    if (hasData(data)) {
                        dealData(data, pKey, pCallBack, true);
                    } else {
                        pFunc(pKey, pUrl, pArg, pCallBack, true, pCharset);
                    }
                },
                dealData = function (data, pKey, pCallBack, pIsLoacl) {
                    _canuse && pIsLoacl && localStorage.setItem(pKey, data);
                    try { _canuse && !pIsLoacl && detectSessionStorage(pKey, data) && sessionStorage.setItem(pKey, data); } catch (e) { };
                    pCallBack(data);
                },
                detectSessionStorage = function (key, data) {
                    var key, remSpace, usedSpace = 0, keyData = sessionStorage.getItem(key);
                    // IE可以使用sessionStorage.remainingSpace来判断剩余空间，容量为5000000
                    remSpace = sessionStorage.remainingSpace;
                    // 非IE浏览器默认以5MB（1024*1024*5）的大小来判断剩余空间
                    // firefox下sessionStorage的容量只看item的value值那一部分，加起来不超过1024*1024*5就可以
                    // 但chrome下容量计算同时包括item的name和vlaue
                    // 另外，firefox下发现，每次seesionStorage写入过之后，即使清除了，容量也会变小
                    // firefox下bug, 同一firefox下的不同tab，会共享sessionStorage，但是单独窗口却无法查看到其他tab下的sesssionStorage
                    // 为了保险起见，setItem可以改用try catch
                    // 计算已使用容量也需要同时包括item的name和value
                    if (remSpace == undefined) {
                        for (var i = 0, l = sessionStorage.length; i < l; i++) {
                            key = sessionStorage.key(i);
                            usedSpace += key.length + sessionStorage[key].length;
                        }
                        //usedSpace = unescape(JSON.stringify(sessionStorage)).length;
                        //usedSpace = unescape(encodeURIComponent(JSON.stringify(sessionStorage))).length;
                        remSpace = 1024 * 1024 * 5 - usedSpace;
                    }
                    // 如果是写入已经存在的item，计算容量时则需要去除这个item
                    if (!!keyData) { remSpace -= keyData.length; }

                    if (data.length > remSpace) {
                        if (!!sessionStorage.length) {
                            // 移出第一个item，释放容量
                            sessionStorage.removeItem(sessionStorage.key(0));
                            //console.log(sessionStorage.length);
                            return arguments.callee(key, data);
                        }
                        else {
                            return false;
                        }
                    }
                    else {
                        return true;
                    }

                };
            /*
            *  get session storge,if not exist ,get data from the server
            *  @param  {string}            the hash key name of the data
            *  @param  {string}            the url where to get data from
            *  @param  {string}            the arguments used in the request
            *  @param  {function|null}     the callback function
            *  @param  {boolen|null}       if use jsonp
            */
            this.getSession = function (pKey, pUrl, pArg, pCallBack, pIsJsonP, pCharset) {
                var _funcPoint = pIsJsonP ? jsonPData : ajaxData;
                if (_canuse) {
                    sessionData(pKey, pUrl, pArg, pCallBack, _funcPoint, pCharset);
                } else {
                    _funcPoint(pKey, pUrl, pArg, pCallBack, false, pCharset);
                }
            };
            /*
            *  get local storge,if not exist ,get data from the server
            *  @param  {string}            the hash key name of the data
            *  @param  {string}            the url where to get data from
            *  @param  {string}            the arguments used in the request
            *  @param  {function|null}     the callback function
            *  @param  {boolen|null}       if use jsonp
            */
            this.getLocal = function (pKey, pUrl, pArg, pCallBack, pIsJsonP, pCharset) {
                var _funcPoint = pIsJsonP ? jsonPData : ajaxData;
                if (_canuse) {
                    localData(pKey, pUrl, pArg, pCallBack, _funcPoint, pCharset);
                } else {
                    _funcPoint(pKey, pUrl, pArg, pCallBack, true, pCharset);
                }
            };
        };


        Animation.Scroll = function (pContain, pItem, pIsY, pMoveStep, pMoveSpeed, pMoveInterval, pArrow, pAppendLength) {
            //Property
            this.Container = pContain;
            this.Items = pItem;
            this.Step = null;
            this.MoveStep = pMoveStep || 1;
            this._timer = new _core.Timer(pMoveSpeed, pMoveInterval);
            if (pIsY) {
                this.MoveProperty = "offsetHeight";
                this.ScrollProperty = "scrollTop";
            } else {
                this.MoveProperty = "offsetWidth";
                this.ScrollProperty = "scrollLeft";
            }
            this.Arrow = pArrow || 1;
            //private
            this._index = 0;
            this._itemLength = this.Items.length || 0;
            this._pausePosLength = 0;
            this._pausePos = [];

            //fill blank
            if (this.MoveStep < this._itemLength) {
                this.setStopPos(pAppendLength);
                this.fillContainer();
            }

            //cache
            this.memory = [];
        };
        Animation.Scroll.prototype = {
            /*
            * fill some element to the container
            * @param {dom} spme valid element
            */
            fillContainer: function () {
                //var _scrollHeight = this.Container
                var _minLength = Math.min(this.MoveStep * 2, this._itemLength),
                    _i = 0,
                    _tempNode;
                for (; _i < _minLength; _i++) {
                    _tempNode = this.Items[_i].cloneNode(true);
                    this.Container.appendChild(_tempNode);
                }
            },
            setStopPos: function (pAppendLength) {
                var me = this,
                    _appendLength = pAppendLength || 0,
                    _currentPos = 0;
                me._pausePosLength = Math.ceil(me._itemLength / me.MoveStep);
                for (var i = 0, l = me._pausePosLength; i < l; i++) {
                    for (var j = i * me.MoveStep, k = (i + 1) * me.MoveStep; j < k; j++) {
                        _currentPos += this.getNodeOffset(j, _appendLength);
                    }
                    me._pausePos[i] = _currentPos;
                }
                me._pausePosLength++;
                me._pausePos.unshift(0);
            },
            move: function () {
                var me = this;
                me.Container[me.ScrollProperty] += me.Arrow;
            },
            beforeMove: function (pDirect) {
                var me = this;
                if (pDirect) {
                    if (me._index === me._pausePosLength - 1) {
                        me.Container[me.ScrollProperty] = me._pausePos[0];
                        me._index = 1;
                    } else {
                        me._index++;
                    }
                } else {
                    if (me._index === 0) {
                        me.Container[me.ScrollProperty] = me._pausePos[me._pausePosLength - 1];
                        me._index = me._pausePosLength - 2;
                    } else {
                        me._index--;
                    }
                }
            },
            getNodeOffset: function (pos, pAppendLength) {
                return pos < this._itemLength ? this.Items[pos][this.MoveProperty] + pAppendLength : 0;
                //return this.Items[pos%this._itemLength][this.MoveProperty];
            },
            init: function () {
                var me = this;
                me._timer.Event.play = function () {
                    me.move.call(me);
                };
                me._timer.Event.ifPause = function () {
                    return (me.Container[me.ScrollProperty] === me._pausePos[me._index]);
                };
                me._timer.Event.pause = function () {
                    me.beforeMove.call(me, me.Arrow > 0);
                };
            },
            wait: function () {
                this._timer.pause();
            },
            stop: function () {
                this._timer.stop();
            },
            play: function () {
                this._timer.play();
            },
            //in ie, "display:none: "will cause some bug,you need the two method followed
            save: function () {
                var me = this;
                me.memory.push({
                    index: me._index,
                    scroll: me.Container[me.ScrollProperty]
                });
            },
            reset: function () {
                var me = this,
                    _memery = me.memory.pop();
                me._index = _memery.index || 0;
                me.Container[me.ScrollProperty] = _memery.scroll || 0;
            }
        };

        function YNotice(pContainer) {
            var _container = pContainer;
            _items = _container.find("SPAN"),
            _scrollCore = new Animation.Scroll(_container[0], _items, false, 8, 50, 10, 1);
            _scrollCore.init();
            _scrollCore.wait();
        }
        new YNotice(cQuery(".booking_now>div"));



        /**
        * 秒杀倒计时
        * TODO 修改big_order.html.js 加上钩子：<div id=\"J_countdown\" style=\"right:0;top:50px;display:none\" class=\"time_alert\"><s></s><u></u><div class=\"alert_info_blod\"><i></i><span id=\"J_second\">加载中...</span></div></div>\n\
        * TODO global_detail.css需要更新
        */

        // 倒计时条件判断 只有当ProductStatus=false，且ProductTiming有值时，才会触发前台的倒计时效果
        // ie下重新格式化时间
        function timeFormat(el) {
            var tempTime = [],
                    tempTime1 = [],
                    tempTime2 = [],
                    tempTime3 = [],
                    tempTime4 = [];
            function setNumber(str) {
                return str - 0;
            }
            tempTime1 = (el.split(' ')[0]).split('-');
            tempTime2 = (el.split(' ')[1]).split(':');
            tempTime3 = tempTime2[tempTime2.length - 1].split('.');
            tempTime2.pop();
            tempTime = tempTime.concat(tempTime1, tempTime2, tempTime3);
            $.each(tempTime, function (index, item) {
                tempTime4.push(setNumber(item))
            });
            return new Date(tempTime4[0], tempTime4[1], tempTime4[2], tempTime4[3], tempTime4[4], tempTime4[5], tempTime4[6]).getTime();
        };
        var detailObj = GV.app.detail.data;
        if (detailObj.hasOwnProperty("Hotline") && detailObj.Hotline.length > 0) {
            var sHotLineValue = detailObj.Hotline;
            if (sHotLineValue.length > 0) {
                $("#J_hot_telphone").find("p").html("<i></i>" + sHotLineValue.toString());
                $("#J_hot_telphone").show();
                $("#J_tab_hot_phone").append(sHotLineValue.toString());
                $("#J_tab_hot_phone").show();
                $("#J_tab_hot_phone").closest('.tab_link_help').show();
            }
        }

        var ProductTiming = GV.app.detail.data.ProductTiming,
                countTime = null || ProductTiming.split('|'),
                _startTime, _endTime, _currentTime;

        if (!DataDetail.data.ProductStatus && ProductTiming) {
            $('#js_order').addClass('pos_re');
            $('#J_countdown').show();
            _startTime = new Date(countTime[0]).getTime();
            _startTime = timeFormat(countTime[0]);
            _endTime = timeFormat(countTime[1]);
            _currentTime = timeFormat(countTime[2]);

            // 写入提示语
            $('#J_countips').html(GV.app.detail.data.ProductMessage);

            new countdown({
                content: '#J_second',
                startTime: _startTime,
                endTime: _endTime,
                currentTime: _currentTime,
                message: '',
                callback: function () {
                    //倒计时为0后直接刷新页面
                    window.location.reload();
                }
            });
        };


        /**
        * 弹出在线客服提示
        * 判断GV.app.detail.data.PopupOnlineChat是否为true，如果是，则倒计时30s，出现提示；不是则什么都不做
        * TODO: 关闭提示功能，关闭提示后下次再打开是否还有提示
        */


        function LineCusPop() {
            var self = this;
            this.show = function () {
                var PopupOnlineChat = GV.app.detail.data.PopupOnlineChat,
                        laterTime = 30 * 1000,
                        timeOut;
                if (PopupOnlineChat) {
                    timeOut = setTimeout(function () {
                        $('#J_linecuspop').show()
                        clearTimeout(timeOut);
                    }, laterTime)
                };
            };
            this.hide = function () {
                $('#J_linecuspop').hide();
            };
            this.init = function () {
                self.show();
                $('#J_closelinecus').click(function () {
                    self.hide();
                });
            }
        }
        new LineCusPop().init();


        /**
        * TODO 异步加载google地图
        * 滚动到那个位置再加载相应的js逻辑
        */

        function LoadMapMod() {
            var self = this,
                  mapHasLoad = false;

            /**
            * 载入google地图逻辑
            * @return
            */
            this.loadMap = function () {
                window.startGoogleMap = function () {
                    if (GV.app.detail && GV.app.detail.data && GV.app.detail.data.DisplayMap) {
                        require('./v_map').init();
                    }
                };
                $LAB.script({ src: "http://ditu.google.cn/maps/api/js?sensor=false&callback=startGoogleMap" });
            };

            /**
            * 检查dom高度
            * @return {[type]} [description]
            */
            this._checkHeight = function (fn) {
                if ( ($(window).scrollTop() + $(window).height()) >= $('#js_detail').offset().top ) {
                    self.loadMap();
                    mapHasLoad = true;
                } else {
                    if (fn) {
                        fn();
                    }
                };
            };

            /**
            * scroll后延迟200ms检查一次滚动，避免时时操作
            * @return {[type]} [description]
            */
            this._laterScroll = function () {
                var scrollTime = null;
                $(window).unbind('scroll.googlemap');
                $(window).bind('scroll.googlemap', function () {
                    if (scrollTime) {
                        clearTimeout(scrollTime)
                    };
                    scrollTime = setTimeout(function () {
                        if(!mapHasLoad){
                            self._checkHeight(null);
                        }
                    }, 100);
                }
                );
            };

            this.init = function () {
                self._checkHeight(self._laterScroll());
            };
        };
        new LoadMapMod().init();




    });


    // 产品对比

    // $.ajax({ 
    //     url: '/Booking/Ajax/Comparison/ProductComparison.ashx?ProductID',
    //     type: 'POST',
    //     dataType: 'json',
    //     data: {
    //         ProductIDs: '[' + GV.app.detail.data.ProductID + ']',
    //         SalesCity: GV.app.detail.data.SalesCity,
    //         IsDetail: false
    //     },
    //     success: function(data) {
    //         var data = data.data[0];

    //         data.ProductDepartureCity = GV.app.detail.data.StartCityName;
    //         data.MinPrice = GV.app.detail.bigCalendarParemeter.minPrice;

    //         $('a.compare_in').data('compare', data);

    //         // 产品对比公共模块
    //         var compare = require('../modules/compare');
    //         compare.init({
    //             parentSelector: 'body',
    //             SalesCity: GV.app.detail.data.SalesCity
    //         });
    //     }
    // });

});
