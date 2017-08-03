
<template>
    <div>
        <div>

            <group title="请输入用户信息">
                <YInput :item="{placeholder:'联系人',title:'联系人'}" v-model="p_contact"></YInput>
                <YInput :item="{placeholder:'联系电话',title:'联系电话',istype:'number'}" v-model="p_mobile"></YInput>

            </group>



            <group title="请选择社区">
                <picker  :data="newAreaData" :fixed-columns=3 :columns=3 v-model="year7ValueArr" @on-change="change" ref="picker1"></picker>
            </group>
            <group title="详细地址">
                <YInput :item="{placeholder:'详细地址'}" v-model="p_detail"></YInput>


            </group>

            <br>
            <div style="margin: 0 12px  12px;">
                <x-button @click.native="submit" type="primary"> 提交修改</x-button>
                <x-button  @click.native="deleteAddress"> 删除 </x-button>
            </div>
        </div>


    </div>
</template>

<script>
    import { Cell, Group, Picker, GroupTitle, XButton,Alert,Toast } from 'vux'
    import Lib from 'assets/js/Lib';
    import YInput from '../../../components/YInput.vue';
    import YSelect from '../../../components/YSelect.vue';

    var page;
    export default {
        components: {
            Picker,
            GroupTitle,
            XButton,
            Cell,
            Group,YInput,YSelect,Alert,Toast
        },

        data () {
            return {
                p_contact: "",
                p_mobile: "",
                p_detail:"",
                newAreaData:[],
                year7Value:"",
                year7ValueArr:[],
                addressId:"",
                shopId:"",


            }
        },
        computed:{
            stringChangeToArr:function(){
                return page.year7Value.split(',')
            }
        },
        created(){
            page =this;
            let query = page.$route.query;
            page.p_contact=query.consignee;
            page.p_mobile = query.mobile;
            page.p_detail=query.detailAddress;
            page.year7Value=query.areaId;
            page.year7ValueArr=this.stringChangeToArr;
            page.addressId=query.id;

        },

        mounted(){

            Lib.axios.axios({
                url: '/area',
                loading:{
                    page:page,
                },
                success: function (basebean) {
                    let data = basebean.getData();
                    var newAreaData = [];

                    data.forEach(function (value, index, array) {
                        newAreaData.push({name:value.areaName,value:value.areaId,parent:0,shopid:value.serialNumber})

                        value.areaViewModels.forEach(function (value, index, array) {
                            newAreaData.push({name:value.areaName,value:value.areaId,parent:value.parentId,shopid:value.serialNumber})

                            value.areaViewModels.forEach(function (value, index, array) {
                                newAreaData.push({name:value.areaName,value:value.areaId,parent:value.parentId,shopid:value.serialNumber})

                            });
                        });
                    });

                    page.newAreaData=newAreaData;

                }
            });
        },


        methods: {
            submit:function () {
                let str = page.$refs.picker1.getNameValues().replace(" ","#");
                let areaStr = str.replace(" ","#");
                console.log(page.addressId +"/"+page.p_contact +"/"+page.p_mobile +"/"+page.p_detail +"/"+page.shopId+"/"+ page.year7Value + areaStr+page.shopId)

                Lib.axios.axios({
                    method: "post",
                    url:"/address/edit",
                    data:{
                        id: page.addressId,
                        consignee:page.p_contact,
                        mobile:page.p_mobile,
                        area:areaStr,
                        areaId:page.year7Value,
                        detailAddress:page.p_detail,
                        isDefault:"false",
                        shopId:page.shopId
                    },
                    loading:{
                        page:page,
                    },
                    success: function (basebean) {
                        page.$vux.alert.show({
                            title: '提示',
                            content: '修改成功',
                            onShow () {

                            },
                            onHide () {
                                page.$router.go(-1);
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
            },
            deleteAddress:function () {
                let currentAddress = Lib.localStorage.getCurrentAddress();
                if (page.addressId==currentAddress.id){
                    Lib.localStorage.setCurrentAddress(null);
                }
                Lib.axios.axios({
                    method: "delete",
                    url:"/address/delete/"+page.addressId,
                    loading:{
                        page:page,
                    },
                    success: function (basebean) {
                        page.$vux.alert.show({
                            title: '提示',
                            content: '删除成功',
                            onShow () {

                            },
                            onHide () {
                                page.$router.go(-1);
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

            },
            change:function (newvalue) {
                console.log('new Value', newvalue);
                page.year7Value=newvalue[0]+","+newvalue[1]+","+newvalue[2];

                function findshopid(element) {

                    return element.value == newvalue[2];
                }

                let find = page.newAreaData.find(findshopid);

                page.shopId=find.shopid;
            }
        },

    }
</script>



<style lang="less">

</style>
