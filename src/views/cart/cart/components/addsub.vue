<template>
    <div>
        <div class="weui-cell__ft vux-cell-primary" :class="{'vux-number-round': true}"
             v-show="!readonly" style="font-size:0">
            <div :style="{float:align}">
                <span @click="sub" class="vux-number-selector vux-number-selector-sub"
                   :class="{'vux-number-disabled':disabledMin}">
                    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                         xmlns:xlink="http://www.w3.org/1999/xlink" width="18" height="18">
                        <defs></defs>
                        <path d="M863.74455 544.00086 163.424056 544.00086c-17.664722 0-32.00086-14.336138-32.00086-32.00086s14.336138-32.00086 32.00086-32.00086l700.320495 0c17.695686 0 31.99914 14.336138 31.99914 32.00086S881.440237 544.00086 863.74455 544.00086z"></path>
                    </svg>
                </span>
                <input v-model.number="currentValue" :name="name" class="vux-number-input"
                       :style="{width: width}" :readonly="!fillable" pattern="[0-9]*" type="number"
                       @blur="blur"/>
                <span @click="add" class="vux-number-selector vux-number-selector-plus"
                   :class="{'vux-number-disabled':disabledMax}">
                    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                         xmlns:xlink="http://www.w3.org/1999/xlink" width="18" height="18">
                        <defs></defs>
                        <path d="M863.328262 481.340895l-317.344013 0.099772L545.984249 162.816826c0-17.664722-14.336138-32.00086-32.00086-32.00086s-31.99914 14.336138-31.99914 32.00086l0 318.400215-322.368714-0.17718c-0.032684 0-0.063647 0-0.096331 0-17.632039 0-31.935493 14.239806-32.00086 31.904529-0.096331 17.664722 14.208843 32.031824 31.871845 32.095471l322.59234 0.17718 0 319.167424c0 17.695686 14.336138 32.00086 31.99914 32.00086s32.00086-14.303454 32.00086-32.00086L545.982529 545.440667l317.087703-0.099772c0.063647 0 0.096331 0 0.127295 0 17.632039 0 31.935493-14.239806 32.00086-31.904529S880.960301 481.404542 863.328262 481.340895z"></path>
                    </svg>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    import Lib from 'assets/js/Lib';
    const Big = require('big.js')
    export default {
        components: {},
        props: {

            min: Number,
            max: Number,
            readonly: Boolean,
            step: {
                type: Number,
                default: 1
            },
            value: {
                validator (value) {
                    if (typeof value === 'number') {
                        return true
                    } else if (typeof value === 'string') {
                        return value === ''
                    }
                    return false
                },
                default: 0
            },
            name: String,
            title: String,
            fillable: {
                type: Boolean,
                default: false
            },
            width: {
                type: String,
                default: '50px'
            },
            buttonStyle: {
                type: String,
                default: 'square'
            },
            align: {
                type: String,
                default: 'right'
            },

        },
        created () {
            this.currentValue = this.value;
        },

        data () {
            return {
                currentValue: 0,

            }
        },
        computed: {
            disabledMin () {
                return typeof this.min === 'undefined' ? false : (this.currentValue === '' ? true : this.currentValue <= this.min)
            },
            disabledMax () {
                return typeof this.max === 'undefined' ? false : (this.currentValue === '' ? true : this.currentValue >= this.max)
            }
        },
        watch: {
            currentValue (newValue, old) {
                if (newValue !== '') {
                    if (typeof this.min !== 'undefined' && this.currentValue < this.min) {
                        this.currentValue = this.min
                    }
                    if (this.max && this.currentValue > this.max) {
                        this.currentValue = this.max
                    }
                }
                this.$emit('input', this.currentValue)
                this.$emit('on-change', this.currentValue)
            },
            value (newValue) {
                this.currentValue = newValue
            }
        },
        methods: {
            add () {
//                if (!this.disabledMax) {
//                    const x = new Big(this.currentValue)
//                    this.currentValue = x.plus(this.step) * 1
//                }
                this.$emit('on-add', this.currentValue)
//                    Lib.Hub.$emit('add',this.item); //Hub触发事件

            },
            sub () {
//                if (!this.disabledMin) {
//                    const x = new Big(this.currentValue)
//                    this.currentValue = x.minus(this.step) * 1
//                }
                console.log("on-sub0="+this.currentValue)
                this.$emit('on-sub', this.currentValue)
//                    Lib.Hub.$emit('sub',this.item); //Hub触发事件

            },
            blur () {
                if (this.currentValue === '') {
                    this.currentValue = 0
                }
            }
        }
    }
</script>

<style lang="less">
    .pane {
        display: flex;
        flex-direction: row;
        height: 115px;
        background-color: white;
        border-bottom: 1px solid #eeeeee;
        /*margin: 0.7em;*/
    }

    .pane_lf {
        width: 115px;
        height: 115px;
        color: white;
        display: flex;
        /*background-color: #0bb20c;*/
        flex-direction: column;
        justify-content: center;
        align-items: center
    }

    .pane_middle {
        background-color: white;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding-left: 8px;
        flex: 1;

    }

    .img_pane {

        background-size: contain;
        background-repeat: no-repeat;
        height: 90px;
        width: 90px;
    }

    .vux-cell-primary {
        flex: 1;
        margin-top: 15px;
        margin-right: 10px;
    }

    .vux-number-input {
        float: left;
        height: 20px;
        font-size: 20px;
        color: #666;
        appearance: none;
        border: 1px solid #ececec;
        padding: 3px 0;
        text-align: center;
        border-radius: 1px;
    }

    .vux-number-round .vux-number-input {
        border: none;
    }

    .vux-number-selector {
        float: left;
        height: 20px;
        font-size: 25px;
        line-height: 18px;
        color: #3cc51f;
        border: 1px solid #ececec;
    }

    .vux-number-round .vux-number-selector {
        width: 20px;
        border-radius: 13px;
    }

    .vux-number-selector svg {
        fill: #3cc51f;
    }

    .vux-number-selector.vux-number-disabled svg {
        fill: #ccc;
    }

    .vux-number-round .vux-number-selector.vux-number-disabled {
        border-color: #ececec;
    }

    .vux-number-round .vux-number-selector.vux-number-disabled svg {
        fill: #ccc;
    }

    .vux-number-selector-sub {
        border-right: none;
        padding: 4px 8px 2px 8px;
        border-radius: 2px 0 0 2px;
    }

    .vux-number-selector-plus {
        border-left: none;
        margin-right: 5px;
        padding: 3px 8px;
        border-radius: 0 2px 2px 0;
    }

    .vux-number-round .vux-number-selector-sub svg {
        position: relative;
        top: 1px;
    }

    .vux-number-round .vux-number-selector-sub, .vux-number-round .vux-number-selector-plus {
        padding: 2px;
        border: 1px solid #3cc51f;
        text-align: center;
    }
</style>