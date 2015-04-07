$LAB.script('http://webresource.c-ctrip.com/code/cquery/mod/calendar-6.0.js').wait(function() {

  $("#J_cal").regMod("calendar", "6.0", {
    options: {
      showWeek: true
      // prohibit: '|2015-04-15|2015-04-16|2015-04-17|2015-04-18|2015-04-19|2015-04-20|2015-04-22|2015-04-23|2015-04-24|2015-04-25|2015-04-26|2015-04-27|'
    },
    listeners: {
      onChange: function(input, value) {
        $("#J_cal").data('endDate', value);
      }
    }
  });

})