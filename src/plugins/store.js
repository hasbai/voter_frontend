import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

const store = createStore({
  plugins: [
    createPersistedState({
      paths: ['username'],
    }),
  ],
  state() {
    return {
      username: ''
    }
  },
  getters: {
  },
  mutations: {
    setUsername(state, username) {
      state.username = username
    },
  },
})

export default store
