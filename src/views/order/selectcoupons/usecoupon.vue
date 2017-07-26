<template>

    <div>

        <ul v-if="!listEmpty" style="margin-bottom: 100px;">
            <li v-for="(item,index) in coupons_able">
                <coupon_blue  :item=item v-if="item.isUnused&&item.isReduce" :index="index" v-model="item.isSelected" @clickItem="clickItem"></coupon_blue>
                <coupon_orange :item=item v-else-if="item.isUnused&&item.isCach"  :index="index" v-model="item.isSelected" @clickItem="clickItem"></coupon_orange>
            </li>
            <li v-for="item in coupons_unable">
                <coupon_gray  :item=item ></coupon_gray>
            </li>

        </ul>
        <div v-else style="display: flex;justify-content: center;align-items: center;height: 400px;">
            优惠券为空
        </div>
        <div  style="position: fixed;bottom: 0px;width: 100%;padding: 10px;box-sizing: border-box;background-color: #fbfbfb;">

            <x-button  v-if="!listEmpty" v-on:click.native="useCoupon" type="primary" :disabled="coupons_able.length == 0">使用</x-button>
            <x-button  v-else  type="primary" :disabled=true>暂无优惠券可使用</x-button>
        </div>
    </div>
</template>


<script>


    import {Group, XInput, XButton} from 'vux'
    import Lib from 'assets/js/Lib';
    import coupon_blue from './component/coupon_blue.vue'
    import coupon_orange from './component/coupon_orange.vue'
    import coupon_gray from './component/coupon_gray.vue'
    var page

    import Vue from 'vue'
    export default {

        components: {

            XButton,
            coupon_blue,
            coupon_orange,
            coupon_gray,
        },
        props: {
            item: Object,

        },
        data () {
            return {
                itemsData:{},
                listEmpty: false,
                coupons_able:[],
                coupons_unable: [],

            };
        },
        computed: {},
        created () {
            page = this;


        },
        mounted () {
            let address = Lib.localStorage.getCurrentAddress();
            var deliverType;
            if (address.isDeliver==true){
                deliverType="deliver";
            }else {
                deliverType="pick_shop";
            }
            console.log("dadas"+address.addressId,address.shopId,deliverType)
            Lib.axios.axios({
                method: "post",
                url: "/orders/goToConfirmOrder",
                data:{
                    addressId : address.id,
                    shopId : address.shopId,
                    deliverType : deliverType
                },
                success: function (basebean) {

                    page.itemsData = basebean.getData();
                    page.coupons_able =  page.itemsData.coupons_able||[];
                    page.coupons_unable =  page.itemsData.coupons_unable||[];
//                    console.log(   page.coupons_able .length+   page.coupons_unable.length)
                    page.listEmpty =   page.coupons_able .length+   page.coupons_unable.length == 0
                },
                onerrcode:function (basebean) {
                    page.$vux.toast.show({
                        type:'cancel',
                        text: basebean.getMessage()
                    })

                }
            });

        },

        methods: {
            clickItem:function (item,index) {
//                console.log(item)
//                console.log(index)
                //                page.$set(this.coupons_able,index,item)
                let currentAddress = Lib.localStorage.getCurrentAddress();
                let isSelected=item.isSelected==0?1:0;
                Lib.axios.axios({
                    method: "post",
                    url:"/coupons/checkVolume",
                    data:{
                        shopId:currentAddress.shopId,
                        volumeNumber:item.volumeNumber,
                        isSelected:isSelected
                    },
                    success: function (basebean) {
                        item.isSelected = 1-  item.isSelected;
                    },
                    onerrcode:function (basebean) {
                        page.$vux.toast.show({
                            type:'cancel',
                            text: basebean.getMessage()
                        })

                    }

                });

            },
            useCoupon:function () {

                let address=Lib.localStorage.getCurrentAddress();

                var deliverType=address.isDeliver?"deliver":"pick_shop";
                console.log("lalala"+address.id,deliverType,address.shopId);
                Lib.axios.axios({
                    method: "post",
                    url:"/orders/useCoupons",
                    data:{
                        shopId:address.shopId,
                        deliverType:deliverType,
                        addressId:address.id
                    },
                    success: function (basebean) {
                         Lib.Hub.$emit('useCouponSuccess',(basebean.getData().priceInfo)); //Hub触发事件
                        history.go(-1);
                    },
                    onerrcode:function (basebean) {
                        page.$vux.toast.show({
                            type:'cancel',
                            text: basebean.getMessage()
                        })

                    }

                });
            }

        }
    }
</script>

<style lang="less">

</style>
