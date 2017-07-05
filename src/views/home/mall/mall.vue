<template>
    <div style="display: flex;flex-direction: column;margin-bottom: 55px;">

        <search2></search2>
        <div class="vux-demo" style="margin-top: 44px;">
            <swiper :list="bannerdata" :show-desc-mask="false" auto style="width:100%;overflow: hidden;margin-top: 0px"
                    dots-class="custom-bottom"
                    dots-position="center" :aspect-ratio="210/375"></swiper>


        </div>

        <hoticon :list="hoticondata"></hoticon>
        <!--<floor v-for="floor in floors" :floor="floor">-->
        <div style="height:8px;"></div>
        <!--<qiangxian :list="hoticondata"></qiangxian>-->
        <!--<floor/>-->

        <div v-for="floor in malldata.floors">

            <qiangxian v-if="floor.vt ==1" :list="floor.data"></qiangxian>
            <fourwhite v-else-if="floor.vt ==2||floor.vt ==3" :list="floor.data" :title="floor.title" :flag="floor.flag"></fourwhite>
            <horizon_scroll v-else-if="floor.vt ==4 " :list="floor.data" :title="floor.title" :flag="floor.flag"></horizon_scroll>
            <oneimage v-if="floor.vt ==6"></oneimage>
        </div>
        <div style="height:3px;"></div>

        <div style="height: 30px;margin-top: 15px;text-align: center;">--热门推荐--</div>
        <ul style="overflow:hidden;width:100%;">
            <li style="float:left;width: 50%;white-space:nowrap;" v-for="item in list">
                <recommend_cell :item="item"></recommend_cell>
            </li>

        </ul>
        <div style="height: 40px;margin-top: 15px;text-align: center;">--end--</div>
    </div>
</template>

<script>

    import {Swiper, Search} from 'vux'
    import Lib from 'assets/js/Lib';
    import search2 from './components/search.vue' ;
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
            Search,
            search2,
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
                results: [],
                value: 'test',
                list:[] //最下方推荐商品数据
            };
        },
        computed: {
            bannerdata: function () {
                if (page.malldata.head) {
                    let headbanner = page.malldata.head.map(function (value, index) {
                        return {
                            url: value.aim,
                            img: value.img
                        };
                    })
                    return headbanner;
                }


            },
            hoticondata: function () {
                if (page.malldata.menu) {
                    let array = page.malldata.menu.map(function (value, index) {
                        return {
                            url: value.aim,
                            img: value.img,
                            title: value.title
                        };
                    })
                    return array;
                }


            }
        },
        created () {
            page = this;
            Lib.Hub.$on('keyword', (keyword) => { //Hub接收事件
                window.location=Lib.constant.baseurl+"/views/product/list.html?&keyword="+keyword;
            });

        },
        mounted(){
//            this.$vux.loading.show({
//                text: '亲爱'
//            })
// 隐藏
          loadIndexData();

        },
        methods: {
            loadRecommend:function () {
                Lib.axios.axios({
                    url: '/home/hotMarket',
                    success: function (basebean) {
                        page.list = basebean.getData().list;

                    }
                });
            },
            setFocus () {
                this.$refs.search.setFocus()
            },
            resultClick (item) {
                window.alert('you click the result item: ' + JSON.stringify(item))
            },
            getResult (val) {
                this.results = val ? getResult(this.value) : []
            },
            onSubmit () {
                this.$refs.search.setBlur()
                this.$vux.toast.show({
                    type: 'text',
                    position: 'top',
                    text: 'on submit'
                })
            },
            onFocus () {
                console.log('on focus')
            },
            onCancel () {
                console.log('on cancel')
            },
            linkto: function (index) {
                switch (index) {
                    case 0:
                        return Lib.constant.baseurl + "/views/trade/list.html"
                        break;
                    case 1:
                        return Lib.constant.baseurl + "/views/mine/favorite.html"
                        break;
                    case 2:
                        return Lib.constant.baseurl + "/views/coupon/list.html"
                        break;
                    case 3:
                        return Lib.constant.baseurl + "/views/coupon/list.html"
                        break;
                    case 4:
                        return Lib.constant.baseurl + "/views/mine/iccard.html"
                        break;
                    case 5:
                        return "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf698f56d095a5d43&redirect_uri=http%3A%2F%2Fweixin.sanjiang.com%2Fsjmarket%2Fviews%2Fcomplaint%2Fsubmit.html&response_type=code&scope=snsapi_base#wechat_redirect";
                        break;
                    case 6:
                        return "http://h5.sanjiang.com/help/help.html";
                        break;
                    default:

                }
            }
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