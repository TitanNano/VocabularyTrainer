var Gulp = require('gulp');
var Babel = require('gulp-babel');
var Sourcemaps = require('gulp-sourcemaps');
var Webpack = require("webpack");
var path = require('path');
var Gutil = require('gulp-util');

Gulp.task("webpack", function(callback) {
    // run webpack
    Webpack({
        entry : path.join(__dirname, 'src', 'scripts', 'main.js'),
        output : {
            path : path.join(__dirname, 'dist'),
            filename : 'app.js'
        },
        module: {
            loaders: [{
                loader: "babel-loader",
                test: /\.js$/,
                query : {
                    presets: ['es2015']
                },
                include: [
                    path.join(__dirname, "src"),
                ],
            }],
        },
        devtool : '#source-map',
    }, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        Gutil.log("[webpack]", stats.toString());
        callback();
    });
});

Gulp.task('copyBower', function(){
    return Gulp.src('bower_components/**')
        .pipe(Gulp.dest('dist/components/'));
});

Gulp.task('copy:js', function(){
    return Gulp.src('src/**/*.js')
        .pipe(Gulp.dest('temp/'));
});

Gulp.task('copy:no-compile', function(){
    return Gulp.src(['src/**/*.html', 'src/**/*.css'])
        .pipe(Gulp.dest('dist/'));
});

Gulp.task('compile', ['copy:js'], function(){
    return Gulp.src('temp/**/*.js')
        .pipe(Sourcemaps.init())
        .pipe(Babel({
            presets: ['es2015']
        }))
        .pipe(Sourcemaps.write('.'))
        .pipe(Gulp.dest('temp/'));
});

Gulp.task('default', ['copyBower', 'copy:no-compile', 'webpack']);
