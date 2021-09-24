function ajax(option) {
    // 【1】判断option的数据类型，如果不是对象，手动抛出错误
    if (Object.prototype.toString.call(option) != "[object Object]") {
        throw Error("ajax函数的参数必须是一个对象");
    }

    // 【2】判断必填的属性是否存在 url success
    if (!(option.url && option.success)) {
        throw Error("url 和success 属性是必填的");
    }

    // 【3】success属性的属性值必须是一个函数
    if (Object.prototype.toString.call(option.success) != "[object Function]") {
        throw Error("success属性的属性值必须是一个函数");
    }

    // 【4】async的值是否是布尔值
    if (
        option.async &&
        Object.prototype.toString.call(option.async) != "[object Boolean]"
    ) {
        throw Error("async 的取值必须是布尔值");
    }

    // 【5】给选填的属性添加默认值
    let param = {
        url: option.url,
        type: option.type || "get",
        async: option.async == false ? option.async : true,
        data: option.data || "",
        success: option.success,
        error: option.error || function () {},
    };

    // 【6】判断type属性属性值是否为get 和post
    if (!(param.type == "get" || param.type == "post")) {
        throw Error("type属性的取值暂时只支持get 和post");
    }

    // 【7】data 属性的判断
    // data 数据类型只能为字符串 或者 对象
    if (
        !(
            Object.prototype.toString.call(param.data) == "[object String]" ||
            Object.prototype.toString.call(param.data) == "[object Object]"
        )
    ) {
        throw Error("data属性的值 只支持字符串或者 对象");
    }

    // 【8】如果data属性的值为对象 需要把对象转换为字符串
    if (Object.prototype.toString.call(param.data) == "[object Object]") {
        let str = "";
        for (let key in param.data) {
            str += key + "=" + param.data[key] + "&";
        }
        param.data = str.substr(0, str.length - 1);
    }

    // 发送ajax请求
    let xhr = new XMLHttpRequest();
    if (param.type == "get") {
        xhr.open(param.type, param.url + "?" + param.data, param.async);
        xhr.send();
    } else {
        xhr.open(param.type, param.url, param.async);
        xhr.setRequestHeader(
            "Content-type",
            "application/x-www-form-urlencoded"
        );
        xhr.send(param.data);
    }

    if (param.async == false) {
        if (/^[23]\d{2}$/.test(xhr.status)) {
            param.success(xhr.responseText);
        } else {
            param.error(xhr.responseText);
        }
    }

    // 事件驱动程序
    // onload事件 当ajax请求状态码为4 的时候 执行
    xhr.onload = function () {
        if (/^[23]\d{2}$/.test(xhr.status)) {
            param.success(xhr.responseText);
        } else {
            param.error(xhr.responseText);
        }
    };
}

// 封装一个有promise的ajax请求
// 只是给pAjax返回一个promise对象
function pAjax(option) {
    return new Promise((resolve, reject) => {
        ajax({
            url: option.url,
            type: option.type,
            data: option.data,
            async: option.async,
            success: function (res) {
                resolve(res);
            },
            error: function (err) {
                reject(err);
            },
        });
    });
}


// async function fun(option) {
//     return await new Promise((resolve, reject) => {
//         ajax({
//             url: option.url,
//             type: option.type,
//             data: option.data,
//             async: option.async,
//             success: function (res) {
//                 resolve(res);
//             },
//             error: function (err) {
//                 reject(err);
//             },
//         });
//     });
// }
