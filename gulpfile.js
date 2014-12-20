var gulp = require('gulp');
//var sourcemaps = require('gulp-sourcemaps');
var less = require('gulp-less');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var ngHtml2Js = require('gulp-ng-html2js');
var concat = require("gulp-concat");

/**
 * 定义静态文件路径
 */

var lessDir = './less';
var cssDir =  './css';
var jsDir = "./js";
var tplDir = "./html";

/**
 * 编译 masterboard LESS 文件
 */
var makeAppLessGlobs = function() {
    return lessDir + "/**/*.less";
};
//console.log(makeAppLessGlobs("masterboard") , makeAppLessGlobs("gameboard"));

gulp.task('less-css', function() {
    gulp
        .src(lessDir + "/**/*.less")
        .pipe(plumber())
        .pipe(less({
            // 所有的 less 都被 @import 的话，可以不写 paths，
            // 这主要是为了方便添加没有 @import 到 index.less 而直接被页面 link 的 less 文件
            paths: [
                lessDir + '/**/*.less'
            ]
        }))
        .pipe(autoprefixer('last 10 versions', 'ie 8'))
        .pipe(gulp.dest(cssDir + '/'))
});

/**
 * 监听
 */
gulp.task('watch', function() {
    gulp.watch(lessDir + '/**/*.less', ['less-css']);
});


gulp.task('default', ['less-css', 'watch']);