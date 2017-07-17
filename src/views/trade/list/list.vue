<template>
    <div>
        <!--<div style="height: ">aa</div>-->
        <scroller
                ref="myScroller"
                :on-infinite="infinite">
            <div style="display: inline-block;">
                <orderlist_cell v-for="item in list" @todetail="todetail" :item=item
                                :key="item.orderId"></orderlist_cell>
            </div>

        </scroller>
        <div v-show="listEmpty==true" style="display: flex;justify-content: center;align-items: center;height: 400px;">
        我的订单列表为空
        </div>
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
            todetail: function (orderId) {
                window.location = Lib.constant.baseurl + "/views/trade/detail.html?orderId=" + orderId;

            }


        }

    }
    var itemsData;
    function loadData(pageindex) {


        Lib.axios.axios({
            url: 'orders?page=' + pageindex + "&&appOrderStatus=0",
            loading:{
                page:page,
            },
            success: function (basebean) {


                itemsData = basebean.getData();

                if (itemsData.list ==null || itemsData.list.length==0) {
                    page.listEmpty = true;
                    page.$refs.myScroller.finishInfinite(true);
                } else {
                    page.listEmpty = false;
                    if (basebean.getData().isFirst) {
                        page.list = basebean.getData().list;
                    } else {
                        page.list = page.list.concat(basebean.getData().list);
                    }
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