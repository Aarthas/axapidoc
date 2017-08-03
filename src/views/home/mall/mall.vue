<template>
    <div style="display: flex;flex-direction: column;margin-bottom: 55px;">

        <search></search>
        <div class="vux-demo" style="margin-top: 44px;position:relative;display: block;justify-content: center">

            <swiper :list="bannerdata" :show-desc-mask="false" auto
                    style="width:100%;overflow: hidden;margin-top: 0px; z-index:1; "
                    dots-class="custom-bottom"
                    dots-position="center" :aspect-ratio="210/375"></swiper>

            <div style="position:absolute;
            display: inline-block;  z-index:10;  top: 14px;display: flex;flex-direction: row;justify-content: center;width: 100%">
                 <span style="
                    padding: 2px 18px;
                    height: 24px;
                    line-height: 24px;
                    border-radius: 12px;
                    color: white;
                    font-size: 13px;
                    background: rgba(0, 0, 0, 0.2);" @click="jt_select_address"> {{address_detail}}
            </span>
            </div>


        </div>

        <hoticon :list="hoticondata"></hoticon>


        <div v-for="floor in malldata.floors">
            <div style="height:8px;"></div>
            <qiangxian v-if="floor.vt ==1" :list="floor.data"></qiangxian>

            <fourwhite v-else-if="floor.vt ==2||floor.vt ==3" :list="floor.data" :title="floor.title"
                       :flag="floor.flag"></fourwhite>
            <horizon_scroll v-else-if="floor.vt ==4 " :list="floor.data" :title="floor.title" :flag="floor.flag"
                            @goToDetail="goToDetail"></horizon_scroll>
            <oneimage v-if="floor.vt ==6"></oneimage>
        </div>
        <div style="height:3px;"></div>

        <div v-if="hotlist.length>0">
            <div style="height: 30px;margin-top: 15px;text-align: center;">--热门推荐--</div>
            <ul style="overflow:hidden;width:100%;">
                <li style="float:left;width: 50%;white-space:nowrap;" v-for="item in hotlist">
                    <recommend_cell :item="item" @goDetail="goDetail"></recommend_cell>
                </li>

            </ul>
            <div style="height: 40px;margin-top: 15px;text-align: center;">--end--</div>
        </div>
    </div>
</template>

<script>

    import {Swiper} from 'vux'
    import Lib from 'assets/js/Lib';
    import search from '../../../components/search.vue' ;
    import hoticon from './components/hoticon.vue' ;
    import recommend_cell from './components/recommend_cell.vue' ;
    import qiangxian from './components/floors/qiangxian.vue' ;
    import fourwhite from './components/floors/fourwhite.vue' ;
    import oneimage from './components/floors/oneimage.vue' ;
    import horizon_scroll from './components/floors/horizon-scroll.vue' ;
    var page;
    export default {
        components: {
            Swiper,

            search,
            hoticon,
            qiangxian,
            horizon_scroll,
            fourwhite,
            oneimage,
            recommend_cell
        },
        data () {
            return {
                malldata: {},

                address_detail: "请选择收货地址",
                hotlist: [], //最下方推荐商品数据,

            };
        },
        computed: {

            bannerdata: function () {
                let shopid = '00023';
                let currentAddress = Lib.localStorage.getCurrentAddress();
                if (currentAddress) {
                    shopid = currentAddress.shopId;
                }
                if (page.malldata.head) {
                    let headbanner = page.malldata.head.map(function (value, index) {
                        return {
                            url: value.aim.replace("env=2", "env=3") + "&shopId=" + shopid,
                            img: value.img
                        };
                    })
                    return headbanner;
                }
            },
            hoticondata: function () {
                if (page.malldata.menu) {
                    let array = page.malldata.menu.map(function (value, index) {
                        if (value.jt == 191) {
                            return {
                                url: value.aim,
                                img: value.img,
                                title: value.title
                            };
                        } else if (value.jt == 91) {
                            let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf698f56d095a5d43&redirect_uri=http%3A%2F%2Fweixin.sanjiang.com%2Fmembercard%2F%23%2Findex&response_type=code&scope=snsapi_base&state=sunlight#wechat_redirect'
                            return {
                                url: url,
                                img: value.img,
                                title: value.title
                            };
                        } else if (value.jt == 41) {
                            return {
//                                url: Lib.constant.baseurl + "/views/trade/list.html",
                                url: Lib.constant.baseurl + "/views/main/main.html#/listtrade",
                                img: value.img,
                                title: value.title
                            };
                        }
                        else if (value.jt == 71) {
                            return {
                                url: Lib.constant.baseurl + "/views/mine/favorite.html",
                                img: value.img,
                                title: value.title
                            };
                        }

                    })
                    return array;
                }


            },
//            address_detail2: function () {
//                let selectedAddress = Lib.localStorage.getCurrentAddress();
//                if (selectedAddress) {
//
//                    if (selectedAddress.isDeliver) {
//                        return selectedAddress.areaDesc;
//                    } else {
//                        return selectedAddress.shopName;
//                    }
//                } else {
//                    return "请选择收货地址"
//                }
//            }

        },
        created () {
            page = this;


            console.log("aaa created");
            //Hub接收 搜索 事件
            Lib.Hub.$on('keyword', (keyword) => {
                console.log("search keyword")
//                Lib.go.go("/views/product/list.html?&keyword=" + keyword)
                this.$router.push({ path: 'listproduct',query:{keyword:keyword} })

            });
            Lib.Hub.$on('justlogin', () => {
                console.log("justlogin")
                loadAddress();
//                Lib.go.go("/views/product/list.html?&keyword=" + keyword)

            });
            //Hub接收 跳转活动页 事件
            Lib.Hub.$on('jt', (href) => {

                let shopid = '00023';
                let currentAddress = Lib.localStorage.getCurrentAddress();
                if (currentAddress) {
                    shopid = currentAddress.shopId;
                }


                if (href.indexOf("env=2") > 0) {
                    let url = href.replace("env=2", "env=3");


                    window.location.href = url + "&shopId=" + shopid;


                } else {
                    window.location.href = href;
                }


            });

        },
        mounted(){
            console.log("aa  mounted")
            loadIndexData();
            loadAddress();

        },
        methods: {
            loadRecommend: function () {
                Lib.axios.axios({
                    url: '/home/hotMarket',
                    loading: {
                        page: page,
                    },
                    success: function (basebean) {
                        page.hotlist = basebean.getData().list;
                    }
                });
            },
            goDetail: function (item) {

                Lib.go.go("/views/main/main.html#/product/detail?productId=" + item.sn + "&isScoreItem=0")

            },
            goToDetail: function (item) {
                Lib.go.go("/views/main/main.html#/product/detail?productId=" + item.sn + "&isScoreItem=0")

            },
            //            选择地址
            jt_select_address: function () {
                Lib.go.jt_selectaddress(this.$router)

            },

        }
    }


    function loadAddress() {
        let selectedAddress = Lib.localStorage.getCurrentAddress();
        if (selectedAddress) {


            if (selectedAddress.isDeliver) {
                page.address_detail = selectedAddress.areaDesc;
            } else {
                page.address_detail = selectedAddress.shopName;
            }
        } else {
            Lib.axios.axios({
                url: '/address/getDefault',
                success: function (basebean) {
                    let address = basebean.getData();
                    if (address) {

                        page.address_detail = address.areaDesc
                        Lib.localStorage.setCurrentAddress(address);
                    }

                },
                forunlogin: function () {
                    page.address_detail = "请选择收货地址";
                },

            });
        }
    }
    function loadIndexData() {
        Lib.axios.axios({
            url: '/home/index',
            success: function (basebean) {
                let malldata = basebean.getData();
                page.malldata = malldata;
                page.$vux.loading.hide();
                page.loadRecommend();
            }
        });
    }
</script>

<style scoped>

</style>