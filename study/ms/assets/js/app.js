(function($) {
  'use strict';

  $(function() {

    $('#J_list li').bind('click', function(){
      var url = $(this).attr('url');
      location.href = url
    })

  });

})(jQuery);
