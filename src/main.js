import Vue from 'vue'
import App from './App'
import WXrequest from './utils/request'
import timestamp from './utils/timestamp'

Vue.prototype.$httpWX = WXrequest
Vue.prototype.$timestamp = timestamp
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue(App)
app.$mount()
