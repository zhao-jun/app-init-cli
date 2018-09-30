import Vue from 'vue'
import App from './app'
import VueRouter from 'vue-router'
import createRouter from './config/router'

// import './assets/styles/test.less'

// const root = document.createElement('div')
// document.body.appendChild(root)

Vue.use(VueRouter)
const router = createRouter()

new Vue({
  router,
  render: h => h(App)
}).$mount("#root")
