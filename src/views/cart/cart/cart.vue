<template>

    <div style="margin-bottom: 120px;">

        <div  style="background-color: #FFFFFF;overflow: hidden;position: relative;" @click="jt_select_address">
            <div v-if="selectAddress!=null"  href="javascript:void(0);"
               class="weui-cell weui-cell_access weui-cell_link">
                <div class="weui-cell__hd" style="margin-right: 20px;color: #666666">收货<br>地址</div>
                <div v-if="selectAddress.isDeliver" class="weui-cell__bd" style="margin-right: 20px;color: #333333;line-height: 30px;">
                    {{selectAddress.consignee }}     {{selectAddress.mobile }}  [配送]<br> {{selectAddress.area }}
                </div>
                <div v-else class="weui-cell__bd" style="margin-right: 20px;color: #333333;line-height: 30px;">
                    {{selectAddress.consignee }}     {{selectAddress.mobile }}  [自提]<br>{{selectAddress.shopName }} {{selectAddress.address }}
                </div>
                <span class="weui-cell__ft"></span>

            </div>
            <div v-else href="javascript:void(0);" class="weui-cell weui-cell_access weui-cell_link">
                <div class="weui-cell__hd" style="margin-right: 20px;color: #666666"></div>
                <div class="weui-cell__bd" style="text-align: center;line-height: 40px;">新增收货地址<br></div>
                <span class="weui-cell__ft"></span>
            </div>
        </div>
        <div style="background-image: url('http://onpxz5rdd.bkt.clouddn.com/ic_address_line.png');background-size: contain;height: 2px;width: 100%"></div>

        <div style="background-color: white;height: 30px; margin-top: 10px;">
            <div v-on:click="changeEdit"
                 style="width: 60px;float:right;margin-right:8px;background-color: #04BE02;line-height: 30px;font-size: 13px;color: white;text-align: center;">
                {{editStatu}}
            </div>
        </div>
        <ul>
            <li v-for="item in cartList">
                <cart_temp :item="item">
                </cart_temp>
            </li>

        </ul>
        <settle v-if="isEdit==false" style="position:fixed; bottom:49px; left: 0;" :item="cartData" @goSettle="goSettle"></settle>
        <edit v-else style="position:fixed; bottom:49px; left: 0;" :item="cartData"></edit>
    </div>
</template>


<script>


    import {Group, XInput, XButton, XNumber} from 'vux'
    import Lib from 'assets/js/Lib';
    import popup_radio from './popup-radio.vue'
    import cart_temp from './cart_temp.vue'
    import settle from './settle.vue'
    import edit from './edit.vue'

    var page
    export default {

        components: {
            Group,
            XInput,
            XButton,
            popup_radio,
            XNumber,
            cart_temp,
            settle,
            edit
        },
        data () {
            return {
                selectAddress: null,
                cartList: [],
                cartData: {},
                isEdit: false,
                editStatu: "编辑商品"
            };
        },
        watch: {


        },
        computed: {},
        created () {
            page = this;

            Lib.Hub.$on('selectSingle', (cellItem) => { //Hub接收事件
                selectSingle(cellItem);
            });
            Lib.Hub.$on('goDetail', (cellItem) => { //Hub接收事件
                if(cellItem.score>0) {
                    Lib.go.go("/views/product/detail.html?productId="+cellItem.sn+"&isScoreItem=0")
                }else{
                    Lib.go.go("/views/product/detail.html?productId="+cellItem.sn+"&isScoreItem=1")
                }

            });

        },

        mounted () {

            let currentAddress = Lib.localStorage.getCurrentAddress();
//            console.log("currentAddress")
//            console.log(JSON.stringify(currentAddress))
            if (currentAddress != null) {
                page.selectAddress = currentAddress;
                let deliverType = currentAddress.isDeliver ? 1 : 2;
                Lib.axios.axios({
                    url: '/cartsV2?deliverType=' + deliverType,
                    success: function (basebean) {
                        console.log(basebean.getData())
                        page.cartData = basebean.getData();
                        page.cartList = basebean.getData().appCarts;
                    }
                });
            } else {

                Lib.axios.axios({
                    url: '/cartsV2/getCartsInFirstTime',
                    success: function (basebean) {
                        console.log(basebean.getData())
                        page.selectAddress = basebean.getData().address;
                        Lib.localStorage.setCurrentAddress(page.selectAddress)
                        page.cartData = basebean.getData();
                        page.cartList = basebean.getData().carts;

                    }
                });
            }


        },


        methods: {
            jt_select_address: function () {
                Lib.go.go("/views/address/selectaddress.html")
            },
            changeEdit: function () {

                page.isEdit = !page.isEdit;
                if (page.isEdit == false) {
                    page.editStatu = "编辑商品"
                } else {
                    page.editStatu = "完成"
                }
            },
            goSettle:function () {
                Lib.go.go("/views/order/confirm.html")
            }
        }
    }
    function loadCartData() {
        let deliverType = page.selectAddress.isDeliver ? 1 : 2;
        Lib.axios.axios({
            url: '/cartsV2?deliverType=' + deliverType,

            success: function (basebean) {
                page.cartData = basebean.getData();
                page.cartList = basebean.getData().appCarts;
            }
        });
    }
    function selectSingle(cellItem) {
       var score;
        if (cellItem.score==null){
            score=0;
        }else{
            score=cellItem.score;
        }
        var deliverType;
        if (page.selectAddress.isDeliver){
            deliverType=1;
        }else{
            deliverType=0;
        }
        var isSelect;
        if(cellItem.isSelected){
            isSelect=0;
        }else{
            isSelect=1;
        }
        Lib.axios.axios({
            method: "post",
            url:"/cartsV2/selectOrCancel",
            data:{
                id:cellItem.erpGoodsId,
                isSelected:isSelect,
                deliverType:deliverType,
                cartStatus:score>0?3:1
            },
            success: function (basebean) {
                  console.log('返回的'+basebean.getData())
                page.cartData = basebean.getData();
                page.cartList = basebean.getData().appCarts;

            },
            onerrcode:function (basebean) {
//                page.$vux.toast.show({
//                    type:'cancel',
//                    text: basebean.getMessage()
//                })

            }

        });
    }
</script>

<style>
    .demo3-slot {
        text-align: center;
        padding: 8px 0;
        color: #888;
    }

</style>
