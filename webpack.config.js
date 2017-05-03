const { join } = require('path');
const include = join(__dirname, 'src');

module.exports = {
  entry: `${__dirname}/src/formed`,
  output: {
    path: join(__dirname, '.tmp', 'js'),
    filename: 'formed.js',
    library: 'formed',
    libraryTarget: 'umd'
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
