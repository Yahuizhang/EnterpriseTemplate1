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
	// zhuce
	// $("#zhuce").click(function(){
	// 	// 验证，用户名已存在
	// 	if ($("#username").val()=="zhangxin000") {
	// 		$("#username").after($("#name"));
	// 		$("#name").css({
 //         	"display":"block",
 //         	"margin-top":"10px",
 //         	"color":"rgb(234,100,74)",
 //         	"font-size":"13px"
	// 		})
	// 		$("#username").css({
	// 			"border-color":"rgb(234,100,74)"
	// 		})
	// 		$("#nickname").css({
	// 			"border-color":"rgb(56,176,63)"
	// 		})
	// 		$("#email").css({
 //         		"border-color":"rgb(56,176,63)"
	// 		})
	// 		$("#password1").css({
	// 			"border-color":"rgb(56,176,63)"
	// 		})
	// 		$("#password2").css({
	// 			"border-color":"rgb(56,176,63)"
	// 		})
	// 		$("#is_staff").css({
	// 			"border-color":"rgb(56,176,63)"
	// 		})
	// 		$("#password1").val("");
	// 		$("#password2").val("");
	// 	};
	// 	// 验证，昵称已经被使用
	// 	if ($("#nickname").val()=="zhangxin") {
	// 		$("#nickname").after($("#nick"));
	// 		$("#nick").css({
 //         	"display":"block",
 //         	"margin-top":"10px",
 //         	"color":"rgb(234,100,74)",
 //         	"font-size":"13px"
	// 		})
	// 		$("#username").css({
	// 			"border-color":"rgb(56,176,63)"
	// 		})
	// 		$("#nickname").css({
	// 			"border-color":"rgb(234,100,74)"
	// 		})
	// 		$("#email").css({
 //         		"border-color":"rgb(56,176,63)"
	// 		})
	// 		$("#password1").css({
	// 			"border-color":"rgb(56,176,63)"
	// 		})
	// 		$("#password2").css({
	// 			"border-color":"rgb(56,176,63)"
	// 		})
	// 		$("#is_staff").css({
	// 			"border-color":"rgb(56,176,63)"
	// 		})
	// 		$("#password1").val("");
	// 		$("#password2").val("");
	// 	};
	// 	// 验证，两次输入密码不一致
	// 	if ($("#password1").val() != $("#password2").val()) {
	// 		$("#password2").after($("#youxiang"));
	// 		$("#youxiang").css({
 //         	"display":"block",
 //         	"margin-top":"10px",
 //         	"color":"rgb(234,100,74)",
 //         	"font-size":"13px"
	// 		})
	// 		$("#username").css({
	// 			"border-color":"rgb(56,176,63)"
	// 		})
	// 		$("#nickname").css({
	// 			"border-color":"rgb(56,176,63)"
	// 		})
	// 		$("#email").css({
 //         		"border-color":"rgb(56,176,63)"
	// 		})
	// 		$("#password1").css({
	// 			"border-color":"rgb(56,176,63)"
	// 		})
	// 		$("#password2").css({
	// 			"border-color":"rgb(234,100,74)"
	// 		})
	// 		$("#is_staff").css({
	// 			"border-color":"rgb(56,176,63)"
	// 		})
	// 		$("#password1").val("");
	// 		$("#password2").val("");
	// 	}
	// 	// 验证，邮箱格式错误
	// 	if (!$("#email").val()=="") {
	// 		var em = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
	// 		if (em.test($("#email").val())) {

	// 		}else{
	// 			$("#email").focus();
	// 		}
	// 	};
	// 	// 验证，邮箱错误，
	// 	if ($("#email").val("1104479176@qq.com")) {
	// 		$("#email").after($("#yz"));
	// 		$("#yz").css({
 //         	"display":"block",
 //         	"margin-top":"10px",
 //         	"color":"rgb(234,100,74)",
 //         	"font-size":"13px"
	// 		})
	// 		$("#username").css({
	// 			"border-color":"rgb(56,176,63)"
	// 		})
	// 		$("#nickname").css({
	// 			"border-color":"rgb(56,176,63)"
	// 		})
	// 		$("#email").css({
 //         		"border-color":"rgb(234,100,74)"
	// 		})
	// 		$("#password1").css({
	// 			"border-color":"rgb(56,176,63)"
	// 		})
	// 		$("#password2").css({
	// 			"border-color":"rgb(56,176,63)"
	// 		})
	// 		$("#is_staff").css({
	// 			"border-color":"rgb(56,176,63)"
	// 		})
	// 		$("#password1").val("");
	// 		$("#password2").val("");
	// 	}
		
	// })


// 跳转页面   

})