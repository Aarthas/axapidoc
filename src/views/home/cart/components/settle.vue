<template>
    <div style="height: 50px;display: flex;flex-direction: row;background-color: white;">
        <!--左 选中按钮-->
        <div style="width: 8vw;margin-left: 0px;" v-on:click="myFunOne">

            <!--<img v-if="item.selectAll" src="http://onpxz5rdd.bkt.clouddn.com/ic_put_into_cart.png" style="width: 24px;margin-left: 5px;margin-top: 10px;" />-->
            <!--<img v-else src=""  style="width: 20px;margin-left: 5px;margin-top: 10px;background-color: black;" />-->
            <y-icon style="margin-top: 10px;" v-model="item.selectAll"></y-icon>
        </div>
        <div style="display: flex;flex-direction: column;width:60vw;">
            <div style="height: 25px;display: flex;flex-direction: row;">
                <span style="color: #333333;line-height: 25px;margin-left: 5px;">合计：</span>
                <span style="color: #f03838;line-height: 25px;">￥{{retailTotalAmount}}</span>
                <span style="color: #333333;line-height: 25px;font-size: 13px;">{{transportAmount}}</span>
            </div>
            <div style=" height :25px;line-height:20px;color: #666666;font-size: 12px;margin-left: 5px;"
                 v-if="item.cartV2PriceInfo">
                {{item.cartV2PriceInfo.memberPriceTip}} ￥{{item.cartV2PriceInfo.memberPriceCut}}{{item.cartV2PriceInfo.scoreAmountInfo}}{{item.cartV2PriceInfo.scoreAmount}}

            </div>

        </div>
        <div v-if="item.selectCount>0"
              style="width: 120px;margin-right: 0px;background-color: #04BE02;line-height: 50px;font-size: 17px;color: white;text-align: center;"
              v-on:click="goSettle">去结算({{item.selectCount}})
        </div>
        <div v-else style="width: 120px;margin-right: 0px;background-color: #cbcbcb;line-height: 50px;font-size: 17px;color: white;text-align: center;">
            去结算
        </div>

    </div>
</template>

<script>
    import Lib from 'assets/js/Lib';
    import YIcon from '../../../../components/YIcon.vue'
    import {CheckIcon} from 'vux'
    export default {
        components: {CheckIcon, YIcon},
        data(){
            return {}
        },
        computed: {
            retailTotalAmount: function () {
                if (this.item && this.item.cartV2PriceInfo) {
                    return this.item.cartV2PriceInfo.retailTotalAmount
                }
                return "";
            },
            transportAmount: function () {
                if (this.item && this.item.cartV2PriceInfo) {
                    return this.item.cartV2PriceInfo.transportAmount
                }
                return "";
            }
        },
        props: {
            item: Object
        },
        created(){
//            console.log('item')
//            console.log(item!=null&&item.cartV2PriceInfo)
        },
        methods: {
            goSettle: function () {
//                console.log('goSettle a')
//                alert('goSettle add')
                Lib.go.go("/views/order/confirm.html")
            },
            myFunOne: function () {
                let that = this;
                that.$emit("goSelectAll", that.item);
            }
        }
    }
</script>

<style scoped>

</style>