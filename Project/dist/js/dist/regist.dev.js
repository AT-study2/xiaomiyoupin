"use strict";jQuery.validator.addMethod("phoneTest",function(e){return!!/^1[3456789]\d{9}$/.test(e)}," 手机号格式不正确"),jQuery.validator.addMethod("passwordTest",function(e){return!!/((?=.*\d)(?=.*\D)|(?=.*[a-zA-Z])(?=.*[^a-zA-Z]))(?!^.*[\u4E00-\u9FA5].*$)/.test(e)},"密码必须至少包含字母、数字及标点符号中的2种"),jQuery.validator.addMethod("userTest",function(e){return!!/^([\u4e00-\u9fa5]{1,7}|[a-z]{1,14})$/.test(e)},"最长14个英文或7个汉字"),jQuery.validator.addMethod("yzmTest",function(e){return!!verifyCode.validate(e)},"验证码不匹配"),$(".form").validate({rules:{username:{userTest:!0},phone:{phoneTest:!0},password:{passwordTest:!0,rangelength:[8,14]},checkCode:{yzmTest:!0}},messages:{username:{required:"请输入用户名"},phone:{required:"请输入手机号"},password:{required:"请输入密码"},checkCode:{required:"请输入验证码"},checkbox:{required:"请勾选"}},errorElement:"em",submitHandler:function(e){$.ajax({url:"/api/regist.php",type:"post",data:{username:$("#username").val(),password:$("#pass").val(),tel:$("#phone").val()},dataType:"json",success:function(e){alert("".concat(e.msg)),window.location.href="./login.html"},error:function(e){alert("".concat(e.responseText)),window.location.href=location.href}})}});var verifyCode=new GVerify({id:"picyzm",length:6});