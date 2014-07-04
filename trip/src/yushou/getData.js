/**
 * 获取数据并更新页面
 * @return {[type]}         [description]
 */
define(function (require, exports, module) {
    "use strict";
    var $ = require("jquery"),
      updata = require('./updata');
    function Getdata() {
        var self = this,
        // itemId = [], 
        upStoke = new updata();

        /**
        * 返回售卖状态
        * @return {[type]} [description]
        */
       /**
        * 返回售卖状态
        * @param  {Number} _cityId 城市id
        * @param  {Array}  _itemId 产品id数组
        * @return 
        */
        this._status = function (_cityId, _itemId) {
            // upStoke.clear();
            upStoke.init(_itemId.join(','), _cityId);
        };

        /**
        * 返回区域范围
        * @param  {String} _title [description]
        * @param  {Boolean} _bool  [description]
        * @return {String}        [description]
        */
        this._areaTitle = function (_title, _bool) {
            var tpl = '<span class="icon_title_arrow_1"></span><span class="title">' + _title + '</span><span class="icon_title_arrow_2"></span>';
            if (_bool) {
                return '<h2 class="hd_title">' + tpl + '</h2>'
            }
            // else {
            //   return '<h2 class="hd_title" style="display:none">' + tpl + '</h2>'
            // }
        };

        /**
        * 返回产品信息
        * @param  {Json} data [description]
        * @return {String}      [description]
        */
        this._areaInfo = function (data) {
            var tempPrice = '<div class="actual_price">实时计价</div>',
                tempSchedule;
            // itemId.push(data.Pkg);
            // console.log(itemId);
            if (data.PreSalePrice > 0) {
                tempPrice = '<div class="price_active"><b>预售价</b><span class="rmb">¥</span><span>' + data.PreSalePrice + '</span></div>';
            };
            if (data.Schedule == null) {
                tempSchedule = ''
            } else {
                tempSchedule = data.Schedule
            };
            return '<li class="p_list_item willstart" id="J_' + data.Pkg + '" data-reurl="' + data.RecommendationUrl + '"><a href="' + data.ProductUrl + '" title="' + data.ProductName + '" target="_blank" class="web_link">' +
          '<div class="pic"><img src="' + data.ImgUrl + '" alt=""></div>' +
          '<h3 class="title">' + data.ProductName + '</h3>' +
          '<div class="basefix">' +
            '<div class="discount">' +
              '<i></i>' +
              '<span class="slogan">' + data.DiscountDescription + '</span>' +
            '</div>' +
            '<div class="bg_circle price_market">' +
              '<span class="item_name">市场价</span>' +
              '<span class="del">' + data.MarketPrice + '</span>' +
            '</div>' +
            '<div class="bg_circle depart_date">' +
              '<span class="item_name">出发班期</span>' +
              '<span>' + tempSchedule + '</span>' +
            '</div>' +
            '<div class="bg_circle depart_city">' +
              '<span class="item_name">出发城市</span>' +
              '<span>' + data.StartCityName + '</span>' +
            '</div>' +
          '</div>' + tempPrice +
          '<div class="J_itemstatus"></div>' +
        '</a></li>';
        };

        /**
        * 渲染页面
        * @param  {Json} data 返回的数据
        * @return {[type]}      [description]
        */
        this._render = function (data, _city) {
            var areaList,
                html = '',
                tempItemId = []; // 当前标签的所有产品id
            if (data.error) {
                areaList = data.data;
                $.each(areaList, function (index, item) {
                    if (item.PreSaleProductList.length) {
                        html += self._areaTitle(item.Name, item.PreSaleProductList.length);
                        html += '<ul class="products_list basefix">'
                        $.each(item.PreSaleProductList, function (idx, list) {
                            html += self._areaInfo(list);
                            tempItemId.push(list.Pkg)
                        });
                        html += '</ul>'
                    }
                });
                $('#J_main').html(html);
                self._status(_city, tempItemId);
            }
        };

        /**
        * 请求数据
        * @param  {[type]}   id [description]
        * @param  {Function} fn [description]
        * @return 
        */
        this._get = function (id, fn) {
            $.ajax({
                type: 'get',
                url: '/Package-Booking-VacationsOnlineSiteUI/handler2/PreSaleHandler.ashx',
                data: {
                    startCity: id,
                    debugtime: $('#debugtime').val()
                },
                dataType: 'json',
                cache: false,
                success: function (data) {
                    if (fn) {
                        fn(data, id);
                    }
                },
                error: function (data) {
                    return;
                }
            })
        };

        /**
        * 初始化
        * @return {[type]} [description]
        */
        this.init = function (_hasSend) {
            // TODO 获取当前高亮的城市区域
            var cityId;
            // _hasSend.clear();
            $.each($('#J_nav_list li'), function (index, item) {
                if ($(item).hasClass('current')) {
                    cityId = $(item).find('a').attr('data-id');
                }
            });
            this._get(cityId, this._render);
        };
    }


    module.exports = Getdata;
});