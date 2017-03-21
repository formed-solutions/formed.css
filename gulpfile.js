'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync');
const reload = browserSync.reload;

const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
const TASK_ENV = IS_DEVELOPMENT ? 'dev' : 'dist';

gulp.task('sass:dev', require('./tasks/sass').dev);
gulp.task('sass:dist', require('./tasks/sass').dist);
gulp.task('pug:dev', require('./tasks/pug').dev);
gulp.task('pug:dist', require('./tasks/pug').dist);

// Bundle all our webpack modules.
// Will handle which ENV in the bundler.
gulp.task('bundle', require('./tasks/bundler'));

gulp.task('build', [`sass:${TASK_ENV}`, 'bundle', `pug:${TASK_ENV}`], () => {
  if (IS_DEVELOPMENT) {
    gulp.src('dist/**/*')
      .pipe(gulp.dest('docs/dist'));
  }
});

gulp.task('serve', ['build'], () => {
  browserSync.init({
    browser: 'google chrome',
    server: {
      baseDir: ['.tmp', 'src']
    }
  });

  gulp.watch(['src/**/*.scss'], ['sass:dev'])
  gulp.watch(['docs/**/*.pug'], ['pug:dev', reload]);
});
