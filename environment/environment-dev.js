

const api =  'http://192.168.10.14:8080';
const base_url = JSON.stringify(api);

const webpackGlobal = {
    // 判断是否是用户环境， 如果是用户环境收到切换为true， 如果是内部公司手动切换为false
    userProduction: false,
    base_url: base_url,
    plugin_base_url : JSON.stringify( api),

    // 这个不是固定的
    plugin_url: JSON.stringify( api + '/pluginConfig/getPluginConfig'),
    method:JSON.stringify('post'),

    appKey: JSON.stringify('appKey-1'),
    appSecret: JSON.stringify('appSecret-1'),
    version: JSON.stringify('version-1'),
    client: JSON.stringify('client-1'),

    tenant_type: JSON.stringify('single'), // mult  参数带tenant

    acc_url: JSON.stringify('http://portal-ce.local.doublekit.net'),
    mobile: JSON.stringify('http://portal.mlocal.doublekit.net'),
    dev_production: true
}

module.exports =  {
    webpackGlobal,
}

