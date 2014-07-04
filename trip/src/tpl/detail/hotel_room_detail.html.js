define(function(){
	return "{{!--\n\
<div class=\"room_detail_wrap\" style=\"display:none;\">\n\
    <div class=\"room_img_wrap basefix\">\n\
        {{#each PicUrls}}\n\
        <img src=\"{{this}}\" alt=\"\" width=\"75\" height=\"75\" />\n\
        {{/each}}\n\
    </div>\n\
    <div class=\"room_txt_wrap basefix\">\n\
		{{#each ShortFields}}\n\
		<div title=\"{{this}}\">{{this}}</div>\n\
		{{/each}}\n\
		{{#each LongFields}}\n\
		<div class=\"long\" title=\"{{this}}\">{{this}}</div>\n\
		{{/each}}\n\
    </div>\n\
    <a class=\"flod_btn\" href=\"javascript:void(0);\">收起<b></b></a>\n\
</div>\n\
--}}\n\
<div class=\"room_detail_wrap\" style=\"display:none;\">\n\
	<div class=\"room_img_wrap basefix\">\n\
		{{#notEmpty}}\n\
		{{#each RoomPicUrl}}\n\
		<img src=\"{{this}}\" alt=\"\" width=\"75\" height=\"75\">\n\
		{{/each}}\n\
		{{/notEmpty}}\n\
	</div>\n\
	<div class=\"room_txt_wrap basefix\">\n\
		<div title=\"{{AreaRange}}\">{{AreaRange}}</div>\n\
		<div title=\"{{FloorRange}}\">{{FloorRange}}</div>\n\
		<div title=\"{{BedWidth}}\">{{BedWidth}}</div>\n\
		<div title=\"{{AddBedFee}}\">{{AddBedFee}}</div>\n\
		<div title=\"{{Smoke}}\">{{Smoke}}</div>\n\
		<div title=\"最多入住人数：3人\">最多入住人数：3人</div>\n\
		<div class=\"long\" title=\"宽带：全部房间支持收费有线宽带上网。（120元/天，60/小时）\">宽带：全部房间支持收费有线宽带上网。（120元/天，60/小时）</div>\n\
		<div class=\"long\" title=\"便利设施：房内保险箱、书桌、中央空调\">便利设施：房内保险箱、书桌、中央空调</div>\n\
		<div class=\"long\" title=\"媒体/科技：国内长途电话、国际长途电话\">媒体/科技：国内长途电话、国际长途电话</div>\n\
		<div class=\"long\" title=\"食品和饮品：电热水壶\">食品和饮品：电热水壶</div>\n\
		<div class=\"long\" title=\"浴室：24小时热水、浴缸、吹风机、拖鞋\">浴室：24小时热水、浴缸、吹风机、拖鞋</div>\n\
	</div>\n\
	<a class=\"flod_btn\" href=\"javascript:void(0);\">收起<b></b></a>\n\
</div>"});