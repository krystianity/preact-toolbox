const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

module.exports = {
  context: __dirname,
  devtool: '#eval-source-map',
  entry: ['./app/app.jsx'],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'docs.js'
  },
  devServer: {
    contentBase: '/build'
  },
  resolve: {
    extensions: ['', '.jsx', '.scss', '.js', '.json'],
    alias: {
      'react-toolbox': path.resolve(__dirname + './../components')
    },
    modulesDirectories: [
      'node_modules',
      path.resolve(__dirname, './node_modules'),
      path.resolve(__dirname, './../node_modules'),
      path.resolve(__dirname, './../components')
    ]
  },
  module: {
    loaders: [
      {
        test: /(\.js|\.jsx)$/,
        exclude: /(node_modules)/,
        loader: 'react-hot!babel'
      }, {
        test: /(\.scss|\.css)$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass')
      }, {
        test: /(\.txt)$/,
        loader: 'raw',
        include: path.resolve(__dirname, './app/examples')
      }
    ]
  },
  postcss: [autoprefixer],
  plugins: [
    new ExtractTextPlugin('docs.css', {allChunks: true}),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    }),
    new HtmlWebpackPlugin({
        inject: false,
        template: path.resolve(__dirname, './www/index.html')
    }),
    new TransferWebpackPlugin([
      { from: 'www/images', to: 'images' }
    ], path.resolve(__dirname, './'))
  ]
};