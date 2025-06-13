import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'

// 全局错误处理
Vue.config.errorHandler = function (err, vm, info) {
  console.error('Vue Error:', err, info)
}

// 平台适配
const platform = uni.getSystemInfoSync().platform
Vue.prototype.$platform = platform

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'

export function createApp() {
  const app = createSSRApp(App)

  // 全局错误处理
  app.config.errorHandler = (err, instance, info) => {
    console.error('Vue Error:', err, info)
  }

  // 全局属性
  const platform = uni.getSystemInfoSync().platform
  app.config.globalProperties.$platform = platform

  // 性能优化
  app.config.performance = true

  return {
    app
  }
}
// #endif

// 适配不同平台
uni.addInterceptor({
  returnValue(res) {
    if (!(!!res && (typeof res === 'object' || typeof res === 'function') && typeof res.then === 'function')) {
      return res
    }
    return new Promise((resolve, reject) => {
      res.then(res => res[0] ? reject(res[0]) : resolve(res[1]))
    })
  }
})