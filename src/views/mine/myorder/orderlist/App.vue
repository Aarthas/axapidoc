<template>
    <div>

        <ul style="display: inline-block;" v-show="!listEmpty">
            <li v-for="item in list">
                <orderlist_cell :item=item></orderlist_cell>
            </li>

        </ul>
        <div v-show="listEmpty" style="display: flex;justify-content: center;align-items: center;height: 400px;">
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
        created(){
            page = this;

        },
        mounted(){
            Lib.M.axios({
                url: '/orders',
                params:{
                    appOrderStatus : 0,
                    page : 1
                },
                success: function (basebean) {

                    let list = basebean.getData().list;
                    let listEmpty = basebean.isListEmpty();
                    page.listEmpty = listEmpty;
                    page.list = list;

                }
            });

        },

    }
</script>

<style scoped>

</style>