$(function(){
  var offset_x = 0,
      offset_y = 0,
      canDrag = false;
  $('#J_title').mousedown(function(ev){
    offset_x = ev.offsetX;
    offset_y = ev.offsetY;
    canDrag = true;
  });
  $('#J_title').mouseup(function(ev){
    canDrag = false;
  });
  $(document).mousemove(function(ev){
    var mouse_x = ev.clientX - offset_x,
        mouse_y = ev.clientY - offset_y;
    if(canDrag){
      $('#J_title').css({
        left: mouse_x,
        top: mouse_y
      })
    }
  });
})