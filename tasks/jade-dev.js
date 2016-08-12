/**
 * Recipe copmiling jade templates to html.
 */

'use strict';

const gulp = require('gulp');
const jade = require('gulp-jade');

function jadeDev() {
  const JADE_OPTS = {
    pretty: true,
    locals: {
      urlPrefix: '/'
    }
  };

  return gulp.src('./src/pages/*.jade')
    .pipe(jade(JADE_OPTS))
    .on('error', function __error__(error) {
      console.error('jade error: ', error);
      this.emit('end');
    })
    .pipe(gulp.dest('.tmp'));
}

module.exports = jadeDev;
