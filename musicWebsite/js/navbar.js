$(function(){
    if(localStorage['name']){
           $("#username").html("<a href='person.html'>"+localStorage['name']+"|</a><a class='exit'>退出</a>");
         }
         $(".exit").click(function(){
            localStorage.clear();
            location.reload();
         })
    // console.log("sds");
    $(".search").show();
    var bottom = $(".search").height()*0.5;
    var classify = $("#username");
    if($(".top").width()>967){
        var left = classify.offset().left - $(".search").width()*1.2;
        console.log(left);
        $(".search").css({
            "bottom": bottom,
            "left":left
        });
    }
    else if($(".top").width()>751){
        $(".search").hide();
    }else{
        $(".search").css({
            "bottom": bottom,
            "left":0
        });
    }
    $(window).bind("resize", resizeWindow);
})
function resizeWindow(e){
    $(".search").show();
    var bottom = $(".search").height()*0.5;
    var classify = $("#username");
    if($(".top").width()>967){
        var left = classify.offset().left - $(".search").width()*1.2;
        $(".search").css({
            "bottom": bottom,
            "left":left
        });
    }
    else if($(".top").width()>751){
        $(".search").hide();
        
    }else{
        $(".search").css({
            "bottom": bottom,
            "left":0
        });
    }
}