/**
 * Recipe copmiling jade templates to html.
 */

'use strict';

const gulp = require('gulp');
const pug = require('gulp-pug');

function pugDev() {
  const PUG_OPTS = {
    pretty: true,
    locals: {
      urlPrefix: '/'
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

module.exports = pugDev;
