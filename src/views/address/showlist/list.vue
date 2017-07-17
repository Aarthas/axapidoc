<template>

    <div>

        <ul style="margin-bottom: 60px;">
            <li v-for="item in list">

                <address_cell :address="item" @toEdit="toEdit"></address_cell>

            </li>

        </ul>
        <div  v-show="listEmpty==true" style="display: flex;justify-content: center;align-items: center;height: 400px;">
            地址为空
        </div>
        <div style="position: fixed;bottom: 0px;width: 100%;padding: 10px;box-sizing: border-box;background-color: #fbfbfb;">
            <x-button @click.native="toAdd" type="primary"> +添加新地址</x-button>
        </div>


    </div>
</template>


<script>


    import {Group, XInput, XButton} from 'vux'
    import Lib from 'assets/js/Lib';
    import address_cell from './components/addresslist_cell.vue'

    var page


    export default {

        components: {

            XButton,
            address_cell

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
                loading:{
                    page:page,
                },
                success: function (basebean) {
                    console.log(basebean.getData())
                    let list = basebean.getData();
                    if (list ==null || list.length==0){
                        page.listEmpty = true;
                    }
                    page.list = list;

                }
            });

        },

        methods: {

            toAdd: function () {
                this.$router.push({path: "add"})
            },
            toEdit: function (address) {
                this.$router.push({path: "edit",query:address})
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
