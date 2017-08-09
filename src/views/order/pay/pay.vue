<template>
    <div>
        <marketpay v-if="paytype == 'market'"></marketpay>
        <cardrenewpay v-else-if="paytype == 'cardrenew'"></cardrenewpay>
    </div>
</template>

<script>
    import Lib from 'assets/js/Lib';
    import axios from 'axios';
    import marketpay from './components/marketpay.vue'
    import cardrenewpay from './components/cardrenewpay.vue'
    let paytype = Lib.Utils.getQueryString("paytype");
    if (paytype == null || paytype.trim().length == 0) {
        paytype = "market";
    }
    console.log("paytype=" + paytype)
    export default {
        components: {
            marketpay, cardrenewpay
        },
        data () {
            return {
                paytype:'market'
            };
        },
        created () {
            this.paytype = paytype;
        },

        mounted(){


            axios.get("http://weixin.sanjiang.com/weichat-csr-web" + '/weixin/jsconfig?url=' + encodeURIComponent(window.location.href)).then(function (resp) {
                console.log(resp)
                /* console.log(resp)*/
                var res = resp.data;
                /* console.log(res);*/
                if (!res.success) {
                    alert(res.errmsg);
                    return;
                }
                res.data.debug = false;
                res.data.jsApiList = ['chooseWXPay'];
                wx.config(res.data);
            }, function (resp) {
                console.log("resp=" + resp)
            });

            wx.ready(function () {
                wx.hideOptionMenu();
                console.log("ready")
//                alert("ready")
            });

            wx.error(function (res) {
//        console.log(res);
                console.log("error")
            });


        },
        activated () {


        },
        methods: {}
    }
</script>
<style>


</style>
