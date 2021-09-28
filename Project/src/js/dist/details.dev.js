"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var url = location.href; //如果id不存在就返回列表页 

if (url.indexOf('id=') == -1) {
  location.href = '../html/index.html';
}

var id = location.search;
var idIndex = id.substr(id.indexOf('=') + 1); //请求推荐商品数据

var ullist = document.querySelector('.reconmendlist ul');

function p(id) {
  var req = {
    userRecTwo: [{}, {
      gid: id
    }],
    topRank: [{
      gid: id
    }],
    shop: [{
      gid: id
    }],
    relateRecTwo: [{}, {
      gid: id
    }],
    newUserWelcome: [{}, {}],
    askInfo: {
      gid: id
    },
    content: [{}, {
      gid: id,
      page: 1,
      pageSize: 3,
      type: 1
    }],
    live: [{}, {
      gid: id
    }],
    liveTwo: [{}, {
      gid: id
    }],
    searchPlaceHolder: [{}, {
      gid: id,
      baseParam: {
        imei: "",
        clientVersion: "",
        ypClient: 1
      }
    }]
  };
  var xhr = new XMLHttpRequest();
  xhr.open("post", "/mi/mtop/arch/detail/composeTwo");
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(JSON.stringify(req));

  xhr.onload = function () {
    var res = JSON.parse(xhr.responseText);
    var data = res[2].data.recommendResponseList; // console.log(data)

    ullist.innerHTML = data.map(function (item) {
      return "\n            <li>\n                                <div class=\"img-top\" data-id=".concat(item.data.goods.gid, ">\n                                    <img src=").concat(item.data.goods.img800, "\n                                        alt=\"\" data-id=").concat(item.data.goods.gid, ">\n                                    <p>").concat(item.data.goods.summary, "</p>\n\n                                </div>\n                                <div class=\"detail\" data-id=").concat(item.data.goods.gid, ">\n                                    <div class=\"shoptitle\">").concat(item.data.goods.name, "</div>\n                                    <p class=\"price\"><span>\uFFE5</span><span class=\"newprice\">").concat(item.data.goods.marketPrice / 100, "</span></p>\n\n                                </div>\n\n                            </li>\n            \n            ");
    }).join(''); //数据存储

    data.forEach(function (item) {
      var datas = {
        name: item.data.goods.name,
        price: item.data.goods.marketPrice
      };
      var id = item.data.goods.gid; // console.log(datas)

      localStorage.setItem(id, JSON.stringify(datas));
    });
  };
}

var recommend = p(idIndex * 1); //点击推荐的商品跳转至推荐商品页面

var content = document.querySelector('.reconmendlist');

content.onclick = function (e) {
  var e = e || e.event;

  if (e.target.getAttribute('data-id')) {
    var _id = e.target.getAttribute('data-id');

    location.href = '../html/details.html?id=' + _id;
  }
}; //读取本地存储 渲染标题与价格


var Contentname = document.querySelector('.name');
var Contentprice = document.querySelector('.price span');
var idname = localStorage.getItem(idIndex);
var idnames = JSON.parse(idname);
Contentname.innerHTML = idnames.name;
Contentprice.innerHTML = idnames.price / 100; //请求图片数据 渲染大小图与商品详情

function p1() {
  var p = new Promise(function (resolve, reject) {
    ajax({
      url: '/mi/api/zhaoshang/productDetailService/get',
      type: 'get',
      data: {
        gid: idIndex * 1,
        title: '商品详情',
        f: 'json'
      },
      success: function success(res) {
        resolve(res);
      }
    });
  });
  return p;
}

var imgs = p1();
var swiper1 = document.querySelector('.gallery-top .swiper-wrapper');
var swiper2 = document.querySelector('.gallery-thumbs .swiper-wrapper');
var imgcontent = document.querySelector('.content-two-left-details');
imgs.then(function (res) {
  res = JSON.parse(res);
  var data = res.rags; // console.log(data)

  var newdata = data.filter(function (item) {
    return item.editorName == "pic_link_full_default_empty";
  });
  var newdatas = newdata.slice(0, 6);
  swiper1.innerHTML = newdatas == '' ? '<div class="swiper-slide" style = "background-image:url(https://iconfont.alicdn.com/t/5a3101e2-5a86-4fa1-ad28-0b8713b58679.png)"</div> ' : newdatas.map(function (item) {
    return "\n        <div class=\"swiper-slide\"\n                                style=\"background-image:url(".concat(item.src, ")\">\n                            </div>\n        ");
  }).join('');
  swiper2.innerHTML = newdatas.map(function (item) {
    return "\n        <div class=\"swiper-slide\"\n                                style=\"background-image:url(".concat(item.src, ")\">\n                            </div>\n        ");
  }).join('');
  imgcontent.innerHTML = data != '' ? data.map(function (item) {
    return item.editorName == "pic_link_full_default_empty" ? "<img src=".concat(item.src, " alt=\"\">") : "<video src=".concat(item.src, " controls></video>");
  }).join('') : '<img src="https://iconfont.alicdn.com/t/5a3101e2-5a86-4fa1-ad28-0b8713b58679.png" alt="">';
}); //大小图切换 轮播图初始化

var galleryThumbs = new Swiper('.gallery-thumbs', {
  spaceBetween: 10,
  slidesPerView: 4,
  direction: 'vertical',
  freeMode: true,
  watchSlidesVisibility: true,
  watchSlidesProgress: true,
  observer: true,
  //修改swiper自己或子元素时，自动初始化swiper
  observeParents: true //修改swiper的父元素时，自动初始化swiper

});
var galleryTop = new Swiper('.gallery-top', {
  spaceBetween: 10,
  observer: true,
  //修改swiper自己或子元素时，自动初始化swiper
  observeParents: true,
  //修改swiper的父元素时，自动初始化swiper
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  thumbs: {
    swiper: galleryThumbs
  }
}); //数量加减

var buttons = document.querySelector('.num .btn-group');
var number = document.querySelector('.num .btn-group .number');

buttons.onclick = function (e) {
  var e = e || e.event;

  if (e.target.classList.contains('add')) {
    // console.log(number.innerHTML)
    number.innerHTML = number.innerHTML * 1 + 1;
    e.target.previousElementSibling.previousElementSibling.removeAttribute('disabled');
  }

  if (e.target.classList.contains('del')) {
    // console.log(number.innerHTML)
    number.innerHTML = number.innerHTML * 1 - 1; // console.log(e.target.nextElementSibling.innerHTML)

    if (e.target.nextElementSibling.innerHTML == '1') {
      e.target.setAttribute("disabled", "disabled");
    }
  }
}; //常见问题数据请求


function quesp() {
  var p = new Promise(function (resolve, reject) {
    ajax({
      url: '/mi/api/zhaoshang/productDetailService/get',
      type: 'get',
      data: {
        gid: idIndex * 1,
        title: '常见问题',
        f: 'json'
      },
      success: function success(res) {
        resolve(res);
      }
    });
  });
  return p;
}

var ques = quesp();
var quscontent = document.querySelector('.content-two-left-question'); // console.log(quscontent)

ques.then(function (res) {
  res = JSON.parse(res);
  var data = res.rags; // console.log(data)

  quscontent.innerHTML = data.map(function (item) {
    return item.editorName == "pic_link_full_default_empty" ? "<img src=".concat(item.src, " alt=\"\">") : "<video src=".concat(item.src, " controls></video>");
  }).join('');
}); //点击切换标签

var li = document.querySelectorAll('.content-two-left-nav li');
var div = document.querySelectorAll('.content-two-left-content div');
li = _toConsumableArray(li);
div = _toConsumableArray(div);

for (var i = 0; i < li.length; i++) {
  li[i].index = i;

  li[i].onclick = function () {
    for (var j = 0; j < li.length; j++) {
      li[j].className = ' ';
      div[j].style.display = 'none';
    }

    this.className = 'active';
    div[this.index].style.display = 'block';
    scrollTo({
      top: 500,
      behavior: 'smooth'
    });
  };
} //内容导航栏固定


var Nav = document.querySelector('.content-two-left-nav');
var headerNav = document.querySelector('.header-nav-top');

window.onload = function () {
  document.onscroll = function () {
    switch (true) {
      case scrollY < 500:
        headerNav.classList.remove('nav-fix-active');

      case scrollY < 700:
        Nav.classList.remove('left-nav-active');
        headerNav.style.width = '100%';
        break;

      case scrollY >= 500:
        headerNav.classList.add('nav-fix-active');
        Nav.style.width = '774px';

      case scrollY >= 700:
        Nav.classList.add('left-nav-active');
    }
  }; //回到顶部


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
    console.log(lognout);

    lognout.onclick = function () {
      console.log(1);
      delCookie('username');
      window.location.href = location.href;
    };
  } //证照显示


  $(".post").hover(function () {
    $(".postActive").slideToggle();
  });
};