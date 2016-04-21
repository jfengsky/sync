var currentPage = 0; //当前页 0 = 首页
var intAllCount = 0; //数据总数量
var pageSize = 10; //每页显示条数
var pageCount = 10; //默认加载数量
var maxPage = 0; //最大分页
var oldParamsStr = '';
var totalpages = "";
var prepag2 = currentPage - 2;
var prepag = currentPage - 1;
var nextpag = (currentPage - 0) + 1;
var nextpag2 = (currentPage - 0) + 2;
var nextpagString = '<li data-log="' + (nextpag + 1) + '">' + (nextpag + 1) + '</li>';
var nextpag2String = '<li data-log="' + (nextpag2 + 1) + '">' + (nextpag2 + 1) + '</li>';
var dot = '<li class="dot">...</li>';

var pageConfig = {

  init: function(cfg) { //请求需要的参数
    this.params = cfg.params;
    this.ajaxUrl = cfg.ajaxUrl; //ajax路径
    this.succesFun = cfg.succesFun; //请求成功时调用
    this.errorFun = cfg.errorFun; //请求失败时调用
    this.beforeFun = cfg.beforeFun ? cfg.beforeFun : function() {return true;}; //执行ajax前调用
    pageSize = cfg.pageSize ? cfg.pageSize : 10;
  }

};
/*
params = {'username':$('#username'),'startTime':$('#date'),'endTime':$('#date1')};
    	pageConfig.init({'params':params,'ajaxUrl':'/caipiao_simple/home/jsp/o2o/boss/commonuser/userinfo_list.jsp','succesFun':succesFun,'errorFun':errorFun})
    	getJosnToAjax();// kaishi 
*/



function paramsToString(obj) {
  var str = '{"param":[';
  var i = 0;
  for (var key in obj) {
    if (i !== 0) {
      str += ',';
    };
    i++;
    if (typeof(obj[key]) == 'object') {
      str += '{"' + key + '":"' + utf8ToGBK(obj[key]) + '"}';
    } else {
      str += '{"' + key + '":"' + utf8ToGBK(obj[key]) + '"}';
    }

  }
  str += ']}';
  return str;
}

function utf8ToGBK(s) {
  return encodeURI(encodeURI(s ? s.replace(/(^\s*)|(\s*$)/g, '') : ''));
}



//翻页num数字生成

function goNum() {
  var pagehtml = "";

  pagehtml = '<li data-log="1">1</li>' +
    '<li data-log="2">2</li>' +
    '<li class="dot">...</li>' +
    '<li data-log="' + (prepag2 + 1) + '">' + (prepag2 + 1) + '</li>' +
    '<li data-log="' + (prepag + 1) + '">' + (prepag + 1) + '</li>' +
    '<li  class="curr" data-log="' + (currentPage + 1) + '">' + (currentPage + 1) + '</li>';

  pagehtml += nextpagString;
  pagehtml += nextpag2String;
  pagehtml += dot;
  return pagehtml;
}

//翻页功能

function turnPage() {
  var pagehtml = "";
  totalpages = Math.ceil(intAllCount / pageSize);

  if (totalpages < 6) {

    for (var i = 0; i < totalpages; i++) {
      if (i == currentPage) {
        pagehtml += '<li class="curr" data-log="' + (i + 1) + '">' + (i + 1) + '</li>';
      } else {
        pagehtml += '<li data-log="' + (i + 1) + '">' + (i + 1) + '</li>';
      }
    }

  }
  if (totalpages >= 6) {

    if (currentPage < 6) {

      for (var j = 0; j < totalpages; j++) {
        if (j == currentPage) {
          pagehtml += '<li class="curr" data-log="' + (j + 1) + '">' + (j + 1) + '</li>';
        } else {
          pagehtml += '<li data-log="' + (j + 1) + '">' + (j + 1) + '</li>';
          if (j > 5) {
            pagehtml += '<li class="dot">...</li>';
            break;
          }
        }
      }
    }
    if (currentPage + 1 >= 6 && currentPage + 1 <= totalpages - 3) {

      pagehtml = goNum(currentPage, nextpagString, nextpag2String, dot);

    } else if (currentPage + 1 == totalpages) {

      pagehtml = goNum(currentPage, "", "", "");

    } else if (currentPage + 1 == totalpages - 2) {

      pagehtml = goNum(currentPage, nextpagString, nextpag2String, "");

    } else if (currentPage + 1 == totalpages - 1) {

      pagehtml = goNum(currentPage, nextpagString, "", "");

    }
  }


  var prepage = currentPage - 1;
  var nextpage = currentPage + 1;

  pagehtml = '<li data-log="' + (prepage + 1) + '"><上一页</li>' + pagehtml + '<li data-log="' + (nextpage + 1) + '">下一页></li>';

  $("#pageArea").html(pagehtml);

  if (currentPage == 0) {

    $("#pageArea li:first").addClass("grey");
    $("#pageArea li:first").click(function() {

      return false;

    })
    if (totalpages == 1) {
      $("#pageArea li:last").addClass("grey");
      $("#pageArea li:last").click(function() {

        return false;
      })
    }
  } else if (currentPage + 1 == totalpages) {

    $("#pageArea li:last").addClass("grey");
    $("#pageArea li:last").click(function() {

      return false;
    })
  }

  $("#all_count").html(totalpages);
}


//填写页数，提交请求数据加载
$("#go_submit").click(function() {
  var currentPage = $("#go_page").val() - 1;
  if (currentPage > totalpages) {
    alert("请输入小于总页数的页码");
  } else if (regExNumber(currentPage)) {
    alert("请输入正确的数字");
  } else {
    firstGoAjax();
  }

})

//开始查询按钮事件绑定
$("#search").click(function() {

  firstGoAjax();
})



//请求ajax
function firstGoAjax(that){
  var paramsStr = paramsToString(pageConfig.params);
  if (paramsStr != oldParamsStr) {
     currentPage = 0;
  }
  oldParamsStr = paramsStr;
   $.ajax({
    url: pageConfig.ajaxUrl,
    dataType: 'json',
    type: 'post',
    data: {
      'params': paramsStr,
      'currentPage': currentPage,
      'pageSize': pageSize
    },
    success: function(msg) {
      pageConfig.succesFun(msg, that);

      intAllCount = msg.intAllCount;
      if (intAllCount == undefined) {
        intAllCount = 0;
      }
      turnPage();
      
    },
    error: function(a, b, c) {
      pageConfig.errorFun(a, b, c, that);
    }
  });
}

//点击数字加载页码
$(document).delegate("li", "click", function() {

  var data = $(this).data("log");
  var currentPage = data - 1;

  if ($(this).hasClass("dot") || $(this).hasClass("curr")) {
    return false;
  }

  firstGoAjax();


})


//填写页数，提交请求数据加载
$("#go_submit").click(function() {
  var currentPage = $("#go_page").val() - 1;
  if (currentPage > totalpages) {
    alert("请输入小于总页数的页码");
  } else if (regExNumber(currentPage)) {
    alert("请输入正确的数字");
  } else {
    firstGoAjax();
  }

})

//开始查询按钮事件绑定
$("#search").click(function() {

  firstGoAjax();
})

*/
//检验数字，只能是1位或2位纯数字

function regExNumber(s) {
  var modus = /^\+?[1-9][0-9]*$/;
  if (!modus.exec(s)) {
    return false;
  }
}

//密码正则
// 验证规则：字母、数字、下划线组成，字母开头，6-16位。

function checkUser(str) {
  var re = /^[a-zA-z]\w{5,15}$/;
  if (re.test(str)) {
    return true;
  } else {
    return false;
  }
}



//获取地址参数

function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return (r[2]);
  } else {
    return null;
  }
}
// var locationID = GetQueryString('id');
// var btn_operate = GetQueryString('btn_operate');


//时间插件
