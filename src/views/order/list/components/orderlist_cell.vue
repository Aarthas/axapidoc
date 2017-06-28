<template>
    <div style="display: flex;flex-direction: column;width: 100%;margin-top: 15px;">
        <div style="display: flex;flex-direction: row;width: 100%;height: 45px;background-color: #ffffff;">
           <div style="text-align:left;color: #666666; line-height:45px;margin-left: 8px;">订单号:{{item.orderId}}</div>
           <div style="flex:2;text-align:right;color: #f03838;margin-right: 10px;line-height: 45px;">{{item.orderStatusName}}</div>

        </div>

        <ul>
            <li v-for="itemObject in list">
                <goodsitem :item=itemObject style="background-color: #f6f6f6"></goodsitem>
            </li>

        </ul>
        <div style="display: flex;flex-direction: row;width: 100%;height: 45px;background-color: #ffffff;margin-top: 2px;">
            <div style="text-align:left;color: #666666; line-height:45px;margin-left: 8px;">订单金额: ¥{{item.totalPrice}}</div>
        </div>
    </div>
</template>

<script>
   import goodsitem from '../../components/goodsitem.vue'
    export default {
        components: {
            goodsitem
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

    }
</script>

<style scoped>

</style>