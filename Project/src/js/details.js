
var url = location.href;
//如果id不存在就返回列表页 

if (url.indexOf('id=') == -1) {
    location.href = '../html/index.html'
}
var id = location.search;
var idIndex = id.substr(id.indexOf('=') + 1);

//请求推荐商品数据
let ullist = document.querySelector('.reconmendlist ul')
function p(id) {
    let req = {
        userRecTwo: [
            {},
            {
                gid: id
            }
        ],
        topRank: [
            {
                gid: id
            }
        ],
        shop: [
            {
                gid: id
            }
        ],
        relateRecTwo: [
            {},
            {
                gid: id
            }
        ],
        newUserWelcome: [
            {},
            {}
        ],
        askInfo: {
            gid: id
        },
        content: [
            {},
            {
                gid: id,
                page: 1,
                pageSize: 3,
                type: 1
            }
        ],
        live: [
            {},
            {
                gid: id
            }
        ],
        liveTwo: [
            {},
            {
                gid: id
            }
        ],
        searchPlaceHolder: [
            {},
            {
                gid: id,
                baseParam: {
                    imei: "",
                    clientVersion: "",
                    ypClient: 1
                }
            }
        ]
    }
    let xhr = new XMLHttpRequest();
    xhr.open("post", "/mi/mtop/arch/detail/composeTwo");

    xhr.setRequestHeader(
        "Content-Type",
        "application/json;charset=UTF-8"
    );
    xhr.send(JSON.stringify(req));
    xhr.onload = function () {
        let res = JSON.parse(xhr.responseText)
        let data = res[2].data.recommendResponseList
        // console.log(data)
        ullist.innerHTML = data.map(item => {
            return `
            <li>
                                <div class="img-top">
                                    <img src=${item.data.goods.img800}
                                        alt="">
                                    <p>${item.data.goods.summary}</p>

                                </div>
                                <div class="detail">
                                    <div class="shoptitle">${item.data.goods.name}</div>
                                    <p class="price"><span>￥</span><span class="newprice">${item.data.goods.marketPrice / 100}</span></p>

                                </div>

                            </li>
            
            `

        }).join('')
    };
}
let recommend = p(idIndex * 1)




//读取本地存储 渲染标题与价格
let Contentname = document.querySelector('.name')
let Contentprice = document.querySelector('.price span')
let idname = localStorage.getItem(idIndex)
let idnames = JSON.parse(idname)

Contentname.innerHTML = idnames.name
Contentprice.innerHTML = idnames.price / 100

//请求图片数据 渲染大小图与商品详情
function p1() {
    let p = new Promise((resolve, reject) => {
        ajax({
            url: '/mi/api/zhaoshang/productDetailService/get',
            type: 'get',
            data: {
                gid: idIndex * 1,
                title: '商品详情',
                f: 'json',
            },
            success: function (res) {
                resolve(res)



            }
        })

    })
    return p
}
let imgs = p1()
let swiper1 = document.querySelector('.gallery-top .swiper-wrapper')
let swiper2 = document.querySelector('.gallery-thumbs .swiper-wrapper')
let imgcontent = document.querySelector('.content-two-left-details')
imgs.then(res => {
    res = JSON.parse(res)
    let data = res.rags
    // console.log(data)
    let newdata = data.filter((item) => {
        return item.editorName == "pic_link_full_default_empty"
    })
    let newdatas = newdata.slice(0, 6)
    swiper1.innerHTML = newdatas == '' ? '<div class="swiper-slide" style = "background-image:url(https://iconfont.alicdn.com/t/5a3101e2-5a86-4fa1-ad28-0b8713b58679.png)"</div> '
        : newdatas.map((item) => {
            return `
        <div class="swiper-slide"
                                style="background-image:url(${item.src})">
                            </div>
        `
        }).join('')
    swiper2.innerHTML = newdatas.map((item) => {
        return `
        <div class="swiper-slide"
                                style="background-image:url(${item.src})">
                            </div>
        `
    }).join('')
    imgcontent.innerHTML = data != '' ? data.map(item => {
        return item.editorName == "pic_link_full_default_empty" ?
            `<img src=${item.src} alt="">` : `<video src=${item.src} controls></video>`




    }).join('') : '<img src="https://iconfont.alicdn.com/t/5a3101e2-5a86-4fa1-ad28-0b8713b58679.png" alt="">'

})
//大小图切换 轮播图初始化
var galleryThumbs = new Swiper('.gallery-thumbs', {
    spaceBetween: 10,
    slidesPerView: 4,
    direction: 'vertical',

    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    observer: true,//修改swiper自己或子元素时，自动初始化swiper
    observeParents: true//修改swiper的父元素时，自动初始化swiper
});
var galleryTop = new Swiper('.gallery-top', {
    spaceBetween: 10,
    observer: true,//修改swiper自己或子元素时，自动初始化swiper
    observeParents: true,//修改swiper的父元素时，自动初始化swiper

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    thumbs: {
        swiper: galleryThumbs
    }
});


//数量加减
let buttons = document.querySelector('.num .btn-group')
let number = document.querySelector('.num .btn-group .number')
buttons.onclick = function (e) {
    var e = e || e.event
    if (e.target.classList.contains('add')) {
        // console.log(number.innerHTML)
        number.innerHTML = number.innerHTML * 1 + 1
        e.target.previousElementSibling.previousElementSibling.removeAttribute('disabled')
    }
    if (e.target.classList.contains('del')) {
        // console.log(number.innerHTML)
        number.innerHTML = number.innerHTML * 1 - 1
        // console.log(e.target.nextElementSibling.innerHTML)
        if (e.target.nextElementSibling.innerHTML == '1') {

            e.target.setAttribute("disabled", "disabled")

        }

    }

}

//常见问题数据请求
function quesp() {
    let p = new Promise((resolve, reject) => {
        ajax({
            url: '/mi/api/zhaoshang/productDetailService/get',
            type: 'get',
            data: {
                gid: idIndex * 1,
                title: '常见问题',
                f: 'json',
            },
            success: function (res) {
                resolve(res)

            }
        })

    })
    return p
}
let ques = quesp()
let quscontent = document.querySelector('.content-two-left-question')
// console.log(quscontent)
ques.then(res => {
    res = JSON.parse(res)
    let data = res.rags
    // console.log(data)
    quscontent.innerHTML = data.map(item => {
        return item.editorName == "pic_link_full_default_empty" ?
            `<img src=${item.src} alt="">` : `<video src=${item.src} controls></video>`

    }).join('')
})

//点击切换标签

let li = document.querySelectorAll('.content-two-left-nav li')
let div = document.querySelectorAll('.content-two-left-content div')
li = [...li]
div = [...div]
for (var i = 0; i < li.length; i++) {
    li[i].index = i;
    li[i].onclick = function () {
        for (var j = 0; j < li.length; j++) {
            li[j].className = ' ';
            div[j].style.display = 'none';
        }
        this.className = 'active';
        div[this.index].style.display = 'block';
        scrollTo({top:500,behavior:'smooth'})


    }
}

//内容导航栏固定
let Nav = document.querySelector('.content-two-left-nav')
let headerNav = document.querySelector('.header-nav-top')
window.onload = function () {

    document.onscroll = () => {
        switch (true) {
            case scrollY < 500:
                headerNav.classList.remove('nav-fix-active')
            case scrollY < 700:
                Nav.classList.remove('left-nav-active')
                 headerNav.style.width = '100%'
               
                break;
            case scrollY >= 500: headerNav.classList.add('nav-fix-active')
                Nav.style.width = '774px'
            case scrollY >= 700:
                Nav.classList.add('left-nav-active')




        }


    }
    //回到顶部
    let gettop = document.querySelector('.gettop')
    gettop.onclick = () => {

        scrollTo({
            top, behavior: 'smooth'
        })
    }

    //判断登录
    let cookie = document.cookie
    let act = document.querySelector('.act')
    if (cookie.indexOf('username') != -1) {
        let username = cookie.split('=')[1]
        act.innerHTML = `
    
     欢迎你，${username}

        <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2F2021%2Fedpic%2F84%2F02%2F8d%2F84028d1d4d86a2b2fa3d5675a1acbdf9_1.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1635227741&t=bd82c46bcf94ae1b7afa8b8fe782926d" alt="">
            <span class="lognout">退出登录</span>
    `
        //退出登录
        let lognout = document.querySelector('.lognout')
        console.log(lognout)
        lognout.onclick = () => {
            console.log(1)
            delCookie('username')
            window.location.href = location.href;

        }

    }
    //证照显示
    $(".post").hover(
        function () {
            $(".postActive").slideToggle();

        }
    );
}
