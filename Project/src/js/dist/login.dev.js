"use strict";

// 
$('.logn').click(function (e) {
  e.preventDefault();
  $.ajax({
    url: '/api/login.php',
    type: "post",
    data: {
      username: $('#username').val(),
      password: $('#pass').val()
    },
    dataType: 'json',
    success: function success(res) {
      var username = $('#username').val();
      document.cookie = "username=".concat(username, ";path='/';");
      alert(res.msg);
      window.location.href = './index.html';
    },
    error: function error(res) {
      alert("".concat(res.responseText));
      window.location.href = location.href;
    }
  });
});