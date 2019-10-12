var gulp = require('gulp');//引入模块、引入包

//布置任务
gulp.task('default', ['say', 'sing'], function () {
    return console.log('default任务');
});

//布置任务

gulp.task('say', function () {
    return console.log('say任务');
});

//布置任务

gulp.task('sing', function () {
    return console.log('sing任务');
});

/*
src() 源文件路径 参数可以是一个数组
dest（）目标文件路径 dest参数中的文件夹名称可以自动创建
pipe（）管道 ，表示输送，就是下一步 
 
 */

//布置任务：拷贝index.html文件到dist目录下
// gulp.task('copyhtml', function () {
//     return gulp.src('src/index1.html').pipe(gulp.dest('dist'));
// });

var minifyhtml = require('gulp-htmlmin');

gulp.task('htmlmin', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: false,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: false,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    return gulp.src('src/html/*.html')
        .pipe(minifyhtml(options))
        .pipe(gulp.dest('dist/html'));
});

//压缩css
var minifycss = require('gulp-cssmin');
gulp.task('cssmin', function () {
    return gulp.src('src/css/*.css')
        .pipe(minifycss())
        .pipe(gulp.dest('dist/css'));
});

//4.压缩js
var minifyjs = require('gulp-uglify');
var babel = require('gulp-babel');

gulp.task('jsmin', function () {
    return gulp.src('src/js/*.js')
        .pipe(babel({//es6转es5
            'presets': ['es2015']
        }))
        .pipe(minifyjs())//压缩js
        // .pipe(rename('common.js'))//重命名
        .pipe(gulp.dest('dist/js'));//ES6不能直接压缩，需要先转成es5
});

//压缩图片
var imagemin = require('gulp-imagemin');

gulp.task('imgmin', function () {
    return gulp.src('src/images/*/*.{png,jpg,gif,ico}')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
});