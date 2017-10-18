const fs = require('fs')
const { resolve } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const pxtorem = require('postcss-pxtorem')
const autoprefixer = require('autoprefixer')


/*** less css 解析配置  ***/
const postcssOpts = {
  ident: 'postcss',
  plugins: () => [
    autoprefixer({
      browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
    }),
    // pxtorem({ rootValue: 100, propWhiteList: [] })
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

const client = {
  name: 'client',
  // 控制编译生成代码类型
  devtool: 'source-map',
  // devtool: 'eval-source-map',
  // 项目基础目录
  context: resolve(__dirname, '..'),
  entry: [
    'babel-polyfill',
    './src/index.jsx'
  ],
  output: {
    path: resolve(__dirname, '../dist/client'),
    filename: '[name].[hash:7].js',
    chunkFilename: 'chunk.[name].js',
    publicPath: '/'
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },
  module: {
    rules: [
      {
        // 解析ECMAScript代码
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      // 解析less代码
      {
        test: /\.less$/i,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            { loader: 'postcss-loader', options: postcssOpts },
            'less-loader'
          ]
        })
      },
      // 解析css代码
      {
        test: /\.css$/i,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            { loader: 'postcss-loader', options: postcssOpts }
          ]
        })
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
        test: /\.(ttf|woff|woff2|eot)$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      },
      { test: /\.html$/, use: ['html-loader'] },
      { test: /\.svg$/, exclude: /node_modules/, loader: 'file-loader' }
    ]
  },
  resolve: webpackResolve,
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new HtmlWebpackPlugin({
      filename: resolve(__dirname, '../dist/template/index.html'),
      template: resolve(__dirname, '../template/index.html')
    }),
    // new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
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

const server = {
  name: 'server',
  target: 'node',
  node: {
    __filename: true,
    __dirname: true
  },
  entry: [
    'babel-polyfill',
    resolve(__dirname, '../server/server.prod')
  ],
  output: {
    path: resolve(__dirname, '../dist/server'),
    filename: 'server.js',
    libraryTarget: 'commonjs2',
  },
  externals,
  resolve: webpackResolve,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }, {
        test: /\.(less|css|jpg|png|gif|svg|ttf|woff|woff2|eot|html|json)$/,
        loader: 'ignore-loader',
      },
    ],
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
    // new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
  ],
}
module.exports = [client, server]