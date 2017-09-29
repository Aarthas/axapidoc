<template>
    <div class="page">
        <!--<x-header>会员卡绑定微信</x-header>-->
        <div class="weui-msg" v-show="loadComplete">
            <div class="weui-msg__icon-area">
                <i v-if="resultCode==1" class="weui-icon-success weui-icon_msg"></i>
                <i  v-else class="weui-icon-warn weui-icon_msg-primary"></i>


            </div>
            <div  class="weui-msg__text-area">
                <h2  v-if="resultCode==1" class="weui-msg__title">提交成功</h2>
                <!--<br/>-->
                <p v-else class="weui-msg__desc">{{errMessage}}</p>
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
    let orderId = Lib.Utils.getQueryString("orderId");

    import {XButton} from 'vux'
    export default {
        components: {

            XButton
        },
        data () {
            return {

                resultCode:1,
                errMessage:"",
                loadComplete:false
            };
        },
        created () {
            page = this;

        },
        activated () {

        },
        mounted(){
            Lib.axios.axios({
                url: "/orders/submitResult?orderId=" + orderId,
                loading: {
                    page: page,
                },
                success: function (basebean) {
                   page.resultCode=1;
                    page.loadComplete=true;
                },
                onerrcode: function (basebean) {
                    page.resultCode=0
                    page.errMessage=basebean.getMessage();
                    page.loadComplete=true;
                }
            })
        },
       methods:{
            doOnNext1: function () {
//                window.location = Lib.constant.baseurl + "/views/trade/detail.html?orderId=" + orderId;
                window.location = Lib.constant.baseurl + "/views/main/main.html#/detailtrade?orderId=" + orderId;
            },
            doOnNext2: function () {
                window.location = Lib.constant.baseurl+"/views/main/main.html#/mall";
            },

        }
    }


</script>
<style>
    @import '../../../assets/css/weui.min.css';


</style>
