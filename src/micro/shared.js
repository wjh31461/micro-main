import Vue from 'vue'

let sharedComponent = {}
export function initSharedComponent () {
  Object.defineProperty(window, 'sharedComponent', {
    get: function (value) {
      return sharedComponent
    },
    set: function (value) {
      sharedComponent = value
      Vue.prototype.$bus.emit('onSharedComponentChange', value)
    }
  })
}
