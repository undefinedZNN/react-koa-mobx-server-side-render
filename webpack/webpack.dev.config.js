const fs = require('fs')
const {resolve} = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const pxtorem = require('postcss-pxtorem')
const autoprefixer = require('autoprefixer')

const conf = require('../config/common.js')
// 获取项目配置运行端口
const port = conf.devPort

/*** less css 解析配置  ***/
const postcssOpts = {
  ident: 'postcss',
  plugins: () => [
    autoprefixer({
      browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
    }),
    pxtorem({ rootValue: 100, propWhiteList: [] })
  ],
}

/******** webpack 解析配置 ********/ 
const webpackResolve = {
  /*** 设置自动解析的扩展 ***/
  extensions: ['.web.js', '.js', '.json', '.jsx', '.less', '.css'],
  /*** 设置路径别名在开发是减少开发的代码量 ***/
  alias: {
    Assets: resolve(__dirname, '../src/assets/'),
    Containers: resolve(__dirname, '../src/containers/'),
    Components: resolve(__dirname, '../src/components/'),
    Stores: resolve(__dirname, '../src/stores/'),
    Utils: resolve(__dirname, '../src/utils/')
  }
}

/*** webpack 客户端配置 ***/
const client = {
  name: 'client',
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false',
    'react-hot-loader/patch',
    './src/index.jsx'
  ],
  output: {
    filename: '[name].js',
    chunkFilename: 'chunk.[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          useEslintrc: false,
          // configFile: path.join(__dirname, "eslint_conf.js")
          configFile: resolve(__dirname, '../.eslintrc')
        }
      },
      {
        // 解析ECMAScript代码
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      // 解析less/css代码
      {
        test: /\.(less|css)$/i,
        use: [
          'style-loader',
          'css-loader',
          { loader: 'postcss-loader', options: postcssOpts },
          'less-loader'
        ]
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      },
      { test: /\.html$/,  use: ['html-loader'] },
      { test: /\.json$/, use: ['json-loader'] }
    ]
  },
  resolve: webpackResolve,
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: resolve(__dirname, '../dist/template/index.html'),
      template: resolve(__dirname, '../template/index.html')
    }),
    new OpenBrowserPlugin({ url: `http://localhost:${port}` })
  ]
}

/******** 设置需要从输出的 bundle 中排除的依赖 ********/ 
const externals = fs
  .readdirSync(resolve(__dirname, '../node_modules'))
  .filter(x => !/\.bin|react-universal-component|webpack-flush-chunks/.test(x))
  .reduce((externals, mod) => {
    externals[mod] = `commonjs ${mod}`;
    return externals;
  }, {});
externals['react-dom/server'] = 'commonjs react-dom/server';

/*** webpack服务端配置 ***/
const server = {
  context: resolve(__dirname, '..'),
  name: 'server',
  target: 'node',
  entry: [
    'babel-polyfill',
    resolve(__dirname, '../server/render/index.jsx'),
  ],
  output: {
    path: resolve(__dirname, '../dist/server'),
    filename: 'server.js',
    libraryTarget: 'commonjs2',
    publicPath: '/'
  },
  resolve: webpackResolve,
  externals,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      { test: /\.(less|css|svg)$/, loader: 'ignore-loader' },
      { test: /\.html$/,  use: ['html-loader'] },
      { test: /\.json$/, use: ['json-loader'] }
    ],
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    })
  ],
}
module.exports = [client, server]