import Vue from 'vue'
import App from './App.vue'
import './plugins'
import '@/styles/global.less'
import { store, initStore } from './store/index'
import router from './router/index'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
  created () {
    initStore()
    if (!window.customElements.hasLogin) {
      store.dispatch('user/Navigation').then(() => {
        
      })
    }
  }
}).$mount('#app')
