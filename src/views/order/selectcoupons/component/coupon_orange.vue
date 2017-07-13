<template>


    <div class="pane" v-on:click="myfunc">
        <div
                class="pane_lf">
            <div class="pane_lf_info1">
                <span>现金券</span>
            </div>

            <!--<span style="font-size: 15px;margin-top: 4px;">满99元减</span>-->
            <span style="font-size: 28px;margin-top: 6px;"><span
                    style="font-size: 12px;">¥</span>{{item.cash}}</span>


        </div>

        <div class="pane_middle">
            <span style="font-size: 14px;margin-top: 4px;color: #666666;width:200px;">适用范围：{{item.saleDetail}}</span>
            <span style="font-size: 12px;margin-top: 16px;">有效期：{{item.validityDate||0}}</span>


        </div>

        <div class="pane_rt" >
         <y-icon></y-icon>

        </div>
    </div>


</template>

<script>

    import YIcon from '../../../../components/YIcon.vue'
    export default {
        components: {YIcon},
        data () {
            return {}
        },
        props: {
            item: Object,

        },
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
        height: 100px;
        margin: 12px;
    }

    .pane_lf {
        width: 100px;
        height: 100px;
        background-color: #f4a818;
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center
    }

    .pane_middle {
        background-color: white;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-left: 12px;
        flex: 1;
        border-top: 1px solid #eeeeee;
        border-bottom: 1px solid #eeeeee;
    }

    .pane_rt {
        width: 48px;
        background-color: white;
        color: #f4a818;
        font-size: 14px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-top: 1px solid #eeeeee;
        border-bottom: 1px solid #eeeeee;
        border-right: 1px solid #eeeeee;
    }

    .pane_lf_info1 {
        border-radius: 30px;
        background-color: white;
        color: #f4a818;
        font-size: 14px;
        padding-top: 3px;
        padding-bottom: 2px;
        padding-left: 12px;
        padding-right: 12px;
    }
</style>
