


const api =  'http://api.doublekit.net';
const base_url = JSON.stringify(api);


const webpackGlobal = {
    // 判断是否是用户环境， 如果是用户环境收到切换为true， 如果是内部公司手动切换为false
    userProduction: false,
    base_url: base_url,
    plugin_base_url : JSON.stringify( 'http://api.doublekit.net/'),

    // 这个不是固定的
    plugin_url: JSON.stringify( 'http://api.doublekit.net/pluginConfig/getPluginConfig'),
    method:JSON.stringify('post'),

    appKey: JSON.stringify('appKey-1'),
    appSecret: JSON.stringify('appSecret-1'),
    version: JSON.stringify('ce'),
    client: JSON.stringify('web'),

    tenant_type: JSON.stringify('single'), // mult  参数带tenant

    wechatUrl: JSON.stringify( 'dev.project.doublekit.net')
}

module.exports =  {
    webpackGlobal
}

