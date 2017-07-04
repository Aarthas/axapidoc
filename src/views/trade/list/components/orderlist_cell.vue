<template>
    <div style="display: flex;flex-direction: column;width: 100%;margin-top: 15px;" v-on:click="myFunc">
        <div style="display: flex;flex-direction: row;width: 100%;height: 45px;background-color: #ffffff;">
           <div style="text-align:left;color: #666666; line-height:45px;margin-left: 8px;">订单号:{{item.orderId}}</div>
           <div style="flex:2;text-align:right;color: #f03838;margin-right: 10px;line-height: 45px;">{{item.orderStatusName}}</div>

        </div>

        <ul>
            <li v-for="itemObject in list">
                <goodsitem :item=itemObject style="background-color: #f6f6f6"></goodsitem>
            </li>

        </ul>

        <!--状态：-->
           <!--=5       待支付-->
           <!--5<..<25  待支付到未拣货完成-->
           <!--5<..<=50 待收货（不包含首）-->
           <!--=60      已完成-->
           <!--<0       已取消-->
           <!--=65      部分退货-->

        <div style="display: flex;flex-direction: row;width: 100%;height: 45px;background-color: #ffffff;margin-top: 2px;">
            <div style="text-align:left;color: #666666; line-height:45px;margin-left: 8px;">订单金额: ¥{{item.totalPrice}}</div>
            <!--<x-button v-if="item.orderStatus==5" style="height: 25px;line-height: 25px;font-size: 13px;margin-top: 10px;margin-right: 8px;" type="warn" mini >去支付</x-button>-->
            <!--<x-button  v-else-if="item.orderStatus!=5&&item.orderStatus>0"  style=" width:80px;height: 25px;line-height: 25px;font-size: 11px;margin-top: 10px;margin-right: 8px;"  mini>查看物流</x-button>-->
        </div>
    </div>
</template>

<script>
   import goodsitem from '../../components/goodsitem.vue'
   import { XButton } from 'vux'
    export default {
        components: {
            goodsitem,
            XButton
        },
        props: {
            item: Object,

        },
        data () {
            return {
                list: [],
            }
        },
        created(){
            this.list=this.item.items;

        },
        methods: {
            myFunc: function () {
                let that = this;
                that.$emit('todetail', this.item.orderId)
            }
        }

    }
</script>

<style scoped>

</style>