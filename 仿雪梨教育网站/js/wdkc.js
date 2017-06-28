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
	$(".wdkc li").mouseenter(function(){
		$(this).css("background-color","rgb(241,241,241)");
	}).mouseleave(function(){
		$(this).css("background-color","");
	})
	
	var $navList=$('.wdkc').children();
	var $sectionList=$('section').children();
	$navList.click(function(){
		$navList.removeClass("active");
		$(this).addClass("active");
		var num=$(this).attr("id").substr(3,1);
		$sectionList.css("display","none");
		$sectionList.eq(num-1).css("display","block");
	})


	var toTopHeight = $(".left").offset().top;
            $(window).scroll(function(){
                if ($(document).scrollTop()>toTopHeight) {
                     $(".left").addClass("nav_fixed");
                }else{
                    $(".left").removeClass("nav_fixed");
                }
            })
// top
	showScroll();
        function showScroll(){
            $(window).scroll( function() { 
                var scrollValue=$(window).scrollTop();
                scrollValue > 100 ? $('div[class=scroll]').fadeIn():$('div[class=scroll]').fadeOut();
            } );    
            $('#scroll').click(function(){
                $("html,body").animate({scrollTop:0},200);    
            });    
        }
})