//反射調用
var isClick=true;
var invokeFieldOrMethod = function(element, method) 
{
 var usablePrefixMethod;
 ["webkit", "moz", "ms", "o", ""].forEach(function(prefix) {
 if (usablePrefixMethod) return;
 if (prefix === "") {
 // 无前缀，方法首字母小写
method = method.slice(0,1).toLowerCase() + method.slice(1); 
 }
 var typePrefixMethod = typeof element[prefix + method];
 if (typePrefixMethod + "" !== "undefined") {
 if (typePrefixMethod === "function") {
 usablePrefixMethod = element[prefix + method]();
 } else {
 usablePrefixMethod = element[prefix + method];
 }
 }
 });

 return usablePrefixMethod;
};

//進入全屏
function launchFullscreen(element) 
 {
 //此方法不可以在異步任務中執行，否則火狐無法全屏
if(element.requestFullscreen) {
 element.requestFullscreen();
 } 
 else if(element.mozRequestFullScreen) {
 element.mozRequestFullScreen();
 } 
 else if(element.msRequestFullscreen){ 
 element.msRequestFullscreen(); 
 } 
 else if(element.oRequestFullscreen){
 element.oRequestFullscreen();
 }
 else if(element.webkitRequestFullscreen)
 {
 element.webkitRequestFullScreen();
 }
 else{
 var docHtml = document.documentElement;
 var docBody = document.body;
 var videobox = document.getElementById('videobox');
 var cssText = 'width:100%;height:100%;overflow:hidden;';
 // var pos=cssText+';'+'position:absolute;bottom:0px;z-index:3147483647';
 docHtml.style.cssText = cssText;
 docBody.style.cssText = cssText;
 videobox.style.cssText = cssText+';'+'margin:0px;padding:0px;';
 document.IsFullScreen = true;
 }
 }
//退出全屏
function exitFullscreen()
 {
 if (document.exitFullscreen) {
 document.exitFullscreen();
 } else if (document.msExitFullscreen) {
 document.msExitFullscreen();
 } else if (document.mozCancelFullScreen) {
 document.mozCancelFullScreen();
 } else if(document.oRequestFullscreen){
 document.oCancelFullScreen();
 }else if (document.webkitExitFullscreen){
 document.webkitExitFullscreen();
 }else{
 var docHtml = document.documentElement;
 var docBody = document.body;
 var videobox = document.getElementById('videobox');
 docHtml.style.cssText = "";
 docBody.style.cssText = "";
 videobox.style.cssText = "";
 document.IsFullScreen = false;
 }
 }
document.getElementById('fullScreenBtn').addEventListener('click',function(e){
	if(isClick){
		launchFullscreen(document.getElementById('myvideo'));
 $("#control").css({
	    "position":"absolute",
	    "bottom":"0px",
	    "z-index":5147483647
   })
  window.per = (w / e.offsetX).toFixed(3);
  window.vol = (w1 / e.offsetX).toFixed(1);
 var w = $(".progresser").width(),
    w1 = $(".volume .slider").width();
    if (window.per) {
         $(".progresser").css('width', (window.per * w).toFixed(0) + 'px');
        }
        if (window.vol) {
         $(".volume .slider").css('width', (window.vol * w1).toFixed(0) + 'px')
        }
        isClick=false;
	}
	else{
		exitFullscreen();
		isClick=true;
	}
 
},false);
      
        