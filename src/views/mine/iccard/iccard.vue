<template>
    <div style="display:flex;flex-direction: column;text-align: center;">

        <div style="display:inline-block;">
            <x-img src="http://ogs44wdir.bkt.clouddn.com/iccard.png"  class="ximg-demo" error-class="ximg-error" :offset="-100" container="#vux_view_box_body" ></x-img>
        </div>

        <div>
            <group>
               <x-input title="IC卡卡号:" placeholder="请输入13位卡号"></x-input>
            </group>
        </div>

        <div style="display:inline-block;margin-top :20px;margin-left: 20px;margin-right: 20px;">

        <x-button style=" height: 40px;" type="warn" action-type="reset">查询</x-button>
        </div>

    </div>
</template>

<script>
    import { XImg,Group,XInput,XButton } from 'vux'
    import Lib from 'assets/js/Lib';
    export default {
        components: {
            Group,
            XInput,
            XImg,
            XButton
        },

    }
</script>

<style scoped>
    .ximg-demo {
        width: 100%;
        height: auto;
    }


</style>