require('./check-versions')();

const opn = require('opn');
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const lodash = require('lodash');
const fs = require("fs");
const config = require('../config');
const autoload = require('./autoload');
const exec = require('child_process').exec;
const notifier = require('node-notifier');
const ICON = path.join(__dirname, 'icon.png');

config.setDebug();
if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = JSON.parse(config.build.env.NODE_ENV);
}
let webpackConfig = require('./webpack.hmr.conf');
// console.log(webpackConfig);

// default port where dev server listens for incoming traffic
let port = process.env.PORT || config.build.port;
// automatically open browser, if not set will be false
// noinspection PointlessBooleanExpressionJS
let autoOpenBrowser = !!config.build.autoOpenBrowser;
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
let proxyTable = config.build.proxyTable;
let app = express();
let compiler = webpack(webpackConfig);
let devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath : webpackConfig.output.publicPath,
    quiet      : true,
});
let hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log       : false,
    heartbeat : 2000,
});
let proxyMiddleware = require('http-proxy-middleware');

// force page reload when html-webpack-plugin template changes
// noinspection JSDeprecatedSymbols
compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        // noinspection JSUnresolvedFunction
        hotMiddleware.publish({action : 'reload'});
        cb();
        notifier.notify({
            title: "提示",
            message: '编译完成并自动刷新页面',
            icon: ICON
        });
    });
});



/***
 * 编译完成处理,当entrys与components文件个数不一样，触发autoload逻辑
 * @param stats
 */

const compilerDoneHanle = (stats)=> {
    let entrys = lodash['keysIn'](config.getEntries());
    let components = lodash['keysIn'](config.getComponentsEntries());

    /**入口个数相同不处理**/
    if (entrys.length === components.length) {
        console.log('components无变化');
        return;
    }

    console.log('创建文件完成开始');
    autoload.helper();
    autoload.entrys();
    autoload.modules();
    console.log('创建文件完成结束');

    /**重载项目**/
    let pat = `cd ${__dirname}`;
    pat = pat.replace(/\//g, '//');
    let cmd = `${pat} && cd ..// && npm run dev`;
    console.log(cmd);
    server.close();

    exec(cmd, function (error, stdout, stderr) {
        if (error) {
            console.log(error);
        } else {
            console.log('重启成功');
        }
    });

    notifier.notify({
        title: "提示",
        message: '编译完成并重启服务',
        icon: ICON
    });
};

/**完成编译时触发该事件**/
let doneTimeer = null;
compiler.plugin('done', function (stats) {
    if (doneTimeer) clearTimeout(doneTimeer);
    doneTimeer = setTimeout(()=>{
        compilerDoneHanle(stats);
    }, 2000);
});



// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
    let options = proxyTable[context];
    if (typeof options === 'string') {
        options = {target : options};
    }
    app.use(proxyMiddleware(options.filter || context, options));
});

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());

// serve webpack bundle output
app.use(devMiddleware);

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware);

// serve pure static assets
let staticPath = path.posix.join(config.build.assetsPublicPath, config.build.assetsSubDirectory);
app.use(staticPath, express.static('./static'));

let uri = `http://localhost:${port}/${config.build.index}.html`;

let _resolve;
let readyPromise = new Promise(resolve => {
    _resolve = resolve;
});

console.log('> Starting dev server...');
devMiddleware.waitUntilValid(() => {
    console.log('> Listening at ' + uri + '\n');
    // when env is testing, don't need open it
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
        opn(uri);
    }
    _resolve();

    notifier.notify({
        title: "提示",
        message: '编译完成并启动服务',
        icon: ICON
    });
});

let server = app.listen(port);

module.exports = {
    ready : readyPromise,
    close : () => {
        server.close();
    },
};
