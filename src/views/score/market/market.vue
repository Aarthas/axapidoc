<template>
    <div id="app">
        <!--<div class="header">-->
        <!--<h1 class="title">Refresh & Infinite</h1>-->
        <!--</div>-->

        <scroller style="top: 0px"
                  ref="myScroller"
                  :on-infinite="infinite">
            <!--<ul>-->
            <!--<li v-for="(item, index) in items" class="row" :class="{'grey-bg': index % 2 == 0}">-->
            <!--{{ item }}-->


            <!--</li>-->
            <score_item v-for="item in list" :key="item.erpGoodsId" :item="item"></score_item>

            <!--</ul>-->
        </scroller>
    </div>
</template>

<script>
    import Lib from 'assets/js/Lib';
    import score_item from './component/score_item.vue'

    var page;
    let aaaaaa;

    export default {
        components: {
            "score_item": score_item,


        },
        data() {
            return {
                items: [],
                list: [],
                itemListData: null
            }
        },

        mounted() {
            page = this;
//            for (var i = 1; i <= 20; i++) {
//                page.items.push(i + ' a')
//            }
//            console.log(this.bottom )
//
//            this.top = 1
//            this.bottom = 20
//            console.log(this.bottom )
            page.loadData(0);


        },

        methods: {


            infinite (done) {
                console.log("bb")
                console.log(page)
                console.log(page.itemListData)


                console.log(page.itemListData)
                if (page.itemListData) {

                    console.log("b1")
                    if (page.itemListData.isLast) {
                        console.log("b2")
                        done(true)
                    } else {
                        console.log("b3")
                        console.log(page.itemListData.page + "  b4")
                        page.loadData(page.itemListData.page + 1);
                    }
                }
            },
            loadData(pageindex){

                Lib.M.ajax({
                    url: 'score/items?page=' + pageindex,


                    headers: {
                        "x-auth-token": "a5f0b242-5c63-4c31-b2e7-738e4a3daf1d",
                        "shopId": "aa",
                    },
                    success: function (basebean) {
                        page.itemListData = basebean.getData()


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

        }
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