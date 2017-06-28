<template>

    <div style="display:flex;flex-direction: row;margin-top: 3px;background-color: #ffffff;width: 100vw;height: 79px;">
        <div  style="display:inline-block;margin-left: 8px;">
            <!--这里用XImg图片显示不出 不知道啥原因-->
            <!--<x-img :src="item.productImage"  style="width:69px;height: 69px;"  :offset="-100" container="#vux_view_box_body" ></x-img>-->
            <img style="width:69px;height: 69px;margin-top: 5px;" :src="item.productImage">

        </div>
        <div style="display:inline-block;flex: 1;">
            <div style="display:flex;text-align: left;margin-left:5px;margin-right:8px;margin-top: 5px;height: 30px;color: #999999;">{{item.name}}</div>
            <div style="display:flex;flex-direction: row;width: 100%;margin-bottom: 5px;">
                <div style="flex:2;text-align:left;color: #666666;margin-left: 10px;width: 70%;margin-top: 17px;">会员价: ¥{{item.po}}</div>
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

    }
</script>

<style scoped>

</style>