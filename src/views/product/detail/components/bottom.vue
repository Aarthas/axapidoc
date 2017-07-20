<template>
    <div style="height: 50px;display: flex;flex-direction: row;background-color:white">
        <!--左 收藏-->
        <div style="display: flex;flex-direction: column;width: 25vw;text-align: center;" @click="clickItem">
            <img style="width: 22px;height: 22px;margin-left: 10vw;margin-top: 4px;"
                 :src="favimg"/>
            <div style="color: #333333;font-size: 13px;margin-top: 4px;">收藏</div>
        </div>
        <div style="display: flex;flex-direction: column;width:25vw; text-align: center;" @click="jt_cart">
            <img style="width: 24px;height: 24px;margin-left: 9vw;margin-top: 4px;"
                 src="http://onpxz5rdd.bkt.clouddn.com/tab4.png"/>
            <div style="color: #333333;font-size: 13px;margin-top: 4px;">购物车</div>
        </div>
        <div style="width: 50vw;margin-right: 0px;background-color: #04BE02;line-height: 50px;font-size: 17px;color: white;text-align: center;"
             @click="action_addToCart">加入购物车

        </div>
    </div>
</template>

<script>
    import Lib from 'assets/js/Lib';
    var page;
    export default {
        components: {},
        data(){
            return {
                favimg: "",

            }
        },
        props: {
            item: Object,

        },
        created: function () {
            page = this;
            page.setFavIcon(false);
        },
        mounted: function () {

        },
        methods: {
            jt_cart:function () {
                window.location.href = Lib.constant.baseurl+"/views/home/home.html#/cart";
            },

            setFavIcon: function (isFav) {
                if (isFav) {
                    page.favimg = 'http://onpxz5rdd.bkt.clouddn.com/ic_fav_yes.png';
                } else {
                    page.favimg = 'http://onpxz5rdd.bkt.clouddn.com/ic_fav_no.png';
                }
            },
            loadFav: function (erpGoodsId) {
                Lib.axios.axios({
                    method: 'get',
                    url: '/collections/' + erpGoodsId + '/isCollected',
                    success: function (basebean) {
                        page.setFavIcon(basebean.getData().isSelected);
                    }
                    , onerrcode: function (basebean) {
                        page.setFavIcon(false);
                    },
                    forunlogin:function () {

                    }
                });
            },
            action_addToCart: function () {
                this.$emit("addCart")
            },
            clickItem: function () {
                let params = {
                    id: page.item.erpGoodsId,
                };
                console.log(params)
                Lib.axios.axios({
                    loading: {
                        loadtext: '请稍等',
                        page: page
                    },
                    method: 'post',
                    data: params,
                    url: '/collections/addItem',
                    success: function (basebean) {
                        page.setFavIcon(true);
                        Lib.vux.showtoast(page, basebean.getMessage());
                    }
                    , onerrcode: function (basebean) {
                        page.setFavIcon(false);
                        Lib.vux.showtoast(page, basebean.getMessage());
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>