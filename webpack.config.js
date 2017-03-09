const { join } = require('path');
const include = join(__dirname, 'src');

const COMPONENTS = `${__dirname}/src/components`;

module.exports = {
  entry: {
    layout: `${COMPONENTS}/Layout/layout`
  },

  output: {
    path: join(__dirname, '.tmp'),
    filename: 'formed.[name].js',
    library: ['formed', '[name]'],
    libraryTarget: 'umd',
  },

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include,
        exclude: /node_modules/
      }
    ]
  }
};
