


const api =  'http://192.168.10.7:8081';
const base_url = JSON.stringify(api);


const webpackGlobal = {
    // 判断是否是用户环境， 如果是用户环境收到切换为true， 如果是内部公司手动切换为false
    userProduction: false,
    base_url: base_url,
    plugin_base_url : JSON.stringify( 'http://192.168.10.7:8081/'),

    // 这个不是固定的
    plugin_url: JSON.stringify( 'http://192.168.10.7:8081/pluginConfig/getPluginConfig'),
    method:JSON.stringify('post'),

    appKey: JSON.stringify('appKey-1'),
    appSecret: JSON.stringify('appSecret-1'),
    version: JSON.stringify('version-1'),
    client: JSON.stringify('client-1'),

    tenant_type: JSON.stringify('single'), // mult  参数带tenant
}

module.exports =  {
    webpackGlobal
}

