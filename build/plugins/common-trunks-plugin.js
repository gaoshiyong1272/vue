const path = require('path');
const config = require('../../config');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
plugins.push(new HtmlWebpackPlugin({
    chunksSortMode : 'manual',
    inject         : 'head',
    chunks         : ['manifest', 'vendor', 'commons'],
    template       : path.join(config.build.packingTemplatesPath, 'slimvue.twig'),
    filename       : path.join(config.build.buildOutputRoot, 'twigs', 'slimvue.twig'),
}));

Object.keys(config.getEntries()).forEach((entry) => {
    let file = path.basename(entry);
    let subPath = path.dirname(entry);
    // console.log(`Adding html plugin for ${entry}, file = ${file}, subPath= ${subPath}`);
    
    // // noinspection JSUnresolvedVariable
    // plugins.push(new HtmlWebpackPlugin({
    //     chunksSortMode : 'manual',
    //     chunks         : [],
    //     template       : path.join(config.build.packingTemplatesPath, 'slimvue-page.twig'),
    //     filename       : path.join(config.build.buildOutputRoot, 'twigs/pages', subPath, `${file}.twig`),
    // }));
    // noinspection JSUnresolvedVariable
    plugins.push(new HtmlWebpackPlugin({
        chunksSortMode : 'manual',
        chunks         : [entry],
        inject         : 'body',
        template       : path.join(config.build.packingTemplatesPath, 'slimvue-page.twig'),
        filename       : path.join(config.build.buildOutputRoot, 'twigs/pages', subPath, `${file}.twig`),
    }));
    if (config.shouldOutputHtml()) {
        // noinspection JSUnresolvedVariable
        plugins.push(new HtmlWebpackPlugin({
            title          : entry,
            chunksSortMode : 'manual',
            inject         : "body",
            chunks         : ['manifest', 'vendor', 'commons', entry],
            template       : path.join(config.build.packingTemplatesPath, 'debug.html'),
            filename       : path.join(config.build.buildOutputRoot, `htmls/${entry}.html`),
        }));
    }
});

module.exports = plugins;
