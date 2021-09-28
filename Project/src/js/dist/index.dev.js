"use strict";

//小米众筹 渲染
var ul1 = document.querySelector('.content-second ul');
var p1 = p();
p1.then(function (res) {
  res = JSON.parse(res);
  var data = res.data.homepage.floors[3].data.items; // console.log(data)

  ul1.innerHTML = data.map(function (item, index) {
    return index == 0 ? "<li data-id=".concat(item.gid, ">\n            <div data-id=").concat(item.gid, " class=\"se-cont cont1\">\n                <img data-id=").concat(item.gid, " src=").concat(item.pic_url, "\n                    alt=\"\">\n                <h3>").concat(item.name, "</h3>\n                <p>").concat(item.short_summary, "</p>\n                <div class =\"second-price\"><span>\uFFE5</span>").concat(item.market_price / 100, "</div>\n            </div>\n            <div class=\"progress\" style=\"height: 2px;\">\n                <div class=\"progress-bar  bg-warning\" role=\"progressbar\" style=\"width: ").concat(item.progress, "%;\"\n                    aria-valuenow=\"").concat(item.progress, "\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\n            </div>\n            <div class=\"pilun\">\n                <p><span class=\"num\">").concat(item.saled_count, "</span>\n                    <span>\u4EBA\u652F\u6301</span>\n                    ").concat(item.tags ? "".concat(item.tags.forEach(function (items) {
      "<span class=\"hot\">".concat(items.name, "</span>");
    })) : '', "\n                   \n                </p>\n\n                <span class=\"num2\">").concat(item.progress, "<i>%</i></span>\n            </div>\n        </li>") : "<li data-id=".concat(item.gid, ">\n            <div data-id=").concat(item.gid, " class=\"se-cont\">\n                <img data-id=").concat(item.gid, " src=").concat(item.pic_url, "\n                    alt=\"\">\n                <h3>").concat(item.name, "</h3>\n                <p>").concat(item.short_summary, "</p>\n                <div class =\"second-price\"><span>\uFFE5</span>").concat(item.market_price / 100, "</div>\n            </div>\n            <div class=\"progress\" style=\"height: 2px;\">\n                <div class=\"progress-bar  bg-warning\" role=\"progressbar\" style=\"width: ").concat(item.progress, "%;\"\n                    aria-valuenow=\"").concat(item.progress, "\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\n            </div>\n            <div class=\"pilun\">\n                <p><span class=\"num\">").concat(item.saled_count, "</span>\n                    <span>\u4EBA\u652F\u6301</span>\n                   \n                            ").concat(item.tags ? "<span class=\"hot\" style='background: ".concat(item.tags[0].color, "'> ").concat(item.tags[0].name, "</span>") : '', "\n\n            \n                   \n                </p>\n\n                <span class=\"num2\">").concat(item.progress, "<i>%</i></span>\n            </div>\n        </li>");
  }).join(''); //数据存储

  data.forEach(function (item) {
    var datas = {
      name: item.name,
      price: item.market_price
    };
    var id = item.gid; // console.log(datas)

    localStorage.setItem(id, JSON.stringify(datas));
  });
}); //小米秒杀 倒计时

var ul2 = document.querySelector('.seckill');
var timekill = document.querySelector('.time span');
var hour = document.querySelector('.hour');
var minute = document.querySelector('.minute');
var second = document.querySelector('.second');
var p2 = p();
p2.then(function (res) {
  res = JSON.parse(res);
  var data = res.data.homepage.floors[6].data; // console.log(data);
  //该时间为秒数

  var timea = data.start_time * 1000;
  var time1 = new Date(timea);
  var time2 = formatDate(time1); //秒杀时间场次

  timekill.innerHTML = "".concat(time2.hour, ":").concat(time2.min); //秒杀倒计时 当前时间与结束时间相减

  setInterval(function () {
    var timeb = data.end_time * 1000;
    var date2 = new Date(timeb);
    var date1 = new Date();
    var res = timeDifference(date2, date1); // console.log(res.h,res.m,res.s)

    hour.innerHTML = res.h;
    minute.innerHTML = res.m;
    second.innerHTML = res.s;
  });
  ul2.innerHTML = data.goods.map(function (item) {
    return "\n        <div class=\"swiper-slide\" data-id=".concat(item.gid, ">\n         <li data-id=").concat(item.gid, ">\n                        <img data-id=").concat(item.gid, " src=").concat(item.img, "\n                            alt=\"\">\n                        <div class=\"shoptitle\">").concat(item.name, "</div>\n                        <p class=\"price\">\n                            <span>\uFFE5</span>\n                            <span class=\"newprice\">").concat(item.flash_price / 100, "</span>\n                            <span class=\"flag\">\u8D77</span>\n                            <span class=\"dol\">\uFFE5</span>\n                            <span class=\"oldprice\">").concat(item.market_price / 100, "</span></p>\n                    </li>\n                    </div>\n        \n        ");
  }).join(''); //数据存储

  data.goods.forEach(function (item) {
    var datas = {
      name: item.name,
      price: item.flash_price
    };
    var id = item.gid; // console.log(datas)

    localStorage.setItem(id, JSON.stringify(datas));
  });
}); //每日新品

var ul3 = document.querySelector('.seckill-2');
var p3 = p();
p3.then(function (res) {
  res = JSON.parse(res);
  var data = res.data.homepage.floors[7].data.items;
  ul3.innerHTML = data.map(function (item) {
    return "<div class=\"swiper-slide\">\n                            <li data-id=".concat(item.gid, ">\n                                <img data-id=").concat(item.gid, " src=").concat(item.pic_url, "\n                                    alt=\"\">\n                                <div class=\"shoptitle\">").concat(item.short_name, "</div>\n                                <p class=\"desc\">").concat(item.short_summary, "</p>\n                                <p class=\"price\">\n                                    <span>\uFFE5</span>\n                                    <span class=\"newprice\">").concat(item.market_price / 100, "</span>\n                                  </p>\n                            </li>\n                        </div>");
  }).join(''); //数据存储

  data.forEach(function (item) {
    var datas = {
      name: item.name,
      price: item.market_price
    };
    var id = item.gid; // console.log(datas)

    localStorage.setItem(id, JSON.stringify(datas));
  });
}); //专属推荐

var ul4 = document.querySelector('.seckill-3');
var p4 = new Promise(function (resolve, reject) {
  ajax({
    url: '/mi/homepage/main/v1005',
    type: 'post',
    data: {
      platform: 'pc'
    },
    success: function success(res) {
      resolve(res);
    }
  });
});
p4.then(function (res) {
  res = JSON.parse(res);
  var data = res.data.feeds.items; // console.log(data)
  //筛选数据 把无效数据删除

  var data2 = data.filter(function (item) {
    return item.data.goods != null;
  }); // console.log(data2)

  ul4.innerHTML = data2.map(function (item) {
    return "\n        \n         <li data-id=".concat(item.data.goods.gid, ">\n                        <div class=\"img-top\">\n                            <img data-id=").concat(item.data.goods.gid, " src=").concat(item.data.goods.imgSquare, "\n                                alt=\"\">\n                            <p>").concat(item.data.goods.summary, "</p>\n\n                        </div>\n                        <div data-id=").concat(item.data.goods.gid, " class=\"detail\">\n                        <p class=\"tag-text\">\n                        ").concat(item.data.goods.labels == 0 ? '' : "".concat(item.data.goods.labels.map(function (items) {
      return "".concat(items.attrs.imageUrl != '' ? " <img src=".concat(items.attrs.imageUrl, " alt=\"\">") : "<span style='background:".concat(items.attrs.bgColor, "'>").concat(items.name, "</span>"), "\n                           \n                            \n                            ");
    }).join('')), "\n                        </p>\n                           \n                            <div data-id=").concat(item.data.goods.gid, " class=\"shoptitle\">").concat(item.data.goods.name, "</div>\n                            <p class=\"price\"><span>\uFFE5</span><span class=\"newprice\">").concat(item.data.goods.marketPrice / 100, "</span></p>\n\n\n\n                        </div>\n\n                    </li>\n        ");
  }).join(''); //数据存储

  data2.forEach(function (item) {
    var datas = {
      name: item.data.goods.name,
      price: item.data.goods.marketPrice
    };
    var id = item.data.goods.gid; // console.log(datas)

    localStorage.setItem(id, JSON.stringify(datas));
  });
}); //二级导航

var bannav = document.querySelector('.bannav ul');
var nav = document.querySelector('.nav-detail');

bannav.onmouseover = function (e) {
  var e = e || e.event;
  nav.classList.add('show');

  if (e.target.classList.contains('nav2')) {
    var id = e.target.getAttribute('data-idx');
    var dataString = [{}, {
      catId: id
    }];
    var jsonString = JSON.stringify(dataString);
    var localname = e.target.innerHTML; //第一次请求把数据存入本地存储，防止后面重复请求接口

    if (localStorage.getItem(localname) != null) {
      var res = localStorage.getItem(localname);
      res = JSON.parse(res);
      var data = res.children; //标题

      var cateName = document.querySelector('.cate-name');
      cateName.innerHTML = res.name; //内容

      var subNav = document.querySelector('.sublist');
      subNav.innerHTML = data.map(function (item) {
        return "\n                 <div class=\"sub-nav-row\">\n                                <div class=\"sub-nav-item-row\">\n                                    <div class=\"category-2-item\">\n                                        <span class=\"name\" title=\"".concat(item.name, "\">").concat(item.name, "</span>\n                                        <i class=\"iconfont icon-next\"></i>\n                                    </div>\n                                    <div class=\"category-3-list\">\n                                    ").concat(item.children.map(function (items) {
          return "\n                                         <a href=\"\" class=\"category-3-item items\" data-id='".concat(items.queryId, "'>").concat(items.smallImgCard.name, "</a>\n                                        ");
        }).join(''), "\n                                    </div>\n                                </div>\n                            </div>\n                \n                ");
      }).join('');
      return;
    }

    var ps = navp(jsonString);
    ps.then(function (res) {
      res = JSON.parse(res);
      var data = res.data.children; // console.log(res)
      //标题

      var cateName = document.querySelector('.cate-name');
      cateName.innerHTML = res.data.name; //内容

      var subNav = document.querySelector('.sublist');
      subNav.innerHTML = data.map(function (item) {
        return "\n                 <div class=\"sub-nav-row\">\n                                <div class=\"sub-nav-item-row\">\n                                    <div class=\"category-2-item\">\n                                        <span class=\"name\" title=\"".concat(item.name, "\">").concat(item.name, "</span>\n                                        <i class=\"iconfont icon-next\"></i>\n                                    </div>\n                                    <div class=\"category-3-list\">\n                                    ").concat(item.children.map(function (items) {
          return "\n                                         <a href=\"\" class=\"category-3-item items\" data-id='".concat(items.queryId, "'>").concat(items.smallImgCard.name, "</a>\n                                        ");
        }).join(''), "\n                                       \n                \n\n\n                                    </div>\n                                </div>\n                            </div>\n                \n                ");
      }).join(''); //数据存储

      localStorage.setItem(res.data.name, JSON.stringify(res.data));
    });
  }

  nav.onmousemove = function () {
    nav.classList.add('show'); //跳转商品类别查询页面

    nav.onclick = function (e) {
      var e = e || e.event;
      e.preventDefault();

      if (e.target.classList.contains('items')) {
        var _id = e.target.getAttribute('data-id');

        location.href = '../html/goods.html?id=' + _id; // console.log(id)
      }
    };
  };

  nav.onmouseout = function (e) {
    nav.classList.remove('show');
  };
};

bannav.onmouseout = function (e) {
  nav.classList.remove('show');
}; //轮播图初始化


var mySwiper1 = new Swiper('.swiper2', {
  direction: 'horizontal',
  // 垂直切换选项
  loop: true,
  // 循环模式选项
  slidesPerView: 4,
  spaceBetween: 10,
  // 如果需要前进后退按钮
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
    hideOnClick: true,
    hiddenClass: 'my-button-hidden'
  },
  observer: true,
  //修改swiper自己或子元素时，自动初始化swiper
  observeParents: true //修改swiper的父元素时，自动初始化swiper

});
var mySwiper2 = new Swiper('.swiper3', {
  direction: 'horizontal',
  // 垂直切换选项
  loop: true,
  // 循环模式选项
  slidesPerView: 4,
  spaceBetween: 10,
  // 如果需要前进后退按钮
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
    hideOnClick: true,
    hiddenClass: 'my-button-hidden',
    disabledClass: 'my-button-disabled'
  },
  observer: true,
  //修改swiper自己或子元素时，自动初始化swiper
  observeParents: true //修改swiper的父元素时，自动初始化swiper

}); //请求页面数据

function p() {
  var p = new Promise(function (resolve, reject) {
    ajax({
      url: '/mi/homepage/main/v1002',
      type: 'post',
      data: {
        platform: 'pc'
      },
      success: function success(res) {
        resolve(res);
      }
    });
  });
  return p;
}

function navp(ids) {
  var p = new Promise(function (resolve, reject) {
    ajax({
      url: '/mi/mtop/market/cat/detail',
      type: 'post',
      data: ids,
      success: function success(res) {
        resolve(res);
      }
    });
  });
  return p;
} //商品详情跳转


var content = document.querySelector('.content');

content.onclick = function (e) {
  var e = e || e.event;

  if (e.target.getAttribute('data-id')) {
    var id = e.target.getAttribute('data-id');
    location.href = '../html/details.html?id=' + id;
  }
}; //首页轮播图渲染


var carousel = document.querySelector('.carousel-inner');
var pbanner = p();
pbanner.then(function (res) {
  res = JSON.parse(res); // console.log(res);

  var data = res.data.homepage.floors[0].data.items; // console.log(data);

  carousel.innerHTML = data.map(function (item, index) {
    return index == 0 ? " <div class=\"carousel-item active\">\n                        <img src=".concat(item.pic_url, "\n                            class=\"d-block w-100\" alt=\"...\">\n                    </div>") : "<div class=\"carousel-item\">\n                        <img src=".concat(item.pic_url, "\n                            class=\"d-block w-100\" alt=\"...\">\n                    </div>");
  }).join('');
});