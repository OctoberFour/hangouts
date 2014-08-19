// gulp -p => for minify and production
// gulp => default with sourcemaps

var env = require('minimist')(process.argv.slice(2)),
	gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	compass = require('gulp-compass'),
	cssmin = require('gulp-cssmin'),
	gulpif = require('gulp-if');

gulp.task('js', function(){
	return gulp.src('src/js/**/*.js')
		.pipe(concat('main.js'))
		.pipe(gulpif(env.p, uglify()))
		.pipe(gulp.dest('build/js/'))
});

gulp.task('css', function(){
	return gulp.src('src/sass/main.scss')
		.pipe(compass({
			css: 'src/css/',
			sass: 'src/sass/',
			image: 'src/img'
		}))
		.pipe(gulpif(env.p, cssmin()))
		.pipe(gulp.dest('build/css/'))
});

gulp.task('default', ['js', 'css']);