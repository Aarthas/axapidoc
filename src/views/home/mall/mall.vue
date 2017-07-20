<template>
    <div style="display: flex;flex-direction: column;margin-bottom: 55px;">

        <search></search>
        <div class="vux-demo" style="margin-top: 44px;position:relative;display: flex;justify-content: center">

            <swiper :list="bannerdata" :show-desc-mask="false" auto style="width:100%;overflow: hidden;margin-top: 0px"
                    dots-class="custom-bottom"
                    dots-position="center" :aspect-ratio="210/375"></swiper>
            <!--<div v-if="selectedAddress" style="   position:absolute;-->
                    <!--top: 14px;-->
                    <!--padding: 1px 18px;-->
                    <!--height: 24px;-->
                    <!--line-height: 24px;-->
                    <!--border-radius: 12px;-->
                    <!--z-index:999;-->
                    <!--color: white;-->
                    <!--font-size: 13px;-->
                    <!--background: rgba(0, 0, 0, 0.2);">-->
                <div  v-if="selectedAddress.isDeliver" style="   position:absolute;
                    top: 14px;
                    padding: 1px 18px;
                    height: 24px;
                    line-height: 24px;
                    border-radius: 12px;
                    z-index:999;
                    color: white;
                    font-size: 13px;
                    background: rgba(0, 0, 0, 0.2);" @click="jt_select_address"> {{address_detail}}</div>
                <div  v-else style="   position:absolute;
                    top: 14px;
                    padding: 1px 18px;
                    height: 24px;
                    line-height: 24px;
                    border-radius: 12px;
                    z-index:999;
                    color: white;
                    font-size: 13px;
                    background: rgba(0, 0, 0, 0.2);" @click="jt_select_address">{{ selectedAddress.shopName}}</div>
            <!--</div>-->
            <!--<div v-else style="   position:absolute;-->
                    <!--top: 14px;-->
                    <!--padding: 1px 18px;-->
                    <!--height: 24px;-->
                    <!--line-height: 24px;-->
                    <!--border-radius: 12px;-->
                    <!--z-index:999;-->
                    <!--color: white;-->
                    <!--font-size: 13px;-->
                    <!--background: rgba(0, 0, 0, 0.2);"  @click="jt_select_address"> 请选择收货地址 ></div>-->

        </div>

        <hoticon :list="hoticondata"></hoticon>
        <!--<floor v-for="floor in floors" :floor="floor">-->
        <!--<div style="height:8px;"></div>-->
        <!--<qiangxian :list="hoticondata"></qiangxian>-->
        <!--<floor/>-->

        <div v-for="floor in malldata.floors">
            <div style="height:8px;"></div>
            <qiangxian v-if="floor.vt ==1" :list="floor.data"></qiangxian>

            <fourwhite v-else-if="floor.vt ==2||floor.vt ==3" :list="floor.data" :title="floor.title" :flag="floor.flag"></fourwhite>
            <horizon_scroll v-else-if="floor.vt ==4 " :list="floor.data" :title="floor.title" :flag="floor.flag" @goToDetail="goToDetail"></horizon_scroll>
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

                address_detail:"",
                hotlist: [], //最下方推荐商品数据,
                selectedAddress:{}
            };
        },
        computed: {
            bannerdata: function () {
                if (page.malldata.head) {
                    let headbanner = page.malldata.head.map(function (value, index) {
                        return {
                            url: value.aim.replace("env=2", "env=3"),
                            img: value.img
                        };
                    })
                    return headbanner;
                }
            },
            hoticondata: function () {
                if (page.malldata.menu) {
                    let array = page.malldata.menu.map(function (value, index) {
                        if (value.jt == 191){
                            return {
                                url: value.aim,
                                img: value.img,
                                title: value.title
                            };
                        }else if(value.jt == 91){
                          let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf698f56d095a5d43&redirect_uri=http%3A%2F%2Fweixin.sanjiang.com%2Fmembercard%2F%23%2Findex&response_type=code&scope=snsapi_base&state=sunlight#wechat_redirect'
                            return {
                                url: url,
                                img: value.img,
                                title: value.title
                            };
                        }else if(value.jt == 41){
                            return {
                                url: Lib.constant.baseurl+"/views/trade/list.html",
                                img: value.img,
                                title: value.title
                            };
                        }
                        else if(value.jt == 71){
                            return {
                                url: Lib.constant.baseurl+"/views/mine/favorite.html",
                                img: value.img,
                                title: value.title
                            };
                        }

                    })
                    return array;
                }


            }
        },
        created () {
            page = this;
            //Hub接收 搜索 事件
            Lib.Hub.$on('keyword', (keyword) => {
                console.log("search keyword")
                Lib.go.go("/views/product/list.html?&keyword=" + keyword)

            });
            //Hub接收 跳转活动页 事件
            Lib.Hub.$on('jt', (href) => {

                if(href.indexOf("env=2") >= 0){
                  let url =  href.replace("env=2", "env=3");
                  if (page.selectedAddress.shopId) {
                      window.location.href = url + "&shopId=" + page.selectedAddress.shopId;
                  }else{
                      window.location.href = url + "&shopId=00023";
                  }
                }else{
                    window.location.href =href;
                }


            });

        },
        mounted(){

            loadIndexData();
            let selectedAddress = Lib.localStorage.getCurrentAddress();
          if(selectedAddress){
              page.selectedAddress=selectedAddress;

              page.address_detail =selectedAddress.areaDesc;
          }else {
              Lib.axios.axios({
                  url: '/address/getDefault',
                  success: function (basebean) {
                      let address = basebean.getData();
                      page.address_detail = address.areaDesc
                      Lib.localStorage.setCurrentAddress(address);

                  },
                  forunlogin: function () {
                      page.address_detail = "请选择收货地址"
                  }
              });
          }

        },
        methods: {
            loadRecommend: function () {
                Lib.axios.axios({
                    url: '/home/hotMarket',
                    loading:{
                        page:page,
                    },
                    success: function (basebean) {
                        page.hotlist = basebean.getData().list;
                    }
                });
            },
            goDetail:function (item) {

                Lib.go.go("/views/product/detail.html?productId="+item.sn+"&isScoreItem=0")
            },
            goToDetail:function (item) {

                Lib.go.go("/views/product/detail.html?productId="+item.aim+"&isScoreItem=0")
            },
            //            选择地址
            jt_select_address: function () {
                Lib.go.go("/views/address/selectaddress.html")
            },

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