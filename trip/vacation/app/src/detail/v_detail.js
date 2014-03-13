define(function (require, exports, module) {

	var $ = require("../../../lib/jquery"),
		_ = require('underscore'),
		util = require('./mod_util');

	require('./mod_detail_big_order');
	var calendar = require('./mod_detail_calendar');
	var singletonManager = require('./mod_detail_singletonManager');
	require('./mod_detail_needknow');
	require('./v_hotel');
	require('./v_dp').init();
	require('./v_flight').init();

	//util.registerModulus();
	var tplPicPreview = Handlebars.compile(require('tpl/Modules/ProductPreviewManager.html.js'));
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
	            ProductID: DataDetail.data.ProductID,
	            StartCity: DataDetail.data.StartCityID,
	            StartDate: BaseInfo.DepartureDate
	        });
	    }
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
	GV.on('first-screen-data-multimedia-loaded', function (Multimedia) {

	    var nodePicPreviewWrap = $('#js_photoviewer');

	    ///////////////////////////////
	    //--------------------- deal data - begin
	    ///////////////////////////////
	    var countImage = Multimedia.image ? Multimedia.image.length : 0;
	    var dataPreview = (Multimedia.image || []).concat(Multimedia.video || []);
	    // 肯定是 图片
	    var firstPreview = dataPreview[0];

	    // 测试环境下，竟然还有全都是空数组的情况
	    if (firstPreview) {

	        // 大图是在 Gallery 中的索引
	        var indexOfBigInGallery = 0;
	        // 路攀说“连一张图都没有，还怎么弄，应该维护人员加图片”
	        firstPreview.Url = countImage == 0 ? firstPreview.VideoUrl : firstPreview.Gallery[indexOfBigInGallery].Url;
	        ///////////////////////////////
	        //--------------------- deal data - end
	        ///////////////////////////////

	        /*
            dataPreview = [
            { ImageID:xx, ImageDesc:xx, Gallery:[{Url: bigPic}, {Url: smallPic}] },...
            { ProductVideoID:xx, VideoDesc: xx, VideoUrl: xx, ThumbnailUrl: xx }, ...
            ]
            */
	        nodePicPreviewWrap.html(tplPicPreview({
	            FirstPreview: firstPreview,
	            Data: dataPreview
	        }));

	        var productPreviewManager = new ProductPreviewManager({
	            nodeWrap: nodePicPreviewWrap,
	            countImage: countImage,
	            data: dataPreview
	        });
	    }
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
	        url:DetailData.api.getNewCalendar, 
	            //DetailData.api.getCalendarAndMultimedia,
				//'http://127.0.0.1:8181/json/FirstScreenDate.json',
	        data: {
	            ProductID: DetailData.data.ProductID
				, StartCity: DetailData.data.StartCityID
				, SalesCity: DetailData.data.SalesCity
				, MinPrice: DetailData.bigCalendarParemeter.minPrice
				, EffectDate: util.dtdate(DetailData.bigCalendarParemeter.effectDate)
				, ExpireDate: util.dtdate(DetailData.bigCalendarParemeter.expireDate)
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
	    var template = '<li class="product_more">\
		                  <span class="line">更多线路({{number}})<b></b></span>\
		                    <div class="link_wrap" style="display: none;">\
		                     {{#data}}<a rel="nofollow" href="{{Url}}" title="{{Name}}"><span class="price">{{#if Price}}<dfn>¥</dfn>{{Price}}{{else}}实时计价{{/if}}</span>{{Name}}</a>{{/data}}\
		                  </div>\
	                 </li>',
	        showGroupInfo = function(){
              	var cityDom = $('.product_city'),
                    routeDom = $('.product_more'),
	                routeDomMore = routeDom.children('.link_wrap'),
	                routeNextDom = routeDom.children('.line'),
	                cityDomMore = cityDom.children('.link_wrap'),
	                cityNextDom = cityDom.children('.city'),
	                hoverTimer = null;
	                //存在更多出发地时
		            if (routeDomMore.length) {
		                routeDom.on({
		                    'mouseenter' : function () {
		                        clearTimeout(hoverTimer);
		                        routeNextDom.addClass('line_spread');
		                        cityNextDom.removeClass('city_spread');
		                        routeDomMore.slideDown('fast'); 
		                        cityDomMore.slideUp('fast').stop(true, true);
		                    },
		                    'mouseleave' : function () {
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
        $.ajax({
         	type:"GET",
         	url:DetailData.api.MultimediaAndGroupInfo,
         	data:{
         		ProductID:DetailData.data.ProductID
         		, StartCity: DetailData.data.StartCityID
				, SalesCity: DetailData.data.SalesCity
            }
         })
         .done(function(json){
            if (_.isString(json)) json = $.parseJSON(json);
            if (json.errno != 0 || !json.data || !json.data.MultimediaAndGroupInfo) {
               return;
            }
            var jsonData = json.data.MultimediaAndGroupInfo,
				Multimedia = {
					image:jsonData.image,
					video:jsonData.video
				},
				groupInfo = {
				   number:jsonData.groupInfo.length,
				   data:jsonData.groupInfo
				};
            GV.emit('first-screen-data-multimedia-loaded', Multimedia);
            if(groupInfo.number) $(".detail_product_note").append(Handlebars.compile(template)(groupInfo));
             showGroupInfo();
           })

	    /////////////////
	    // 图片预览 & 更多线路 end
	    /////////////////



		/////////////////
		// 资源框 首次查询 begin
		/////////////////
	    // 如果产品不可用
		if(!DataDetail.firstAvaliableDate || !DataDetail.data.ProductStatus){
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
	});

});
