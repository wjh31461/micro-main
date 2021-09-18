import Vue from 'vue'
import store from './index'
import config from './config'
import {
  USER_NAME,
  ACCESS_SECURITY,
  ACCESS_TOKEN,
  NAVS,
  MENUS,
  NAV_SELECTEDKEYS,
  MENU_SELECTEDKEYS,
  MENU_OPENKEYS
} from './mutation-types'
const { user, selected } = config

export default function initStore () {
  store.commit('user/SET_USER', Vue.ss.get(USER_NAME, user.user))
  store.commit('user/SET_SECURITY', Vue.ss.get(ACCESS_SECURITY, user.security))
  store.commit('user/SET_TOKEN', Vue.ss.get(ACCESS_TOKEN, user.token))
  store.commit('user/SET_NAVS', Vue.ss.get(NAVS, user.navs))
  store.commit('user/SET_MENUS', Vue.ss.get(MENUS, user.menus))

  store.commit('selected/SET_NAVKEYS', Vue.ss.get(NAV_SELECTEDKEYS, selected.navSelectedKeys))
  store.commit('selected/SET_MENUSELECTEDKEYS', Vue.ss.get(MENU_SELECTEDKEYS, selected.menuSelectedKeys))
  store.commit('selected/SET_MENUOPENKEYS', Vue.ss.get(MENU_OPENKEYS, selected.menuOpenKeys))
}
