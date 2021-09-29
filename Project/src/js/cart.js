let content = document.querySelector('.contents');
let container = document.querySelector('.container')
let cookie1 = document.cookie;
cookie1 = cookie1.substr(cookie1.indexOf('=') + 1)
if (!cookie1) {
    localStorage.setItem("url", location.href);
    location.href = "../page/login.html";
}
//获取购物车数据  从数据库中获取id与数量 根据id读取本地存储数据进行渲染
getDate()
function getDate() {
    ajax({
        url: '/api/testgetcardata.php',
        type: 'post',
        data: {
            username: cookie1
        },
        success: function (res) {

            res = JSON.parse(res)
            let id_data = []
            res.forEach((item) => {
                let obj = {
                    id: item.goods_id,
                    num: item.goods_num
                }
                id_data.push(obj)
            })
            id_data.forEach(item => {
                let data = localStorage.getItem(item.id)
                data = JSON.parse(data)
                item.data = data;
                item.is_select = '0';

                // content.innerHTML += `
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


            })
            id_data = JSON.stringify(id_data)
            localStorage.setItem("cartdata", id_data);
            render()
            calculation()
        }
    })

}
//购物车渲染 
function render() {
    let data = JSON.parse(localStorage.getItem("cartdata"));
    content.innerHTML = data.map(item => {
        return `
                 <div class="media" idx=${item.id}>
                                <div class="media-left media-middle">
                                    <input type="checkbox" class='checked' ${item.is_select == "1" ? "checked" : ""
            } idx=${item.id}>
                                    <a href="#">
                                        <img
                                            class="media-object"
                                            src=${item.data.imgsrc}
                                            alt="..."
                                        />
                                    </a>
                                </div>
                                <div class="media-body">
                                    <h4 class="media-heading">
                                        ${item.data.name}
                                    </h4>
                                    <p class="price">
                                        <span
                                            class="glyphicon glyphicon glyphicon-jpy"
                                            aria-hidden="true"
                                        ></span>
                                        <span> ￥${item.data.price / 100}</span>
                                    </p>
                                    <div class="btns">
                                        <button class="btn btn-danger btn-sm">删除商品</button>
                                        <div class="btn-group" role="group">
                                            <button
                                                type="button"
                                                class="btn ${data.cart_number <= 1 ? 'disabled' : ''} btn-sm btn-default del"
                                            >
                                                -
                                            </button>
                                            <button
                                                type="button"
                                                class="btn btn-sm btn-default"
                                            >${item.num}</button>
                                            <button
                                                type="button"
                                                class="btn btn-sm btn-default add"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                </div>
                `
    }).join('')
}
function calculation() {
    let goodsQty = document.querySelector('.goodsQty')
    let goodsPrice = document.querySelector('.goodsPrice')
    let goodsType = document.querySelector('.goodsType')
    // 计算商品种类 和所选商品的数量 和价格
    // 获取本地存储中的数(据 来判断 所选商品的数量 和 价格
    let data = JSON.parse(localStorage.getItem("cartdata"));
    if (!data) {
        goodsType.innerHTML = 0;
        goodsPrice.innerText = 0
        goodsQty.innerText = 0
        return
    }
    goodsType.innerHTML = data.length;
    goodsQty.innerHTML = data.reduce((pre, item) => {
        if (item.is_select == "1") {
            return pre + item.num * 1;
        }
        return pre;
    }, 0);

    let goodsPriceTxt = data.reduce((pre, item) => {
        if (item.is_select == "1") {
            return pre + item.data.price / 100 * item.num;
        }
        return pre;
    }, 0);
    goodsPrice.innerHTML = goodsPriceTxt.toFixed(2);
}

container.onclick = function () {
    var e = e || window.event
    let allChecked = document.querySelector('.allChecked')
    //全选
    if (e.target.classList.contains('allChecked')) {

        let data = JSON.parse(localStorage.getItem("cartdata"));

        data.forEach(item => {
            item.is_select = e.target.checked ? "1" : "0";

        });
        localStorage.setItem('cartdata', JSON.stringify(data))

        calculation(data);
        render(data);
        // console.log(data)
    }
    //单选
    if (e.target.classList.contains("checked")) {
        let id = e.target.getAttribute('idx')

        let data = JSON.parse(localStorage.getItem("cartdata"));

        data.forEach(item => {
            if (item.id == id) {
                item.is_select = e.target.checked ? "1" : "0";
            }
        })
        // console.log(data)
        let flag = data.every((item) => {
            return item.is_select == "1";
        });
        allChecked.checked = flag;
        localStorage.setItem("cartdata", JSON.stringify(data));
        calculation(data);
        render(data);
        // console.log(data)

    }
    //删除
    if (e.target.classList.contains("btn-danger")) {
        let id = e.target.parentNode.parentNode.parentNode.getAttribute('idx')
        ajax({
            url: '/api/removeCarData.php',
            type: 'get',
            data: {
                username: cookie1,
                goods_id: id
            },
            success: function (res) {
                res = JSON.parse(res);
                if (!res.code) {
                    alert("删除失败");
                    return;
                }
                let data = JSON.parse(localStorage.getItem("cartdata"));

                data = data.filter((item) => {
                    return item.id != id * 1;
                });
                localStorage.setItem("cartdata", JSON.stringify(data));
                calculation(data);
                render(data)
            }
        })
    }

    //加减
    if (e.target.classList.contains('add')) {

        let num = e.target.previousElementSibling
        let nums = num.innerText * 1 + 1
        num.innerText = nums;
        // console.log(num.innerText)
        //大于1 移除禁止
        num.previousElementSibling.classList.remove('disabled')
        let id = e.target.parentNode.parentNode.parentNode.parentNode.getAttribute('idx')
        ajax({
            url: '/api/updCarData.php',
            type: 'get',
            data: {
                username: cookie1, goods_id: id,
                goods_num: nums
            },
            success: function (res) {

                res = JSON.parse(res);
                if (!res.code) return;
                let data = JSON.parse(localStorage.getItem("cartdata"));

                data.forEach((item) => {
                    if (item.id == id) {
                        item.num = nums;
                    }
                });

                localStorage.setItem("cartdata", JSON.stringify(data));
                calculation(data);
                render(data);
            }
        })

    }
    if (e.target.classList.contains('del')) {
        let num = e.target.nextElementSibling
        let nums = num.innerText * 1 - 1
        num.innerText = nums;
        // console.log(num.innerText * 1)
        //等于1 禁止减小
        if (num.innerText * 1 <= 1) {
            num.innerText = 1
            e.target.classList.add('disabled')
        }
        //传递数据进数据库
        let id = e.target.parentNode.parentNode.parentNode.parentNode.getAttribute('idx')
        ajax({
            url: '/api/updCarData.php',
            type: 'get',
            data: {
                username: cookie1, goods_id: id,
                goods_num: nums
            },
            success: function (res) {
                res = JSON.parse(res);
                if (!res.code) return;
                let data = JSON.parse(localStorage.getItem("cartdata"));

                data.forEach((item) => {
                    if (item.id == id) {
                        item.num = nums;
                    }
                });

                localStorage.setItem("cartdata", JSON.stringify(data));
                calculation(data);
                render(data);
            }
        })



    }
    //清空
    if (e.target.classList.contains('btn-warning')) {
        ajax({
            url: '/api/clearCarData.php',
            type: 'get',
            data: { username: cookie1 },
            success: function (res) {
                res = JSON.parse(res)
                localStorage.setItem('cartdata', null);
                let data = localStorage.getItem("cartdata");
                calculation();
                content.innerHTML = ''

            }
        })
    }

    //结算
    if (e.target.classList.contains('btn-success')) {
        let goodsQty = document.querySelector('.goodsQty')
        let goodsPrice = document.querySelector('.goodsPrice')
        let n = goodsQty.innerHTML
        let m = goodsPrice.innerHTML
        let res = confirm(`您已选中${n}件商品，共${m}元，确定支付吗`)
        if (res) {
            alert('支付成功')
            let data = JSON.parse(localStorage.getItem("cartdata"));
            let redata = data.filter((item) => {
                return item.is_select == '1';
            });
            data = data.filter((item) => {
                return item.is_select != '1';
            });
            localStorage.setItem("cartdata", JSON.stringify(data));
            calculation(data);
            render(data)
            //删除数据库数据
            let id_data = []
            redata.forEach(item => {
                id_data.push(item.id)
            })
            id_data.forEach(item=>{
                // console.log(item)
                ajax({
                    url: '/api/removeCarData.php',
                    type: 'get',
                    data: {
                        username: cookie1,
                        goods_id: item*1
                    },
                    success: function (res) {
                        res = JSON.parse(res);
                        if (!res.code) {
                            alert("删除失败");
                            return;
                        }
                        let data = JSON.parse(localStorage.getItem("cartdata"));

                        data = data.filter((items) => {
                            return items.id != item * 1;
                        });
                        localStorage.setItem("cartdata", JSON.stringify(data));
                        calculation(data);
                        render(data)


                    }
                })
                
            })
           
           
        }
        else {
            alert('支付失败')

        }

    }



}
