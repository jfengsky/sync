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
define(function(require, exports, module) {
    var $ = require("jquery"),
        _ = require("underscore"),
        addressInit = require('../public/address');
    require("../Modules/scrollspy");
    // 旅客
    require('./order_detail_passenger');

    var popTemplate = Handlebars.compile(require('tpl/myctrip/order_detail_pop.html.js')); //订单详情弹窗模板
    var DataOrder = GV.app.detail //订单详情接口

    var orderDetail = {
        returnValidate: cQuery(document).regMod('validate', '1.1'),
        //错误提示信息
        cqRegValid: function(pStr, pData) {
            cQuery.mod.load('validate', '1.1', function() {
                orderDetail.returnValidate.method("show", {
                    $obj: pStr,
                    data: pData,
                    removeErrorClass: true,
                    isScroll: false
                });
            });
        },
        //提示注册
        regJmp: function() {
            cQuery.mod.load('jmp', '1.0', function() {
                var ins = cQuery(document).regMod('jmp', '1.0', {
                    cc: 2
                });
            })
        },
        Reg: {
            hasCnChar: function(str) {
                return /[\u0100-\uffff]/.test(str);
            },
            isEnName: function(str) {
                return /^[^\/]+\/[^\/]+$/.test(str);
            }
        },
        init: function() {
            $('body').append(popTemplate);
            orderDetail.regJmp();
            orderDetail.invoice().init();
            orderDetail.contact().init();
            orderDetail.orderInfo().init();
            orderDetail.orderOtherUi();
            orderDetail.scrollspyEvent().init();
        },
        //订单
        orderInfo: function() {
            var printOrderBtn = $('.js_printOrder_set'),
                alongOrderBtn = $('.js_alongOrder_set'),
                cancelOrderBtn = $('.js_cancelOrder_set'),
                popCloseBtn = $('.js_pop_close');
            return {
                init: function() {
                    var self = this;
                    self.setOrderAlong();
                    self.printOrder();
                    self.cancelOrder();
                    self.orderService();
                    //弹窗关闭
                    popCloseBtn.on('click', function() {
                        cQuery('.order_masking').unmask();
                    });
                },
                //打印订单
                printOrder: function() {
                    var printPop = $('.order_print'),
                        printPopC = cQuery('.order_print');
                    submitBtn = $('.order_print').find('input[type=button]');
                    //如果没有锚点时相应的打印项隐藏
                    var anchorDom = $('.order_box').find('.base_anchor'),
                        printListDom = $('.order_print').find('li'),
                        anchorArry = [];
                    _.each(anchorDom, function (index, i){
                        var id = $(index).attr('id');
                        anchorArry.push(id);
                    });
                    _.each(printListDom, function (index, i){
                        var dataRole = $(index).data('role');
                        if(_.indexOf(anchorArry, dataRole) > -1) {
                            $(index).show();
                        }
                        else{
                            $(index).remove();
                        }
                    });
                    printOrderBtn.on('click', function() {
                        printPop.find('input[type=checkbox]').attr("checked", 'true');
                        printPopC.mask();
                    });
                    submitBtn.on('click', function() {
                        var checkBox = printPop.find('input[type=checkbox]:checked'),
                            checkNumList = [];
                        _.each(checkBox, function(index, i){
                            checkNumList.push($(index).val());
                        });
                        if(checkBox.length > 0) {
                            window.open( "PrintOrder.aspx?OrderID="+ DataOrder.data.OrderId + "&ShowType="+ checkNumList.join(",") );
                            printPopC.unmask();
                        }
                    });
                },
                //设置同行订单
                setOrderAlong: function() {
                    var submitBtn = $('.order_together').find('.btn_blue_middle'),
                        inputDom = cQuery('input[name=along_order_num]'),
                        alongPop = cQuery('.order_together');
                    alongOrderBtn.on('click', function() {
                        alongPop.mask();
                        inputDom.value('');
                    });
                    submitBtn.on('click', function() {
                        var orderIdLst = inputDom.value().replace(/\s+/g, "").split(",");
                        var orderIdLstInt = [];
                        _.each(orderIdLst, function(index, i){ orderIdLstInt.push(parseInt(orderIdLst[i])); });
                        var data = {
                            "OrderId": DataOrder.data.OrderId,
                            "SegmentOrderIdLst": orderIdLstInt
                        };
                        if (inputDom.value() == '') {
                            orderDetail.cqRegValid(inputDom, '请输入您要设置的同行订单号');
                            return false;
                        }
                        if( !_.every(orderIdLst, function (e1) { return /^[0-9]{1,10}$/.test(e1); }) ) {
                            orderDetail.cqRegValid(inputDom, "请输入有效的订单号,多个订单号时中间请用英文逗号隔开");
                            return false;
                        }
                        else {
                            $.ajax({
                                url: DataOrder.api.UpdateOrderUrl,
                                data: {
                                    RequestData: cQuery.stringifyJSON(data)
                                },
                                type: 'POST',
                                success: function(re) {
                                    json = $.parseJSON(re);
                                    if (json.errno == 0) {
                                        alongPop.unmask();
                                        cQuery('#js_order_success').mask();
                                        $('.js_order_success_txt').html('设置同行订单成功');
                                        $('.js_order_success_title').html('设置同行订单');
                                        setTimeout(function() {cQuery('#js_order_success').unmask()}, 2000);
                                    }
                                    else {
                                        alongPop.unmask();
                                        cQuery('#js_pop_error').mask();
                                        $('#js_pop_errormsg').html(json.errmsg);
                                    }
                                },
                                error : function () {
                                    alert('网络出错，请重试');
                                }
                            });
                        }
                    });
                },
                //取消订单
                cancelOrder: function() {
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
                        linkUrl = '';//跳转地址

                    cancelOrderBtn.on('click', function() {
                        //判断是取消还是退订
                        if(DataOrder.data.CancelIsUnsubscribe) {
                            //展示退订option
                            $('#js_cancel_order_pop_tip').html('退订原因');
                            $(selectDom1[0]).hide().removeClass('js_cancel_order_pop_select1_show');
                            $(selectDom1[1]).show().addClass('js_cancel_order_pop_select1_show');
                        }
                        inputNameDom.value(DataOrder.data.ContactCtrip.name);
                        inputPhoneDom.value(DataOrder.data.ContactCtrip.mob);
                        cancelOrderPopC.mask();
                    });
                    selectDom1.on('change', function () {
                        if($(this).find("option:selected").text() == '突发事件') {
                            selectDom2.show().addClass('js_cancel_order_pop_select2_show');
                        }
                        else {
                            selectDom2.hide().removeClass('js_cancel_order_pop_select2_show');
                        }
                        if($(this).find("option:selected").text() == '其他原因') {
                            $('#js_cancel_order_pop_star').show();
                            isRemark = true;
                        }
                        else {
                            $('#js_cancel_order_pop_star').hide();
                            isRemark = false;
                        }
                    });
                    confirmBtn.on('click', function() {
                        if (inputNameDom.value() == '') {
                            orderDetail.cqRegValid(inputNameDom, '请填写联系人');
                            return false;
                        }
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
                        if (remarkDom.value() == '' && isRemark){
                            orderDetail.cqRegValid(remarkDom, '您填写备注');
                            return false;
                        }
                        else {
                            OrderPopTabel.hide();
                            OrderPopconfirm.show();
                            $('.js_pop_orderId').html(DataOrder.data.OrderId);
                            $(this).hide();
                            submitBtn.show();
                        }
                    });
                    submitBtn.on('click', function() {
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
                                RequestData: cQuery.stringifyJSON(data)
                            },
                            type: 'POST',
                            success: function(re) {
                                json = $.parseJSON(re);
                                if (json.errno == 0) {
                                    cancelOrderPopC.unmask();
                                    cQuery('#js_cancel_order_success').mask();
                                    $('.js_pop_orderId').html(data.OrderId);
                                    linkUrl = json.errmsg;
                                    jumpUrl(3);
                                }
                                else {
                                    cancelOrderPopC.unmask();
                                    cQuery('#js_pop_error').mask();
                                    $('#js_pop_errormsg').html(json.errmsg);
                                }
                            },
                            error : function () {
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
                    var jumpUrl = function(count) {
                        window.setTimeout(function() {
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
                //联系携程
                orderService: function() {
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
                    serviceBtn.on('click', function() {
                        if (!isService){
                            servicePopC.mask();
                            nameDom.value(DataOrder.data.ContactCtrip.name);
                            phoneDom.value(DataOrder.data.ContactCtrip.mob);
                        }
                        else{
                            cQuery('#js_order_success').mask();
                        }
                    });
                    selectDom1.on('change', function () {
                        if($(this).find("option:selected").text() == '订单事宜') {
                            selectDom2.show();
                        }
                        else {
                            selectDom2.hide();
                        }
                        if($(this).find("option:selected").text() == '其他事宜') {
                            $('#js_service_pop_star').show();
                            isRemark = true;
                        }
                        else {
                            $('#js_service_pop_star').hide();
                            isRemark = false;
                        }
                    });
                    submitBtn.on('click', function() {
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
                        if (remarkDom.value() == '' && isRemark){
                            orderDetail.cqRegValid(remarkDom, '您填写备注');
                            return false;
                        } else {
                            $.ajax({
                                url: DataOrder.api.UpdateOrderUrl,
                                data: {
                                    RequestData: cQuery.stringifyJSON(data)
                                },
                                type: 'POST',
                                success: function(re) {
                                    json = $.parseJSON(re);
                                    if (json.errno == 0) {
                                        isService = true;
                                        servicePopC.unmask();
                                        cQuery('#js_order_success').mask();
                                        $('.js_pop_orderId').html(data.OrderId);
                                        $('.js_order_success_txt').html('联系携程请求已发送，请保持手机畅通，<br>携程客服会尽快给您回电，谢谢！');
                                        $('.js_order_success_title').html('联系携程');
                                        $('#js_order_success').find('.btn_col').show();
                                        setTimeout(function() {cQuery('#js_order_success').unmask()}, 2000);
                                    }
                                    else {
                                        servicePopC.unmask();
                                        cQuery('#js_pop_error').mask();
                                        $('#js_pop_errormsg').html(json.errmsg);
                                    }
                                },
                                error : function () {
                                    alert('网络出错，请重试');
                                }
                            });
                        }
                    });
                }
            }
        },
        //发票
        invoice: function() {
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
                initArray = [];//存放初始表单的各项值
            _.each(initTableTd, function (index, i) {
                initArray[i] = $(index).html();
            });
            return {
                init: function() {
                    var self = this;
                    self.bindEvent();
                    //注册三级地址库
                    addressInit.init({id: "#js_order_address",type: "select"});
                },
                bindEvent: function() {
                    var self = this;
                    //修改发票信息
                    editbtn.on('click', function() {
                        $(this).hide().siblings().show();
                        invoiceContentDom.hide();
                        editTable.show();
                        if(invoiceContentDom.html() == '不需要发票') {
                            $(radioInput[1]).prop('checked', true);
                            trList.hide();
                            isNeedInvoice = 0;
                        }
                        else {
                            $(radioInput[0]).prop('checked', true);
                            trList.show();
                            isNeedInvoice = 1;
                            self.fillForm();
                        }
                    });
                    //保存发票信息
                    saveBtn.on('click', function() {
                        if (!self.check()) return;
                        self.submit();
                    });
                    // 取消 
                    cancelBtn.on('click', function() {
                        $(this).hide();
                        invoiceContentDom.show();
                        editbtn.show();
                        saveBtn.hide();
                        editTable.hide();
                    });
                    //是否需要发票
                    radioInput.on('click', function() {
                        if ($(this).val() == 0) {
                            trList.hide();
                            isNeedInvoice = 0;
                        } else {
                            trList.show();
                            isNeedInvoice = 1;
                        }
                    });
                },
                //填充表单
                fillForm: function() {
                    //发票明细填充
                    selectDom.find("option:selected").text(initArray[1]);
                    //地址填充
                    var addressDom = $('#js_order_address').find('select'),
                        addressData = initArray[3],
                        addressDataArry = addressData.match('(\.*省)(\.*市)(\.*区)(\.*)');
                    if(addressDataArry) {
                        _.each(addressDom, function(index, i) {
                            $(index).find("option:selected").text(_.rest(addressDataArry)[i]);
                        });
                        $('input[name=invoice_address]').val(_.last(addressDataArry));
                    }
                },
                check: function() {
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
                submit: function() {
                    var OrderInvoiceDelivery = {};
                    if(!isNeedInvoice) {
                        OrderInvoiceDelivery = {"IsNeedInvoice": isNeedInvoice};
                    }
                    else {
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
                            RequestData: cQuery.stringifyJSON(data)
                        },
                        type: 'POST',
                        success: function(re) {
                            json = $.parseJSON(re);
                            if (json.errno == 0) {
                                cQuery('#js_order_success').mask();
                                $('.js_order_success_txt').html('修改发票请求已发送，请耐心等待携程确认，谢谢！');
                                $('.js_order_success_title').html('修改发票');
                                setTimeout(function() {location.reload();}, 2000);
                            }
                            else {
                                cQuery('#js_pop_error').mask();
                                $('#js_pop_errormsg').html(json.errmsg);
                            }
                        },
                        error : function () {
                            alert('网络出错，请重试');
                        }
                    });
                }
            }
        },
        //联系人
        contact: function() {
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
            _.each(showTableTd, function(index, i) {
                initArray[i] = $(index).html();
            });
            initArray = _.union(_.initial(initArray), initArray[3].split('-'));
            return {
                init: function() {
                    var self = this;
                    self.bindEvent();
                },
                bindEvent: function() {
                    var self = this;
                    //修改联系人信息
                    editbtn.on('click', function() {
                        $(this).hide().siblings().show();
                        editTable.show();
                        showTable.hide();
                        self.fillForm();
                    });
                    // 取消 
                    cancelBtn.on('click', function() {
                        $(this).hide();
                        editbtn.show();
                        saveBtn.hide();
                        editTable.hide();
                        showTable.show();
                    });
                    //保存联系人信息
                    saveBtn.on('click', function() {
                        if (!self.check()) return;
                        self.submit();
                    });
                },
                //填充表单
                fillForm: function() {
                    _.each(editTableInput, function(index, i) {
                        $(index).val(initArray[i]);
                    });
                },
                check: function() {
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
                submit: function() {
                    var editedArray = [], //修改好的表单的各项值 现在不需要前端这边做
                        callNumber;
                    _.each(editTableInput, function(index, i) {
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
                            RequestData: cQuery.stringifyJSON(data)
                        },
                        type: 'POST',
                        success: function(re) {
                            json = $.parseJSON(re);
                            if (json.errno == 0) {
                                cQuery('#js_order_success').mask();
                                $('.js_order_success_txt').html('修改联系人请求已发送，请耐心等待携程确认，谢谢！');
                                $('.js_order_success_title').html('修改联系人');
                                setTimeout(function() {location.reload();}, 2000);
                            }
                            else {
                                cQuery('#js_pop_error').mask();
                                $('#js_pop_errormsg').html(json.errmsg);
                            }
                        },
                        error : function () {
                            alert('网络出错，请重试');
                        }
                    });
                }
            }
        },
        //其他事件交互
        orderOtherUi : function () {
            var titleDom = $('.js_order_list_title'),
                titleSpecialDom = $('.js_order_list_title_ins'),
                boldBtn = $('.js_order_list_boldBtn');
            titleDom.on('click', function() {
                var nextTr = $(this).parents('tr').next();
                    iconDom = $(this).find('i');
                if(iconDom.hasClass('icon_down')) {
                    $(this).removeClass('cur');
                    iconDom.removeClass('icon_down').addClass('icon_up');
                }
                else{
                    $(this).addClass('cur');
                    iconDom.removeClass('icon_up').addClass('icon_down');
                }
                nextTr.toggle();
            });
            titleSpecialDom.on('click', function() {
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
            $.getScript(craftTypeUrl, function() {
                var getData = function(page) {
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
                cQuery.mod.load('jmp', '1.0', function() {
                    $('span[mod1="jmpInfo"]').each(function() {
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
        scrollspyEvent: function() {
            var orderTab = $('#js_order_nav');
            return {
                init: function() {
                    var self = this,
                        orderTab = $('#js_order_nav');
                    $(document).ready(function () {
                        //tab滚动监听 scrollspy
                        orderTab.find('a').on('click', function() {
                            orderTab.scrollspy("to", $(this).attr("href"));
                        });
                        orderTab.scrollspy({
                            offsetY: 42,
                            onchange: function(hrefid, $hrefs, $targets) { //hrefs 触发标记 targets目标对象
                                $hrefs.removeClass("cur");
                                $hrefs.filter("[href='#" + hrefid + "']").addClass("cur");
                            }
                        });
                    });
                    self.barScrollEvent();
                    self.hideBarTitle();
                },
                barScrollEvent: function() {
                    var barShow = function() {
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
                                ie6ClearTime = setTimeout(function() {
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
                    $(window).on('scroll resize', function() {
                        barShow();
                    });
                },
                //如果没有内容时相应的锚点隐藏
                hideBarTitle: function () {
                    var anchorDom = $('.order_box').find('.base_anchor'),
                        anchorBarDom = $('#js_order_nav').find('a').not('.contact_ctrip'),
                        anchorArry = [];
                    _.each(anchorDom, function (index, i){
                        var id = $(index).attr('id');
                        anchorArry.push(id);
                    });
                    _.each(anchorBarDom, function (index, i){
                        var hrefId = $(index).attr('href').substring(1);
                        if(_.indexOf(anchorArry, hrefId) > -1) {
                            $(index).show();
                        }
                    });
                }
            }
        }
    };
    $(function() {
        orderDetail.init();
    });
});