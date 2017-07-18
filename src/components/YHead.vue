<template>
    <div class="vux-header">
        <div style="display: flex;align-items: center;width:35px;padding-left: 14px;height: 40px;" @click="jt_home">
            <i style="font-size: 30px;line-height: 1;color: white" class="iconfont icon-shouye" slot="icon"></i>
        </div>
        <h1 class="vux-header-title" @click="jt_home">
            <span v-show="title">首页</span>
        </h1>
        <div class="vux-header-right">
            <a class="vux-header-more" @click.preventDefault @click="$emit('on-click-more')"
               v-if="rightOptions.showMore"></a>
            <slot name="right"></slot>
        </div>
    </div>
</template>


<script>
    import objectAssign from 'object-assign'
    import Lib from 'assets/js/Lib';
    export default {
        name: 'x-header',
        props: {
            leftOptions: Object,
            title: String,
            transition: String,
            rightOptions: {
                type: Object,
                default () {
                    return {
                        showMore: false
                    }
                }
            }
        },
        computed: {
            _leftOptions () {
                return objectAssign({
                    showBack: true,
                    preventGoBack: false
                }, this.leftOptions || {})
            }
        },
        methods: {
            onClickBack () {

            },
            jt_home: function () {
                Lib.go.jt_home();
            }
        }
    }
</script>

<style lang="less">
    @import "../assets/font/iconfont.css";

    .vux-header {
        position: relative;

        box-sizing: border-box;
        background-color: #393a3e;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .vux-header .vux-header-title, .vux-header h1 {
        line-height: 40px;
        height: 40px;
        font-size: 15px;
        margin-top: 5px;
        color: #ffffff;
    }

    .vux-header .vux-header-title > span {
        display: inline-block;
    }

    .vux-header .vux-header-left, .vux-header .vux-header-right {
        position: absolute;
        top: 14px;
        display: block;
        font-size: 14px;
        line-height: 21px;
        color: #444;
    }

    .vux-header .vux-header-left a, .vux-header .vux-header-left button, .vux-header .vux-header-right a, .vux-header .vux-header-right button {
        float: left;
        margin-right: 8px;
        color: #444;
    }

    .vux-header .vux-header-left a:active, .vux-header .vux-header-left button:active, .vux-header .vux-header-right a:active, .vux-header .vux-header-right button:active {
        opacity: .5
    }

    .vux-header .vux-header-left {
        left: 18px
    }

    .vux-header .vux-header-left .vux-header-back {
        padding-left: 16px
    }

    .vux-header .vux-header-left .left-arrow {
        position: absolute;
        width: 30px;
        height: 30px;
        top: -5px;
        left: -5px;

        &:before {
            content: "";
            position: absolute;
            width: 12px;
            height: 12px;
            border: 1px solid #444;
            border-width: 1px 0 0 1px;
            transform: rotate(315deg);
            top: 8px;
            left: 7px;
        }
    }

    .vux-header .vux-header-right {
        right: 15px
    }

    .vux-header .vux-header-right a, .vux-header .vux-header-right button {
        margin-left: 8px;
        margin-right: 0
    }

    .vux-header .vux-header-right .vux-header-more:after {
        content: "\2022\0020\2022\0020\2022\0020";
        font-size: 16px;
    }

    .vux-header-fade-in-right-enter-active {
        animation: fadeinR .5s;
    }

    .vux-header-fade-in-left-enter-active {
        animation: fadeinL .5s;
    }

    @keyframes fadeinR {
        0% {
            opacity: 0;
            transform: translateX(150px);
        }
        100% {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes fadeinL {
        0% {
            opacity: 0;
            transform: translateX(-150px);
        }
        100% {
            opacity: 1;
            transform: translateX(0);
        }
    }
</style>
