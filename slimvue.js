"use strict";

import Vue from 'vue';
import 'babel-polyfill';


const PackageInfo = require('./package');
const store = require('./' + PackageInfo.name + '/store/app');

/**加载子组件文件夹**/
require('./' + PackageInfo.name + '/subComponents/autoload');


/**
 * 加载ElementUI插件
 */
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

/**
 * 复制到粘贴板功能
 */
import VueClipboard from 'vue-clipboard2';
Vue.use(VueClipboard);




// noinspection JSUnresolvedVariable
Vue.config.productionTip = (process.env.NODE_ENV !== "production");

Vue.prototype.$toCssUrl = function (imageUrl) {
    return "url(" + imageUrl + ")";
};
Vue.prototype.$toCssBackgroundImage = function (imageUrl) {
    return {
        backgroundImage : this.$toCssUrl(imageUrl),
    };
};

export default {
    DEBUG_LOG_LEVEL   : 0,
    DEFAULT_LOG_LEVEL : 10,
    INFO_LOG_LEVEL    : 20,
    WARNING_LOG_LEVEL : 30,
    ERROR_LOG_LEVEL   : 40,
    _logLevel         : -1,
    set logLevel(val) {
        this._logLevel = val;
    },
    get logLevel() {
        if (this._logLevel === -1) {
            return this.isDebug ? this.DEBUG_LOG_LEVEL : this.INFO_LOG_LEVEL;
        }
        else {
            return this._logLevel;
        }
    },
    get isDebug() {
        return process.env.NODE_ENV !== "production";
    },
    get bridge() {
        if (undefined === window.bridge) {
            return process.env.bridge;
        }
        else {
            return window.bridge;
        }
    },
    mount             : function (vueComponent) {
        console.log("Will start to mount component to slimvue app", vueComponent);
        let div = document.getElementById('slimvue-app');
        if (div === null) {
            div = document.createElement('div');
            div.id = "slimvue-app";
            div.innerHTML = "<slimvue-page></slimvue-page>";
            document.body.appendChild(div);
        }
        else {
            console.warn("Div element already exists, will replace existing content.");
        }


        /**获取数据仓库**/
        let app = window.slimvue = new Vue({
            components : {
                "slimvue-page" : vueComponent,
            },
            store: store.default,
            el         : "#slimvue-app",
        });

        return app;
    },
    log               : function (...args) {
        if (this.logLevel <= this.DEFAULT_LOG_LEVEL) console.log(...args);
    },
    debug             : function (...args) {
        if (this.logLevel <= this.DEBUG_LOG_LEVEL) console.debug(...args);
    },
    info              : function (...args) {
        if (this.logLevel <= this.INFO_LOG_LEVEL) console.info(...args);
    },
    warn              : function (...args) {
        if (this.logLevel <= this.WARNING_LOG_LEVEL) console.warn(...args);
    },
    error             : function (...args) {
        if (this.logLevel <= this.ERROR_LOG_LEVEL) console.error(...args);
    },
};
