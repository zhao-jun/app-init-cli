import Vue from 'vue'
import App from './app'
// import './assets/styles/test.less'

// const root = document.createElement('div')
// document.body.appendChild(root)

new Vue({
  render: h => h(App)
}).$mount("#root")
