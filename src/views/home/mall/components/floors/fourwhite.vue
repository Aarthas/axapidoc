<template>
    <div >
        <!--标题-->
        <div style="display: flex;flex-direction: row;background-color: white;">
            <div style="width: 5px;height: 15px;margin-top: 10px;margin-left: 5px;" :style="{backgroundColor:flag}"></div>
            <div style="font-size: 15px;text-align: left;height: 35px;line-height: 35px;margin-left: 2px;" :style="{color:flag}">{{title}}</div>
        </div>
        <!--田字-->
        <div style="display: flex;flex-direction: row;background-color: white;height: 181px;">
           <div style="display: flex;flex-direction: column;width: 50%">
               <span style="height:90px; float:left;background-size: contain;"  :style="{backgroundImage:'url('+list[0].img+')'}"  @click="jt_anywhere(0)"></span>
               <span style="height:90px; float:left;background-size: contain;margin-top: 1px;"  :style="{backgroundImage:'url('+list[2].img+')'}"  @click="jt_anywhere(1)"></span>
           </div>
           <div style="display: flex;flex-direction: column;margin-left: 1px;flex: 1;">
               <span style="height:90px; float:left;background-size: contain;"  :style="{backgroundImage:'url('+list[1].img+')'}"  @click="jt_anywhere(2)"></span>
               <span style="height:90px; float:left;background-size: contain;margin-top: 1px;"  :style="{backgroundImage:'url('+list[3].img+')'}"  @click="jt_anywhere(3)"></span>
           </div>


        </div>
    </div>
</template>

<script>
    import Lib from 'assets/js/Lib';
    export default {
       components: {},
       props: {
           list: {
               type: Array,
               default () {
                   return []
               }
           },
           title: String,
           flag: String

       },
        methods: {
            jt_anywhere: function (index) {
                window.location.href = this.list[index].aim;
            }
        }
    }
</script>

<style scoped>

</style>