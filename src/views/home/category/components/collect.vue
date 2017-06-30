<template>
    <div style="display: flex;flex-direction: column;">
        <img style="width: 80px;height: 80px;" :src="items.appImgSrc"/>
        <div >{{items.appCategoryName}}</div>
    </div>
</template>

<script>
    import Lib from 'assets/js/Lib';
    export default {
        components: {},
        props:{
            items:Object
        }
    }
</script>

<style scoped>

</style>