'use strict';

const gulp        = require('gulp');
const browserSync = require('browser-sync');
const reload      = browserSync.reload;

gulp.task('sass:dev', require('./tasks/sass-dev'));
gulp.task('pug:dev', require('./tasks/pug-dev'));

// Bundle all our webpack modules.
gulp.task('bundle', require('./tasks/bundler'));

gulp.task('serve', ['bundle', 'sass:dev', 'pug:dev'], () => {
  browserSync.init({
    browser: 'google chrome',
    server: {
      baseDir: ['.tmp', 'src']
    }
  });

  gulp.watch(['src/**/*.scss'], ['sass:dev'])
  gulp.watch(['docs/**/*.pug'], ['pug:dev', reload]);
});
