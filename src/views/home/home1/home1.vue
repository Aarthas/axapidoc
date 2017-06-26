<template>
    <div>
       <router-view></router-view>
        <tabbar>
            <tabbar-item link="/tab1" selected>
                <img slot="icon" src="http://onpxz5rdd.bkt.clouddn.com/tab1.png">
                <img slot="icon-active"  src="http://onpxz5rdd.bkt.clouddn.com/tab1_p.png">
                <span slot="label">首页</span>
            </tabbar-item>
            <tabbar-item link="/tab2">
                <img slot="icon" src="http://onpxz5rdd.bkt.clouddn.com/tab2.png">
                <img slot="icon-active" src="http://onpxz5rdd.bkt.clouddn.com/tab2_p.png">
                <span slot="label">分页</span>
            </tabbar-item>
            <tabbar-item link="/tab2">
                <img slot="icon" src="http://onpxz5rdd.bkt.clouddn.com/tab4.png">
                <img slot="icon-active" src="http://onpxz5rdd.bkt.clouddn.com/tab4_p.png">
                <span slot="label">购物车</span>
            </tabbar-item>
            <tabbar-item>
                <img slot="icon" src="http://onpxz5rdd.bkt.clouddn.com/tab5.png">
                <img slot="icon-active" src="http://onpxz5rdd.bkt.clouddn.com/tab5_p.png">
                <span slot="label">我的</span>
            </tabbar-item>
        </tabbar>
    </div>
</template>

<script>
    import Lib from 'assets/js/Lib';
    import { Tabbar, TabbarItem, Group, Cell } from 'vux'
    export default {
        components: {
            Tabbar,
            TabbarItem,
            Group,
            Cell
        }
    }
</script>