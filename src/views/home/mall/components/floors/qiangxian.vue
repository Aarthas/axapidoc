<template>


    <div style="position: relative;  overflow: hidden;background-color: white;height: 187px;">

        <span class="img" style="width:41.4%;height: 187px;    border-right: 1px solid #eeeeee;" :style="{backgroundImage:'url('+list[0].img+')'}"></span>

        <span class="img" style="width:58.6%;height: 78px;    border-bottom: 1px solid #eeeeee;" :style="{backgroundImage:'url('+list[1].img+')'}"></span>

        <span class="img" style="width:29.3%;height: 109px ;    border-right: 1px solid #eeeeee;" :style="{backgroundImage:'url('+list[2].img+')'}"></span>

        <span class="img" style="width:29.3%;height: 109px ;" :style="{backgroundImage:'url('+list[3].img+')'}"></span>

    </div>

</template>
<script>
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
            myfunc: function () {
                let that = this;
                that.$emit('exchange', this.item)
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

        box-sizing: border-box;
    }

    .info {
        text-align: center;
        color: #2F2F2F;
        font-size: 13px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        margin-top: 8px;
    }

    .img {
        float: left;
        box-sizing: border-box;

        background-size: contain;
        background-repeat: no-repeat;
    }
</style>