define (require) ->

  favories = require('./addfavories')
  fav = new favories()
  ###
   * 默认加入收藏（收藏当前页面title和url）
  ###
  fav.init('#J_fav')
  ###
   * 指定url加入收藏
  ###
  fav.init('#J_favurl',{
    url: 'http://www.ctrip.com/'
  })

  ###
   * 指定title加入收藏
  ###
  fav.init('#J_favtitle',{
    title: '收藏测试'
  })

  ###
   * 指定title和url加入收藏
  ###
  fav.init('#J_favall',{
    title: '收藏测试'
    url: 'http://www.ctrip.com/'
  })
  return