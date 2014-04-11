###
 * Description:
 * Author: jiangfeng(jiang.f@ctrip.com)
 * Date: 2014-03-26 17:56
###

define (require) ->
  "use strict"
  
  $ = require('jquery')
  
  countdown = require('./countdown')

  new countdown().init('#J_countdown',{
    start: new Date(2014,3,26,18,5,0).getTime()
    end: new Date(2014,3,26,18,6,0).getTime()
  })
  
  return