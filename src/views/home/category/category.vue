<template>
    <div>
        <search style="position:fixed; top:0; left: 0;" placeholder="搜索三江购物商品"></search>
        <div style="display: flex;flex-direction: row;;">
           <scroller width="25%"  style="left: 0;top:50px;bottom:49px;" >
              <div >
                <ul>
                    <li v-for="(item,$index) in list" @click="selectStyle (item, $index);clickLeft(item.id) "
                        :class="{'active':item.active,'unactive':!item.active}">{{item.appCategoryName}}
                    </li>
                </ul>
              </div>
            </scroller>

            <scroller  width="75%" style="left: 25%;  background-color: white;margin-top: 50px;bottom:49px;" >
            <div>
                <ul >
                    <li v-for="item in categoryModelList">
                        <collect :item="item"></collect>
                    </li>
                </ul>

            </div>
            </scroller>
        </div>
    </div>
</template>

<script>
    import Lib from 'assets/js/Lib';
    import search from '../../../components/search.vue' ;
    import collect from './components/collection_cell.vue';

    var page;
    export default {
        components: {
            collect,
            search,

        },
        data(){
            return {
                active: false,
                list: [],
                categoryModelList: [],

            }
        },
        created() {
            Lib.Hub.$on('change', (categoryId) => { //Hub接收事件
                console.log("search2 change")
                Lib.go.go("/views/product/list.html?categoryId=" + categoryId);
            });

            Lib.Hub.$on('keyword', (keyword) => { //Hub接收事件
                console.log("search2 keyword")
                Lib.go.go("/views/product/list.html?&keyword=" + keyword)

            });
        },

        mounted(){
            page = this;
            loadLeftData();
        },
        methods: {
            clickLeft: function (itemId) {

                Lib.axios.axios({
                    url: 'categorys/' + itemId + '/childs',
                    loading:{
                        page:page,
                    },
                    success: function (basebean) {
                        page.categoryModelList = basebean.getData().categoryModelList;
                    }
                });
            },
            selectStyle (item, index) {

                page.list.forEach(function (item, index) {
                    item.active = false;
                });
                item.active = true

            },




        }
    }
    function loadLeftData() {


        Lib.axios.axios({
            url: '/categorys/findByGrade?grade=1',
            success: function (basebean) {

                page.list = basebean.getData();
                let item = basebean.getData()[0];
                page.clickLeft(item.id);
                page.selectStyle(item, 1);

            }
        });

    }
</script>
<style scoped>
    .active {
        text-align: center;
        color: #f03838;
        height: 44px;
        line-height: 44px;
        font-size: 14px;
        background-color: #ffffff;
        margin-top: 2px;
    }

    .unactive {
        text-align: center;
        color: #999999;
        height: 44px;
        line-height: 44px;
        font-size: 14px;
        margin-top: 2px;
        background-color: #f6f6f6;
    }


</style>