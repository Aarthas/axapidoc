<template>
    <div >
        <!--标题-->
        <div style="display: flex;flex-direction: row;background-color: white;">
            <div style="width: 5px;height: 15px;margin-top: 10px;margin-left: 5px;" :style="{backgroundColor:flag}"></div>
            <div style="font-size: 15px;text-align: left;height: 35px;line-height: 35px;margin-left: 2px;" :style="{color:flag}">{{title}}</div>
        </div>

        <!--田字-->
        <div style="display: flex;flex-direction: row;background-color: white;height: 185px;">
           <div style="display: flex;flex-direction: column;margin-left:0;width:50%;margin-left: 5px;">
               <span style="height:90px; background-size: contain;background-repeat:no-repeat;"  :style="{backgroundImage:'url('+list[0].img+')'}"  @click="jt_anywhere(0)" ></span>
               <span style="height:90px; background-size: contain;margin-top: 5px;background-repeat:no-repeat;"  :style="{backgroundImage:'url('+list[2].img+')'}"  @click="jt_anywhere(2)"></span>
           </div>
           <div style="display: flex;flex-direction: column;margin-left:0;width: 50%;">
               <span style="height:90px; background-size: contain;background-repeat:no-repeat;"  :style="{backgroundImage:'url('+list[1].img+')'}"  @click="jt_anywhere(1)"></span>
               <span style="height:90px; background-size: contain;margin-top: 5px;background-repeat:no-repeat;"  :style="{backgroundImage:'url('+list[3].img+')'}"  @click="jt_anywhere(3)"></span>
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

                Lib.Hub.$emit('jt', this.list[index].aim);
            }
        }
    }
</script>

<style scoped>

</style>