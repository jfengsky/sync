define(function(require, exports) {
   /*
   * @Author :  qxzhan
   * @Date   :  2014/04/08
   * @Desc   :  机票选择 新增筛选
   */
    var $ = require("jquery"),
        _ = require("underscore"),
            leaveFlightAjax = null,/*第一航程段Ajax*/
            cabinFlightAjax = null,/*更多舱位Ajax*/ 
            backFlightAjax = null, /*下一航程段Ajax**/
            flightSectionSum = 0,  /*航程段总数**/
            flightSectionNow = 0,  /*当前选择的航程段*/
            flightStore = {},/*选择的机票存储*/
            initialData = {},/*接收参数，初始化机票*/
            groupData = {},  /*组合参数*/
            EventEmitter = require("Modules/EventEmitter"),/*监听开始选择机票和选择完毕机票*/
            flightSearchUrl = "/Booking/handler2/NewGroupDetail/NewFlightSearch.ashx",
            flyTpl = require("tpl/detail/flight_fly"),
            selectTpl = require("tpl/detail/flight_select"),
            toolTpl = require("tpl/detail/flight_tool"),
            boxTpl = require("tpl/detail/flight_box"),
            seatTpl = require("tpl/detail/flight_seat"),
            sortTpl = require("tpl/detail/flight_sort"),
            theadTpl = require("tpl/detail/flight_thead"),
            tips = ["JS_Loading","JS_Error","JS_MoreLoading","JS_MoreError"],
            priceKey,        /*用于计算价格的key*/
            findObj = {
               timeObj: [],   /*搜索条件-起飞时段*/
               companyObj: [],/*搜索条件-航空公司*/
               departObj: [], /*搜索条件-起飞机场*/
               arriveObj: [], /*搜索条件-降落机场*/
               ctripObj: [],  /*搜索条件-仅查看携程推荐*/
               directObj: []  /*搜索条件-仅查看直飞*/
             },
            searchObj = {},  /*存储当前航程段的搜索条件 key值为当前航程段的TripSegmentNo 存储在DOM data-period中*/
            flight = {
              tips: {
                  /*
                  *加载中提示*
                  */
                  loading: function(pId, pElement, pLast) {
                    var  loading = $('#' + pId);
                        if (!loading.length) {
                          loading = $('<div class="c_loading detail_loading" id="' + pId + '"/>'),
                          str = !pLast ? "查询中，请稍候..." : "正在为您加载机票信息...";
                          loading.html('<img alt="" src="http://pic.c-ctrip.com/packages111012/loading_50-0816.gif"><strong>' + str + '</strong>').appendTo(pElement);
                          
                        } else {
                          loading.remove();
                        }
                  },
                  /*
                  *错误提示*
                  */
                  error: function(pId, pElement, pCity) {
                    var error = $('#' + pId);
                        if (!error.length) {
                           error = $('<div class="c_loading detail_loading" id="' + pId + '" style="text-align:center"/>'),
                           str = pCity ? "很抱歉，没有找到" + pCity + "出发相关航班。" : "加载机票信息错误。";
                          error.html('<img src="http://pic.c-ctrip.com/vacation_v1/ico_info_blue.png" alt="" />' + str + '<a id="JS_TryAgain" href="javascript:void(0);">重试</a>').appendTo(pElement);
                        } else {
                           error.remove();
                        }
                  },
                  /*
                  *删除ID*
                  */
                  removeId: function(pId) {
                    var id = $('#' + pId);
                        if (id.length) {
                           id.remove();
                        }
                  },
                  /*
                  *更多舱位的加载提示*
                  */
                  moreLoading: function(pClass, pElement,pLoad) {
                    var  loading = $('<tr class="' + pClass + ' no_border"></tr>'),
                         str = pLoad ? '<td colspan="8"><div class="flt_loading"><img src="http://pic.ctrip.com/vacation_v1/loading.gif" alt=""/>查询中，请稍候...</div></td>' : '<td colspan="8"><div class="flt_table_alert"><img width="16" height="16" src="http://pic.c-ctrip.com/vacation_v1/ico_info_blue.png" alt=""/>暂时没有更多舱位。</div></td>';
                         loading.html(str).insertAfter(pElement);
                    }
                },
                render: {
                  /*
                  *计算航班差价*
                  */
                  price: function(price) {
                    Handlebars.registerHelper('deal', function(number) {
                      if (number > price) {
                        return new Handlebars.SafeString(
                          "+<dfn>¥</dfn>" + (number - price)
                        );
                      } 
                      else if (number == price) {
                        return new Handlebars.SafeString("--");
                      } 
                      else {
                        return new Handlebars.SafeString(
                          "-<dfn>¥</dfn>" + (price - number)
                        );
                      }
                    });
                  },
                  /*
                  *模板方法扩展*
                  */
                  tool: function() {
                    Handlebars.registerHelper('plus', function(number, quantity) {
                      return 2 * number - 1;
                    });
                    Handlebars.registerHelper('border', function(number, quantity) {
                      if (number < (quantity - 1)) {
                        return "class=\"no_border\"";
                      }
                    });
                   }
                },
                /*
                *绑定提示信息*
                */
                LodMods: function() {			  
                  var indexMultiModConfig = {
                    jmp: "1.0"
                  };
                  cQuery.mod.multiLoad(indexMultiModConfig, function() {
                    cQuery(document).regMod('jmp', '1.0', {

                    });
                  });
                },
                /*
                *根据飞机型号获取飞机的详细详细*
                */
                flightType: function() {
                  window.online = {
                    getTableTips: function(page) {
                      page = page.indexOf('?') != -1 ? page.match(new RegExp('=(\\w+)'))[1] : '';
                      if (page != '') {
                        var valueObj = {},
                            valueList = GV.app.fligtData.CraftType.match(new RegExp('@(' + page + '\\|[^@]*\\|[^@]*\\|\\d*\\|\\d*)@', 'i'));
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
                     }
                 }
              },
               /*
                *参数公用 取【价格，出发地，目的地，出发时间，目的城市*
                */
                initialFight: function(pData) {
                  initialData = pData;
                },
                /*
                *阻止事件冒泡*
                */
                someHandle: function(pEvent){
                 var pEvent = pEvent || window.event;
                    if(pEvent.stopPropagation){
                       pEvent.stopPropagation();
                    }
                    else {
                     pEvent.cancelBubble = true;
                    }
                },
                /*
                *组合参数*
                */
                initialFightData: function(pData) {
                  groupData = {
                    AdultQuantity: pData.AdultNum,
                    ChildQuantity: pData.ChildNum,
                    ProductID: GV.app.detail.data.IsTourGroupProduct ? pData.ProductID : GV.app.detail.data.ProductID,
                    TripSegments: pData.data.FlightInfos[0].FlightMarkInfo.TripSegments,
                    FlightSource: 3,
                    SelectedFlightCombo: null,
                    FlightCount: 0//传入0时显示所有航班
                  }
                },
                /*
                *相同航班相同色块显示*
                */
                showColor: function() {
                   $("#JS_ScrollWrap").delegate("tr", "mouseover", function() {
                      $("[data-color=\"" + $(this).data("color") + "\"]").addClass("trans_bg_blue");
                    })
                     .delegate("tr", "mouseout", function() {
                        $("[data-color=\"" + $(this).data("color") + "\"]").removeClass("trans_bg_blue");
                    });
                },
                /*
                *是否显示滚动条*
                */
                checkHeight: function(pType) {
                  var wrap = "#JS_ScrollWrap";
                     if(!pType){
                        $(wrap).height("auto");
                        $(wrap).css("overflow-y","hidden");
                      }
                      if ($(wrap).height() >= 611) {
                         $(wrap).height("611px");
                         $(wrap).css("overflow-y","scroll");
                      } 
                      else {
                         $(wrap).height("auto");
                         $(wrap).css("overflow-y","hidden");
                      }
                },
                /*
                *清空搜索条件*
                *起飞时段*
                *航空公司*
                *降落机场*
                *仅查直飞*
                *携程推荐*
                */
                clearObj: function(){
                for(var i in findObj){
                     findObj[i] = [];
                  }
                },
                /*
                *获取时间段*
                *凌晨（0-6点）  00:00--05:59*
                *上午(6-12点)   06:00--11:59*
                *中午(12-13点)  12:00--12:59*
                *下午(13-18点)  13:00--17:59*
                *晚上(18-24点)  18:00--23:59*
                *比较时间 IE的格式需是 YYYY/MM/DD hh:mm*
                */
                timeQuan: function(pDate ,pTime){
                   var date = pDate.replace(/-/g,"/"),
                       time = new Date(Date.parse(date +" "+ pTime));
                       if(time >= new Date(Date.parse(date + " 00:00")) && time < new Date(Date.parse(date + " 05:59"))){
                          return "凌晨(0-6点)"
                       }
                       else if(time >= new Date(Date.parse(date + " 06:00")) && time < new Date(Date.parse(date + " 11:59"))){
                          return "上午(6-12点)"
                       }
                       else if(time >= new Date(Date.parse(date + " 12:00")) && time < new Date(Date.parse(date + " 12:59"))){
                          return "中午(12-13点)"
                       }
                       else if(time >= new Date(Date.parse(date + " 13:00")) && time < new Date(Date.parse(date + " 17:59"))){
                          return "下午(13-18点)"
                       }
                       else if(time >= new Date(Date.parse(date + " 18:00")) && time < new Date(Date.parse(date + " 23:59"))){
                          return "晚上(18-24点) "
                       }
                },
                /*
                *创建筛选条件*
                */
                condition: function(pJson){
                  var flights = pJson.data.Flights,
                      time = [],     /*起飞时段*/
                      company = [],  /*航空公司*/     
                      depart = [],   /*起飞机场*/
                      arrive = [],   /*降落机场*/ 
                      direct = [],   /*仅查直飞*/   
                      ctrip = [],    /*携程推荐*/
                      price = [];    /*是否排序价差 如果价差都一样则不显示价差的排序箭头*/
                      for (var i = 0 , len = flights.length; i < len; i++) {
                         for(var j = 0, lens = flights[i].FlightDetails.length; j < lens; j++){
                               var details = flights[i].FlightDetails[j],
                                   detailsSize = flights[i].FlightDetails.length - 1;
                                   time.push(details.FlyTime);
                                   company.push(details.AirlineShortName);
                                   depart.push(flights[i].FlightDetails[0].DepartAirportName);
                                   arrive.push(flights[i].FlightDetails[detailsSize].ArriveAirportName);
                                   direct.push(details.FlyDirect);
                                   ctrip.push(details.FlyCtrip);
                                   price.push(flights[i].Price);
                           }
                      }
                      /*
                      *因为会有重复的信息，所以先过滤到重复*
                      */
                      /*
                      *起飞时段*
                      */
                      pJson.data.flyTime = $.map(_.uniq(time),function(n){
                          return {"FlyTime" : n}
                      });
                      /*
                      *航空公司*
                      */
                      pJson.data.company = $.map(_.uniq(company),function(n){
                          return {"AirlineShortName" : n}
                      });
                      /*
                      *起飞机场*
                      */
                      pJson.data.depart = $.map(_.uniq(depart),function(n){
                        return {"DepartAirportName" : n}
                      }); 
                      /*
                      *降落机场*
                      */
                      pJson.data.arrive = $.map(_.uniq(arrive),function(n){
                        return {"ArriveAirportName" : n}
                      }); 
                      /*
                      *直飞*
                      */
                      pJson.data.direct = $.map(_.uniq(direct),function(n){
                        return {"FlyDirect" : n}
                      }); 
                      /*
                      *携程推荐*
                      */
                      pJson.data.ctrip = $.map(_.uniq(ctrip),function(n){
                        return {"FlyCtrip" : n}
                      });
                      /*
                      *价差*
                      */
                      pJson.data.flyPrice = $.map(_.uniq(price),function(n){
                        return {"FlyPrice" : n}
                      });  
                     return pJson;
                },
                /*
                *显示搜索条件*
                */
                showCondition: function(pElement){
                   pElement.find(".JS_Multiple").delegate(".JS_BaseText", "click", function() {
                       $(this).parent("div").find("p").show();
                    })
                   .delegate(".JS_BaseText", "mouseleave", function() {
                       $(this).parent("div").find("p").hide();
                    })
                    .delegate("p", "mouseover", function() {
                       $(this).show();
                    })
                    .delegate("p", "mouseleave", function() {
                       $(this).hide();
                    })    
                },
                /*
                *筛选项*
                */
                screening: function(pData, pElement ,period){
                     /*
                     *记录用户选择的搜索条件*
                     */
                     var cleanSearch = pElement.find(".JS_CleanSearch"),
                         list = cleanSearch.find("dd"),
                         clear = pElement.find("[data-type=\"clean\"]"),
                         multiple = pElement.find(".JS_Multiple"),
                         /*
                         *生成或者删除用户的搜索条件*
                         */
                         makeSelect = function(pSelf, pType, pBoolean){
                           if(pSelf.is(":checked")){
                              var text = pType.split("@")[1];
                                  clear.before("<a data-type=\"" + pType + "\">" + text + "<i></i></a>");
                                  searchObj[period].push(pType);
                            }
                            else{
                              list.find("[data-type=\"" + pType + "\"]").remove();
                              searchObj[period] = _.without(searchObj[period], pType);
                             }
                            if(list.find("a").length > 1 ){
                                cleanSearch.show();
                             }
                             else{
                               cleanSearch.hide();
                           }
                          };
                         /*
                         *绑定选择条件 多选*
                         */
                          pElement.find(".JS_Multiple p").delegate("a", "click", function() {
                             var input = $(this).find("input"),
                                 type = input.data("type");
                                 flight.clearObj();
                                 if(input.is(":checked")){
                                    input.prop("checked",false);
                                 }
                                 else{
                                    input.prop("checked",true);
                                 }
                                 makeSelect(input,type);
                                 //筛选
                                 flight.sorting(pElement, pData, period);
                                 flight.checkHeight();
                            });
                          /*
                          *绑定选择条件 多选*
                          */
                           pElement.find(".JS_Multiple p").delegate("input", "click", function(e) {
                            /*
                            *阻止事件冒泡*
                            */
                            flight.someHandle(e);
                            var type = $(this).data("type");
                                flight.clearObj();
                                makeSelect($(this), type);
                                //筛选
                                flight.sorting(pElement, pData, period);
                                flight.checkHeight();
                              });
                             /*
                             *绑定选择条件 直飞和携程推荐*
                             */
                             pElement.find(".JS_Rirect").delegate("input","change",function(){
                                 var  type = $(this).data("type");
                                      flight.clearObj();
                                      if($(this).is(":checked")){
                                        searchObj[period].push(type);
                                      }
                                      else{
                                        searchObj[period] = _.without(searchObj[period], type);
                                      }
                                      //筛选
                                      flight.sorting(pElement, pData, period);
                                      flight.checkHeight();
                                });
                              /*
                              *删除筛选*
                              */
                              pElement.find(".JS_CleanSearch").delegate("a","click",function(){
                                 var  type = $(this).data("type"),
                                      link = $(this).prevAll("a");
                                      if(type == "clean"){
                                          /*
                                          *这里不清除携程推荐，直飞，以及时间和价差的升序*
                                          */
                                          for(var i = 0 , len = link.length; i < len ; i++){
                                            searchObj[period] = _.without(searchObj[period],link.eq(i).data("type"));
                                         }
                                        link.remove();
                                        multiple.find("input").prop("checked",false);
                                        cleanSearch.hide();
                                      }
                                      else{
                                         multiple.find("[data-type=\"" + type + "\"]").prop("checked",false);
                                         $(this).remove();
                                         searchObj[period] = _.without(searchObj[period],type);
                                      }
                                      if(list.find("a").length > 1){
                                        cleanSearch.show();
                                      }
                                      else{
                                        cleanSearch.hide();
                                      }
                                      flight.clearObj();
                                      //显示筛选结果
                                      flight.sorting(pElement, pData , period);
                                      flight.checkHeight();
                              });
                               /*
                               *价格和时间的升序*
                               *价格和时间不能同时排序*
                               */
                               pElement.find("th").delegate("a","click",function(){
                                  if($(this).attr("class") != "current"){
                                     pElement.find("th a").removeClass("current");
                                     $(this).addClass("current");
                                      var  type = $(this).data("type"),
                                           text = $(this).text();
                                           switch(type){
                                              case "timeSort" : 
                                              searchObj[period] = _.without(searchObj[period],"priceSort");
                                              break;
                                              case "priceSort" :
                                              searchObj[period] = _.without(searchObj[period],"timeSort");
                                              break;
                                           }
                                           searchObj[period].push(type);
                                           flight.clearObj;
                                           flight.sorting(pElement, pData ,period);
                                           flight.checkHeight();
                                   }
                            });
                  },
                /*
                *比较搜索条件*
                */
                sortTrue: function(pAim, pSoucre){
                     var i,
                        len = pAim.length;
                       if(len == 0){
                           return true;
                        }
                        for(i = 0; i< len; i++){
                             if(pAim[i] == pSoucre){
                                   return true;
                                }
                        }
                },
                /*
                *中断更多舱位请求*
                */
                clearCabin: function(){
                  if(cabinFlightAjax != null){
                      cabinFlightAjax.abort();
                       cabinFlightAjax = null;
                   }
                },
                /*
                *筛选排序*
                *筛选条件出错在searchObj key为period[当前的航程段]*
                */
                sorting: function(pElement, pData ,period){
                    var search = searchObj[period],
                        json = {
                           Flights:[]
                        };
                      /*
                      *如果用户筛选的过程中还有更多舱位的AJAX再请求则中断改请求*
                      */
                      flight.clearCabin();
                      for(var i = 0, len = search.length; i<len; i++){
                            var arr = search[i].split("@"),
                                type = arr[0],
                                text = arr[1];
                                 /*
                                 *起飞时间段*
                                 */   
                                  if(type == "time"){
                                    findObj.timeObj.push(text);
                                  }
                                 /*
                                 *航空公司*
                                 */   
                                  else if(type == "company"){
                                     findObj.companyObj.push(text);
                                  }
                                 /*
                                 *起飞机场*
                                 */ 
                                 else if(type == "depart"){
                                   findObj.departObj.push(text);
                                 }
                                 /*
                                 *降落机场*
                                 */  
                                  else if(type == "arrive"){
                                    findObj.arriveObj.push(text);
                                  }
                                 /*
                                 *直飞*
                                 */
                                 else if(type == "direct"){
                                   findObj.directObj.push(text);
                                }
                                /*
                                *携程推荐*
                                */
                                else if(type == "ctrip"){
                                   findObj.ctripObj.push(text);
                                }
                                /*
                                *时间升序*
                                */
                                else if(type == "timeSort"){
                                   var flights = pData.Flights,
                                       time =  _.sortBy(flights, function(num){ 
                                          /*比较时间 IE的格式需是 YYYY/MM/DD hh:mm*/
                                          return new Date(Date.parse(num.TakeOffDepartDate.replace(/-/g,"/") +" "+ num.DepartTime));
                                       });
                                       pData.Flights = time;
                               }
                              /*
                              *价格升序*
                              */
                               else if(type == "priceSort"){
                                    var flights = pData.Flights,
                                        price =  _.sortBy(flights, function(num){ 
                                          return num.Price;
                                       });
                                       pData.Flights = price;
                                  }
                              }
                         /*
                         *依次将搜索条件存储*
                         *遍历Flights中的FlightDetails 依次与搜索条件比较 
                         */
                        for(var k = 0, kLens = pData.Flights.length; k < kLens; k++){
                           for(var j = 0, jLens = pData.Flights[k].FlightDetails.length; j < jLens; j++){
                                var flightDetails = pData.Flights[k].FlightDetails[j],
                                    flightDetailsSize = pData.Flights[k].FlightDetails.length - 1,
                                    flightDetailsFirst = pData.Flights[k].FlightDetails[0];
                                      if(flight.sortTrue(findObj.companyObj, flightDetails.AirlineShortName) 
                                      && flight.sortTrue(findObj.departObj, flightDetailsFirst.DepartAirportName) 
                                      && flight.sortTrue(findObj.arriveObj, pData.Flights[k].FlightDetails[flightDetailsSize].ArriveAirportName) 
                                      && flight.sortTrue(findObj.timeObj, flightDetailsFirst.FlyTime) 
                                      && flight.sortTrue(findObj.directObj, flightDetails.FlyDirect)
                                      && flight.sortTrue(findObj.ctripObj, flightDetails.FlyCtrip)){
                                          json.Flights.push(pData.Flights[k]);
                                      }
                              }
                         }
                        /*
                        *先清空数据*
                        */
                        pElement.find(".JS_MaskTable tbody").html("");
                        /*
                        *判断搜索是否有结果*
                        */
                        json.Flights = _.uniq(json.Flights);
                       if(json.Flights.length > 0){
                           pElement.find(".JS_SearchError").hide();
                           pElement.find(".JS_MaskTable tbody").append(Handlebars.compile(flyTpl)(json));
                           pElement.find(".JS_MaskTable").show();
                           if(json.Flights.length == 1){
                             /*
                             *只有一条数据时不排序*
                             */
                             pElement.find("th i").hide(); 
                             pElement.find("th a").undelegate("click");
                           }
                           else{
                             pElement.find("th i").show(); 
                             pElement.find("th a").delegate("click");
                           }
                          }
                        else{
                           /*
                           *搜索无结果*
                           */
                           pElement.find(".JS_SearchError").show();
                           pElement.find(".JS_MaskTable").hide();
                           pElement.find("th i").show(); 
                           flight.clearSort(pElement, pData, period);
                        }
                        flight.checkHeight();
                   },
                /*
                *搜索无结果时 清空搜索条件*
                */
                clearSort: function(pElement, pData,period){
                  pElement.find(".JS_SearchError a").on("click",function(){
                    /*
                    *清除相关的DOM*
                    */
                    pElement.find("[data-type=\"clean\"]").prevAll("a").remove();
                    pElement.find(".JS_SearchError").hide();
                    pElement.find(".JS_CleanSearch").hide();
                    pElement.find("th a").removeClass("current");
                    pElement.find("th a:first").addClass("current");
                    //pElement.find("th i").show();
                    /*
                    *重新渲染数据*
                    */
                    pElement.find(".JS_MaskTable tbody").html("");
                    pElement.find(".JS_MaskTable tbody").append(Handlebars.compile(flyTpl)(pData));
                    pElement.find(".JS_MaskTable").show();
                    /*
                    *取消所有的checkbox框选中*
                    */
                    pElement.find(".JS_Condition input").prop("checked",false);
                    /*
                    *清空搜索条件*
                    */
                    searchObj[period] = [];
                    flight.clearObj();
                    flight.checkHeight();
                   })
                },
                /*
                *第一次拉取机票信息*
                */
                leave: function() {
                  var price = initialData.data.FlightInfos[0].Flights[0].Price,
                      departCityName = initialData.data.FlightInfos[0].Flights[0].DepartCityName,
                      wrap = $("#JS_ScrollWrap div.JS_FlightInfo").first(),
                      period = wrap.data("period"),
                      /*
                      *请求无数据，或者请求错误的时候提示内容*
                      */
                      wrong = function(){
                         flight.tips.loading(tips[0], wrap);
                         flight.tips.error(tips[1], wrap, departCityName);
                         /*
                           *没有数据返回的时候，让用户重试*
                         */
                          $("#JS_TryAgain").bind("click",function(){
                              flight.leave();
                          })
                      };
                      /*
                      *机票需要实时数据，前端不缓存*
                      */
                       flight.tips.removeId(tips[1]);
                       flight.tips.loading(tips[0],wrap);
                       leaveFlightAjax = $.ajax({
                          url: flightSearchUrl,
                          type: "POST",
                          data: {
                            query: cQuery.stringifyJSON(groupData)
                          },
                          success: function(data) {
                             var json = $.parseJSON(data);
                                if (json.errno == 0 && json.data.Flights.length > 0) {
                                  /*
                                  *计算价差*
                                  */
                                  flight.render.price(price);
                                    var i
                                        flights = json.data.Flights,
                                        len = flights.length;
                                        /*
                                        *将请求的数据缓存*
                                        */
                                       for (i = 0; i < len; i++) {
                                          flightStore[flights[i].FlightNo + flights[i].Sequence + flights[i].TakeOffDepartDate + flights[i].DepartTime] = flights[i];
                                          /*
                                          *写入起飞时间段*
                                          */
                                           for(var j = 0, lens = flights[i].FlightDetails.length ; j < lens; j++){
                                                var details = flights[i].FlightDetails;
                                                    details[j].FlyTime = flight.timeQuan(details[0].DepartDate, details[0].DepartTime);
                                                    /*
                                                     *写入直飞*
                                                     */
                                                     if(details.length == 1){
                                                        details[j].FlyDirect = "直飞";
                                                     }
                                                     else{
                                                        details[j].FlyDirect = "";
                                                  }
                                                  /*
                                                  *写入携程推荐*
                                                  */
                                                  if(!flights[i].IsSystem){
                                                     details[j].FlyCtrip = "携程推荐";
                                                  }
                                                  else{
                                                     details[j].FlyCtrip = "";
                                                  }
                                            }
                                        }
                                        flight.tips.loading(tips[0],wrap);
                                        /*
                                        *生成搜索条件*
                                        */
                                        flight.condition(json);
                                         /*
                                         *渲染搜索条件和航班数据*
                                         */
                                        searchObj[period] = [];
                                        wrap.append(Handlebars.compile(sortTpl)(json.data));
                                        /*
                                        *如果搜索结果少于2条数据 则不进行时间和价差的排序*
                                        */
                                        wrap.append(Handlebars.compile(theadTpl)(json.data));
                                        wrap.find("tbody").append(Handlebars.compile(flyTpl)(json.data));
                                        /*
                                        *筛选方法*
                                        */
                                        flight.screening(json.data, wrap ,period);
                                        /*
                                        *DOM事件显示搜索条件*
                                        */
                                        flight.showCondition(wrap);
                                        flight.checkHeight();
                                        flight.showColor();
                                        /*
                                        *选下一个航程段*
                                        */
                                        flight.back();
                                        /*
                                        *选择更多舱位*
                                        */
                                        flight.moreCabin();
                                      }
                                  else {
                                   wrong();
                                }
                                leaveFlightAjax = null;
                          },
                          error: function() {
                            wrong();
                          }
                        });
                  },
                /*
                *选择航班*
                */
                back: function() {
                  /*
                  *tripSegmentNo 最后一程航程段 用次判断用户当前的选择是否是最好一个航程段*
                  */
                  var tripSegmentNo = _.last(initialData.data.FlightInfos).TripSegmentNo;
                      flightSectionSum = tripSegmentNo;
                      $("#JS_ScrollWrap").delegate(".JS_Choose", "click", function() {
                        flight.clearCabin();
                        var self = this,
                            key = $(self).parents("tr").data("key"),
                            memory = flightStore[key],
                            arriveCityName = memory.ArriveCityName,
                            parent = $(self).parents("div.JS_FlightInfo"),
                            next = parent.next("div.JS_FlightInfo"),
                            /*
                            *请求无数据，或者请求错误的时候提示内容*
                            */
                            wrong = function(){
                               flight.tips.loading(tips[0], next);
                               flight.tips.error(tips[1], next, arriveCityName);
                            },
                            /*
                            *出现异常重新选择机票*
                            */
                            retry = function(pSelf){
                               $("#JS_TryAgain").bind("click",function(){
                                flight.tips.removeId(tips[1]);
                                $(pSelf).trigger("click");
                              })
                            },
                            /*
                            *获取当前的航程段 在用户请求完了所有的航程短会请求资源框*
                            */
                            period = parent.data("period"),
                            nextPeriod = next.data("period");
                            flightSectionNow = period;
                            /*
                            *请求的时候的时候 ForMore置为true,选择的时候置为false*
                            */
                            if(memory.SelectedFlightCombo){
                              for(var i = 0, memorySize = memory.SelectedFlightCombo.TripSegmentFlights.length; i < memorySize; i++){
                                 if(memory.SelectedFlightCombo.TripSegmentFlights[i].TripSegmentNo == period){
                                    memory.SelectedFlightCombo.TripSegmentFlights[i].ForMore = false;
                                 }
                              } 
                            }
                            /*
                            *将key放在memory对象中 这样选中的航班需要一个key标示 可直接当前不用再拼装*
                            */
                             memory.keyDomId = key;
                             priceKey = key;
                            /*
                            *当前航程段的隐藏显示操作以及高度计算*
                            */
                            parent.find("h3").hide();
                            parent.find("table").hide();
                            parent.find(".JS_Condition").hide();
                            parent.find(".JS_CleanSearch").hide();
                            flight.checkHeight();
                            /*
                            *渲染选中的当前航班*
                            */
                            parent.append(Handlebars.compile(selectTpl)(memory));
                            if(tripSegmentNo != period){
                               flight.tips.loading(tips[0], next);
                            }
                            else{
                              flight.tips.loading(tips[0],"#JS_ScrollWrap" ,!0);
                            }
                            /*
                            *下一层机票请求还未完成的时候，不能重新选择*
                            */
                            $("#JS_ScrollWrap").undelegate(".JS_ChooseAgain");
                            /*
                            *请求接口的时候传递groupData*
                            */
                            groupData.SelectedFlightCombo = memory.SelectedFlightCombo;
                            backFlightAjax = $.ajax({
                             url: flightSearchUrl,
                             type: "POST",
                             data: {
                                query: cQuery.stringifyJSON(groupData)
                             },
                             success:function(data){
                                var json = $.parseJSON(data);
                                    if(json.errno == 0 && !_.isEmpty(json.data.Flights)){
                                      var k,
                                         flights = json.data.Flights,
                                         flightsSize = flights.length;
                                          /*
                                          *存储请求的数据*
                                          */
                                        for(k = 0; k < flightsSize; k++){
                                           flightStore[flights[k].FlightNo + flights[k].Sequence + flights[k].TakeOffDepartDate + flights[k].DepartTime] = flights[k];
                                            /*
                                            *写入起飞时间段*
                                            */
                                             for(var j = 0, lens = flights[k].FlightDetails.length ; j < lens; j++){
                                                 var details = flights[k].FlightDetails;
                                                     details[j].FlyTime = flight.timeQuan(details[0].DepartDate, details[0].DepartTime);
                                                     /*
                                                     *写入直飞*
                                                     */
                                                     if(details.length == 1){
                                                        details[j].FlyDirect = "true";
                                                     }
                                                     else{
                                                        details[j].FlyDirect = "false";
                                                     }
                                                     /*
                                                     *写入携程推荐*
                                                     */
                                                     if(!flights[k].IsSystem){
                                                       details[j].FlyCtrip = "携程推荐";
                                                     }
                                                     else{
                                                       details[j].FlyCtrip = "";
                                                     }
                                               }
                                        }

                                        searchObj[nextPeriod] = [];
                                        /*
                                        *计算价差*
                                        */
                                        flight.render.price(memory.Price);
                                        flight.tips.loading(tips[0], next);
                                        flight.clearObj();
                                        /*
                                        *生成搜索条件*
                                        */
                                        flight.condition(json);
                                        /*
                                        *渲染搜索条件和航班数据*
                                        */
                                        $(next).append(Handlebars.compile(sortTpl)(json.data));
                                         /*
                                         *如果搜索结果少于2条数据 则不进行时间和价差的排序*
                                         */
                                        $(next).append(Handlebars.compile(theadTpl)(json.data));
                                        $(next).find("tbody").append(Handlebars.compile(flyTpl)(json.data));
                                        /*
                                        *筛选方法*
                                        */
                                        flight.screening(json.data ,next ,nextPeriod);
                                         /*
                                         *DOM事件显示搜索条件*
                                         */
                                        flight.showCondition(next);
                                        /*
                                        *重新计算层的高度*
                                        */
                                        flight.checkHeight();
                                        flight.showColor();
                                      }
                                  else{
                                      wrong();
                                      retry(self);
                                  }
                                 /*
                                 *机票选择完毕 以航程段的标示判断*
                                 */ 
                                 if(tripSegmentNo == period){
                                    if(json.errno == 0){
                                     /*
                                     *将请求到的FlightMarkInfo返回给资源*
                                     */
                                      GV.emit('order-select-back', {
                                       type: 'flight', 
                                       ChosedResource: json.data.FlightMarkInfo
                                     });
                                     cQuery("#JS_FlightData").unmask();
                                   }
                                   else{
                                      flight.tips.error(tips[1],"#JS_ScrollWrap");
                                      retry(self);
                                   } 
                                 }
                                flight.chooseAgain();
                             },
                             error:function(){
                               /*
                               *最后一个航程段错误提示*
                               */
                               if(tripSegmentNo == period){
                                 flight.tips.removeId(tips[0]);
                                 flight.tips.error(tips[1],"#JS_ScrollWrap");
                               }
                               else{
                                 wrong();
                               }
                               retry(self);
                               flight.chooseAgain();
                             }
                         })
                      });
                },
                /*
                *重新选择机票*
                */
                chooseAgain: function() {
                  $("#JS_ScrollWrap").delegate(".JS_ChooseAgain", "click", function() {
                    var parent = $(this).parents("div.JS_FlightInfo"),
                        next = parent.next("div.JS_FlightInfo"),
                        nextAll = parent.nextAll("div.JS_FlightInfo"),
                        clear = parent.find("[data-type=\"clean\"]");
                        /*
                        *首先需要判断下一乘航班是否加载完成*
                        *如果没有加载完成 不能重新选择*
                        */
                        if(next.find(".JS_SelectTable").length ==0){
                        /*
                        *显示当前航程段标题，移除选中的信息,显示当前的所有航程段*
                        */
                        parent.find("h3").show();
                        parent.find(".JS_SelectTable").remove();
                        parent.find(".JS_MaskTable").show();
                        parent.find(".JS_Condition").show();
                       if(clear.prevAll("a").length > 0){
                          parent.find(".JS_CleanSearch").show();
                       }
                        /*
                        *移除当前航程段后面的层信息，显示标题*
                        */
                        nextAll.find("table").remove();
                        nextAll.find("h3").show();
                        nextAll.find(".JS_Condition").remove();
                        nextAll.find(".JS_CleanSearch").remove();
                        nextAll.find(".JS_SearchError").remove();
                        flight.tips.removeId(tips[1]);
                        /*
                        *重新计算层的高度*
                        */
                        flight.checkHeight();
                      }
                   })
                },
                /*
                *点击更多舱位*
                */
                 moreCabin: function() {
                     /*
                     *tripSegmentNo 第一个一程航程段 方便计算价差*
                     */
                     var  tripSegmentNo = initialData.data.FlightInfos[0].TripSegmentNo;
                        $("#JS_ScrollWrap").delegate(".JS_MoreCabin", "click", function() {
                           var self = this,
                               key = $(self).parents("tr").data("key"),
                               memory = flightStore[key],
                               sequence = memory.Sequence,
                               /*
                               *存储在DOM结构上 如果请求到数据，置为false 下次不再请求*
                               */
                               ajax = $(this).data("ajax"),
                               /*
                               *在航程段的最后一个tr后面插入新的数据 这里的情况包括直联机票，中转的航班，关键是这里的DOM结构不怎么给力*
                               */
                               parent = $("[data-key=\"" + key + "\"]").last(),
                               open = "[data-open=\"" + key + "\"]",
                               /*
                               *当前的航程段*
                               */
                               period = $(self).parents("div.JS_FlightInfo").data("period"),
                                /*
                                *请求无数据，或者请求错误的时候提示内容*
                                */
                                wrong = function(){
                                  flight.tips.moreLoading(tips[3], parent);
                                  /*
                                  *新需求不再重试*
                                  */
                                  //$(self).data("ajax",true);
                                },
                                up = function(){
                                  $(self).find("b").removeClass("down").addClass("up");
                                },
                                down = function(){
                                  $(self).find("b").removeClass("up").addClass("down");
                               };
                                /*
                                *请求的时候的时候 ForMore置为true,选择的时候置为false*
                                */
                                if(memory.SelectedFlightCombo){
                                  for(var i = 0, memorySize = memory.SelectedFlightCombo.TripSegmentFlights.length; i < memorySize; i++){
                                     if(memory.SelectedFlightCombo.TripSegmentFlights[i].TripSegmentNo == period){
                                        memory.SelectedFlightCombo.TripSegmentFlights[i].ForMore = true;
                                     }
                                  } 
                                }
                                /*
                                *请求接口的时候传递groupData*
                                */
                               groupData.SelectedFlightCombo = memory.SelectedFlightCombo;
                               /*
                               *获取存储在DOM上的data-ajax 如果为true则请求ajax*
                               */
                               if($(self).data("ajax")){
                                 $(self).data("ajax", false);
                                  up();
                                  parent.next(".JS_MoreError").remove();
                                  flight.tips.moreLoading(tips[2], parent,!0);
                                  /*
                                  *发起请求*
                                  */
                                  cabinFlightAjax = $.ajax({
                                  url: flightSearchUrl,
                                  type: "POST",
                                  data: {
                                    query: cQuery.stringifyJSON(groupData)
                                  },
                                  success:function(data){
                                    var json = $.parseJSON(data);
                                     parent.next(".JS_MoreLoading").remove();
                                    if(json.errno == 0 && !_.isEmpty(json.data.Flights)){
                                        var k,
                                         flights = json.data.Flights,
                                         flightsSize = flights.length;
                                          /*
                                          *存储请求的数据*
                                          */
                                        for(k = 0; k < flightsSize; k++){
                                           /*
                                           *同了航班有多个舱位的时候为了区分 添加了2个字段*
                                           */
                                           flights[k].Sequence = sequence;
                                           flights[k].FlightDetails[0].Marked = k;
                                           if(flights[k].FlightDetails.length > 1){
                                             /*
                                             *标示中转的航班 渲染模板的时候需要区分是否是中转航班*
                                             */
                                             flights[k].FlightStep = "transfer";
                                           }
                                           flightStore[flights[k].FlightNo + flights[k].Sequence  + flights[k].TakeOffDepartDate  + flights[k].DepartTime + flights[k].FlightDetails[0].Marked  + flights[k].Price] = flights[k];
                                        }
                                        /*
                                        *计算价差*
                                        */
                                        if(period == tripSegmentNo){
                                          /*
                                          *当前在第一个航程段*
                                          */
                                          flight.render.price(initialData.data.FlightInfos[0].Flights[0].Price);

                                        }
                                        else{
                                          /*
                                          *下一个航程段的价格与上一个航程段的价格比较*
                                          */
                                          flight.render.price(flightStore[priceKey].Price);
                                        }
                                        parent.after(Handlebars.compile(seatTpl)(json.data));
                                    }
                                    else{
                                       wrong();
                                       memory.HasMoreFlights = "";
                                    }
                                    cabinFlightAjax = null;
                                    flight.checkHeight(!0);
                                  },
                                  error:function(){
                                   parent.next(".JS_MoreLoading").remove();
                                   wrong();
                                   flight.checkHeight(!0);
                                   $(self).data("ajax",true);
                                  }
                               })
                               }
                               /*
                               *请求到了数据 这里的点击只是显示和关闭*
                               */
                               else{
                               if(!parent.next(open).length){
                                  return ;
                                }
                                down();
                                if(parent.next(open).css("display") == "none"){
                                     up();
                                     parent.nextAll(open).show();
                                  }
                                  else{
                                    down();
                                    parent.nextAll(open).hide();
                                  }
                                   flight.checkHeight(!0);
                               }
                            })
                 },
                 /*
                 *关闭机票层时中断还在请求的AJAX 加载资源框的AJAX不中断*
                 */
                 clearAjax: function(){
                 /*
                 *用户关闭时中断还在请求的ajax*
                 */
                 if(leaveFlightAjax != null){
                     leaveFlightAjax.abort();
                     leaveFlightAjax = null;
                    }
                  /*
                  *用户关闭时中断更多舱位ajax*
                  */
                  flight.clearCabin();
                 /*
                 *最后一个航程段请求资源框时用户关闭层时不中断ajax请求*
                 */
                  if(backFlightAjax != null && flightSectionSum > 0 && flightSectionNow > 0 && flightSectionNow < flightSectionSum){
                      backFlightAjax.abort();
                      backFlightAjax = null; 
                      flightSectionNow = 0;
                      flightSectionSum = 0;
                  }
                 },
                 init: function() {
                  $("body").append(Handlebars.compile(toolTpl)());
                   flight.render.tool();
                   flight.flightType();
                   flight.LodMods();
                  /*
                  *监听【选择其他航班】*
                  */
                  GV.on('order-select-button-click', function(e) {
                    if (e.type == 'flight') {
                        $("#JS_FlightData").remove();
                        $("body").append(Handlebars.compile(boxTpl)(e));
                        flight.initialFight(e);
                        flight.initialFightData(e);
                        flight.leave();
                        cQuery("#JS_FlightData").mask();
                        flight.checkHeight();
                        $("#JS_ScrollWrapClose").bind("click", function() {
                          cQuery("#JS_FlightData").unmask();
                           flight.clearAjax();
                           flight.clearObj();
                           searchObj = {};
                           flightStore = {};
                        })
                    }
                  })
                }
          }
        exports.init = flight.init;
})