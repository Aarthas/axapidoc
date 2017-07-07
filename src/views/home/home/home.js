import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import Vuex from 'vuex'
Vue.use(Vuex)

import App from './home.vue'


import mall from '../mall/mall.vue'
import category from '../category/category.vue'
import cart from '../../cart/cart/cart.vue'
import mine from '../../mine/mine/mine.vue'

const routes = [
    {path: '/mall', meta: {id: 'mall'}, component: mall},
    {path: '/category', meta: {id: 'category'}, component: category},
    {path: '/cart', meta: {id: 'cart'}, component: cart},
    {path: '/mine', meta: {id: 'mine'}, component: mine}
]

import vuexI18n from 'vuex-i18n'


let store = new Vuex.Store({
    actions: {},
    modules: {
        i18n: vuexI18n.store

    }
})

Vue.use(vuexI18n.plugin, store)

const router = new VueRouter({
    routes: routes
})


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')