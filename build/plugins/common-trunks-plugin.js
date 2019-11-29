const path = require('path');
const config = require('../../config');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require("fs")

// noinspection JSUnresolvedFunction
let plugins = [
    // https://github.com/johnagan/clean-webpack-plugin
    new webpack.optimize.CommonsChunkPlugin(
        {
            name      : 'vendor',
            minChunks : function (module) {
                // This prevents stylesheet resources with the .css or .scss extension
                // from being moved from their original chunk to the vendor chunk
                // if (module.resource && (/^.*\.(css|scss)$/).test(module.resource)) {
                //     return false;
                // }
                return module.context && module.context.indexOf("node_modules") !== -1;
            },
        }
    ),
    new webpack.optimize.CommonsChunkPlugin(
        {
            name   : 'commons',
            chunks : Object.keys(config.getEntries()),
        }
    ),
    new webpack.optimize.CommonsChunkPlugin(
        {
            name      : 'manifest',
            minChunks : Infinity,
        }
    ),
];

// noinspection JSUnresolvedVariable
if(config.shouldOutputTwig()) {
    plugins.push(new HtmlWebpackPlugin({
        chunksSortMode: 'manual',
        inject: 'head',
        chunks: ['manifest', 'vendor', 'commons'],
        template: path.join(config.build.packingTemplatesPath, 'slimvue.twig'),
        filename: path.join(config.build.buildOutputRoot, 'twigs', 'slimvue.twig'),
    }));
}

//create entries file js
// Object.keys(config.getComponentsEntries()).forEach((componentEntry) => {
//     componentEntry = componentEntry.toLocaleLowerCase();
//     let entry = config.getEntries();
//
//     /**
//      * 无Entry文件自动生产Entry入口文件
//      */
//     if(!entry[componentEntry]) {
//         /**读取文件，并替换文件内容**/
//         let buffer = fs.readFileSync(path.join(config.build.packingTemplatesPath, 'entry-js-template.js'));
//         let content = String(buffer);
//         content = content.replace(/@entryname@/g, componentEntry);
//
//         /**写文件**/
//         let fd = fs.openSync(path.join(config.build.entryDirectory, `${componentEntry}.js`), 'w');
//         fs.writeFileSync(fd, content);
//         fs.closeSync(fd);
//
//         console.log('create entries=> ', componentEntry)
//     }
//
// });


// create html or twig
Object.keys(config.getEntries()).forEach((entry) => {
    let file = path.basename(entry);
    let subPath = path.dirname(entry);
    console.log(`Adding html plugin for ${entry}, file = ${file}, subPath= ${subPath}`);

    if (config.shouldOutputHtml()) {
        // noinspection JSUnresolvedVariable
        plugins.push(new HtmlWebpackPlugin({
            title          : entry,
            chunksSortMode : 'manual',
            inject         : "body",
            chunks         : ['manifest', 'vendor', 'commons', entry],
            template       : path.join(config.build.packingTemplatesPath, 'debug.html'),
            filename       : path.join(config.build.buildOutputRoot, `${entry}.html`),
        }));
    }

    if (config.shouldOutputTwig()) {
        plugins.push(new HtmlWebpackPlugin({
            chunksSortMode: 'manual',
            chunks: [entry],
            inject: 'body',
            template: path.join(config.build.packingTemplatesPath, 'slimvue-page.twig'),
            filename: path.join(config.build.buildOutputRoot, 'twigs/pages', subPath, `${file}.twig`),
        }));
    }
});

module.exports = plugins;
