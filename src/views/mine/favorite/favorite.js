/**
 * Created by Simple on 2017/6/26.
 */

import Vue from 'vue'

import App from './favorite.vue'
import VueScroller from 'vue-scroller'
Vue.use(VueScroller)
new Vue({
    render: h => h(App)
}).$mount('#app')
