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
            <shop_pick :item=this.complaintPreData.shopsList ref="shop_pick"></shop_pick>
        </div>
        <group title="订单编号">
            <YInput :item="{placeholder:'请输入'}" v-model="p_orderNum"></YInput>
        </group>
        <group title="投诉的内容">
            <YTextArea :item="{placeholder:'请输入您要投诉的内容'}" v-model="p_content"></YTextArea>
        </group>
        <!---->
        <!--<div style="line-height: 48px;background-color: white;padding-left: 15px;font-size: 16px;color: #0bb20c">-->
        <!--请上传小票和商品照片-->
        <!--style="background-image:url(http://f11.baidu.com/it/u=3488398,1935781473&fm=76);"-->

        <!--</div>-->
        <div class="weui-cells weui-cells_form">
            <div class="weui-cell">
                <div class="weui-cell__bd">
                    <div class="weui-uploader">
                        <div class="weui-uploader__hd">
                            <p class="weui-uploader__title">请上传小票或商品照片</p>
                            <div class="weui-uploader__info">{{previewimages.length}}/4</div>
                        </div>
                        <div class="weui-uploader__bd">
                            <ul class="weui-uploader__files" id="uploaderFiles">


                                <li v-for="(file,index) in previewimages" class="weui-uploader__file"
                                    :style="{backgroundImage: 'url('+file+''}" @click="showPreview(index)">

                                </li>


                            </ul>

                            <div class="weui-uploader__input-box" v-show="previewimages.length < 4">
                                <span class="weui-uploader__input" @click="chooseImage"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="display: flex;justify-content: flex-start;margin-left: 30px;margin-right: 10px;padding-bottom: 10px;"
                 v-show="previewimages.length>0">
                <!--<div v-for="(file,index) in previewimages"  @click="delImage(index)" class="weui-msg__icon-area"><i class="weui-icon-cancel " style="font-size: 26px;"></i></div>-->
                <div style="margin-right: 54px;"><i class="weui-icon-cancel " style="font-size: 26px;"
                                                    v-show="previewimages.length>0" @click="delImage(0)"></i></div>
                <div style="margin-right: 54px;"><i class="weui-icon-cancel " style="font-size: 26px;"
                                                    v-show="previewimages.length>1" @click="delImage(1)"></i></div>
                <div style="margin-right: 54px;"><i class="weui-icon-cancel " style="font-size: 26px;"
                                                    v-show="previewimages.length>2" @click="delImage(2)"></i></div>
                <div><i class="weui-icon-cancel " style="font-size: 26px;" v-show="previewimages.length>3"
                        @click="delImage(3)"></i></div>
            </div>
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
    import shop_pick from '../../../views/complaint/submit/components/shop_pick.vue' ;

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
            cellhead, YTextArea, YInput, YSelect, shop_pick
        },
        data () {
            return {
                complaintPreData: {},
                showShops: false,
                p_orderNum: "",
                p_platform: -1,
                p_type: -1,
                p_content: "",
                p_contact: "",
                p_mobile: "",

                previewimages: [],

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

            axios.get("http://weixin.sanjiang.com/weichat-csr-web" + '/weixin/jsconfig?url=' + encodeURIComponent(window.location.href)).then(function (resp) {
                console.log(resp)
                /* console.log(resp)*/
                var res = resp.data;
                /* console.log(res);*/
                if (!res.success) {
                    alert(res.errmsg);
                    return;
                }
                res.data.debug = false;
                res.data.jsApiList = ['chooseImage', 'uploadImage', 'showPreview'];
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

            delImage: function (index) {
                console.log(index)
                page.previewimages.splice(index, 1)

            },
            showPreview: function (index) {
                wx.previewImage({
                    current: page.previewimages[index], // 当前显示图片的http链接
                    urls: page.previewimages // 需要预览的图片http链接列表
                });


            }
            ,
            submit: function () {
                console.log("submit")
                let localIds = [];
//                page.previewimages = ['weixin://resourceid/6756b6bc134e6c1e6a939c75dcdf475b', 'weixin://resourceid/645928247a501a3870db4446deaf8e44'];
                console.log(page.previewimages instanceof Array)
                page.previewimages.forEach(function (value, index, array) {
                    localIds.push(value)
                });
                console.log("ccc")
                console.log(localIds)
                alert("localIds=" + JSON.stringify(localIds))
                let serverIds = [];
                var syncUpload = function (localIds) {
                    var localId = localIds.pop();
                    wx.uploadImage({
                        localId: localId,
                        isShowProgressTips: 1,
                        success: function (res) {
                            var serverId = res.serverId; // 返回图片的服务器端ID
                            //其他对serverId做处理的代码
                            serverIds.push(serverId)
                            console.log("serverId1 = " + serverId)
                            console.log("serverIds 1= " + serverIds)
                            if (localIds.length > 0) {
                                syncUpload(localIds);
                            } else {
                                alert("syncUpload  SUCCESS")
                                console.log("aaa")

                                console.log(serverIds)
                                alert("serverIds" + JSON.stringify(serverIds))
                                axios(
                                    {
                                        method: "post",
                                        url: "http://weixin.sanjiang.com/weixin/image/upload",
                                        data: {serverIds: serverIds},
                                        responseType: 'json'
                                    })
                                    .then(function (resp) {

                                        alert("download from wxserver " + JSON.stringify(resp))
                                        if (resp.status == 200) {
                                            if (resp.data.success) {
                                                alert("img path  SUCCESS")
                                                let urlArray ;
                                                resp.data.data.forEach(function (value, index, array) {
                                                    urlArray.push(value)
                                                });
                                                console.log("submit p_platform = " + page.p_platform)
                                                console.log("submit p_type = " + page.p_type)
                                                console.log("submit" + page.$refs.shop_pick.p_areaindex)

                                                console.log("submit" + page.$refs.shop_pick.p_shopindex)
                                                if (page.$refs.shop_pick.p_areaindex <= 0) {
                                                    page.$vux.toast.show({
                                                        text: '请选择区域',
                                                        type: "text",
                                                        width: "19em"
                                                    })
                                                    return;
                                                }
                                                if (page.$refs.shop_pick.p_shopindex <= 0) {
                                                    page.$vux.toast.show({
                                                        text: '请选择门店',
                                                        type: "text",
                                                        width: "19em"
                                                    })
                                                    return;
                                                }

                                                let shopid = page.complaintPreData.shopsList[page.$refs.shop_pick.p_areaindex].shops[page.$refs.shop_pick.p_shopindex].shopId
                                                console.log("submit shop =" + shopid)
                                                console.log("submit p_orderNum =" + page.p_orderNum)
                                                console.log("submit p_content =" + page.p_content)
                                                console.log("submit  p_contact = " + page.p_contact)
                                                console.log("submit   p_mobile =" + page.p_mobile)
                                                console.log("submit   previewimages =" + page.previewimages)
                                                let code = Lib.Utils.getQueryString("code");
                                                Lib.axios.axios({
                                                    method: "post",

                                                    url: 'complaint/addComplaintFromWx',
                                                    data: {

                                                        platform: page.p_platform,
                                                        shopId: shopid,
                                                        orderId: page.p_orderNum,
                                                        complainType: page.p_type,
                                                        complainContent: page.p_content,
                                                        contact: page.p_contact,
                                                        mobile: page.p_mobile,
                                                        imgUrls: page.previewimages,
                                                        wxcode: code,
                                                    },
                                                    success: function (basebean) {
                                                        alert("submit zSUCCESS")
                                                    }
                                                })
                                            }
                                        }

                                    });

                            }
                        }
                    });
                };


                syncUpload(localIds);


            }
            ,
            chooseImage: function () {
                console.log("chooseIamage")

                wx.chooseImage({
                    count: 4 - page.previewimages.length, // 默认9
                    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                    success: function (res) {
                        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片

                        localIds.forEach(function (value, index, array) {
                            page.previewimages.push(value)
                        });
                    }
                });


            }

        }
    }


</script>

<style>


</style>
