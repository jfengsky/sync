

/* 
 * @Author xiesj:
 * @Date   2014-05-13:
 * @Desc   搜索结果页中的 收藏列表 （弹出层 和 页面 右边的 列表）:
 */
define(function(require, exports) {
   var $ = require("jquery"),
       Favorite_list={};

     Favorite_list.COMMONOBj = { 
            temp: '<h2>我的收藏（{{Count}}）<a href="javascript:void(0);" class="close" id="js_closeFavLayer"></a></h2>\
                    <ul class="collect_list" >\
                         {{#List}} \
                           <li>\
                                <div class="content"><a href="{{Url}}" target="_blank">{{Name}}</a></div>\
                                <div class="collect_prise"><span class="base_price">{{formatPagePrice Price}}</span><a href="javascript:void(0)" data="{{Id}}" class="love js_cancelFav" title="取消收藏"></a></div>\
                            </li>\
                          {{/List}} \
                     </ul>\
                    <div class="basefix">\
                        <div class="float_right basefix pkg_page_new" id="js_pkg_page">\
                        </div>\
                  </div>',
            url: "/package-booking-vacationsonlinesiteui/handler2/MyFavoritesHandler.ashx",
            _pageSize: 10,
            _pageSizeInit:5,
            _pageTotal: 10,
            _pageIndex: 1,
            debug: false,
            systemErrMsg:'<div style="height: 40px;text-;text-align: center;line-height: 40px;"><a href="javascript:void(0)" id="js_loadAgainFav">加载失败，请重试</a></div>',
            layerSystemErrMsg:'<li><div class="content"><a id="js_loadAgainLayerFav" href="javascript:void(0)">加载失败，请重试</a></div></li>'
        };
          // 帮助 文件    
    Favorite_list.help = {
        /*模板渲染*/
        view: function(pTemplet, pElement, pData) {
            var _temp = Handlebars.compile(pTemplet),
                _data = pData || "";
            $(pElement).append(_temp(_data));
        },
        /*计算页数*/
        num: function(pRow, pCount) {
            if (pCount % pRow == 0) {
                return pCount / pRow;
            }
            return parseInt(pCount / pRow) + 1;
        },
        registeFormatPagePrice: function () {
            Handlebars.registerHelper("formatPagePrice", function (Price) {
                var result = "";
                if (Price <= 0) {
                    result = '实时计价';
                }else{
                    result = '<dfn>¥</dfn><strong>' + Price.toString() + '</strong>起';
                }
                return new Handlebars.SafeString(result);
            });
        },
        bindPagingEvent: function(pElement, pNumber, pFun, current) {
            cQuery.mod.load('page', '1.2', function() {
                var config = {
                    options: {
                        min: 1,
                        max: pNumber,
                        step: 5,
                        current: current || 1,
                        prevText: '&lt',
                        nextText: '&gt',
                        splitText: "...",
                        goto: true,
                        showText: false
                    },
                    methods: {

                    },
                    listeners: {
                        onChange: function(current) {
                            pFun(current);
                        }
                    },
                    template: {
                        pageList: '<div ${className}>${page}</div>',
                        page: '<a ${className} href="javascript:void(0);">${pageNo}</a>',
                        total: '<span ${className}>${pageInfo}</span>',
                        split: '<span ${className}>${splitText}</span>',
                        goto: '<div class="c_pagevalue">到 <input type="text" class="c_page_num" name="" data-type="pageNumber"/> 页<input type="button" class="c_page_submit" value="确定" name="" data-type="pageSearch"/></div>',
                        prev: '<a ${className} href="javascript:void(0);">${pageNo}</a>',
                        next: '<a ${className} href="javascript:void(0);">${pageNo}</a>'
                    },
                    classNames: {
                        prev: 'c_up',
                        next: 'c_down',
                        prev_no: 'c_up_nocurrent',
                        next_no: 'c_down_nocurrent',
                        list: 'c_page_list layoutfix',
                        action: 'select',
                        disabled: 'disabled',
                        split: 'c_page_ellipsis',
                        total: 'page_total',
                        current: 'current',
                        pageStyle: ""
                    }
                };
                cQuery(pElement).regMod('page', '1.2', config);
            });
        },
        showPageEvent: function(current) {
            Favorite_list.COMMONOBj._pageIndex = current;
            Favorite_list.showFavorite(current);
        },
        /*加载中提示*/
        loading: function(pId) {
            var _loading = $('#' + pId);
            if (!_loading.length) {
                $(document.body).append('<div class=" collect_masking" id="' + pId + '"></div>');
                $('#' + pId).html('<div class="collect_masking c_loading detail_loading"><img alt="" src="http://pic.c-ctrip.com/packages111012/loading_50-0816.gif"></div>');
                cQuery("#" + pId).mask();
            } else {
                cQuery("#" + pId).unmask();
                $("#" + pId).remove();
            }
        }
    };

// 页面展示
    Favorite_list.createPage = function(pageIndex) {
        Favorite_list.help.loading("js_favLoad");
        function successFn(data) {
            var FavoriteG=Favorite_list.COMMONOBj;
            var Gobal = $.parseJSON(data);
            $("#js_collect_masking").empty();
             Favorite_list.help.loading("js_favLoad");
            FavoriteG._pageTotal = Gobal.Count;
             //var data =$.parseJSON(sData);
            Favorite_list.help.view(Favorite_list.COMMONOBj.temp, "#js_collect_masking", Gobal);
             Favorite_list.help.bindPagingEvent("#js_pkg_page",Gobal.PageCount, Favorite_list.help.showPageEvent, pageIndex);
            //flag 1. 正常有数据, 但条目不一定正确
            //  0. 无数据 整体隐藏
            //  -1. 有数据, 但本次请求返回数据为0条, 文案->系统正在维护中..
            if(Gobal["Flag"]===1){
                //  事件绑定
                $(".js_cancelFav").bind("click", function() {
                    var index=$(this).index(".js_cancelFav")+1;
                    if($(".js_cancelFav").size()===1&&index===1){
                         Favorite_list.COMMONOBj._pageIndex=Favorite_list.COMMONOBj._pageIndex-1;
                    }
                    var id = $(this).attr("data");
                    Favorite_list.cancelControl(id);
                });
            }else if(Gobal["Flag"]===-1){
                $("#js_collect_masking").find("ul.collect_list").html(FavoriteG.layerSystemErrMsg);
                $("#js_loadAgainLayerFav").bind("click",function(){
                     Favorite_list.createPage(pageIndex);
                });
            }
        }
        var pageSize=Favorite_list.COMMONOBj._pageSize;
        Favorite_list.handleControl({"method":"LIST","pi":pageIndex,"ps":pageSize},successFn);
    };
    

    //-------------------------------start---page 弹出层-------------------------
    Favorite_list.showFavorite = function(pageIndex) {
        if (isNaN(pageIndex) || pageIndex <= 0 || pageIndex > Favorite_list.COMMONOBj._pageTotal) {
            return;
        }
        Favorite_list.createPage(pageIndex);
    };

    // 取消处理
    Favorite_list.cancelControl = function(id) {
        function successFn(data) {
            if (data == 1) {
                Favorite_list.showFavorite(Favorite_list.COMMONOBj._pageIndex);
            }
        };
        //successFn(1);
        Favorite_list.handleControl({"method":"CANCEL","Id":id},successFn);
    };
    
    //type : 1 list, 2 cancel;
    Favorite_list.handleControl = function(param1, fn) {
    /*var data='{"Flag":1,"Count":103,"PageCount":10,"List":[{"Id":113,"Name":"魔幻情人节之兰色三亚——寰岛特惠5日自由行（东方航空） ","Url":"http://vacations.ctrip.com/freetravel/p1091s2.html","Price":0.0},{"Id":115,"Name":"待用","Url":"http://vacations.ctrip.com/freetravel/p1093s2.html","Price":0.0},{"Id":116,"Name":"待用","Url":"http://vacations.ctrip.com/freetravel/p1094s2.html","Price":0.0},{"Id":119,"Name":"醉人情调 尽在芭堤雅——曼谷芭堤雅3晚5天自由行（风兰之旅）","Url":"http://vacations.ctrip.com/freetravel/p1097s2.html","Price":0.0},{"Id":121,"Name":"南航行 携程之旅——香港澳门5日自由行","Url":"http://vacations.ctrip.com/freetravel/p1099s2.html","Price":0.0}]}';
     fn(data);*/   
        $.ajax({
            url: Favorite_list.COMMONOBj.url,
            type: 'GET',
            data: param1,
            cache:false
        }).done(function(data) {
            fn(data);
        }).fail(function() {
            alert("对不起，网络异常，请尝试刷新或者重新翻页...");
        });
    };

    // 入口文件
    Favorite_list.init = function() {
        if (!Favorite_list.COMMONOBj.debug) {
            Favorite_list.help.registeFormatPagePrice();
            Favorite_list.showFavorite(1);
        }
    };
    Favorite_list.init();
});