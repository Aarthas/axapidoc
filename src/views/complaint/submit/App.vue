<template>
    <div>
        <!--<aaa></aaa>-->


        <group title="请选择购买平台">
            <YSelect :propsData="{title:'购买平台',require:true, list:complaintPreData.platforms}"
                     v-model="p_platform"></YSelect>
        </group>
        <group title="请选择投诉类型">
            <YSelect :propsData="{title:'投诉类型',require:true, list:complaintPreData.types}" v-model="p_type"></YSelect>
        </group>

        <div v-show="p_platform != 10007">
            <shop_pick :item=this.complaintPreData.shopsList ref="shop_pick"></shop_pick>
        </div>
        <group title="订单编号">
            <YInput :item="{placeholder:'请输入',istype:'number'}" v-model="p_orderNum"></YInput>
        </group>
        <group title="投诉的内容">
            <YTextArea :item="{placeholder:'请输入您要投诉的内容(必输)'}" v-model="p_content"></YTextArea>
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


                                <!--<li v-for="(file,index) in previewimagesBase64" class="weui-uploader__file"-->
                                <!--:style="{backgroundImage: 'url('+file+''}" @click="showPreview(index)">-->

                                <!--</li>-->
                                <img v-for="(file,index) in previewimages" class="weui-uploader__file"
                                     :src="file"
                                     @click="showPreview(index)"/>


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
            <YInput :item="{placeholder:'联系电话(必输)',istype:'number'}" v-model="p_mobile"></YInput>
        </group>

        <div style="margin: 30px  12px;">
            <x-button @click.native="submit" type="primary" :disabled="submitDisabled"> 提交</x-button>

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
    import shop_pick from '../../../components/address/shop_pick.vue' ;

    import Lib from 'assets/js/Lib';
    import axios from 'axios';
    var page

    var showalert = false;

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
                submitDisabled: false,
                previewimages: [],
//                previewimagesBase64: [],
            };
        },

        created () {
            page = this;

        },
        mounted () {
            console.log("getComplaintPreData")
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
                res.data.jsApiList = ['chooseImage', 'uploadImage', 'showPreview', 'getLocalImgData'];
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
//                page.previewimagesBase64.splice(index, 1)
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
                page.submitDisabled = true;

                setTimeout(function () {
                    page.submitDisabled = false;
                }, 1500)


                let shopid
                if (page.$refs.shop_pick.p_areaindex >= 0 && page.$refs.shop_pick.p_shopindex >= 0) {
                    let shopsList = page.complaintPreData.shopsList;
                    if (shopsList != null && shopsList.length > 0) {
                        let a = shopsList[page.$refs.shop_pick.p_areaindex];
                        if (a != null && a.shops.length > 0) {
                            shopid = a.shops[page.$refs.shop_pick.p_shopindex].shopId
                        }

                    }


                } else {
                    shopid = null;
                }

                console.log("submit")
                console.log("submit p_platform = " + page.p_platform)
                console.log("submit p_type = " + page.p_type)
                console.log("submit p_platform = " + page.p_platform)
                console.log("submit p_type = " + page.p_type)
                console.log("submit p_areaindex" + page.$refs.shop_pick.p_areaindex)
                console.log("submit p_shopindex" + page.$refs.shop_pick.p_shopindex)
                console.log("submit shopid" + shopid)
                console.log("submit p_orderNum =" + page.p_orderNum)
                console.log("submit p_content =" + page.p_content)
                console.log("submit  p_contact = " + page.p_contact)
                console.log("submit   p_mobile =" + page.p_mobile)
                console.log("submit   previewimages =" + page.previewimages)
                console.log("submit   code =" + Lib.Utils.getQueryString("code"))

                if (page.p_platform <= 0) {
                    Lib.uiutil.showtoast(page, '请选择平台')

                    return;
                }
                if (page.p_type <= 0) {
                    Lib.uiutil.showtoast(page, '请选择投诉类型')

                    return;
                }

//                if (page.$refs.shop_pick.p_areaindex < 0) {
//                    Lib.uiutil.showtoast(page, '请选择区域')
//                    return;
//                }
//                if (page.$refs.shop_pick.p_shopindex <= 0) {
//                    Lib.uiutil.showtoast(page, '请选择门店')
//                    return;
//                }
                if (page.p_content == null || page.p_content.length == 0) {
                    Lib.uiutil.showtoast(page, '请输入投诉的内容')

                    return;
                }
                if (page.p_mobile == null || page.p_mobile.length == 0) {
                    Lib.uiutil.showtoast(page, '请输入联系电话')

                    return;
                }
//                let shopid
//                if (page.$refs.shop_pick.p_areaindex > 0 && page.$refs.shop_pick.p_shopindex >= 0) {
//                    shopid = page.complaintPreData.shopsList[page.$refs.shop_pick.p_areaindex].shops[page.$refs.shop_pick.p_shopindex].shopId
//
//                } else {
//                    shopid = null;
//                }

//                console.log("submit shop =" + shopid)


                if (page.previewimages.length > 0) {
                    Lib.vux.showLoad(page, '正在提交')
                    let localIds = [];

                    page.previewimages.forEach(function (value, index, array) {
                        localIds.push(value)
                    });
                    if (showalert)
                        alert("localIds=" + JSON.stringify(localIds))
                    let serverIds = [];

                    page.syncUploadImage(localIds, serverIds, function (serverIds) {
                        if (showalert)
                            alert("syncUpload  SUCCESS")
                        console.log("aaa")

                        console.log(serverIds)
                        if (showalert)
                            alert("serverIds" + JSON.stringify(serverIds))


                        let data = {
                            platform: page.p_platform,
                            shopId: shopid,
                            orderId: page.p_orderNum,
                            complainType: page.p_type,
                            complainContent: page.p_content,
                            contact: page.p_contact,
                            mobile: page.p_mobile,
                            serverIds: serverIds,
                            wxcode: Lib.Utils.getQueryString("code")
                        }
                        if (showalert)
                            alert("addComplaintFromWx data" + JSON.stringify(data))
                        page.addComplaintFromWx(data)

                    });
                } else {
                    Lib.vux.showLoad(page, '正在提交')
                    let data = {

                        platform: page.p_platform,
                        shopId: shopid,
                        orderId: page.p_orderNum,
                        complainType: page.p_type,
                        complainContent: page.p_content,
                        contact: page.p_contact,
                        mobile: page.p_mobile,
                        serverIds: [],
                        wxcode: Lib.Utils.getQueryString("code")
                    }
                    if (showalert)
                        alert("addComplaintFromWx data" + JSON.stringify(data))
                    page.addComplaintFromWx(data)
                }


            },
            addComplaintFromWx: function (data) {

                Lib.axios.axios({
                    method: "post",
                    url: 'complaint/addComplaintFromWx',
                    data: data,
                    success: function (basebean) {
                        if (showalert)
                            alert("submit SUCCESS")
                        window.location.replace("./result.html")
                    },
                    onerrcode: function (basebean) {
                        page.$vux.toast.show({
                            text: basebean.getMessage(),
                            type: "text",
                            width: "19em"
                        })

                    },
                    onAfert: function () {
                        Lib.vux.hideLoad(page)
                    }
                })
            },

            syncUploadImage: function (localIds, serverIds, finish) {

                var localId = localIds.pop();
                wx.uploadImage({
                    localId: localId,
                    isShowProgressTips: 1,
                    success: function (res) {
                        var serverId = res.serverId; // 返回图片的服务器端ID
                        //其他对serverId做处理的代码
                        serverIds.push(serverId)
                        if (showalert)
                            alert("uploadImage success serverId=" + serverId)
                        console.log("serverId1 = " + serverId)
                        console.log("serverIds 1= " + serverIds)
                        if (localIds.length > 0) {
                            page.syncUploadImage(localIds, serverIds, finish);
                        } else {

                            finish(serverIds);

                        }
                    },

                });
            },
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
//                            wx.getLocalImgData({
//                                localId: value, // 图片的localID
//                                success: function (res) {
//                                    var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
////                                    page.p_contact = localData
//                                    page.p_content = localData
//
//                                    page.previewimagesBase64.push('data:image/jpeg;base64,'+localData)
//
//                                }
//                            });
                        });
                    }
                });


            }

        }
    }


</script>

<style>


</style>
