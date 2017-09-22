$(function(){
    var winHeight = $(window).height() ;
    var winWidth = $(window).width();
    $("#bg").css({
        "width":winWidth,
        "height":winHeight
    });
    $(".pre-btn img").mouseenter(function(){
        $(".mask-hover").show();
        $(".mask-text").show();
    })
    $(".mask-text").mouseleave(function(){
        // alert("a");
        $(".mask-hover").hide();
        $(".mask-text").hide();
    });
    $(window).bind("resize", resizeWindow);
})
function resizeWindow(){
    var winHeight = $(window).height() ;
    var winWidth = $(window).width();
    $("#bg").css({
        "width":winWidth,
        "height":winHeight
    });
}