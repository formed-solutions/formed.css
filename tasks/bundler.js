/**
 * Bundle application javascript.
 * Will automatically watch for changes in JS modules while in develpment mode.
 */

'use strict';

const webpack = require('webpack');
const webpackDev = require('../webpack.config.js');
const webpackProd = require('../webpack.config.prod.js');
const bs = require('browser-sync');
const reload = bs.reload;
const gutil = require('gulp-util');

const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
const webpackConfig = IS_DEVELOPMENT ? webpackDev : webpackProd;

module.exports = (cb) => {
  let started = false;
  let bundler = webpack(webpackConfig);

  function bundle(err, stats) {
    if (err) throw new gutil.PluginError('webpack', err);

    gutil.log('[webpack]', stats.toString({ colors: true }));

    IS_DEVELOPMENT &&
      reload(webpackConfig.map(config => config.output.filename));

    if (!started) {
      started = true;
      return cb();
    }
  }

  IS_DEVELOPMENT ? bundler.watch(200, bundle) : bundler.run(bundle);
};
