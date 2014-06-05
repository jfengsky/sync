# Description:
# Author: jiangfeng(jiang.f@ctrip.com)
# Date: 2014-06-05 22:34
define (require, exports, module) ->
  fn ->
  module.exports = fn
  return