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
	var username;
	var password;
	if (localStorage["username"]=="张三") {
		if (localStorage["password"]=="111") {
			username = localStorage["username"];
			password = localStorage["password"]; 
			$(".yh").html("<li class='dh1'><a href='grzx.html'><span class='glyphicon glyphicon-user'> " +username+"</span></a></li><li class='dh2'><a href='#'><span class='glyphicon glyphicon-envelope'></span></a><div class='lb1'><ul><li><a href='my.html'>@我的</a></li><li><a href='pl.html'>评论</a></li><li><a href='zan.html'>赞</a></li><li><a href='yq.html'>邀请</a></li></ul></div></li><li class='dh2'><a href='#'><span class='glyphicon glyphicon-cog'></span></a><div class='lb1'><ul><li><a href='grzl.html'>个人资料</a></li><li><a href='' class='tuichu'>退出</a></li></ul></div></li>")		    
		}
	}
	$('.dh2').mouseenter(function(){
		$(this).children('.lb1').css("display","block");
	}).mouseleave(function(){
		$(this).children('.lb1').css("display","none");
	})
	$(".tuichu").click(function(){
		localStorage.clear();
		location.reload();
	})
})