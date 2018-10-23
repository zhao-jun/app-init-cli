import { getHomeList } from '../../service/home'

export default {
  namespaced: true,
  state: {
    text: ''
  },
  mutations: {
    updateText (state, text) {
      state.text = text
    },
    updateList (state, data) {
      state.list = data.list
      state.text = data.title
    }
  },
  actions: {
    // mock数据
    async getHomeList ({ commit }) {
      let data = await getHomeList()
      commit('updateList', data)
    }
  }
}
