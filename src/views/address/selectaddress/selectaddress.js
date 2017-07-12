/**
 * Created by Simple on 2017/6/26.
 */
import Vue from 'vue'
// import VueRouter from 'vue-router'
// Vue.use(VueRouter)
import App from './selectaddress.vue'


// import list from './list.vue'
// import add from '../add/add.vue'
// import edit from '../edit/edit.vue'
//
// const routes = [
//     { path: '/list', component: list },
//     { path: '/add', component: add },
//     { path: '/edit', component: edit }
// ]
// const router = new VueRouter({
//     routes:routes
// })


new Vue({

    render: h => h(App)
}).$mount('#app')