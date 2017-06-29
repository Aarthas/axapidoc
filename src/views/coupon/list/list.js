import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


import App from './app.vue'
import list from './list.vue'
import exchange from './exchange.vue'


const routes = [
    { path: '/list', component: list },
    { path: '/exchange', component: exchange },

]



const router = new VueRouter({
    routes:routes
})




new Vue({
    router,
    render: h => h(App)
}).$mount('#app')