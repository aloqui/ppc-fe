var gulp = require('gulp');
// Requires the gulp-sass plugin
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');

appConfig = {
  src: {
    sass: './src/assets/scss/',
    js: './src/assets/js/'
  },
  dist: {
    base: './dist/',
    css: './dist/assets/stylesheets/',
    js: './dist/assets/javascripts/',
  }
}
gulp.task('js', function() {
  return gulp.src(appConfig.src.js + '**/*.js')
  // .pipe(useref())
  .pipe(gulp.dest(appConfig.dist.js))
  .pipe(browserSync.reload({
    stream: true
  }))
});
gulp.task('sass', function () {
  return gulp.src(appConfig.src.sass + '**/*.scss')
    .pipe(sass({
      compass: true,
      sourcemap: true,
      sourcemapPath: 'style.css'
    }))
    .on('error', function (err) {
      console.log(err.message)
    })
    // .pipe(minifyCSS())
    .pipe(gulp.dest(appConfig.dist.css))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('useref', function () {
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulp.dest('dist'))
});

gulp.task('browserSync', function () {
  browserSync.init({
    server: {
      baseDir: appConfig.dist.base
    },
  })
})

gulp.task('watch', ['browserSync', 'sass', 'js'], function () {
  gulp.watch(appConfig.dist.js + '**/*.js', browserSync.reload);
  gulp.watch(appConfig.src.sass + '**/*.scss', ['sass']);
  gulp.watch(appConfig.dist.base + '**/*.html', browserSync.reload);
  gulp.watch(appConfig.dist.base + '**/*.css', browserSync.reload);
  // Other watchers
});