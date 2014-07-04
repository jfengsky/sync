define(function () {
    /*
    * @Author xhjin
    * @CreateDate  2013/10/14
    * @Desc  增加页面分类情况
    */
    (function () {
        var pageconfig = $$.PageConfig = $$.PageConfig || {
            "enum": { SEO: 1, DEFAULT: 0 }, enumType: 0,
            getPageType: function () {
                if (this.pagetype) return this.enumType;
                this.pagetype = $$.DestPageType;
                if (this.pagetype == "seachResult_seo") return this.enumType = this['enum'].SEO;
                return this.enumType = this['enum'].DEFAULT;
            }
        };
    })();
    /*
    * @Author:     yulianghuang
    * @CreateDate  2012/4/9
    */
    (function () {
        /*
        * 填充基本参数信息
        */
        var _brower = Core.Browser.getDetail(),
            _isIE6 = (_brower.Browser === "msie" && _brower.Version === "6.0"),
            _body = document.getElementsByTagName("BODY")[0],
            getParams = function (pObj) {
                for (var name in $$.SearchForm) {
                    pObj[name] = $$.SearchForm[name];
                }
            },
        /*
        * 筛选项
        */
            SearchFilter = function (pContainer) {
                var _container = pContainer,
                    Unit = function (pOdd, pEven) {
                        var _container1 = $(pEven),
                            _container2 = $(pOdd),
                            _0bj = this;
                        this.SingleLi = _container1.find("> LI")[0];
                        this.SingleContainer = _container1;
                        this.ComplexContainer = _container2;
                        this.CheckBoxList = _container2.find("input[type='checkbox']");
                        this.inputs1 = _container1.find("input[type='button']");
                        this.inputs2 = _container2.find("input[type='button']");
                        var init = function () {
                            if (_0bj.inputs1.length > 1) {
                                //更多
                                Core.bind(_0bj.inputs1[0], "click", function () {
                                    if (_0bj.inputs1[0].value != "确定" && _0bj.inputs1[0].className != "btn_range") _0bj.MoreView();
                                });
                                //多选
                                Core.bind(_0bj.inputs1[1], "click", function () {
                                    _0bj.ComplexView(true);
                                });
                            } else {
                                //多选
                                Core.bind(_0bj.inputs1[0], "click", function () {
                                    _0bj.ComplexView(true);
                                });
                            }
                            //确定
                            Core.bind(_0bj.inputs2[0], "click", function () {
                                _0bj.ComplexView(false);
                                _0bj.Submit();
                            });
                            //取消
                            Core.bind(_0bj.inputs2[1], "click", function () {
                                _0bj.ComplexView(false);
                            });
                            _0bj.ComplexSearchInit();
                        }
                        init();
                    };
                Unit.prototype = {
                    MoreView: function () {
                        if (/search_height/.test(this.SingleLi.className)) {
                            UI.Dom.removeClass(this.SingleLi, "search_height");
                            this.inputs1[0].value = "收起";
                            this.inputs1[0].className = "show_fold";
                        } else {
                            //收起
                            UI.Dom.addClass(this.SingleLi, "search_height");
                            this.inputs1[0].value = "更多";
                            this.inputs1[0].className = "show_unfold";
                        }
                    },
                    ComplexView: function (pIsShowCase) {
                        if (pIsShowCase) {
                            UI.Dom.removeClass(this.ComplexContainer[0], "hidden");
                            UI.Dom.addClass(this.SingleContainer[0], "hidden");
                        } else {
                            UI.Dom.removeClass(this.SingleContainer[0], "hidden");
                            UI.Dom.addClass(this.ComplexContainer[0], "hidden");
                        }
                    },
                    ComplexSearchInit: function () {
                        var _checkBoxs = this.CheckBoxList,
                            _unLimit = _checkBoxs[0],
                            _length = _checkBoxs.length;
                        Core.bind(_unLimit, "click", function () {
                            if (_unLimit.checked) {
                                for (var i = 1; i < _length; i++) {
                                    _checkBoxs[i].checked = false;
                                }
                            }
                        });
                        for (var j = 1; j < _length; j++) {
                            (function (j) {
                                Core.bind(_checkBoxs[j], "click", function (event) {
                                    if (_checkBoxs[j].checked) {
                                        _checkBoxs[0].checked = false;
                                    } else {
                                        var _hasChecked = false;
                                        for (var k = 1; k < _length; k++) {
                                            if (_checkBoxs[k].checked) {
                                                _hasChecked = true;
                                                break;
                                            }
                                        }
                                        if (!_hasChecked) {
                                            _checkBoxs[0].checked = true;
                                        }
                                    }
                                });
                            })(j);
                        }
                    },
                    /*
                    * 提交搜索
                    */
                    Submit: function () {
                        var _checkBoxs = this.CheckBoxList,
                            _length = _checkBoxs.length,
                            _filterArr = $$.FilterParam.match(/([A-Za-z]+[\d]+)/g) || [],
                            _filterParam = [];
                        for (var i = 1; i < _length; i++) {
                            if (_checkBoxs[i].checked) {
                                _filterArr = _filterArr.concat(_checkBoxs[i].value.match(/([A-Za-z]+[\d]+)/g));
                            }
                        }
                        _filterArr.sort(function (t1, t2) {
                            var _it1 = t1.match(/([A-Za-z]+)([\d]+)/),
                                _it2 = t2.match(/([A-Za-z]+)([\d]+)/);
                            if (_it1[1] != _it2[1]) return _it1[1] > _it2[1];
                            else return _it1[2] < _it2[2];
                        });
                        var _l = _filterArr.length;
                        if (_l > 0) {
                            _filterParam.push(_filterArr[0])
                            for (var j = 1; j < _l; j++) {
                                if (_filterArr[j - 1] !== _filterArr[j]) {
                                    _filterParam.push(_filterArr[j]);
                                }
                            }
                        }
                        var _param = {
                            filterPara: _filterParam.join(""),
                            StartCity: $$.StartCity,
                            Flag:1
                        };
                        getParams(_param);
                        UI.Dom.sumbitForm(_param, $$.Handler.GetSearchUrl, "post");
                    }
                };
                var init = function () {
                    var _ulOdd = _container.find("UL:odd"),
                        _ulEven = _container.find("UL:even"),
                        _length = Math.min(_ulOdd.length, _ulEven.length);
                    for (var i = 0; i < _length; i++) {
                        new Unit(_ulOdd[i], _ulEven[i]);
                    }
                };
                init();
            },
        /*
        * 搜索表单提交  搜索框的位置分开了
        */
            SearchForm = function (pContainer) {
                var _container = pContainer,
                    _inputs = _container.getElementsByTagName("INPUT"),
                    _iptPriceMin = _inputs[0],
                    _iptPriceMax = _inputs[1],
                    _iptPriceBtn = _inputs[2],
                    _iptDatePromotion = _inputs[3],
                    _iptDateType = _inputs[4],
                    _filterStr = $$.FilterParam,
                    _handleUrl = $$.Handler.GetSearchUrl,
                /*
                * 某个输入框只允许输入数字
                */
                    onlyNum = function (pDom) {
                        Core.bind(pDom, "keyup", function (event) {
                            pDom.value = pDom.value.replace(/\D/g, "");
                        });
                    },
                /*
                * 价格框提交处理
                */
                    priceBox = function () {
                        var me = this,
                            _p1 = _iptPriceMin,
                            _p2 = _iptPriceMax,
                            _btn = _iptPriceBtn,
                            submitThis = function () {
                                var _arr = [];
                                if (/^\d+$/.test(_p1.value) || _p1.value == _p1.getAttribute("data-default")) {
                                    _arr.push(_p1);
                                }
                                if (/^\d+$/.test(_p2.value) || _p2.value == _p2.getAttribute("data-default")) {
                                    _arr.push(_p2);
                                }
                                if (_arr.length > 0) {
                                    submitText(_arr);
                                }
                            };
                        Core.bind(_btn, "click", function () {
                            submitThis.call(me);
                        });
                        Core.bind(_p1, "keyup", function (event) {
                            if (event.keyCode == 13) {
                                _btn.click();
                            }
                        });
                        Core.bind(_p2, "keyup", function (event) {
                            if (event.keyCode == 13) {
                                _btn.click();
                            }
                        });
                        onlyNum(_p1);
                        onlyNum(_p2);
                        defaultTip(_p1);
                        defaultTip(_p2);
                    },
                /*
                * 日期框提交处理
                */
                    dateBox = function () {
                        if (!document.getElementById("JS_Out_Time")) return;
                        var _outTimeInputs = document.getElementById("JS_Out_Time").getElementsByTagName("INPUT"),
                            _iptDateMin = _outTimeInputs[0],
                            _iptDateMax = _outTimeInputs[1],
                            _iptDateBtn = _outTimeInputs[2],
                            me = this,
                            _d1 = _iptDateMin,
                            _d2 = _iptDateMax,
                            _btn = _iptDateBtn,
                            submitThis = function () {
                                submitText([_d1, _d2]);
                            };
                            $.mod.load('calendar', '6.0', function () {
                                $(_d1).regMod('calendar', '6.0', {
                                    options: { autoShow: false, showWeek: true },
                                    listeners: { onChange: function (input, value) { } }
                                });
                                $(_d2).regMod('calendar', '6.0', {
                                    options: { autoShow: false, showWeek: true },
                                    listeners: { onChange: function (input, value) { } }
                                });
                            });
                        Core.bind(_btn, "click", function () {
                            submitThis.call(me);
                        });
                        Core.bind(_d1, "keyup", function (event) {
                            if (event.keyCode == 13) {
                                _btn.click();
                            }
                        });
                        Core.bind(_d2, "keyup", function (event) {
                            if (event.keyCode == 13) {
                                _btn.click();
                            }
                        });
                        defaultTip(_d1);
                        defaultTip(_d2);
                    },
                /*
                * 勾选框处理
                */
                    checkBox = function (pDom) {
                        Core.bind(pDom, "click", function () {
                            var href = pDom.getAttribute("data-href"); /*update xhjin 2013-10-14*/
                            setTimeout(function () {
                                if (href == "javascript:reload();") window.location.href = window.location.href;
                                else if (href) location.href = pDom.getAttribute("data-href");
                            }, 1);

                        });
                    },
                /*
                * 翻页控件处理
                */
                    pageNum = function () {
                        var me = this,
                            _txt = document.getElementById("iptPageTxt"),
                            _btn = document.getElementById("iptPageBtn"),
                            _pageSize = $$.TotalPage,
                            _canShake = true,
                            submitThis = function () {
                                if (/^\d+$/.test(_txt.value) && +_txt.value <= _pageSize && +_txt.value > 0) {
                                    submitText([_txt]);
                                } else if (_canShake) {
                                    _canShake = false;
                                    shake(_txt, function () {
                                        _canShake = true;
                                    }, 25, 14);
                                }
                            };
                        Core.bind(_btn, "click", function () {
                            $$.SearchForm.clickbtn = "iptPageBtn";
                            submitThis.call(me);
                        });
                        //回车搜索
                        Core.bind(_txt, "keyup", function (event) {
                            if (event.keyCode == 13) {
                                $$.SearchForm.clickbtn = "iptPageBtn";//虽然感觉不应该加，但是传输post时少这一行底部页码显示不正确
                                submitThis.call(me);
                            }
                        });
                        onlyNum(_txt);
                    },
                /*
                * 呵呵
                */
                    shake = function (pDom, pCallBack, pWidth, pHeigth) {
                        var _pos = UI.Dom.position(pDom),
                            _cloneDom = pDom.cloneNode(true),
                            i = 0;
                        pDom.style.visibility = "hidden";
                        _cloneDom.style.position = "absolute";
                        _cloneDom.style.top = _pos.y + "px";
                        _cloneDom.style.left = _pos.x + "px";
                        pWidth && (_cloneDom.style.width = pWidth + "px");
                        pHeigth && (_cloneDom.style.height = pHeigth + "px");
                        _body.appendChild(_cloneDom);
                        var _clock = setInterval(function () {
                            i++;
                            _cloneDom.style.top = _pos.y + 2 * Math.sin(i) + "px";
                            _cloneDom.style.left = _pos.x + 1 * Math.cos(i) + "px";
                            //_cloneDom.style.top=_pos.y+ Math.floor((Math.random()*10-5)*0.5)+"px";
                            //_cloneDom.style.left=_pos.x+ Math.floor((Math.random()*10-5)*0.25)+"px";
                            if (i === 15) {
                                clearInterval(_clock);
                                pDom.style.visibility = "visible";
                                _body.removeChild(_cloneDom);
                                delete (_cloneDom);
                                pCallBack && pCallBack();
                            }
                        }, 30);
                    },
                /*
                * 暗注释
                * @param {object} 需要暗注释处理的dom
                */
                    defaultTip = function (pDom) {
                        var _defaultTip = pDom.getAttribute("data-default");
                        if (pDom.value == _defaultTip) {
                            //pDom.value=_defaultTip;//input_default
                            UI.Dom.addClass(pDom, "input_default");
                        } else {
                            UI.Dom.removeClass(pDom, "input_default");
                        }
                        Core.bind(pDom, "focus", function () {
                            UI.Dom.removeClass(pDom, "input_default");
                            if (pDom.value === _defaultTip) {
                                pDom.value = "";
                            }
                        });
                        Core.bind(pDom, "blur", function () {
                            if (pDom.value.replace(/\s|\t|\n|\r/g, "") === "") {
                                UI.Dom.addClass(pDom, "input_default");
                                pDom.value = _defaultTip;
                            }
                        });
                    },
                    submitText = function (pDoms) {
                        var _param = {
                            filterPara: _filterStr,
                            StartCity: $$.StartCity
                        };
                        getParams(_param);
                        for (var i = 0, l = pDoms.length; i < l; i++) {
                            _param[pDoms[i].getAttribute("data-name")] = pDoms[i].value;
                        }
                        _param['Flag'] = 1;
                        UI.Dom.sumbitForm(_param, _handleUrl, "post");
                    },
                    init = function () {
                        var _check1 = _iptDatePromotion,
                        _check2 = _iptDateType;
                        new priceBox();
                        new dateBox();
                        new pageNum();
                        new checkBox(_check1);
                        new checkBox(_check2);
                    };
                init();
            },
        /*
        * 搜索结果快点击
        */
            SearchResult = function (pContainer) {
                var _container = pContainer,
                /*
                * 修改hash
                */
                    hasdAddition = function () {
                        var _addDom = _container.find("a[data-hash]");
                        for (var i = 0, l = _addDom.length; i < l; i++) {
                            _addDom[i].href = _addDom[i].href + _addDom[i].getAttribute("data-hash");
                        }
                    },
                /*
                * 块点击
                */
                    blockClick = function () {
                        var _block = _container.find("[data-href]");
                        for (var i = 0, l = _block.length; i < l; i++) {
                            (function (i) {
                                Core.bind(_block[i], "click", function (e) {
                                    var event = e || window.event;
                                    var _target = event.target || event.srcElement;
                                    var _url = _block[i].getAttribute("data-href");
                                    if ($(_target).hasClass('sea_schedule') || $(_target).parentNode().hasClass('sea_schedule') || $(_target).hasClass('more_comment') || $(_target).hasClass('comment_list') || $(_target).hasClass('calendar_top') || $(_target).hasClass('search_calendar') || $(_target).hasClass('search_calendar_title') || $(_target).hasClass('comment_content') || $(_target).hasClass('compare_btn') || $(_target).hasClass('comment02') || $(_target).hasClass('more_comment_link') || $(_target).parentNode().hasClass('comment02') || $(_target).parentNode().hasClass('more_comment') || $(_target).parentNode().hasClass('compare_btn') || $(_target).hasClass('compare_btn') || $(_target).parentNode()[0].tagName.toUpperCase() === 'DD' || $(_target).parentNode().parentNode()[0].tagName.toUpperCase() === 'DD' || $(_target).parentNode().parentNode().parentNode()[0].tagName.toUpperCase() === 'DD' || $(_target)[0].tagName.toUpperCase() === 'DD') {
                                        //查看班期按钮点击
                                        return false;
                                    }

                                    if (_block[i].getAttribute("data-c") == null) {
                                        location.href = _url;
                                    } else if (/http:\/\//gi.test(_url)) {
                                        UI.Dom.sumbitForm(null, _url, '', true);
                                    } else {
                                        UI.Dom.sumbitForm(null, _url, "post", true);
                                    }

                                    event.preventDefault();
                                    event.stopPropagation();
                                });
                            })(i);
                        }
                    },
                /*
                * 星级浮出效果
                */
                    starHover = function () {
                        var _tags = _container.find("[data-star]") || [],
                            _tip = document.createElement("DIV"),
                            _tipContext = document.createElement("DIV"),
                            _starDictionary = $$.StarDictionary,
                            _thisDom,
                        /*
                        * 显示浮出层
                        * @param {object} 用于定位浮出的DOM
                        */
                            showDom = function (pDom) {
                                var me = this;
                                _thisDom = pDom;
                                localDom.call(me, pDom);
                                _tipContext.innerHTML = _starDictionary[pDom.getAttribute("data-star")];
                                _tip.style.display = "block";
                            },
                        /*
                        * 定位浮出层
                        */
                            localDom = function () {
                                if (_thisDom) {
                                    var _pos = UI.Dom.position(_thisDom);
                                    _tip.style.top = _pos.y - _thisDom.clientHeight - 31 + "px";
                                    _tip.style.left = _pos.x + "px";
                                }
                            },
                        /*
                        * 隐藏浮出层　　　　
                        */
                            hideDom = function () {
                                _thisDom = undefined;
                                _tip.style.display = "none";
                            },
                            init = function () {
                                var me = this;
                                _tip.className = "base_alert_down02";
                                _tipContext.className = "alert_info";
                                _tip.appendChild(_tipContext);
                                _tip.appendChild(document.createElement("B"));
                                _tip.appendChild(document.createElement("I"));
                                _tip.style.display = "none";
                                _tip.style.position = "absolute";
                                document.getElementsByTagName("BODY")[0].appendChild(_tip);
                                for (var i = 0, l = _tags.length; i < l; i++) {
                                    (function (i) {
                                        Core.bind(_tags[i], "mouseover", function (event) {
                                            var _tar = event.target;
                                            showDom.call(me, _tar);
                                        });
                                        Core.bind(_tags[i], "mouseout", function (event) {
                                            hideDom.call(me);
                                        });
                                    } (i));
                                }
                                Core.bind(window, "resize", function () {
                                    localDom.call(me);
                                });
                            };
                        init();
                    },
                    init = function () {
                        hasdAddition();
                       // blockClick();
                        new starHover();
                    };
                init();
            },
            GoTop = function () {
                if (!document.getElementById("GoTop")) return;
                var _dom = document.getElementById("GoTop"),
                    _isStateShow = false,
                    _isLock = false,
                    action = function () {
                        var me = this;
                        if (UI.Dom.scrollTop() > 100) {
                            if (!_isStateShow) {
                                show.call(me);
                            }
                            _isStateShow = true;
                        } else {
                            if (_isStateShow) {
                                hide.call(me);
                            }
                            _isStateShow = false;
                        }
                    },
                    show = function () {
                        if (!_isLock) {
                            _isLock = true;
                            UI.Animation.fadeIn(_dom, 15, null, function () {
                                _isLock = false;
                            });
                        }
                    },
                    hide = function () {
                        if (!_isLock) {
                            _isLock = true
                            UI.Animation.fadeOut(_dom, 15, null, function () {
                                _isLock = false;
                            });
                        }
                    },
                    repairIE6Fix = function () {
                        _dom.style.top = (UI.Dom.scrollTop() + UI.Dom.clientHeight() - 200) + "px";
                    },
                    init = function () {
                        var me = this;
                        Core.bind(window, 'scroll', function (event) {
                            action.call(me);
                            _isIE6 && repairIE6Fix.call(me);
                        });
                        Core.bind(window, 'resize', function (event) {
                            action.call(me);
                            _isIE6 && repairIE6Fix.call(me);
                        });
                    };
                init();
            },
            SEO = function () {
                var _container = $("#PanelSeo"),
                    _controls = _container.find("dt > a:gt(0)"),
                    _frame = _container.find("dd"),
                    _textareas = _container.find("TEXTAREA"),
                    _tab = new UI.Tab(_controls, _frame, ["current", ""], ["", "hidden"], "mouseover");
                _tab.takeTextareas(_textareas);
                _tab.init();
            },
            VisitForm = function (pContainer) {
                var _container = pContainer,
                    _viewShow = $("#visitShow");
                if (_viewShow.length < 1) { return; }
                var _submitURL = $$.diyUrl + "round-{$FromCityEName}{$FromCity}-{$ToCityEName}{$ToCity}",
                    _isSelectHotel = false; //用户是否操作了酒店部分标识
                Visit = function () {
                    var _inputs = _viewShow.find("INPUT"),
                        _v = $(_container).regMod("validate", "1.1"),
                        _fromCity, _toCity, _fromTime, _toTime, _adults, _children, _submit, _closeShowBtn,
                        _adultsStep, _childrenStep, _showBtn, _showBtn_pic, _showBtn_link,
                        init = function () {
                            _showBtn = $(".J_VisitShowMask");
                            _showBtn_pic = $(".J_VisitShowMask_pic");
                            _showBtn_link = $(".J_VisitShowMask_link");
                            _adults = _inputs[0];
                            _children = _inputs[1];
                            _fromCity = _inputs[2];
                            _toCity = _inputs[3];
                            _fromTime = _inputs[4];
                            _toTime = _inputs[5];
                            _submit = _inputs.last();
                            _closeShowBtn = _viewShow.find("A")[0];

                            searchAddressSel(_fromCity, false);
                            searchAddressSel(_toCity, true);
                            initCalander(_fromTime, _toTime);
                            _adultsStep = new StepSelect(_adults, 1, 10, function (pNum) {
                                if (_childrenStep) {
                                    _childrenStep.setMax(pNum * 2 + 1);
                                }
                            });
                            _childrenStep = new StepSelect(_children, 0, 5);
                        },
                        bindEvents = function () {
                            $(_submit).bind("click", function () {
                                if (check()) return;
                                submit();
                            });
                            $(_showBtn).bind("click", function () {
                                if (this.getAttribute("data-index") == 0) {
                                    hotleSelect._isHotelShow = false;
                                    hotleSelect._hotelContainer.css("display", "none");
                                }
                                else {
                                    hotleSelect._isHotelShow = true;
                                    hotleSelect._hotelContainer.css("display", "block");
                                }
                                _viewShow.mask();
                            });
                            $(_showBtn_link).bind("click", function () {
                                if (this.getAttribute("data-index") == 0) {
                                    hotleSelect._isHotelShow = false;
                                    hotleSelect._hotelContainer.css("display", "none");
                                }
                                else {
                                    hotleSelect._isHotelShow = true;
                                    hotleSelect._hotelContainer.css("display", "block");
                                }
                                _viewShow.mask();
                            });
                            $(_showBtn_pic).bind("click", function () {
                                if (this.getAttribute("data-index") == 0) {
                                    hotleSelect._isHotelShow = false;
                                    hotleSelect._hotelContainer.css("display", "none");
                                }
                                else {
                                    hotleSelect._isHotelShow = true;
                                    hotleSelect._hotelContainer.css("display", "block");
                                }
                                _viewShow.mask();
                            });
                            $(_closeShowBtn).bind("click", function () {
                                _viewShow.unmask();
                            });
                        },
                        submit = function () {
                            var _data,
                                _HotelInput = $('#divHotelQuery').find("INPUT"),
                                _hotelCityIdStr = [], _hotelFromTimeStr = [], _hotelToTimeStr = [],
                                _hotelCityIdKey, _hotelFromTimeKey, _hotelToTimeKey;
                            //将酒店表单的数据按出发地id，时间添加到一个数组中便于后面提交
                            for (var i = 0; i < _HotelInput.length; i++) {
                                if (i % 3 == 0) {
                                    var _hotelCityVal = _HotelInput[i].getAttribute("data-val"),
                                        _hotelCityInfo = _hotelCityVal.split('|')[2];
                                    _hotelCityIdStr.push(_hotelCityInfo);
                                }
                                if ((i - 1) % 3 == 0) {
                                    _hotelFromTimeStr.push(_HotelInput[i].value);
                                }
                                if ((i - 2) % 3 == 0) {
                                    _hotelToTimeStr.push(_HotelInput[i].value);
                                }
                            }
                            _hotelCityIdKey = _hotelCityIdStr.join(',');
                            _hotelFromTimeKey = _hotelFromTimeStr.join(',');
                            _hotelToTimeKey = _hotelToTimeStr.join(',');

                            //提交表单
                            _fromCityVal = _fromCity.getAttribute("data-val");
                            _toCityVal = _toCity.getAttribute("data-val");
                            var _formData = getAddressData(_fromCityVal),
                                _toData = getAddressData(_toCityVal);
                            _data = {
                                FromCity: _formData.id,
                                FromCityName: _formData.name,
                                FromCityEName: _formData.eName,
                                FromCityCode: _formData.code,
                                ToCity: _toData.id,
                                ToCityName: _toData.name,
                                ToCityEName: _toData.eName,
                                ToCityCode: _toData.code
                            };

                            var _param = {
                                FromTime: _fromTime.value,
                                FromCityName: _data.FromCityName,
                                FromCityCode: _data.FromCityCode,
                                FromCityEName: _data.FromCityEName,
                                FromCity: _data.FromCity,
                                ToTime: _toTime.value,
                                ToCityName: _data.ToCityName,
                                ToCityCode: _data.ToCityCode,
                                ToCityEName: _data.ToCityEName,
                                ToCity: _data.ToCity,
                                Adults: _adults.value,
                                Children: _children.value
                            };

                            //提交时根据是否单机多酒或者航班目的地是否等于酒店目的地来判断url
                            if ((hotleSelect._hotelCount > 1 || _toCity.value != $('#divHotelQuery').find('input')[0].value) && hotleSelect._isHotelShow) {
                                var _url = $$.diyUrl + 'freesearchlist.aspx';
                            }
                            else {
                                var checkIn = hotleSelect._textboxes[5].value(),
                                    CheckOut = hotleSelect._textboxes[6].value();
                                _url = replaceWith(_submitURL, {
                                    FromCityEName: toLower(_data.FromCityEName),
                                    FromCity: _data.FromCity,
                                    ToCityEName: toLower(_data.ToCityEName),
                                    ToCity: _data.ToCity
                                });
                                _param.Nights = hotleSelect.dateDiff(checkIn, CheckOut, 'd');
                            }
                            //提交判断为单机多酒时才提交酒店数据
                            if (hotleSelect._isHotelShow) {
                                _param.CheckInDate = _hotelFromTimeKey;
                                _param.CheckOutDate = _hotelToTimeKey;
                                _param.ToCities = _hotelCityIdKey;
                            }
                            UI.Dom.sumbitForm(_param, _url, "post", true);
                            _viewShow.unmask();
                        },
                        toLower = function (pStr) {
                            var _arr = pStr.split("");
                            for (var i = 0, l = _arr.length; i < l; i++) {
                                if (_arr[i].charCodeAt(0) >= 65 && _arr[i].charCodeAt(0) <= 90) {
                                    _arr[i] = _arr[i].toLowerCase();
                                }
                            }
                            return _arr.join("");
                        },
                        replaceWith = function (pStr, pObj) {
                            return pStr.replace(/\{\$(\w+)\}/g, function (b, c) {
                                return c in pObj ? pObj[c] : b
                            });
                        },
                        getAddressData = function (pStr) {
                            var _list = pStr.split("@")[1],
                                _data = _list.split("|"),
                                _length = _data[3].split("，").length;
                            return {
                                id: _data[2],
                                name: _data[1].split("(")[0],
                                eName: _data[0].split("，")[0],
                                code: _data[3].split("，")[_length - 1]
                            }
                        },
                        check = function () {
                            //空值判断
                            var from_val = $("#txtFromCity").value(),
                                to_val = $("#txtToCity").value(),
                                txts = hotleSelect._textboxes; //txts里面存的是input节点的数组以便索引

                            if (_fromCity.getAttribute("data-val") == null || from_val == "") {
                                valiDate(_fromCity, "请选择出发地");
                                return true;
                            }
                            if (_toCity.getAttribute("data-val") == null || to_val == "") {
                                valiDate(_toCity, "请选择目的地");
                                return true;
                            }
                            if (_fromCity.value == _toCity.value) {
                                valiDate(_toCity, "出发地不能和目的地相同");
                                return true;
                            }
                            if ($(_fromTime).value().trim() == "") {
                                valiDate(_fromTime, "请选择出发日期");
                                return true;
                            }
                            if ($(_toTime).value().trim() == "") {
                                valiDate(_toTime, "请选择返回日期");
                                return true;
                            }
                            if ($(_adults).value().trim() == "") {
                                valiDate(_adults, "请选择成人");
                                return true;
                            }
                            if ($(_children).value().trim() == "") {
                                valiDate(_children, "请选择儿童");
                                return true;
                            }
                            if (CheckReg(_adults, /^\d+$/, "请输入正确的数字")) return true;
                            if (CheckReg(_children, /^\d+$/, "请输入正确的数字")) return true;
                            if (~ ~_adults.value == 0) {
                                valiDate(_adults, "至少1人");
                                return true;
                            }
                            if (~ ~_adults.value * 2 < ~ ~_children.value) {
                                valiDate(_adults, "每个成人最多带2个儿童");
                                return true;
                            }
                            if ((~ ~_adults.value + ~ ~_children.value) > 10) {
                                valiDate(_adults, "订单总人数不可超过10人");
                                return true;
                            }

                            //提交前对酒店选择部分填的数据校验,单机多酒店时才判断
                            if (hotleSelect._isHotelShow) {
                                for (var i = 4; i < txts.length; i += 3) {
                                    var dd = txts[2].value(), rd = txts[3].value(), //航班出发返回日期
                                        cid = txts[i + 1].value(), cod = txts[i + 2].value(); //酒店入住离店日期
                                    if (txts[i][0].getAttribute("data-val") == null || txts[i].value() == "") {
                                        valiDate(txts[i][0], "请选择入住城市");
                                        return true;
                                    }
                                    if (cid == "") {
                                        valiDate(txts[i + 1][0], "请选择入住日期");
                                        return true;
                                    }
                                    if (cod == "") {
                                        valiDate(txts[i + 2][0], "请选择离开日期");
                                        return true;
                                    }
                                    if (cid >= cod) {
                                        valiDate(txts[i + 1][0], "您选择的离店日期早于/等于入住日期");
                                        return true;
                                    }
                                    if (hotleSelect.dateDiff(cid, cod, 'd') > 28) {
                                        valiDate(txts[i + 2][0], "最大行程不能超过28天，请分订单提交预订");
                                        return true;
                                    }
                                    if (hotleSelect.dateDiff(dd, rd, 'd') > 28) {
                                        valiDate(txts[i - 1][0], "最大行程不能超过28天，请分订单提交预订");
                                        return true;
                                    }
                                    if (cid.toDate().addDays(1) < dd.toDate()) {
                                        valiDate(txts[i + 1][0], "入住日期最早只能出发日期前一天");
                                        return true;
                                    }
                                    if (rd.toDate().addDays(1) < cod.toDate()) {
                                        valiDate(txts[i + 2][0], "离开日期最晚只能返回日期后一天");
                                        return true;
                                    }
                                }
                            }
                            return false;
                        },
                        CheckReg = function (pDom, pRegTemp, pMsg) {
                            if (!pRegTemp.test($(pDom).value())) {
                                valiDate(pDom, pMsg);
                                return true;
                            }
                            return false;
                        },
                        valiDate = function (pDom, pMsg) {
                            _v.method("show", { $obj: $(pDom), data: pMsg, removeErrorClass: true, isScroll: false });
                        };
                    init();
                    bindEvents();
                },
                initCalander = function (pStartDom, pEndDom) {
                    var _minDate = pStartDom.getAttribute("data-min");
                    pStartDom.calendarInstance = $(pStartDom).regMod('calendar', '6.0',
                        {
                            options: { autoShow: true, showWeek: false, minDate: _minDate },
                            listeners: {
                                onChange: function (input, value) {
                                    var _minDate = newDateString(stringToDate(value).addDays(1)),
                                        _maxDate = newDateString(stringToDate(value).addDays(28));
                                    $(pEndDom).data("minDate", _minDate);
                                    $(pEndDom).data("maxDate", _maxDate);

                                    if (value >= pEndDom.value) {
                                        pEndDom.value = _minDate;
                                    }
                                    if (!_isSelectHotel) {
                                        hotleSelect._updateHotelBox(hotleSelect._splitFlightDates());
                                    }
                                    //联动判断酒店入住和离店日期的minDate，maxDate
                                    hotleSelect.hotelOptionalDate();
                                }
                            }
                        }
                    );
                    $(pStartDom).regMod("notice", "1.0", { name: pStartDom.id, tips: "yyyy-mm-dd", selClass: "inputSel" });
                    _minDate = newDateString(stringToDate(_minDate).addDays(2));
                    var _maxDate = newDateString(stringToDate(_minDate).addDays(27));
                    pEndDom.calendarInstance = $(pEndDom).regMod('calendar', '6.0',
                        {
                            options: { autoShow: true, showWeek: false, minDate: _minDate, maxDate: _maxDate },
                            listeners: {
                                onChange: function (input, value) {
                                    if (!_isSelectHotel) {
                                        hotleSelect._updateHotelBox(hotleSelect._splitFlightDates());
                                    }
                                    //联动判断酒店入住和离店日期的minDate，maxDate
                                    hotleSelect.hotelOptionalDate();
                                }
                            }
                        }
                    );
                    $(pEndDom).regMod("notice", "1.0", { name: pEndDom.id, tips: "yyyy-mm-dd", selClass: "inputSel" });
                },
                newDateString = function (pDate) {
                    var _arr = [];
                    _arr.push(pDate.getFullYear());
                    _arr.push("-");
                    var _month = pDate.getMonth() + 1,
                        _monthStr = _month < 10 ? "0" + _month : _month;
                    _arr.push(_monthStr);
                    _arr.push("-");
                    var _day = pDate.getDate(),
                        _dayStr = _day < 10 ? "0" + _day : _day;
                    _arr.push(_dayStr);
                    return _arr.join("");
                },
                stringToDate = function (pStr) {
                    var _date = pStr.split('-');
                    return new Date(_date[0], _date[1] - 1, _date[2]);
                },
                searchAddressSel = function (pDom, pType, pCallBack) {
                    var _typeName = pType ? "flightintl_dest" : "flightintl_start",
                        _jsonpSource = $$.diyDatabase + _typeName + '_' + $.config('charset') + '.js',
                        _jsonpUrl = 'http://flights.ctrip.com/international/tools/GetCities.ashx?s=${key}&a=' + (pType ? '1' : '0') + '&t=' + ($.config('charset') == 'big5' ? '1' : '0'),
                        _tmpSuggestion = pType ? '\
                                <div class="c_address_box2 hot_city world">\
                                    <div class="c_address_hd">${message.suggestion}</div>\
                                    <div class="c_address_bd">\
                                        {{enum(key,arr) data}}\
                                            <ul class="c_address_ul layoutfix {{if key=="国内" }}c_address_ul_no{{/if}}">\
                                            <li class="tit"><strong>${key}</strong></li>\
                                            {{each arr}}\
                                                <li><a data="${data}" href="javascript:void(0);">${display}</a></li>\
                                            {{/each}}\
                                            </ul>\
                                        {{/enum}}\
                                    </div>\
                                </div>' : '\
                                <div class="c_address_box2 hot_city">\
                                    <div class="c_address_hd">${message.suggestion}</div>\
                                    <div class="c_address_bd">\
                                        {{enum(key,arr) data}}\
                                            <ul class="c_address_ul layoutfix">\
                                            {{each arr}}\
                                                <li><a data="${data}" href="javascript:void(0);">${display}</a></li>\
                                            {{/each}}\
                                            </ul>\
                                        {{/enum}}\
                                    </div>\
                                </div>';
                    _ref = $(pDom).regMod('address', '1.0', {
                        name: pDom.id,
                        jsonpSource: _jsonpSource,
                        isFocusNext: true,
                        //isAutoCorrect: true,
                        sort: ['^0$', '^1$', '^3$', '^0', '^1', '^3', '0', '1', '3', '^4+$'],
                        message: {
                            suggestion: '热门城市（可直接选择城市或输入城市全拼/简拼）',
                            filterResult: '${val}，按字符顺序排序',
                            noFilterResult: ' 对不起，无匹配，请重新输入。',
                            sort: ["", "", "", "", "", "", "", "", "", "\"${val}\" 国家名，相关城市"]
                        },
                        template: {
                            filterPageSize: 10,
                            suggestion: _tmpSuggestion,
                            suggestionStyle: '\
                                .c_address_box { background-color: #fff; font-size: 12px; width: 384px; }\
                                .c_address_box a { text-decoration: none; }\
                                .c_address_box2 { background-color: #fff; font-size: 12px; width: 384px; }\
                                .c_address_box2 a { text-decoration: none; }\
                                .c_address_hd {dispaly:none; height: 24px; border-color: #add9f4; border-style: solid; border-width: 1px 1px 0; background-color: #67A1E2; color: #fff; line-height: 24px; padding-left: 10px; }\
                                .c_address_hd .hd_tips{ color:#cee3fc;}\
                                .c_address_bd { border:#add9f4 1px solid; overflow: hidden; padding:10px; }\
                                .c_address_ol { margin:0; padding:0 0 20px; border-bottom: 1px solid #5DA9E2; }\
                                .c_address_ol li { color: #005DAA; cursor: pointer; float: left; height: 20px; line-height: 20px; list-style-type: none; text-align: center; }\
                                .c_address_ol li span { padding:0 8px; }\
                                .c_address_ol li .hot_selected { display:block; padding:0 5px; background-color: #FFFFFF; border-color: #5DA9E2; border-style: solid; border-width: 1px 1px 0; color: #000000; font-weight: bold; }\
                                .c_address_ul { margin:0; padding: 4px 0 0; }\
                                .c_address_ul li { float: left; height: 24px; overflow: hidden; width: 72px; }\
                                .c_address_ul li a { display: block; height: 22px;  border: 1px solid #FFFFFF; color: #1148A8; line-height: 22px; padding:0 5px; }\
                                .c_address_ul li a:hover { background-color: #E8F4FF; border: 1px solid #ACCCEF; text-decoration: none; }\
                                .hot_city{ width:300px;}\
                                .hot_city .c_address_bd{ padding:6px 0;}\
                                .hot_city li { width:50px;}\
                                .world{ width:348px;}\
                                .world .c_address_ul { padding:4px 0 4px 50px; position:relative; border-top:#ccc 1px dotted;}\
                                .world .c_address_ul_no{ border-top:0 none}\
                                .world .tit{ position:relative; margin:0 0 0 -38px; width:38px; line-height:24px;}\
                                \
                            ',
                            filter: '\
                                <div class="c_address_select">\
                                    <div class="c_address_wrap">\
                                        <div class="c_address_hd">{{if hasResult}}{{tmpl message.filterResult}}{{else}}{{tmpl message.noFilterResult}}{{/if}}</div>\
                                        <div class="c_address_list" style="">\
                                            {{each (i,item) list}}\
                                                {{if cQuery.type(item)=="string"}}\
                                                    <label>${item}</label>\
                                                {{else}}\
                                                    <a href="javascript:void(0);" data="${data}" style="display: block;">${left}<span>${right}</span></a>\
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
                            ',
                            filterStyle: '\
                                .c_address_wrap { width: 220px; min-height: 305px; margin: 0; padding: 0 0 4px; border: 1px solid #add9f4; background:#fff; text-align: left; }\
                                .c_address_select .c_address_list { margin: 0; min-height: 277px; padding: 0; }\
                                .c_address_select .c_address_list span { font:10px/1. verdana; color:#bbb; display:block; margin: 0; overflow: hidden; padding: 0; white-space: nowrap; text-transform:uppercase }\
                                .c_address_select .c_address_list a { border-bottom: 1px solid #FFFFFF; border-top: 1px solid #FFFFFF; color: #0055AA; cursor: pointer; display: block; overflow: hidden;padding:3px 8px; text-align: left; text-decoration: none; }\
                                .c_address_select .c_address_list a:hover,\
                                .c_address_select .c_address_list a.hover { background:#e8f4ff; border-bottom: 1px solid #acccef; border-top: 1px solid #acccef; }\
                                .c_address_select .c_address_pagebreak { display: none; line-height: 25px; margin: 0; padding: 0; text-align: center; }\
                                .c_address_select .c_address_pagebreak a { color: #0055AA; display: inline-block; font-family: Arial, Simsun, sans-serif; font-size: 14px; margin: 0; padding: 0 4px; text-align: center; text-decoration: underline; width: 15px; }\
                                .c_address_select #c_address_arrowl, .c_address_select #c_address_arrowr { color: #0055AA; }\
                                .c_address_select a.address_current { color: #000; text-decoration: none; }\
                            '
                        },
                        jsonpFilter: _jsonpUrl,
                        delay: 50
                    });
                    _ref.method('bind', 'change', function () {
                        var _key = arguments[1].value;
                        $.jsonp(_jsonpUrl.replace("${key}", _key), {
                            onload: function (data) {
                                pDom.setAttribute("data-val", data.data);
                            }
                        });
                        setTimeout(function () {
                            pDom.blur();
                        }, 0);
                    });
                    _ref.method('bind', 'enter', function () {
                        setTimeout(function () {
                            pDom.blur();
                        }, 0);
                    });
                    pCallBack && _ref.method('bind', 'change', pCallBack);
                    $(pDom).regMod("notice", "1.0", { name: pDom.id, tips: "中文/拼音/英文", selClass: "inputSel" });
                },
                StepSelect = function (pDom, pMin, pMax, pCallBack) {
                    var _viewId = pDom.getAttribute("data-showid"),
                        _view = $("#" + _viewId),
                        _parent = $(pDom).parentNode();
                    this.min = pMin;
                    this.max = pMax;
                    this.bindEvents = function () {
                        _view.bind("click", function (e) {
                            e = e || window.event;
                            var _target = e.target || e.srcElement;
                            if (_target.tagName === "A") {
                                pDom.value = _target.innerHTML;
                                _view.css("display", "none");
                                if (pCallBack) pCallBack(~ ~_target.innerHTML);
                            }
                        });
                        $(document).bind("mousedown", function (e) {
                            e = e || window.event;
                            var _target = e.target || e.src.srcElement;
                            if (!$(pDom).contains(_target) && !$(_view).contains(_target)) {
                                _view.css("display", "none");
                            }
                        });
                        _parent.bind("click", function () {
                            _view.css("display", "");
                        });
                        pDom.onmouseup = function () {
                            if (this.focused) { this.focused = false; return false; }
                        };
                    },
                    this.setOptions = function () {
                        var _list = [];
                        for (var i = this.min || 0, l = this.max <= 10 ? this.max : 10; i < l; i++) {
                            _list.push(i);
                        }
                        _view.html("<a href=\"javascript:;\">" + _list.join("</a><a href=\"javascript:;\">") + "</a>");
                    };
                    this.setOptions();
                    this.bindEvents();
                },
                StepSelect.prototype.setMax = function (pMax) {
                    this.max = pMax;
                    this.setOptions();
                    this.bindEvents();
                };

                /*
                * @Author tyuan
                * @CreateDate  2013/10/14
                * @Desc  增加酒店逻辑
                */

                var hotleSelect = {
                    _isInitMod: false,
                    _textboxes: [], // store the textboxes for skiping to next when one is filled
                    _hotelCount: 0,
                    _isHotelShow: false,
                    _hotelDateChanged: false,
                    _hotelContainer: $('#divHotelQuery'),
                    _toHotelDom: $('input[name=txtToCityHotel]'),
                    formTimeval: $('#txtFromTime').value(),
                    toTimeval: $('#txtToTime').value(),

                    //当航班时间改变时联动判断酒店入住和离店日期的minDate，maxDate
                    hotelOptionalDate: function () {
                        for (var i = 0; i < hotleSelect._hotelCount; i++) {
                            var txts = hotleSelect._textboxes,
                                index = 5 + i * 3,
                                Fromval = txts[2].value(),
                                Toval = txts[3].value(),
                                inputHotelTimeF = txts[index].value(),
                                _minToTimeHotel = newDateString(stringToDate(inputHotelTimeF).addDays(1)),
                                _minFromTimeHotel = newDateString(stringToDate(Fromval).addDays(-1)),
                                _maxFromTimeHotel = newDateString(stringToDate(Toval).addDays(1));
                            txts[index].data("minDate", _minFromTimeHotel);
                            txts[index].data("maxDate", _maxFromTimeHotel);
                            if (inputHotelTimeF == '') {
                                txts[index + 1].data("minDate", Fromval);
                            }
                            else {
                                txts[index + 1].data("minDate", _minToTimeHotel);
                            }
                            txts[index + 1].data("maxDate", _maxFromTimeHotel);
                        };
                    },

                    // 拆日期
                    _splitFlightDates: function () {
                        if (this._hotelDateChanged) return;

                        var start = this.txtFromTime.value(),
                            end = this.txtToTime.value();
                        if (!start.isDate() || !end.isDate() || start > end) return;

                        var ret = [];
                        var days = hotleSelect.dateDiff(start, end, 'd');

                        if (days < 1) return;

                        if (days == 1) return [start, end];

                        var avg = Math.floor(days / this._hotelCount),
                            mod = days % this._hotelCount;

                        start = start.toDate();
                        end = end.toDate();
                        var days1 = 0, days2 = 0;
                        for (var i = 0; i < this._hotelCount; i++) {
                            days2 = days1 + avg + (i < mod ? 1 : 0);
                            if (days1 == days2) days1--;
                            ret.push(
                                start.addDays(days1).toFormatString('yyyy-MM-dd'),
                                start.addDays(days2).toFormatString('yyyy-MM-dd')
                        );
                            days1 = days2;

                        }
                        return ret;
                    },

                    _updateHotelBox: function (dates) {
                        // 更新日期
                        if (dates) {
                            var index, start, end, last = dates.length - 1;
                            for (var i = 0; i < this._hotelCount; i++) {
                                start = dates[2 * i] ? dates[2 * i] : dates[last - 1];
                                end = dates[2 * i + 1] ? dates[2 * i + 1] : dates[last];
                                index = 5 + i * 3;
                                this._textboxes[index].value(start);
                                this._textboxes[index + 1].value(end);
                            };
                        }
                        // 更新删除/添加按钮状态
                        var deletelnks = this._hotelContainer.find('>div a');
                        deletelnks[0].className = deletelnks.length > 1 ? 'del' : 'hidden';
                        deletelnks.length >= 3 ? $('#lnkAddHotel').addClass('hidden') : $('#lnkAddHotel').removeClass('hidden');
                    },

                    dateDiff: function (date1, date2, interval, isPrecise) {
                        if ($.type(date1) !== 'date')
                            date1 = date1.toDate();
                        if ($.type(date2) !== 'date')
                            date2 = date2.toDate();

                        //do not check the input
                        var timeDiff = Math.abs(date1.getTime() - date2.getTime());

                        switch (interval) {
                            case 'S':
                                return timeDiff;
                            case 's':
                                return Math.round(timeDiff / 1000);
                            case 'm':
                                return Math.round(timeDiff / 1000 / 60);
                            case 'h':
                                return Math.round(timeDiff / 1000 / 60 / 60);
                            case 'd':
                                return Math.round(timeDiff / 1000 / 60 / 60 / 24);
                            case 'M':
                                return Math.abs(
                                (date1.getFullYear() - date2.getFullYear()) * 12 +
                                (date1.getMonth() - date2.getMonth()));
                            case 'y':
                                return Math.abs(date1.getFullYear() - date2.getFullYear());
                            default:
                                return null;
                        }
                    },

                    // 添加酒店
                    addHotel: function () {
                        if (this._hotelCount >= 3) return;

                        var htmlHotel =
                            '<div class="select_cond hover">\
                                <p>\
                                    <label class="lab">入住城市</label><input type="text" value="' + this.txtToCity.value() + '" class="calendar" data-val="' + this.txtToCity[0].getAttribute("data-val") + '" />\
                                </p>\
                                <p>\
                                    <label class="lab">入住日期</label><input type="text" readonly="readonly" name="CheckInDate" value="" class="calendar" /><label class="lab">离店日期</label><input type="text" readonly="readonly" name="CheckOutDate" value="" class="calendar" />\
                                    <a href="javascript:;" data-index=' + this._hotelCount + ' class="del">删除</a></p>\
                            </div>';
                        var divHotel = document.createElement('div');
                        divHotel.innerHTML = htmlHotel;
                        var retHotel = divHotel.firstChild;
                        var lnkAdd = this._hotelContainer.find('>a');
                        $(retHotel).insertBefore($(lnkAdd));
                        $(retHotel).find('input[type="text"]').each(this._regHotelMods.bind(this));
                        this._updateHotelBox(this._splitFlightDates());
                        this.hotelOptionalDate();

                    },
                    // 删除酒店
                    removeHotel: function (index) {
                        this._hotelCount--;
                        this._textboxes.splice(index * 3 + 4, 3);

                        var k = 0;
                        this._hotelContainer.find('>div').each(function (div, i) {
                            i == index ?
                                div[0].parentNode.removeChild(div[0]) :
                                div.find('a').attr('data-index', k++);
                        });

                        this._updateHotelBox(this._splitFlightDates());
                    },

                    // add functions to textboxes
                    _initTxts: function () {
                        this._textboxes.next = function (txt) {
                            return this[this.indexOf(txt) + 1];
                        }
                    },

                    _initMod: function () {
                        if (hotleSelect._hotelContainer.length < 1) {
                            return;
                        }
                        this._initFlightMods();
                        this._initHotelMods();
                        this._initTxts();
                    },

                    _initFlightMods: function () {
                        var self = this;
                        ['txtFromCity', 'txtToCity', 'txtFromTime', 'txtToTime'].each(function (item, i) {
                            self[item] = $('#' + item);
                            self._textboxes.push(self[item]);
                        });
                        //初始化判断航班目的地为海外时出发日期是当前日期+3,返回日期是出发日期+2
                        var flightToData = self._textboxes[1].attr("data-val"),
                            _minDateFrom = self._textboxes[2].attr("data-min"),
                            paramA = (flightToData != null) ? flightToData.split('|')[3].split('，')[2] : "";
                        $.jsonp("/DIY/Ajax/IsIntlCity.ashx?citycode=" + paramA + "&type=1", {
                            onload: function (data) {
                                if ((data.errno == 0 && data.data.isintl) || self._textboxes[1].value() == '') {
                                    self._textboxes[2].value(newDateString(stringToDate(_minDateFrom).addDays(2)));
                                    self._textboxes[3].value(newDateString(stringToDate(_minDateFrom).addDays(4)));
                                    self._textboxes[3].data("minDate", newDateString(stringToDate(self._textboxes[2].value()).addDays(1)));
                                    hotleSelect._textboxes[5].value(newDateString(stringToDate(_minDateFrom).addDays(2)));
                                    hotleSelect._textboxes[5].data("minDate", newDateString(stringToDate(self._textboxes[2].value()).addDays(-1)));
                                    hotleSelect._textboxes[6].value(newDateString(stringToDate(_minDateFrom).addDays(3)));
                                    hotleSelect._textboxes[6].data("minDate", newDateString(stringToDate(self._textboxes[5].value()).addDays(1)));
                                    hotleSelect._textboxes[8].value(newDateString(stringToDate(_minDateFrom).addDays(3)));
                                    hotleSelect._textboxes[8].data("minDate", newDateString(stringToDate(self._textboxes[2].value()).addDays(-1)));
                                    hotleSelect._textboxes[9].value(newDateString(stringToDate(_minDateFrom).addDays(4)));
                                    hotleSelect._textboxes[9].data("minDate", newDateString(stringToDate(self._textboxes[8].value()).addDays(1)));
                                }
                            }
                        });
                    },

                    _initHotelMods: function () {
                        var self = this;
                        this._hotelContainer.find('input[type="text"]').each(
                            this._regHotelMods.bind(this));
                        // bind events
                        this._hotelContainer.bind('click', function (e) {
                            if (e.target.nodeName != 'A') return;
                            var index = e.target.getAttribute('data-index');
                            (index != null) ? self.removeHotel(index) : self.addHotel();
                        })
                    },

                    _regHotelMods: function (txt, i) {
                        var self = this,
                            which = i % 3;
                        self._textboxes.push(txt);

                        if (which == 0) { // reg address
                            var _jsonpUrl = 'http://flights.ctrip.com/international/tools/GetCities.ashx?s=${key}&a=0' + '&t=' + ($.config('charset') == 'big5' ? '1' : '0');
                            var tempAddress =
                                txt.regMod("address", "1.0", {
                                    name: 'txtToCityHotel' + i,
                                    jsonpSource: "http://webresource.c-ctrip.com/ResVacationOnline/R9/js/database/flightintl_dest_" + cQuery.config("charset") + ".js",
                                    jsonpFilter: $$.diyUrl + '/Ajax/AjaxGobalCity.aspx?isctrip=1&keyword=${key}',
                                    template: {
                                        filter: '\
                                    {{if hasResult}}\
                                        <div class="city_suggestion_pop">\
                                        <p class="title">{{if hasResult}}{{tmpl message.filterResult}}{{/if}}</p>\
                                        <div class="sug_item">\
                                        {{each (i,item) list}}\
                                        {{if cQuery.type(item)=="string"}}\
                                        <a>${item}</a>\
                                        {{else}}\
                                        <a href="javascript:void(0);" data="${data}" title="${right}(${left})">\
                                        <span class="city">\
                                        <span class="cn">${right}</span>\
                                        <span class="en">${left}</span>\
                                        </span>\
                                        </a>\
                                        {{/if}}\
                                        {{/each}}\
                                        </div>\
                                        </div>\
                                    {{/if}}',
                                        filterStyle: ' .city_suggestion_pop { width:446px; border:1px solid #ccc; background-color:#fff; } .city_suggestion_pop .title { height:26px; margin:0 10px 4px; padding:0 2px; border-bottom:1px dotted #ccc; line-height:26px; color:#999; } .city_suggestion_pop .close { float:right; width:26px; height:26px; font:bold 14px/26px Simsun; color:#666; text-align:center; } .city_suggestion_pop .text_input { float:left; max-width:210px; _width:210px; overflow:hidden; white-space:nowrap; text-overflow:ellipsis; } .city_suggestion_pop .close:hover { text-decoration:none; color:#FFA800; } .city_suggestion_pop .sug_item a { display:block; padding:0 10px; color:#000; font-family:Tahoma; line-height:28px; cursor:pointer; } .city_suggestion_pop .sug_item .num { float:right; color:#999; } .city_suggestion_pop .sug_item .city { display:block; width:350px; max-height:56px; _height:28px; padding-right:4px; overflow:hidden; } .city_suggestion_pop .sug_item .en { color:#999; } .city_suggestion_pop .sug_item b { font-weight:bold; color:#06c; } .city_suggestion_pop .sug_item a:hover, .city_suggestion_pop .sug_item .hover { background-color:#06c; color:#fff; text-decoration:none; } .city_suggestion_pop .sug_item a:hover span, .city_suggestion_pop .sug_item .hover span, .city_suggestion_pop .sug_item a:hover b, .city_suggestion_pop .sug_item .hover b { color:#fff; }',
                                        filterPageSize: -1,
                                        suggestion: '\
                                <div class="c_address_box2 hot_city world">\
                                    <div class="c_address_hd">${message.suggestion}</div>\
                                    <div class="c_address_bd">\
                                        {{enum(key,arr) data}}\
                                            <ul class="c_address_ul layoutfix {{if key=="国内" }}c_address_ul_no{{/if}}">\
                                            <li class="tit"><strong>${key}</strong></li>\
                                            {{each arr}}\
                                                <li><a data="${data}" href="javascript:void(0);">${display}</a></li>\
                                            {{/each}}\
                                            </ul>\
                                        {{/enum}}\
                                    </div>\
                                </div>',
                                        suggestionStyle: '\
                                    .c_address_box { background-color: #fff; font-size: 12px; width: 384px; }\
                                    .c_address_box a { text-decoration: none; }\
                                    .c_address_box2 { background-color: #fff; font-size: 12px; width: 384px; }\
                                    .c_address_box2 a { text-decoration: none; }\
                                    .c_address_hd {dispaly:none; height: 24px; border-color: #add9f4; border-style: solid; border-width: 1px 1px 0; background-color: #67A1E2; color: #fff; line-height: 24px; padding-left: 10px; }\
                                    .c_address_hd .hd_tips{ color:#cee3fc;}\
                                    .c_address_bd { border:#add9f4 1px solid; overflow: hidden; padding:10px; }\
                                    .c_address_ol { margin:0; padding:0 0 20px; border-bottom: 1px solid #5DA9E2; }\
                                    .c_address_ol li { color: #005DAA; cursor: pointer; float: left; height: 20px; line-height: 20px; list-style-type: none; text-align: center; }\
                                    .c_address_ol li span { padding:0 8px; }\
                                    .c_address_ol li .hot_selected { display:block; padding:0 5px; background-color: #FFFFFF; border-color: #5DA9E2; border-style: solid; border-width: 1px 1px 0; color: #000000; font-weight: bold; }\
                                    .c_address_ul { margin:0; padding: 4px 0 0; }\
                                    .c_address_ul li { float: left; height: 24px; overflow: hidden; width: 72px; }\
                                    .c_address_ul li a { display: block; height: 22px;  border: 1px solid #FFFFFF; color: #1148A8; line-height: 22px; padding:0 5px; }\
                                    .c_address_ul li a:hover { background-color: #E8F4FF; border: 1px solid #ACCCEF; text-decoration: none; }\
                                    .hot_city{ width:300px;}\
                                    .hot_city .c_address_bd{ padding:6px 0;}\
                                    .hot_city li { width:50px;}\
                                    .world{ width:348px;}\
                                    .world .c_address_ul { padding:4px 0 4px 50px; position:relative; border-top:#ccc 1px dotted;}\
                                    .world .c_address_ul_no{ border-top:0 none}\
                                    .world .tit{ position:relative; margin:0 0 0 -38px; width:38px; line-height:24px;}\
                                    \
                                '
                                    }
                                });
                            tempAddress.method('bind', 'change',
                                function (_, data) {
                                    var next = self._textboxes.next(txt);
                                    // next && next[0].focus();
                                    txt[0].setAttribute("data-val", data.data);

                                });
                            txt.regMod("notice", "1.0", { name: 'txtToCityHotel' + i, tips: "中文/拼音/英文", selClass: "inputSel" });
                            txt.address = tempAddress;
                        } else { // reg calendar

                            if (which == 1) {
                                var tempCal =
                                    txt.regMod('calendar', '6.0', {
                                        options: {
                                            minDate: newDateString(stringToDate(hotleSelect.formTimeval).addDays(-1)),
                                            maxDate: newDateString(stringToDate(hotleSelect.toTimeval).addDays(1)),
                                            showWeek: false,
                                            container: cQuery.container
                                        },
                                        listeners: {
                                            onChange: function (input, v) {
                                                _isSelectHotel = true;
                                                self._hotelDateChanged = true;
                                                //can not change when user type the date
                                                var minDate = v.toDate().addDays(1).toStdDateString();
                                                var next = self._textboxes.next(txt);
                                                next.data('startDate', minDate);
                                                next.data('minDate', minDate);
                                                //next[0].focus();
                                            }
                                        }
                                    });

                            } else {
                                var tempCal =
                                    txt.regMod('calendar', '6.0', {
                                        options: {
                                            minDate: newDateString(stringToDate(hotleSelect._textboxes[i + 3].value()).addDays(1)),
                                            maxDate: newDateString(stringToDate(hotleSelect.toTimeval).addDays(1)),
                                            showWeek: false
                                        },
                                        listeners: {
                                            onChange: function (input, v) {
                                                _isSelectHotel = true;
                                                self._hotelDateChanged = true;
                                                var next = self._textboxes.next(txt);
                                                //next && next[0].focus();
                                            }
                                        }
                                    });
                                self._hotelCount++; // +1 hotel query.

                            }

                            txt.calendar = tempCal;
                        }
                    }
                };
                new Visit();
                hotleSelect._initMod();
            };
        $.ready(function () {
            var _searchFilterContainer = document.getElementById("searchFilterContainer"),
                _searchResultContainer = $("#searchResultContainer"),
                _chosenFilterContainer = $("#chosenFilterContainer"),
                _visitResultContainer = $("#visitResultContainer");
            (_searchResultContainer.length > 0) && new SearchResult(_searchResultContainer);
            _searchFilterContainer && new SearchForm(_searchFilterContainer);
            (_chosenFilterContainer.length > 0) && new SearchFilter(_chosenFilterContainer);
            _visitResultContainer.length && new VisitForm(_visitResultContainer);
            new GoTop();
            new SEO();
        });
    })();
    (function () {
        if (document.getElementById("JS_Out_Time")) {
            var element = document.getElementById("JS_Out_Time").getElementsByTagName("INPUT")
            $("#JS_Out_Time a").bind("click", function () {
                element[0].value = "最早出发";
                element[1].value = "最晚出发";
            })
        }
    })();
    /*
    * @Author:    xhjin
    * @CreateDate:  2013/10/12
    * @Desc: 页面筛选条件 cookie 记录
    */
    (function () {
        //使用SearchForm中提供的 SearchType SearchValue 组成cookie 筛选条件关键字;
        var key = ($$.SearchForm.SearchType || "").toLowerCase() + $$.SearchForm.SearchValue;
        var destCookie = $$.DestSearchCookie = {
            key: key, cookieName: "Dest_Filter_Search",
            init: function (pContainer, pOutTime) {
                var self = this; if (!pContainer) return;
                this._container = pContainer;
                this._outTime = pOutTime;
                this._inputs = this._container.getElementsByTagName("INPUT");
                if (this._inputs.length < 1) return;
                this.write();
                var b = [];
                b.push(this._inputs[2]);
                if (this._outTime) b.push(this._outTime.getElementsByTagName("INPUT")[2]);
                //b.push(this._inputs[4]);
                b.each(function (o) {
                    $(o).bind("click", function (e) {
                        self.save();
                    });
                });
            },
            getChecked: function (o) {
                if ("checked" in o) return o.checked;
                else !(o.getAttribute("checked") == "checked"); //这句可能会有意外 点击的时候 获取到点击之前的状态 如走这步可能需要取反处理
            },
            setChecked: function (o, checked) {
                checked = checked ? true : false;
                setTimeout(function () {
                    if ("checked" in o) o.checked = checked;
                    else o.setAttribute("checked", checked);
                }, 1);
            },
            getValue: function (o) {
                return o.value == o.getAttribute("data-default") ? "" : o.value;
            },
            setValue: function (o, v) {
                v = (v || v === 0) ? v : o.getAttribute("data-default");
                return o.value = v;
            },
            write: function () {
                var r = this.get(), _inputs = this._inputs; if (!r) return;
                this.setValue(_inputs[0], r.pMin);
                this.setValue(_inputs[1], r.pMax);
                if (this._outTime) {
                    this.setValue(this._outTime.getElementsByTagName("INPUT")[0], r.dMin);
                    this.setValue(this._outTime.getElementsByTagName("INPUT")[1], r.dMax);
                }
                //this.setChecked(_inputs[4], r.dType);
            },
            save: function () {
                var _inputs = this._inputs;
                this.set({
                    key: this.key,
                    pMin: this.getValue(_inputs[0]),
                    pMax: this.getValue(_inputs[1]),
                    dMin: this._outTime ? this.getValue(this._outTime.getElementsByTagName("INPUT")[0]) : "",
                    dMax: this._outTime ? this.getValue(this._outTime.getElementsByTagName("INPUT")[1]) : "",
                    dType:""
                });
            },
            timeSave: function () {
                var _inputs = this._inputs;
                this.set({
                    key: this.key,
                    pMin: this.getValue(_inputs[0]),
                    pMax: this.getValue(_inputs[1]),
                    dMin: "",
                    dMax: "",
                    dType:""
                });
            },
            "get": function () {
                var r = ($.cookie.get(this.cookieName) || "[]"), res = null, key = this.key; if (!r) return res;
                ($.parseJSON(r) || []).each(function (o) {
                    (!res) && o && o.key == key && (res = o);
                });
                return res;
            },
            "set": function (value) {
                var r = $.parseJSON(($.cookie.get(this.cookieName) || "[]")), key = this.key, res = null, n = 4;
                r = r.filter(function (o) {
                    return (o && o.key != key && (n--));
                });
                value && r.push(value);
                $.cookie.set(this.cookieName, "", ($.stringifyJSON(r)), { path: "/" });
            }
        };
        $.ready(function () {
            if ($$.PageConfig.getPageType() != $$.PageConfig['enum'].SEO) {//不是新版的SEO页面 下面一段不走
                return;
            }
            var host = document.domain.toLowerCase();
            var index = host.indexOf("vacations");
            if (index >= 0) {
                host = host.substring(index + 9);
            }
            destCookie.init(document.getElementById("searchFilterContainer"), document.getElementById("JS_Out_Time"));
            $(".search_tab>.search_list").find("a").bind("click", function () {
                destCookie.set(null);
                //对于选项卡 增加 cookie 用于表示新版页面 在ticket(门票)中有用,
                //门票页面是 新旧混合页面，用此cookie来具体呈现内容
                //同时门票页面的任意切换(不包括自身刷新)，都要清空此cookie,(不考虑多页情况，时刻保持cookie清空)
                $.cookie.set("Dest_Search_Come", "", ("dest"), { path: "/", domain: host });
            });
            /*用户关闭价格区间时，清空价格区间的cookie*/
            $("#chosenFilterContainer a").bind("click", function () {
                if ($(this).attr("data-tag") == "price") {
                    var inputDom = document.getElementById("searchFilterContainer").getElementsByTagName("INPUT");
                    inputDom[0].value = "";
                    inputDom[1].value = "";
                    destCookie.save();
                }
                if ($(this).attr("data-tag") == "clear") {
                    destCookie.set(null);
                }
                if ($(this).attr("data-tag") == "time") {
                    destCookie.timeSave();
                }
            });
        });
    })();
    /*
    * @Author: luyi  / qxzhan
    * @CreateDate:  2013/10/14
    * @Desc: 判断是否显示价格日历
   
    (function ($) {
        var defaults = {
            width: 87,
            height: 83,
            bkimg: "rili",
            spacing: 20,
            gap: 5,
            top: 0,
            right: 0,
            left: 3,
            siblingbtn: "#visitResultContainer .product_prise_calendar",
            isOccupying: true
        };
        $.fn.showCalendar = function (options) {
            var settings = $.extend({}, defaults, options),
                that = this,
                paramA = ($("#visitShow #txtFromCity").attr("data-val") != null) ? $("#visitShow #txtFromCity").attr("data-val").split("|")[2] : "",
                paramB = ($("#visitShow #txtToCity").attr("data-val") != null) ? $("#visitShow #txtToCity").attr("data-val").split("|")[2] : "";
            $.jsonp("/DIY/Ajax/IsShowPriceCalendar.ashx?dcityid=" + paramA + "&acityid=" + paramB, {
                onload: function (data) {
                    if (data.errno == 0 && !!data.data.showcalendar) {
                        return that.each(function ($this) {
                            var $siblingbtn = $(settings.siblingbtn),
                                $parent = $siblingbtn.parentNode(),
                                newiFrame = document.createElement("iframe"),
                                calendarAnchor = document.createElement("a"),
                                $firstLi = $this.find("ul.product_list02 li:first"),
                                firstLi = $firstLi[0],
                                firstLiClass = firstLi.className,
                                $newiFrame = $(newiFrame),
                                showCalendar = false,
                                iframeUrl = "/DIY/PriceBoard.aspx?from=" + paramA + "&to=" + paramB;
                            $this.css("position").indexOf("absolute") < 0
                            if ($this.css("position").indexOf("absolute") < 0) {
                                $this.css("position", "relative");
                                $this.css("z-index", "2");
                            }
                            calendarAnchor.setAttribute("href", "###");
                            calendarAnchor.setAttribute("rel", "nofollow");
                            calendarAnchor.className = "btn_blue_middle";
                            calendarAnchor.innerHTML = "低价日历<i></i><b></b>";
                            $(calendarAnchor).insertBefore($('.J_VisitShowMask')) && (showCalendar = true);
                            newiFrame.style.cssText = "position:relative; right:" + settings.right + "px;float:left;border:none;clear:left;width:100%;height:0;";
                            newiFrame.setAttribute("scrolling", "no");
                            newiFrame.setAttribute("frameBorder", "no");
                            newiFrame.setAttribute('border', 0);
                            !newiFrame.getAttribute("src") && newiFrame.setAttribute("src", iframeUrl);
                            firstLi.appendChild(newiFrame);
                            $(calendarAnchor).bind("click", function () {
                                if (!parseInt($newiFrame.css("height"))) {
                                    settings.isOccupying && $newiFrame.css("height", "433px");
                                    firstLi.className = firstLiClass + " product_list_calendar";
                                    calendarAnchor.className = "btn_blue_middle btn_blue_cur";
                                }
                                else {
                                    $newiFrame.css("height", "0");
                                    firstLi.className = firstLiClass;
                                    calendarAnchor.className = "btn_blue_middle";
                                }
                            })
                        })
                    }
                }
            });
        }
        $(".searchresult_left .searchresult_product02:first").showCalendar({ isOccupying: true, siblingbtn: "ul.product_list02>li:first .product_prise_calendar" });
    })(cQuery); */
    /*
    * @Author:    xhjin
    * @CreateDate:  2013/10/14
    * @Desc: 页面起点点击处理
    */
    (function () {
        $.ready(function () {
            if ($$.PageConfig.getPageType() != $$.PageConfig['enum'].SEO) {//不是新版的SEO页面 下面一段不走
                return;
            }
            /*
            * @Author:    xhjin
            * @CreateDate:  2013/10/14
            * @Desc: 增加faq_panel tab选项卡处理
            */
            var $tabPanel = $("#faq_panel");
            var $tAs = $tabPanel.find(".tit_box div a");
            var $tList = $tabPanel.find(".list");
            $tAs.bind("click", function () {
                var t = this.getAttribute("data-type"); $tAs.removeClass("cur");
                $(this).addClass("cur");
                var list = $tabPanel.find(".list");
                for (var len = (list.length - 1) ; len > -1; len--) {
                    item = list[len].style.display = "none";
                }
                list.filter("[data-type='" + t + "']")[0].style.display = "block";
            });
            //CitySelect 是通过script 标签直接引入 可以看成独立的js引入
            var pContainer = document.getElementById("CitySelect");
            //$(pContainer).find("a").each(function(){}).attr("href","javascript:void(0);");
            $(pContainer).find("a").bind("click", function (o) {
                var _target = this, city = _target.getAttribute("data-city");
                if (!city) return;
                //保存cookie
                //保证domain一致，server端才能获取到cookie的值
                //add by xbfeng
                var host = document.domain.toLowerCase();
                var index = host.indexOf("vacations");
                if (index >= 0) {
                    host = host.substring(index + 9);
                }
                $.cookie.set("StartCity_Pkg", "PkgStartCity", city, { path: "/", domain: host, secure: "" });
                if (_target.getAttribute("target") == "_blank") window.open(window.location.href);
                else window.location.reload();
            });
            //$(pContainer).find("a").attr("href","javascript:void(0);").attr("data-startcity","3d");
        });
    })();
    /*
    * @Author:    lu.yi
    * @CreateDate:  2013/11/26
    * @Desc: 底部增加滚动的最新预订
    */
    (function () {
        function newYNotice(pContainer, speed) {
            var _container = pContainer[0];
            var _oWidth, _items = pContainer.find("span");
            var _speed = speed || 50;
            for (var i = 0, l = _items.length; i < l; i++) {
                var _tempNode = _items[i].cloneNode(true);
                _container.appendChild(_tempNode);
                if (i == 0) {
                    _oWidth = _tempNode.offsetLeft - _items[0].offsetLeft;
                }
            }
            function Marquee() {
                if (_oWidth > _container.scrollLeft)
                    _container.scrollLeft++;
                else
                    _container.scrollLeft = 0;
            }
            var MyMar = setInterval(Marquee, _speed);
            //_container.onmouseover=function() {clearInterval(MyMar);} 
            //_container.onmouseout=function() {MyMar=setInterval(Marquee,speed);} 
        }

        !!$(".booking_now>div").length && newYNotice($(".booking_now>div"), 50);
    })();
    /*
    * @Author qxzhan
    * @CreateDate  2013/12/24
    * @Desc 浏览记录
    */
    (function () {
        /*模板方法扩展*/
        var borderStyle = function () {
            Handlebars.registerHelper('plus', function (number, quantity) {
                if (number == quantity - 1) {
                    return "class=\"border_none\"";
                }
            });
        },
          browserHistory = function () {
              var _jsonUrl = "/Package-Booking-VacationsOnlineSiteUI/Handler2/ProductHistory.ashx",
                  _tpl = '<h2 class="sr_r_infor"><span>浏览记录</span></h2>\
                   <ul class="sr_product">\
                     {{#each json}}\
                     <li {{#plus @index ../len}}{{/plus}}>\
                      <a target="_blank" href="{{ProductUrl}}{{CtmTxt}}">{{ProductName}}</a>\
                      <span class="prise">{{#if MinPrice}}<dfn>¥</dfn><strong>{{MinPrice}}</strong>起{{else}}实时计价{{/if}}</span>\
                     </li>\
                     {{/each}}\
                    </ul>';
              $.ajax(_jsonUrl, {
                  onsuccess: function (data) {
                      var _dataJson = $.parseJSON(data.responseText);
                      if (_dataJson.length > 0) {
                          var datas = {
                              len: _dataJson.length,
                              json: _dataJson
                          }
                          $("#js_browser_history").ohtml(Handlebars.compile(_tpl)(datas));
                      }
                  }
              });
          },
          showImage = function () {
              cQuery.mod.load('lazyLoad', '1.0', function () {
                  cQuery("#searchResultContainer").regMod('lazyLoad', '1.0', {
                      attribute: "data-original",
                      loadingImage: "",
                      placeholder: "http://pic.c-ctrip.com/vacation_v2/group_travel/place_hold_m.png"
                  })
              })
          }
        borderStyle();
        browserHistory();
        showImage();
    })();
    // /*
    //  * @Author qxzhan
    //  * @CreateDate  2014/02/19
    //  * @Desc SEO优化  (需求变更 这里改成直接在页面中输出onclick的方式)
    //  */
    // (function(){
    //    var resultSeo = function(pElement){
    //     if(!pElement || !pElement.length) return;
    //     for(var i = 0, len = pElement.length; i<len;i++){
    //        if(!$(pElement[i]) || $(pElement[i]).find("a").length <= 0) continue;
    //         $(pElement[i]).find("a").bind("mousedown",function(){
    //          if($(this).attr("data-src")) $(this).attr("href",$(this).attr("data-src"));
    //        })
    //     }
    //   }
    //   resultSeo(["#chosenFilterContainer","#searchResultContainer","#searchFilterContainer","#JsSeoSearchTab","#JsSeoSearchresultSide"]);
    //   })();
    /*
    * @Author qxzhan
    * @CreateDate  2014/03/12
    * @Desc 返现
    */
    (function () {
        var parent = document.createElement("div"),
          element = document.createElement("div"),
          text = document.createElement("p"),
          indexMultiModConfig = {
              jmp: "1.0"
          };
        parent.setAttribute("id", "jmp_alert");
        parent.style.display = "none";
        element.setAttribute("class", "jmp_bd");
        text.appendChild(document.createTextNode("${txt}"));
        element.appendChild(text);
        parent.appendChild(element);
        $("body").append(parent);
        $.mod.multiLoad(indexMultiModConfig, function () {
            $(document).regMod('jmp', '1.0', {
            });
        });
    })();

    /* 
    * @Author k.liu 
    * @CreateDate 2014/03/21 
    * @Desc 异步获取促销信息 
    */
    (function () {
        if (GV.app.searchResult) {
            var product_IdName = GV.app.searchResult;
            if (product_IdName.data.promoIds) {
                var ajaxURL = window.$$.Handler.GetPromoInfo + "?ProductIDs=" + GV.app.searchResult.data.promoIds + "&SaleCity=" + window.$$.StartCity;
                $.ajax(ajaxURL, {
                    onsuccess: function (data) {
                        var promotionInfos = $.parseJSON(data.responseText);
                        if (promotionInfos.length > 0) {
                            for (var i = 0; i < promotionInfos.length; i++) {
                                var html = '<span title="' + promotionInfos[i].PromotionInfo + '">' + promotionInfos[i].PromotionInfo + '</span>';
                                $('div[data-promotionid="' + promotionInfos[i].PID + '"]').css({ "display": "block" }).html(html);
                            }
                        }
                    }
                });
            }
        }
    })();


    // 签证产品异步获取价格说明字段JS
    (function () {
        if (GV.app.searchResult) {
            if (GV.app.searchResult.data.allProductIds) {
                var ajaxURL = window.$$.Handler.GetPriceRemark + "?ProductIDs=" + GV.app.searchResult.data.allProductIds + "&SaleCity=" + window.$$.StartCity;
                $.ajax(ajaxURL, {
                    onsuccess: function (data) {
                        var remarkJson = $.parseJSON(data.responseText);
                        if (remarkJson.length > 0) {
                            for (var i = 0; i < remarkJson.length; i++) {
                                $('div[data-priceremarkid="' + remarkJson[i].PID + '"]').css({ "display": "block" }).html("价格构成：" + remarkJson[i].Remark);
                            }
                        }
                    }
                });
            }
        }
    })();


    /* 
    * @Author guo.w
    * @CreateDate 2014/04/02 
    * @Desc 只要关键字包含马尔代夫展开包含景区 
    */
    (function () {
        if ($('#SearchText').length > 0 && $('#SearchText')[0].value == '马尔代夫') {
            var search_cate = $('.search_cate');
            for (i = 0, len = search_cate.length; i < len; i++) {
                var search_cate_item = $(search_cate[i]);
                if (!search_cate_item.hasClass('hidden') && search_cate_item.find('.b').html().replace(/(^\s*)|(\s*$)/g, "") == "途经景区") {
                    var unfold_row = search_cate_item.find('.cate_content');
                    var unfold_row_item = unfold_row.find('.show_unfold')[0];
                    UI.Dom.removeClass(unfold_row[0], "search_height");
                    unfold_row_item && (unfold_row_item.value = "收起") && (unfold_row_item.className = "show_fold");
                }
            }
        }
    })();
    /* 
    * @Author k.liu 
    * @CreateDate 2014/04/29 
    * @Desc 高级搜索价格框正则判断 
    */
    (function () {
        var price_Test=$('.priceTest');
        $(price_Test).bind('keyup', function () {
            var test = /^\d+$/.test(this.value);
            if (!test) {
                this.value = '';
            }
        });
    })();
})


