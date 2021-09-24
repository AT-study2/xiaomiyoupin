jQuery.validator.addMethod('phoneTest',
    function (value) {
        let reg = /^1[3456789]\d{9}$/
        if (reg.test(value)) {
            return true
        }
        return false
    },
    ' 手机号格式不正确'
)
jQuery.validator.addMethod('passwordTest',
    function (value) {
        let reg = /((?=.*\d)(?=.*\D)|(?=.*[a-zA-Z])(?=.*[^a-zA-Z]))(?!^.*[\u4E00-\u9FA5].*$)/
        if (reg.test(value)) {
            return true
        }
        return false
    },
    '密码必须至少包含字母、数字及标点符号中的2种'
)

$('#form').validate({
    rules: {
        phone: {
            required: true,
            phoneTest: true
        },
        password: {
            required: true,
            passwordTest: true,
            rangelength: [8, 14]
        },
        checkCode: {
            required: true,
            equalTo: '.inp1'
        },
        checkbox: {
            required: true
        }


    },
    messages: {
        username: {
            required: '请输入用户名',
        },
        phone: {
            required: '请输入手机号',
        },
        password: {
            required: '请输入密码',
        },
        checkCode: {
            required: '请输入验证码',
            equalTo: '验证不正确'
        },
        checkbox: {
            required: '请勾选',
        }


    }
    , errorElement: "em"
    ,
    submitHandler: function (form) {
        // console.log($('#username').val(), $('#password').val())

        alert("提交事件!");
        // $.ajax({
        //     url: '/api/regist.php',
        //     type: "post",
        //     data: {
        //         username: $('#username').val(),
        //         password: $('#password').val(),
        //         tel: $('#phone').val()
        //     },
        //     dataType: 'json',
        //     success(res) {
        //         console.log(res)
        //         alert(`${res.msg}`)
        //         window.location.href = './login.html';

        //     },
        //     error(res) {
        //         console.log(res)
        //         alert(`${res.responseText}`)
        //         window.location.href = location.href;

        //     }
        // }

        // );
    },
}

)

//验证码
let verifyCode = new GVerify({
    id: "picyzm",
    length: 6
});

