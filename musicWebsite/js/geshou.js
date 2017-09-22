$(document).ready(function(){

	$(".pagination li").click(function(){
		
		$(".pagination li").removeClass("active");
		$(this).addClass("active");
		// alert("aaa");

	})
	$(".thum").mouseenter(function(e){
           var shadw="170px";
           var shadh="220px";
           $(this).children(".shadow").css({
           
           	"position":"absolute",
           	"height":shadh,
           	"width":shadw,
           }).slideDown();
		}).mouseleave(function(){
			$(this).children(".shadow").slideUp();
		
		})

})