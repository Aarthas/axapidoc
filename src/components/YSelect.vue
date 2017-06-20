<template>

    <div class="weui-cell weui-cell_select weui-cell_select-after">
        <div class="weui-cell__hd">
            <label  class="weui-label">{{propsData.title}}</label>
        </div>
        <div class="weui-cell__bd">
            <select class="weui-select" name="select2">
                <option v-for="item in propsData.list" :title="item.name"  is-link :key="item.value" :value="item.value">{{item.name}}</option>

            </select>
        </div>
    </div>


</template>

<script>


    var that;

    export default {

        name: "y-textarea",
        data () {
            return {};
        },
        props: {
            propsData: Object,

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
            onClick () {



            }
        }
    }
</script>

<style>
    @import '../assets/css/weui.min.css';


</style>
