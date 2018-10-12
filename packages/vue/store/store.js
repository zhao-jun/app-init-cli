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
  return store
}
