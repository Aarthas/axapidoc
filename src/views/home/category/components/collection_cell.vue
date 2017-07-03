<template>
    <div>
        <div style="display: flex;flex-direction: row;">
          <div style="width: 3px;background-color: #f03838;height: 15px;margin-top: 7px;margin-left: 10px;"></div>
          <div style="font-size: 15px;text-align: left;color: #0d0d0d;height: 30px;line-height: 30px;margin-left: 2px;">{{item.appCategoryName}}</div>
        </div>
        <ul style="overflow:hidden;width:100%;">
            <li style="float:left;width: 33%;white-space:nowrap;" v-for="itemData in item.categoryModels">
               <collect_item :model="itemData"></collect_item>

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