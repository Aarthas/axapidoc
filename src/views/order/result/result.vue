<template>
    <div class="page">
        <!--<x-header>会员卡绑定微信</x-header>-->
        <div class="weui-msg">
            <div class="weui-msg__icon-area">
                <i class="weui-icon-success weui-icon_msg"></i>
                <i class="weui-icon-warn weui-icon_msg-primary"></i>


            </div>
            <div class="weui-msg__text-area">
                <h2 class="weui-msg__title">提交成功</h2>
                <!--<br/>-->
                <p class="weui-msg__desc">未检测到支付结果，请稍后再试</p>
            </div>
            <div class="weui-msg__opr-area">

                <div style="margin: 30px  12px;">
                    <x-button @click.native="doOnNext1" type="primary" > 查看订单</x-button>
                </div>
                <div style="margin: 30px  12px;">
                    <x-button @click.native="doOnNext2" type="default"> 去首页逛逛</x-button>
                </div>

            </div>

        </div>
    </div>
</template>

<script>

    import Lib from 'assets/js/Lib';
    var page;


    import {XButton} from 'vux'
    export default {
        components: {

            XButton
        },
        data () {
            return {};
        },
        created () {
            page = this;

        },
        activated () {

        },
        mounted(){

        },
        methods: {
            doOnNext1: function () {

            },
            doOnNext2: function () {

            },

        }
    }


</script>
<style>
    @import '../../../assets/css/weui.min.css';


</style>
