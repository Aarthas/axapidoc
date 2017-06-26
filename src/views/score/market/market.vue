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

            <div style="height: 80px;">aaa</div>
            <div style="height: 80px;" v-on:click="aa">bb</div>
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



            axios.get("http://weixin.sanjiang.com/weichat-csr-web"+ '/weixin/jsconfig?url=' + window.location.href).
            then(function (resp) {
                console.log(resp)
                /* console.log(resp)*/
                var res = resp.data;
                /* console.log(res);*/
                if (!res.success) {
                    alert(res.errmsg);
                    return;
                }
                res.data.debug = false;
                res.data.jsApiList = ['chooseWXPay','chooseImage','uploadImage'];
                wx.config(res.data);
            }, function (resp) {
                console.log("resp")
            });

            wx.ready(function () {
                wx.hideOptionMenu();
                console.log("ready")

            });

            wx.error(function (res) {
//        console.log(res);
                console.log("error")
            });


            loadData(0);


        },

        methods: {
            aa(){
                console.log("aa")

                wx.chooseImage({
                    count: 1, // 默认9
                    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                    success: function (res) {
                        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                        alert(JSON.stringify(res))
                        alert(localIds[0])
                        wx.uploadImage({
                            localId: localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
                            isShowProgressTips: 1, // 默认为1，显示进度提示
                            success: function (res) {
                                var serverId = res.serverId; // 返回图片的服务器端ID
                                alert("serverId="+serverId)
                            }
                        });
                    }
                });
            },
            infinite (done) {

                if (itemsData) {

                    if (itemsData.isLast) {

                        done(true)
                    } else {

                        loadData(itemsData.page + 1);
                    }
                }
            },


        }
    }
    var itemsData;
   function loadData(pageindex){

        Lib.M.ajax({
            url: 'score/items?page=' + pageindex,
            headers: {
                "x-auth-token": "a5f0b242-5c63-4c31-b2e7-738e4a3daf1d",
                "shopId": "aa",
            },
            success: function (basebean) {

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