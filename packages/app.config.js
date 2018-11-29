const path = require('path')
const resolve = (dir) => path.join(__dirname, dir)

module.export = {
  webpack: {
    devEntry: resolve('src/index'),
    proEntry: resolve('src/index'),
    compEntry: resolve('src/main')
  }
};
