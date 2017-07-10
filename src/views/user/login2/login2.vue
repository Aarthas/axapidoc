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

            <x-input v-model="uname" title="" placeholder="手机号"></x-input>
            <x-input v-model="pwd" title="" placeholder="密码"></x-input>
        </group>


        <div class="btn-area">
            <x-button @click.native="doSubmit" type="primary"> 登录</x-button>
        </div>

        <div style="display: flex;justify-content: flex-end;flex-direction: row">

            <!--<router-link :to="{ path: '/loginbypwd'}">-->
            <div style="color: #02af00;font-size:14px;margin-right: 2em;margin-top: 10px;" v-on:click="goRest">重置密码</div>
            <!--</router-link>-->
        </div>


    </div>
    <!--</transition>-->
</template>


<script>

    import vcodecell from '../../../components/vcodecell.vue'
    import {Group, XInput, XButton} from 'vux'
    import Lib from 'assets/js/Lib';

    var page


    export default {

        components: {
            Group,
            XInput,
            XButton,
        },
        data () {
            return {
                uname: '13780082671',
                pwd: '123456a',
            };
        },
        computed: {},
        created () {
            page = this;
        },
        mounted () {


        },


        methods: {

            goRest:function () {
              Lib.go.go( '/views/user/reset.html')
            },

            doSubmit: function () {
                let params = {
                    username: page.uname,
                    password: page.pwd,
                };
                console.log(params)
                Lib.axios.axios({
                    showload:true,
                    page:page,
                    loadtext:"加载中",
                    method:'post',
                    params:params,
                    url: 'login',
                    success: function (basebean) {
                        console.log("localStorage.setItem(token)"+basebean.getData().sessionId);
                        localStorage.setItem("token",basebean.getData().sessionId);
                        Lib.go.go("/views/home/home.html#/mine");
                    }
                    ,onerrcode:function (basebean) {

                        Lib.vux.showtoast(page,basebean.getMessage());
                    }
                });

//

            },
        }
    }
</script>

<style>


</style>
