const webpack = require('webpack');
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
      checkbox: `${COMPONENTS}/checkbox`,
      editor: `${COMPONENTS}/editor`,
      layout: `${COMPONENTS}/layout`,
      radio: `${COMPONENTS}/radio`
    },
    output: {
      path: join(__dirname, 'dist', 'js'),
      filename: '[name].js'
    },
    devtool: 'source-map',
    module: {
      rules: DEFAULT_RULES
    }
  },

  {
    entry: {
      formed: `${__dirname}/src/formed`
    },
    output: {
      path:  join(__dirname, 'dist', 'js'),
      filename: '[name].min.js',
      library: '[name]',
      libraryTarget: 'umd'
    },
    devtool: 'source-map',
    module: {
      rules: DEFAULT_RULES
    },
    plugins: [
      // Minification of code.
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {
          screw_ie8: true,
          drop_console: false
        },
        mangle: {
          screw_ie8: true
        },
        output: {
          comments: false,
          screw_ie8: true
        }
      }),
      new webpack.optimize.AggressiveMergingPlugin({
        minSizeReduce: 1.5,
        moveToParents: true
      })
    ]
  }
];
