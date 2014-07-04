define(function(require, exports, module) {
    var $ = require('./../../../lib/jquery');

    var visaCollect = {
        common: { //公用的函数
            render: function(tpl, data, handle, cb) {
                var Template = Handlebars.compile(tpl);
                var html = Template(data);
                typeof handle === 'function' && handle.call(this, html);
                typeof cb === 'function' && cb.call(this, html);
                return html;
            },
            fetchData: function(opts, cb) { //ajax
                var self = this;
                $.ajax({
                    type: opts.method || 'POST',
                    url: opts.url || self.config.fetchUrl,
                    data: opts.data,
                    dataType: opts.type || 'json',
                    // timeout : 5000,
                    success: function(data) {
                        cb.call(self, data);
                    },
                    error: function(msg) {
                        // alert(msg)
                    }
                });
            },
            // 回到顶端按钮判断显示
            goTop: function() {
                var showGoTop, _scrollTop;
                var $toTopDiv = $("div.label_list3");
                var firstRun = 0;
                // 判断是否应该显示回到顶端按钮
                function goTopShouldShow() {
                    _scrollTop = document.documentElement.scrollTop + document.body.scrollTop;
                    if (_scrollTop > document.documentElement.clientHeight && !$toTopDiv.is(":visible")) {
                        // 第一次显示的时候由于对象为a元素，不能用fadeIn()，强制显示为diplay block。之后可以使用fadeIn()
                        if (!firstRun) {
                            $toTopDiv.css("display", "block");
                            firstRun++;
                        } else {
                            $toTopDiv.fadeIn();
                        }
                    } else if (_scrollTop <= document.documentElement.clientHeight && $toTopDiv.is(":visible")) {
                        $toTopDiv.fadeOut();
                    }
                };
                // 页面载入时先运行一下，防止当页面打开时已经在第一屏以下时不显示按钮
                goTopShouldShow();
                // 绑定
                $(window).bind("resize scroll", function() {
                    // 300毫秒延时，防止频繁运行
                    clearTimeout(showGoTop);
                    showGoTop = setTimeout(goTopShouldShow, 300);
                });
            }
        },
        tpl: {},
        // Tab 切换
        faqTab: function() {
            var self = this;
            var jTab = $('#rela_faq');
            var jTabHd = jTab.find('.faq_tab');
            var jTabContent = jTab.find('.faq_list');
            return {
                init: function() {
                    var me = this;
                    me.bind();
                },
                bind: function() {
                    var index;
                    var jCur;
                    jTabHd.delegate('a', 'click', function() {
                        index = $(this).index();
                        // Tab切换
                        $(this).siblings().removeClass('current');
                        $(this).addClass('current');
                        // Content切换
                        jTabContent.hide();
                        $(jTabContent.get(index)).show();
                    });
                }
            }
        },
        visaScrollTab: function() {
            var self = this;
            var jTabWrap = $('ul.c_hd');
            var jTabBtn = jTabWrap.find('a');
            var jCon = $('div.c_mod');
            var bClick;

            // 有页面没有scrollTab，所以验证
            var tabHeight = jTabWrap.height() ? jTabWrap.height() : 0;
            var tabTop = jTabWrap.offset() ? jTabWrap.offset().top : 0;
            // 俩个content之间的间隔(这里就是margin-bottom)，所以也要减去
            var gap = 20;
            var aConTop = [];

            return {
                init: function() {
                    var me = this;
                    me.calcuModPosn();
                    me.scrollFix();
                    me.selTab();

                    // 点击归点击事件找到其位置，滚动归滚动事件找到其位置
                    $(document).on('DOMMouseScroll mousewheel', function(e) {
                        bClick = false;
                    });
                },
                calcuModPosn: function() {
                    jCon.each(function() {
                        aConTop.push($(this).offset().top - tabHeight - gap);
                    });
                },
                scrollFix: function() {
                    var me = this;
                    var scrollTop;
                    $(window).scroll(function() {
                        scrollTop = $(window).scrollTop();
                        if (scrollTop >= tabTop) {
                            jTabWrap.addClass('fixed');
                            me._scrollTab(scrollTop);
                        } else {
                            jTabWrap.removeClass('fixed');
                        }
                    });
                },
                _scrollTab: function(scrollTop) {
                    var me = this;
                    var jCur;
                    var index;
                    var nextTop;
                    // 设定bClick为true，此处是为了scroll事件滚动判定，不触发滚动事件
                    if (!bClick) {
                        $.each(aConTop, function(i, n) {
                            // 大于第i个且小于他的i+1个(且i+1存在)，那么就定位在第i个上
                            // 否则就是最后一个
                            nextTop = aConTop[i + 1];
                            if (scrollTop > n && nextTop && scrollTop < nextTop) {
                                jCur = jTabWrap.find('a:eq(' + i + ')');
                                jTabBtn.removeClass('cur');
                                jCur.addClass('cur');
                                return false;
                            } else if (scrollTop > aConTop[aConTop.length - 1]) {
                                index = aConTop.length - 1;
                                jCur = jTabWrap.find('a:eq(' + index + ')');
                                jTabBtn.removeClass('cur');
                                jCur.addClass('cur');
                            }
                        });
                    }
                },
                /**
                 * 设定bClick为true，此处是为了scroll事件滚动判定，不触发滚动事件
                 * 这个方式巧妙的绕过如果屏幕很长，一屏就可以到底，然后点击tab，
                 * 无法正常显示current tab的问题，点击归点击事件找到其位置，滚动归滚动事件找到其位置
                 */
                selTab: function() {
                    var index;
                    var posn;
                    jTabWrap.delegate('a', 'click', function() {
                        index = $(this).parent().index();
                        posn = aConTop[index];

                        jTabBtn.removeClass('cur');
                        jTabWrap.find('a:eq(' + index + ')').addClass('cur');
                        // 这个因为美观，所以要加上gap，直接到他的“正”上方
                        bClick = true;
                        $(window).scrollTop(posn + gap);
                    });
                }
            }
        },

        init: function() {
            var self = this;
            return function() {
                GV.ready(function() {
                    self.common.goTop();

                    self.visaScrollTab().init();
                    self.faqTab().init();
                });

            }
        }
    }
    exports.init = visaCollect.init.call(visaCollect);

});