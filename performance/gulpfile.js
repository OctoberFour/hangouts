// gulp -p => para minificar e entregar para produção
// gulp => padrão com sourcemaps e sem minificar

// Call Plugins
var env        = require('minimist')(process.argv.slice(2)),
	gulp       = require('gulp'),
	gutil      = require('gulp-util'),
	htmlmin    = require('gulp-htmlmin'),
	uglify     = require('gulp-uglify'),
	compass    = require('gulp-compass'),
	concat     = require('gulp-concat'),
	cssmin     = require('gulp-cssmin'),
	gulpif     = require('gulp-if'),
	connect    = require('gulp-connect'),
	modRewrite = require('connect-modrewrite'),
	imagemin   = require('gulp-imagemin');


// Call Htmlmin
gulp.task('html', function(){
	return gulp.src('src/**/*.html')
		.pipe(htmlmin({
			collapseWhitespace: true,
			removeComments: true
		}))
		.pipe(gulp.dest('build/'))
		.pipe(connect.reload());
});

// Call uglify and concat
gulp.task('js', function(){
	return gulp.src('src/js/**/*.js')
		.pipe(concat('main.js'))
		.pipe(gulpif(env.p, uglify()))
		.pipe(gulp.dest('build/js/'))
		.pipe(connect.reload());
});

// Call Compasss
gulp.task('compass', function(){
	return gulp.src('src/sass/main.scss')
		.pipe(compass({
			css: 'src/css/',
			sass: 'src/sass/',
			image: 'src/img'
		}))
		.pipe(gulpif(env.p, cssmin()))
		.pipe(gulp.dest('build/css/'))
		.pipe(connect.reload());
});

// Call Imagemin
gulp.task('imagemin', function() {
  return gulp.src('src/img/**/*')
    .pipe(imagemin({ optimizationLevel: 7, progressive: true, interlaced: true }))
    .pipe(gulp.dest('build/img'));
});

// Call Watch
gulp.task('watch', function(){
	gulp.watch('src/*.html', ['html']);
	gulp.watch('src/sass/**/*.scss', ['compass']);
	gulp.watch('src/js/**/*.js', ['js']);
	gulp.watch('src/img/**/*.{png, jpg, gif}', ['imagemin']);
});

// Connect (Livereload)
gulp.task('connect', function() {
	connect.server({
		root: ['build/'],
		livereload: true,
		middleware: function(){
			return [
				modRewrite([
					'^/$ /index.html',
					'^([^\\.]+)$ $1.html'
				])
			];
		}
	});
});

// Default task
gulp.task('default', ['html', 'js', 'compass', 'watch', 'imagemin', 'connect']);