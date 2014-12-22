var combiner = require('stream-combiner2');
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
var cssDir = './css';
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
        .pipe(less())
        .pipe(gulp.dest(cssDir + '/'));
});

gulp.task('less-test',function(){
    console.log(lessDir , cssDir);
     gulp
        .src("./less/**/*.less")
        .pipe(less())
        .pipe(gulp.dest('./css/'));
});


/**
 * 监听
 */
gulp.task('watch', function() {
    gulp.watch(lessDir + '/**/*.less', ['less-test']);
});


gulp.task('default', ['less-test', 'watch']);
