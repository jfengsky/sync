/*航班初始层*/
define(function(){
  return '<table class="flt_mask_table JS_MaskTable">\
               <thead>\
                   <tr>\
                    <th class="col_01">{{#is Flights.length ">" 1}}<a class="current"  href="###" data-type="timeSort">时间<i class="up"></i></a>{{/is}}{{#is Flights.length "===" 1}}时间{{/is}}</th>\
                    <th class="col_02">机场</th>\
                    <th class="col_03">航空公司</th>\
                    <th class="col_04">飞行总时长</th>\
                    <th class="col_05">舱位</th>\
                    <th class="col_06">备注</th>\
                    <th class="col_07">{{#is flyPrice.length ">" 1}}<a href="###" href="###" data-type="priceSort">价差<i class="up"></i></a>{{/is}}{{#is flyPrice.length "===" 1}}价差{{/is}}</th>\
                    <th></th>\
                  </tr>\
               </thead>\
               <tbody>\
              </tbody>\
              </table>'
  })