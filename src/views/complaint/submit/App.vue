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
            <shop_pick :item=this.complaintPreData.shopsList></shop_pick>
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
                                <span  class="weui-uploader__input"  @click="chooseImage"
                                       />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="display: flex;justify-content: flex-start;margin-left: 30px;margin-right: 10px;">
                <!--<div v-for="(file,index) in previewimages"  @click="delImage(index)" class="weui-msg__icon-area"><i class="weui-icon-cancel " style="font-size: 26px;"></i></div>-->
                <div class="weui-msg__icon-area" style="margin-right: 56px;"><i class="weui-icon-cancel " style="font-size: 26px;"  v-show="previewimages.length>0"  @click="delImage(0)" ></i></div>
                <div class="weui-msg__icon-area" style="margin-right: 56px;"><i class="weui-icon-cancel " style="font-size: 26px;" v-show="previewimages.length>1" @click="delImage(1)"></i></div>
                <div class="weui-msg__icon-area" style="margin-right: 56px;"><i class="weui-icon-cancel " style="font-size: 26px;" v-show="previewimages.length>2" @click="delImage(2)"></i></div>
                <div class="weui-msg__icon-area" ><i class="weui-icon-cancel " style="font-size: 26px;" v-show="previewimages.length>3" @click="delImage(3)"></i></div>
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
    import shop_pick from '../../../views/complaint/submit/components/shop_pick.vue' ;

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
                p_shopindex: -1,
                p_areaindex: -1,

                previewimages: ["https://ss0.baidu.com/73F1bjeh1BF3odCf/it/u=471012672,4176877834&fm=85&s=DD10449372200703DF8E8EB503005023",
                    "https://ss0.baidu.com/73F1bjeh1BF3odCf/it/u=471012672,4176877834&fm=85&s=DD10449372200703DF8E8EB503005023",
                'http://static.googleadsserving.cn/pagead/imgad?id=CICAgKDLr9LBfBCsAhj6ATIIo6hExUnag7o'],

            };
        },
        computed: {

            areaList () {

                let list = [];
                let shopsList = page.complaintPreData.shopsList;
                if (shopsList) {
                    for (var i = 0; i < shopsList.length; i++) {
                        let a = shopsList[i]
                        list.push({name: a.area, value: i})
                    }
                }


                return list
            },
            shopList () {

                let list = [];

                let shopsList = page.complaintPreData.shopsList;
                if (shopsList && shopsList[page.p_areaindex]) {
                    let shops = shopsList[page.p_areaindex].shops
                    for (var j in shops) {
                        let shop = shops[j]
                        list.push({name: shop.shopName, value: j})
                    }
                }

                return list
            },
            info () {
                console.log("info")
                let shopsList = page.complaintPreData.shopsList;
                if (shopsList && shopsList[page.p_areaindex]) {
                    let shops = shopsList[page.p_areaindex].shops
                    if (shops && shops[page.p_shopindex]) {
                        let detailAddress = shops[page.p_shopindex].address
                        return detailAddress;
                    }

                }

                return ""
            },
            previewimages(){

            }
        },
        watch: {},
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
                res.data.jsApiList = ['chooseImage', 'uploadImage', 'getLocalImgData','showPreview'];
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
            delImage:function (index) {
                console.log(index)
                page.previewimages.splice(index,1)
                console.log(page.previewimages)
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
                console.log("submit" + page.p_platform)
                console.log("submit" + page.p_content)
                console.log("submit" + page.filepath)
                for (var i in page.previewimages) {
                    let file = page.previewimages[i]
                    console.log(file)
                }
            }
            ,
            chooseImage: function () {
                console.log("chooseIamage")

                wx.chooseImage({
                    count: 4-page.previewimages.length, // 默认9
                    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                    success: function (res) {
                        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
//                        alert(JSON.stringify(res))
//                        alert(localIds[0])
                        localIds.forEach(function(value,index,array){
                            page.previewimages.push(value)
                        });
//                        alert( page.previewimages)


//                        wx.getLocalImgData({
//                            localId: localIds[0], // 图片的localID
//                            success: function (res) {
//                                var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
//                                alert(JSON.stringify(res))
//                            }
//                        });
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


            }
            ,
            chooseShop: function () {
                page.showShops = true;
            }
        }
    }

    function upload(file) {
        let param = new FormData(); //创建form对象
        param.append('file', file);//通过append向form对象添加数据
        console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
        let config = {
            headers: {'Content-Type': 'multipart/form-data'}
        };  //添加请求头
        axios.post('http://app.sanjiang.com/images/imgFile', param, config)
            .then(response => {
                console.log(response.data);
            })
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
