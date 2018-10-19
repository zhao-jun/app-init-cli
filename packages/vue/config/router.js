import Router from 'vue-router'
import routes from './routes'
import {Config} from './index'

export default () => {
  const router = new Router({
    base: Config.baseRouter,
    routes: routes.map(item => {
      // 部分功能统一处理
      item.props = route => Object.assign({}, route.query, route.params)
      return item
    }),
    mode: 'history'
  })
  beforeRouter(router);
  afterRouter(router);
  return router
}

const beforeRouter = (router) => {
  router.beforeEach((to, from, next) => {
    next();
  })
}

const afterRouter = (router) => {
  router.afterEach((to, from) => {
  })
}
