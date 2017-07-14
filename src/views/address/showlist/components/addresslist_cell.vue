<template>
    <div style="display: flex;flex-direction: row">
        <div style="display:flex;flex-direction:column;background-color: #ffffff;margin-top: 8px;flex: 5;">
            <div  class="orderInfo">收货人：{{address.consignee}}</div>
            <div  class="orderInfo">联系电话：{{address.mobile}}</div>
            <div  class="orderInfo">收货地址：{{area}} {{address.detailAddress}}</div>

            <div  style="height: 8px;background-color: white;"> </div>
        </div>
        <div style="background-color: white;margin-top: 8px;flex: 1;text-align: center;" @click="click">
            <img style=" height:28px;border-radius:50%;margin-top: 50%;" src="http://onpxz5rdd.bkt.clouddn.com/ic_edit_2.png">

        </div>
    </div>
</template>

<script>
    import {XButton} from 'vux'

    export default {

        components: {XButton},
        date(){
          return{
              area:""
          }
        },
        computed:{
            replaceString:function(){
                let str = this.address.area.replace("#"," ");
                return str.replace("#"," ");
            }
        },
        props:{
            address:Object
        },
        created(){
            this.area=this.replaceString;
        },
        methods: {
            click: function () {
                let that = this;
                that.$emit('toEdit', this.address)
            }
        }
    }
</script>

<style scoped>
    .orderInfo{
        color: #666666;
        margin-left: 8px;
        margin-top: 8px;
    }
</style>