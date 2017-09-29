<template>
    <div class="page">
        <!--<x-header>会员卡绑定微信</x-header>-->
        <div class="weui-msg" v-show="loadComplete">
            <div class="weui-msg__icon-area">
                <i v-if="resultCode==1" class="weui-icon-success weui-icon_msg"></i>
                <i v-else class="weui-icon-warn weui-icon_msg-primary"></i>


            </div>
            <div class="weui-msg__text-area">
                <h2 v-if="resultCode==1" class="weui-msg__title">提交成功</h2>
                <!--<br/>-->
                <p v-else class="weui-msg__desc">{{errMessage}}</p>
            </div>
            <div class="weui-msg__opr-area">

                <div class="btn-area">
                    <x-button @click.native="doOnNext1" type="primary" v-if="resultCode==1"> 出示会员卡</x-button>
                </div>
                <div class="btn-area">
                    <x-button @click.native="doOnNext2" type="default"> 进入会员中心</x-button>
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

                resultCode: 1,
                errMessage: "",
                loadComplete: false
            };
        },
        created () {
            page = this;

        },
        activated () {

        },
        mounted(){
            Lib.axios.axios({
                url: "/card/renewSuccess?orderId=" + orderId,
                loading: {
                    page: page,
                },
                success: function (basebean) {
                    let renewData = basebean.getData();
                    if (renewData.renewResult) {
                        page.resultCode = 1;
                    } else {
                        page.resultCode = 0
                        page.errMessage = renewData.info;
                    }

                    page.loadComplete = true;
                },
                onerrcode: function (basebean) {


//                    page.loadComplete=true;
                }
            })
        },
        methods: {
            doOnNext1: function () {

                window.location.href = Lib.go.encodeWxUrl("http://weixin.sanjiang.com/membercard/#/indexcard")
            },
            doOnNext2: function () {

                console.log("aaa")
                window.location.href = Lib.go.encodeWxUrl("http://weixin.sanjiang.com/membercard/#/index")

            },

        }
    }


</script>
<style>
    @import '../../../assets/css/weui.min.css';


</style>
