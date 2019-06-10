// Dependencias
const gulp = require('gulp');
const concat = require('gulp-concat');
const minify = require('gulp-minify');
const rev = require('gulp-rev');
const babel = require('gulp-babel');
const cleanCSS = require('gulp-clean-css');
const notify = require('gulp-notify');


// Tarea 1 llamada minify-js 
gulp.task('minify-js', function (done) {
  gulp.src('src/**/*.js')
  .pipe(concat('bundle.js'))
  .pipe(minify({ext:'.js',noSource: true}))
  .pipe(rev())
  .pipe(babel({"presets": ["@babel/preset-env"]}))
  .pipe(gulp.dest('dist/'))
  .pipe(notify("Tarea comprimir-js terminada!"));
  done();
});

// Tarea 2 llamada minify-css
gulp.task('minify-css', function (done) {
  gulp.src('src/*.css')
  .pipe(concat('index.css'))
  .pipe(cleanCSS({compatibility: 'ie8'}))
  .pipe(rev())
  .pipe(gulp.dest('dist/'))
  .pipe(notify("Tarea comprimir-css terminada!"))
  done();
});

gulp.task('generate-plugin', gulp.parallel('minify-js', 'minify-css'));