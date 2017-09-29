<template>
    <div>
        <div>
            <div style="background-color: white;margin-bottom: 100px;">

                <radio :options="addresslist" v-model="currentValue" :fill-mode="false">

                    <template scope="props" slot="each-item">
                        <p v-if="idflag==addresslist[props.index].id" style="line-height: 30px;color: #1AAD19;">
                            {{addresslist[props.index].consignee }}     {{addresslist[props.index].mobile }}
                         <br/>
                            <span style="color: #1AAD19;">  {{addresslist[props.index].areaDesc
                                }} {{addresslist[props.index].detailAddress }}</span>
                        </p>
                        <p v-else style="line-height: 30px;">
                            {{addresslist[props.index].consignee }}     {{addresslist[props.index].mobile }}
                            <br/>
                            <span style="color: #666;">  {{addresslist[props.index].areaDesc
                                }} {{addresslist[props.index].detailAddress }}  </span>
                        </p>
                    </template>

                </radio>


            </div>
            <div style="position: fixed;bottom: 0px;width: 100%;padding: 10px;box-sizing: border-box;background-color: #fbfbfb;">
                <x-button @click.native="jt_add_address" type="primary"> 添加地址</x-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem, Radio} from 'vux'
    import {Group, Cell, Card} from 'vux'
    import Lib from 'assets/js/Lib';
    let isFrom = Lib.Utils.getQueryString("isFrom");
    var page;
    export default {
        components: {
            Group,
            Tab,
            TabItem,
            Radio, XButton
        },
        data () {
            return {
                currentValue: '',
                addresslist: [],
                idflag: ''
            };
        },
        created () {
            page = this;
            let currentAddress = Lib.localStorage.getCurrentAddress();
            if (currentAddress)
                page.idflag = currentAddress.id;
        },
        watch: {
            currentValue (index) {
                console.log(index)
                Lib.localStorage.setCurrentAddress(page.addresslist[index])
//                let currentAddress = Lib.localStorage.getCurrentAddress();
//                console.log(page.addresslist[index])
//                console.log(currentAddress)

//                Lib.Hub.$emit('changeAddress',page.addresslist[index]);
//                history.go(-1)
                if (isFrom=="cart"){
                    Lib.go.jt_home("cart");
                }else if(isFrom=="mall"){
                    Lib.go.jt_home();
                }else{
//                    window.location.replace( window.document.referrer)
                    page.$router.go(-1)
                }
//


            }
        },
        mounted(){

            Lib.axios.axios({
                url: '/address',
                loading: {
                    page: page,
                },
                success: function (basebean) {
                    console.log(basebean.getData())
                    page.addresslist = basebean.getData().map(function (item, index) {
                        item.key = index
                        item.value = index
                        return item;
                    });


                }
            });
        },
        methods: {

            jt_add_address: function () {
                this.$router.push({path: 'addaddress'})
            }
        }

    }
</script>

<style scoped>


</style>