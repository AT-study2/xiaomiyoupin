//封装一格函数，求任意数的最小值，并且把最小值当成函数的返回值
function min() {
    var min = arguments[0];
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] < min) {
            min = arguments[i];
        }
    }
    return min;
}

// 格式化时间对象的函数
function formatDate(d) {
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    month = month < 10 ? "0" + month : month;

    var date = d.getDate();
    date = date < 10 ? "0" + date : date;

    var hour = d.getHours();
    hour = hour < 10 ? "0" + hour : hour;

    var min = d.getMinutes();
    min = min < 10 ? "0" + min : min;

    var sec = d.getSeconds();
    sec = sec < 10 ? "0" + sec : sec;

    var day = d.getDay();

    var arr = [
        "星期天",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
    ];
    return {
        year: year,
        month: month,
        date: date,
        hour: hour,
        min: min,
        sec: sec,
        week: day,
    };
}

// 封装函数（求两个时间对象的差数）
/* 
    参数：两个时间对象
    返回值：以对象形式把相差的天数 小时 分钟和秒数返回 
*/
function timeDifference(date1, date2) {
    var time1 = date1.getTime();
    var time2 = date2.getTime();

    var t = Math.abs(time1 - time2);
    var day = parseInt(t / 1000 / 60 / 60 / 24);
    day = day < 10 ? "0" + day : day;
    var h = parseInt(t / 1000 / 60 / 60) % 24;
    h = h < 10 ? "0" + h : h;
    var m = parseInt(t / 1000 / 60) % 60;
    m = m < 10 ? "0" + m : m;
    var s = parseInt(t / 1000) % 60;
    s = s < 10 ? "0" + s : s;
    // console.log(`两个时间相差${day}天${h}小时${m}分钟${s}秒`);
    return {
        d: day,
        h: h,
        m: m,
        s:s
    }
}
/**
 * setCookie 用于设置 cookie
 * @param {STRING} key  要设置的 cookie 名称
 * @param {STRING} value  要设置的 cookie 内容
 * @param {NUMBER} expires  过期时间
 */
function setCookie(key, value, expires) {
    const time = new Date()
    time.setTime(time.getTime() - 1000 * 60 * 60 * 24 * 8 + expires) // 用于设置过期时间

    document.cookie = `${key}=${value};expires=${time};`
}
/**
 * getCookie 获取 cookie 中的某一个属性
 * @param {STRING} key 你要查询的 cookie 属性
 * @return {STRING} 你要查询的那个 cookie 属性的值
 */
function getCookie(key) {
    const cookieArr = document.cookie.split(';')

    let value = ''

    cookieArr.forEach(item => {
        if (item.split('=')[0] === key) {
            value = item.split('=')[1]
        }
    })

    return value
}
/**
 * delCookie 删除 cookie 中的某一个属性
 * @param {STRING} name 你要删除的某一个 cookie 属性的名称
 */
function delCookie(name) {
    setCookie(name, 1, -1)
}