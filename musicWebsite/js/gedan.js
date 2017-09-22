window.onload=function(){

	var arr=[false,true];
	var second=document.getElementsByName("second");
	var one=document.getElementsByName("one");
	var down=document.getElementsByName("down");
	for(var i=0;i<one.length;i++){
	one[i].onclick=function(){
		if(arr[this.id]==false){
			second[this.id].style.display="block";
			down[this.id].src="images/zhanglimeng/2-down.png";
			arr[this.id]=true;
		}else{
			second[this.id].style.display="none";
			down[this.id].src="images/zhanglimeng/2-up.png";
			arr[this.id]=false;
		}
	}
}
$(".share").mouseover(function(){
	var left=$(this).offset().left;
    var top=$(this).offset().top;
    $(".sharePage").show();
    $(".sharePage").css("left",left - $(".sharePage").width());
    $(".sharePage").css("top",top - $(this).height()+5+"px");
}).mouseout(function(){
	$(".sharePage").hide();
})

$(".sharePage").mouseover(function(){
	 $(".sharePage").show();
	 $(".sina").mouseover(function(){
	 	$(this).css("backgroundImage","url(images/icon.png)");
	 	$(this).css("backgroundPosition","-219px -216px");
	 }).mouseout(function(){
	 	$(this).css("backgroundImage","url(images/icon.png)");
	 	$(this).css("backgroundPosition","-219px -196px");
	 });
	  $(".Qzone").mouseover(function(){
	 	$(this).css("backgroundImage","url(images/icon.png)");
	 	$(this).css("backgroundPosition","-242px -216px");
	 }).mouseout(function(){
	 	$(this).css("backgroundImage","url(images/icon.png)");
	 	$(this).css("backgroundPosition","-242px -196px");
	 });
	  $(".tqq").mouseover(function(){
	 	$(this).css("backgroundImage","url(images/icon.png)");
	 	$(this).css("backgroundPosition","-265px -216px");
	 }).mouseout(function(){
	 	$(this).css("backgroundImage","url(images/icon.png)");
	 	$(this).css("backgroundPosition","-265px -196px");
	 });
	  $(".douban").mouseover(function(){
	 	$(this).css("backgroundImage","url(images/icon.png)");
	 	$(this).css("backgroundPosition","-288px -216px");
	 }).mouseout(function(){
	 	$(this).css("backgroundImage","url(images/icon.png)");
	 	$(this).css("backgroundPosition","-288px -196px");
	 });
	  $(".renren").mouseover(function(){
	 	$(this).css("backgroundImage","url(images/icon.png)");
	 	$(this).css("backgroundPosition","-311px -216px");
	 }).mouseout(function(){
	 	$(this).css("backgroundImage","url(images/icon.png)");
	 	$(this).css("backgroundPosition","-311px -196px");
	 })
}).mouseout(function(){
	$(".sharePage").hide();
})
/*----------------------分类榜点击换取不同页面---------------------------*/
$(".flb .point").click(function(e){
	e.preventDefault();
	$(".point").removeClass("select");
	$(this).addClass("select");
})
}
$(".flb .one").click(function(){
	$(".right").css("display","none");
	$("#firstPage").css("display","block");
})
$(".flb .two").click(function(){
	$(".right").css("display","none");
	$("#secondPage").css("display","block");
})
$(".flb .three").click(function(){
	$(".right").css("display","none");
	$("#firstPage").css("display","block");
})
$(".flb .four").click(function(){
	$(".right").css("display","none");
	$("#secondPage").css("display","block");
})
$(".flb .five").click(function(){
	$(".right").css("display","none");
	$("#firstPage").css("display","block");
})
$(".flb .six").click(function(){
	$(".right").css("display","none");
	$("#secondPage").css("display","block");
})
$(".flb .seven").click(function(){
	$(".right").css("display","none");
	$("#firstPage").css("display","block");
})
/*------------------模态框-----------------------*/
// $(".downLoad").click(function(e){
// 	e.preventDefault();
// 	$("#modal-id").modal("show");
// })
