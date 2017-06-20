<template>


        <div class="weui-cell">
            <div class="weui-cell__bd">
                <input class="weui-input" type="text" :placeholder="item.placeholder"/>
            </div>
        </div>




</template>

<script>


    var that;

    export default {

        name: "y-input",
        data () {
            return {};
        },
        props: {
            item: Object,

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
