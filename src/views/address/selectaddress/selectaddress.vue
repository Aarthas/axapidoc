<template>
    <div>
        <tab>
            <tab-item selected @on-item-click="onItemClick(0)">配送地址</tab-item>
            <tab-item @on-item-click="onItemClick(1)">自提门店</tab-item>

        </tab>
        <list v-if="showlist"></list>
        <pick v-else></pick>
        <!--<router-view ></router-view>-->

    </div>
</template>

<script>
    import {Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem, Radio} from 'vux'
    import {Group, Cell, Card} from 'vux'
    import list  from './list.vue'
    import pick  from './pick.vue'
    import Lib from 'assets/js/Lib';

    var page;
    export default {
        components: {
            Group,
            Tab,
            TabItem,
            Radio,XButton,
            list,pick
        },
        data () {
            return {

                showlist:true,

            };
        },
        created () {
            page = this;

        },

        mounted(){

        },
        methods: {
            onItemClick: function (index) {
                console.log(index)
                if (index == 0){
                    page.showlist = true;
                }else {
                    page.showlist = false;
                }
            }

        }

    }
</script>

<style scoped>


</style>