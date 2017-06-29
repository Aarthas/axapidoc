
<template>
    <div>
        <div>

            <group title="请输入用户信息">
                <YInput :item="{placeholder:'联系人',title:'联系人'}" v-model="p_contact"></YInput>
                <YInput :item="{placeholder:'联系电话',title:'联系电话',istype:'number'}" v-model="p_mobile"></YInput>

            </group>


            <group title="请选择社区">
            <picker  :data='newAreaData' :fixed-columns=3 :columns=3 v-model='year7Value' @on-change='change' ref="picker1"></picker>
            </group>
            <group title="详细地址">
                <YInput :item="{placeholder:'详细地址'}" v-model="p_contact"></YInput>


            </group>
            <!--<x-button @click.native="setData1" type="primary">set Value to ["USA", "usa002", "0005"]</x-button>-->
            <!--<x-button @click.native="setData2" type="primary">set Value to ["china", "china002", "gz"]</x-button>-->
            <!--<x-button @click.native="setList" type="primary">set List</x-button>-->
            <br>
            <div style="margin: 0 12px  12px;">
                <x-button @click.native="submit" type="primary"> 提交</x-button>
                <x-button @click.native="logout"> 删除 </x-button>

            </div>
        </div>


    </div>
</template>

<script>
    import { Cell, Group, Picker, GroupTitle, XButton } from 'vux'
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
            Group,YInput,YSelect
        },
        methods: {
            change:function () {
                
            }
        },
        watch: {

        },
        data () {
            return {
                p_contact: "",
                p_mobile: "",
                newAreaData:[],
                year7Value:['33020300000000000', '33020300200010000', '33020300200112111']
            }
        },
        mounted(){

// 隐藏
            page = this;
            Lib.axios.axios({
                url: '/area',
                success: function (basebean) {
                    let data = basebean.getData();
                    let newAreaData = [];
                    data.forEach(function (value, index, array) {
                        newAreaData.push({name:value.areaName,value:value.areaId,parent:0})

                        value.areaViewModels.forEach(function (value, index, array) {
                            newAreaData.push({name:value.areaName,value:value.areaId,parent:value.parentId})

                            value.areaViewModels.forEach(function (value, index, array) {
                                newAreaData.push({name:value.areaName,value:value.areaId,parent:value.parentId})

                            });
                        });
                    });


                    page.newAreaData=newAreaData;

                }
            });
        },
    }
</script>



<style lang="less">

</style>
