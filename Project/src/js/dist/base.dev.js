"use strict";

window.onload = function () {
  //回到顶部
  var gettop = document.querySelector('.gettop');

  gettop.onclick = function () {
    scrollTo({
      top: top,
      behavior: 'smooth'
    });
  }; //判断登录


  var cookie = document.cookie;
  var act = document.querySelector('.act');

  if (cookie.indexOf('username') != -1) {
    var username = cookie.split('=')[1];
    act.innerHTML = "\n    \n     \u6B22\u8FCE\u4F60\uFF0C".concat(username, "\n\n        <img src=\"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2F2021%2Fedpic%2F84%2F02%2F8d%2F84028d1d4d86a2b2fa3d5675a1acbdf9_1.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1635227741&t=bd82c46bcf94ae1b7afa8b8fe782926d\" alt=\"\">\n            <span class=\"lognout\">\u9000\u51FA\u767B\u5F55</span>\n    "); //退出登录

    var lognout = document.querySelector('.lognout');

    lognout.onclick = function () {
      delCookie('username');
      window.location.href = location.href;
    };
  } //证照显示


  $(".post").hover(function () {
    $(".postActive").slideToggle();
  }); //滚动条固定

  var headerNav = document.querySelector('.header-nav-top');

  document.onscroll = function () {
    if (scrollY >= 500) {
      headerNav.classList.add('nav-fix-active');
      headerNav.style.width = '100%';
    } else if (scrollY < 500) {
      headerNav.classList.remove('nav-fix-active');
    }
  };
};