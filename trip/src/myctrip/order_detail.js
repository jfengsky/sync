/**
 * @file 客户自助服务<br />
 * 订单信息 (打印订单 | 设置同行订单 | 取消订单)<br />
 * 修改联系人<br />
 * 修改旅客信息<br />
 * 修改发票<br />
 * 滚动监听(tab滚动)<br />
 * @namespace vacation.myctrip
 * @version 1.0.0.20130120
 * @author yuan<tyuan@ctrip.com>
 */
define(function (require, exports, module) {
    var $ = require("jquery"),
        _ = require("underscore"),
        addressInit = require('../public/address');
    require("../Modules/scrollspy");
    // 旅客
    require('./order_detail_passenger');

    var popTemplate = Handlebars.compile(require('tpl/myctrip/order_detail_pop.html.js')); //订单详情弹窗模板
    var DataOrder = GV.app.detail //订单详情接口

    var address = require('./order_dispatching');

    // 取消订单弹出层表单验证
    var cancelFormCheck = false;
    var formCheck = {
        message: {
            emptyAddress: '请填写配送地址',
            errAddress: '',
            emptyName: '请填写收件人姓名',
            // errName: '中文姓名只能包含汉字、字母和连字符，请检查',
            emptyPhone: '请填写收件人联系电话',
            errPhone: '您填写的手机号码有误，请重新填写',
            errpsData: '请选择配送时间',
            errpsTime: '请指定配送时段',
            emptyEditName: '请填写联系人姓名',
            emptyEditPhone: '请填写联系人手机号码',
            emptyBak: '请填写备注信息',
            errdeliverTime: '只能预约在24小时以后配送'
        },
        regexp: {
            phoneCheck: /^0?1[3458]\d{9}$/,
            chNameCheck: /^[\u4e00-\u9fa5a-zA-Z-]+$/
        }
    }

   
    var qbo = '';
    if(DataOrder.data.qb_o){
        qbo = DataOrder.data.qb_o;
    }

    var orderDetail = {
        returnValidate: cQuery(document).regMod('validate', '1.1'),
        //错误提示信息
        cqRegValid: function (pStr, pData) {
            cQuery.mod.load('validate', '1.1', function () {
                orderDetail.returnValidate.method("show", {
                    $obj: pStr,
                    data: pData,
                    removeErrorClass: true,
                    isScroll: false
                });
            });
        },
        //提示注册
        regJmp: function () {
            cQuery.mod.load('jmp', '1.0', function () {
                var ins = cQuery(document).regMod('jmp', '1.0', {
                    cc: 2
                });
            })
        },
        Reg: {
            hasCnChar: function (str) {
                return /[\u0100-\uffff]/.test(str);
            },
            isEnName: function (str) {
                return /^[^\/]+\/[^\/]+$/.test(str);
            }
        },

        /**
         * 检查是否大于70岁
         * @param  {String} _birthday   出生日期
         * @param  {String} _departDate 出发日期
         * @return {Boolean}
         */
        _checkAge: function(_birthday, _departDate){
            var birArray = _birthday.split('-'),
                depArray = _departDate.split('-');
            if ( depArray[0] - birArray[0] > 70 || (depArray[0] - birArray[0] === 69) && (depArray[1] - birArray[1] >= 1)){
              return true;
            };
            return false;
        },
        init: function () {
            $('body').append(popTemplate);
            orderDetail.regJmp();
            orderDetail.invoice().init();
            orderDetail.contact().init();
            orderDetail.orderInfo().init();
            orderDetail.orderOtherUi();
            orderDetail.scrollspyEvent().init();

            /*
             * 显示70岁以上健康证明提示话语
             */
            
            // TODO 获取联系人生日或省份证数组
            
            var memBirthday = [],
                departDateArr;
            if (DataOrder.data.departDate){
                departDateArr = DataOrder.data.departDate.split('-');
                $.each($(".J_tplbirthday"), function(_index, _item){
                  var tempNum = $(_item).text();
                  if (tempNum) {
                    memBirthday.push({"key":$(_item), "value":tempNum})
                  }
                });
                $.each(memBirthday, function(_index, _item){
                  var birthdayArr = _item.value.split('-');
                  //if( (departDateArr[0] - birthdayArr[0] > 70) || ((departDateArr[0] - birthdayArr[0] === 69) && (departDateArr[1] - birthdayArr[1] >= 1)) ){
                  if ( departDateArr[0] - birthdayArr[0] >= 70 ) {
                      $(_item.key).prepend('<span style="float:right;color:#999">出行人年龄大于70周岁，考虑出行安全，请您打印并签署<a href="http://pages.ctrip.com/tour/word08/141.doc">《健康申请表》</a><span class="J_uptips" style="display:none">后拍照上传</span></span>');
                  }
                });

              /**
               * 显示用户资料上传按钮
               * IsHealthStuffNeeded==true&& IsVisaStuffNeeded==true,显示红框中的button，并且button的value是查看/上传签证材料,
               * 当IsHealthStuffNeeded==false&& IsVisaStuffNeeded==true,显示红框中的button，并且button的value是查看/上传签证材料
               * 当IsHealthStuffNeeded==true&& IsVisaStuffNeeded==false，显示红框中的button,并且button的value是查看/上传材料
               * 当IsHealthStuffNeeded==false&& IsVisaStuffNeeded==false,不显示红框中的button
               *
               */
              var healsn = GV.app.detail.data.IsHealthStuffNeeded,
                visasn = GV.app.detail.data.IsVisaStuffNeeded,
                uploadUrl = '../OrderDetailManage/Materials.aspx?orderid=' + GV.app.detail.data.OrderId + '&qb_o=' + qbo;
              $('.J_infoup').attr('href', uploadUrl);
              if( (healsn && visasn) || (!healsn && visasn) ){
                $('.J_infoup').html('查看/上传签证材料');
                $('.J_uptips').show();
              } else if ( healsn && !visasn ) {
                $('.J_infoup').html('查看/上传材料');
                $('.J_uptips').show();
              } else {
                $('.J_infoup').remove();
              }
              $('.J_infoup').css('display','block');
            };
            // $.each($(".J_tplbirthday"), function(_index, _item){
            //   var tempNum = $(_item).text();
            //   if (tempNum) {
            //     memBirthday.push({"key":$(_item), "value":tempNum})
            //   }
            // });
            // $.each(memBirthday, function(_index, _item){
            //   var birthdayArr = _item.value.split('-');
            //   if( departDateArr[0] - birthdayArr[0] > 70 || (departDateArr[0] - birthdayArr[0] === 69) && (departDateArr[1] - birthdayArr[1] >= 1) ){
            //     _item.isOld = true
            //   } else {
            //     _item.isOld = false
            //   }
            // });
            // console.log(memBirthday);
            // if ( this._checkAge($('#J_tplbirthday').text(), DataOrder.data.departDate) ){
            //     $('#J_tplbirthday').prepend('<span style="float:right;color:#999">出行人年龄大于70周岁，考虑出行安全，请您打印并签署<a href="">《健康申请表》</a>后拍照上传</span>');
            // }
        },
        //订单
        orderInfo: function () {
            var printOrderBtn = $('.js_printOrder_set'),
                alongOrderBtn = $('.js_alongOrder_set'),
                cancelOrderBtn = $('.js_cancelOrder_set'),
                popCloseBtn = $('.js_pop_close'),
                modifyJson = DataOrder.data.StatusJson;
            return {
                init: function () {
                    var self = this;
                    self.setOrderAlong();

                    self.cancelOrder();
                    self.orderService();

                    if (DataOrder.data.Action === 'edit') {
                        this._showModifyPop();
                    };

                    self.modifyOrder();

                    // 修改信息按钮操作
                    self.showModifyBtn();

                    // 判断是否弹出取消订单层
                    if (DataOrder.data.Action === 'cancel') {
                        $('#BtnCancelOrder').click();
                    }

                    // 判断是否显示配送信息
                    if (DataOrder.data.DistributionJson && DataOrder.data.DistributionJson.Way) {
                        $('#orderDeliver').next().show();
                        self._orderDetailArea();

                        $.each($('#js_order_nav a'), function (index, item) {
                            if ($(item).attr('href') === '#orderDeliver') {
                                $(item).show();
                            }
                        })
                    } else {
                        $('#orderDeliver').next().remove();
                        $('#orderDeliver').remove();
                    }

                    self.printOrder();

                    //弹窗关闭
                    popCloseBtn.on('click', function () {
                        cQuery('.order_masking').unmask();
                    });
                },
                //打印订单
                printOrder: function () {
                    var printPop = $('.order_print'),
                        printPopC = cQuery('.order_print');
                    submitBtn = $('.order_print').find('input[type=button]');
                    //如果没有锚点时相应的打印项隐藏
                    var anchorDom = $('.order_box').find('.base_anchor'),
                        printListDom = $('.order_print').find('li'),
                        anchorArry = [];
                    _.each(anchorDom, function (index, i) {
                        var id = $(index).attr('id');
                        anchorArry.push(id);
                    });
                    _.each(printListDom, function (index, i) {
                        var dataRole = $(index).data('role');
                        if (_.indexOf(anchorArry, dataRole) > -1) {
                            $(index).show();
                        } else {
                            $(index).remove();
                        }
                    });
                    printOrderBtn.on('click', function () {
                        printPop.find('input[type=checkbox]').attr("checked", 'true');
                        printPopC.mask();
                    });
                    submitBtn.on('click', function () {
                        var checkBox = printPop.find('input[type=checkbox]:checked'),
                            checkNumList = [];
                        _.each(checkBox, function (index, i) {
                            checkNumList.push($(index).val());
                        });
                        if (checkBox.length > 0) {
                            window.open("PrintOrder.aspx?OrderID=" + DataOrder.data.OrderId + "&ShowType=" + checkNumList.join(",") + "&qb_o=" + qbo);
                            printPopC.unmask();
                        }
                    });
                },
                //设置同行订单
                setOrderAlong: function () {
                    var submitBtn = $('.order_together').find('.btn_blue_middle'),
                        inputDom = cQuery('input[name=along_order_num]'),
                        alongPop = cQuery('.order_together');
                    alongOrderBtn.on('click', function () {
                        alongPop.mask();
                        inputDom.value('');
                    });
                    submitBtn.on('click', function () {
                        var orderIdLst = inputDom.value().replace(/\s+/g, "").split(",");
                        var orderIdLstInt = [];
                        _.each(orderIdLst, function (index, i) {
                            orderIdLstInt.push(parseInt(orderIdLst[i]));
                        });
                        var data = {
                            "OrderId": DataOrder.data.OrderId,
                            "SegmentOrderIdLst": orderIdLstInt
                        };
                        if (inputDom.value() == '') {
                            orderDetail.cqRegValid(inputDom, '请输入您要设置的同行订单号');
                            return false;
                        }
                        if (!_.every(orderIdLst, function (e1) {
                            return /^[0-9]{1,10}$/.test(e1);
                        })) {
                            orderDetail.cqRegValid(inputDom, "请输入有效的订单号,多个订单号时中间请用英文逗号隔开");
                            return false;
                        } else {
                            $.ajax({
                                url: DataOrder.api.UpdateOrderUrl,
                                data: {
                                    RequestData: cQuery.stringifyJSON(data),
                                    "qb_o": qbo
                                },
                                type: 'POST',
                                success: function (re) {
                                    json = $.parseJSON(re);
                                    if (json.errno == 0) {
                                        alongPop.unmask();
                                        cQuery('#js_order_success').mask();
                                        $('.js_order_success_txt').html('设置同行订单成功');
                                        $('.js_order_success_title').html('设置同行订单');
                                        setTimeout(function () {
                                            cQuery('#js_order_success').unmask()
                                        }, 3000);
                                    } else {
                                        alongPop.unmask();
                                        cQuery('#js_pop_error').mask();
                                        $('#js_pop_errormsg').html(json.errmsg);

                                    }
                                },
                                error: function () {
                                    alert('网络出错，请重试');
                                }
                            });
                        }
                    });
                },

                /**
                * 弹出修改选择
                * @param {[type]} data [description]
                */
                _setPopModify: function (data) {
                    var html = '';

                    function disableShow(_bool) {
                        var dis = '';
                        if (!_bool) {
                            dis = 'disabled';
                        }
                        return dis;
                    };
                    html += '<li><label><input type="radio" name="modify" ' + disableShow(data.CanEditContact) + ' data-id="orderContacts">修改联系人信息</label></li>';
                    html += '<li><label><input type="radio" name="modify" data-id="J_orderTourist" ' + disableShow(data.CanAddOrRemoveClient) + ' />增加或减少出行人</label></li>';
                    html += '<li><label><input type="radio" name="modify" data-id="orderTourist" ' + disableShow(data.CanEditClient) + ' />修改旅客信息</label></li>';
                    html += '<li><label><input type="radio" name="modify" data-id="J_bags" ' + disableShow(data.CanAddOrRemoveOption) + ' />增加或减少附加产品</label></li>';
                    html += '<li><label><input type="radio" name="modify" data-id="orderInvoice" ' + disableShow(data.CanEditInvoice) + ' />修改发票信息</label></li>';
                    html += '<li><label><input type="radio" name="modify" data-id="J_otherModify" ' + disableShow(data.CanEditOther) + ' />其它修改</label></li>';
                    $('#J_modifycnt').html(html);
                },
                /**
                * 获取需要修改raido的选项标记
                * @return {String} [description]
                */
                _getModifyRadio: function () {
                    var radioDataId = $('#js_order_modify input[type=radio]').filter(':checked').attr('data-id');

                    return radioDataId;
                },
                _editCheck: function () {
                    var editName = cQuery('#J_popeditname'),
                        editMobile = cQuery('#J_popeditmobile');
                    if (!editName.value()) {
                        orderDetail.cqRegValid(editName, formCheck.message.emptyName);
                        return false;
                    } else if (!formCheck.regexp.chNameCheck.test(editName.value())) {
                        orderDetail.cqRegValid(editName, "中文姓名只能包含汉字、字母和连字符，请检查");
                        return false;
                    };
                    if (!editMobile.value()) {
                        orderDetail.cqRegValid(editMobile, formCheck.message.emptyPhone);
                        return false;
                    } else if (!formCheck.regexp.phoneCheck.test(editMobile.value())) {
                        orderDetail.cqRegValid(editMobile, formCheck.message.errPhone);
                        return false;
                    };
                    return true;
                },

                /**
                * 备注的表单验证
                * @return {[type]} [description]
                */
                _bakCheck: function () {
                    var bakarea = cQuery('#J_modifyarea');
                    if (!bakarea.value()) {
                        orderDetail.cqRegValid(bakarea, formCheck.message.emptyBak);
                        return false;
                    };
                    return true;
                },

                /**
                * 修改信息弹层请求操作
                * @param  {Object} _oldDialog 旧弹出层
                * @param  {Object} _newDialog 新弹出层
                * @param  {[type]} _button    点击的按钮
                * @param  {[type]} _ApplyType 弹层类型
                * @param  {[type]} _bool      是否显示bak区块
                * @return undefined
                */
                _modifyAffirm: function (_oldDialog, _newDialog, _button, _ApplyType, _bool) {
                    var self = this,
                        radioId;

                    // 自动填充联系人和电话表单
                    $('#J_popeditname').val(DataOrder.data.ContactCtrip.name);
                    $('#J_popeditmobile').val(DataOrder.data.ContactCtrip.mob);

                    switch (_ApplyType) {
                        case 1:
                            radioId = 'CanAddOrRemoveClient';
                            break;
                        case 2:
                            radioId = 'CanAddOrRemoveOption';
                            break;
                        case 3:
                            radioId = 'CanEditOther';
                            break;
                    }

                    $(document).undelegate(_button, 'click');
                    $(document).delegate(_button, 'click', function () {
                        var bakVal = '',
                            bakCheckInfo = false;   // 备注验证
                        if (_bool) {
                            bakCheckInfo = self._bakCheck();
                            bakVal = $('#J_modifyarea').val()

                        } else {
                            bakCheckInfo = true;
                        };

                        if (self._editCheck() && bakCheckInfo) {

                            var data = {
                                "OrderId": DataOrder.data.OrderId,
                                "OtherApply": {
                                    "ApplyType": _ApplyType,
                                    "ContactName": $('#J_popeditname').val(),
                                    "ContactTel": $('#J_popeditmobile').val(),
                                    "Remark": bakVal
                                }
                            };

                            $.ajax({
                                url: DataOrder.api.UpdateOrderUrl,
                                data: {
                                    RequestData: cQuery.stringifyJSON(data),
                                    "qb_o": qbo
                                },
                                type: 'POST',
                                success: function (re) {
                                    var json = $.parseJSON(re);
                                    if (json.errno === 0) {
                                        if (DataOrder.data.Action === 'cancel') {
                                            location.href = json.errmsg;
                                        } else {
                                            // 如果返回成功
                                            _oldDialog.unmask();
                                            _newDialog.mask();

                                            // 相应的radio disabled掉
                                            modifyJson[radioId] = false;

                                            setTimeout(function () {
                                                _newDialog.unmask();
                                            }, 3000);
                                        }
                                    } else if (json.errno === 1) {
                                        _oldDialog.unmask();
                                        cQuery('#js_pop_error').mask();
                                        $('#js_pop_errormsg').html(json.errmsg);
                                    }
                                },
                                error: function () {
                                    alert('网络出错，请重试');
                                }
                            });



                        }



                    })
                },

                /**
                * 配送表单验证
                * @return {Boolean}
                */
                _dispatchCheck: function () {
                    var inputAddressDom = cQuery('#J_dispatchaddress'),
                        inputNameDom = cQuery('#J_dphcontact_name'),
                        inputPhoneDom = cQuery('#J_dph_phone'),
                        inputDate = cQuery('#J_time'),
                        inputTime = cQuery('#J_pstime');
                    /*
                    * TODO 表单验证
                    */
                    // 地址验证
                    if (!inputAddressDom.value()) {
                        orderDetail.cqRegValid(inputAddressDom, formCheck.message.emptyAddress);
                        return false;
                    };

                    // 收件人验证
                    if (!inputNameDom.value()) {
                        orderDetail.cqRegValid(inputNameDom, formCheck.message.emptyName);
                        return false;
                    };

                    // 收件人电话验证
                    if (!inputPhoneDom.value()) {
                        orderDetail.cqRegValid(inputPhoneDom, formCheck.message.emptyPhone);
                        return false;
                    } else if (!formCheck.regexp.phoneCheck.test(inputPhoneDom.value())) {
                        orderDetail.cqRegValid(inputPhoneDom, formCheck.message.errPhone);
                        return false;
                    };


                    // 配送时间验证 J_time
                    if (!inputDate.value()) {
                        orderDetail.cqRegValid(inputDate, formCheck.message.errpsData);
                        return false;
                    };

                    // 配送时段验证
                    if (!inputTime.value()) {
                        orderDetail.cqRegValid(inputTime, formCheck.message.errpsTime);
                        return false;
                    } else if ($('#J_detimerr').val() == 'false') {
                        orderDetail.cqRegValid(inputTime, formCheck.message.errdeliverTime);
                        return false;
                    };
                    return true;
                },

                /**
                * 送票范围弹出层
                * @return {[type]} [description]
                */
                _deliverArea: function () {
                    cQuery('#js_deliverarea').mask();
                },

                /**
                * 返回区的id
                * @param  {String} str 区的字符串
                * @return {Number}     区的id
                */
                _areaId: function (str) {
                    var areaId;
                    $.each($('#J_area option'), function (index, item) {
                        var tempArea = $(item).attr('value');
                        if (str === tempArea || (tempArea.indexOf(str) > -1)) {
                            areaId = $(item).attr('data-id') - 0;
                        }

                    });
                    return areaId;
                },
                /**
                * 预约配送操作
                * @return {[type]} [description]
                */
                dispatchController: function () {
                    var self = this,
                        modifyButton = $('#J_orderdelivery'), // 预约配送按钮
                        modifySave = $('#J_deliverysave'), // 保存配送按钮
                        modifyCancel = $('#J_deliverycancel'), // 取消预约配送按钮
                        dispatchCnt = $('#js_order_delivery'), // 配送view容器
                        eidtDispatchCnt = $('#js_eidtorder_delivery'), // 配送修改容器
                        psAddress = new address();



                    // 点击预约配送操作
                    modifyButton.bind('click', function () {

                        var addCnt = $("#J_psperson_bill"),
                            disWhere,
                            disArea,
                            disAddress;

                        // TODO 弹出送票范围说明
                        self._deliverArea();

                        $(this).hide();
                        modifySave.show();
                        modifyCancel.show();
                        dispatchCnt.hide();
                        eidtDispatchCnt.show();

                        if (DataOrder.data.DistributionJson.Where) {
                            disWhere = DataOrder.data.DistributionJson.Where.split(')');
                            if (disWhere[1]) {
                                disArea = disWhere[1].slice(1);
                                psAddress.init(self._areaId(disArea));
                                disAddress = DataOrder.data.DistributionJson.Where.slice(disArea.length + 6);
                                $('#J_dispatchaddress').val(disAddress);
                                $.each($('#J_area option'), function (index, item) {
                                    if ($(item).attr('value') === disArea) {
                                        $(item).attr("selected", true);
                                    }
                                });
                            } else {
                                psAddress.init(17);
                            }
                            // disAddress = disWhere.slice(1).join('');
                        } else {
                            psAddress.init(17); // 默认黄浦区
                        }

                        // 从变量里拿数据
                        $('#J_dph_phone').val(DataOrder.data.ContactCtrip.mob);

                        $('#J_dphcontact_name').val(DataOrder.data.ContactCtrip.name);

                        // 异步获取可选配送地址
                        $.ajax({
                            url: DataOrder.api.DeliveryAddressUrl,
                            type: 'get',
                            dataType: 'json',
                            success: function (data) {
                                var html = '',
                                firstAddress;
                                if (!data.errno) {
                                    $.each(data.data.MyEMSAddress, function (index, item) {
                                        html += '<a href="javascript:void(0)">' + item.Address + '</a>';
                                    });
                                    $('#J_comAddress').html(html);
                                }
                                // 自动填充第一个地址到表单
                                // firstAddress = $($('#J_comAddress a')[0]).text();
                                // if(firstAddress){
                                //     $('#J_dispatchaddress').val(firstAddress);
                                // }
                            }

                        });

                        // $(document).delegate('#J_pstime','blur',function(){
                        //     $('#J_search_zipcode').hide();
                        // });

                        // 配送地址操作
                        $(document).delegate('#J_dispatchaddress', 'focus', function () {
                            if ($('#J_comAddress a').length > 0) {
                                addCnt.show();
                            }
                        });

                        // 选择配送地址
                        $('#J_psperson_bill').delegate('a', 'click', function () {
                            $('#J_dispatchaddress').val($(this).text());
                            addCnt.hide();
                        });

                        $(document).delegate('#J_dispatchaddress', 'blur', function () {
                            addCnt.hide();
                        });

                        $(document).delegate('#J_psperson_bill', 'mouseenter mouseleave', function (ev) {
                            if (ev.type === 'mouseenter') {
                                $(document).undelegate('#J_dispatchaddress', 'blur');
                            };
                            if (ev.type === 'mouseleave') {
                                $(document).delegate('#J_dispatchaddress', 'blur', function () {
                                    addCnt.hide();
                                });
                            }
                        })

                        $(document).delegate('#J_am,#J_pm', 'click', function () {
                            var str = $(this).text();
                            if (str === '不配送') {
                                return;
                            }
                            $('#J_pstime').val(str);
                            $('#J_search_zipcode').hide();
                        })

                        $(document).delegate('#J_search_zipcode', 'mouseenter mouseleave', function (ev) {
                            if (ev.type === 'mouseenter') {
                                $(document).undelegate('#J_pstime', 'blur');
                            };
                            if (ev.type === 'mouseleave') {
                                $(document).delegate('#J_pstime', 'blur', function () {
                                    $('#J_search_zipcode').hide();
                                });

                            }
                        })


                        $(document).undelegate('#J_area');
                        $(document).delegate('#J_area', 'change', function () {
                            var area = $(this).val();
                            $('#J_pstime').val('');
                            psAddress.init(self._areaId(area));
                        });

                    });

                    // 取消预约配送操作
                    modifyCancel.bind('click', function () {
                        modifyButton.show();
                        modifySave.hide();
                        modifyCancel.hide();
                        dispatchCnt.show();
                        eidtDispatchCnt.hide();

                    })
                    // 保存预约配送操作
                    modifySave.bind('click', function () {
                        if (self._dispatchCheck()) {
                            var data = {
                                "OrderId": DataOrder.data.OrderId,
                                "DeliverInfo": {
                                    "CityID": 2,    // 上海默认为2
                                    "CantonID": $('#J_area').find('option:selected').attr('data-id'),
                                    "LinkMan": $('#J_dphcontact_name').val(),
                                    "Address": $('#J_dispatchaddress').val(),
                                    "PostCode": '',
                                    "Mobile": $('#J_dph_phone').val(),
                                    "Tel": '',
                                    "DeliveryDate": $('#J_time').val(),
                                    "DeliveryTime": $('#J_pstime').val()
                                }
                            };

                            $.ajax({
                                url: DataOrder.api.UpdateOrderUrl,
                                data: {
                                    RequestData: cQuery.stringifyJSON(data),
                                    "qb_o": qbo
                                },
                                type: 'POST',
                                success: function (re) {
                                    // 根据action是不是等于cancel来判断这次操作的来源：等于cancel 则操作来自订单列表页，订单列表页的链接就是http://my.ctrip.com/Home/Order/PkgOrderList.aspx
                                    var json = $.parseJSON(re);
                                    if (json.errno === 0) {
                                        // 弹出修改成功提示层 3秒钟后刷新页面
                                        cQuery('#js_order_success').mask();
                                        $('.js_order_success_txt').closest('strong').html('您的申请已提交，审核通过后直接为您安排配送，谢谢。');
                                        setTimeout(function () {
                                            window.location.reload();
                                        }, 3000);
                                        // window.location.reload();
                                        // if(DataOrder.data.Action === 'cancel'){
                                        //     location.href = json.errmsg;
                                        // } else {
                                        //     // 如果返回成功
                                        //     $('#js_eidtorder_delivery').hide();
                                        //     $('#js_order_delivery').show();
                                        //     $('#J_bk_address').text($('#J_dispatchaddress').val());
                                        //     $('#J_bk_member').text($('#J_dphcontact_name').val());
                                        //     $('#J_bk_mobile').text($('#J_dph_phone').val());
                                        //     $('#J_bk_time').text($('#J_time').val() + ' ' + $('#J_pstime').val())

                                        //     modifySave.remove();
                                        //     modifyCancel.remove();
                                        // };

                                    } else if (json.errno === 1) {
                                        cQuery('#js_pop_error').mask();
                                        $('#js_pop_errormsg').html(json.errmsg);
                                    }
                                },
                                error: function () {
                                    alert('网络出错，请重试');
                                }
                            });

                        }
                    })
                },
                /**
                * 初始化城市地区id
                * @return {[type]} [description]
                */
                _CantonID: function () {
                    var catonData = DataOrder.data.CantonJson,
                        tpl = '';
                    $.each(catonData, function (index, item) {
                        var tempCatonName = item.Name.replace(/(\*|NO|5)$/, ''),
                            tempCatonId = item.Xid;
                        tpl += '<option value="' + tempCatonName + '" data-id="' + tempCatonId + '">' + tempCatonName + '</option>';
                    });
                    return tpl;
                },

                /**
                * 配送区块显示
                * 有值写入值，无值隐藏整个区块
                * @return {[type]} [description]
                */
                _trShow: function (_id, _value) {
                    if (_value) {
                        $(_id).html(_value).closest('tr').show();
                    } else {
                        $(_id).closest('tr').hide();
                    }
                },

                /**
                * 配送信息
                * @return {[type]} [description]
                */
                _orderDetailArea: function () {
                    var canDelivery = DataOrder.data.StatusJson.CanDelivery,
                        deliveryButtons = '',
                        cantonID = this._CantonID();
                    if (canDelivery) {
                        deliveryButtons = '<input name="" type="button" id="J_orderdelivery" class="btn_blue" value="预约配送">' +
                            '<input type="button" class="btn_blue" value="保存配送时间" style="display:none" id="J_deliverysave">' +
                            '<input type="button" value="取消" class="btn_white" style="display:none" id="J_deliverycancel">';
                    };
                    // 如果Way这个值为空，则不显示预约配送这块html
                    var str = '<div class="order_mod">' +
                                '<div class="mod_side">' + deliveryButtons +
                                '</div>' +
                                '<div class="mod_main">' +
                                    '<table class="crosswise_tb" width="100%" id="js_order_delivery">' +
                                        '<tr>' +
                                            '<th style="width: 180px;">配送方式</th>' +
                                            '<td id="J_bk_way"></td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<th>送票地址</th>' +
                                            '<td id="J_bk_address"></td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<th>收件人</th>' +
                                            '<td id="J_bk_member"></td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<th>联系电话</th>' +
                                            '<td id="J_bk_mobile"></td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<th>配送费用</th>' +
                                            '<td id="J_bk_pay"></td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<th>配送时间</th>' +
                                            '<td id="J_bk_time"></td>' +
                                        '</tr>' +
                                    '</table>' +
                                    '<div id="js_eidtorder_delivery" style="display:none">' +
                                    '<p class="order_deliveryinfo">配送费<dfn>&yen;10</dfn>起，具体金额以预订员确认为准。&nbsp;&nbsp;<a href="/Booking/OrderDetailManage/DeliveryNote.aspx" target="_blank">送票范围说明</a></p>' +
                                    '<table class="crosswise_tb" width="100%">' +
                                        '<tr>' +
                                            '<th style="width:180px">配送城市</th>' +
                                            '<td>上海</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<th>配送地址</th>' +
                                            '<td>' +
                                                '<div id="J_pathaddress"></div>' +
                                                '<select name="" id="J_area" class="input_deliselect" style="width:116px">' + cantonID +
                    // '<option value="黄浦区">黄浦区</option><option value="徐汇区">徐汇区</option><option value="长宁区">长宁区</option><option value="静安区">静安区</option><option value="普陀区">普陀区</option><option value="闸北区">闸北区</option><option value="虹口区">虹口区</option><option value="杨浦区">杨浦区</option><option value="闵行区">闵行区</option><option value="宝山区">宝山区</option><option value="嘉定区">嘉定区</option><option value="浦东新区">浦东新区</option><option value="金山区">金山区</option><option value="松江区">松江区</option><option value="青浦区">青浦区</option><option value="奉贤区">奉贤区</option><option value="崇明县">崇明县</option>' +
                                                '</select>' +
                                                ' <input type="text" class="input_text input_delivery" id="J_dispatchaddress">' +
                                                '<div style="position:relative">' +
                                                '<div class="person_bill" id="J_psperson_bill" style="position:absolute;left:120px;top:-2px;display:none">' +
                                                    '<p>常用地址</p>' +
                                                    '<div id="J_comAddress"></div>' +
                                                '</div>' +
                                                '</div>' +
                                            '</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<th>收件人</th>' +
                                            '<td><input type="text" id="J_dphcontact_name" class="input_text"></td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<th>联系电话</th>' +
                                            '<td><input type="text" class="input_text" id="J_dph_phone"></td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<th>配送时间</th>' +
                                            '<td>' +
                                                '<input type="text" value="" id="J_time" class="delivery_time inputSel date-picker pad_input" _cqnotice="指定配送日期" readonly> ' +
                                                '<input type="text" readonly="true" class="input_text pad_input delivery_time inputSel" id="J_pstime" _cqnotice="指定配送时段" readonly><input type="hidden" id="J_detimerr"><div id="c_container"></div>' +
                                                '<div style="position: relative">' +
                                                    '<div class="mod_search_zipcode" id="J_search_zipcode" style="position:absolute;left:141px;top:0;display:none">' +
                                                        '<h4 id="J_message"></h4>' +
                                                        '<ul>' +
                                                          '<li><a id="J_am" href="javascript:void(0)"></a> <em id="J_em" style="color:#0065bb"></em></li>' +
                                                          '<li><a id="J_pm" href="javascript:void(0)"></a></li>' +
                                                        '</ul>' +
                                                    '</div>' +
                                                '</div>' +
                                            '</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<th></th>' +
                                            '<td class="order_deliverytip" id="J_order_deliverytip"></td>' +
                                        '</tr>' +
                                    '</table>' +
                                    '</div>' +
                                '</div>' +
                            '</div>';
                    $('#J_orderDeliverCnt').html(str)
                    // 写入送票地址 收件人 联系电话 配送时间
                    $('#J_bk_way').text(DataOrder.data.DistributionJson.Way);
                    // 有值显示区块，值为空则隐藏整个区块
                    this._trShow('#J_bk_address', DataOrder.data.DistributionJson.Where);
                    this._trShow('#J_bk_member', DataOrder.data.DistributionJson.Who);
                    this._trShow('#J_bk_mobile', DataOrder.data.DistributionJson.Tel);
                    this._trShow('#J_bk_time', DataOrder.data.DistributionJson.SendTicketTime);
                    this._trShow('#J_bk_pay', DataOrder.data.DistributionJson.Fee);
                    $('#J_orderDeliverCnt').show();
                    this.dispatchController();
                    // 写入送票地址 收件人 联系电话 配送时间


                },

                /**
                * 修改订单弹出层
                *
                */
                _showModifyPop: function () {
                    var modifyOrderPopC = cQuery('#js_order_modify');

                    modifyOrderPopC.mask();
                    this._setPopModify(modifyJson);
                    // 默认选择第一个不是disabled的radio
                    $($('#js_order_modify input[type=radio]').filter(':enabled')[0]).prop('checked', true);
                    this._getModifyRadio();
                },

                /**
                * 修改订单弹操作
                *
                */
                modifyOrder: function () {
                    var self = this,
                        modifyOrderPop = $('#js_order_modify'),
                        modifyOrderPopC = cQuery('#js_order_modify'), // 订单修改弹出层
                        modifyOrderTourist = cQuery('#js_modify_order_pop'), // 增加或减少出行人弹出层
                        modifyAddProduct = cQuery('#js_modify_order_pop'), // 增加或减少附加产品弹出层
                        modifyAddInfo = cQuery('#js_modify_order_pop'), // 修改其它信息弹出层
                        modifyAffirm = cQuery('#js_modify_order_success'), // 修改确认弹出层
                        modifyJson = DataOrder.data.StatusJson;


                    // if (DataOrder.data.Action === 'edit' && DataOrder.data.CanEdit) {
                    if (DataOrder.data.Action === 'edit') {
                        modifyOrderPopC.mask();
                        this._setPopModify(modifyJson);
                        // TODO 取消订单链接

                        // 默认选择第一个不是disabled的radio
                        $($('#js_order_modify input[type=radio]').filter(':enabled')[0]).prop('checked', true);
                        this._getModifyRadio();

                    };

                    /**1
                    * 创建派送区块
                    */


                    $('#js_order_modify').delegate('input[type=radio]:enabled', 'click', self._getModifyRadio);

                    $(document).delegate('#J_orderToModify', 'click', function () {
                        var modifyInfo = self._getModifyRadio();
                        // 其中"修改联系人"、"修改旅客信息"、"修改发票"，选中点击下一步之后直接锚点到相应的模块并切换到修改模式。
                        switch (self._getModifyRadio()) {
                            // 修改联系人      
                            case 'orderContacts':
                                document.location.hash = 'orderContacts';
                                modifyOrderPopC.unmask();
                                $('#BtnEditContact').click();
                                break;

                            // 修改旅客信息      
                            case 'orderTourist':
                                document.location.hash = 'orderTourist';
                                modifyOrderPopC.unmask();
                                $('#js-passenger-edit-button').click();
                                break;

                            // 修改发票      
                            case 'orderInvoice':
                                document.location.hash = 'orderInvoice';
                                modifyOrderPopC.unmask();
                                $('#BtnEditInvoice').click();
                                break;

                            // TODO 修改订单：选择"增加减少出行人"、"增加减少附加产品"、"其他修改"时，弹出框显示下一步的操作      
                            // 增加减少出行人      
                            case 'J_orderTourist':
                                modifyOrderPopC.unmask();
                                modifyOrderTourist.mask();
                                $('#J_modifyarea').closest('tr').hide();
                                self._modifyAffirm(modifyOrderTourist, modifyAffirm, '#J_ordersubmit', 1, false);
                                break;
                            // 增加减少附加产品      
                            case 'J_bags':
                                modifyOrderPopC.unmask();
                                modifyAddProduct.mask();
                                $('#J_modifyarea').closest('tr').hide();
                                self._modifyAffirm(modifyAddProduct, modifyAffirm, '#J_ordersubmit', 2, false);
                                break;
                            // 其他修改      
                            case 'J_otherModify':
                                modifyOrderPopC.unmask();
                                modifyAddProduct.mask();
                                $('#J_modifyarea').closest('tr').show();
                                self._modifyAffirm(modifyAddProduct, modifyAffirm, '#J_ordersubmit', 3, true);
                                break;
                        }
                    })


                },
                //取消订单
                cancelOrder: function () {
                    var cancelOrderPop = $('#js_cancel_order_pop'),
                        cancelOrderPopC = cQuery('#js_cancel_order_pop'),
                        confirmBtn = cancelOrderPop.find('#js_cancel_order_confirm'),
                        submitBtn = cancelOrderPop.find('#js_cancel_order_submit'),
                        cancelBtn = cancelOrderPop.find('.btn_cancel'),
                        OrderPopTabel = cancelOrderPop.find('table'),
                        OrderPopconfirm = cancelOrderPop.find('.order_masking_content'),
                        inputNameDom = cQuery('input[name=cancel_order_name]'),
                        inputPhoneDom = cQuery('input[name=cancel_order_phone]'),
                        remarkDom = cQuery('#js_cancel_order_remark'),
                        isRemark = false,
                        selectDom1 = cancelOrderPop.find('.js_cancel_order_pop_select1'),
                        selectDom2 = $('#js_cancel_order_pop_select2'),
                        linkUrl = ''; //跳转地址

                    cancelOrderBtn.on('click', function () {
                        //判断是取消还是退订
                        if (DataOrder.data.CancelIsUnsubscribe) {
                            //展示退订option
                            $('#js_cancel_order_pop_tip').html('退订原因');
                            $(selectDom1[0]).hide().removeClass('js_cancel_order_pop_select1_show');
                            $(selectDom1[1]).show().addClass('js_cancel_order_pop_select1_show');
                            // 弹出层显示联系人和电话并做表单验证
                            $('#J_popcalname').show();
                            $('#J_popcalmobile').show();
                            cancelFormCheck = true;
                        } else {
                            // 弹出层不做联系人和电话的表单验证
                            $('#J_popcalname').hide();
                            $('#J_popcalmobile').hide();
                            cancelFormCheck = false;
                        }
                        inputNameDom.value(DataOrder.data.ContactCtrip.name);
                        inputPhoneDom.value(DataOrder.data.ContactCtrip.mob);
                        cancelOrderPopC.mask();
                    });
                    selectDom1.on('change', function () {
                        if ($(this).find("option:selected").text() == '突发事件') {
                            selectDom2.show().addClass('js_cancel_order_pop_select2_show');
                        } else {
                            selectDom2.hide().removeClass('js_cancel_order_pop_select2_show');
                        }
                        if ($(this).find("option:selected").text() == '其他原因') {
                            $('#js_cancel_order_pop_star').show();
                            isRemark = true;
                        } else {
                            $('#js_cancel_order_pop_star').hide();
                            isRemark = false;
                        }
                    });
                    confirmBtn.on('click', function () {
                        if (inputNameDom.value() == '') {
                            orderDetail.cqRegValid(inputNameDom, '请填写联系人');
                            return false;
                        }
                        // 取消订单不验证名字和手机号码
                        if (cancelFormCheck) {
                            if (orderDetail.Reg.hasCnChar(inputNameDom.value())) {
                                if (!/^[\u4e00-\u9fa5a-zA-Z-]+$/.test(inputNameDom.value())) {
                                    orderDetail.cqRegValid(inputNameDom, "中文姓名只能包含汉字、字母和连字符，请检查");
                                    return false;
                                }
                            } else {
                                if (!orderDetail.Reg.isEnName(inputNameDom.value()) || /[^a-zA-Z. \/'-]/.test(inputNameDom.value())) {
                                    orderDetail.cqRegValid(inputNameDom, "请填写正确的英文姓名，姓名格式为姓/名，姓与名之间用/分隔，如Green/Jim King");
                                    return false;
                                }
                            }
                            if (inputPhoneDom.value() == '') {
                                orderDetail.cqRegValid(inputPhoneDom, '请填写手机号码');
                                return false;
                            }
                            if (!/^0?1[3458]\d{9}$/.test(inputPhoneDom.value())) {
                                orderDetail.cqRegValid(inputPhoneDom, '您填写的手机号码有误，请重新填写');
                                return false;
                            }
                        };

                        if (remarkDom.value() == '' && isRemark) {
                            orderDetail.cqRegValid(remarkDom, '您填写备注');
                            return false;
                        } else {
                            OrderPopTabel.hide();
                            OrderPopconfirm.show();
                            $('.js_pop_orderId').html(DataOrder.data.OrderId);
                            $(this).hide();
                            submitBtn.show();
                        }
                    });
                    submitBtn.on('click', function () {
                        var data = {
                            "OrderId": DataOrder.data.OrderId,
                            "SendMessage": {
                                "ApplyType": 1,
                                "Reason1": $('.js_cancel_order_pop_select1_show').find("option:selected").text(),
                                "Reason2": $('.js_cancel_order_pop_select2_show').find("option:selected").text(),
                                "ContractName": inputNameDom.value(),
                                "ContractTel": inputPhoneDom.value(),
                                "Remark": remarkDom.value()
                            }
                        };
                        $.ajax({
                            url: DataOrder.api.UpdateOrderUrl,
                            data: {
                                RequestData: cQuery.stringifyJSON(data),
                                "qb_o": qbo
                            },
                            type: 'POST',
                            success: function (re) {
                                // TODO if action == 'cancel' 弹出提示修改成功，几秒后跳转到列表页 
                                //         否则弹出提示成功，直接刷新页面
                                json = $.parseJSON(re);
                                if (json.errno == 0) {
                                    if (DataOrder.data.Action == 'cancel') {
                                        cancelOrderPopC.unmask();
                                        cQuery('#js_cancel_order_success').mask();
                                        $('.js_pop_orderId').html(data.OrderId);
                                        linkUrl = json.errmsg;
                                        jumpUrl(3);
                                    } else {
                                        cancelOrderPopC.unmask();
                                        cQuery('#J_cancel_dialog_success').mask();
                                        $('#J_cancel_pop_success_ordId').html(DataOrder.data.OrderId);
                                        setTimeout(function () {
                                            location.reload();
                                        }, 3000);
                                    }

                                } else {
                                    cancelOrderPopC.unmask();
                                    cQuery('#js_pop_error').mask();
                                    $('#js_pop_errormsg').html(json.errmsg);
                                }
                            },
                            error: function () {
                                alert('网络出错，请重试');
                            }
                        });
                    });
                    popCloseBtn.on('click', function () {
                        confirmBtn.show();
                        submitBtn.hide();
                        OrderPopTabel.show();
                        OrderPopconfirm.hide();
                    });
                    //跳转
                    var jumpUrl = function (count) {
                        window.setTimeout(function () {
                            count--;
                            if (count > 0) {
                                $('.js_order_pop_time').html(count);
                                jumpUrl(count);
                            } else {
                                location.href = linkUrl;
                            }
                        }, 1000);
                    };
                },

                // 顶部修改订单按钮
                showModifyBtn: function () {
                    var self = this;
                    if (DataOrder.data.CanEdit) {
                        $('#BtnEditOrder').show();
                    };
                    $(document).delegate('#BtnEditOrder', 'click', function () {
                        self._showModifyPop();
                        // self.modifyOrder();
                    });
                },

                //联系携程
                orderService: function () {
                    var serviceBtn = $('#js_order_service'),
                        servicePop = $('#js_service_pop'),
                        servicePopC = cQuery('#js_service_pop'),
                        submitBtn = servicePop.find('.btn_blue_middle'),
                        cancelBtn = servicePop.find('.btn_cancel'),
                        nameDom = cQuery('input[name=service_order_name]'),
                        phoneDom = cQuery('input[name=service_order_phone]'),
                        remarkDom = cQuery('#js_service_remark'),
                        isRemark = false,
                        isService = false,
                        selectDom1 = $('#js_service_pop_select1'),
                        selectDom2 = $('#js_service_pop_select2');
                    serviceBtn.on('click', function () {
                        if (!isService) {
                            servicePopC.mask();
                            nameDom.value(DataOrder.data.ContactCtrip.name);
                            phoneDom.value(DataOrder.data.ContactCtrip.mob);
                        } else {
                            cQuery('#js_order_success').mask();
                        }
                    });
                    selectDom1.on('change', function () {
                        if ($(this).find("option:selected").text() == '订单事宜') {
                            selectDom2.show();
                        } else {
                            selectDom2.hide();
                        }
                        if ($(this).find("option:selected").text() == '其他事宜') {
                            $('#js_service_pop_star').show();
                            isRemark = true;
                        } else {
                            $('#js_service_pop_star').hide();
                            isRemark = false;
                        }
                    });
                    submitBtn.on('click', function () {
                        var data = {
                            "OrderId": DataOrder.data.OrderId,
                            "SendMessage": {
                                "ApplyType": 2,
                                "Reason1": selectDom1.find("option:selected").text(),
                                "Reason2": selectDom2.find("option:selected").text(),
                                "ContractName": nameDom.value(),
                                "ContractTel": phoneDom.value(),
                                "Remark": remarkDom.value()
                            }
                        };
                        if (nameDom.value() == '') {
                            orderDetail.cqRegValid(nameDom, '请填写联系人');
                            return false;
                        }
                        if (orderDetail.Reg.hasCnChar(nameDom.value())) {
                            if (!/^[\u4e00-\u9fa5a-zA-Z-]+$/.test(nameDom.value())) {
                                orderDetail.cqRegValid(nameDom, "中文姓名只能包含汉字、字母和连字符，请检查");
                                return false;
                            }
                        } else {
                            if (!orderDetail.Reg.isEnName(nameDom.value()) || /[^a-zA-Z. \/'-]/.test(nameDom.value())) {
                                orderDetail.cqRegValid(nameDom, "请填写正确的英文姓名，姓名格式为姓/名，姓与名之间用/分隔，如Green/Jim King");
                                return false;
                            }
                        }
                        if (phoneDom.value() == '') {
                            orderDetail.cqRegValid(phoneDom, '请填写手机号码');
                            return false;
                        }
                        if (!/^0?1[3458]\d{9}$/.test(phoneDom.value())) {
                            orderDetail.cqRegValid(phoneDom, '您填写的手机号码有误，请重新填写');
                            return false;
                        }
                        if (remarkDom.value() == '' && isRemark) {
                            orderDetail.cqRegValid(remarkDom, '您填写备注');
                            return false;
                        } else {
                            $.ajax({
                                url: DataOrder.api.UpdateOrderUrl,
                                data: {
                                    RequestData: cQuery.stringifyJSON(data),
                                    "qb_o": qbo
                                },
                                type: 'POST',
                                success: function (re) {
                                    json = $.parseJSON(re);
                                    if (json.errno == 0) {
                                        isService = true;
                                        servicePopC.unmask();
                                        cQuery('#js_order_success').mask();
                                        $('.js_pop_orderId').html(data.OrderId);
                                        $('.js_order_success_txt').html('联系携程请求已发送，请保持手机畅通，<br>携程客服会尽快给您回电，谢谢！');
                                        $('.js_order_success_title').html('联系携程');
                                        $('#js_order_success').find('.btn_col').show();
                                        setTimeout(function () {
                                            cQuery('#js_order_success').unmask()
                                        }, 3000);
                                    } else {
                                        servicePopC.unmask();
                                        cQuery('#js_pop_error').mask();
                                        $('#js_pop_errormsg').html(json.errmsg);
                                    }
                                },
                                error: function () {
                                    alert('网络出错，请重试');
                                }
                            });
                        }
                    });
                }
            }
        },
        //发票
        invoice: function () {
            var isNeedInvoice = 1,
                invoiceDom = $('#js_edit_invoice'),
                editbtn = $(invoiceDom.find('.btn_blue')[0]),
                saveBtn = $(invoiceDom.find('.btn_blue')[1]),
                cancelBtn = invoiceDom.find('.btn_white'),
                invoiceContentDom = invoiceDom.find('.js_invoice_init'),
                radioInput = invoiceDom.find('input[name=invoice_choose]'),
                editTable = invoiceDom.find('#js_edit_invoice_table'),
                initTableTd = invoiceContentDom.find('td'),
                trList = editTable.find('tr').not('tr:eq(0)'),
                titleDom = cQuery('input[name=invoice_title]'),
                nameDom = cQuery('input[name=invoice_name]'),
                addressDetailDom = cQuery('input[name=invoice_address]'),
                codeDom = cQuery('input[name=invoice_cityCode]'),
                selectDom = $('select[id=invoice_item]'),
                msg = {
                    titleTip: "请填写发票抬头",
                    titleTipMore: "发票抬头必须为个人姓名或者公司名称",
                    nameTip: "请填写收件人",
                    addressTip: "请填写详细地址",
                    codeTip: "请填写邮政编码",
                    codeTipMore: "请填写正确的邮政编码，邮政编码格式为六位数字",
                    addressProviceTip: "请填写省",
                    addressCityTip: "请填写市",
                    addressAreaTip: "请填写区"
                },
                initArray = []; //存放初始表单的各项值
            _.each(initTableTd, function (index, i) {
                initArray[i] = $(index).html();
            });
            return {
                init: function () {
                    var self = this;
                    self.bindEvent();
                    //注册三级地址库
                    addressInit.init({
                        id: "#js_order_address",
                        type: "select"
                    });
                },
                bindEvent: function () {
                    var self = this;
                    //修改发票信息
                    editbtn.on('click', function () {
                        $(this).hide().siblings().show();
                        invoiceContentDom.hide();
                        editTable.show();
                        if (invoiceContentDom.html() == '不需要发票') {
                            $(radioInput[1]).prop('checked', true);
                            trList.hide();
                            isNeedInvoice = 0;
                            $('#J_invoiceTip').hide();
                        } else {
                            $(radioInput[0]).prop('checked', true);
                            trList.show();
                            isNeedInvoice = 1;
                            self.fillForm();
                            $('#J_invoiceTip').show();
                        }
                    });
                    //保存发票信息
                    saveBtn.on('click', function () {
                        if (!self.check()) return;
                        self.submit();
                    });
                    // 取消 
                    cancelBtn.on('click', function () {
                        $(this).hide();
                        invoiceContentDom.show();
                        editbtn.show();
                        saveBtn.hide();
                        editTable.hide();
                    });
                    //是否需要发票
                    radioInput.on('click', function () {
                        if ($(this).val() == 0) {
                            trList.hide();
                            isNeedInvoice = 0;
                            $('#J_invoiceTip').hide();
                        } else {
                            trList.show();
                            isNeedInvoice = 1;
                            $('#J_invoiceTip').show();
                        }
                    });
                },
                //填充表单
                fillForm: function () {
                    //发票明细填充
                    selectDom.find("option:selected").text(initArray[1]);
                    //地址填充
                    var addressDom = $('#js_order_address').find('select'),
                        addressData = initArray[3],
                        addressDataArry = addressData.match('(\.*省)(\.*市)(\.*区)(\.*)');
                    if (addressDataArry) {
                        _.each(addressDom, function (index, i) {
                            $(index).find("option:selected").text(_.rest(addressDataArry)[i]);
                        });
                        $('input[name=invoice_address]').val(_.last(addressDataArry));
                    }
                },
                check: function () {
                    var addressProviceDom = cQuery('#js_order_address #provice'),
                        addressCityDom = cQuery('#js_order_address #city'),
                        addressAreaDom = cQuery('#js_order_address #area');
                    if (isNeedInvoice) {
                        if (titleDom.value() == '') {
                            orderDetail.cqRegValid(titleDom, msg.titleTip);
                            return false;
                        }
                        if (titleDom.value() === '个人' || titleDom.value() === '公司' || titleDom.value() === '待定') {
                            orderDetail.cqRegValid(titleDom, msg.titleTipMore);
                            return false;
                        }
                        if (nameDom.value() == '') {
                            orderDetail.cqRegValid(nameDom, msg.nameTip);
                            return false;
                        }
                        if (addressProviceDom.find("option:selected").text() == '选择省') {
                            orderDetail.cqRegValid(addressProviceDom, msg.addressProviceTip);
                            return false;
                        }
                        if (addressCityDom.find("option:selected").text() == '选择市') {
                            orderDetail.cqRegValid(addressCityDom, msg.addressCityTip);
                            return false;
                        }
                        if (addressAreaDom.find("option:selected").text() == '选择区' && $('#js_order_address #area').is(':visible')) {
                            orderDetail.cqRegValid(addressAreaDom, msg.addressAreaTip);
                            return false;
                        }
                        if (addressDetailDom.value() == '') {
                            orderDetail.cqRegValid(addressDetailDom, msg.addressTip);
                            return false;
                        }
                        if (codeDom.value() == '') {
                            orderDetail.cqRegValid(codeDom, msg.codeTip);
                            return false;
                        }
                        if (!/^\d{6}$/.test($.trim(codeDom.value()))) {
                            orderDetail.cqRegValid(codeDom, msg.codeTipMore);
                            return false;
                        }
                    }
                    return true;
                },
                submit: function () {
                    var OrderInvoiceDelivery = {};
                    if (!isNeedInvoice) {
                        OrderInvoiceDelivery = {
                            "IsNeedInvoice": isNeedInvoice
                        };
                    } else {
                        OrderInvoiceDelivery = {
                            "IsNeedInvoice": isNeedInvoice,
                            "Title": titleDom.value(),
                            "Content": selectDom.find("option:selected").text(),
                            "Address": addressInit.get("#js_order_address", "") + addressDetailDom.value(),
                            "Post": codeDom.value(),
                            "Recipient": nameDom.value(),
                            "Remark": null
                        }
                    }
                    var data = {
                        "OrderId": DataOrder.data.OrderId,
                        "OrderInvoiceDelivery": OrderInvoiceDelivery
                    };
                    $.ajax({
                        url: DataOrder.api.UpdateOrderUrl,
                        data: {
                            RequestData: cQuery.stringifyJSON(data),
                            "qb_o": qbo
                        },
                        type: 'POST',
                        success: function (re) {
                            json = $.parseJSON(re);
                            if (json.errno == 0) {
                                cQuery('#js_order_success').mask();
                                $('.js_order_success_txt').html('修改发票请求已发送，请耐心等待携程确认，谢谢！');
                                $('.js_order_success_title').html('修改发票');
                                setTimeout(function () {
                                    location.reload();
                                }, 3000);
                            } else {
                                cQuery('#js_pop_error').mask();
                                $('#js_pop_errormsg').html(json.errmsg);
                            }
                        },
                        error: function () {
                            alert('网络出错，请重试');
                        }
                    });
                }
            }
        },
        //联系人
        contact: function () {
            var contactDom = $('#js_edit_contact'),
                editbtn = $(contactDom.find('.btn_blue')[0]),
                saveBtn = $(contactDom.find('.btn_blue')[1]),
                cancelBtn = contactDom.find('.btn_white'),
                showTable = $('#js_contact_showTable'),
                showTableTd = showTable.find('td'),
                editTable = $('#js_contact_editTable'),
                editTableInput = editTable.find('input'),
                nameDom = cQuery('input[name=contact_name]'),
                emailDom = cQuery('input[name=contact_email]'),
                phoneDom = cQuery('input[name=contact_phone]'),
                ctzcodeDom = cQuery('input[name=contact_ctzcode]'),
                cttphoneDom = cQuery('input[name=contact_cttphone]'),
                ctextDom = cQuery('input[name=contact_ctext]'),
                isSelectPhone = false, //是否填了手机号
                isSelectNumber = false, //是否填了电话号码
                initArray = []; //存放初始表单的各项值
            _.each(showTableTd, function (index, i) {
                initArray[i] = $(index).html();
            });
            initArray = _.union(_.initial(initArray), initArray[3].split('-'));
            return {
                init: function () {
                    var self = this;
                    self.bindEvent();
                },
                bindEvent: function () {
                    var self = this;
                    //修改联系人信息
                    editbtn.on('click', function () {
                        $(this).hide().siblings().show();
                        editTable.show();
                        showTable.hide();
                        self.fillForm();
                    });
                    // 取消 
                    cancelBtn.on('click', function () {
                        $(this).hide();
                        editbtn.show();
                        saveBtn.hide();
                        editTable.hide();
                        showTable.show();
                    });
                    //保存联系人信息
                    saveBtn.on('click', function () {
                        if (!self.check()) return;
                        self.submit();
                    });
                },
                //填充表单
                fillForm: function () {
                    _.each(editTableInput, function (index, i) {
                        $(index).val(initArray[i]);
                    });
                },
                check: function () {
                    if (nameDom.value() == '') {
                        orderDetail.cqRegValid(nameDom, "请填写联系人姓名");
                        return false;
                    }
                    if (orderDetail.Reg.hasCnChar(nameDom.value())) {
                        if (!/^[\u4e00-\u9fa5a-zA-Z-]+$/.test(nameDom.value())) {
                            orderDetail.cqRegValid(nameDom, "中文姓名只能包含汉字、字母和连字符，请检查");
                            return false;
                        }
                    } else {
                        if (!orderDetail.Reg.isEnName(nameDom.value()) || /[^a-zA-Z. \/'-]/.test(nameDom.value())) {
                            orderDetail.cqRegValid(nameDom, "请填写正确的英文姓名，姓名格式为姓/名，姓与名之间用/分隔，如Green/Jim King");
                            return false;
                        }
                    }
                    if (emailDom.value() == '') {
                        orderDetail.cqRegValid(emailDom, "请填写您的E-mail地址");
                        return false;
                    }
                    if (!/^([a-zA-Z0-9]+[_|\_|\.|-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.|-]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(emailDom.value())) {
                        orderDetail.cqRegValid(emailDom, "请填写正确的E-mail地址，格式：a@b.c");
                        return false;
                    }
                    if (phoneDom.value() == '' && ctzcodeDom.value() == '' && cttphoneDom.value() == '' && ctextDom.value() == '') {
                        orderDetail.cqRegValid(phoneDom, "手机号码或联系电话至少选填一项");
                        return false;
                    }
                    if (!isSelectNumber || phoneDom.value() != '') {
                        if (!/^0?1[3458]\d{9}$/.test(phoneDom.value())) {
                            orderDetail.cqRegValid(phoneDom, "您填写的手机号码有误，请重新填写");
                            return false;
                        } else {
                            isSelectPhone = true;
                        }
                    }
                    if (!isSelectPhone || ctzcodeDom.value() != '') {
                        if ('' === ctzcodeDom.value() || '区号' === ctzcodeDom.value()) {
                            orderDetail.cqRegValid(ctzcodeDom, "请填写区号");
                            return false;
                        } else if (/[^\d]/.test(ctzcodeDom.value())) {
                            orderDetail.cqRegValid(ctzcodeDom, "区号仅包含数字");
                            return false;
                        } else if (!/^0[1-9]{2,3}$/.test(ctzcodeDom.value())) {
                            orderDetail.cqRegValid(ctzcodeDom, "区号必须是0开头的3或4位的数字");
                            return false;
                        } else if ('' === cttphoneDom.value() || '电话号码' === cttphoneDom.value()) {
                            orderDetail.cqRegValid(cttphoneDom, "请填写电话号码");
                            return false;
                        } else if (/[^\d]/.test(cttphoneDom.value())) {
                            orderDetail.cqRegValid(cttphoneDom, "请填写正确的电话号码，电话号码仅包含数字");
                            return false;
                        } else if (cttphoneDom.value().length < 7) {
                            orderDetail.cqRegValid(cttphoneDom, "请填写正确的电话号码，电话号码长度7位以上");
                            return false;
                        } else {
                            isSelectNumber = true;
                        }
                        if (/[^\d]/.test(ctextDom.value())) {
                            orderDetail.cqRegValid(ctextDom, "分机号码必须是数字");
                            return false;
                        }
                    }
                    return true;
                },
                submit: function () {
                    var editedArray = [], //修改好的表单的各项值 现在不需要前端这边做
                        callNumber;
                    _.each(editTableInput, function (index, i) {
                        editedArray[i] = $(index).val();
                    });
                    // initArray = editedArray; //保存的时候将编辑好的表单赋值给初始表单
                    if (ctextDom.value() == '') {
                        callNumber = _.first(_.last(editedArray, 3), 2).join('-')
                    } else {
                        callNumber = _.last(editedArray, 3).join('-');
                    }
                    // editedArray = _.union(_.first(editedArray, 3), callNumber); //重新拼接数组
                    var data = {
                        "OrderId": DataOrder.data.OrderId,
                        "OrderContact": {
                            "ContactName": nameDom.value(),
                            "Tel": callNumber,
                            "Mobile": phoneDom.value(),
                            "Email": emailDom.value()
                        }
                    };
                    $.ajax({
                        url: DataOrder.api.UpdateOrderUrl,
                        data: {
                            RequestData: cQuery.stringifyJSON(data),
                            "qb_o": qbo
                        },
                        type: 'POST',
                        success: function (re) {
                            json = $.parseJSON(re);
                            if (json.errno == 0) {
                                cQuery('#js_order_success').mask();
                                $('.js_order_success_txt').html('修改联系人请求已发送，请耐心等待携程确认，谢谢！');
                                $('.js_order_success_title').html('修改联系人');
                                setTimeout(function () {
                                    location.reload();
                                }, 3000);
                            } else {
                                cQuery('#js_pop_error').mask();
                                $('#js_pop_errormsg').html(json.errmsg);
                            }
                        },
                        error: function () {
                            alert('网络出错，请重试');
                        }
                    });
                }
            }
        },
        //其他事件交互
        orderOtherUi: function () {
            var titleDom = $('.js_order_list_title'),
                titleSpecialDom = $('.js_order_list_title_ins'),
                boldBtn = $('.js_order_list_boldBtn');
            titleDom.on('click', function () {
                var nextTr = $(this).parents('tr').next();
                iconDom = $(this).find('i');
                if (iconDom.hasClass('icon_down')) {
                    $(this).removeClass('cur');
                    iconDom.removeClass('icon_down').addClass('icon_up');
                } else {
                    $(this).addClass('cur');
                    iconDom.removeClass('icon_up').addClass('icon_down');
                }
                nextTr.toggle();
            });
            titleSpecialDom.on('click', function () {
                var lastTr = $(this).parents('tr').nextAll('.js_order_list_bold_special').eq(0);
                lastTr.toggle();
            });
            //点击收起其他信息
            boldBtn.on('click', function () {
                $(this).closest('tr').hide();
            });
            //飞机型号信息
            $$ = {
                module: {
                    jmpInfo: {
                        array: {}
                    }
                },
                fltDomestic: {}
            };
            var craftTypeUrl = "http://webresource.c-ctrip.com/code/js/resource/jmpinfo_tuna/CraftType_" + cQuery.config("charset") + ".js"
            $.getScript(craftTypeUrl, function () {
                var getData = function (page) {
                    var pagevalue = "";
                    if (page.match(new RegExp('=(\\w+)')) != null) {
                        pagevalue = page.match(new RegExp('=(\\w+)'))[1];
                    }
                    page = page.indexOf('?') != -1 ? pagevalue : '';
                    if (page != '') {
                        var valueObj = {};
                        var valueList = null;
                        if ($$.module.jmpInfo.array.CraftType)
                            valueList = $$.module.jmpInfo.array.CraftType.match(new RegExp('@(' + page + '\\|[^@]*\\|[^@]*\\|\\d*\\|\\d*)@', 'i'));
                        if (!valueList || valueList == null) {
                            return {};
                        }
                        valueList = valueList[1].split('|');
                        for (var i = 0, len = valueList.length; i < len; i++) {
                            valueObj['txt' + i] = valueList[i];
                        }
                        return valueObj;
                    }
                    return {};
                };
                cQuery.mod.load('jmp', '1.0', function () {
                    $('span[mod1="jmpInfo"]').each(function () {
                        cQuery(this).regMod('jmp', '1.0', {
                            options: {
                                content: getData($(this).attr('mod_jmpinfo_page')),
                                css: {
                                    maxWidth: '460'
                                },
                                type: 'jmp_table',
                                classNames: {
                                    boxType: 'jmp_table'
                                },
                                template: '#jmp_craft',
                                alignTo: 'cursor',
                                showArrow: false
                            }
                        });
                    });
                })
            });
        },
        //滚动监听
        scrollspyEvent: function () {
            var orderTab = $('#js_order_nav');
            return {
                init: function () {
                    var self = this,
                        orderTab = $('#js_order_nav');
                    $(document).ready(function () {
                        //tab滚动监听 scrollspy
                        orderTab.find('a').on('click', function () {
                            orderTab.scrollspy("to", $(this).attr("href"));
                        });
                        orderTab.scrollspy({
                            offsetY: 42,
                            onchange: function (hrefid, $hrefs, $targets) { //hrefs 触发标记 targets目标对象
                                $hrefs.removeClass("cur");
                                $hrefs.filter("[href='#" + hrefid + "']").addClass("cur");
                            }
                        });
                    });
                    self.barScrollEvent();
                    self.hideBarTitle();

                    // 旅客信息 申请中... 按钮是否显示
                    if(GV.app.detail.data.IsClientEditApplying){
                        $('#BtnEditPassengerApplying').show()
                    };
                    // Flightreminder 提示信息
                    if( GV.app.detail.data.FlightReminder){
                        $('#js-passenger').prepend('<div class="mod_main passenger_tips">' + GV.app.detail.data.FlightReminder + '</div>')
                    }

                },
                barScrollEvent: function () {
                    var barShow = function () {
                        var scrollTop = $(window).scrollTop(),
                            ie6ClearTime,
                            scrollTrigger = $('.order_box').offset().top;
                        if (scrollTop >= scrollTrigger) {
                            orderTab.css({
                                position: "fixed",
                                top: 0,
                                "z-index": 99
                            });
                            //ie6
                            if (navigator.appVersion.indexOf("MSIE 6") > -1) {
                                $('.order_box').css("position", "relative");
                                clearTimeout(ie6ClearTime);
                                ie6ClearTime = setTimeout(function () {
                                    orderTab.css({
                                        position: "absolute",
                                        top: scrollTop - scrollTrigger,
                                        "z-index": 99
                                    });
                                }, 300);
                            }
                        } else {
                            orderTab.css({
                                position: "",
                                top: ""
                            });
                        }
                    };
                    // 页面载入时先运行一下，防止当页面打开时已经在出现fix定位时显示行程天数bar
                    barShow();
                    $(window).on('scroll resize', function () {
                        barShow();
                    });
                },
                //如果没有内容时相应的锚点隐藏
                hideBarTitle: function () {
                    var anchorDom = $('.order_box').find('.base_anchor'),
                        anchorBarDom = $('#js_order_nav').find('a').not('.contact_ctrip'),
                        anchorArry = [];
                    _.each(anchorDom, function (index, i) {
                        var id = $(index).attr('id');
                        anchorArry.push(id);
                    });
                    _.each(anchorBarDom, function (index, i) {
                        var hrefId = $(index).attr('href').substring(1);
                        if (_.indexOf(anchorArry, hrefId) > -1) {
                            $(index).show();
                        }
                    });
                }
            }
        }
    };


    $(function () {
        orderDetail.init();
    });
});