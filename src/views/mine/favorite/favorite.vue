<template>
    <div>


        <scroller style="top: 0px"
                  ref="myScroller"
                  :on-infinite="infinite">
        <ul style="display: inline-block">
            <li v-for="item in list">
                <swipeout style="box-sizing: border-box" >
                    <swipeout-item transition-mode="follow" >
                        <div slot="right-menu">
                            <swipeout-button @click.native="onCancelFav(item)" type="primary">删除</swipeout-button>
                        </div>
                        <div slot="content" style="box-sizing: border-box">
                            <favorite_cell :item=item @goDetail="goDetail"></favorite_cell>
                        </div>
                    </swipeout-item>
                </swipeout>

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
    import { Swipeout, SwipeoutItem, SwipeoutButton } from 'vux';
    var page;
    export default {
        components: {
            Swipeout, SwipeoutItem, SwipeoutButton,
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

                Lib.go.go("/views/main/main.html#/product/detail?productId="+item.sn+"&isScoreItem="+isScoreItem)
            },
            onCancelFav:function (item) {
                console.log(item)
                Lib.axios.axios({
                    method:'post',
                    url: '/collections/addItem',
                    loading:{
                        page:page
                    },
                    data:{
                        id:item.erpGoodsId
                    },
                    success: function (basebean) {

                    }
                    ,
                    onerrcode:function (basebean) {
                        if (basebean.getCode() == 2)
                        {
                            console.log(itemsData)
                            loadData(itemsData.page);
                        }
                    }
                });
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

                if (itemsData== null)
                {
                    page.list=[];
                    page.listEmpty = true;
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