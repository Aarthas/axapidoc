<template>


    <div style="position: relative;  overflow: hidden;padding-left: 6px;padding-right: 6px;background-color: white">
        <div class="iconpane" v-for="item in list " @click="clickicon(item)">
            <img class="img" style="" :src="item.img">
            <span class="info" style="">{{item.title}}</span>
        </div>

    </div>

</template>
<script>
    import Lib from 'assets/js/Lib';
    export default {
        components: {},
        data () {
            return {}

        },
        props: {
            list: {
                type: Array,
                default () {
                    return []
                }
            }
        }
        ,
        methods: {
            clickicon:function (item) {
                console.log(item)
                Lib.Hub.$emit('jt', item.url);
            }
        }
    }
</script>

<style lang="less" scoped>


    .iconpane {
        display: flex;
        flex-direction: column;
        position: relative;
        float: left;
        padding: 10px 10px;
        width: 25%;
        box-sizing: border-box;
    }

    .img {
        width: 40px;
        height: 40px;
        margin:  auto;
    }

    .info {
        text-align: center;
        color: #2F2F2F;
        font-size: 13px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;    margin-top: 8px;
    }
</style>