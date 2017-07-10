<template>
    <div>
        <router-view ></router-view>
    </div>
</template>

<script>
    import Lib from 'assets/js/Lib';
    export default {
        components: {
        },
        mounted () {
            this.$router.push({path: "detail"})

        },

        methods: {}
    }
</script>
<style scoped>

</style>