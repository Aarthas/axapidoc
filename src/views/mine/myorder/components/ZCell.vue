<template>
    <div style="display: flex;flex-direction: row;height: 39px;">
        <div style="display: inline-block;margin-left: 8px;color: #555555;">{{title}}</div>
        <div v-if="{{type==-1}}" style="display: inline-block;margin-right: 8px;color: #f03838;flex: 1;">-¥{{value}}</div>
        <div v-else-if="{{type==2}}" style="display: inline-block;margin-right: 8px;color: #f03838;flex: 1;">{{value}}</div>
        <div v-else style="display: inline-block;margin-right: 8px;color: #f03838;flex: 1;">¥{{value}}</div>
    </div>
</template>

<script>
    import Lib from 'assets/js/Lib';
    export default {
        components: {},
        props: {
            title: String,
            value: String,
            type :Number

        },
    }
</script>

<style scoped>

</style>