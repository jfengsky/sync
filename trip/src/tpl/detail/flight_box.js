/*航班初始层*/
define(function(){
	return '<div class="resource_mask"  id="JS_FlightData" style="display:none">\
                  <div class="scroll_wrap" id="JS_ScrollWrap">\
                  {{#data}}\
                  {{#each FlightInfos}}\
                  <div class="JS_FlightInfo" data-period="{{TripSegmentNo}}">\
                     <h3 class="flt_mask_city" data-class="flightTitle">{{Flights.0.DepartCityName}}—{{Flights.0.ArriveCityName}}&nbsp;&nbsp;{{Flights.0.TakeOffDepartDate}}<span class="flt_time_notice">所有航班起抵时间均为当地时间（24小时制）</span></h3>\
                  </div>\
                  {{/each}}\
                  {{/data}}\
                  </div>\
                <a href="javascript:void(0);" class="close" id="JS_ScrollWrapClose"><span>关闭</span></a>\
                </div>'
})