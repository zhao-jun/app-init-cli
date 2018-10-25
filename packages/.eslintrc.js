module.exports = {
    root: true,
    env: {
      browser: true,
      es6: true
    },
    extends: [
      // https://github.com/standard/standard/blob/master/docs/RULES-zhcn.md
      "standard",
      // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
      "plugin:vue/essential",
      // https://github.com/prettier/eslint-plugin-prettier#readme
      "plugin:prettier/recommended"
    ],
    parserOptions: {
      parser: "babel-eslint",
      ecmaVersion: 6
    },
    plugins: [
      "vue"
      // "standard",
      // "promise",
      // "html"
    ],
    rules: {
      "prettier/prettier": "error",
      // allow async-await
      'generator-star-spacing': 'off',
      // allow debugger during development
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    }
};
