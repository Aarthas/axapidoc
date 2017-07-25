import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


import App from './app.vue'
import list from './list.vue'
import exchange from './exchange.vue'
import h5srcframe from './h5srcframe.vue'

const routes = [
    { path: '/', component: list },
    { path: '/list', component: list },
    { path: '/exchange', component: exchange },
    { path: '/h5srcframe', component: h5srcframe },

]



const router = new VueRouter({
    routes:routes
})




new Vue({
    router,
    render: h => h(App)
}).$mount('#app')