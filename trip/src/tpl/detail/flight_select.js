/*选择的航班*/
define(function(){
	return '<table class="flt_mask_table flt_mask_table_selected JS_SelectTable"  data-key="{{keyDomId}}">\
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
                            {{#FlightDetails}}\
                             <div class="pubFlights_{{AirlineCode}}">{{AirlineShortName}}</div>\
                            {{/FlightDetails}}\
                          </td>\
                          <td class="col_05">\
                           {{#FlightDetails}}\
                             <div class="flt_num">{{FlightNo}}</div>\
                              <span data-params="{options: {boundaryShow:false,css:{maxWidth:\'490\'},\
                              type:\'jmp_table\',classNames:{boxType:\'jmp_table\'},\
                              template:\'#jmp_tab\',\
                              content:online.getTableTips(\'fltDomestic_planeType.asp?CraftType={{Aircraft}}\'),\
                              alignTo:\'cursor\'}}"\
                              data-role="jmp" class="base_txtdiv">{{Aircraft}}</span>\
                            {{/FlightDetails}}\
                          </td>\
                          <td class="col_06">\
                            {{#FlightDetails}}\
                               <div>{{ClassName}}</div>\
                              {{/FlightDetails}}\
                          </td>\
                          <td class="col_07">\
                            <div class="selected"><a href="javascript:void(0);">选择</a></div>\
                          </td>\
                          <td>\
                            <div class="select_btn"><a href="javascript:void(0);" class="JS_ChooseAgain">重新选择</a></div>\
                          </td>\
                        </tr>\
                      </tbody>\
                    </table>'
})