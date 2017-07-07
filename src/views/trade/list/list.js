/**
 * Created by Simple on 2017/6/27.
 */


import Vue from 'vue'

import App from './list.vue'
import VueScroller from 'vue-scroller'
Vue.use(VueScroller)
new Vue({
    render: h => h(App)
}).$mount('#app')
