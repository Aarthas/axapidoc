<template>
    <div >
        <div class="btn-area">
            <x-button @click.native="payWeixin" type="primary"> 微信支付</x-button>
        </div>
    </div>
</template>

<script>

    import {XButton} from 'vux'
    var page;

    export default {
        components: {
            XButton
        },
        data () {
            return {




            };
        },
        created () {
            page = this;


        },

        mounted(){



        },
        activated () {


        },
        methods: {
            payWeixin:function () {

            }
        }
    }
</script>
<style>



</style>
