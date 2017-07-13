/**
 * Created by Simple on 2017/7/12.
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


import App from './app.vue'

import confirm from './confirm.vue'

import list from '../selectcoupons/list.vue'
import usecoupon from '../selectcoupons/usecoupon.vue'
const routes = [
    { path: '/', component: confirm },
    { path: '/confirm', component: confirm },
    { path: '/usecoupon', component: usecoupon },
    { path: '/list', component: list },
]




const router = new VueRouter({
    routes:routes
})



new Vue({
    router,
    render: h => h(App)
}).$mount('#app')