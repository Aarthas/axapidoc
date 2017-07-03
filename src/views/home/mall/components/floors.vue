<template>


    <div >


    </div>

    <!--<div class="page__ft">-->
            <!--<a href="javascript:home()"><img src="./images/icon_footer_link.png" /></a>-->
        <!--</div>-->

</template>
<script>
    export default {
        components: {},
        data () {
            return {}

        },
        props: {
            item: Object,

        }
        ,
        methods: {
            myfunc: function () {
                let that = this;
                that.$emit('exchange', this.item)
            }
        }
    }
</script>

<style lang="less" scoped>

</style>