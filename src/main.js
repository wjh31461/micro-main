import Vue from 'vue'
import App from './App.vue'
// 自定义插件
import './plugins'
// vue-x
import { store, initStore } from './store/index'
// vue-router
import router from './router/index'
// 全局样式
import '@/styles/global.less'
// 微前端
import startQiankun from '@/micro/index'
import actions from '@/micro/actions'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
  created () {
    // 初始化vuex存储空间
    initStore()
    // 初始化qiankun globalstate
    initGlobalState()
    // 根据配置进行渲染
    render()
  }
}).$mount('#app')

function initGlobalState () {
  actions.setGlobalState({
    // 当前已加载微应用，用于作为跨应用keepAlive的全局变量
    'loadedApps': {},
    // 当前所有微应用所需要对应的路由地址
    'routes': {}
  })
}

function render () {
  if (!window.custom.needLogin) {
    // 如果不存在登录页面，直接加载页面
    store.dispatch('user/Navigation').then((activeRule) => {
      router.push(activeRule)
    })
  } else {
    // 如果存在登录页面，则先进入登录页面
    router.push('/login')
  }
}

startQiankun({
  prefetch: false
})
