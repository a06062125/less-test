'use strict';

/*
 * 1. task: copy the dependencies into  from  /node_modules/**;
 * 2. task: precomopiling the less to css;
 */

var gulp = require('gulp'),
    path = require('path'),
    fs = require('fs'),
    through = require('through'),
    $ = require('gulp-load-plugins')(),
    browserSync = require('browser-sync');

var reload = browserSync.reload;

var staticSrc = "static";
var staticDist = "dist";

/* 
 * 项目初始化、或新增依赖包时，手动跑一下
 * 把node_modules中依赖的开发包拷贝到static/vendor/目录下
 */

gulp.task('vendor', function() {
    var conf = JSON.parse(fs.readFileSync('package.json'));
    var depends = conf.dependencies ? (Object.keys(conf.dependencies)) : [];
    console.log("depends", depends);
    return gulp.src('node_modules/+(' + depends.join("|") + ')/**/*')
        .pipe($.plumber())
        .pipe(gulp.dest(staticDist + "/vendor"));

});

gulp.task('images', function() {
    return gulp.src(staticSrc + '/images/**/*')
        .pipe(gulp.dest(staticDist + '/images'))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('fonts', function() {
    return gulp.src([staticSrc + '/fonts/**/*'])
        .pipe(gulp.dest(staticDist + '/fonts'))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('js', function() {
    return gulp.src([staticSrc + '/js/**/*'])
        .pipe(gulp.dest(staticDist + '/js'))
        .pipe(reload({
            stream: true
        }));
});


gulp.task('html', function() {
    return gulp.src([staticSrc + '/html/**/*'])
        .pipe(gulp.dest(staticDist + '/html'))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('less', function() {

    return gulp.src([staticSrc + '/less/**/*.less'])
        .pipe($.plumber())
        .pipe($.less())
        .pipe($.postcss([
            require('autoprefixer-core')({
                browsers: ['last 1 version']
            })
        ]))
        .pipe(gulp.dest(staticDist + '/css'))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('watch', function() {

    browserSync({
        server: {
            server: 'less-test',
            baseDir: ['./'],
            middleware: require('connect-logger')()
        }
    });

    gulp.watch(staticSrc + '/less/**/*', ['less']);
    gulp.watch(staticSrc + '/js/**/*', ['js']);
    gulp.watch(staticSrc + '/images/**/*', ['images']);
    gulp.watch(staticSrc + '/fonts/**/*', ['fonts']);
    gulp.watch(staticSrc + '/html/**/*', ['html']);
});


//---------- gulp CLI TASK
gulp.task('init', ['vendor', 'less', 'js', 'images', 'fonts', 'html']);

gulp.task('default', ['watch']);