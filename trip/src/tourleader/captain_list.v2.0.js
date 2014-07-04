$(function() {
    $(".search-area input").placeholder();
    $(".search-area button").hover(function() {
        $(".search-area").css({
            "background-position": "0 -32px"
        })
    },
    function() {
        $(".search-area").css({
            "background-position": "0 0"
        })
    })
});

/* 2013-11-07 15:31:58 chenwp */
