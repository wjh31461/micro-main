import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import selected from './modules/selected'

export { default as initStore } from './initStore'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    user,
    selected
  },
  state: {},
  mutations: {},
  actions: {},
  getters: {}
})

export default store
