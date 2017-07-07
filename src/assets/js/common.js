

import axios from 'axios';
var BaseBean = require('./BaseBean.js');

var baseurl = 'http://193.0.1.157:20000';
// var baseurl = 'http://app.sanjiang.com';
var Rxports = {

    axios: function (opt) {

        var opts = opt || {};

        if (!opts.url) {
            alert('请填写接口地址');
            return false;
        }
        if (opt.showload)
        {
            opt.page.$vux.loading.show({
                text: opt.loadtext
            })
        }
        console.log("localStorage.getItem(token)="+localStorage.getItem("token"))
        axios({
            method: opts.method || 'get',
            url: opts.url,
            params: opts.params || {},
            data: opts.data,
            headers: opts.headers||{
                    "terminal": "50",
                // "x-auth-token": "f3dea06f-baac-4969-9cc3-e67e8cef742d",
                "x-auth-token": localStorage.getItem("token")||"",

            },

            baseURL: baseurl,

            timeout: opts.time || 10 * 1000,
            responseType: opts.dataType || 'json'
        }).then(function (res) {
            console.log(res)
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

            } else {


            }
            if (opts.onAfter) {
                opts.onAfter();
            }
            if (opt.showload)
            {
                opt.page.$vux.loading.hide()
            }

        }).catch(function (error) {
            console.log(error);
            if (opts.error) {
                opts.error(error);
            } else {
                // alert('好多人在访问呀，请重新试试[timeout]');
            }
            if (opts.onAfter) {
                opts.onAfter();
            }
            if (opt.showload)
            {
                opt.page.$vux.loading.hide()
            }

        });

    },


};


export default Rxports;


































