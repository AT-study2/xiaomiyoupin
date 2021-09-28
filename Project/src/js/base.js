
window.onload=function(){
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
        lognout.onclick = () => {
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
    //滚动条固定
    let headerNav = document.querySelector('.header-nav-top')
    document.onscroll = () => {

        if (scrollY >= 500) {
            headerNav.classList.add('nav-fix-active')
            headerNav.style.width = '100%'
        } else if (scrollY < 500) {
            headerNav.classList.remove('nav-fix-active')
        }

    }
}