import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import modules from './modules'

const isDev = process.env.NODE_ENV === 'development'

export default () => {
  const store = new Vuex.Store({
    strict: isDev, // 仅mutation中修改state，开发的时候开启
    getters,
    mutations,
    actions,
    modules
  })

  if (module.hot) {
    module.hot.accept(
      [
        // './mutations',
        // './actions',
        // './getters',
        './modules/home'
      ],
      () => {
        // const newMutations = require('./mutations').default
        // const newActions = require('./actions').default
        // const newGetters = require('./getters').default
        const newModulesHome = require('./modules/home').default

        store.hotUpdate({
          // mutations: newMutations,
          // getters: newGetters,
          // actions: newActions,
          modules: {
            // 模块实现热重载必须单个写
            home: newModulesHome
          }
        })
      }
    )
  }
  return store
}
