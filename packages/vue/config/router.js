import Router from 'vue-router'
import routes from './routes'

// 服务端渲染需要每次导出新的路由
export default () =>
  new Router({
    routes: routes.map(item => {
      // 部分功能统一处理
      item.props = route => Object.assign({}, route.query, route.params)
      return item
    }),
    mode: 'history'
  })
