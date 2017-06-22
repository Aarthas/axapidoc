<template>

    <div class="weui-cell weui-cell_select weui-cell_select-after">
        <div class="weui-cell__hd" v-if="propsData.title">
            <label  class="weui-label">{{propsData.title}}</label>
        </div>
        <div class="weui-cell__bd">
            <select class="weui-select" name="select2" v-bind:value="value" v-on:input="updateValue($event.target.value)"  ref="select" :style="{color: value>-1?'#333333':'rgb(169, 169, 169)'}">
                <option  value="-1"  >{{propsData.placeholder||'请选择'}}</option>
                <!--<option  v-if="!propsData.placeholder && typeof (value === 'undefined' || value === '') && propsData.title"></option>-->
                <option v-for="item in propsData.list" :title="item.name"  is-link :key="item.value" :value="item.value">{{item.name}}</option>

            </select>

        </div>


    </div>


</template>

<script>


    var that;

    export default {


        data () {
            return {};
        },
        props: {
            propsData: Object,
            value: {
                default: [],
            },
        },


        computed: {

            showPlaceholder () {
                if ( this.placeholder&&propsData.list&&propsData.list.length>0) {
                    return true
                }
                return false
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
            updateValue: function (value) {
                this.$emit('input',value)
            }
        }
    }
</script>

<style>
    @import '../assets/css/weui.min.css';


</style>
