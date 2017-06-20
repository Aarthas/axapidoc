<template>


        <div class="weui-cell">
            <div class="weui-cell__bd">
                <input class="weui-input" type="text" :placeholder="item.placeholder" v-bind:value="value" v-on:input="updateValue($event.target.value)"  ref="input"/>
            </div>
        </div>




</template>

<script>


    var that;

    export default {

        name: "y-input",
        data () {
            return {

            };
        },
        props: {
            item: Object,
            value: {
                default: '',
            },
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


            },
            updateValue: function (value) {
                var formattedValue = value
                // 删除两侧的空格符
                    .trim()
                    // 保留 2 小数位

                // 如果值不统一，手动覆盖以保持一致
                if (formattedValue !== value) {
                    this.$refs.input.value = formattedValue
                }
                // 通过 input 事件发出数值
                this.$emit('input',formattedValue)
            }
        }
    }
</script>

<style>
    @import '../assets/css/weui.min.css';


</style>
