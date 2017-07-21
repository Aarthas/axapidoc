<template>
    <div style="display: flex;flex-direction: row;height: 110px;margin-bottom: 1px;background-color: white;">
        <!--左 选中按钮-->
        <div style="width: 30px;" v-on:click="single">
            <!--<img v-if="isSelected==1" src="http://onpxz5rdd.bkt.clouddn.com/ic_put_into_cart.png" style="width: 24px;margin-left: 5px;margin-top: 45px;" />-->
            <!--<img v-else src=""  style="width: 20px;margin-left: 5px;margin-top: 45px;background-color: black;" />-->
            <y-icon style="line-height: 100px;" v-model="checked" :type="showCancel"></y-icon>
        </div>

        <!--中  商品图片-->
        <div style="width: 100px; " v-on:click="myFun">
            <img style="width: 80px;height: 80px;margin-top :15px;margin-left: 10px;"
                 :src="cellItem.productImage">
        </div>
        <!--右-->
        <div style="display: flex;flex-direction: column;flex: 1;">
            <!-- 上 标题-->
            <div style="margin-right: 6px;font-size: 14px;color: #333333;margin-top: 15px;height: 40px;"
                 v-on:click="myFun">{{cellItem.name}}
            </div>
            <!--下  价格+加减-->
            <div style="display: flex;flex-direction: row;flex: 1;">
                <div v-if="cellItem.score>0" style="color: #f03838;margin-top: 17px;" v-on:click="myFun">{{cellItem.displayPrice}}</div>
                <div v-else style="color: #f03838;margin-top: 17px;" v-on:click="myFun">￥{{cellItem.displayPrice}}</div>
                <add_sub v-show="typedId !=-1" v-model="cellItem.number" style="margin-right: 8px;flex: 1;"
                         @on-add="on_add" @on-sub="on_sub"></add_sub>
            </div>
        </div>
    </div>
</template>

<script>
    import Lib from 'assets/js/Lib';
    import {CheckIcon} from 'vux'
    import add_sub  from './addsub.vue';
    import YIcon from '../../../../components/YIcon.vue';
    export default {
        components: {
            add_sub,
            CheckIcon,
            YIcon
        },
        data () {
            return {}
        },
        computed: {
            checked(){
                return this.cellItem.isSelected == 1
            },
            showCancel(){
                if (this.cellItem.stockState == 2 || this.cellItem.stockState == 3) {
                    return "cancel";
                } else {
                    return 'default'
                }
            }
        },
        props: {
            cellItem: Object,
            typedId: Number
        },
        created(){


        },
        methods: {

            single: function () {
                if (this.cellItem.stockState == 2 || this.cellItem.stockState == 3) {
                    Lib.Hub.$emit('deleteSingle', this.cellItem);
                } else {
                    Lib.Hub.$emit('selectSingle', this.cellItem);
                }

            },
            myFun: function () {
                Lib.Hub.$emit('goDetail', this.cellItem); //Hub触发事件
            },
            on_add: function () {
                console.log("on_add")
                Lib.Hub.$emit('add', this.cellItem); //Hub触发事件
            },
            on_sub: function () {
                console.log("on_sub")
                Lib.Hub.$emit('sub', this.cellItem); //Hub触发事件
            }

        }
    }
</script>

<style scoped>


</style>