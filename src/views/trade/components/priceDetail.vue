
<!--订单详情、确认页用到的价格板-->
<template>
    <div style="margin-top: 5px;">

        <ul>
            <li v-for="item in priceObject.calc">
                <ZCell :item=item></ZCell>
            </li>

        </ul>
        <div style="display: flex;flex-direction: row; background-color: #ffffff;height: 40px;margin-top: 1px;">
            <div style="flex: 6; color: #555555;text-align: right;line-height: 40px;">共{{priceObject.quantity}}件商品 总重{{priceObject.weight}} 合计：</div>
            <div style="flex: 1; color: #f03838;text-align: center;line-height: 40px;">¥{{priceObject.total_price}}</div>
        </div>
    </div>
</template>

<script>

    import ZCell from './ZCell.vue'
    export default {
        components: {
            ZCell
        },

        props: {
            priceObject:Object
        },
        created (){

        }

    }
</script>

<style scoped>

</style>