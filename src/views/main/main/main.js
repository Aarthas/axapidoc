import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import Vuex from 'vuex'
Vue.use(Vuex)
import VueScroller from 'vue-scroller'
Vue.use(VueScroller)
Vue.use(require('vue-wechat-title'))
import App from './main.vue'

//home
import home from '../../home/home/home.vue'
import mall from '../../home/mall/mall.vue'
import category from '../../home/category/category.vue'
import cart from '../../home/cart/cart.vue'
import mine from '../../mine/mine/mine.vue'

//address
import selectaddress from '../../address/selectaddress/selectaddress.vue'
import addaddress from '../../address/add/add.vue'
import editaddress from '../../address/edit/edit.vue'
import listaddress from '../../address/showlist/list.vue'

//product
import listproduct from '../../product/list/list.vue'
import detailmain from '../../product/detail/app.vue'
import detailproduct from '../../product/detail/detail.vue'

import introduction from '../../product/detail/components/introduction.vue'
import guarantee from '../../product/detail/components/guarantee.vue'
//trade
import listtrade from '../../trade/list/list.vue'
import detailtrade from '../../trade/detail/detail.vue'

const routes = [
    {
        path: '/home', component: home,
        children: [
            {path: '', meta: {id: 'mall'}, component: mall},
            {path: '/mall', meta: {id: 'mall',title: '三江购物'}, component: mall},
            {path: '/category', meta: {id: 'category',title: '分类'}, component: category},
            {path: '/cart', meta: {id: 'cart',title: '购物车'}, component: cart},
            {path: '/mine', meta: {id: 'mine',title: '我的'}, component: mine}
        ]
    },
    {path: '/selectaddress', meta: {title: '选择地址'}, component: selectaddress},
    {path: '/addaddress', meta: {title: '增加地址列表'}, component: addaddress},
    {path: '/editaddress', meta: {title: '编辑地址'}, component: editaddress},
    {path: '/listaddress', meta: {title: '地址列表'}, component: listaddress},
    {path: '/listproduct', meta: {title: '商品列表'}, component: listproduct},
    {path: '/product', meta: {title: '商品详情'}, component: detailmain,
        children: [
            { path: 'detail',meta: {title: '商品详情'}, component: detailproduct },
            { path: 'introduction', component: introduction },
            { path: 'guarantee', component: guarantee },
        ]

    },
    {path: '/listtrade', meta: {title: '订单列表'}, component: listtrade},
    {path: '/detailtrade', meta: {title: '订单详情'}, component: detailtrade},
    // {path: '/category', meta: {id: 'category'}, component: category},
    // {path: '/cart', meta: {id: 'cart'}, component: cart},
    // {path: '/mine', meta: {id: 'mine'}, component: mine}
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