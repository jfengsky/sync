$LAB.script('http://webresource.c-ctrip.com/code/cquery/mod/calendar-6.0.js').wait(function() {

  $("#J_cal").regMod("calendar", "6.0", {
    options: {

      showAlways: true,
      showWeek: true,
      maxDate:'2016-06-14',
      defaultDate: '2016-06-11',
      permit: ['2016-06-11','2016-06-12','2016-06-14']
    },
    listeners: {
      onChange: function(input, value) {
        $("#J_cal").data('endDate', value);
      }
    }
  });

})

/*
container: k.container,
reference: !1,
step: 2,
minDate: null,
maxDate: null,
startDate: null,
endDate: null,
permit: null,
prohibit: null,
weekday: "0123456",
render: "default",
showAlways: !1,
showOptions: !1,
showWeek: !0,
nextEl: null,
rangeColor: "#D9E5F4",
defaultDate: null,
date: null,
tipText: "yyyy-mm-dd",
zindex: 9999
 */