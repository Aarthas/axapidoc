<template>
    <div class="page">
        <!--<x-header>会员卡绑定微信</x-header>-->
        <div class="weui-msg" >
            <div class="weui-msg__icon-area">
                <i  class="weui-icon-success weui-icon_msg"></i>

            </div>
            <div class="weui-msg__text-area">
                <h2  class="weui-msg__title">支付成功</h2>
                <!--<br/>-->
                <p class="weui-msg__desc" style="line-height: 30px;">您的会员卡申请正在审核中<br>申请成功后会有短信通知您</p>
            </div>
            <div class="weui-msg__opr-area">

                <div class="btn-area">
                    <x-button @click.native="doOnNext1" type="primary" > 进入会员中心</x-button>
                </div>


            </div>

        </div>
    </div>
</template>

<script>

    import Lib from 'assets/js/Lib';



    import {XButton} from 'vux'
    export default {
        components: {

            XButton
        },
        data () {
            return {


            };
        },
        created () {


        },
        activated () {

        },
        mounted(){

        },
        methods: {
            doOnNext1: function () {
                window.location.href = Lib.go.encodeWxUrl("http://weixin.sanjiang.com/membercard/#/index")
            },
        }
    }


</script>
<style>
    @import '../../../assets/css/weui.min.css';


</style>
