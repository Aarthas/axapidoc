<template>
    <span class="vux-check-icon" @click="updateValue">

            <i class="weui-icon-success" v-show="type == 'default' && value"></i>
            <i class="weui-icon-circle" v-show="type == 'default' && !value"></i>
            <i class="weui-icon-cancel" v-show="type == 'cancel'"></i>


    </span>
</template>

<script>


    export default {

        components: {},
        methods: {
            updateValue () {
                this.$emit('update:value', !this.value)
            }
        },
        props: {
            value: {
                type: Boolean,
                default: false
            },
            type: {
                type: String,
                default: 'default'
            }
        }
    }
</script>

<style lang="less">
    @import '../assets/css/weui.min.css';

    .vux-check-icon {
        display: inline-block;
    }

    .vux-check-icon > span {
        line-height: 23px;
        color: #222;
        vertical-align: middle;
    }

    .vux-check-icon > .weui-icon-success:before, .vux-check-icon > .weui-icon-success-circle:before {
        color: rgb(4, 190, 2);
    }
</style>
