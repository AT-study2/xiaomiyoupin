//压缩代码
let gulp = require('gulp')
const htmlmin = require('gulp-htmlmin')

let cssmin = require("gulp-cssmin");
function css() {
    return gulp.src('./src/css/**')
        .pipe(cssmin())
        .pipe(gulp.dest('./dist/css'))

}
//导出
exports.css = css;


//js压缩
let jsmain = require('gulp-uglify');
let gulpBable = require("gulp-babel");
function js() {
    return gulp.src("./src/js/**")
        .pipe(
            gulpBable({
                presets: ["env"],
            })
        )
        .pipe(jsmain())
        .pipe(gulp.dest('./dist/js'))
}
exports.js = js

function html() {
    return gulp.src('./src/html/**')
        .pipe(htmlmin({
            collapseWhitespace: true, // 表示去除空格
            removeEmptyAttributes: true, // 移出空的属性
            minifyCSS: true, // 压缩 style 标签
            minifyJS: true, // 压缩 script 标签
        }))
        .pipe(gulp.dest('./dist/html'))
}
exports.html = html
function watch() {
    gulp.watch('./src/css', css)
    // gulp.watch('./src/sass',sass)
    gulp.watch('./src/html', html)
    gulp.watch('./src/js', js)
}

// 创建一个复制静态子资源的任务
function iconfont(){
    return gulp.src("./src/iconfont/**").pipe(gulp.dest("./dist/iconfont"));
}
exports.iconfont=iconfont
function jquery() {
    return gulp.src("./src/jquery/**").pipe(gulp.dest("./dist/jquery"));
}
exports.jquery = jquery
function validation() {
    return gulp.src("./src/validation/**").pipe(gulp.dest("./dist/validation"));
}
exports.validation = validation


//清楚缓存(清空)
let cleanmin = require('gulp-clean')
function clear() {
    return gulp.src(['./dist'])
        .pipe(cleanmin());
}
exports.clean = clear
let webserver = require('gulp-webserver')
function web() {
    return gulp.src("./dist").pipe(
        webserver({
            host: "localhost", // 域名
            port: 7788, // 监听的端口号，统一写 3000
            open: "./html/login.html", // 打开的页面，相对于 dist 文件夹来的目录
            livereload: true, // 浏览器自动刷新,
            proxies: [
                {
                    source: "/api", //随便起，相当于你要请求接口的替换名 ajax请求时就用这个名字
                    target: "http://gz2107/text/login/api/", //需要请求的接口
                },
                {
                    source:'/mi',
                    target:'https://www.xiaomiyoupin.com',
                }
            ],
        })
    );
}
exports.web = web;
exports.builds = gulp.series(
    clear,
    gulp.parallel(css, js, html,iconfont,jquery,validation),
    web,
    watch
);
