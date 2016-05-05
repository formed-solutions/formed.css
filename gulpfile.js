'use strict';

const gulp        = require('gulp');
const browserSync = require('browser-sync');
const reload      = browserSync.reload;

gulp.task('sass:dev', require('./tasks/sass-dev'));
gulp.task('jade:dev', require('./tasks/jade-dev'));

gulp.task('serve', ['sass:dev', 'jade:dev'], function __serve__() {
  browserSync.init({
    browser: 'google chrome',
    server: {
      baseDir: ['.tmp']
    }
  });

  gulp.watch(['library/**/*.scss'], ['sass:dev'])
  gulp.watch(['src/**/*.jade'], ['jade:dev', reload]);
});
