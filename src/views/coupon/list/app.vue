<template>
    <div>
        <router-view style="margin-bottom: 56px;"></router-view>
        <m-tabbar v-model="select">
            <m-tabbar-item id='list'>
                <div style="line-height: 40px;">我的</div>


            </m-tabbar-item>
            <m-tabbar-item id='exchange'>
                <div style="line-height: 40px;">兑换</div>

            </m-tabbar-item>
            <m-tabbar-item id='h5srcframe'>
                <!--<img src="http://onpxz5rdd.bkt.clouddn.com/tab1.png" alt="" slot="icon-normal">-->
                <!--<img src="http://onpxz5rdd.bkt.clouddn.com/tab1.png" alt="" slot="icon-active">-->
                <div style="line-height: 40px;">说明</div>


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
                select: "list"
            }
        },
        watch: {
            select: function (newVal, oldVal) {
//                if (newVal == 'tab3') {
//                    window.location.href = "http://h5.sanjiang.com/help/coupon-use.html"
//                } else {
                    this.$router.push({path: newVal})
//                }

            }
        },
        mounted () {
            let that  = this;
            let path = this.$route.path;
            if (path == '/')
                path = "/list"
            this.select = path.substr(1, path.length)
//            window.location.
            this.$router.afterEach(function (route) {

                console.log("afterEach"+JSON.stringify(route.meta))
                that.select = route.meta.id;
            })

        },

        methods: {}
    }
</script>
<style scoped>

</style>