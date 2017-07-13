<template>
    <div style="height: 50px;display: flex;flex-direction: row;background-color:white">
        <!--左 收藏-->
        <div style="display: flex;flex-direction: column;width: 25vw;text-align: center;">
           <img style="width: 22px;height: 22px;background-color: yellow;margin-left: 10vw;margin-top: 5px;"/>
            <div style="color: #333333;font-size: 13px;margin-top: 5px;">收藏</div>
        </div>
        <div style="display: flex;flex-direction: column;width:25vw; text-align: center;">
            <img style="width: 24px;height: 24px;margin-left: 9vw;margin-top: 5px;" src="http://onpxz5rdd.bkt.clouddn.com/ic_put_into_cart.png"/>
            <div style="color: #333333;font-size: 13px;margin-top: 5px;">购物车</div>
        </div>
        <div  style="width: 50vw;margin-right: 0px;background-color: #04BE02;line-height: 50px;font-size: 17px;color: white;text-align: center;"  @click="action_addToCart">加入购物车</div>
    </div>
</template>

<script>
    import Lib from 'assets/js/Lib';
    export default {
        components: {},
        methods:{
           action_addToCart:function () {
               this.$emit("addCart")

           }
       }
    }
</script>

<style scoped>

</style>