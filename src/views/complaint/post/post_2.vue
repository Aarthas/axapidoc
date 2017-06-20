<template>
    <div>




        <group >
            <cellhead title="请点击选择您要投诉的问题"></cellhead>
            <xcell v-for="item in typesa" :title="item.name"  is-link  @click.native="onitemClick(item)" :key="item.value"></xcell>
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
        computed: {
            typesa: function () {
                console.log(page.complaintPreData.types)
                return page.complaintPreData.types
            }
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
                window.location.href="./submit.html"



            }
        }
    }
</script>

<style>


</style>
