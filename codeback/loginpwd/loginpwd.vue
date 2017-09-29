<template>
  <!--<transition name="slide">-->
  <div>
    <!--<x-header>This is the page title.</x-header>-->
    <div style="height: 30px"/>
    <div style="display: flex;justify-content: center;align-items: center;">
      <img style="width: 90px;height: 90px;border-radius: 50%" src="../assets/app_icon.png">

    </div>
    <div style="height: 10px"/>
    <group>
      <x-input v-model="username" title=" " placeholder="三江购物网/App用户名"></x-input>
      <x-input v-model="password" title=" " placeholder="密码" type="password"></x-input>

    </group>

    <div style="display:flex;justify-content: center;align-items: center;">
      <div style="color: #f03838;font-size: 16px;margin-top: 10px">{{codeMessage}}</div>
    </div>

    <div class="btn-area">
      <x-button @click.native="login" type="primary"> 登录</x-button>
    </div>

    <div style="display: flex;justify-content: flex-start;flex-direction: row">

      <router-link :to="{ name: 'findpwd'}">
        <span style="color: #56b0f5;font-size:14px;margin-left: 2em;margin-top: 10px;">找回密码</span>
      </router-link>
    </div>

  </div>
  <!--</transition>-->
</template>


<script>


  import { Group, XInput, XButton } from 'vux'
  import { XHeader } from 'vux'

  var page





  export default {

    components: {
      Group,
      XInput,
      XHeader,
      XButton,
      Loading
    },
    data () {
      return {

        codeMessage: "",
        username: '',
        password: ''
      };
    },
    created () {
      page = this;

    },
    mounted () {

      console.log("mounted loginbypwd")
      FineWork.global.setCurrentPage( page );

    },
    updated () {
      console.log("updated")

    },
    activated () {
      console.log("activated  loginbypwd")
      FineWork.global.setCurrentPage( page );


    },
    deactivated () {

      console.log("deactivated  loginbypwd")
    },

    destroyed () {
      console.log("destroyed")

    },

    methods: {

      login: function ()
      {

        let params = {
          username: page.username.trim(),
          password: page.password.trim()
        };

        /**
         *
         * @type {{username: (any), password: (any)}}
         *    let user = {
          username: page.username,
          password: page.password
             username: "13780082671",
          password: "123456a"
        };
         */


        if ( params.username.length == 0 )
        {
          page.codeMessage = "用户名不能为空"

          return;
        }
        if ( params.password.length == 0 )
        {
          page.codeMessage = "密码不能为空"

          return;
        }

        FineWork.ApiUser.userApi.login( params, function ( basebean )
        {
          if ( basebean.isSuccess() )
          {

              FineWork.MyRoute.redirectCenter(basebean);

          } else
          {
            page.codeMessage = basebean.getMessage()

          }


        } )


      }
    }
  }
</script>

<style>


</style>
