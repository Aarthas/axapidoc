<template>

    <div>

        <ul v-if="!listEmpty">
            <li v-for="(item,index) in coupons_able">
                <coupon_blue  :item=item v-if="item.isUnused&&item.isReduce" :index="index" v-model="item.isSelected" @clickItem="clickItem"></coupon_blue>
                <!--<coupon_orange :item=item v-else-if="item.isUnused&&item.isCach"></coupon_orange>-->
            </li>
            <li v-for="item in coupons_unable">
                <coupon_gray  :item=item ></coupon_gray>
            </li>

        </ul>
        <div v-else style="display: flex;justify-content: center;align-items: center;height: 400px;">
            优惠券为空
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
                listEmpty: true,
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
                    page.coupons_able =  page.itemsData.coupons_able;
                    page.coupons_unable =  page.itemsData.coupons_unable;
                    page.listEmpty =  page.itemsData.coupons_able.length+ page.itemsData.coupons_unable.length == 0
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
                item.isSelected = 1-  item.isSelected;

//                page.$set(this.coupons_able,index,item)

            },


        }
    }
</script>

<style lang="less">

</style>
