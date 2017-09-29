<template>
    <div style="display: flex;flex-direction: row;height: 39px;background-color: #ffffff;">
        <div style="display: inline-block;margin-left: 8px;color: #555555;line-height: 39px;">{{item.title}}</div>
        <div v-if="item.type==-1" style="display: inline-block;margin-right: 8px;color: #f03838;flex: 1;text-align: right;
line-height: 39px;">-¥{{item.price}}</div>
        <div v-else-if="item.type==2" style="display: inline-block;margin-right: 8px;color: #f03838;flex: 1;text-align: right;line-height: 39px;">
            {{item.price}}
        </div>
        <div v-else style="display: inline-block;margin-right: 8px;color: #f03838;flex: 1;text-align: right;line-height: 39px;">¥{{item.price}}</div>

    </div>
</template>

<script>
    import Lib from 'assets/js/Lib';
    export default {
        components: {},
        props: {
            item: Object
        },
    }
</script>

<style scoped>

</style>