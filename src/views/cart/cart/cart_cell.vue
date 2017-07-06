<template>
    <div style="display: flex;flex-direction: row;height: 110px;margin-bottom: 10px;background-color: white;">
        <!--左 选中按钮-->
        <div style="width: 30px;">
            <check-icon :value.sync="isSelected" style="line-height: 110px;"></check-icon>
        </div>
        <!--中  商品图片-->
        <div style="width: 100px; ">
           <img style="background-color: yellow;width: 80px;height: 80px;margin-top :15px;margin-left: 10px;" :src="cellItem.productImage">
        </div>
        <!--右-->
        <div style="display: flex;flex-direction: column;flex: 1;">
            <!-- 上 标题-->
            <div style="margin-right: 6px;font-size: 14px;color: #333333;margin-top: 15px;height: 40px;">{{cellItem.name}}</div>
            <!--下  价格+加减-->
            <div style="display: flex;flex-direction: row;flex: 1;">
                <div style="color: #f03838;margin-top: 17px;">￥{{cellItem.displayPrice}}</div>
                <add_sub style="margin-right: 8px;flex: 1;"></add_sub>
            </div>
        </div>
    </div>
</template>

<script>
    import Lib from 'assets/js/Lib';
    import { CheckIcon } from 'vux'
    import add_sub  from './addsub.vue'
    export default {
        components: {
            add_sub,
            CheckIcon
        },
       data () {
        return {
            isSelected:false,
        }
       },
        props:{
            cellItem:Object,
        },
        created(){
            if (this.cellItem.isSelected==0){
                this.isSelected=false;
            } else{
                this.isSelected=true
            }

        }
    }
</script>

<style scoped>


</style>