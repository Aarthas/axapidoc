<template>
    <div>


        <div>aaaa</div>

    </div>
</template>


<script>


    import Lib from 'assets/js/Lib';

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
