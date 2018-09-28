const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const paths = require('./paths')
// vue-start
const VueLoaderPlugin = require('vue-loader/lib/plugin') // vue-loader v15新增
// vue-end

const resolve = (dir) => path.join(__dirname, '..', dir)
const include = [resolve('client'), resolve('test'), resolve('vue'), resolve('react'), resolve('src')]

let config = {
  // webpack4新增
  mode: process.env.NODE_ENV || 'development',
  target: 'web', // 默认值
  entry: resolve('src/index.js'),
  output: {
    filename: 'bundle.js',
    path: resolve('dist/public'),
    // 服务端渲染以后使用
    // publicPath: 'http://127.0.0.1:8000/public'
    // 两种写法都可以
    publicPath: '/public/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.vue']
  },
  module: {
    rules: [
      //   {
      //     test: /\.(vue|js|jsx)$/,
      //     loader: 'eslint-loader',
      //     include,
      //     enforce: 'pre'
      //   },
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
              name: '[name].[hash:8].[ext]'
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
      template: resolve('public/template.html')
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
config.entry = resolve('react/index.jsx')
// dev-end

module.exports = config
