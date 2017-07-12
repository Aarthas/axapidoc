<template>
    <div>
        <div>

            <group title="请输入用户信息">
                <YInput :item="{placeholder:'联系人',title:'联系人'}" v-model="p_contact"></YInput>
                <YInput :item="{placeholder:'联系电话',title:'联系电话',istype:'number'}" v-model="p_mobile"></YInput>

            </group>


            <group title="请选择社区">
                <picker :data="newAreaData" :fixed-columns=2 :columns=2 v-model="pickValue" ref="picker1"></picker>
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
                pickValue: 0,
                detail_address: '',
            }
        },
        computed: {},
        created(){
            page = this;


        },

        mounted(){

            Lib.axios.axios({
                url: '/pickShops',
                success: function (basebean) {
                    let data = basebean.getData();
                    console.log(data)
                    var newAreaData = [];
                    data.forEach(function (value, index, array) {

                        newAreaData.push({name: value.area, value: value.areaId, parent: 0})


                        value.shops.forEach(function (value2, index2, array) {
                            newAreaData.push({name: value2.name, value: value2.name, parent: value.areaId,address:value2.address})
                        });
                    });
                    console.log(data)
                    console.log(newAreaData)
                    page.newAreaData = newAreaData;

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

                console.log("a1"+ page.detail_address)

            }
        },
        methods: {
            submit: function () {


            },

        },

    }
</script>


<style lang="less">

</style>
