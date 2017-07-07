<template>
    <div id="app">
        <!--<div class="header">-->
        <!--<h1 class="title">Refresh & Infinite</h1>-->
        <!--</div>-->

        <div style="height: 50px;">aaa</div>

        <scroller style="top: 50px;height: 617px;"
                  ref="myScroller"
                  noDataText="asdsd"
                  :on-infinite="infinite">
            <!--<ul>-->
            <!--<li v-for="(item, index) in items" class="row" :class="{'grey-bg': index % 2 == 0}">-->
            <!--{{ item }}-->

            <!--<div style="height: 80px;">aaa</div>-->
            <!--<div style="height: 80px;" v-on:click="aa">bb</div>-->
            <!--</li>-->
            <score_item v-for="item in list" :key="item.erpGoodsId" :item="item"></score_item>

            <!--</ul>-->
        </scroller>
    </div>
</template>

<script>
    import Lib from 'assets/js/Lib';
    import score_item from './component/score_item.vue'
    import axios from 'axios';
    var page;


    export default {
        components: {
            "score_item": score_item,


        },
        data() {
            return {

                list: [],

            }
        },

        mounted() {
            page = this;


            loadData(1);


        },

        methods: {
            aa(){

            },
            infinite (done) {
                console.log("itemsData.isLast"+itemsData)
                if (itemsData) {

                    if (itemsData.isLast) {

                        console.log("itemsData.isLast")
//                        done(true)
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
            url: 'search?categoryId=157&page=' + pageindex,

            success: function (basebean) {

                itemsData= basebean.getData();

                if (basebean.getData().isFirst) {
                    page.list = basebean.getData().list;
                } else {
                    page.list = page.list.concat(basebean.getData().list);
                }
                if (basebean.getData().isLast) {
                    page.$refs.myScroller.finishInfinite();
                } else {
                    page.$refs.myScroller.finishInfinite();
                }
            }
        });

    }

</script>
<style>
    html, body {
        margin: 0;
    }

    * {
        box-sizing: border-box;
    }

    .row {
        width: 100%;
        height: 50px;
        padding: 10px 0;
        font-size: 16px;
        line-height: 30px;
        text-align: center;
        color: #444;
        background-color: #fff;
    }

    .grey-bg {
        background-color: #eee;
    }

    .header {
        position: fixed;
        top: 0;
        left: 0;
        height: 44px;
        width: 100%;
        box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
        background-color: #fff;
        z-index: 1000;
        color: #666;
    }

    .header > .title {
        font-size: 16px;
        line-height: 44px;
        text-align: center;
        margin: 0 auto;
    }
</style>