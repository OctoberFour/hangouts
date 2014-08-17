var gulp = require('gulp')
	concat = require('gulp-concat')
	uglify = require('gulp-uglify');

gulp.task('js', function(){
	return gulp.src('src/js/**/*.js')
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(gulp.dest('build/js/'))
});

gulp.task('default', ['js']);