"use strict";var ul1=document.querySelector(".content-second ul"),p1=p();p1.then(function(n){var a=(n=JSON.parse(n)).data.homepage.floors[3].data.items;ul1.innerHTML=a.map(function(n,a){return 0==a?"<li data-id="+n.gid+">\n            <div data-id="+n.gid+' class="se-cont cont1">\n                <img data-id='+n.gid+" src="+n.pic_url+'\n                    alt="">\n                <h3>'+n.name+"</h3>\n                <p>"+n.short_summary+'</p>\n                <div class ="second-price"><span>￥</span>'+n.market_price/100+'</div>\n            </div>\n            <div class="progress" style="height: 2px;">\n                <div class="progress-bar  bg-warning" role="progressbar" style="width: '+n.progress+'%;"\n                    aria-valuenow="'+n.progress+'" aria-valuemin="0" aria-valuemax="100"></div>\n            </div>\n            <div class="pilun">\n                <p><span class="num">'+n.saled_count+"</span>\n                    <span>人支持</span>\n                    "+(n.tags?""+n.tags.forEach(function(n){n.name}):"")+'\n                   \n                </p>\n\n                <span class="num2">'+n.progress+"<i>%</i></span>\n            </div>\n        </li>":"<li data-id="+n.gid+">\n            <div data-id="+n.gid+' class="se-cont">\n                <img data-id='+n.gid+" src="+n.pic_url+'\n                    alt="">\n                <h3>'+n.name+"</h3>\n                <p>"+n.short_summary+'</p>\n                <div class ="second-price"><span>￥</span>'+n.market_price/100+'</div>\n            </div>\n            <div class="progress" style="height: 2px;">\n                <div class="progress-bar  bg-warning" role="progressbar" style="width: '+n.progress+'%;"\n                    aria-valuenow="'+n.progress+'" aria-valuemin="0" aria-valuemax="100"></div>\n            </div>\n            <div class="pilun">\n                <p><span class="num">'+n.saled_count+"</span>\n                    <span>人支持</span>\n                   \n                            "+(n.tags?'<span class="hot" style=\'background: '+n.tags[0].color+"'> "+n.tags[0].name+"</span>":"")+'\n\n            \n                   \n                </p>\n\n                <span class="num2">'+n.progress+"<i>%</i></span>\n            </div>\n        </li>"}).join(""),a.forEach(function(n){var a={name:n.name,price:n.market_price},e=n.gid;localStorage.setItem(e,JSON.stringify(a))})});var ul2=document.querySelector(".seckill"),timekill=document.querySelector(".time span"),hour=document.querySelector(".hour"),minute=document.querySelector(".minute"),second=document.querySelector(".second"),p2=p();p2.then(function(n){var s=(n=JSON.parse(n)).data.homepage.floors[6].data,a=1e3*s.start_time,e=new Date(a),t=formatDate(e);timekill.innerHTML=t.hour+":"+t.min,setInterval(function(){var n=1e3*s.end_time,a=new Date(n),e=new Date,t=timeDifference(a,e);hour.innerHTML=t.h,minute.innerHTML=t.m,second.innerHTML=t.s}),ul2.innerHTML=s.goods.map(function(n){return'\n        <div class="swiper-slide" data-id='+n.gid+">\n         <li data-id="+n.gid+">\n                        <img data-id="+n.gid+" src="+n.img+'\n                            alt="">\n                        <div class="shoptitle">'+n.name+'</div>\n                        <p class="price">\n                            <span>￥</span>\n                            <span class="newprice">'+n.flash_price/100+'</span>\n                            <span class="flag">起</span>\n                            <span class="dol">￥</span>\n                            <span class="oldprice">'+n.market_price/100+"</span></p>\n                    </li>\n                    </div>\n        \n        "}).join(""),s.goods.forEach(function(n){var a={name:n.name,price:n.flash_price},e=n.gid;localStorage.setItem(e,JSON.stringify(a))})});var ul3=document.querySelector(".seckill-2"),p3=p();p3.then(function(n){var a=(n=JSON.parse(n)).data.homepage.floors[7].data.items;ul3.innerHTML=a.map(function(n){return'<div class="swiper-slide">\n                            <li data-id='+n.gid+">\n                                <img data-id="+n.gid+" src="+n.pic_url+'\n                                    alt="">\n                                <div class="shoptitle">'+n.short_name+'</div>\n                                <p class="desc">'+n.short_summary+'</p>\n                                <p class="price">\n                                    <span>￥</span>\n                                    <span class="newprice">'+n.market_price/100+"</span>\n                                  </p>\n                            </li>\n                        </div>"}).join(""),a.forEach(function(n){var a={name:n.name,price:n.market_price},e=n.gid;localStorage.setItem(e,JSON.stringify(a))})});var ul4=document.querySelector(".seckill-3"),p4=new Promise(function(a,n){ajax({url:"/mi/homepage/main/v1005",type:"post",data:{platform:"pc"},success:function(n){a(n)}})});p4.then(function(n){var a=(n=JSON.parse(n)).data.feeds.items.filter(function(n){return null!=n.data.goods});ul4.innerHTML=a.map(function(n){return"\n        \n         <li data-id="+n.data.goods.gid+'>\n                        <div class="img-top">\n                            <img data-id='+n.data.goods.gid+" src="+n.data.goods.imgSquare+'\n                                alt="">\n                            <p>'+n.data.goods.summary+"</p>\n\n                        </div>\n                        <div data-id="+n.data.goods.gid+' class="detail">\n                        <p class="tag-text">\n                        '+(0==n.data.goods.labels?"":""+n.data.goods.labels.map(function(n){return(""!=n.attrs.imageUrl?" <img src="+n.attrs.imageUrl+' alt="">':"<span style='background:"+n.attrs.bgColor+"'>"+n.name+"</span>")+"\n                           \n                            \n                            "}).join(""))+"\n                        </p>\n                           \n                            <div data-id="+n.data.goods.gid+' class="shoptitle">'+n.data.goods.name+'</div>\n                            <p class="price"><span>￥</span><span class="newprice">'+n.data.goods.marketPrice/100+"</span></p>\n\n\n\n                        </div>\n\n                    </li>\n        "}).join(""),a.forEach(function(n){var a={name:n.data.goods.name,price:n.data.goods.marketPrice},e=n.data.goods.gid;localStorage.setItem(e,JSON.stringify(a))})});var bannav=document.querySelector(".bannav ul"),nav=document.querySelector(".nav-detail");bannav.onmouseover=function(n){n=n||n.event;if(nav.classList.add("show"),n.target.classList.contains("nav2")){var a=[{},{catId:n.target.getAttribute("data-idx")}];navp(JSON.stringify(a)).then(function(n){var a=(n=JSON.parse(n)).data.children;document.querySelector(".cate-name").innerHTML=n.data.name,document.querySelector(".sublist").innerHTML=a.map(function(n){return'\n                 <div class="sub-nav-row">\n                                <div class="sub-nav-item-row">\n                                    <div class="category-2-item">\n                                        <span class="name" title="'+n.name+'">'+n.name+'</span>\n                                        <i class="iconfont icon-next"></i>\n                                    </div>\n                                    <div class="category-3-list">\n                                    '+n.children.map(function(n){return'\n                                         <a href="" class="category-3-item items" data-id=\''+n.queryId+"'>"+n.smallImgCard.name+"</a>\n                                        "}).join("")+"\n                                       \n                \n\n\n                                    </div>\n                                </div>\n                            </div>\n                \n                "}).join("")})}nav.onmousemove=function(n){nav.classList.add("show"),nav.onclick=function(n){if((n=n||n.event).preventDefault(),n.target.classList.contains("items")){var a=n.target.getAttribute("data-id");location.href="../html/goods.html?id="+a}}},nav.onmouseout=function(n){nav.classList.remove("show")}},bannav.onmouseout=function(n){nav.classList.remove("show")};var mySwiper1=new Swiper(".swiper2",{direction:"horizontal",loop:!0,slidesPerView:4,spaceBetween:10,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev",hideOnClick:!0,hiddenClass:"my-button-hidden"},observer:!0,observeParents:!0}),mySwiper2=new Swiper(".swiper3",{direction:"horizontal",loop:!0,slidesPerView:4,spaceBetween:10,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev",hideOnClick:!0,hiddenClass:"my-button-hidden",disabledClass:"my-button-disabled"},observer:!0,observeParents:!0});function p(){return new Promise(function(a,n){ajax({url:"/mi/homepage/main/v1002",type:"post",data:{platform:"pc"},success:function(n){a(n)}})})}function navp(e){return new Promise(function(a,n){ajax({url:"/mi/mtop/market/cat/detail",type:"post",data:e,success:function(n){a(n)}})})}var content=document.querySelector(".content");content.onclick=function(n){if((n=n||n.event).target.getAttribute("data-id")){var a=n.target.getAttribute("data-id");location.href="../html/details.html?id="+a}};var carousel=document.querySelector(".carousel-inner"),pbanner=p();pbanner.then(function(n){var a=(n=JSON.parse(n)).data.homepage.floors[0].data.items;carousel.innerHTML=a.map(function(n,a){return 0==a?' <div class="carousel-item active">\n                        <img src='+n.pic_url+'\n                            class="d-block w-100" alt="...">\n                    </div>':'<div class="carousel-item">\n                        <img src='+n.pic_url+'\n                            class="d-block w-100" alt="...">\n                    </div>'}).join("")});