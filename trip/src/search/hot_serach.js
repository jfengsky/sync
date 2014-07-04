/*
 * @Author :
 * @Date   :
 * @Desc   :
 */
define(function(require, exports) {
    var $ = require("../../../lib/jquery"),
       hot_i=0,
       hot_j=0,
    cSearch={   
        init:function(){
            $('#div_PopularSearches').mouseover(function(){    
               hot_i=1;     
            });
            $('#div_PopularSearches').mouseout(function(){    
              hot_i=0;   
            });
            $('#SearchText').mouseover(function(){    
              hot_j=1;     
            });
            $('#SearchText').mouseout(function(){   
              hot_j=0;   
            });
            $('#SearchText').focus(function(){
                if($(this).val()==""||$(this).val()=="undefined" ||$(this).val()==$(this).attr("_cqnotice")){
                    if ($("#div_PopularSearches").length!=0) {
                            $("#div_PopularSearches").show();
                    };        
                }else{
                     $("#div_PopularSearches").hide();
                }
            });
            $('#SearchText').blur(function(){
                if(hot_i==0){
                     $("#div_PopularSearches").hide();
                }    
            });
            $('body').click(function(){
                if(hot_j==0&&hot_i==0){
                     $("#div_PopularSearches").hide();
                }    
            });
            $('#SearchText').keyup(function(){
                if($(this).val()==""||$(this).val()=="undefined"){
                    if ($("#div_PopularSearches").length!=0) {
                            $("#div_PopularSearches").show();
                    };        
                }else{
                     $("#div_PopularSearches").hide();
                }
            });
            $('#btn_CloseSearches').click(function(){    
                $("#div_PopularSearches").hide();     
            });
        }
    }
    exports.init = cSearch.init;
});
