const webpack = require('webpack');
const path = require('path')
const opn = require('opn')
const chalk = require('chalk')
const webpackDevServer = require('webpack-dev-server');
const webpackDevConfig = require('../build/webpack.config.dev')

const resolve = (dir) => path.join(__dirname, '..', dir)

const compiler = webpack(webpackDevConfig)

let serverConfig = {
  port: 8000,
  host: '0.0.0.0',
  overlay: {
    // 在浏览器页面上显示编译错误，默认false
    errors: true
  },
  hot: true,
  headers: { 'Access-Control-Allow-Origin': '*' },
  // 404，前端路由
  historyApiFallback: {
    index: '/public/index.html',
    disableDotRule: true
  },
  // Enable gzip compression of generated files.
  compress: true,
  // In JavaScript code, you can access it with `process.env.PUBLIC_URL`.
  // Note that we only recommend to use `public` folder as an escape hatch
  // for files like `favicon.ico`, `manifest.json`, and libraries that are
  // for some reason broken when imported through Webpack.
  // 根目录
  contentBase: resolve('public'),
  watchContentBase: true,
  // 静态文件资源引用路径，和webpack.config.base.js文件里面output的publicPath一样
  publicPath: '/public/',
  // Reportedly, this avoids CPU overload on some systems.
  // https://github.com/facebookincubator/create-react-app/issues/293
  watchOptions: {
    ignored: /node_modules/,
  },
  // 此处无用，使用opn
  // open: true,
  proxy: {
    '/api': 'http://127.0.0.1:3030'
  }
}
const url = 'http://localhost:' + serverConfig.port
const devServer = new webpackDevServer(compiler, serverConfig);

devServer.listen(8000, '127.0.0.1', err => {
  if (err) {
    return console.log(err);
  }
  console.log(chalk.cyan('Starting the development server...\n'));
  opn(url);
});

// console todo
