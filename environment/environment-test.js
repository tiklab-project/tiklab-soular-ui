
const api =  '/';
const base_url = JSON.stringify(api);

const webpackGlobal = {
    // 判断是否是用户环境， 如果是用户环境收到切换为true， 如果是内部公司手动切换为false
    userProduction: false,
    base_url: base_url,
    plugin_base_url:base_url,
    plugin_url: JSON.stringify( '/plugin/getPluginConfig'),
    method:JSON.stringify('get'),

    appKey: JSON.stringify('appKey-1'),
    appSecret: JSON.stringify('appSecret-1'),
    version: JSON.stringify('version-1'),
    client: JSON.stringify('client-1'),

    // 登录认证类型
    authType: JSON.stringify('acc'),
    authUrl: JSON.stringify('http://localhost:8091/#/login'),
    tenant_type: JSON.stringify('single'), // mult  参数带tenant
}

module.exports = {
    webpackGlobal
}
