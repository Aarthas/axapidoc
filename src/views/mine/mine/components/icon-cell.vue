<template>
    <div class="weui-cell weui-cell_access weui-cell_link">
        <div class="weui-cell__hd" style="margin-right: 10px;color: #666666">
            <img slot="icon" width="20" height="20px"
                 style="display:block;margin-right:8px;"
                 :src="iconsrc">
        </div>
        <div class="weui-cell__bd" style="margin-right: 20px;color: #333333;line-height: 30px;font-size: 16px;">
            {{title}}
        </div>
        <span class="weui-cell__ft"></span>
    </div>
</template>

<script>
    export default {
        components: {},
        data () {
            return {}
        },
        props: {
            title:String,
            iconsrc:String,
        },
        methods: {


        }
    }
</script>

<style scoped>

</style>