<template>

    <div>

        <ul v-if="!listEmpty">
            <li v-for="item in list">

                <coupon_blue @exchange="exchange" :item=item v-if="item.isUnused&&item.isReduce"></coupon_blue>
                <coupon_orange @exchange="exchange" :item=item v-else-if="item.isUnused&&item.isCach"></coupon_orange>
                <coupon_gray @exchange="exchange" :item=item v-else-if="item.isUsed||item.isExpired"></coupon_gray>

            </li>

        </ul>
        <div v-else style="display: flex;justify-content: center;align-items: center;height: 400px;">
            优惠券为空
        </div>

    </div>
</template>


<script>


    import {Group, XInput, XButton} from 'vux'
    import Lib from 'assets/js/Lib';
    import coupon_blue from './component/coupon_blue.vue'
    import coupon_orange from './component/coupon_orange.vue'
    import coupon_gray from './component/coupon_gray.vue'
    var page


    export default {

        components: {

            XButton,

            coupon_blue,
            coupon_orange,
            coupon_gray

        },
        data () {
            return {

                listEmpty: false,
                list: [],

            };
        },
        computed: {},
        created () {
            page = this;
            console.log("created")

        },
        mounted () {
            Lib.axios.axios({
                url: 'coupons',
                success: function (basebean) {
                    console.log(basebean.getData())
//
                    let listEmpty = basebean.isListEmpty();
                    console.log(listEmpty)
                    page.listEmpty = listEmpty;
                    if (!page.listEmpty) {
                        let list = basebean.getData().list;
                        page.list = list;
                    }


                }
            });

        },

        methods: {


            jt: function () {

            }
        }
    }
</script>

<style lang="less">
    /*.custom-primary-blue {*/
    /*border-color: #55b0f6!important;*/
    /*color: #55b0f6!important;*/
    /*&:active {*/
    /*border-color:  #367eb5!important;*/
    /*color:  #367eb5!important;*/
    /*background-color: transparent;*/
    /*}*/
    /*}*/
</style>
