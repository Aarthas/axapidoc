import axios from 'axios';
var BaseBean = require('./BaseBean.js');
import localstorage from './localstorage';
import go from './go';
// var baseurl = 'http://193.0.1.157:20000';
var baseurl = 'http://app.sanjiang.com';
// var baseurl = 'http://app.dev.sanjiang.info';
var Rxports = {

    /*
     params.put("number", number);
     params.put("data", erpGoodsId)
     params.put("cartStatus", cartStatus);
     */
    addtocart: function (data, page) {
        this.axios({
            method: 'post',
            url: '/cartsV2/v2/add',
            data: data,
            loading: {
                loadtext: '请稍等',
                page: page
            },
            success: function (basebean) {
                if (basebean.isSuccess()) {
                    page.$vux.toast.show({
                        text: basebean.getMessage(),
                        width: "14em"
                    })
                }
            },
            onerrcode: function (basebean) {
                page.$vux.toast.show({
                    text: basebean.getMessage(),
                    type: 'text',
                    width: "19em"
                })
            }

        })
    },

    axios: function (opt) {

        var opts = opt || {};

        if (opt.loading) {
            opt.loading.page.$vux.loading.show({
                text: opt.loading.loadtext || '正在加载'
            })
        }
        console.log("localStorage.getItem(token)=" + localStorage.getItem("token"))
        let shopid = localstorage.getCurrentAddress() == null ? "00023" : localstorage.getCurrentAddress().shopId;
        axios({
            method: opts.method || 'get',
            url: opts.url,
            params: opts.params || {},
            data: opts.data,
            headers: opts.headers || {
                "terminal": "50",
                "shopId": shopid,
                // "x-auth-token": "bedc8b82-ccdb-4b55-a7b9-2742d76d4af2",
                "x-auth-token": localStorage.getItem("token") || "",

            },

            baseURL: baseurl,

            timeout: opts.time || 10 * 1000,
            responseType: opts.dataType || 'json'
        }).then(function (res) {
            console.log('then ss'+opts.url)

            try {
                // console.log(res)
                // console.log(res.status)
                // res.data.data.list = null;
                if (res.status == 200) {
                    var basebean = new BaseBean(res);
                    // console.log(basebean)

                    if (basebean.isSuccess()) {
                        opts.success(basebean);
                    }
                    else {
                        if (opts.onerrcode) {
                            opts.onerrcode(basebean);
                        }


                    }

                    // if(opts.success){
                    // 	opts.success(res.data,res);
                    // }


                } else if (res.status == 401) {

                    if (opts.forunlogin) {
                        opts.forunlogin();
                    } else {
                        go.jt_login()
                    }

                }
                if (opts.onAfter) {
                    console.log("onAfter")
                    opts.onAfter();
                }
            }catch (e){
                console.log("exception = "+e);
            }
            if (opt.loading) {
                opt.loading.page.$vux.loading.hide()
            }

        }).catch(function (error) {
            console.log('error  ' +opts.url);
            console.log(error);
            console.log(error.response.status);

            if (error.response.status == 401) {

                if (opts.forunlogin) {
                    console.log("forunlogin"+opts.url);
                    opts.forunlogin();
                } else {
                    console.log("jt_login");
                    go.jt_login()
                }
            }

            else if (opts.error) {
                opts.error(error);
            } else {
                // alert('好多人在访问呀，请重新试试[timeout]');
            }
            if (opts.onAfter) {
                opts.onAfter();
            }
            if (opt.loading) {
                opt.loading.page.$vux.loading.hide()
            }

        });

    },


};


export default Rxports;


































