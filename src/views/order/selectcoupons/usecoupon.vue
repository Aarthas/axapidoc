<template>
    <div style="display:flex;flex-direction: column;text-align: center;">

        <YIcon  v-model="ico" @click.native="aa"></YIcon>
    </div>
</template>

<script>
    import {XImg, Group, XInput, XButton} from 'vux'
    import YIcon from '../../../components/YIcon.vue'
    import Lib from 'assets/js/Lib';
    export default {
        components: {
            Group,
            XInput,
            XImg,
            XButton,
            YIcon
        }, data () {
            return {
                ico:false

            }
        },
        methods:{
            aa:function () {
                this.ico=!this.ico;
            }
        }

    }
</script>

<style scoped>


</style>