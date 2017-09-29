<template>
    <div style="display: flex;flex-direction: row;background-color: white;justify-content: space-between;width: 100%;">

        <div style="display: flex;flex-direction: column;">
            <div style="height: 25px;display: flex;flex-direction: row;">
                <div style="color: #333333;line-height: 25px;margin-left: 5px;">应付总金额：</div>
                <div style="color: #f03838;line-height: 25px;">￥{{item.total_price}}</div>
            </div>
            <div style=" height :25px;line-height:20px;color: #666666;font-size: 12px;margin-left: 5px;">
                会员优惠： ￥{{item.member_privilege}}
            </div>

        </div>

        <div style="width: 160px;">
            <x-button type="primary" class="custom-primary-red" @click.native="clickSubmit" :disabled="submitDisabled">提交订单</x-button>
        </div>
        <!--<div  style="width: 32vw;margin-right: 0px;background-color: #04BE02;line-height: 50px;font-size: 17px;color: white;text-align: center;">提交订单</div>-->
    </div>
</template>

<script>
    import {XButton} from 'vux'
    export default {
        components: {XButton},
        data () {
            return {
                submitDisabled:false

            }
        },

        props: {
            item: Object,
        }
        ,
        methods:{

            clickSubmit:function () {
                console.log("aa")
                let that = this;
                that.submitDisabled = true;

                setTimeout(function () {
                    that.submitDisabled = false;
                },1500)

                that.$emit( 'clickSubmit');
            }
        }
    }
</script>

<style scoped lang="less">
    .custom-primary-red {

        height: 50px;
        border-radius: 0 !important;
        border-color: white !important;
        color: #ffffff !important;
        &:active {
            border-color: white !important;
            background-color: transparent;
        }
    }
</style>