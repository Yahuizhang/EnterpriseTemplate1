$(document).ready(function(){
	var img = $(".play").parent().children('img');
    audio = document.getElementById("#audio");
    var img2=$(".singers").children('img');
    $(".info").css("width",img2.width());
    var toleft = (img2.parent().width() - img2.width())/2;
    $(".info").css("left",toleft + 15);
    $("#infoLong").css("width",$("#long").width());
    $("#infoLong").css("left",toleft + 40);
    $(".songList").css("width",img2.width());
    $(".songList").css("left",toleft + 15);
    $("#songListLong").css("width",$("#long").width());
    $("#songListLong").css("left",toleft + 40);
	$(".play").css("left",img.position().left + img.width()*4/5);
    $(".play").css("top",img.position().top + img.height()*4/5);
    $(".listen").css("left",img.position().left);
    $(".listen").css("top",img.position().top + img.height()*8/9); 
    $(window).resize(function() {
    var img = $(".play").parent().children('img');
    var img2=$(".singers").children('img');
    if(758<$(window).width()&&$(window).width()<992){
    $(".songList ul").css("display","none");
    $(".songList .playAll").css("left",0);
    $(".songList .playAll").css("top",200);
    }else{
      $(".songList ul").css("display","block");  
    }
    if($(window).width()>1190){
    console.log(11111);
    var toleft = (img2.parent().width() - img2.width())/2;
    $("#infoLong").css("left",toleft + 400);
    $("#songListLong").css("left",toleft + 40);
    }else{
    console.log(122);
    $("#infoLong").css("left",toleft + 15);
    $("#songListLong").css("left",toleft + 15);    
    }
    if($(window).width()<=758){
    var img2=$(".singers").children('img');
    var toleft = (img2.parent().width() - img2.width())/2;
    $(".info").css("left",toleft+15);
    $(".songList").css("width",img2.width());
    // $(".songList").css("left",toleft + 15);
    $("#songListLong").css("width",$("#long").width());
    $(".info").css("width",img2.width());
    $("#infoLong").css("width",$("#long").width());
    $("#infoLong").css("left",20);
    $(".play").css("left",img.parent().width()*3/5);
    $(".play").css("top",img.parent().height()*2/3+20);
    $(".listen").css("left",img.parent().width()*3/7-img.width()*2/7);
    $(".listen").css("top",img.position().top + img.height()*8/9);
    }else if($(window).width()>1199){
    console.log(11111);
    var toleft = (img2.parent().width() - img2.width())/2;
    $("#infoLong").css("left",toleft + 40);
    $("#songListLong").css("left",toleft + 40);
    }
    else{
    var img2=$(".singers").children('img');
    var toleft = (img2.parent().width() - img2.width())/2;
    $(".info").css("left",toleft + 15);
    $(".songList").css("width",img2.width());
    $(".songList").css("left",toleft + 15);
    $("#songListLong").css("width",$("#long").width());
    $("#songListLong").css("left",toleft + 15);    
    $(".info").css("width",img2.width());
    $("#infoLong").css("width",$("#long").width());
    $("#infoLong").css("left",toleft + 15);
    $(".play").css("left",img.position().left + img.width()*4/5);
    $(".play").css("top",img.position().top + img.height()*4/5);
    $(".listen").css("left",img.position().left);
    $(".listen").css("top",img.position().top + img.height()*8/9);  
    }
    });
    for(var i = 0 ; i < $(".songList ul li").length ; i++){
        $(".songList ul li").eq(i).attr("title",$(".songList ul li").eq(i).attr("name"));
    }
    
    addMusic($("#dj li"));
	$(".carousel").carousel({
		interval:2000
	})
	/*-------------------play鼠标移上显示----------------*/
	$(".simple").mouseenter(function(){
		$(this).children('a').css("display","block");
	}).mouseleave(function(){
		$(this).children('a').css("display","none");
	})
	/*-----------------------歌手-------------------------*/
	$(".singerSong .singers").mouseover(function(){
		$(".singerSong .songList").css("display","none");
		$(".singerSong .songList").eq(this.id).css("display","block");
		$(".singerSong .info").eq(this.id).css("display","none");
	}).mouseout(function(){
	    $(".singerSong .info").css("display","block");
		$(".singerSong .songList").css("display","none");
    })
    /*----------------歌手单曲---------------*/
    $(".songList ul li").click(function(){
        $(this).attr("imgSrc",$(this).parent().attr("src"));
        addMusic($(this));
        playImmediately();
    })
    $(".playAll").click(function(event){
        event.preventDefault();
        $(this).prev().children("li").attr("imgSrc",$(this).prev().attr("src"));
        addMusic($(this).prev().children("li"));
        playImmediately();
    })
    //播放单曲音乐
    $(".play").click(function(event){
    	event.preventDefault();
        var li = $(this).parent().children("ul").children();
        li.attr("imgSrc",$(this).parent().children("img").attr("src"));
        addMusic(li);
        playImmediately();
    })
})
