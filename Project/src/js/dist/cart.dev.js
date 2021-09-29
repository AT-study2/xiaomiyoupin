"use strict";

var content = document.querySelector('.contents');
var container = document.querySelector('.container');
var cookie1 = document.cookie;
cookie1 = cookie1.substr(cookie1.indexOf('=') + 1);

if (!cookie1) {
  localStorage.setItem("url", location.href);
  location.href = "../page/login.html";
} //获取购物车数据  从数据库中获取id与数量 根据id读取本地存储数据进行渲染


getDate();

function getDate() {
  ajax({
    url: '/api/testgetcardata.php',
    type: 'post',
    data: {
      username: cookie1
    },
    success: function success(res) {
      res = JSON.parse(res);
      var id_data = [];
      res.forEach(function (item) {
        var obj = {
          id: item.goods_id,
          num: item.goods_num
        };
        id_data.push(obj);
      });
      id_data.forEach(function (item) {
        var data = localStorage.getItem(item.id);
        data = JSON.parse(data);
        item.data = data;
        item.is_select = '0'; // content.innerHTML += `
        //  <div class="media" idx=${item.id}>
        //                 <div class="media-left media-middle">
        //                     <input type="checkbox" class='checked' ${item.is_select == "1" ? "checked" : ""
        //     } idx=${item.id}>
        //                     <a href="#">
        //                         <img
        //                             class="media-object"
        //                             src=${data.imgsrc}
        //                             alt="..."
        //                         />
        //                     </a>
        //                 </div>
        //                 <div class="media-body">
        //                     <h4 class="media-heading">
        //                         ${data.name}
        //                     </h4>
        //                     <p class="price">
        //                         <span
        //                             class="glyphicon glyphicon glyphicon-jpy"
        //                             aria-hidden="true"
        //                         ></span>
        //                         <span> ￥${data.price / 100}</span>
        //                     </p>
        //                     <div class="btns">
        //                         <button class="btn btn-danger btn-sm">删除商品</button>
        //                         <div class="btn-group" role="group">
        //                             <button
        //                                 type="button"
        //                                 class="btn disabled btn-sm btn-default del"
        //                             >
        //                                 -
        //                             </button>
        //                             <button
        //                                 type="button"
        //                                 class="btn btn-sm btn-default"
        //                             >
        //                                 ${item.num}
        //                             </button>
        //                             <button
        //                                 type="button"
        //                                 class="btn btn-sm btn-default add"
        //                             >
        //                                 +
        //                             </button>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        // </div>
        // `
      });
      id_data = JSON.stringify(id_data);
      localStorage.setItem("cartdata", id_data);
      render();
      calculation();
    }
  });
} //购物车渲染 


function render() {
  var data = JSON.parse(localStorage.getItem("cartdata"));
  content.innerHTML = data.map(function (item) {
    return "\n                 <div class=\"media\" idx=".concat(item.id, ">\n                                <div class=\"media-left media-middle\">\n                                    <input type=\"checkbox\" class='checked' ").concat(item.is_select == "1" ? "checked" : "", " idx=").concat(item.id, ">\n                                    <a href=\"#\">\n                                        <img\n                                            class=\"media-object\"\n                                            src=").concat(item.data.imgsrc, "\n                                            alt=\"...\"\n                                        />\n                                    </a>\n                                </div>\n                                <div class=\"media-body\">\n                                    <h4 class=\"media-heading\">\n                                        ").concat(item.data.name, "\n                                    </h4>\n                                    <p class=\"price\">\n                                        <span\n                                            class=\"glyphicon glyphicon glyphicon-jpy\"\n                                            aria-hidden=\"true\"\n                                        ></span>\n                                        <span> \uFFE5").concat(item.data.price / 100, "</span>\n                                    </p>\n                                    <div class=\"btns\">\n                                        <button class=\"btn btn-danger btn-sm\">\u5220\u9664\u5546\u54C1</button>\n                                        <div class=\"btn-group\" role=\"group\">\n                                            <button\n                                                type=\"button\"\n                                                class=\"btn ").concat(data.cart_number <= 1 ? 'disabled' : '', " btn-sm btn-default del\"\n                                            >\n                                                -\n                                            </button>\n                                            <button\n                                                type=\"button\"\n                                                class=\"btn btn-sm btn-default\"\n                                            >").concat(item.num, "</button>\n                                            <button\n                                                type=\"button\"\n                                                class=\"btn btn-sm btn-default add\"\n                                            >\n                                                +\n                                            </button>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                </div>\n                ");
  }).join('');
}

function calculation() {
  var goodsQty = document.querySelector('.goodsQty');
  var goodsPrice = document.querySelector('.goodsPrice');
  var goodsType = document.querySelector('.goodsType'); // 计算商品种类 和所选商品的数量 和价格
  // 获取本地存储中的数(据 来判断 所选商品的数量 和 价格

  var data = JSON.parse(localStorage.getItem("cartdata"));

  if (!data) {
    goodsType.innerHTML = 0;
    goodsPrice.innerText = 0;
    goodsQty.innerText = 0;
    return;
  }

  goodsType.innerHTML = data.length;
  goodsQty.innerHTML = data.reduce(function (pre, item) {
    if (item.is_select == "1") {
      return pre + item.num * 1;
    }

    return pre;
  }, 0);
  var goodsPriceTxt = data.reduce(function (pre, item) {
    if (item.is_select == "1") {
      return pre + item.data.price / 100 * item.num;
    }

    return pre;
  }, 0);
  goodsPrice.innerHTML = goodsPriceTxt.toFixed(2);
}

container.onclick = function () {
  var e = e || window.event;
  var allChecked = document.querySelector('.allChecked'); //全选

  if (e.target.classList.contains('allChecked')) {
    var data = JSON.parse(localStorage.getItem("cartdata"));
    data.forEach(function (item) {
      item.is_select = e.target.checked ? "1" : "0";
    });
    localStorage.setItem('cartdata', JSON.stringify(data));
    calculation(data);
    render(data); // console.log(data)
  } //单选


  if (e.target.classList.contains("checked")) {
    var id = e.target.getAttribute('idx');

    var _data = JSON.parse(localStorage.getItem("cartdata"));

    _data.forEach(function (item) {
      if (item.id == id) {
        item.is_select = e.target.checked ? "1" : "0";
      }
    }); // console.log(data)


    var flag = _data.every(function (item) {
      return item.is_select == "1";
    });

    allChecked.checked = flag;
    localStorage.setItem("cartdata", JSON.stringify(_data));
    calculation(_data);
    render(_data); // console.log(data)
  } //删除


  if (e.target.classList.contains("btn-danger")) {
    var _id = e.target.parentNode.parentNode.parentNode.getAttribute('idx');

    ajax({
      url: '/api/removeCarData.php',
      type: 'get',
      data: {
        username: cookie1,
        goods_id: _id
      },
      success: function success(res) {
        res = JSON.parse(res);

        if (!res.code) {
          alert("删除失败");
          return;
        }

        var data = JSON.parse(localStorage.getItem("cartdata"));
        data = data.filter(function (item) {
          return item.id != _id * 1;
        });
        localStorage.setItem("cartdata", JSON.stringify(data));
        calculation(data);
        render(data);
      }
    });
  } //加减


  if (e.target.classList.contains('add')) {
    var num = e.target.previousElementSibling;
    var nums = num.innerText * 1 + 1;
    num.innerText = nums; // console.log(num.innerText)
    //大于1 移除禁止

    num.previousElementSibling.classList.remove('disabled');

    var _id2 = e.target.parentNode.parentNode.parentNode.parentNode.getAttribute('idx');

    ajax({
      url: '/api/updCarData.php',
      type: 'get',
      data: {
        username: cookie1,
        goods_id: _id2,
        goods_num: nums
      },
      success: function success(res) {
        res = JSON.parse(res);
        if (!res.code) return;
        var data = JSON.parse(localStorage.getItem("cartdata"));
        data.forEach(function (item) {
          if (item.id == _id2) {
            item.num = nums;
          }
        });
        localStorage.setItem("cartdata", JSON.stringify(data));
        calculation(data);
        render(data);
      }
    });
  }

  if (e.target.classList.contains('del')) {
    var _num = e.target.nextElementSibling;

    var _nums = _num.innerText * 1 - 1;

    _num.innerText = _nums; // console.log(num.innerText * 1)
    //等于1 禁止减小

    if (_num.innerText * 1 <= 1) {
      _num.innerText = 1;
      e.target.classList.add('disabled');
    } //传递数据进数据库


    var _id3 = e.target.parentNode.parentNode.parentNode.parentNode.getAttribute('idx');

    ajax({
      url: '/api/updCarData.php',
      type: 'get',
      data: {
        username: cookie1,
        goods_id: _id3,
        goods_num: _nums
      },
      success: function success(res) {
        res = JSON.parse(res);
        if (!res.code) return;
        var data = JSON.parse(localStorage.getItem("cartdata"));
        data.forEach(function (item) {
          if (item.id == _id3) {
            item.num = _nums;
          }
        });
        localStorage.setItem("cartdata", JSON.stringify(data));
        calculation(data);
        render(data);
      }
    });
  } //清空


  if (e.target.classList.contains('btn-info')) {
    ajax({
      url: '/api/clearCarData.php',
      type: 'get',
      data: {
        username: cookie1
      },
      success: function success(res) {
        res = JSON.parse(res);
        localStorage.setItem('cartdata', null);
        var data = localStorage.getItem("cartdata");
        calculation();
        content.innerHTML = '';
      }
    });
  } //结算


  if (e.target.classList.contains('btn-success')) {
    var goodsQty = document.querySelector('.goodsQty');
    var goodsPrice = document.querySelector('.goodsPrice');
    var n = goodsQty.innerHTML;
    var m = goodsPrice.innerHTML;
    var res = confirm("\u60A8\u5DF2\u9009\u4E2D".concat(n, "\u4EF6\u5546\u54C1\uFF0C\u5171").concat(m, "\u5143\uFF0C\u786E\u5B9A\u652F\u4ED8\u5417"));

    if (res) {
      alert('支付成功');

      var _data2 = JSON.parse(localStorage.getItem("cartdata"));

      var redata = _data2.filter(function (item) {
        return item.is_select == '1';
      });

      _data2 = _data2.filter(function (item) {
        return item.is_select != '1';
      });
      localStorage.setItem("cartdata", JSON.stringify(_data2));
      calculation(_data2);
      render(_data2); //删除数据库数据

      var id_data = [];
      redata.forEach(function (item) {
        id_data.push(item.id);
      });
      id_data.forEach(function (item) {
        // console.log(item)
        ajax({
          url: '/api/removeCarData.php',
          type: 'get',
          data: {
            username: cookie1,
            goods_id: item * 1
          },
          success: function success(res) {
            res = JSON.parse(res);

            if (!res.code) {
              alert("删除失败");
              return;
            }

            var data = JSON.parse(localStorage.getItem("cartdata"));
            data = data.filter(function (items) {
              return items.id != item * 1;
            });
            localStorage.setItem("cartdata", JSON.stringify(data));
            calculation(data);
            render(data);
          }
        });
      });
    } else {
      alert('支付失败');
    }
  }
};