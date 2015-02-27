// 获取数据
function getData(){
  $.ajax({
      url: '/VisaAutoCompleteApi',
      type: 'post',
      data: {},
      success: function (data) {
        console.log(data)
      }
    });
};

function writeVal(_statusBar){
  getData();
};