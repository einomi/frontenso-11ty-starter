'use strict';
const path = require('path');

// eslint-disable-next-line no-unused-vars
const webpack = require('webpack');

const IS_PRODUCTION = require('./env').IS_PRODUCTION;

const entryPoints = {
  bundle: path.resolve(__dirname, 'src/js/index.js'),
};

module.exports = {
  entry: Object.keys(entryPoints).reduce((acc, currentKey) => {
    acc[currentKey] = [entryPoints[currentKey]];
    return acc;
  }, {}),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/js'),
    publicPath: '/js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
      },
    ],
  },
  devtool: IS_PRODUCTION ? undefined : 'eval',
  mode: IS_PRODUCTION ? 'production' : 'development',
  optimization: {
    minimize: IS_PRODUCTION,
  },
  // Uncomment this section if you want to use environment variables in your JS
  // plugins: [new webpack.EnvironmentPlugin(['STATIC_PATH'])],
};
