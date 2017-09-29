<template>
    <div>



        <!--<div>aaa</div>-->

        <group style="margin-top: 0" title="">
            <cellhead title="请点击选择平台"></cellhead>
            <xcell v-for="item in complaintPreData.platforms" :title="item.name"  is-link   @click.native="onitemClick(item)" :key="item.value"></xcell>
        </group>



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
            onitemClick:function (item) {
                console.log(item)
//                window.location.href="./post2.html"


                page.$router.push({path:"post2",query:{platform:item.value}})
            }
        }
    }
</script>

<style>

</style>
