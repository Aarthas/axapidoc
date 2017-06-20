<template>
    <div>




        <!--<group style="margin-top: 0" title="">-->
            <!--<cellhead title="请选择平台"></cellhead>-->
            <!--<xcell v-for="item in complaintPreData.platforms" :title="item.name"  is-link   @click.native="onitemClick(item)" :key="item.value"></xcell>-->
        <!--</group>-->



    </div>
</template>


<script>

    import { Scroller, Divider, Spinner, XButton, Group, Cell } from 'vux'
    import xcell from '../../../components/XCell.vue';
    import cellhead from '../../../components/CellHead.vue';
    import Lib from 'assets/js/Lib';

    var page


    export default {

        components: {
            Scroller,
            Divider,
            Spinner,
            XButton,
            Group,
            Cell,
            xcell,
            cellhead
        },
        data () {
            return {
                complaintPreData:{}

            };
        },
        created () {
            page = this;

        },
        mounted () {
            Lib.axios.axios({
                url: 'complaint/getComplaintPreData',

                success: function (basebean) {
                    page. complaintPreData = basebean.getData();

                }
            })


        },

        methods: {
            onitemClick:function () {
                console.log("aaa")
                window.location.href="./post2.html"
            }
        }
    }
</script>

<style>
    .box1 {
        height: 100px;
        position: relative;
        width: 1490px;
    }
    .box1-item {
        width: 200px;
        height: 100px;
        background-color: #ccc;
        display:inline-block;
        margin-left: 15px;
        float: left;
        text-align: center;
        line-height: 100px;
    }
    .box1-item:first-child {
        margin-left: 0;
    }
    .box2-wrap {
        height: 300px;
        overflow: hidden;
    }

</style>
