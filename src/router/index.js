import Vue from 'vue'
import Router from 'vue-router'
import defaultRoutes from './routes'
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'

Vue.use(Router)

function createRouter () {
  return new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: defaultRoutes
  })
}

const router = createRouter()

// router.beforeEach((to, from, next) => {
//   NProgress.start()
// })

// router.afterEach(() => {
//   NProgress.done()
// })

export default router
