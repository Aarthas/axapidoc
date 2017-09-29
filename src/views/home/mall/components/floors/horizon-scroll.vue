<template>
    <div class="allSort">
        <!--标题-->
        <div style="display: flex;flex-direction: row;background-color: white;">
            <div style="width: 5px;height: 15px;margin-top: 10px;margin-left: 5px;" :style="{backgroundColor:flag}"></div>
            <div style="font-size: 15px;text-align: left;height: 35px;line-height: 35px;margin-left: 2px;" :style="{color:flag}">{{title}}</div>
        </div>
        <div class="sortMenu clearfix">
            <ul class="sortMenu-ul" >
                <li style="display: flex;flex-direction: column;background-color: white;width:110px;height:165px;" v-for="item in list"  v-on:click="toDetail(item)">
                    <img  style="margin-top: 8px;margin-left:8px;margin-right:8px;height: 90px;" :src="item.img">
                    <div style="margin-right: 8px;margin-left:8px;margin-top: 5px;color: #666666;text-align: center;font-size: 12px;word-break: break-all ;height:35px;overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 2;
 -webkit-box-orient: vertical; ">{{item.title}}</div>
                    <div style="height: 20px;color: #f03838;text-align: center;font-size:14px;margin-bottom: 5px;"><span style="font-size: 10px;color: #666">会员价</span>￥{{item.pn}}</div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import Lib from 'assets/js/Lib';
    export default {
        name: 'allSort',
        data () {
            return {}
        },
        props:{
            list: {
                type: Array,
                default () {
                    return []
                }
            },
            title:String,
            flag:String

        },
        methods:{
            toDetail: function (item) {
                let that =this;
                console.log(item)
//                Lib.go.go("/views/main/main.html#/product/detail?productId=" + item.aim + "&isScoreItem=0")
                this.$router.push({path:"/product/detail",query:{productId:item.aim,isScoreItem:0}})

//                that.$emit('goToDetail', item)
            }
        }
    }
</script>

<style>
    /* 分类菜单*/
    .sortMenu{
        width: 100%;
        background-color:#fff;
        overflow-x: scroll;
        -webkit-overflow-x: scroll;
    }
    .sortMenu::-webkit-scrollbar{
        width: 0;
        height: 0;
        background-color: #fff;
    }
    .sortMenu-ul {
        min-width:500px;
        display: flex;
        justify-content: flex-start;
        background-color: #C5C5C5;
    }
    .sortMenu .cell{
        display: inline-block;
        font-size: 12px;
        margin: 0px 1em;

        line-height: 40px;
        text-align: center;
        position: relative;
        text-overflow: ellipsis;
        word-break: keep-all;
    }
    .sortMenu .cell.special a{
        color: #ff474c;
    }
    .sortMenu .cell.special:before {
        content: '';
        height: 2px;
        width: 100%;
        background: #ff474c;
        position: absolute;
        bottom: 0px;
    }
    .sortMenu .all{
        right: 0;
        top: 0;
        height: 35px;
        width: 35px;
        position: absolute;
        background: #fff;
        z-index: 10;
        display: flex;
        justify-content:center;
        align-items:center;
    }
    .sortMenu .all:before{
        content: '';
        height: 25px;
        width: 1px;
        position: absolute;
        box-shadow: 1px 0px 1px #e0e0e0;
        left: 0px;
    }
    .sortMenu .all img{
        display: block;
        width: 16px;
    }
    .sortMenu .pull-down{
        position: absolute;
        top: 40px;
        height:auto;
        width: 100%;
        background: #fff;
        z-index: 1;
        border-top: 1px solid #f2f2f2;

    }
    .pull-down-sort{
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        align-content: space-around;
        flex-wrap: wrap;
        flex-direction: row
    }
    .pull-down-sort li{
        float: left;
        padding: .1rem
    }
    .pull-down-sort li a:hover{
        color: #ff474c;
    }
</style>