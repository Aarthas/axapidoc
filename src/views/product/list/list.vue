<template>

    <div>
        <search style="position:fixed; top:0; left: 0;" placeholder="搜索三江购物商品"></search>
        <scroller style="top: 40px"
                  ref="myScroller"
                  :on-infinite="infinite">
            <ul >
                <li v-for="item in list">
                    <favorite_cell :item=item></favorite_cell>
                </li>

            </ul>
            <!--<div v-show="listEmpty" style="display: flex;justify-content: center;align-items: center;height: 400px;">-->
            <!--商品列表为空-->
            <!--</div>-->
        </scroller>
    </div>
</template>

<script>
    import Lib from 'assets/js/Lib';
    import favorite_cell from '../../mine/favorite/components/favorite_cell.vue' ;
    import { Search } from 'vux';
    let categoryId = Lib.Utils.getQueryString("categoryId");
    let keyword = Lib.Utils.getQueryString("keyword");
    var page;
    export default {
        components: {
            Search,
            favorite_cell

        },
        data () {
            return {

//                listEmpty: false,
                list: [],
                pageIndex:1,


            }
        },

        mounted(){

            page = this;

            if(keyword=="无"){
                loadData(categoryId,1);
            }else {
                loadData(keyword,1);
            }

        },
        methods: {

            infinite (done) {

                if (itemsData) {

                    if (itemsData.isLast) {

                        done(true)
                    } else {
                        if(keyword=="无"){
                            loadData(categoryId, itemsData.page + 1);
                        }else {
                            loadData(keyword,itemsData.page + 1);
                        }

                    }
                }
            },


        }
    }
    var itemsData;
    function loadData(param,pageIndex){
        var urlString;

        if(keyword=="无"){
            urlString= '/search?categoryId=' + param + "&&page=" + pageIndex
        }else {
            urlString= '/search?keyword=' + param + "&&page=" + pageIndex
        }
        Lib.axios.axios({

            url: urlString,

            success: function (basebean) {
//                let listEmpty = basebean.isListEmpty();
//                page.listEmpty = listEmpty;
                itemsData= basebean.getData();

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