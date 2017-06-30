<template>
    <div  style="display: flex;flex-direction: row;">

        <div style="width: 25%;">
            <ul>
                <li v-for="item in list" style=" margin-top: 2px;background-color: #f4f4f4;">
                    <div @click="clickLeft(item.id)" style="text-align: center;color: #999999;height:44px;line-height: 44px;font-size: 14px;" >{{item.appCategoryName}}</div>

                </li>
            </ul>

        </div>
        <div style="width: 75%;background-color: white;">

            <ul>
                <li v-for="item in categoryModelList">

                    <collect :item="item"></collect>
                </li>

            </ul>

        </div>

    </div>
</template>

<script>
    import Lib from 'assets/js/Lib';
    import { Tabbar, TabbarItem, Group, Cell } from 'vux'
    import collect from './components/collection_cell.vue'
    var page;
    export default {
        components: {
            collect
        },
        data(){
            return {
                list:[],
                categoryModelList:[]
            }
        },

        mounted(){
            page = this;
            loadLeftData();
            let item = page.list[0];

             page.clickLeft(1);
         },
        methods: {
            clickLeft:function (leftId) {
                Lib.axios.axios({
                    url: 'categorys/'+leftId+'/childs',
                    success: function (basebean) {

                        page.categoryModelList = basebean.getData().categoryModelList;


                    }
                });
            }
        }
    }
    function loadLeftData(){



        Lib.axios.axios({
            url: '/categorys/findByGrade?grade=1',

            success: function (basebean) {

                page.list = basebean.getData();


            }
        });

    }
</script>