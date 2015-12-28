Gulp = require('gulp');
Babel = require('gulp-babel');

Gulp.task('copyBower', function(){
    return Gulp.src('bower_components/**')
        .pipe(Gulp.dest('dist/components/'));
});

Gulp.task('copy:dependencies', function(){
    return Gulp.src('node_modules/systemjs/dist/system.js')
        .pipe(Gulp.dest('dist/components/systemjs/'));
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
        .pipe(Babel({
            presets: ['es2015']
        }))
        .pipe(Gulp.dest('dist/'));
});

Gulp.task('default', ['copyBower', 'copy:no-compile', 'copy:dependencies', 'compile']);
