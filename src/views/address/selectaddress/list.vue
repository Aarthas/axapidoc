<template>
    <div>
        <div>
            <div style="background-color: white;margin-bottom: 100px;">

                <radio  :options="addresslist" v-model="currentValue" :fill-mode="false" >

                    <template scope="props" slot="each-item" >
                        <p v-if="localAddress.id==addresslist[props.index].id" style="line-height: 30px;color: #1AAD19;">
                            {{addresslist[props.index].consignee }}     {{addresslist[props.index].mobile }}
                         <br/>
                            <span style="color: #1AAD19;">  {{addresslist[props.index].areaDesc }} {{addresslist[props.index].detailAddress }}</span>
                        </p>
                        <p v-else style="line-height: 30px;">
                            {{addresslist[props.index].consignee }}     {{addresslist[props.index].mobile }}
                            <br/>
                            <span style="color: #666;">  {{addresslist[props.index].areaDesc }} {{addresslist[props.index].detailAddress }}  </span>
                        </p>
                    </template>

                </radio>


            </div>
            <div   style="position: fixed;bottom: 0px;width: 100%;padding: 10px;box-sizing: border-box;background-color: #fbfbfb;">
                <x-button @click.native="jt_add_address" type="primary"> 添加地址</x-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem, Radio} from 'vux'
    import {Group, Cell, Card} from 'vux'
    import Lib from 'assets/js/Lib';

    var page;
    export default {
        components: {
            Group,
            Tab,
            TabItem,
            Radio,XButton
        },
        data () {
            return {
                currentValue: '',
                addresslist: [],
                localAddress:{}
            };
        },
        created () {
            page = this;

        },
        watch: {
            currentValue (index) {
                console.log(index)
                Lib.localStorage.setCurrentAddress(page.addresslist[index])
//                let currentAddress = Lib.localStorage.getCurrentAddress();
//                console.log(page.addresslist[index])
//                console.log(currentAddress)
                history.go(-1)
            }
        },
        mounted(){
           page.localAddress= Lib.localStorage.getCurrentAddress();
            Lib.axios.axios({
                url: '/address',
                loading:{
                    page:page,
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
            onItemClick: function (index) {
                console.log(index)

            }
            ,
            jt_add_address:function () {
                Lib.go.go("/views/address/showlist.html#/add")
            }
        }

    }
</script>

<style scoped>


</style>