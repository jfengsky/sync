/**
 * 签证首页改版
 * @author hybu@ctrip.com
 * @createdate: 2013/12/25
 */
define(function(require, exports, module) {
    var $ = require('./../../../lib/jquery');

    // svgmap为攻略组的JS代码借用过来
    // 需要先载入raphael.js，由于raphael会和cQuery抢用$，需要单独引入
    require('./svgmap.js');
    // 用到address, validate cQuery控件
    cQuery.mod.load('address', '1.0', function() {});
    cQuery.mod.load('validate', '1.1', function() {});
    // 公用validate控件实例
    var cqRegValid = cQuery(document).regMod('validate', '1.1');

    /**
     * 签证首页改版JS代码
     */
    var visaModule = {
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
            /**
             * 创建Mask，使用cQuery的包装html，转成cQuery对象
             * 使用mask()方法显示蒙版，默认.close按钮关闭移出删除蒙版
             * @param  {string} tpl html代码
             * @return {cquery obj}     返回cquery的蒙版对象
             */
            createMaskPop: function(tpl) {
                var jTpl = $(tpl);
                var popId = jTpl.prop('id');
                $('body').append(jTpl);

                var cqPopup = cQuery('#' + popId);
                cqPopup.mask();

                var cqClose = cqPopup.find('.close');
                cqClose.bind('click', function() {
                    cqPopup.unmask();
                    cqPopup.remove();
                });

                return cqPopup;
            },
            /**
             * 删除蒙版
             * @param  {cquery obj} cqMaskPop 蒙版对象
             */
            removeMaskPop: function(cqMaskPop) {
                cqMaskPop.unmask();
                cqMaskPop.remove();
            },
            /**
             * 最下面Notice方法，初始化，滚动方向，时间，顺序
             * @param {cquery obj} pContainer 滚动wrap
             */
            Notice: function(pContainer) {
                var _container = pContainer;
                _items = _container.find("P"),
                _scrollCore = new Animation.Scroll(_container[0], _items, true, 2, 20, 5000, 1);
                _scrollCore.init();
                _scrollCore.wait();
            },
            /**
             * 获取Cookie，可以获取二级的cokkie
             * @param  {string} a 一级cookie
             * @param  {string} b 二级cookie
             * @return {string}   cookie的value
             * @requires this.toReString();
             */
            getCookie: function(a, b) {
                var c = document.cookie.match(RegExp("(?:^|;)\\s*" + this.toReString(encodeURIComponent(a)) + "=([^;]+)"));
                if (!1 === b) return (c ? c[1] : null);
                c && b && (c = c[1].match(RegExp("(?:^|&)\\s*" + this.toReString(encodeURIComponent(b)) + "=([^&]+)")));
                return (c ? decodeURIComponent(c[1]) : null)
            },
            /**
             * 为了getCookie写的
             * @param  {string} str string
             */
            toReString: function(str) {
                var a = {
                    "\r": "\\r",
                    "\n": "\\n",
                    "\t": "\\t"
                };
                return str.replace(/([\.\\\/\+\*\?\[\]\{\}\(\)\^\$\|])/g, "\\$1").replace(/[\r\t\n]/g, function(b) {
                    return a[b]
                });
            },
            getCtmData: function(options) {
                var me = this;
                var settings = {
                    mainChannel: 'va', //[频道]：va（旅游度假）
                    subChannel: 'vis', //[子频道]：vis（签证）
                    city: 's2', //[售卖站]：根据cookie中startcity_pkg参数的值设置
                    area: 'idx', //[区域]：idx（左侧索引栏）
                    pageNum: 'p0', //[页码]：p0（旅游签证） 、 p1（商务签证） 、 p2（探亲签证）
                    lineNum: 'l0', //[行数]：索引词所在索引栏中的行数，例如，l1对应第一行，l2对应第二行
                    txtImg: 'txt', //[文字/图片]： txt（文字）
                    wrapTag: 'ul', //[页码]用
                    listTag: 'li', //[行数]用
                    linkTag: 'a' //[位置]：索引词所在搜索栏某行中的位置
                };
                $.extend(settings, options);

                var mainChannel = settings.mainChannel;
                var pathname = window.location.pathname;
                var subChannel = pathname.length > 3 ? pathname.substr(1, 3) : settings.subChannel;
                var city;
                if (window.$$ && window.$$.StartCity) {
                    city = window.$$.StartCity;
                } else if (me.getCookie('StartCity_Pkg')) {
                    city = me.getCookie('StartCity_Pkg', 'PkgStartCity');
                } else {
                    city = settings.city;
                }
                var area = settings.area;
                var pageNum = settings.pageNum;
                var lineNum = settings.lineNum;
                var txtImg = settings.txtImg;
                var wrapTag = settings.wrapTag || 'ul';
                var listTag = settings.listTag || 'li';
                var linkTag = settings.linkTag || 'a';

                return {
                    mainChannel: mainChannel,
                    subChannel: subChannel,
                    city: city,
                    area: area,
                    pageNum: pageNum,
                    lineNum: lineNum,
                    txtImg: txtImg,
                    wrapTag: wrapTag,
                    listTag: listTag,
                    linkTag: linkTag
                };
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
            assessCountryPop: '<div class="pop" id="assessCountryPop" style="display:none; width:500px">\
                    <h3>签证出签率 - 自我评估</h3>\
                    <div class="bd">\
                        <div class="suc_order">\
                            <div class="country"><label class="s" for="a">请选择国家/地区</label><input type="text" class="get_country" id="get_country"/></div>\
                            <div class="btn"><input class="btn_sub" type="submit" value="下一步" /></div>\
                        </div>\
                        <div class="query" style="display:none;">\
                            <img style="vertical-align: middle;" src="http://pic.c-ctrip.com/common/loading_50.gif" />请稍后，正在为您查询\
                        </div>\
                    </div>\
                    <a class="close" href="###"></a>\
                </div>',
            assessSelfPop: '<div class="pop" id="assessSelfPop" style="display:none; width:500px">\
                    <h3>签证出签率 - 自我评估</h3>\
                    <div class="bd spc_scroll">\
                        <div class="visa_form">\
                            {{#each data}}\
                            <h5>{{seq}}.{{item}}</h5>\
                            <p>\
                                {{#each options}}\
                                <label class="s"><input type="radio" name="{{../seq}}" value="{{score}}">{{option}}<span class="placeholder invisible">&nbsp;</span></label>\
                                {{/each}}\
                            </p>\
                            {{/each}}\
                            <div class="btn"><input type="submit" value="提交" class="btn_sub"></div>\
                        </div>\
                    </div>\
                    <a href="###" class="close"></a>\
                </div>',
            assessReslutPop: '<div class="pop" id="assessReslutPop" style="display:none; width:500px">\
                    <h3>签证出签率 - 自我评估</h3> \
                    <div class="bd">\
                        <div class="suc_result">\
                            <p class="success"><i class="good"></i>您的出签率评分为 <b class="col_org">{{score}}</b><i class="col_org">分</i></p>\
                            <p class="tip_s">本测评结果与使领馆实际签发结果无关，仅供参考。</p>\
                            <div class="btn"><a class="btn_sub2" href="{{link}}" target="_blank">立即办理{{ctryname}}签证产品</a></div>\
                        </div>\
                    </div>\
                    <a href="###" class="close"></a>\
                </div>',
            progressPop: '<div class="pop" id="progressPop" style="display:none; width:500px">\
                        <h3>签证进度查询</h3>\
                        <div class="bd spc_scroll">\
                            <div class="query">\
                                <img style="vertical-align: middle;" src="http://pic.c-ctrip.com/common/loading_50.gif" />请稍后，正在为您查询\
                            </div>\
                        </div>\
                        <a href="###" class="close"></a>\
                    </div>',
            progressList: '{{#each data}}\
                    <div class="item_box">\
                        <h4 class="tit">\
                            {{#if purl}}\
                            <a href="{{purl}}" target="_blank">{{pname}}</a>\
                            {{else}}\
                            {{pname}}\
                            {{/if}}\
                            <span class="tit_sz">订单号：{{orderno}}</span>\
                        </h4>\
                        {{#each detail}}\
                        <div class="item">\
                            {{#if name}}\
                            <strong>办签人：{{name}}</strong>\
                            {{/if}}\
                            {{#if current}}\
                            <p>当前进度：{{current}}</p>\
                            {{/if}}\
                            {{#if predict}}\
                            <p>{{predict}}</p>\
                            {{/if}}\
                        </div>\
                        {{/each}}\
                    </div>\
                    {{/each}}',
            progressNull: '<div class="no_order">\
                        <h4 class="tit">没有找到相关签证订单！</h4>\
                        <p>去我的<a class="link_a" href="http://my.ctrip.com/Home/Order/PkgOrderList.aspx">订单管理</a>看看</p>\
                    </div>',
            visaLatest: '<div class="slide_bd">\
                        {{#each data}}\
                        <p><i class="icon"></i>{{desc}}<em><a href="{{link}}" target="_blank">{{pname}}</a></em></p>\
                        {{/each}}\
                    </div>'
        },
        /**
         * Tab切换
         */
        visaTab: function() {
            var self = this;
            var jWrap = $('#visaTab');
            var jTabBtn = jWrap.find('.visa_hd a');
            var jTabCont = jWrap.find('.visa_city');

            return {
                init: function() {
                    var me = this;
                    me.tab();
                },
                tab: function() {
                    var index;
                    jWrap.delegate('.visa_hd a', 'click', function() {
                        // 如果tab为1，那么不需要变动
                        if (jTabBtn.size() > 1) {
                            index = $(this).index();
                            jTabBtn.removeClass('cur');
                            $(this).addClass('cur');
                            jTabCont.hide();
                            jTabCont.filter(':eq(' + index + ')').show();
                        }
                    });
                }
            }
        },
        /**
         * 评估测试，一共三个弹出层，一步接一步
         * 第一步选择城市，得到城市的sCtryCn中文名，sCtryId城市id号，
         * sCtryEng城市英文名，nTplId测试问题模板号，根据模板号发送ajax获取测试卷
         * 第二步做问卷，提交时自动计算input里面的分数
         * 第三步得出结果，得出分数，根据第一步的信息拼出sCtryLink
         */
        visaAssess: function() {
            var self = this;
            var jAssessBtn = $('#visaAssessBtn');

            var sCtryCn;
            var sCtryId;
            var sCtryEng;
            var nTplId = -1;
            var sCtryLink;

            return {
                init: function() {
                    var me = this;
                    me.bind();
                },
                /**
                 * 选择城市控件，添加cquery address控件到input上
                 * @param  {cuqery obj} cqInput
                 */
                appendAddress: function(cqInput) {
                    var me = this;
                    var nameId = cqInput.attr('id');
                    var cqRef;

                    cqInput.bind('focus', function() {
                        nTplId = -1;
                    });
                    cqRef = cqInput.regMod('address', '1.0', {
                        name: nameId,
                        isAutoCorrect: true,
                        jsonpSource: '/VisaBooking/visaajax/ajaxindex.ashx?a=evctrys'
                    });
                    cqRef.method('bind', 'change', function() {
                        var items = arguments[1].items;
                        if (items) {
                            sCtryCn = items[1];
                            sCtryId = items[2];
                            sCtryEng = items[3];
                            nTplId = items[4];
                            me._createLink();

                            // 台湾是地区，单独设置连接
                            // 新加坡也独立处理，埋个坑
                            // if (sCtryCn == '中国台湾') {
                            //     sCtryLink = '/visa/P-Taiwan-53';
                            // } else if (sCtryCn == '新加坡') {
                            //     sCtryLink = '/visa/d-Singapore-53';
                            // } else {
                            //     sCtryLink = ['/visa/c-', sCtryEng, '-', sCtryId].join('');
                            // }

                            setTimeout(function() {
                                cqInput[0].blur();
                            }, 0);
                        }
                    });
                    cqRef.method('bind', 'enter', function() {
                        setTimeout(function() {
                            cqInput[0].blur();
                        }, 0);
                    });
                },
                /**
                 * 埋坑，后台数据库无法拼出正确的link，所以需要手动判断，写死其路径
                 * 除了这些其他按正常link拼接：'/visa/c-', sCtryEng, '-', sCtryId].join('');
                 */
                _createLink: function() {
                    switch (parseInt(sCtryId, 10)) {
                        case 1: //台湾 1
                            sCtryLink = '/visa/p-taiwan-53';
                            break;
                        case 3: //新加坡 3
                            sCtryLink = '/visa/d-singapore-53 ';
                            break;
                        case 61: //卢森堡 61
                            sCtryLink = '/visa/d-luxemburg-300';
                            break;
                        case 64: //毛里求斯 64
                            sCtryLink = '/visa/d-mauritius-444';
                            break;
                        case 92: //文莱 92
                            sCtryLink = '/visa/d-brunei-601';
                            break;
                        case 146: //马尔代夫 146
                            sCtryLink = '/visa/d-maldives-330';
                            break;
                        case 167: //梵蒂冈 167
                            sCtryLink = '/visa/d-vatican-784';
                            break;
                        case 174: //塞舌尔 174
                            sCtryLink = '/visa/d-seychelles-821';
                            break;
                        case 192: //关岛 192
                            sCtryLink = '/visa/d-guam-1422';
                            break;
                        case 220: //格林纳达 220
                            sCtryLink = '/visa/d-grenada-8990';
                            break;
                        case 237: //帕劳 237
                            sCtryLink = '/visa/d-palau-6941';
                            break;
                        case 290: //大溪地 290
                            sCtryLink = '/visa/d-tahiti-1354';
                            break;
                        case 292: //南极 292
                            sCtryLink = '/visa/d-southpole-9550';
                            break;
                        default:
                            sCtryLink = ['/visa/c-', sCtryEng, '-', sCtryId].join('');
                            break;
                    }
                },
                bind: function() {
                    var me = this;

                    jAssessBtn.bind('click', function() {
                        var cqCountryPop = self.common.createMaskPop(self.tpl.assessCountryPop);
                        var cqSucOrder = cqCountryPop.find('.suc_order');
                        var cqLoading = cqCountryPop.find('.query');
                        var cqNextBtn = cqCountryPop.find('.btn_sub');
                        var cqCountryInput = cQuery('#get_country');
                        me.appendAddress(cqCountryInput); // 为input添加选择国家弹出层

                        cqNextBtn.bind('click', function() {
                            // 后台检测nTplId会有异常，所以检测一次
                            if (!nTplId || nTplId == -1) {
                                nTplId = 1;
                            }
                            if (me._hasSel(cqCountryInput)) {
                                // 显示搜索Loading图片
                                cqSucOrder.css({
                                    display: 'none'
                                });
                                cqLoading.css({
                                    display: 'block'
                                });

                                self.common.fetchData({
                                    url: '/VisaBooking/VisaAjax/ajaxindex.ashx',
                                    data: {
                                        a: 'evctrytpl',
                                        q: '{"tplid":' + nTplId + '}'
                                    }
                                }, function(response) {
                                    if (response.status == 1) {
                                        var data = response;
                                        // Handlebar 输出模板数据
                                        self.common.render(self.tpl.assessSelfPop, data, function(dom) {
                                            // 删除第一个maskPop
                                            self.common.removeMaskPop(cqCountryPop);
                                            var cqSelfPop = self.common.createMaskPop(dom);
                                            var cqSubmitBtn = cqSelfPop.find('.btn_sub');

                                            cqSubmitBtn.bind('click', function() {
                                                if (me._canCalc(cqSelfPop)) {
                                                    var score = me._calcuScore(cqSelfPop);
                                                    self.common.render(self.tpl.assessReslutPop, {
                                                        ctryname: sCtryCn,
                                                        link: sCtryLink,
                                                        score: score
                                                    }, function(dom) {
                                                        // 删除第二个maskPop
                                                        self.common.removeMaskPop(cqSelfPop);
                                                        var cqResultPop = self.common.createMaskPop(dom);
                                                        var cqLink = cqSelfPop.find('.btn_sub2');

                                                        cqLink.bind('click', function() {
                                                            // 删除最后一个(也就是自己)maskPop
                                                            self.common.removeMaskPop(cqResultPop);
                                                        });
                                                    });
                                                }

                                            });
                                        });
                                    } else {
                                        // alert('error');
                                    }
                                });
                            }

                        });
                    });
                },
                /**
                 * 是否选择了城市，没有选择就不能进入下一步，并提示
                 * @param  {cqery obj}  cqInput 输入框
                 * @return {Boolean}
                 */
                _hasSel: function(cqInput) {
                    var bRtn = false;
                    if (!cqInput.value()) {
                        cqRegValid.method("show", {
                            $obj: cqInput,
                            data: '请选择国家或城市',
                            removeErrorClass: true,
                            isScroll: false
                        });
                    } else if (nTplId == -1) {
                        cqRegValid.method("show", {
                            $obj: cqInput,
                            data: '对不起，找不到：' + cqInput.value(),
                            removeErrorClass: true,
                            isScroll: false
                        });
                    } else {
                        bRtn = true;
                    }
                    return bRtn;
                },
                /**
                 * 验证是否素有的radio都选择了，没有就弹出提示
                 * 这里为了美观，特地为每个radio后加一个.placeholder并且CSS设为hidden
                 * 在这个元素上显示错误提示
                 * @param  {cquery obj} cqPop 弹出层
                 * @return {bool}       可否计算
                 */
                _canCalc: function(cqPop) {
                    var bRtn = true;
                    var jPop = $(cqPop[0]);
                    var jLines = jPop.find('p');
                    var jCurInput;
                    var jCurPlace;

                    jLines.each(function() {
                        jCurInput = $(this).find('input');
                        jCurPlace = $(this).find('.placeholder:last');

                        if (jCurInput.filter(':checked').size() == 0) {
                            cqRegValid.method("show", {
                                $obj: cQuery(jCurPlace[0]),
                                data: '请选择',
                                removeErrorClass: true,
                                isScroll: false
                            });
                            bRtn = false;
                            return false;
                        }
                    });
                    return bRtn;
                },
                /**
                 * 计算分数，并根据不同分数换算成对应的分数
                 * @param  {cquery obj} cqPop 弹出层
                 * @return {int}       分数
                 */
                _calcuScore: function(cqPop) {
                    var cqRadio = cqPop.find('input:checked');
                    var score = 0;
                    cqRadio.each(function(item) {
                        score += parseInt(cQuery(item).value(), 10);
                    });
                    if (score >= 0 && score < 20) {
                        score = 60;
                    } else if (score >= 20 && score < 40) {
                        score = 80;
                    } else if (score >= 40 && score < 70) {
                        score = 90;
                    } else if (score >= 70 && score < 85) {
                        score = 95
                    } else if (score >= 85) {
                        score = 99;
                    }
                    return score;
                }
            }
        },
        /**
         * 签证进度查询，点击判断是否用户登录，
         * 未登录使用__SSO_loginShow()方法，弹出用户登录框iframe
         * 注意：登录框还需要__SSO_booking(), __SSO_loginShow(), __SSO_submit()
         * 这几个方法是global方法，已经写在页面里面了
         * 如果已经登录，那么获得#user_id(hidden input)，里面有后台给的用户名，
         * 发送Ajax请求，注意由于闭包，函数式在外部调用，所以每次获取userId，请独立获取
         */
        visaProgress: function() {
            var self = this;
            var jShowBtn = $('#visaProgressBtn');
            var jLoginInput = $('#usr_id');

            return {
                init: function() {
                    var me = this;
                    me.bind();
                },
                /**
                 * 判断是否登录，查看user_id这个input
                 * @return {Boolean}
                 */
                isLogin: function() {
                    var bRtn = false;
                    var userId = $('#usr_id').val();
                    if (userId == '') {
                        __SSO_loginShow(window, '1', '0', '0');
                    } else {
                        bRtn = true;
                    }
                    return bRtn
                },
                bind: function() {
                    var me = this;
                    jShowBtn.bind('click', function() {
                        if (me.isLogin()) {
                            var cqProgressPop = self.common.createMaskPop(self.tpl.progressPop);
                            var cqBd = cqProgressPop.find('.bd');
                            var cqLoading = cqProgressPop.find('.query');

                            var userId = $('#usr_id').val();

                            self.common.fetchData({
                                url: '/VisaBooking/VisaAjax/ajaxindex.ashx',
                                data: {
                                    a: 'vprgrss',
                                    q: '{"uid":"' + userId + '"}'
                                    // q: '{"uid":"' + 'wwwwwww' + '"}'
                                }
                            }, function(response) {
                                // 直接用innerHTML插入，cqLoading自动被删除
                                if (response.status == 1) {
                                    self.common.render(self.tpl.progressList, response, function(dom) {
                                        cqBd.html(dom);
                                    });
                                } else if (response.status == 3) {
                                    // 未找到订单
                                    self.common.render(self.tpl.progressNull, response, function(dom) {
                                        cqBd.html(dom);
                                    });
                                } else if (response.status == 2) {
                                    // 未登陆
                                } else {
                                    // 未找到订单
                                    self.common.render(self.tpl.progressNull, response, function(dom) {
                                        cqBd.html(dom);
                                    });
                                }
                            });
                        }
                    });
                }
            }
        },
        /**
         * 使领馆信息查询，根据得到的sCtryId城市ID，sCtryEng国家英文名拼出sCtryLink链接
         * 使用拼出的链接使用data('data-url', '...')放在button上，
         * 每次点击获取这个data，并window.open去相应新页面
         */
        embassy: function() {
            var self = this;
            var cqInput = cQuery('#inp_area');
            var jBtn = $('.embassy .btn_search');

            var sCtryId;
            var sCtryEng;
            var sCtryLink;

            return {
                init: function() {
                    var me = this;
                    me.bind();
                },
                bind: function() {
                    var me = this;
                    me.bindAddress();

                    jBtn.bind('click', function() {
                        if (me._hasSel(cqInput)) {
                            window.open($(this).data('data-url'));
                        }
                    });
                },
                bindAddress: function() {
                    var cqRef;
                    cqInput.bind('keydown', function() {
                        jBtn.data('data-url', '');
                    });
                    cqRef = cqInput.regMod('address', '1.0', {
                        name: 'inp_area',
                        isAutoCorrect: true,
                        jsonpSource: '/VisaBooking/visaajax/ajaxindex.ashx?a=cctrys'
                    });
                    cqRef.method('bind', 'change', function() {
                        var items = arguments[1].items;
                        if (items) {
                            sCtryId = items[2];
                            sCtryEng = items[3];

                            sCtryLink = ['/visa/c-', sCtryEng, '-', sCtryId, '/lsg'].join('');
                            jBtn.data('data-url', sCtryLink);

                            setTimeout(function() {
                                cqInput[0].blur();
                            }, 0);
                        }
                    });
                    cqRef.method('bind', 'enter', function() {
                        setTimeout(function() {
                            cqInput[0].blur();
                        }, 0);
                    });
                },
                _hasSel: function(cqInput) {
                    var bRtn = true;
                    if (!cqInput.value() ||
                        cqInput.value() == '请输入国家名或地区名' ||
                        cqInput.value() == '請輸入國家名或地區名'
                    ) {
                        cqRegValid.method("show", {
                            $obj: cqInput,
                            data: '请选择国家或城市',
                            removeErrorClass: true,
                            isScroll: false
                        });
                        bRtn = false;
                    } else if (jBtn.data('data-url') == '') {
                        cqRegValid.method("show", {
                            $obj: cqInput,
                            data: '对不起，找不到：' + cqInput.value(),
                            removeErrorClass: true,
                            isScroll: false
                        });
                        bRtn = false;
                    }
                    return bRtn;
                }
            }
        },
        /**
         * 最新签证预定，使用下面的Notice控件，每个15分钟发次Ajax请求，
         * 获得最新的值
         */
        visaLatest: function() {
            var self = this;
            return {
                init: function() {
                    var me = this;
                    new self.common.Notice(cQuery(".slide_bd"));
                    setInterval(me.update, 1000 * 60 * 15);
                },
                update: function() {
                    // Ajax
                    self.common.fetchData({
                        url: '/visabooking/visaajax/ajaxindex.ashx',
                        data: {
                            a: 'rctorders'
                        }
                    }, function(response) {
                        if (response.status == 1) {
                            var data = response;
                            // Handlebar 输出模板数据
                            self.common.render(self.tpl.visaLatest, data, function(dom) {
                                $('.slide_bd').remove();
                                $('.visa_slide').append(dom);
                                new self.common.Notice(cQuery(".slide_bd"));
                            });
                        }
                    });
                }
            }
        },
        ctmModule: function() {
            var self = this;
            var jVisaTab = $('#visaTab');
            var jRecom = $('div.recom_visa');
            var jHot = $('div.hot_visa');
            // 晶赞广告
            var jJz = $('#PanelAdBanner');
            return {
                init: function() {
                    var me = this;
                    me.idxCtm(jVisaTab);
                    me.recomCtm(jRecom);
                    me.hotCtm(jHot);
                    me.jzAdvCtm();
                },
                overwriteCtmUrl: function(jWrap) {
                    var jLinks = jWrap.find('a');
                    jLinks.bind('click', function(event) {
                        var $this = $(this);
                        var datactm = $this.attr("data-ctm");
                        if ( !! datactm && datactm.length) {
                            if ($this.attr("target") === "_blank") {
                                window.open($this.attr("href") + datactm);
                            } else {
                                location.href = $this.attr("href") + datactm;
                            }
                            event.preventDefault();
                            event.stopPropagation();
                        }
                    });
                },
                // ctm_ref=[频道]_[子频道]_[售卖站]_[区域]_[页码]_[行数]_[位置]_[文字/图片]
                idxCtm: function(jWrap) {
                    var me = this;
                    var settings = self.common.getCtmData();

                    var mainChannel = settings.mainChannel;
                    var subChannel = settings.subChannel;
                    var city = settings.city;
                    var area = settings.area;
                    // var pageNum = settings.pageNum;
                    // var lineNum = settings.lineNum;
                    var txtImg = settings.txtImg;
                    var wrapTag = settings.wrapTag;
                    var listTag = settings.listTag;
                    var linkTag = settings.linkTag;

                    var jWraps = jWrap.find(wrapTag);
                    var jLists;
                    var jPos;

                    var ctm;

                    jWraps.each(function(i) {
                        jLists = $(this).find(listTag);
                        jLists.each(function(j) {
                            jLinks = $(this).find(linkTag);
                            jLinks.each(function(k) {
                                ctm = ['#ctm_ref=', mainChannel, '_', subChannel, '_', 's' + city, '_', area, '_',
                                    'p' + i, '_', 'l' + (j + 1), '_', k, '_', txtImg
                                ].join('');
                                $(this).attr('data-ctm', ctm);
                            });
                        });
                    });
                    me.overwriteCtmUrl(jWrap);
                },
                recomCtm: function(jWrap) {
                    var me = this;
                    var settings = self.common.getCtmData({
                        area: 'prm',
                        listTag: 'div'
                    });

                    var mainChannel = settings.mainChannel;
                    var subChannel = settings.subChannel;
                    var city = settings.city;
                    var area = settings.area;
                    // var pageNum = settings.pageNum;
                    // var lineNum = settings.lineNum;
                    var txtImg = settings.txtImg;
                    var wrapTag = settings.wrapTag;
                    var listTag = settings.listTag;
                    var linkTag = settings.linkTag;

                    // var jWraps = jWrap.find(wrapTag);
                    var jLists = jWrap.find(listTag);
                    var jPos;

                    var ctm;

                    jLists.each(function(j) {
                        jLinks = $(this).find(linkTag);
                        jLinks.each(function(k) {
                            ctm = ['#ctm_ref=', mainChannel, '_', subChannel, '_', 's' + city, '_', area, '_',
                                'p0', '_', 'l' + (j + 1), '_', (k + 1), '_', txtImg
                            ].join('');
                            $(this).attr('data-ctm', ctm);
                        });
                    });
                    me.overwriteCtmUrl(jWrap);
                },
                // 同recomCtm完全一样
                hotCtm: function(jWrap) {
                    var me = this;
                    var settings = self.common.getCtmData({
                        area: 'prd',
                        listTag: 'div'
                    });

                    var mainChannel = settings.mainChannel;
                    var subChannel = settings.subChannel;
                    var city = settings.city;
                    var area = settings.area;
                    // var pageNum = settings.pageNum;
                    // var lineNum = settings.lineNum;
                    var txtImg = settings.txtImg;
                    var wrapTag = settings.wrapTag;
                    var listTag = settings.listTag;
                    var linkTag = settings.linkTag;

                    // var jWraps = jWrap.find(wrapTag);
                    var jLists = jWrap.find(listTag);
                    var jPos;

                    var ctm;

                    jLists.each(function(j) {
                        jLinks = $(this).find(linkTag);
                        jLinks.each(function(k) {
                            ctm = ['#ctm_ref=', mainChannel, '_', subChannel, '_', 's' + city, '_', area, '_',
                                'p0', '_', 'l' + (j + 1), '_', (k + 1), '_', txtImg
                            ].join('');
                            $(this).attr('data-ctm', ctm);
                        });
                    });
                    me.overwriteCtmUrl(jWrap);
                },
                // jz adv 晶赞广告
                jzAdvCtm: function() {
                    $("#PanelAdBanner").delegate("li", "click", function(event) {
                        var $this = $(this);
                        $this.parent().attr("data-index", $this.attr("data-index"));
                    });

                    $("#PanelAdBanner").bind("click", function(event) {
                        var _index, data_ctm, anchor;
                        var _target = event.target || event.srcElement;
                        if (_target.tagName === "IMG") {
                            anchor = $(_target).closest("a")[0];
                            _index = !! $(this).find(".j-num-current").length ? $(this).find(".j-num-current").attr("data-index") : $(this).find(".j-picsroller-num").attr("data-index");
                            data_ctm = '#ctm_ref=va_vis_s' + $$.StartCity + '_ban_p0_l0_' + (++_index) + '_img';
                            if ( !! data_ctm) {
                                if (anchor.getAttribute("target") === "_blank") {
                                    window.open(anchor.href + data_ctm);
                                } else {
                                    location.href = anchor.href + data_ctm;
                                }
                                event.preventDefault();
                                event.stopPropagation();
                            }
                        }
                    });
                }
            }
        },

        init: function() {
            var self = this;
            return function() {
                GV.ready(function() {
                    self.common.goTop();

                    self.visaTab().init();
                    self.visaAssess().init();
                    self.visaProgress().init();
                    self.embassy().init();
                    self.visaLatest().init();
                    self.ctmModule().init();
                });

            }
        }
    }
    exports.init = visaModule.init.call(visaModule);



    /*
     * Animation - Scroll
     * @constructor
     * @Author:     yulianghuang
     * @CreateDate  2012/12/17
     */
    var Animation = {};
    var _core = {};
    /*
     * Timer / Timing device     you need init Event before call the method "play"
     * @constructor
     * @Author:     yulianghuang
     * @param    {number}      how often the clock play
     * @param    {number}      how long the clock wait
     * @CreateDate  2012/12/5
     */
    _core.Timer = function(pMoveSpeed, pMoveInterval) {
        this._speed = pMoveSpeed || 50;
        this._interval = pMoveInterval || 0;
        this._clock = null;
        this._waitClock = null;
        this.Event = {
            play: function() {},
            pause: function() {},
            stop: function() {},
            ifPause: function() {
                return false
            },
            ifStop: function() {
                return false
            }
        };
    };
    _core.Timer.prototype = {
        play: function() {
            var me = this;
            me.Event.play();
            me._clock = setInterval(function() {
                if (me.Event.ifStop()) {
                    me.stop();
                } else if (me.Event.ifPause()) {
                    me.pause();
                } else {
                    me.Event.play();
                }
            }, me._speed);
        },
        pause: function() {
            var me = this;
            if (me._clock != null) {
                clearInterval(me._clock);
            }
            me.Event.pause();
            me._waitClock = setTimeout(function() {
                me.play();
            }, me._interval);
        },
        stop: function() {
            var me = this;
            me._clock != null && clearInterval(me._clock);
            me._waitClock != null && clearInterval(me._waitClock);
            me.Event.stop();
        }
    };

    _core.Storage = new function() {
        var _canuse = !! window.sessionStorage,
            hasData = function(pData) {
                return pData && pData !== "" && pData !== "null" && pData !== "undefined";
            },
            /*
             * get data from ajax
             */
            ajaxData = function(pKey, pUrl, pArg, pCallBack, pIsLoacl, pCharset) {
                var me = this;
                $.ajax({
                    url: pUrl,
                    data: pArg,
                    success: function(data) {
                        dealData.call(me, data, pKey, pCallBack, pIsLoacl);
                    }
                });
                /*
                Cmd.ajax(pUrl, pArg, function (data) {
                dealData.call(me, data, pKey, pCallBack, pIsLoacl);
                });
                */
            },
            /*
             * get .js document which isnot UTF-8 encoding,the return data should be place into _core.cache[key]
             */
            jsonPData = function(pKey, pUrl, pArg, pCallBack, pIsLoacl, pCharset) {
                var me = this,
                    _url = (pArg != null && pArg != "") ? pUrl + "?" + pArg : pUrl;
                Cmd.Load.addJs(_url, function() {
                    var data = Cmd.JsonPData;
                    dealData.call(me, data, pKey, pCallBack, pIsLoacl);
                }, true, pCharset);
            },
            sessionData = function(pKey, pUrl, pArg, pCallBack, pFunc, pCharset) {
                var data = sessionStorage.getItem(pKey);
                if (hasData(data)) {
                    dealData(data, pKey, pCallBack, false);
                } else {
                    pFunc(pKey, pUrl, pArg, pCallBack, false, pCharset);
                }
            },
            localData = function(pKey, pUrl, pArg, pCallBack, pFunc, pCharset) {
                var data = localStorage.getItem(pKey);
                if (hasData(data)) {
                    dealData(data, pKey, pCallBack, true);
                } else {
                    pFunc(pKey, pUrl, pArg, pCallBack, true, pCharset);
                }
            },
            dealData = function(data, pKey, pCallBack, pIsLoacl) {
                _canuse && pIsLoacl && localStorage.setItem(pKey, data);
                try {
                    _canuse && !pIsLoacl && detectSessionStorage(pKey, data) && sessionStorage.setItem(pKey, data);
                } catch (e) {};
                pCallBack(data);
            },
            detectSessionStorage = function(key, data) {
                var key, remSpace, usedSpace = 0,
                    keyData = sessionStorage.getItem(key);
                // IE可以使用sessionStorage.remainingSpace来判断剩余空间，容量为5000000
                remSpace = sessionStorage.remainingSpace;
                // 非IE浏览器默认以5MB（1024*1024*5）的大小来判断剩余空间
                // firefox下sessionStorage的容量只看item的value值那一部分，加起来不超过1024*1024*5就可以
                // 但chrome下容量计算同时包括item的name和vlaue
                // 另外，firefox下发现，每次seesionStorage写入过之后，即使清除了，容量也会变小
                // firefox下bug, 同一firefox下的不同tab，会共享sessionStorage，但是单独窗口却无法查看到其他tab下的sesssionStorage
                // 为了保险起见，setItem可以改用try catch
                // 计算已使用容量也需要同时包括item的name和value
                if (remSpace == undefined) {
                    for (var i = 0, l = sessionStorage.length; i < l; i++) {
                        key = sessionStorage.key(i);
                        usedSpace += key.length + sessionStorage[key].length;
                    }
                    //usedSpace = unescape(JSON.stringify(sessionStorage)).length;
                    //usedSpace = unescape(encodeURIComponent(JSON.stringify(sessionStorage))).length;
                    remSpace = 1024 * 1024 * 5 - usedSpace;
                }
                // 如果是写入已经存在的item，计算容量时则需要去除这个item
                if ( !! keyData) {
                    remSpace -= keyData.length;
                }

                if (data.length > remSpace) {
                    if ( !! sessionStorage.length) {
                        // 移出第一个item，释放容量
                        sessionStorage.removeItem(sessionStorage.key(0));
                        //console.log(sessionStorage.length);
                        return arguments.callee(key, data);
                    } else {
                        return false;
                    }
                } else {
                    return true;
                }

            };
        /*
         *  get session storge,if not exist ,get data from the server
         *  @param  {string}            the hash key name of the data
         *  @param  {string}            the url where to get data from
         *  @param  {string}            the arguments used in the request
         *  @param  {function|null}     the callback function
         *  @param  {boolen|null}       if use jsonp
         */
        this.getSession = function(pKey, pUrl, pArg, pCallBack, pIsJsonP, pCharset) {
            var _funcPoint = pIsJsonP ? jsonPData : ajaxData;
            if (_canuse) {
                sessionData(pKey, pUrl, pArg, pCallBack, _funcPoint, pCharset);
            } else {
                _funcPoint(pKey, pUrl, pArg, pCallBack, false, pCharset);
            }
        };
        /*
         *  get local storge,if not exist ,get data from the server
         *  @param  {string}            the hash key name of the data
         *  @param  {string}            the url where to get data from
         *  @param  {string}            the arguments used in the request
         *  @param  {function|null}     the callback function
         *  @param  {boolen|null}       if use jsonp
         */
        this.getLocal = function(pKey, pUrl, pArg, pCallBack, pIsJsonP, pCharset) {
            var _funcPoint = pIsJsonP ? jsonPData : ajaxData;
            if (_canuse) {
                localData(pKey, pUrl, pArg, pCallBack, _funcPoint, pCharset);
            } else {
                _funcPoint(pKey, pUrl, pArg, pCallBack, true, pCharset);
            }
        };
    };
    Animation.Scroll = function(pContain, pItem, pIsY, pMoveStep, pMoveSpeed, pMoveInterval, pArrow, pAppendLength) {
        //Property
        this.Container = pContain;
        this.Items = pItem;
        this.Step = null;
        this.MoveStep = pMoveStep || 1;
        this._timer = new _core.Timer(pMoveSpeed, pMoveInterval);
        if (pIsY) {
            this.MoveProperty = "offsetHeight";
            this.ScrollProperty = "scrollTop";
        } else {
            this.MoveProperty = "offsetWidth";
            this.ScrollProperty = "scrollLeft";
        }
        this.Arrow = pArrow || 1;
        //private
        this._index = 0;
        this._itemLength = this.Items.length || 0;
        this._pausePosLength = 0;
        this._pausePos = [];

        //fill blank
        if (this.MoveStep < this._itemLength) {
            this.setStopPos(pAppendLength);
            this.fillContainer();
        }

        //cache
        this.memory = [];
    };
    Animation.Scroll.prototype = {
        /*
         * fill some element to the container
         * @param {dom} spme valid element
         */
        fillContainer: function() {
            //var _scrollHeight = this.Container
            var _minLength = Math.min(this.MoveStep * 2, this._itemLength),
                _i = 0,
                _tempNode;
            for (; _i < _minLength; _i++) {
                _tempNode = this.Items[_i].cloneNode(true);
                this.Container.appendChild(_tempNode);
            }
        },
        setStopPos: function(pAppendLength) {
            var me = this,
                _appendLength = pAppendLength || 0,
                _currentPos = 0;
            me._pausePosLength = Math.ceil(me._itemLength / me.MoveStep);
            for (var i = 0, l = me._pausePosLength; i < l; i++) {
                for (var j = i * me.MoveStep, k = (i + 1) * me.MoveStep; j < k; j++) {
                    _currentPos += this.getNodeOffset(j, _appendLength);
                }
                me._pausePos[i] = _currentPos;
            }
            me._pausePosLength++;
            me._pausePos.unshift(0);
        },
        move: function() {
            var me = this;
            me.Container[me.ScrollProperty] += me.Arrow;
        },
        beforeMove: function(pDirect) {
            var me = this;
            if (pDirect) {
                if (me._index === me._pausePosLength - 1) {
                    me.Container[me.ScrollProperty] = me._pausePos[0];
                    me._index = 1;
                } else {
                    me._index++;
                }
            } else {
                if (me._index === 0) {
                    me.Container[me.ScrollProperty] = me._pausePos[me._pausePosLength - 1];
                    me._index = me._pausePosLength - 2;
                } else {
                    me._index--;
                }
            }
        },
        getNodeOffset: function(pos, pAppendLength) {
            return pos < this._itemLength ? this.Items[pos][this.MoveProperty] + pAppendLength : 0;
            //return this.Items[pos%this._itemLength][this.MoveProperty];
        },
        init: function() {
            var me = this;
            me._timer.Event.play = function() {
                me.move.call(me);
            };
            me._timer.Event.ifPause = function() {
                return (me.Container[me.ScrollProperty] === me._pausePos[me._index]);
            };
            me._timer.Event.pause = function() {
                me.beforeMove.call(me, me.Arrow > 0);
            };
        },
        wait: function() {
            this._timer.pause();
        },
        stop: function() {
            this._timer.stop();
        },
        play: function() {
            this._timer.play();
        },
        //in ie, "display:none: "will cause some bug,you need the two method followed
        save: function() {
            var me = this;
            me.memory.push({
                index: me._index,
                scroll: me.Container[me.ScrollProperty]
            });
        },
        reset: function() {
            var me = this,
                _memery = me.memory.pop();
            me._index = _memery.index || 0;
            me.Container[me.ScrollProperty] = _memery.scroll || 0;
        }
    };



});