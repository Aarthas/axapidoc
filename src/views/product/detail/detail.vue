<template>
    <div>
    <div style="display: flex;flex-direction: column;margin-bottom: 60px;">
        <swiper :list="bannerdata" :show-desc-mask="false"  style="width:100%;overflow: hidden;margin-top: 0px;height: auto;"
                dots-class="custom-bottom"
                dots-position="center" :aspect-ratio="210/375"></swiper>
        <info :item="itemsData"></info>
        <div style="background-color: white;height: 40px;margin-top: 10px;">
            <div style="font-size: 13px;line-height: 40px;margin-left: 8px;">服务： 商品10kg以内满88元，20kg以内满176元 包邮</div>
        </div>
        <div style="background-color: white;height: 40px;margin-top: 1px;display: flex;flex-direction: row;">
            <div style="font-size: 13px;line-height: 40px;margin-left: 8px;">送至： xxxx</div>
            <div style="font-size: 13px;line-height: 40px;margin-left: 8px;color: #f03838">库存：{{stock}}件</div>
            <div style="font-size: 14px;line-height: 40px;margin-right: 15px;text-align: right;flex: 2;"> > </div>
        </div>
        <recommend :list="itemsData.recommendItemList" ></recommend>
        <div style="height: 40px;display: flex;flex-direction: row;background-color: white;margin-top: 10px;">
            <div style="line-height: 40px;width: 50%;text-align: center">商品介绍</div>
            <div style="line-height: 40px;width: 50%;text-align: center">包装售后</div>
        </div>
    </div>
    <bottom style="position:fixed; bottom:0; left: 0;"></bottom>
    </div>


</template>

<script>
    import Lib from 'assets/js/Lib';
    import recommend from './components/recommend.vue'
    import bottom from './components/bottom.vue'
    import info from './components/info.vue'
    import {Swiper} from 'vux'
    let productId = Lib.Utils.getQueryString("productId");
    let isScoreItem = Lib.Utils.getQueryString("isScoreItem");
    var page;
    export default {
        components: {Swiper,recommend,bottom,info},
       data(){
            return{
                itemsData:{},
                stock:0

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
        created(){
            page = this;
        },
        mounted(){

            loadData(212536,0);
        },
    }
    function loadData(productId,isScoreItem){

        Lib.axios.axios({

            url: '/products/'+productId+'?isScoreItem='+isScoreItem,

            success: function (basebean) {

                page.itemsData= basebean.getData();
                loadStock(page.itemsData.erpGoodsId);

            }
        });

    }
    function loadStock(erpGoodsId){
        Lib.axios.axios({

            url: '/stocks/'+erpGoodsId+'?shopId='+'00023',

            success: function (basebean) {
                page.stock= basebean.getData().stockCount;
            }
        });
    }
</script>

<style scoped>

</style>