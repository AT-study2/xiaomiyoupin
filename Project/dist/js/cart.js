"use strict";var content=document.querySelector(".contents"),container=document.querySelector(".container"),cookie1=document.cookie;function getDate(){ajax({url:"/api/testgetcardata.php",type:"post",data:{username:cookie1},success:function(t){t=JSON.parse(t);var a=[];t.forEach(function(t){var e={id:t.goods_id,num:t.goods_num};a.push(e)}),a.forEach(function(t){var e=localStorage.getItem(t.id);e=JSON.parse(e),t.data=e,t.is_select="0"}),a=JSON.stringify(a),localStorage.setItem("cartdata",a),render(),calculation()}})}function render(){var e=JSON.parse(localStorage.getItem("cartdata"));content.innerHTML=e.map(function(t){return'\n                 <div class="media" idx='+t.id+'>\n                                <div class="media-left media-middle">\n                                    <input type="checkbox" class=\'checked\' '+("1"==t.is_select?"checked":"")+" idx="+t.id+'>\n                                    <a href="#">\n                                        <img\n                                            class="media-object"\n                                            src='+t.data.imgsrc+'\n                                            alt="..."\n                                        />\n                                    </a>\n                                </div>\n                                <div class="media-body">\n                                    <h4 class="media-heading">\n                                        '+t.data.name+'\n                                    </h4>\n                                    <p class="price">\n                                        <span\n                                            class="glyphicon glyphicon glyphicon-jpy"\n                                            aria-hidden="true"\n                                        ></span>\n                                        <span> ￥'+t.data.price/100+'</span>\n                                    </p>\n                                    <div class="btns">\n                                        <button class="btn btn-danger btn-sm">删除商品</button>\n                                        <div class="btn-group" role="group">\n                                            <button\n                                                type="button"\n                                                class="btn '+(e.cart_number<=1?"disabled":"")+' btn-sm btn-default del"\n                                            >\n                                                -\n                                            </button>\n                                            <button\n                                                type="button"\n                                                class="btn btn-sm btn-default"\n                                            >'+t.num+'</button>\n                                            <button\n                                                type="button"\n                                                class="btn btn-sm btn-default add"\n                                            >\n                                                +\n                                            </button>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                </div>\n                '}).join("")}function calculation(){var t=document.querySelector(".goodsQty"),e=document.querySelector(".goodsPrice"),a=document.querySelector(".goodsType"),n=JSON.parse(localStorage.getItem("cartdata"));if(!n)return a.innerHTML=0,e.innerText=0,void(t.innerText=0);a.innerHTML=n.length,t.innerHTML=n.reduce(function(t,e){return"1"==e.is_select?t+1*e.num:t},0);var r=n.reduce(function(t,e){return"1"==e.is_select?t+e.data.price/100*e.num:t},0);e.innerHTML=r.toFixed(2)}(cookie1=cookie1.substr(cookie1.indexOf("=")+1))||(localStorage.setItem("url",location.href),location.href="../page/login.html"),getDate(),container.onclick=function(){var e=e||window.event,t=document.querySelector(".allChecked");if(e.target.classList.contains("allChecked")){var a=JSON.parse(localStorage.getItem("cartdata"));a.forEach(function(t){t.is_select=e.target.checked?"1":"0"}),localStorage.setItem("cartdata",JSON.stringify(a)),calculation(a),render(a)}if(e.target.classList.contains("checked")){var n=e.target.getAttribute("idx"),r=JSON.parse(localStorage.getItem("cartdata"));r.forEach(function(t){t.id==n&&(t.is_select=e.target.checked?"1":"0")});var c=r.every(function(t){return"1"==t.is_select});t.checked=c,localStorage.setItem("cartdata",JSON.stringify(r)),calculation(r),render(r)}if(e.target.classList.contains("btn-danger")){var o=e.target.parentNode.parentNode.parentNode.getAttribute("idx");ajax({url:"/api/removeCarData.php",type:"get",data:{username:cookie1,goods_id:o},success:function(t){if((t=JSON.parse(t)).code){var e=JSON.parse(localStorage.getItem("cartdata"));e=e.filter(function(t){return t.id!=1*o}),localStorage.setItem("cartdata",JSON.stringify(e)),calculation(e),render(e)}else alert("删除失败")}})}if(e.target.classList.contains("add")){var i=e.target.previousElementSibling,s=1*i.innerText+1;i.innerText=s,i.previousElementSibling.classList.remove("disabled");var d=e.target.parentNode.parentNode.parentNode.parentNode.getAttribute("idx");ajax({url:"/api/updCarData.php",type:"get",data:{username:cookie1,goods_id:d,goods_num:s},success:function(t){if((t=JSON.parse(t)).code){var e=JSON.parse(localStorage.getItem("cartdata"));e.forEach(function(t){t.id==d&&(t.num=s)}),localStorage.setItem("cartdata",JSON.stringify(e)),calculation(e),render(e)}}})}if(e.target.classList.contains("del")){var l=e.target.nextElementSibling,u=1*l.innerText-1;l.innerText=u,1*l.innerText<=1&&(l.innerText=1,e.target.classList.add("disabled"));var g=e.target.parentNode.parentNode.parentNode.parentNode.getAttribute("idx");ajax({url:"/api/updCarData.php",type:"get",data:{username:cookie1,goods_id:g,goods_num:u},success:function(t){if((t=JSON.parse(t)).code){var e=JSON.parse(localStorage.getItem("cartdata"));e.forEach(function(t){t.id==g&&(t.num=u)}),localStorage.setItem("cartdata",JSON.stringify(e)),calculation(e),render(e)}}})}if(e.target.classList.contains("btn-info")&&ajax({url:"/api/clearCarData.php",type:"get",data:{username:cookie1},success:function(t){t=JSON.parse(t),localStorage.setItem("cartdata",null);localStorage.getItem("cartdata");calculation(),content.innerHTML=""}}),e.target.classList.contains("btn-success")){var p=document.querySelector(".goodsQty"),m=document.querySelector(".goodsPrice"),f=p.innerHTML,S=m.innerHTML;if(confirm("您已选中"+f+"件商品，共"+S+"元，确定支付吗")){alert("支付成功");var b=JSON.parse(localStorage.getItem("cartdata")),v=b.filter(function(t){return"1"==t.is_select});b=b.filter(function(t){return"1"!=t.is_select}),localStorage.setItem("cartdata",JSON.stringify(b)),calculation(b),render(b);var h=[];v.forEach(function(t){h.push(t.id)}),h.forEach(function(a){ajax({url:"/api/removeCarData.php",type:"get",data:{username:cookie1,goods_id:1*a},success:function(t){if((t=JSON.parse(t)).code){var e=JSON.parse(localStorage.getItem("cartdata"));e=e.filter(function(t){return t.id!=1*a}),localStorage.setItem("cartdata",JSON.stringify(e)),calculation(e),render(e)}else alert("删除失败")}})})}else alert("支付失败")}};