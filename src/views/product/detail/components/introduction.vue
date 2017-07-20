<template>
    <div class="container">

        <div  v-if="introduction !=''" v-html="introduction" style="display: flex;flex-direction: column;justify-content: center;padding-left: 3vw;padding-right: 3vw;padding-top: 20px;"></div>
        <div style=" font-size: 17px;text-align: center;" v-else>暂无该商品介绍</div>
    </div>
</template>

<script>
    import Lib from 'assets/js/Lib';

    export default {
        components: {},
        data(){
            return {
                introduction: ""
            }
        },
        mounted(){

            let introduction = this.$route.query.introduction;
            this.introduction=introduction.replace(/<img/g,"<img style='width: 94vw; height: auto;'")
        }
    }
</script>

<style scoped>
    .container{
        height:auto;margin:auto;padding: 0px;word-wrap:break-word;background-color: white;word-break: break-all;
        LINE-HEIGHT: 120%;
    }


    p {
        padding-left: 28px;
        padding-right: 28px;
    }
</style>