// Dependencias
const gulp = require('gulp');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const cleanCSS = require('gulp-clean-css');
const notify = require('gulp-notify');

gulp.task('minify-js', function (done) {
  gulp.src('src/**/*.js')
  .pipe(concat('bundle.js'))
  .pipe(minify({ext:'.js',noSource: true}))
  .pipe(babel({"presets": ["@babel/preset-env"]}))
  .pipe(gulp.dest('dist/'))
  .pipe(notify("Tarea comprimir-js terminada!"));
  done();
});

gulp.task('minify-css', function (done) {
  gulp.src('src/*.css')
  .pipe(concat('bundle.css'))
  .pipe(cleanCSS({compatibility: 'ie8'}))
  .pipe(gulp.dest('dist/'))
  .pipe(notify("Tarea comprimir-css terminada!"))
  done();
});

gulp.task('generate-plugin', gulp.parallel('minify-js', 'minify-css'));