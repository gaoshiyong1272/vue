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
        componentsDirectory : path.resolve(__dirname, '../' + packageInfo.name + '/components'),
        subComponentsDirectory: path.resolve(__dirname, '../' + packageInfo.name + '/subComponents'),
        helperDirectory: path.resolve(__dirname, '../' + packageInfo.name + '/helper'),
        modulesDirectory: path.resolve(__dirname, '../' + packageInfo.name + '/store/modules'),

    },
    prod             : {
        env                      : require('./prod.env'),
        cssSourceMap             : true,
        productionHtml           : true,
        productionTwig           : false,
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
        index           : 'demo',
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
    shouldOutputTwig(){
        if (this.isDebug()) {
            return false;
        } else {
            return this.prod.productionTwig;
        }
    },

    /**
     * 获取entry目录文件
     */
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

    /**
     * 获取components目录文件
     */
    getComponentsEntries: function () {
        let components = {};
        let componentsFiles = rreaddir(this.build.componentsDirectory);
        // noinspection JSUnresolvedFunction
        componentsFiles.forEach(componentFile => {
            componentFile = path.relative(this.build.componentsDirectory, componentFile);
            let result = (/(.*)\.vue$/).exec(componentFile);
            if (result && componentFile.indexOf('/') === -1) {
                let name = `${result[1]}`;
                if (name === 'manifest' || name === 'vendor' || name === 'commons') {
                    throw new Error("entry named " + name + " uses a reserved name");
                }
                components[name] = path.join(this.build.componentsDirectory, componentFile);
            }
        });
        return components;
    },

    /**
     * 获取components目录文件
     */
    getSubComponentsEntries: function () {
        let components = {};
        let componentsFiles = rreaddir(this.build.subComponentsDirectory);
        // noinspection JSUnresolvedFunction
        componentsFiles.forEach(componentFile => {
            componentFile = path.relative(this.build.subComponentsDirectory, componentFile);
            let result = (/(.*)\.vue$/).exec(componentFile);
            if (result) {
                let name = `${result[1]}`;
                if (name === 'manifest' || name === 'vendor' || name === 'commons') {
                    throw new Error("entry named " + name + " uses a reserved name");
                }
                components[name] = path.join(this.build.subComponentsDirectory, componentFile);
            }
        });
        return components;
    },

    /**
     * 获取helpers目录文件
     */
    getHelpers : function () {
        let helpers = {};
        let helperFiles = rreaddir(this.build.helperDirectory);
        // noinspection JSUnresolvedFunction
        helperFiles.forEach(helperFile => {
            helperFile = path.relative(this.build.helperDirectory, helperFile);
            let result = (/(.*)\.js$/).exec(helperFile);
            if (result && result[1] !== 'autoload') {
                let name = `${result[1]}`;
                if (name === 'manifest' || name === 'vendor' || name === 'commons') {
                    throw new Error("entry named " + name + " uses a reserved name");
                }
                helpers[name] = path.join(this.build.helperDirectory, helperFile);
            }
        });

        return helpers;
    },

    /**
     * 获取helpers目录文件
     */
    getStoreModules: function () {
        let modules = {};
        let files = rreaddir(this.build.modulesDirectory);
        // noinspection JSUnresolvedFunction
        files.forEach(file => {
            file = path.relative(this.build.modulesDirectory, file);
            let result = (/(.*)\.js$/).exec(file);
            if (result && result[1] !== 'autoload') {
                let name = `${result[1]}`;
                if (name === 'manifest' || name === 'vendor' || name === 'commons') {
                    throw new Error("entry named " + name + " uses a reserved name");
                }
                modules[name] = path.join(this.build.modulesDirectory, file);
            }
        });

        return modules;
    },

};
