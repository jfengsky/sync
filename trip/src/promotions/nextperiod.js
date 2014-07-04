/**
 * 下期预告异步数据请求
 * author: jiangfeng(jiang.f@ctrip.com)
 * date: 2014-03-14
 *     获取下期预告产品接口
 *     http://localhost/Package-Booking-VacationsOnlineSiteUI/handler/SecKill.ashx?type=next
 *     获取产品所有信息接口
 *     http://localhost/Package-Booking-VacationsOnlineSiteUI/handler/SecKill.ashx?type=all&ids=29336
 * 1: 北京 华北
 * 2：上海 华东
 * 32: 广州 华南
 * 28：成都 华西
 */

define(function (require, exports, module) {
    "use strict";
    var $ = require("../../../lib/jquery.js");

    /**
     * 
     * @param {String} url 数据请求接口
     */
    function NextPeriod(url) {
        var self = this,
            eastHtml = '',
            westHtml = '',
            northHtml = '',
            southHtml = '',
            total = null,
            NEXTIMG = '<li class="p_list_item p_list_item_except"><img src="http://pic.c-ctrip.com/vacation_v2/group_travel/topics_secKill_img_01.jpg" alt=""></li>';
        /**
         * 下期推荐区域标题
         * @param  {String} tpl 内容模板
         * @return {[type]}     [description]
         */
        this._wlTpl = function(tpl){
            return '<div class="topics_main"><div class="hd_title"><h2 class="title">下期预告</h2></div><ul class="products_list basefix domestic_products">'+ tpl +'</ul></div>'
        };

        /**
         * 归类商品区域
         * @param  {Array}   data    接口请求返回的数据
         * @param  {Number}   _index 数据序号
         * @param  {Function} fn     回调方法
         * @return
         */
        this._tpl = function(data, _index, fn){
            // TODO 缺少图片地址
            var Imageurl = data.ImageUrl || '',
                Title = data.Title || '',
                Producturl = data.ProductUrl || '',
               tpl = '<li class="p_list_item">' +
                  '<a target="_blank" class="pic" href="javascript:;">' +
                    '<img alt="" src="' + Imageurl + '">' +
                  '</a>' +
                  '<h3 class="title">' +
                    '<a target="_blank" title="' + Title + '" href="javascript:;">' + Title + '</a>' +
                  '</h3>' +
                  '<div class="waiting_box basefix">' +
                    '<div class="btns">' +
                      '<a href="javascript:;" target="_blank" title="敬请期待">敬请期待</a>' +
                    '</div>' +
                  '</div>' +
                  '<a target="_blank" title="' + Title + '" class="link" href="' + Producturl + '"></a>' +
                '</li>';
                switch (data.AreaCity) {
                case 1:
                    northHtml += tpl;
                break;
                case 32:
                    southHtml += tpl;
                    break;
                case 28:
                    westHtml += tpl;
                    break;
                default:
                    eastHtml += tpl;
                    break;
            }
            if(_index + 1 === total){
                fn({
                    "eastarea": eastHtml + NEXTIMG,
                    "westarea": westHtml + NEXTIMG,
                    "northarea": northHtml + NEXTIMG,
                    "southarea": southHtml + NEXTIMG
                });
            }
        };

        /**
         * 写入模板
         * @param {[type]} data [description]
         */
        this._setHtml = function(data){
            $('#J_eastarea').html(self._wlTpl(data.eastarea));
            $('#J_westarea').html(self._wlTpl(data.westarea));
            $('#J_northarea').html(self._wlTpl(data.northarea));
            $('#J_southarea').html(self._wlTpl(data.southarea));
        };

        /**
         * 设置页面模块
         * @param  {Array} data [description]
         * @return {[type]}      [description]
         */
        this._html = function(data){
            $.each($('#j_container .topics_part0'), function(index, item){
                var temparea = $(item).attr('section'),
                periodHtml = '';
                switch (temparea) {
                    case 'eastOfChina':
                        $(item).attr('id', 'J_eastarea');
                        break;
                    case 'westOfChina':
                        $(item).attr('id', 'J_westarea');
                        break;
                    case 'northOfChina':
                        $(item).attr('id', 'J_northarea');
                        break;
                    default:
                        $(item).attr('id', 'J_southarea');
                        break;
                }
            });
            total = data.length;
            $.each(data, function(index, item){
                self._tpl(item, index, self._setHtml);
            });

        };

        /**
         * 获取下期预告商品id
         * @param  {Object} data 异步请求参数 type: 'next'
         * @return 
         */
        // this._getIds = function(data){
        //     // 获取下期商品id
        //     var nextIds = [];
        //     $.each(data, function(index, item){
        //         nextIds.push(item.ProductID)
        //     })

        //     self._getData({
        //         type: 'all',
        //         ids: nextIds.join(',')
        //     }, self._html);
        // };
        
        this._getData = function(data,fn){
            $.ajax({
                url: url,
                type: 'get',
                data: data,
                cache: false,
                dataType: 'json',
                success: function (data) {
                    fn(data);
                }
            });
        }

        this.init = function(){
            self._getData({ type: 'next' }, self._html);
        }
    };

    

    module.exports = NextPeriod;
});
