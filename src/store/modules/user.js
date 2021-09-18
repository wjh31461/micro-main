import Vue from 'vue'
import { USER_NAME, ACCESS_SECURITY, ACCESS_TOKEN, NAVS, MENUS } from '@/store/mutation-types'
import { handleMenus } from '@/utils/menu.js'
import menu from '@/mock/menu.js' 

const user = {
  namespaced: true,
  state: {
    username: '',
    security: '',
    token: '',
    navs: [],
    menus: [],
    routes: []
  },
  getters: {
    username (state) {
      return state.username
    },
    router (state) {
      return state.routes
    }
  },
  mutations: {
    SET_USER: (state, user) => {
      Vue.ss.set(USER_NAME, user)
      state.username = user
    },
    SET_SECURITY: (state, security) => {
      Vue.ss.set(ACCESS_SECURITY, security)
      state.security = security
    },
    SET_TOKEN: (state, token) => {
      Vue.ss.set(ACCESS_TOKEN, token)
      state.token = token
    },
    SET_NAVS: (state, navs) => {
      Vue.ss.set(NAVS, navs)
      state.navs = navs
    },
    SET_MENUS: (state, menus) => {
      Vue.ss.set(MENUS, menus)
      state.menus = menus
    },
    SET_ROUTES: (state, routes) => {
      state.routes = routes
    }
  },
  actions: {
    // 登录
    Login ({ commit }, params) {
      
    },
    // 退出登录
    Logout ({ commit, state }) {
      
    },
    Security ({ commit }) {
      
    },
    // 获取菜单
    Navigation ({ commit, state }) {
      let data = menu
      // eslint-disable-next-line no-unused-vars
      let navs = []; let menus = []; let activeRule
      if (window.custom.menuLayout === 'nav') {
        // 导航栏模式布局
        data.forEach((nav, index) => {
          navs.push({
            title: nav.title,
            icon: nav.icon ? nav.icon : 'table',
            target: nav.target,
            path: nav.activeRule + '/' + nav.target,
            menus: []
          })

          if (nav.children && nav.children.length) {
            // 如果存在子菜单
            navs[index].menus = handleMenus(nav.children, nav.target)
          }
        })
        commit('SET_NAVS', navs)
      } else if (window.custom.menuLayout === 'menu') {
        // 侧边栏模式布局
        menus = handleMenus(data)
        commit('SET_MENUS', menus)
      }
    },
    // 动态路由
    GenerateRoutes ({ commit }) {
      
    }
  }
}

export default user
