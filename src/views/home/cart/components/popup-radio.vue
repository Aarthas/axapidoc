<template>
    <div style=""  >

        <a v-if="options&&options.length>0"  @click="show" href="javascript:void(0);" class="weui-cell weui-cell_access weui-cell_link">
            <div class="weui-cell__hd" style="margin-right: 20px;color: #666666">收货<br>地址</div>
            <div class="weui-cell__bd"  style="margin-right: 20px;color: #333333;line-height: 30px;">  {{options[currentValue].consignee }}     {{options[currentValue].mobile }}<br> {{options[currentValue].area }}</div>
            <span class="weui-cell__ft"></span>

        </a>

        <a  v-else href="javascript:void(0);" class="weui-cell weui-cell_access weui-cell_link" @click="$emit('jt_add_address')">
            <div class="weui-cell__hd" style="margin-right: 20px;color: #666666"></div>
            <div class="weui-cell__bd" style="text-align: center;line-height: 40px;">新增收货地址<br></div>
            <span class="weui-cell__ft"></span>
        </a>

        <div v-transfer-dom>
            <popup v-model="showPopup" style="background-color:#fff;">
                <slot name="popup-header" :options="options" :value="currentValue"></slot>
                <radio :options="options" v-model="currentValue" :fill-mode="false" @on-change="onValueChange">

                    <template slot="each-item" scope="props">
                        <slot name="each-item" :icon="props.icon" :label="props.label" :index="props.index">
                            <p>
                                <img class="vux-radio-icon" :src="props.icon" v-show="props.icon">
                                <span class="vux-radio-label">{{ props.label }}</span>
                            </p>
                        </slot>
                    </template>
                </radio>
            </popup>
        </div>
    </div>
</template>

<script>

    import { Popup,Radio,Cell,TransferDom } from 'vux'


    export default {
        components: {
            Popup,
            Radio,
            Cell
        },
        directives: {
            TransferDom
        },
        props: {
            placeholder: String,
            title: [String, Number],
            value: [String, Number, Array],
            isLink: Boolean,
            isLoading: Boolean,
            inlineDesc: [String, Number],
            primary: {
                type: String,
                default: 'title'
            },
            link: [String, Object],
            valueAlign: [String, Boolean, Number],
            borderIntent: {
                type: Boolean,
                default: true
            },
            arrowDirection: String, // down or up
            //
            options: {
                type: Array,
                required: true
            },

            fillMode: {
                type: Boolean,
                default: false
            },
            fillPlaceholder: {
                type: String,
                default: '其他'
            },
            fillLabel: {
                type: String,
                default: '其他'
            },
            readonly: Boolean,
            displayValue:String
        },
        methods: {
            onValueChange (val) {
                this.hide()
//                console.log(val)
            },
            show () {
                this.showPopup = true
            },
            hide () {
                this.showPopup = false
            },

        },
        watch: {
            value (val) {
                this.currentValue = val
//                console.log(val)
            },
            currentValue (val) {
                this.$emit('input', val)
                this.$emit('on-change', val)
//                console.log(val)
            }
        },
        data () {
            return {
                showPopup: false,
                currentValue: this.value
            }
        },
        created(){
            console.log("this.options=")
            console.log(this.options)
        }
    }
</script>

<style>
    .vux-popup-radio-popup {
        background-color: #fff;
    }
</style>