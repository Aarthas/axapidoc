<template>
    <div style="height: 50px;display: flex;flex-direction: row;background-color: white;">
        <!--左 选中按钮-->
        <div style="width: 8vw;margin-left: 0px;">
            <check-icon :value.sync="item.selectAll" style="line-height: 50px;"></check-icon>
        </div>
        <div style="display: flex;flex-direction: column;width:60vw;">
            <div style="height: 25px;display: flex;flex-direction: row;">
                <div style="color: #333333;line-height: 25px;margin-left: 5px;">合计：</div>
                <div style="color: #f03838;line-height: 25px;">￥{{item.cartV2PriceInfo.retailTotalAmount}}</div>
                <div style="color: #333333;line-height: 25px;font-size: 13px;">{{item.cartV2PriceInfo.transportAmount}}</div>
            </div>
            <div style=" height :25px;line-height:20px;color: #666666;font-size: 12px;margin-left: 5px;">{{item.cartV2PriceInfo.memberPriceTip}} ￥{{item.cartV2PriceInfo.memberPriceCut}}{{item.cartV2PriceInfo.scoreAmountInfo}}{{item.cartV2PriceInfo.scoreAmount}}</div>

        </div>
        <div  style="width: 32vw;margin-right: 0px;background-color: #04BE02;line-height: 50px;font-size: 17px;color: white;text-align: center;">去结算({{item.selectCount}})</div>
    </div>
</template>

<script>

    import { CheckIcon } from 'vux'
    export default {
        components: {CheckIcon},
        data(){
            return{

            }
        },
        props:{
            item:Object
        },
        created(){

        }
    }
</script>

<style scoped>

</style>