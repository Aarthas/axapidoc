<template>
    <div style="display:flex;flex-direction: column;text-align: center;">

        <div >
            <img background-size="cover" class="ximg-demo" src="http://ogs44wdir.bkt.clouddn.com/iccard.png">
        </div>

        <div>
            <group>
               <x-input title="IC卡卡号:" placeholder="请输入13位卡号" :max=13  v-model="icnumber" @on-change="change"></x-input>
            </group>
           <div v-if="isShow==true"style="height: 40px;background-color: #ffffff;">
            <div  style="line-height: 40px;text-align: center;font-size: 17px;" v-if="isExited==true"  >您的IC卡余额：{{icqueryReturnData.balance}}元</div>
            <div  style="line-height: 40px;text-align: center;font-size: 17px;color: #f03838;" v-else >{{errMessage}} </div>
           </div>
        </div>

        <div style="margin: 30px  12px;">
            <x-button @click.native="icquery" type="primary"> 查询</x-button>

        </div>
    </div>
</template>

<script>
    import { XImg,Group,XInput,XButton } from 'vux'
    import Lib from 'assets/js/Lib';
    var page;
    export default {
        components: {
            Group,
            XInput,
            XImg,
            XButton
        },

        data(){

            return{
                icnumber:"",
                isShow:false,
                isExited:false,
                icqueryReturnData:{},
                errMessage:""
            }
        },
        created () {
            page = this;

        },
        methods: {
            icquery: function () {

                if (page.icnumber.length != 13) {
                    Lib.uiutil.showtoast(page, '请输入13位卡号')
                    return;
                }
                Lib.axios.axios({

                    url:"/iccard/getICCardInfo?cardNo="+page.icnumber,
                    loading:{
                        page:page,
                    },
                    success: function (basebean) {

                        page.icqueryReturnData = basebean.getData();
                        page.isShow=true;
                        page.isExited=true;

                    },
                    onerrcode:function (basebean) {

                        page.isShow=true;
                        page.isExited=false;
                        page.errMessage=basebean.getMessage();

                    }

                });


            },
            change (val) {
                page.isShow=false;
            },

        }

    }
</script>

<style scoped>
    .ximg-demo {
        mode:aspectFit;width:100%;
        height:auto;
        border-radius: 1px;
        margin-top :10px;
    }


</style>