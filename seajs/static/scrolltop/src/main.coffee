###
 * Description:
 * Author: jiangfeng(jiang.f @ctrip.com)
 * Date: 2014 - 03 - 26 14: 07
###
define (require) ->
  "use strict"
  srcTop = require('./scrolltop')
  new srcTop('#J_scrolltop').init()

  return