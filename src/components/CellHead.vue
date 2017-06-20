<template>

    <div style="height: 48px;display: flex;flex-direction: row;align-items: center;">
        <span style="height: 30px;width: 6px;background-color: #0bb20c;margin-left: 0px;"></span>
        <span style="font-size: 15px;margin-left: 10px;color: #0bb20c" >{{title}}</span>
    </div>

</template>

<script>


    var that;

    export default {


        data () {
            return {};
        },
        props: {
            title: String,


        },


        computed: {


        },

        created () {
            that = this;
            console.log("created")
        },
        mounted(){
            console.log("mounted")
        },
        activated(){
            console.log("activated")
        },
        deactivated(){
            console.log("deactivated")
        },
        destroyed(){
            console.log("destroyed")
        },
        methods: {

        }
    }
</script>

<style>
    @import '../assets/css/weui.min.css';


</style>
