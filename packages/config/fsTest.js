const fs = require('fs')

let data = fs.readFileSync('./packages/.babelrc')
// data = data.toString().split('\r\n').filter(i => !i.includes('vue')).join('\r\n')
// data = data.toString().replace(/\/\/\svue-start[\s\S]*?\/\/\svue-end\s+/g, '')
// console.log(data.toString())
data = data.toString().replace(/[ ]+\/\/\s(vue-start|react-start)[\s\S]*?\/\/\s(vue-end|react-end)[\t\r\n\v\f]+/g, '')
console.log(data)

fs.writeFileSync('.babelrc', data)
