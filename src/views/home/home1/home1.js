import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


import App from './home1.vue'
import tab1 from './tab1.vue'
import tab2 from './tab2.vue'

const routes = [
    { path: '/tab1', component: tab1 },
    { path: '/tab2', component: tab2 }
]



const router = new VueRouter({
    routes:routes
})




new Vue({
    router,
    render: h => h(App)
}).$mount('#app')