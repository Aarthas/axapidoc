<template>
    <div class="page">
        <!--<x-header>会员卡绑定微信</x-header>-->
        <div class="weui-msg">
            <div class="weui-msg__icon-area"><i class="weui-icon-success weui-icon_msg"></i></div>
            <div class="weui-msg__text-area">
                <h2 class="weui-msg__title">提交成功</h2>
                <!--<br/>-->

            </div>
            <div style="display: flex;justify-content: center;flex-direction: column;margin-left: 22px;margin-right: 22px;">

                <span style="text-align: center;color: #444444;margin-top: 26px;font-size: 16px;line-height: 26px;">  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;很感谢您对三江服务提出的宝贵意见，对于给您造成的不便我们深表抱歉。我们正在尽力处理您的问题，很快会有工作人员跟您联系，请耐心等待，谢谢！</span>
                <!--<span style="text-align: center;color: #999999;margin-top:16px;font-size: 15px;">{{second}}秒钟后关闭页面</span>-->
            </div>


        </div>
    </div>
</template>

<script>


    var page;

    export default {
        components: {

        },
        data () {
            return {




            };
        },
        created () {
            page = this;


        },

        mounted(){



        },
        activated () {


        },
        methods: {}
    }
</script>
<style>
    @import '../../../assets/css/weui.min.css';


</style>
