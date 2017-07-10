<template>
    <div style=" height:auto;margin:auto;padding: 0px;word-wrap:break-word;background-color: white;word-break: break-all;
	LINE-HEIGHT: 120%;" v-if="introduction!=null"  v-html="introduction"></div>
    <div style=" font-size: 17px;text-align: center;" v-else>暂无该商品介绍</div>
</template>

<script>
    import Lib from 'assets/js/Lib';

    export default {
        components: {},
      data(){
            return{
                introduction:""
            }
      },
        mounted(){

          this.introduction=this.$route.query.introduction;
        }
    }
</script>

<style scoped>
    img{
        width: 100%;
        height:auto;
    }
    p{
        padding-left: 8px;
        padding-right: 8px;
    }
</style>