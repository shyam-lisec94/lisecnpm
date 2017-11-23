'use strict';

const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const path = require('path');


module.exports = {
    output: {
      path: path.join(__dirname, '../build'),
      filename: '[name]-[hash].js'
    },
  
    plugins: [
      new HtmlPlugin({
        title: 'Saiku Report Viewer',
        template: path.join(__dirname, '../src', 'html', 'template.html')
      }),
      new webpack.LoaderOptionsPlugin({
        options: {
          eslint: {
            configFile: path.join(__dirname, './eslint.core.js'),
            useEslintrc: false
          },
          postcss: () => {
            return [autoprefixer];
          }
        }
      })
    ],
  
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          include: /src/,
          loader: 'eslint-loader'
        }
      ],
      loaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          include: /src/,
          loaders: ['babel-loader']
        },
        {
          test: /\.styl$/,
          loaders: [
            'style-loader',
            'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
            'postcss-loader',
            'stylus-loader'
          ]
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
        {
          test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader',
          query: {
            limit: 10000,
            mimetype: 'application/font-woff'
          }
        },
        {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader',
          query: {
            limit: '10000',
            mimetype: 'application/octet-stream'
          }
        },
        {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'file-loader'
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'svg-url-loader',
          query: {
            limit: '10000',
            mimetype: 'application/svg+xml'
          }
        },
        {
          test: /\.(png|jpg)$/,
          loader: 'url-loader',
          query: {
            limit: 8192
          }
        },
        {
          test: /\.ico(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader'
        }
      ]
    },
  
    node: {
      dns: 'empty',
      net: 'empty',
      tls: 'empty'
    },
  
    resolve: {
      alias: {
        src: path.join(__dirname, '../src'),
        components: path.join(__dirname, '../src', 'components')
      }
    }
  };