export default {

    showtoast (page,text) {
        page.$vux.toast.show({
            text: text,
            type: "text",
            width: "19em"
        })
    }
};