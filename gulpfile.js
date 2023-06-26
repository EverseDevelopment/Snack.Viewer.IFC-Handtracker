const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const fileInclude = require('gulp-file-include')
const concat = require('gulp-concat')
const cssmin = require('gulp-cssmin');

function style() {
  return gulp.src('./src/scss/**/*.scss')
      .pipe(sass())
      .pipe(cssmin())
      .pipe(concat('main.css'))
      .pipe(gulp.dest('.'))
}
function cssMinify() {
  return gulp.src('./src/css/*.css')
      .pipe(cssmin())
      .pipe(concat('styles.css'))
      .pipe(gulp.dest('.'))
}

const include = () =>
  gulp
    .src(["./src/pages/*.html" ])
    .pipe(
      fileInclude({
        prefix: "@@",
        basepath: "@file",
      })
    )
    .pipe(gulp.dest("./"));

function watch() {
  gulp.watch("./src/pages/**/*.html", include);
  gulp.watch('./src/sections/**/*.html', include)
  gulp.watch('./src/scss/**/*.scss', style)
  gulp.watch('./src/scss/*.scss', style)

}

exports.cssMinify = cssMinify
exports.style = style
exports.watch = watch
exports.include = include