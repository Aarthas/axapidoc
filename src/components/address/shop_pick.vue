<template>
    <div>
        <group title="请选择购买门店">
            <!--<cellhead title="请选择购买门店"></cellhead>-->
            <!--<cell title="生风电"  is-link @click.native="chooseShop">-->
            <!--<selector placeholder="请选择省份"title="省份" name="district" :options="complaintPreData.types" @on-change="onChange"></selector>-->
            <!--</cell>-->
            <YSelect :propsData="{title:'区域与门店',require:false, placeholder:'',list:areaList}" v-model="p_areaindex"></YSelect>
            <YSelect :propsData="{ placeholder:'请选择门店', require:false,list:shopList}" v-model="p_shopindex" v-show="p_areaindex>0"></YSelect>

            <div  >
                <div  v-show="p_shopindex>-1" style="font-size: 14px;margin-left: 1em;margin-bottom: 12px;"  >{{info}}</div>
                <!--<div v-else style="font-size: 14px;margin-left: 1em;margin-bottom: 12px;"></div>-->
            </div>

        </group>
    </div>
</template>

<script>
    import {XButton, Group, Cell, Selector} from 'vux'
    import YSelect from '../YSelect.vue';
    export default {
        components: {
            Group,
            YSelect
        },
        data () {
            return {

                p_shopindex: -1,
                p_areaindex: -1,
            }
        },
        props: {
            item: Array,

        },
        computed: {

            areaList () {

                let list = [];
                let shopsList = this.item;
                if (shopsList) {
                    for (var i = 0; i < shopsList.length; i++) {
                        let a = shopsList[i]
                        list.push({name: a.area, value: i})
                    }
                }


                return list
            },
            shopList () {
                console.log("shopList")
                let list = [];

                let shopsList = this.item;
                if (shopsList&&shopsList[this.p_areaindex]) {
                    let shops = shopsList[this.p_areaindex].shops
                    for (var j in shops) {
                        let shop = shops[j]
                        list.push({name: shop.shopName, value: j})
                    }
                }

                return list
            },
            info () {
                console.log("info")
                let shopsList = this.item;
                if (shopsList&&shopsList[this.p_areaindex]) {
                    let shops = shopsList[this.p_areaindex].shops
                    if (shops&&shops[this.p_shopindex])
                    {
                        let detailAddress = shops[this.p_shopindex].address
                        return detailAddress;
                    }

                }

                return ""
            },
        },
        watch: {
            p_areaindex: function (newVal,oldVal){
                console.log('p_areaindex  new: %s, old: %s', newVal, oldVal);
                if(newVal != oldVal){
                    this.p_shopindex=-1;

                }
            },
            p_shopindex: function (newVal,oldVal) {
                console.log('p_shopindex  new: %s, old: %s', newVal, oldVal);

            }
        },
        methods: {

        },

    }
</script>

<style>

</style>
