import Vue from 'vue'
import { NAV_SELECTEDKEYS, MENU_SELECTEDKEYS, MENU_OPENKEYS, TAB_SELECTEDKEYS } from '@/store/mutation-types'

const selected = {
  namespaced: true,
  state: {
    navSelectedKeys: [],
    menuSelectedKeys: [],
    menuOpenKeys: [],
    tabSelectedKeys: []
  },
  getters: {
    navSelectedKeys (state) {
      return state.navSelectedKeys
    },
    menuSelectedKeys (state) {
      return state.menuSelectedKeys
    },
    menuOpenKeys (state) {
      return state.menuOpenKeys
    }
  },
  mutations: {
    SET_NAVKEYS: (state, navSelectedKeys) => {
      Vue.ss.set(NAV_SELECTEDKEYS, navSelectedKeys)
      state.navSelectedKeys = navSelectedKeys
    },
    SET_MENUSELECTEDKEYS: (state, menuSelectedKeys) => {
      Vue.ss.set(MENU_SELECTEDKEYS, menuSelectedKeys)
      state.menuSelectedKeys = menuSelectedKeys
    },
    SET_MENUOPENKEYS: (state, menuOpenKeys) => {
      Vue.ss.set(MENU_OPENKEYS, menuOpenKeys)
      state.menuOpenKeys = menuOpenKeys
    }
  }
}

export default selected
