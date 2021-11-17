import Vue from 'vue'

export function initSharedComponents () {
  Object.defineProperty(window, 'sharedComponents', {
    get: function () {
      return Vue.ss.get('sharedComponents') ? Vue.ss.get('sharedComponents') : {}
    },
    set: function (value) {
      Vue.prototype.$bus.emit('onSharedComponentsChange', value)
      Vue.ss.set('sharedComponents', value)
    }
  })
}
