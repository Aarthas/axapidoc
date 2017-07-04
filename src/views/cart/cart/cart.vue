<template>

    <div>


        <div style="background-color: #FFFFFF;
        overflow: hidden;
        position: relative;">

            <popup_radio title="aaa" :options="addresslist" v-model="option1" is-transparent="true">
                <p slot="popup-header" class="vux-1px-b demo3-slot">收货地址</p>
                <template scope="props" slot="each-item">
                    <p style="line-height: 30px;">

                        {{addresslist[props.index].consignee }}     {{addresslist[props.index].mobile }}
                             <br>

                        <span style="color:#666;">  {{addresslist[props.index].area }}  </span>
                    </p>
                </template>

            </popup_radio>
        </div>
        <div style="background-image: url('http://onpxz5rdd.bkt.clouddn.com/ic_address_line.png');background-size: contain;height: 2px;width: 100%"></div>
    </div>



    <!--</transition>-->
</template>


<script>


    import {Group, XInput, XButton} from 'vux'
    import Lib from 'assets/js/Lib';
    import popup_radio from './popup-radio.vue'
    var page


    export default {

        components: {
            Group,
            XInput,
            XButton, popup_radio


        },
        data () {
            return {

                option1: 0,
                options1: ['A', 'B', 'C'],
                addresslist: []
            };
        },
        computed: {},
        created () {
            page = this;
            console.log("created")

        },
        watch: {
            option1 (val) {
                console.log(val)




            },

        },
        mounted () {
            Lib.axios.axios({
                url: 'address',
                success: function (basebean) {
                    console.log(basebean.getData())
                    let list = basebean.getData();
//                    let listEmpty = basebean.isListEmpty();
//                    console.log(listEmpty)
//                    page.listEmpty = listEmpty;
//                    page.addresslist = list;

                    page.addresslist = list.map(function (item,index) {
                        item.value = item.id;
                        item.key = index;


                        return item;
                    });

                    console.log(page.addresslist)


                }
            });

        },
        updated () {


        },
        activated () {


        },
        deactivated () {

            console.log("deactivated")
        },
        destroyed () {
            console.log("destroyed")

        },

        methods: {}
    }
</script>

<style>
    .demo3-slot {
        text-align: center;
        padding: 8px 0;
        color: #888;
    }

</style>
