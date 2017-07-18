<template>
    <div>


        <scroller style="top: 0px"
                  ref="myScroller"
                  :on-infinite="infinite">
        <ul >
            <li v-for="item in list">
                <favorite_cell :item=item @goDetail="goDetail"></favorite_cell>
            </li>

        </ul>
        <div v-show="listEmpty" style="display: flex;justify-content: center;align-items: center;height: 400px;">
            我的收藏为空
        </div>
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

                listEmpty: false,
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
            goDetail:function (item) {

                var isScoreItem;
                if (item.score>0){
                    isScoreItem=1
                }else{
                    isScoreItem=0
                }
                Lib.go.go("/views/product/detail.html?productId="+item.sn+"&isScoreItem="+isScoreItem)
            }

        }

    }
    var itemsData;
    function loadData(pageindex){



        Lib.axios.axios({
            url: 'collections?page=' + pageindex,

            success: function (basebean) {
                let listEmpty = basebean.isListEmpty();
                if(listEmpty ){
                    page.$refs.myScroller.finishInfinite(true);
                }
                page.listEmpty = listEmpty;

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