//翻页功能



//翻页num数字生成
function goNum(obj){
  var currentPage = obj.currentPage;
  var pagehtml = "";
  var prepag2 = currentPage - 2;
  var prepag = currentPage - 1;
  
  
  pagehtml = '<li data-log="1">1</li>' +
        '<li data-log="2">2</li>' +
        '<li class="dot">...</li>' +
        '<li data-log="' + prepag2 + '">' + prepag2 + '</li>' +
        '<li data-log="' + prepag + '">' + prepag + '</li>' +
        '<li  class="curr" data-log="' + currentPage + '">' + currentPage + '</li>';
       
  pagehtml += nextpagString;
  pagehtml += nextpag2String;
  pagehtml += dot;
  return pagehtml;
}



//翻页功能
var totalpages = "";

function turnPage(intAllCount, currentPage, pageSize) {
  var pagehtml = "";
  totalpages = Math.ceil(intAllCount / pageSize);
  var nextpag = (currentPage - 0) + 1;
  var nextpag2 = (currentPage -0) + 2;
  var dot = '<li class="dot">...</li>';
  var nextpagString =  '<li data-log="' + nextpag + '">' + nextpag + '</li>';
  var nextpag2String = '<li data-log="' + nextpag2 + '">' + nextpag2 + '</li>';
 
  if (totalpages < 6) {
   
    for (var i = 0; i < totalpages; i++) {
      if (i == currentPage) {
        pagehtml += '<li class="curr" data-log="' +i+ '">' + i+1 + '</li>';
      } else {
        pagehtml += '<li data-log="' +i+ '">' + i + 1 + '</li>';
      }
    }

  }
  if (totalpages >= 6) {
   
    if (currentPage < 6) {
      
      for (var j = 0; j < totalpages; j++) {
        if (j == currentPage) {
          pagehtml += '<li class="curr" data-log="' + j + '">' + j + 1 + '</li>';
        } else {
          pagehtml += '<li data-log="' + j + '">' + j + 1 + '</li>';
          if (j > 5) {
            pagehtml += '<li class="dot">...</li>';
            break;
          }
        }
      }
    }
    if (currentPage >= 6 && currentPage <= totalpages - 3) {
      
      // pagehtml = goNum(currentPage,nextpagString,nextpag2String,dot);  
      pagehtml = goNum({ currentPage:currentPage, nextpagString:nextpagString, nextpag2String:nextpag2String, dot:dot});
      

    } else if (currentPage == totalpages) {
       
      pagehtml = goNum({currentPage：currentPage});

    } else if (currentPage == totalpages - 2) {
      
       pagehtml = goNum({ currentPage:currentPage, nextpagString:nextpagString, nextpag2String:nextpag2String});

    } else if (currentPage == totalpages - 1) {
     
       pagehtml = goNum({currentPage:currentPage,nextpagString:nextpagString});

    }
  }


  var prepage = currentPage - 1;
  var nextpage = currentPage + 1;

  pagehtml = '<li data-log="' + prepage + '"><上一页</li>' + pagehtml + '<li data-log="' + nextpage + '">下一页></li>';
  
  $("#pageArea").html(pagehtml);

  if (currentPage == 1) {

    $("#pageArea li:first").addClass("grey");
    $("#pageArea li:first").click(function() {

    return false;
    
    })
    /*
    if(totalpages == 1){
       $("#pageArea li:last").addClass("grey");
       $("#pageArea li:last").click(function() {

          return false;
        })
    }
    */
  } else if (currentPage == totalpages) {

    $("#pageArea li:last").addClass("grey");
    $("#pageArea li:last").click(function() {

      return false;
    })
  }

   $("#all_count").html(totalpages);
}






//点击数字加载页码
$(document).delegate("li", "click", function() {
  
  var data = $(this).data("log");
  if(regExNumber(data) == false){
    alert("请输入正确的数字 ");
  }
  var currentPage = data - 0;
 
  if ($(this).hasClass("dot") ||$(this).hasClass("curr")) {
    return false;
  }
  /*
  if ($(this).hasClass("curr")) {
    return false;
  }
  */
  firstGoAjax(currentPage, pageSize);


})


//点击数字加载页码
$(document).delegate("li", "click", function() {
  
  var data = $(this).data("log");
  if(regExNumber(data) == false){
    alert("请输入正确的数字 ");
  }
  var currentPage = data - 0 ;
 
  if ($(this).hasClass("dot") ||$(this).hasClass("curr")) {
    return false;
  }
  /*
  if ($(this).hasClass("curr")) {
    return false;
  }
  */
  firstGoAjax(currentPage, pageSize);


})

//数字正则
function regExNumber(s){
  var modus= /^\+?[1-9][0-9]*$/;
  if (!modus.exec(s)){ return false; }
}


//填写页数，提交请求数据加载
$("#go_submit").click(function() {
  var currentPage = $("#go_page").val() - 1;
  if (currentPage > totalpages) {
    alert("请输入小于总页数的页码");
  } else if (regExNumber(currentPage)) {
    alert("请输入正确的数字");
  } else {
    firstGoAjax(currentPage, pageSize);
  }

})

//开始查询按钮事件绑定
$("#search").click(function() {
 
   firstGoAjax(currentPage,pageSize);
})


//     ***************************需要封装参数，请求地址，如何封装呢？***********************************************？？？？？

//页面数据加载请求


function firstGoAjax(obj) {

  var currentPage = obj.currentPage;
  var pageSize = obj.pageSize;
  var url = obj.url;
  // var params = '{"param":[{"ticket_point_no":"' + $("#TICKET_POINT_NO").val() + '"},{"status":"' + $("#status").val() + '"},' +
  // '{"starttime":"' + $("#date").val() + '"},{"endtime":"' + $("#date1").val() + '"}]}';
  var params = obj.params;
  $.ajax({
    url: url,
    type: "post",
    dataType: "json",
    data: {
      'params': params,
      "currentPage":0,
      "pageSize":10
    },
    success: function(msg) {
      if (msg.result == "OK") {
        var intAllCount = msg.intAllCount;
        var detail = msg.data;
        dataTable(detail);

        turnPage(intAllCount, currentPage, pageSize);

      } else {
        alert(msg.result);
      }
    },
    error: function(msg) {

    }
  })
}
var obj ={

}
firstGoAjax({
  currentPage:0,
  pageSize:10,
  url:/caipiao_simple/home/jsp/o2o/boss/getbossLoginVericode.jsp,
  params:'{"param":[{"ticket_point_no":"' + $("#TICKET_POINT_NO").val() + '"},{"status":"' + $("#status").val() + '"},' +
         '{"starttime":"' + $("#date").val() + '"},{"endtime":"' + $("#date1").val() + '"}]}';
})
// jiang duixiang zhuancheng zifuchuan 
// obj = {key:value,key2:value2,key3:value3}
function objToString(obj){
  var str = '';
  for(var i in obj){
    
    for(var j = 0;j < i.length;j++){
      str += i + ":" + obj[i][j];
    }
  }
  return str;
˜
}

//日期加载
//需要jquery插件
  function loadDate(sameDay){
        
      var currentDate=new Date();  //获取当前时间

      var year=currentDate.getFullYear();
      var month=currentDate.getMonth()+1;
      var day=currentDate.getDate();
      month = month<10 ? "0"+month:month;
      day = day<10 ?"0"+day:day;
      var beginDate=year+"-"+month+"-01";
      var endDate=year+"-"+month+"-"+day;
      $("#date").val(sameDay ? endDate : beginDate);
      $("#date1").val(endDate);
    
      try{
          $( "#date" ).datepicker({ //日历1
              autoSize: true,
              dateFormat: 'yy-mm-dd',
              dayNamesMin:["周日","周一","周二","周三","周四","周五","周六"],
              monthNames:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"]
          });
          $( "#date1" ).datepicker({  //日历2
              autoSize: true,
              dateFormat: 'yy-mm-dd',
              dayNamesMin:["周日","周一","周二","周三","周四","周五","周六"],
              monthNames:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"]
          });
          $( "#date1" ).change(function(){
              var d1v = $( "#date" ).val();
              var date1 = new Date(this.value.replace(/\-/g,'/')), 
                  date = new Date(d1v.replace(/\-/g,'/'));
              if(date > date1){
                  alert('开始日期不能大于结束日期!')
                  this.value = d1v;
              }
          })
      }catch(e){
          Gutils.logError('加载时间控件失败, ERROR : '+ e);
      }
  }



//获取url后面参数的方法

function GetRequest() {
  
  // var url = location.search; //获取url中"?"符后的字串

   var theRequest = new Object();
   if (url.indexOf("?") != -1) {
      var str = url.substr(1);
      strs = str.split("&");
      for(var i = 0; i < strs.length; i ++) {
         theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
      }
   }
   return theRequest;
}


//获取地址参数
   function GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
      var r = window.location.search.substr(1).match(reg);
      if (r!=null) {
        return (r[2]); 
      }else{
        return null;
      }
  }
    var locationID = GetQueryString('id');
    var btn_operate = GetQueryString('btn_operate');


//表单验证  http://www.aichengxu.com/view/7450644
//验证昵称是否存在
function checkNickNameIsExist(){
var nickName = jQuery("#nickName").val();
var flag = false;
jQuery.ajax(
{ url: "checkNickName?t=" + (new Date()).getTime(),
data:{nickName:nickName},
dataType:"json",
type:"GET",
async:false,
success:function(data) {
var status = data.status;
if(status == "1"){
flag = true;
}
}
});
return flag;
}