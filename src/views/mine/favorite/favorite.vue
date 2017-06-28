<template>
    <div>

        <search style="position:fixed; top:0; left: 0;" placeholder="搜索三江购物商品"></search>
        <scroller style="top: 0px"
                  ref="myScroller"
                  :on-infinite="infinite">
        <ul style="display: inline-block; margin-top: 40px;" >
            <li v-for="item in list">
                <favorite_cell :item=item></favorite_cell>
            </li>

        </ul>
        <!--<div v-show="listEmpty" style="display: flex;justify-content: center;align-items: center;height: 400px;">-->
            <!--我的收藏为空-->
        <!--</div>-->
        </scroller>
    </div>
</template>

<script>
    import Lib from 'assets/js/Lib';
    import favorite_cell from './components/favorite_cell.vue' ;
    import { Search } from 'vux';
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


            }
        },

        mounted(){

            page = this;


            loadData(1);
        },
        methods: {

            infinite (done) {

                if (itemsData) {

                    if (itemsData.isLast) {

                        done(true)
                    } else {

                        loadData(itemsData.page + 1);
                    }
                }
            },


        }

    }
    var itemsData;
    function loadData(pageindex){



        Lib.axios.axios({
            url: 'collections?page=' + pageindex,

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