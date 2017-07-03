<template>
    <div class="header">

        <div v-if="userinfo.islogin" class="login_view" style="padding-top: 10px;"  @click="$emit('jt_profile')">
            <img class="avatar"
                 src="http://onpxz5rdd.bkt.clouddn.com/ic_default.png">
            <div style="font-size: 16px;line-height: 1;text-align: center;color: #fff;margin-top:6px;">
                {{ userinfo.username}}

            </div>
            <div style="font-size: 13px;line-height: 1;text-align: center;color: #fff;margin-top:4px;">
                {{ userinfo.memberName}}

            </div>
        </div>
        <div v-else class="login_view" @click="$emit('jt_login')">
            <img class="avatar"
                 src="http://onpxz5rdd.bkt.clouddn.com/pic_info_unlogin.png">
            <div style="font-size: 16px;line-height: 1;text-align: center;color: #fff;margin-top:8px;">
                登录

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        components: {},
        data () {
            return {}
        },
        props: {
            userinfo: Object,

        },
        methods: {

            myfunc: function () {
                let that = this;
                that.$emit('exchange', this.item)
            }
        }
    }
</script>

<style scoped>
    .header {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #f03838;
        height: 170px;
        width: 100%;
        text-align: center;
    }

    .login_view {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin: 20px auto;
        width: 120px;
        height: 110px;
        /*margin-top: 30px;*/
        /*margin-bottom: 20px;*/
    }

    .avatar {
        display: inline-block;
        border: 2px solid #ffffff;
        height: 70px;
        width: 70px;
        border-radius: 50%;
    }
</style>