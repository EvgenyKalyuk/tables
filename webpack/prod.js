const webpack = require('webpack');
const config = require('./common');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');

config.mode = 'production';

config.output.filename = 'js/[name].[hash].js';

config.plugins.push(
  new ExtractTextPlugin('css/[name].[hash].css'),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
  }),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),
  new MinifyPlugin({
    removeDebugger: true,
    topLevel: true,
  }, {
    test: /\.test\.js$/i,
  }),
);

module.exports = config;