const path = require('path')
const basicConfig = require('./webpack.config.base')
const webpackMerge = require('webpack-merge')
const appConfig = require('../app.config')
const VueLoaderPlugin = require('vue-loader/lib/plugin') // vue-loader v15新增
const webpack = require('webpack')
const packageJson = require('../package.json')

const resolve = (dir) => path.join(__dirname, '..', dir)
const include = [resolve('test'), resolve('src')]
let config =  webpackMerge(basicConfig, {
  entry: appConfig.compEntry,
  output: {
    filename: 'index.js',
    library: packageJson.name,
    libraryTarget: 'umd',
    path: resolve('dist')
  },
  externals: {
    vue: 'vue',
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        // 生产环境提取css
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader'
        ],
        include
      }
    ]
  }
})

// 覆盖base中的plugins
config.plugins = [
  new VueLoaderPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: `"${process.env.NODE_ENV}"`
    }
  })
]

module.exports = config
