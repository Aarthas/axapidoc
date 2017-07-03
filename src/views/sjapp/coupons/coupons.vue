<template>
    <div>

        <ul v-show="!listEmpty">
            <li v-for="item in list">

                <coupons_blue @exchange="exchange" :item=item v-if="item.isReduce"></coupons_blue>
                <coupons_orange @exchange="exchange" :item=item v-if="item.isCach"></coupons_orange>
            </li>

        </ul>
        <div v-show="listEmpty" style="display: flex;justify-content: center;align-items: center;height: 400px;">
            可兑换优惠券为空




        </div>

    </div>
</template>

<script>
    let headers = null;
    let token = Lib.Utils.getQueryString("token");
    let shopid = Lib.Utils.getQueryString("shopid");
    if (token != null || token.length >= 0) {
        headers = {
            "x-auth-token": token,
            "shopid": shopid,
            "terminal": "50",
        };
    }

    import {Toast} from 'vux'
    var page;

    import coupons_blue from './component/coupons_blue.vue'
    import coupons_orange from './component/coupons_orange.vue'
    import Lib from 'assets/js/Lib';


    export default {
        components: {
            "coupons_blue": coupons_blue,
            "coupons_orange": coupons_orange,

            Toast

        },
        data () {
            return {

                listEmpty: false,
                list: [],
            }
        }
        ,
        created(){
            page = this;


        },
        mounted(){


            Lib.axios.axios({
                url: 'score/integalVolumes',
                headers: headers,
                success: function (basebean) {
                    console.log(basebean.getData())
                    let list = basebean.getData().list;
                    let listEmpty = basebean.isListEmpty();
                    console.log(listEmpty)
                    page.listEmpty = listEmpty;
                    page.list = list;
//                    if (listEmpty) {
//
//                    } else {
//
//                    }
                }
            });


        }
        ,
        methods: {
            exchange: function (item) {
                this.$vux.confirm.show({
                    title: '确认兑换码？',
                    content: '您将用' + item.integalScore + '积分兑换优惠券',
                    hideOnBlur: true,
                    confirmText: "兑换",
                    dialogTransition: "",
                    maskTransition: "",
                    onConfirm () {
                        page.$vux.loading.show({
                            text: '加载中'
                        })
                        Lib.axios.axios({
                            url: 'score/receiveIntegalVolume',
                            params: item,
                            headers: headers,
                            success: function (basebean) {
                                page.$vux.toast.show({
                                    text: '兑换成功'
                                })

                            },
                            onerrcode: function (basebean) {
                                let message = basebean.getMessage();
                                let labelWidth = Lib.Utils.labelWidth(message);
                                page.$vux.toast.show({
                                    text: '兑换成功'
                                })
                                page.$vux.toast.show({
                                    width: labelWidth,
                                    type: "cancel",
                                    text: message
                                })
                            },
                            onAfter: function () {
                                page.$vux.loading.hide()
                            }
                        });


                    }
                })

            }
        }
    }
</script>

<style>


</style>
