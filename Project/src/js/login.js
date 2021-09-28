// 
$('.logn').click(function (e) {
    e.preventDefault();
    $.ajax({
        url: '/api/login.php',
        type: "post",
        data: {
            username: $('#username').val(),
            password: $('#pass').val(),
        },
        dataType: 'json',
        success(res) {
            let username = $('#username').val()
            document.cookie = `username=${username};path='/';`
            alert(res.msg)
            window.location.href = './index.html';
        },
        error(res) {
            alert(`${res.responseText}`)

            window.location.href = location.href;

        }

    })
})



