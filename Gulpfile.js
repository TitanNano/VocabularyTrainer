let Gulp = require('gulp');
let Webpack = require("webpack");
let path = require('path');
let Gutil = require('gulp-util');

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
        if(err) throw new Gutil.PluginError("webpack", err);
        Gutil.log("[webpack]", stats.toString());
        callback();
    });
});

Gulp.task('copyBower', function(){
    return Gulp.src('bower_components/**')
        .pipe(Gulp.dest('dist/components/'));
});

Gulp.task('copy:no-compile', function(){
    return Gulp.src(['src/**/*.html', 'src/**/*.css', 'src/**/*.json', 'src/**/*.webmanifest', 'src/**/*.png', '!src/af/**'])
        .pipe(Gulp.dest('dist/'));
});

Gulp.task('compile', ['webpack', 'copyBower', 'copy:no-compile'], function() {
    return Gulp.src('dist/components/**/*.js')
        .pipe(Gulp.dest('dist/components/'));
})

Gulp.task('default', ['compile']);
