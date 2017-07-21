<template>
    <div>

        <div>
            <!--<keep-alive>-->
                <router-view></router-view>
            <!--</keep-alive>-->
        </div>
        <m-tabbar v-model="select">
            <m-tabbar-item id='mall' isIcon>
                <i style="font-size: 26px;line-height: 1" class="iconfont icon-shouye" slot="icon"></i>

                首页







            </m-tabbar-item>
            <m-tabbar-item id='category' isIcon>
                <!--<i class="iconfont icon-cart"  slot="icon"></i>-->
                <i style="font-size: 26px;line-height: 1" class="iconfont icon-fenlei" slot="icon"></i>
                <!--<svg class="icon" aria-hidden="true">-->
                <!--<use xlink:href="#icon-xxx"></use>-->
                <!--</svg>-->
                分类














            </m-tabbar-item>
            <m-tabbar-item id='cart' isIcon>
                <i style="font-size: 22px;line-height: 1.2" class="iconfont icon-gouwuche" slot="icon"></i>
                <div>购物车</div>


            </m-tabbar-item>
            <m-tabbar-item id='mine' isIcon>
                <i style="font-size: 26px;line-height: 1" class="iconfont icon-gerenzhongxin1" slot="icon"></i>
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
                select: ""
            }
        },
        watch: {
            select: function (newVal, oldVal) {
                console.log("watch select="+newVal)
                this.$router.replace({path: newVal})
            }
        },
        created () {


            let that  = this;
            let path = this.$route.path;
            if (path == '/')
                path = "/mall"
            this.select = path.substr(1, path.length)
//            window.location.
            this.$router.afterEach(function (route) {

                console.log("afterEach"+JSON.stringify(route.meta))
                that.select = route.meta.id;
            })


            let token = localStorage.getItem("token");
            console.log("has token "+(token != null && token != ''))
            if (token != null && token != '') {
                Lib.axios.axios({
                    url: '/users/me',
                    success: function (basebean) {

                    },
                    forunlogin: function (basebean) {
                        checkCode();
                    },
                    error: function (error) {
                        checkCode();
                    }
                });
            }else {
                checkCode();
            }

        },
        mounted(){
            console.log("mounted")

        },
        activated(){
            console.log("activated")

        }
        ,
        methods: {}
    }

    var checkCode = function () {
        let code = Lib.Utils.getQueryString("code");
        console.log('checkCode code = ' + code)

        if (code != null && code.length > 0) {
            Lib.axios.axios({
                url: '/wechat/getTokenByWxcode?code=' + code + '&userinfo=userinfo',
                success: function (basebean) {
                    console.log("getTokenByWxcode success token="+(basebean.getSessionId()))
                    let data = basebean.getData();
                    localStorage.setItem("token", basebean.getSessionId())
                },
                forunlogin: function (basebean) {

                },
                error: function (error) {

                }
            });
        }

    }


</script>
<style>

    @import "../../../assets/font/iconfont.css";
</style>