/**
 * 欧铁其他页面引用
 * @author hybu@ctrip.com
 * @createdate: 2014/01/06
 */
define(function(require, exports, module) {
    var $ = require('./../../../lib/jquery');
    var outieCommon = {
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
        tpl: {
        },
        init: function() {
            var self = this;
            return function() {
                $(document).ready(function() {
                    self.common.goTop();
                });
            }
        }
    }
    exports.init = outieCommon.init.call(outieCommon);
});