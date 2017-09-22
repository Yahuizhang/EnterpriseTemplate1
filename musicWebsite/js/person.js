
$(function(){
    $(".personNum").mouseenter(function(){
        $(this).hide();
        $(this).next().show();
    });
    $(".onezhibo button").mouseleave(function(){
        $(this).hide();
        $(this).prev().show();
        // alert('sdfaf');
    });
})