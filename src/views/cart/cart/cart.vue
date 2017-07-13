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

        <div style="background-color: white;height: 30px; margin-top: 10px;" >
            <div  v-on:click="changeEdit"
                 style="width: 60px;float:right;margin-right:8px;background-color: #04BE02;line-height: 30px;font-size: 13px;color: white;text-align: center;">
                {{editStatu}}
            </div>
        </div>
        <!--<div  v-show="cartList.length==0" style="display: flex;justify-content: center;align-items: center;height: 400px;">-->
            <!--购物车列表为空-->
        <!--</div>-->
        <ul>
            <li v-for="item in cartList">
                <cart_temp :item="item">
                </cart_temp>
            </li>

        </ul>
        <settle v-if="isEdit==false" style="position:fixed; bottom:49px; left: 0;" :item="cartData" @goSettle="goSettle" @goSelectAll="goSelectAll"></settle>
        <edit v-else style="position:fixed; bottom:49px; left: 0;" :item="cartData" @goSelectAll="goSelectAll" @addToFav="addToFav" @deleteAll="deleteAll"></edit>
    </div>
</template>


<script>


    import {Group, XInput, XButton, XNumber,Toast} from 'vux'
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
            edit,
            Toast
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
        watch: {


        },
        computed: {},
        created () {
            page = this;

            Lib.Hub.$on('selectSingle', (cellItem) => { //Hub接收 选中单个 事件
                selectSingle(cellItem);
            });
            Lib.Hub.$on('goDetail', (cellItem) => { //Hub接收 去商品详情 事件
                if(cellItem.score>0) {
                    Lib.go.go("/views/product/detail.html?productId="+cellItem.sn+"&isScoreItem=0")
                }else{
                    Lib.go.go("/views/product/detail.html?productId="+cellItem.sn+"&isScoreItem=1")
                }

            });
            Lib.Hub.$on('add', (item) => { //Hub接收 + 事件
                var newNumber=item.number+1
                console.log("比较"+newNumber,item.stock);
                if (newNumber>item.stock){
                    newNumber=item.stock;
                    page.$vux.toast.show({
                        type:'cancel',
                        text: '就这么多啦！'
                    })
                }
                var score;
                if (item.score==null){
                    score=0;
                }else{
                    score=item.score;
                }
                var deliverType = page.selectAddress.isDeliver?1:2;
              var param = {
                    id: item.erpGoodsId,
                    number: newNumber,
                    deliverType:deliverType,
                    cartStatus: score >0 ? 3 :1
                };
              updateNumber(param);

            });
            Lib.Hub.$on('sub', (item) => { //Hub接收 - 事件
                 var newNumber=item.number-1;
                 if(newNumber<1){
                     page.$vux.toast.show({
                         type:'cancel',
                         text: '不能少于1件哦！'
                     })
                     return;
                 }else if(newNumber > item.stock){
                     newNumber=item.stock;
                 };
                var score;
                if (item.score==null){
                    score=0;
                }else{
                    score=item.score;
                }
                var deliverType = page.selectAddress.isDeliver?1:2;
                var param = {
                    id: item.erpGoodsId,
                    number: newNumber,
                    deliverType:deliverType,
                    cartStatus: score >0 ? 3 :1
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
            goSettle:function () {
                Lib.go.go("/views/order/confirm.html")
            },
//            全选
            goSelectAll:function (item) {
                var deliverType = page.selectAddress.isDeliver?1:2;
                var selectAll = item.selectAll?0:1 ;
                Lib.axios.axios({
                    method: "post",
                    url:"/cartsV2/selectAllOrCancel",
                    data:{
                        selectAll:selectAll,
                        deliverType:deliverType,

                    },
                    success: function (basebean) {
                        console.log('返回的'+basebean.getData())
                        page.cartData = basebean.getData();
                        page.cartList = basebean.getData().appCarts;

                    },
                    onerrcode:function (basebean) {
                        page.$vux.toast.show({
                          type:'cancel',
                          text: basebean.getMessage()
                         })

                    }

                });
            },
//            加入收藏
            addToFav:function (item) {
                var newSelectedData=[];
                item.appCarts.filter(function (item) {

                      if (item.typeId != -1) {
                          var list = item.list;
                          list.filter(function (itemObject) {
                              if (itemObject.isSelected==1) {
                                  newSelectedData.push(itemObject.erpGoodsId);
                              }
                          })
                      }
                  });
               if (newSelectedData.length==0){
                   page.$vux.toast.show({
                    type:'cancel',
                    text: '至少选择一件商品'
                })
               };
                Lib.axios.axios({
                    method: "post",
                    url:"/collections/addItems",
                    data:{
                        ids:newSelectedData,
                    },
                    success: function (basebean) {
                        page.$vux.toast.show({
                            text: basebean.getMessage()
                        })

                    },
                    onerrcode:function (basebean) {
                         page.$vux.toast.show({
                              type:'cancel',
                              text: basebean.getMessage()
                         })

                    }

                });
            },
//            删除选中
            deleteAll:function (item) {
                var deliverType = page.selectAddress.isDeliver?1:2;
                Lib.axios.axios({
                    method: "post",
                    url:"/cartsV2/deleteSelects",
                    params:{
                        deliverType:deliverType,
                    },
                    success: function (basebean) {
                        console.log('返回的'+basebean.getData())
                        page.cartData = basebean.getData();
                        page.cartList = basebean.getData().appCarts;

                    },
                    onerrcode:function (basebean) {
                        page.$vux.toast.show({
                           type:'cancel',
                           text: basebean.getMessage()
                        })

                    }

                });
            },
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
        if (cellItem.score==null){
            score=0;
        }else{
            score=cellItem.score;
        }
        var deliverType = page.selectAddress.isDeliver?1:2;
        var isSelect = cellItem.isSelected?0:1 ;
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

                page.cartData=basebean.getData() ;
//                Todo:数组改变不会被检测到 用set
                page.cartList=[...basebean.getData().appCarts];
//                vm.$set(page.cartList,1,null)
            },
            onerrcode:function (basebean) {
                page.$vux.toast.show({
                    type:'cancel',
                    text: basebean.getMessage()
                })

            }

        });
    }
    //加减数量
    function updateNumber(param){
        Lib.axios.axios({
            method: "post",
            url:"/cartsV2/updateNum",
            data:param,
            success: function (basebean) {

                page.cartData=basebean.getData() ;
//                Todo:数组改变不会被检测到 用set
                page.cartList=[...basebean.getData().appCarts];
//                vm.$set(page.cartList,1,null)
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

<style>
    .demo3-slot {
        text-align: center;
        padding: 8px 0;
        color: #888;
    }

</style>
