<template>


    <div class="pane" >
        <div
                class="pane_lf">
            <div class="pane_lf_info1">
                <span>满减券</span>
            </div>

            <span style="font-size: 15px;margin-top: 4px;">满{{item.orderMoney||0}}元减</span>
            <span style="font-size: 22px;"><span style="font-size: 12px;">¥</span>{{item.cash||0}}</span>


        </div>

        <div class="pane_middle">
            <span style="font-size: 14px;margin-top: 4px;color: #666666;width:180px;">适用范围：{{item.saleDetail}}</span>
            <span style="font-size: 12px;margin-top: 16px;">有效期：{{item.validityDate||0}}</span>


        </div>

        <!--<div class="pane_rt">-->
            <!--立<br>即<br>兑<br>换-->

        <!--</div>-->
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

        }
        ,
        methods: {

        }
    }
</script>

<style scoped>


    .pane {
        display: flex;
        flex-direction: row;
        height: 100px;
        margin: 0.7em;
    }

    .pane_lf {
        width: 100px;
        height: 100px;
        background-color: #55b0f6;
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
        padding-left: 8px;
        flex: 1;
        border-top: 1px solid #eeeeee;
        border-bottom: 1px solid #eeeeee;
    }

    .pane_rt {
        width: 48px;
        background-color: white;
        color: #55b0f6;
        font-size: 14px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #eeeeee;
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
