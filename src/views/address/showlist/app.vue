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
        data() {
            return {

            }
        },

        mounted () {
            this.$router.push({path: "add"})

        },

        methods: {}
    }
</script>
<style scoped>

</style>