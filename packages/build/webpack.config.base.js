const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const paths = require('./paths')
const appConfig = require('../app.config')
const utils = require('./utils')
// vue-start
const VueLoaderPlugin = require('vue-loader/lib/plugin') // vue-loader v15新增
// vue-end
// dev-start
const configDev = require('../config/dev')
// dev-end
const resolve = (dir) => path.join(__dirname, '..', dir)
const include = [resolve('test'), resolve('src')]
// dev-start
include.push(resolve(configDev.devType))
// dev-end

let config = {
  // webpack4新增
  mode: process.env.NODE_ENV || 'development',
  target: 'web', // 默认值
  entry: appConfig.devEntry,
  output: {
    filename: 'bundle.js',
    path: resolve('dist/public'),
    // 服务端渲染以后使用
    // publicPath: 'http://127.0.0.1:8000/public'
    // 两种写法都可以
    publicPath: '/public/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.vue'],
    alias: {
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.(vue|js|jsx)$/,
        loader: 'eslint-loader',
        include,
        enforce: 'pre',
        options: {
          // https://github.com/webpack-contrib/eslint-loader/issues/248
          // eslint-loader v2.1.1存在BUG，目前固定版本v2.1.0
          fix: true
        }
      },
      // vue-start
      {
        test: /\.vue$/,
        // 依赖css-loader、vue-template-compiler
        loader: 'vue-loader',
        include
      },
      // vue-end
      // 普通的 `.js` 文件以及 `.vue` 文件中的 `<script>` 块
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            // 依赖file-loader
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: utils.assetsPath('img/[name].[hash:7].[ext]')
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // vue-start
    // vue-loader v15 请确保引入这个插件！
    new VueLoaderPlugin(),
    // vue-end
    new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === 'development'
      ? 'index.html'
      : resolve('dist/index.html'),
      template: paths.buildHtml,
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // 可以在前端代码中使用，接受字符串中字符串，会将字符串当作变量
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `"${process.env.NODE_ENV}"`
      },
      // 'process.BASE_URL'
    })
  ]
}

// dev-start
config.entry = configDev.devType === 'vue' ? resolve('vue/index.js') : resolve('react/index.jsx')
// dev-end

module.exports = config
