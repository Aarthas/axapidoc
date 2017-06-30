<template>
    <div style="display: flex;flex-direction: column">

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
        </div>

        <div style="height: 300px;"></div>
    </div>
</template>

<script>

    import {Swiper, Search} from 'vux'
    import Lib from 'assets/js/Lib';
    import search2 from './components/search.vue' ;
    import hoticon from './components/hoticon.vue' ;

    import qiangxian from './components/floors/qiangxian.vue' ;
    var page;
    export default {
        components: {

            Swiper, Search, search2, hoticon, qiangxian
        },
        data () {
            return {
                malldata: {},
                results: [],
                value: 'test'
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

        },
        mounted(){
//            this.$vux.loading.show({
//                text: '亲爱'
//            })
// 隐藏

            Lib.axios.axios({
                url: '/home/index',
                success: function (basebean) {
                    let malldata = basebean.getData();
                    page.malldata = malldata;

                    page.$vux.loading.hide()
                }
            });
        },
        methods: {
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
</script>

<style scoped>

</style>