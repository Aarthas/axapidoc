<template>

    <div style="margin-bottom: 70px;">

        <div style="background-color: #FFFFFF;overflow: hidden;position: relative;">
            <popup_radio title="aaa" :options="addresslist" v-model="option1" is-transparent="true">
                <p slot="popup-header" class="vux-1px-b demo3-slot">收货地址</p>
                <template scope="props" slot="each-item">
                    <p style="line-height: 30px;">
                        {{addresslist[props.index].consignee }}     {{addresslist[props.index].mobile }}

                        <span style="color:#666;">  {{addresslist[props.index].area }}  </span>
                    </p>
                </template>

            </popup_radio>
        </div>
        <div style="background-image: url('http://onpxz5rdd.bkt.clouddn.com/ic_address_line.png');background-size: contain;height: 2px;width: 100%"></div>
        <ul>
            <li v-for="item in cartList">
                <cart_temp :item="item">
                </cart_temp>
            </li>

        </ul>
    </div>



    <!--</transition>-->
</template>


<script>


    import {Group, XInput, XButton,XNumber} from 'vux'
    import Lib from 'assets/js/Lib';
    import popup_radio from './popup-radio.vue'
    import cart_temp from './cart_temp.vue'
    var page
    export default {

        components: {
            Group,
            XInput,
            XButton,
            popup_radio,
            XNumber,
            cart_temp
        },
        data () {
            return {
                option1: 0,
                addresslist: [],
                cartList:[],
            };
        },
        computed: {},
        created () {
            page = this;


        },
        watch: {
            option1 (val) {
                console.log("地址"+val);
                let address=page.addresslist[val];
                localStorage.setItem("MyAddress",address);
                loadCartData(address);
            },

        },
        mounted () {
            Lib.axios.axios({
                url: 'address',
                success: function (basebean) {
                    console.log(basebean.getData())
                    let list = basebean.getData();
//                    let listEmpty = basebean.isListEmpty();
//                    console.log(listEmpty)
//                    page.listEmpty = listEmpty;
//                    page.addresslist = list;
                    page.addresslist = list.map(function (item,index) {
                        item.value = item.id;
                        item.key = index;

                        return item;
                    });
                    if (  page.addresslist.length!=0 ) {
                      loadCartData( page.addresslist[0]);
                    }
                    else{
                      loadCartData( null);
                    }
                }
            });



        },
        updated () {


        },
        activated () {


        },
        deactivated () {

            console.log("deactivated")
        },
        destroyed () {
            console.log("destroyed")

        },

        methods: {}
    }
    function loadCartData(address) {
//        let address=localStorage.getItem("MyAddress");
        console.log("自提"+address.isDeliver);

        var a=0;
        if (address==null){
            a=1
        }else {
            if (address.isDeliver) {
                a = 1;
            } else {
                a = 2
            }
        }
        Lib.axios.axios({
            url: '/cartsV2?deliverType='+a,

            success: function (basebean) {
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
