<template>
    <div style="display: flex;flex-direction: column;margin-top: 10px;background-color: white;">
        <div style="text-align: left;margin-top: 5px;" >
            <div style="font-size: 15px;margin-left: 8px;"> {{item.name}}</div>
        </div>
        <div style="text-align: left;margin-top: 5px;">
            <div style="font-size: 14px;margin-left: 8px;color: #f03838">{{item.adSlogan}}</div>
        </div>
        <div style="height: 20px;line-height: 30px;text-align: left;">
            <div style="font-size: 12px;margin-left: 8px;">零售价：￥{{item.salePrice}}</div>
        </div>
        <div style="height: 30px;line-height: 30px;text-align: left;">
            <div style="font-size: 13px;margin-left: 8px;color: #f03838">会员价：￥{{item.memberPrice}}</div>
        </div>
    </div>
</template>

<script>

    export default {
        components: {},
        props:{
            item:Object
        }
    }
</script>

<style scoped>

</style>