<template>
    <div style="display:flex;flex-direction: row;text-align: center;background-color: #ffffff;width: 100vw;height: 105px;">
        <div  style="display:inline-block;margin-left: 8px;">
            <img :src="item.productImage"  class="ximg-demo" error-class="ximg-error" :offset="-100" container="#vux_view_box_body" ></img>
        </div>
        <div style="display:inline-block;flex: 1;">
            <div style="display:flex;text-align: left;margin-left:5px;margin-right:8px;margin-top: 10px;height: 40px;">{{item.name}}</div>
            <div style="display:flex;flex-direction: row;">
                <div style="flex:2;text-align:left;color: #f03838;margin-left: 10px;width: 70%;margin-top: 10px;">¥{{item.pn}}</div>
                <img style="height:34px;margin-top: 10px;margin-right: 10px;" src="http://onpxz5rdd.bkt.clouddn.com/ic_put_into_cart.png">

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

        }

    }
</script>

<style scoped>
    .ximg-demo {
        width:100px;
        height: 100px;
    }
</style>