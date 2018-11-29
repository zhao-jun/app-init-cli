const packageJson = require('./../packages/package.json')

// vue、react各自独有的依赖
const vueDep = ["vue", "vue-router", "vuex", "vue-style-loader", "vue-loader", "eslint-plugin-vue", "vconsole"],
  reactDep = ["react", "react-dom", "react-hot-loader", "react-router-dom", "babel-preset-react", "react-loadable", "babel-plugin-syntax-dynamic-import", "babel-preset-react", "babel-plugin-transform-decorators-legacy", "eslint-plugin-flowtype", "eslint-plugin-jsx-a11y", "eslint-plugin-react", "eslint-config-react-app", "mobx-react", "mobx"],
  blankDep = vueDep.concat(reactDep),
  depend = [blankDep, vueDep, reactDep]

// 维护vue、react的相关依赖
// 无框架依赖, 排除vue、react依赖
// react项目, 排除vue的相关依赖
// vue项目, 排除react的相关依赖
module.exports = [...Array(3)].map((_, index) => ({
  "dependencies": (() => {
    let obj = JSON.parse(JSON.stringify(packageJson.dependencies))
    for (let key in obj) {
      if (depend[index].includes(key)) delete obj[key]
    }
    return obj
  })(),
  "devDependencies": (() => {
    let obj = JSON.parse(JSON.stringify(packageJson.devDependencies))
    for (let key in obj) {
      if (depend[index].includes(key)) delete obj[key]
    }
    return obj
  })()
}))
