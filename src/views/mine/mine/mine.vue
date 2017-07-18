<template>
    <div >
        <mine_header
                @jt_profile="jt_profile"
                @jt_login="jt_login"
                :userinfo="userinfo"></mine_header>

        <group>
            <icon_cell title="我的订单" iconsrc="http://onpxz5rdd.bkt.clouddn.com/ic_info_order.png" v-on:click.native="routeto(0)"></icon_cell>
            <icon_cell title="我的收藏" iconsrc="http://onpxz5rdd.bkt.clouddn.com/ic_info_fav.png" v-on:click.native="routeto(1)"></icon_cell>
            <icon_cell title="收货地址" iconsrc="http://onpxz5rdd.bkt.clouddn.com/ic_info_address.png" v-on:click.native="routeto(2)"></icon_cell>
            <icon_cell title="优惠券" iconsrc="http://onpxz5rdd.bkt.clouddn.com/ic_info_coupon.png" v-on:click.native="routeto(3)"></icon_cell>

        </group>
        <group>
            <icon_cell title="IC卡余额查询" iconsrc="http://onpxz5rdd.bkt.clouddn.com/ic_ic_card.png" v-on:click.native="routeto(4)"></icon_cell>
            <icon_cell title="我要投诉" iconsrc="http://onpxz5rdd.bkt.clouddn.com/ic_complaint.png" v-on:click.native="routeto(5)"></icon_cell>
            <icon_cell title="帮助与反馈" iconsrc="http://onpxz5rdd.bkt.clouddn.com/ic_info_service.png" v-on:click.native="routeto(6)"></icon_cell>

        </group>

        <div style="height: 80px;"></div>

    </div>
</template>

<script>
    import {Group, Cell, Card} from 'vux'
    import Lib from 'assets/js/Lib';
    import mine_header from './components/mine_header.vue' ;
    import icon_cell from './components/icon-cell.vue' ;
    var page;
    export default {
        components: {
            Group,
            mine_header,icon_cell,
        },
        data () {
            return {

                userinfo: {}
            };
        },
        created () {
            page = this;
            console.log("created")
            console.log(window.location)
        },
        mounted(){
//            this.$vux.loading.show({
//                text: '亲爱'
//            })
// 隐藏

            Lib.axios.axios({
                url: '/users/me',
                loading:{
                    page:page,
                },
                success: function (basebean) {
                    let data = basebean.getData();
                    page.userinfo = data;
                    page.userinfo.islogin = true;
                    page.$vux.loading.hide()
                }
            });
        },
        methods: {
            jt_profile: function () {
                console.log("aa")
                window.location.href = Lib.constant.baseurl + "/views/mine/profile.html"
            },
            jt_login: function () {
                console.log("aa")
                window.location.href = Lib.constant.baseurl + "/views/user/login.html"
            },
            routeto: function (index) {
                let a ;
                switch (index) {
                    case 0:
                        a= Lib.constant.baseurl + "/views/trade/list.html"
                        break;
                    case 1:
                        a=   Lib.constant.baseurl + "/views/mine/favorite.html"
                        break;
                    case 2:
                        a= Lib.constant.baseurl + "/views/address/showlist.html#/list"
                        break;
                    case 3:
                        a=  Lib.constant.baseurl + "/views/coupon/list.html"
                        break;
                    case 4:
                        a=    Lib.constant.baseurl + "/views/mine/iccard.html"
                        break;
                    case 5:
                        a=   "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf698f56d095a5d43&redirect_uri=http%3A%2F%2Fweixin.sanjiang.com%2Fsjmarket%2Fviews%2Fcomplaint%2Fsubmit.html&response_type=code&scope=snsapi_base#wechat_redirect";
                        break;
                    case 6:
                        a=   "http://h5.sanjiang.com/help/help.html";
                        break;
                    default:



                }
                window.location.href=a
            }
        }

    }
</script>

<style scoped>



</style>