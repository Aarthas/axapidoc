<template>


    <div class="m-header is-fixed is-bg top-search" style="z-index:99;">
        <div class="search-wrap">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAMAAAANf8AYAAABL1BMVEUAAAC/v7+dnZ2bm5ucnJybm5ucnJycnJycnJybm5ucnJydnZ2dnZ2enp6bm5ucnJycnJycnJycnJz///+fn5+bm5ubm5uenp6dnZ2bm5ucnJyqqqqbm5ucnJycnJycnJycnJycnJycnJybm5ucnJycnJyqqqqbm5udnZ2fn5+qqqqenp6bm5ucnJyfn5+bm5ucnJyqqqqdnZ2cnJycnJycnJyfn5/MzMycnJycnJycnJycnJybm5uioqKcnJycnJykpKScnJybm5uioqKdnZ2cnJycnJycnJydnZ2dnZ2fn5+hoaGcnJydnZ2cnJycnJyenp6bm5uenp6bm5ucnJygoKCcnJybm5udnZ2enp6bm5ucnJybm5udnZ2cnJydnZ2enp6bm5ubm5ucnJybm5ukMyrIAAAAZHRSTlMABEGPudLs99/FqmgaHZnt/slaARCKzUQv4Y0DUvTTrZOIoLvxtw/kciAGR6nICPh5CTTGo+c4BZpxH4bzFq+VDur6Hm3B/BJTOS0TbGW6O094KsfoK6ezSUzXzilgvic68M/vXGqioQAAAd5JREFUSMftlvs3AkEUxyeb1OaxtSJELJWtbCkk8gi9EKUHSuWx///fYO+0B2tm2jp+4Rzz23y/89m5d+7sPYPQnxmWMc46bpuwO3jn5HDE1PSM+jEEl1s0JWY9E6pxzM2bIN4FlRyLS4MQ37K+bMW/uiatb+izQHAAIuAloU25Pw9Hon1lS2EGhneJxbe/aIkkhnZY6eNcdveMamofQ2k648HIAaEfgp45otYFDjm2RxriMUAnNGYanDjNOc1qztk55cJA9UPb1KgvGBmNDcg0ZdO8HKlzwMiMI5U0L18gZCtUn1W5InywRMjjmupnMZfA+AgZQl5lMVfAXBMyVGeNxSj0Otg1VWIxMjBlQnZo6g2LuQWmQsi8pm6EGUwVmDtCdoIcYTA1zauT8iT8XVE60gCvSTFc0GYSVOYeYnigGG4wkimK8whOi9azxDZY+6TxhFtJhxrBPP6JD79/7wkqp3YZrXERQ8enxsDwLkKPcaJLAQxlLz6TatzrLY63MKDgVn+BTSpeXinyc7UmfDRTJqTsUFqvKgyGUDpDIN0ebwIdnZwZiFZHRBYzCJ2nc3kdqDcf8BmbQwgVSr7reLnyeZOHgcj29w/9HOLQ6NALGh16HfUxxL21vb/8wfYOl3e+tizEE38AAAAASUVORK5CYII=" alt="">
            <input class="placeholder" placeholder="搜索三江购物商品" style= "background-color:transparent;border: none " v-model="keyword"></input>
            <!--<input/>-->

            <!--<img src="../../assets/images/ic_scan_gray.png" alt="">-->
        </div>
        <span style="line-height: 44px;width:60px;text-align: center;color: #666666" v-on:click="muFunc">搜索</span>

        <div style="width: 44px;height: 100%;display: flex;align-items: center;justify-content: center;padding-right: 10px;" @click="jt_cart">
            <i style="font-size: 22px;line-height: 1;" class="iconfont icon-gouwuche"></i>
        </div>
        <!--<div class="m-header-button is-right" style="text-align: center;width: 50px;">-->
        <!--<a href="javascript:;"><img class="m-icon-img" src="../../assets/images/ic_chat_white.png" /></a>-->
        <!--</div>-->
    </div>

    <!--<div class="page__ft">-->
            <!--<a href="javascript:home()"><img src="./images/icon_footer_link.png" /></a>-->
        <!--</div>-->

</template>
<script>
    import Lib from 'assets/js/Lib';
    export default {
        components: {},
        data () {
            return {
                keyword:""
            }

        },
        props: {
            item: Object,

        }
        ,
        methods: {
            muFunc: function () {
                console.log("aa")
                Lib.Hub.$emit('keyword',this.keyword); //Hub触发事件
            },
            jt_cart:function () {
                Lib.go.jt_home("cart");
            }
        }
    }
</script>

<style lang="less" scoped>
    .m-header {

        display: flex;

        align-items: center;
        height: 44px;
        padding: 0 10px;
        background: #fff;
        color: #494949;
        position: relative;
        background: #ffffff;
        /*opacity: 0.8;*/
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 9;
        position: fixed;
        top: 0;
        left: 0;
        height: 44px;
        width: 100%;
        box-shadow: 0 2px 10px 0 rgba(0,0,0,0.1);
        background-color: #fff;
        z-index: 1000;
    }

    .is-fixed~.page-content {
        padding-top: 44px;
        padding-bottom: 50px;
    }


        .search-wrap {
            height: 30px;
            background: #f4f4f4;
            border-radius: 4px;
            display: flex;
            flex: 1;
            align-items: center;
            justify-content: space-between;
            color: #c0c0c0;
            padding: 0 12px;
            .placeholder {
                flex: 1;
                text-align: left;
                padding-left: 12px;
            }
            img {
                width: 20px;
                height: 20px;
            }
        }


    .hot-wrap,
    .recommend-wrap {
        padding-top: 12px;
    }
    @import "../assets/font/iconfont.css";
</style>