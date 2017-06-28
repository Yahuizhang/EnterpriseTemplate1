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
	}).mouseleave(function(){
		$(this).removeClass("hover1");
	})
	// jinggao
	$("#jinggao").click(function(e){
		$("#hy").css({
         	"display":"block",
         	"position":"absolute",
         	"top":(e.pageY+40)+"px",
         	"left":(e.pageX-400)+"px"
		})
	})
	// denglu
	$("#denglu").click(function(){
		if ($("#username").val()=="" && $("#password").val()=="") {
			$("#username").focus();
		}
		if (!$("#username").val()=="" && $("#password").val()=="") {
			$("#password").focus();
		}
		if ($("#username").val()=="" && !$("#password").val()=="") {
			$("#username").focus();
		}
		// 验证，错误，
		// if (！($("#username").val()=="张三" )&& ！($("#password").val()=="111")) {
		// 	$("#password").after($("#yz"));
		// 	$("#yz").css({
  //        	"display":"block",
  //        	"margin-top":"10px"
		// 	})
		// }
		//验证，如果正确跳转页面 
        if($("#username").val()=="张三"&&$("#password").val()=="111"){
        	// window.location.href="tongbuke.html"; 
        	history.go(-1); 
        }
        var username = $("#username").val();
        var password = $("#password").val();
        localStorage["username"] = username;
        localStorage["password"] = password;
	})
})