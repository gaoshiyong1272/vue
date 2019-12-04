'use strict';

const path = require('path');
const config = require('../config');
const fs = require("fs");
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * 递归创建目录
 * @param dirname
 * @returns {boolean}
 */
let mkdirsSync = dirname => {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
}


let autoload = {

    /**
     * 自动加载Helper模块
     */
    helper: function(){
        let helperImportStr = '';
        let helperExportStr = '';
        let count = 0;
        Object.keys(config.getHelpers()).forEach((helper) => {
            /**多层关系加载**/
            if(helper.indexOf('bak') === -1 ) {
                let moduleName = helper;
                let modulePath = helper;
                if (helper.indexOf('/') !== -1) {
                    let temp = '';
                    let arr = helper.split('/');
                    let len = arr.length;
                    for (let i = 0; i < len; i++) {
                        if (i === 0) temp = arr[i];
                        else temp += arr[i].replace(arr[i][0], arr[i][0].toLocaleUpperCase());
                    }
                    moduleName = temp;
                }

                let str = '';
                if (count === 0) {
                    str = `import ${moduleName} from './${modulePath}';`;
                    helperExportStr += `${moduleName}`;
                } else {
                    str = `
import ${moduleName} from './${modulePath}';`;
                    helperExportStr += `,
    ${moduleName}`;
                }
                helperImportStr += str;
                count++;
            }
        });

        /**读取文件，并替换文件内容**/
        let buffer = fs.readFileSync(path.join(config.build.packingTemplatesPath, 'auto-load-modules-template.txt'));
        let content = String(buffer);
        content = content.replace(/@import_modules@/g, helperImportStr);
        content = content.replace(/@modules_name@/g, helperExportStr);

        /**写文件**/
        let fd = fs.openSync(path.join(config.build.helperDirectory, 'autoload.js'), 'w');
        fs.writeFileSync(fd, content);
        fs.closeSync(fd);
        console.log('Hepler autoload file updated or created');
    },

    /**
     * 根据components文件夹根目录vue文件生成Entry如何文件
     */
    entrys: function(){
        let entryCount = [];
        let modulesCount = [];
        Object.keys(config.getComponentsEntries()).forEach((componentEntry) => {
            let entry = config.getEntries();
            let modules = config.getStoreModules();

            //console.log(entry, componentEntry,entry[componentEntry])

            /**无Entry文件自动生产Entry入口文件**/
            if (!entry[componentEntry]) {

                /**有目录先创建目录**/
                let arr = componentEntry.split('/');
                if (arr.length > 1) {
                    let pathArr = arr.slice(0, -1).join('/');
                    mkdirsSync(path.join(config.build.entryDirectory, pathArr));
                }

                /**读取文件，并替换文件内容**/
                let buffer = fs.readFileSync(path.join(config.build.packingTemplatesPath, 'entry-js-template.js'));
                let content = String(buffer);
                content = content.replace(/@entryname@/g, componentEntry);
                content = content.replace(/@pathname@/g, componentEntry);


                /**写文件**/
                let fd = fs.openSync(path.join(config.build.entryDirectory, `${componentEntry}.js`), 'w');
                fs.writeFileSync(fd, content);
                fs.closeSync(fd);
                entryCount.push(componentEntry);
                console.log('Entry created，Entry name => ', componentEntry)
            }

            /**无Module文件自动生产Module入口文件**/
            if (!modules[componentEntry]) {
                /**有目录先创建目录**/
                let arr = componentEntry.split('/');
                if (arr.length > 1) {
                    let pathArr = arr.slice(0, -1).join('/');
                    mkdirsSync(path.join(config.build.modulesDirectory, pathArr));
                }

                /**读取文件，并替换文件内容**/
                let buffer = fs.readFileSync(path.join(config.build.packingTemplatesPath, 'module-js-template.js'));
                let content = String(buffer);

                /**写文件**/
                let fd = fs.openSync(path.join(config.build.modulesDirectory, `${componentEntry}.js`), 'w');
                fs.writeFileSync(fd, content);
                fs.closeSync(fd);
                modulesCount.push(componentEntry);
                console.log('Module created，Module name => ', componentEntry)
            }
        });

        /**entry无需生成**/
        if (entryCount.length === 0) {
            console.log('No entry create')
        }

        /**entry无需生成**/
        if (modulesCount.length === 0) {
            console.log('No module create')
        }
    },

    /**
     * 自动加载Store Modules模块
     */
    modules: function(){
        let importStr = '';
        let exportStr = '';
        let count = 0;
        let componentsEntries = config.getComponentsEntries();
        Object.keys(config.getStoreModules()).forEach((module) => {
            /**多层关系加载**/
            let moduleName = module;
            let modulePath = module;
            if (module.indexOf('/') !== -1) {
                let temp = '';
                let arr = module.split('/');
                let len = arr.length;
                for (let i = 0; i < len; i++) {
                    if (i === 0) temp = arr[i];
                    else temp += arr[i].replace(arr[i][0], arr[i][0].toLocaleUpperCase());
                }
                moduleName = temp;
            }
            let str = '';
            if (count === 0) {
                str = `import ${moduleName} from './${modulePath}';`;
                exportStr += `${moduleName}`;
            }
            else
            {
                str = `
import ${moduleName} from './${modulePath}';`;
                exportStr += `,
    ${moduleName}`;
            }
            importStr += str;
            count++;
        });

        /**读取文件，并替换文件内容**/
        let buffer = fs.readFileSync(path.join(config.build.packingTemplatesPath, 'auto-load-modules-template.txt'));
        let content = String(buffer);
        content = content.replace(/@import_modules@/g, importStr);
        content = content.replace(/@modules_name@/g, exportStr);

        /**写文件**/
        let fd = fs.openSync(path.join(config.build.modulesDirectory, 'autoload.js'), 'w');
        fs.writeFileSync(fd, content);
        fs.closeSync(fd);
        console.log('Store modules autoload file updated or created \n');
    },

    /**
     * 自动加载Store Modules模块
     */
    subComponents: function () {
        let importStr = '';
        let initStr = '';
        let count = 0;

        //$vue.component('sub-@modules_name@', @modules_name@);
        Object.keys(config.getSubComponentsEntries()).forEach((module) => {
            /**多层关系加载**/
            let moduleName = module;
            let modulePath = module;

            if (module.indexOf('/') !== -1) {
                let temp = '';
                let arr = module.split('/');
                let len = arr.length;
                for (let i = 0; i < len; i++) {
                    if (i === 0) temp = arr[i];
                    else temp += arr[i].replace(arr[i][0], arr[i][0].toLocaleUpperCase());
                }
                moduleName = temp;
            }

            let str = '';
            let componentstr = `Vue.component('sub-${modulePath.toLocaleLowerCase().replace(/\//g, '-')}',${moduleName});`;
            if (moduleName === 'layout') {
                componentstr = `Vue.component('${modulePath.toLocaleLowerCase().replace(/\//g, '-')}',${moduleName});`;
            }

            if (count === 0) {
                str = `import ${moduleName} from './${modulePath}';`;
                initStr += componentstr;
            } else {
                str = `
import ${moduleName} from './${modulePath}';`;
                initStr += `
${componentstr}`;
            }
            importStr += str;
            count++;
        });

        //console.log(importStr, initStr);

        /**读取文件，并替换文件内容**/
        let buffer = fs.readFileSync(path.join(config.build.packingTemplatesPath, 'auto-load-sub-component-template.txt'));
        let content = String(buffer);
        content = content.replace(/@import_modules@/g, importStr);
        content = content.replace(/@use_sub_components@/g, initStr);

        /**写文件**/
        let fd = fs.openSync(path.join(config.build.subComponentsDirectory, 'autoload.js'), 'w');
        fs.writeFileSync(fd, content);
        fs.closeSync(fd);
        console.log('Sub Components autoload file updated or created \n');
    },

    /**
     * 自动从载入html 文件
     */
    html(){
        // create html or twig
        Object.keys(config.getEntries()).forEach((entry) => {
            let file = path.basename(entry.toLocaleLowerCase());
            let subPath = path.dirname(entry.toLocaleLowerCase());
            console.log(`Adding html plugin for ${entry.toLocaleLowerCase()}, file = ${file}, subPath= ${subPath}`);

            if (config.shouldOutputHtml()) {
                // noinspection JSUnresolvedVariable
                new HtmlWebpackPlugin({
                    title: entry,
                    chunksSortMode: 'manual',
                    inject: "body",
                    chunks: ['manifest', 'vendor', 'commons', entry],
                    template: path.join(config.build.packingTemplatesPath, 'debug.html'),
                    filename: path.join(config.build.buildOutputRoot, `${entry.toLocaleLowerCase()}.html`),
                });
            }
        });
    }
};

module.exports = autoload;

