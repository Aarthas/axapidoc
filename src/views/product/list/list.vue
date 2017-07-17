<template>

    <div style="display: flex;flex-direction: column">
        <YSearch placeholder="搜索三江购物商品"></YSearch>
        <scroller style=""
                  ref="myScroller"
                  :on-infinite="infinite">
            <div style="height: 44px;"></div>
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
    import YSearch from '../../../components/search.vue' ;
    import {Search} from 'vux';
    let categoryId = Lib.Utils.getQueryString("categoryId");
    let keyword = Lib.Utils.getQueryString("keyword");
    var page;
    export default {
        components: {

            favorite_cell,
            YSearch,
        },
        data () {
            return {

                listEmpty: false,
                list: [],
                pageIndex: 1,


            }
        },

        mounted(){

            page = this;

            if (keyword == null) {
                loadData(categoryId, page.pageIndex);
            } else {
                loadData(keyword, page.pageIndex);
            }

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
                        if (keyword == null) {
                            loadData(categoryId, itemsData.page + 1);
                        } else {
                            loadData(keyword, itemsData.page + 1);
                        }

                    }
                }
            },

            goDetail:function (item) {
                Lib.go.go("/views/product/detail.html?productId="+item.sn+"&isScoreItem=0")
            }
        }
    }
    var itemsData;
    function loadData(param, pageIndex) {
        var urlString;

        if (keyword == null) {
            urlString = '/search?categoryId=' + param + "&page=" + pageIndex
        } else {
            urlString = '/search?keyword=' + param + "&page=" + pageIndex
        }
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