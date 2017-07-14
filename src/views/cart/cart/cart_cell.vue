<template>
    <div style="display: flex;flex-direction: row;height: 110px;margin-bottom: 1px;background-color: white;">
        <!--左 选中按钮-->
        <div v-if="typedId !=-1" style="width: 30px;" v-on:click="single">
            <!--<img v-if="isSelected==1" src="http://onpxz5rdd.bkt.clouddn.com/ic_put_into_cart.png" style="width: 24px;margin-left: 5px;margin-top: 45px;" />-->
            <!--<img v-else src=""  style="width: 20px;margin-left: 5px;margin-top: 45px;background-color: black;" />-->
            <y-icon style="line-height: 100px;" v-model="isSelected"></y-icon>
        </div>
        <div v-else style="width: 30px;">
            <img  src=""  style="width: 20px;margin-left: 5px;margin-top: 45px;background-color: yellow;" />
        </div>
        <!--中  商品图片-->
        <div style="width: 100px; " v-on:click="myFun">
           <img style="background-color: yellow;width: 80px;height: 80px;margin-top :15px;margin-left: 10px;" :src="cellItem.productImage">
        </div>
        <!--右-->
        <div style="display: flex;flex-direction: column;flex: 1;">
            <!-- 上 标题-->
            <div style="margin-right: 6px;font-size: 14px;color: #333333;margin-top: 15px;height: 40px;" v-on:click="myFun">{{cellItem.name}}</div>
            <!--下  价格+加减-->
            <div style="display: flex;flex-direction: row;flex: 1;">
                <div style="color: #f03838;margin-top: 17px;" v-on:click="myFun">￥{{cellItem.displayPrice}}</div>
                <add_sub v-show="typedId !=-1" :item="cellItem" style="margin-right: 8px;flex: 1;"></add_sub>
            </div>
        </div>
    </div>
</template>

<script>
    import Lib from 'assets/js/Lib';
    import { CheckIcon } from 'vux'
    import add_sub  from './addsub.vue';
    import YIcon from '../../../../src/components/YIcon.vue';
    export default {
        components: {
            add_sub,
            CheckIcon,
            YIcon
        },
       data () {
        return {
            isSelected:false,
        }
       },
        props:{
            cellItem:Object,
            typedId:Number
        },
        created(){

            if (this.cellItem.isSelected==0){
                this.isSelected=false;
            } else{
                this.isSelected=true
            }

        },
        methods:{

            single :function () {
                Lib.Hub.$emit('selectSingle',this.cellItem); //Hub触发事件
            },
            myFun :function () {
                Lib.Hub.$emit('goDetail',this.cellItem); //Hub触发事件
            },

        }
    }
</script>

<style scoped>


</style>