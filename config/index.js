// see http://vuejs-templates.github.io/webpack for documentation.
"use strict";
const path = require('path');
const merge = require('webpack-merge');
const rreaddir = require('recursive-readdir-sync');
const fs = require('fs-extra');

let packageInfo = fs.readJsonSync(path.resolve(__dirname, '../package.json'));

module.exports = {
    build            : {
        buildOutputRoot      : path.resolve(__dirname, '../dist'),
        assetsSubDirectory   : 'assets',
        assetsPublicPath     : '/',
        entryDirectory       : path.resolve(__dirname, '../' + packageInfo.name + '/entries'),
        packingTemplatesPath : path.resolve(__dirname, '../build/pack-templates'),
    },
    prod             : {
        env                      : require('./prod.env'),
        cssSourceMap             : true,
        productionHtml           : false,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip           : false,
        productionGzipExtensions : ['js', 'css'],
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport     : process.env.npm_config_report,
    },
    dev              : {
        env             : require('./dev.env'),
        // index entry for debugging server
        index           : 'index',
        port            : 8090,
        autoOpenBrowser : true,
        proxyTable      : {},
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap    : false,
    },
    _debug           : true,
    setDebug         : function (debug = true) {
        this._debug = debug;
        this.build = merge(this.build, debug ? this.dev : this.prod);
    },
    isDebug          : function () {
        return this._debug;
    },
    isProduction     : function () {
        return !this.isDebug();
    },
    shouldOutputHtml : function () {
        if (this.isDebug()) {
            return true;
        }
        else {
            return this.prod.productionHtml;
        }
    },
    getEntries       : function () {
        let entries = {};
        let entryFiles = rreaddir(this.build.entryDirectory);
        // noinspection JSUnresolvedFunction
        entryFiles.forEach(entryFile => {
            entryFile = path.relative(this.build.entryDirectory, entryFile);
            let result = (/(.*)\.js$/).exec(entryFile);
            if (result) {
                let name = `${result[1]}`;
                if (name === 'manifest' || name === 'vendor' || name === 'commons') {
                    throw new Error("entry named " + name + " uses a reserved name");
                }
                entries[name] = path.join(this.build.entryDirectory, entryFile);
            }
        });
        
        return entries;
    },
};
