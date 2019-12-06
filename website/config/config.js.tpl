/**
 * Created by shiyonggao on 2019/1/22.
 */

/**
 * 项目配置文件
 */

const config = {
    /**用户登陆token**/
    userLoginAccessTokenKey: 'odp_access_token',

    /**core配置**/
    coreAppId: 255,
    coreUrl : 'https://core-test.oasisgames.cn',
    coreOauthUrl: 'https://oauth-test.oasisgames.cn',

    /**dev server port**/
    port: 8090,

    /**dev server index page**/
    index: 'demo',

    /**dev server auto open browser**/
    autoOpenBrowser: true,

    /**host**/
    baseUrl: 'http://localhost:8090/',
    apiBaseUrl: '',

    /**api**/
    api: {},

    /**默认语言**/
    locale: 'zh-CN',

    /**
     * 版本号
     */
    version: 'v2.0.0',
};

module.exports =  config;






