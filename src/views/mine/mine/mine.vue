<template>
    <div class="main_view">
        <mine_header
                @jt_profile="jt_profile"
                @jt_login="jt_login"
                :userinfo="userinfo"></mine_header>

        <group>
            <cell title="我的订单" class="wui-cell" is-link :link="linkto(0)">
                <img slot="icon" width="18" style="display:block;margin-right:8px;"
                     src="http://onpxz5rdd.bkt.clouddn.com/ic_info_order.png">
            </cell>

            <cell title="我的收藏" class="wui-cell" is-link :link="linkto(1)">
                <img slot="icon" width="18" style="display:block;margin-right:8px;"
                     src="http://onpxz5rdd.bkt.clouddn.com/ic_info_fav.png">
            </cell>
            <cell title="收货地址" class="wui-cell" is-link :link="linkto(2)">
                <img slot="icon" width="18" style="display:block;margin-right:8px;"
                     src="http://onpxz5rdd.bkt.clouddn.com/ic_info_address.png">
            </cell>
            <cell title="优惠券" class="wui-cell" is-link :link="linkto(3)">
                <img slot="icon" width="18" style="display:block;margin-right:8px;"
                     src="http://onpxz5rdd.bkt.clouddn.com/ic_info_coupon.png">
            </cell>
        </group>

        <group>
            <cell title="IC卡余额查询" class="wui-cell" is-link :link="linkto(4)">
                <img slot="icon" width="18" style="display:block;margin-right:8px;"
                     src="http://onpxz5rdd.bkt.clouddn.com/ic_ic_card.png">
            </cell>
            <cell title="我要投诉" class="wui-cell" is-link :link="linkto(5)">
                <img slot="icon" width="18" style="display:block;margin-right:8px;"
                     src="http://onpxz5rdd.bkt.clouddn.com/ic_complaint.png">
            </cell>
            <cell title="帮助与反馈" class="wui-cell" is-link :link="linkto(6)">
                <img slot="icon" width="18" style="display:block;margin-right:8px;"
                     src="http://onpxz5rdd.bkt.clouddn.com/ic_info_service.png">
            </cell>
        </group>
    </div>
</template>

<script>
    import { Group, Cell,Card} from 'vux'
    import Lib from 'assets/js/Lib';
    import mine_header from './components/mine_header.vue' ;
    var page;
    export default {
        components: {
            Group,
            Cell,
            mine_header,
            Card
        },
        data () {
            return {

                userinfo:{}
            };
        },
        created () {
            page = this;
            console.log("created")
            console.log(window.location)
        },
        mounted(){
            this.$vux.loading.show({
                text: '亲爱'
            })
// 隐藏

            Lib.axios.axios({
                url: '/users/me',
                success: function (basebean) {
                    let data = basebean.getData();
                    page.userinfo=data;
                    page.userinfo.islogin = true;
                    page.$vux.loading.hide()
                }
            });
        },
        methods: {
            jt_profile:function () {
                console.log("aa")
                window.location.href = Lib.constant.baseurl+"/views/mine/profile.html"
            },
            jt_login:function () {
                console.log("aa")
                window.location.href = Lib.constant.baseurl+"/views/user/login.html"
            },
            linkto: function (index) {
                switch (index) {
                    case 0:
                        return Lib.constant.baseurl+"/views/trade/list.html"
                        break;
                    case 1:
                        return Lib.constant.baseurl+"/views/mine/favorite.html"
                        break;
                    case 2:
                        return Lib.constant.baseurl+"/views/coupon/list.html"
                        break;
                    case 3:
                        return Lib.constant.baseurl+"/views/coupon/list.html"
                        break;
                    case 4:
                        return Lib.constant.baseurl+"/views/mine/iccard.html"
                        break;
                    case 5:
                        return "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf698f56d095a5d43&redirect_uri=http%3A%2F%2Fweixin.sanjiang.com%2Fsjmarket%2Fviews%2Fcomplaint%2Fsubmit.html&response_type=code&scope=snsapi_base#wechat_redirect";
                        break;
                    case 6:
                        return "http://h5.sanjiang.com/help/help.html";
                        break;
                    default:

                }
            }
        }

    }
</script>

<style scoped>
    .main_view{
        width: 100%;
        height: 100%;
        background-color: #f6f6f6;

    }
    .wui-cell{

        font-size: 16px;
    }

    /*.card-demo-flex {*/
        /*display: flex;*/
    /*}*/

    /*.card-demo-content01 {*/
        /*padding: 10px 0;*/
    /*}*/

    /*.card-demo-flex > div {*/
        /*flex: 1;*/
        /*text-align: center;*/
        /*font-size: 13px;*/
    /*}*/

    /*.card-demo-flex span {*/
        /*color: #f74c31;*/
    /*}*/
</style>