require('assets/css/common.css');
require('assets/css/weui.min.css');
//注册时，vux必须放在 import Vue from 'vue'; 之前，否侧打包的体积非常大，估计是vux OR vue 抽风了
import {AlertPlugin } from 'vux'
import  {LoadingPlugin} from 'vux'
import  {ConfirmPlugin} from 'vux'
import  {ToastPlugin} from 'vux'



import Vue from 'vue';

//------ VUX UI 注册，如果不需要  VUX UI 请删除以下注册 -------
Vue.use(AlertPlugin); //全局注册alert事件，注册之后，不需要每个页面都import alert
Vue.use(LoadingPlugin); //全局注册alert事件，注册之后，不需要每个页面都import alert
Vue.use(ConfirmPlugin)
Vue.use(ToastPlugin)
//--- VUX UI 注册 END --
let Hub = new Vue(); //创建事件中心


import M from './common';
import Utils from './Utils';
import uiutil from './uiutil';
import constant from './constant';
import avux from './avux';


//解决click点击300毫秒延时问题
import FastClick from 'fastclick';
FastClick.attach(document.body);


var go = {
    go(url, $router){
        if ($router) {
            url === 'BACK' ? $router.go(-1) : $router.push(url)
        } else {
            window.location.href = constant.baseurl + url
        }
    },
    getquery: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return (r[2]);
        return null;
    }

}

var localStorage={
    getCurrentAddress:function(){
       return localStorage.getItem("currentAddress");
    }
,
    setCurrentAddress:function(address){
        localStorage.setItem("currentAddress",address);
    }
}
export default{
    Utils,
    uiutil,
    axios: M,
    constant,
    Hub,
    vux: avux,
    go,
    localStorage
}