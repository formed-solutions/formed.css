'use strict';

const gulp        = require('gulp');
const browserSync = require('browser-sync');
const reload      = browserSync.reload;

gulp.task('sass:dev', require('./tasks/sass-dev'));
gulp.task('pug:dev', require('./tasks/pug-dev'));

gulp.task('serve', ['sass:dev', 'pug:dev'], () => {
  browserSync.init({
    browser: 'google chrome',
    server: {
      baseDir: ['.tmp', 'src']
    }
  });

  gulp.watch(['library/**/*.scss'], ['sass:dev'])
  gulp.watch(['src/**/*.pug'], ['pug:dev', reload]);
});
