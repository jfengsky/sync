define(function(require, exports, module) {

    var $ = require('jquery');
//初始化：是否开启DIV弹出窗口功能
//0 表示开启; 1 表示不开启;
var popupStatus = 0;
//Email发送iframe的地址
var iframeSrc;

//使用Jquery加载弹窗  
var loadPopup = exports.loadPopup = function loadPopup(o){
    //仅在开启标志popupStatus为0的情况下加载
    if(popupStatus==0){
    //获取系统变量 
        var windowWidth = document.documentElement.clientWidth;
        var windowHeight = document.documentElement.clientHeight;
        var popupHeight = $("#"+o).height();
        var popupWidth = $("#"+o).width();

        $("#closeBtn").css("width","10px");
        $("#closeBtn").css("height","10px");
        $("#closeBtn").css("z-index","9999");
        //alert(parseInt($("#reback_infor2").css("top")));
        //alert(parseInt($("#reback_infor2").css("left")));
        $("#closeBtn").css("top",(windowHeight/2+document.documentElement.scrollTop+document.body.scrollTop-popupHeight/2)+10+"px");
        $("#closeBtn").css("left",(windowWidth/2-popupWidth/2)+parseInt($("#reback_infor2").css("width"))-20+"px");

        $("#backgroundPopup").css({
            "opacity":"0.5"
        });
        
        $("#backgroundPopup").fadeIn("slow");
        $("#"+o).fadeIn("slow");
        $("#closeBtn").fadeIn("slow");
        
        popupStatus = 1;
    }
}

//使用Jquery去除弹窗效果
var disablePopup = exports.disablePopup = function disablePopup(o){
    //仅在开启标志popupStatus为1的情况下去除
    if(popupStatus==1){
        $("#backgroundPopup").fadeOut("slow");
        $(".floatboxes").fadeOut("slow");
        $("#closeBtn").fadeOut("slow");
        
        popupStatus = 0;
        
        //iframe重新回到Email发送前的状态
        setTimeout(function(){
            $("#ifrEmailSend").attr("src",iframeSrc);
        },500);
    }
}

//将弹出窗口定位在屏幕的中央 
var centerPopup = exports.centerPopup = function centerPopup(o){
    //获取系统变量 
    var windowWidth = document.documentElement.clientWidth;
    var windowHeight = document.documentElement.clientHeight;
    var popupHeight = $("#"+o).height();
    var popupWidth = $("#"+o).width();
    //居中设置    
    $("#"+o).css({
        "position": "absolute",
        "top": windowHeight/2+document.documentElement.scrollTop+document.body.scrollTop-popupHeight/2,
        "left": windowWidth/2-popupWidth/2
    });
    //以下代码仅在IE6下有效 
    $("#backgroundPopup").css({
        "height": windowHeight + document.documentElement.scrollTop
    });
}

exports.popUp = function popUp(o){
    //调用函数居中窗口 
    centerPopup(o);    
    //调用函数加载窗口 
    loadPopup(o);   
}

$(document).ready(function(){
    //执行触发事件的代码区域   
    //打开弹出窗口    
    //按钮点击事件! 
    //$("#button").click(function(){    
    //调用函数居中窗口 
    //centerPopup();    
    //调用函数加载窗口 
    //loadPopup();    
    //});

    //关闭弹出窗口    
    //点击"X"所触发的事件 
    $(document).on('click', '.popupContactClose', function() {    
        disablePopup();    
        return false;
    });

    // //点击窗口以外背景所触发的关闭窗口事件! 
    $(document).on('click', '#backgroundPopup', function() {    
        disablePopup();    
        return;
    });

    $(document).on('focus', '#username', function () {
        $('.txt').css('color', '');
        $(this).val('');
    });

    $(document).on('focus', '#useradd', function () {
        $('.txt').css('color', '');
        $(this).val('');
    });

    $(document).on('focus', '#userphone', function () {
        $('.txt').css('color', '');
        $(this).val('');
    });

    //键盘按下ESC时关闭窗口! 
	$(document).keypress(function(e){
		if(e.keyCode==27 && popupStatus==1){
			disablePopup();
		}
	});
	
    iframeSrc = $("#ifrEmailSend").attr("src");
});

//置顶函数
exports.setUp = function setUp(n){
    //$(".spuar").not($("#spuar"+n)[0]);
    $("#spuar"+n).remove().insertBefore($(".spuar")[0]);
}

    
});