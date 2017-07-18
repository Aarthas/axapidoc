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



        },
        activated () {


        },
        methods: {
            payWeixin:function () {

            }
        }
    }
</script>
<style>



</style>
