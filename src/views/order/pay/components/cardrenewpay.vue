<template>
    <div>


        <div style="background-color:#fff;margin-top: 40px;">

            <group>

                <cell title="姓名" :value="userName"></cell>
                <cell title="卡号" :value="cardNum"></cell>
                <cell title="有效期" :value="expiryDate"></cell>
                <cell title="续卡金额" value="20"></cell>
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
                cardNum: '',
                userName: '',
                expiryDate: '',

            };
        },
        created () {
            page = this;
            this.cardNum = Lib.Utils.getQueryString("cardNum");
            this.userName = decodeURIComponent(Lib.Utils.getQueryString("userName"));

            this.expiryDate = Lib.Utils.getQueryString("expiryDate");


        },
        mounted () {
            console.log("mounted")

//      let pageParams = page.$route.query;
//      console.log(pageParams)
//      page.cardinfo = pageParams;


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
                        type: 1,
                        platForm: 140,
                        cardNum: page.cardNum,
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
                                Lib.go.go('/views/order/result.html?orderId=' + orderId);
                            },
                            cancel: function (res) {
//                                alert('支付取消');
                                Lib.vux.showtoast(page, "支付取消")
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
//        FineWork.HttpModule.newRequest({
//          "showLoading": true,
//          method: "post",
//          query: {
//            type: 1,
//            platForm: 140,
//            cardNum: page.cardinfo.cardNum,
//            code: code
//          },
//          url: "/card/getCardPayInfo",
//          success: function (basebean) {
//
//            let wxparams = basebean.getData().wxpayInfo;
//            alert(JSON.stringify(wxparams))
//            wx.chooseWXPay({
//              timestamp: wxparams.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
//              nonceStr:  wxparams.nonceStr, // 支付签名随机串，不长于 32 位
//              package: 'prepay_id='+wxparams.prepayId, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
//              signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
//              paySign: wxparams.sign, // 支付签名
//              success: function (res) {
//                // 支付成功后的回调函数
////                Lib.go.go('/views/order/result.html?orderId='+orderId);
//              },
//              cancel: function (res) {
////                                alert('支付取消');
////                Lib.vux.showtoast(page,"支付取消")
////                                Lib.go.go('/views/order/result.html?orderId='+orderId);
//              },
//              fail: function (res) {
//                alert('pay fail'+JSON.stringify(res));
//              }
//            });
//
//          }
//          , onErrcode: function (basebean) {
//            basebean.showMessage();
//          },
//          fail: function (err) {
//            if (parseInt(err.response.status) == 401) {
//              FineWork.MyToast.toast("您未登录");
//            }
//          }
//        });

            },


        }
    }
</script>

<style>


</style>
