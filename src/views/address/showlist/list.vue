<template>

    <div>

        <ul v-if="!listEmpty">
            <li v-for="item in list">



            </li>

        </ul>
        <div v-else style="display: flex;justify-content: center;align-items: center;height: 400px;">
            地址为空







        </div>

    </div>
</template>


<script>


    import {Group, XInput, XButton} from 'vux'
    import Lib from 'assets/js/Lib';

    var page


    export default {

        components: {

            XButton,


        },
        data () {
            return {

                listEmpty: false,
                list: [],

                showSuccess: false
            };
        },
        computed: {},
        created () {
            page = this;
            console.log("created")

        },
        mounted () {
            Lib.axios.axios({
                url: 'address',
                success: function (basebean) {
                    console.log(basebean.getData())
                    let list = basebean.getData().list;
                    let listEmpty = basebean.isListEmpty();
                    console.log(listEmpty)
                    page.listEmpty = listEmpty;
                    page.list = list;

                }
            });

        },

        methods: {

            exchange: function () {

            },
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
