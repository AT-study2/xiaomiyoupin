"use strict";

function goodsp(ids) {
  var p = new Promise(function (resolve, reject) {
    ajax({
      url: '/mi/mtop/market/search/v2/queryIdSearch',
      type: 'post',
      data: ids,
      success: function success(res) {
        resolve(res);
      }
    });
  });
  return p;
}

var url = location.href; //如果id不存在就返回列表页 

if (url.indexOf('id=') == -1) {
  location.href = '../html/index.html'; // console.log(url)
}

if (url.indexOf('undefined') != -1) {
  alert('程序媛罢工啦');
  location.href = '../html/index.html';
} //获取地址参数 截取id


var id = location.search;
var idIndex = id.substr(id.indexOf('=') + 1); // console.log(idIndex)
//筛选出id值相匹配的数据再进行渲染

var ids = goodsid.filter(function (item) {
  return item.queryId == idIndex;
})[0]; // console.log(ids)

var dataString = [{}, ids];
var jsonString = JSON.stringify(dataString);
var pps = goodsp(jsonString);
pps.then(function (res) {
  res = JSON.parse(res);
  var data = res.data.data.goods;
  console.log(data); // let alls=data.length

  var querynum = document.querySelector('.querynum span');
  querynum.innerHTML = data.length;
  var goodslist = document.querySelector('.goodslist');
  goodslist.innerHTML = data.map(function (item) {
    return "\n         <div class=\"goods\" data-id=".concat(item.data.goodsInfo.gid, ">\n                            <img src=").concat(item.data.goodsInfo.imgSquare, "\n                                alt=\"\" data-id=").concat(item.data.goodsInfo.gid, ">\n                            <div class=\"goods-detail\" >\n                                <div class=\"name\">").concat(item.data.goodsInfo.name, "</div>\n                                <div class=\"price\">\n                                    \uFFE5\n                                    <span>").concat(item.data.goodsInfo.priceMin / 100, "</span>\n                                    \u8D77\n                                    ").concat(item.data.goodsInfo.priceMin == item.data.goodsInfo.marketPrice ? '' : "<span class=\"tip\">\u7279\u4EF7</span>", "\n                                    \n                                </div>\n                            </div>\n                        </div>\n        \n        ");
  }).join(''); //数据存储

  data.forEach(function (item) {
    var datas = {
      name: item.data.goodsInfo.name,
      price: item.data.goodsInfo.marketPrice
    };
    var id = item.data.goodsInfo.gid; // console.log(datas)

    localStorage.setItem(id, JSON.stringify(datas));
  });
}); //商品详情跳转

var content = document.querySelector('.content');

content.onclick = function (e) {
  var e = e || e.event;

  if (e.target.getAttribute('data-id')) {
    var _id = e.target.getAttribute('data-id');

    location.href = '../html/details.html?id=' + _id;
  }
};