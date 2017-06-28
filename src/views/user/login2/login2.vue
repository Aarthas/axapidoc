<template>

    <div>

        <!--<YHead title="登录"></YHead>-->
        <div style="height: 30px"/>
        <div style="display: flex;justify-content: center;align-items: center;">
            <img style="width: 90px;height: 90px;border-radius: 50%"
                 src="http://onpxz5rdd.bkt.clouddn.com/ic_default.png">

        </div>
        <div style="height: 20px"/>
        <group title="请输入手机号与密码">

            <x-input v-model="smscode" title="" placeholder="手机号"></x-input>
            <x-input v-model="smscode" title="" placeholder="密码"></x-input>
        </group>


        <div class="btn-area">
            <x-button @click.native="doSubmit" type="primary"> 登录</x-button>
        </div>

        <div style="display: flex;justify-content: flex-end;flex-direction: row">

            <!--<router-link :to="{ path: '/loginbypwd'}">-->
            <span style="color: #02af00;font-size:14px;margin-right: 2em;margin-top: 10px;">重置密码</span>
            <!--</router-link>-->
        </div>


    </div>
    <!--</transition>-->
</template>


<script>

    import vcodecell from '../components/vcodecell.vue'
    import {Group, XInput, XButton} from 'vux'
    import Lib from 'assets/js/Lib';

    var page


    export default {

        components: {
            Group,
            XInput,
            XButton,
            vcodecell


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

                console.log("aa")
                console.log(v)
                page.$refs.vcodecell.start();
//        FineWork.UserService.smsForLogin({
//          mobile: page.mobile.trim(),
//        }, function (basebean) {
//          basebean.showMessage();
//          page.$refs.vcodePane.start();
//        });
            },

            doSubmit: function () {


                let params = {
                    mobile: page.mobile.trim(),
                    smscode: page.smscode.trim(),
                };

//        if (params.mobile.length == 0) {
//          FineWork.MyToast.toast("手机号不能为空")
//
//          return;
//        }
//        if (params.smscode.length == 0) {
//          FineWork.MyToast.toast("验证码不能为空")
//          return;
//        }

//        FineWork.ApiUser.userApi.loginBySms(params, function (basebean) {
//          FineWork.MyRoute.redirectCenter(basebean);
//          let registerData = basebean.getData().registerData;
//          if (registerData != null) {
//
//            FineWork.MyAlert.show({
//              title: registerData.title,
//              content: registerData.content,
//              hideOnBlur: false,
//              confirmText: "确定",
//              cancelText: "去修改密码",
//              onCancel () {
//                FineWork.MyRoute.push({
//                  path: "user/changepwd", query: {
//                    mobile: basebean.getData().mobile,
//                    username: basebean.getData().username
//                  }
//                });
//              },
//              onConfirm () {
//
//                FineWork.MyRoute.redirectCenter(basebean);
//              }
//            });
//
//          } else {


//        });


//        loginstore.dispatch('loginBySms', {
//          mobile: page.mobile.trim(),
//          smscode:page.smscode.trim(),
//        })

            },
        }
    }
</script>

<style>


</style>
