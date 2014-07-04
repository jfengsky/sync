define(function (require, exports, module) {
    /*
    * @Author :    qxzhan
    * @Date   :    2013/12/03
    * @Desc   :    点评 咨询 邮件订阅 简单行程复杂行程切换  小图滑动显示大图
    */
    var $ = require("../../../lib/jquery.js"),
        EventEmitter = require("Modules/EventEmitter");
    var dping = {
        init: function () {
            dping.answer.showAnswer(); /*用户咨询*/
            dping.question.showQuestion(); /*用户点评*/
            dping.email.showEmail(); /*邮件订阅*/
            dping.simple(); /*简单行程复杂行程切换*/
            dping.picture.showPicture(); /*小图滑动显示大图*/
            dping.animate();/*滚动预订区*/
        },
        reInit: function(){     //行程介绍ajax切换之后重新绑定事件
            dping.email.showEmail();
            dping.simple();
            dping.picture.showPicture();
        },
        /*依赖的DOM结构 最好不要更改*/
        dom: {
            pageNumber: "[data-type=\"pageNumber\"]",
            pageSearch: "[data-type=\"pageSearch\"]",
            pageDataList: "[data-type=\"pageDataList\"]",
            loading: "js_dpingDoading",
            seeking: "js_seekingDoading",
            nothing: "js_dpingNothing",
            question: "#js_questionData",
            questionPage: "#js_questionDataPage",
            answer: "#js_answerData",
            answerDataPage: "#js_answerDataPage",
            answerDataPageDiv: "#js_answerDataPage_Div",
            answerDataText: "#js_answerDataText",
            answerDataSearch: "#js_answerDataSearch",
            answerDataSort: "#js_answerDataSort",
            ask: "#js_answerDataAsk",
            mask: "#js_questions_mask",
            close: "#js_questions_mask_close",
            button: "#js_questions_button",
            textarea: "#js_questions_textarea",
            select: "#js_questions_select",
            emailDiv: "#js_email_Div",
            iconMail: "#js_icon_mail",
            emailUsername: "#js_email_username",
            emailEmail: "#js_email_email",
            emailSend: "#js_email_send",
            emailClose: "#js_email_close",
            emailLink: "#js_email_link_close",
            emailOk: "#js_email_Ok",
            emailOkClose: "#js_email_Ok_close",
            detailTravel: "#js_detail_travel",
            simpleTravel: "#js_simple_travel",
            simpleNoShow: ".js_simple_no_show",
            detailTravelCtrip: "#js_detail_travelCtrip",
            current: "current",
            picture: "#js_picture",
            pictureImg: "#js_picture_img"
        },
        tips: {
            /*加载中提示*/
            loading: function (pId, pElement) {
                var _loading = $('#' + pId);
                    if (!_loading.length) {
                        _loading = $('<div class="c_loading detail_loading" id="' + pId + '"/>');
                        _loading.html('<img alt="" src="http://pic.c-ctrip.com/packages111012/loading_50-0816.gif"><strong>查询中，请稍候...</strong>').appendTo(pElement);
                    } else {
                        _loading.remove();
                    }
            },
            /*错误提示*/
            nothing: function (pId, pElement) {
                var _nothing = $('<p  data-type="' + pId + '" style="padding-top:15px;"/>');
                    _nothing.html('对不起，网络异常，请尝试刷新或者重新翻页...').appendTo(pElement);
            },
            none: function (pId, pElement) {
                var _nothing = $('<p  data-type="' + pId + '" style="padding-top:15px;" />');
                    _nothing.html('暂无该产品咨询！对本线路有任何疑问，请在此提问咨询。我们的工作人员将尽快回复您。').appendTo(pElement);
            }

        },
        common: {
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
            /*分页控件*/
            page: function (pElement, pNumber, pFun) {
                cQuery.mod.load('page', '1.2', function () {
                    var config = {
                        options: {
                            min: 1,
                            max: pNumber,
                            step: 5,
                            current: 1,
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
                            pageStyle: ".pkg_page_new {padding:10px 0;height:26px}\
                                        .pkg_page_new .c_page_list a{float:left;width: 24px;padding: 3px 0 3px 0;text-align:center;color:#0065bb;border:1px solid #ccc;background-color: #fff;margin-right:3px;height:auto;font-weight:normal }\
                                        .pkg_page_new .c_page_list .current,.pkg_page_new .c_page_list a:hover{color: #fff;border:1px solid #3da0e7; background-color: #64bbfa; font-weight: bold;}\
                                        .pkg_page_new .c_page_list a:hover{background-color: #fff;color:#0065bb;font-weight:normal}\
                                        .pkg_page_new .c_page_list .current:hover{background-color:#64bbfa;color:#fff;font-weight:bold}\
                                        .pkg_page_new .c_page_submit{color:#000;background-color:#fff}\
                                        .pkg_page_new .c_down:hover,.pkg_page_new .c_up:hover{text-decoration: none;color:#0065bb;border:1px solid #3da0e7;background-color:#fff}\
                                        .pkg_page_new .c_page_num{line-height:16px;}\
                                        .pkg_page_new .c_page_submit:hover{border:1px solid #3da0e7}"
                        }
                    };
                    cQuery(pElement).regMod('page', '1.2', config);
                });
            },
            /*绑定错误提示*/
            returnValidate: cQuery(document).regMod('validate', '1.1'),
            rerurnError: function (pStr, pData) {
                cQuery.mod.load('validate', '1.1', function () {
                    dping.common.returnValidate.method("show", {
                        $obj: pStr,
                        data: pData,
                        errorClass: "false",
                        isScroll: false
                    });
                });
            },
            /*判断是否为空*/
            deleteEmpty: function (pStr) {
                return pStr.replace(/(^\s*)|(\s*$)/g, "");
            },
            /*Email验证*/
            checkEmail: function (pStr) {
                return !/^([a-zA-Z0-9]+[_|\_|\.|-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.|-]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(pStr);
            },
            noBorder : function(pages,pLen){
             Handlebars.registerHelper('noborder', function(pNumber) {
                  if (pages == 1 && pLen == pNumber + 1) {
                    return new Handlebars.SafeString(
                      "class=\"noborder\""
                    )
                  } 
                });
             }
        },
        /*用户咨询*/
        answer: {
            templent: '<ul class="visa_question_tnt" data-type="pageDataList">\
                          {{#CommentList}}\
                              <li {{#noborder @index}}{{/noborder}}>\
                                <p class="{{QuestionTitleClass}}"><span class="icon_l icon_ask">{{QuestionTitle}}：</span>\
                                <a class="seo_link" href="{{QqUrl}}" title="{{Question}}" target="_blank">{{Question}}</a><span class="grey">（{{UID}}&nbsp;&nbsp;{{QDate}}）</span></p>\
                                {{#if Answer}}<p class="visa_question_blue"><span class="icon_l icon_reply">携程回复：</span>{{Answer}}</p>{{/if}}\
                              </li>\
                            {{/CommentList}}\
                      </ul>',
            login: '<iframe id="__SSO_iframe_0" frameborder="0" scrolling="no" width="350px" height="403px" src="" style="display:none;"></iframe>',
            page: '<div class="basefix" id="js_answerDataPage_Div"><div class="float_right basefix pkg_page_new" id="js_answerDataPage"></div></div>',
            url: "/booking/Ajax/DetailNew/ProductQuestionAndAnswerSearch.ashx",
            keyWord: "",
            /*切换的时候判断是否带上搜索关键字*/
            searchKeyword: function () {
                return dping.common.deleteEmpty($(dping.dom.answerDataText).val()).length > 0 ? dping.answer.keyWord : "";
            },
            createPage: function () {
                $(dping.dom.answer).after(Handlebars.compile(dping.answer.page)());
            },
            /*错误提示*/
            wrong : function(){
                var _answer = dping.dom.answer,
                   _loading = dping.dom.loading,
                   _nothing = dping.dom.nothing;
                   dping.tips.loading(_loading, _answer);
                   dping.tips.none(_nothing, _answer);
            },
            /*分页显示数据*/
            showPage: function (current) {
                var _answer = dping.dom.answer,
                    _loading = dping.dom.loading,
                    _nothing = dping.dom.nothing,
                    _pageDataList = dping.dom.pageDataList,
                    _temp = dping.answer.templent,
                    _answerDataPage = dping.dom.answerDataPage,
                    _pageNumber = dping.dom.pageNumber,
                    _pageSearch = dping.dom.pageSearch,
                    _answerDataText = dping.dom.answerDataText,
                    _para = $(_answer).data("src").type + "&uid=" + $(_answer).data("src").uid + "&searchKeyWord=" + escape(dping.answer.searchKeyword());
                    /*请求前的数据已经加载完成才加载*/
                    if ($(_answer).find("#" + _loading).length == 0) {
                        if (!isNaN(current)) {
                            $(_answer).find(_pageDataList).remove();
                            $(_answer).find("[data-type=\"" + _nothing + "\"]").remove();
                            dping.tips.loading(_loading, _answer);
                            $.ajax({
                                url: dping.answer.url,
                                data: _para + "&pageIndex=" + current + "&category=" + $(_answer).data("src").category,
                                success: function (data) {
                                    var _data = $.parseJSON(data);
                                        if (_data.errno == 0 && _data.data.CommentList.length > 0) {
                                            dping.tips.loading(_loading, _answer);
                                            dping.common.noBorder(0 , _data.data.CommentList.length);
                                            dping.common.view(_temp, _answer, _data.data);
                                        } else {
                                            dping.answer.wrong();
                                        }
                                },
                                error: function () {
                                   dping.answer.wrong();
                                }
                            })
                        } else {
                            dping.common.rerurnError(cQuery(_answerDataPage).find(_pageSearch), "请输入正确的页数");
                            $(_answerDataPage).find(_pageNumber).val("");
                        }
                    }
            },
            /*资讯分类切换，如果用户在搜索框中输入了内容，切换的时候需要带上搜索内容*/
            showItem: function () {
                var _answerDataSort = dping.dom.answerDataSort,
                    _answerDataText = dping.dom.answerDataText,
                    _answer = dping.dom.answer,
                    _pageDataList = dping.dom.pageDataList,
                    _answerDataPage = dping.dom.answerDataPage,
                    _answerDataPageDiv = dping.dom.answerDataPageDiv,
                    _loading = dping.dom.loading,
                    _nothing = dping.dom.nothing,
                    _answerDataSearch = dping.dom.answerDataSearch,
                    _temp = dping.answer.templent,
                    _para = $(_answer).data("src").type + "&uid=" + $(_answer).data("src").uid + "&pageIndex=1&category=";
                    $(_answerDataSort).delegate("a", "click", function () {
                        var _category = $(this).data("category");
                            /*请求前的数据已经加载完成才加载*/
                            if ($(_answer).find("#" + _loading).length == 0 && _category != $(_answer).data("src").category) {
                                $(_answer).find(_pageDataList).remove();
                                $(_answer).find("[data-type=\"" + _nothing + "\"]").remove();
                                dping.tips.loading(_loading, _answer);
                                $(this).siblings("a").removeClass("select");
                                $(this).addClass("select");
                                $(_answer).data("src").category = _category;
                                $(_answerDataPageDiv).remove();
                                $.ajax({
                                    url: dping.answer.url,
                                    data: _para + _category + "&searchKeyWord=" + escape(dping.answer.searchKeyword()),
                                    success: function (data) {
                                        var _data = $.parseJSON(data);
                                            if (_data.errno == 0 && _data.data.CommentList.length > 0) {
                                                var _num = dping.common.num(5, _data.data.TotalPageCount);
                                                    dping.tips.loading(_loading, _answer);
                                                    dping.common.noBorder(_num , _data.data.CommentList.length);
                                                    dping.common.view(_temp, _answer, _data.data);
                                                    dping.answer.createPage();
                                                    if (_num > 1) {
                                                        dping.common.page(_answerDataPage, _num, dping.answer.showPage);
                                                    }
                                                    else {
                                                       $(_answerDataPageDiv).remove();
                                                    }

                                            } else {
                                                dping.answer.wrong();
                                            }
                                    },
                                    error: function () {
                                      dping.answer.wrong();
                                    }
                                })
                            }
                    })
            },
            /*资讯内容搜索*/
            search: function () {
                var _answerDataText = dping.dom.answerDataText,
                    _answer = dping.dom.answer,
                    _pageDataList = dping.dom.pageDataList,
                    _answerDataPage = dping.dom.answerDataPage,
                    _answerDataPageDiv = dping.dom.answerDataPageDiv,
                    _loading = dping.dom.loading,
                    _nothing = dping.dom.nothing,
                    _answerDataSearch = dping.dom.answerDataSearch,
                    _temp = dping.answer.templent;
                    $(_answerDataSearch).on("click", function () {
                        var _str = escape(dping.common.deleteEmpty($(_answerDataText).val()));
                            /*请求前的数据已经加载完成才加载*/
                            if ($(_answer).find("#" + _loading).length == 0) {
                                 /*存储搜索关键字*/
                                    dping.answer.keyWord = _str;
                                    $(_answer).find(_pageDataList).remove();
                                    $(_answerDataPageDiv).remove();
                                    dping.tips.loading(_loading, _answer);
                                    $(_answer).find("[data-type=\"" + _nothing + "\"]").remove();
                                    $.ajax({
                                        url: dping.answer.url,
                                        data: $(_answer).data("src").type + "&uid=" + $(_answer).data("src").uid + "&category=" + $(_answer).data("src").category + "&searchKeyWord=" + _str + "&pageIndex=1",
                                        success: function (data) {
                                            var _data = $.parseJSON(data);
                                                if (_data.errno == 0 && _data.data.CommentList.length > 0) {
                                                    var _num = dping.common.num(5, _data.data.TotalPageCount);
                                                        dping.tips.loading(_loading, _answer);
                                                        dping.common.noBorder(_num , _data.data.CommentList.length);
                                                        dping.common.view(_temp, _answer, _data.data);
                                                        dping.answer.createPage();
                                                        if(_num > 1) {
                                                            dping.common.page(_answerDataPage, _num, dping.answer.showPage);
                                                        }
                                                        else {
                                                           $(_answerDataPageDiv).remove(); 
                                                        }
                                                }
                                                else {
                                                    dping.answer.wrong();
                                                }
                                        },
                                        error: function () {
                                            dping.answer.wrong();
                                        }
                                    })
                                }
                            else {
                                dping.common.rerurnError(cQuery(_answerDataSearch), "正在为您加载数据中，请稍后搜索");
                            }
                    })
            },
            /*提问成功以后，重新刷新页面*/
            arraign: function () {
                var _answerDataText = dping.dom.answerDataText,
                     _answer = dping.dom.answer,
                     _pageDataList = dping.dom.pageDataList,
                     _answerDataPage = dping.dom.answerDataPage,
                     _answerDataPageDiv = dping.dom.answerDataPageDiv,
                     _loading = dping.dom.loading,
                     _nothing = dping.dom.nothing,
                     _temp = dping.answer.templent;
                    /*请求前的数据已经加载完成才加载*/
                    if ($(_answer).find("#" + _loading).length == 0) {
                        $(_answer).find(_pageDataList).remove();
                        $(_answerDataPageDiv).remove();
                        dping.tips.loading(_loading, _answer);
                        $(_answer).find("[data-type=\"" + _nothing + "\"]").remove();
                        $.ajax({
                            url: dping.answer.url,
                            data: $(_answer).data("src").type + "&uid=" + $(_answer).data("src").uid + "&category=" + $(_answer).data("src").category + "&pageIndex=1",
                            success: function (data) {
                                var _data = $.parseJSON(data);
                                    if (_data.errno == 0 && _data.data.CommentList.length > 0) {
                                     var _num = dping.common.num(5, _data.data.TotalPageCount);
                                         dping.tips.loading(_loading, _answer);
                                         dping.common.noBorder(_num , _data.data.CommentList.length);
                                         dping.common.view(_temp, _answer, _data.data);
                                         dping.answer.createPage();
                                         if (_num > 1) {
                                            dping.common.page(_answerDataPage, _num, dping.answer.showPage);
                                         }
                                         else {
                                            $(_answerDataPageDiv).remove(); 
                                         }

                                     }
                                    else {
                                        dping.answer.wrong();
                                    }
                            },
                            error: function () {
                                  dping.answer.wrong();
                            }
                        })
                    }
            },
            /*用户提问，提问之前需要做登录判断*/
            ask: function () {
                var _ask = dping.dom.ask,
                    _close = dping.dom.close,
                    _mask = dping.dom.mask,
                    _button = dping.dom.button,
                    _textarea = dping.dom.textarea,
                    _select = dping.dom.select,
                    _emailOk = dping.dom.emailOk,
                    _emailOkClose = dping.dom.emailOkClose,
                    _login = dping.answer.login,
                    _answerDataSearch = dping.dom.answerDataSearch;
                    //dping.common.view(_login, "body");
                    $(_ask).bind("click", function () {
                        /*如果用户没有登录 则弹出登录控件*/
                        __SSO_booking_1("detailConsultationQuestion", '0');
                    })
                    $(_close).bind("click", function () {
                        cQuery(_mask).unmask();
                    })
                    $(_button).bind("click", function () {
                        var _str = escape(dping.common.deleteEmpty($(_textarea).val()));
                          if (_str.length > 0) {
                                $(_button).val("提交中...");
                                $.ajax({
                                    url: "/booking/Ajax/DetailNew/QuestionAdd.ashx",
                                    type: "post",
                                    //  data: $(dping.dom.mask).data("type") + "&category=" + $(_select).val() + "&question=" + _str,
                                    data: {
                                        category: $(_select).val(),
                                        question: _str,
                                        qSite: GV.app.detail.data.StartCityName || "",
                                        pkg: GV.app.detail.data.ProductID || ""

                                    },
                                    success: function (data) {
                                        var _data = $.parseJSON(data);
                                        if (_data.errno == 0) {
                                            cQuery(_mask).unmask();
                                            $(_textarea).val("");
                                            /*提问成功以后，根据uid重新请求数据*/
                                            dping.answer.arraign();
                                        }
                                        else {
                                            dping.common.rerurnError(cQuery(_textarea), "网络异常，请重新提交您要咨询的问题");
                                        }
                                        $(_button).val("提问");
                                    },
                                    error: function () {
                                        $(_button).val("提问");
                                        dping.common.rerurnError(cQuery(_textarea), "网络异常，请重新提交您要咨询的问题");
                                    }
                                })
                            } else {
                                dping.common.rerurnError(cQuery(_textarea), "请输入您要咨询的问题");
                            }
                    })
            },
            /*获取记录总数，显示分页*/
            showAnswer: function () {
                var _answerDataPage = dping.dom.answerDataPage,
                    _page = $(dping.dom.answer).data("src").page,
                    _num = dping.common.num(5, _page);
                    if(_num > 1){
                       dping.answer.createPage();
                       dping.common.page(_answerDataPage, _num, dping.answer.showPage); 
                    }
                    else{
                        $(dping.dom.answer).find("li:last").addClass("noborder");
                    }
                    dping.answer.showItem();
                    dping.answer.search();
                    dping.answer.ask();
            }
        },
        /*用户点评*/
        question: {
            templent: '<ul class="pkg_user_comments_m"  data-type="pageDataList">\
                        {{#QAndAs}}\
                          <li class="basefix">\
                          <div class="user_left">\
                          <h4><a class="seo_link" href="{{Url}}" title="{{CommentTitle}}" target="_blank">{{CommentTitle}}</a>\
                          <a class="pkg-heart-{{CommentGrade}}" title="" href="javascript:void(0);"><span>{{CommentGrade}}分&nbsp;&nbsp;{{ScoreRemark}}</span></a></h4>\
                          <p>{{CommentContent}}</p>\
                          {{#if LastReplyContent}}<p class="ctrip_feedback"><strong>携程回复：</strong>{{LastReplyContent}}<span>({{LastReplyDate}})</span></p>{{/if}}\
                          <div class="user_pro basefix"><span class="pkg_user_time">用户{{UID}}&nbsp;&nbsp;&nbsp;{{CommentDate}}</span></div>\
                          </div>\
                          </li>\
                      {{/QAndAs}}\
                     </ul>',
            page: '<div class="basefix"><div class="float_right basefix pkg_page_new" id="js_questionDataPage"></div></div>',
            /*分页显示数据*/
            showPage: function (current) {
                var _question = dping.dom.question,
                    _questionPage = dping.dom.questionPage,
                    _pageDataList = dping.dom.pageDataList,
                    _seeking = dping.dom.seeking,
                    _temp = dping.question.templent,
                    _pageNumber = dping.dom.pageNumber,
                    _pageSearch = dping.dom.pageSearch,
                    _nothing = dping.dom.nothing,
                    _wrong = function(){
                       dping.tips.loading(_seeking, _question);
                       dping.tips.nothing(_nothing, _question);
                    };
                    /*请求前的数据已经加载完成才加载*/
                    if ($(_question).find("#" + _seeking).length == 0) {
                        if (!isNaN(current)) {
                            $(_question).find(_pageDataList).remove();
                            $(_question).find("[data-type=\"" + _nothing + "\"]").remove();
                            dping.tips.loading(_seeking, _question);
                            $.ajax({
                                url: "/booking/Ajax/DetailNew/ProductCommentSearch.ashx",
                                data: $(dping.dom.question).data("src").type + "&pageIndex=" + current,
                                success: function (data) {
                                    var _data = $.parseJSON(data);
                                        if (_data.errno == 0 && _data.data.QAndAs.length > 0) {
                                            dping.tips.loading(_seeking, _question);
                                            dping.common.view(_temp, _question, _data.data);
                                         } else {
                                            _wrong();
                                        }
                                        /*发布事件*/
                                        GV.emit('dp-tab-click');
                                },
                                error: function () {
                                     _wrong();
                                }
                            })
                        } else {
                            dping.common.rerurnError(cQuery(_questionPage).find(_pageSearch), "请输入正确的页数");
                            $(_questionPage).find(_pageNumber).val("");
                        }
                    }
            },
            /*获取记录总数，显示分页*/
            showQuestion: function () {
                var _page = $(dping.dom.question).data("src").page,
                    _num = dping.common.num(5, _page);
                  if(_num > 1){
                       $(dping.dom.question).after(Handlebars.compile(dping.question.page)());
                        dping.common.page(dping.dom.questionPage, _num, dping.question.showPage); 
                    }
                    else {
                      $(dping.dom.question).find("li:last").css("border","0px");
                    }
                 }
        },
        /*邮件订阅*/
        email: {
            emailBox: '<div class="email_pop" id="js_email_Div" style="display:none">\
                       <ul>\
                         <li><label for="">姓名</label><input type="text" name="username" id="js_email_username"></li>\
                         <li><label for="">Email</label><input type="text" name="email" id="js_email_email"></li>\
                       </ul>\
                      <div class="btn_wrap">\
                        <a href="javascript:void(0);" class="yes" id="js_email_send">确定</a>\
                        <a href="javascript:void(0);" class="no" id="js_email_close">取消</a>\
                     </div>\
                   <a  class="close" href="javascript:void(0);" id="js_email_link_close">×</a>\
                 </div>',
            emailOk: '<div  class="email_pop" id="js_email_Ok" style="display:none">\
                        <div class="send_success">邮件已经发送，请查收您的邮箱。</div>\
                    <a  class="close" href="javascript:void(0);" id="js_email_Ok_close">×</a>\
                 </div>',
            showEmail: function () {
                var _iconMail = dping.dom.iconMail,
                    _emailDiv = dping.dom.emailDiv,
                    _emailSend = dping.dom.emailSend,
                    _emailUsername = dping.dom.emailUsername,
                    _emailEmail = dping.dom.emailEmail,
                    _emailClose = dping.dom.emailClose,
                    _emailLink = dping.dom.emailLink,
                    _emailOk = dping.dom.emailOk,
                    _emailOkClose = dping.dom.emailOkClose;
                   /*控制开发，避免用户重复订阅*/
                    $("body").append(Handlebars.compile(dping.email.emailBox)(), Handlebars.compile(dping.email.emailOk)());
                    $(_iconMail).bind("click", function () {
                        cQuery(_emailDiv).mask();
                        $(_emailSend).html("确定");
                    })
                    $(_emailLink).bind("click", function () {
                        cQuery(_emailDiv).unmask();
                    })
                    $(_emailClose).bind("click", function () {
                        cQuery(_emailDiv).unmask();
                    })
                    $(_emailOkClose).bind("click", function () {
                        cQuery(_emailOk).unmask();
                    })
                    $(_emailSend).bind("click", function () {
                        var _userName = dping.common.deleteEmpty($(_emailUsername).val()),
                            _email = dping.common.deleteEmpty($(_emailEmail).val());
                            if (_userName.length == 0) {
                                dping.common.rerurnError(cQuery(_emailUsername), "请输入姓名");
                                return false;
                            }
                            if (_email.length == 0) {
                                dping.common.rerurnError(cQuery(_emailEmail), "请输入Email");
                                return false;
                            } else if (dping.common.checkEmail(_email)) {
                                dping.common.rerurnError(cQuery(_emailEmail), "请填写正确的Email地址，格式：a@b.c");
                                return false;
                            }
                            $(_emailSend).html("订阅中...");
                            setTimeout(function () {
                                 cQuery(_emailDiv).unmask();
                                 cQuery(_emailOk).mask();
                                  setTimeout(function () {
                                cQuery(_emailOk).unmask()
                            }, 1000);
                            }, 1500);
                        $.ajax({
                        type: "POST",
                        url: "/booking/handler2/newgroupdetail/sendemail.ashx",
                        data: "email=" + _email + "&fullname=" + _userName + "&pkgid=" + GV.app.detail.data.ProductID,
                        success: function (data) {
                        }
                    })
                 })
              }
        },
        /*简单行程和复杂行程切换*/
        simple: function () {
            var _detailTravel = dping.dom.detailTravel,
                _simpleTravel = dping.dom.simpleTravel,
                _simpleNoShow = dping.dom.simpleNoShow,
                _current = dping.dom.current;
                if($(_detailTravel).length>0){
                    $(_detailTravel).bind("click", function () {
                    $(_simpleTravel).removeClass(_current);
                    $(_detailTravel).addClass(_current);
                    $(_simpleNoShow).show();
                    /*发布事件，便于行程与时间对应*/
                    GV.emit('route-tab-click');
                 })  
                }
                if($(_simpleTravel).length>0){
                    $(_simpleTravel).bind("click", function () {
                    $(_detailTravel).removeClass(_current);
                    $(_simpleTravel).addClass(_current);
                    $(_simpleNoShow).hide();
                    /*发布事件，便于行程与时间对应*/
                    GV.emit('route-tab-click');
                 }) 
                }
            },
        /*滑动到小图展现大图*/
        picture: {
            telement: '<div id="js_picture" style="display:none;position:absolute;border:2px solid #DCDCDC;overflow:hidden;background:#fff url(http://pic.c-ctrip.com/packages111012/loading_50-0816.gif) no-repeat center;z-index:9999">\
                         <img id="js_picture_img" src="" style="border:2px solid #fff"/>\
                      </div>',
            showPicture: function () {
               $("body").append(Handlebars.compile(dping.picture.telement)());
                var _detailTravelCtrip = dping.dom.detailTravelCtrip,
                    _picture = dping.dom.picture,
                    _x = 20,
                    _y = 20,
                    _error = "http://pic.c-ctrip.com/hotels121118/bg_nopic2.png", //加载失败提示错误图片
                    _errorWidth = "290px",
                    _errorHeight = "206px",
                    _photo = dping.dom.pictureImg,
                    _windowWidth = $(window).width(),
                    _container = document.getElementById("js_detail_travelCtrip");
                    $(window).bind("resize",function(){
                       _windowWidth = $(window).width(); 
                    })
                    /*添加图片延迟加载*/
                    if(_container){
                    cQuery.mod.load('lazyLoad','1.0',function(){
                       cQuery(_container).regMod('lazyLoad','1.0',{
                         loadingImage:"",
                         placeholder:"http://pic.c-ctrip.com/vacation_v2/group_travel/place_hold_m.png"
                       })
                    })
                    }
                    if($(_detailTravelCtrip).length > 0 && $(_detailTravelCtrip).find("img").length > 0){
                        $(_detailTravelCtrip).delegate("img", "mouseover", function (e) {
                        var _img = new Image();
                            _img.src = $(this).attr("src");
                        var _width = _img.width,
                            _height = _img.height,
                            _pageX = e.pageX + _x,
                            _pageY = e.pageY + _y;
                            //超出一定大小的图片缩放处理 图片的比例相同
                            if (_width > 593) {
                                _width = 593;
                                _height = 353;
                            }
                            //避免出现横向滚动条
                            if ((e.pageX + 3 * _x + _width) > _windowWidth) {
                                _pageX = _windowWidth - _width - 3 * _x
                            }
                            $(_picture).css({
                                "left": _pageX + "px",
                                "top": _pageY + "px",
                                "width": _width + 4,
                                "height": _height + 4
                            })
                           $(_photo).css({
                                "width": _width,
                                "height": _height
                            })
                            $(_photo).attr("src", $(this).attr("src"));
                            //图片加载失败提示
                            _img.onerror = function () {
                                $(_picture).css({
                                    "width": _errorWidth + 4,
                                    "height": _errorHeight + 4
                                })
                                $(_photo).attr("src", _error);
                            }
                            $(_picture).show();
                           }).delegate("img", "mousemove", function (e) {
                               var _img = new Image();
                                   _img.src = $(this).attr("src");
                               var  _width = _img.width,
                                    _height = _img.height,
                                    _pageX = e.pageX + _x,
                                    _pageY = e.pageY + _y;
                                if ((e.pageX + 3 * _x + _width) > _windowWidth) {
                                    _pageX = _windowWidth - _width - 3 * _x
                                }
                                $(_picture).css({
                                    "left": _pageX + "px",
                                    "top": _pageY + "px"
                                })
                        }).delegate("img", "mouseout", function () {
                            $(_picture).hide();
                        })
                    }
                }
        },
          animate: function(){
          if(!$("#js_photoviewer").length) return;
           $("html").animate({scrollTop:$("#js_photoviewer").offset().top-2},600);
        }
    }
    exports.init = dping.init;
    exports.reInit = dping.reInit;
});