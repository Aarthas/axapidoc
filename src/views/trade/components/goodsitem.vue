
<!--订单列表、详情页用到的商品信息-->
<template>

    <div style="display:flex;flex-direction: row;margin-top: 3px;background-color: #ffffff;width: 100vw;height: 79px;" v-on:click="toDetail">
        <div  style="display:inline-block;margin-left: 8px;">
            <img style="width:69px;height: 69px;margin-top: 5px;" :src="item.productImage">

        </div>
        <div style="display:inline-block;flex: 1;" >
            <div style="display:flex;text-align: left;margin-left:10px;margin-right:8px;margin-top: 5px;height: 30px;color: #999999;">{{item.name}}</div>
            <div style="display:flex;flex-direction: row;width: 100%;margin-bottom: 5px;">
                <div style="flex:2;text-align:left;color: #666666;margin-left: 10px;width: 70%;margin-top: 17px;">¥{{item.pn}}</div>
                <div style="height:30px;border-radius:50%;margin-top: 17px;margin-right: 18px;color: #666666;">x{{item.number}}</div>
            </div>
        </div>

    </div>
</template>

<script>
    import { XImg } from 'vux'
    export default {

        components: {
            XImg
        },
        props: {
            item: Object,

        },
        methods:{
            toDetail: function () {
                let that = this;
                that.$emit('goDetail', this.item)
            }
        }

    }
</script>

<style scoped>

</style>