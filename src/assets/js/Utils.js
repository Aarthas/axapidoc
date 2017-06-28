var GetQueryString = function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
    var r = window.location.search.substr(1).match(reg);
    if (r!=null) return (r[2]); return null;
}

function go (url, $router) {
    if (/^javas/.test(url) || !url) return
    const useRouter = typeof url === 'object' || ($router && typeof url === 'string' && !/http/.test(url))
    if (useRouter) {
        url === 'BACK' ? $router.go(-1) : $router.push(url)
    } else {
        window.location.href = url
    }
}
export default {
    getQueryString:GetQueryString,
    labelWidth (title) {
       let a =  title.replace(/[^x00-xff]/g, '00').length / 2 +2
        a=a>=17?17:a;
        return a+"em" ;
    },
    go:go

};