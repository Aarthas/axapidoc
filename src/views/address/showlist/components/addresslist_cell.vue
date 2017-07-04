<template>
    <div style="display: flex;flex-direction: row">
        <div style="display:flex;flex-direction:column;background-color: #ffffff;margin-top: 8px;flex: 5;">
            <div  class="orderInfo">收货人：{{address.consignee}}</div>
            <div  class="orderInfo">联系电话：{{address.mobile}}</div>
            <div  class="orderInfo">收货地址：{{area}} {{address.detailAddress}}</div>

            <div  style="height: 8px;background-color: white;"> </div>
        </div>
        <div style="background-color: white;margin-top: 8px;flex: 1;text-align: center;" @click="click">
            <img style=" height:40px;border-radius:50%;margin-top: 50%;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=">

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