"use strict";$(".logn").click(function(e){e.preventDefault(),$.ajax({url:"/api/login.php",type:"post",data:{username:$("#username").val(),password:$("#pass").val()},dataType:"json",success:function(e){var a=$("#username").val();document.cookie="username=".concat(a,";path='/';"),alert(e.msg),window.location.href="./index.html"},error:function(e){alert("".concat(e.responseText)),window.location.href=location.href}})});