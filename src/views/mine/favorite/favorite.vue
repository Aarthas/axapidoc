<template>
    <div>

        <search style="position:fixed; top:0; left: 0;" placeholder="搜索三江购物商品"></search>

        <ul style="display: inline-block; margin-top: 40px;" v-show="!listEmpty">
            <li v-for="item in list">
                <favorite_cell :item=item></favorite_cell>
            </li>

        </ul>
        <div v-show="listEmpty" style="display: flex;justify-content: center;align-items: center;height: 400px;">
            我的收藏为空
        </div>
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
        created(){
            page = this;

        },
        mounted(){
            Lib.axios.axios({
                url: '/collections',
                params:{
                 "page":"1"

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