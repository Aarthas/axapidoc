<template>
    <div style="margin-top: 10px;">
        <!--活动信息-->
        <div v-show="item.typeId!=1" style="display: flex;flex-direction: row;background-color: white;height: 31px;">
            <div style="ine-height: 20px;height:20px;margin-top:5px;margin-left: 8px;text-align:center;background-color:#1aad19;color: white;font-size: 12px;width: 50px;">{{item.name}}</div>
            <!--<div  style="font-size: 10px;text-align: left;line-height: 30px;margin-left: 4px;color: #333333;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;" >{{item.type}}</div>-->
            <vue-marquee  style="margin-left: 5px;line-height:30px;color: #666666;font-size: 10px;width: 270px;" :content="item.type" class="two"  :showtwo="false"></vue-marquee>

        </div>

        <!--<div style="height: 1px;background-color: #cbcbcb;"></div>-->
        <ul>
            <li v-for="list in item.list">
              <cart_cell :cellItem="list" :typedId="item.typeId"></cart_cell>
            </li>
        </ul>
    </div>
</template>

<script>

    import cart_cell from './cart_cell.vue';
    import marquee from './marquee.vue';
    export default {
        components: {cart_cell, "vue-marquee": marquee,},

        props:{
            item:Object
        }


    }
</script>

<style scoped>

</style>