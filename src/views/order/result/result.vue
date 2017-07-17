<template>
    <div class="page">
        <!--<x-header>会员卡绑定微信</x-header>-->
        <div class="weui-msg">
            <div class="weui-msg__icon-area">
                <i class="weui-icon-success weui-icon_msg"></i>
            </div>
            <div class="weui-msg__text-area">
                <h2 class="weui-msg__title">提交成功</h2>
                <!--<br/>-->
                <p class="weui-msg__desc" ></p>
            </div>
            <div class="weui-msg__opr-area">

                <div class="btn-area">
                    <x-button @click.native="doOnNext1" type="primary" v-if="showCardCodeRoute"> 查看订单</x-button>
                </div>
                <div class="btn-area">
                    <x-button @click.native="doOnNext2" type="default"> 去首页逛逛</x-button>
                </div>

            </div>

        </div>
    </div>
</template>

<script>


    var page;


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
