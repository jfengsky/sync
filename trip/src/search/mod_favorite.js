/*
 * @Author xiesj:
 * @Date   2014-05-13:
 * @Desc   搜索结果页中的 收藏列表 （弹出层 和 页面 右边的 列表）:
 */
define(function (require, exports) {
    var $ = require("../../../lib/jquery"),
        Favorite_list = {};
    // 公共参数。 
    Favorite_list.COMMONOBj = {
        temp: '<div class="collect_masking" id="js_collect_masking">\
                <h2>我的收藏（{{Count}}）<a href="javascript:void(0);" class="close" id="js_closeFavLayer"></a></h2>\
                <ul class="collect_list" >\
                     {{#List}} \
                       <li>\
                            <div class="content"><a href="{{Url}}" target="_blank">{{Name}}</a></div>\
                            <div class="collect_prise"><span class="base_price">{{ formatAlertPrice Price }}</span><a href="javascript:void(0)" data="{{Id}}" class="love js_cancelFav" title="取消收藏"></a></div>\
                        </li>\
                      {{/List}} \
                 </ul>\
                <div class="basefix">\
                    <div class="float_right basefix pkg_page_new" id="js_pkg_page">\
                    </div>\
                </div>\
            </div>',
        pageTemp: '<h2 class="sr_r_infor"><span>我的收藏（{{Count}}）</span><a href="javascript:void(0)" class="more" id="js_lookALlFavMore">查看所有&gt;&gt;</a></h2> \
        <ul class="collect_product">\
            {{#List}} \
              <li>\
                <a href="{{Url}}" target="_blank">{{Name}}</a>\
                <div class="collect_line basefix"><span class="prise">{{ formatPagePrice Price }}</span><a href="javascript:void(0);" class="current js_cancelFavInPage" title="取消收藏" data="{{Id}}"></a></div>\
              </li>\
            {{/List}} \
            </ul>',
        url: "/package-booking-vacationsonlinesiteui/handler2/MyFavoritesHandler.ashx",
        _pageSize: 10,
        _pageSizeInit: 5,
        _pageTotal: 10,
        _pageIndex: 1,
        debug: false,
        addStyle: function (pageStyle) {
            var a = pageStyle, b = document.createElement("style");
            b.type = "text/css";
            try {
                b.appendChild(document.createTextNode(a))
            } catch (c) {
                b.styleSheet.cssText = a
            }
            document.body.appendChild(b)
        },
        systemErrMsg: '<div style="height: 40px;text-;text-align: center;line-height: 40px;"><a href="javascript:void(0)" id="js_loadAgainFav">加载失败，请重试</a></div>',
        layerSystemErrMsg: '<li><div class="content"><a id="js_loadAgainLayerFav" href="javascript:void(0)">加载失败，请重试</a></div></li>'
    };

    // 帮助 文件    
    Favorite_list.help = {
        /*模板渲染*/
        view: function (pTemplet, pElement, pData) {
            var _temp = Handlebars.compile(pTemplet),
                _data = pData || "";
            $(pElement).append(_temp(_data));
        },
        /*计算页数*/
        num: function (pRow, pCount) {
            if (pCount % pRow == 0) {
                return pCount / pRow;
            }
            return parseInt(pCount / pRow) + 1;
        },
        bindPagingEvent: function (pElement, pNumber, pFun, current) {
            cQuery.mod.load('page', '1.2', function () {
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
                        onChange: function (current) {
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
        registeFormatPagePrice: function () {
            Handlebars.registerHelper("formatPagePrice", function (Price) {
                var result = "";
                if (Price <= 0) {
                    result = '实时计价';
                } else {
                    result = '<dfn>¥</dfn>' + Price.toString() + '起';
                }
                return new Handlebars.SafeString(result);
            });
        },
        registeFormatAlertPrice: function () {
            Handlebars.registerHelper("formatAlertPrice", function (Price) {
                var result = "";
                if (Price <= 0) {
                    result = '实时计价';
                } else {
                    result = '<dfn>¥</dfn><strong>' + Price.toString() + '</strong>起';
                }
                return new Handlebars.SafeString(result);
            });
        },
        showPageEvent: function (current) {
            Favorite_list.COMMONOBj._pageIndex = current;
            Favorite_list.showFavorite(current);
        },
        /*加载中提示*/
        loading: function (pId) {
            var _loading = $('#' + pId);
            if (!_loading.length) {
                $(document.body).append('<div class=" collect_masking" id="' + pId + '"></div>');
                $('#' + pId).html('<div class="collect_masking c_loading detail_loading"><img alt="" src="http://pic.c-ctrip.com/packages111012/loading_50-0816.gif"><strong>查询中，请稍候...</strong></div>');
                cQuery("#" + pId).mask();
            } else {
                cQuery("#" + pId).unmask();
                $("#" + pId).remove();
            }
        }
    };

    //------------------------start---pageIndex 页面中的列表-------------------------------
    Favorite_list.pageInit = function (pageIndex) {
        /* var test = {
        "Count": 100,
        "PageCount": 10,
        "Flag":1,
        "List": [{
        "Id": 0,
        "Name": "三亚2-15日自由行·超级自由行0",
        "Url": "http://vacations.ctrip.com/freetravel/p52165s2.html",
        "Price": 2000
        }, {
        "Id": 8,
        "Name": "三亚2-15日自由行·超级自由行8",
        "Url": "http://vacations.ctrip.com/freetravel/p52165s2.html",
        "Price": 2008
        }, {
        "Id": 9,
        "Name": "三亚2-15日自由行·超级自由行9",
        "Url": "http://vacations.ctrip.com/freetravel/p52165s2.html",
        "Price": 2009
        }]
        };*/

        function successFn(data) {
            var FavoriteG = Favorite_list.COMMONOBj;
            var Gobal = $.parseJSON(data);
            //数据为空的时候 的处理。
            if (!Gobal || !Gobal["List"] || Gobal["List"].length <= 0) {
                $("#js_myFavList").hide();
                return;
            }

            //flag 1. 正常有数据, 但条目不一定正确
            //  0. 无数据 整体隐藏
            //  -1. 有数据, 但本次请求返回数据为0条, 文案->系统正在维护中..
            if (Gobal["Flag"] === 1) {
                $("#js_myFavList").empty();
                Favorite_list.help.view(FavoriteG.pageTemp, "#js_myFavList", Gobal);
                Favorite_list.bindEvent();
                $("#js_myFavList").find(".collect_product li").eq(-1).addClass('border_none');
            } else if (Gobal["flag"] === 0) {
                $("#js_myFavList").hide();
            } else if (Gobal["Flag"] === -1) {
                $("#js_myFavList").find("ul.collect_product").remove();
                $("#js_myFavList").append(FavoriteG.systemErrMsg);
                $("#js_loadAgainFav").bind("click", function () {
                    Favorite_list.pageInit(pageIndex);
                });
            }
            //处理 查看所有
            if (Gobal["Count"] <= FavoriteG._pageSizeInit) {
                $("#js_lookALlFavMore").hide();
            }
        }
        //successFn(test);

        if ($("#js_myFavList").size() == 1) {
            var pageSize = Favorite_list.COMMONOBj._pageSizeInit;
            Favorite_list.handleControl({ "method": "LIST", "pi": pageIndex, "ps": pageSize }, successFn);
        };

    };

    // 取消处理
    Favorite_list.cancelControlInPage = function (id) {
        function successFn(data) {
            if (data == 1) {
                Favorite_list.pageInit(1);
            }
        };
        Favorite_list.handleControl({ "method": "CANCEL", "Id": id }, successFn);
    };

    // 初始化 事件的绑定
    Favorite_list.bindEvent = function () {
        $("#js_lookALlFav,#js_lookALlFavMore").bind('click', function (event) {
            Favorite_list.showFavorite(1);
        });
        // 点击查看更多 事件
        $(".js_cancelFavInPage").bind("click", function () {
            var id = $(this).attr("data");
            Favorite_list.cancelControlInPage(id);
        });
    };
    //------------------------end pageIndex-----------------------------

    //-------------------------------start---page 弹出层-------------------------
    Favorite_list.showFavorite = function (pageIndex) {
        if (isNaN(pageIndex) || pageIndex <= 0 || pageIndex > Favorite_list.COMMONOBj._pageTotal) {
            return;
        }
        Favorite_list.createPage(pageIndex);
    };

    // 取消处理
    Favorite_list.cancelControl = function (id) {
        function successFn(data) {
            if (data == 1) {
                Favorite_list.showFavorite(Favorite_list.COMMONOBj._pageIndex);
            }
        };
        //successFn(1);
        Favorite_list.handleControl({ "method": "CANCEL", "Id": id }, successFn);
    };
    // 页面展示
    Favorite_list.createPage = function (pageIndex) {
        Favorite_list.help.loading("js_favLoad");
        function successFn(data) {
            var FavoriteG = Favorite_list.COMMONOBj;
            var Gobal = $.parseJSON(data);
            cQuery("#js_collect_maskingP").unmask();
            Favorite_list.help.loading("js_favLoad");
            $("#js_collect_maskingP").remove();
            $(document.body).append('<div class="my_collect_main" id="js_collect_maskingP"></div>');
            //FavoriteG._pageSize = Gobal.PageCount;
            FavoriteG._pageTotal = Gobal.Count;
            //var data =$.parseJSON(sData);
            Favorite_list.help.view(Favorite_list.COMMONOBj.temp, "#js_collect_maskingP", Gobal);
            cQuery("#js_collect_maskingP").mask();
            Favorite_list.help.bindPagingEvent("#js_pkg_page", Gobal.PageCount, Favorite_list.help.showPageEvent, pageIndex);
            $("#js_closeFavLayer").bind('click', function () {
                cQuery("#js_collect_maskingP").unmask();
                $("#js_collect_maskingP").remove();
                Favorite_list.pageInit(1);
            });
            //flag 1. 正常有数据, 但条目不一定正确
            //  0. 无数据 整体隐藏
            //  -1. 有数据, 但本次请求返回数据为0条, 文案->系统正在维护中..
            if (Gobal["Flag"] === 1) {
                //  事件绑定
                $(".js_cancelFav").bind("click", function () {
                    var index=$(this).index(".js_cancelFav")+1;
                    if($(".js_cancelFav").size()===1&&index===1){
                         Favorite_list.COMMONOBj._pageIndex=Favorite_list.COMMONOBj._pageIndex-1;
                    }
                    var id = $(this).attr("data");
                    Favorite_list.cancelControl(id);
                });
            } else if (Gobal["Flag"] === -1) {
                $("#js_collect_masking").find("ul.collect_list").html(FavoriteG.layerSystemErrMsg);
                $("#js_loadAgainLayerFav").bind("click", function () {
                    Favorite_list.createPage(pageIndex);
                });
            }
        }
        /*var test = {
        "Count": 100,
        "PageCount": 10,
        "Flag":1,
        "List": [{
        "Id": 0,
        "Name": "三亚2-15日自由行·超级自由行0",
        "Url": "http://vacations.ctrip.com/freetravel/p52165s2.html",
        "Price": 2000
        }, {
        "Id": 8,
        "Name": "三亚2-15日自由行·超级自由行8",
        "Url": "http://vacations.ctrip.com/freetravel/p52165s2.html",
        "Price": 2008
        }, {
        "Id": 9,
        "Name": "三亚2-15日自由行·超级自由行9",
        "Url": "http://vacations.ctrip.com/freetravel/p52165s2.html",
        "Price": 2009
        }]
        };
        successFn(test); */
        var pageSize = Favorite_list.COMMONOBj._pageSize;
        Favorite_list.handleControl({ "method": "LIST", "pi": pageIndex, "ps": pageSize }, successFn);
    };
    //-----------------------------end-----page 弹出层-------------------------

    //type : 1 list, 2 cancel;
    Favorite_list.handleControl = function (param1, fn) {
        $.ajax({
            url: Favorite_list.COMMONOBj.url,
            type: 'GET',
            cache: false,
            data: param1
        }).done(function (data) {
            fn(data);
        }).fail(function () {
            //alert("对不起，网络异常，请尝试刷新或者重新翻页...");
        });
    };

    // 入口文件
    Favorite_list.init = function () {
        var data= $("#js_myFavList").attr("data-login")||"true";
        var isLogin= (data.toString().toLowerCase()==="true"?1:0);
        if (!Favorite_list.COMMONOBj.debug&&isLogin) { 
            Favorite_list.help.registeFormatAlertPrice();
            Favorite_list.help.registeFormatPagePrice();
            Favorite_list.pageInit(1);
            var pageStyle = '#js_favLoad{ text-align:center; padding:0px;}\
                            .pkg_page_new {padding:10px 0;height:26px}\
                            .pkg_page_new .c_page_list a{float:left;width: 24px;padding: 3px 0 3px 0;text-align:center;color:#0065bb;border:1px solid #ccc;background-color: #fff;margin-right:3px;height:auto;font-weight:normal }\
                            .pkg_page_new .c_page_list .current,.pkg_page_new .c_page_list a:hover{color: #fff;border:1px solid #3da0e7; background-color: #64bbfa; font-weight: bold;}\
                            .pkg_page_new .c_page_list a:hover{background-color: #fff;color:#0065bb;font-weight:normal}\
                            .pkg_page_new .c_page_list .current:hover{background-color:#64bbfa;color:#fff;font-weight:bold}\
                            .pkg_page_new .c_page_submit{color:#000;background-color:#fff}\
                            .pkg_page_new .c_down:hover,.pkg_page_new .c_up:hover{text-decoration: none;color:#0065bb;border:1px solid #3da0e7;background-color:#fff}\
                            .pkg_page_new .c_page_num{line-height:16px;}\
                            .pkg_page_new .c_page_submit:hover{border:1px solid #3da0e7}';
            Favorite_list.COMMONOBj.addStyle(pageStyle);
        }
    };

    exports.init = Favorite_list.init;
}); 