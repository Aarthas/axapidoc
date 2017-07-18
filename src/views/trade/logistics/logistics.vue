<template>
    <div>
        <div style="background-color: white;font-size: 17px;text-align: left;height: 50px;">
            <div style="line-height: 50px;margin-left: 10px;">订单号：{{orderId}}</div>
        </div>

        <timeline style="background-color: white;margin-top: 10px;">
            <timeline-item v-for="item in logisticsData" :key="item.orderId">
                <h4 >{{item.message}}</h4>
                <p >{{item.time}}</p>
            </timeline-item>
        </timeline>
    </div>
</template>

<script>
    import Lib from 'assets/js/Lib';
    import { Timeline, TimelineItem,Toast} from 'vux';
    var page;
    let orderId = Lib.Utils.getQueryString("orderId");
    export default {
        components: {Timeline, TimelineItem,Toast},
        data(){
          return{
                logisticsData:[],
              orderId:""
          }
        },
        created(){
            page=this;
            page.orderId=orderId;
        },
        mounted(){
            Lib.axios.axios({
                url: '/track/' + orderId,
                loading:{
                  page:page,
                },
                success: function (basebean) {
                    page.logisticsData=basebean.getData();
                },
                onerrcode: function (basebean) {
                    page.$vux.toast.show({
                        type: 'cancel',
                        text: basebean.getMessage()
                    })

                }
            });
        }
    }
</script>

<style scoped>

</style>