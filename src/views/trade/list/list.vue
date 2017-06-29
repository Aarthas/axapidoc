<template>
    <div>
        <scroller style="top: 0px"
                  ref="myScroller"
                  :on-infinite="infinite">
        <ul style="display: inline-block;">
            <li v-for="item in list">
                <orderlist_cell @todetail="todetail" :item=item ></orderlist_cell>
            </li>

        </ul>
        <!--<div v-show="listEmpty" style="display: flex;justify-content: center;align-items: center;height: 400px;">-->
            <!--我的订单列表为空-->
        <!--</div>-->
        </scroller>
    </div>
</template>

<script>
    import Lib from 'assets/js/Lib';
    import orderlist_cell from './components/orderlist_cell.vue';
    var page;
    export default {
        components: {
            orderlist_cell
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
            todetail:function (orderId) {
                window.location="http://localhost:9090/views/trade/detail.html?orderId="+orderId;

            }


        }

    }
    var itemsData;
    function loadData(pageindex){



        Lib.axios.axios({
            url: 'orders?page=' + pageindex+"&&appOrderStatus=0",

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