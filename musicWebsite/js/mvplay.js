var mvLists={
	mv:[
	{
		"mvname":"《甜甜的》",
		"mvsrc":"video/周杰伦 - 甜甜的.mkv",
		"img":"images/gsf/zmv2.jpg",
		"singer":"周杰伦",
	},
	{
		"mvname":"《给我一首歌的时间》",
		"mvsrc":"video/周杰伦 - 给我一首歌的时间.mkv",
		"img":"images/gsf/zmv1.jpg",
		"singer":"周杰伦&蔡依林",
	},
	{
		"mvname":"《算什么男人》",
		"mvsrc":"video/周杰伦 - 算什么男人.mkv",
		"img":"images/gsf/zmv3.jpg",
		"singer":"周杰伦",
	},
	{
		"mvname":"《甜甜的》",
		"mvsrc":"video/周杰伦 - 甜甜的.mkv",
		"img":"images/gsf/zmv2.jpg",
		"singer":"周杰伦",
	},
	{
		"mvname":"《给我一首歌的时间》",
		"mvsrc":"video/周杰伦 - 给我一首歌的时间.mkv",
		"img":"images/gsf/zmv1.jpg",
		"singer":"周杰伦&蔡依林",
	},
	{
		"mvname":"《算什么男人》",
		"mvsrc":"video/周杰伦 - 算什么男人.mkv",
		"img":"images/gsf/zmv3.jpg",
		"singer":"周杰伦",
	},
	{
		"mvname":"《甜甜的》",
		"mvsrc":"video/周杰伦 - 甜甜的.mkv",
		"img":"images/gsf/zmv2.jpg",
		"singer":"周杰伦",
	},
	{
		"mvname":"《给我一首歌的时间》",
		"mvsrc":"video/周杰伦 - 给我一首歌的时间.mkv",
		"img":"images/gsf/zmv1.jpg",
		"singer":"周杰伦&蔡依林",
	},
	{
		"mvname":"《算什么男人》",
		"mvsrc":"video/周杰伦 - 算什么男人.mkv",
		"img":"images/gsf/zmv3.jpg",
		"singer":"周杰伦",
	}
	]
}
var mvtitle="<li><h4>周杰伦的mv</h4></li>";
$("#mvul").append(mvtitle);
for (var i = 0; i < mvLists.mv.length; i++) {
	var liNode="<li class='mvlist'>"+"<div class='row '><div class='col-md-6'><img src='"+mvLists.mv[i].img+"'class='img-responsive'></div><div class='col-md-6 mvintroduce'><h4>"+mvLists.mv[i].mvname+"</h4><p>"+mvLists.mv[i].singer+"</p><p style='color:#7d7d7d'>播放次数：1880</p> </div><!-- col-md-6 --></div>"+"</li>";
	$("#mvul").append(liNode);}
	$(".sub_btn").click(function(){
		localstorage["name"]="name";
		localstorage["text"]=$(".input").val();
	})
	var mvheight=$(".vplay").height();
    $("#ulbg").css("height",mvheight+40+"px");
	$(window).resize(function(){
	    $("#ulbg").css("height",$(".vplay").height());
	})
	
$(document).ready(function(){
	
	
	$("#myvideo").attr("src",mvLists.mv[0].mvsrc);
	//title
	$(".titleul li").mouseenter(function(){
		$(".titleul li a").css({"border-bottom":"","color":""});
		$(this).children("a").css({
			"color":"#1093d7",
			"border-bottom":"1px solid #1093d7"
		})
	}).mouseleave(function(){
		$(".titleul li a").css({"border-bottom":"","color":""});
	})
	//播放列表
	
	$(".mvlist").mouseenter(function(){
		$(".mvlist").css("background-color","");
		$(this).css({
			"background-color":"#646060",
			"cursor":"pointer"
		})
	}).click(function(){
		$(".mvlist").css("background-color","");
		$(this).css({
			"background-color":"#646060",
	    	"cursor":"pointer",
		});
		var index=$(this).index()-1;
		var mvsrc=mvLists.mv[index].mvsrc;
		$("#myvideo").attr("src",mvsrc);
		var duration = $("#myvideo")[0].duration;
     $("#myvideo")[0].currentTime = 0;
     $(".spro .pace").css('width','0px');
     $("#mycontrol").removeClass("glyphicon-pause");
		  $("#mycontrol").addClass("glyphicon-play");
	})
	//浏览器检测是否能正常播放
	var support=$("#myvideo")[0].canPlayType("video/mp4");
	if (support=="") {
		alert("抱歉！您的浏览器无法播放此视频")
	}
	else{
	//播放mv
	$(".icon").mouseenter(function(){
		$(this).css("cursor","pointer");
	})
	$("#mycontrol").click(function(){
		if($(this).hasClass("glyphicon-play")){
		   $("#myvideo")[0].play();
		   $(this).removeClass("glyphicon-play");
		   $(this).addClass("glyphicon-pause");
		   $(this).attr("title", "暂停");
		}
		else{
			$("#myvideo")[0].pause();
			$(this).removeClass("glyphicon-pause");
		   $(this).addClass("glyphicon-play");
		   $(this).attr("title" ,"播放");
		}
		
	})
	 //停止播放
   $(".glyphicon-stop").click(function(e){
   $("#myvideo")[0].pause();
     var duration = $("#myvideo")[0].duration;
     $("#myvideo")[0].currentTime = 0;
     $(".spro .pace").css('width','0px');
     $("#mycontrol").removeClass("glyphicon-pause");
		  $("#mycontrol").addClass("glyphicon-play");
   })
	//视频进度条
	$("#myprogress").slider({
	change:changeSlider
})
   var setInt=setInterval(changeProgress,1000);
   //进度条随视频改变
   function changeProgress(e){
	 var current=$("#myvideo")[0].currentTime;
	var duration=$("#myvideo")[0].duration;
	var percent=current/duration;
	$("#myprogress .pace").css("width",percent*100+"%");
	if (parseInt(current)<10) {
		$(".timer").html(parseInt(current/60)+":0"+parseInt(current)+"/"+parseInt(duration/60)+":0"+parseInt(duration%60));
	}else{
		$(".timer").html(parseInt(current/60)+":"+parseInt(current)+"/"+parseInt(duration/60)+":0"+parseInt(duration%60));
	}
    
}
function changeSlider(e){
	 var w = $(this).width(),
         x = e.offsetX;
     window.per = (x / w).toFixed(3); //全局变量
     var duration = $("#myvideo")[0].duration;
     $("#myvideo")[0].currentTime = (duration * window.per).toFixed(0);
     $(".spro .pace").css('width', x + 'px'); //反馈

   }

 
   //进度条的隐藏
   $(".progresser").mouseenter(function(){
   	$(this).css({"height":"15px",
   		"width":"95%"});
   	$(".spro").css("height","15px");
   	$(".jindu").css("display","block");
   }).mouseleave(function(){
   	$(this).css({"height":"5px",
   		"width":"100%"});
   	$(".spro").css("height","5px");
   	$(".jindu").css("display","none");

   })

   //音量大小控制

//音量进度条
$(".volume .slider").slider({
	change:changeVolume
})
function changeVolume(e){
	 var w = $(this).width(),
         x = e.offsetX;
     window.vol = (x / w).toFixed(1); //全局变量
      $("#myvideo")[0].volume = window.vol;
      $(".right .slider .pace").css('width', x + 'px');
}
//默认音量
    $(".volume .slider .pace").css("width","30")
    $("#myvideo")[0].volume=0.3;
//静音
$(".volume .glyphicon").click(function(){
	if($(this).hasClass("glyphicon-volume-off")){
		$(this).removeClass("glyphicon-volume-off");
	    $(this).addClass("glyphicon-volume-up");
        $(".volume .slider .pace").css("width","30")
        $("#myvideo")[0].volume = 0.3;
        console.log( $("#myvideo")[0].volume);
	}
	else{
		$(this).removeClass("glyphicon-volume-up");
		$(this).addClass("glyphicon-volume-off");
        $(".volume .slider .pace").css("width","0");
        $("#myvideo")[0].muted=true;
        console.log("jingyin");
	}
	
})
   //控制栏的隐藏
   $(".control").animate({
     	"opacity":"0"
     },5000);
   $(".control").mouseenter(function(){
     $(".control").animate({
     	"opacity":"1"
     });
   }).mouseleave(function(){
    $(".control").animate({
     	"opacity":"0"
     },"slow");
   })
   
   //清晰度的选择
   $("#lab").click(function(){
   	if ($(".labelul").css("display")=="none") {
   	$(".labelul").css("display","block");
   	$(".labelul").children("ul").children("li").mouseover(function(){
   		$(".labelul").children("ul").children("li").removeClass("show");
   		$(this).addClass("show");	
   	}).click(function(e){
   		var value=$(this).html();
   		$("#lab").html(value);
   	    $(".labelul").css("display","none");
   	})
   }else{
   	$(".labelul").css("display","none");
   }
   })

}
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
	
  //评论区
  $("textarea").focus(function(){
  	$(this).html("");
  })
  $(".emotion").mouseenter(function(){
  	$(".emotion img").attr("src","images/gsf/smile.png").css("cursor","pointer");
  }).mouseleave(function(){
  	$(".emotion img").attr("src","images/gsf/smile1.png");
  })
  	$('.emotion').qqFace({
		id : 'facebox', 
		assign:'saytext', 
		path:'arclist/'	//表情存放的路径
	});
	$(".sub_btn").click(function(){
		var str = $("#saytext").val();
		$("#show").html(replace_em(str));
	});

//查看结果
function replace_em(str){
	str = str.replace(/\</g,'&lt;');
	str = str.replace(/\>/g,'&gt;');
	str = str.replace(/\n/g,'<br/>');
	str = str.replace(/\[em_([0-9]*)\]/g,'<img src="arclist/$1.gif" border="0" />');
	return str;
}



})
