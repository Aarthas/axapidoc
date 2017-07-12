<template>
    <div style="display: flex;flex-direction: row;background-color: white;">

        <div style="display: flex;flex-direction: column;width:68vw;">
            <div style="height: 25px;display: flex;flex-direction: row;">
                <div style="color: #333333;line-height: 25px;margin-left: 5px;">应付总金额：</div>
                <div style="color: #f03838;line-height: 25px;">￥{{item.total_price}}</div>
            </div>
            <div style=" height :25px;line-height:20px;color: #666666;font-size: 12px;margin-left: 5px;">会员优惠： ￥{{item.coupons_price}}</div>

        </div>
        <div  style="width: 32vw;margin-right: 0px;background-color: #04BE02;line-height: 50px;font-size: 17px;color: white;text-align: center;">提交订单</div>
    </div>
</template>

<script>

    export default {
        components: {},
        props:{
            item:Object,
        }

    }
</script>

<style scoped>

</style>