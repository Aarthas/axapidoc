<template>
    <div style="display: flex;flex-direction: column;">
        <div style="height: 150px;">

        </div>


        <div style="margin-top:20px;text-align: center;">
            <x-button style="width: 150px;" @click.native="receive" type="primary" mini> 点击兑换</x-button>

        </div>
    </div>
</template>

<script>
    import Lib from 'assets/js/Lib';
    import {XButton,Alert,Toast} from 'vux';
    var page;
    export default {
        components: {XButton,Alert,Toast},
        created(){
            page=this;
        },
        methods:{
            receive: function () {

                Lib.axios.axios({

                    url:'',
                    loading:{
                        page:page,
                    },
                    success: function (basebean) {
                        page.$vux.alert.show({
                            title: '提示',
                            content: '领取优惠券成功',
                            onShow () {

                            },
                            onHide () {
                                page.$router.back(-1);
                            }
                        })
                    },
                    onerrcode:function (basebean) {
                        page.$vux.toast.show({
                            type:'cancel',
                            text: basebean.getMessage()
                        })
                    }

                });

            }
        }
    }
</script>

<style scoped>

</style>