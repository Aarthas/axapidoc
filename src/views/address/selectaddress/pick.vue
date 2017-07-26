<template>
    <div>
        <div>
            <!--收货信息-->
            <div style="display:flex;flex-direction:column;background-color: white;margin-top: 8px;" @click="choosePick">
                <div style="background-image: url('http://onpxz5rdd.bkt.clouddn.com/ic_address_line.png');background-size: contain;height: 2px;width: 100%"></div>
                <div  class="orderInfo">[历史自提] {{historyPickAddress.consignee}}   {{historyPickAddress.mobile}}</div>
                <div  class="orderInfo">自提地址：{{historyPickAddress.shopName}} | {{historyPickAddress.detailAddress}}</div>
                <div  style="height: 8px;background-color: white;"></div>
                <div style="background-image: url('http://onpxz5rdd.bkt.clouddn.com/ic_address_line.png');background-size: contain;height: 2px;width: 100%"></div>
            </div>
            <group title="请输入用户信息">
                <YInput :item="{placeholder:'联系人',title:'联系人'}" v-model="p_contact"></YInput>
                <YInput :item="{placeholder:'联系电话',title:'联系电话',istype:'number'}"  v-model="p_mobile"></YInput>

            </group>


            <group title="请选择社区">
                <picker :data="newAreaData" :fixed-columns=2 :columns=2 v-model="pickValue"  ref="picker1"></picker>
            </group>
            <group-title>详细地址:{{detail_address}}</group-title>


            <br>
            <div style="margin: 0 12px  12px;">
                <x-button @click.native="submit" type="primary">保存并使用</x-button>
            </div>
        </div>


    </div>
</template>

<script>
    import {Cell, Group, Picker, GroupTitle, XButton, Alert, Toast} from 'vux'
    import Lib from 'assets/js/Lib';
    import YInput from '../../../components/YInput.vue';
    import YSelect from '../../../components/YSelect.vue';
    let isMall = Lib.Utils.getQueryString("isMall");
    var page;
    export default {
        components: {
            Picker,
            GroupTitle,
            XButton,
            Cell,
            Group, YInput, YSelect, Alert, Toast
        },

        data () {
            return {
                p_contact: "",
                p_mobile: "",
                p_detail: "",
                newAreaData: [],
                pickValue: [],
                detail_address: '',
                shopId:"",
                historyPickAddress:{}
            }
        },
        computed: {},
        created(){
            page = this;


        },

        mounted(){
           //门店选择器数据
            Lib.axios.axios({
                url: '/pickShops',
                success: function (basebean) {
                    let data = basebean.getData();
                    console.log(data)
                    var newAreaData = [];
                    data.forEach(function (value, index, array) {

                        newAreaData.push({name: value.area, value: value.areaId, parent: 0})


                        value.shops.forEach(function (value2, index2, array) {
                            newAreaData.push({name: value2.name, value: value2.name, parent: value.areaId,address:value2.address,shopId:value2.shopId})
                        });
                    });
                    console.log(data)
                    console.log(newAreaData)
                    page.newAreaData = newAreaData;

                }
            });
            //历史自提门店
            Lib.axios.axios({
                url: 'pickShops/getShopPick',
                loading:{
                    page:page,
                },
                success: function (basebean) {
                    page.historyPickAddress = basebean.getData();
                }
            });
        },

        watch: {
            pickValue (newvalue) {
                console.log(newvalue)
                let shopname = newvalue[1]
                console.log(shopname)

                function findone(element) {
                    console.log("aaa1")
                    console.log(element)
                    return element.name == shopname;
                }

                let find = page.newAreaData.find(findone);
                console.log("aaa2")
                console.log(find)
                page.detail_address = find.address;
                page.shopId=find.shopId;
                console.log("a1"+ page.detail_address)

            }
        },
        methods: {
            submit: function () {
               if(page.p_contact==''){
                   page.$vux.toast.show({
                       type:'cancel',
                       text: '请输入联系人'
                   });
                   return;
               }else if(page.p_mobile==''){
                   page.$vux.toast.show({
                       type:'cancel',
                       text: '请输入联系方式'
                   });
                   return;
               }
                Lib.axios.axios({
                    method: "post",
                    url:"/pickShops/save",
                    data:{
                        consignee:page.p_contact,
                        mobile:page.p_mobile,
                        shopId:page.shopId
                    },
                    loading:{
                        page:page,
                    },
                    success: function (basebean) {
                        console.log('返回的'+basebean.getData())
                        Lib.localStorage.setCurrentAddress(basebean.getData());
                        if (isMall==0){
                            Lib.go.jt_home("cart");
                        }else{
                            Lib.go.jt_home();
                        }

                    },
                    onerrcode:function (basebean) {
                        page.$vux.toast.show({
                            type:'cancel',
                            text: basebean.getMessage()
                        })

                    }

                });

            },
            choosePick:function () {
                Lib.localStorage.setCurrentAddress(page.historyPickAddress);
//                console.log(window.document.referrer)
//                window.location.href = window.document.referrer;
                if (isMall==0){
                    Lib.go.jt_home("cart");
                }else{
                    Lib.go.jt_home();
                }
            }
        },


    }
</script>


<style lang="less">
    .orderInfo{
        color: #666666;
        margin-left: 8px;
        margin-top: 8px;
    }
</style>
