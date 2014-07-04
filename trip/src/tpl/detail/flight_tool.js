/*航班弹出层*/
define(function(){
	return '<div id="jmp_TransfersOrStops" style="display: none">\
                 ${txt}\
              </div>\
              <div id="jmp_tab" style="display:none">\
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
                </div>\
                <div id="jmp_ChangeBack" style="display: none">\
                      <div class="jmp_hd">\
                        <h3> ${key}</h3>\
                      </div>\
                      <div class="jmp_bd flt_jmp">${txt}</div>\
                     </div>\
                     <div id="jmp_Limit" style="display: none">\
                 <div class="jmp_hd">\
                   <h3> ${key}</h3>\
                   </div>\
                    <div class="jmp_bd flt_jmp">\
                    <p>${content}</p>${txt}\
                 </div>\
              </div>\
            <div id="jmp_ShareFlight" style="display: none">${txt}</div>'
})