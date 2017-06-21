<template>
    <div>
        <!--<aaa></aaa>-->

        <group title="请选择购买平台">
            <YSelect :propsData="{title:'购买平台', list:complaintPreData.platforms}" v-model="p_platform"></YSelect>
        </group>
        <group title="请选择投诉类型">
            <YSelect :propsData="{title:'投诉类型', list:complaintPreData.types}" v-model="p_type"></YSelect>
        </group>

        <div v-show="p_platform != 10007">
            <group title="请选择购买门店">
                <!--<cellhead title="请选择购买门店"></cellhead>-->
                <!--<cell title="生风电"  is-link @click.native="chooseShop">-->
                <!--<selector placeholder="请选择省份"title="省份" name="district" :options="complaintPreData.types" @on-change="onChange"></selector>-->
                <!--</cell>-->
                <YSelect :propsData="{title:'区域', placeholder:'aa',list:complaintPreData.types}"
                         v-model="p_type"></YSelect>
                <YSelect :propsData="{ list:complaintPreData.types}" v-model="p_type"></YSelect>
                <div style="font-size: 14px;margin-left: 20px;margin-bottom: 12px;">横街镇东村鄞县大道西段南面横街镇东村鄞县大道西段南面</div>
            </group>
        </div>
        <group title="订单编号">
            <YInput :item="{placeholder:'请输入'}" v-model="p_orderNum"></YInput>
        </group>
        <group title="投诉的内容">
            <YTextArea :item="{placeholder:'请输入您要投诉的内容'}" v-model="p_content"></YTextArea>
        </group>
        <!---->
        <div style="line-height: 48px;background-color: white;padding-left: 15px;font-size: 16px;color: #0bb20c">
            请上传小票和商品照片




        </div>
        <div style="display: flex;flex-direction: row;justify-content: flex-start;background-color: white;padding-bottom: 10px;">

            <div class="img_pane"
                 :style="{backgroundImage: 'url(http://onpxz5rdd.bkt.clouddn.com/ic_take_phote.png'}"
                 @click="chooseShop"></div>
            <!--<div class="img_pane"-->
            <!--:style="{backgroundImage: 'url(http://onpxz5rdd.bkt.clouddn.com/ic_take_phote.png'}"></div>-->
            <!--<div class="img_pane"-->
            <!--:style="{backgroundImage: 'url(http://onpxz5rdd.bkt.clouddn.com/ic_take_phote.png'}"></div>-->
            <!--<div class="img_pane"-->
            <!--:style="{backgroundImage: 'url(http://onpxz5rdd.bkt.clouddn.com/ic_take_phote.png'}"></div>-->
        </div>


        <group title="">
            <YInput :item="{placeholder:'联系人'}" v-model="p_contact"></YInput>
            <YInput :item="{placeholder:'联系电话'}" v-model="p_mobile"></YInput>
        </group>

        <div style="margin: 30px  12px;">
            <x-button @click.native="submit" type="primary"> 提交</x-button>

        </div>
    </div>
</template>

<script>
    console.log("app start")
    //  console.log( window.location )

    import {XButton, Group, Cell, Selector} from 'vux'
    import xcell from '../../../components/XCell.vue';
    import cellhead from '../../../components/CellHead.vue';
    import YTextArea from '../../../components/YTextArea.vue';
    import YInput from '../../../components/YInput.vue';
    import YSelect from '../../../components/YSelect.vue';
    import Lib from 'assets/js/Lib';
    import axios from 'axios';
    var page


    export default {

        components: {
            XButton,
            Group,
            Cell,
            Selector,
            xcell,
            cellhead, YTextArea, YInput, YSelect
        },
        data () {
            return {
                complaintPreData: {},
                showShops: false,
                p_orderNum: "",
                p_platform: "",
                p_type: "",
                p_content: "",
                p_contact: "",
                p_mobile: "",
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
            axios.get("http://weixin.sanjiang.com/weichat-csr-web" + '/weixin/jsconfig?url=' + window.location.href).then(function (resp) {
                console.log(resp)
                /* console.log(resp)*/
                var res = resp.data;
                /* console.log(res);*/
                if (!res.success) {
                    alert(res.errmsg);
                    return;
                }
                res.data.debug = false;
                res.data.jsApiList = ['chooseImage', 'uploadImage'];
                wx.config(res.data);
            }, function (resp) {
                console.log("resp=" + resp)
            });

            wx.ready(function () {
                wx.hideOptionMenu();
                console.log("ready")

            });

            wx.error(function (res) {
//        console.log(res);
                console.log("error")
            });


        },

        methods: {
            submit: function () {
                console.log("submit")
                console.log("submit" + page.p_platform)
                console.log("submit" + page.p_content)
//                window.location.href = "./result.html"
            },
            chooseImage: function () {
                console.log("chooseIamage")

                wx.chooseImage({
                    count: 4, // 默认9
                    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                    success: function (res) {
                        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                        alert(JSON.stringify(res))
                        alert(localIds[0])
//                        wx.uploadImage({
//                            localId: localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
//                            isShowProgressTips: 1, // 默认为1，显示进度提示
//                            success: function (res) {
//                                var serverId = res.serverId; // 返回图片的服务器端ID
//                                alert("serverId="+serverId)
//                            }
//                        });
                    }
                });


            },
            chooseShop: function () {
                page.showShops = true;
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
        margin-left: 12px;
    }

</style>
