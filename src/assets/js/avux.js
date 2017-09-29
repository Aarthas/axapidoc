export default {
    showLoad:function (page, text) {
        page.$vux.loading.show({
            text: text
        })
    },
    hideLoad:function (page) {
        page.$vux.loading.hide()
    },
    showtoast:function (page, text,type,width) {
        page.$vux.toast.show({
            text: text,
            type:type||'text',
            width:width||'18em'
        })

    }
};



