<template>
    <div >
        <!--优惠券-->
        <div class="weui-msg">
            <div class="weui-msg__icon-area">
                <i class="weui-icon-success weui-icon_msg" style="font-size: 50px;"></i>

            </div>
            <div class="weui-msg__text-area">
                <h2 class="weui-msg__title">订单提交成功</h2>
                <!--<br/>-->
                <!--<p class="weui-msg__desc">未检测到支付结果，请稍后再试</p>-->
            </div>
        </div>


        <group style="margin-top: -10px;">
            <cell style="font-size: 14px;height: 24px;" title="订单号"   @click.native="jt_usecoupon">
                <div style="">{{orderId}}</div>
            </cell>
            <cell style="font-size: 14px;height: 24px;" title="需要付款" @click.native="jt_usecoupon">
                <div style="">¥{{payAmount}}</div>
            </cell>
        </group>


        <div class="btn-area">
            <x-button @click.native="payWeixin" type="primary"> 微信支付</x-button>
        </div>
    </div>
</template>

<script>
    import Lib from 'assets/js/Lib';
    import {Group, Cell,XButton} from 'vux'
    import axios from 'axios';

    let orderId = Lib.Utils.getQueryString("orderId");
    let payAmount= Lib.Utils.getQueryString("payAmount");
    var page;

    export default {
        components: {
            Group, Cell,XButton,
        },
        data () {
            return {

                orderId:"",
                payAmount:""

            };
        },
        created () {
            page = this;
            page.orderId=orderId;
            page.payAmount=payAmount;
        },

        mounted(){


            axios.get("http://weixin.sanjiang.com/weichat-csr-web" + '/weixin/jsconfig?url=' + encodeURIComponent(window.location.href)).then(function (resp) {
                console.log(resp)
                /* console.log(resp)*/
                var res = resp.data;
                /* console.log(res);*/
                if (!res.success) {
                    alert(res.errmsg);
                    return;
                }
                res.data.debug = false;
                res.data.jsApiList = ['chooseWXPay'];
                wx.config(res.data);
            }, function (resp) {
                console.log("resp=" + resp)
            });

            wx.ready(function () {
                wx.hideOptionMenu();
                console.log("ready")

            });

            wx.error(function (res) {
//        console.log(res);
                console.log("error")
            });



        },
        activated () {


        },
        methods: {
            payWeixin:function () {

                let a ='{"code":1,"type":null,"codeMessage":"","data":{"appId":"wxe9553d916e42224c","partnerId":"1220794001","prepayId":"wx20170718153247858d38301f0429260985","packageValue":"Sign=WXPay","nonceStr":"jdMah5xUudrLa4Pi","timeStamp":"1500362856","sign":"47FFAC852809E8F5E5C9B81B4CF11C45"}}';
                let data = JSON.parse(a).data;

                console.log(data)
                wx.chooseWXPay({
                    timestamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                    nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
                    package: data.prepayId, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                    signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                    paySign:  data.sign, // 支付签名
                    success: function (res) {
                        // 支付成功后的回调函数
                        alert("succ")
                    },
                    cencel:function(res){
                    alert('cencel pay');
                    },
                    fail: function(res){
                    alert('pay fail');
                        alert(JSON.stringify(res));
                    }
                });

            }
        }
    }
</script>
<style>



</style>
