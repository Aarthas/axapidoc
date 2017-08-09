export default {

    getCurrentAddress: function () {
        let item = window.localStorage.getItem("currentAddress");
        return JSON.parse(item);
    }
    ,
    setCurrentAddress: function (address) {
        let stringify = JSON.stringify(address);

        window.localStorage.setItem("currentAddress", stringify);
    },

    setItem: function (key,value) {
        window.localStorage.setItem(key, value);
    }
,
    getItem: function (key,defaultValue) {
       return window.localStorage.getItem(key);
    }
}
