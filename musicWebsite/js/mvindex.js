$(document).ready(function(){

	$(".lists .img").mouseenter(function(){
		var top=$(this).position().top;
		var left=$(this).position().left;
		$(this).children(".play").css({
			"position":"absolute",
			"top":(top+25)+"px",
			"left":(left+60)+"px",
			"display":"block"
			
		})
	}).mouseleave(function(){
		$(".play").css("display","none");
	})
	//分享按钮
	$(".fxbt").mouseenter(function(){
		$(".fenxiang").animate({
			"top":"280px",
			"right":"0px"
		}).show("slow");
	})
	$(".fenxiang").mouseleave(function(){
		$(".fenxiang").animate({
			"top":"280px",
			"right":"-137px"
		}).show("slow");
	})
	

})