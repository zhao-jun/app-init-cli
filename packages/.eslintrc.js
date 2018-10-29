let config = {
    root: true,
    env: {
      browser: true,
      es6: true
    },
    extends: [
      // https://github.com/standard/standard/blob/master/docs/RULES-zhcn.md
      // "standard",
      // vue-start
      // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
      "plugin:vue/essential",
      // vue-end
      // react-start
      "react-app",
      // react-end
      // https://github.com/prettier/eslint-plugin-prettier#readme
      "plugin:prettier/recommended"
    ],
    parserOptions: {
      parser: "babel-eslint",
      ecmaVersion: 6,
      // react-start
      // https://github.com/mobxjs/mobx-react/issues/528
      ecmaFeatures: {
        legacyDecorators: true
      }
      // react-end
    },
    plugins: [
      // vue-start
      "vue"
      // vue-end
    ],
    rules: {
      // prettier标记的地方抛出错误信息，eslint进行autofix
      "prettier/prettier": "error",
      // allow async-await
      'generator-star-spacing': 'off',
      // allow debugger during development
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    }
};

// dev-start
const configDevType = require('./config/dev.js').devType
let filterType
if (configDevType === 'vue') filterType = 'react'
if (configDevType === 'react') filterType = 'vue'
config.extends = config.extends.filter(i => !i.includes(filterType))
config.plugins = config.plugins.filter(i => !i.includes(filterType))
// dev-end

module.exports = config
