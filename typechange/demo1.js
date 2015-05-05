(function($){
  // 上移
  $('#J_slide').delegate('.J_up','click', function(ev){
    var $this = $(ev.target),
        prevDom = $this.closest('.J_list').prev(),
        tempDom = $this.closest('.J_list');
    tempDom.remove();
    prevDom.prepend(tempDom);

    // 去掉最上的disabled
    $('.J_up').prop('disabled', false);
    // 最上的设置disabled
    $($('.J_up')[0]).prop('disabled', true);
  });

  // 下移
  $('#J_slide').delegate('.J_down','click', function(ev){

    var $this = $(ev.target),
        nextDom = $this.closest('.J_list').next(),
        tempDom = $this.closest('.J_list');

    tempDom.remove();
    nextDom.append(tempDom);

    // 去掉最下的disabled
    $('.J_down').prop('disabled', false);
    $($('.J_down')[$('.J_down').length - 1]).prop('disabled', true);
  });
})(jQuery);