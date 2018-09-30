export default [
  {
    path: '/',
    // 懒加载，此处接收函数
    component: () => import('../views/home.vue'),
    name: 'home',
    meta: {
      title: 'home'
    }
  },
  {
    path: '/404',
    component: () => import('../views/not-found.vue'),
    name: '404',
    meta: {
      title: '404'
    }
  },
  {
    path: '*',
    redirect: '/404'
  }
]
