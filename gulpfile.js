'use strict';

const gulp        = require('gulp');
const browserSync = require('browser-sync');
const reload      = browserSync.reload;

gulp.task('sass:dev', require('./tasks/sass').dev);
gulp.task('sass:dist', require('./tasks/sass').dist);
gulp.task('pug:dev', require('./tasks/pug').dev);
gulp.task('pug:dist', require('./tasks/pug').dist);

// Bundle all our webpack modules.
// Will handle which ENV in the bundler.
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

gulp.task('build', ['sass:dist', 'bundle', 'pug:dist'], () => {
  gulp.src('dist/**/*')
    .pipe(gulp.dest('docs/dist'));
});
