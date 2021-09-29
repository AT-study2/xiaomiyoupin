
//小米众筹 渲染
let ul1 = document.querySelector('.content-second ul')
let p1 = p()
p1.then((res) => {
    res = JSON.parse(res)
    let data = res.data.homepage.floors[3].data.items
    // console.log(data)
    ul1.innerHTML = data.map(function (item, index) {
        return index == 0 ? `<li data-id=${item.gid}>
            <div data-id=${item.gid} class="se-cont cont1">
                <img data-id=${item.gid} src=${item.pic_url}
                    alt="">
                <h3>${item.name}</h3>
                <p>${item.short_summary}</p>
                <div class ="second-price"><span>￥</span>${item.market_price / 100}</div>
            </div>
            <div class="progress" style="height: 2px;">
                <div class="progress-bar  bg-warning" role="progressbar" style="width: ${item.progress}%;"
                    aria-valuenow="${item.progress}" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <div class="pilun">
                <p><span class="num">${item.saled_count}</span>
                    <span>人支持</span>
                    ${item.tags ?
                `${item.tags.forEach(function (items) {
                    `<span class="hot">${items.name}</span>`
                })}` : ''}
                   
                </p>

                <span class="num2">${item.progress}<i>%</i></span>
            </div>
        </li>`: `<li data-id=${item.gid}>
            <div data-id=${item.gid} class="se-cont">
                <img data-id=${item.gid} src=${item.pic_url}
                    alt="">
                <h3>${item.name}</h3>
                <p>${item.short_summary}</p>
                <div class ="second-price"><span>￥</span>${item.market_price / 100}</div>
            </div>
            <div class="progress" style="height: 2px;">
                <div class="progress-bar  bg-warning" role="progressbar" style="width: ${item.progress}%;"
                    aria-valuenow="${item.progress}" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <div class="pilun">
                <p><span class="num">${item.saled_count}</span>
                    <span>人支持</span>
                   
                            ${item.tags ?
            `<span class="hot" style='background: ${item.tags[0].color}'> ${item.tags[0].name}</span>`
            : ''
        }

            
                   
                </p>

                <span class="num2">${item.progress}<i>%</i></span>
            </div>
        </li>`

    }).join('')
    //数据存储
    data.forEach(function (item) {
        let datas = {
            name: item.name,
            price: item.market_price,
            imgsrc: item.pic_url
        }
        let id = item.gid
        // console.log(datas)

        localStorage.setItem(id, JSON.stringify(datas))
    })
})
//小米秒杀 倒计时
let ul2 = document.querySelector('.seckill')
let timekill = document.querySelector('.time span')
let hour = document.querySelector('.hour')
let minute = document.querySelector('.minute')
let second = document.querySelector('.second')

let p2 = p()
p2.then((res) => {
    res = JSON.parse(res)
    let data = res.data.homepage.floors[6].data
    // console.log(data);

    //该时间为秒数
    let timea = data.start_time * 1000
    let time1 = new Date(timea)
    let time2 = formatDate(time1)
    //秒杀时间场次
    timekill.innerHTML = `${time2.hour}:${time2.min}`

    //秒杀倒计时 当前时间与结束时间相减
    setInterval(function () {
        let timeb = data.end_time * 1000
        let date2 = new Date(timeb)
        let date1 = new Date()
        let res = timeDifference(date2, date1)
        // console.log(res.h,res.m,res.s)
        hour.innerHTML = res.h;
        minute.innerHTML = res.m;
        second.innerHTML = res.s;

    })



    ul2.innerHTML = data.goods.map((item) => {
        return `
        <div class="swiper-slide" data-id=${item.gid}>
         <li data-id=${item.gid}>
                        <img data-id=${item.gid} src=${item.img}
                            alt="">
                        <div class="shoptitle">${item.name}</div>
                        <p class="price">
                            <span>￥</span>
                            <span class="newprice">${item.flash_price / 100}</span>
                            <span class="flag">起</span>
                            <span class="dol">￥</span>
                            <span class="oldprice">${item.market_price / 100}</span></p>
                    </li>
                    </div>
        
        `
    }).join('')
    //数据存储
    data.goods.forEach(function (item) {
        let datas = {
            name: item.name,
            price: item.flash_price,
            imgsrc: item.img
        }
        let id = item.gid
        // console.log(datas)

        localStorage.setItem(id, JSON.stringify(datas))
    })





})


//每日新品
let ul3 = document.querySelector('.seckill-2')
let p3 = p()
p3.then((res) => {
    res = JSON.parse(res)
    let data = res.data.homepage.floors[7].data.items
    ul3.innerHTML = data.map((item) => {
        return `<div class="swiper-slide">
                            <li data-id=${item.gid}>
                                <img data-id=${item.gid} src=${item.pic_url}
                                    alt="">
                                <div class="shoptitle">${item.short_name}</div>
                                <p class="desc">${item.short_summary}</p>
                                <p class="price">
                                    <span>￥</span>
                                    <span class="newprice">${item.market_price / 100}</span>
                                  </p>
                            </li>
                        </div>`

    }).join('')

    //数据存储
    data.forEach(function (item) {
        let datas = {
            name: item.name,
            price: item.market_price,
            imgsrc: item.pic_url
        }
        let id = item.gid
        // console.log(datas)

        localStorage.setItem(id, JSON.stringify(datas))
    })

})




//专属推荐
let ul4 = document.querySelector('.seckill-3')
let p4 = new Promise((resolve, reject) => {
    ajax({
        url: '/mi/homepage/main/v1005',
        type: 'post',
        data: {
            platform: 'pc'
        },
        success: function (res) {
            resolve(res)

        }
    })

})
p4.then((res) => {
    res = JSON.parse(res)
    let data = res.data.feeds.items
    // console.log(data)
    //筛选数据 把无效数据删除
    let data2 = data.filter((item) => {
        return item.data.goods != null
    })
    // console.log(data2)

    ul4.innerHTML = data2.map((item) => {
        return `
        
         <li data-id=${item.data.goods.gid}>
                        <div class="img-top">
                            <img data-id=${item.data.goods.gid} src=${item.data.goods.imgSquare}
                                alt="">
                            <p>${item.data.goods.summary}</p>

                        </div>
                        <div data-id=${item.data.goods.gid} class="detail">
                        <p class="tag-text">
                        ${item.data.goods.labels == 0 ? '' : `${item.data.goods.labels.map((items) => {
            return `${items.attrs.imageUrl != '' ? ` <img src=${items.attrs.imageUrl} alt="">` : `<span style='background:${items.attrs.bgColor}'>${items.name}</span>`}
                           
                            
                            `

        }).join('')}`}
                        </p>
                           
                            <div data-id=${item.data.goods.gid} class="shoptitle">${item.data.goods.name}</div>
                            <p class="price"><span>￥</span><span class="newprice">${item.data.goods.marketPrice / 100}</span></p>



                        </div>

                    </li>
        `
    }).join('')
    //数据存储
    data2.forEach(function (item) {
        let datas = {
            name: item.data.goods.name,
            price: item.data.goods.marketPrice,
            imgsrc: item.data.goods.imgSquare
        }
        let id = item.data.goods.gid
        // console.log(datas)

        localStorage.setItem(id, JSON.stringify(datas))
    })


})

//二级导航
let bannav = document.querySelector('.bannav ul')
let nav = document.querySelector('.nav-detail')
bannav.onmouseover = function (e) {
    var e = e || e.event
    nav.classList.add('show')
    if (e.target.classList.contains('nav2')) {
        let id = e.target.getAttribute('data-idx')
        let dataString = [{}, { catId: id }];
        var jsonString = JSON.stringify(dataString);
        let localname = e.target.innerHTML
        //第一次请求把数据存入本地存储，防止后面重复请求接口
        if (localStorage.getItem(localname) != null) {
            let res = localStorage.getItem(localname) 
            res = JSON.parse(res)
            let data = res.children
            //标题
            let cateName = document.querySelector('.cate-name')
            cateName.innerHTML = res.name
            //内容
            let subNav = document.querySelector('.sublist')
            subNav.innerHTML = data.map((item) => {
                return `
                 <div class="sub-nav-row">
                                <div class="sub-nav-item-row">
                                    <div class="category-2-item">
                                        <span class="name" title="${item.name}">${item.name}</span>
                                        <i class="iconfont icon-next"></i>
                                    </div>
                                    <div class="category-3-list">
                                    ${item.children.map((items) => {
                    return `
                                         <a href="" class="category-3-item items" data-id='${items.queryId}'>${items.smallImgCard.name}</a>
                                        `
                }).join('')}
                                    </div>
                                </div>
                            </div>
                
                `
            }).join('')
            return
        }
        let ps = navp(jsonString)
        ps.then((res) => {
            res = JSON.parse(res)
            let data = res.data.children
            // console.log(res)
            //标题
            let cateName = document.querySelector('.cate-name')
            cateName.innerHTML = res.data.name
            //内容
            let subNav = document.querySelector('.sublist')
            subNav.innerHTML = data.map((item) => {
                return `
                 <div class="sub-nav-row">
                                <div class="sub-nav-item-row">
                                    <div class="category-2-item">
                                        <span class="name" title="${item.name}">${item.name}</span>
                                        <i class="iconfont icon-next"></i>
                                    </div>
                                    <div class="category-3-list">
                                    ${item.children.map((items) => {
                    return `
                                         <a href="" class="category-3-item items" data-id='${items.queryId}'>${items.smallImgCard.name}</a>
                                        `
                }).join('')}
                                       
                


                                    </div>
                                </div>
                            </div>
                
                `
            }).join('')
            //数据存储
            localStorage.setItem(res.data.name, JSON.stringify(res.data))

        })
    }
    nav.onmousemove = function () {

        nav.classList.add('show')
        //跳转商品类别查询页面
        nav.onclick = ((e
        ) => {
            var e = e || e.event
            e.preventDefault()
            if (e.target.classList.contains('items')) {
                let id = e.target.getAttribute('data-id')
                location.href = '../html/goods.html?id=' + id
                // console.log(id)
            }

        })

    }
    nav.onmouseout = function (e) {
        nav.classList.remove('show')
    }

}
bannav.onmouseout = function (e) {
    nav.classList.remove('show')
}


//轮播图初始化
var mySwiper1 = new Swiper('.swiper2', {
    direction: 'horizontal', // 垂直切换选项
    loop: true, // 循环模式选项
    slidesPerView: 4,
    spaceBetween: 10,
    // 如果需要前进后退按钮
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        hideOnClick: true,
        hiddenClass: 'my-button-hidden',
    },
    observer: true,//修改swiper自己或子元素时，自动初始化swiper
    observeParents: true//修改swiper的父元素时，自动初始化swiper



})

var mySwiper2 = new Swiper('.swiper3', {
    direction: 'horizontal', // 垂直切换选项
    loop: true, // 循环模式选项
    slidesPerView: 4,
    spaceBetween: 10,
    // 如果需要前进后退按钮
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        hideOnClick: true,
        hiddenClass: 'my-button-hidden',
        disabledClass: 'my-button-disabled',
    },
    observer: true,//修改swiper自己或子元素时，自动初始化swiper
    observeParents: true//修改swiper的父元素时，自动初始化swiper


})


//请求页面数据
function p() {
    let p = new Promise((resolve, reject) => {
        ajax({
            url: '/mi/homepage/main/v1002',
            type: 'post',
            data: {
                platform: 'pc'
            },
            success: function (res) {
                resolve(res)



            }
        })

    })
    return p
}
function navp(ids) {
    let p = new Promise((resolve, reject) => {
        ajax({
            url: '/mi/mtop/market/cat/detail',
            type: 'post',
            data: ids,
            success: function (res) {
                resolve(res)



            }
        })

    })
    return p
}


//商品详情跳转
let content = document.querySelector('.content')

content.onclick = (e) => {

    var e = e || e.event
    if (e.target.getAttribute('data-id')) {
        let id = e.target.getAttribute('data-id')
        location.href = '../html/details.html?id=' + id
    }
}

//首页轮播图渲染
let carousel = document.querySelector('.carousel-inner')
let pbanner = p()
pbanner.then(res => {
    res = JSON.parse(res)
    // console.log(res);
    let data = res.data.homepage.floors[0].data.items
    // console.log(data);
    carousel.innerHTML = data.map((item, index) => {
        return index == 0 ? ` <div class="carousel-item active">
                        <img src=${item.pic_url}
                            class="d-block w-100" alt="...">
                    </div>`: `<div class="carousel-item">
                        <img src=${item.pic_url}
                            class="d-block w-100" alt="...">
                    </div>`
    }).join('')

})