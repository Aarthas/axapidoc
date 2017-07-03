<template>
    <div>
    <search style="position:fixed; top:0; left: 0;" placeholder="搜索三江购物商品"></search>
    <div  style="display: flex;flex-direction: row;">

        <div style="width: 25%;position:fixed; top:0; left: 0;margin-top: 48px;">
            <ul>
                <!--<li v-for="item in list" style=" margin-top: 2px;background-color: #f4f4f4;"  >-->
                    <!--<div  @click="clickLeft(item.id)" style="text-align: center;color: #999999;height:44px;line-height: 44px;font-size: 14px;">{{item.appCategoryName}}</div>-->
                <!--</li>-->
                <li v-for="(item,$index) in list" @click="selectStyle (item, $index);clickLeft(item.id) " :class="{'active':item.active,'unactive':!item.active}" >{{item.appCategoryName}}</li>
            </ul>

        </div>
        <div style="width: 75%;background-color: white;margin-left: 25%;margin-top: 50px;margin-bottom: 49px;">

            <ul>
                <li v-for="item in categoryModelList">
                    <collect :item="item"></collect>
                </li>
            </ul>

        </div>

    </div>
    </div>
</template>

<script>
    import Lib from 'assets/js/Lib';
    import { Tabbar, TabbarItem, Group, Cell,Search } from 'vux';
    import collect from './components/collection_cell.vue';
    import Vue from 'vue';
    var page;
    export default {
        components: {
            collect,
            Search
        },
        data(){
            return {
                active: false,
                list:[],
                categoryModelList:[],

            }
        },

        mounted(){
            page = this;
            loadLeftData();
         },
        methods: {
            clickLeft:function (itemId) {

                Lib.axios.axios({
                    url: 'categorys/'+itemId+'/childs',
                    success: function (basebean) {

                        page.categoryModelList = basebean.getData().categoryModelList;


                    }
                });
            },
            selectStyle (item, index) {
                page.$nextTick(function () {
                    page.list.forEach(function (item) {
                        Vue.set(item,'active',false);
                    });
                    Vue.set(item,'active',true);
                });
            }



        }
    }
    function loadLeftData(){



        Lib.axios.axios({
            url: '/categorys/findByGrade?grade=1',

            success: function (basebean) {

                page.list = basebean.getData();
                let item=basebean.getData()[0];
                page.clickLeft(item.id);
                page.selectStyle (item,1);

            }
        });

    }
</script>
<style scoped>
    .active{
        text-align: center;
        color: #f03838;
        height:44px;
        line-height: 44px;
        font-size: 14px;
        background-color:#ffffff ;
        margin-top: 2px;
    }
    .unactive{
        text-align: center;
        color: #999999;
        height:44px;
        line-height: 44px;
        font-size: 14px;
        margin-top: 2px;
        background-color:#f6f6f6 ;
    }


</style>