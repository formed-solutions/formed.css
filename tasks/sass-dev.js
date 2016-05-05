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

const AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'edge >= 20',
  'ff >= 44',
  'chrome >= 48',
  'safari >= 8',
  'ios >= 8'
];

const sassDev = () => {
  return gulp.src('library/formed.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'nested',
      precision: 10,
      includePaths: ['.']
    }))
    .on('error', function __error__(error) {
      console.error('Sass error: ', error);
      this.emit('end');
    })
    .pipe(postcss([
      require('autoprefixer')({
        browsers: AUTOPREFIXER_BROWSERS
      })
    ]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('.tmp'))
    .pipe(reload({
      stream: true
      }));
}

module.exports = sassDev;
