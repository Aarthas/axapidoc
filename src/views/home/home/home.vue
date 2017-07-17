<template>
    <div>

        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        <m-tabbar v-model="select">
            <m-tabbar-item id='mall' isIcon="true">
                <i style="font-size: 28px;line-height: 1" class="iconfont icon-shouye" slot="icon"></i>

                首页
            </m-tabbar-item>
            <m-tabbar-item id='category' isIcon="true">
                <i style="font-size: 28px;line-height: 1" class="iconfont icon-fenlei" slot="icon"></i>
                分类







            </m-tabbar-item>
            <m-tabbar-item id='cart' isIcon="true">
                <i style="font-size: 28px;line-height: 1" class="iconfont icon-icon" slot="icon"></i>
                <div>购物车</div>


            </m-tabbar-item>
            <m-tabbar-item id='mine' isIcon="true">
                <i style="font-size: 28px;line-height: 1" class="iconfont icon-gerenzhongxin1" slot="icon"></i>
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