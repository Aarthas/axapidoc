<template>
    <div>
        <div>
            <group>
                <x-input title="优惠码:" placeholder="请输入优惠码" v-model="cnumber"></x-input>
            </group>

        </div>

        <div style="margin: 30px  12px;">
            <x-button @click.native="submit" type="primary"> 确定</x-button>

        </div>
    </div>
</template>

<script>
    import Lib from 'assets/js/Lib';
    import { XImg,Group,XInput,XButton,Alert,Toast } from 'vux'
    var page;
    export default {
        components: {
            Group,
            XInput,
            XImg,
            XButton,
            Alert,
            Toast
        },
        data(){
            return{
                cnumber:""
            }
        },
        created () {
            page = this;


        },

        methods: {
            submit: function () {


                Lib.axios.axios({
                    method: "post",
                    url:"/coupons/exchange",
                    data:{
                        volumeNumber: page.cnumber,
                    },
                    success: function (basebean) {
                        console.log("成功");
                        page.$vux.alert.show({
                            title: '提示',
                            content: '兑换成功',
                            onShow () {

                            },
                            onHide () {

                            }
                        })

                    },
                    onerrcode:function (basebean) {
                         console.log("失败");

                        page.$vux.toast.show({
                            type:'cancel',
                            text: basebean.getMessage()
                        })

                    }

                });


            },


        }

    }
</script>

<style scoped>

</style>