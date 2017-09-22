$(document).ready(function(){
		var space=/^\S{0,}$/;//验证空格
		var numword=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{0,}$/;
		var isTruea=false;
		var isTrueb=false;
		var isTrue=false;
		var isphonenumber = /^1[3|4|5|8][0-9]\d{4,8}$/;

$("#name").blur(function(){
   var name=$("#name").val();
   if(name){
   	$("#aftername").html(".");
    $("#aftername").removeClass("error");
    $("#aftername").addClass("ok");
   }
   else{
   	$("#aftername").html("昵称不可为空!");
   	$("#aftername").removeClass("ok");
   	$("#aftername").addClass("error");
   }
})
//密码验证
$("#password").focus(function(){
	var innerhtml='<ul style="margin-top:-15px; color:gray ">'
	+'<li style="height:15px;list-style-type: none;" id="li1">'+'<span class="glyphicon glyphicon-hand-right" style="color: rgb(168, 167, 255);"></span>'+"长度为6-16个字符"+'</li>'
	+'<li style="height:15px;list-style-type: none;" id="li2">'+'<span class="glyphicon glyphicon-hand-right" style="color: rgb(168, 167, 255);"></span>'+"不能包含空格"+'</li>'
	+'<li style="height:15px;list-style-type: none;" id="li3">'+'<span class="glyphicon glyphicon-hand-right" style="color: rgb(168, 167, 255);"></span>'+"建议使用字母、数字组合"+'</li>'
	+'</ul>';
	 $("#afterpassword").removeClass("error");
	 $("#afterpassword").html(innerhtml);

	var changepassword1=setInterval(changepwd1,100);
	function changepwd1(){


		if($("#password").val().length<6&&$("#password").val().length!=0){
			isTruea=false;
			$("#li1").html('<span class="glyphicon glyphicon-hand-right" style="color: rgb(255, 79, 81);"></span>'+"长度小于6");
		}
		else if($("#password").val().length>=6&&$("#password").val().length<16){
			 isTruea=true;
			$("#li1").html('<span class="glyphicon glyphicon-hand-right" style="color: rgb(60, 163, 39);"></span>'+"长度合格");
		}
		else if($("#password").val().length>16){
			isTruea=false;
			$("#li1").html('<span class="glyphicon glyphicon-hand-right" style="color: rgb(255, 79, 81);"></span>'+"长度大于16");
		}
     }
   var changepassword2=setInterval(changepwd2,100);
   function changepwd2(){
	    if(space.test($("#password").val())&&$("#password").val().length>0){
	    	isTrueb=true;
	    $("#li2").html('<span class="glyphicon glyphicon-hand-right" style="color: rgb(60, 163, 39);"></span>'+"不包含空格");
	    }
	    else if(!space.test($("#password").val())){
	    	isTrueb=false;
        $("#li2").html('<span class="glyphicon glyphicon-hand-right" style="color: rgb(255, 79, 81);"></span>'+"不得包含空格");
	    } 
     }

   var changepassword3=setInterval(changepwd3,100);
        function changepwd3(){
	    if(numword.test($("#password").val())&&$("#password").val().length>0){
	    $("#li3").html('<span class="glyphicon glyphicon-hand-right" style="color: rgb(60, 163, 39);"></span>'+"已使用字母数字组合");
	    }
	    else if(!numword.test($("#password").val())){
        $("#li3").html('<span class="glyphicon glyphicon-hand-right" style="color: rgb(168, 167, 255);"></span>'+"建议使用字母、数字组合");
	    } 
     }

  
})

	$("#password").blur(function(){
	   var password=$("#password").val();
	   if(password){
	      $("#afterpassword").html("");
	      $("#afterpassword").removeClass("error");
	      
	   }
   else{
    $("#afterpassword").html("密码不可为空!");
   	$("#afterpassword").addClass("error");
   }
})


var chackrepassword=setInterval(checkrepwd,100);
function checkrepwd(){
	 if(isTrueb==true&&isTruea==true){
     	 isTrue=true;
     }
 if(isTrue==true){
	if($("#password").val()==$("#repassword").val()){
		$("#afterrepassword").html(".");
        $("#afterrepassword").removeClass("error");
		$("#afterrepassword").addClass("ok");
	}
	else{

		$("#afterrepassword").html(".");
		$("#afterrepassword").removeClass("ok");
		$("#afterrepassword").addClass("error");
	}
}
}

var chackyzm=setInterval(checkyzmm,100);
function checkyzmm(){
	if($("#yzm").val()!="3u29d"&&$("#yzm").val().length>0){
	   $("#afteryzm").removeClass("ok");
       $("#afteryzm").addClass("error");
	}
	else if($("#yzm").val().length==0){

	}
	else{
       $("#afteryzm").removeClass("error"); 
       $("#afteryzm").addClass("ok");
       $("#afteryzm").html(".");
	}
     }


$("#phone").blur(function(){
	if(isphonenumber.test($("#phone").val())){
		$("#afterphone").removeClass("error");
		$("#afterphone").addClass("ok");
	}
	else{
		$("#afterphone").removeClass("ok");
		$("#afterphone").addClass("error");
		
	}
})


})