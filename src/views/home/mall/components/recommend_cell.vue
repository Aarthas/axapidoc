<template>
    <div>
    <div style=" display: flex;flex-direction: column;background-color: #ffffff;height: 230px;margin :2px 5px 5px 5px;">
        <div @click="toDetail">
            <img style="height: 150px;background-color: yellow;margin: 8px 15px 0px 15px;" :src="item.productImage"/>
            <div style="color: #333333;font-size: 13px;margin-top:5px;margin-left:8px;margin-right:8px;text-align: left;white-space: nowrap;overflow: hidden;text-overflow: ellipsis; " >{{item.name}}</div>
        </div>
        <div style="display: flex;flex-direction: row;margin: 0px 8px 8px 8px;">
           <div style="color: #f03838;font-size: 15px;text-align: left;flex: 1;margin-top: 10px;" @click="toDetail">￥{{item.pn}}</div>
           <img style="margin-bottom: 0;margin-right: 0;width: 30px;height: 30px;margin-top: 10px;" src="http://onpxz5rdd.bkt.clouddn.com/ic_put_into_cart.png">
        </div>
    </div>

    </div>
</template>

<script>
    import Lib from 'assets/js/Lib';
    export default {
        components: {},
       props:{
            item:Object
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