<template>
    <div>
        <div style="font-size: 15px;text-align: left;color: #0d0d0d;height: 30px;line-height: 30px;">{{item.appCategoryName}}</div>
        <ul style="display: flex;flex-direction: row;">
            <li style="float:left;width: 33%;white-space:nowrap;" v-for="itemData in item.categoryModels">
               <!--<collect_item :items="item.categoryModels"></collect_item>-->

            </li>
        </ul>
    </div>
</template>

<script>
    import collect_item from './collect.vue'
    export default {
        components: {
            collect_item
        },
        props:{
           item:Object
        }

    }
</script>

<style scoped>

</style>