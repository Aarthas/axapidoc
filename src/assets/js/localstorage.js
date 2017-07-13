export default {

    getCurrentAddress: function () {
        let item = window.localStorage.getItem("currentAddress");
        return JSON.parse(item);
    }
    ,
    setCurrentAddress: function (address) {
        let stringify = JSON.stringify(address);

        window.localStorage.setItem("currentAddress", stringify);
    }


}
