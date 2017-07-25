<template>

    <div style="margin-bottom: 120px;">
        <div v-if="cartList!=null">
            <div style="margin-top: 3px;background-color: white;overflow: hidden;position: relative;"
                 @click="jt_select_address">
                <div style="background-image: url('http://onpxz5rdd.bkt.clouddn.com/ic_address_line.png');background-size: contain;height: 2px;width: 100%"></div>
                <div v-if="selectAddress!=null" href="javascript:void(0);"
                     class="weui-cell weui-cell_access weui-cell_link">
                    <div class="weui-cell__hd" style="margin-right: 20px;color: #666666">收货<br>地址</div>
                    <div v-if="selectAddress.isDeliver" class="weui-cell__bd"
                         style="margin-right: 20px;color: #333333;line-height: 30px;">
                        {{selectAddress.consignee }}     {{selectAddress.mobile }}  [配送]<br> {{selectAddress.areaDesc
                        }} {{selectAddress.detailAddress}}

                    </div>
                    <div v-else class="weui-cell__bd" style="margin-right: 20px;color: #333333;line-height: 30px;">
                        {{selectAddress.consignee }}     {{selectAddress.mobile }}  [自提]<br>{{selectAddress.shopName
                        }}  |  {{selectAddress.address }}

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

            <div style="display: flex;flex-direction: row; background-color: white;height: 36px; margin-top: 10px;justify-content: flex-end;">
                <div v-if="cartData.cartV2PriceInfo" v-show="cartData.cartV2PriceInfo.showBuyMore"
                     style="display: flex;flex-direction: row;justify-content: space-between;flex: 1;padding-left: 6px;">
                    <!--<div style="font-size: 13px;line-height: 30px;margin-left: 6px;">-->
                        <!--{{cartData.cartV2PriceInfo.freeTransferInfo}}-->
                    <!--</div>-->
                  <vue-marquee  style="color: #666666;font-size: 10px;width: 230px;" :content="cartData.cartV2PriceInfo.freeTransferInfo" class="two"  :showtwo="false"></vue-marquee>

                    <div v-on:click="goHome"
                         style="width: 60px;float:right;margin-left:4px;margin-right:4px;background-color: #04BE02;line-height: 36px;font-size: 13px;color: white;text-align: center;">
                        去逛逛
                    </div>
                </div>
                <div v-on:click="changeEdit"
                     style="width: 60px;float:right;margin-right:2px;background-color: #04BE02;line-height: 36px;font-size: 13px;color: white;text-align: center;">
                    {{editStatu}}

                </div>
            </div>

            <ul>
                <li v-for="item in cartList">
                    <cart_temp :item="item"></cart_temp>
                </li>

            </ul>
            <settle v-if="isEdit==false" style="position:fixed; bottom:49px; left: 0;" :item="cartData"
                    @goSettle="goSettle"
                    @goSelectAll="goSelectAll"></settle>
            <edit v-else style="position:fixed; bottom:49px; left: 0;" :item="cartData" @goSelectAll="goSelectAll"
                  @addToFav="addToFav" @deleteAll="deleteAll"></edit>
        </div>
        <div v-else
             style="display: flex;flex-direction:column;justify-content: center;align-items: center;height: 400px;">
            <div>购物车列表为空</div>
            <x-button @click.native="goHome" type="primary" mini style="margin-top: 20px;width: 100px;">去逛逛</x-button>
        </div>
    </div>
</template>


<script>


    import {Group, XInput, XButton, XNumber, Toast, Confirm} from 'vux'
    import Vue from 'vue';
    import Lib from 'assets/js/Lib';

    import cart_temp from './components/cart_temp.vue'
    import settle from './components/settle.vue'
    import edit from './components/edit.vue'

    import marquee from './components/marquee.vue'


    var page
    export default {

        components: {
            Group,
            XInput,
            XButton,
//            popup_radio,
            "vue-marquee": marquee,
            XNumber,
            cart_temp,
            settle,
            edit,
            Toast,
            Confirm
        },
        data () {
            return {
                selectAddress: null,
                cartList: [],
                cartData: {},
                isEdit: false,
                editStatu: "编辑商品",

            };
        },
        watch: {},
        computed: {},
        created () {
            page = this;
            //Hub接收 选中单个 事件
            Lib.Hub.$on('selectSingle', (cellItem) => {
                selectSingle(cellItem);
            });
            //Hub接收 删除单个无效商品 事件
            Lib.Hub.$on('deleteSingle', (cellItem) => {
                deleteSingle(cellItem);
            });
            //Hub接收 去商品详情 事件
            Lib.Hub.$on('goDetail', (cellItem) => {
                if (cellItem.score > 0) {
                    Lib.go.go("/views/product/detail.html?productId=" + cellItem.sn + "&isScoreItem=0")
                } else {
                    Lib.go.go("/views/product/detail.html?productId=" + cellItem.sn + "&isScoreItem=1")
                }

            });
            //Hub接收 + 事件
            Lib.Hub.$on('add', (item) => {
                var newNumber = item.number + 1
                console.log("比较" + newNumber, item.stock);
                if (newNumber > item.stock) {
                    newNumber = item.stock;
                    page.$vux.toast.show({
                        type: 'cancel',
                        text: '就这么多啦！'
                    })
                }
                var score;
                if (item.score == null) {
                    score = 0;
                } else {
                    score = item.score;
                }
                var deliverType = page.selectAddress.isDeliver ? 1 : 2;
                var param = {
                    id: item.erpGoodsId,
                    number: newNumber,
                    deliverType: deliverType,
                    cartStatus: score > 0 ? 3 : 1
                };
                updateNumber(param);

            });
            //Hub接收 - 事件
            Lib.Hub.$on('sub', (item) => {
                var newNumber = item.number - 1;
                if (newNumber < 1) {
                    this.$vux.confirm.show({
                        title: '提示',
                        content: '确认删除此商品吗？',
                        onConfirm () {
                            deleteSingle(item);
                        }
                    });
                    return;
                } else if (newNumber > item.stock) {
                    newNumber = item.stock;
                }
                ;
                var score;
                if (item.score == null) {
                    score = 0;
                } else {
                    score = item.score;
                }
                var deliverType = page.selectAddress.isDeliver ? 1 : 2;
                var param = {
                    id: item.erpGoodsId,
                    number: newNumber,
                    deliverType: deliverType,
                    cartStatus: score > 0 ? 3 : 1
                };
                updateNumber(param);
            });
        },
        mounted () {
            let currentAddress = Lib.localStorage.getCurrentAddress();
            if (currentAddress != null) {
                page.selectAddress = currentAddress;
                let deliverType = currentAddress.isDeliver ? 1 : 2;
                Lib.axios.axios({
                    url: '/cartsV2?deliverType=' + deliverType,
                    loading: {
                        page: page,
                    },
                    success: function (basebean) {
                        console.log(basebean.getData())
                        page.cartData = basebean.getData();
                        page.cartList = basebean.getData().appCarts;
                    }
                });
            } else {

                Lib.axios.axios({
                    url: '/cartsV2/getCartsInFirstTime',
                    loading: {
                        page: page,
                    },
                    success: function (basebean) {
                        console.log(basebean.getData())
                        page.selectAddress = basebean.getData().address;
                        Lib.localStorage.setCurrentAddress(page.selectAddress)
                        page.cartData = basebean.getData().carts;
                        page.cartList = basebean.getData().carts.appCarts;

                    }
                });
            }

        },
        methods: {
//            选择地址
            jt_select_address: function () {
                Lib.go.go("/views/address/selectaddress.html")
            },
//            改变编辑商品状态
            changeEdit: function () {

                page.isEdit = !page.isEdit;
                if (page.isEdit == false) {
                    page.editStatu = "编辑商品"
                } else {
                    page.editStatu = "完成"
                }
            },
//            去结算
            goSettle: function () {
                Lib.go.go("/views/order/confirm.html")
            },
//            全选
            goSelectAll: function (item) {
                var deliverType = page.selectAddress.isDeliver ? 1 : 2;
                var selectAll = item.selectAll ? 0 : 1;
                Lib.axios.axios({
                    method: "post",
                    url: "/cartsV2/selectAllOrCancel",
                    data: {
                        selectAll: selectAll,
                        deliverType: deliverType,

                    },
                    loading: {
                        page: page,
                    },
                    success: function (basebean) {
                        console.log('返回的' + basebean.getData())
                        page.cartData = basebean.getData();
                        page.cartList = basebean.getData().appCarts;

                    },
                    onerrcode: function (basebean) {
                        page.$vux.toast.show({
                            type: 'cancel',
                            text: basebean.getMessage()
                        })

                    }

                });
            },
//            加入收藏
            addToFav: function (item) {
                var newSelectedData = [];
                item.appCarts.filter(function (item) {

                    if (item.typeId != -1) {
                        var list = item.list;
                        list.filter(function (itemObject) {
                            if (itemObject.isSelected == 1) {
                                newSelectedData.push(itemObject.erpGoodsId);
                            }
                        })
                    }
                });
                if (newSelectedData.length == 0) {
                    page.$vux.toast.show({
                        type: 'cancel',
                        text: '至少选择一件商品'
                    })
                }
                ;
                Lib.axios.axios({
                    method: "post",
                    url: "/collections/addItems",
                    data: {
                        ids: newSelectedData,
                    },
                    loading: {
                        page: page,
                    },
                    success: function (basebean) {
                        page.$vux.toast.show({
                            text: basebean.getMessage()
                        })

                    },
                    onerrcode: function (basebean) {
                        page.$vux.toast.show({
                            type: 'cancel',
                            text: basebean.getMessage()
                        })

                    }

                });
            },
//            删除选中
            deleteAll: function (item) {
                var deliverType = page.selectAddress.isDeliver ? 1 : 2;
                Lib.axios.axios({
                    method: "post",
                    url: "/cartsV2/deleteSelects",
                    params: {
                        deliverType: deliverType,
                    },
                    loading: {
                        page: page,
                    },
                    success: function (basebean) {
                        console.log('返回的' + basebean.getData())
                        page.cartData = basebean.getData();
                        page.cartList = basebean.getData().appCarts;

                    },
                    onerrcode: function (basebean) {
                        page.$vux.toast.show({
                            type: 'cancel',
                            text: basebean.getMessage()
                        })

                    }

                });
            },
//            去逛逛
            goHome: function () {
                window.location.href = Lib.constant.baseurl + "/views/home/home.html#/mall";
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
    //选中单个
    function selectSingle(cellItem) {
        var score;
        if (cellItem.score == null) {
            score = 0;
        } else {
            score = cellItem.score;
        }
        var deliverType = page.selectAddress.isDeliver ? 1 : 2;
        var isSelect = cellItem.isSelected ? 0 : 1;
        Lib.axios.axios({
            method: "post",
            url: "/cartsV2/selectOrCancel",
            data: {
                id: cellItem.erpGoodsId,
                isSelected: isSelect,
                deliverType: deliverType,
                cartStatus: score > 0 ? 3 : 1
            },
            loading: {
                page: page,
            },
            success: function (basebean) {

                page.cartData = basebean.getData();

                page.cartList = basebean.getData().appCarts;

            },
            onerrcode: function (basebean) {
                page.$vux.toast.show({
                    type: 'cancel',
                    text: basebean.getMessage()
                })

            }

        });
    }

    //删除单个
    function deleteSingle(cellItem) {
        var deliverType = page.selectAddress.isDeliver ? 1 : 2;
        var score;
        if (cellItem.score == null) {
            score = 0;
        } else {
            score = cellItem.score;
        }
        Lib.axios.axios({
            method: "post",
            url: "/cartsV2/deleteSingle",
            params: {
                skuId: cellItem.erpGoodsId,
                deliverType: deliverType,
                cartStatus: score > 0 ? 3 : 1
            },
            loading: {
                page: page,
            },
            success: function (basebean) {

                page.cartData = basebean.getData();
                page.cartList = basebean.getData().appCarts;

            },
            onerrcode: function (basebean) {
                page.$vux.toast.show({
                    type: 'cancel',
                    text: basebean.getMessage()
                })

            }

        });
    }
    //加减数量
    function updateNumber(param) {
        Lib.axios.axios({
            method: "post",
            url: "/cartsV2/updateNum",
            loading: {
                page: page,
            },
            data: param,
            success: function (basebean) {

                page.cartData = basebean.getData();
//                Todo:数组改变不会被检测到 用set
                page.cartList = [...basebean.getData().appCarts];
//                vm.$set(page.cartList,1,null)
            },
            onerrcode: function (basebean) {
                page.$vux.toast.show({
                    type: 'cancel',
                    text: basebean.getMessage()
                })

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
