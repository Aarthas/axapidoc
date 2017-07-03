<template>
    <div>
        <router-view></router-view>
        <m-tabbar v-model="select">
            <m-tabbar-item id='mall' >
                <img src="http://onpxz5rdd.bkt.clouddn.com/tab1.png" alt="" slot="icon-normal">
                <img src="http://onpxz5rdd.bkt.clouddn.com/tab1.png" alt="" slot="icon-active">
                首页


            </m-tabbar-item>
            <m-tabbar-item id='tab2' >
                <img src="http://onpxz5rdd.bkt.clouddn.com/tab1.png" alt="" slot="icon-normal">
                <img src="http://onpxz5rdd.bkt.clouddn.com/tab1.png" alt="" slot="icon-active">
                分类


            </m-tabbar-item>
            <m-tabbar-item id='tab3'>
                <img src="http://onpxz5rdd.bkt.clouddn.com/tab1.png" alt="" slot="icon-normal">
                <img src="http://onpxz5rdd.bkt.clouddn.com/tab1.png" alt="" slot="icon-active">
                <div>购物车</div>



            </m-tabbar-item>
            <m-tabbar-item id='mine'>
                <img src="http://onpxz5rdd.bkt.clouddn.com/tab5.png" alt="" slot="icon-normal">
                <img src="http://onpxz5rdd.bkt.clouddn.com/tab5.png" alt="" slot="icon-active">
                我的
            </m-tabbar-item>
            <!--<m-tabbar-item id='tab5'>-->
            <!--<img src="http://onpxz5rdd.bkt.clouddn.com/tab1.png" alt="" slot="icon-normal">-->
            <!--<img src="http://onpxz5rdd.bkt.clouddn.com/tab1.png" alt="" slot="icon-active">-->
            <!--我的-->
            <!--</m-tabbar-item>-->
        </m-tabbar>

    </div>
</template>

<script>
    import Lib from 'assets/js/Lib';
    import mTabbar from '../../../components/tabbar/tabbar'
    import mTabbarItem from '../../../components/tabbar/tabbar-item'
//    import {Group, Cell} from 'vux'
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
                this.$router.replace({path:newVal})
            }
        },
        created () {


            localStorage.setItem("token", "a75e9b65-cf4a-45ad-bc07-5c12de0c6c3f")

//            if(window.localStorage){
//
//                alert("support");
//
//            }else{
//
//                alert("not support");
//
//            }
        }, methods: {
        }
    }
</script>
<style scoped>

</style>