define(function(){
  return "<ul class=\"resource_price_wrap basefix\">\n\
  <li class=\"start_date\">\n\
    <label for=\"\">出发</label>\n\
    <div class=\"input_wrap\">\n\
      {{#if isStartup}}\n\
      <input readonly=\"readonly\" type=\"text\" id=\"js-departure-date\" value=\" 请选择出发日期\">\n\
      <input readonly=\"readonly\" id=\"js-depature-date-real\" type=\"text\" style=\"position:absolute;left:0;top:0;z-index:1;filter:alpha(opacity=0);opacity:0;\" value=\"请选择出发日期\">\n\
      {{else}}\n\
            <input readonly=\"readonly\" type=\"text\" id=\"js-departure-date\" value=\"{{#if BaseInfo.DepartureDate}} {{#dtdate BaseInfo.DepartureDate}}{{/dtdate}}（{{#week BaseInfo.DepartureDate}}{{/week}}）&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{#if StartPrice}}&yen;{{StartPrice}}起/{{#unless StudyTour}}成{{/unless}}人{{/if}}{{/if}}\" />\n\
            <input readonly=\"readonly\" type=\"text\" style=\"position:absolute;left:0;top:0;z-index:1;filter:alpha(opacity=0);opacity:0;\" value=\"{{#if BaseInfo.DepartureDate}}{{#dtdate BaseInfo.DepartureDate}}{{/dtdate}}{{/if}}\" />\n\
      {{/if}}\n\
      <b></b>\n\
    </div>\n\
    <!--<span data-role=\"jmp\" data-params=\"{options:{type:'jmp_table',classNames:{boxType:'jmp_table'},template:'#jmp_pkg_title', content:{txt0:'儿童价标准',txt1:'年龄2-12周岁，不占床，含往返交通、正餐、导游等服务。'},css:{maxWidth:'300',minWidth:'240'},alignTo:'cursor'}}\" class=\"children_price\"><i></i>儿童价</span>-->\n\
  </li>\n\
  {{#if IsTourGroupProduct}}\n\
    <li class=\"line_select\">\n\
	    <label for=\"\">线路</label>\n\
	    <div class=\"input_wrap\">\n\
		    <input readonly=\"readonly\" type=\"text\" value=\"{{#is BaseInfo.MultiLine '!==' undefined}}{{BaseInfo.MultiLine}}{{else}}{{/is}}\">\n\
		    <b></b>\n\
		    <p style=\"display:none\"></p>\n\
	    </div>\n\
    </li>\n\
  {{/if}}\n\
    <!--\n\
        儿童可预订\n\
        成人下拉：1-10 儿童下拉：0-10\n\
        默认成人2和min取最小值 儿童0\n\
        儿童不可预订\n\
        成人下拉：2和min取最小值-“+9”\n\
        默认成人2和min取最小值\n\
    -->\n\
  <li class=\"tourist_num\">\n\
    <label for=\"\">成人</label>\n\
    <div class=\"input_wrap\">\n\
            <input type=\"number\" value=\"{{#is BaseInfo.AdultNum '!==' undefined}}{{BaseInfo.AdultNum}}{{else}}{{#Max MinPersonQuantity 2}}{{/Max}}{{/is}}\" />\n\
      <b></b>\n\
      <p style=\"display:none\">\n\
        {{#eachx \"null\" MinAdult MaxAdult}}\n\
        <a href=\"javascript:void(0);\">{{$index}}</a>\n\
        {{/eachx}}\n\
      </p>\n\
    </div>\n\
  </li>\n\
  <li class=\"children_num\">\n\
    {{#if ForChild}}\n\
    <label for=\"\">儿童<span>(2-12岁)</span></label>\n\
    <div class=\"input_wrap\">\n\
      <input type=\"number\" value=\"{{#is BaseInfo.ChildNum '!==' undefined}}{{BaseInfo.ChildNum}}{{else}}0{{/is}}\" />\n\
      <b></b>\n\
      <p style=\"display:none\">\n\
        {{#eachx \"null\" MinChild MaxChild}}\n\
        <a href=\"javascript:void(0);\">{{$index}}</a>\n\
        {{/eachx}}\n\
      </p>\n\
    </div>\n\
    {{else}}\n\
    <label for=\"\">儿童<span>(不接受儿童预订)</span></label>\n\
    {{/if}}\n\
  </li>\n\
  <li class=\"total_price\">\n\
    <span class=\"price_name\">总价</span>\n\
    <span class=\"price\">{{#if isFetchSuccess }}{{#moneyHTML BaseInfo.TotalPrice}}{{/moneyHTML}}{{else}}--{{/if}}</span>\n\
    <a id=\"js-submit\" class=\"{{#anyNoneEmpty isFetchSuccess isStartup }}btn_red_big{{else}}btn_big_disabled{{/anyNoneEmpty}}\" href=\"javascript:void(0);\">\n\
      {{#if isStartup}}\n\
      开始预订\n\
      {{else}}\n\
      {{#if isFetching }}\n\
      {{#if isOrdering}}\n\
      预订中...\n\
      {{else}}\n\
      查询中...\n\
      {{/if}}\n\
      {{else}}\n\
      立即预订\n\
      {{/if}}\n\
      {{/if}}\n\
    </a>\n\
  </li>\n\
</ul>\n\
<div class=\"resource_wrap\">\n\
{{#unless isStartup}}\n\
{{#if hasRiskRemark}}\n\
<div class=\"y_box\">\n\
    <p>奖励金额：{{RiskReward}}<br/>备注：{{RiskRemark}}</p>\n\
</div>\n\
{{/if}}\n\
<div class=\"all_resource\">\n\
  {{#if isFetchSuccess}}\n\
    {{#if IsShowResource}}\n\
  <div class=\"flt_htl_resource basefix\">\n\
    {{#if FlightInfos.length}}\n\
    <div class=\"flt_resource_detail\" id=\"js-flight-wrap\">\n\
      <h4 class=\"resource_detail_title2\">机票</h4>\n\
      <table class=\"flt_resource_table\">\n\
        <tbody>\n\
          {{#each FlightInfosDealed}}\n\
          <tr{{#if CSSHasBorder}}{{#is CSSBorderWhere 'Flight'}} class=\"border\"{{/is}}{{/if}} data-segment-number=\"{{TripSegmentNo}}\">\n\
            <td class=\"col_01\">\n\
              {{DepartDate}}{{#if DarkMorning}}<span data-role=\"jmp\" data-params=\"{options:{type:'jmp_title',classNames:{boxType:'jmp_title'},template:'#jmp_pkg_title', content:{txt0:'{{DarkMorning}}'},css:{maxWidth:'300',minWidth:'240'},alignTo:'cursor',showArrow:false}}\" class=\"special_flt\">凌晨航班</span>{{/if}}\n\
            </td>\n\
            <td class=\"col_02\">\n\
              <div>\n\
                <strong class=\"time\">{{DepartTime}}</strong>{{DepartCityName}}（{{DepartAirportName}}）\n\
              </div>\n\
              <div>\n\
                <strong class=\"time\">{{ArriveTime}}</strong>{{ArriveCityName}}（{{ArriveAirportName}}）\n\
                {{#is NextDay 0}}\n\
                                {{else}}\n\
                <span class=\"base_txtdiv\" data-role=\"jmp\" data-params=\"{options:{css:{maxWidth:'300',minWidth:'240'},type:'jmp_text',classNames:{boxType:'jmp_text'},template:'#jmp_NextDay_{{TripSegmentNo}}_{{FlightNo}}',alignTo:'cursor',showArrow:false}}\">{{#is NextDay '>' 0}}+{{/is}}{{NextDay}}</span>\n\
                <div id=\"jmp_NextDay_{{TripSegmentNo}}_{{FlightNo}}\" style=\"display:none\">\n\
                  <div class=\"jmp_bd\">受时差和飞行时间影响，航班到达日期为起飞日期{{#is NextDay '>' 0}}+{{/is}}{{NextDay}}天。显示的到达时间为当地时间。</div>\n\
                </div>\n\
                {{/is}}\n\
              </div>\n\
            </td>\n\
            <td class=\"col_03\">\n\
              <div class=\"pubFlights_{{AirlineCode}}\">{{AirlineShortName}}</div>\n\
              <div class=\"flt_num\">\n\
                {{FlightNo}}\n\
                <!-- 机型 -->\n\
                <span data-params=\"{options: {boundaryShow:false,css:{maxWidth:'490'},type:'jmp_table',classNames:{boxType:'jmp_table'},template:'#jmp_tab',content:online.getTableTips('fltDomestic_planeType.asp?CraftType={{PlaneType}}'),alignTo:'cursor'}}\"\n\
                data-role=\"jmp\" class=\"base_txtdiv\">{{PlaneType}}</span>\n\
              </div>\n\
            </td>\n\
            <td class=\"col_04\">{{ClassName}}</td>\n\
            <td class=\"col_05\">{{JourneyTime}}</td>\n\
            <td class=\"col_06\">\n\
              <!--经停-->\n\
              {{#FlightStops}}\n\
              <span class=\"base_txtdiv\" data-role=\"jmp\" data-params=\"{options: {css:{maxWidth:'300'},type:'jmp_text',classNames:{boxType:'jmp_text'},template:'#jmp_TransfersOrStops',content:{ txt:'{{#each Data}}<div class=jmp_bd><strong>{{Text}}</strong><p>{{Value}}</p></div>{{/each}}'},alignTo:'cursor',showArrow:false}}\">{{Key}}</span>\n\
              {{/FlightStops}}\n\
              <!-- 预设限制 -->\n\
              {{#Remarks}}\n\
                {{! 仅剩几张 }}\n\
                {{#Votes}}\n\
                    <span class=\"base_txtdiv\">{{Value}}</span>\n\
                {{/Votes}}\n\
                {{! 退改签 }}\n\
                {{#ChangeBack}}\n\
                  <span class=\"base_txtdiv\" data-role=\"jmp\" data-params=\"{options: {css:{maxWidth:'300',minWidth:'240'},type:'jmp_title',classNames:{boxType:'jmp_title'},template:'#jmp_ChangeBack','content':{ key:'{{Key}}',txt:'{{#Data}}<strong>{{Text}}</strong><p>{{Value}}</p>{{/Data}}'},alignTo:'cursor'}}\">{{Key}}</span>\n\
                {{/ChangeBack}}\n\
                {{! 预设限制 }}\n\
                {{#Limit}}\n\
                  <span class=\"base_txtdiv\" data-role=\"jmp\" data-params=\"{options: {css:{maxWidth:'300',minWidth:'240'},type:'jmp_title',classNames:{boxType:'jmp_title'},template:'#jmp_Limit','content':{ key:'{{Key}}',content:'{{Content}}',txt:'{{#Data}}<strong>{{Text}}</strong><p>{{Value}}</p>{{/Data}}'},alignTo:'cursor'}}\">{{Key}}</span>\n\
                {{/Limit}}\n\
                {{! 共享航班 }}\n\
                {{#ShareFlight}}\n\
                  <span class=\"base_txtdiv\" data-role=\"jmp\" data-params=\"{options: {css:{maxWidth:'300',minWidth:'240'},type:'jmp_title',classNames:{boxType:'jmp_text'},template: '#jmp_ShareFlight','content':{'txt':'<div class=jmp_bd>{{Value}}'},alignTo:'cursor'}}\">{{Text}}</span>\n\
                {{/ShareFlight}}\n\
                                {{#PaymentLimit}}\n\
                                    <span class=\"base_txtdiv\" data-role=\"jmp\" data-params=\"{options: {css:{maxWidth:\'300\',minWidth:\'240\'},type:\'jmp_title\',classNames:{boxType:\'jmp_text\'},\template: \'#jmp_ShareFlight\',\'content\':{\'txt\':\'<div class=jmp_bd>{{Value}}\'},alignTo:\'cursor\'}}\">{{Text}}</span>\n\
                                {{/PaymentLimit}}\n\
              {{/Remarks}}\n\
            </td>\n\
            {{#if HasMoreButton}}\n\
            <td class=\"col_btn\" rowspan=\"{{MoreButtonRowSpan}}\">\n\
              <a class=\"change_resource_btn\" href=\"javascript:void(0);\">选择其他航班</a>\n\
            </td>\n\
            {{/if}}\n\
          </tr>\n\
          {{#if HasTransfer}}\n\
          <tr{{#if CSSHasBorder}}{{#is CSSBorderWhere 'HasTransfer'}} class=\"border\"{{/is}}{{/if}}>\n\
            <td colspan=\"6\">\n\
              <div class=\"transfer_plane\"><span><i></i>{{ArriveCityName}}（{{ArriveAirportName}}）中转&nbsp;停留时长：{{Duration}}</span></div>\n\
            </td>\n\
          </tr>\n\
          {{/if}}\n\
                    {{#if DirectFlightChannel}}\n\
                    <tr{{#if CSSHasBorder}}{{#is CSSBorderWhere 'DirectFlightChannel'}} class=\"border\"{{/is}}{{/if}}>\n\
                        <td></td>\n\
                        <td colspan=\"5\">\n\
                            <div class=\"luggage_limit_info\"><i></i>请注意您购买机票的免费行李额度，该机票婴儿无法预定。</div>\n\
                        </td>\n\
                    </tr>\n\
                    {{/if}}\n\
          {{/each}}\n\
        </tbody>\n\
      </table>\n\
    </div>\n\
    {{/if}}\n\
    {{#if HotelInfos.length}}\n\
    <div class=\"htl_resource_detail\" id=\"js-hotel-wrap\">\n\
      <h4 class=\"resource_detail_title2\">酒店</h4>\n\
      <table class=\"htl_resource_table\">\n\
        <tbody>\n\
          {{#each HotelInfos}}\n\
          <tr data-index-in-data=\"{{@index}}\" data-segment-number=\"{{SegmentNumber}}\" data-hotel-id=\"{{Hotel}}\">\n\
            <td class=\"col_01\">\n\
              <p class=\"gray\">{{CityName}}（{{LiveCount}}晚）</p>\n\
              <p class=\"gray\">入住&nbsp;&nbsp;{{#dtdate LiveStartDay}}{{/dtdate}}</p>\n\
              <p class=\"gray\">离店&nbsp;&nbsp;{{#dtdate LiveEndDay}}{{/dtdate}}</p>\n\
            </td>\n\
            <td class=\"col_02\">\n\
              <a class=\"htl_img\" href=\"{{HotelUrl}}\" target=\"_blank\" title=\"{{HotelName}}\">\n\
                <img src=\"{{LogoUrl}}\" alt=\"\" width=\"100\" height=\"75\">\n\
              </a>\n\
              <div class=\"htl_detail\">\n\
                <h3>\n\
                  <a href=\"{{HotelUrl}}\" target=\"_blank\" title=\"{{HotelName}}\">{{HotelName}}</a>\n\
                  {{#is StarLience 'T'}}\n\
                  {{! 实心的星星 }}\n\
                                    <i title=\"国家旅游局评定为{{Star}}星级\" class=\"hotel_star_{{Star}}\"></i>\n\
                  {{else}}\n\
                                    <i title=\"{{#EmptyStar Star}}{{/EmptyStar}}\" class=\"hotel_hollow_{{Star}}\"></i>\n\
                  {{/is}}\n\
                </h3>\n\
                <p class=\"gray\">{{Address}}</p>\n\
                {{> RoomList}}\n\
                {{#is RoomTotalCount '>' 1}}\n\
                <div class=\"flod_spread_btn\">\n\
                  <a href=\"javascript:void(0);\">\n\
                    更多房型<b class=\"down\"></b>\n\
                  </a>\n\
                  <a href=\"javascript:void(0);\" style=\"display:none\">\n\
                    收起<b class=\"up\"></b>\n\
                  </a>\n\
                </div>\n\
                {{/is}}\n\
              </div>\n\
            </td>\n\
            <td class=\"col_btn\">\n\
                            {{#is HotelTotalCount '>' 1}}\n\
              <a class=\"change_resource_btn\" href=\"javascript:void(0);\">选择其他酒店</a>\n\
              {{/is}}\n\
            </td>\n\
          </tr>\n\
          {{/each}}\n\
        </tbody>\n\
      </table>\n\
    </div>\n\
    {{/if}}\n\
        {{#if IsShowSingleOptionalTable}}\n\
    <div class=\"other_resource_detail\">\n\
            <h4 class=\"resource_detail_title2\">可选资源</h4>\n\
      <table class=\"other_resource_table\">\n\
        <tbody>\n\
          {{#each SingleResources}}\n\
          {{#if IsShow}}\n\
          <tr class=\"js-single\" data-index-in-data=\"{{@index}}\" data-segment-id=\"{{SegmentID}}\" data-segment-number=\"{{SegmentNumber}}\" data-resource-id=\"{{ResourceID}}\" data-category-id=\"{{CategoryID}}\">\n\
                        <td class=\"col_01\" rowspan=\"{{Rowspan}}\">\n\
                            {{#if IsTitleShow}}<h4 class=\"other_product\">{{{TitlteName}}}</h4>{{/if}}\n\
                        </td>\n\
            <td class=\"col_02\">\n\
                            <div class=\"other_name js-product-name\">{{{Name}}}</div>\n\
            </td>\n\
            <td class=\"col_03\">\n\
              {{!--直接显示杠杠<div><span class=\"other_price\">{{#moneyHTML Price}}{{/moneyHTML}}</span>{{#if MarketPrice}}<span class=\"original_price\">(<strong>{{#moneyHTML MarketPrice}}{{/moneyHTML}}</strong>)</span>{{/if}}</div>--}}\n\
              --\n\
            </td>\n\
            <!--出发日期-->\n\
            {{#if IsTraffic}}\n\
            <td class=\"col_04\">{{#dtdate DepartureDate}}{{/dtdate}}</td>\n\
            {{else}}\n\
            <td class=\"col_04\">--</td>\n\
            {{/if}}\n\
            <td class=\"col_05\">\n\
                            {{!-- 单选项，份数压根不让显示了现在\n\
              <div class=\"room_num\">\n\
              <!--单选项，都不会出现下拉框-->\n\
                <div class=\"num_input_wrap\">\n\
                  {{TotalCount}}\n\
                </div>\n\
                {{Unit}}\n\
              </div>\n\
                            --}}\n\
            </td>\n\
            <td class=\"col_06\">\n\
              {{!--直接显示杠杠<div><span class=\"other_price\">{{#moneyHTML TotalPrice}}{{/moneyHTML}}</span></div>--}}\n\
              --\n\
            </td>\n\
            <td class=\"col_07\">\n\
              <div class=\"room_selected\"{{#is Count '<=' 0}} style=\"display:none\"{{/is}}>\n\
                <a href=\"javascript:void(0);\">选择</a>\n\
              </div>\n\
            </td>\n\
            {{#is TotalCount '>' 1}}\n\
            <td class=\"col_btn\">\n\
              <a class=\"change_resource_btn\" href=\"javascript:void(0);\">选择其他{{{CategoryName}}}</a>\n\
            </td>\n\
            {{/is}}\n\
          </tr>\n\
                    {{#if Introduction}}\n\
                    <tr class=\"js-intro\" style=\"display:none\">\n\
                        <td></td>\n\
                        <td colspan=\"6\">\n\
                            <div class=\"other_product_detail\">\n\
                                <b class=\"triangle\"></b>\n\
                                <i></i>\n\
                                <div>{{{Introduction}}}</div>\n\
                                <a class=\"flod_btn\" href=\"javascript:void(0);\">收起</a>\n\
                            </div>\n\
                        </td>\n\
                        <td></td>\n\
                    </tr>\n\
                    {{/if}}\n\
          {{/if}}\n\
          {{/each}}\n\
          {{#each OptionResources}}\n\
          <tr{{#unless IsShow}} style=\"display:none\"{{/unless}} class=\"js-optional{{#if IsBaoxian}} js-is-baoxian{{/if}}\"\n\
           {{#unless IsDropdownDateShow}}data-only-date=\"{{OnlyDate}}\" {{/unless}}data-index-in-data=\"{{@index}}\" data-resource-id=\"{{ResourceID}}\" data-category-id=\"{{CategoryID}}\">\n\
            <td class=\"col_01\" rowspan=\"{{Rowspan}}\">\n\
              {{#if IsShowTitle}}<h4 class=\"other_product\">{{{CategoryName}}}</h4>{{/if}}\n\
            </td>\n\
            <td class=\"col_02\">\n\
                            <i class=\"free_gift\" {{#listItem Inventory 0}}{{#is Price '>' 0}}style=\"display:none\"{{/is}}{{/listItem}}></i><div class=\"other_name js-product-name\">{{{Name}}}</div>\n\
            </td>\n\
            <td class=\"col_03\">\n\
            {{! 【价钱】【日期选择】【数量选择】 默认显示多个日期中的第一条的数据 }}\n\
            {{#listItem Inventory 0}}\n\
              <div><span class=\"js-ctrip-price other_price\">{{#moneyHTML Price}}{{/moneyHTML}}{{!--#operator Price '*' DefaultQuantity}}{{/operator--}}</span>{{#if MarketPrice}}<span class=\"original_price\">(<strong class=\"js-original-price\">{{#moneyHTML MarketPrice}}{{/moneyHTML}}{{!--#operator MarketPrice '*' DefaultQuantity}}{{/operator--}}</strong>)</span>{{/if}}</div>\n\
            {{/listItem}}\n\
            </td>\n\
            <td class=\"col_04\">\n\
              {{#if IsDropdownDateShow}}\n\
                <div class=\"use_date\">\n\
                  <div class=\"date_input_wrap\">\n\
                    {{#listItem Inventory useInventoryIndex}}\n\
                    <input type=\"text\" value=\"{{#dtdate Date}}{{/dtdate}}\"/>\n\
                    {{/listItem}}\n\
                    <p style=\"display:none\">\n\
                      {{#each Inventory}}\n\
                      <a href=\"javascript:void(0);\">{{#dtdate Date}}{{/dtdate}}</a>\n\
                      {{/each}}\n\
                    </p>\n\
                  </div>\n\
                </div>\n\
              {{else}}\n\
                {{!--显示杠杠 #each Inventory}}\n\
                {{#dtdate Date}}{{/dtdate}}\n\
                {{/each --}}\n\
                --\n\
              {{/if}}\n\
            </td>\n\
            <td class=\"col_05\">\n\
              <div class=\"room_num\">\n\
                <div class=\"num_input_wrap\">\n\
                {{#listItem Inventory 0}}\n\
                  {{#is MinQuantity MaxQuantity}}\n\
                    {{!MinQuantity -- 理论上应该用 DefaultQuantity，只是目前这个字段的值有问题}}\n\
                    {{!DefaultQuantity}}\n\
                                        {{! 现在改为：【小武】4.可选项非必选，份数可编辑 }}\n\
                                        {{#if IsChooseRequired}}\n\
                                            <input type=\"number\" value=\"{{DefaultQuantity}}\" /><b></b>\n\
                                            <p style=\"display:none\"><a href=\"javascript:void(0);\">{{DefaultQuantity}}</a></p>\n\
                                        {{else}}\n\
                                            {{DefaultQuantity}}\n\
                                        {{/if}}\n\
                  {{else}}\n\
                    <input type=\"number\" value=\"{{DefaultQuantity}}\"/>\n\
                    <b></b>\n\
                    <p style=\"display:none\">\n\
                                            {{#is moreMinQuantity '!==' undefined}}<a href=\"javascript:void(0);\">{{moreMinQuantity}}</a>{{/is}}\n\
                      {{#eachx 'null' MinQuantity MaxQuantity StepQuantity}}\n\
                      <a href=\"javascript:void(0);\">{{$index}}</a>\n\
                      {{/eachx}}\n\
                    </p>\n\
                  {{/is}}\n\
                {{/listItem}}\n\
                </div>{{Unit}}\n\
              </div>\n\
            </td>\n\
            <td class=\"col_06\">\n\
              {{! 可选：总价为0，则杠杠}}\n\
              <div><span class=\"other_price js-total-price\">{{#if TotalPrice}}{{#moneyHTML TotalPrice}}{{/moneyHTML}}</span>{{else}}--{{/if}}</div>\n\
            </td>\n\
            <td class=\"col_07\">\n\
              {{#listItem Inventory 0}}\n\
              <div class=\"room_selected\"{{#is DefaultQuantity '<=' 0}} style=\"display:none;\"{{/is}}>\n\
                <a href=\"javascript:void(0);\">选择</a>\n\
              </div>\n\
              {{/listItem}}\n\
            </td>\n\
            {{! 按钮的合并规则跟 title 相同 }}\n\
            <td class=\"col_btn\" rowspan=\"{{Rowspan}}\">\n\
                            {{#if IsShowTitle}}\n\
              {{#if IsBaoxian}}\n\
              {{#is ThisCategory_TotalShownCount_in_popup '>' 1}}\n\
              <a class=\"change_resource_btn\" href=\"javascript:void(0);\">选择其他{{CategoryName}}</a>\n\
              {{/is}}\n\
              {{/if}}\n\
                            {{/if}}\n\
            </td>\n\
          </tr>\n\
          {{#if Introduction}}\n\
          <tr class=\"js-intro\" style=\"display:none\">\n\
            <td></td>\n\
            <td colspan=\"6\">\n\
              <div class=\"other_product_detail\">\n\
                                <b class=\"triangle\"></b>\n\
                <i></i>\n\
                <div>{{{Introduction}}}</div>\n\
                <a class=\"flod_btn\" href=\"javascript:void(0);\">收起</a>\n\
              </div>\n\
            </td>\n\
            <td></td>\n\
          </tr>\n\
          {{/if}}\n\
          {{/each}}\n\
            <tr class=\"js-baoxian-notice\" {{#if needBaoxianNotice}}{{else}}style=\"display:none\"{{/if}}>\n\
                <td colspan=\"8\">\n\
                    <div class=\"luggage_limit_info\"><i></i>旅游保险能够给您的出行安全或行程预订带来保障，如您放弃购买，则行程中的风险和损失将由您自行承担。</div>\n\
                </td>\n\
            </tr>\n\
        </tbody>\n\
      </table>\n\
    </div>\n\
        {{/if}}\n\
  </div>\n\
    {{/if}}\n\
{{else}}{{#if isFetching}}\n\
  {{#if isOrdering}}\n\
  <div class=\"c_loading detail_loading\"><img src=\"http://pic.c-ctrip.com/packages111012/loading_50-0816.gif\" alt=\"\"><strong>请稍候，正在为您预订</strong></div>\n\
  {{else}}\n\
  <div class=\"c_loading detail_loading\"><img src=\"http://pic.c-ctrip.com/packages111012/loading_50-0816.gif\" alt=\"\"><strong>请稍候，正在为您查询</strong></div>\n\
  {{/if}}\n\
{{else}}{{#if isFetchFail}}\n\
  {{#if errmsg}}\n\
  <div class=\"no_resource_txt\">{{errmsg}}</div>\n\
  {{else}}\n\
      {{#if isServerError}}\n\
      <div class=\"no_resource_txt\">抱歉，查询数据出错了，请<a href=\"javascript:;\" class=\"js-reload-resource\">点击重试</a>或者重新选择出发日期。</div>\n\
      {{else}}\n\
            {{#if isBookingError}}\n\
            <div class=\"no_resource_txt\">抱歉，预定出错了，请<a href=\"javascript:;\" class=\"js-reload-resource\">点击重试</a>或者重新选择出发日期。</div>\n\
            {{else}}\n\
          <div class=\"no_resource_txt\">很抱歉，所有出发日期下均没有可预订的名额，请重新选择产品。</div>\n\
            {{/if}}\n\
      {{/if}}\n\
  {{/if}}\n\
{{/if}}{{/if}}{{/if}}\n\
</div>\n\
{{/unless}}\n\
</div>\n\
<div class=\"seckill_pop\" id=\"J_countdown\" style=\"display:none\">\n\
    <div class=\"left_txt\">\n\
        <p>\n\
            <span id=\"J_countips\"></span>\n\
        </p>\n\
    </div>\n\
    <div class=\"right_txt\">\n\
        <div class=\"c_box_ico\"><i></i></div>\n\
        <p id=\"J_countime\"></p>\n\
    </div>\n\
    <b></b>\n\
</div>\n\
"});