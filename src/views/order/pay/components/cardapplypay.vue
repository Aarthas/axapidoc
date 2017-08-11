<template>
    <div>


        <div style="background-color:#fff;margin-top: 40px;">

            <group>

                <cell title="姓名" :value="contact"></cell>
                <cell title="手机号" :value="mobile"></cell>
                <cell title="开卡金额" value="¥30"></cell>
            </group>

        </div>
        <div style="padding:20px 15px;margin-top: 40px;">
            <x-button @click.native="pay" type="primary">支付</x-button>

        </div>
    </div>
</template>


<script>
    import Lib from 'assets/js/Lib';
    import axios from 'axios';
    import {Group, Cell, XButton} from 'vux'

    let wxcode = Lib.Utils.getQueryString("code");
    var page


    export default {

        components: {
            Group,
            Cell,
            XButton,

        },
        data () {
            return {
                contact: '',
                mobile: '',


            };
        },
        created () {
            page = this;
            this.mobile = Lib.Utils.getQueryString("mobile");
            this.contact = decodeURIComponent(Lib.Utils.getQueryString("contact"));


        },
        mounted () {
            console.log("mounted")



        },
        activated () {


            let pageParams = page.$route.query;
            console.log(pageParams)
            page.cardinfo = pageParams;


        },
        methods: {


            pay: function () {

                console.log("aaa pay")
                Lib.axios.axios({
                    method: "post",
                    loading: {
                        page: page
                    },
                    url: "/card/getCardPayInfo",
                    params: {
                        type: 2,
                        platForm: 140,
                        code: wxcode
                    },
                    success: function (basebean) {
                        let wxparams = basebean.getData().wxpayInfo;
                        wx.chooseWXPay({
                            timestamp: wxparams.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                            nonceStr: wxparams.nonceStr, // 支付签名随机串，不长于 32 位
                            package: 'prepay_id=' + wxparams.prepayId, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                            signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                            paySign: wxparams.sign, // 支付签名
                            success: function (res) {
                                // 支付成功后的回调函数
                                Lib.go.go('/views/card/applymsg.html');
                            },
                            cancel: function (res) {
//                                alert('支付取消');
                                Lib.vux.showtoast(page, "支付取消")
//                                Lib.go.go('/views/card/renewmsg.html?orderId=' + basebean.getData().orderId);
//                                Lib.go.go('/views/order/result.html?orderId='+orderId);
                            },
                            fail: function (res) {
                                alert('pay fail' + JSON.stringify(res));
                            }
                        });
                    },
                    onerrcode: function (basebean) {
                        Lib.vux.showtoast(page, basebean.getMessage())

                    }
                });

            },


        }
    }
</script>

<style>


</style>
