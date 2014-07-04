//=====
//create by plu(plu@ctrip.com)
//=====
define(function (require, exports, module) {
    var $ = require("../../../lib/jquery.js"),
    _guid = 1,
    getGuid = function () {
        return _guid++;
    },
    loadImgsInDom = function ($dom) {
        if ($dom.length < 1) return;

        //$dom参数可接受jQuery选择器或者原生JS节点
        if (!$dom.jquery) { $dom = $($dom); }

        var $imgs = $("img", $dom);
        $imgs.each(function (index, element) {
            var $this = $(element);
            var dataSrc = $this.attr("data-src");
            if ($this.attr("src") != dataSrc) {
                $this.css("display", "none");
                element.onload = function () { $this.fadeIn("fast"); };
                // 增加error判断，当图片加载错误时，显示元素，alt文字会替代图片
                element.onerror = function () { $this.show(); };
                // 交换src和onload加载的顺序，避免图片加载过快不执行onload事件
                $this.attr("src", dataSrc);
                /*
                $this.bind("load", function () {
                $this.fadeIn();
                });
                */
            }

        })
    },
    lazyBackGroundInDom = function ($dom) {
        if ($dom.length < 1) return;

        //$dom参数可接受jQuery选择器或者原生JS节点
        if (!$dom.jquery) { $dom = $($dom); }

        $dom.each(function () {
            var $this = $(this);
            $this.css("display", "none");
            $this.css("background-image", "url(" + $this.attr("data-bcground") + ")");
            $this.fadeIn();
        })
    },

    lazyCtm = function ($dom, item, area, page, line, TxtImg, direct) {
        if ($dom.length < 1) return;

        //$dom参数可接受jQuery选择器或者原生JS节点
        if (!$dom.jquery) { $dom = $($dom); }

        var ctm = "#ctm_ref=va_hom_s" + $$.StartCity + "_" + area + "_p" + page + "_l" + line + "_$startNum$_" + TxtImg,
            originalSrc;

        // 如果direct未定义或者为false，表示以data-ctm的形式添加跟踪代码，否则直接加在src上
        if (!direct) {
            if (!!item) {
                $(item, $dom).each(function (index, element) {
                    $(element).find("a").attr("data-ctm", ctm.replace("$startNum$", index + 1));
                });
            }
            else {
                $("a", $dom).each(function (index, element) {
                    $(element).attr("data-ctm", ctm.replace("$startNum$", index + 1));
                });
            }
        }
        else {
            if (!!item) {
                $(item, $dom).each(function (index, element) {
                    $(element).find("a").each(function (subindex, subelement) {
                        originalSrc = $(subelement).attr("href");
                        $(subelement).attr("href", originalSrc + ctm.replace("$startNum$", index + 1));
                    })
                });
            }
            else {
                $("a", $dom).each(function (index, element) {
                    originalSrc = $(element).attr("href");
                    $(element).attr("href", originalSrc + ctm.replace("$startNum$", index + 1));
                });
            }
        }
    },

    newTab = function ($container) {
        //$container参数可接受jQuery选择器或者原生JS节点
        if (!$container.jquery) { $container = $($container); }
        var $tabContainer = $container.find(".tab_wrap ul");
        var $nodes = $container.find(".product_wrap ul");
        $tabContainer.find(">li").each(function (index, element) {
            $(this).click(function () {
                if ($(this).hasClass("top_travel")) return;
                var $current = $nodes.eq(index);
                $current.attr("data-init", "1");
                var $textarea = $current.find(">textarea");
                $textarea.length && $current.html($textarea.val());
                loadImgsInDom($current);
                lazyBackGroundInDom($current.find("[data-bcground]"));

                $tabContainer.find(".current").removeClass("current");
                $(this).addClass("current");
                $nodes.not(":eq(" + index + ")").css("display", "none");
                $nodes.eq(index).css("display", "");
            });
        });
    },

    Validation = {},
    _regTirm = /\s|\t|\n|\r/g,
    SearchAddress = function (pCQueryDom, pName, pAfterSelect, pIsJsonP, pSuggestion, pEnterFunc) {
        var _dom = pCQueryDom,
                _key = _dom.attr("data-key"),
                _name = pName,
                _url = _dom.attr("data-url") || "",
                _afterSelect = pAfterSelect || null,
                _suggestion = pSuggestion || '',
                _templateFilter,
                _encode = location.hostname.indexOf(".big5.") === -1 ? "gb2312" : "big5",
                init = function () {
                    var me = this;
                    _templateFilter = autoFilter(_dom[0]);
                    _core.Storage.getSession(_key, _url, "", function (data) {
                        initData.call(me, data);
                    }, pIsJsonP, _encode);

                },
                autoFilter = function (pDom) {
                    var _basewidth = pDom.offsetWidth,
                        _hasWidth = _basewidth != null && _basewidth > 0,
                        _ArthusStyleSelect = _hasWidth ? ['style="width:', _basewidth, 'px;"'].join("") : "",
                        _ArthusStyleWrap = _hasWidth ? ['style="width:', _basewidth - 2, 'px;"'].join("") : "";
                    return '\
                    {{if list}}\
                    <div class="c_address_select" $ArthusStyleSelect$>\
                        <div class="c_address_wrap" $ArthusStyleWrap$>\
                            <div class="c_address_list" style="">\
                                {{each (i,item) list}}\
                                    {{if cQuery.type(item)=="string"}}\
                                        <label>${item}</label>\
                                    {{else}}\
                                        <a href="javascript:void(0);" data="${data}" style="display: block;"><span>${left}</span>${right}</a>\
                                    {{/if}}\
                                {{/each}}\
                            </div>\
                            {{if page.max>-1}}\
                                <div class="c_address_pagebreak" style="display: block;">\
                                    {{if page.current>0}}\
                                        <a href="javascript:void(0);" page="${page.current-1}">&lt;-</a>\
                                    {{/if}}\
                                    {{if page.current<2}}\
                                        {{loop(index) Math.min(5,page.max+1)}}\
                                            <a href="javascript:void(0);"{{if page.current==index}} class="address_current"{{/if}} page="${index}">${index+1}</a>\
                                        {{/loop}}\
                                    {{else page.current>page.max-2}}\
                                        {{loop(index) Math.max(0,page.max-4),page.max+1}}\
                                            <a href="javascript:void(0);"{{if page.current==index}} class="address_current"{{/if}} page="${index}">${index+1}</a>\
                                        {{/loop}}\
                                    {{else}}\
                                        {{loop(index) Math.max(0,page.current-2),Math.min(page.current+3,page.max+1)}}\
                                            <a href="javascript:void(0);"{{if page.current==index}} class="address_current"{{/if}} page="${index}">${index+1}</a>\
                                        {{/loop}}\
                                    {{/if}}\
                                    {{if page.current<page.max}}\
                                        <a href="javascript:void(0);" page="${page.current+1}">-&gt;</a>\
                                    {{/if}}\
                                </div>\
                            {{/if}}\
                        </div>\
                    </div>\
                   {{/if}}\
                '.replace("$ArthusStyleSelect$", _ArthusStyleSelect).replace("$ArthusStyleWrap$", _ArthusStyleWrap);
                },
                initData = function (pData) {
                   cQuery.mod.load('address', '1.0');
                    var _ref = _dom.regMod('address', '1.0', {
                        name: _name,
                        source: {
                            alias: ['pinyin', 'cityName', 'cityId'],
                            data: pData
                        },
                        //minLength:2,
                        needReadOnly: false,
                        isFocusNext: !!pEnterFunc,
                        isAutoCorrect: (_dom.attr("data-correct") != null),
                        isFilterSelect: !pEnterFunc,
                        template: { filter: _templateFilter, suggestion: "",suggestionIpad:""}
                    });


                    _ref.method('bind', 'change', function () {
                        _dom[0].setAttribute("data-val", arguments[1].data);
                        _afterSelect && _afterSelect();
                        _dom[0].blur();
                        pEnterFunc && pEnterFunc();
                    });

                    if (!/ipad/.test(navigator.userAgent.toLowerCase()) && !!pEnterFunc) {
                        _ref.method('bind', 'enter', function () {
                            ;
                            setTimeout(function () {
                                _dom[0].blur();
                                pEnterFunc();
                            }, 0);
                        });
                    }
                };
        init();
    };

    Validation.position = function (pObj) {
        var _left = pObj.offsetLeft || 0,
                _top = pObj.offsetTop || 0;
        while (pObj = pObj.offsetParent) {
            _left += eval(pObj.offsetLeft);
            _top += pObj.offsetTop;
        }
        return { x: _left, y: _top };
    };

    Validation.ValidateForm = function (pFields, pCallBack, pIsAuto, pErrorTemplate) {
        var _felids = pFields,
            _callBack = pCallBack,
            _errorContainer = document.createElement("DIV"),

        /*
        * {id:dom} errTip
        */
            _errorTips = {},
        /*
        * {id:dom} field inputs
        */
            _inputs = {};
        this.ErrorIptClass = "input_error";
        this.ErrorIptClassReg = new RegExp(this.ErrorIptClass);
        this.ErrorTipTemplate = pErrorTemplate || '<b></b><i></i><div class="alert_info">$text$</div>';
        //"<div class=\"c_alertinfo\">$text$</div>";
        /*
        * when ipt onfoucs
        */
        this.onIptFoucs = function (event) {
            var _target = event.target || event.srcElement,
                _id = _target.id,
                _def = _target.getAttribute("data-default");
            _def != null && _target.value === _def && (_target.value = "");
            if (_errorTips[_id]) {
                _errorTips[_id].style.display = "none";
                $(_target).removeClass(this.ErrorIptClass);
                //UI.Dom.removeClass(_target, this.ErrorIptClass);
            }
            $(_target).removeClass("input_default");
            //UI.Dom.removeClass(_target, "input_default");
        };
        /*
        * when ipt onblur
        */
        this.onIptBlur = function (event) {
            var me = this,
                _target = event.target || event.srcElement,
                _id = _target.id,
                _def = _target.getAttribute("data-default");
            if (_def != null && _target.value.replace(_regTirm, "") === "") {
                _target.value = _def;
                $(_target).addClass("input_default");
                //UI.Dom.addClass(_target, "input_default");
            }
            me.checkRules.call(me, _id, _felids[_id]);
        };

        /*
        * target check
        */
        this.trigger = function (event) {
            var me = this,
                _sign = true;
            me.hideTip.call(me);
            for (var key in _felids) {
                if (!me.checkRules.call(me, key, _felids[key])) {
                    _sign = false;
                    break;
                }
            }
            if (_sign) {
                typeof _callBack === "function" && _callBack();
            } else {
                event.stopPropagation();
                event.preventDefault();
            }
        };
        /*
        * check one rule
        */
        this.checkRules = function (pId, pRules) {
            var me = this,
                _ipt = _inputs[pId],
                _rules = pRules,
            //temp arguments
                _tempArr,
            //temp point
                _args;
            for (var key in _rules) {
                if (typeof me.Check[key] === "function") {
                    //get params
                    _tempArr = [_ipt];
                    _args = _rules[key].args;
                    if ($.isArray(_args)) {
                        for (var i = 0, l = _args.length; i < l; i++) {
                            _tempArr.push(_args[i]);
                        }
                    }
                    //get return
                    if (!me.Check[key].apply(me, _tempArr)) {
                        me.showTip.call(me, _ipt, _rules[key].err);
                        return false
                    }
                }
            }
            return true
        };
        /*
        * hide all errors
        */
        this.hideTip = function () {
            for (var i in _errorTips) {
                _errorTips[i].style.display = "none";
            }
            for (var j in _inputs) {
                _inputs[j].className !== undefined && (_inputs[j].className = _inputs[j].className.replace(this.ErrorIptClassReg, ""));
            }
        };
        /*
        * show or create an error tip
        */
        this.showTip = function (pIpt, pError) {
            var me = this,
                _tip = _errorTips[pIpt.id];
            if (_tip) {
                _tip.style.display = "";
                _tip.innerHTML = me.ErrorTipTemplate.replace(/\$text\$/, pError);
            } else {
                me.createTip.call(me, pIpt, pError);
            }
            $(pIpt).addClass(this.ErrorIptClass);
            //UI.Dom.addClass(pIpt, this.ErrorIptClass);
        };
        /*
        * can be override
        */
        this.createTip = function (pDom, pText) {
            var me = this,
                _div = document.createElement("DIV"),
                _pos = Validation.position(pDom);
            _div.style.position = "absolute";
            _div.className = "base_alert";
            _div.innerHTML = me.ErrorTipTemplate.replace(/\$text\$/, pText);
            _div.style.top = _pos.y + "px";
            _div.style.left = _pos.x + pDom.offsetWidth + "px";
            //Add
            _errorContainer.appendChild(_div);
            _errorTips[pDom.id] = _div;
        };
        /*
        * reset the position of tips
        */
        this.onResize = function () {
            var _point, _pos, _div;
            for (var i in _errorTips) {
                _div = _errorTips[i];
                _point = _inputs[i];
                _pos = Validation.position(_point);
                _div.style.top = _pos.y + "px";
                _div.style.left = _pos.x + _point.offsetWidth + "px";
            }
        };
        /*
        * initail
        */
        this.init = function (pIsAuto) {
            var me = this,
                _tempPoint;
            document.getElementsByTagName("BODY")[0].appendChild(_errorContainer);
            for (var key in _felids) {
                _tempPoint = document.getElementById(key);
                _tempPoint && (_inputs[key] = _tempPoint);
            }
            $(window).bind("resize", function () {
                me.onResize.call(me);
            });
            if (pIsAuto) {
                for (var k in _inputs) {
                    var _def = _inputs[k].getAttribute("data-default");
                    if (_def != null && _inputs[k].value.replace(_regTirm, "") === "") {
                        _inputs[k].value = _def;
                        $(_inputs[k]).addClass("input_default");
                        //UI.Dom.addClass(_inputs[k], "input_default");
                    }
                    $(_inputs[k]).bind("blur", function (event) {
                        me.onIptBlur.call(me, event);
                    });
                    $(_inputs[k]).bind("focus", function (event) {
                        me.onIptFoucs.call(me, event);
                    });
                }
            } else {
                for (var k in _inputs) {
                    var _def = _inputs[k].getAttribute("data-default");
                    if (_def != null) {
                        _inputs[k].value = _def;
                        $(_inputs[k]).addClass("input_default");
                        //UI.Dom.addClass(_inputs[k], "input_default");
                        $(_inputs[k]).bind("blur", function (event) {
                            var _dom = event.target,
                                _default = _dom.getAttribute("data-default") || "";
                            if (_dom.value.replace(_regTirm, "") === "") {
                                _dom.value = _default;
                                $(_dom).addClass("input_default");
                                //UI.Dom.addClass(_dom, "input_default");
                            }
                        });
                        $(_inputs[k]).bind("focus", function (event) {
                            var _dom = event.target,
                                _default = _dom.getAttribute("data-default") || "";
                            if (_dom.value === _default) {
                                _default && (_dom.value = "");
                            }
                            $(_dom).removeClass("input_default");
                            //UI.Dom.removeClass(_dom, "input_default");
                        });
                    }
                }
                $(document.body).bind("click", function () {
                    me.hideTip.call(me);
                });
            }
        };
        this.init(pIsAuto);
    };

    Validation.ValidateForm.prototype = {
        Check: {
            required: function (pIpt) {
                if (pIpt.type == "checkbox") {
                    return (pIpt.checked === true)
                }
                return pIpt.value != null && pIpt.value != "" && pIpt.value != pIpt.getAttribute("data-default") && pIpt.value.replace(_regTirm, "") !== ("" || pIpt.attributes["_cqnotice"].value);
            },
            requiredOrDefault: function (pIpt) {
                if (pIpt.type == "checkbox") {
                    return (pIpt.checked === true)
                }
                return pIpt.value != null && pIpt.value.replace(_regTirm, "") !== ("" || pIpt.attributes["_cqnotice"].value);
            },
            matchOne: function (pIpt, values) {
                var _val = pIpt.value
                for (var key in values) {
                    if (_val === values[key]) return true;
                }
                return false;
            },
            matchAll: function (pIpt, values) {
                var _val = pIpt.value
                for (var key in values) {
                    if (_val !== values[key]) return false;
                }
                return true;
            },
            matchNone: function (pIpt, values) {
                var _val = pIpt.value
                for (var key in values) {
                    if (_val === values[key]) return false;
                }
                return true;
            },
            email: function (pIpt) {
                return _regEmail.test(pIpt.value);
            },
            emails: function (pIpt, pChar, pMax) {
                var _arr = pIpt.value.split(pChar),
                    _l = _arr.length;
                if (pMax !== undefined && _l > pMax) {
                    return false;
                }
                for (var key = 0; key < _l; key++) {
                    if (!_regEmail.test(_arr[key])) return false;
                }
                return true;
            },
            idCard: function (pIpt) {
                return _regIdCard.test(pIpt.value);
            },
            mobilePhone: function (pIpt) {
                return _regMobilePhone.test(pIpt.value);
            },
            num: function (pIpt) {
                return _regNum.test(pIpt.value);
            },
            numInteger: function (pIpt) {
                return _regInteger.test(pIpt.value);
            },
            numDecimal: function (pIpt) {
                return _regDecimal.test(pIpt.value);
            },
            chinese: function (pIpt) {
                return _regChinese.test(pIpt.value);
            },
            len: function (pIpt, pMin, pMax) {
                var _len = pIpt.value.length;
                return _len > pMin && _len < pMax;
            },
            lenTrim: function (pIpt, pMin, pMax) {
                var _len = pIpt.value.replace(_regTirm, "").length;
                return _len > pMin && _len < pMax;
            },
            lenChinese: function (pIpt, pMin, pMax) {
                var _len = 0,
                    _val = pIpt.value;
                for (var i = 0; i < _val.length; i++) {
                    _len += _val.charAt(i) > '~' ? 2 : 1;
                }
                return _len > pMin && _len < pMax;
            },
            lenChineseTrim: function (pIpt, pMin, pMax) {
                var _len = 0,
                    _val = pIpt.value.replace(_regTirm, "");
                for (var i = 0; i < _val.length; i++) {
                    _len += _val.charAt(i) > '~' ? 2 : 1;
                }
                return _len > pMin && _len < pMax;
            },
            numRange: function (pIpt, pMin, pMax, pIsMinClouser, pIsMaxClouser) {
                var _val = pIpt.value;
                return (_val > pMin || (pIsMinClouser && _val === pMin)) && (_val < pMax || (pIsMaxClouser && _val === pMax));
            },
            attrExist: function (pIpt, pAttr) {
                return pIpt.getAttribute(pAttr) != null;
            },
            attrEq: function (pIpt, pAttr, pEq) {
                return pIpt.getAttribute(pAttr) == pEq;
            },
            attrReg: function (pIpt, PAttr, pReg) {
                var _attrValue = pIpt.getAttribute("pAttr");
                return typeof _attrValue === "string" && pReg.test(_attrValue);
            },
            delegate: function (pIpt, pDelegate) {
                return pDelegate(pIpt);
            },
            delegate2: function (pIpt, pDelegate) {
                return pDelegate(pIpt);
            }
        }
    };

    var newDate = function (pStr) {
        var _arr = pStr.split("-");
        return new Date(+_arr[0], +_arr[1] - 1, +_arr[2]);
    },

    getParentNode = function (pDom, pDelegate) {
        var _node = pDom;
        if (_node != null) {
            while (_node.parentNode != null) {
                _node = _node.parentNode;
                if (pDelegate(_node)) return _node;
            }
        }
        return _node;
    },

    sumbitForm = function (pParam, pAction, pMethod, isNew) {
        var _form = createFrom(pParam, pAction, pMethod, isNew);
        _form.submit();
        delete _form;
    },

    createFrom = function (pParam, pAction, pMethod, isNew) {
        var _form = document.createElement("FORM"),
                _inner = [],
                _guid = getGuid();
        isNew && (_form.target = "_blank");
        _form.method = pMethod || "get";
        for (var name in pParam) {
            _inner.push(['<input type="hidden" name="', name, '" id="', name, '" value="', pParam[name], '" />'].join(""));
        }
        _inner.push(['<input type="submit" name="submitBtn', _guid, '" id="submitBtn', _guid, '" value="" />'].join(""));
        _form.action = pAction;
        _form.innerHTML = _inner.join("");
        document.body.appendChild(_form);
        return _form;
    },

    VacationSearch = function (pDom, pAppendParam) {
        var _dataVal = pDom.getAttribute("data-val"),
                _param = {
                    StartCity: $$.StartCity,
                    SearchText: pDom.value,
                    SearchType: "U",
                    SearchValue: pDom.value,
                    SearchFrom: location.href,
                    IsFromIndex: "1",
                    SearchID: 0
                };
        if (_dataVal != null) {
            var _arr = _dataVal.split("|");
            if (_arr.length > 2) {
                var _args = _arr[2].split("$");
                if (_args.length > 2 && _arr[1] === pDom.value) {
                    _param.SearchID = _args[2];
                    _param.SearchType = _args[1];
                    _param.SearchValue = _args[0];
                }
            }
        }
        if (pAppendParam) {
            for (var name in pAppendParam) {
                _param[name] = pAppendParam[name];
            }
        }
        /*用户搜索埋点数据*/
        window.$_bf.tracklog("vacation.search", "keyword =" + _param.SearchText);
        sumbitForm(_param, $$.Handler.VacationSearch, "post");
    },

    Search = function () {
        /*cQuery.mod.load('notice', '1.0', function () {
            cQuery("#SearchText").regMod("notice", "1.0", {
                name: "SearchText",
                tips: "请输入目的地、主题或关键字",
                selClass: "inputSel"
            }, true);
        });*/

        var _iptText = $(".main_search_txt")[0],
                _iptBtn = $(".main_search_btn")[0],
                _iptLabel = $("#inputNotice"),
                _valid = new Validation.ValidateForm({
                    SearchText: {
                        required: {
                            err: "搜索内容不能为空"
                        }
                    }
                }, function () {
                    VacationSearch(_iptText);
                }, false),
                /*
                *  提示控制
                */
                showInputAlert = function () {
                    if (_iptText.value.length === 0) {
                        if (/ipad/.test(navigator.userAgent.toLowerCase())) {
                            _iptText.readOnly = true;
                        }
                        _iptLabel.removeClass('invisible');
                    }
                }
				 , hideInputAlert = function () {
				     _iptLabel.addClass('invisible');
				 },
                 /*
                *  地址选择器
                */
                init = function () {
                    if (_iptText.value.length!=0) {
                        hideInputAlert();
                    }
                    SearchAddress(cQuery(_iptText), "Vacation_MainAddress", null, true, null, function () {
                        if (_iptText.value.replace(/\s|\t|\n|\r/g, "") !== "" && _iptText.value != _iptText.getAttribute("_cqnotice")) {
                            VacationSearch(_iptText);
                        }
                    });
                    var $_iptText = $(_iptText);
                    if (_iptLabel[0]) {
                        if (/ipad/.test(navigator.userAgent.toLowerCase())) {
                            $_iptText.bind('click', function () {
                                $_iptText[0].readOnly = false;
                                $('.CQ_suggestionKeyboard').removeClass('ico_key').addClass("ico_unkey");
                                setTimeout(function () {
                                    $_iptText[0].readOnly = false;
                                    $_iptText[0].focus();
                                }, 50);
                            })
                        }
                        $_iptText.bind('focus', function () {
                            hideInputAlert();
                        });
                        $_iptText.bind('keyup', function () {
                            hideInputAlert();
                        });
                        $_iptText.bind('change', function () {
                            hideInputAlert();
                        });
                        $_iptText.bind('blur', function () {
                            showInputAlert();
                        });
                        _iptLabel.bind('click', function () {
                            $_iptText[0].focus();
                        });
                    }

                    $(_iptBtn).bind("click", function (event) {
                        _valid.trigger(event);
                    });
                };
        init();
    },

    SearchPro = function () {
        /*cQuery.mod.load('notice', '1.0', function () {
            cQuery("#SearchProText").regMod("notice", "1.0", {
                name: "SearchProText",
                tips: $("#SearchProText").attr("_cqnotice"),
                selClass: "inputSel"
            }, true);
        });*/
        var _hideBtn = document.getElementById("SearchProHideBtn"),
                $panel = $(".senior_search_box"),
                _panel = $panel[0],
                _lis = $panel.find("LI:gt(2)"),
                _iptBtn = $(".search_btn", $panel)[0],
                _labels = _panel.getElementsByTagName("LABEL"),
                _inputNumber = $(_panel).find("INPUT[type='number']"),
                _inputTexts = $(_panel).find("INPUT[type='text']"),
			    _inputTexts = $(_inputTexts.toArray().concat(_inputNumber.toArray())),
                _searchInputText = _inputTexts[0],
                _checkboxes = $panel.find("INPUT[type=checkbox]"),
                _searchProText = $('#SearchProText'),
				_inputNotice = $('#inputNotice02'),
                _valid = new Validation.ValidateForm({
                    SearchProText: {
                        required: {
                            err: "搜索内容不能为空"
                        }
                    }
                }, function () {
                    var filterArr = [], _filterParam = [], _l, param; //match(/([A-Za-z]+[\d]+)/g)
                    for (var i = 0, l = _checkboxes.length; i < l; i++) {
                        if (_checkboxes[i].checked && _checkboxes[i].value != null) {
                            filterArr = filterArr.concat(_checkboxes[i].value.match(/([A-Za-z]+[\d]+)/g));
                        }
                    }
                    filterArr.sort(function (t1, t2) {
                        var _it1 = t1.match(/([A-Za-z]+)([\d]+)/),
                        _it2 = t2.match(/([A-Za-z]+)([\d]+)/);

                        if (_it1[1] != _it2[1]) return _it1[1] > _it2[1];
                        else return _it1[2] < _it2[2];

                    });
                    _l = filterArr.length;
                    if (_l > 0) {
                        _filterParam.push(filterArr[0])
                        for (var j = 1; j < _l; j++) {
                            if (filterArr[j - 1] !== filterArr[j]) {
                                _filterParam.push(filterArr[j]);
                            }
                        }
                    }
                    param = {
                        StartCity: $$.StartCity,
                        StartPrice: _inputTexts[3].value,
                        EndPrice: _inputTexts[4].value,
                        ScheduleStart: _inputTexts[1].value,
                        ScheduleStartEnd: _inputTexts[2].value,
                        FilterPara: $$.StartCity + _filterParam.join(""),
                        SearchFrom: location.href//高级搜索
                    };
                    VacationSearch(_searchInputText, param);
                }, false),
                getLimitBtn = function (pDom) {
                    return getParentNode(pDom, function (p) {
                        return p.tagName === "LI";
                    }).getElementsByTagName("A")[0];
                    //_btn.className= pIsSelect?"unlimited current":"unlimited";
                },
                initCheckBox = function (pDom) {
                    var _limitBtn = pDom.getElementsByTagName("A")[0],
                        _checkBoxes = pDom.getElementsByTagName("INPUT"),
                        _length = _checkBoxes.length;
                    $(_limitBtn).bind("click", function () {
                        _limitBtn.className = "unlimited current";
                        for (var i = 0; i < _length; i++) {
                            _checkBoxes[i].checked = false;
                            _checkBoxes[i].parentNode.className = "";
                        }
                    });
                    for (var j = 0; j < _length; j++) {
                        (function (j) {
                            $(_checkBoxes[j]).bind("click", function () {
                                if (_checkBoxes[j].checked) {
                                    _limitBtn.className = "unlimited";
                                } else {
                                    var _IsValid = true;
                                    for (var k = 0; k < _length; k++) {
                                        if (_checkBoxes[k].checked) {
                                            _IsValid = false;
                                            break;
                                        }
                                    }
                                    _IsValid && (_limitBtn.className = "unlimited current");
                                }
                            });
                        })(j);
                    }
                },
                initPrice = function () {
                    var me = this,
                        _limitBtn = getLimitBtn(_inputTexts[3]),
                        _hover = function (pIptText) {
                            $(pIptText).bind("focus", function () {
                                _limitBtn.className = "unlimited";
                            });
                            $(pIptText).bind("blur", function () {
                                pIptText.value = pIptText.value.replace(/\s|\t|\n|\r/g, "");
                                if (!/^\-?\d*\.?\d+$/.test(pIptText.value)) {
                                    pIptText.value = "";
                                }
                                var _val1 = +_inputTexts[3].value,
                                    _val2 = +_inputTexts[4].value;
                                if (_val1 === 0 && _val2 === 0) {
                                    _limitBtn.className = "unlimited current";
                                }
                                if (_val1 !== 0 && _val2 !== 0 && _val1 > _val2) {
                                    _inputTexts[3].value = _val2;
                                    _inputTexts[4].value = _val1;
                                }
                            });
                        };
                    $(_limitBtn).bind("click", function () {
                        _limitBtn.className = "unlimited current";
                        _inputTexts[3].value = _inputTexts[4].value = "";
                    });
                    _hover.call(me, _inputTexts[3], _inputTexts[4]);
                    _hover.call(me, _inputTexts[4], _inputTexts[3]);
                },
                initData = function () {
                    var me = this,
                        _limitBtn = getLimitBtn(_inputTexts[1]),
                        _hover = function (pIptText) {
                            cQuery.mod.load('calendar', '3.0', function () {
                                cQuery(pIptText).regMod('calendar', '3.0', {
                                    options: { autoShow: false, showWeek: true },
                                    listeners: {
                                        onChange: function (input, value) {
                                            _limitBtn.className = "unlimited";
                                            if (newDate(_inputTexts[1].value) > newDate(_inputTexts[2].value)) {
                                                var _temp = _inputTexts[2].value;
                                                _inputTexts[2].value = _inputTexts[1].value;
                                                _inputTexts[1].value = _temp;
                                            }
                                        }
                                    }
                                });
                            });
                        };
                    $(_limitBtn).bind("click", function () {
                        _limitBtn.className = "unlimited current";
                        _inputTexts[1].value = _inputTexts[2].value = "";
                    });
                    _hover.call(me, _inputTexts[1]);
                    _hover.call(me, _inputTexts[2]);
                },
                hideproNotice = function () {
                    _inputNotice.addClass('invisible');
                },
				showProNotice = function () {
				    if (_searchProText[0].value.length === 0) {
				        _inputNotice.removeClass('invisible');
				       /* if (/ipad/.test(navigator.userAgent.toLowerCase())) {
				            _searchProText[0].readOnly = true;
				        }*/
				    }
				},
				initNotice = function () {
				    if (_inputNotice[0]) {
				        /*if (/ipad/.test(navigator.userAgent.toLowerCase())) {
				            _searchProText.bind('click', function () {
				                _searchProText[0].readOnly = false;
				                $('.CQ_suggestionKeyboard').removeClass('ico_key').addClass("ico_unkey");
				                setTimeout(function () {
				                    _searchProText[0].readOnly = false;
				                    _searchProText[0].focus();
				                }, 50);
				            })
				        }*/
				        if (_searchProText[0].value.length != 0) {
				            hideproNotice();
				        }
				        _searchProText.bind('focus', function () {
				            hideproNotice();
				        });
				        _searchProText.bind('keyup', function () {
				            hideproNotice();
				        });
				        _searchProText.bind('change', function () {
				            hideproNotice();
				        });
				        _searchProText.bind('blur', function () {
				            showProNotice();
				        });
				        _inputNotice.bind('click', function () {
				            _searchProText[0].focus();
				        })
				    }
				},
                init = function () {
                    var _isIE6 = $.browser && $.browser.msie && $.browser.version == "6.0";
                    $(".senior_search_btn").bind("click", function () {
                        $panel.show();
                    });
                    /*
                    Core.bind(_showBtn, "click", function () {
                    _panel.style.display = "";
                    });
                    */
                    $(_hideBtn).bind("click", function () {
                        _panel.style.display = "none";
						if ((/ipad/i).test(navigator.userAgent.toLowerCase())) {
							$($('iframe')[0].contentWindow.document).find('.calendar_pad').find('.close').click();
						} 
                    });
                    //SearchAddress(cQuery(_searchInputText), "Vacation_MainAddressPro", null, true);
                    $(_iptBtn).bind("click", function (event) {
                        _valid.trigger(event);
                    });
                    initData();
                    initPrice();
                    initNotice();
                    for (var n = 0, nl = _lis.length; n < nl; n++) {
                        initCheckBox(_lis[n]);
                    }
                    //RepairIE6
                    for (var i = 0, l = _labels.length; i < l; i++) {
                        (function (i) {
                            _isIE6 && $(_labels[i]).bind("mouseover", function () {
                                _labels[i].className = "current";
                            });
                            _isIE6 && $(_labels[i]).bind("mouseout", function () {
                                _labels[i].className = _labels[i].getElementsByTagName("INPUT")[0].checked ? "current" : "";
                            });
                            $(_labels[i]).bind("click", function () {
                                _labels[i].className = _labels[i].getElementsByTagName("INPUT")[0].checked ? "current" : "";
                            });
                        })(i);
                    }
                };
        init();
    },

    SearchHistory = function () {
        var _container = document.getElementById("SearchHistory"),
                _data = Cmd.Cookie.GetCookie("LatelySearch"),
                _history,
                _temp,
                init = function () {
                    if (_data) {
                        _history = decodeURIComponent(_data).replace(/^c=/, "").split("$");
                        for (var i = _history.length - 1; i !== -1; i--) {
                            (function (i) {
                                var _a = document.createElement("A");
                                _a.href = "###";
                                _temp = _history[i].split("|");
                                _a.innerHTML = _temp[2];
                                $(_a).bind("click", function () {
                                    var _temp2 = _history[i].split("|"),
                                        _param = {};
                                    _param.StartCity = $$.StartCity;
                                    _param.SearchType = _temp2[0];
                                    _param.SearchValue = _temp2[1];
                                    _param.SearchText = _temp2[2];
                                    _param.SearchID = _temp2[3];
                                    _param.SearchFrom = location.href;
                                    _param.IsFromIndex = "1";
                                    sumbitForm(_param, window.$$.Handler.VacationSearch, "post");
                                });
                                _container.appendChild(_a);
                            })(i);
                        }
                    }
                };
        init();
    },

    GoogleAd = function (pContainer) {
        var _ad = document.createElement('SCRIPT');
        _ad.type = 'text/javascript';
        _ad.async = true;
        _ad.src = 'http://mcc.chinauma.net/static/scripts/p.js?id=47&w=950&h=60&sl=1&delay=5';
        _ad.setAttribute("zp_type", "1");
        _ad.setAttribute("id", "zp_script_47");
        pContainer.appendChild(_ad);
    };

    var v_index = {
        common: { //公用的函数
            render: function (tpl, data, handle, cb) {
                var Template = Handlebars.compile(tpl);
                var html = Template(data);
                typeof handle === 'function' && handle.call(this, html);
                typeof cb === 'function' && cb.call(this, html);
                return html;
            },
            fetchData: function (opts, cb) { //ajax
                var self = this;
                $.ajax({
                    type: opts.method || 'GET',
                    url: opts.url || self.config.fetchUrl,
                    data: opts.data,
                    dataType: opts.type || 'json',
                    // timeout : 5000,
                    success: function (data) {
                        cb.call(self, data);
                    },
                    error: function (msg) {
                        // alert(msg)
                    }
                });
            },
            Notice: function (pContainer) {
                var _container = pContainer;
                _items = _container.find("P"),
                _scrollCore = new Animation.Scroll(_container[0], _items, true, 1, 20, 2000, 1);
                _scrollCore.init();
                _scrollCore.wait();
            },
            YNotice: function (pContainer) {
                var _container = pContainer;
                //_container[0].style.cssText = "float:right;height:18px;overflow:hidden;width:1110px;white-space:nowrap;";
                _items = _container.find("SPAN"),
                _scrollCore = new Animation.Scroll(_container[0], _items, false, 8, 50, 10, 1);
                _scrollCore.init();
                _scrollCore.wait();
            }
        },
        model: {   //数据模型
        },
        tpl: {    //模板
            payTip: '<div class="notice_box">\
                        <i></i>无需提前在携程网站付款，订单提交成功后，您可凭收到的订单确认短信至指定的售票窗口按预订价付款购票。\
                    </div>',
            linkerSug: '<div class="person_content">\
                        <p>常用联系人</p>\
                        <div class="layoutfix">\
                            {{#each common}}\
                            <a href="###" uid="{{clientID}}">{{#if nameCN}}{{nameCN}}{{else}}{{nameEN}}{{/if}}<span>{{mobileNo}}</span></a>\
                            {{/each}}\
                        </div>\
                        <p>登机人</p>\
                        <div class="layoutfix">\
                            {{#each board}}\
                            <a href="###" index={{@index}}>{{#if nameCN}}{{nameCN}}{{else}}{{nameEN}}{{/if}}<span>{{mobileNo}}</span></a>\
                            {{/each}}\
                        </div>\
                    </div>',
            commoners: '<ul class="person_select">\
                {{#each collecters}}\
                    <li>\
                    <a href="javascript:void(0);" class="cb-item" cid="{{clientID}}" role="topContact" data-params="{id:\'{{clientID}}\',name:\'{{nameCN}}\',certificate:\'{{certificate}}\',certificate_number:\'{{certificate_number}}\',mphone:\'{{mobileNo}}\'}"><i></i><span>{{#if nameCN}}{{nameCN}}{{else}}{{nameEN}}{{/if}}</span></a>\
                    </li>\
                {{/each}}\
              </ul>',
            nameCNTips: '<div class="person_passenger" role="nameTips">\
                        {{#if nameCN}}\
                        <div class="base_txtgray hand had"><span class="name">{{nameCN}}</span>中文姓名</div>\
                        {{else}}\
                        <div class="base_txtgray hand"><span>中文或拼音</span>中文姓名</div>\
                        {{/if}}\
                    </div>',
            nameENTips: '<div class="person_passenger" role="nameTips">\
                        {{#if nameEN}}\
                        <div class="base_txtgray hand had"><span class="name">{{nameEN}}</span>英文姓名</div>\
                        {{else}}\
                        <div class="base_txtgray hand"><span>last（姓）/first（名）</span>英文姓名</div>\
                        {{/if}}\
                    </div>',
            waterflowTemplate: '<div class="tab_wrap">\
                                    <h2>{{Type.Title}}</h2>\
                                    <ul>\
                                        {{#listTab Tab}}<li {{#current}}class="current"{{/current}}>\
                                        <span>{{name}}</span>\
                                        <b></b><i></i>\
                                        </li>{{/listTab}}\
                                        {{#showTypeDetail \'CssName\' \'abroad\'}}\
                                        <li class="top_travel"><a target="_blank" href="http://www.hhtravel.com/?=vacationintertag">{{#ifBig5}}頂級游{{else}}顶级游{{/ifBig5}}</a></li>\
                                        {{/showTypeDetail}}\
                                        {{#showTypeDetail \'CssName\' \'cruise\'}}\
                                        <li class="top_travel"><a target="_blank" href="http://www.hhtravel.com/?=vacationcruisetag">{{#ifBig5}}頂級游{{else}}顶级游{{/ifBig5}}</a></li>\
                                        {{/showTypeDetail}}\
                                   </ul>\
                                </div>\
                                <div class="product_wrap">\
                                    <div class="theme_box">\
                                    {{#showLeft Left Type.Mode}}\
                                    {{#showThemeLinkStart Type.Mode}}<div class="theme_link">{{/showThemeLinkStart}}\
                                    <a target="_blank" href="{{showHref Left}}{{showCtm CTM 0}}" {{#shouldShow 4}}title="{{displayTitle Left}}" class="cruise_corp {{displayValue Left \'cssClass\'}}"{{/shouldShow}}{{#shouldShow 1}}class="theme_pic"{{/shouldShow}}>\
                                    {{#shouldShow 4}}{{else}}\
                                    <img {{#shouldShow \'1,3\'}}width="210" height="{{#shouldShow 3}}{{displayValue Type.SHeight}}{{else}}{{displayValue Type.THeight}}{{/shouldShow}}"{{/shouldShow}} alt="" src="{{displayValue Left \'src\'}}">\
                                    {{/shouldShow}}\
                                    {{#shouldShow \'2,3\'}}\
                                    <strong>{{displayValue Left \'title\'}}</strong>\
                                    {{/shouldShow}}\
                                    {{#shouldShow 1}}\
                                    {{else}}\
                                    <span>{{displayValue Left \'desc\'}}</span>\
                                    {{/shouldShow}}\
                                    </a>\
                                    {{#showThemeLinkEnd Type.Mode}}</div>{{/showThemeLinkEnd}}\
                                    {{/showLeft}}\
                                    </div>\
                                {{#showRight Right}}\
                                <ul class="{{#showTypeDetail \'CssName\' \'eurail\'}}{{#MoreShouldShow Tab \'精选\'}}product_list{{/MoreShouldShow}}{{else}}product_list{{/showTypeDetail}} {{Type.CssName}}_{{#showTypeDetail \'CssName\' \'eurail\'}}{{#MoreShouldShow Tab \'精选\'}}product{{else}}link_list{{/MoreShouldShow}}{{else}}product{{/showTypeDetail}}" data-init="{{#RightshouldShow 0}}1{{else}}0" style="display:none{{/RightshouldShow}}">{{#RightshouldShow 0}}{{else}}<textarea>{{/RightshouldShow}}{{#showRightDetail Right}}{{#showTypeDetail \'CssName\' \'eurail\'}}{{#MoreShouldShow Tab \'精选\'}}<li{{#RightDetailshouldShow 0}}{{#if Type.InitBig}} class="big_pic"{{/if}}{{/RightDetailshouldShow}}>\
                                <a class="product_pic" target="_blank" title="{{showRightDetails Right \'name\'}}" href="{{showRightDetails Right \'href\'}}{{showCtmRight CTM}}">\
                                <img src="http://pic.c-ctrip.com/vacation_v1/transparent.gif" {{#RightDetailshouldShow 0}}{{#if Type.InitBig}}{{else}}{{#showTypeDetail \'CssName\' \'car,eurail\'}}width="162" height="105"{{else}}width="210" height="100"{{/showTypeDetail}}{{/if}}{{/RightDetailshouldShow}} data-src="{{showRightDetails Right \'img\'}}" alt="{{showRightDetails Right \'name\'}}" />\
                                </a>\
                                {{#ifDetails Right \'tag\'}}\
                                <p class="preferential_info">\
                                <i>优惠</i>\
                                <span>{{showRightDetails Right \'tag\'}}</span>\
                                </p>\
                                {{/ifDetails}}\
                                <h3>\
                                <a target="_blank" href="{{showRightDetails Right \'href\'}}{{showCtmRight CTM}}">\
                                {{#ifDetails Right \'diamond\'}}\
                                <i class="diamond_{{showRightDetails Right \'diamond\'}}"></i>\
                                {{/ifDetails}}\
                                {{showRightDetails Right \'name\'}}</a>\
                                </h3>\
                                <span class="product_location">{{showRightDetails Right \'area\'}}</span>\
                                <a target="_blank" class="price" href="{{showRightDetails Right \'href\'}}{{showCtmRight CTM}}">{{#getPrice Right 0}}<dfn>&yen;</dfn>{{showRightDetails Right \'price\'}}<em>起</em>{{else}}{{/getPrice}}</a>\
                                </li>{{else}}<li><a target="_blank" href="{{showRightDetails Right \'href\'}}" title="{{showRightDetails Right \'name\'}}">{{showRightDetails Right \'name\'}}</a></li>{{/MoreShouldShow}}{{else}}<li{{#RightDetailshouldShow 0}}{{#if Type.InitBig}} class="big_pic"{{/if}}{{/RightDetailshouldShow}}>\
                                <a class="product_pic" target="_blank" title="{{showRightDetails Right \'name\'}}" href="{{showRightDetails Right \'href\'}}{{showCtmRight CTM}}">\
                                <img src="http://pic.c-ctrip.com/vacation_v1/transparent.gif" {{#RightDetailshouldShow 0}}{{#if Type.InitBig}}{{else}}{{#showTypeDetail \'CssName\' \'car,eurail\'}}width="162" height="105"{{else}}width="210" height="100"{{/showTypeDetail}}{{/if}}{{/RightDetailshouldShow}} data-src="{{showRightDetails Right \'img\'}}" alt="{{showRightDetails Right \'name\'}}" />\
                                </a>\
                                {{#ifDetails Right \'tag\'}}\
                                <p class="preferential_info">\
                                <i>优惠</i>\
                                <span>{{showRightDetails Right \'tag\'}}</span>\
                                </p>\
                                {{/ifDetails}}\
                                <h3>\
                                <a target="_blank" href="{{showRightDetails Right \'href\'}}{{showCtmRight CTM}}">\
                                {{#ifDetails Right \'diamond\'}}\
                                <i class="diamond_{{showRightDetails Right \'diamond\'}}"></i>\
                                {{/ifDetails}}\
                                {{showRightDetails Right \'name\'}}</a>\
                                </h3>\
                                <span class="product_location">{{showRightDetails Right \'area\'}}</span>\
                                <a target="_blank" class="price" href="{{showRightDetails Right \'href\'}}{{showCtmRight CTM}}">{{#getPrice Right 0}}<dfn>&yen;</dfn>{{showRightDetails Right \'price\'}}<em>起</em>{{else}}{{/getPrice}}</a>\
                                </li>{{/showTypeDetail}}{{/showRightDetail}}{{#MoreShouldShow Tab \'精选\'}}{{else}}<li class="more_product"><a href="{{displayValue Tab \'href\' \'nondeep\'}}" target="_blank" class="more">更多{{displayValue Tab \'name\' \'nondeep\'}}产品<i></i></a></li>{{/MoreShouldShow}}\
                                {{#RightshouldShow 0}}{{else}}</textarea>{{/RightshouldShow}}\
                                </ul>\
                                {{/showRight}}\
                                </div>',
            hotJmp: '<div {{#if Right.PicUrl}}class="hot_jmp"{{else}}class="hot_jmp hot_no_pic"{{/if}} style="display:none; top:0;">\
                        <ul class="hot_jmp_dest">\
                            {{#each Left}}\
                            <li>\
                                {{#if Url}}\
                                <h4><a href="{{trimUrl Url}}" target="_blank">{{Name}}</a></h4>\
                                {{else}}\
                                <h4>{{Name}}</h4>\
                                {{/if}}\
                                {{#if Children}}\
                                <div class="link_wrap">\
                                    {{#each Children}}\
                                    <a href="{{trimUrl Url}}" target="_blank" {{#isHighLight IsHighLight}}class="orange"{{/isHighLight}}>{{Name}}</a>\
                                    {{/each}}\
                                </div>\
                                {{/if}}\
                            </li>\
                            {{/each}}\
                        </ul>\
                        {{#with Right}}\
                        {{#if PicUrl}}\
                        <div class="jmp_img_wrap">\
                            {{#if SubjectUrl}}\
                            <a href="{{trimUrl SubjectUrl}}" target="_blank">\
                                <img src="" data-src="{{trimUrl PicUrl}}" class="jmp_img" alt="" style="display:none;" />\
                            </a>\
                            {{else}}\
                            <img src="" data-src="{{trimUrl PicUrl}}" class="jmp_img" alt="" style="display:none;" />\
                            {{/if}}\
                        </div>\
                        {{/if}}\
                        {{/with}}\
                    </div>',
            flightHotel: '<dd class="flt_htl_searchBox">\
                    <div class="max_save"><i></i></div>\
                    <form id="FHX_form" method="post">\
                        <ul class="searchBox_list" id="FHX_divHotelQuery">\
                            <li style="z-index:10;">\
                                <span class="icon_per"></span>\
                                <input type="text" name="Adults" class="adult" value="2" id="FHX_AdultSelect" readonly="readonly"/>\
                                <input type="text" name="Children" class="child" value="0" id="FHX_ChildrenSelect" readonly="readonly"/>\
                                <div class="person_floatlist hidden" id="FHX_AdultSelect_Options" style="top: 32px;left: 45px;">\
                                    <a href="javascript:;" data-value="1">1 成人</a>\
                                    <a href="javascript:;" data-value="2">2 成人</a>\
                                    <a href="javascript:;" data-value="3">3 成人</a>\
                                    <a href="javascript:;" data-value="4">4 成人</a>\
                                    <a href="javascript:;" data-value="5">5 成人</a>\
                                    <a href="javascript:;" data-value="6">6 成人</a>\
                                    <a href="javascript:;" data-value="7">7 成人</a>\
                                    <a href="javascript:;" data-value="8">8 成人</a>\
                                    <a href="javascript:;" data-value="9">9 成人</a>\
                                </div>\
                                <div class="person_floatlist hidden" id="FHX_ChildrenSelect_Options" style="top: 32px;left: 177px" >\
                                    <a href="javascript:;" data-value="0">0儿童(2-12岁)</a>\
                                    <a href="javascript:;" data-value="1">1儿童(2-12岁)</a>\
                                    <a href="javascript:;" data-value="2">2儿童(2-12岁)</a>\
                                    <a href="javascript:;" data-value="3">3儿童(2-12岁)</a>\
                                    <a href="javascript:;" data-value="4">4儿童(2-12岁)</a>\
                                    <a href="javascript:;" data-value="5">5儿童(2-12岁)</a>\
                                    <a href="javascript:;" data-value="6">6儿童(2-12岁)</a>\
                                </div>\
                            </li>\
                            <li>\
                                <span class="icon_flt"></span>\
                                <span class="icon_htl"></span>\
                                <input type="text" id="FHX_txtFrom" name="FromCityName"/>\
                                <input type="text" id="FHX_txtTo" name="ToCityName"/>\
                                <input type="text" id="FHX_txtFromDate" name="FromTime" class="departure" readonly="readonly"/>\
                                <input type="text" id="FHX_txtToDate" name="ToTime" class="comeback" readonly="readonly"/>\
                            </li>\
                            <li data-hotel="1">\
                                <input type="text" id="city_c" autocomplete="off"/>\
                                <input type="hidden" name="ToCities"/>\
                                <input type="hidden" name="citypy"/>\
                                <a class="move_htl_btn invisible" href="javascript:void(0);" data-index="1">删除</a>\
                                <input type="text" class="h_data" autocomplete="off" name="CheckInDate" readonly="readonly"/>\
                                <input type="text" class="checkout" autocomplete="off" name="CheckOutDate" readonly="readonly"/>\
                            </li>\
                            <li>\
                                <a class="add_htl_btn" href="javascript:void(0)" id="FHX_lnkAddHotel">添加酒店</a>\
                            </li>\
                            <li>\
                                <a class="fh_searchBox_btn" href="" onclick="return false" id="FHX_btnSearch">搜&nbsp;索</a>\
                            </li>\
                        </ul>\
                        <input type="hidden" name="FromCity" value="" id="FHX_hFromID" />\
                        <input type="hidden" name="ToCity" value="" id="FHX_hToID" />\
                        <input type="hidden" name="FromCityEName" id="FHX_hFromPY" value="" />\
                        <input type="hidden" name="ToCityEName" id="FHX_hToPY" value="" />\
                    </form>\
                </dd>'
        },
        around: { //周边游
            show: function () { },
            hide: function () { }
        },
        domstic: {//国内游
            show: function () { },
            hide: function () { }
        },
        international: {//出境游
            show: function () { },
            hide: function () { }
        },
        cruise: {//游轮
            show: function () { },
            hide: function () { }
        },
        tickets: {//门票
            show: function () { },
            hide: function () { }
        },
        car: {//租车
            show: function () { },
            hide: function () { }
        },
        europe: {//欧铁
            show: function () { },
            hide: function () { }
        },
        /**
        * 首发城市
        * 点击首发城市按钮，显示影藏详情首发城市
        * @author hybu@ctrip.com
        * @CreateDate  2013/11/08
        */
        startStation: function () {
            var self = this;
            var jCitySelect = $('#CitySelect');
            var jStartStationBtn = $('#CitySelect .city_station_btn');
            var jStationDetail;
            return {
                /**
                * 一旦进入页面，就要获取加载浮动数据和层
                * 获取后台拼出的HTML代码，并插入到相应位置
                * 因为是动态生成的DOM，所以需要动态赋值jStationDetail
                */
                init: function () {
                    var me = this;
                    // 获取后台拼出的HTML代码
                    self.common.fetchData({
                        url: '/Package-Booking-VacationsOnlineSiteUI/Handler/IndexHotStartCityNew.ashx',
                        data: {
                            startCity: $$.StartCity
                        }
                    }, function (response) {
                        jCitySelect.append(response);
                        // 动态生成HTML后动态赋值
                        jStationDetail = jCitySelect.find('.city_searchBox');
                        me.bind();
                    });
                },
                /**
                * 绑定Button和Detail的Click事件
                */
                bind: function () {
                    var me = this;
                    // 点击出发城市button，必须取消冒泡，阻止触发document一次性点击事件
                    jStartStationBtn.bind('click', function (event) {
                        event.stopPropagation();
                        event.preventDefault();
                        me.change();
                    });
                    // 点击出发城市详情浮出层，必须取消冒泡，阻止触发document一次性点击事件
                    jStationDetail.bind('click', function (event) {
                        event.stopPropagation();
                    });

                },
                /**
                * 添加删除jStartStationBtn上的city_spread达到隐藏显示详情浮出层
                * .city_spread 用css方式控制浮动层display
                * @return {void}
                */
                change: function () {
                    var me = this;
                    if (jStartStationBtn.hasClass('on')) {
                        me.hide();
                    } else {
                        me.show();
                        // 机+酒如果展开要隐藏
                        self.flightHotel().hide();
                    }
                },
                show: function () {
                    jStartStationBtn.addClass('on');
                    jStationDetail.show();
                    // document一次性事件，隐藏出发城市详情浮出层
                    $(document).one('click', function (event) {
                        jStartStationBtn.removeClass('on');
                        jStationDetail.hide();
                    });
                },
                /**
                 * 隐藏detail，机+酒会调用
                 * 对外公开函数，因为city_searchBox是动态加入的，所以公开后必须单独取
                 */
                hide: function () {
                    var jStationDetail = jCitySelect.find('.city_searchBox');
                    jStartStationBtn.removeClass('on');
                    jStationDetail.hide();
                }
            }
        },
        /**
         * 机+酒 弹出框功能，同首发城市功能呢相同
         */
        flightHotel: function () {
            var self = this;
            var jCitySelect = $('#CitySelect');
            var jFlightHotelBtn = $('#CitySelect .flt_htl_btn');
            var jFlightDetail;

            return {
                init: function () {
                    var me = this;
                    me.appendHtml();
                    // 运行第三方的代码
                    me.appendJs();
                    me.bind();
                },
                /**
                 * 动态添加的detail，机+酒的模板HTML
                 * 但是JS不是我们写的，需要再添加第三方的JS
                 */
                appendHtml: function () {
                    jCitySelect.append(self.tpl.flightHotel);
                    jFlightDetail = jCitySelect.find('.flt_htl_searchBox');
                },
                /**
                 * 第三方写的控件代码，使用Labjs运行他们的代码
                 */
                appendJs: function () {
                    var baseUrl = seajs.data.base;
                    $LAB.script({
                        src: baseUrl + 'index/FHX_search.js',
                        charset: "utf-8"
                    });
                },
                bind: function () {
                    var me = this;
                    jFlightHotelBtn.bind('click', function (event) {
                        me.change();
                    });
                },
                change: function () {
                    var me = this;
                    if (jFlightHotelBtn.hasClass('on')) {
                        me.hide();
                    } else {
                        me.show();
                        // 出发城市如果展开要隐藏
                        self.startStation().hide();
                    }
                },
                show: function () {
                    jFlightHotelBtn.addClass('on');
                    jFlightDetail.show();
                },
                /**
                 * 隐藏detail，出发城市会调用
                 * 对外公开函数，因为flt_htl_searchBox是动态加入的，所以公开后必须单独取
                 */
                hide: function () {
                    var jFlightDetail = jCitySelect.find('.flt_htl_searchBox');
                    jFlightHotelBtn.removeClass('on');
                    jFlightDetail.hide();
                }
            }
        },
        /**
        * 热门destination
        * Hover显示隐藏详情热门destination
        * @author hybu@ctrip.com
        * @CreateDate  2013/11/08
        */
        hotDest: function () {
            var self = this;
            var jPanel = $('div.hot_destination');
            var jContainer = jPanel.find('.destination_detail');
            var jPoints = jContainer.find('li[data-key]');
            var jSubitems;
            var jHotSearch = jPanel.find('.hot_search');

            // 存放当前point对应键值表
            var oPoint = {};
            // 存放当前浮出层对应键值表
            var oSubitem = {};

            // 临时变量，前置声明
            var curKey = null;
            // 浮出层美化上移偏移量
            var spanHeight = 24;

            return {
                init: function () {
                    var me = this;

                    me.customHandlebars();
                    // 获取浮动层所有JSON数据
                    self.common.fetchData({
                        url: $$.Handler.HotDestFloat,
                        data: {
                            startCity: $$.StartCity
                        }
                    }, function (response) {
                        me.setDefault(response);
                        me.bind();
                        // 统计代码功能使用，辅助代码
                        me.anchorAttach();
                    });
                },
                /**
                * 初始化各个公共数据，在获取JSON data后第一时间运行
                * 核心在于：
                * 1.第一时间输出模板数据到DOM树树
                * 2.使用俩个字典object。point各个jquery包装li的指向，subitem各个jquery包装浮出层指向
                * 3. 为每个模板创建出来的DOM添加一个Jquery data存放数据——data-key，
                *    这个data-key就是同步的point的data-key，也是得到的JSON数据的每个Key。
                *    这一步其实不需要，是为了后面的anchorAttach方法，
                *    为每个link添加唯一的行列标示统计代码添加而写的。
                * @param {JSON} oData 后台的subitem的数据
                */
                setDefault: function (oData) {
                    var jCurDom;
                    var jTempWrap = $('<div></div>');
                    var dataKey;
                    $.each(oData, function (key, value) {
                        // Handlebar 输出模板数据
                        self.common.render(self.tpl.hotJmp, value, function (dom) {
                            jCurDom = $(dom);
                            // 为每个模板创建出来的DOM添加一个Jquery data存放数据——data-key
                            // 仅在anchorAttach站点统计代码使用到
                            jCurDom.data('data-key', key);
                            // oSubitem存放浮出层对应键值表
                            oSubitem[key] = jCurDom;
                            // 优化DOM操作，先存放在临时wrap dom中
                            jTempWrap.append(jCurDom);
                        });
                    });
                    jSubitems = jTempWrap = jTempWrap.children();
                    jPanel.append(jTempWrap);
                    // oPoint存放point对应键值表
                    jPoints.each(function () {
                        dataKey = $(this).attr('data-key');
                        oPoint[dataKey] = $(this);
                    });
                },
                /**
                * 绑定各个触发事件
                */
                bind: function () {
                    var me = this;
                    var hoverKey;
                    var preEvent;
                    // 存储key，保存每个当前key，如果发生key跳变，那么变成新的key
                    // 优化错做效率，防止反复运行同一函数
                    var storeKey;
                    // 每个li Hover，获得hoverKey，显示高亮和显示对应的浮动层
                    // 使用mousemove动态检测鼠标位置，判断用户是否是仅仅为了移动位置
                    // 好处是用户如果如果快速拂过某个li，不让他触发hover功能
                    // 第一次划入，因为没有preEvent，立即hover
                    jContainer.delegate('li[data-key]', 'mousemove', function (e) {
                        if (!preEvent || me._isNotMoveAway(preEvent, e)) {
                            hoverKey = $(this).attr('data-key');
                            // 验证是不是同一个li位置，是就不重复调用同一函数
                            if (storeKey !== hoverKey) {
                                me._hide();
                                me._show(hoverKey);
                                storeKey = hoverKey;
                            }
                        }
                        preEvent = e;
                    });
                    // 对Container绑定，移除后对Panel绑定
                    // 移出container不代表什么，会移到subitem之内，不能隐藏subitem
                    // 移出Panel才是真正脱离Hover hotDest功能
                    jContainer.bind('mouseleave', function (e) {
                        jPanel.one('mouseleave', function (e) {
                            me._hide();

                        });
                        // 移出就算重新开始计算
                        preEvent == null;
                    });
                    // Panel中另一块区域，移入后也请隐藏subitem
                    jHotSearch.bind('mouseenter', function () {
                        me._hide();
                    });
                },
                /**
                * 获取鼠标的位置，判断用户是否因为想要移动到subitem而移动
                * 如果是向右移动，那么认为仅仅是移动
                * @param  {object}  preEvent 上一个移动的位置
                * @param  {[object}  curEvent 现在移动位置
                * @return {Boolean}
                */
                _isNotMoveAway: function (preEvent, curEvent) {
                    var bRtn = true;
                    // 向右移动
                    if (preEvent.clientX < curEvent.clientX) {
                        bRtn = false;
                    }
                    return bRtn;
                },
                /**
                * 显示当前hoverKey指向的point指向的subitem，且高亮point
                * 更新curKey变为当前hoverKey
                * @param  {string} hoverKey 当前hover上的key
                */
                _show: function (hoverKey) {
                    var me = this;
                    curKey = hoverKey;
                    oPoint[curKey].addClass('current');
                    // 获得的数据会出现data=key没有对应的subitem，那么就不显示subitem
                    if (oSubitem[curKey]) {
                        oSubitem[curKey].show();
                        me._setTop(curKey);
                        me._lazyShowImg(oSubitem[curKey]);
                    } else {
                        return false;
                    }
                },
                /**
                 * 惰性加载图片，第二层浮动层正式地址保存在data-src下
                 * hover时把data-src放入src属性下
                 * @param  {jquery obj} jSubitem 第二层contariner
                 */
                _lazyShowImg: function (jSubitem) {
                    var jImg = jSubitem.find('img.jmp_img');
                    var src = jImg.data('src');
                    jImg.prop('src', src).fadeIn();
                },
                /**
                * 隐藏当前浮出层subitem和当前point的，且去除高亮
                * 更新curKey使之为空
                */
                _hide: function () {
                    if (curKey !== null) {
                        oPoint[curKey].removeClass('current');
                        // 获得的数据会出现data=key没有对应的subitem，那么就不显示subitem
                        oSubitem[curKey] ? oSubitem[curKey].hide() : false;
                        curKey = null;
                    }
                },
                /**
                * 计算浮出层的位置
                * 浮出层的top是相对于容器的位置，所以是一个相对位置
                * @param {num} curKey 当前的Key，可以得到当前point和subitem
                */
                _setTop: function (curKey) {
                    var jPoint = oPoint[curKey];
                    var jSubitem = oSubitem[curKey];
                    var top, calcuTop;

                    // 滚动条滚动距离
                    var scrollTop = $(document).scrollTop();
                    // 浏览器视口高度
                    var clientHeight = $(window).height();
                    // 容器Container的绝对Y位置
                    var containerTop = jContainer.offset().top;
                    // 当前点point的绝对位置
                    var pointTop = jPoint.offset().top;
                    // 浮动层subitem的高度
                    var subitemHeight = jSubitem.height();
                    // 下底线位置，subitem的top不得大于这个底线
                    // 否则无法显示完成的subitem
                    // scrollTop + clientHeight = 现在视口Y绝对位置
                    // subitemHeight + containerTop = 浮动层高度+容器绝对Y位置 = 显示完整浮窗 +
                    //     容器的绝对位置Y偏移量得去除 
                    // 尽可能显示完整浮动层，也许浮动层太大，无法完整显示，那么就会把他放上底线0位置
                    var bottomPos = (scrollTop + clientHeight) - (subitemHeight + containerTop);
                    // 浮出层的top是相对于容器的位置，所以是一个相对位置
                    // 计算得出当前点距离容器的相对距离，一般浮动层就在这个齐平位置
                    calcuTop = pointTop - containerTop;
                    // 计入美化偏移量
                    calcuTop -= spanHeight;

                    if (calcuTop < 0) {
                        // 上底线为0
                        top = 0;
                    } else if (calcuTop > bottomPos) {
                        // 下底线位置，且上底线为0
                        top = Math.max(0, bottomPos);
                    } else {
                        // 一般普通位置
                        top = calcuTop;
                    }

                    jSubitem.css({
                        top: top
                    });
                },
                /**
                * handlebars自定义函数
                */
                customHandlebars: function () {
                    /**
                    * isHighLight的后台数据为'Y','F'字符串，Handlebar无法自然解析
                    * 判断是否增加一个orange的class，来高亮显示
                    * 辅助函数，不影响功能
                    * @param  {string} IsHighLight 'T'/'F'
                    * @param  {obj} options     自身，让他过还是不过
                    */
                    Handlebars.registerHelper('isHighLight', function (IsHighLight, options) {
                        var bRtn = false;
                        if (IsHighLight == 'T') {
                            bRtn = true;
                        } else if (IsHighLight == 'F') {
                            bRtn = false;
                        }

                        if (bRtn) {
                            return options.fn(this);
                        } else {
                            return options.inverse(this);
                        }
                    });
                    /**
                    * 对给到的URL进行处理，去掉头尾空格
                    * 辅助函数
                    */
                    Handlebars.registerHelper('trimUrl', function (url, options) {
                        return $.trim(url);
                    });
                },
                /**
                * 左侧索引栏统计代码添加，为了查看点击数
                * 遍历整个索引栏，并增加ctm_ref属性，每个链接给予不同的值
                * 辅助函数，删除不会影响功能，
                * 这代码一坨屎，所以已单独分离，可以直接重构
                */
                anchorAttach: function () {
                    var settings = {
                        subChannel: 'hom',
                        area: 'idx', // area name
                        page: 'p0', // the default value of page number
                        listTag: 'li', // the tag name of the list items
                        anchorTag: 'a', // the tag name of the anchor
                        ignore: {
                            name: 'href',
                            value: '###'
                        } // check if the tag has the attribute, if not then ignore this tag.
                    };

                    var ctmStr, dtas, subChannel, anchorNum;
                    var isIgnore = false;
                    var _pathname = window.location.pathname;
                    // subChannel = _pathname.length > 3 ? _pathname.substr(1, 3) : settings.subChannel;
                    subChannel = settings.subChannel;

                    var _anchorTag = settings.anchorTag || "a";
                    var _listTag = settings.listTag || "li";

                    jPoints.each(function (i) {
                        anchorNum = 0;
                        dtas = $(this).find(_anchorTag);
                        dtas.each(function (j) {
                            isIgnore = settings.ignore.name ? (!this.getAttribute(settings.ignore.name) || this.getAttribute(settings.ignore.name) == settings.ignore.value) : false;
                            // if the anchor sould be igonred, then add the anchorNum value to mark this ignored the anchor. 
                            // The next anchor will minus the anchorNum to get the correct number.
                            if (isIgnore) {
                                anchorNum++;
                                return true;
                            }
                            if (!this.getAttribute("data-ctm")) {
                                ctmStr = ["#ctm_ref=va_" + subChannel + "_s", $$.StartCity, "_" + settings.area + "_" + settings.page + "_l", i + 1, "_" + (j + 1 - anchorNum) + "_txt"].join("");
                                this.setAttribute("data-ctm", ctmStr);
                            }
                        });
                    });


                    var subLists, subAnchor, subTitleAnchor, subImgAnchor;
                    var subArea = settings.area + 1, subAreaImg = settings.area + 2;
                    // 实际point的行数
                    var lineIndex, myDataKey;

                    jSubitems.each(function (i) {
                        myDataKey = $(this).data('data-key');
                        lineIndex = jPoints.index(oPoint[myDataKey]);

                        subLists = $(this).find(_listTag);
                        subLists.each(function (j) {
                            anchorNum = 0;
                            subTitleAnchor = $(this).find('>h4 a')[0];
                            if (subTitleAnchor && !subTitleAnchor.getAttribute("data-ctm")) {
                                ctmStr = ["#ctm_ref=va_" + subChannel + "_s", $$.StartCity, "_" + subArea + "_" + settings.page + "_l", lineIndex + 1, "_" + (j + 1) + "_txt"].join("");
                                subTitleAnchor.setAttribute("data-ctm", ctmStr);
                            }
                            subAnchor = $(this).find('>div a');

                            subAnchor.each(function (k) {
                                isIgnore = settings.ignore.name ? (!this.getAttribute(settings.ignore.name) || this.getAttribute(settings.ignore.name) == settings.ignore.value) : false;
                                // if the anchor sould be igonred, then add the anchorNum value to mark this ignored the anchor. 
                                // The next anchor will minus the anchorNum to get the correct number.
                                if (isIgnore) {
                                    anchorNum++;
                                    return true;
                                }
                                if (!this.getAttribute("data-ctm")) {
                                    ctmStr = ["#ctm_ref=va_" + subChannel + "_s", $$.StartCity, "_" + subArea + "_" + settings.page + "_l", lineIndex + 1, "_" + (j + 1) + "." + (k + 1 - anchorNum) + "_txt"].join("");
                                    this.setAttribute("data-ctm", ctmStr);
                                }
                            });
                        });

                        // 右下角图片添加跟踪代码
                        subImgAnchor = $(this).find('>div a')[0];
                        if (subImgAnchor && !subImgAnchor.getAttribute("data-ctm")) {
                            ctmStr = ["#ctm_ref=va_" + subChannel + "_s", $$.StartCity, "_" + subAreaImg + "_" + settings.page + "_l", lineIndex + 1, "_" + 1 + "_txt"].join("");
                            subImgAnchor.setAttribute("data-ctm", ctmStr);
                        }
                    });

                    // 热门旅游搜索
                    var jHotSearchLists = jHotSearch.find('li:not(.title)');
                    var jHotSearchAnchors;
                    jHotSearchLists.each(function (i) {
                        jHotSearchAnchors = $(this).find('>div a');
                        anchorNum = 0;
                        jHotSearchAnchors.each(function (j) {
                            isIgnore = settings.ignore.name ? (!this.getAttribute(settings.ignore.name) || this.getAttribute(settings.ignore.name) == settings.ignore.value) : false;
                            // if the anchor sould be igonred, then add the anchorNum value to mark this ignored the anchor. 
                            // The next anchor will minus the anchorNum to get the correct number.
                            if (isIgnore) {
                                anchorNum++;
                                return true;
                            }
                            if (!this.getAttribute("data-ctm")) {
                                ctmStr = ["#ctm_ref=va_" + subChannel + "_s", $$.StartCity, "_" + 'mth' + "_" + 'p', (i + 1), "_l0", "_" + (j + 1 - anchorNum) + "_txt"].join("");
                                this.setAttribute("data-ctm", ctmStr);
                            }
                        });
                    });


                }
            }
        },
        // 优惠促销
        salesPromotion: function () {
            var salesWrap = $('div.sales_promotion');
            var salesLinks = salesWrap.find('a');
            return {
                init: function () {
                    var me = this;
                    me.anchorAttach({ area: 'prm', page: '0' });
                },
                anchorAttach: function (options) {
                    var settings = {
                        subChannel: 'hom',
                        area: 'idx', // area name
                        page: 'p0', // the default value of page number
                        listTag: 'li', // the tag name of the list items
                        anchorTag: 'a', // the tag name of the anchor
                        ignore: {
                            name: 'href',
                            value: '###'
                        } // check if the tag has the attribute, if not then ignore this tag.
                    };
                    settings = $.extend({}, settings, options);

                    var ctmStr, dtas, subChannel, anchorNum;
                    var isIgnore = false;
                    var _pathname = window.location.pathname;
                    // subChannel = _pathname.length > 3 ? _pathname.substr(1, 3) : settings.subChannel;
                    subChannel = settings.subChannel;

                    var _anchorTag = settings.anchorTag || "a";

                    salesLinks.each(function (index, element) {
                        if (!element.getAttribute("data-ctm")) {
                            ctmStr = ["#ctm_ref=va_" + subChannel + "_s", $$.StartCity, "_" + settings.area + "_" + settings.page + "_", 0, "_" + (index + 1) + "_txt"].join("");
                            element.setAttribute("data-ctm", ctmStr);
                        }
                    });
                }
            }
        },
        // 回到顶端按钮判断显示
        goTop: function () {
            var showGoTop, _scrollTop;
            var $toTopDiv = $(".to_top");
            var firstRun = 0;
            // 判断是否应该显示回到顶端按钮
            function goTopShouldShow() {
                _scrollTop = document.documentElement.scrollTop + document.body.scrollTop;
                if (_scrollTop > document.documentElement.clientHeight && !$toTopDiv.is(":visible")) {
                    // 第一次显示的时候由于对象为a元素，不能用fadeIn()，强制显示为diplay block。之后可以使用fadeIn()
                    if (!firstRun) { $toTopDiv.css("display", "block"); firstRun++; }
                    else { $toTopDiv.fadeIn(); }
                }
                else if (_scrollTop <= document.documentElement.clientHeight && $toTopDiv.is(":visible")) {
                    $toTopDiv.fadeOut();
                }
            };
            // 页面载入时先运行一下，防止当页面打开时已经在第一屏以下时不显示按钮
            goTopShouldShow();
            // 绑定
            $(window).bind("resize scroll", function () {
                // 300毫秒延时，防止频繁运行
                clearTimeout(showGoTop);
                showGoTop = setTimeout(goTopShouldShow, 300);
            });
        },
        /*
        * 为目的地列表重设href，从data-url中取值
        */
        setHref: function () {
            var resetAnchors = $(".hot_destination").find("a[data-url]");
            resetAnchors.each(function (index, element) {
                element.attributes['href'].value = element.attributes['data-url'].value;
                element.target = "_blank";
            });
        },
        init: function () { //初始化
			//增加高级搜索价格框的正则判断
			var price_Test=$('.priceTest');
			$(price_Test).bind('keyup',function(){
				var test=/^\d+$/.test(this.value);
				if(!test){
					this.value='';
				}
			});
            var parent = v_index;
            parent.setHref();
            if (navigator.userAgent.indexOf("MSIE 6") > -1) {
                var top_wrap = $(".to_top_wrap");
                var correctPos;
                $(window).bind("scroll", function () {
                    clearTimeout(correctPos);
                    correctPos = setTimeout(function () {
                        top_wrap.css("top", document.documentElement.scrollTop + document.documentElement.clientHeight * 0.9 - 100 + "px");
                    }, 300);
                });
                /*
                top_wrap.css("position", "absolute");
                top_wrap.css("bottom", "auto");
                top_wrap.css("top", "expression(eval(document.documentElement.scrollTop+document.documentElement.clientHeight/2))");
                */
            };
            parent.goTop();
            new Search();
            new SearchHistory();
            new SearchPro();
            new parent.common.Notice($(".content_box"));
            new parent.common.YNotice($(".booking_now>div"));

            $(document.body).delegate("a", "click", function (event) {
                var $this = $(this);
                var datactm = $this.attr("data-ctm");
                if (!!datactm && datactm.length) {
                    if ($this.attr("target") === "_blank") {
                        window.open($this.attr("href") + datactm);
                    } else {
                        location.href = $this.attr("href") + datactm;
                    }
                    event.preventDefault();
                    event.stopPropagation();
                }
            });
            /*
            $(document.body).bind("click", function (event) {
            var _target = event.target;
            if (_target.tagName === "A") {
            var _attr = _target.getAttribute("data-ctm");
            if (_attr != null) {
            if (_target.getAttribute("target") === "_blank") {
            window.open(_target.href + _attr);
            } else {
            location.href = _target.href + _attr;
            }
            event.preventDefault();
            event.stopPropagation();
            }
            }
            });
            */
            $("#PanelAdBanner").delegate("li", "click", function (event) {
                var $this = $(this);
                $this.parent().attr("data-index", $this.attr("data-index"));
            });

            $("#PanelAdBanner").bind("click", function (event) {
                var _index, data_ctm, anchor;
                var _target = event.target || event.srcElement;
                if (_target.tagName === "IMG") {
                    anchor = $(_target).closest("a")[0];
                    _index = !!$(this).find(".j-num-current").length ? $(this).find(".j-num-current").attr("data-index") : $(this).find(".j-picsroller-num").attr("data-index");
                    data_ctm = '#ctm_ref=va_hom_s' + $$.StartCity + '_ban_p0_l0_' + (++_index) + '_img';
                    if (!!data_ctm) {
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

            // 周边游 
            $(".around_product").scrollfire(function () {
                var $this = $(".around_product");
                loadImgsInDom($this.find("[data-init=1]"));
                loadImgsInDom($this.find(".theme_box"));
                lazyBackGroundInDom($this.find("[data-bcground]"));
                newTab.call($this[0], $this);
                lazyCtm($this.find(".theme_box"), undefined, "prd", 0, 1, "img", true);
                $this.find("ul.product_list").each(function (index, element) { lazyCtm($(element), "li", "prd", index + 1, 1, "img", true) });
            }, 350, 1, 0);
            // 国内游
            $(".domestic_product").scrollfire(function (pCallBack) { $(".domestic_product").showWaterFlow({ type: 'Domestic', callback: pCallBack }) }, 500);
            // 出境游
            $(".international_product").scrollfire(function (pCallBack) { $(".international_product").showWaterFlow({ type: 'Abroad', callback: pCallBack }) }, 500);
            // 邮轮
            $(".cruise_product").scrollfire(function (pCallBack) { $(".cruise_product").showWaterFlow({ type: 'Cruise', callback: pCallBack }) }, 500);
            // 门票
            $(".ticket_product").scrollfire(function (pCallBack) { $(".ticket_product").showWaterFlow({ type: 'Ticket', callback: pCallBack }) }, 500);
            // 租车
            $(".car_product").scrollfire(function (pCallBack) { $(".car_product").showWaterFlow({ type: 'Car', callback: pCallBack }) }, 500);
            // 欧铁
            $(".eurail_product").scrollfire(function (pCallBack) { $(".eurail_product").showWaterFlow({ type: 'EuRail', callback: pCallBack }) }, 500);

            // 出发地
            parent.startStation().init();
            // 机+酒
            parent.flightHotel().init();
            // 热门目的地
            parent.hotDest().init();
            // 优惠促销
            parent.salesPromotion().init();

            //google广告
            var $googlead = $("#googlead");
            $googlead.scrollfire(function () {
                try {
                    new GoogleAd($googlead[0]);
                } catch (e) { }
            }, 200, 1, 0);
        }
    };

    (function ($) {
        var defaults = {
            startCity: 2,
            type: 'Around'
        };
        // 周边游直接后端输出，异步加载的其他几项从第2行算起
        var _ctmLine = 2;

        $.fn.showWaterFlow = function (options) {
            var settings = $.extend({}, defaults, options);
            var _global_num = 0, _global_tab_num = 0, _global_right_num = 0, _global_right_detail_num = 0, _conditional, _arr = [];
            var Type = {
                Around: {
                    Title: "周边当地游",
                    CssName: "around",
                    THeight: 200,
                    Mode: [1, 2, 2, 2, 2],
                    Arg: "Type=0"
                },
                Domestic: {
                    Title: "国内旅游",
                    CssName: "domestic",
                    THeight: 200,
                    InitBig: true,
                    Mode: [1, 1, 2, 2, 2, 2],
                    Arg: "Type=1"
                },
                Abroad: {
                    Title: "出境旅游",
                    CssName: "abroad",
                    THeight: 200,
                    InitBig: true,
                    Mode: [1, 1, 2, 2, 2, 2],
                    Arg: "Type=2"
                },
                Cruise: {
                    Title: "邮轮",
                    CssName: "cruise",
                    InitBig: true,
                    Mode: [4, 4, 4, 4, 4, 4, 2, 2],
                    Arg: "Type=3"
                },
                Ticket: {
                    Title: "门票",
                    CssName: "ticket",
                    THeight: 200,
                    SHeight: 50,
                    Mode: [1, 2, 2, 2, 2],
                    Arg: "Type=4"
                },
                Car: {
                    Title: "租车",
                    CssName: "car",
                    THeight: 104,
                    SHeight: 46,
                    Mode: [1],
                    Arg: "Type=5"
                },
                EuRail: {
                    Title: "欧铁",
                    CssName: "eurail",
                    THeight: 136,
                    Root: " eurail_fix",
                    Mode: [1],
                    Arg: "Type=6"
                }
            };
            return this.each(function () {
                var $this = $(this);
                var _this = $this[0], curType, context, curl,
                _div = _this;
                //_div.className = 'product_box';
                curType = Type[settings.type || 'Around'],
                curl = $this.attr("data-url") || "/Package-Booking-VacationsOnlineSiteUI/Handler/IndexTab.ashx";
                //$this.append(_div);

                var showDocument = function (items, options, $$this, global_count) {
                    var ret = "";
                    for (var i = 0, j = items.length; i < j; i++) {
                        global_count = i;
                        ret = ret + options.fn($$this);
                    }

                    return ret;
                }

                Handlebars.registerHelper('listTab', function (items, options) {
                    _global_tab_num = 0;
                    var out = options.fn(items[0]);
                    for (var i = 1, l = items.length; i < l; i++) {
                        _global_tab_num = i;
                        out = out + options.fn(items[i]);
                    }

                    return out;
                });

                Handlebars.registerHelper('current', function (options) {
                    if (!_global_tab_num) { return options.fn(this); }
                    else { return ''; }
                });

                Handlebars.registerHelper('LeftCss', function (conditional, options) {
                    _conditional = conditional[_global_num];
                    if (_conditional == 1 || _conditional == 3) { return "project_pic"; }
                    else if (_conditional == 4) { return "cruise_pic"; }
                    else { return ''; }

                });

                Handlebars.registerHelper('ifMode', function (conditional, options) {
                    _conditional = conditional[_global_num];
                    if (_conditional == 1 || _conditional == 3) { return "project_pic"; }
                    else if (_conditional == 4) { return "cruise_pic"; }
                    else { return ''; }

                    if (_conditional == 1 || _conditional == 3) { return options.fn(this); }
                    else { return options.inverse(this); }

                });

                Handlebars.registerHelper('showRight', function (items, options) {
                    //return showDocument(items, options, this, _global_right_num);
                    var ret = "";
                    for (var i = 0, j = items.length; i < j; i++) {
                        _global_right_num = i;
                        ret = ret + options.fn(this);
                    }

                    return ret;

                });

                Handlebars.registerHelper('showRightDetail_backup', function (items, options) {
                    //return showDocument(items, options, this, _global_right_detail_num);
                    var ret = "";
                    for (var i = 0, j = items.length; i < j; i++) {
                        _global_right_detail_num = i;
                        ret = ret + options.fn(items[_global_right_detail_num]);
                    }

                    return ret;
                });

                Handlebars.registerHelper('showRightDetail', function (items, options) {
                    //items.each(function (data) { alert(data) })
                    var ret = "";
                    var _this = this;
                    items[_global_right_num].each(function (data, index) {
                        _global_right_detail_num = index;
                        //ret += options.fn(data);
                        ret += options.fn(_this);
                    });

                    return ret;
                });

                Handlebars.registerHelper('showRightDetails', function (items, name, options) {
                    //items.each(function (data) { alert(data) })
                    return $.trim(items[_global_right_num][_global_right_detail_num][name]);
                });

                Handlebars.registerHelper('getPrice', function (items, price, options) {
                    if (items[_global_right_num][_global_right_detail_num]['price'] > price) {
                        return options.fn(this);
                    }
                    else {
                        return "实时计价";
                    }
                });

                Handlebars.registerHelper('showTypeDetail', function (name, value, options) {
                    var _shouldshow = false;
                    var _value = value.split(",");
                    for (var i = 0, l = _value.length; i < l; i++) {
                        if (this.Type[name] == _value[i]) { _shouldshow = true; }
                    }
                    if (_shouldshow) { return options.fn(this); }
                    else { return options.inverse(this); }
                });

                Handlebars.registerHelper('ifDetails', function (items, name, options) {
                    //items.each(function (data) { alert(data) })
                    if (!!items[_global_right_num][_global_right_detail_num][name] && items[_global_right_num][_global_right_detail_num][name] != 1) {
                        return options.fn(this);
                    }
                    else {
                        return options.inverse(this);
                    }
                });

                Handlebars.registerHelper('showLeft', function (items, conditional, options) {
                    //return showDocument(items, options, this, _global_num);
                    if (options == null) { options = conditional; }
                    var ret = "";
                    for (var i = 0, j = items.length; i < j; i++) {
                        _global_num = i;
                        _conditional = conditional[_global_num];
                        ret = ret + options.fn(this);
                    }

                    return ret;
                });

                Handlebars.registerHelper('showHref', function (items, options) {
                    return $.trim(items[_global_num][0].href);
                });

                Handlebars.registerHelper('ifHref', function (items, options) {
                    if (items[_global_num][0].href)
                        return options.fn(this);
                    else {
                        return options.inverse(this);
                    }
                });

                Handlebars.registerHelper('showClassTitle', function (items, options) {
                    if (_conditional == 3)
                        return "class=bottom_pic";
                    else if (_conditional == 4) {
                        return 'class=' + items[_global_num][0].cssClass + ' title=' + items[_global_num][0].title;
                    }
                });

                Handlebars.registerHelper('showCtm', function (items, pageNum, options) {
                    return items.replace('$PAGE$', pageNum).replace('$INDEX$', _global_num + 1);
                });

                Handlebars.registerHelper('showCtmRight', function (items, options) {
                    return items.replace('$PAGE$', _global_right_num + 1).replace('$INDEX$', _global_right_detail_num + 1);
                });

                Handlebars.registerHelper('displayTitle', function (items, options) {
                    return items[_global_num][0].title;
                });

                Handlebars.registerHelper('displayClass', function (items, options) {
                    return items[_global_num][0].cssClass;
                });

                Handlebars.registerHelper('shouldShow', function (conditional, options) {
                    var _shouldshow = false;
                    if (isNaN(conditional)) {
                        var _arr = conditional.split(',');
                        var _len = _arr.length;
                        for (var i = 0; i < _len; i++) {
                            if (_conditional == _arr[i]) { _shouldshow = true; break; }
                        }
                    }
                    else {
                        _shouldshow = _conditional == conditional;
                    }

                    if (_shouldshow) { return options.fn(this); }
                    else { return options.inverse(this); }
                });

                Handlebars.registerHelper('showThemeLinkStart', function (TypeMode, options) {
                    var _shouldshow = false;
                    if (_global_num && TypeMode[_global_num] == 2 && TypeMode[_global_num - 1] != 2) { _shouldshow = true; }
                    if (_shouldshow) { return options.fn(this); }
                    else { return options.inverse(this); }
                });

                Handlebars.registerHelper('showThemeLinkEnd', function (TypeMode, options) {
                    var _shouldshow = false;
                    if (_global_num == TypeMode.length - 1 && TypeMode[_global_num] == 2) { _shouldshow = true; }
                    if (_shouldshow) { return options.fn(this); }
                    else { return options.inverse(this); }
                });

                Handlebars.registerHelper('RightshouldShow', function (conditional, options) {
                    var _shouldshow = false;
                    if (isNaN(conditional)) {
                        var _arr = conditional.split(',');
                        var _len = _arr.length;
                        for (var i = 0; i < _len; i++) {
                            if (_global_right_num == _arr[i]) { _shouldshow = true; break; }
                        }
                    }
                    else {
                        _shouldshow = _global_right_num == conditional;
                    }

                    if (_shouldshow) { return options.fn(this); }
                    else { return options.inverse(this); }
                });

                Handlebars.registerHelper('MoreShouldShow', function (conditional, value, options) {
                    if (conditional[_global_right_num].name == value) { return options.fn(this); }
                    else { return options.inverse(this); }
                });

                Handlebars.registerHelper('RightDetailshouldShow', function (conditional, options) {
                    var _shouldshow = false;
                    if (isNaN(conditional)) {
                        var _arr = conditional.split(',');
                        var _len = _arr.length;
                        for (var i = 0; i < _len; i++) {
                            if (_global_right_detail_num == _arr[i]) { _shouldshow = true; break; }
                        }
                    }
                    else {
                        _shouldshow = _global_right_detail_num == conditional;
                    }

                    if (_shouldshow) { return options.fn(this); }
                    else { return options.inverse(this); }
                });

                Handlebars.registerHelper('displayValue', function (items, value, isDeep, options) {
                    // if options and isDeep are undefined, it means that the second param and the third param are not existing.
                    if (!options && !isDeep) { /*options = value;*/return items; }
                        //if only options and is undefined, it means that the third param is not existing.
                    else if (!options) { return items[_global_num][0][value]; }
                    else { return items[_global_right_num][value]; }
                });

                Handlebars.registerHelper('ifBig5', function (options) {
                    var _charSet = document.charset || document.characterSet;
                    if (_charSet.toLowerCase() == "big5") { return options.fn(this); }
                    else { return options.inverse(this); }
                });

                // compile our template
                var tpl = v_index.tpl;
                //var template = Handlebars.compile($("#waterflow-template").html());
                var template = Handlebars.compile(tpl.waterflowTemplate);

                $.ajax({
                    url: curl, type: 'POST', data: curType.Arg + "&StartCity=" + ($$.StartCity || settings.startCity), timeout: 7000, success: function (responseData) {
                        //context = eval("(" + responseData.responseText + ")");
                        context = eval("(" + responseData + ")");
                        //context = _global_data;
                        context.Type = curType;
                        context.CTM = ["#ctm_ref=va_hom_s", $$.StartCity, "_prd_p$PAGE$_l", _ctmLine++, "_$INDEX$_img"].join("");
                        var tempHTML;

                        var dtd = $.Deferred(); // 新建一个deferred对象
                        var wait = function (dtd) {
                            var tasks = function () {
                                tempHTML = template(context);
                                dtd.resolve(); // 改变deferred对象的执行状态
                            };
                            setTimeout(tasks, 0);
                            return dtd;
                        };

                        $.when(wait(dtd)).done(function () {
                            _div.innerHTML = tempHTML;
                            loadImgsInDom($(_div).find("[data-init=1]"));
                            lazyBackGroundInDom($(_div).find("[data-bcground]"));
                            newTab.call(this, _div);
                            if (!!settings.callback) { settings.callback() }
                        })
                    },
                    error: function (errorResponse, errorText) {
                        _div.innerHTML = '';
                        //console.log(errorText);
                        //if (!!settings.callback) { settings.callback() }
                    }
                });
            })
        }
    })($);

    (function ($) {
        // wrapped window object
        var $window = $(window);
        // sum of baselineHeight and baselineScroll
        var baseline;
        // current height of the window
        var baselineHeight;
        // current scrollTop value of the window
        var baselineScroll;
        // reverse sorted list of scroll items
        var scrollQueue = [];
        // events strings
        var eventScroll = "scroll";
        var eventResize = "resize";
        var bothEvents = eventScroll + " " + eventResize;
        // wrapped document object
        var $document = $(document);
        // height check interval
        var heightInterval;
        // document height, to detect redraw issues
        var documentHeight;

        var isReCheck = true;

        $.fn.scrollfire = function (func, aheadfire, timeout, showloading) {
            if (!func || $.type(func) != 'function') {
                return;
            }

            aheadfire = aheadfire || 0;
            timeout = timeout || 1000;
            showloading = (showloading != undefined) ? showloading : true;
            if (!baseline) {
                syncBaseline();
            }
            if (!documentHeight) {
                documentHeight = $document.height();
            }

            return this.each(applyBehavior);

            // find where the top of the DOM element to bind to is
            // if it's visible bind now, otherwise add it to the queue
            function applyBehavior() {
                var $this = $(this);
                // use offset rather than position. It is relative to the window
                // (not a parent dependent on how the css is defined)
                // and performs slightly faster.
                var top = $this.offset().top - aheadfire;
                // hidden element offset is not defined
                if (!top) {
                    // get the top of first visible parent
                    top = $this.closest(":visible").offset().top - aheadfire;
                }
                // load or enqueue
                (top <= baseline && isReCheck) ? loadNow($this, func, showloading, timeout) : addToQueue({ top: top, item: $this, func: func, aheadfire: aheadfire, showloading: showloading, timeout: timeout });
            }
        }

        // add a binding to the queue
        function addToQueue(obj) {
            // if queue was empty, attach event handler
            if (!scrollQueue.length) {
                attachEvents();
            }
            scrollQueue.push(obj);
            // sort the queue.
            scrollQueue.sort(function (a, b) {
                return a.top - b.top;
                //return b.top - a.top;
            });
        }

        // execute the binding
        function loadNow($item, func, showloading, timeout) {
            isReCheck = false;
            !!showloading && $item.html('<div class="base_loading"><img alt="" src="http://pic.c-ctrip.com/vacation_v1/loading_50-0816.gif"><strong>查询中，请稍候...</strong></div>');
            // func();
            func(checkDocumentHeight);
            // if the previous water flow ajax call is failed by timeout, then the next one will continue after 1 second(the default timeout value).
            setTimeout(checkDocumentHeight, timeout);
        }

        // calculate the bottom line of the window
        function syncBaseline(event) {
            // during an event only find what has changed
            if (event) {
                // on resize find the window height
                if (event.type == eventResize) {
                    baselineHeight = $window.height();
                }
                    // on scroll find where the window is scrolled to
                else if (event.type == eventScroll) {
                    baselineScroll = $window.scrollTop();
                }
                // no else, save some bytes by not returning
                // doing a simple addition should not affect the performance
            }
                // find everything
            else {
                baselineHeight = $window.height();
                baselineScroll = $window.scrollTop();
            }
            baseline = baselineHeight + baselineScroll;
        }

        // attach the event handler
        function attachEvents() {
            $window.bind(bothEvents, scrollHandler);
            //heightInterval = setInterval(checkDocumentHeight, 1000);
        }

        // the event handler
        function scrollHandler(e) {
            // sync the baseline
            syncBaseline(e);
            var item = scrollQueue[0];
            if (scrollQueue.length && item.top <= baseline && isReCheck) {
                //isReCheck = false;
                loadNow(item.item, item.func, item.showloading, item.timeout);
                //scrollQueue.splice(i, 1);
                scrollQueue.splice(0, 1);
            }
            // be nice to the users and give them a more responsive browser
            // if the queue is now empty unbind the handler
            if (!scrollQueue.length) {
                $window.unbind(bothEvents, scrollHandler);
                //clearInterval(heightInterval);
            }
        }

        // detect document redraws
        // introduced because of temporary wrapping issues in IE 6
        function checkDocumentHeight() {
            isReCheck = true;
            var curDocumentHeight = $document.height();
            // document height has changed
            if (curDocumentHeight != documentHeight) {
                // remember current document height
                documentHeight = curDocumentHeight;
                // refresh top values
                var currentQueue = scrollQueue;
                var queueLength = currentQueue.length;
                var bindObject;
                scrollQueue = [];

                for (var ndx = 0; ndx < queueLength; ndx++) {
                    bindObject = currentQueue[ndx];
                    bindObject.top = bindObject.item.offset().top - bindObject.aheadfire;
                    // hidden element offset is not defined
                    if (!bindObject.top) {
                        // get the top of first visible parent
                        bindObject.top = bindObject.item.closest(":visible").offset().top - bindObject.aheadfire;
                    }
                    // load or enqueue
                    (bindObject.top <= baseline && isReCheck) ? loadNow(bindObject.item, bindObject.func, bindObject.showloading, bindObject.timeout) : addToQueue(bindObject);
                }
            }
        }



    })($);

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
    _core.Timer = function (pMoveSpeed, pMoveInterval) {
        this._speed = pMoveSpeed || 50;
        this._interval = pMoveInterval || 0;
        this._clock = null;
        this._waitClock = null;
        this.Event = {
            play: function () { },
            pause: function () { },
            stop: function () { },
            ifPause: function () { return false },
            ifStop: function () { return false }
        };
    };
    _core.Timer.prototype = {
        play: function () {
            var me = this;
            me.Event.play();
            me._clock = setInterval(function () {
                if (me.Event.ifStop()) {
                    me.stop();
                } else if (me.Event.ifPause()) {
                    me.pause();
                } else {
                    me.Event.play();
                }
            }, me._speed);
        },
        pause: function () {
            var me = this;
            if (me._clock != null) {
                clearInterval(me._clock);
            }
            me.Event.pause();
            me._waitClock = setTimeout(function () {
                me.play();
            }, me._interval);
        },
        stop: function () {
            var me = this;
            me._clock != null && clearInterval(me._clock);
            me._waitClock != null && clearInterval(me._waitClock);
            me.Event.stop();
        }
    };

    _core.Storage = new function () {
        var _canuse = !!window.sessionStorage,
            hasData = function (pData) {
                return pData && pData !== "" && pData !== "null" && pData !== "undefined";
            },
        /*
        * get data from ajax
        */
            ajaxData = function (pKey, pUrl, pArg, pCallBack, pIsLoacl, pCharset) {
                var me = this;
                $.ajax({
                    url: pUrl, data: pArg, success: function (data) {
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
            jsonPData = function (pKey, pUrl, pArg, pCallBack, pIsLoacl, pCharset) {
                var me = this,
                    _url = (pArg != null && pArg != "") ? pUrl + "?" + pArg : pUrl;
                Cmd.Load.addJs(_url, function () {
                    var data = Cmd.JsonPData;
                    dealData.call(me, data, pKey, pCallBack, pIsLoacl);
                }, true, pCharset);
            },
            sessionData = function (pKey, pUrl, pArg, pCallBack, pFunc, pCharset) {
                var data = sessionStorage.getItem(pKey);
                if (hasData(data)) {
                    dealData(data, pKey, pCallBack, false);
                } else {
                    pFunc(pKey, pUrl, pArg, pCallBack, false, pCharset);
                }
            },
            localData = function (pKey, pUrl, pArg, pCallBack, pFunc, pCharset) {
                var data = localStorage.getItem(pKey);
                if (hasData(data)) {
                    dealData(data, pKey, pCallBack, true);
                } else {
                    pFunc(pKey, pUrl, pArg, pCallBack, true, pCharset);
                }
            },
            dealData = function (data, pKey, pCallBack, pIsLoacl) {
                _canuse && pIsLoacl && localStorage.setItem(pKey, data);
                try { _canuse && !pIsLoacl && detectSessionStorage(pKey, data) && sessionStorage.setItem(pKey, data); } catch (e) { };
                pCallBack(data);
            },
            detectSessionStorage = function (key, data) {
                var key, remSpace, usedSpace = 0, keyData = sessionStorage.getItem(key);
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
                if (!!keyData) { remSpace -= keyData.length; }

                if (data.length > remSpace) {
                    if (!!sessionStorage.length) {
                        // 移出第一个item，释放容量
                        sessionStorage.removeItem(sessionStorage.key(0));
                        //console.log(sessionStorage.length);
                        return arguments.callee(key, data);
                    }
                    else {
                        return false;
                    }
                }
                else {
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
        this.getSession = function (pKey, pUrl, pArg, pCallBack, pIsJsonP, pCharset) {
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
        this.getLocal = function (pKey, pUrl, pArg, pCallBack, pIsJsonP, pCharset) {
            var _funcPoint = pIsJsonP ? jsonPData : ajaxData;
            if (_canuse) {
                localData(pKey, pUrl, pArg, pCallBack, _funcPoint, pCharset);
            } else {
                _funcPoint(pKey, pUrl, pArg, pCallBack, true, pCharset);
            }
        };
    };


    Animation.Scroll = function (pContain, pItem, pIsY, pMoveStep, pMoveSpeed, pMoveInterval, pArrow, pAppendLength) {
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
        fillContainer: function () {
            //var _scrollHeight = this.Container
            var _minLength = Math.min(this.MoveStep * 2, this._itemLength),
                _i = 0,
                _tempNode;
            for (; _i < _minLength; _i++) {
                _tempNode = this.Items[_i].cloneNode(true);
                this.Container.appendChild(_tempNode);
            }
        },
        setStopPos: function (pAppendLength) {
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
        move: function () {
            var me = this;
            me.Container[me.ScrollProperty] += me.Arrow;
        },
        beforeMove: function (pDirect) {
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
        getNodeOffset: function (pos, pAppendLength) {
            return pos < this._itemLength ? this.Items[pos][this.MoveProperty] + pAppendLength : 0;
            //return this.Items[pos%this._itemLength][this.MoveProperty];
        },
        init: function () {
            if ((/ipad/i).test(navigator.userAgent.toLowerCase())) {
                $('#SearchText')[0].readOnly = true;
                $('#SearchText').unbind('touchstart');
            }
            var me = this;
            me._timer.Event.play = function () {
                me.move.call(me);
            };
            me._timer.Event.ifPause = function () {
                return (me.Container[me.ScrollProperty] === me._pausePos[me._index]);
            };
            me._timer.Event.pause = function () {
                me.beforeMove.call(me, me.Arrow > 0);
            };
        },
        wait: function () {
            this._timer.pause();
        },
        stop: function () {
            this._timer.stop();
        },
        play: function () {
            this._timer.play();
        },
        //in ie, "display:none: "will cause some bug,you need the two method followed
        save: function () {
            var me = this;
            me.memory.push({
                index: me._index,
                scroll: me.Container[me.ScrollProperty]
            });
        },
        reset: function () {
            var me = this,
                _memery = me.memory.pop();
            me._index = _memery.index || 0;
            me.Container[me.ScrollProperty] = _memery.scroll || 0;
        }
    };

    exports.init = v_index.init;
});
