/**
 * Created by Jackie on 2016/4/25.
 */
 var audio;
 var num = 1;
 var numMax = 1;
 var modalNum = 1;
 var ul = null;
 var volumeControl = false;
 var showList = false;
 var showPlayer = true;
$(function(){
     audio = document.getElementById("audio");
     // addMusic($(".music li"));
     // addMusic($(".music2 li"));
     // addMusic($(".music li"));
     // addMusic($(".music2 li"));
     setPositon();
     var progress = setInterval(timeAndModal, 50);
     //监听页面大小是否发生改变
     $(window).bind("resize", resizeWindow);
});
//设置不同模块初始位置
function setPositon(){
     $("#lock").css("top",-$("#lock").height());
     if($(".player").width()<992){
          $("#lock").css("left",$(".player").width()*0.8);
     }else if($(".player").width()<1085){
          $("#lock").css("left",$("#myList").offset().left + $("#lock").width());
     }else{
          $("#lock").css("left",$("#myList").offset().left + 2*$("#lock").width());
     }

     //设置音量调节模块的初始位置
     $(".voiceControl").css("top",-$(".voiceControl").height()-20);
     $(".voiceControl").css("left",$("#voice").offset().left - 7);
     //设置音乐列表模块的初始位置
     $(".myList").css("top",- $(".myList").height());
     if($(".player").width()<992){
          $(".myList").css("left",0+"px");
     }else{
          $(".myList").css("left",$("#myList").offset().left - $(".myList").width()+22);
     }
}
//添加音乐列表
function addMusic(musicUl) {
     var newList = musicUl.clone();
     for(var i = 0 ; i < newList.length ; i++){
          newList.eq(i).attr("title",musicUl.eq(i).attr("name"));
          newList.eq(i).html(musicUl.eq(i).attr("name"));
     }
     $(".musicList ul").prepend(newList);
     removeEvent();
     playMusic();
}
//多个列表时移除旧列表的事件
function removeEvent() {
     $(".musicList ul li").removeClass("selected");
     $("#mycontrol").unbind("click");
     $(".rewind").unbind("click");
     $(".fastforward").unbind("click");
     $("#voice").unbind("click");
     $("#myorder").unbind("click");
     $("#myList").unbind("click");
     $("#lock").unbind("click");
     $(".musicList ul li").unbind("click");
     $(".musicList ul li").unbind("mouseenter");
     $(".musicList ul li").unbind("mouseleave");
     $("#closeBtn").unbind("click");
}
//播放音乐
function playMusic(){
     var musicUl = $(".musicList ul li");
     numMax = musicUl.length;
     ul = musicUl;
     
     $("#musicNum").html("播放列表("+numMax+")");
     $("#audio").attr("src", musicUl.eq(num-1).attr("musicSrc"));
     $(".musicName").html(musicUl.eq(num-1).attr("name"));
     $("#mythem").attr("src",musicUl.eq(num-1).attr("imgSrc"));
     musicUl.eq(num-1).addClass("selected");
     // audio.play();
     // $("#mycontrol").removeClass("playing");
     // $("#mycontrol").addClass("playback");
     // $("#mycontrol").attr("title","播放");

     //鼠标移动到某首歌曲时的效果
     musicUl.mouseenter(function(){
          $(this).addClass("mouseMove");
     }).mouseleave(function(){
          $(this).removeClass("mouseMove");
     });
     //播放与暂停
     $("#mycontrol").click(function(){
          if(audio.paused==true){
               $(this).removeClass("playback");
               $(this).addClass("playing");
               $(this).attr("title","暂停");
               audio.play();
          }else{
               $(this).removeClass("playing");
               $(this).addClass("playback");
               $(this).attr("title","播放");
               audio.pause();
          }
     });
     //上一首
     $(".rewind").click(function(){
          if(num==1){
               num = numMax;
          }else{
               num--;
          }
          //console.log("num="+num);
          musicUl.removeClass("selected");
          musicUl.eq(num-1).addClass("selected");
          $("#audio").attr("src",musicUl.eq(num-1).attr("musicSrc"));
          $(".musicName").html(musicUl.eq(num-1).attr("name"));
          $("#mythem").attr("src",musicUl.eq(num-1).attr("imgSrc"));
          play();
     });
     //下一首
     $(".fastforward").click(function(){
          if(num==numMax){
               num = 1;
          }else{
               num++;
          }
          // console.log(num);
          musicUl.removeClass("selected");
          musicUl.eq(num-1).addClass("selected");
          $("#audio").attr("src",musicUl.eq(num-1).attr("musicSrc"));
          $(".musicName").html(musicUl.eq(num-1).attr("name"));
          $("#mythem").attr("src",musicUl.eq(num-1).attr("imgSrc"));
          play();
     })
     //播放某一首音乐
     musicUl.click(function(){
          $("#audio").attr("src",musicUl.eq($(this).index()).attr("musicSrc"));
          $(".musicName").html(musicUl.eq($(this).index()).attr("name"));
          $("#mythem").attr("src",musicUl.eq($(this).index()).attr("imgSrc"));
          num = $(this).index() + 1;
          musicUl.removeClass("selected");
          musicUl.eq($(this).index()).addClass("selected");
          play();
     });
     //音乐进度控制
     $("#myprogress").slider({
          max: 100,
          change:function(event,ui){
               var value = $(this).slider("option","value");
               $("#myprogress .pace").css("width",value + "%");
               audio.currentTime=audio.duration * (value/100);
               nowTime(audio.currentTime);
          }
     });
     //播放模式的选择
     $("#myorder").click(function(){
          modalNum++;
          if(modalNum ==4){
               modalNum = 1;
          }
          if(modalNum == 1){
               $(this).removeClass("order");
               $(this).addClass("loop");
               $("#audio").attr("loop","loop");
          }
          if(modalNum == 2){
               $(this).removeClass("loop");
               $(this).addClass("random");
               $("#audio").attr("loop",null);
          }
          if(modalNum == 3){
               $(this).removeClass("random");
               $(this).addClass("order");
               $("#audio").attr("loop",null);
          }
     });
     //打开或关闭音量调节模块
     $("#voice").click(function(){
          volumeControl = !volumeControl;
          if(volumeControl == true){
               $(".voiceControl").css("display","block");
          }else{
               $(".voiceControl").css("display","none");
          }
     });
     //打开或关闭音乐列表模块
     $("#myList").click(function(){
          showList = !showList;          
          if(showList == true){
               $(".myList").css("display","block");
               
          }else{
               $(".myList").css("display","none");
          }
     })
     //音乐列表的关闭按钮
     $("#closeBtn").click(function(){
          if(showList == true){
               $(".myList").css("display","none");
               showList = false;
          }
     })
     //调节声音大小
     $("#myvoice").slider({
          value:100,
          orientation: "vertical",
          change:function(){
               var value = $(this).slider("option","value");
               audio.volume = value/100;
               $("#myvoice .pace").css("top",(100-value)+"%");
               $("#myvoice .pace").css("height",value + "%");
          }
     });
     //是否锁定播放器
     $("#lock").click(function(){
          showPlayer = !showPlayer;
          if(showPlayer == false){
               $(this).removeClass("opened");
               $(this).addClass("closed");
               // $(".player").slideUp();
               $(".player").animate({bottom:-1*$(".player").height()},"slow");
               $(this).attr("title","显示");
          }else{
               $(this).removeClass("closed");
               $(this).addClass("opened");
               // $(".player").slideDown();
               $(".player").animate({bottom:0},"slow");
               $(this).attr("title","隐藏");
          }
     })
}
//立即播放
function playImmediately(){
     audio.play();
     $("#mycontrol").removeClass("playback");
     $("#mycontrol").addClass("playing");
     $("#mycontrol").attr("title","暂停");
}
//播放时按钮状态
function play(){
     $("#mycontrol").removeClass("playback");
     $("#mycontrol").addClass("playing");
     $("#mycontrol").attr("title","暂停");
     audio.play();
}

//改变时间 与 播放模式
function timeAndModal() {
     if (audio.paused == false) {
          nowTime(parseInt(audio.currentTime));
          var time = (audio.currentTime / audio.duration).toFixed(2);
          $("#myprogress span").css("left",audio.currentTime / audio.duration * 100 + "%")
          $("#myprogress .pace").css("width", audio.currentTime / audio.duration * 100 + "%");
     }
     //顺序播放
     if($("#myorder").hasClass("order")){
          // console.log("改变前"+num);
          if (audio.ended==true) {
               if(num==numMax){
                    num = 1;
               }else{
                    num++;
               }
               $("#audio").attr("src",ul.eq(num-1).attr("musicSrc"));
               $(".musicName").html(ul.eq(num-1).attr("name"));
               $("#mythem").attr("src",ul.eq(num-1).attr("imgSrc"));
               ul.removeClass("selected");
               ul.eq(num-1).addClass("selected");
               audio.play();
          }
     }
     //随机播放
     if($("#myorder").hasClass("random")){
          if(audio.ended==true){
               num = parseInt(Math.random()*numMax+1);
               $("#audio").attr("src",ul.eq(num-1).attr("musicSrc"));
               $(".musicName").html(ul.eq(num-1).attr("name"));
               $("#mythem").attr("src",ul.eq(num-1).attr("imgSrc"));
               ul.removeClass("selected");
               ul.eq(num-1).addClass("selected");
               audio.play();
          } 
     }
}

//计算当前的时间
function nowTime(current) {
     var minute = parseInt(current / 60);
     var second = parseInt(current % 60);
     if (second < 10) {
          $(".time").html("0"+minute + ":0" + second);
     } else {
          $(".time").html("0"+minute + ":" + second);
     }
}

//监听页面大小是否发生改变
function resizeWindow( e ) {
     //音量调节模块的位置
     $(".voiceControl").css("top",-$(".voiceControl").height()-20);
     $(".voiceControl").css("left",$("#voice").offset().left - 7);
     //音乐列表模块的位置
     $(".myList").css("top",- $(".myList").height());
     if($(".player").width()<992){
          $(".myList").css("left",0+"px");
     }else{
          $(".myList").css("left",$("#myList").offset().left - $(".myList").width()+22);
     }
     //播放器解锁或锁定按钮的位置
     $("#lock").css("top",-$("#lock").height());
     if($(".player").width()<992){
          //$("#lock").css("left",$("#myList").offset().left - $("#myList").width()*0.5);
          $("#lock").css("left",$(".player").width()*0.8);
     }else if($(".player").width()<1085){
          $("#lock").css("left",$("#myList").offset().left + $("#lock").width());
     }else{
          $("#lock").css("left",$("#myList").offset().left + 2*$("#lock").width());
     }
     //播放器收回后的位置
     if(showPlayer==false){
          $(".player").css("bottom",-1*$(".player").height());
     }else{
          $(".player").css("bottom",0);
     }
}

