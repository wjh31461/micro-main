<template>
  <div id="app">
    <!-- 全屏样式布局-登陆页 -->
    <view-layout v-show="isLogin"></view-layout>
    <!-- 系统内部布局 -->
    <app-layout v-show="!isLogin"></app-layout>
  </div>
</template>

<script>
import { ViewLayout, AppLayout } from '@comp/Layout'
import { loadMicroApp } from 'qiankun'
import apps from '@/micro/apps'
import actions from '@/micro/actions'

export default {
  name: 'App',
  components: { ViewLayout, AppLayout },
  data () {
    return {
      // 全部配置微应用信息
      apps,
      // 当前已加载的微应用信息
      loadedApps: {},
      // 全部微应用路由信息
      routes: {},
      isLogin: true
    }
  },
  computed: {
    listenRoutes () {
      return this.$store.state.user.routes
    }
  },
  watch: {
    listenRoutes: {
      deep: true,
      immediate: true,
      handler: function (routes) {
        if (Object.keys(routes).length) {
          this.routes = _.cloneDeep(routes)
        }
      }
    },
    $route: {
      deep: true,
      immediate: true,
      handler: function (route) {
        if (route.fullPath !== '/') {
          if (route.name !== 'login') {
            this.isLogin = false
            this.loadApp(route)
          } else {
            this.isLogin = true
          }
        }
      }
    }
  },
  created () {
    // 不需要登录
    if (!window.custom.loginPage) {
      this.isLogin = false
    }
  },
  mounted () {
    let self = this

    self.$bus.$on('onUpdateLoadedAppsRoutes', function (tabs) {
      self.updateLoadedApps(tabs)
    })
  },
  beforeDestroy () {
    this.$bus.$off('onUpdateLoadedAppsRoutes')
  },
  methods: {
    // 微应用加载
    loadApp (route) {
      let self = this
      let microApp = apps.filter(app => route.fullPath.includes(app.activeRule))[0]
      if (!self.loadedApps[microApp.name]) {
        self.$store.commit('micro/SET_LOADING', true)
        // 如果当前未加载该应用
        let app = loadMicroApp(microApp)
        self.loadedApps[microApp.name] = {
          app,
          routes: []
        }
        app.mountPromise.then(() => {
          self.$store.commit('micro/SET_LOADING', false)
          actions.setGlobalState({ 'routes': self.routes })
        })
      } else {
        // 如果该微应用已经被加载过
        let app = self.loadedApps[microApp.name].app
        // 获取当前该子应用状态，当状态为NOT_MOUNTED时，从新触发该子应用的mount生命周期
        if (app.getStatus() === 'NOT_MOUNTED') {
          app.mount().then(() => {
            actions.setGlobalState({ 'routes': self.routes })
          })
        }
      }
    },
    // 根据tab组件修改当前loadedApps中的routes，传递给微应用完成keepAlive的渲染
    updateLoadedApps (tabs) {
      let self = this
      let keys = Object.keys(self.loadedApps)
      if (!keys.length) return
      // 清空之前的路由缓存信息
      keys.forEach(key => {
        self.loadedApps[key].routes = []
      })
      // 根据当前key与传递的tab信息记录路由缓存记录
      tabs.forEach(tab => {
        let key = keys.filter(key => tab.path.includes(key))[0]
        self.loadedApps[key].routes.push(tab.path)
      })

      // 判断当前是否存在微应用已经关闭了所有tab页，如果存在则触发该微应用的unmount事件
      Promise.all(keys.map(key => {
        return new Promise((resolve, reject) => {
          if (!self.loadedApps[key].routes.length) {
            // 如果该微应用的状态为MOUNTED，则卸载改微应用，释放占用资源
            if (self.loadedApps[key].app.getStatus() === 'MOUNTED') {
              self.loadedApps[key].app.unmount().then(() => {
                resolve()
              })
            } else {
              resolve()
            }
          } else {
            resolve()
          }
        })
      })).then(() => [
        // 更新loadedApps全局变量
        actions.setGlobalState({ 'loadedApps': self.loadedApps })
      ])
    }
  }
}
</script>

<style>

</style>
