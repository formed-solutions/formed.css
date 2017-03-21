/**
 * Recipe copmiling jade templates to html.
 */

'use strict';

const gulp = require('gulp');
const pug = require('gulp-pug');
const ENV = process.env.NODE_ENV

function pugDev() {
  const PUG_OPTS = {
    pretty: true,
    locals: {
      urlPrefix: '/',
      ENV
    }
  };

  return gulp.src('./docs/pages/*.pug')
    .pipe(pug(PUG_OPTS))
    .on('error', function __error__(error) {
      console.error('pug error: ', error);
      this.emit('end');
    })
    .pipe(gulp.dest('.tmp'));
}

function pugDist() {
  const PUG_OPTS = {
    locals: {
      urlPrefix: '',
      ENV
    }
  };

  return gulp.src('./docs/pages/*.pug')
    .pipe(pug(PUG_OPTS))
    .on('error', function __error__(error) {
      console.error('pug error: ', error);
      this.emit('end');
    })
    .pipe(gulp.dest('docs'));
}

module.exports = {
  dev: pugDev,
  dist: pugDist
}
