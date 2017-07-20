<template>
    <div style="margin-bottom: 70px;">


        <!--收货信息-->
        <div style="display:flex;flex-direction:column;background-color: #ffffff;margin-top: 8px;">
            <div  class="orderInfo">收货人：{{address.consignee}}</div>
            <div  class="orderInfo">联系电话：{{address.mobile}}</div>
            <div v-if="address.isDeliver" class="orderInfo">取货方式：配送</div>
            <div v-else class="orderInfo">取货方式：自提</div>
            <div v-if="address.isDeliver" class="orderInfo">收货地址：{{address.areaDesc}}&nbsp;&nbsp;{{address.detailAddress}}</div>
            <div v-else class="orderInfo">自提地址：{{address.shopName}}  {{address.address}}</div>
            <div  style="height: 8px;background-color: white;"></div>
        </div>
        <!--支付方式-->
        <group title="支付方式">
            <radio :options="payRadios"  v-model="p_payType" >
                <template slot="each-item" scope="props">
                    <slot name="each-item" :icon="props.icon" :label="props.label" :index="props.index">
                        <p>
                            <img class="vux-radio-icon" :src="props.icon" v-show="props.icon">
                            <span class="vux-radio-label" style="font-size: 14px;">{{ props.label }}</span>
                        </p>
                    </slot>
                </template>
            </radio>
        </group>

        <!--优惠券-->
        <group style="margin-top: -10px;">
            <cell style="font-size: 14px;height: 24px;" title="优惠券" is-link @click.native="jt_usecoupon">
                <div style="background-color: #f03838;font-size: 12px;color: white;text-align: left;border-radius: 10px; padding:2px 10px;">{{coupons_able_count}}张可用</div>
            </cell>
        </group>
        <!--订单备注-->
        <group style="margin-top: -10px;">
            <x-input style="font-size: 14px;"   placeholder="订单备注:给三江留言"   v-model="remarket"></x-input>
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

        <!--<bottom  style="position:fixed; bottom:0; left: 0;" :item="priceInfo"></bottom>-->
        <bottom  style="position:fixed; bottom:0; left: 0;right: 0" :item="priceInfo" @clickSubmit="clickSubmit"></bottom>
        </div>


</template>

<script>
    import Lib from 'assets/js/Lib';
    import good from  '../../../views/trade/components/goodsitem.vue'
    import priceDetail from  '../../../views/trade/components/priceDetail.vue'
    import bottom from './components/bottom.vue'
    import { Group, Cell,XButton,Toast,XInput,Radio} from 'vux';
    var page;
    export default {
        components: {good,priceDetail,Group,Cell,XButton,bottom,Toast,XInput,Radio},
        data () {
            return {
                priceInfo:{},
                goodsList: [],
                itemsData:{},
                p_payType:0,
                address:{},
                coupons_able_count:0,
                remarket:"" ,//备注


            }
        },
      created(){
          //Hub接收 使用优惠券 事件
          page = this;
          Lib.Hub.$on('useCouponSuccess', (responObject) => {
              console.log("使用优惠券成功返回"+responObject.quantity);
              useCouponSuccess(responObject);
          });
      },
        computed:{
            payRadios:function () {
                let a = [];

                if ( page.itemsData .payType)
                {
                    if (page.itemsData.payType.offline_able){
                        a.push(
                            {
                                key: '1',
                                value: '货到付款'
                            }
                        )
                    }
                    if (page.itemsData.payType.online_able){
                        a.push(
                            {
                                key: '2',
                                value: '在线支付'
                            }
                        )
                    }
                    page.p_payType = page.itemsData.payType.pay_select;
                }



                return a
          }
        },
        mounted(){

            page = this;
            page.address = Lib.localStorage.getCurrentAddress();
            loadData(page.address);

        },
        methods:{
            jt_usecoupon:function () {
                this.$router.push({path:"usecoupon"})
            },
            clickSubmit:function () {
                console.log("clickSubmit 2")

                var deliverType;
                if ( page.address.isDeliver==true){
                    deliverType="deliver";
                }else {
                    deliverType="pick_shop";
                }


                Lib.axios.axios({
                    method: "post",
                    url: "/orders/submit",
                    data:{
                        addressId :  page.address.id,
                        shopId :  page.address.shopId,
                        deliverType : deliverType,
                        payType:page.p_payType,
                        comment:page.remarket,
                    },
                    loading:{
                        page:page

                    },
                    success: function (basebean) {
                        if (page.p_payType==1){
                           window.location.replace( Lib.constant.baseurl + "/views/order/result.html?orderId=" + basebean.getData().orderId) ;
                        }else {
                            window.location.replace( Lib.constant.baseurl + "/views/order/pay.html?orderId=" + basebean.getData().orderId+"&payAmount="+ basebean.getData().payAmount) ;

                        }

                    },
                    onerrcode:function (basebean) {
                        page.$vux.toast.show({
                            type:'cancel',
                            width:'16em',
                            text: basebean.getMessage()
                        })

                    }
                });
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
                if (basebean.getData().coupons_able){
                    page.coupons_able_count=basebean.getData().coupons_able.length;
                }

            },
            onerrcode:function (basebean) {
                page.$vux.toast.show({
                    type:'cancel',
                    text: basebean.getMessage()
                })

            }
        });

    }
    function useCouponSuccess(responObject){
       page.priceInfo=responObject;
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