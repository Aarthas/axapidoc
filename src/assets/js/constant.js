function encodeWxUrl(url,scope) {
    let encodeurl = encodeURIComponent(url)
    let authedUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf698f56d095a5d43&redirect_uri="+encodeurl+"&response_type=code&scope="+scope+"&state=sunlight#wechat_redirect"
    return authedUrl;
}
var env = {
    isDev:true
};
var baseUrl;
if (env.isDev)
{
    baseUrl = "http://weixin.sanjiang.com/memberCenter";

}else
{
    baseUrl  = "http://localhost:9090/";

}
baseUrl  = "http://localhost:9090/";
var Constant = {
    baseurl : baseUrl,
    index:encodeWxUrl(baseUrl+"/#/index",'snsapi_base'),
    indexCode:encodeWxUrl(baseUrl+"/#/indexcard",'snsapi_base'),
    indexWxbind:encodeWxUrl(baseUrl+"/#/indexwxbind",'snsapi_userinfo'),

}

module.exports = Constant;
