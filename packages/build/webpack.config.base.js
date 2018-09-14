const path = require('path')

const resolve = (dir) => path.join(__dirname, '..', dir)

module.exports = {
  // webpack4新增
  mode: process.env.NODE_ENV || 'development',
  target: 'web', // 默认值
//   entry: resolve('client/client-entry.js'),
  entry: resolve('vue/index.js'),
  output: {
    filename: 'bundle.js',
    path: resolve('client-dist/public'),
    publicPath: 'http://127.0.0.1:8000/public'
    // 两种写法都可以
    // publicPath: '/public/'
  },
  module: {
    rules: [
    //   {
    //     test: /\.(vue|js|jsx)$/,
    //     loader: 'eslint-loader',
    //     include: [resolve('client'), resolve('test'), resolve('vue')]
    //     enforce: 'pre'
    //   },
      // vue-start
      {
        test: /\.vue$/,
        // 依赖css-loader、vue-template-compiler
        loader: 'vue-loader',
        include: [resolve('client'), resolve('test'), resolve('vue')]
      },
      // vue-end
      // 普通的 `.js` 文件以及 `.vue` 文件中的 `<script>` 块
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('client'), resolve('test'), resolve('vue')]
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
  }
}
