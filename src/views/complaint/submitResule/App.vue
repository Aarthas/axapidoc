<template>
    <div class="page">
        <!--<x-header>会员卡绑定微信</x-header>-->
        <div class="weui-msg">
            <div class="weui-msg__icon-area"><i class="weui-icon-success weui-icon_msg"></i></div>
            <div class="weui-msg__text-area">
                <h2 class="weui-msg__title">提交成功</h2>
                <!--<br/>-->

            </div>
            <div style="display: flex;justify-content: center;flex-direction: column">

                <span style="text-align: center;color: #444444;margin-top: 26px;font-size: 20px;">感谢你的参与，你的建议很重要</span>
                <span style="text-align: center;color: #999999;margin-top:16px;font-size: 15px;">{{second}}秒钟后关闭页面</span>
            </div>


        </div>
    </div>
</template>

<script>


    var page;
    import {XHeader, XButton} from 'vux'
    export default {
        components: {
            XHeader,
            XButton
        },
        data () {
            return {

                desc: "",


            };
        },
        created () {
            page = this;


        },

        mounted(){
            let pageParams = page.$route.query;


            page.desc = pageParams.desc;


        },
        activated () {


        },
        methods: {}
    }
</script>
<style>
    @import '../../../assets/css/weui.min.css';


</style>
