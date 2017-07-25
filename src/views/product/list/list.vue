<template>

    <div >

        <search style="position:fixed; top:0; left: 0;"  placeholder="搜索三江购物商品" v-model="mkeyword"></search>
        <tab style="position:fixed; top:44px; left: 0;width: 100%;z-index: 99;">
            <tab-item selected @on-item-click="onItemClick(0)">综合排序</tab-item>

            <tab-item  v-if="saleBig" @on-item-click="onItemClick(1)" >销量 ↓</tab-item>
            <tab-item v-else @on-item-click="onItemClick(1)"  >销量 ↑</tab-item>

            <tab-item v-if="priceBig" @on-item-click="onItemClick(2)"  >价格 ↓</tab-item>
            <tab-item v-else @on-item-click="onItemClick(2)"  >价格 ↑</tab-item>
        </tab>

        <scroller
                  ref="myScroller"
                  :on-infinite="infinite">
            <div style="height: 90px;"></div>
            <favorite_cell v-for="item in list" :item=item :key="item.erpGoodsId" @goDetail="goDetail" ></favorite_cell>
        </scroller>
        <div v-show="listEmpty==true" style="display: flex;justify-content: center;align-items: center;height: 400px;">
            商品列表为空
        </div>
    </div>
</template>

<script>


    import Lib from 'assets/js/Lib';
    import favorite_cell from '../../mine/favorite/components/favorite_cell.vue' ;
    import search from '../../../components/search.vue' ;
    import {Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem, Radio} from 'vux';
    let categoryId = Lib.Utils.getQueryString("categoryId");
    let keyword = Lib.Utils.getQueryString("keyword");
    if (keyword!= null)
    {
        keyword = decodeURIComponent(keyword);
    }else {
        keyword = null;
    }

    console.log(keyword)
    var page;
    export default {
        components: {
            Tab,
            TabItem,
            favorite_cell,
            search,
        },
        data () {
            return {

                listEmpty: false,
                list: [],
                pageIndex: 1,
                selectedIndex:0,
                priceBig:false,
                saleBig:false,
                mkeyword:'',
            }
        },
       created(){
           page = this;
           Lib.Hub.$on('keyword', (keyword) => { //Hub接收事件
               console.log("search2 keyword")
               Lib.go.replace("/views/product/list.html?&keyword=" + keyword)

           });
           page.mkeyword = keyword;
       },
        mounted(){



            page.onItemClick(0);

        },
        methods: {

            infinite (done) {

                console.log("infinite")
                console.log(itemsData)
                if (itemsData) {

                    if (itemsData.isLast) {
                        console.log("done")
                        done(true)
                    } else {
                        var urlString;
                        var newPage = itemsData.page + 1;
                        if (page.selectedIndex==0){
                            if (keyword == null) {
                                urlString = '/search?categoryId=' + categoryId + "&page=" + newPage
                            } else {
                                urlString = '/search?keyword=' + keyword + "&page=" + newPage
                            }
                        }else if(page.selectedIndex==1){
                            var saleBig=page.saleBig ? "salesUp":"sales";
                            if (keyword == null) {
                                urlString = '/search?categoryId=' + categoryId +"&sortType="+saleBig+"&page=" +   newPage
                            } else {
                                urlString = '/search?keyword=' + keyword +"&sortType="+saleBig+"&page=" +  newPage
                            }
                        }else {
                            var priceBig=page.priceBig ? "priceUp":"price";

                            if (keyword == null) {
                                urlString = '/search?categoryId=' + categoryId +"&sortType="+priceBig+"&page=" + newPage
                            } else {
                                urlString = '/search?keyword=' + keyword + "&sortType="+priceBig+"&page=" + newPage
                            }
                        }
                        loadData(urlString);
//                        if (keyword == null) {
//
//                            loadData(categoryId, itemsData.page + 1);
//                        } else {
//                            loadData(keyword, itemsData.page + 1);
//                        }

                    }
                }
            },
            onItemClick: function (index) {
                console.log("点击了"+index);
                page.selectedIndex=index;
               var urlString;
                if (index == 0){

                    if (keyword == null) {
                        urlString = '/search?categoryId=' + categoryId + "&page=" +  page.pageIndex
                    } else {
                        urlString = '/search?keyword=' + keyword + "&page=" + page.pageIndex
                    }
                }else if (index == 1){
                    var saleBig=page.saleBig ? "salesUp":"sales";
                    if (keyword == null) {
                        urlString = '/search?categoryId=' + categoryId +"&sortType="+saleBig+"&page=" +   page.pageIndex
                    } else {
                        urlString = '/search?keyword=' + keyword +"&sortType="+saleBig+"&page=" + page.pageIndex
                    }
                    page.saleBig=!page.saleBig;
                }else{
                    var priceBig=page.priceBig ? "priceUp":"price";

                    if (keyword == null) {

                        urlString = '/search?categoryId=' + categoryId +"&sortType="+priceBig+"&page=" +  page.pageIndex
                    } else {
                        urlString = '/search?keyword=' + keyword + "&sortType="+priceBig+"&page=" + page.pageIndex
                    }
                    page.priceBig=!page.priceBig;
                }
                loadData(urlString);
            },
            goDetail:function (item) {
                Lib.go.go("/views/product/detail.html?productId="+item.sn+"&isScoreItem=0")
            }
        }
    }
    var itemsData;
    function loadData(urlString) {
        Lib.axios.axios({

            url: urlString,
            loading:{
              page:page
            },
            success: function (basebean) {

                itemsData = basebean.getData();

                if (itemsData==null||itemsData.list ==null || itemsData.list.length==0) {
                    page.listEmpty = true;
                    page.$refs.myScroller.finishInfinite(true);
                }

                if (basebean.getData().isFirst) {
                    page.list = basebean.getData().list;
                } else {
                    page.list = page.list.concat(basebean.getData().list);
                }
                if (basebean.getData().isLast) {
                    page.$refs.myScroller.finishInfinite(true);
                } else {
                    page.$refs.myScroller.finishInfinite();
                }
            }
        });

    }
</script>

<style scoped>

</style>