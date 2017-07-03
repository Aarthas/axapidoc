<template>
    <div style="display: flex;flex-direction: column;margin-left: 10px;margin-top: 5px;margin-bottom: 5px;">
        <img style="width: 60px;height: 60px;" :src="model.appImgSrc"/>
        <div style="text-align: center;color: #666666;font-size: 13px;width: 60px;">{{model.appCategoryName}}</div>
    </div>
</template>

<script>
    import Lib from 'assets/js/Lib';
    export default {
        components: {},
        props:{
            model:Object
        }
    }
</script>

<style scoped>

</style>