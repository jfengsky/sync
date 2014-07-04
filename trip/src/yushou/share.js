/**
 * 分享功能
 *
 */
define(function(require, exports, module) {
  "use strict";
  var $ = require("jquery");

  function Share() {
    var self = this;
    /**
     * 微博分享
     *
     * @class SNS
     * @memberof vacation.detail
     */
    var SNS = {
      ShareUrl: {
        sina: "http://service.weibo.com/share/share.php?url={$url}&title={$content}&pic={$pic}&appkey=968446907",
        qq: "http://v.t.qq.com/share/share.php?url={$url}&title={$content}&pic={$pic}&appkey=e5d288d65a1143e59c49231879081bb0&site=www.ctrip.com",
        renren: "http://share.renren.com/share/buttonshare?link={$url}&title={$content}",
        qzone: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={$url}&title={$content}&pics={$pic}&site={$from}",
        kaixin: "http://campaign.ctrip.com/Destinations/fenxiang/fenxiang.asp?type=1&url={$url}&ti={$content}",
        douban: "http://campaign.ctrip.com/Destinations/fenxiang/fenxiang.asp?type=5&url={$url}&ti={$content}",
        souhu: "http://t.sohu.com/third/post.jsp?url={$url}&title={$content}&pic={$pic}&appkey=&content=utf-8",
        163: "http://t.163.com/article/user/checkLogin.do?info={$content}{$url}&images={$pic}&togImg=true&link=http://www.ctrip.com/&source={$from}"
      },
      ShareInfo: {
        content: encodeURIComponent(document.title),
        url: encodeURIComponent(document.location),
        pic: (function() {
          var result = [];
          var pic_list = document.getElementById("player-pic-list");
          if (pic_list) {
            pic_list = pic_list.getElementsByTagName("img");
            if (pic_list && pic_list.length) {
              for (var i = 0, l = pic_list.length; i < l; i++) {
                result[i] = pic_list[i].getAttribute("bsrc");
              }
            }
          }
          return {
            sina: result.join("||"),
            qq: result.join("|"),
            qzone: result.join("|"),
            souhu: result.length ? result[0] : "",
            163: result.join(",")
          };
        })(),
        from: encodeURIComponent("携程旅行网")
      },
      share: function(type) {
        var shareUrl = SNS.ShareUrl,
          shareInfo = SNS.ShareInfo;
        window.open(shareUrl[type].replace(/\{\$(\w+)\}/g, function(all, key) {
          if (key === "pic") {
            return shareInfo.pic[type];
          } else {
            return shareInfo[key];
          }
        }), '', 'width=700, height=680, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no');
      }
    };

    this.init = function() {
      var _container = $('#J_bar_share'),
        _as = _container.find('a');
      _container.bind('mouseover', function() {
        // $(this).removeClass('disable').addClass('current');
        $(this).find('.label_list_coentent').show();
      }).bind('mouseleave', function() {
        // $(this).removeClass('current').addClass('disable');
        $(this).find('.label_list_coentent').hide();
      });
      _as.each(function(i, index) {
        if ($(index).data('share') != null) {
          $(index).on('click', function() {
            SNS.share($(index).data('share'));
          });
        }
      });
    }
  }

  module.exports = Share;
});