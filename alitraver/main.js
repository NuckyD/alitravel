import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

// 引入vux
import store from './store/store.js'
Vue.prototype.$store = store

// 引入tab切换的loading
import loader from './element/loading.vue'
Vue.component('load-list',loader)

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
