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

        <div v-if="hotlist.length>0">
        <div style="height: 30px;margin-top: 15px;text-align: center;">--热门推荐--</div>
        <ul style="overflow:hidden;width:100%;">
            <li style="float:left;width: 50%;white-space:nowrap;" v-for="item in hotlist">
                <recommend_cell :item="item"></recommend_cell>
            </li>

        </ul>
        <div style="height: 40px;margin-top: 15px;text-align: center;">--end--</div>
        </div>
    </div>
</template>

<script>

    import {Swiper, Search} from 'vux'
    import Lib from 'assets/js/Lib';
    import search2 from '../../../components/search.vue' ;
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


                hotlist: [] //最下方推荐商品数据
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
                Lib.go.go("/views/product/list.html?&keyword=" + keyword)

            });

        },
        mounted(){

            loadIndexData();

        },
        methods: {
            loadRecommend: function () {
                Lib.axios.axios({
                    url: '/home/hotMarket',
                    success: function (basebean) {
                        page.hotlist = basebean.getData().list;
                    }
                });
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