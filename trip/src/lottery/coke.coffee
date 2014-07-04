###
 * 可口可乐活动js
###

###
   * 登录
  ###
__SSO_loginShow = (a,s,t,n) ->
  el=$("#__SSO_iframe_"+t)
  screenWidth = $(document).width()
  iframeLeft = (screenWidth - 394) / 2
  if el[0]
    if s
      el.css
        'position': 'fixed'
        'left': iframeLeft
        'top': 20
      el.show()
      el[0].src = "/booking/LoginAgent.aspx?a="+a+"&t="+t+"&b=17EB203C60429FD15844AC248F698B26&o=967B767E258DF3E8"
    else
      el.hide()
      if n
        __SSO_submit(a,t)
  return

do ->
  "use strict"

  ###
   * 成功操作
  ###
  success = () ->
    alert '获取成功'

  ###
   * 手机号码验证
  ###
  mobileCheck = ( _number ) ->
    if (!/^0?1[34578]\d{9}$/.test(_number))
      alert('手机号码错误')
      return false
    true

  $('#lottery').bind 'click', ->
    tempCode = $('#userphone').val()
    if mobileCheck(tempCode)
      $.ajax
        type: 'post'
        url: '/Package-Booking-VacationsOnlineSiteUI/Handler2/CokaHandler.ashx'
        data:
          pincode: tempCode
        dataType: 'json'
        success: (_data) ->
          if _data.ErrCode is -1
            __SSO_loginShow('', true, '0' ,true)
          else if _data.ErrCode is 0
            success()
  #          if _data.ErrCode is -1
  #            console.log 'not login'
  #          else if _data.ErrCode is 0
  #            console.log 'is login'
          return
      return
  return
