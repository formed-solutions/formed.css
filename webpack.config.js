const { join } = require('path');
const include = join(__dirname, 'src');

const COMPONENTS = `${__dirname}/src/components`;

const DEFAULT_RULES = [
  {
    test: /\.js$/,
    loader: 'babel-loader',
    include,
    exclude: /node_modules/
  }
];

module.exports = [
  {
    entry: {
      editor: `${COMPONENTS}/Editor/index`,
      layout: `${COMPONENTS}/Layout/layout`
    },
    output: {
      path: join(__dirname, '.tmp', 'js'),
      filename: '[name].js'
    },
    devtool: 'source-map',
    module: {
      rules: DEFAULT_RULES
    }
  },

  {
    entry: `${__dirname}/src/formed`,
    output: {
      path: join(__dirname, '.tmp', 'js'),
      filename: 'formed.js',
      library: 'formed',
      libraryTarget: 'umd'
    },
    devtool: 'source-map',
    module: {
      rules: DEFAULT_RULES
    }
  }
];
