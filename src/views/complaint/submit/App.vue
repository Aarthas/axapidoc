<template>
    <div>

        <group title="请选择购买门店">
            <!--<cellhead title="请选择购买门店"></cellhead>-->
            <cell title="生风电" inline-desc='高桥镇望童路928弄西堤阳光小区' is-link @click.native="onitemClick(item)"></cell>
        </group>

        <group title="订单编号">
            <YInput :item="{placeholder:'请输入'}"></YInput>
        </group>
        <group title="投诉的内容">
            <YTextArea :item="{placeholder:'请输入您要投诉的内容'}"></YTextArea>
        </group>
        <!---->
        <div style="line-height: 48px;background-color: white;padding-left: 15px;font-size: 16px;color: #0bb20c">
            请上传小票和商品照片
        </div>
        <div style="display: flex;flex-direction: row;justify-content: space-around;background-color: white;padding-bottom: 10px;">

            <div class="img_pane"
                 :style="{backgroundImage: 'url(http://onpxz5rdd.bkt.clouddn.com/ic_take_phote.png'}"></div>
            <div class="img_pane"
                 :style="{backgroundImage: 'url(http://onpxz5rdd.bkt.clouddn.com/ic_take_phote.png'}"></div>
            <div class="img_pane"
                 :style="{backgroundImage: 'url(http://onpxz5rdd.bkt.clouddn.com/ic_take_phote.png'}"></div>
            <div class="img_pane"
                 :style="{backgroundImage: 'url(http://onpxz5rdd.bkt.clouddn.com/ic_take_phote.png'}"></div>
        </div>


        <group title="">
            <YInput :item="{placeholder:'联系人'}"></YInput>
            <YInput :item="{placeholder:'联系电话'}"></YInput>
        </group>

        <div style="margin: 30px  12px;">
           <x-button @click.native="submit" type="primary" > 提交</x-button>

        </div>
    </div>
</template>

<script>
    console.log("app start")
    //  console.log( window.location )

    import {Scroller, Divider, Spinner, XButton, Group, Cell, XInput, XTextarea} from 'vux'
    import xcell from '../../../components/XCell.vue';
    import cellhead from '../../../components/CellHead.vue';
    import YTextArea from '../../../components/YTextArea.vue';
    import YInput from '../../../components/YInput.vue';
    import Lib from 'assets/js/Lib';

    var page


    export default {

        components: {
            Scroller,
            Divider,
            Spinner,
            XButton,
            Group,
            Cell,
            xcell,
            cellhead, YTextArea, YInput
        },
        data () {
            return {
                complaintPreData: {}

            };
        },
        created () {
            page = this;

        },
        mounted () {
            Lib.axios.axios({
                url: 'complaint/getComplaintPreData',

                success: function (basebean) {
                    page.complaintPreData = basebean.getData();

                }
            })


        },

        methods: {
            submit: function () {
                console.log("submit")
                window.location.href = "./result.html"
            }
        }
    }

</script>

<style>

    .img_pane {

        background-size: contain;
        background-repeat: no-repeat;
        height: 80px;
        width: 80px;
    }

</style>
