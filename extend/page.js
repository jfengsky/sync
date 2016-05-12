//翻页功能



//翻页num数字生成
function goNum(_opt){
  currentPage = _opt.currentPage

};
// function goNum(currentPage,nextpagString,nextpag2String,dot,){
function goNum(_opt){
  var currentPage = _opt.currentPage;
  var pagehtml = "";
  var prepag2 = currentPage - 2;
  var prepag = currentPage - 1;
  
  
  pagehtml = '<li data-log="1">1</li>' +
        '<li data-log="2">2</li>' +
        '<li class="dot">...</li>' +
        '<li data-log="' + prepag2 + '">' + prepag2 + '</li>' +
        '<li data-log="' + prepag + '">' + prepag + '</li>' +
        '<li  class="curr" data-log="' + currentPage + '">' + currentPage + '</li>';
       
  pagehtml += _opt.nextpagString;
  pagehtml += nextpag2String;
  pagehtml += dot;
  return pagehtml;
}

goNum({
  
  nextpagString: 2,
  nextpag2String: 3,
  dot: 4,currentPage:1,
  aaa: 444
})

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
   
    for (var i = 1; i < totalpages+1; i++) {
      if (i == currentPage) {
        pagehtml += '<li class="curr" data-log="' +i+ '">' + i + '</li>';
      } else {
        pagehtml += '<li data-log="' +i+ '">' + i + '</li>';
      }
    }

  }
  if (totalpages >= 6) {
   
    if (currentPage < 6) {
      
      for (var j = 1; j < totalpages; j++) {
        if (j == currentPage) {
          pagehtml += '<li class="curr" data-log="' + j + '">' + j + '</li>';
        } else {
          pagehtml += '<li data-log="' + j + '">' + j + '</li>';
          if (j > 5) {
            pagehtml += '<li class="dot">...</li>';
            break;
          }
        }
      }
    }
    if (currentPage >= 6 && currentPage <= totalpages - 3) {
      
      pagehtml = goNum(currentPage,nextpagString,nextpag2String,dot);  
      pagehtml = goNum({
        currentPage: currentPage,
        nextpagString: nextpagString,
        nextpag2String: nextpag2String,
        dot: dot

      })

    } else if (currentPage == totalpages) {
       
      pagehtml = goNum(currentPage,"","","");

    } else if (currentPage == totalpages - 2) {
      
       pagehtml = goNum(currentPage,nextpagString,nextpag2String,"");

    } else if (currentPage == totalpages - 1) {
     
       pagehtml = goNum(currentPage,nextpagString,"","");

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
  firstGoAjax(currentPage, 5);


})


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
  firstGoAjax(currentPage, 5);


})

//数字正则
function regExNumber(s){
  var modus= /^\+?[1-9][0-9]*$/;
  if (!modus.exec(s)){ return false; }
}


//填写页数，提交请求数据加载
$("#go_submit").click(function() {
  var currentPage = $("#go_page").val();
  if (currentPage > totalpages) {
    alert("请输入小于总页数的页码");
  } else if (regExNumber(currentPage)) {
    alert("请输入正确的数字");
  } else {
    firstGoAjax(currentPage, 5);
  }

})

//开始查询按钮事件绑定
$("#search").click(function() {
 
   firstGoAjax(1,5);
})



//页面数据加载请求

function firstGoAjax(currentPage, pageSize) {
  
  var params = '{"param":[{"ticket_point_no":"' + $("#TICKET_POINT_NO").val() + '"},{"status":"' + $("#status").val() + '"},' +
  '{"starttime":"' + $("#date").val() + '"},{"endtime":"' + $("#date1").val() + '"}]}';

  $.ajax({
    url: "/caipiao_simple/home/jsp/o2o/boss/Club/getClubChargeList.jsp",
    type: "post",
    dataType: "json",
    data: {
      'params': params
    },
    success: function(msg) {
      if (msg.result == "OK") {
        var intAllCount = msg.intAllCount;
        // var currentpage = currentpage;
        // var pagesize = pagesize;
        var detail = msg.data;
        dataTable(detail);

        turnPage(intAllCount, currentPage, 5);

      } else {
        alert(msg.result);
      }
    },
    error: function(msg) {

    }
  })
}
