<template>
    <div>


        <div>aaaa</div>

    </div>
</template>


<script>


    import Lib from 'assets/js/Lib';
//    import xcell from '../../../components/XCell.vue';
    var page


    export default {

        components: {

        },
        data () {
            return {

                userInfo: {
                    username: "",
                    cardNum: "",
                }
            };
        },
        created () {
            page = this;

        },
        mounted () {


        }, activated () {


        },
        methods: {
            aa:function () {
                console.log("aaa")
            }
        }
    }
</script>

<style>


</style>
