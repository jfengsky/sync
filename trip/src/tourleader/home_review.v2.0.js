$(function() {
    $(".captain_topinfo .ct_btn_share").gsbaseshare({
        requestFn: INTERFACE.shareRequestFn
    });
    $(".ct_hot .btn_cthot").click(function() {
        if (!$(this).hasClass("btn_cthot_no") && !$(this).hasClass("a_popup_login")) {
            var a = $(this),
            c = a.siblings("span"),
            b = a.offset(),
            e = b.top - 40,
            b = b.left + 40,
            d = parseInt(c.text(), 10),
            d = isNaN(d) ? 0 : d,
            d = 0 > d ? 0 : d;
            0 === $("#gs_addone_1").length && $("body").append($('<div id="gs_addone_1" class="gs_addone_1">+1</div>'));
            d++;
            a.addClass("btn_cthot_no").removeClass("btn_cthot");
            a.text("\u4eca\u65e5\u5df2\u52a0");
            c.text(d);
            $("#gs_addone_1").css({
                opacity: 1,
                top: e,
                left: b,
                display: "block",
                "font-size": "18px"
            }).animate({
                top: e - 30,
                opacity: 0
            },
            "slow")
        }
    })
});
$(function() {
    $(".btn_ctreview").click(function() {
        $.popupbox.show({
            id: "lingDuiDianPing",
            callback: function() {
                var a = $("#lingDuiDianPing"),
                c = a.find("#reviewContent"),
                b = a.find(".input_tips .warning");
                a.find(".fraction-star i").removeClass("selected");
                $("#zongtiPoint").val(0);
                c.val("");
                $("#zongtiPointVerify").hide();
                b.hide()
            }
        })
    }); (function() {
        var a = $("#lingDuiDianPing"),
        c = a.find("#reviewContent"),
        b = a.find(".input_tips .tips span"),
        e = a.find(".input_tips .warning"),
        d = a.find(".fr .gsn-btn-2"),
        h = a.find(".fr .gsn-btn-6"),
        k = ["\u5dee", "\u4e00\u822c", "\u597d", "\u5f88\u597d", "\u63a8\u8350"],
        f = a.find(".star-hover-tip");
        a.find(".fraction-star i").bind("mousedown",
        function() {
            $(this).parent().find("i").removeClass("selected");
            var a = $(this).index() + 1;
            $(this).parent().find("i:lt(" + a + ")").addClass("selected");
            $(this).parent().parent().find(".cls-set").val(a);
            $("#zongtiPointVerify").hide()
        }).hover(function() {
            $("#zongtiPointVerify").hide();
            var a = $(this);
            a.addClass("hovered");
            a.prevAll().addClass("hovered");
            f.show();
            f.text(k[a.index()])
        },
        function() {
            var a = $(this);
            a.removeClass("hovered");
            a.siblings().removeClass("hovered");
            f.hide()
        });
        c.gsInputLen(function(a) {
            10 <= a && e.hide();
            a = 1E3 - a; - 1 >= a ? (a = c.val(), a = $.gsSubstring(a, 1E3, 1), c.val(a), b.html(0)) : b.html(a)
        });
        h.bind("click",
        function() {
            $.popupbox.close()
        });
        d.bind("click",
        function() {
            var b = !0;
            0 == a.find("#zongtiPoint").val() && ($("#zongtiPointVerify").show(), b = !1);
            var d = parseInt(a.find(".input_tips span").text(), 10),
            f = a.find(".fraction-star i.selected").length,
            d = 1E3 - d,
            g = c.val();
            if ("" == g || "\u4f60\u7684\u70b9\u8bc4\u4f1a\u5e2e\u52a9\u5230\u5343\u4e07\u7f51\u53cb\u54e6\uff5e" == g || 10 > d) e.show(),
            b = !1;
            b && ($(this).gsdisable({
                callback: function() {}
            }), INTERFACE.dianPingFn({
                starNum: f,
                data: g
            }))
        })
    })()
});
$(function() {
    $(".replymain .replylink").click(function() {
        $(this).parent().siblings(".replytarea").slideToggle()
    });
    $(".replytarea textarea").each(function() {
        var a = $(this),
        c = a.siblings("p").find("em");
        a.gsInputLen(function(b) {
            b = 1E3 - b; - 1 >= b ? (b = a.val(), b = $.gsSubstring(b, 1E3, 1), a.val(b), c.html(0)) : c.html(b)
        })
    });
    $(".r-item .gsn-btn-6").click(function() {
        var a = $(this).parents(".r-item"),
        c = $(this).parent().siblings("textarea").val();
        if (null != c && "" != c) {
            var b = [];
            b.push('<div class="replytext">');
            b.push(" <p><strong>\u53d1\u8d77\u4eba\u56de\u590d\uff1a</strong></p>");
            b.push(c);
            b.push("</div>");
            a.find(".replytarea").remove();
            a.find(".replylink").parent().remove();
            a.append(b.join(""))
        }
    })
});

/* 2013-11-07 15:32:14 chenwp */
