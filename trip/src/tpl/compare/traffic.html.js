define(function(){
    return "<div class=\"traffic_mod\">\n\
                {{#if FlightInfos}}\n\
                    {{#if isChangeFlight}}<span class=\"icon_change\">可更换</span>{{/if}}\n\
                    <h3 class=\"traffic_title\">机票<span class=\"traffic_tips\">航班起抵时间均为当地时间(24小时制)</span></h3>\n\
                    <ul class=\"plane_list\">\n\
                    {{#each FlightInfos}}\n\
                        {{#each Flights}}\n\
                        {{#each FlightDetails}}\n\
                        <li>\n\
                            <p class=\"plane_date\"><i></i><span>{{DepartDate}}</span></p>\n\
                            <p>{{DepartTime}}{{DepartCityName}}—{{ArriveTime}}{{ArriveCityName}}</p>\n\
                            <p>\n\
                                <strong class=\"pubFlights_{{AirlineCode}}\">{{AirlineShortName}}</strong>&nbsp;<strong>{{FlightNo}}</strong>&nbsp;\n\
                                {{#if PlaneTypeDtail.txt0}}\n\
                                    <span class=\"traffic_textdiv\" data-role=\"jmp\" data-params=\"{options: {css:{maxWidth:'460'},type:'jmp_table',classNames:{boxType:'jmp_table'},template:'#jmp_table01',content:{txt0:'{{PlaneTypeDtail.txt0}}',txt1:'{{PlaneTypeDtail.txt1}}',txt2:'{{PlaneTypeDtail.txt2}}',txt3:'{{PlaneTypeDtail.txt3}}',txt4:'{{PlaneTypeDtail.txt4}}'},alignTo:'cursor',showArrow:false}}\">{{Aircraft}}</span>\n\
                                {{else}}\n\
                                    <span class=\"traffic_textdiv\">{{Aircraft}}</span>\n\
                                {{/if}}\n\
                                &nbsp;{{ClassName}}</p>\n\
                            <p>飞行时长：{{JourneyTime}}</p>\n\
                        </li>\n\
                        {{/each}}\n\
                        {{/each}}\n\
                    {{/each}}\n\
                    </ul>\n\
                {{/if}}\n\
                {{#if bus}}\n\
                    <h3 class=\"traffic_title\">巴士</h3>\n\
                    {{#each bus}}\n\
                    <p>\n\
                        {{#if Introduction}}\n\
                        <span class=\"traffic_textdiv\" data-role=\"jmp\" data-params=\"{options:{type:'jmp_title',classNames:{boxType:'jmp_title'},template:'#jmp_pkg_title', content:{txt0:'{{{help5 Introduction}}}'},css:{maxWidth:'300',minWidth:'240'},alignTo:'cursor',showArrow:false}}\">{{Name}}</span>\n\
                        {{else}}\n\
                            <span class=\"traffic_textdiv\">{{Name}}</span>\n\
                        {{/if}}\n\
                    </p>\n\
                    {{/each}}\n\
                {{/if}}\n\
                {{#if ship}}\n\
                    <h3 class=\"traffic_title\">邮轮</h3>\n\
                    {{#each ship}}\n\
                    <p>\n\
                        {{#if Introduction}}\n\
                        <span class=\"traffic_textdiv\" data-role=\"jmp\" data-params=\"{options:{type:'jmp_title',classNames:{boxType:'jmp_title'},template:'#jmp_pkg_title', content:{txt0:'{{{help5 Introduction}}}'},css:{maxWidth:'300',minWidth:'240'},alignTo:'cursor',showArrow:false}}\">{{Name}}</span>\n\
                        {{else}}\n\
                            <span class=\"traffic_textdiv\">{{Name}}</span>\n\
                        {{/if}}\n\
                    </p>\n\
                    {{/each}}\n\
                {{/if}}\n\
                {{#if train}}\n\
                    {{#if isChangeTrain}}<span class=\"icon_change\">可更换</span>{{/if}}\n\
                    <h3 class=\"traffic_title\">火车</h3>\n\
                    {{#each train}}\n\
                    <p>\n\
                        {{#if Introduction}}\n\
                        <span class=\"traffic_textdiv\" data-role=\"jmp\" data-params=\"{options:{type:'jmp_title',classNames:{boxType:'jmp_title'},template:'#jmp_pkg_title', content:{txt0:'{{{help5 Introduction}}}'},css:{maxWidth:'300',minWidth:'240'},alignTo:'cursor',showArrow:false}}\">{{Name}}</span>\n\
                        {{else}}\n\
                            <span class=\"traffic_textdiv\">{{Name}}</span>\n\
                        {{/if}}\n\
                    </p>\n\
                    {{/each}}\n\
                {{/if}}\n\
                {{#if TourFlightsInfo}}\n\
                    <h3 class=\"traffic_title\">机票<span class=\"traffic_tips\">航班起抵时间均为当地时间(24小时制)</span></h3>\n\
                    <ul class=\"plane_list\">\n\
                    {{#each TourFlightsInfo}}\n\
                        {{#each Flights}}\n\
                        <li>\n\
                            <p class=\"plane_date\"><i></i><span>{{DepartDate}}</span></p>\n\
                            <p>{{{Description}}}</p>\n\
                            <p>飞行时长：{{DriveTime}}</p>\n\
                        </li>\n\
                        {{/each}}\n\
                    {{/each}}\n\
                    </ul>\n\
                {{/if}}\n\
            </div>"
});