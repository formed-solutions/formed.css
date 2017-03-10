/**
 * Bundle application javascript.
 * Will automatically watch for changes in JS modules while in develpment mode.
 */

'use strict';

const webpack       = require('webpack');
const webpackConfig = require('../webpack.config.js');
const bs            = require('browser-sync');
const reload        = bs.reload;
const gutil         = require('gulp-util');
const DEVELOPMENT   = process.env.NODE_ENV === 'development';

module.exports = (cb) => {
  let started = false;
  let bundler = webpack(webpackConfig);

  function bundle(err, stats) {
    if (err) throw new gutil.PluginError('webpack', err);

    gutil.log('[webpack]', stats.toString({ colors: true }));

    DEVELOPMENT && reload(webpackConfig.output.filename);

    if (!started) {
      started = true;
      return cb();
    }
  }

  DEVELOPMENT ? bundler.watch(200, bundle) : bundler.run(bundle);
};