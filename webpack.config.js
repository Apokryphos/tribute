const webpack = require('webpack');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const ImageMinMozjpeg = require('imagemin-mozjpeg');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
  entry: ['./src/index.js', './src/style.scss'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: { url: false }
            }
          ]
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: { url: false }
            },
            'sass-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([{ from: 'src/*.html', flatten: true }]),
    // new CopyWebpackPlugin([{ from: 'src/*.css', flatten: true }]),
    new CopyWebpackPlugin([{ from: 'src/img', to: 'img' }]),
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      pngquant: {
        quality: '95-100'
      },
      plugins: [
        ImageMinMozjpeg({
          quality: 90,
          progressive: false
        })
      ]
    }),
  ]
};
