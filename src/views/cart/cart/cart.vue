<template>

    <div style="margin-bottom: 120px;">

        <div style="background-color: #FFFFFF;overflow: hidden;position: relative;" @click="jt_select_address">
            <div v-if="selectAddress!=null"  href="javascript:void(0);"
               class="weui-cell weui-cell_access weui-cell_link">
                <div class="weui-cell__hd" style="margin-right: 20px;color: #666666">收货<br>地址</div>
                <div class="weui-cell__bd" style="margin-right: 20px;color: #333333;line-height: 30px;">
                    {{selectAddress.consignee }}     {{selectAddress.mobile }}<br> {{selectAddress.area }}
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
        <settle v-if="isEdit==false" style="position:fixed; bottom:49px; left: 0;" :item="cartData"></settle>
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

            console.log(page.selectAddress)

        },

        mounted () {

            let currentAddress = Lib.localStorage.getCurrentAddress();
            console.log("currentAddress")
            console.log(JSON.stringify(currentAddress))
            if (currentAddress != null) {
                page.selectAddress = currentAddress;
                let deliverType = currentAddress.isDeliver ? 1 : 2;
                Lib.axios.axios({
                    url: '/cartsV2?deliverType=' + deliverType,
                    success: function (basebean) {
                        console.log(basebean.getData())
                        page.carts = basebean.getData().carts;

                    }
                });
            } else {
                Lib.axios.axios({
                    url: '/cartsV2/getCartsInFirstTime',
                    success: function (basebean) {
                        console.log(basebean.getData())
                        page.selectAddress = basebean.getData().address;
                        Lib.localStorage.setCurrentAddress(page.selectAddress)
                        page.carts = basebean.getData().carts;

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
            }
        }
    }
    function loadCartData() {

        Lib.axios.axios({
            url: '/cartsV2?deliverType=' + a,

            success: function (basebean) {
                page.cartData = basebean.getData();
                page.cartList = basebean.getData().appCarts;
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
