<template>
    <div>


        <div>aaaa</div>
        <!--<div class="weui-cells">-->


            <!--<xcell title="手机" :value="userInfo.mobile"></xcell>-->

            <!--<xcell title="昵称" :value="userInfo.nickname"></xcell>-->

            <!--<xcell title="性别" :value="userInfo.sexName"></xcell>-->

            <!--<xcell title="生日" :value="userInfo.birthdayStr" @click.native="aa" ></xcell>-->

            <!--&lt;!&ndash;<xcell title="到期日" :value="info.expiryDate"></xcell>&ndash;&gt;-->


            <!--&lt;!&ndash;<xcell title="使用状态" :value="info.cardStateStr"></xcell>&ndash;&gt;-->
        <!--</div>-->
    </div>
</template>


<script>


    import Lib from 'assets/js/Lib';
//    import xcell from '../../../components/XCell.vue';
    var page


    export default {

        components: {
//            xcell
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
//            let token = Lib.Utils.getQueryString("token");
//            Lib.M.ajax({
//                method: "get",
//                'url': 'users/me',
//                headers:{
//                    "x-auth-token":"dcde663f-538d-4574-b5e2-dc2e057b5bb3"
//                },
//                'success': function (basebean) {
//                    console.log(basebean.getData())
//                    if (basebean.getData().sex == 0) {
//                        basebean.getData().sexName = "保密"
//                    }
//                    else if (basebean.getData().sex == 1) {
//                        basebean.getData().sexName = "男"
//                    }
//                    else if (basebean.getData().sex == 2) {
//                        basebean.getData().sexName = "女"
//                    }
//
//                    var date = new Date();
//                    date.setTime( basebean.getData().birthday);
//                    basebean.getData().birthdayStr =  date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
//                    page.userInfo = basebean.getData();
//                }
//            });


        }, activated () {


        },
        methods: {
            aa:function () {
                console.log("aaa")
            }
        }
    }
</script>

<style>


</style>
