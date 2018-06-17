var gulp = require('gulp');

var browserSync = require('browser-sync').create();

var plugins = require('gulp-load-plugins')();

var babel = require('gulp-babel');

gulp.task('serve', ['css','js'], function() {
	browserSync.init({
        server: "./src"
    });

    gulp.watch("./src/less/*.less", ['css']);
    gulp.watch("./src/js/*.js", ['js']);
    gulp.watch("./src/**/*").on('change', browserSync.reload);
    // gulp.watch("./src/less/*.css").on('change', browserSync.reload);
    // gulp.watch("./src/js/*.js").on('change', browserSync.reload);
})

gulp.task('css', function(){
	return gulp.src('./src/less/style.less')
	.pipe(plugins.less())
	.pipe(gulp.dest('./src/less/'));
})

gulp.task('js', function(){
    return gulp.src('src/js/app.js')
    .pipe(babel({presets: ['env']}))
    .pipe(gulp.dest('src/js/appDefault'));
});

gulp.task('default', ['serve']);