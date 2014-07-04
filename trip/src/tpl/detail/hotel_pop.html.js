define(function(){
	return "<div class=\"scroll_wrap\">\n\
	{{#each data}}\n\
	<div class=\"mask_htl_wrap\" data-hotel-id=\"{{Hotel}}\">\n\
	    <div class=\"htl_img_wrap\">\n\
	        <a class=\"htl_img\" href=\"{{HotelUrl}}\" target=\"_blank\" title=\"{{HotelName}}\"><img src=\"{{LogoUrl}}\" alt=\"\" width=\"100\" height=\"75\"></a>\n\
	        <p class=\"score\"><span>{{HRatingOverall}}</span>/5分</p>\n\
	    </div>\n\
	    <div class=\"htl_detail\">\n\
	        <h3>\n\
	            <a href=\"{{HotelUrl}}\" target=\"_blank\" title=\"{{HotelName}}\">{{HotelName}}</a>\n\
	            {{#is StarLience \'T\'}}\n\
	            <i title=\"国家旅游局评定为{{Star}}星级\" class=\"hotel_star_{{Star}}\"></i>\n\
	            {{else}}\n\
	            <i title=\"{{#EmptyStar Star}}{{/EmptyStar}}\" class=\"hotel_hollow_{{Star}}\"></i>\n\
	            {{/is}}\n\
	        </h3>\n\
	        <p class=\"gray\">{{Address}}</p>\n\
	        {{> RoomList}}\n\
	        {{#is RoomInfos.length \'>\' 1}}\n\
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
	</div>\n\
	{{/each}}\n\
</div>"});