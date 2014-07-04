define(function (require, exports, module) {
    var $ = require('jquery');
    var $commentContainer = $('#searchResultContainer');
    var commentClass = '.comment02';
    var ajaxClass = '.loading_ajax_comment'//以防与日历重复 暂无班期情况
    var loadText = '<div class="loading_tip02 loading_ajax_comment"><img src="http://pic.c-ctrip.com/vacation_v1/loading_transparent.gif">正在加载，请稍候......</div>';

    var SearchComment = {
        tpl: '<div class="comment_content">\
			{{#CommonList data totalCount MoreUrl}}\
					<div class="basefix">\
						  <div class="like_play"><span class="seo_link">{{CommentTitle}}</span>\
						  <a class="pkg-heart-{{CommentGrade}}" title=""><span>{{CommentGrade}}分&nbsp;&nbsp;{{ScoreRemark}}</span></a></div>\
						  <div class="user_pro">\
								<span class="pkg_user_time">用户{{UID}}</span>\
								<span>{{CommentDate}}</span>\
							</div>\
						</div>\
						<div class="comment_p">{{CommentContent}}</div>\
						{{#if LastReplyContent}}<div class="ctrip_feedback"><strong>携程回复：</strong>{{LastReplyContent}}<span>({{#DealTime LastReplyDate}}{{/DealTime}})</span></div>{{/if}}\
		  {{/CommonList}}\
		 </div>',
        getComments: function (url, el, more_url) {
            more_url = SearchComment.filterUrl(more_url);
            $.ajax({
                type: 'get',
                url: url,
                dataType: 'json',
                beforeSend: function () {
                    el.children('.basefix').after(loadText);
                },
                // timeout : 5000,
                success: function (result) {
                    if (result.errno == 0 && result.data.QAndAs.length > 0) {
                        el.children('.basefix').after(Handlebars.compile(SearchComment.tpl)({ data: result.data.QAndAs, MoreUrl: more_url, totalCount: result.data.TotalPageCount }));
                        SearchComment.hideCommentPanel(el);
                    }
                    el.find(ajaxClass).remove();
                }
            });
        },
        filterUrl:function(url){
            var divideIndex = url.indexOf('#');
            divideIndex != -1 && (url=url.substring(0,divideIndex));
            return url;
        },
        helpers: function () {
            Handlebars.registerHelper('CommonList', function (items, total,more_url,options) {
                var ret = '<dl class="comment_list">'
                for (var i = 0, len = items.length; i < len; i++) {
                    ret = ret + '<dd>';
                    ret = ret + options.fn(items[i]);
                    if (i === 4 && total>5) {
                        ret = ret + '<div class="more_comment"><a class="more_comment_link" data-href="' + more_url + '#yhdp" target="_blank">更多点评<b></b></a></div>';
                    }
                    ret = ret + '</dd>';
                }
                return ret += '</dl>';
            });
            Handlebars.registerHelper('DealTime', function (date) {
                var dateDivide = date.indexOf(' ');
                return date.substr(0, dateDivide != -1 ? dateDivide : date.length);
            });
        },
        showCommentPanel: function ($el) {
            $el.find('.comment_content').stop(true,true).slideUp();
            $el.find(commentClass + ' b').removeClass('up').addClass('down');
        },
        hideCommentPanel: function ($el) {
            $el.find('.comment_content').stop(true,true).slideDown();
            $el.find(commentClass + ' b').removeClass('down').addClass('up');
        },
        judgeCalendar: function ($el) {
            if ($el.find('.sea_schedule b').hasClass('up')) {
                $el.find('.sea_schedule b').removeClass('up').addClass('down');
                $el.find('.calendar_top').hide();
                $el.find('.reference_price').hide();
                $el.find('.loading_tip02').hide();
            }
        },
        init: function () {
            SearchComment.helpers();
            //bind事件
            $commentContainer.delegate(commentClass, 'click', function (e) {
                e.preventDefault();
                var $that = $(this);
                var parentItem = $that.parents('li');
                var commentPanel = parentItem.find('.comment_content');
                SearchComment.judgeCalendar(parentItem);
                if ($that.find('b').hasClass('up')) {
                    if (commentPanel.length > 0) {
                        //收起
                        SearchComment.showCommentPanel(parentItem);
                    }
                } else {
                    if (commentPanel.length > 0) {
                        //放下
                        SearchComment.hideCommentPanel(parentItem);
                    } else if (parentItem.find(ajaxClass).length < 1) {
                        //加载数据 测试格式ok
                        var comment_param = $that.data('comment');
                        SearchComment.getComments('/booking/Ajax/DetailNew/ProductCommentSearch.ashx?pkg=' + comment_param.ProductID + '&destEname=sanya&districtID=61&country=1&pageIndex=1', parentItem, comment_param.Url);
                    }
                }

                return false;
            });

            $commentContainer.delegate(".more_comment_link", 'click', function (e) {
                window.open($(this).attr('data-href'), '_blank');
                return false;
            });
        }
    }
    exports.init = SearchComment.init;
});