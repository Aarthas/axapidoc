<template>
    <div style="display:flex;flex-direction: row;text-align: center;background-color: #ffffff;width: 100vw;height: 105px;border-bottom: 1px solid #eeeeee;">
        <div  style="display:inline-block;margin-left: 8px;" v-on:click="toDetail">
            <img :src="item.productImage"  class="ximg-demo" error-class="ximg-error" :offset="-100" container="#vux_view_box_body" ></img>
        </div>
        <div style="display:inline-block;flex: 1;">
            <div style="display:flex;text-align: left;margin-left:5px;margin-right:8px;margin-top: 10px;height: 40px;" v-on:click="toDetail">{{item.name}}</div>
            <div style="display:flex;flex-direction: row;">
                <div style="flex:2;text-align:left;color: #f03838;margin-left: 10px;width: 70%;margin-top: 10px;" v-on:click="toDetail"><span style="font-size: 10px;color: #666">会员价：</span>¥{{item.pn}}</div>
                <img style="height:34px;margin-top: 10px;margin-right: 10px;" src="http://onpxz5rdd.bkt.clouddn.com/ic_put_into_cart.png" @click="action_addToCart">

            </div>
        </div>

    </div>
</template>

<script>
    import { XImg } from 'vux';
    import Lib from 'assets/js/Lib';
    export default {

        components: {
            XImg
        },
        props: {
            item: Object,

        },
        methods:{
            toDetail:function () {

                let that = this;
                that.$emit('goDetail', this.item)
            },
            action_addToCart:function () {

                Lib.axios.addtocart({
                    number:1,
                    cartStatus:1,
                    data:this.item.erpGoodsId,


                } ,this)
            }
        }

    }
</script>

<style scoped>
    .ximg-demo {
        width:100px;
        height: 100px;
    }
</style>