const path              = require('path');
const webpack           = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/app.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'js/app.js',
  },
  module: {
    rules: [
      // react(jsx) file
      {
        test: /\.jsx$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react']
          }
        }
      },
      // css file
      {
        test: /\.css$/i,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader",
        })
      },
      // sass file
      {
        test: /\.scss$/i,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        })
      },
      // image file
        {
          test: /\.(png|jpg|gif)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
                name: 'resource/[name].[ext]'
              },
            },
          ],
        },
        // font icon file
        {
          test: /\.(eot|svg|ttf|woff|woff2|otf)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
                name: 'resource/[name].[ext]'
              },
            },
          ],
        },
    ]
  },
  plugins: [
    // html file
      new HtmlWebpackPlugin({
          template: './src/index.html'
      }),
      // css file
      new ExtractTextPlugin("css/[name].css"),
      // public modules
      new webpack.optimize.CommonsChunkPlugin({
        name: 'common', 
        filename: 'js/base.js'
      })
    ],
    devServer: {
      port:8086
    },
};