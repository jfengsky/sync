
define(function (require, exports, module) {
    var LoadDest = require('../public/loadDest');
    var SearchOld = require('./searchResultOld');
    var MoreList = require('./mod_getMoreList');
    var HotSearch = require('./hot_serach');
    var SearchClick = require('./mod_searchClickItem');
    var SearchComment = require('./mod_searchComment');
    var SearchCalendar = require('./mod_searchCalendar');
    var Compare = require('../Modules/compare');
    var Favorite_list = require('./mod_favorite');
    var $ = require('jquery');
    if (!(typeof FHXConfig === "undefined" || typeof GV_CONFIG.PackageRootUrl === "undefined")) {
        require.async(GV_CONFIG.PackageRootUrl + '/ResPackageOnline/R8/js/min/package_search_v');
    }
     
    //高级筛选
    $('#advanceItems').click(function () {
        if ($('#advanceDown').is(':visible')) {
            $('#chosenFilterContainer .more_content').stop(true, true).show();
            $('#advanceUp').show();
            $('#advanceDown').hide();
            window['__bfi'].push(['_tracklog', 'vacations', "UID=${duid}&page_id=${page_id}&tracecode=advflt"]);
        } else {
            $('#chosenFilterContainer .more_content').stop(true, true).hide();
            $('#advanceDown').show();
            $('#advanceUp').hide();
        }
    });
    (function () {
        LoadDest.init();
        MoreList.init();
        HotSearch.init();
        SearchComment.init();
        SearchCalendar.init();
        SearchClick.init();
        Favorite_list.init();
        // Compare.init({ // 产品对比 
        //    parentSelector: 'body',
        //    SalesCity: window.$$.StartCity,
        //    isDecode: true
        // });
    })();

});