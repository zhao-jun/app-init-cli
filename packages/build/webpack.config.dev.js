const path = require('path')
const webpack = require('webpack')
const basicConfig = require('./webpack.config.base')
const webpackMerge = require('webpack-merge')

const isDev = process.env.NODE_ENV === 'development'

// // css module开发和生产命名区分
// const localIdentName = isDev
// ? '[path][name]-[local]-[hash:base64:5]'
// : '[hash:base64:5]'

const resolve = (dir) => path.join(__dirname, '..', dir)
const include = [resolve('client'), resolve('test'), resolve('vue'), resolve('react'), resolve('src')]

module.exports = webpackMerge(basicConfig, {
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          // vue-start
          'vue-style-loader',
          // vue-end
          // 原来vue-loader css-module配置移到这
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[path][name]-[local]-[hash:base64:5]',
              camelCase: true // 驼峰
            }
          },
          'postcss-loader',
          'less-loader'
        ],
        include
      }
    ]
  },
  devServer: {
    port: 8000,
    host: '0.0.0.0',
    overlay: {
      errors: true
    },
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    historyApiFallback: {
      index: '/public/index.html'
    },
    // In JavaScript code, you can access it with `process.env.PUBLIC_URL`.
    // Note that we only recommend to use `public` folder as an escape hatch
    // for files like `favicon.ico`, `manifest.json`, and libraries that are
    // for some reason broken when imported through Webpack.
    contentBase: resolve('public'),
    proxy: {
      '/api': 'http://127.0.0.1:3030'
    }
  },
  plugins: [
    // webpack-dev-server hot
    new webpack.HotModuleReplacementPlugin(),
  ]
})
