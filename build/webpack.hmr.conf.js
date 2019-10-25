const utils = require('./utils');
const config = require('../config');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');

// add hot-reload related code to entry chunks
// noinspection JSUnresolvedVariable
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
    // noinspection JSUnresolvedVariable
    baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name]);
});
// noinspection JSUnresolvedVariable
baseWebpackConfig.output.chunkFilename = baseWebpackConfig.output.filename = 'js/[name].js';
// noinspection JSUnresolvedFunction
module.exports = merge(baseWebpackConfig, {
    module  : {
        rules : utils.styleLoaders({sourceMap : config.build.cssSourceMap}),
    },
    // cheap-module-eval-source-map is faster for development
    devtool : '#cheap-module-eval-source-map',
    plugins : ([]).concat(
        require('./plugins/dev-plugin'),
        require('./plugins/common-trunks-plugin'),
        require('./plugins/copy-files-plugin'),
        require('./plugins/hmr-plugin')
    ),
});
