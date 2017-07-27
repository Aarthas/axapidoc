<template>
    <div>

        <div style="display: flex;flex-direction: column;margin-bottom: 60px;">
            <swiper :list="bannerdata" :show-desc-mask="false"
                    style="width:100%;overflow: hidden;margin-top: 0px;height: auto;"
                    dots-class="custom-bottom"
                    dots-position="center" :aspect-ratio="1/1"></swiper>
            <info :item="itemsData"></info>
            <div style="background-color: white;height: 40px;margin-top: 10px;">
                <div style="font-size: 13px;line-height: 40px;margin-left: 8px;">服务： 商品10kg以内满88元，20kg以内满176元 包邮</div>
            </div>
            <div v-if="selectedAddress" style="background-color: white;height: 40px;margin-top: 1px;display: flex;flex-direction: row;" @click="jt_select_address">
                <div v-if="selectedAddress.isDeliver" style="font-size: 13px;line-height: 40px;margin-left: 8px;" >送至： {{selectedAddress.areaDesc}}</div>
                <div v-else style="font-size: 13px;line-height: 40px;margin-left: 8px;" >送至： {{selectedAddress.shopName}}</div>
                <div style="font-size: 13px;line-height: 40px;margin-left: 8px;color: #f03838">库存：{{stock}}件</div>
                <div style="font-size: 14px;line-height: 40px;margin-right: 15px;text-align: right;flex: 2;"> > </div>
            </div>
            <div v-else style="background-color: white;height: 40px;margin-top: 1px;display: flex;flex-direction: row;" @click="jt_select_address">
                <div  style="font-size: 13px;line-height: 40px;margin-left: 8px;" >送至： 请选择收货地址</div>

                <div style="font-size: 14px;line-height: 40px;margin-right: 15px;text-align: right;flex: 2;"> > </div>
            </div>


            <div style="background-color: white;height: 40px;margin-top: 1px;display: flex;flex-direction: row; "
                 id='introduction' v-on:click="toIntroduction">
                <div style="font-size: 13px;line-height: 40px;margin-left: 8px;">商品介绍</div>
                <div style="font-size: 14px;line-height: 40px;margin-right: 15px;text-align: right;flex: 2;"> > </div>
            </div>
            <div style="background-color: white;height: 40px;margin-top: 1px;display: flex;flex-direction: row;"
                 id='guarantee' v-on:click="toGuarantee">
                <div style="font-size: 13px;line-height: 40px;margin-left: 8px;">包装售后</div>
                <div style="font-size: 14px;line-height: 40px;margin-right: 15px;text-align: right;flex: 2;"> > </div>
            </div>


            <recommend :list="itemsData.recommendItemList" @goDetail="goDetail"></recommend>

        </div>
        <bottom :item="itemsData" style="position:fixed; bottom:0; left: 0;" @addCart="addCart" ref="bottombar"></bottom>
    </div>


</template>

<script>
    import Lib from 'assets/js/Lib';
    import recommend from './components/recommend.vue'
    import bottom from './components/bottom.vue'
    import info from './components/info.vue'
    import {Swiper, Alert,Toast} from 'vux'
    let productId ;
    let isScoreItem ;
    var page;
    export default {
        components: {Swiper, recommend, bottom, info, Alert,Toast},
        data(){
            return {
                itemsData: {},
                stock: 0,
                selectedAddress:{}
            }
        },
        computed: {
            bannerdata: function () {
                if (page.itemsData.productImages) {
                    let headbanner = page.itemsData.productImages.map(function (value, index) {
                        return {

                            img: value.large800
                        };
                    })
                    return headbanner;
                }

            }
        },
        methods: {
            jt_select_address:function () {
//                Lib.go.go("/views/address/selectaddress.html?isFrom=productDetail")
                page.$router.push({path:'/selectaddress'});
            },
            toIntroduction: function () {
                if ( page.itemsData.introduction==''||page.itemsData.introduction==null) {
                    page.$vux.toast.show({
                        type: 'text',
                        text: '暂无商品介绍'
                    })
                }else{
                  this.$router.push({
                     path: '/product/introduction',
                     query: {
                        introduction: page.itemsData.introduction
                    }
                })
            }
            },
            toGuarantee: function () {
                document.body.scrollTop = 0;
//                window.document.scrollTop(0);
                this.$router.push({path: '/product/guarantee'})
            },
            goDetail: function (item) {
                console.log("goDetail")
                loadData(item.sn,0)
//                this.$router.replace({path:"/product/detail/aa",query:{productId:item.sn,isScoreItem:0}})
//                Lib.go.go("/views/main/main.html#/product/detail?productId="+item.sn+"&isScoreItem="+0)

            },
            addCart: function () {
                Lib.axios.addtocart({
                    number: 1,
                    cartStatus: 1,
                    data: page.itemsData.erpGoodsId,
                }, this)
            }
        },
        created(){
            page = this;
            productId = page.$route.query.productId ;
            isScoreItem = page.$route.query.isScoreItem ;
        },
        mounted(){
            page.selectedAddress = Lib.localStorage.getCurrentAddress();
            loadData(productId, isScoreItem);
        },
    }
    function loadData(productId, isScoreItem) {

        Lib.axios.axios({

            url: '/products/' + productId + '?isScoreItem=' + isScoreItem,
            loading:{
                page:page,
            },
            success: function (basebean) {

                page.itemsData = basebean.getData();
                loadStock(page.itemsData.erpGoodsId);
                page.$refs.bottombar.loadFav(page.itemsData.erpGoodsId)
            },
            onerrcode: function (basebean) {

                page.$vux.alert.show({
                    title: '提示',
                    content: basebean.getMessage(),
                    onShow () {

                    },
                    onHide () {
                        page.$router.back(-1);
                    }
                })

            }
        });

    }
    function loadStock(erpGoodsId) {
        Lib.axios.axios({

            url: '/stocks/' + erpGoodsId + '?shopId=' + page.selectedAddress.shopId,

            success: function (basebean) {
                page.stock = basebean.getData().stockCount;
            }
        });
    }
</script>

<style scoped>

</style>