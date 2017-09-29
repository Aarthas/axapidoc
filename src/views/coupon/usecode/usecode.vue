<template>
    <div class="container">

        <!--<x-header>This is the page title.</x-header>-->
        <div style="height: 30px"></div>

        <div style="width:100%;color: #333333;font-size: 22px;text-align: center">{{cardNumFormat}}</div>
        <div style="height: 10px"></div>

        <div style="display: flex;flex-direction: column;justify-content: center;align-items:center;background-color: #f1f1f1;
    padding-top: 30px;padding-bottom:20px;margin-left:20px;margin-right:20px;border-radius: 30px;">

            <BarCode height="90px" width="290px" bg-color="#f1f1f1" :value=couponcode></BarCode>
            <div style="height: 30px"></div>
            <mqrcode size="240px" bg-color="#f1f1f1" :value=couponcode level="H"></mqrcode>
        </div>

        <div style="display: flex;flex-direction: row;justify-content: center">
            <span style="color: #f6a900;font-size: 14px; padding-top: 20px;padding-bottom: 20px;padding-left: 15px;padding-right: 15px;">-现金券出示给收银员即可-</span>
        </div>

        <div style="display: flex;flex-direction: column;justify-content: center;align-items: center;margin-top: 20px">
            <span style="color: #333333;font-size: 14px;padding-left: 15px;padding-right: 15px;">如有二维码显示问题</span>
            <span style="color: #333333;font-size: 14px;padding-left: 15px;padding-right: 15px;">您可以拨打400-186-9090联系我们</span>
        </div>

    </div>

</template>


<script>


    import Lib from 'assets/js/Lib';

    var barcode = require("../../../components/barqrcode/barcode.js");
    import BarCode from '../../../components/barqrcode/BarCode.vue'
    import mqrcode from '../../../components/barqrcode/mqrcode.vue'
    var page;
    let couponcode = Lib.go.getquery("couponcode");
    export default {

        components: {
            BarCode, mqrcode
        },
        data () {
            return {

                couponcode: "",

            };
        },
        computed: {
            cardNumFormat(){
                return barcode.formatBarCode(this.couponcode, " ");
            }
        },
        created () {
            page = this;
            console.log("created")
            page.couponcode=couponcode;
        },

        mounted(){
            console.log("mounted")

        },


        methods: {
            onRefresh(){

            },
            onload(){

            }


        }
    }


</script>


<style>


</style>
