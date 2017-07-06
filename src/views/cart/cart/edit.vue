<template>
    <div style="height: 50px;display: flex;flex-direction: row;background-color: white;">
        <!--左 选中按钮-->
        <div style="width: 8vw;margin-left: 0px;">
            <check-icon :value.sync="item.selectAll" style="line-height: 50px;"></check-icon>
        </div>
        <div style="width:42vw;"></div>
        <div style="width:50vw;flex: 1;">
        <x-button type="primary" mini style="margin-right: 10px;">加入收藏</x-button>
        <x-button type="primary" mini style="margin-right: 8px;">删除</x-button>
        </div>
    </div>
</template>

<script>
    import { CheckIcon,XButton } from 'vux'
    export default {
        components: {
            CheckIcon,
            XButton
        },
        props:{
            item:Object
        }

    }
</script>

<style scoped>

</style>