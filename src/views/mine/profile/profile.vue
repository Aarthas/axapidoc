<template>
    <div>



        <div class="weui-cells">


            <xcell title="手机" :value="userInfo.mobile"></xcell>

            <xcell title="昵称" :value="userInfo.nickname"></xcell>

            <xcell title="性别" :value="userInfo.sexName"></xcell>

            <xcell title="生日" :value="userInfo.birthdayStr" @click.native="aa" ></xcell>

            <!--<xcell title="到期日" :value="info.expiryDate"></xcell>-->


            <!--<xcell title="使用状态" :value="info.cardStateStr"></xcell>-->
        </div>

        <div class="btn-area">

            <x-button @click.native="logout"> 切换账号 </x-button>

        </div>
    </div>
</template>


<script>

    import xcell from '../../../components/XCell.vue';
    import {Group, XButton, Loading} from 'vux'
    import Lib from 'assets/js/Lib';

    var page


    export default {

        components: {
            xcell,XButton
        },
        data () {
            return {

                userInfo: {
                    username: "",
                    cardNum: "",
                }
            };
        },
        created () {
            page = this;

        },
        mounted () {

            Lib.axios.axios({
                method: "get",
                'url': 'users/me',
                'success': function (basebean) {
                    console.log(basebean.getData())
                    if (basebean.getData().sex == 0) {
                        basebean.getData().sexName = "保密"
                    }
                    else if (basebean.getData().sex == 1) {
                        basebean.getData().sexName = "男"
                    }
                    else if (basebean.getData().sex == 2) {
                        basebean.getData().sexName = "女"
                    }

                    var date = new Date();
                    date.setTime( basebean.getData().birthday);
                    basebean.getData().birthdayStr =  date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
                    page.userInfo = basebean.getData();
                }
            });


        },
        methods: {
            logout:function () {
                console.log("aaa")
            }
        }
    }
</script>

<style>


</style>
