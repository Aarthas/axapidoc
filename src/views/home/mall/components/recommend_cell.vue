<template>
    <div>
    <div style=" display: flex;flex-direction: column;background-color: #ffffff;height: 230px;margin :2px 5px 5px 5px;">
            <img style="height: 150px;background-color: yellow;margin: 8px 15px 0px 15px;" :src="item.productImage"/>
            <div style="color: #333333;font-size: 13px;margin-top:5px;margin-left:8px;margin-right:8px;text-align: left;white-space: nowrap;overflow: hidden;text-overflow: ellipsis; " >{{item.name}}</div>
        <div style="display: flex;flex-direction: row;margin: 0px 8px 8px 8px;">
           <div style="color: #f03838;font-size: 13px;text-align: left;flex: 1;margin-top: 10px;" >会员价 ￥{{item.pn}}</div>
           <img style="margin-bottom: 0;margin-right: 0;width: 40px;height: 40px;border-radius:50%;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=">
        </div>
    </div>

    </div>
</template>

<script>
    import Lib from 'assets/js/Lib';
    export default {
        components: {},
       props:{
            item:Object
       }
    }
</script>

<style scoped>

</style>