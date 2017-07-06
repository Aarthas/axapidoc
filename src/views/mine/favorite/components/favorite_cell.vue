<template>
    <div style="display:flex;flex-direction: row;text-align: center;background-color: #ffffff;width: 100vw;height: 105px;">
        <div  style="display:inline-block;margin-left: 8px;">
            <img :src="item.productImage"  class="ximg-demo" error-class="ximg-error" :offset="-100" container="#vux_view_box_body" ></img>
        </div>
        <div style="display:inline-block;flex: 1;">
            <div style="display:flex;text-align: left;margin-left:5px;margin-right:8px;margin-top: 10px;height: 40px;">{{item.name}}</div>
            <div style="display:flex;flex-direction: row;">
                <div style="flex:2;text-align:left;color: #f03838;margin-left: 10px;width: 70%;margin-top: 10px;">会员价:¥{{item.pn}}</div>
                <img style="height:40px;border-radius:50%;margin-top: 10px;margin-right: 10px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=">

            </div>
        </div>

    </div>
</template>

<script>
    import { XImg } from 'vux'
    export default {

        components: {
            XImg
        },
        props: {
            item: Object,

        }

    }
</script>

<style scoped>
    .ximg-demo {
        width:100px;
        height: 100px;
    }
</style>