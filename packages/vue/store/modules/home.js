export default {
  namespaced: true,
  state: {
    text: 'Welcome to use app-init-cli'
  },
  mutations: {
    updateText (state, text) {
      state.text = text
    }
  },
  actions: {
    // TODO: ajax、Node端暂未添加
    // async getHomeList ({commit}) {
    //   // let data = await getHomeText()
    //   commit('updateText', data)
    // }
  }
}
