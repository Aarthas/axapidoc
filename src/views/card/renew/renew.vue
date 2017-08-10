<template>
    <div>


        <div style="height: 30px"/>

        <div class="right_item_pane">
            <span class="right_item_circle"></span>
            <span class="right_item_texta">您的会员卡已过期,续费后在三江购物所属门店及网上商城可享受优惠价及其他独享权利</span>
        </div>
        <div class="right_item_pane">
            <span class="right_item_circle"></span>
            <span class="right_item_texta">续费金额 : 20元</span>
        </div>
        <div class="right_item_pane">
            <span class="right_item_circle"></span>
            <span class="right_item_texta">您的会员卡号：{{cardnum}}    </span>
        </div>
        <div style="height: 20px"/>
        <group>

            <x-input v-model="cardnum" title="会员卡号" placeholder="请输入会员卡号"></x-input>
        </group>

        <div style="height: 10px"/>


        <div class="btn-area">
            <x-button @click.native="jtRenew" type="primary"> 查询</x-button>
        </div>


    </div>
</template>


<script>

    import Lib from 'assets/js/Lib';
    import {Group, XInput, XButton, Cell} from 'vux'
    let cardnum = Lib.Utils.getQueryString("cardnum");
    var page


    export default {

        components: {
            Group,
            XInput,
            XButton,
            Cell,
        },
        data () {
            return {
                cardnum: ''


            };
        },
        created () {
            page = this;

        },
        mounted () {

            page.cardnum = cardnum;
        },

        methods: {
            jtRenew: function () {
                Lib.axios.axios({
                    loading: {
                        page: page,
                    },
                    method: "post",
                    url: "/card/checkRenew?cardNum=" + page.cardnum,
                    success: function (basebean) {
                        let data = basebean.getData();
                        if (data.canRenew) {
                            window.location.href = Lib.go.encodeWxUrl("http://weixin.sanjiang.com/memberCenter/views/order/pay.html?paytype=cardrenew&cardNum=" + data.cardNum + "&userName=" + data.userName + "&expiryDate=" + data.expiryDate + "", 'snsapi_base');
                        } else {
                            Lib.vux.showtoast(page, data.remind + "")

                        }
                    }
                    ,
                    onerrcode: function (basebean) {
                        Lib.vux.showtoast(page, basebean.getMessage())

                    }
                });


            }

        }
    }
</script>

<style>
    @import '../../../assets/css/weui.min.css';
    .right_item_pane {
        display: flex;
        flex-direction: row;
        padding-left: 20px;
        padding-top: 5px;
        padding-right: 20px;
    }

    .right_item_circle {
        background: #45b115;
        min-width: 14px;
        height: 14px;
        border-radius: 50%;
        margin-top: 6px;
    }

    .right_item_texta {
        color: #666666;
        font-size: 15px;
        margin-left: 20px
    }
</style>
