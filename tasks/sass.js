/**
 * Recipe for compiling sass library into css.
 *
 * Note: gulp-sass is a wrapper for 'node-sass' which is a wrapper for
 * 'libsass'.  Consult those docs for additional information or issues.
 *
 * Sources:
 * https://github.com/dlmanning/gulp-sass
 * https://github.com/sass/node-sass
 * https://github.com/sass/libsass
 */

 'use strict';

const autoprefixer = require('autoprefixer');
const gulp         = require('gulp');
const sass         = require('gulp-sass');
const postcss      = require('gulp-postcss');
const reload       = require('browser-sync').reload;
const sourcemaps   = require('gulp-sourcemaps');
const cssmin       = require('gulp-cssmin');
const rename       = require('gulp-rename');
const size         = require('gulp-size');

const SASS_OPTIONS = {
  outputStyle: 'nested',
  precision: 10
};
const AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'edge >= 20',
  'ff >= 44',
  'chrome >= 48',
  'safari >= 8',
  'ios >= 8'
];

const isDevelopment = process.env.NODE_ENV === 'development';
const INPUT_PATH = 'src/formed.scss';
const OUTPUT_PATH = isDevelopment ? '.tmp/css' : 'dist/css';

function onSassError(error) {
  console.error('Sass error: ', error);
  this.emit('end');
}

function devBundle() {
  return gulp.src(INPUT_PATH)
    .pipe(sourcemaps.init())
    .pipe(sass(SASS_OPTIONS))
    .on('error', onSassError)
    .pipe(postcss([
      require('autoprefixer')({
        browsers: AUTOPREFIXER_BROWSERS
      })
    ]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(OUTPUT_PATH))
    .pipe(reload({
      stream: true
    }));
}

function distBundle() {
  return gulp.src(INPUT_PATH)
    .pipe(sourcemaps.init())
    .pipe(sass(SASS_OPTIONS))
    .on('error', onSassError)
    .pipe(postcss([
      require('autoprefixer')({
        browsers: AUTOPREFIXER_BROWSERS
      })
    ]))
    .pipe(sourcemaps.write(`../../${OUTPUT_PATH}`))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(size({
      title: 'Formed.css',
      showFiles: true
    }))
    .pipe(gulp.dest(OUTPUT_PATH))
}

module.exports = {
  dev: devBundle,
  dist: distBundle
};
