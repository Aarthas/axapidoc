import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


import App from './home.vue'
import category from '../category/category.vue'
import mine from '../../mine/mine/mine.vue'
import tab1 from './tab1.vue'
import tab2 from './tab2.vue'
import mall from '../mall/mall.vue'

const routes = [
    { path: '/mall', component: mall },
    { path: '/category', component: category },
    { path: '/tab2', component: tab2 },
    { path: '/mine', component: mine }
]



const router = new VueRouter({
    routes:routes
})




new Vue({
    router,
    render: h => h(App)
}).$mount('#app')