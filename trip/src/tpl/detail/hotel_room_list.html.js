define(function(){
	return "<ul class=\"htl_room_list\">\n\
	{{#each RoomInfos}}\n\
	<li class=\"js-room-item\" data-room-id={{Room}} data-price=\"{{RoomPrice}}\" style=\"{{#is ../RoomTotalCount \'<=\' 1}}border-bottom:none;{{/is}}{{#is @index \'>\' 0}}display:none;{{/is}}\">\n\
        <div class=\"room_name\">\n\
            <span>{{RoomName}}</span>\n\
            {{#notEmpty HotelAddInfos}}<i class=\"icon_htltips\" data-params=\"{options:{type:\'jmp_table\',classNames:{boxType:\'jmp_table\'},template:\'#jmp_pkg_title\', content:{txt0:\'酒店特别提示\',txt1:\'{{#each HotelAddInfos}}{{#dtdate EffectDate}}{{/dtdate}}至{{#dtdate ExpireDate}}{{/dtdate}}:{{#noNewline Description}}{{/noNewline}}<br>{{/each}}\'},css:{maxWidth:\'500\',minWidth:\'300\'},alignTo:\'cursor\'}}\" data-role=\"jmp\"></i>{{/notEmpty}}\n\
            {{#notEmpty RoomGift RoomGift.GiftDesc}}<i class=\"icon_gift\" data-params=\"{options:{type:\'jmp_table\',classNames:{boxType:\'jmp_table\'},template:\'#jmp_pkg_title\', content:{txt0:\'酒店礼盒\',txt1:\'{{#noNewline RoomGift.GiftDesc}}{{/noNewline}}<br>开始日期:{{#dtdate RoomGift.EffectDate}}{{/dtdate}}<br>结束日期:{{#dtdate RoomGift.ExpireDate}}{{/dtdate}}\'},css:{maxWidth:\'300\',minWidth:\'240\'},alignTo:\'cursor\'}}\" data-role=\"jmp\"></i>{{/notEmpty}}\n\
            <!--{{#notEmpty RoomTicketGift RoomTicketGift.TicketGiftsNo}}\n\
                {{#is RoomTicketGift.TicketType \'C\'}}\n\
                <span class=\"rebates\" data-params=\"{options:{type:\'jmp_table\',classNames:{boxType:\'jmp_table\'},template:\'#jmp_single_title\', content:{txt:\'选择此房型并使用携程酒店消费券提交订单，结束游玩后发表行程点评，每间夜可获得{{RoomTicketGift.CalculateValue}}元现金。<br /><a target=_blank href=http://help.ctrip.com/QuestionDetail.aspx?questionId=693>什么是国内旅游度假自由行产品点评返现？</a>\'},css:{maxWidth:\'300\',minWidth:\'240\'},alignTo:\'cursor\'}}\" data-role=\"jmp\"><em>返</em>{{RoomTicketGift.CalculateValue}}元</span>\n\
                {{else}}\n\
                <span class=\"rebates\" data-params=\"{options:{type:\'jmp_table\',classNames:{boxType:\'jmp_table\'},template:\'#jmp_single_title\', content:{txt:\'选择此房型提交订单，结束游玩后发表行程点评，每间夜可获得{{RoomTicketGift.CalculateValue}}元点评现金。<br /><a target=_blank href=http://help.ctrip.com/QuestionDetail.aspx?questionId=693>什么是国内旅游度假自由行产品点评返现？</a>\'},css:{maxWidth:\'300\',minWidth:\'240\'},alignTo:\'cursor\'}}\" data-role=\"jmp\"><em>直返</em>{{RoomTicketGift.CalculateValue}}元</span>\n\
                {{/is}}\n\
            {{/notEmpty}} -->\n\
        </div>\n\
		<div class=\"room_bed\">{{RoomBedType}}</div>\n\
		<div class=\"room_breakfast\">{{BreakfastNote}}</div>\n\
		<div class=\"room_net\">{{BroadNet}}</div>\n\
		<div class=\"room_price\">\n\
		{{! 这里不要写，写了也是白写，因为价差需要计算出来 }}\n\
		{{!-- #is SelectedRoomNum 1}}\n\
			--\n\
		{{else}}\n\
			{{#operator SelectedRoomNum \'*\' RoomPrice}}{{/operator}}\n\
		{{/is --}}\n\
		</div>\n\
		<div class=\"room_num\">\n\
			<div class=\"num_input_wrap\">\n\
				<input type=\"number\" value=\"{{SelectedRoomNum}}\"/>\n\
				<b></b>\n\
				<p style=\"display:none;\">\n\
					{{#eachx \"null\" MinRoom MaxRoom}}\n\
					<a href=\"javascript:void(0);\">{{$index}}</a>\n\
					{{/eachx}}\n\
				</p>\n\
			</div>\n\
			间\n\
		</div>\n\
		<div class=\"{{#if Select}}room_selected{{else}}room_select_btn{{/if}}\">\n\
			<a href=\"javascript:void(0);\">选择</a>\n\
		</div>\n\
		{{#with RoomExtraInfo}}\n\
		<div class=\"room_detail_wrap\" style=\"display:none;\" data-room-id=\"{{Room}}\">\n\
			\n\
			<div class=\"room_img_wrap basefix\">\n\
				{{#notEmpty RoomPicUrl}}\n\
				{{#each RoomPicUrl}}\n\
				<img src=\"{{this}}\" alt=\"\" width=\"75\" height=\"75\">\n\
				{{/each}}\n\
				{{/notEmpty}}\n\
			</div>\n\
			<div class=\"room_txt_wrap basefix\">\n\
				{{#if AreaRangeValue}}<div title=\"{{AreaRangeTitle}}：{{AreaRangeValue}}平方米\">{{AreaRangeTitle}}：{{AreaRangeValue}}平方米</div>{{/if}}\n\
				{{#if FloorRangeValue}}<div title=\"{{FloorRangeTitle}}：{{FloorRangeValue}}层\">{{FloorRangeTitle}}：{{FloorRangeValue}}层</div>{{/if}}\n\
				{{#if BedWidthValue}}<div title=\"{{BedWidthTitle}}：{{BedWidthValue}}米\">{{BedWidthTitle}}：{{BedWidthValue}}</div>{{/if}}\n\
				{{#if AddBed}}<div title=\"{{AddBed}}\">{{AddBed}}</div>{{/if}}\n\
				{{#if SmokeValue}}<div title=\"{{SmokeTitle}}：{{SmokeValue}}\">{{SmokeTitle}}：{{SmokeValue}}</div>{{/if}}\n\
				{{#if MaxPersonValue}}<div title=\"{{MaxPersonTitle}}：{{MaxPersonValue}}人\">{{MaxPersonTitle}}：{{MaxPersonValue}}人</div>{{/if}}\n\
				{{#if BordNetValue}}<div class=\"long\" title=\"{{BordNetTitle}}：{{BordNetValue}}\">{{BordNetTitle}}：{{BordNetValue}}</div>{{/if}}\n\
				{{#if Description}}<div class=\"long\" title=\"{{Description}}\">{{Description}}</div>{{/if}}\n\
			</div>\n\
			<a class=\"flod_btn\" href=\"javascript:void(0);\">收起<b></b></a>\n\
			\n\
		</div>\n\
		{{/with}}\n\
	</li>\n\
	{{#is @index 0}}\n\
	<li class=\"js-room-loading\" style=\"display:none\">\n\
		<div class=\"flt_loading\"><img src=\"http://pic.ctrip.com/common/loading.gif\" alt=\"\">查询中，请稍候...</div>\n\
	</li>\n\
	{{/is}}\n\
	{{/each}}\n\
</ul>"});