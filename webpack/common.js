const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const API_URL = process.env.API_URL ? process.env.API_URL.replace(/\s/g, '') : 'https://api.zp.ru/v1';

module.exports = {
  entry: {
    vendors: path.join(__dirname, '..', 'src', 'vendor.js'),
    app: path.join(__dirname, '..', 'src', 'app.js'),
  },

  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: 'js/[name].js',
    publicPath: '/',
  },

  resolve: {
    modules: ['node_modules'],
    extensions: [
      '.ts', '.tsx', '.js', '.jsx',
    ],
    alias: {
      assets: path.join(__dirname, '..', 'src', 'assets'),
      common: path.join(__dirname, '..', 'src', 'common'),
      components: path.join(__dirname, '..', 'src', 'components'),
      helpers: path.join(__dirname, '..', 'src', 'helpers'),
      pages: path.join(__dirname, '..', 'src', 'pages'),
      store: path.join(__dirname, '..', 'src', 'store'),
      translation: path.join(__dirname, '..', 'src', 'translation'),
    }
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.pug$/,
        exclude: /node_modules/,
        use: [
          'raw-loader',
          'pug-html-loader'
        ]
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        use: [
          'svg-sprite-loader',
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                {removeTitle: true},
                {convertColors: {shorthex: false}},
                {convertPathData: false},
              ]
            }
          },
        ]
      }
    ]
  },

  target: 'web',

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        API_URL: JSON.stringify(API_URL),
      },
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '..', 'src', 'index.pug'),
    }),
  ],
};
