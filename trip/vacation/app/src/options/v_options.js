 /*
  * @Author :    qxzhan
  * @Date   :    2014/01/06
  * @Desc   :    附加产品选择页
  */
 define(function(require, exports) {
   var $ = require("jquery"),
      options = {
       tpl: {
         /*产品模板*/
         recommend: '<table width="100%" class="recommend_list_tit">\
                      <tbody>\
                      <tr>\
                        <th style="text-align: left; padding-left: 10px;">名称</th>\
                        <th style="width: 60px">市场价</th>\
                        <th style="width: 60px">携程价</th>\
                        <th style="width: 105px">使用日期</th>\
                        <th style="width: 90px;text-align:left;">份数</th>\
                        <th style="width: 50px">单项总价</th>\
                        <th style="width: 40px"></th>\
                      </tr>\
                     </tbody>\
                    </table>\
                    <ul class="recommend_list_col" id="js_options_data">\
                      {{#datas}}\
                        <li>\
                          <h4 class="recommend_title">{{title}}</h4>\
                            <table width="100%" class="recommend_list">\
                             {{#each data}}\
                              <tr class="js_options_title" {{#is @index ">" 2}}style="display:none"{{/is}}>\
                                 <td style="text-align: left;">{{#if Introduction}}<a href="###" class="js_options_name">{{Name}}</a>{{else}}{{Name}}{{/if}}</td>\
                                 <td style="width: 60px;"><span class="market_price"><dfn class="js_options_MarketPrice">{{#if SelectMarketPrice}}{{SelectMarketPrice}}{{else}}--{{/if}}</dfn></span></td>\
                                 <td style="width: 60px;"><span class="ctrip_price"><dfn class="js_options_Price">{{#if SelectPrice}}{{SelectPrice}}{{else}}--{{/if}}</dfn></span></td>\
                                 <td style="width: 105px;">\
                                   {{#if IsChooseDate}}\
                                   <select class="js_options_Date">{{#each Inventory}}<option {{#is ../SelectUseDate "===" Date}}selected="selected"{{/is}} data-type="{{#portion MinQuantity MaxQuantity StepQuantity MarketPrice Price}}{{/portion}}" data-quantity={{DefaultQuantity}}>{{#date Date}}{{/date}}</option>{{/each}}</select>\
                                   {{else}}\
                                    --\
                                   {{/if}}\
                                 </td>\
                                 <td style="width: 90px;text-align:left;">\
                                   <select class="js_options_Portion" data-select={{SelectUseCopies}}  data-price={{SelectPrice}} data-date={{SelectUseDate}} data-resource={{ResourceID}} style="width:44px">\
                                    {{#copies SelectMinQuantity SelectMaxQuantity SelectStepQuantity ResourceID SelectUseCopies}}{{/copies}}\
                                   </select>&nbsp;{{Unit}}\
                                </td>\
                                <td style="width: 50px;" class="js_options_count">{{#total SelectPrice SelectUseCopies}}{{/total}}</td>\
                                <td style="width: 40px;" class="js_options_select"><i class="{{#if SelectUseCopies}}htl_icon_yes{{/if}}"></i></td>\
                               </tr>\
                                {{#if Introduction}}<tr class="js_options_wtite" style="display:none"><td colspan="7"><div class="hidden_content basefix"><i style="left:20px" class="arrow"></i><div>{{#deal Introduction}}{{/deal}}</div></div></td></tr>{{/if}}\
                                {{/each}}\
                             </table>\
                            {{#is data.length ">" 3}}<p class="list_more"><a class="icon_down js_options_more" href="###"><span>更多</span><b></b></a></p>{{/is}}\
                            </li>\
                      {{/datas}}\
                    </ul>',
         /*右侧价格框*/
         price: '<ul class="price_box">\
                      <li class="total_price2"><strong>总价</strong><span class="price2"><dfn>¥</dfn><span class="js_options_total">{{Amount}}</span></span></li>\
                      <li>\
                        <div class="basefix"><span class="price_item">基本团费</span></div>\
                        {{#if AduNumber}}<div class="basefix"><span class="price_item">成人</span><strong class="price_detail"><span>{{AduNumber}}&nbsp;×</span><dfn>¥</dfn>{{AduAmount}}</strong></div>{{/if}}\
                        {{#if ChildNumber}}<div class="basefix"><span class="price_item">儿童{{#is IsNoBed "===" 1}}(不占床){{/is}}</span><strong class="price_detail"><span>{{ChildNumber}}&nbsp;×</span><dfn>¥</dfn>{{ChildAmoun}}</strong></div>{{/if}}\
                      </li>\
                      <li id="js_options_surchargeLi" {{#is DiscountAmount "===" 0}}class="border_none"{{/is}} {{#is Surcharge "===" 0}}style="display:none"{{/is}}><span class="price_item">附加费</span><strong class="price_detail"><dfn>¥</dfn><strong id="js_options_surcharge">{{Surcharge}}</strong></strong></li>\
                      {{#if DiscountAmount}}<li class="border_none"><span class="price_item">优惠<i>减</i></span><strong class="price_detail highlight">-<dfn>¥</dfn>{{DiscountAmount}}</strong></li>{{/if}}\
                      <li class="border_none"><a class="price_btn_order" href="###" id="js_options_next">请稍候...</a></li>\
                   </ul>'
       },
       /*依赖的DOM结构 最好不要更改*/
       dom: {
         dateDom: ".js_options_Date",                                 /*TD 使用日期*/
         portionDom: ".js_options_Portion",                           /*TD 份数*/
         priceDom: ".js_options_Price",                               /*TD 市场价*/
         marketDom: ".js_options_MarketPrice",                        /*TD 携程价*/
         countDom: ".js_options_count",                               /*TD 单项总价*/
         selectDom: ".js_options_select",                             /*TD 选择份数的提示图标*/
         nameDom: ".js_options_name",                                 /*TD 产品名称*/
         writeDom: ".js_options_wtite",                               /*TR 产品说明*/
         titleDom: ".js_options_title",                               /*TR 产品*/
         moreDom: ".js_options_more",                                 /*A 产品大于3条数据显示*/
         totalDom: ".js_options_total",                               /*SPAN 总价*/
         optionsDom: "#js_options",                                   /*DIV 为您推荐的附加产品*/
         wrapDom: "#js_options_wrap",                                 /*DIV 右侧价格块*/
         dataDom: "#js_options_data",                                 /*UL 为您推荐的附加产品*/
         surchargeDom: "#js_options_surcharge",                       /*SPAN 附加费*/
         surchargeLiDom: "#js_options_surchargeLi",                   /*Li 附加费*/
         submitDom: "#js_options_submit",                             /*A 左下部分提交按钮*/
         nextDom: "#js_options_next"                                  /*A 右侧部分提交按钮*/
       },
       /*初始化数据*/
       config: {
         initData: GV.app.order.initData,
         Amount: GV.app.order.initData.price.Amount,                  /*总价*/
         Surcharge:GV.app.order.initData.price.Surcharge              /*附加费*/
       },
       /*公用方法*/
       tips: {
         /*加载中提示*/
         loading: function(pId, pElement) {
           var _loading = $('#' + pId);
               if (!_loading.length) {
                 _loading = $('<div class="query" id="' + pId + '"/>').css({
                   "border": "0px",
                   "margin-bottom": "0px"
                 });
                 _loading.html('<img src="http://pic.c-ctrip.com/common/loading_50.gif" style="vertical-align: middle;">正在为您查询，请稍候...').appendTo(pElement);
               } else {
                 _loading.remove();
               }
         },
         /*存储交互数据*/
         array: function(pMin, pMax, pStep) {
           var _array = [];
               if (pMin == pMax) {
                 _array.push(pMin);
               } 
               else if (pMax > pMin) {
                 while (pMin <= pMax) {
                   _array.push(pMin);
                   pMin += pStep;
                 }
                 if (_array[_array.length - 1] != pMax) {
                   _array.push(pMax);
                 }
               }
               if (_array[0] != 0) {
                 _array.unshift(0);
               }
               return _array;
         },
         getTop: function(pelemnt) {
           var _offset = pelemnt.offsetTop;
               if (pelemnt.offsetParent) {
                 _offset = _offset + options.tips.getTop(pelemnt.offsetParent);
               }
               return _offset;
         },
         bodyScrollTop: function() {
           return document.documentElement.scrollTop || document.body.scrollTop;
         },
         /*固定DOM位置不更随页面滚动*/
         suspend: function(pelemnt) {
           var _element = document.getElementById(pelemnt),
               _top = options.tips.getTop(_element),
               _isIE6 = /msie 6/i.test(navigator.userAgent);
               $(window).on("scroll", function() {
                 if (options.tips.bodyScrollTop() > _top) {
                   _element.style.position = (_isIE6) ? "absolute" : "fixed";
                   _element.style.zIndex = 9999;
                   _element.style.top = (_isIE6) ? options.tips.bodyScrollTop() + "px" : "0px";
                 } else {
                   _element.style.position = "static";
                 }
              });
         },
         /*根据价格计判断是否显示附加费和优惠*/
         showDom: function(price, pDom) {
           if (price != 0) {
             $(pDom).show();
           } else {
             $(pDom).hide();
           }
         }
       },
      /*模板注册方法*/
       render: function() {
         /*使用日期*/
         Handlebars.registerHelper('date', function(pDate) {
           return new Handlebars.SafeString(pDate.split("T")[0]);
         });
         /*输出HTML标签*/
         Handlebars.registerHelper('deal', function(pData) {
           return new Handlebars.SafeString(pData);
         });
         // /*计算市场价和携程价*/
         // Handlebars.registerHelper('price', function(pSelect, pMarket) {
         //   if (pSelect) {
         //     if (pSelect == 0) {
         //       return new Handlebars.SafeString("--");
         //     }
         //     else{
         //       return new Handlebars.SafeString(pSelect);
         //     }
         //   } else {
         //     if (pMarket == 0) {
         //       return new Handlebars.SafeString("--");
         //     }
         //     else{
         //      return new Handlebars.SafeString(pMarket);
         //     }
         //   }
         // });
         /*单项总价*/
         Handlebars.registerHelper('total', function(price, pCopies) {
           if (price && pCopies) {
             if (price * pCopies == 0) {
               return new Handlebars.SafeString("--");
             } 
             else if (price * pCopies > 0) {
               return new Handlebars.SafeString("+" + price * pCopies);
             } 
             else {
               return new Handlebars.SafeString(price * pCopies);
             }
           } 
           else {
             return new Handlebars.SafeString("--");
           }
         });
         /*将相关数据注册到日期*/
         Handlebars.registerHelper('portion', function(pMin, pMax, pStep, pMarket, pCtrip) {
           var _option = "",
               _array = options.tips.array(pMin, pMax, pStep),
               _len = _array.length;
               /*使用日期项存储*/
               for (var _i = 0; _i < _len; _i++) {
                 _option += _array[_i] + ",";
               }
               /*同时存储携程价和市场价*/
               _option += "@" + pMarket + "@" + pCtrip;
               return new Handlebars.SafeString(_option);
         });
         /*份数注册*/
         Handlebars.registerHelper('copies', function(pMin, pMax, pStep, pResource, pCopies) {
           var _option = "",
               _array = options.tips.array(pMin, pMax, pStep),
               _len = _array.length;
               /*份数存储项*/
               for (var _i = 0; _i < _len; _i++) {
                 /*如果有已选的份数显示最前面*/
                 if (_array[_i] == pCopies) {
                   _option += "<option selected>" + _array[_i] + "</option>";
                 } else {
                   _option += "<option>" + _array[_i] + "</option>";
                 }
               }
               return new Handlebars.SafeString(_option);
         });
       },
       /*选择事件*/
       dataSelect: function() {
         /*依赖DOM*/
         var _dateDom = options.dom.dateDom,
             _portionDom = options.dom.portionDom,
             _optionsDom = options.dom.optionsDom,
             _priceDom = options.dom.priceDom,
             _marketDom = options.dom.marketDom,
             _countDom = options.dom.countDom,
             _selectDom = options.dom.selectDom,
             _classDom = "htl_icon_yes",
             _surchargeDom = options.dom.surchargeDom,
             _surchargeLiDom = options.dom.surchargeLiDom,
             _totalDom = options.dom.totalDom;
             /*选择使用日期*/
             $(_optionsDom).delegate(_dateDom, "change", function() {
               /*获取选中的option项*/
               var _type = $(this).find("option:selected").data("type").split("@"),
                   /*获取选中的日期*/
                   _val = $(this).find("option:selected").val(),
                   /*存储用户选择的份数 默认存储默认份数*/
                   _select = $(this).find("option:selected").data("quantity"),
                   /*获取份数*/
                   _unit = _type[0].split(","),
                   _option = "",
                   _parents = $(this).parents("tr"),
                   /*市场价*/
                   _market = _type[1],
                   /*携程价*/
                   _ctrip = _type[2],
                   /*找到依赖的dom*/
                   _count = _parents.find(_countDom),
                   _iDom = _parents.find(_selectDom).find("i"),
                   _portion = _parents.find(_portionDom),
                   _mark = _parents.find(_marketDom),
                   _price = _parents.find(_priceDom),
                   /*价差  进去上一个日期选择的价格加上这个日期的价格*/
                   _total = -_portion.data("price") * _portion.data("select") + _select  * _ctrip,
                    /*显示单项总价*/
                   _result = _ctrip * _select;
                   /*获取不同日期对应的不同产品的份数*/
                   for (var _i = 0 , _len = _unit.length - 1; _i < _len; _i++) {
                    /*带上默认选择份数*/
                     if(_unit[_i] == _select){
                       _option += "<option  selected>" + _unit[_i] + "</option>";
                     }
                     else{
                      _option += "<option>" + _unit[_i] + "</option>";
                     }
                     }
                   /*份数列表*/
                   _portion.html(_option);
                   /*市场价*/
                   if(_market != 0){
                    _mark.html(_market);
                   }
                   else{
                    _mark.html("--");
                   }
                   /*携程价*/
                   if(_ctrip != 0){
                     _price.html(_ctrip);
                   }
                   else{
                    _price.html("--");
                   }
                   /*存储日期对应的价格*/
                   _portion.data("price", _ctrip);
                   /*存储选中的日期*/
                   _portion.data("date", _val);
                   /*存储默认选择份数*/
                   _portion.data("select", _select);
                   /*单项总价*/
                   if (_result == 0) {
                      _count.html("--");
                    } 
                   else {
                     if (_result > 0) {
                       _count.html("+" + _result);
                     } else {
                       _count.html(_result);
                     }
                    }
                   if(_select > 0){
                       _iDom.addClass(_classDom);
                   }
                   else{
                     _iDom.removeClass(_classDom);
                   }
                   if (_total != 0) {
                    $(_surchargeDom).html(options.config.Surcharge += _total);
                     options.tips.showDom(options.config.Surcharge, _surchargeLiDom);
                    } 
                   /*计算总价*/
                   $(_totalDom).html(options.config.Amount += _total);
                   
             });
         /*选择使用份数*/
         $(_optionsDom).delegate(_portionDom, "change", function() {
           var _val = $(this).find("option:selected").val(),
               _selected = $(this).data("select"),
               _parents = $(this).parents("tr"),
               _price = $(this).data("price"),
               _count = _parents.find(_countDom),
               _iDom = _parents.find(_selectDom).find("i"),
               _dateSelect = _parents.find(_dateDom).find("option:selected");
                /*价差*/
               _totalPrice = (_val - _selected) * _price,
               /*显示单项总价*/
               _result = _price * _val; 
               if (_price > 0) {
                   _count.html("+" + _result);
                } 
                 else if (_price < 0) {
                   _count.html(_result);
                } 
                 else {
                   _count.html("--");
                 }
                  $(_surchargeDom).html(options.config.Surcharge += _totalPrice);
                   options.tips.showDom(options.config.Surcharge, _surchargeLiDom);
                 if (_val > 0) {
                   _iDom.addClass(_classDom);
                 } 
                 else {
                   _iDom.removeClass(_classDom);
                   _count.html("--");
                 }
               /*计算总价*/
               $(_totalDom).html(options.config.Amount += _totalPrice);
               $(this).data("select", _val);
               _dateSelect.data("quantity",_val);
         });
       },
       /*展开大于三条的数据*/
       showData: function() {
        /*依赖DOM*/
         var _optionsDom = options.dom.optionsDom,
             _moreDom = options.dom.moreDom,
             _portionDom = options.dom.portionDom,
             _nameDom = options.dom.nameDom,
             _writeDom = options.dom.writeDom,
             _titleDom = options.dom.titleDom,
             _hideDom = options.dom.hideDom,
             _icon = ["icon_up", "icon_down"],
             _text = ["更多" , "收起"],
             /*存储没有选中和选中的产品*/
             _flip = [],
             _selected = [];
             /*展开和收起产品*/
             $(_optionsDom).delegate(_moreDom, "click", function() {
               var _spanDom = $(this).find("span"),
                   _parents = $(this).parents("li"),
                   _trDom = _parents.find(_titleDom),
                   _len = _trDom.length,
                   _tbody = _parents.find("tbody");
                   /*展开*/
                   if (_spanDom.html() == _text[0]) {
                     _trDom.show();
                     _spanDom.html(_text[1]);
                     $(this).removeClass(_icon[1]).addClass(_icon[0]);
                     /*清空数组*/
                     _flip = [];
                     _selected = [];
                   }
                   /*收起 需要将用户选择的产品置顶*/
                   else {
                     for (var _i = 0; _i < _len; _i++) {
                        /*选择的数据放在_selected数组,没有选择的数据放在_flip数组*/
                       if (_trDom.eq(_i).find(_portionDom).find("option:selected").val() > 0) {
                         _selected.push(_trDom.get(_i));
                         _selected.push(_trDom.eq(_i).next(_writeDom).get(0));
                        } else {
                         _flip.push(_trDom.get(_i));
                         _flip.push(_trDom.eq(_i).next(_writeDom).get(0));
                       }
                     }
                     _tbody.append($.merge(_selected, _flip));
                     _spanDom.html(_text[0]);
                     $(this).removeClass(_icon[0]).addClass(_icon[1]);
                     /*显示前三条产品*/
                     _parents.find(_titleDom).hide().slice(0, 3).show();
                     /*不操作用户选择的产品的说明信息*/
                     _parents.find(_writeDom).not(_parents.find(_titleDom).slice(0, 3).next(_writeDom)).hide();
                   }
          });
         /*判断显示隐藏*/
         $(_optionsDom).delegate(_nameDom, "click", function() {
           var _dom = $(this).parents("tr").next(_writeDom);
               if (_dom.css("display") == "none") {
                 _dom.show();
               } else {
                 _dom.hide();
               }
         });
       },
       /*价格框就计算*/
       countPrice: function(pSurcharge) {
         var _price = options.config.initData.price,
             _wrapDom = options.dom.wrapDom,
             _totalDom = options.dom.totalDom,
             _priceData = {
                 Amount: options.config.Amount += pSurcharge,                     /*总价*/
                 AduNumber: _price.AduNumber,                                     /*成人数*/
                 ChildNumber: _price.ChildNumber,                                 /*儿童数*/
                 AduAmount: parseInt(_price.AduAmount / _price.AduNumber),        /*成人价*/
                 ChildAmoun: parseInt(_price.ChildAmount / _price.ChildNumber),   /*儿童价*/
                 Surcharge: options.config.Surcharge += pSurcharge,               /*附加费*/
                 DiscountAmount: _price.DiscountAmount,                           /*优惠费*/
                 IsNoBed: _price.IsNoBed                                          /*=1表示儿童占床/*/
             };
           $(_totalDom).html(options.config.Amount);
           $(_wrapDom).prepend(Handlebars.compile(options.tpl.price)(_priceData));
           options.tips.suspend(_wrapDom.replace("#", ""));
       },
       /*为您推荐的附加产品*/
       products: function() {
         var _productData = options.config.initData,
             _productUrl = "ajax/OptionsNew/OptionalResourceSearch.ashx",
             _time = "0001-01-01T00:00:00",
             _tips = "js_loading",
             _text = "下一步",
             _param = window.location.search.substr(1),
             _selectedData = _productData.selectedJson,
             _selectedLen = _selectedData.length,
             /*第一次加载接口请求的参数*/
             _query = {
               ProductID: _productData.ProductID,
               DepartureCityID: _productData.DepartureCityID,
               DepartureDate: _productData.departDate,
               ReturnDate: _productData.returnDate,
               TravelDays: _productData.TravelDays,
               ResourceCategory: 0,
               AdultQuantity: _productData.aduNumber,
               ChildQuantity: _productData.chlidNumber,
               ReturnCount: 9999
             },
              /*依赖DOM*/
             _optionsDom = options.dom.optionsDom,
             _submitDom = options.dom.submitDom,
             _nextDom = options.dom.nextDom,
             /*存储没有选中的产品*/
             _flip = [],
             /*存储选中的产品*/
             _selected = [],
             /*附加费 算默认选项*/
             _surcharge = 0,
            /*错误跳转*/
             _error = function() {
               window.location.href = "Order.aspx?" + _param;
             };
             /*加载前提示*/
             options.tips.loading(_tips, _optionsDom);
             $.ajax({
               url: _productUrl,
               type: "POST",
               data: {
                 query: cQuery.stringifyJSON(_query)
               },
               success: function(data) {
                  var _data = $.parseJSON(data);
                     if (_data.errno == 0 && _data.data && _data.data.length > 0) {
                       var _len = _data.data.length,
                           /*存储每项的标题*/
                           _title = [],
                           /*组合数据，方便渲染*/
                           _groupData = {
                            datas: []
                           };
                           /*将data于已选数据结合*/
                           for (var _m = 0; _m < _selectedLen; _m++) {
                             for (_e = 0; _e < _len; _e++) {
                               //var _handleData = _data.data[_e];
                                   if (_selectedData[_m].ProductID == _data.data[_e].ResourceID) {
                                     var _inventory = _data.data[_e].Inventory,
                                         _inventoryLen = _inventory.length;
                                      if (_selectedData[_m].UseDate != _time) {
                                           for (var _v = 0; _v < _inventoryLen; _v++) {
                                             if (_inventory[_v].Date == _selectedData[_m].UseDate) {
                                               /*日期匹配*/
                                               //_handleData.SelectPrice = _inventory[_v].Price;
                                               //_handleData.SelectMarketPrice = _inventory[_v].MarketPrice;
                                               //_handleData.SelectUseDate = _selectedData[_m].UseDate;
                                               //_handleData.SelectUseCopies = _selectedData[_m].UseCopies;
                                               //_surcharge += _handleData.SelectPrice*_handleData.SelectUseCopies;
                                               /*份数以用户选中的份数为主*/
                                               _inventory[_v].DefaultQuantity = _selectedData[_m].UseCopies;
                                               /*用户已选择的的产品 总价和附加费既都不计算 字段attachPrice标识这种情况*/
                                               _data.data[_e].attachPrice = true;
                                               }
                                           }
                                         } else if (_selectedData[_m].UseDate == _time) {
                                           /*日期0001-01-01T00:00:00 说明匹配第一天*/
                                           //_handleData.SelectPrice = _inventory[0].Price;
                                           //_handleData.SelectMarketPrice = _inventory[0].MarketPrice;
                                           //_handleData.SelectUseDate = _inventory[0].Date;
                                           //_handleData.SelectUseCopies = _selectedData[_m].UseCopies;
                                           //_surcharge += _handleData.SelectPrice*_handleData.SelectUseCopies;
                                           /*份数以用户选中的份数为主*/
                                           _inventory[0].DefaultQuantity = _selectedData[_m].UseCopies;
                                           /*用户已选择的的产品 总价和附加费既都不计算 字段attachPrice标识这种情况*/
                                           _data.data[_e].attachPrice = true;
                                        }
                                   }
                             }
                           }
                           /*获取所有标题 后面分类数据*/
                           for (var _i = 0; _i < _len; _i++) {
                             _title.push(_data.data[_i].CategoryName);
                             /*计算附加费*/
                             var _dataJson = _data.data[_i],
                                 _attach = _dataJson.Inventory,
                                 _attachLen = _attach.length;
                                for(var _h = 0; _h < _attach.length; _h++){
                                   // if(_attach[_h].attachPrice){
                                   //    _surcharge += _attach[_h].Price * _attach[_h].DefaultQuantity;
                                   //  }
                                    /*组合数据，显示计算*/
                                    _dataJson.SelectPrice = _attach[0].Price;
                                    _dataJson.SelectMarketPrice = _attach[0].MarketPrice;
                                    _dataJson.SelectUseDate = _attach[0].Date;
                                    _dataJson.SelectUseCopies = _attach[0].DefaultQuantity;
                                    _dataJson.SelectMinQuantity = _attach[0].MinQuantity;
                                    _dataJson.SelectMaxQuantity = _attach[0].MaxQuantity;
                                    _dataJson.SelectStepQuantity = _attach[0].StepQuantity;
                                    /*找出默认份数大于0的数据 覆盖*/
                                   if(_attach[_h].DefaultQuantity > 0){
                                       _dataJson.Selected = true;
                                       _dataJson.SelectPrice = _attach[_h].Price;
                                       _dataJson.SelectMarketPrice = _attach[_h].MarketPrice;
                                       _dataJson.SelectUseDate = _attach[_h].Date;
                                       _dataJson.SelectUseCopies = _attach[_h].DefaultQuantity;
                                       break;
                                    }
                                  }
                                 // if (_data.data[_i].SelectUseCopies && _data.data[_i].SelectUseCopies > 0) {
                                 //   _selected.push(_data.data[_i]);
                                 // } else {
                                 //   _flip.push(_data.data[_i]);
                                 // }
                                /*组合数据将已选的数据放在前面*/
                                 if(_dataJson.Selected){
                                   _selected.push(_dataJson);
                                 }
                                 else{
                                  _flip.push(_dataJson);
                                 }
                              /*计算附加费*/
                              if(_dataJson.Selected && !_dataJson.attachPrice){
                                   _surcharge += _dataJson.SelectPrice * _dataJson.SelectUseCopies;
                                 }
                              }
                           for (var _n = 0, _unique = _title.unique().length; _n < _unique; _n++) {
                             /*拆分组合数据 方便渲染*/
                             _groupData.datas[_n] = {
                               title: _title.unique()[_n],
                               data: []
                             };
                             for (var _k = 0; _k < _len; _k++) {
                               if ($.merge(_selected, _flip)[_k].CategoryName == _title.unique()[_n]) {
                                 _groupData.datas[_n].data.push($.merge(_selected, _flip)[_k]);
                               }
                             }
                           }
                           /*加载注册项*/
                           options.render();
                           /*去除loading*/
                           options.tips.loading(_tips, _optionsDom);
                            /*显示右侧价格框*/
                           options.countPrice(_surcharge);
                           $(_optionsDom).append(Handlebars.compile(options.tpl.recommend)(_groupData));
                           options.dataSelect();
                           options.submit();
                           options.showData();
                           $(_submitDom).html(_text);
                           $(_nextDom).html(_text);
                      } else {
                       _error();
                     }
               },
               error: function() {
                 _error();
               }
             })
       },
       /*显示隐藏明细*/
       detail: function() {
         var _productDom = "#js_options_product";
             $("#js_options_book").on("click", function() {
               var _spanDom = $(this).find("span"),
                   _iDom = $(this).find("i");
                   if ($(_productDom).css("display") == "none") {
                     _spanDom.html("隐藏明细");
                     _iDom.removeClass("up").addClass("close");
                    
                     $(_productDom).show();
                   } else {
                     _spanDom.html("展开明细");
                      _iDom.removeClass("close").addClass("up");
                     $(_productDom).hide();
                   }
             })
       },
       /*下一步*/
       submit: function() {
          /*获取依赖DOM*/
         var _portionDom = options.dom.portionDom,
             _titleDom = options.dom.titleDom,
             _dataDom = options.dom.dataDom,
             _submitDom = options.dom.submitDom,
             _nextDom = options.dom.nextDom,
             _trDom = $(_dataDom).find(_titleDom),
             /*控制开关 避免重复提交*/
             _click = true,
             _optionsDom = options.dom.optionsDom,
             /*URL参数需要带在接口上*/
             _param = window.location.search.substr(1),
             _url = "ajax/OptionsNew/BookOptionsV1.aspx?" + _param,
             /*组合数据将用户选择的产品传递到接口*/
             _group = {
              ChosedOptionResourceList: [],
              ReturnDate: options.config.initData.returnDate
             },
             _text = ["下一步", "提交中..."],
             /*加载出错*/
             _error = function() {
               alert("跳转异常,请重新提交您的订单。");
               _click = true;
               $(_submitDom).html(_text[0]);
               $(_nextDom).html(_text[0]);
               $(_optionsDom).find("select").removeAttr("disabled");
             },
             _ajax = function() {
               if (_click) {
                 /*遍历数据获取用户选择的数据*/
                 _click = false;
                 $(_submitDom).html(_text[1]);
                 $(_nextDom).html(_text[1]);
                 $(_optionsDom).find("select").attr("disabled", "disabled");
                 $(_trDom).each(function(i) {
                   /*产品数量*/
                   var _val = $(this).find(_portionDom).find("option:selected").val(),
                       /*产品使用日期*/
                       _date = $(this).find(_portionDom).data("date").split("T")[0] + "T00:00:00",
                       /*产品ID*/
                       _resource = $(this).find(_portionDom).data("resource");
                       _group.ChosedOptionResourceList[i] = {
                         ProductID: _resource,
                         DepartureDate: _date,
                         AdultQuantity: options.config.initData.aduNumber,
                         ChildQuantity: options.config.initData.chlidNumber,
                         UseDate: _date,
                         UseCopies: _val
                       }
                    })
                   $.ajax({
                     url: _url,
                     type: "POST",
                     data: {
                       query: cQuery.stringifyJSON(_group)
                     },
                     success: function(data) {
                       if (data == "Success") {
                           //提交成功跳转
                           window.location.href = "Order.aspx?" + _param;
                       }
                       else{
                         _error();
                       }
                      },
                     error: function() {
                       _error();
                     }
                   })
               }
             };
           $(_submitDom).on("click", function() {
             _ajax();
           })
           $(_nextDom).on("click", function() {
             _ajax();
           })
       },
       /*绑定提示信息*/
      LodMods: function() {
       var indexMultiModConfig = {
           jmp: "1.0"
          };
          cQuery.mod.multiLoad(indexMultiModConfig, function() {
            cQuery(document).regMod('jmp', '1.0', {

            });
          });
       },
       /*飞机型号信息*/
       flyType: function(){
          $$ = {
              module: {
                  jmpInfo: {
                      array: {}
                  }
              },
              fltDomestic: {}
          };
          var craftTypeUrl = "http://webresource.c-ctrip.com/code/js/resource/jmpinfo_tuna/CraftType_" + cQuery.config("charset") + ".js";
          $.getScript(craftTypeUrl, function () {
              var getData = function (page) {
                  var pagevalue = "";
                      if (page.match(new RegExp('=(\\w+)')) != null) {
                          pagevalue = page.match(new RegExp('=(\\w+)'))[1];
                      }
                      page = page.indexOf('?') != -1 ? pagevalue : '';
                      if (page != '') {
                          var valueObj = {},
                              valueList = null;
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
                  $('span[mod1="jmpInfo"]', '#productID').each(function () {
                      cQuery(this).regMod('jmp', '1.0', { options: { content: getData($(this).attr('mod_jmpinfo_page')), css: { maxWidth: '460' }, type: 'jmp_table', classNames: { boxType: 'jmp_table' }, template: '#jmp_craft', alignTo: 'cursor', showArrow: false} });
                  });
              })
          });
        },
      /*资源框产品展现*/
       showProduct: function(){
         $("#productID .show_detailed").on("click", function(){
            var _div = $(this).parents("tr").next("tr").find(".hidden_content");
                if(_div.css("display") == "none"){
                   _div.show();
                }
                else{
                  _div.hide();
                }
         })
          $("#productID .pack_up").on("click", function(){
             $(this).parents(".hidden_content").hide();
           })
        },
       init: function() {
         options.showProduct();
         options.LodMods();
         options.flyType();
         options.products();
         options.detail();
       }
     }
   exports.init = options.init;
 })