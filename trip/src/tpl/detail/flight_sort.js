define(function(){
   return '<div class="flt_mask_filter basefix JS_Condition">\
               <div class="left JS_Multiple">\
                  {{#is flyTime.length ">" 1}}\
                    <div class="input_select">\
                     <input type="text" value="起飞时段" readonly="readonly" class="base_text JS_BaseText">\
                     <b></b>\
                     <p style="display:none">{{#each flyTime}}<a href="javascript:void(0);"><input type="checkbox" data-type="time@{{FlyTime}}">{{FlyTime}}</a>{{/each}}</p>\
                     </div>\
                  {{/is}}\
                  {{#is company.length ">" 1}}\
                  <div class="input_select">\
                   <input type="text" value="航空公司" readonly="readonly" class="base_text JS_BaseText">\
                   <b></b>\
                   <p style="display:none">{{#each company}}<a href="javascript:void(0);"><input type="checkbox" data-type="company@{{AirlineShortName}}">{{AirlineShortName}}</a>{{/each}}</p>\
                   </div>\
                  {{/is}}\
                  {{#is depart.length ">" 1}}\
                    <div class="input_select">\
                      <input type="text" value="起飞机场" readonly="readonly" class="base_text JS_BaseText">\
                      <b></b>\
                      <p style="display:none">{{#each depart}}<a href="javascript:void(0);"><input type="checkbox" data-type="depart@{{DepartAirportName}}">{{DepartAirportName}}</a>{{/each}}</p>\
                    </div>\
                  {{/is}}\
                  {{#is arrive.length ">" 1}}\
                   <div class="input_select">\
                     <input type="text" value="降落机场" readonly="readonly" class="base_text JS_BaseText">\
                     <b></b>\
                     <p style="display:none">{{#each arrive}}<a href="javascript:void(0);"><input type="checkbox" data-type="arrive@{{ArriveAirportName}}">{{ArriveAirportName}}</a>{{/each}}</p>\
                   </div>\
                  {{/is}}\
                </div>\
                <div class="right JS_Rirect">\
                  {{#is direct.length ">" 1}}<label for="" class="filter_checkbox"><input type="checkbox" data-type="direct@直飞">仅查看直飞</label>{{/is}}\
                  {{#is ctrip.length ">" 1}}<label for="" class="filter_checkbox"><input type="checkbox" data-type="ctrip@携程推荐">仅查看<span class="ctrip_recommend">携程推荐</span></label>{{/is}}\
                </div>\
          </div>\
          <dl class="flt_mask_filtered JS_CleanSearch" style="display:none">\
            <dt>您已选择:</dt>\
            <dd><a href="javascript:void(0);" class="clean" data-type="clean">清除</a></dd>\
           </dl>\
            <div class="filter_error JS_SearchError" style="display:none">\
              <div class="c_loading detail_loading"><img src="http://pic.c-ctrip.com/vacation_v1/ico_info_blue.png" alt=""><strong>很抱歉，没有找到符合筛选条件的航班。</strong></div>\
              <p class="clean_filter">您还可以：<a href="###">清空筛选条件</a></p>\
            </div>'
})