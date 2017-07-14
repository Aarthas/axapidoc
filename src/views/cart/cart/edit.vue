<template>
    <div style="height: 50px;display: flex;flex-direction: row;background-color: white;">
        <!--左 选中按钮-->
        <div style="width: 8vw;margin-left: 0px;" v-on:click="myFun">
            <!--<img v-if="item.selectAll" src="http://onpxz5rdd.bkt.clouddn.com/ic_put_into_cart.png" style="width: 24px;margin-left: 5px;margin-top: 10px;" />-->
            <!--<img v-else src=""  style="width: 20px;margin-left: 5px;margin-top: 10px;background-color: black;" />-->
            <y-icon style="margin-top: 10px;" v-model="item.selectAll"></y-icon>
        </div>
        <div style="width:42vw;"></div>
        <div style="width:50vw;flex: 1;">
        <x-button type="primary" mini style="margin-right: 5px;margin-top: 10px;" @click.native="adToFav" >加入收藏</x-button>
        <x-button type="primary" mini style="margin-right: 8px;margin-top: 10px;" @click.native="deleteA">删除</x-button>
        </div>
    </div>
</template>

<script>
    import { CheckIcon,XButton } from 'vux';
    import YIcon from '../../../../src/components/YIcon.vue';
    export default {
        components: {
            CheckIcon,
            XButton,
            YIcon
        },
        props:{
            item:Object
        },
        methods:{
            myFun:function () {
                let that =this;
                that.$emit("goSAelectAll",that.item);
            },
            deleteA:function () {
                let that =this;
                that.$emit("deleteAll",that.item);
            },
            adToFav:function () {

                    let that = this;
                    that.$emit("addToFav", that.item);

            }
        }

    }
</script>

<style scoped>

</style>