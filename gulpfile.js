var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    livereload = require('gulp-livereload');


gulp.task('dev', ['scripts'], function() { });

// Compile scripts
gulp.task('scripts', function() {
    // Single entry point to browserify
    gulp.src('public/js/manifest.js')
        .pipe(browserify({
            insertGlobals : true,
            debug : !gulp.env.production
        }))
        .pipe(gulp.dest('./dist/js'))
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('public/js/*.js', ['scripts']);
    gulp.watch('config/*.json', ['scripts']);
    gulp.watch('public/css/*.css', ['scripts']);
});

gulp.task('default', ['dev', 'watch']);