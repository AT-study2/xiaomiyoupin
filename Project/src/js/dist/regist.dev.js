"use strict";

jQuery.validator.addMethod('phoneTest', function (value) {
  var reg = /^1[3456789]\d{9}$/;

  if (reg.test(value)) {
    return true;
  }

  return false;
}, ' 手机号格式不正确');
jQuery.validator.addMethod('passwordTest', function (value) {
  var reg = /((?=.*\d)(?=.*\D)|(?=.*[a-zA-Z])(?=.*[^a-zA-Z]))(?!^.*[\u4E00-\u9FA5].*$)/;

  if (reg.test(value)) {
    return true;
  }

  return false;
}, '密码必须至少包含字母、数字及标点符号中的2种');
jQuery.validator.addMethod("userTest", function (value) {
  var reg = /^([\u4e00-\u9fa5]{1,7}|[a-z]{1,14})$/;

  if (reg.test(value)) {
    return true;
  }

  return false;
}, '最长14个英文或7个汉字');
jQuery.validator.addMethod("yzmTest", function (value) {
  var res = verifyCode.validate(value);

  if (res) {
    return true;
  }

  return false;
}, '验证码不匹配');
$('.form').validate({
  rules: {
    username: {
      userTest: true
    },
    phone: {
      phoneTest: true
    },
    password: {
      passwordTest: true,
      rangelength: [8, 14]
    },
    checkCode: {
      yzmTest: true
    }
  },
  messages: {
    username: {
      required: '请输入用户名'
    },
    phone: {
      required: '请输入手机号'
    },
    password: {
      required: '请输入密码'
    },
    checkCode: {
      required: '请输入验证码'
    },
    checkbox: {
      required: '请勾选'
    }
  },
  errorElement: "em",
  submitHandler: function submitHandler(form) {
    // console.log($('#username').val(), $('#password').val())
    // alert("提交事件!");
    $.ajax({
      url: '/api/regist.php',
      type: "post",
      data: {
        username: $('#username').val(),
        password: $('#pass').val(),
        tel: $('#phone').val()
      },
      dataType: 'json',
      success: function success(res) {
        // console.log(res)
        alert("".concat(res.msg));
        window.location.href = './login.html';
      },
      error: function error(res) {
        // console.log(res)
        alert("".concat(res.responseText));
        window.location.href = location.href;
      }
    });
  }
}); //验证码

var verifyCode = new GVerify({
  id: "picyzm",
  length: 6
}); // $(function () {
//     $('.form').bootstrapValidator({
//         message: 'This value is not valid',
//         feedbackIcons: {
//             valid: 'glyphicon glyphicon-ok',
//             invalid: 'glyphicon glyphicon-remove',
//             validating: 'glyphicon glyphicon-refresh'
//         },
//         fields: {
//             username: {
//                 message: '用户名验证失败',
//                 validators: {
//                     notEmpty: {
//                         message: '用户名不能为空'
//                     }
//                 }
//             },
//             phone: {
//                 validators: {
//                     notEmpty: {
//                         message: '电话不能为空'
//                     }
//                 }
//             }
//         }
//     });
// });