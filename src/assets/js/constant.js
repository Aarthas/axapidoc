function encodeWxUrl(url,scope) {
    let encodeurl = encodeURIComponent(url)
    let authedUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf698f56d095a5d43&redirect_uri="+encodeurl+"&response_type=code&scope="+scope+"&state=sunlight#wechat_redirect"
    return authedUrl;
}
var env = {
    isDev:true
};
var baseUrl;
// baseUrl = "http://weixin.sanjiang.com/memberCenter";
// baseUrl  = "http://localhost:9090";
baseUrl  = "http://193.0.1.157:9090";
var config = {
    baseurl : baseUrl,
}

module.exports = config;
