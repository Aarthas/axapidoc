import constant from './constant';
function encodeWxUrl(url) {
    let encodeurl = encodeURIComponent(url)
    let authedUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf698f56d095a5d43&redirect_uri="+encodeurl+"&response_type=code&scope=snsapi_base&state=aa#wechat_redirect"
    return authedUrl;
}

export default {
    go(url, $router){
        if ($router) {
            url === 'BACK' ? $router.go(-1) : $router.push(url)
        } else {
            window.location.href = constant.baseurl + url
        }
    },
    replace(url){

            window.location.replace(constant.baseurl + url) ;

    },
    jt_login(){
        window.location.replace(constant.baseurl + "/views/user/login.html") ;
    },
    jt_home(){


            window.location.href = constant.baseurl + "/views/main/main.html#/home"

    },
    jt_cart(){


            window.location.href = constant.baseurl + "/views/main/main.html#/cart"

    },
    jt_selectaddress:function (route) {
       route.push({path: 'selectaddress'})
    },
    jt_pay(orderId,payAmount){
        let pay = constant.baseurl + "/views/order/pay.html?orderId=" +orderId+"&payAmount="+ payAmount;
        window.location.replace(encodeWxUrl(pay))
    },
    getquery: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return (r[2]);
        return null;
    }

};

