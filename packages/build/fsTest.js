const fs = require('fs')

let data = fs.readFileSync('./packages/build/webpack.config.base.js')
// data = data.toString().split('\r\n').filter(i => !i.includes('vue')).join('\r\n')
// data = data.toString().replace(/\/\/\svue-start[\s\S]*?\/\/\svue-end\s+/g, '')
data = data.toString().replace(/\/\/\s(vue-start|react-start)[\s\S]*?\/\/\s(vue-end|react-end)\s+/g, '')

fs.writeFileSync('webpack.config.base1.js', data)
