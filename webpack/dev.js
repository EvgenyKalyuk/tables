const webpack = require('webpack');
const config = require('./common');

const { API_URL = 'https://evapixel-dev-api.magora.team' } = process.env;


config.devServer = {
  hot: true,
  port: 3000,
  historyApiFallback: true,
  contentBase: config.output.path,
  proxy: {
    '/api/**': {
      target: API_URL,
      secure: false,
      changeOrigin: true,
    },
  },
};

config.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.optimize.ModuleConcatenationPlugin(),
  new webpack.LoaderOptionsPlugin({
    options: {
      eslint: {
        failOnWarning: false,
        failOnError: false,
        fix: false,
        quiet: false,
      },
    },
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('development'),
    },
  }),
);

config.mode = 'development';

config.devtool = 'cheap-module-source-map';

module.exports = config;
