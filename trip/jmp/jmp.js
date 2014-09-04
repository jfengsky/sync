/**
 * Description:
 * Author: jiangfeng(jiang.f@ctrip.com)
 * Date: 2014-09-04 09:36
 *
 */

define(function(require, exports, module) {
  cQuery.mod.load('jmp','1.0',function(){
    cQuery('#demo1').regMod('jmp', '1.0',{
      options:{
        // eventType:"def",
        type: "jmp_alert",
        template:"#jmp_case1",
        classNames:{
          boxType:"jmp_alert"
        },
        css: {
          maxWidth: 300,
          minWidth:'240'
        },
        alignTo: "cursor"
      }
    });
    cQuery('#demo2').regMod('jmp', '1.0',{
      options:{
        eventType:"def",
        // type: "jmp_alert",
        template:"#jmp_case2",
        classNames:{
          boxType:"jmp_alert"
        },
        css: {
          maxWidth: 300,
          minWidth:'240'
        },
        alignTo: "cursor"
      }
    });
  })
})