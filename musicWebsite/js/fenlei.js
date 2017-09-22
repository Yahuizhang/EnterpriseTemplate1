$(function(){
	
$("#dianji p").click(function(){
	$("#dianji p").removeClass("active1");
	$(this).addClass("active1");
})
picture=$(".picture");
picture.mouseover(function(){
	$(".picture").removeClass("borde");
	$(this).addClass("borde");
})

 var imgname=document.getElementsByName("img");
  imgname.onmouseenter=function(){
  	alert("b");
  }

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
