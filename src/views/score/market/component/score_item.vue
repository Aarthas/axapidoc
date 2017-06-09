<template>


    <div class="pane" v-on:click="myfunc">
        <div
                class="pane_lf">

            <div style="background:url(http://img.dev.sanjiang.info/goods/c5/g46/109314/c8fdbdadb9baceef5350313039333134.b.0.jpg);
                background-size:90px 90px;
                background-repeat:no-repeat;
                height: 90px;width: 90px;"></div>

        </div>

        <div class="pane_middle">
            <span style="font-size: 14px;margin-top: 1px;color: #666666">{{item.name}}</span>
            <span style="font-size: 12px;margin-top: 1px;">零</span>
            <div style="display: flex;flex-direction: row;justify-content: space-between">
                <span style="font-size: 12px;margin-top: 1px;color: red">3000</span>
                <div style="background:url(http://onpxz5rdd.bkt.clouddn.com/ic_put_into_cart.png);
                    background-size:30px 30px;
                    background-repeat:no-repeat;
                    height: 30px;width: 30px;margin-right: 20px;"></div>
            </div>


        </div>


    </div>


</template>

<script>


    export default {
        components: {},
        data () {
            return {}

        },
        props: {
            item: Object,
            default: {"name":"aa"}
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

<style scoped>


    .pane {
        display: flex;
        flex-direction: row;
        height: 110px;
        background-color: white;
        border-bottom: 1px solid #eeeeee;
        /*margin: 0.7em;*/
    }

    .pane_lf {
        width: 110px;
        height: 110px;
        color: white;
        display: flex;
        /*background-color: #0bb20c;*/
        flex-direction: column;
        justify-content: center;
        align-items: center
    }

    .pane_middle {
        background-color: white;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding-left: 8px;
        flex: 1;

    }

    .pane_lf_info1 {
        border-radius: 30px;
        background-color: white;
        color: #55b0f6;
        font-size: 14px;
        padding-top: 3px;
        padding-bottom: 2px;
        padding-left: 12px;
        padding-right: 12px;
    }
</style>
