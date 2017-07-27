/**
 * Created by Simple on 2017/7/6.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import App from './app.vue'
import detail from './detail.vue'
import introduction from './components/introduction.vue'
import guarantee from './components/guarantee.vue'
import selectaddress from '../../address/selectaddress/selectaddress.vue'
const routes = [
    { path: '/', component: detail },
    { path: '/detail', component: detail },
    { path: '/introduction', component: introduction },
    { path: '/guarantee', component: guarantee },
    { path: '/selectaddress', component: selectaddress },
]

const router = new VueRouter({
    routes:routes
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')

