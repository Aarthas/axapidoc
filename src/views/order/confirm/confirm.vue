<template>
    <div style="margin-bottom: 70px;">


        <!--收货信息-->
        <div style="display:flex;flex-direction:column;background-color: #ffffff;margin-top: 8px;">
            <div  class="orderInfo">收货人：{{address.consignee}}</div>
            <div  class="orderInfo">联系电话：{{address.mobile}}</div>
            <div v-if="address.isDeliver" class="orderInfo">取货方式：配送</div>
            <div v-else class="orderInfo">取货方式：自提</div>
            <div v-if="address.isDeliver" class="orderInfo">收货地址：{{address.area}}{{address.detailAddress}}</div>
            <div v-else class="orderInfo">自提地址：{{address.shopName}}  {{address.address}}</div>
            <div  style="height: 8px;background-color: white;"></div>
        </div>
        <!--支付方式-->
        <div style="display: flex;flex-direction: column;margin-top: 8px;background-color: white;">
            <div style="font-size: 14px;margin-left: 8px;">支付方式</div>
            <div  style="height: 1px;background-color: #f5f5f5;"></div>
            <div style="display: flex;flex-direction: column;" >
                <div style="display: flex;flex-direction: row;">
                 <div style="height: 30px;line-height: 30px;margin-left: 16px;">在线支付</div>
                    <div style="flex: 1;text-align: right;">
                    <!--打勾-->
                    <img v-if="payType.online_able==true" style="width: 17px;height:17px;margin-top: 10px;margin-right: 10px;" src="http://onpxz5rdd.bkt.clouddn.com/ic_put_into_cart.png">
                    <!--禁用-->
                    <img v-else style="width: 17px;height:17px;margin-top: 10px;margin-right: 10px;" src="http://onpxz5rdd.bkt.clouddn.com/ic_put_into_cart.png">
                    </div>
                </div>
                <div  style="height: 1px;background-color: #f5f5f5;"></div>
                <div style="display: flex;flex-direction: row;">
                 <div style="height: 30px;line-height: 30px;margin-left: 16px;">货到付款</div>
                    <div style="flex: 1;text-align: right;">
                    <!--打勾-->
                    <img v-if="payType.offline_able==true" style="height:17px;margin-top: 10px;margin-right: 10px;" src="http://onpxz5rdd.bkt.clouddn.com/ic_put_into_cart.png">
                    <!--禁用-->
                    <img v-else style="height:17px;margin-top: 10px;margin-right: 10px;" src="http://onpxz5rdd.bkt.clouddn.com/ic_put_into_cart.png">
                    </div>
                </div>
            </div>
        </div>
        <!--优惠券-->
        <group style="margin-top: -10px;">
            <cell style="font-size: 14px;margin-left: -8px;" title="优惠券" is-link @click.native="jt_usecoupon">
                <div style="background-color: #f03838;font-size: 12px;color: white;text-align: left;border-radius: 2%; ">{{coupons_able_count}}张可用</div>
            </cell>
        </group>
        <!--订单备注-->
        <group style="margin-top: -10px;">
            <x-input style="font-size: 14px;margin-left: -8px;" title="订单备注:" placeholder="给三江留言"   v-model="remarket"></x-input>
        </group>
        <!--价格信息-->
        <div style="margin-top: 8px;">
            <priceDetail :priceObject="priceInfo"></priceDetail>
        </div>
        <!--商品信息-->
        <ul style="margin-top: 8px;">
            <li v-for="item in goodsList">
                <good :item=item style="background-color: #ffffff;"></good>
            </li>
        </ul>

        <bottom  style="position:fixed; bottom:0; left: 0;" :item="priceInfo"></bottom>
        </div>


</template>

<script>
    import Lib from 'assets/js/Lib';
    import good from  '../../../views/trade/components/goodsitem.vue'
    import priceDetail from  '../../../views/trade/components/priceDetail.vue'
    import bottom from './components/bottom.vue'
     import selectcoupons from '../selectcoupons/list.vue'
    import { Group, Cell,XButton,Toast,XInput} from 'vux';
    var page;
    export default {
        components: {good,priceDetail,Group,Cell,XButton,bottom,Toast,XInput,selectcoupons},
        data () {
            return {
                priceInfo:{},
                goodsList: [],
                itemsData:{},
                payType:{},
                address:{},
                coupons_able_count:0,
                remarket:"" ,//备注


            }
        },

        mounted(){

            page = this;
            page.address = Lib.localStorage.getCurrentAddress();
            loadData(page.address);
        },
        methods:{
            jt_usecoupon:function () {
                this.$router.push({path:"list"})
            }
        }
    }
    function loadData(address){
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
                page.goodsList = basebean.getData().list;
                page.payType   = basebean.getData().payType;
                page.priceInfo = basebean.getData().priceInfo;
            },
            onerrcode:function (basebean) {
                page.$vux.toast.show({
                    type:'cancel',
                    text: basebean.getMessage()
                })

            }
        });

    }
</script>

<style scoped>
    .orderInfo{
        color: #666666;
        margin-left: 8px;
        margin-top: 8px;
        margin-right: 8px;
    }
    .cell{
        font-size: 14px;
    }
</style>