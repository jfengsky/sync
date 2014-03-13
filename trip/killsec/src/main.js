define(function(require) {
  var $ = require('jquery'),
      carousel = require('./carousel');
  new carousel('#j_secKill_review_details',{
    scrollcnt: ".secKill_review_list"
  }).init();
});