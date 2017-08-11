<template>
    <div>
        <group title="姓名">
            <YInput :item="{placeholder:'请输入姓名'}" v-model="p_contact"></YInput>
        </group>
        <group title="身份证号码">
            <YInput :item="{placeholder:'请输入身份证号码'}" v-model="p_idcard"></YInput>
        </group>

        <div class="weui-cells weui-cells_form">
            <div class="weui-cell">
                <div class="weui-cell__bd">
                    <div class="weui-uploader">
                        <div class="weui-uploader__hd">
                            <p class="weui-uploader__title">请上传身份证正反面</p>
                            <div class="weui-uploader__info">{{previewimages.length}}/2</div>
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

                            <div class="weui-uploader__input-box" v-show="previewimages.length < 2">
                                <span class="weui-uploader__input" @click="chooseImage"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="display: flex;justify-content: flex-start;margin-left: 30px;margin-right: 10px;padding-bottom: 10px;"
                 v-show="previewimages.length>0">
                <div style="margin-right: 54px;"><i class="weui-icon-cancel " style="font-size: 26px;"
                                                    v-show="previewimages.length>0" @click="delImage(0)"></i></div>
                <div style="margin-right: 54px;"><i class="weui-icon-cancel " style="font-size: 26px;"
                                                    v-show="previewimages.length>1" @click="delImage(1)"></i></div>

            </div>
        </div>


        <group title="验证手机号">
            <vcodecell title="" :max=60 @startCount="startCount" placeholder="手机号" ref="vcodecell"
                       vcodeLabel="发送验证码" v-model="p_mobile"></vcodecell>
            <YInput :item="{placeholder:'验证码',istype:'number'}" v-model="p_smscode"></YInput>

        </group>

        <div style="margin: 30px  12px;">
            <x-button @click.native="submit" type="primary" :disabled="submitDisabled"> 提交</x-button>

        </div>
        <div style="color: #898989;font-size: 14px;margin-left: 1em;margin-right: 1em;line-height: 28px;margin-bottom: 20px;">
            注：会员费30元，线上线下通用，会员有效期一年，到期后续卡费用为20元/年，申请成功后电子会员卡即时可用，暂不支持领用或更换实体卡。


        </div>
    </div>
</template>

<script>

    import vcodecell from '../../../components/vcodecell.vue'
    import {XButton, Group, Cell} from 'vux'

    import YInput from '../../../components/YInput.vue';


    import Lib from 'assets/js/Lib';
    import axios from 'axios';
    var page

    var showalert = true;

    export default {

        components: {
            XButton,
            Group,
            Cell,
            YInput, vcodecell
        },
        data () {
            return {
                p_contact: "",
                p_idcard: "",
                p_mobile: "",
                p_smscode: "",
                previewimages: [],
                submitDisabled: false
            };
        },

        created () {
            page = this;

        },
        mounted () {


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

                console.log("submit p_contact = " + page.p_contact)
                console.log("submit p_idcard = " + page.p_idcard)

                console.log("submit  p_mobile = " + page.p_mobile)
                console.log("submit   p_smscode =" + page.p_smscode)
                console.log("submit   previewimages =" + page.previewimages)
                console.log("submit   code =" + Lib.Utils.getQueryString("code"))

                if (page.p_contact == null || page.p_contact.length == 0) {
                    Lib.uiutil.showtoast(page, '姓名不能为空')

                    return;
                }
                if (page.p_idcard == null || page.p_idcard.length == 0) {
                    Lib.uiutil.showtoast(page, '身份证号码不能为空')

                    return;
                }
                if (page.p_mobile == null || page.p_mobile.length == 0) {
                    Lib.uiutil.showtoast(page, '手机号不能为空')

                    return;
                }
                if (page.p_smscode == null || page.p_smscode.length == 0) {
                    Lib.uiutil.showtoast(page, '请输入手机短信验证码')

                    return;
                }
                if (page.previewimages == null || page.previewimages.length != 2) {
                    Lib.uiutil.showtoast(page, '请上传身份证图片')

                    return;
                }

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
                        name: page.p_contact,
                        idCardNum: page.p_idcard,
                        mobile: page.p_mobile,
                        smsCaptcha: page.p_smscode,
                        serverIds: serverIds,

                    }
                    if (showalert)
                        alert("applyfromwx data" + JSON.stringify(data))

                    Lib.axios.axios({
                        method: "post",
                        url: 'card/applyfromwx',
                        data: data,
                        success: function (basebean) {
                            if (showalert)
                                alert("submit SUCCESS")
                            alert(JSON.stringify(basebean))
                            Lib.vux.hideLoad(page)
                        },
                        onerrcode: function (basebean) {
                            page.$vux.toast.show({
                                text: basebean.getMessage(),
                                type: "text",
                                width: "19em"
                            })
                            Lib.vux.hideLoad(page)
                            let encodeWxUrl = Lib.go.encodeWxUrl(Lib.constant.baseurl+"/views/order/pay.html?paytype=cardapply&contact=" + contact + "&mobile=" +mobile, 'snsapi_base');
                            window.location.href = encodeWxUrl
                        },
                        onAfter: function () {
                            Lib.vux.hideLoad(page)
                        }
                    })

                });


            },
            startCount: function () {
                Lib.axios.axios({
                    url: '/card/checkCardApply?mobile=' + page.p_mobile,
                    success: function (basebean) {
                        page.$refs.vcodecell.start();
                    },
                    onerrcode: function (basebean) {

                        Lib.vux.showtoast(page, basebean.getMessage())

                    },
                    forunlogin: function () {

                    }
                });
            },
            addComplaintFromWx: function (data) {

//
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
                    count: 2 - page.previewimages.length, // 默认9
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
