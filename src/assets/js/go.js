import constant from './constant';
export default {
    go(url, $router){
        if ($router) {
            url === 'BACK' ? $router.go(-1) : $router.push(url)
        } else {
            window.location.href = constant.baseurl + url
        }
    },
    jt_login(){
        window.location.href = constant.baseurl + "/views/user/login.html"
    },
    jt_home(){
        window.location.href = constant.baseurl + "/views/home/home.html"
    },
    getquery: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return (r[2]);
        return null;
    }

};

