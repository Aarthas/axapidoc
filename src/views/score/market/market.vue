<template>
    <div id="app">
        <!--<div class="header">-->
        <!--<h1 class="title">Refresh & Infinite</h1>-->
        <!--</div>-->

        <scroller style="top: 0px"

                  :on-infinite="infinite">
            <ul>
                <li v-for="(item, index) in items" class="row" :class="{'grey-bg': index % 2 == 0}">
                    {{ item }}


                </li>
            </ul>
        </scroller>
    </div>
</template>
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
<script>
    import Lib from 'assets/js/Lib';

    var page;
    export default {
        data() {
            return {
                items: []
            }
        },

        mounted() {
            page = this;
            for (var i = 1; i <= 20; i++) {
                page.items.push(i + ' a')
            }

            this.top = 1
            this.bottom = 20
        },

        methods: {


            infinite (done) {
                function aa() {

                    if (page.bottom > 30) {
                        done(true)
                    } else {
                        var start = page.bottom + 1
                        for (var i = start; i < start + 10; i++) {
                            page.items.push(i + ' - c')
                        }
                        page.bottom = page.bottom + 10
                        console.log(done)
                        console.log(page.items)
                        done()
                    }

                }

                setTimeout(aa, 1500)

            }
        }
    }
</script>
