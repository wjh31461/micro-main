import Vue from 'vue'

export function initSharedComponent () {
  Object.defineProperty(window, 'sharedComponent', {
    get: function () {
      return Vue.ss.get('sharedComponent') ? Vue.ss.get('sharedComponent') : {}
    },
    set: function (value) {
      Vue.prototype.$bus.emit('onSharedComponentChange', value)
      Vue.ss.set('sharedComponent', value)
    }
  })
}
