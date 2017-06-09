var GetQueryString = function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
    var r = window.location.search.substr(1).match(reg);
    if (r!=null) return (r[2]); return null;
}


export default {
    getQueryString:GetQueryString,
    labelWidth (title) {
       let a =  title.replace(/[^x00-xff]/g, '00').length / 2 +2
        a=a>=17?17:a;
        return a+"em" ;
    }
};