/*航班初始层*/
define(function(){
  return '{{#Flights}}\
                    {{#each FlightDetails}}\
                      <tr data-key="{{../FlightNo}}{{../Sequence}}{{../TakeOffDepartDate}}{{../DepartTime}}" data-color="{{../FlightNo}}{{../Sequence}}{{../TakeOffDepartDate}}{{../DepartTime}}"  {{#border @index ../FlightDetails.length}}{{/border}}>\
                            <td><div><strong>{{DepartTime}}</strong></div>\
                              <div><strong>{{ArriveTime}}</strong>{{~#if DarkMorning~}}\
                              <span class="special_flt" data-role="jmp" data-params="{options: {css:{maxWidth:\'300\'},type:\'jmp_title\',classNames:{boxType:\'jmp_title\'},template:\'#jmp_title4_1{{@index}}\',alignTo:\'cursor\'}}">凌晨</span>\
                              <div id="jmp_title4_1{{@index}}" style="display:none;">\
                               <div class="jmp_hd">\
                                <h3>说明</h3>\
                                </div>\
                                <div class="jmp_bd flt_jmp">\
                                <p>{{DarkMorning}}</p>\
                                </div>\
                              </div>\
                             {{~/if~}}\
                              {{~#if NextDay~}}\
                              <span class="special_flt" data-role="jmp" data-params="{options: {css:{maxWidth:\'300\'},type:\'jmp_text\',classNames:{boxType:\'jmp_text\'},\
                                    template:\'#jmp_NextDay_{{TripSegmentNo}}_{{FlightNo}}\',alignTo:\'cursor\'}}\">{{#is NextDay ">" 0}}+{{/is}}{{NextDay}}</span>\
                                <div id="jmp_NextDay_{{TripSegmentNo}}_{{FlightNo}}" style="display:none">\
                                    <div class="jmp_bd">受时差和飞行时间影响，航班到达日期为起飞日期{{NextDay}}天。显示的到达时间为当地时间。</div>\
                                </div>\
                              {{~/if~}}\
                             </div></td>\
                            <td>\
                              <div>{{DepartCityName}}({{DepartAirportName}})</div>\
                              <div>{{ArriveCityName}}({{ArriveAirportName}})</div>\
                            </td>\
                            <td><div class="pubFlights_{{AirlineCode}}">{{AirlineShortName}}</div>\
                               <div class="flt_num">\
                                {{FlightNo}}\
                                <span data-params="{options: {boundaryShow:false,css:{maxWidth:\'490\'},\
                                 type:\'jmp_table\',classNames:{boxType:\'jmp_table\'},\
                                 template:\'#jmp_tab\',\
                                 content:online.getTableTips(\'fltDomestic_planeType.asp?CraftType={{Aircraft}}\'),\
                                 alignTo:\'cursor\'}}"\
                                data-role="jmp" class="base_txtdiv">{{Aircraft}}</span>\
                                </div></td>\
                            <td>{{JourneyTime}}\
                             {{#FlightStops}}\
                               <span class="base_txtdiv" data-role="jmp" data-params="{options: {css:{maxWidth:\'300\'},type:\'jmp_text\',classNames:{boxType:\'jmp_text\'},\
                                template:\'#jmp_TransfersOrStops\',\'content\':{ txt:\'{{#Data}}<div class=jmp_bd><strong>{{Text}}</strong><p>{{Value}}</p></div>{{/Data}}\'},alignTo:\'cursor\'}}">{{Key}}\
                            </span>\
                             {{/FlightStops}}\
                            </td>\
                           <td>{{ClassName}}\
                            {{#is @index "===" 0}}\
                               {{#if ../../HasMoreFlights}}\
                                 <span  class="more_cabin JS_MoreCabin"  data-ajax="true">更多舱位<b class="down"></b></span>\
                              {{/if}}\
                            {{/is}}\
                           </td>\
                            <td>{{#../Remarks}}\
                               {{#Votes}}<span class="base_txtdiv">{{Value}}</span>{{/Votes}}\
                               {{#ChangeBack}}<span class="base_txtdiv" data-role="jmp" data-params="{options: {css:{maxWidth:\'300\',minWidth:\'240\'},type:\'jmp_title\',classNames:{boxType:\'jmp_title\'},template:\'#jmp_ChangeBack\',\'content\':{ key:\'{{Key}}\',txt:\'{{#Data}}<strong>{{Text}}</strong><p>{{Value}}</p>{{/Data}}\'},alignTo:\'cursor\'}}">{{Key}}</span>{{/ChangeBack}}\
                               {{#Limit}}<span class="base_txtdiv" data-role="jmp" data-params="{options: {css:{maxWidth:\'300\',minWidth:\'240\'},type:\'jmp_title\',classNames:{boxType:\'jmp_title\'},template:\'#jmp_Limit\',\'content\':{ key:\'{{Key}}\',content:\'{{Content}}\',txt:\'{{#Data}}<strong>{{Text}}</strong><p>{{Value}}</p>{{/Data}}\'},alignTo:\'cursor\'}}">{{Key}}</span>{{/Limit}}\
                               {{#ShareFlight}}<span class="base_txtdiv" data-role="jmp" data-params="{options: {css:{maxWidth:\'300\',minWidth:\'240\'},type:\'jmp_title\',classNames:{boxType:\'jmp_text\'},template: \'#jmp_ShareFlight\',\'content\':{\'txt\':\'<div class=jmp_bd>{{Value}}\'},alignTo:\'cursor\'}}">{{Text}}</span>{{/ShareFlight}}\
                               {{#PaymentLimit}}<span class="base_txtdiv" data-role="jmp" data-params="{options: {css:{maxWidth:\'300\',minWidth:\'240\'},type:\'jmp_title\',classNames:{boxType:\'jmp_text\'},template: \'#jmp_ShareFlight\',\'content\':{\'txt\':\'<div class=jmp_bd>{{Value}}\'},alignTo:\'cursor\'}}">{{Text}}</span>{{/PaymentLimit}}\
                              {{/../Remarks}}</td>\
                              {{#is @index "===" 0}}\
                               <td rowspan="{{#plus ../../FlightDetails.length}}{{/plus}}" class="border_dotted">\
                               <div class="flt_price">{{#deal ../../Price}}{{/deal}}</div>\
                               {{#is ../../IsSystem "===" false}}<span class="ctrip_recommend">携程推荐</span>{{/is}}\
                               </td>\
                               <td rowspan="{{#plus ../../FlightDetails.length}}{{/plus}}" class="border_dotted"><div class="select_btn"><a href="javascript:void(0);"  class="JS_Choose">选择</a></div></td>\
                              {{/is}}\
                             </tr>\
                           {{#if Duration}}\
                           <tr class="no_border" data-key="{{../../FlightNo}}{{../../Sequence}}{{../../TakeOffDepartDate}}{{../../DepartTime}}" data-color="{{../../FlightNo}}{{../../Sequence}}{{../../TakeOffDepartDate}}{{../../DepartTime}}"><td colspan="6"><div class="transfer_plane"><span><i></i>{{ArriveCityName}}（{{ArriveAirportName}}）中转&nbsp;{{Duration}}</span></div></td></tr>\
                           {{/if}}\
                          {{/each}}\
                            {{#if DirectFlightChannel}}\
                              <tr data-key="{{FlightNo}}{{Sequence}}{{TakeOffDepartDate}}{{DepartTime}}" data-color="{{FlightNo}}{{Sequence}}{{TakeOffDepartDate}}{{DepartTime}}"><td colspan="8"><div class="luggage_limit_info"><i></i>请注意您购买机票的免费行李额度，该机票婴儿无法预定。</div></td></tr>\
                            {{/if}}\
                          {{/Flights}}'
                
  })