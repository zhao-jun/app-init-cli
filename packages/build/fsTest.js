const fs = require('fs')

let data = fs.readFileSync('./build/webpack.config.base.js')
data = data.toString().split('\r\n').filter(i => !i.includes('vue')).join('\r\n')

fs.writeFileSync('webpack.config.base1.js', data)
