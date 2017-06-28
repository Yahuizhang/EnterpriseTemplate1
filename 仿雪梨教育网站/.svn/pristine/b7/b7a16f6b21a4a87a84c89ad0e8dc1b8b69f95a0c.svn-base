$(document).ready(function(){
// daohang
	$('.dh').mouseenter(function(){
		$(this).addClass("hover");
		$(this).children('div').css("display","block");
	}).mouseleave(function(){
		$(this).removeClass("hover");
		$(this).children('div').css("display","none");
	})
	$('.dh1').mouseenter(function(){
		$(this).addClass("hover1");
		$(this).children('.lb1').css("display","block");
	}).mouseleave(function(){
		$(this).removeClass("hover1");
		$(this).children('.lb1').css("display","none");
	})
// content
$('.adjust-ajaxz1').click(function(){
	$(this).css("display","none");
	$('.adjust-ajaxs1').css('display','block');
	$('.zhangkai1').css('display','none');
	$('.shouqi1').css('display','block');
})
$('.adjust-ajaxs1').click(function(){
	$(this).css("display","none");
	$('.adjust-ajaxz1').css('display','block');
	$('.zhangkai1').css('display','block');
	$('.shouqi1').css('display','none');
})

$('#summernote').summernote({
	       		height:120
	       	})
// top
	showScroll();
        function showScroll(){
            $(window).scroll( function() { 
                var scrollValue=$(window).scrollTop();
                scrollValue > 200 ? $('div[class=scroll]').fadeIn():$('div[class=scroll]').fadeOut();
            } );    
            $('#scroll').click(function(){
                $("html,body").animate({scrollTop:0},200);    
            });    
        }
})