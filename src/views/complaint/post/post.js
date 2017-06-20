import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import post_1 from './post_1.vue'
import post_2 from './post_2.vue'
import App from './App.vue'

console.log("bb")
const routes = [
    { path: '/', component: post_1 },
    { path: '/post2', component: post_2 }
]



const router = new VueRouter({
    routes:routes
})




new Vue({
    router,
    render: h => h(App)
}).$mount('#app')