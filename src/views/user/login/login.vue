<template>

    <div>

        <YHead title="登录"></YHead>
        <div style="height: 30px"/>
        <div style="display: flex;justify-content: center;align-items: center;">
            <img style="width: 90px;height: 90px;border-radius: 50%"
                 src="http://onpxz5rdd.bkt.clouddn.com/ic_default.png">

        </div>
        <div style="height: 20px"/>
        <group title="未注册过的手机将自动注册三江账户">
            <vcodecell title="" :max=60 @startCount="startCount" placeholder="手机号" ref="vcodecell"
                       vcodeLabel="发送验证码" v-model="mobile"></vcodecell>
            <x-input v-model="smscode" title="" placeholder="验证码"></x-input>

        </group>


        <div class="btn-area">
            <x-button @click.native="doSubmit" type="primary"> 登录</x-button>
        </div>

        <div style="display: flex;justify-content: flex-end;flex-direction: row">

            <!--<router-link :to="{ path: '/loginbypwd'}">-->

            <span style="color: #02af00;font-size:14px;margin-right: 2em;margin-top: 10px;" @click="jt_login2">账号密码登录</span>
            <!--</router-link>-->
        </div>


    </div>
    <!--</transition>-->
</template>


<script>

    import vcodecell from '../../../components/vcodecell.vue'
    import YHead from '../../../components/YHead.vue'
    import {Group, XInput, XButton} from 'vux'
    import Lib from 'assets/js/Lib';

    var page


    export default {

        components: {
            Group,
            XInput,
            XButton,
            vcodecell,YHead


        },
        data () {
            return {

                mobile: '',
                smscode: '',

            };
        },
        computed: {},
        created () {
            page = this;
            console.log('url' + window.location)

        },
        mounted () {


        },


        methods: {
            jt_login2:function () {
                var url = window.location.hash;
                if (url == ''){
                    Lib.go.go("/views/user/login2.html");
                }else {
                    Lib.go.go("/views/user/login2.html?redirect=/views/main/main.html" +url);
                }

            },

            startCount: function (v) {
                Lib.axios.axios({
                    loading:{
                        loadtext:'请稍等',
                        page:page
                    },
                    method:'post',
                    url: 'users/smsForLogin?mobile='+page.mobile,
                    success: function (basebean) {
                        page.$refs.vcodecell.start();
                    }
                    ,onerrcode:function (basebean) {

                        Lib.vux.showtoast(page,basebean.getMessage());
                    }
                });
            },

            doSubmit: function () {

                Lib.axios.axios({
                    loading:{
                        loadtext:'请稍等',
                        page:page
                    },
                    method:'post',
                    url: 'users/loginBySms?mobile='+page.mobile+"&smscode="+page.smscode,
                    success: function (basebean) {
                        console.log("localStorage.setItem(token)"+basebean.getData().sessionId);
                        localStorage.setItem("token",basebean.getData().sessionId);
                        var url = window.location.hash;
                        if (url == '') {
                            Lib.go.go("/views/main/main.html#/mine");
                        }else {
                            Lib.go.go("/views/main/main.html"+url);
                        }
                    }
                    ,onerrcode:function (basebean) {

                        Lib.vux.showtoast(page,basebean.getMessage());
                    }
                });



            },
        }
    }
</script>

<style>


</style>
