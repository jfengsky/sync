define(function (require, exports, module) {
    var $ = require('jquery');
    var _ = require('underscore');
    //var FormContainer = require('../Modules/FormContainer');
    var tplPassengerStatic = require('../tpl/myctrip/order_detail_passenger_static.html.js');
    var tplPassengerEdit = require('../tpl/myctrip/order_detail_passenger_form.html.js');
    var Travellers = require('../order/Travellers');
    var orderUtil = require('../order/util');
    var EventEmitter = require("../Modules/EventEmitter");

    var Input = require('../Modules/InputBase');
    var Select = require('../Modules/Select');

    var qbo = '';
    if (DataOrder.data.qb_o) {
        qbo = DataOrder.data.qb_o;
    };

    Travellers.setJQuery($);
    window.jq = $;

    (function () {
        Handlebars.registerHelper("equal", function (a, b, v1, v2) {
            return a == b ? v1 : v2;
        });
        Handlebars.registerHelper('add', function (a, b) {
            return a + b;
        });
        Handlebars.registerHelper('log', function (o) {
            try { console.log(o); } catch (e) { };
            return '';
        });
    })();

    var fieldsNotTheSameName = [
        // 出生地
        {
            // 苗红卫，是另一个页面现做的
            "miaohongwei_name": 'HomePlace',
            // 李金川，名字跟之前的不一样，蛋疼
            "lijinchuan_name": 'Addcity'
        }
    ];

    var editCheck = {
        changeInputs: [],
        init: function (wrapNode) {
            var self = this;
            self.changeInputs = [];
            _.each(wrapNode.find('.mod_list'), function (passengerDom, i) {
                var passengerChangeInputs = self.changeInputs[i] = [];

                _.each($(passengerDom).find('input,select'), function (inputDom) {
                    var isInput = inputDom.nodeName.toLowerCase() == 'input';
                    var Klass = isInput ? Input : Select;
                    var input = Klass.get({
                        node: $(inputDom)
                    });
                    input.on('change', function (value, oldValue) {
                        if (value != this.defaultValue) {
                            if (_.indexOf(passengerChangeInputs, this) < 0) passengerChangeInputs.push(this);
                        }
                        else {
                            passengerChangeInputs = _.without(passengerChangeInputs, this);
                        }
                    });
                });
            });
        },
        isAnyoneEdit: function (passengerIndex) {
            return this.changeInputs[passengerIndex] && this.changeInputs[passengerIndex].length > 0;
        }
    };

    var getCardTips = function (national, targetPrdIsOverSea) {
        var passengers = GV.app.detail.data.OrderPassenger;
        var passengerWithIDCard2 = '';
        var tip = '';
        // 有任何一个是护照的
        //if (_.find(, function (passenger) { return passenger.IDCardType == 2 })) {
        //    if (national == '中国香港' || national == '中国澳门') {
        //        // 目的地是海外（含港澳台）
        //        if (targetPrdIsOverSea) {
        //            tip = '若您持有中国香港、中国澳门签发的护照前往中国大陆境外，请您携带护照和有效的回乡证办理出境手续。';
        //        }
        //        // 目的地是国内（不含港澳台）
        //        else {
        //            tip = '若您持有中国香港、中国澳门签发的护照在中国大陆境内旅行，请您携带护照和有效的回乡证办理登机与入住手续。';
        //        }
        //    }
        //    else if (national == '中国台湾') {
        //        if (targetPrdIsOverSea) {
        //            tip = '若您持有中国台湾签发的护照前往中国大陆境外，请您携带护照和有效的台胞证办理出境手续。';
        //        }
        //        else {
        //            tip = '若您持有中国台湾签发的护照在中国大陆境内旅行，请您携带护照和有效的台胞证办理登机和入住手续。';
        //        }
        //    }
        //}
    };

    var getIsEditButtonShow = function (GVdata, oldPassengerNode) {
        var IsCanEditClient;
        if (GVdata.IsCanEditClient !== undefined) {
            IsCanEditClient = GVdata.IsCanEditClient;
        }
        else {
            IsCanEditClient = oldPassengerNode && oldPassengerNode.find('#BtnCanEdit').length > 0;
        }
        return IsCanEditClient && GVdata.CustomerInfoTemplateItem;
    };

    GV.ready(function () {

        var GVdata = initGVdata(GV.app.detail.data);

        var fillsetIDEdit = $('#fillsetID');
        var fillsetIDShown = $('#fillsetIDShown');
        var travellersIDEdit = $('#travellersID');
        var travellersIDShown = $('#travellersIDShown');
        var passengerContainer;// = $('#js-passenger');
        //var passengersNodes = passengerContainer.find('.mod_main .mod_list');
        //var adultNodes = passengersNodes.filter(function (i,dom) { return $(dom).find('>dt>.adult').length; });
        var btnEdit;// = passengerContainer.find('#BtnCanEdit');

        //var passengersBaseInfo = _.map(passengersNodes,function (dom) {
        //    return {
        //        isAdult: $(dom).find('>dt>.adult').length
        //    }
        //});
        var passengersBaseInfo = _.map(GVdata.OrderPassenger, function (passenger) {
            return {
                // 1 成人，0 儿童
                isAdult: passenger.clientType == 1
            };
        });

        //var aduNumber = adultNodes.length;
        var adults = _.filter(passengersBaseInfo, function (passenger) {
            return passenger.isAdult;
        });
        var aduNumber = adults.length;
        var childrenNumber = GVdata.OrderPassenger.length - adults.length;

        var Validate = require('../order/Validate');
        var isAjaxSaving;
        var context = {
            render: orderUtil.render,
            status: require('../order/status'),
            regNational: function (el) {
                var regNational = orderUtil.regNational;
                return $.proxy(regNational, this)(el);
            },
            hideTip: require('../order/util').hideTip,
            reviewPos: $.proxy(require('../order/util').reviewPos, context),
            common: {
                getRoles: orderUtil.getRoles,
                parseCNId: orderUtil.parseCNId,
                isDate: orderUtil.isDate
            },
            formData: require('../order/formData'),
            tpl: {
                // 到使用时再设定
                //traveller: require('../tpl/order/traveller.html.js'),
                // 这三个 Tips，目前没有样式，先不显示
                //nameTips: require('../tpl/order/nameTips.html.js'),
                //nameCNTips: require('../tpl/order/nameCNTips.html.js'),
                //nameENTips: require('../tpl/order/nameENTips.html.js'),
            },
            Reg: require('../order/checkReg'),
            validate: Validate,
            data: {
                roles: {
                    // 到使用时再设定
                    //fillsetID: fillsetIDEdit,
                    //travellersID: travellersIDEdit
                },
                initData: {
                    OrderId: GVdata.OrderId,
                    serverDataTime: GVdata.serverDataTime,
                    departDate: GVdata.departDate,
                    returnDate: GVdata.returnDate,
                    ProductType: GVdata.ProductType,
                    OrderPassengerList: GVdata.OrderPassenger,
                    CustomerInfoTemplate: {
                        CustomerInfoItems: GVdata.CustomerInfoTemplateItem
                    },
                    aduNumber: aduNumber,
                    chlidNumber: childrenNumber,//passengersNodes.length - aduNumber,
                    onBeforeRender: function (data) {
                        _.each(data.list, function (passengerData) {
                            passengerData.InputClassType = 'PkgOrderDetail.aspx';
                        });
                    },
                    onAfterRender: function () { }
                }
            },
            onAfterSave: function () { }
        };
        Validate.setOrderprocess(context);

        var initRender = function () {

            var isEditButtonShow = getIsEditButtonShow(GVdata, $('#js-passenger-old'));
            //后台喷出的需要先移除掉
            $('#js-passenger-old').remove();

            context.tpl.traveller = require('../tpl/myctrip/order_detail_passenger_static.html.js');
            context.data.roles.fillsetID = fillsetIDShown;
            context.data.roles.travellersID = travellersIDShown;
            var traveller = Travellers.call(context);
            traveller.init(context.data, {
                notToIns: true
            });

            passengerContainer = $('#js-passenger');
            btnEdit = passengerContainer.find('.mod_side .btn_blue');//('#BtnCanEdit');

            traveller.toIns(passengerContainer.find('.mod_main'));

            if (!isEditButtonShow) btnEdit.remove();

            // 隐藏掉值为空的字段
            _.each(passengerContainer.find('.mod_list td'), function (tdDom) {
                if ($.trim(tdDom.innerHTML) == '') {
                    $(tdDom).parents('tr').remove();
                }
            });

            var cardTip = getCardTips();

            btnEdit.on('click', function () {

                travellersIDEdit.empty();
                removeEditNode();

                context.tpl.traveller = require('../tpl/order/traveller.html.js');
                context.data.roles.fillsetID = fillsetIDEdit,
                context.data.roles.travellersID = travellersIDEdit
                context.data.initData.onAfterRender = editOnAfterRender;
                context.onAfterSave = editOnAfterSave;

                var traveller = Travellers.call(context);
                traveller.init(context.data, {
                    notToIns: true
                });

                var containerEditNode = $('#js-passenger-edit');
                var btnSave = containerEditNode.find('.btn_blue');
                var btnCancel = containerEditNode.find('.btn_white');

                var listWrapperNode = containerEditNode.find('.mod_main');

                // 某些字段不能修改
                var canNotEditFields = ['name', 'nameCN', 'nameEN'];
                _.each(canNotEditFields, function (role) {
                    listWrapperNode.find('input[role=' + role + ']').attr('disabled', 'disabled');
                });

                traveller.toIns(listWrapperNode);

                editCheck.init(containerEditNode);
                // 判断默认选择是否稍后提供，不是则去掉
                var selectLater = $("#js-passenger-edit").find("select[role='idCardType']");
                $.each(selectLater, function(index, item){
                  if( $(item).val() != 100 ){
                    // 删除option
                    $.each($(item).find('option'), function(i, _option){
                      if( $(_option).val() == 100 ) {
                        $(_option).remove();
                      }
                    });
                  }
                });

                btnSave.on('click', function (e) {
                    traveller.verify(listWrapperNode, {
                        canNotEditFields: canNotEditFields
                    });
                });

                btnCancel.on('click', function (e) {
                    _.each(traveller.instances, function (visitor) {
                        visitor.hideTip();
                    });
                    passengerContainer.show();
                    removeEditNode();
                });
            });
        };
        
        // 如果没有模版，就由后台输出
        if (GVdata.CustomerInfoTemplateItem) initRender();

        function removeEditNode() {
            $('#js-passenger-edit').remove();
        }

        function editOnAfterRender () {
            var listNodes = travellersIDEdit.find('.product_input');
            var html = Handlebars.compile(tplPassengerEdit)({
                passengers: _.map(passengersBaseInfo, function (data, i) {
                    data.ulHTML = listNodes.eq(i).find('.input_box')[0].outerHTML;
                    return data;
                })
            });
            //console.log(html.substr(0, 500));
            passengerContainer.hide().after(html);
        }

        function editOnAfterSave() {
            if (isAjaxSaving) return;

            /**
             * 检查证件类型是否为稍后提供
             */
            var cidCardTypes = cQuery("#js-passenger-edit select[role='idCardType']");
            for (var i = 0; i < cidCardTypes.length; i++){
              if(cQuery(cidCardTypes[i]).value() == 100){
                new this.validate({
                  target: cQuery(cidCardTypes[i]),
                  data: '请选择正确的证件类型',
                  errorClass: 'f_error'
                }).show();
                return false;
              }
            }

            var passengers = this.formData.PassengerInfos;
            _.each(passengers, function (passenger, i) {
                // 1 成人，0 儿童
                passenger.AgeRang = passengersBaseInfo[i].isAdult ? 1 : 0;
                passenger.PassengerId = GVdata.OrderPassenger[i].clientID;
            });

            // 字段替换
            // 要把数据传给李金川的接口，再把字段名改成李金川的名字
            _.each(passengers, function (passenger) {
                _.each(fieldsNotTheSameName, function (name) {
                    if (!_.isUndefined(passenger[name.miaohongwei_name])) {
                        passenger[name.lijinchuan_name] = passenger[name.miaohongwei_name];
                        delete passenger[name.miaohongwei_name];
                    }
                });
            });
            // 增加 IsEdit
            _.each(passengers, function (passenger, i) {
                passenger.IsEdit = editCheck.isAnyoneEdit(i);
            });
            //var IsEdit = editCheck.isAnyoneEdit();
            var data = {
                //IsEdit: IsEdit,
                OrderId: GVdata.OrderId,
                OrderPassenger: passengers
            };
            //'';
            isAjaxSaving = true;
            $.ajax({
                url: GV.app.detail.api.UpdateOrderUrl,
                type: 'POST',
                data: {
                    RequestData: cQuery.stringifyJSON(data),
                    "qb_o": qbo
                },
                timeout: 120000
            })
            .success(function (json) {
                if (_.isString(json)) json = $.parseJSON(json);
                //location.reload();
                if (json.errno == 0) {
                    GV.emit('save-success', {
                        type: 'passenger',
                        msg: data.msg
                    });
                }
                else {
                    GV.emit('save-error', {
                        type: 'passenger',
                        msg: json.errmsg
                    });
                }
            })
            .error(function (json) {
                GV.emit('save-error', {
                    type: 'passenger',
                    msg: '网络错误，请重试'
                });
            })
            .always(function () {
                isAjaxSaving = false;
            });
        }

//        /**
//         * 显示用户资料上传按钮
//         * IsHealthStuffNeeded==true&& IsVisaStuffNeeded==true,显示红框中的button，并且button的value是查看/上传签证材料,
//         * 当IsHealthStuffNeeded==false&& IsVisaStuffNeeded==true,显示红框中的button，并且button的value是查看/上传签证材料
//         * 当IsHealthStuffNeeded==true&& IsVisaStuffNeeded==false，显示红框中的button,并且button的value是查看/上传材料
//         * 当IsHealthStuffNeeded==false&& IsVisaStuffNeeded==false,不显示红框中的button
//         *
//         */
//        var healsn = GV.app.detail.data.IsHealthStuffNeeded,
//            visasn = GV.app.detail.data.IsVisaStuffNeeded,
//            uploadUrl = '../OrderDetailManage/Materials.aspx?orderid=' + GV.app.detail.data.OrderId;
//        $('.J_infoup').attr('href', uploadUrl);
//        if( (healsn && visasn) || (!healsn && visasn) ){
//            $('.J_infoup').html('查看/上传签证材料');
//            $('#J_uptips').show();
//        } else if ( healsn && !visasn ) {
//            $('.J_infoup').html('查看/上传材料');
//            $('#J_uptips').show();
//        } else {
//            $('.J_infoup').remove();
//        }
//        $('.J_infoup').css('display','block');
    });

    function initGVdata(GVdata) {
        _.each(GVdata.OrderPassenger, function (passenger) {
            var EnglishName = passenger.EnglishName;
            passenger.ENFirstName = EnglishName ? EnglishName.First : '';
            passenger.ENMiddleName = EnglishName ? EnglishName.Mid : '';
            passenger.ENLastName = EnglishName ? EnglishName.Last : '';
            delete passenger.EnglishName;
            delete passenger.Nationality;

            //passenger.HomePlace = passenger.HomePlace || '';
            // 这个数据初始化要给苗红卫的代码用，所以要删了李金川的名字，改为苗红卫的名字
            _.each(fieldsNotTheSameName, function (name) {
                passenger[name.miaohongwei_name] = passenger[name.lijinchuan_name];
                delete passenger[name.lijinchuan_name];
            });
        });

        // 现在后台喷出来的数据有问题，等他们修复了把这一段删了 ---- begin
        //_.each($('#js-passenger .mod_list'), function (mod, i) {
        //    var isAdult = $(mod).find('>dt>.adult').length;
        //    // 成人1，儿童0
        //    GVdata.OrderPassenger[i].clientType = isAdult ? 1 : 0;
        //});
        // --- end

        return GVdata;
    }

    /**
    * @param type
    * @param msg
    * @param title
    */
    GV.on('save-success', function (options) {
        //if(options.type == '')
        var msg = options.msg || '修改旅客请求已发送，请耐心等待携程确认，谢谢！';
        var title = options.title || '修改旅客';
        $('.js_order_success_txt').html(msg);
        $('.js_order_success_title').html(title);
        cQuery('#js_order_success').mask();
        setTimeout(function () {
            location.reload();
        }, 3000);
    });

    /**
    * @param msg
    */
    GV.on('save-error', function (options) {
        cQuery('#js_pop_error').mask();
        $('#js_pop_errormsg').html(options.msg);
    });
});