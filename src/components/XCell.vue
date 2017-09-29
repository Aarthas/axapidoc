<template>

    <div class="weui-cell" v-bind:class="classObject" @click="onClick">
        <div class="weui-cell__bd">
            <span style="font-size: 15px">{{title}}</span>
        </div>
        <div style="font-size: 15px" class="weui-cell__ft">{{value}}</div>
    </div>

</template>

<script>


    var that;

    export default {

        name: "xcell",
        data () {
            return {};
        },
        props: {
            title: String,
            value: [String, Number, Array],
            isLink: Boolean,
            link: {
                type: [String, Object]
            }
        },


        computed: {

            classObject: function () {
                return {
                    'weui-cell_access': this.isLink
                }


            }
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
                if (this.link != null) {
                    this.$router.push(this.link)
                }


            }
        }
    }
</script>

<style>
    @import '../assets/css/weui.min.css';


</style>
