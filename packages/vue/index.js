import Vue from 'vue'
import App from './app'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import createRouter from './config/router'
import createStore from './store/store'

if (process.env.NODE_ENV === 'development') require('./mock')

// import './assets/styles/test.less'

// const root = document.createElement('div')
// document.body.appendChild(root)

Vue.use(VueRouter)
Vue.use(Vuex)

const router = createRouter()
const store = createStore()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#root')
