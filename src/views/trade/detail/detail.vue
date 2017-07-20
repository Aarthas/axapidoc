<template>
    <div>
        <!--订单信息-->
        <div style="display:flex;flex-direction:column;background-color: #ffffff;margin-top: 8px;">
            <div  class="orderInfo">订单状态：{{itemsData.orderStatusName}}</div>
            <div  class="orderInfo">订单号：{{itemsData.orderId}}</div>
            <div  class="orderInfo">下单时间：{{itemsData.createdDate}}</div>
            <div  style="height: 8px;background-color: white;"></div>
            <div  v-if="itemsData.orderStatus==5" style="display: flex;flex-direction: row;height: 50px;">
                <x-button  @click.native="cancelOrder(itemsData.orderId)"  style=" margin-left:8px;width:100px;height: 35px;line-height: 32px;font-size: 11px;margin-top: 10px;margin-right: 8px;">取消订单</x-button>
                <x-button @click.native="goPay" style="margin-left:8px;width:100px;height: 35px;line-height: 32px;font-size: 13px;margin-top: 10px;margin-right: 8px;" type="primary" >去支付</x-button>
            </div>
            <div  v-else-if="itemsData.orderStatus!=5&&itemsData.orderStatus>0" style="display: flex;flex-direction: row;height: 50px;text-align: center">
                <x-button  @click.native="checkLogistics(itemsData.orderId)"  style=" margin-left:8px;width:100px;height: 35px;line-height: 32px;font-size: 11px;margin-top: 10px;margin-right: 8px;">查看物流</x-button>
            </div>


        </div>

        <!--收货信息-->
        <div style="display:flex;flex-direction:column;background-color: #ffffff;margin-top: 8px;">
            <div style="background-image: url('http://onpxz5rdd.bkt.clouddn.com/ic_address_line.png');background-size: contain;height: 2px;width: 100%"></div>
            <div  class="orderInfo">收货人：{{address.consignee}}</div>
            <div  class="orderInfo">联系电话：{{address.mobile}}</div>
            <div  class="orderInfo">收货地址：{{address.detailAddress}}</div>
            <div  style="height: 8px;background-color: white;"></div>
            <div style="background-image: url('http://onpxz5rdd.bkt.clouddn.com/ic_address_line.png');background-size: contain;height: 2px;width: 100%"></div>
        </div>
        <!--商品信息-->
        <ul style="margin-top: 8px;">
            <li v-for="item in goodsList">
                <good :item=item style="background-color: #ffffff;" @goDetail="goDetail"></good>
            </li>
        </ul>
        <!--支付方式-配送方式-订单备注-->
        <group gutter="8px">
            <cell class="cell" title="支付方式" :value="itemsData.payTypeName"></cell>
            <cell class="cell" title="配送方式" :value="itemsData.deliverName"></cell>
            <cell v-if="itemsData.comment" class="cell" title="订单备注" :value="itemsData.comment"></cell>
            <cell v-else class="cell" title="订单备注" value="无"></cell>
        </group>
        <!--价格信息-->
        <div style="margin-top: 8px;">
          <priceDetail :priceObject="priceInfo"></priceDetail>
        </div>

    </div>
</template>

<script>
    import Lib from 'assets/js/Lib';
    import good from '../components/goodsitem.vue';
    import priceDetail from '../components/priceDetail.vue';
    import { Group, Cell,XButton,Confirm ,Toast} from 'vux';
    let orderId = Lib.Utils.getQueryString("orderId");
    var page;
    export default {
        components: {good,priceDetail,Group,Cell,XButton,Confirm,Toast},
        name:"orderDetail",
        data () {
            return {
                priceInfo:{},
                goodsList: [],
                itemsData:{},
                address:{},

            }
        },

        mounted(){

            page = this;

            loadData(orderId);
        },
     methods:{
         goDetail:function (item) {
             var isScoreItem;
             if (item.score>0){
                 isScoreItem=1
             }else{
                 isScoreItem=0
             }
             Lib.go.go("/views/product/detail.html?productId="+item.sn+"&isScoreItem="+isScoreItem)
         },
         //取消订单
         cancelOrder:function (orderId) {
             this.$vux.confirm.show({
                 title: '提示',
                 content: '确认取消订单吗？',
                 onConfirm () {
                     Lib.axios.axios({
                         method: "post",
                         url: "/orders/cancel",
                         params: {
                             orderId: orderId,
                         },
                         loading:{
                             page:page,
                         },
                         success: function (basebean) {
                             page.$vux.toast.show({
                                 text: '取消订单成功'
                             })
                             loadData(orderId);
                         },
                         onerrcode: function (basebean) {
                             page.$vux.toast.show({
                                 type: 'cancel',
                                 text: basebean.getMessage()
                             })

                         }

                     });
                 }
             });
         },
         //去支付
         goPay:function () {
             Lib.go.jt_pay( orderId, page.itemsData.totalPrice)
//             window.location.href = Lib.constant.baseurl + "/views/order/pay.html?orderId=" + orderId+"&payAmount="+page.itemsData.totalPrice;
         },
         //查看物流
         checkLogistics:function (orderId) {
             window.location.href = Lib.constant.baseurl + "/views/trade/logistics.html?orderId=" + orderId;
         }

     }

    }

    function loadData(orderId){


        Lib.axios.axios({
            url: "/orders/"+orderId+"/detail",
            loading:{
                page:page,
            },
            success: function (basebean) {

                page.itemsData = basebean.getData();
                page.goodsList = basebean.getData().items;
                page.priceInfo = basebean.getData().priceInfo;
                page.address   = basebean.getData().address;

            }
        });

    }

</script>

<style scoped>
    .orderInfo{
       color: #666666;
       margin-left: 8px;
       margin-top: 8px;
    }
    .cell{
        font-size: 14px;
    }
</style>