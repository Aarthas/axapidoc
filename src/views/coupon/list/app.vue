<template>
    <div>
        <router-view></router-view>
        <m-tabbar v-model="select">
            <m-tabbar-item id='list'>
                <div style="line-height: 40px;">我的</div>


            </m-tabbar-item>
            <m-tabbar-item id='tab2'>
                <div style="line-height: 40px;">兑换</div>

            </m-tabbar-item>
            <m-tabbar-item id='tab3'>
                <!--<img src="http://onpxz5rdd.bkt.clouddn.com/tab1.png" alt="" slot="icon-normal">-->
                <!--<img src="http://onpxz5rdd.bkt.clouddn.com/tab1.png" alt="" slot="icon-active">-->
                <div style="line-height: 40px;">说明</div>


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
                select: "tab1"
            }
        },
        watch: {
            select: function (newVal, oldVal) {
                if (newVal == 'tab3') {
                    window.location.href = "http://h5.sanjiang.com/help/coupon-use.html"
                } else {
                    this.$router.replace({path: newVal})
                }

            }
        },
        created () {


        }, methods: {}
    }
</script>
<style scoped>

</style>