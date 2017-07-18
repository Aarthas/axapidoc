<template>

    <div>
        <YHead title="重置密码"></YHead>
        <!--<YHead title="登录"></YHead>-->
        <div style="height: 30px"/>
        <div style="display: flex;justify-content: center;align-items: center;">
            <img style="width: 90px;height: 90px;border-radius: 50%"
                 src="http://onpxz5rdd.bkt.clouddn.com/ic_default.png">

        </div>
        <div style="height: 10px"/>
        <group title="请输入手机号与新密码">
            <vcodecell title="" :max=60 @startCount="startCount" placeholder="手机号" ref="vcodecell"
                       vcodeLabel="发送验证码" v-model="mobile"></vcodecell>
            <x-input v-model="sms" title="" placeholder="验证码"></x-input>
            <x-input v-model="pwd" title="" placeholder="密码"></x-input>
        </group>


        <div class="btn-area">
            <x-button @click.native="doSubmit" type="primary"> 提交</x-button>
        </div>


    </div>
    <!--</transition>-->
</template>


<script>

    import vcodecell from '../../../components/vcodecell.vue'
    import {Group, XInput, XButton,Alert,Toast} from 'vux'
    import Lib from 'assets/js/Lib';
    import YHead from '../../../components/YHead.vue'

    var page


    export default {

        components: {
            Group,
            XInput,
            XButton,
            vcodecell,
            Alert,
            Toast,YHead


        },
        data () {
            return {

                mobile: '',
                sms: '',
                pwd: '',
            };
        },
        computed: {},
        created () {
            page = this;
            console.log("created")

        },
        mounted () {


        },
        updated () {


        },
        activated () {


        },
        deactivated () {

            console.log("deactivated")
        },
        destroyed () {
            console.log("destroyed")

        },

        methods: {
            startCount: function (v) {
                Lib.axios.axios({
                    showload:true,
                    page:page,
                    loadtext:"加载中",
                    method:'get',
                    url: 'users/smsCaptcha?mobile='+page.mobile+'&action=findPwd',
                    success: function (basebean) {
                        page.$refs.vcodecell.start();
                        page.$vux.toast.show({

                            text:'验证码发送成功'
                        })
                    }
                    ,onerrcode:function (basebean) {

                        Lib.vux.showtoast(page,basebean.getMessage());
                    }
                });
            },

            doSubmit: function () {

                Lib.axios.axios({
                    showload:true,
                    page:page,
                    loadtext:"加载中",
                    method:'post',
                    url: '/users/findPwd?smsCaptcha='+page.sms+"&mobile="+page.mobile+"&newPwd="+page.pwd,
                    success: function (basebean) {
                        page.$vux.alert.show({
                            title: '提示',
                            content: '新密码设置成功',
                            onShow () {

                            },
                            onHide () {
                               Lib.go.go('/views/user/login2.html');
                            }
                        })
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
