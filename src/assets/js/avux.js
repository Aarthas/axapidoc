export default {
    showLoad:function (page, text) {
        page.$vux.loading.show({
            text: text
        })
    },
    hideLoad:function (page, text) {
        page.$vux.loading.show({
            text: text
        })
    },
    showtoast:function (page, text,type) {
        page.$vux.toast.show({
            text: text,
            type:type||'text',
            width:'18em'
        })

    }
};



