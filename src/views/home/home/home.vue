<template>
    <div>
        <router-view></router-view>
        <m-tabbar v-model="select">
            <m-tabbar-item id='mall'>
                <img src="http://onpxz5rdd.bkt.clouddn.com/tab1.png" alt="" slot="icon-normal">
                <img src="http://onpxz5rdd.bkt.clouddn.com/tab1.png" alt="" slot="icon-active">
                首页







            </m-tabbar-item>
            <m-tabbar-item id='category'>
                <img src="http://onpxz5rdd.bkt.clouddn.com/tab1.png" alt="" slot="icon-normal">
                <img src="http://onpxz5rdd.bkt.clouddn.com/tab1.png" alt="" slot="icon-active">
                分类







            </m-tabbar-item>
            <m-tabbar-item id='cart'>
                <img src="http://onpxz5rdd.bkt.clouddn.com/tab1.png" alt="" slot="icon-normal">
                <img src="http://onpxz5rdd.bkt.clouddn.com/tab1.png" alt="" slot="icon-active">
                <div>购物车</div>


            </m-tabbar-item>
            <m-tabbar-item id='mine'>
                <img src="http://onpxz5rdd.bkt.clouddn.com/tab5.png" alt="" slot="icon-normal">
                <img src="http://onpxz5rdd.bkt.clouddn.com/tab5.png" alt="" slot="icon-active">
                我的





            </m-tabbar-item>

        </m-tabbar>

    </div>
</template>

<script>
    import Lib from 'assets/js/Lib';
    import mTabbar from '../../../components/tabbar/tabbar'
    import mTabbarItem from '../../../components/tabbar/tabbar-item'

    export default {
        components: {

            mTabbar, mTabbarItem,

        },
        data() {
            return {
                select: "mall"
            }
        },
        watch: {
            select: function (newVal, oldVal) {
                console.log(newVal)
                this.$router.replace({path: newVal})
            }
        },
        created () {
            let path = this.$route.path;
            this.select = path.substr(1, path.length)
        },
        methods: {}
    }
</script>
<style scoped>

</style>