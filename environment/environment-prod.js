const api =  '/';
const base_url = JSON.stringify(api);


const webpackGlobal = {
    // 判断是否是用户环境， 如果是用户环境收到切换为true， 如果是内部公司手动切换为false
    userProduction: false,
    base_url: base_url,

    // 这个不是固定的
    plugin_base_url : base_url,
    plugin_url: JSON.stringify( '/pluginConfig/getPluginConfig'),
    method:JSON.stringify('post'),

    appKey: JSON.stringify('appKey-1'),
    appSecret: JSON.stringify('appSecret-1'),
    version: JSON.stringify('Version-1'),
    client: JSON.stringify('client-1'),
    dev_production: false
}

module.exports = {
    webpackGlobal
}
