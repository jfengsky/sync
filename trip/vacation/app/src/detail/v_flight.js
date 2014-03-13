define(function(require, exports) {
  /*
   * @Author :    qxzhan
   * @Date   :    2013/12/03
   * @Desc   :    机票选择
   */
var $ = require("jquery"),
     leaveFlightAjax = null,   /*第一航程段Ajax*/
     cabinFlightAjax = null,   /*更多舱位Ajax*/
     backFlightAjax = null,    /*下一航程段Ajax*/
     flightSectionSum = 0,     /*航程段总数*/
     flightSectionNow = 0,     /*当前选择的航程段*/
     // 监听开始选择机票和选择完毕机票
    EventEmitter = require("Modules/EventEmitter");
  var flight = {
    config: {
      flightSearchUrl: "/Booking/handler2/NewGroupDetail/NewFlightSearch.ashx",/*机票接口地址*/
      flightStore: {},/*选择的机票存储*/
      initialData: {}, /*接收参数，初始化机票*/
      groupData: {}/*组合参数*/
    },
    /*依赖的DOM结构 最好不要更改*/
    dom: {
      flightData: "#js_flightData",
      flightDataDIV: "#js_flightDataDIV",
      flightDataClose: "#js_flightDataClose",
      choose: "[data-class=\"choose\"]",
      chooseAgain: "[data-class=\"chooseAgain\"]",
      table: "[data-class=\"flightData_table\"]",
      select: "[data-class=\"flightData_select\"]",
      flightInfo: "[data-class=\"flightInfo\"]",
      title: "[data-class=\"flightTitle\"]",
      tryAgain: "[data-class=\"tryAgain\"]",
      more: "[data-type=\"more_cabin\"]",
      loading: "js_flightData_loading",
      error: "js_flightData_error",
      again: "js_flight_try_again",
      moreSeat: "js_moreSeat",
      moreNone: "js_moreNone",
      color: "trans_bg_blue"
     },
    tpl: {
      /*航班初始层*/
      box: '<div class="resource_mask"  id="js_flightData" style="display:none">\
            <div class="scroll_wrap" id="js_flightDataDIV">\
            {{#data}}\
            {{#each FlightInfos}}\
            <div data-class="flightInfo" data-period="{{TripSegmentNo}}" class="flight_info">\
               <h3 class="flt_mask_city" data-class="flightTitle">{{Flights.0.DepartCityName}}—{{Flights.0.ArriveCityName}}&nbsp;&nbsp;{{Flights.0.TakeOffDepartDate}}<span class="flt_time_notice">所有航班起抵时间均为当地时间（24小时制）</span></h3>\
            </div>\
            {{/each}}\
            {{/data}}\
            </div>\
          <a href="javascript:void(0);" class="close" id="js_flightDataClose"><span>关闭</span></a>\
          </div>',
      /*航班模板*/
      fly: '<table class="flt_mask_table" data-class="flightData_table">\
                 <tbody>\
                   <tr>\
                      <th class="col_01">时间</th>\
                      <th class="col_02">机场</th>\
                      <th class="col_03">航空公司</th>\
                      <th class="col_04">舱位</th>\
                      <th class="col_05">飞行总时长</th>\
                      <th class="col_06">备注</th>\
                      <th class="col_07">价差</th>\
                      <th></th>\
                    </tr>\
            {{#each Flights}}\
              {{#is FlightDetails.length ">" 1}}\
                {{#each FlightDetails}}\
                  <tr data-key="{{../FlightNo}}@{{../Sequence}}@{{../TakeOffDepartDate}}@{{../DepartTime}}" data-class="{{../FlightNo}}@{{../Sequence}}@{{../TakeOffDepartDate}}@{{../DepartTime}}" {{#border @index ../../FlightDetails.length}}{{/border}}>\
                        <td>\
                          <div><strong>{{DepartTime}}</strong></div>\
                          <div><strong>{{ArriveTime}}</strong></div>\
                        </td>\
                        <td>\
                          <div>{{DepartCityName}}({{DepartAirportName}})</div>\
                          <div>{{ArriveCityName}}({{ArriveAirportName}})\
                          {{#if NextDay}}\
                          <span class="base_txtdiv" data-role="jmp" data-params="{options: {css:{maxWidth:\'300\'},type:\'jmp_text\',classNames:{boxType:\'jmp_text\'},\
                                template:\'#jmp_NextDay_{{TripSegmentNo}}_{{FlightNo}}\',alignTo:\'cursor\'}}\">{{#is NextDay ">" 0}}+{{/is}}{{NextDay}}</span>\
                            <div id="jmp_NextDay_{{TripSegmentNo}}_{{FlightNo}}" style="display:none">\
                                <div class="jmp_bd">受时差和飞行时间影响，航班到达日期为起飞日期{{NextDay}}天。显示的到达时间为当地时间。</div>\
                            </div>\
                          {{/if}}\
                          </div>\
                        </td>\
                        <td>\
                          <div class="pubFlights_{{AirlineCode}}">{{AirlineShortName}}</div>\
                           <div class="flt_num">\
                            {{FlightNo}}\
                            <span data-params="{options: {boundaryShow:false,css:{maxWidth:\'490\'},\
                             type:\'jmp_table\',classNames:{boxType:\'jmp_table\'},\
                             template:\'#jmp_tab\',\
                             content:online.getTableTips(\'fltDomestic_planeType.asp?CraftType={{../PlaneType}}\'),\
                             alignTo:\'cursor\'}}"\
                            data-role="jmp" class="base_txtdiv">{{../PlaneType}}</span>\
                            </div>\
                        </td>\
                       <td>{{../ClassName}}\
                        {{#if @index}}\
                          {{else}}\
                         {{#if ../../HasMoreFlights}}\
                             <span  class="more_cabin" data-type="more_cabin" data-more="true" data-select="true">更多舱位<b class="down"></b></span>\
                          {{/if}}\
                          {{/if}}\
                       </td>\
                        <td>{{../JourneyTime}}</td>\
                        <td>\
                          {{#if DarkMorning}}\
                          <span class="special_flt" data-role="jmp" data-params="{options: {css:{maxWidth:\'300\'},type:\'jmp_title\',classNames:{boxType:\'jmp_title\'},template:\'#jmp_title4_1{{@index}}\',alignTo:\'cursor\'}}">凌晨航班</span>\
                          <div id="jmp_title4_1{{@index}}" style="display:none;">\
                           <div class="jmp_hd">\
                            <h3>说明</h3>\
                            </div>\
                            <div class="jmp_bd flt_jmp">\
                            <p>{{DarkMorning}}</p>\
                            </div>\
                          </div>\
                         {{/if}}\
                         {{#FlightStops}}\
                           <span class="base_txtdiv" data-role="jmp" data-params="{options: {css:{maxWidth:\'300\'},type:\'jmp_text\',classNames:{boxType:\'jmp_text\'},\
                            template:\'#jmp_TransfersOrStops\',\'content\':{ txt:\'{{#Data}}<div class=jmp_bd><strong>{{Text}}</strong><p>{{Value}}</p></div>{{/Data}}\'},alignTo:\'cursor\'}}">{{Key}}\
                        </span>\
                         {{/FlightStops}}\
                          {{#../Remarks}}\
                           {{#Votes}}\
                                  <span class="base_txtdiv">{{Value}}</span>\
                           {{/Votes}}\
                           {{#ChangeBack}}\
                             <span class="base_txtdiv" data-role="jmp" data-params="{options: {css:{maxWidth:\'300\',minWidth:\'240\'},type:\'jmp_title\',classNames:{boxType:\'jmp_title\'},\
                                template:\'#jmp_ChangeBack\',\'content\':{ key:\'{{Key}}\',txt:\'{{#Data}}<strong>{{Text}}</strong><p>{{Value}}</p>{{/Data}}\'},alignTo:\'cursor\'}}">{{Key}}</span>\
                           {{/ChangeBack}}\
                           {{#Limit}}\
                               <span class="base_txtdiv" data-role="jmp" data-params="{options: {css:{maxWidth:\'300\',minWidth:\'240\'},type:\'jmp_title\',classNames:{boxType:\'jmp_title\'},\
                                template:\'#jmp_Limit\',\'content\':{ key:\'{{Key}}\',content:\'{{Content}}\',txt:\'{{#Data}}<strong>{{Text}}</strong><p>{{Value}}</p>{{/Data}}\'},alignTo:\'cursor\'}}">\
                                 {{Key}}\
                            </span>\
                           {{/Limit}}\
                           {{#ShareFlight}}\
                             <span class="base_txtdiv" data-role="jmp" data-params="{options: {css:{maxWidth:\'300\',minWidth:\'240\'},type:\'jmp_title\',classNames:{boxType:\'jmp_text\'},\
                                template: \'#jmp_ShareFlight\',\'content\':{\'txt\':\'<div class=jmp_bd>{{Value}}\'},alignTo:\'cursor\'}}">{{Text}}</span>\
                           {{/ShareFlight}}\
                           {{#PaymentLimit}}\
                             <span class="base_txtdiv" data-role="jmp" data-params="{options: {css:{maxWidth:\'300\',minWidth:\'240\'},type:\'jmp_title\',classNames:{boxType:\'jmp_text\'},\
                                template: \'#jmp_ShareFlight\',\'content\':{\'txt\':\'<div class=jmp_bd>{{Value}}\'},alignTo:\'cursor\'}}">{{Text}}</span>\
                           {{/PaymentLimit}}\
                          {{/../Remarks}}\
                          </td>\
                          {{#if @index}}\
                          {{else}}\
                          <td rowspan="{{#plus ../../FlightDetails.length}}{{/plus}}" class="border_dotted"><div class="flt_price">{{#deal ../../Price}}{{/deal}}</div></td>\
                          <td rowspan="{{#plus ../../FlightDetails.length}}{{/plus}}" class="border_dotted"><div class="select_btn"><a href="javascript:void(0);"  data-class="choose" >选择</a></div></td>\
                         {{/if}}\
                       </tr>\
                       {{#if Duration}}\
                       <tr class="no_border" data-key="{{../../FlightNo}}@{{../../Sequence}}@{{../../TakeOffDepartDate}}@{{../../DepartTime}}" data-class="{{../../FlightNo}}@{{../../Sequence}}@{{../../TakeOffDepartDate}}@{{../../DepartTime}}"><td colspan="6"><div class="transfer_plane"><span><i></i>{{ArriveCityName}}（{{ArriveAirportName}}）中转&nbsp;{{Duration}}</span></div></td></tr>\
                       {{/if}}\
                      {{/each}}\
                        {{#if DirectFlightChannel}}\
                          <tr data-direct="{{FlightNo}}@{{Sequence}}@{{TakeOffDepartDate}}@{{DepartTime}}"><td colspan="8"><div class="luggage_limit_info"><i></i>请注意您购买机票的免费行李额度，该机票婴儿无法预定。</div></td></tr>\
                        {{/if}}\
                       {{else}}\
                         <tr data-key="{{FlightNo}}@{{Sequence}}@{{TakeOffDepartDate}}@{{DepartTime}}" data-class="{{FlightNo}}@{{Sequence}}@{{TakeOffDepartDate}}@{{DepartTime}}">\
                        <td>\
                          <div><strong>{{DepartTime}}</strong></div>\
                          <div><strong>{{ArriveTime}}</strong></div>\
                        </td>\
                        <td>\
                          <div>{{DepartCityName}}({{DepartAirportName}})</div>\
                          <div>{{ArriveCityName}}({{ArriveAirportName}})\
                          {{#if FlightDetails.0.NextDay}}\
                          <span class="base_txtdiv" data-role="jmp" data-params="{options: {css:{maxWidth:\'300\'},type:\'jmp_text\',classNames:{boxType:\'jmp_text\'},\
                                template:\'#jmp_NextDay_{{TripSegmentNo}}_{{FlightNo}}\',alignTo:\'cursor\'}}\">{{#is FlightDetails.0.NextDay ">" 0}}+{{/is}}{{FlightDetails.0.NextDay}}</span>\
                            <div id="jmp_NextDay_{{TripSegmentNo}}_{{FlightNo}}" style="display:none">\
                                <div class="jmp_bd">受时差和飞行时间影响，航班到达日期为起飞日期{{FlightDetails.0.NextDay}}天。显示的到达时间为当地时间。</div>\
                            </div>\
                          {{/if}}\
                          </div>\
                        </td>\
                        <td>\
                          <div class="pubFlights_{{AirlineCode}}">{{AirlineShortName}}</div>\
                           <div class="flt_num">\
                            {{FlightNo}}\
                            <span data-params="{options: {boundaryShow:false,css:{maxWidth:\'490\'},\
                             type:\'jmp_table\',classNames:{boxType:\'jmp_table\'},\
                             template:\'#jmp_tab\',\
                             content:online.getTableTips(\'fltDomestic_planeType.asp?CraftType={{PlaneType}}\'),\
                             alignTo:\'cursor\'}}"\
                            data-role="jmp" class="base_txtdiv">{{PlaneType}}</span>\
                            </div>\
                        </td>\
                       <td>{{ClassName}}\
                          {{#if HasMoreFlights}}\
                             <span  class="more_cabin" data-type="more_cabin" data-more="true">更多舱位<b class="down"></b></span>\
                          {{/if}}\
                       </td>\
                        <td>{{JourneyTime}}</td>\
                        <td>\
                          {{#if FlightDetails.0.DarkMorning}}\
                         <span class="special_flt" data-role="jmp" data-params="{options: {css:{maxWidth:\'300\'},type:\'jmp_title\',classNames:{boxType:\'jmp_title\'},template:\'#jmp_title4_1{{@index}}\',alignTo:\'cursor\'}}">凌晨航班</span>\
                          <div id="jmp_title4_1{{@index}}" style="display:none;">\
                           <div class="jmp_hd">\
                            <h3>说明</h3>\
                            </div>\
                            <div class="jmp_bd flt_jmp">\
                            <p>{{FlightDetails.0.DarkMorning}}</p>\
                            </div>\
                          </div>\
                         {{/if}}\
                         {{#Remarks}}\
                           {{#Votes}}\
                                  <span class="base_txtdiv">{{Value}}</span>\
                           {{/Votes}}\
                           {{#ChangeBack}}\
                             <span class="base_txtdiv" data-role="jmp" data-params="{options: {css:{maxWidth:\'300\',minWidth:\'240\'},type:\'jmp_title\',classNames:{boxType:\'jmp_title\'},\
                                template:\'#jmp_ChangeBack\',\'content\':{ key:\'{{Key}}\',txt:\'{{#Data}}<strong>{{Text}}</strong><p>{{Value}}</p>{{/Data}}\'},alignTo:\'cursor\'}}">{{Key}}</span>\
                           {{/ChangeBack}}\
                           {{#Limit}}\
                               <span class="base_txtdiv" data-role="jmp" data-params="{options: {css:{maxWidth:\'300\',minWidth:\'240\'},type:\'jmp_title\',classNames:{boxType:\'jmp_title\'},\
                                template:\'#jmp_Limit\',\'content\':{ key:\'{{Key}}\',content:\'{{Content}}\',txt:\'{{#Data}}<strong>{{Text}}</strong><p>{{Value}}</p>{{/Data}}\'},alignTo:\'cursor\'}}">\
                                 {{Key}}\
                            </span>\
                           {{/Limit}}\
                           {{#ShareFlight}}\
                             <span class="base_txtdiv" data-role="jmp" data-params="{options: {css:{maxWidth:\'300\',minWidth:\'240\'},type:\'jmp_title\',classNames:{boxType:\'jmp_text\'},\
                                template: \'#jmp_ShareFlight\',\'content\':{\'txt\':\'<div class=jmp_bd>{{Value}}\'},alignTo:\'cursor\'}}">{{Text}}</span>\
                           {{/ShareFlight}}\
                            {{#PaymentLimit}}\
                             <span class="base_txtdiv" data-role="jmp" data-params="{options: {css:{maxWidth:\'300\',minWidth:\'240\'},type:\'jmp_title\',classNames:{boxType:\'jmp_text\'},\
                                template: \'#jmp_ShareFlight\',\'content\':{\'txt\':\'<div class=jmp_bd>{{Value}}\'},alignTo:\'cursor\'}}">{{Text}}</span>\
                           {{/PaymentLimit}}\
                          {{/Remarks}}\
                          </td>\
                          <td><div class="flt_price">{{#deal Price}}{{/deal}}</div>\
                        </td>\
                        <td><div class="select_btn"><a href="javascript:void(0);"  data-class="choose">选择</a></div></td>\
                        </tr>\
                        {{#if DirectFlightChannel}}\
                          <tr data-direct="{{FlightNo}}@{{Sequence}}@{{TakeOffDepartDate}}@{{DepartTime}}"><td colspan="8"><div class="luggage_limit_info"><i></i>请注意您购买机票的免费行李额度，该机票婴儿无法预定。</div></td></tr>\
                        {{/if}}\
                      {{/is}}\
                    {{/each}}\
                     </tbody>\
             </table>',
      /*选中的航班*/
      select: '<table class="flt_mask_table flt_mask_table_selected" data-class="flightData_select" data-key="{{keyDomId}}">\
                <tbody>\
                  <tr>\
                    <td class="col_01">\
                      <h3 class="flt_mask_city">\
                      {{DepartCityName}}—{{ArriveCityName}}&nbsp;&nbsp;{{TakeOffDepartDate}}</h3>\
                    </td>\
                    <td class="col_02">\
                      <div>{{DepartTime}}-{{ArriveTime}}</div>\
                    </td>\
                    <td class="col_03">\
                      <div>{{DepartAirportName}}-{{ArriveAirportName}}</div>\
                    </td>\
                    <td class="col_04">\
                    {{#is FlightDetails.length ">" 1}}\
                      {{#FlightDetails}}\
                       <div class="pubFlights_{{AirlineCode}}">{{AirlineShortName}}</div>\
                      {{/FlightDetails}}\
                    {{else}}\
                    <div class="pubFlights_{{AirlineCode}}">{{AirlineShortName}}</div>\
                    {{/is}}\
                     </td>\
                    <td class="col_05">\
                    {{#is FlightDetails.length ">" 1}}\
                      {{#FlightDetails}}\
                       <div class="flt_num">{{FlightNo}}</div>\
                        <span data-params="{options: {boundaryShow:false,css:{maxWidth:\'490\'},\
                        type:\'jmp_table\',classNames:{boxType:\'jmp_table\'},\
                        template:\'#jmp_tab\',\
                        content:online.getTableTips(\'fltDomestic_planeType.asp?CraftType={{PlaneType}}\'),\
                        alignTo:\'cursor\'}}"\
                        data-role="jmp" class="base_txtdiv">{{PlaneType}}</span>\
                    {{/FlightDetails}}\
                    {{else}}\
                     <div class="flt_num">{{FlightNo}}</div>\
                        <span data-params="{options: {boundaryShow:false,css:{maxWidth:\'490\'},\
                        type:\'jmp_table\',classNames:{boxType:\'jmp_table\'},\
                        template:\'#jmp_tab\',\
                        content:online.getTableTips(\'fltDomestic_planeType.asp?CraftType={{PlaneType}}\'),\
                        alignTo:\'cursor\'}}"\
                        data-role="jmp" class="base_txtdiv">{{PlaneType}}</span>\
                        {{/is}}\
                     </td>\
                    <td class="col_06">\
                      {{ClassName}}\
                    </td>\
                    <td class="col_07">\
                      <div class="selected"><a href="javascript:void(0);">选择</a></div>\
                    </td>\
                    <td>\
                      <div class="select_btn"><a href="javascript:void(0);" data-class="chooseAgain">重新选择</a></div>\
                    </td>\
                  </tr>\
                </tbody>\
              </table>',
      /*经停*/
      stop: '<div id="jmp_TransfersOrStops" style="display: none">\
              ${txt}\
            </div>',
      /*飞机型号信息*/
      module: '<div id="jmp_tab" style="display:none">\
                <table class="data_form" style="width:480px">\
                 <tr>\
                   <th style="width: 60px;">计划机型</th>\
                   <th style="width: 140px;">机型名称</th>\
                   <th style="width: 40px;">类型</th>\
                   <th style="width: 80px;">最少座位数</th>\
                   <th style="width: 80px;">最多座位数 </th>\
                </tr>\
                <tr>\
                    <td id="array2">${txt0}</td>\
                    <td id="array3">${txt1}</td>\
                    <td id="array4">${txt2}</td>\
                    <td id="array5">${txt3}</td>\
                    <td id="array5">${txt4}</td>\
                </tr>\
              </table>\
              </div>',
      /*改退签*/
      back: '<div id="jmp_ChangeBack" style="display: none">\
                    <div class="jmp_hd">\
                      <h3> ${key}</h3>\
                    </div>\
                    <div class="jmp_bd flt_jmp">${txt}</div>\
                   </div>',
      /*预订限制*/
      limit: '<div id="jmp_Limit" style="display: none">\
               <div class="jmp_hd">\
                 <h3> ${key}</h3>\
                 </div>\
                  <div class="jmp_bd flt_jmp">\
                  <p>${content}</p>${txt}\
               </div>\
            </div>',
      /*共享航班*/
      share: '<div id="jmp_ShareFlight" style="display: none">${txt}</div>',
      /*更多舱位展开无需换乘的航班*/
      seat: '{{#Flights}}\
            <tr  data-class="{{FlightNo}}@{{Sequence}}@{{TakeOffDepartDate}}@{{DepartTime}}"  data-key="{{FlightNo}}@{{Sequence}}@{{TakeOffDepartDate}}@{{DepartTime}}@{{ClassName}}@{{Price}}"  class="trans_bg_blue">\
             <td colspan="3"></td>\
             <td>{{ClassName}}</td>\
             <td>{{JourneyTime}}</td>\
             <td>\
              {{#if FlightDetails.0.DarkMorning}}\
                   <span class="special_flt" data-role="jmp" data-params="{options: {css:{maxWidth:\'300\'},type:\'jmp_title\',classNames:{boxType:\'jmp_title\'},template:\'#jmp_title4_1{{@index}}\',alignTo:\'cursor\'}}">凌晨航班</span>\
                    <div id="jmp_title4_1{{@index}}" style="display:none;">\
                     <div class="jmp_hd">\
                      <h3>说明</h3>\
                      </div>\
                      <div class="jmp_bd flt_jmp">\
                      <p>{{FlightDetails.0.DarkMorning}}</p>\
                      </div>\
                    </div>\
                   {{/if}}\
              {{#Remarks}}\
                 {{#Votes}}\
                        <span class="base_txtdiv">{{Value}}</span>\
                 {{/Votes}}\
                 {{#ChangeBack}}\
                   <span class="base_txtdiv" data-role="jmp" data-params="{options: {css:{maxWidth:\'300\',minWidth:\'240\'},type:\'jmp_title\',classNames:{boxType:\'jmp_title\'},\
                      template:\'#jmp_ChangeBack\',\'content\':{ key:\'{{Key}}\',txt:\'{{#Data}}<strong>{{Text}}</strong><p>{{Value}}</p>{{/Data}}\'},alignTo:\'cursor\'}}">{{Key}}</span>\
                 {{/ChangeBack}}\
                 {{#Limit}}\
                     <span class="base_txtdiv" data-role="jmp" data-params="{options: {css:{maxWidth:\'300\',minWidth:\'240\'},type:\'jmp_title\',classNames:{boxType:\'jmp_title\'},\
                      template:\'#jmp_Limit\',\'content\':{ key:\'{{Key}}\',content:\'{{Content}}\',txt:\'{{#Data}}<strong>{{Text}}</strong><p>{{Value}}</p>{{/Data}}\'},alignTo:\'cursor\'}}">\
                       {{Key}}\
                  </span>\
                 {{/Limit}}\
                 {{#ShareFlight}}\
                   <span class="base_txtdiv" data-role="jmp" data-params="{options: {css:{maxWidth:\'300\',minWidth:\'240\'},type:\'jmp_title\',classNames:{boxType:\'jmp_text\'},\
                      template: \'#jmp_ShareFlight\',\'content\':{\'txt\':\'<div class=jmp_bd>{{Value}}\'},alignTo:\'cursor\'}}">{{Text}}</span>\
                 {{/ShareFlight}}\
                 {{#PaymentLimit}}\
                   <span class="base_txtdiv" data-role="jmp" data-params="{options: {css:{maxWidth:\'300\',minWidth:\'240\'},type:\'jmp_title\',classNames:{boxType:\'jmp_text\'},\
                      template: \'#jmp_ShareFlight\',\'content\':{\'txt\':\'<div class=jmp_bd>{{Value}}\'},alignTo:\'cursor\'}}">{{Text}}</span>\
                  {{/PaymentLimit}}\
              {{/Remarks}}\
                  </td>\
                  <td><div class="flt_price">{{#deal Price}}{{/deal}}</div></td>\
            <td><div class="select_btn"><a  data-select="select_btn_link"  href="javascript:void(0);" data-class="choose">选择</a></div></td>\
             </tr>\
             {{/Flights}}',
      /*更多舱位展开需要换乘的航班*/
      seats: '{{#Flights}}\
               {{#each FlightDetails}}\
               <tr data-class="{{../FlightNo}}@{{../Sequence}}@{{../TakeOffDepartDate}}@{{../DepartTime}}"  data-multipass="{{../FlightNo}}@{{../Sequence}}@{{../TakeOffDepartDate}}@{{../DepartTime}}@multipass" data-key="{{../FlightNo}}@{{../Sequence}}@{{../TakeOffDepartDate}}@{{../DepartTime}}@{{../ClassName}}@{{../Price}}"  {{#border @index ../FlightDetails.length}}{{/border}}>\
                  <td>\
                    <div><strong>{{DepartTime}}</strong></div>\
                    <div><strong>{{ArriveTime}}</strong></div>\
                  </td>\
                  <td>\
                    <div>{{DepartCityName}}({{DepartAirportName}})</div>\
                    <div>{{ArriveCityName}}({{ArriveAirportName}})\
                    {{#if NextDay}}\
                    <span class="base_txtdiv" data-role="jmp" data-params="{options: {css:{maxWidth:\'300\'},type:\'jmp_text\',classNames:{boxType:\'jmp_text\'},\
                          template:\'#jmp_NextDay_{{TripSegmentNo}}_{{FlightNo}}\',alignTo:\'cursor\'}}\">{{#is NextDay ">" 0}}+{{/is}}{{NextDay}}</span>\
                      <div id="jmp_NextDay_{{TripSegmentNo}}_{{FlightNo}}" style="display:none">\
                          <div class="jmp_bd">受时差和飞行时间影响，航班到达日期为起飞日期{{NextDay}}天。显示的到达时间为当地时间。</div>\
                      </div>\
                    {{/if}}\
                    </div>\
                  </td>\
                  <td>\
                    <div class="pubFlights_{{AirlineCode}}">{{AirlineShortName}}</div>\
                     <div class="flt_num">\
                      {{FlightNo}}\
                      <span data-params="{options: {boundaryShow:false,css:{maxWidth:\'490\'},\
                       type:\'jmp_table\',classNames:{boxType:\'jmp_table\'},\
                       template:\'#jmp_tab\',\
                       content:online.getTableTips(\'fltDomestic_planeType.asp?CraftType={{PlaneType}}\'),\
                       alignTo:\'cursor\'}}"\
                      data-role="jmp" class="base_txtdiv">{{PlaneType}}</span>\
                      </div>\
                  </td>\
                 <td>{{../ClassName}}</td>\
                 <td>{{../JourneyTime}}</td>\
                  <td>\
                    {{#if DarkMorning}}\
                          <span class="special_flt" data-role="jmp" data-params="{options: {css:{maxWidth:\'300\'},type:\'jmp_title\',classNames:{boxType:\'jmp_title\'},template:\'#jmp_title4_1{{@index}}\',alignTo:\'cursor\'}}">凌晨航班</span>\
                          <div id="jmp_title4_1{{@index}}" style="display:none;">\
                           <div class="jmp_hd">\
                            <h3>说明</h3>\
                            </div>\
                            <div class="jmp_bd flt_jmp">\
                            <p>{{DarkMorning}}</p>\
                            </div>\
                          </div>\
                         {{/if}}\
                  {{#FlightStops}}\
                           <span class="base_txtdiv" data-role="jmp" data-params="{options: {css:{maxWidth:\'300\'},type:\'jmp_text\',classNames:{boxType:\'jmp_text\'},\
                            template:\'#jmp_TransfersOrStops\',\'content\':{ txt:\'{{#Data}}<div class=jmp_bd><strong>{{Text}}</strong><p>{{Value}}</p></div>{{/Data}}\'},alignTo:\'cursor\'}}">{{Key}}\
                        </span>\
                         {{/FlightStops}}\
                   {{#../Remarks}}\
                     {{#Votes}}\
                            <span class="base_txtdiv">{{Value}}</span>\
                     {{/Votes}}\
                     {{#ChangeBack}}\
                       <span class="base_txtdiv" data-role="jmp" data-params="{options: {css:{maxWidth:\'300\',minWidth:\'240\'},type:\'jmp_title\',classNames:{boxType:\'jmp_title\'},\
                          template:\'#jmp_ChangeBack\',\'content\':{ key:\'{{Key}}\',txt:\'{{#Data}}<strong>{{Text}}</strong><p>{{Value}}</p>{{/Data}}\'},alignTo:\'cursor\'}}">{{Key}}</span>\
                     {{/ChangeBack}}\
                     {{#Limit}}\
                         <span class="base_txtdiv" data-role="jmp" data-params="{options: {css:{maxWidth:\'300\',minWidth:\'240\'},type:\'jmp_title\',classNames:{boxType:\'jmp_title\'},\
                          template:\'#jmp_Limit\',\'content\':{ key:\'{{Key}}\',content:\'{{Content}}\',txt:\'{{#Data}}<strong>{{Text}}</strong><p>{{Value}}</p>{{/Data}}\'},alignTo:\'cursor\'}}">\
                           {{Key}}\
                      </span>\
                     {{/Limit}}\
                     {{#ShareFlight}}\
                       <span class="base_txtdiv" data-role="jmp" data-params="{options: {css:{maxWidth:\'300\',minWidth:\'240\'},type:\'jmp_title\',classNames:{boxType:\'jmp_text\'},\
                          template: \'#jmp_ShareFlight\',\'content\':{\'txt\':\'<div class=jmp_bd>{{Value}}\'},alignTo:\'cursor\'}}">{{Text}}</span>\
                     {{/ShareFlight}}\
                     {{#PaymentLimit}}\
                   <span class="base_txtdiv" data-role="jmp" data-params="{options: {css:{maxWidth:\'300\',minWidth:\'240\'},type:\'jmp_title\',classNames:{boxType:\'jmp_text\'},\
                      template: \'#jmp_ShareFlight\',\'content\':{\'txt\':\'<div class=jmp_bd>{{Value}}\'},alignTo:\'cursor\'}}">{{Text}}</span>\
                  {{/PaymentLimit}}\
                    {{/../Remarks}}\
                    </td>\
                    {{#if @index}}\
                    {{else}}\
                    <td rowspan="{{#plus ../../FlightDetails.length}}{{/plus}}" class="border_dotted"><div class="flt_price">{{#deal ../../Price}}{{/deal}}</div></td>\
                    <td rowspan="{{#plus ../../FlightDetails.length}}{{/plus}}" class="border_dotted"><div class="select_btn"><a href="javascript:void(0);"   data-class="choose">选择</a></div></td>\
                   {{/if}}\
                 </tr>\
                 {{#if Duration}}\
                 <tr class="no_border" data-key="{{../../FlightNo}}@{{../../Sequence}}@{{../../TakeOffDepartDate}}@{{../../DepartTime}}" data-class="{{../../FlightNo}}@{{../../Sequence}}@{{../../TakeOffDepartDate}}@{{../../DepartTime}}" data-multipass="{{../../FlightNo}}@{{../../Sequence}}@{{../../TakeOffDepartDate}}@{{../../DepartTime}}@multipass"><td colspan="6"><div class="transfer_plane"><span><i></i>{{ArriveCityName}}（{{ArriveAirportName}}）中转&nbsp;{{Duration}}</span></div></td></tr>\
                 {{/if}}\
              {{/each}}\
              {{/Flights}}'
    },
    tips: {
      /*加载中提示*/
      loading: function(pId, pElement) {
        var _loading = $('#' + pId);
            if (!_loading.length) {
              _loading = $('<div class="c_loading detail_loading" id="' + pId + '"/>');
              _loading.html('<img alt="" src="http://pic.c-ctrip.com/packages111012/loading_50-0816.gif"><strong>查询中，请稍候...</strong>').appendTo(pElement);
            } else {
              _loading.remove();
            }
      },
      /*错误提示*/
      error: function(pId, pElement, pCity) {
        var _error = $('#' + pId);
            if (!_error.length) {
              _error = $('<div class="c_loading detail_loading" id="' + pId + '" style="text-align:center"/>');
              _error.html('<img src="http://pic.c-ctrip.com/vacation_v1/ico_info_blue.png" alt="" />很抱歉，没有找到' + pCity + '出发相关航班。<a data-class="tryAgain" href="javascript:void(0);">重试</a>').appendTo(pElement);
            } else {
              _error.remove();
            }
      },
       /*最后一步请求机票接口错误提示*/
      errorEnd: function(pId, pElement) {
        var _error = $('#' + pId);
            if (!_error.length) {
              _error = $('<div class="c_loading detail_loading" id="' + pId + '" style="text-align:center"/>');
              _error.html('<img src="http://pic.c-ctrip.com/vacation_v1/ico_info_blue.png" alt="" />加载机票信息错误。<a data-class="tryAgain" href="javascript:void(0);">重试</a>').appendTo(pElement);
            } else {
              _error.remove();
            }
      },
     /*删除ID*/
      removeId: function(pId) {
        var _id = $('#' + pId);
            if (_id.length) _id.remove();
      },
      /*更多舱位展开的loading提示*/
      seatLoading: function(pClass, pElement) {
        var   _loading = $('<tr data-tips="' + pClass + '" class="no_border"></tr>');
              _loading.html('<td colspan="8"><div class="flt_loading"><img src="http://pic.ctrip.com/vacation_v1/loading.gif" alt=""/><strong>查询中，请稍候...</strong></div></td>').insertAfter(pElement);
      },
      /*没有更多舱位的提示*/
      seatNone: function(pClass, pElement) {
        var _none = $('<tr data-tips="' + pClass + '" class="no_border"></tr>');
            _none.html('<td colspan="8"><div class="flt_table_alert"><img width="16" height="16" src="http://pic.c-ctrip.com/vacation_v1/ico_info_blue.png" alt=""/>暂时没有更多舱位，请再试一次</div></td>').insertAfter(pElement);
      }
    },
    render: {
      /*计算航班差价*/
      price: function(price) {
        Handlebars.registerHelper('deal', function(number) {
          if (number > price) {
            return new Handlebars.SafeString(
              "+<dfn>¥</dfn>" + (number - price)
            );
          } else if (number == price) {
            return new Handlebars.SafeString("--");
          } else {
            return new Handlebars.SafeString(
              "-<dfn>¥</dfn>" + (price - number)
            );
          }
        });
      },
      /*模板方法扩展*/
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
    /*初始化需要调用的模板*/
    view: function() {
      var _module = Handlebars.compile(flight.tpl.module),
          _back = Handlebars.compile(flight.tpl.back),
          _limit = Handlebars.compile(flight.tpl.limit),
          _share = Handlebars.compile(flight.tpl.share),
          _stop = Handlebars.compile(flight.tpl.stop);
         $("body").append(_module(), _back(), _limit(), _share(), _stop());
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
    /*根据飞机型号获取飞机的详细详细*/
    flightType: function() {
      window.online = {
        getTableTips: function(page) {
          if(!GV.app.fligtData.CraftType){
             if (location.href.indexOf("big5") !== -1) {
                require.async("../../../app/src/detail/flight_model/CraftType_big5.js",function(){
                 return flight.getFlightType(page);
                });
                } else {
                 require.async("../../../app/src/detail/flight_model/CraftType_gb2312.js",function(){
                 return flight.getFlightType(page);
                 });
               } 
             }
             else{
              return flight.getFlightType(page);
          }
       }
    }
  },
   getFlightType:function(page){
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
     },
    /*参数公用 取【价格，出发地，目的地，出发时间，目的城市】*/
    initialFight: function(pData) {
      flight.config.initialData = pData;
    },
    /*组合参数*/
    initialFightData: function(pData) {
      flight.config.groupData = {
        AdultQuantity: pData.AdultNum,
        ChildQuantity: pData.ChildNum,
        ProductID: GV.app.detail.data.ProductID,
        TripSegments: pData.data.FlightInfos[0].FlightMarkInfo.TripSegments,
        FlightSource: 3,
        SelectedFlightCombo: null,
        /*一个航程段只显示8条航班*/
        FlightCount: 8
     }
    },
    /*相同航班相同色块显示*/
    showColor: function() {
     var _table = flight.dom.table,
          _color = flight.dom.color;
          $(_table).delegate("tr", "mouseover", function() {
            var _class = $(this).data("class") ? $(this).data("class") : $(this).data("direct"),
               _select = "[data-class=\"" + _class + "\"]",
               _direct = "[data-direct=\"" + _class + "\"]";
              $(_select).addClass(_color);
              $(_direct).addClass(_color);
          });
          $(_table).delegate("tr", "mouseout", function() {
           var _class = $(this).data("class") ? $(this).data("class") : $(this).data("direct"),
               _select = "[data-class=\"" + _class + "\"]",
               _direct = "[data-direct=\"" + _class + "\"]";
              $(_select).removeClass(_color);
              $(_direct).removeClass(_color);
          });
    },
    /*是否显示滚动条*/
    checkHeight: function(pType) {
      var _dom = flight.dom.flightDataDIV;
          if(!pType){
            $(_dom).height("auto");
            $(_dom).css("overflow-y","hidden");
          }
          if ($(_dom).height() >= 611) {
            $(_dom).height("611px");
            $(_dom).css("overflow-y","scroll");
          } else {
            $(_dom).height("auto");
            $(_dom).css("overflow-y","hidden");
          }
    },
    /*第一次拉取机票信息*/
    leave: function() {
      var _initialData = flight.config.initialData,
          _price = _initialData.data.FlightInfos[0].Flights[0].Price,
          _day = _initialData.Date,
          _departCityName = _initialData.data.FlightInfos[0].Flights[0].DepartCityName,
          _loading = flight.dom.loading,
          _error = flight.dom.error,
          _flightStore = flight.config.flightStore,
          _groupData = flight.config.groupData,
          _class = $(flight.dom.flightInfo).eq(0),
          /*请求无数据，或者请求错误的时候提示内容*/
          _wrong = function(){
             flight.tips.loading(_loading, _class);
             flight.tips.error(_error, _class, _departCityName);
             /*没有数据返回的时候，让用户重试*/
             flight.leaveTryAgain(flight.leave);
          };
          /*机票需要实时数据，前端不缓存*/
           flight.tips.removeId(_error);
           flight.tips.loading(_loading, _class);
           leaveFlightAjax = $.ajax({
              url: flight.config.flightSearchUrl,
              type: "POST",
              data: {
                query: cQuery.stringifyJSON(_groupData)
              },
              success: function(data) {
                 var _data = $.parseJSON(data);
                    if (_data.errno == 0 && _data.data.Flights.length > 0) {
                      flight.render.price(_price);
                      var _i = 0,
                          _flights = _data.data.Flights,
                          _len = _flights.length;
                          /*将请求的数据缓存*/
                          for (; _i < _len; _i++) {
                            _flightStore[_flights[_i].FlightNo + "@" + _flights[_i].Sequence + "@" + _flights[_i].TakeOffDepartDate + "@" + _flights[_i].DepartTime] = _flights[_i];
                          }
                          flight.tips.loading(_loading, _class);
                          _class.append(Handlebars.compile(flight.tpl.fly)(_data.data));
                          flight.checkHeight();
                          flight.showColor();
                          flight.back();
                          flight.moreCabin();
                        }
                      else {
                       _wrong();
                    }
                    leaveFlightAjax = null;
              },
              error: function() {
                _wrong();
              }
            });
      },
    /*无法获取机票的时候，再试一次*/
    leaveTryAgain: function(pFun){
       $(flight.dom.tryAgain).bind("click",function(){
           pFun();
        })
    },
   /*选择航班*/
    back: function() {
     var _tripNum = flight.config.initialData.data.FlightInfos.length-1,
         _flightNum = flight.config.initialData.data.FlightInfos[_tripNum].TripSegmentNo,/*最后一程航程段*/
          _choose = flight.dom.choose,
          _select = flight.dom.select,
          _title = flight.dom.title,
          _flightData = flight.dom.flightData,
          _groupData = flight.config.groupData,
          _loading = flight.dom.loading;
          _error = flight.dom.error,
          _flightInfo = flight.dom.flightInfo,
          _flightStore = flight.config.flightStore,
          _table = flight.dom.table,
          _flightDataDIV = flight.dom.flightDataDIV,
          _chooseAgain = flight.dom.chooseAgain,
          _again = flight.dom.again;
          flightSectionSum = _flightNum;
        $(_flightData).delegate(_choose, "click", function() {
           var _parent = $(this).parents(_flightInfo),
                _next = _parent.next(_flightInfo),
                _key = $(this).parents("tr").data("key"),
                _data = _flightStore[_key],
                _arriveCityName = _data.ArriveCityName,
                _period = $(this).parents(_flightInfo).data("period"),
                /*请求无数据，或者请求错误的时候提示内容*/
                _wrong = function(){
                   flight.tips.loading(_loading, _next);
                   flight.tips.error(_error, _next, _arriveCityName);
                },
                /*出现异常重新选择机票*/
                _retry = function(){
                   $(flight.dom.tryAgain).bind("click",function(){
                    flight.tips.removeId(_error);
                    $("."+_again).trigger("click");
                  })
                };
                flightSectionNow = _period;
                $(this).parents(_flightInfo).find(_table).hide();
                flight.tips.loading(_loading, _next);
                /*写入自己组装的key*/
                _data.keyDomId = _key;
                _parent.find(_title).hide();
                $(_parent).find(_select).remove();
                $(_parent).append(Handlebars.compile(flight.tpl.select)(_data));
                 flight.checkHeight();
                 /*机票选择完毕提示*/
                 if(_next.length == 0){
                    flight.tips.loading(_loading, _flightDataDIV);
                    $("#"+_loading).find("strong").html("正在为您加载机票信息...");
                    /*机票选择完毕，移除重新选择按钮,等待请求资源框*/
                    $(_chooseAgain).hide();
                 }
                 /*标示选中的航班，如果获取数据失败，让用户重试*/
                 $(_choose).removeClass(_again);
                 $(this).addClass(_again);
                 /*请求的时候的时候 ForMore置为true,选择的时候置为false*/
               if(_data.SelectedFlightCombo != null){
                   for (var _k = 0,_length = _data.SelectedFlightCombo.TripSegmentFlights.length; _k < _length; _k++){
                       if(_data.SelectedFlightCombo.TripSegmentFlights[_k].TripSegmentNo == _period)
                         _data.SelectedFlightCombo.TripSegmentFlights[_k].ForMore = false;
                   }
                }
                _groupData.SelectedFlightCombo = _data.SelectedFlightCombo;
                backFlightAjax = $.ajax({
                  url: flight.config.flightSearchUrl,
                  type: "POST",
                  data: {
                    query: cQuery.stringifyJSON(_groupData)
                  },
                  success: function(data) {
                    var _dataJson = $.parseJSON(data);
                    if (_dataJson.errno == 0 && _dataJson.data.Flights.length > 0) {
                       flight.render.price(_data.Price);
                      var _i = 0,
                          _flights = _dataJson.data.Flights,
                          _len = _flights.length;
                          /*将请求的数据缓存*/
                          for (; _i < _len; _i++) {
                            _flightStore[_flights[_i].FlightNo + "@" + _flights[_i].Sequence + "@" + _flights[_i].TakeOffDepartDate + "@" + _flights[_i].DepartTime] = _flights[_i];
                          }
                          flight.tips.loading(_loading, _next);
                          $(_next).append(Handlebars.compile(flight.tpl.fly)(_dataJson.data));
                          flight.checkHeight();
                          flight.showColor();
                         }
                       else {
                         _wrong();
                         _retry();
                       }
                      /*机票选择完毕*/
                     if(_flightNum == _period){
                      if (_dataJson.errno == 0) {
                          /*将请求到的FlightMarkInfo返回给资源*/
                          GV.emit('order-select-back', {
                             type: 'flight', 
                             ChosedResource: _dataJson.data.FlightMarkInfo
                           });
                           cQuery(_flightData).unmask();
                        }
                      else{
                         $(_chooseAgain).show();
                         flight.tips.errorEnd(_error,_flightDataDIV);
                         _retry();
                      }
                     }
                     backFlightAjax = null;
                     },
                   error: function() {
                    if(_flightNum == _period){
                      /*最后一个航程段错误提示*/
                      $(_chooseAgain).show();
                        flight.tips.errorEnd(_error,_flightDataDIV);
                      }
                    else{
                       _wrong();
                    }
                   _retry();
                  }
                });
                 flight.chooseAgain();
          })
    },
    /*重新选择机票*/
    chooseAgain: function() {
      var _flightData = flight.dom.flightData,
          _chooseAgain = flight.dom.chooseAgain,
          _flightInfo = flight.dom.flightInfo,
          _table = flight.dom.table,
          _title = flight.dom.title,
          _select = flight.dom.select,
          _loading = flight.dom.loading,
          _error = flight.dom.error;
          $(_flightData).delegate(_chooseAgain, "click", function() {
            var _parent = $(this).parents(_flightInfo),
                _next = _parent.next(_flightInfo),
                _nextAll = _parent.nextAll(_flightInfo);
                /*下一程机票选择完毕以后才重新选择*/
                if (_next.find("#"+_loading).length == 0) {
                  _parent.find(_title).show();
                  _parent.find(_select).remove();
                  _parent.find(_table).show();
                  _nextAll.find(_select).remove();
                  _nextAll.find(_title).show();
                  _nextAll.find(_table).remove();
                  flight.tips.removeId(_error);
                  flight.checkHeight();
                }
          })
    },
    /*点击更多舱位*/
    moreCabin: function() {
      var _more = flight.dom.more,
          _flightData = flight.dom.flightData,
          _moreSeat = flight.dom.moreSeat,
          _moreNone = flight.dom.moreNone,
          _flightStore = flight.config.flightStore,
          _flightInfo = flight.dom.flightInfo,
         _selectParent = flight.dom.select,
         _color = flight.dom.color;
         $(_flightData).delegate(_more, "click", function() {
          var _this = this,
              /*获取选中航班的航班号*/
              _key = $(_this).parents("tr").data("key"),
              /*要换乘航班的标识 data-select=true*/
              _select = $(_this).data("select"),
              /*展开和关闭更多舱位的选中标识（单程航班）*/
              _oneWay = "[data-class=\"" + _key + "\"]",
              /*展开和关闭更多舱位的选中标示（需要换乘的航班）*/
              _multipass = "[data-multipass=\"" + _key + "@multipass\"]",
              _data = flight.config.groupData,
              _initialData = flight.config.initialData,
              _selectDom = $(_this).parents(_flightInfo).prev(_flightInfo).find(_selectParent),
              _parent = $(_this).parents("tr"),
              _last = $(_oneWay).last(),
              /*获取航程短*/
              _period = $(_this).parents(_flightInfo).data("period"),
              _sequence = _flightStore[_key].Sequence,
              /*请求无数据，或者请求错误的时候提示内容*/
              _wrong = function(){
                  if (_select) {
                      _last.next("[data-tips=\"" + _moreSeat + "\"]").remove();
                      flight.tips.seatNone(_moreNone, _last);
                    } else {
                      _parent.next("[data-tips=\"" + _moreSeat + "\"]").remove();
                      flight.tips.seatNone(_moreNone, _parent);
                    }
                    /*没有更多舱位的时候置为true,方便用户重新选择*/
                  $(_this).data("more", true);
              },
              _up = function(){
                 $(_this).find("b").removeClass("down").addClass("up");
              },
              _down = function(){
                 $(_this).find("b").removeClass("up").addClass("down");
              };
              _data.SelectedFlightCombo = _flightStore[_key].SelectedFlightCombo;
              /* for more cabinseat */
              if(_data.SelectedFlightCombo != null){
                    for (var _k = 0,_length = _data.SelectedFlightCombo.TripSegmentFlights.length; _k < _length; _k++){
                         if(_data.SelectedFlightCombo.TripSegmentFlights[_k].TripSegmentNo == _period)
                           _data.SelectedFlightCombo.TripSegmentFlights[_k].ForMore = true;
                    }
                }
              if ($(_this).data("more")) {
                $(_this).data("more", false);
                  _up();
                if (_select) {
                  /*需要换乘的航班*/
                  _last.next("[data-tips=\"" + _moreNone + "\"]").remove();
                  flight.tips.seatLoading(_moreSeat, _last);
                } else {
                  /*单程航班*/
                  _parent.next("[data-tips=\"" + _moreNone + "\"]").remove();
                  flight.tips.seatLoading(_moreSeat, _parent);
                }
                cabinFlightAjax = $.ajax({
                  url: flight.config.flightSearchUrl,
                  type: "POST",
                  data: {
                    query: cQuery.stringifyJSON(_data)
                  },
                  success: function(data) {
                    var _datas = $.parseJSON(data);
                    if (_datas.errno == 0 && _datas.data.Flights.length > 0) {
                      var _i = 0,
                          _flights = _datas.data.Flights,
                          _len = _flights.length;
                          /*根据航班的类型存储航班*/
                          for (; _i < _len; _i++) {
                            _datas.data.Flights[_i].Sequence = _sequence;
                            _flightStore[_flights[_i].FlightNo + "@" + _flights[_i].Sequence + "@" + _flights[_i].TakeOffDepartDate + "@" + _flights[_i].DepartTime + "@" + _flights[_i].ClassName + "@" + _flights[_i].Price] = _flights[_i];
                          }
                          /*计算差价*/
                          if (_selectDom.length > 0) {
                            /*第二乘航班的价格与选中的第一乘航班价格比较，以此类推*/
                            flight.render.price(_flightStore[_selectDom.data("key")].Price);
                           } else {
                            /*第一乘航班的价格与资源框中的航班价格比较*/
                            flight.render.price(_initialData.data.FlightInfos[0].Flights[0].Price);
                           }
                          /*根据是单程航班还是多程航班进行JSON渲染*/
                          if (_select) {
                            _last.next("[data-tips=\"" + _moreSeat + "\"]").remove();
                            _last.after(Handlebars.compile(flight.tpl.seats)(_datas.data));
                            $(_multipass).addClass(_color);
                          } else {
                            _parent.next("[data-tips=\"" + _moreSeat + "\"]").remove();
                            _parent.after(Handlebars.compile(flight.tpl.seat)(_datas.data));
                          }
                          } else {
                          _wrong();
                        }
                      cabinFlightAjax = null;
                   },
                  error: function() {
                         _wrong();
                    }
                });
              } else {
                /*需要换乘的航班展开和关闭*/
                if (_select) {
                  /*确保接口已经请求完毕*/
                  if(_last.next("[data-tips=\"" + _moreSeat + "\"]").length == 0){
                    _down();
                    if ($(_multipass).css("display") == "none") {
                      _up();
                      $(_multipass).show();
                    } else {
                      _down();
                      $(_multipass).hide();
                    }
                  }
                } 
                 /*单程的航班展开和关闭*/
                else {
                  /*确保接口已经请求完毕*/
                  if( _parent.next("[data-tips=\"" + _moreSeat + "\"]").length == 0){
                     _down();
                     if (_parent.next(_oneWay).css("display") == "none") {
                       _up();
                      _parent.nextAll(_oneWay).show();
                    } else {
                      _down();
                      _parent.nextAll(_oneWay).hide();
                    }
                 }
                }
              }
            flight.checkHeight(!0);
        })
    },
   init: function() {
      flight.view();
      flight.render.tool();
      flight.flightType();
      flight.LodMods();
      /*监听【选择其他航班】*/
      GV.on('order-select-button-click', function(e) {
        if (e.type == 'flight') {
            $(flight.dom.flightData).remove();
            $("body").append(Handlebars.compile(flight.tpl.box)(e));
            flight.initialFight(e);
            flight.initialFightData(e);
            flight.leave();
            cQuery(flight.dom.flightData).mask();
            flight.checkHeight();
            $(flight.dom.flightDataClose).bind("click", function() {
              cQuery(flight.dom.flightData).unmask();
              /*用户关闭时中断还在请求的ajax*/
             if(leaveFlightAjax != null){
                 leaveFlightAjax.abort();
                 leaveFlightAjax = null;
                }
              if(cabinFlightAjax != null){
                 cabinFlightAjax.abort();
                 cabinFlightAjax = null;
              }
              /*最后一个航程段请求资源框时用户关闭层时不中断ajax请求*/
              if(backFlightAjax != null && flightSectionSum > 0 && flightSectionNow > 0 && flightSectionNow < flightSectionSum){
                  backFlightAjax.abort();
                  backFlightAjax = null; 
                  flightSectionNow = 0;
                  flightSectionSum = 0;
              }
            })
        }
      })
    }
  }
  exports.init = flight.init;
})