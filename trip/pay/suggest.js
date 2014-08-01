/**
 * Description:
 * Author: jiangfeng(jiang.f@ctrip.com)
 * Date: 2014-07-25 10:25
 *
 */

define(function(require, exports, module){
  "use strict";
  var $ = require("jquery"),
      doc = document;

  function curIndex(){
    var lis = $('#J_list li'),
        li_index;
    if( !lis.hasClass('cur') ){
      li_index = -1;
    } else {
      li_index = $('#J_list li.cur').index();
    }
    return li_index;
  }

  function setCur(_index){
    var lis = $('#J_list li');
    lis.removeClass('cur');
    $(lis[_index]).addClass('cur');
  }

  $('#J_list li').bind({
    'mouseenter': function(){
      $('#J_list li').removeClass('cur');
      $(this).addClass('cur')
    },
    'mouseleave': function(){

    }
  })

  $('#J_keyword').bind({
    'focus': function(){
      $('#J_list').show();

      $(doc).bind('keyup.search', function(ev){
        // console.log(ev)
        var tempcurIndex;
        if(ev.keyCode === 40){  // donw
          console.log('down')
          tempcurIndex = curIndex();
          tempcurIndex++
          setCur( tempcurIndex )
        };
        if(ev.keyCode === 38){  // up
          console.log('up')
          tempcurIndex = curIndex();
          tempcurIndex--;
          setCur( tempcurIndex )
        }
        if(ev.keyCode === 13){  // enter
          console.log('enter')
          $('#J_keyword').val($('#J_list li.cur').text())
          $('#J_list').hide();
          $('#J_list li.cur').remove();
        }

      })
    },
    'blur': function(){
      $('#J_list').hide();
      $(doc).unbind('keyup.search')
    }
  })

//  $('#J_keyword').focus(function(){
//    $('#J_list').show();
//    $(document).keyup(function(ev){
//      console.log(ev)
//      if(ev.keyCode === 40){
//        console.log('down')
//      }
//      if(ev.keyCode === 38){
//        console.log('up')
//      }
//    });
//  }).blur(function(){
//    $('#J_list').hide();
//  });
});