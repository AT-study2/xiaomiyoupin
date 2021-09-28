function goodsp(ids) {
    let p = new Promise((resolve, reject) => {
        ajax({
            url: '/mi/mtop/market/search/v2/queryIdSearch',
            type: 'post',
            data: ids,
            success: function (res) {
                resolve(res)
            }
        })

    })
    return p
}

var url = location.href;
//如果id不存在就返回列表页 

if (url.indexOf('id=') == -1) {
    location.href = '../html/index.html'
    // console.log(url)
}
if(url.indexOf('undefined')!=-1){
    alert('程序媛罢工啦')
    location.href = '../html/index.html'
   
}
//获取地址参数 截取id
var id = location.search;
var idIndex = id.substr(id.indexOf('=') + 1);
// console.log(idIndex)
//筛选出id值相匹配的数据再进行渲染
let ids = goodsid.filter((item) => {
    return item.queryId == idIndex
})[0]
// console.log(ids)


let dataString = [
    {},ids
];
var jsonString = JSON.stringify(dataString);
let pps = goodsp(jsonString)
pps.then((res) => {
    res = JSON.parse(res)
    let data=res.data.data.goods
    console.log(data)
    // let alls=data.length
    let querynum = document.querySelector('.querynum span')
    querynum.innerHTML=data.length
    let goodslist = document.querySelector('.goodslist')
    goodslist.innerHTML=data.map((item)=>{
        return `
         <div class="goods" data-id=${item.data.goodsInfo.gid}>
                            <img src=${item.data.goodsInfo.imgSquare}
                                alt="" data-id=${item.data.goodsInfo.gid}>
                            <div class="goods-detail" >
                                <div class="name">${item.data.goodsInfo.name}</div>
                                <div class="price">
                                    ￥
                                    <span>${item.data.goodsInfo.priceMin/100}</span>
                                    起
                                    ${item.data.goodsInfo.priceMin == item.data.goodsInfo.marketPrice ? '' :`<span class="tip">特价</span>`}
                                    
                                </div>
                            </div>
                        </div>
        
        `
    }).join('')
    //数据存储
    data.forEach(function (item) {
        let datas = {
            name: item.data.goodsInfo.name,
            price: item.data.goodsInfo.marketPrice
        }
        let id = item.data.goodsInfo.gid
        // console.log(datas)

        localStorage.setItem(id, JSON.stringify(datas))
    })

})
//商品详情跳转
let content = document.querySelector('.content')

content.onclick = (e) => {

    var e = e || e.event
    if (e.target.getAttribute('data-id')) {
        let id = e.target.getAttribute('data-id')
        location.href = '../html/details.html?id=' + id
    }
}