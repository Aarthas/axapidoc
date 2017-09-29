<template>
    <a class="m-tabbar-item" :class="{'is-active':isActive}" @click="$parent.$emit('input',id)">
        <span class="m-tabbar-item-icon" v-show="!isActive" v-if="isImg"><slot name="icon-normal"></slot></span>
        <span class="m-tabbar-item-icon" v-show="isActive" v-if="isImg"><slot name="icon-active"></slot></span>
        <span class="m-tabbar-item-icon" v-if="isIcon" ><slot name="icon"></slot></span>
        <span class="m-tabbar-item-text"><slot></slot></span>
    </a>
</template>
<script>
    /**
     * m-tab-item
     * @desc 搭配 tabbar使用
     * @param id - 选中后的返回值，任意类型
     * @param isActive - 根据父组件的value和当前组件的id判断是否为选中状态
     * @param $parent.$emit('input',id) - 触发父组件的自定义事件
     * @param {slot} [icon-normal] - icon-默认图标
     * @param {slot} [icon-active] - icon-选中图标
     * @param {slot} - 文字
     *
     * @example
     * <m-tabbar-item id='tab1'>
     *       <img src="../assets/images/ic_tab_home_normal.png" alt="" slot="icon-normal">
     *       <img src="../assets/images/ic_tab_home_active.png" alt="" slot="icon-active">
     *       首页
     * </m-tabbar-item>
     */
    export default{
        props: {
            id:String,
            isImg: {
                type: Boolean,
                required: true
            },
            isImg: {
                type: Boolean,
                required: false,
                default: false
            },
            isIcon: {
                type: Boolean,
                required: false,
                default: false
            },
        },
        computed: {
            isActive(){
//                console.log("id = "+this.id)
//                console.log("$parent.id = "+this.$parent.value)
                if (this.$parent.value === this.id) {
                    return true;
                }
            }
        }
    }
</script>
<style lang="less">
    .m-tabbar-item {
        flex: 1;
        text-align: center;
        margin-top: 3px;
        display: flex;
        flex-direction: column;
        .m-tabbar-item-icon {
            display: block;
            padding-top: 1px;
            img {
                width: 22px;
                height: 22px;
            }

        }
        .m-tabbar-item-text {
            display: block;
            font-size: 12px;
            color: #949494;
        }
        &.is-active {

            color: #42bd56;
            .m-tabbar-item-text {
                color: #42bd56;
            }
        }
    }
</style>