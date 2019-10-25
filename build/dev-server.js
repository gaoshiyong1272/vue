require('./check-versions')();

const opn = require('opn');
const path = require('path');
const express = require('express');
const webpack = require('webpack');

let config = require('../config');
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
    });
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

let uri = `http://localhost:${port}/htmls/${config.build.index}.html`;

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
});

let server = app.listen(port);

module.exports = {
    ready : readyPromise,
    close : () => {
        server.close();
    },
};
